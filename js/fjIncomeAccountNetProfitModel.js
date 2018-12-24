var default_serialNo; //单号
var ModeAnswer;
var c4,c3;
var answerJson; //整个答案
function loadFJIncomeAccountNetProfit(data) {
	answerJson = jsonForm(data[1]);
	console.log(answerJson);
	ModeAnswer = answerJson.fjIncomeAccountNetProfitModel; //答案
	c3 = ModeAnswer.fjIncomeAccountNetProfit; //对象答案
	c4 = ModeAnswer.fjIncomeAccountProfitExpenses; //数组答案
	if (c4 == null) {
		c4 = [];
	}
	if (answerJson.serialNo.serialNo != undefined) {
		default_serialNo = answerJson.serialNo.serialNo; //单号
	} else {
		default_serialNo = null;
	}

	createCosts(); //生成页面
	baseOther.baseInfo();
	spanClick();
}

var baseOther = {
	baseInfo: function() {
		$(document).on('focus', 'input', function() { //获取焦点输入框显示下划线
			foceBlurFun();
		});
		$(document).on('keyup change', 'input', function() { //动态校验
			crossOtherValidate();
		});
		$(document).on('click', '.cp-btn .add-icon', function() { //产品描述添加
			var len = new Date().getTime(); //时间戳
			baseOther.addCpHtml(len);
		});
		$(document).on('click', '.cp-btn .del-icon', function() { //产品描述删除
			baseOther.delDom(1);
		});
		$(document).on('blur change', '.typeInput', function() { //动态显示输入的页签
			var nowVal = $(this).val();
			var tagArr = [];
			$('.typeInput').each(function() {
				tagArr.push($(this).val());
			})
			if (isRepeat(tagArr)) {
				$(this).parent().parent().append('<label class="month-error">不能输入相同页签!</label>');
				$(this).val('');
			} else {
				$('.cp-nav span.bg').text(nowVal);
				$(this).css('color', '#191919');
			}
		});
		$(document).on('change keyup', '.money-layout', function() { //支出合计动态计算
			calculateProfit();
		});
	},
	addCpHtml: function(num) {
		$('.pro-lists').hide();
		$('.cp-nav span').removeClass('bg');
		$('.cp-nav').append('<span class="bg" data-list="items' + num + '">添加</span>');
		var cpTab = '';
		cpTab += '<div class="con-list pro-lists" data-list="items' + num + '" style="display:block;"><ul class="cp">';
		cpTab += '<li name="expensesProject"><div class="list-left"><span></span><i>支出项目</i></div><div class="list-right"><input type="text" placeholder="请输入" class="typeInput" ></div></li>';
		cpTab += '<li name="expensesAmount"><div class="list-left"><span></span><i>支出金额</i></div><div class="list-right"><input type="number" class="money-layout"><b class="d-icon">元</b></div></li>';
		cpTab += '</ul></div>';

		$('.cp-list').append(cpTab);
	},
	delDom: function(model) {
		var spanLen = '';
		var modelName = '';
		if (model == 1) { //1.产品描述；2.商品扣点
			spanLen = $('.cp-nav span');
			modelName = 'pro-lists';
		} else {
			spanLen = $('.deduct-nav span');
			modelName = 'deduct-lists';
		}
		for (var i = 0; i < spanLen.length; i++) {
			$('<i class="tab-colse" name="' + i + '"></i>').appendTo(spanLen.eq(i));
		}
		$(document).on('click', '.con-list', function() {
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
				$('.' + modelName + '[data-list="' + delNum + '"]').remove();
				$('.' + modelName).eq(0).show();
				if (model == 1) {
					$('.cp-nav span').eq(0).addClass('bg');
					calculateProfit();
				} else {
					$('.deduct-nav span').eq(0).addClass('bg');
				}
			});
		});
	},
	getAll: function() { //获取答案
		var arrPro = [];
		var _json = {};
		$('.cp').each(function(index) { //支出列表
			var lineNum = index + 1;
			var $li = $(this).find('li');
			var obj = {};
			for (var i = 0; i < $li.length; i++) {
				obj[$li.eq(i).attr('name')] = $li.eq(i).find('.list-right').find('input').val();
			}
			obj["serialNo"] = default_serialNo;
			obj["lineNo"] = lineNum;
			arrPro.push(obj);
		});

		$('.obj-data').each(function() { //散列数据对象
			_json[$(this).attr('name')] = $(this).val();
			_json["serialNo"] = default_serialNo;
		});

		var data = {
			"list_1": arrPro, //支出列表答案
			"list_2": _json, //散列对象答案
		};
		
		return data;
	}

}

/**
 * 支出描述答案生成
 * @param {Object} lists 答案
 * @param {Object} num 页签数
 */
function proListHtml(lists, num) {
	var asw = lists.data[0];
	var showMode = '';
	if (num == 0) {
		showMode = 'display:block';
	} else {
		showMode = 'display:none';
	}
	var cpTab = '';
	cpTab += '<div class="con-list pro-lists" data-list="items' + num + '" style="' + showMode + '"><ul class="cp">';
	cpTab += '<li name="expensesProject"><div class="list-left"><span></span><i style="color: rgb(160, 160, 165);">支出项目</i></div><div class="list-right"><input type="text" placeholder="请输入" style="color: rgb(25, 25, 25);" value="' + asw.expensesProject + '" class="typeInput" ></div></li>';
	cpTab += '<li name="expensesAmount"><div class="list-left"><span></span><i style="color: rgb(160, 160, 165);">支出金额</i></div><div class="list-right"><input type="number" style="color: rgb(25, 25, 25);" value="' + asw.expensesAmount + '" class="money-layout"><b class="d-icon">元</b></div></li>';
	cpTab += '</ul></div>';
	return cpTab;
}

function createCosts() { //创建页面
	var proArrs = arrGroup(c4, 'lineNo', 10); //支出数据
	var proNav = '',
		proLi = '';
	var arrName = [];
	for (var i = 0; i < proArrs.length; i++) {
		if (arrVal(proArrs[i].data[0].expensesProject, arrName)) {
			proArrs.splice(i, 1);
			i = i - 1;
		} else {
			arrName.push(proArrs[i].data[0].expensesProject);
			if (i == 0) {
				proNav += '<span class="bg" data-list="items' + i + '">' + proArrs[i].data[0].expensesProject + '</span>';
			} else {
				proNav += '<span data-list="items' + i + '">' + proArrs[i].data[0].expensesProject + '</span>';
			}
			proLi += proListHtml(proArrs[i], i);
		}
	}
	$('<section></section>').appendTo('body');
	var firstHtml = '<div class="con-list top-list">' +
		'<ul>' +
		'<li>' +
		'<div class="list-left"><span>*</span><i>客户口述净利润</i></div>' +
		'<div class="list-right"><input type="number" placeholder="请输入" name="customerDictationNetProfit" class="obj-data"><b class="d-icon">元</b></div>' +
		'</li>' +
		'<li>' +
		'<div class="list-left"><span></span><i>调查人推算净利润</i></div>' +
		'<div class="list-right"><input type="number" placeholder="请输入" name="investigatorReckonProfit" class="obj-data"><b class="d-icon">元</b></div>' +
		'</li>' +
		'<li>' +
		'<div class="list-left"><span>*</span><i>去年一年净利润</i></div>' +
		'<div class="list-right"><input type="number" placeholder="请输入" name="lastYearNetProfit" class="obj-data"><b class="d-icon">元</b></div>' +
		'</li>' +
		'</ul>' +
		'</div>';
	$('<footer id="next" onclick="submit(true);"><p>确定</p></footer>').insertAfter('section');

	//产品描述title
	var cpHtml = '';
	cpHtml += firstHtml + '<div class="cr-title"><p class="t-tile mode-defule">所得净利润支出</p>';
	cpHtml += '<div class="click-icon cp-btn"><span class="add-icon"></span><span class="del-icon"></span></div></div>';
	$(cpHtml).appendTo('section');
	//支出Tablist
	var cpTab = '';
	cpTab += '<div class="tab-list cp-list"><div class="tab-nav cp-nav">' + proNav + '</div>' + proLi + '</div>';
	$(cpTab).appendTo('section');

	//所得利润支出合计
	var specificHtml = '';
	specificHtml += '<div class="xx-title"><p class="q-tile mode-defule">所得利润支出合计</p>';
	specificHtml += '<div class="q-lr mode-defule"><input type="number" disabled="disabled" value="0" name="profitExpenses" class="cp-weighting obj-data"><b>元</b></div></div>';
	$(specificHtml).appendTo('section');

    if(c3){//对象赋值
    	$('.obj-data').each(function(){
    		for(var key in c3){
    			console.log(key)
    			if($(this).attr('name')==key){
    				$(this).val(c3[key]).css('color', '#191919');
    				if(c3[key]){
    					$(this).parent().prev().children('i').css('color','#999');
    				}
    			}
    		}	
    	})
    }
}



/**
 * 页签span点击事件
 * 切换页签显示数据
 */
function spanClick() {
	$(document).on('click', '.cp-nav span', function() { //支出页签
		$('.cp-nav span').removeClass('bg');
		$(this).addClass('bg');
		$('.pro-lists').hide();
		$('.pro-lists').eq($(this).index()).show();
	});
}

//计算支出金额合计
function calculateProfit() {
	var sumWeighting = 0;
	$('.cp').each(function() {
		var expensesAmount = Number($(this).find('.money-layout').val()); //支出金额
		sumWeighting += Number(expensesAmount);
	});
	$('.cp-weighting').val(oneDecimal(sumWeighting)); //合计
}

function crossOtherValidate() {
	var verifyResult = true; //校验的结果
	var errMask_1 = [];
	var reg = (/^(\d{0,10})$/); //0-10位的正整数
	var reg_title = (/^(.{0,50})$/); //50位任意字符
	var reg_1 = (/^((\d{0,9})|(0))(\.\d{1})?$/); //10位正整数或带1位小数
	var reg_one = (/^(-)?(([1-9]\d{0,9})|(0))(\.\d{1})?$/); //10位正负整数或带1位小数
	var reg_no = (/^(-)?((\d{0,9})|(0))(\.\d{1})?$/); //10位正负整数或带1位小数(不必填)

	$('.top-list li input').each(function(index) {
		if (index == 1) {
			if (!reg_no.test($(this).val())) {
				console.log('字段：' + $(this).parent().prev().children('i').html() + '正则校验  >>>>>校验不通过');
				$(this).parent().parent().append($('<label class="verify-error">10位正负整数或带一位小数!</label>'));
				verifyResult = false;
			}
		} else {
				if (!reg_one.test($(this).val())) {
					console.log('字段：' + $(this).parent().prev().children('i').html() + '正则校验  >>>>>校验不通过');
					$(this).parent().parent().append($('<label class="verify-error">10位正负整数或带一位小数!</label>'));
					verifyResult = false;
				}
			}

	})

	$('.pro-lists').each(function() { //支出项目
		var name = $(this).find('.typeInput'); //支出项目
		var expensesAmount = $(this).find('.money-layout'); //金额
		if (!reg_title.test(name.val())) {
			console.log('字段：' + name.parent().prev().children('i').html() + '正则校验  >>>>>校验不通过');
			name.parent().parent().append($('<label class="verify-error">50位任意字符</label>'));
			verifyResult = false;
			$('.month-error').remove();
			errMask_1.push($(this).attr('data-list'));
		}
		if (!reg_1.test(expensesAmount.val())) {
			console.log('字段：' + expensesAmount.parent().prev().children('i').html() + '正则校验  >>>>>校验不通过');
			expensesAmount.parent().parent().append($('<label class="verify-error">10位正整数或带一位小数!</label>'));
			verifyResult = false;
			errMask_1.push($(this).attr('data-list'));
		}
	});


	errMask_1 = aRR(errMask_1);
	if (errMask_1.length > 0) {
		$('.cp-nav span').each(function() {
			if (arrVal($(this).attr('data-list'), errMask_1)) {
				$(this).addClass('error-tab');
			} else {
				$(this).removeClass('error-tab');
			}
		})
	} else {
		$('.cp-nav span').removeClass('error-tab');
	}

	if (verifyResult) {
		$('.verify-error').remove();
		$('.month-error').remove();
	}

	return verifyResult;
}

function submit(statue) {
	var sumArr = baseOther.getAll();
	for (var i = 0; i < sumArr.list_1.length; i++) {
		if (sumArr.list_1[i].expensesProject == '' || sumArr.list_1[i].expensesProject == null || sumArr.list_1[i].expensesProject == undefined) {
			sumArr.list_1.splice(i, 1);
			i = i - 1;
		}
	}

	var ValidityState = crossOtherValidate();
	var subJosn = {};
	ModeAnswer.fjIncomeAccountNetProfit = sumArr.list_2;
	ModeAnswer.fjIncomeAccountProfitExpenses = sumArr.list_1;
	answerJson.fjIncomeAccountNetProfitModel = ModeAnswer;
	subJosn = answerJson;
	//TODO
	androidDataSubmit(statue, subJosn, ValidityState);
}