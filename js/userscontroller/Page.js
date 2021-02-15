var useridz = GetQueryString("userid"); //储存userid

$(function() {
	$("#codezz").text(" userid : " + useridz)
	getLoginstatus()
	getPoststatus()
	getCommentstatus()
})

/**
 * 修改密码
 */
function changePassword() {
	alert(useridz)
	mypost(setUserKey, {
		token: getCookie("token"),
		userid: useridz,
		password: $("#basicInput").val()
	}, function(data) {
		console.log(data)
		if (data.code == 200) {
			alert("修改成功")
		} else if (data.code == -1) {
			alert("请勿与原密码相同")
		} else {
			alert("修改失败")
		}

	})
}



/**
 * 获取登录权限
 */
function getLoginstatus() {
	alert(useridz)
	mypost(getUserLogin, {
		token: getCookie("token"),
		userid: useridz
	}, function(data) {
		console.log(data)
		if (data.code == 200) {
			var status;
			if (data.data.status == 0) {
				status = "未限制登录..."
			} else {
				status = "限制登录中..."
			}
			$("#Loginstatus").text(status)
		} else {
			alert("请重新登录验证身份!")
			window.location.href = "../../index.html";
		}
	})
}



/**
 * 登录控制
 */
function Login(type) {
	console.log("type" + type)
	mypost(setUserLogin, {
		token: getCookie("token"),
		userid: useridz,
		status: type
	}, function(data) {
		alert("修改成功")
		getLoginstatus()
	})
}



/**
 * 获取发帖权限
 */
function getPoststatus() {
	alert(useridz)
	mypost(getUserPost, {
		token: getCookie("token"),
		userid: useridz
	}, function(data) {
		console.log(data)
		if (data.code == 200) {
			var status;
			if (data.data.status == 0) {
				status = "未限制发帖..."
			} else {
				status = "限制发帖中..."
			}
			$("#Poststatus").text(status)
		} else {
			alert("请重新登录验证身份!")
			window.location.href = "../../index.html";
		}
	})
}



/**
 * 发帖控制
 */
function Post(type) {
	console.log("type" + type)
	mypost(setUserPost, {
		token: getCookie("token"),
		userid: useridz,
		status: type
	}, function(data) {
		alert("修改成功")
		getPoststatus()
	})
}



/**
 * 获取评论权限
 */
function getCommentstatus() {
	alert(useridz)
	mypost(getUserComment, {
		token: getCookie("token"),
		userid: useridz
	}, function(data) {
		console.log(data)
		if (data.code == 200) {
			var status;
			if (data.data.status == 0) {
				status = "未限制评论..."
			} else {
				status = "限制评论中..."
			}
			$("#Commentstatus").text(status)
		} else {
			alert("请重新登录验证身份!")
			window.location.href = "../../index.html";
		}
	})
}



/**
 * 评论控制
 */
function Comment(type) {
	console.log("type" + type)
	mypost(setUserComment, {
		token: getCookie("token"),
		userid: useridz,
		status: type
	}, function(data) {
		alert("修改成功")
		getCommentstatus()
	})
}
