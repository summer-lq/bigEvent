$(function() {
    //登录和主页的相互切换
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    //自定义校验规则
    var form = layui.form
    form.verify({
        //校验密码的规则
        password: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        //校验两次密码是否一致的规则
        repassword: function(value) {
            //通过属性选择器可以获取密码框的值
            var pwd = $('.reg-box[name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })
})