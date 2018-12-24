var default_serialNo; //默认的单号
var timeState = true;
var answerJson; //整个答案
var dataHtml = ''; //日期选择返回的列表
function loadBossCashFlow(data) {
	answerJson = jsonForm(data[1]);
	if (answerJson.serialNo.serialNo != undefined) {
		default_serialNo = answerJson.serialNo.serialNo; //单号
	} else {
		default_serialNo = null;
	}
	var e = answerJson.bossCashFlowModel.bossCashFlowMain; //月份区间、输入顺序、期初或期末金额、备注
	var f = answerJson.bossCashFlowModel.bossCashFlowDetails; //流入、流出表格
	create_bossCash(e, f); //调用创建函数
	cashFlowFun.cashInto(f);
	spanClick();
	date_scoll(40, 200);
}

//创建Html页面
function create_bossCash(e, f) {
	if (e != null) {
		if (e.beginDate != null && e.endDate != null && e.endDate != '' && e.beginDate != '') {
			$('.old-time').val(e.beginDate).css('color', '#191919');
			$('.new-time').val(e.endDate).css('color', '#191919');
			$('.new-time').parent().prev().children('i').css('color', '#a0a0a5');
			$('.time-con-show').show();
			var yearArr = e.beginDate.split('-');
			var yearArr1 = e.endDate.split('-');
			var three_list = yearArr[0] + '年' + yearArr[1] + '月';
			var end_list = yearArr1[0] + '年' + yearArr1[1] + '月';
			var timeStamp1 = (Date.parse(new Date(e.beginDate))) / 1000; //第一个时间框时间戳
			var timeStamp2 = (Date.parse(new Date(e.endDate))) / 1000; //第2个时间框时间戳
			dataHtml = timeListHtml(e.beginDate, e.endDate, timeStamp1, timeStamp2);
			if (e.type == 1) { //期初
				$('.sr-order').text('期初现金').css('color', '#191919');
				$('.sr-order').parent().prev().children('i').css('color', '#a0a0a5');
				$('.sr-order').attr('type', 1);
				$('.three_list').parent().next().children('input').val(e.amount).css('color', '#191919');;
				$('.three_list').text(three_list + '期初现金');
				$('.end_list').text(end_list + '期末现金');
				$('.three_list').parent().next().children('input').attr('id', 'initialMoney');
				$('.end_list').parent().next().children('input').attr('id', 'endMoney');
			} else { //期末
				$('.sr-order').text('期末现金').css('color', '#191919');
				$('.sr-order').parent().prev().children('i').css('color', '#a0a0a5');
				$('.sr-order').attr('type', 2);
				$('.three_list').text(end_list + '期末现金');
				$('.end_list').text(three_list + '期初现金');
				$('.three_list').parent().next().children('input').val(e.amount);
				$('.three_list').parent().next().children('input').attr('id', 'endMoney');
				$('.end_list').parent().next().children('input').attr('id', 'initialMoney');
			}
			if (f.length > 0) { //列表展示
				var inFlowArrList = []; //流入项数组
				var outFlowArrList = []; //流出项数组
				for (var i = 0; i < f.length; i++) {
					if (f[i].type == 1) {
						inFlowArrList.push(f[i]);
					} else {
						outFlowArrList.push(f[i]);
					}
				}
				var inData = arrGroup(inFlowArrList, 'lineNo', 6);
				var outData = arrGroup(outFlowArrList, 'lineNo', 6);
				var arrNameIn=[];
				var arrNameOut=[];
				for (var t = 0; t < inData.length; t++) { //创建流入项
					if (arrVal(inData[t].name,arrNameIn)) {
						inData.splice(t, 1);
						t = t - 1;
					} else {
						arrNameIn.push(inData[t].name);
						createFlow(inData[t], t, 'inflow');
					}
				}

				for (var k = 0; k < outData.length; k++) { //创建流出项
					if (arrVal(outData[k].name,arrNameOut)) {
						outData.splice(k, 1);
						k= k - 1;
					} else {
						arrNameIn.push(outData[k].name);
						createFlow(outData[k], k, 'outflow');
					}
				}
			}
		} else { //当日期为空时
			emptyHtml();
		}
		if (e.remark != null) {
			$('.txt textarea').text(e.remark);
		}
	} else { //当日期为空时
		emptyHtml();
	}
}

function emptyHtml() { //当没有答案数据时
	$('.inflow').append('<span class="bg" data-list="item0">页签</span>');
	var html = '<div class="tab-con tab-income" data-list="item0">' +
		'<p name="name"><i style="color:red;">*</i><span>流入项</span>' +
		'<input type="text" class="inflow-input" placeholder="请输入" style="color: rgb(160, 160, 165);" >' +
		'</p>' +
		'<ul class="tab" data-list="item0">' +
		'</ul>' +
		'</div>' +
		'</div>';
	$('.in-table').append(html);
	$('.outflow').append('<span class="bg" data-list="item0">页签</span>');
	var html = '<div class="tab-con tab-outcome" data-list="item0">' +
		'<p name="name"><i style="color:red;">*</i><span>流出项</span>' +
		'<input type="text" class="outflow-input" placeholder="请输入" style="color: rgb(160, 160, 165);" >' +
		'</p>' +
		'<ul class="tab" data-list="item0">' +
		'</ul>' +
		'</div>' +
		'</div>';
	$('.out-table').append(html);
}

/**
 * 创建流入、流出表格
 * @param {Object} dataList 数据
 * @param {Object} i
 */
function createFlow(dataList, i, modelType) { //当答案传入时创建流出项
	var flowClass = '',
		flowName = '',
		flowInput = '',
		flowTab = '',
		flowNav = '';
	if (modelType == 'inflow') { //流入项
		flowClass = 'tab-income';
		flowName = '流入项';
		flowInput = 'inflow-input';
		flowTab = $('.in-table');
		flowNav = $('.inflow');
	} else { //流出项
		flowClass = 'tab-outcome';
		flowName = '流出项';
		flowInput = 'outflow-input';
		flowTab = $('.out-table');
		flowNav = $('.outflow');
	}
	var $li = dataList.data;
	var liHtml = '';
	for (var j = 0; j < $li.length; j++) {
		liHtml += '<li><span name="date">' + $li[j].date + '</span><input type="number" value="' + $li[j].amount + '" name="amount"></li>';
	}
	var showModel = '';
	if (i == 0) {
		showModel = 'display:block';
		flowNav.append('<span class="bg" data-list="item' + i + '">' + dataList.name + '</span>');
	} else {
		showModel = 'display:none';
		flowNav.append('<span data-list="item' + i + '">' + dataList.name + '</span>');
	}

	var html = '<div style="' + showModel + '" class="tab-con ' + flowClass + '" data-list="item' + i + '">' +
		'<p name="name"><i style="color:red;">*</i><span>' + flowName + '</span>' +
		'<input type="text" class="' + flowInput + '" value="' + dataList.name + '" placeholder="请输入" >' +
		'</p>' +
		'<ul class="tab" data-list="item' + i + '" lineNo="' + dataList.lineNo + '"><li class="tab-title"><span>月份</span><span>金额</span></li>' +
		liHtml +
		'</ul>' +
		'</div>' +
		'</div>';
	flowTab.append(html);
	if (modelType == 'inflow') {
		inMoney();
	} else {
		outMoney();
	}
}
var cashFlowFun = {
	/**
	 * cashInto()方法
	 * 时间区间选择
	 * 当日期区间选择后显示其他选项
	 */
	cashInto: function(f) {
		//日期区间选择
		$(document).on('change keyup', '.time-on', function() {
			cashFlowFun.checkTime($('.time-on'), f);
		});
		//流入项顺序选择
		$(document).on('click', '.sr-order', function() {
			tc_mask();
		});
		//计算流入项和
		$(document).on('change keyup', '.tab-income li input', function() {
			inMoney();
		});
		//计算流出项和
		$(document).on('change keyup', '.tab-outcome li input', function() {
			outMoney();
		});
		$(document).on('change keyup', '.start-money', function() {
			outMoney();
		});
		//input输入框输入时验证
		$(document).on('change keyup', '.tab-con input', function() {
			flowValidate();
		});
		//流入项页签
		$(document).on('blur change', '.inflow-input', function() { //动态显示输入的页签
				var nowVal = $(this).val();
				var tagArr = [];
				$('.inflow-input').each(function() {
					tagArr.push($(this).val());
				})
				if (isRepeat(tagArr)) {
					$(this).after('<label class="verify-error">不能输入相同流入项!</label>');
					$(this).val('');
				} else {
					$('.inflow span.bg').text(nowVal);
					$(this).css('color', '#191919');
				}
			})
			//流出项页签
		$(document).on('blur change', '.outflow-input', function() { //动态显示输入的页签
				var nowVal = $(this).val();
				var tagArr = [];
				$('.outflow-input').each(function() {
					tagArr.push($(this).val());
				})
				if (isRepeat(tagArr)) {
					$(this).after('<label class="verify-error">不能输入相同流出项!</label>');
					$(this).val('');
				} else {
					$('.outflow span.bg').text(nowVal);
					$(this).css('color', '#191919');
				}
			})
			//添加页签
		$(document).on('click', '.inAdd .add-icon', function() {
			var len = new Date().getTime(); //时间戳
			cashFlowFun.addInFlowTab(len);
		});
		$(document).on('click', '.outAdd .add-icon', function() {
			var len = new Date().getTime(); //时间戳
			cashFlowFun.addOutFlowTab(len);
		});
		//删除页签
		$(document).on('click', '.inAdd .del-icon', function() {
			cashFlowFun.delInFlowDom();
		});
		$(document).on('click', '.outAdd .del-icon', function() {
			cashFlowFun.delOutFlowDom();
		})
	},
	checkTime: function(_th, f) {
		var oldTime = $('.old-time');
		var newTime = $('.new-time');
		if (oldTime.val() != '' && newTime.val() != '') {
			if (pTime(f)) {
				_th.css('color', '#191919');
				$('#demo_date1').parent().prev().find('i').css('color', '#a0a0a5');
				$('.time-con-show').show();
				var Time1 = oldTime.val();
				var Time2 = newTime.val();
				var arrTime1 = Time1.split('-');
				var arrTime2 = Time2.split('-');
				var arrText1 = arrTime1[0] + '年' + arrTime1[1] + '日';
				var arrText2 = arrTime2[0] + '年' + arrTime2[1] + '日';
				if ($('.sr-order').attr('type') == 1) {
					$('.three_list').text(arrText1 + '期初现金');
					$('.end_list').text(arrText2 + '期末现金');
				} else if ($('.sr-order').attr('type') == 2) {
					$('.three_list').text(arrText2 + '期末现金');
					$('.end_list').text(arrText1 + '期初现金');
				} else {
					$('.three_list').text(arrText1 + '期初现金');
					$('.end_list').text(arrText2 + '期末现金');
				}
				$('.time-error').remove();
				$(this).parent().siblings('.verify-error').remove();
			} else {
				//				$('.run-item').remove();
			}
		}
	},
	addInFlowTab: function(num) {
		$('.tab-income').hide();
		$('.inflow span').removeClass('bg');
		$('.inflow').append('<span class="bg" data-list="item' + num + '">页签</span>');
		var html = '<div class="tab-con tab-income" data-list="item' + num + '">' +
			'<p name="name"><i style="color:red;">*</i><span>流入项</span>' +
			'<input type="text" class="inflow-input" placeholder="请输入" style="color: rgb(160, 160, 165);" >' +
			'</p>' +
			'<ul class="tab" data-list="item' + num + '">' +
			dataHtml.inflowHtml +
			'</ul>' +
			'</div>' +
			'</div>';
		$('.in-table').append(html);
	},
	addOutFlowTab: function(num) {
		$('.tab-outcome').hide();
		$('.outflow span').removeClass('bg');
		$('.outflow').append('<span class="bg" data-list="item' + num + '">页签</span>');
		var html = '<div class="tab-con tab-outcome" data-list="item' + num + '">' +
			'<p name="name"><i style="color:red;">*</i><span>流出项</span>' +
			'<input type="text" class="outflow-input" placeholder="请输入" style="color: rgb(160, 160, 165);" >' +
			'</p>' +
			'<ul class="tab" data-list="item' + num + '">' +
			dataHtml.outflowHtml +
			'</ul>' +
			'</div>' +
			'</div>';
		$('.out-table').append(html);
	},
	delInFlowDom: function() {
		var spanLen = $('.inflow span');
		for (var i = 0; i < spanLen.length; i++) {
			$('<i class="tab-colse" name="' + i + '"></i>').appendTo(spanLen.eq(i));
		}
		$(document).on('click', '.tab-con', function() {
			$('.tab-colse').remove();
		});

		$('.tab-colse').unbind("click").click(function() {
			var _th = $(this);
			var del = '';
			del += '<div id="mask"><div class="mask_bg"></div><div class="remove">';
			del += '<p class="_sc">您确认要删除吗？<img class="_ci" src="img/close_icon.png"/><p class="_qr">确认</p></div></div>';
			$(del).appendTo('body');
			$('._ci').click(function() {
				$('#mask').remove();
				$('.tab-colse').remove();
			});
			$('._qr').click(function() {
				$('#mask').remove();
				_th.parent().remove();
				$('.tab-colse').remove();
				var delNum = _th.parent().attr('data-list');
				$('.tab-income[data-list="' + delNum + '"]').remove();
				$('.tab-income').eq(0).show();
				$('.inflow span').eq(0).addClass('bg');
				inMoney();
			});
		});
	},
	delOutFlowDom: function() {
		var spanLen = $('.outflow span');
		for (var i = 0; i < spanLen.length; i++) {
			$('<i class="tab-colse" name="' + i + '"></i>').appendTo(spanLen.eq(i));
		}
		$(document).on('click', '.tab-con', function() {
			$('.tab-colse').remove();
		});

		$('.tab-colse').unbind("click").click(function() {
			var _th = $(this);
			var del = '';
			del += '<div id="mask"><div class="mask_bg"></div><div class="remove">';
			del += '<p class="_sc">您确认要删除吗？<img class="_ci" src="img/close_icon.png"/><p class="_qr">确认</p></div></div>';
			$(del).appendTo('body');
			$('._ci').click(function() {
				$('#mask').remove();
				$('.tab-colse').remove();
			});
			$('._qr').click(function() {
				$('#mask').remove();
				_th.parent().remove();
				$('.tab-colse').remove();
				var delNum = _th.parent().attr('data-list');
				$('.tab-outcome[data-list="' + delNum + '"]').remove();
				$('.tab-outcome').eq(0).show();
				$('.outflow span').eq(0).addClass('bg');
				outMoney();
			});
		});
	},
	getAll: function() {
		var oldT = $('.old-time').val();
		var newT = $('.new-time').val();
		var json_1 = {};
		var tabList = [];
		if (oldT == '' && newT == '') {
			json_1 = null;
			tabList = [];
		} else {

			if (timeState) {
				json_1 = {
					amount: $('.start-money').val(),
					beginDate: oldT,
					endDate: newT,
					remark: $('.txt textarea').val(),
					type: $('.sr-order').attr('type'),
					serialNo: default_serialNo
				};
			} else {
				json_1 = null;
			}

			$('.tab-outcome').each(function() { //流出项答案
				var index = $(this).index();
				var name = $(this).find('.outflow-input').val();
				var $li = $(this).find('.tab').children('li');
				for (var i = 1; i < $li.length; i++) {
					var date = $li.eq(i).children('span').text();
					var amount = $li.eq(i).children('input').val();
					var liJson = {
						"serialNo": default_serialNo,
						"name": name,
						"date": date,
						"amount": amount,
						"type": "2",
						"lineNo": index
					};
					tabList.push(liJson);
				}
			});

			$('.tab-income').each(function() { //流入项答案
				var index = $(this).index();
				var name = $(this).find('.inflow-input').val();
				var $li = $(this).find('.tab').children('li');
				for (var i = 1; i < $li.length; i++) {
					var date = $li.eq(i).children('span').text();
					var amount = $li.eq(i).children('input').val();
					var liJson = {
						"serialNo": default_serialNo,
						"name": name,
						"date": date,
						"amount": amount,
						"type": "1",
						"lineNo": index
					};
					tabList.push(liJson);
				}
			});
		}

		if (tabList.length == 0 || json_1 == null) {
			json_1 = null;
			tabList = [];
		}

		var data = {
			list_1: json_1,
			list_2: tabList
		};
		return data;
	}

}

function tc_mask() { //输入顺序选择
	var mask = '';
	mask += '<div id="t-mask"><div class="mask-bg"></div><div class="mask-con">';
	mask += '<div class="info-con"><ul><li name="1">期初现金</li><li name="2">期末现金</li><li class="cancel">取消</li></ul></div></div></div>';
	$(mask).appendTo('body');
	$('.info-con li').not('.cancel').click(function() {
		var Val = $(this).text();
		$('.list-right .code-list').text(Val).css('color', '#191919');
		$('.list-right .code-list').attr('type', $(this).attr('name'));
		$('.list-right .code-list').parent().prev().children('i').css('color', '#A0A0A5');
		if ($(this).attr('name') == 1) { //选择期初
			var endNum = $('#endMoney').val();
			$('.start-money').val($('#initialMoney').val());
			var nextVal = $(this).next().text();
			var yearArr = $('.old-time').val().split('-');
			var yearArr1 = $('.new-time').val().split('-');
			var three_list = yearArr[0] + '年' + yearArr[1] + '月' + Val;
			var end_list = yearArr1[0] + '年' + yearArr1[1] + '月' + nextVal;
			$('.three_list').text(three_list);
			$('.three_list').parent().next().children('input').attr('id', 'initialMoney');
			$('.end_list').text(end_list);
			$('.end_list').parent().next().children('input').attr('id', 'endMoney').val(endNum);
			$('.end_list').parent().next().children('input').attr('disabled', 'disabled');
			$(document).on('keyup change', '#initialMoney', function() {
				$(this).css('color', '#191919');
				$(this).parent().prev().find('i').css('color', '#A0A0A5');
				var $income = $('.inSum').val();
				var $outcome = $('.outSum').val();
				var $initialMoney = $('#initialMoney').val();
				var $endMoney = 0;
				$endMoney = Number($initialMoney) + Number($income) - Number($outcome);
				$('#endMoney').val($endMoney);
			})
		} else if ($(this).attr('name') == 2) { //选择期末
			var startNum = $('#initialMoney').val();
			$('.start-money').val($('#endMoney').val());
			var preVal = $(this).prev().text();
			var yearArr1 = $('.old-time').val().split('-');
			var yearArr = $('.new-time').val().split('-');
			var three_list = yearArr[0] + '年' + yearArr[1] + '月' + Val;
			var end_list = yearArr1[0] + '年' + yearArr1[1] + '月' + preVal;
			$('.three_list').text(three_list);
			$('.three_list').parent().next().children('input').attr('id', 'endMoney');
			$('.end_list').text(end_list);
			$('.end_list').parent().next().children('input').attr('id', 'initialMoney').val(startNum);
			$('.end_list').parent().next().children('input').attr('disabled', 'disabled');
			$(document).on('keyup change', '#endMoney', function() {
				$(this).css('color', '#191919');
				$(this).parent().prev().find('i').css('color', '#A0A0A5');
				var $income = $('.inSum').val();
				var $outcome = $('.outSum').val();
				var $endMoney = $('#endMoney').val();
				var $initialMoney = 0;
				$initialMoney = Number($endMoney) + Number($outcome) - Number($income);
				console.log($initialMoney)
				$('#initialMoney').val($initialMoney);
			})
		}

		$('#t-mask').remove();
	});
	$('.info-con li.cancel').click(function() {
		$('#t-mask').remove();
	})
}
/**
 * 页签span点击事件
 * 切换页签显示数据
 */
function spanClick() {
	$(document).on('click', '.inflow span', function() {
		$('.inflow span').removeClass('bg');
		$(this).addClass('bg');
		$('.tab-income').hide();
		$('.tab-income').eq($(this).index()).show();
	});

	$(document).on('click', '.outflow span', function() {
		$('.outflow span').removeClass('bg');
		$(this).addClass('bg');
		$('.tab-outcome').hide();
		$('.tab-outcome').eq($(this).index()).show();
	});
}

function pTime(f) { //日期选择函数
	var oldTime = $('.old-time');
	var newTime = $('.new-time');
	$('.old-time').css('color', '#191919');
	$('.new-time').css('color', '#191919');
	$('.old-time').parent().prev().children('i').css('color', '#a0a0a5');
	var strTime1 = oldTime.val(); //传入的日期
	var strTime2 = newTime.val(); //传入的日期
	var timeStamp1 = (Date.parse(new Date(strTime1))) / 1000; //第一个时间框时间戳
	var timeStamp2 = (Date.parse(new Date(strTime2))) / 1000; //第2个时间框时间戳
	var d_time = (timeStamp2 - timeStamp1); //时间戳差值
	if (timeStamp1 > timeStamp2) {
		//		alert('时间区间选择不正确！请重新选择！');
		$('.time-btn').parent().append('<label class="time-error">时间区间选择不正确！请重新选择！</label>')
		newTime.select();
		timeState = false;
		return false;
	} else if (parseInt(d_time) > parseInt(63330000)) {
		//		alert('时间区间选择范围超出！请重新选择！');
		$('.time-btn').parent().append('<label class="time-error">时间区间选择范围超出！请重新选择！</label>')
		newTime.select();
		timeState = false;
		return false;
	} else { //显示数据列表
		$('.out-table .tab li').remove();
		$('.in-table .tab li').remove();
		dataHtml = timeListHtml(strTime1, strTime2, timeStamp1, timeStamp2);
		$('.in-table .tab').append(dataHtml.inflowHtml);
		$('.out-table .tab').append(dataHtml.outflowHtml);
		$('.time-error').remove();

		if (f.length > 0) { //如果有相同的自动带出
			var inTab = $('.tab-income .tab');
			var outTab = $('.tab-outcome .tab');
			inTab.each(function() { //流入项如果有值自动带出
				$liIn = $(this).children('li');
				for (var i = 0; i < $liIn.length; i++) {
					for (var j = 0; j < f.length; j++) {
						if (f[j].type == 1 && f[j].lineNo == $(this).attr('lineNo')) {
							if ($liIn.eq(i).children('span').text() == f[j].date) {
								$liIn.eq(i).children('input').val(f[j].amount);
							}
						}
					}
				}
				inMoney();
			});

			outTab.each(function() { //流出项如果有值自动带出
				$liout = $(this).children('li');
				for (var i = 0; i < $liout.length; i++) {
					for (var j = 0; j < f.length; j++) {
						if (f[j].type == 2 && f[j].lineNo == $(this).attr('lineNo')) {
							if ($liout.eq(i).children('span').text() == f[j].date) {
								$liout.eq(i).children('input').val(f[j].amount);
							}
						}
					}
				}
				outMoney();
			});
		}
		timeState = true;
		return true;
	}
}

/**
 * 当日期区间选择正确时显示列表
 * @param {Object} strTime1 开始日期
 * @param {Object} strTime2 结束日期
 * @param {Object} timeStamp1 时间戳
 * @param {Object} timeStamp2
 */
function timeListHtml(strTime1, strTime2, timeStamp1, timeStamp2) {
	var lr_html = '';
	lr_html += '<li class="tab-title"><span>月份</span><span>金额</span></li>';
	var out_html = '';
	out_html += '<li class="tab-title"><span>月份</span><span>金额</span></li>';
	var dateTime = (Number(timeStamp1)) * 1000;
	var dateTime2 = (Number(timeStamp2)) * 1000;
	var arr1 = strTime1.split('-');
	var arr2 = strTime2.split('-');
	var D_value = (arr2[0] - arr1[0]);
	var Month = 0;
	var showYear;
	if (D_value == 0) { //年份相同
		var monthLen = parseInt(arr2[1]) - parseInt(arr1[1]);
		for (var i = 0; i <= monthLen; i++) {
			Month = parseInt(arr1[1]) + i;
			if (Month > 9) {
				showYear = arr2[0] + '-' + Month;
			} else {
				showYear = arr2[0] + '-0' + Month;
			}
			lr_html += '<li code="' + i + '"><span name="date">' + showYear + '</span><input type="number" value="0" name="amount"></li>';
			out_html += '<li code="' + i + '"><span name="date">' + showYear + '</span><input type="number" value="0"  name="amount"></li>';
		}
	}
	if (D_value == 1) { //年份相差1年
		var monthLen = (12 - parseInt(arr1[1])) + parseInt(arr2[1]);
		for (var i = 0; i <= monthLen; i++) {
			Month = parseInt(arr1[1]) + i;
			if (Month > 12) {
				Month = Month - 12;
				if (Month > 9) {
					showYear = arr2[0] + '-' + Month;
				} else {
					showYear = arr2[0] + '-0' + Month;
				}
			} else {
				if (Month > 9) {
					showYear = arr1[0] + '-' + Month;
				} else {
					showYear = arr1[0] + '-0' + Month;
				}
			}
			lr_html += '<li code="' + i + '"><span name="date">' + showYear + '</span><input type="number" value="0" name="amount"></li>';
			out_html += '<li code="' + i + '"><span name="date">' + showYear + '</span><input type="number" value="0" name="amount"></li>';
		}
	}
	if (D_value == 2) { //年份相差2年
		var monthLen = (12 - parseInt(arr1[1])) + parseInt(arr2[1]) + 12;
		for (var i = 0; i <= monthLen; i++) {
			Month = parseInt(arr1[1]) + i;
			if (Month > 12 && Month <= 24) {
				Month = Month - 12;
				if (Month > 9) {
					showYear = (parseInt(arr1[0]) + 1) + '-' + Month;
				} else {
					showYear = (parseInt(arr1[0]) + 1) + '-0' + Month;
				}
			} else if (Month > 24) {
				Month = Month - 24;
				if (Month > 9) {
					showYear = arr2[0] + '-' + Month;
				} else {
					showYear = arr2[0] + '-0' + Month;
				}
			} else {
				if (Month > 9) {
					showYear = arr1[0] + '-' + Month;
				} else {
					showYear = arr1[0] + '-0' + Month;
				}
			}

			lr_html += '<li code="' + i + '"><span name="date">' + showYear + '</span><input type="number" value="0" name="amount"></li>';
			out_html += '<li code="' + i + '"><span name="date">' + showYear + '</span><input type="number" value="0" name="amount"></li>';
		}
	}
	var listHtml = {
		inflowHtml: lr_html,
		outflowHtml: out_html,
	};
	return listHtml;
}

function sum(inm, outm) {
	var initialMoney; //期初现金
	var endMoney; //期末
	if ($('.sr-order').attr('type') == 1) {
		initialMoney = $('#initialMoney').val()
		endMoney = Number(initialMoney) + Number(inm) - Number(outm); //期初现金
		//		alert(initialMoney)
	} else {
		initialMoney = $('#initialMoney').val(); //期初金额
		endMoney = Number(initialMoney) + Number(inm) - Number(outm); //期末金额
	}
	$('#endMoney').val(toDecimal(endMoney));
	$('#initialMoney').val(toDecimal(initialMoney));
}

function inMoney() { //计算流入
	var inSum = 0;
	$('.tab-income li input').each(function() {
		inSum += Number($(this).val());
	})
	$('.inSum').val(inSum);
	var outSum = $('.outSum').val();
	sum(inSum, outSum);
}

function outMoney() { //计算流出金额
	var outSum = 0;
	$('.tab-outcome li input').each(function() {
		outSum += Number($(this).val());
	});
	$('.outSum').val(outSum);
	var inSum = $('.inSum').val();
	sum(inSum, outSum);
}
//数据提交
function submit(statue) {
	var submitArr = cashFlowFun.getAll();
	var subJosn = {};
	for(var i=0;i<submitArr.list_2.length;i++){
		if(submitArr.list_2[i].name==''||submitArr.list_2[i].name==null||submitArr.list_2[i].name==undefined){
			submitArr.list_2.splice(i,1);
			i=i-1;
		}
	}
	answerJson.bossCashFlowModel.bossCashFlowDetails = submitArr.list_2;
	answerJson.bossCashFlowModel.bossCashFlowMain = submitArr.list_1;
	subJosn = answerJson;
	console.log(subJosn);
	var ValidityState = flowValidate() && timeState;
	//TODO
	androidDataSubmit(statue, subJosn, ValidityState);
	if (statue) {
		if (ValidityState) {
			console.log('最终校验结果：通过');
			subJosn["completeStatus"] = 2;
			console.log(subJosn);
			subJosn = JSON.stringify(subJosn);
			AndroidJs.saveWjDetalAnswer(subJosn, true);
		} else {
			console.log('最终校验结果：不通过');
			subJosn["completeStatus"] = 1;
			subJosn = JSON.stringify(subJosn);
			AndroidJs.saveWjDetalAnswer(subJosn, false);
		}
	} else {
		if (ValidityState) {
			subJosn["completeStatus"] = 2;
		} else {
			subJosn["completeStatus"] = 1;
		}
		subJosn = JSON.stringify(subJosn);
		AndroidJs.saveWjDetalAnswer(subJosn, false);
	}
}