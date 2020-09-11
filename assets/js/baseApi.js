//这个方法可以在发起ajax请求中，进行相关的设置
//options是$.ajax()等相关请求方法中的相关配置
$.ajaxPrefilter(function(options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url
})