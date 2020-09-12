//这个方法可以在发起ajax请求中，进行相关的设置
//options是$.ajax()等相关请求方法中的相关配置
$.ajaxPrefilter(function(options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url

    //有权限的借口需要设置headers
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
        options.complete = function (res) {
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                location.href = '/login.html'
                localStorage.removeItem('token')
            }
        }
    }

})