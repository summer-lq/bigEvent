$(function() {
    var form = layui.form

    //表单验证
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '用户昵称只能1-6个字符！'
            }
        }
    })


    //获取用户基本信息
    initUserInfo()

    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer(res.message)
                }
                //快速给表单赋值
                form.val('formUserInfo', res.data)
            }
        })
    }

    //重置按钮功能
    $('#resetBtn').on('click', function(e) {
        e.preventDefault()
        initUserInfo()
    })

    //修改信息功能
    $('#changeUserInfo').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                //iframe相当于当前页面的子页面
                //iframe所在的页面可以看做是父页面
                //如果想用父页面中的方法，必须使用window.parent.xxx()
                window.parent.getUserInfo()
            }
        })
    })

})