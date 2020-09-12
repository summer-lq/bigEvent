$(function() {

    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')

    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)


    //上传功能
    $('#btnChoose').on('click', function() {
        $('#file').click()
    })

    //上传头像

    $('#file').on('change', function(e) {
        //获取文件,这里获取的文件是全部的文件，存放在伪数组中
        var files = e.target.files
        if (files.length === 0) {
            return layui.layer.msg('请选择文件')
        }

        //从文件的伪数组中取第一个文件
        var file = files[0]

        //将文件转换成对应的URL地址
        var imgUrl = URL.createObjectURL(file)
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgUrl) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })



    //确定按钮的事件
    $('#btnSure').click(function() {
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        $.ajax({
            url: '/my/update/avatar',
            method: 'POST',
            data: { avatar: dataURL },
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                window.parent.getUserInfo()
            }
        })
    })
})