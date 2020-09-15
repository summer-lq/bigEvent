$(function() {

    var layer = layui.layer
    var form = layui.form

    // 调用接口，渲染数据
    getArticleList()

    function getArticleList() {
        $.ajax({
            url: '/my/article/cates',
            method: 'GET',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var tableHtml = template('tep-table', res)
                $('tbody').html(tableHtml)
            }
        })
    }


    // 添加类别--弹出层
    var indexAdd = null
    $('#addCateBtn').on('click', function() {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#add-dialog').html()
        });
    })

    //添加分类--功能
    //因为添加内容的表单的动态添加的，所以时间委托给表单添加提交事件
    $('body').on('submit', '#addCateForm', function(e) {
        e.preventDefault()
        $.ajax({
            url: '/my/article/addcates',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                getArticleList()
                layer.close(indexAdd)
            }
        })
    })

    //编辑功能--弹出层
    var indexEdit = null
    $('body').on('click', '.edit-btn', function() {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#edit-dialog').html()
        });
        var editId = $(this).attr('data-id')
        $.ajax({
            method: 'GET',
            url: `/my/article/cates/${editId}`,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                form.val('edit-form', res.data)
            }
        })
    })

    //编辑功能--功能
    $('body').on('submit', '#editCateForm', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                getArticleList()
                layer.close(indexEdit)
            }
        })
    })

    // 删除功能
    $('body').on('click', '#del-btn', function() {
        var id = $(this).attr('data-id')
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                url: '/my/article/deletecate/' + id,
                method: 'GET',
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg(res.message)
                    getArticleList()
                    layer.close(index)
                }
            })
        })
    })

})