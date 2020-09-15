$(function() {

    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage

    //声明配置参数对象
    var q = {
        pagenum: 1, //页码值
        pagesize: 2, //每页显示多少条数据
        cate_id: '', //文章分类的 Id
        state: '' //文章状态，已发布和草稿
    }

    //初始化表格
    initTable()

    function initTable() {
        $.ajax({
            url: '/my/article/list',
            method: 'GET',
            data: q,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.messsge)
                }
                res.data.forEach(function(item) {
                    item.pub_date = dayjs(item.pub_date).format('YYYY-MM-DD HH:MM')
                })
                var tableHtml = template('tpl-table', res)
                $('tbody').html(tableHtml)
                renderPage(res.total)
            }
        })
    }

    //动态生成下拉菜单项
    initCate()

    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var cateHtml = template('tpl-cate', res)
                $('.layui-form [name=cate_id]').html(cateHtml)
                form.render()
            }
        })
    }


    //筛选功能
    $('#formSelect').on('submit', function(e) {
        e.preventDefault()
        var newCateId = $('.layui-form [name=cate_id]').val()
        var newstate = $('.layui-form [name=state]').val()
        q.cate_id = newCateId
        q.state = newstate
        initTable()
    })



    //分页模块
    function renderPage(total) {
        laypage.render({
            elem: 'renderpage',
            count: total,
            limit: q.pagesize,
            curr: q.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            //触发jump方法有两种：
            //1.第一次加载，会触发jump方法
            //2.当点击页码的时候会触发jump方法
            jump: function(obj, first) {
                q.pagenum = obj.curr
                q.pagesize = obj.limit

                //当第一次加载的时候，first的值为true,当点击页码值得时候,first的值为undefined
                if (!first) {
                    initTable()
                }
            }
        })
    }

})