$(function() {
	// alert(getCookie("token"))
	getinfo()
})

/**
 * 获取帖子信息
 */
function getinfo() {
	mypost(getUsersInfo, {
		token: getCookie("token")
	}, function(data) {
		console.log(data)
		if (data.code == 200) {
			var count = 1;
			data.data.users.forEach(item => {
				var temp = count++;
				$("tbody").append(add(temp,item.userid,item.username,item.usersign,item.useravatar,item.dynamic,item.fans,item.concern,item.history,
				item.usersex,item.usermajor,item.userbir,item.ugraduate,item.uschool))
			})
		} else {
			alert("请重新登录验证身份!")
			window.location.href = "../../index.html";
		}
	})
}

/**
 * 条件查询
 */
function search(){
	
	$("#tbody").empty()
	
	if($("#placeholderInput").val().length == 0){
		getinfo()
	}else{
		mypost(getUsersInfoPart, {
			token: getCookie("token"),
			word: $("#placeholderInput").val()
		}, function(data) {
			console.log(data)
			if (data.code == 200) {
				var count = 1;
				data.data.users.forEach(item => {
					var temp = count++;
					$("tbody").append(add(temp,item.userid,item.username,item.usersign,item.useravatar,item.dynamic,item.fans,item.concern,item.history,
					item.usersex,item.usermajor,item.userbir,item.ugraduate,item.uschool))
				})
			} else if(data.code == -1) {
				alert("暂无数据,将查询所有...")
				getinfo()
			} else {
				alert("请重新登录验证身份!")
				window.location.href = "../../index.html";
			}
		})
	}
	
	
}

/**
 * 动态生成用户数据
 * 
 * @param {Object} no
 * @param {Object} userid 
 * @param {Object} username
 * @param {Object} usersign
 * @param {Object} useravatar
 * @param {Object} dynamic
 * @param {Object} fans
 * @param {Object} concern
 * @param {Object} history
 * @param {Object} usersex
 * @param {Object} usermajor
 * @param {Object} userbir
 * @param {Object} ugraduate
 * @param {Object} uschool
 */
function add(no,userid,uname,usersign,uavatar,dynamic,fans,concern,history,usersex,usermajor,userbir,ugraduate,uschool) {
	
	var ugraduate = istype(ugraduate)
	
	var div = '<tr>'+
					'<th scope="row">' + no + '</th>'+
					'<td class="text-truncate">'+
						'<div class="navbar-custom-menu">'+
							'<ul class="nav navbar-nav">'+
								'<li class="dropdown user user-menu"> <a href="#" class="dropdown-toggle" data-toggle="dropdown"> <img src="'+uavatar+'"'+
										'class="user-image" alt="User Image" id="Ravatar"> <span class="hidden-xs" id="Rname">'+uname+'</span> </a>'+
								'</li>'+
							'</ul>'+
						'</div>'+
					'</td>'+
					'<td class="text-truncate">'+usersign+'</td>'+
					'<td class="text-truncate">'+usersex+'</td>'+
					'<td class="text-truncate">'+userbir+'</td>'+
					'<td class="text-truncate">'+uschool+'</td>'+
					'<td class="text-truncate">'+dynamic+'</td>'+
					'<td class="text-truncate">'+fans+'</td>'+
					'<td class="text-truncate">'+concern+'</td>'+
					'<td class="text-truncate">'+usermajor+'</td>'+
					'<td class="text-truncate">'+ugraduate+'</td>'+
					'<td class="text-truncate"><button class="btn btn-primary" type="button" onclick="goPage('+userid+')">修改</button></td>'+
			'</tr>'
	return div
}

/**
 * 判断是否在校生类型
 * 
 * @param {Object} type
 */
function istype(type){
	var typeStr;
	if(type == 1){
		typeStr = "在校生"
	}else if(type == 0){
		typeStr = "毕业生"
	}
	return typeStr;
}


/**
 * 跳转修改页面
 * 
 */
function goPage(userid) {
	window.location.href = 'Page.html?userid='+userid;
}