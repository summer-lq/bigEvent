$(function () {
    //调用getUserInfo 获取用户的基本信息
    getUserInfo()

    var layer = layui.layer

    //实现退出功能
    $('#btnLogOut').on('click', function () {

        layer.confirm('确认退出登录?', { icon: 3, title: '提示' }, function (index) {
            //移除本地存储的token
            localStorage.removeItem('token')

            location.href = '/login.html'

            layer.close(index)

        });
    })
})

//获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            //渲染头像及名字函数
            getAvatar(res.data)
        },

        //无论成功还是失败都会执行complete回调函数
        // complete: function (res) {
        //     //responseJSON是后台返回的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         location.href = '/login.html'
        //         localStorage.removeItem('token')
        //     }
        // }
    })
}

function getAvatar(user) {

    //1.渲染欢迎词
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)

    //2.渲染头像

    if (user.user_pic) {
        $('.layui-nav-img').prop('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        //toUpperCase()可以将小写字母转换成大写字母
        var firstName = name[0].toUpperCase()
        $('.layui-nav-img').hide()
        $('.text-avatar').html(firstName).show()
    }
}