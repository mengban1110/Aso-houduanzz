$(function() {
	// alert(getCookie("token"))
	getinfo()
})

/**
 * 获取帖子信息
 */
function getinfo() {
	mypost(getPostsInfo, {
		token: getCookie("token")
	}, function(data) {
		console.log(data)
		if (data.code == 200) {
			var count = 1;
			data.data.forEach(item => {
				var temp = count++;
				$("tbody").append(add(temp, item.type, item.posttext, item.postimg, item.postvideo, item.createtime,
					item.postid, item.placa.placaname, item.userinfo.uname, item.userinfo.useravatar))
			})
		} else if (data.code == -1) {
			alert("暂无数据!")
		} else {
			alert("请重新登录验证身份!")
			window.location.href = "../../index.html";
		}
	})
}

/**
 * 条件查询
 */
function search() {

	$("#tbody").empty()

	if ($("#placeholderInput").val().length == 0) {
		getinfo()
	} else {
		mypost(getPostsInfoPart, {
			token: getCookie("token"),
			word: $("#placeholderInput").val()
		}, function(data) {
			console.log(data)
			if (data.code == 200) {
				var count = 1;
				data.data.forEach(item => {
					var temp = count++;
					$("tbody").append(add(temp, item.type, item.posttext, item.postimg, item.postvideo, item.createtime,
						item.postid, item.placa.placaname, item.userinfo.uname, item.userinfo.useravatar))
				})
			} else if (data.code == -1) {
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
 * 动态生成帖子数据
 * 
 * @param {Object} no
 * @param {Object} type 帖子类型
 * @param {Object} posttext
 * @param {Object} postimg
 * @param {Object} postvideo
 * @param {Object} createtime
 * @param {Object} postid
 * @param {Object} placaname
 * @param {Object} uname
 * @param {Object} uavatar
 */
function add(no, type, posttext, postimg, postvideo, createtime, postid, placaname, uname, uavatar) {


	var type = istype(type) //帖子类型

	var postimg = toArrSrc(postimg) //将图片地址转换为数组
	var imgFlag = openimgDiv(postimg) //动态返回查看图片按钮状态

	var videoFlag = openvideoDiv(postvideo) //动态返回查看视频按钮状态

	var div = '<tr>' +
		'<th scope="row">' + no + '</th>' +
		'<td class="text-truncate">' + placaname + '</td>' +
		'<td class="text-truncate">' + type + '</td>' +
		'<td class="text-truncate">' + posttext + '</td>' +
		'<td class="text-truncate">' + imgFlag + '</td>' +
		'<td class="text-truncate">' + videoFlag + '</td>' +
		'<td class="text-truncate">' + createtime + '</td>' +
		'<td class="text-truncate">' +
		'<div class="navbar-custom-menu">' +
		'<ul class="nav navbar-nav">' +
		'<li class="dropdown user user-menu"> <a href="#" class="dropdown-toggle" data-toggle="dropdown"> <img src="' +
		uavatar + '"' +
		'class="user-image" alt="User Image" id="Ravatar"> <span class="hidden-xs" id="Rname">' + uname + '</span> </a>' +
		'</li>' +
		'</ul>' +
		'</div>' +
		'</td>' +
		'<td class="text-truncate"><button class="btn btn-danger" type="button" onclick="delPost(' + postid +
		')">删除</button></td>' +
		'</tr>'
	return div
}

/**
 * 判断帖子类型
 * 
 * @param {Object} type
 */
function istype(type) {
	var typeStr;
	if (type == 1) {
		typeStr = "文字帖"
	} else if (type == 2) {
		typeStr = "图片帖"
	} else {
		typeStr = "视频帖"
	}
	return typeStr;
}

/**
 * 动态返回查看图片按钮状态
 * 
 * @param {Object} postimg
 */
function openimgDiv(postimg) {
	console.log("openimgDiv : " + postimg + " , " + postimg.length)
	console.log(' 2'.replace(/(^s*)|(s*$)/g, "").length)
	if (!isNull(postimg) && postimg.length != 0 && postimg[0] != undefined) {

		var label = parseArrSrcToLi(postimg)

		var div = '<div class="btn-group">' +
			'<button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true"' +
			'aria-expanded="false">查看图片 ( ' + postimg.length + ' 张 ) <span class="caret"></span></button>' +
			'<ul class="dropdown-menu">' +
			label +
			'<li role="separator" class="divider"></li>' +
			'<li><a onclick="openImg(\'' + postimg + '\')">查看全部</a></li>' +
			'</ul>' +
			'</div>'
	} else {
		var div = '<div class="btn-group">' +
			'<button type="button" class="btn btn-primary btn-outline dropdown-toggle" data-toggle="dropdown" aria-haspopup="true"' +
			'aria-expanded="false">暂无图片 <span class="caret"></span></button>' +
			'<ul class="dropdown-menu">' +
			'<li role="separator" class="divider"></li>' +
			'<li>别看啦 没有图片</li>' +
			'</ul>' +
			'</div>'
	}

	return div
}

/**
 * 判断是否为空格
 */
function isNull(str) {
	if (str == "") return true;
	var regu = "^[ ]+$";
	var re = new RegExp(regu);
	return re.test(str);
}

/**
 * 将图片链接动态展示出来
 * 
 * @param {Object} postimg
 */
function parseArrSrcToLi(postimg) {
	var label = "";

	var count = 1;
	postimg.forEach(item => {
		var temp = '<li><a href="' + item + '" target="_blank">第' + count + '张图片</a></li>'
		label += temp
		count++;
	})

	console.log(label)

	return label;
}

/**
 * 将图片地址转换成数组对象
 * 
 * @param {Object} postimg
 */
function toArrSrc(postimg) {
	if (postimg != null && postimg.indexOf("[") == 0) {
		var arr = JSON.parse(postimg);
	} else {
		var arr = []
		arr.push(postimg)
	}
	return arr
}

/**
 * 查看帖子图片
 * 
 * @param {Object} postimg
 */
function openImg(postimgs) {
	var arr = postimgs.split(',')
	console.log(arr)
	arr.forEach(item => {
		window.open(item);
	})
	alert("已显示 " + arr.length + " 张图片")
}











/**
 * 动态返回查看视频按钮状态
 * 
 * @param {Object} postimg
 */
function openvideoDiv(Video) {
	if (!isNull(Video) && Video != undefined) {
		var div = '<button class="btn btn-primary" type="button" onclick="openVideo(\'' + Video + '\')">查看视频</button>'
	} else {

		var div = '<button class="btn btn-primary btn-outline" type="button">暂无视频</button>'
	}
	return div
}



/**
 * 查看帖子视频
 * 
 * @param {Object} postimg
 */
function openVideo(video) {
	window.open(video);
}














/**
 * 删除指定帖子
 * 
 * @param {Object} no
 */
function delPost(no) {
	mypost(delPostsInfo, {
		token: getCookie("token"),
		postid: no
	}, function(data) {
		alert("删除成功")
		location.reload(true)
	})
}
