$(function() {
    //密码校验规则
    var form = layui.form
    form.verify({
            pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
            samePwd: function(value) {
                if (value === $('.layui-form [name=oldPwd]').val()) {
                    return '新密码和旧密码不能一致'
                }
            },
            rePwd: function(value) {
                if (value !== $('.layui-form [name=newPwd]').val()) {
                    return '确认密码与新密码不一致'
                }
            }
        })
        //重置密码操作
    $('.layui-form').submit('on', function(e) {
        e.preventDefault()
        $.ajax({
            url: '/my/updatepwd',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg(res.message)

                //将jQuery对象转换成dom对象,使用reset方法重置表单

                $('.layui-form')[0].reset()
                localStorage.removeItem('token')
                top.window.location.href = '/login.html'
            }
        })
    })
})