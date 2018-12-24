var default_serialNo; //默认的单号
var Y_month; //预期月份
var dateVal; //日期
var dateAll = [];
var comprehensiveRate; //综合毛利率
var questionCode; //问卷号
var stateResult = true;
var c0;
var ModeAnswer; //模块答案
var answerJson; //整个答案
function loadBossIncomeAccountIncome(data) {
	//	console.log(data[1])
	answerJson = jsonForm(data[1]);
	console.log(answerJson);
	ModeAnswer = answerJson.bossIncomeAccountModel; //损益表模块答案
	questionCode = data[1].questionnaireCode.questionnaireCode; //问卷号获取
	var c = answerJson.bossIncomeAccountModel.bossIncomeAccountIncomes; //损益表收入
	if (answerJson.bossIncomeAccountModel.bossIncomeAccountIncomes == null) {
		c = [];
	}
	c0 = answerJson.bossIncomeAccountModel.bossIncomeAccountVariableCosts; //损益表可变成本
	if (
		answerJson.bossIncomeAccountModel.bossIncomeAccountVariableCosts == null
	) {
		c0 = [];
	}
	var c1 = answerJson.bossIncomeAccountModel.bossIncomeAccountFixedOutcomes; //损益表固定支出
	var c2 = answerJson.bossIncomeAccountModel.bossIncomeAccountOthers; //损益表其他
	var c3 = answerJson.bossIncomeAccountModel.bossIncomeAccountSummaries; //损益表所得税
	var c4 = answerJson.bossIncomeAccountModel.bossIncomeAccountTurnoverResources; //损益表利润
	var c5 = answerJson.bossIncomeAccountModel.bossAcrossOtherCost; //对可变成本及其他交叉校验
	if (c5 != null) {
		comprehensiveRate = c5.comprehensiveGrossProfitRate; //综合毛利率
	}
	if (answerJson.serialNo.serialNo != undefined) {
		default_serialNo = answerJson.serialNo.serialNo; //单号
	} else {
		default_serialNo = null;
	}
	dateVal = answerJson.bossIncomeAccountDates; //日期
	for (var h = 0; h < dateVal.length; h++) {
		//月份区间
		dateAll.push(dateVal[h].date);
	}
	createIncomes(c); //生成页面
	baseFun.intoFun(null, 4);
	spanClick();
	otherValBlur();
}

function createIncomes(b) {
	//创建页面
	if (b.length > 0) {
		//有数据时
		inTotalHtml();
		var datajson = arrGroup(b, 'lineNo', 3);
		var arrName = [];
		if (datajson.length >= 3) {
			$('.add-icon').hide();
		}
		for (var i = 0; i < datajson.length; i++) {
			if (arrVal(datajson[i].name, arrName)) {
				datajson.splice(i, 1);
				i = i - 1;
			} else {
				arrName.push(datajson[i].name);
				var tag = '';
				if (i == 0) {
					tag =
						'<span data-list="item' +
						i +
						'" data-mask="1" class="bg" name="' +
						datajson[i].name +
						'">' +
						datajson[i].name +
						'</span>';
				} else {
					tag =
						'<span  data-list="item' +
						i +
						'" name="' +
						datajson[i].name +
						'">' +
						datajson[i].name +
						'</span>';
				}
				$('.tab-nav').append(tag);
				createHtml(datajson[i], i);
			}
		}
	} else {
		//当加载进入没有答案时
		inTotalHtml();
		inAddHtml(0);
	}
}

/**
 * 当有答案时，创建页面
 * @param {Object} dataList 传入每个页签数组
 * @param {Object} num
 */
function createHtml(dataList, num) {
	var numCount = 0;
	var $liHtml = '';
	var $liList = dataList.data;
	for (var j = 0; j < dateAll.length; j++) {
		$liHtml +=
			'<li><span name="date">' +
			dateAll[j] +
			'</span>' +
			'<input name="amount" type="number" value="0">' +
			'</li>';
	}
	var showMode = '';
	var typeNoCheck = '';
	var yq_time = '';

	if (num == 0) {
		showMode = 'display:block';
		typeNoCheck = 'disabled="disabled"';
		yq_time =
			'<li><input type="text" name="date" id="demo_date1" class="no-month" value=""><i class="down-arrow01"></i><input name="amount" class="expect-month" type="number" value=""></li>';
	} else {
		showMode = 'display:none';
		typeNoCheck = '';
		yq_time =
			'<li><input type="text" name="date" disabled="disabled" class="no-month" value=""><input class="expect-month" name="amount" type="number"  value=""></li>';
	}
	var html =
		'<div class="tab-con tab-income" style="' +
		showMode +
		'" data-list="item' +
		num +
		'">' +
		'<p name="name"><i>*</i><span>生意模式</span><input ' +
		typeNoCheck +
		' type="text" placeholder="请输入" value="' +
		delNull(dataList.name) +
		'" class="typeIncome"></p>' +
		'<ul class="tab">' +
		'<li class="tab-title"><span>月份</span><span class="percentage">收入（元）</span></li>' +
		$liHtml +
		'</ul><ul class="yq-month"><li class="tab-title"><span>预期代表月份</span><span class="percentage">收入（元）</span></li>' +
		yq_time +
		'</ul></div>';
	$('.tab-list').append(html);

	for (var i = 0; i < $liList.length; i++) {
		if ($liList[i].type == '1') {
			if (!arrVal($liList[i].date, dateAll)) {
				//判断月份是否在区间内
				numCount++;
				$liList[i].date = dateAll[12 - numCount];
				$liList[i].amount = 0;
			}
			var $li = $('.tab-con[data-list="item' + num + '"] .tab li');
			for (var k = 1; k < $li.length; k++) {
				if (
					$li
					.eq(k)
					.children('span')
					.text() == $liList[i].date
				) {
					$li
						.eq(k)
						.children('input')
						.val($liList[i].amount);
				}
			}
		} else {
			if($liList[i].date==undefined||$liList[i].date==null||$liList[i].date=="undefined"){
				$liList[i].date='';
				$liList[i].amount=''
			}
			$('.tab-con[data-list="item' + num + '"] .expect-month').val($liList[i].amount);
			$('.tab-con[data-list="item' + num + '"] .no-month').val($liList[i].date);
		}
	}
	date_scoll(40, 180, 1);
}

//各项列表之和
function allCount() {
	//计算总计
	$('span.no-month').text($('#demo_date1').val());
	var dataList = baseFun.getAll(3);
	var y_monthSum = 0;
	for (var j = 0; j < dateVal.length; j++) {
		var $liSum = 0;
		for (var i = 0; i < dataList.length; i++) {
			if (dateVal[j].date == dataList[i].date && dataList[i].type == 1) {
				$liSum += Number(dataList[i].amount);
			} else if (dataList[i].type == 2) {
				y_monthSum += Number(dataList[i].amount);
			}
		}
		$('.tab-con[data-list="itemTotal"] .total-span')
			.eq(j)
			.text($liSum);
	}
	var expVal = y_monthSum / 12;
	if (expVal == 0) {
		$('.tab-con[data-list="itemTotal"] .expect-month').text('');
	} else {
		$('.tab-con[data-list="itemTotal"] .expect-month').text(expVal);
	}
}

$(document).on('blur change', '.typeIncome', function() {
	//动态显示输入的页签
	var nowVal = $(this).val();
	var tagArr = [];
	$('.typeIncome').each(function() {
		tagArr.push($(this).val());
	});
	if (isRepeat(tagArr)) {
		$(this).after('<label class="verify-error">不能输入相同生意模式!</label>');
		$(this).val('');
	} else {
		$('.tab-nav span.bg')
			.text(nowVal)
			.attr('name', nowVal);
	}
});

$(document).on('keyup change', '#demo_date1', function() {
	//预期月份选择
	var checkTime = $(this).val();
	console.log(checkTime);
	$('.no-month').val(checkTime);
	if (checkTime == '') {
		$('.expect-month')
			.val('')
			.attr('disabled', 'disabled');
	} else {
		$('.expect-month').attr('disabled', false);
	}
});

//数据提交
function submit(statue) {
	$('.verify-error').remove();
	var tagArr = [];
	$('.typeIncome').each(function() {
		tagArr.push($(this).val());
	});
	if (isRepeat(tagArr)) {
		var d = $('.tab-nav span.bg').attr('data-list');
		$('.tab-income[data-list="' + d + '"]')
			.find('.typeIncome')
			.val('');
	}
	var subJosn = {};
	var submitArr = baseFun.getAll(3);
	for (var i = 0; i < submitArr.length; i++) {
		if (submitArr[i].name == null || submitArr[i].name == '') {
			submitArr.splice(i, 1);
			i = i - 1;
		}
	}

	var arrCost = [];
	if (c0.length > 0) {
		for (var k = 0; k < c0.length; k++) {
			for (var j = 0; j < submitArr.length; j++) {
				if (c0[k].date != null) {
					if (
						c0[k].name == submitArr[j].name &&
						c0[k].type == submitArr[j].type
					) {
						var jsm = {};
						jsm['amount'] = (submitArr[j].amount * c0[k].variableCost) / 100;
						jsm['date'] = submitArr[j].date;
						jsm['lineNo'] = submitArr[j].lineNo;
						jsm['name'] = submitArr[j].name;
						jsm['serialNo'] = submitArr[j].serialNo;
						jsm['type'] = submitArr[j].type;
						jsm['variableCost'] = c0[k].variableCost;
						arrCost.push(jsm);
					}
				} else {
					if (c0[k].name == submitArr[j].name && submitArr[j].type == 2) {
						var jsm = {};
						jsm['amount'] = (submitArr[j].amount * c0[k].variableCost) / 100;
						jsm['date'] = submitArr[j].date;
						jsm['lineNo'] = submitArr[j].lineNo;
						jsm['name'] = submitArr[j].name;
						jsm['serialNo'] = submitArr[j].serialNo;
						jsm['type'] = submitArr[j].type;
						jsm['variableCost'] = c0[k].variableCost;
						arrCost.push(jsm);
					}
				}
			}
		}
	}

	if (submitArr == null) {
		submitArr = []
	} else {
		for (var s = 0; s < submitArr.length; s++) {
			if (submitArr[s].date == undefined || submitArr[s].date == "undefined") {
				submitArr[s].date = '';
			}
		}
	}
	ModeAnswer.bossIncomeAccountIncomes = submitArr;
	ModeAnswer.bossIncomeAccountVariableCosts = repeatObject(arrCost);
	answerJson.bossIncomeAccountModel = ModeAnswer;
	subJosn = answerJson;
	//TODO保存数据
	var ValidityState = validateFun();
	androidDataSubmit(statue, subJosn, ValidityState);
}