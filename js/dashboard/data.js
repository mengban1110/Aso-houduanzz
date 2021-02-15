/**
 * 主要数据展示
 */
$(function() {
	var token = getCookie("token")
	console.log(token)
	mypost(homepageinfo, {
		token: token
	}, function(data) {
		console.log(getCookie("token"))
		console.log(data)
		if (data.code == 200) {
			var thiz = data.data

			var managername = thiz.managername //管理员名字
			var manageravatar = thiz.manageravatar //管理员头像url地址

			var servermemory = thiz.servermemory //服务器内存
			var z1 = servermemory.split("/")[0];
			var index = z1.indexOf("m");
			var temp = z1.substring(0,index)/1024
			var zz1 = temp.toFixed(1) + "GB";
			
			var z2 = servermemory.split("/")[1];
			var index2 = z2.indexOf("m");
			var temp2 = z2.substring(0,index)/1024
			var zz2 = temp2.toFixed(1) + "GB";
			
			servermemory = zz2+"/"+zz1
			
			
			var serverjavaversion = thiz.serverjavaversion //服务器Java版本
			var serveros = thiz.serveros //服务器系统版本
			var serverruntime = thiz.serverruntime //服务器运行时间
			var servercores = thiz.servercores //服务器核数
			var serverthreads = thiz.serverthreads //服务器线程数

			var goods = thiz.countinfo.goods //商品数量
			var user = thiz.countinfo.user //注册用户数
			var posts = thiz.countinfo.posts //帖子总数
			var audits = thiz.countinfo.audits //待审核评论数

			var userlogs = thiz.userlogs //用户最近操作数组
			var hotwords = thiz.hotwords //用户最近操作数组 

			//左右上角管理员头像
			$("#Rname").text(managername)
			$("#Ravatar").attr('src', manageravatar)
			$("#Lname").text(managername)
			$("#Lavatar").attr('src', manageravatar)
			
			/**
			 * 首次储存managername,manageravatar到cookie中
			 */
			addCookie("managername",managername,1)
			addCookie("manageravatar",manageravatar,1)

			$("#goods").text(goods)
			$("#user").text(user)
			$("#posts").text(posts)
			$("#audits").text(audits)

			$("#servermemory").text(servermemory)
			$("#serverjavaversion").text(serverjavaversion)
			$("#serveros").text(serveros)
			$("#serverruntime").text(serverruntime)
			$("#servercores").text(servercores)
			$("#serverthreads").text(serverthreads)

			var clazzArr = ["sl-success", "sl-danger"]
			var flag = true;
			userlogs.forEach(item => {//动态生成最近用户操作历史
				var ip = item.ip //ip
				var time = timestampToTime(item.time/1000); //time
				var content = item.content //content
				var username = item.username //username
				
				/**
				 * 返回交替颜色
				 */
				var numFlag = (flag == true) ? 1 : 0;
				flag = !flag
				$("#user-box").append(addUserdiv(ip, time, content, username, clazzArr[numFlag]))
			})
			
			hotwords.forEach(item => {//动态生成热词搜索榜
				$("#hotword-box").append(addHotworda(item))
			})

		} else {
			alert("请重新登录验证身份!")
			window.location.href="../../index.html";
		}
	})
})

/**
 * 动态生成 最近用户操作历史
 * 
 * @param {Object} ip
 * @param {Object} time
 * @param {Object} content
 * @param {Object} username
 * @param {Object} color
 */
function addUserdiv(ip, time, content, username, color) {
	var div = '<div class="sl-item ' + color + '">' +
		'<div class="sl-content"><small class="text-muted"><i class="fa fa-user position-left"></i>' + username + '_ip:' + ip +
		'</small>' +
		'<p>' + content + '_' + time + '</p>' +
		'</div>' +
		'</div>'
	return div
}

/**
 * 动态生成 热词搜索榜
 * 
 * @param {Object} hotword
 */
function addHotworda(hotword) {
	var a = '<a href="#">'+
				'<span class="profile-status invisable pull-right"></span>'+
				'<div class="mail-contnet">'+
					'<span class="mail-desc">'+hotword+'</span>'+
				'</div>'+
			'</a>'
	return a
}

/**
 * 返回限制内随机数
 * 
 * @param {Object} min
 * @param {Object} max
 */
function randomNum(min, max) {
	return Math.floor(Math.random() * (max - min)) + min
}


/**
 * 时间戳转换日期 console.log(timestampToTime(1403058804)); //2014-06-18 10:33:24
 * @param {Object} timestamp
 */
function timestampToTime(timestamp) {
	var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
	var Y = date.getFullYear() + '-';
	var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	var D = date.getDate() + ' ';
	var h = date.getHours() + ':';
	var m = date.getMinutes() + ':';
	var s = date.getSeconds();
	return Y + M + D + h + m + s;
}