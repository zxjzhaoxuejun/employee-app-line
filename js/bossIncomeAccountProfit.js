var arrLen = []; //存储行号用来判断页签的个数；
var Y_month = '';
var default_serialNo;
var arrT = [];
var IncomeArr = []; //毛利润
var CostsArr = []; //月可支
var dateVal; //日期
var Summaries = []; //所得税
var ModeAnswer;
var answerJson;//整个答案
function loadBossIncomeAccountProfit(data) {
	answerJson = jsonForm(data[1]);
	console.log(answerJson)
	ModeAnswer = answerJson.bossIncomeAccountModel; //损益表模块答案
	var c = answerJson.bossIncomeAccountModel.bossIncomeAccountIncomes; //损益表收入
	if(c==null){
		c=[];
	};
	var c0 = repeatObject(answerJson.bossIncomeAccountModel.bossIncomeAccountVariableCosts); //损益表可变成本
	if(c0==null){
		c0=[];
	};
	var c1 = answerJson.bossIncomeAccountModel.bossIncomeAccountFixedOutcomes; //损益表固定支出
	if(c1==null){
		c1=[];
	};
	var c2 = answerJson.bossIncomeAccountModel.bossIncomeAccountOthers; //损益表其他
	if(c2==null){
		c2=[];
	};
	var c3 = answerJson.bossIncomeAccountModel.bossIncomeAccountSummaries; //损益表所得税
	if(c3==null){
		c3=[];
	};
	var c4 = answerJson.bossIncomeAccountModel.bossIncomeAccountTurnoverResources; //损益表利润
	if(answerJson.serialNo.serialNo!=undefined){
		default_serialNo = answerJson.serialNo.serialNo;//单号
	}else{
		default_serialNo = null;
	}
	dateVal = answerJson.bossIncomeAccountDates; //日期
	for (var i = 0; i < c.length; i++) {
		if (c[i].type == 2) {
			if (c[i].date != undefined && c[i].date != null&&c[i].date != "undefined") {
				Y_month = c[i].date
			}
		}
	}
	if (c3.length > 0) {
		for (var j = 0; j < c3.length; j++) {
			if (c3[j].type == 5) {
				Summaries.push(c3[j]);
			}
		}
		console.log(Summaries);
	}
	createCosts(c3, dateVal, c, c0, c1, c2); //生成页面
}

function createCosts(b, dateVal, c, c0, c1, c2) {
	$('<section></section>').appendTo('body');
	$('<footer id="next" onclick="submit(true);"><p>确定</p></footer>').insertAfter('section');
	//收入头部
	var IncomesHtml = '';
	IncomesHtml += '<div class="cr-title"><p class="t-tile mode-defule">利润</p></div>';
	$(IncomesHtml).appendTo('section');

	//收入表格
	var tabList = '';
	tabList += '<div class="tab-list"><div class="tab-nav">'+
//	'<span  name="1">毛利润</span>'+
	'<span class="bg" name="2">月可支</span></div>';
	tabList += '<div class="tab-con tab-income"><ul class="tab"><li class="tab-title"><span>月份</span><span class="percentage">月可支（元）</span></li>';
	for (var t = 0; t < dateVal.length; t++) {
		tabList += '<li><span name="date">' + dateVal[t].date + '</span><input name="amount" disabled="disabled" type="number" value="0"></li>';
	}
	tabList += '</ul><ul class="yq-month"></ul></div></div>';
	$(tabList).appendTo('section');
	$('<li class="average average-profit"><span>周期内平均</span><span class="avg-span">12</span></li>').appendTo('.tab');
	$('<li class="tab-title"><span>预期代表月份</span><span class="percentage">毛利润（元）</span></li>').appendTo('.yq-month');
	$('<li><input type="text" name="date" disabled="disabled" class="no-month" value="' + Y_month + '"><input name="amount" type="number"  disabled="disabled"  value=""></li>').appendTo('.yq-month');

	//动态计算周期内均值
	$('.tab li input').on('change keyup', function() {
		average()
	})

	$(function() { //默认初始周期内均值
		var sum = 0;
		for (var i = 0; i < $('.tab li input').length; i++) {
			sum += Number($('.tab li input').eq(i).val());
		}
		sum = sum / ($('.tab li input').length);
		sum = toDecimal(sum); //保留小数点后两位
		$('.avg-span').text(sum);
	})

	$('.tab-nav span').click(function() {
		var checkVal = $(this).text();
		$('.percentage').text(checkVal + '(元)');

	})
//	percentage(c, c0);
	$('.tab-nav span[name="1"]').click(function() { //触发页签span事件
		$('.tab-nav span').removeClass('bg');
		$('.average').hide();
		$(this).addClass('bg');
		var checkVal = $(this).text();
		$('.percentage').text(checkVal + '(元)');
		percentage(c, c0);
	});
	
	changeable(c, c0, c1, c2, b);
	$('.tab-nav span[name="2"]').click(function() {
		$('.tab-nav span').removeClass('bg');
		$('.average').show();
		$(this).addClass('bg');
		var checkVal = $(this).text();
		$('.percentage').text(checkVal + '(元)');
		changeable(c, c0, c1, c2, b); //c表示收入，C0表示可变成本,c1固定支出,c2其他
	});


}

function average() { //周期内均值
	var sum = 0;
	$('.tab li input').each(function() {
		for (var i = 0; i < $(this).length; i++) {
			sum += Number($(this).eq(i).val());
		}
	})
	sum = sum / ($('.tab li input').length);
	sum = toDecimal(sum); //保留小数点后两位
	$('.avg-span').text(sum);
	return sum;
}

function percentage(c, c0) {
	IncomeArr.length = 0;
	for (var i = 0; i < 12; i++) { //计算毛利润
		var IncomSum = 0;
		var outcomSum = 0;
		var expectIn = 0;
		var expectOut = 0;
		for (var j = 0; j < c.length; j++) {
			if (dateVal[i].date == c[j].date && c[j].type == 1) {
				IncomSum += Number(c[j].amount);
//				console.log(c[j].amount)
			}
			if (c[j].type == 2) { //收入预期代表月
				expectIn += Number(c[j].amount);
			}
		}
//			alert(c0.length)
		for (var j = 0; j < c0.length; j++) {
//			console.log(c0.length)
			if (dateVal[i].date == c0[j].date && c0[j].type == 1) {
				outcomSum += Number(c0[j].amount);
				console.log(c0[j].amount)
			}
			if (c0[j].type == 2) { //可变成本预期代表月
				expectOut += Number(c0[j].amount);
			}
		}
		var difference = toDecimal(IncomSum - outcomSum);
		var _json = {};
		_json["date"] = dateVal[i].date;
		_json["amount"] = difference;
		_json["type"] = "6";
		_json["otherType"] = "1"
		_json["serialNo"] = default_serialNo;
		IncomeArr.push(_json);
//		console.log(difference)
		$('.tab li').eq(i + 1).children('input').val(difference);
		//	console.log(difference);
		var expectDifference = toDecimal(expectIn - expectOut);
		$('.yq-month li').eq(1).children('input').eq(1).val(expectDifference);
	}
	var _json = {};
	_json["date"] = $('.yq-month li').eq(1).children('input').eq(0).val()
	_json["amount"] = expectDifference;
	_json["type"] = "6";
	_json["otherType"] = "2"
	_json["serialNo"] = default_serialNo;
	IncomeArr.push(_json);
	average();
	$('.average').hide(); //隐藏周期内平均值
}

function changeable(c, c0, c1, c2, c3) { //可支出;//c表示收入，C0表示可变成本,c1固定支出,c2其他,c3所得税
	CostsArr.length = 0;
	var expectOut = 0; //可变成本预期月
	var expectIn = 0; //收入预期月
	var n = 0;
	for (var i = 0; i < 12; i++) {
		var IncomSum = 0; //收入
		var outcomSum = 0; //可变成本
		//		var FiedcomSum=0;//固定支出
		//		var FiedInSum=0;//其他收入
		var Inmonth = 0; //月收入
		var Kbmonth = 0; //月可变成本
		var Fiedmonth = 0; //月固定支出
		var Qtmonth = 0; //月其他
		var QtInmonth = 0; //月其他收入
		var sDmonth = 0; //月所得税
		for (var j = 0; j < c.length; j++) { //收入
			if (dateVal[i].date == c[j].date) {
				if (c[j].type == 1) {
					if (c[j].amount == undefined) {
						c[j].amount = 0;
					}
					Inmonth = Number(c[j].amount);
					IncomSum += Number(c[j].amount);
				}

			}
			if (c[j].type == 2) { //预期代表月
				if (c[j].amount == undefined) {
					c[j].amount = 0;
				};
				expectIn += Number(c[j].amount);
			}
		}
		for (var k = 0; k < c0.length; k++) { //可变成本
			if (dateVal[i].date == c0[k].date) {
				if (c0[k].type == 1) {
					if (c0[k].amount == undefined) {
						c0[k].amount = 0
					};
					Kbmonth = Number(c0[k].amount);
					outcomSum += Number(c0[k].amount);
				}
			}
			if (c0[k].type == 2) { //预期代表月
				//				alert(c0[k].amount)
				if (c0[k].amount == undefined) {
					c0[k].amount = 0
				}
				expectOut += Number(c0[k].amount);
			}
		}

		for (var h = 0; h < c3.length; h++) { //所得税
			if (dateVal[i].date == c3[h].date) {
				if (c3[h].type == 5) {
					if (c3[h].amount == undefined) {
						c3[h].amount = 0
					};
					sDmonth = Number(c3[h].amount);
					outcomSum += Number(c3[h].amount);
				}
			}
			if (c3[h].type == 5 && c3[h].otherType == 2) { //预期代表月
				if (c3[h].amount == undefined) {
					c3[h].amount = 0
				};
				expectOut += Number(c3[h].amount);

			}
		}

		for (var u = 0; u < c1.length; u++) { //固定支出
			if (dateVal[i].date == c1[u].date) {
				if (c1[u].type == 1) {
					if (c1[u].amount == undefined) {
						c1[u].amount = 0;
					};
					outcomSum += Number(c1[u].amount);
					Fiedmonth = Number(c1[u].amount);
				}
			}
			if (c1[u].type == 2) { //预期代表月
				if (c1[u].amount == undefined) {
					c1[u].amount = 0;
				};
				expectOut += Number(c1[u].amount);
			}
		}
		for (var t = 0; t < c2.length; t++) { //其他
			if (dateVal[i].date == c2[t].date) {
				if (c2[t].type == 1) {
					if (c2[t].category == 1 || c2[t].category == 2 || c2[t].category == 3) { //家庭开支、分期还款
						Qtmonth = 0;
						if (c2[t].amount == undefined) {
							c2[t].amount = 0;
						};
						Qtmonth += Number(c2[t].amount);
						outcomSum += Number(c2[t].amount);

					}
					if (c2[t].category == 4) { //其他收入
						if (c2[t].amount == undefined) {
							c2[t].amount = 0;
						};
						IncomSum += Number(c2[t].amount);
						QtInmonth = Number(c2[t].amount)

					}
				}

			}
			if (c2[t].type == 2) { //预期代表月
				if (c2[t].category == 1 || c2[t].category == 2 || c2[t].category == 3) {
					if (c2[t].amount == undefined) {
						c2[t].amount = 0;
					};
					expectOut += Number(c2[t].amount);
				}
				if (c2[t].category == 4) { //其他收入
					if (c2[t].amount == undefined) {
						c2[t].amount = 0;
					};
					expectIn += Number(c2[t].amount);
				}
			}
		}
		var Qt = QtInmonth - Qtmonth;
		if (Qt == 0 && Inmonth == 0 && Fiedmonth == 0 && Kbmonth == 0 && sDmonth == 0) {
			n++;
			//			alert(n);
		}
//		console.log(IncomSum + 's');
//		console.log(outcomSum + 'c');
		var difference = toDecimal(IncomSum - outcomSum);
		var _json = {};
		_json["date"] = dateVal[i].date;
		_json["amount"] = difference;
		_json["type"] = "9";
		_json["otherType"] = "1"
		_json["serialNo"] = default_serialNo;
		CostsArr.push(_json);
		$('.tab li').eq(i + 1).children('input').val(difference);
		
		//		console.log(difference);
		//console.log(CostsArr);
	}
	var expectDifference = expectIn - expectOut;
	var expectDifference = toDecimal((expectIn - expectOut) / 12);
	$('.yq-month li').eq(1).children('input').eq(1).val(expectDifference);
	var _json = {};
	_json["date"] = $('.yq-month li').eq(1).children('input').eq(0).val()
	_json["amount"] = expectDifference;
	_json["type"] = "9";
	_json["otherType"] = "2"
	_json["serialNo"] = default_serialNo;
	CostsArr.push(_json);
	var monthLen = $('.tab li').length - 2 - n;
	monthOutMoney(monthLen)
}

function monthOutMoney(monthLen) {
	var sum = 0;
	$('.tab li input').each(function() {
		for (var i = 0; i < $(this).length; i++) {
			sum += Number($(this).eq(i).val());
		}
	})
	sum = sum / monthLen;
	sum = toDecimal(sum); //保留小数点后两位
	$('.avg-span').text(sum);
}

function submit(_hl) {
	var arrTab = []; //提交数据的数组
	arrTab = arrTab.concat(IncomeArr);
	arrTab = arrTab.concat(CostsArr);
	arrTab = arrTab.concat(Summaries);
	var subJosn = {};
	//subJosn["bossIncomeAccountModel"] = {
	//			"bossIncomeAccountSummaries":[]
	//	};
	//subJosn["bossIncomeAccountModel"]["bossIncomeAccountSummaries"]=arrTab;
	ModeAnswer.bossIncomeAccountSummaries = arrTab;
	console.log(arrTab)
	answerJson.bossIncomeAccountModel= ModeAnswer;
	subJosn=answerJson;
	subJosn["completeStatus"] = 2;
	//alert(arrTab);
	subJosn = JSON.stringify(subJosn);
	console.log(subJosn)
		//TODO
	if (_hl) {
		AndroidJs.saveWjDetalAnswer(subJosn, true);
	} else {
		AndroidJs.saveWjDetalAnswer(subJosn, false);
	}
	//AndroidJs.saveWjDetalAnswer(subJosn);

}