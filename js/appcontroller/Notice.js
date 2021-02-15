$(function() {
	// alert(getCookie("token"))
	getstatus()
})

/**
 * 获取注册状态
 */
function getstatus() {
	mypost(getAnnouncement, {
		token: getCookie("token")
	}, function(data) {
		console.log(data)
		if (data.code == 200) {
			var status = data.data.info
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
function Notice() {
	var info = $("#notice").val()
	mypost(setAnnouncement, {
		token: getCookie("token"),
		info: info,
	}, function(data) {
		getstatus()
		alert("修改成功")
	})
}
