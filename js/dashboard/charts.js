$(function() {
	var dateaxis = null;
	var humidity = null;
	var temptureaxis = null;
	/**
	 * 获取温度数据
	 */
	mypost2(temperature, {
		date: getdataStr()
	}, function(data) {
		console.log(getdataStr())
		console.log(data)
		if(data.code == 200){
			var thiz = data.data
			dateaxis = thiz.dateaxis;
			humidity = thiz.humidity;
			temptureaxis = thiz.temptureaxis;
			drawcharts(dateaxis,humidity,temptureaxis)
		}else{
			var nullarr = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
			drawcharts(dateaxis,nullarr,nullarr)
		}
	})
})



/**
 * 获取日期 eg:20210204
 */
function getdataStr() {
	var nowDate = new Date();
	var year = nowDate.getFullYear();
	var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) :
		nowDate.getMonth() + 1;
	var day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate
		.getDate();
	var dateStr = year + month + day;
	return dateStr;
}



/**
 * 画表
 * 
 * @param {Object} dateaxis
 * @param {Object} humidity
 * @param {Object} temptureaxis
 */
function drawcharts(dateaxis,humidity,temptureaxis) {
	/**
	 * 绘制chart图
	 */
	"use strict";
	Highcharts.chart('container2', {
		chart: {
			zoomType: 'xy'
		},
		title: {
			text: '今日数据'
		},
		xAxis: [{
			categories: dateaxis,
			crosshair: true
		}],
		yAxis: [{ // Primary yAxis
			labels: {
				format: '{value}',
				style: {
					color: Highcharts.getOptions().colors[0]
				}
			},
			title: {
				text: '湿度',
				style: {
					color: Highcharts.getOptions().colors[0]
				}
			},
			opposite: false

		}, { // Secondary yAxis
			gridLineWidth: 0,
			title: {
				text: '',
				style: {
					color: Highcharts.getOptions().colors[0]
				}
			},
			labels: {
				format: '{value}',
				style: {
					color: Highcharts.getOptions().colors[0]
				}
			}
		}, { // Tertiary yAxis
			gridLineWidth: 0,
			title: {
				text: '温度',
				style: {
					color: Highcharts.getOptions().colors[1]
				}
			},
			labels: {
				format: '{value}',
				style: {
					color: Highcharts.getOptions().colors[1]
				}
			},
			opposite: false
		}],
		tooltip: {
			shared: true
		},
		legend: {
			layout: 'vertical',
			align: 'left',
			x: 120,
			verticalAlign: 'top',
			y: 20,
			floating: true,
			backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
		},
		series: [{
			name: '湿度',
			type: 'spline',
			yAxis: 2,
			data: humidity,
			marker: {
				enabled: false
			},
			dashStyle: 'shortdot',
			tooltip: {}
		}, {
			name: '温度',
			type: 'spline',
			data: temptureaxis,
			tooltip: {}
		}]
	});
}