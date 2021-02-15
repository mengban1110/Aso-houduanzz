$(function() {
	// alert(getCookie("token"))
	getinfo()
})

/**
 * 获取学校数据
 */
function getinfo() {
	mypost(getSchoolInfo, {
		token: getCookie("token")
	}, function(data) {
		console.log(data)
		if (data.code == 200) {
			var count = 1;
			data.data.forEach(item => {
				var temp = count++;
				$("tbody").append(add(temp, item.schoolname, item.countinfo.user, item.countinfo.posts, item.countinfo.audits,
					item.schoolid))
			})
		} else {
			alert("请重新登录验证身份!")
			window.location.href = "../../index.html";
		}
	})
}

/**
 * 动态生成学校数据
 * 
 * @param {Object} no
 * @param {Object} name
 * @param {Object} usercount
 * @param {Object} postcount
 * @param {Object} posting
 */
function add(no, name, usercount, postcount, posting, schoolid) {
	var div = '<tr>' +
		'<th scope="row">' + no + '</th>' +
		'<td>' + name + '</td>' +
		'<td>' + usercount + '</td>' +
		'<td>' + postcount + '</td>' +
		'<td>' + posting + '</td>' +
		'<td><button class="btn btn-danger" type="button" onclick="del(' + schoolid + ')">删除</button></td>' +
		'</tr>'
	return div
}


/**
 * 跳转添加学校页面
 * 
 */
function goPage() {
	window.location.href = 'Page.html';
}


/**
 * 根据id删除学校信息
 * 
 * @param {Object} no
 */
function del(no) {
	mypost(postSchoolInfo, {
		token: getCookie("token"),
		type: 2,
		schoolid: no
	}, function(data) {
		alert("删除成功")
		location.reload(true)
	})

}


/**
 * 添加学校信息
 * 
 */
function addSchool() {
	mypost(postSchoolInfo, {
		token: getCookie("token"),
		type: 1,
		schoolname: $("#basicInput").val()
	}, function(data) {
		alert("添加成功")
	})
}
