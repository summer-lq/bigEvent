$(function() {
    var layer = layui.layer
    var form = layui.form

    // 初始化富文本编辑器
    initEditor()

    //获取下拉菜单的选项
    selectArt()

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    function selectArt() {
        $.ajax({
            url: '/my/article/cates',
            method: 'GET',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var selectHtml = template('select-art', res)
                $('.layui-form [name=cate_id]').html(selectHtml)
                form.render()
            }
        })
    }

    //上传图片的功能
    $('#select-img').on('click', function() {
        $('#file').click()
    })

    // 上传图片
    $('#file').on('change', function(e) {

        //获取图片
        var file = e.target.files[0]

        //将图片转换成URL格式
        var newImgURL = URL.createObjectURL(file)

        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })


    //实现文章状态
    var art_state = '已发布'
    $('#saveBtn2').click(function() {
        art_state = '草稿'
    })

    //表单事件
    $('#form-pub').on('submit', function(e) {
        e.preventDefault()

        //使用formDate添加数据
        var fd = new FormData($(this)[0])
        fd.append('state', art_state)
        $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) {
                // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                // 5. 将文件对象，存储到 fd 中
                fd.append('cover_img', blob)

                // 6. 发起 ajax 数据请求
                publishArticle(fd)
            })

    })

    function publishArticle(fd) {
        $.ajax({
            url: '/my/article/add',
            method: 'POST',
            data: fd,
            contentType: false,
            processData: false,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                location.href = '/article/art_list.html'
            }
        })
    }

})