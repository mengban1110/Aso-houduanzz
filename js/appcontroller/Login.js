$(function() {
	// alert(getCookie("token"))
	getstatus()
})

/**
 * 获取注册状态
 */
function getstatus() {
	mypost(getLogin, {
		token: getCookie("token")
	}, function(data) {
		console.log(data)
		if (data.code == 200) {
			var status;
			if (data.data.status == 0) {
				status = "未限制登录..."
			} else {
				status = "限制登录中..."
			}
			$("#status").text(status)
		} else {
			alert("请重新登录验证身份!")
			window.location.href = "../../index.html";
		}
	})
}


/**
 * 注册控制
 */
function Login(type) {
	console.log("type" + type)
	mypost(setLogin, {
		token: getCookie("token"),
		status: type,
	}, function(data) {
		alert("修改成功")
		getstatus()
	})
}
