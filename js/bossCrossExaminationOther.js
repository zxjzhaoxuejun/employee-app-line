var default_serialNo;//单号
var arrProjects = {}; //其他成本及其他交叉检验
var codeVal; //下拉选择值	
var dateVal;
var c8; //产品描述答案
var c10; //提点扣成数组答案
var c9; //各细项，备注答案
var c, c0, c1, c2; //收入、可变成本、固定支出、其他
var questionCode; //问卷号
var ModeAnswer;
var answerJson; //整个答案
function loadBossCrossExaminationOther(data) {
	answerJson = jsonForm(data[1]);
	console.log(answerJson);
	ModeAnswer = answerJson.bossIncomeAccountModel; //损益表模块答案
	var b = answerJson.bossIncomeAccountModel; //损益表模块
	c = b.bossIncomeAccountIncomes; //损益表收入
	c0 = b.bossIncomeAccountVariableCosts; //损益表可变成本
	c1 = b.bossIncomeAccountFixedOutcomes; //损益表固定支出
	c2 = b.bossIncomeAccountOthers; //损益表其他
	var c3 = b.bossIncomeAccountSummaries; //损益表所得税
	var c4 = b.bossIncomeAccountTurnoverResources; //损益表利润
	var c5 = b.bossAcrossTurnover; //营业额交叉验证-销售额
	var c6 = b.bossAcrossTurnoverProjects; //营业额交叉验证-产品
	var c7 = b.bossAcrossTurnoverTypes; //营业额交叉验证-模式
	c8 =b.bossAcrossVariableCosts; //可变成本及其他交叉检验   ---产品描述数组
	if (c8 == null) {
		c8 = [];
	}
	c9 = b.bossAcrossOtherCost; //其他成本及其他交叉检验杂项
	c10 = b.bossAcrossOtherTypes; //可变成本及其他交叉检验-其它成本-类型
	if (c10 == null) {
		c10 = [];
	}
	codeVal = data[0].sysDicMap.bossAcrossOtherTypeDict; //下拉选择值
	questionCode = answerJson.questionnaireCode.questionnaireCode; //问卷号
	dateVal = answerJson.bossIncomeAccountDates; //日期
	if (answerJson.serialNo.serialNo != undefined) {
		default_serialNo = answerJson.serialNo.serialNo; //单号
	} else {
		default_serialNo = null;
	}

	for (var t = 0; t < c8.length; t++) {
		if (c8[t].type == null || c8[t].type == '') {
			c8.splice(t, 1);
			t = t - 1;
		}
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
		$(document).on('click', '.deduct-btn .add-icon', function() { //商品扣成添加
			var len = new Date().getTime(); //时间戳
			baseOther.addDeductHtml(len);
		});
		$(document).on('click', '.deduct-btn .del-icon', function() { //商品扣成描述删除
			baseOther.delDom(2);
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
		$(document).on('change keyup', '.cp input[type="number"]', function() { //产品描述动态计算
			calculateProfit();
		});
		$(document).on('click', '.typename', function() { //扣点类别选择
			type_mask(codeVal, $(this));
		});
	},
	addCpHtml: function(num) {
		$('.pro-lists').hide();
		$('.cp-nav span').removeClass('bg');
		$('.cp-nav').append('<span class="bg" data-list="items' + num + '">添加</span>');
		var cpTab = '';
		cpTab += '<div class="con-list pro-lists" data-list="items' + num + '" style="display:block;"><ul class="cp">';
		cpTab += '<li name="type"><div class="list-left"><span>*</span><i>产品种类</i></div><div class="list-right"><input type="text" placeholder="请输入" class="typeInput" ></div></li>';
		cpTab += '<li name="enterPrice"><div class="list-left"><span>*</span><i>进价</i></div><div class="list-right"><input type="number" value="0" class="enterPrice money-layout"><b class="d-icon">元</b></div></li>';
		cpTab += '<li name="salePrice"><div class="list-left"><span>*</span><i>售价</i></div><div class="list-right"><input type="number" value="0" class="salePrice money-layout"><b class="d-icon">元</b></div></li>';
		cpTab += '<li name="profit"><div class="list-left"><span>*</span><i>利润</i></div><div class="list-right"><input disabled="disabled" type="number" value="0" class="profit"><b class="d-icon">元</b></div></li>';
		cpTab += '<li name="saleRatio"><div class="list-left"><span>*</span><i>销售占比</i></div><div class="list-right"><input type="number" value="0" class="saleRatio_1 cp_saleRatio_1"><b class="d-icon">%</b></div></li>';
		cpTab += '<li name="grossProfitRate"><div class="list-left"><span>*</span><i>毛利率</i></div><div class="list-right"><input type="number" disabled="disabled" value="0" class="grossProfitRate"><b class="d-icon">%</b></div></li>';
		cpTab += '</ul></div>';

		$('.cp-list').append(cpTab);
	},
	addDeductHtml: function(num) {
		$('.deduct-lists').hide();
		$('.deduct-nav span').removeClass('bg');
		$('.deduct-nav').append('<span class="bg" data-list="items' + num + '">添加</span>');
		var tcHtml = '';
		tcHtml += '<div class="con-list deduct-lists" data-list="items' + num + '"><ul class="deduct">';
		tcHtml += '<li name="type"><div class="list-left"><span>*</span><i>类型</i></div><div class="list-right"><span class="code-list typename" name="">请选择</span></div></li>';
		tcHtml += '<li name="ratio"><div class="list-left"><span>*</span><i>占比</i></div><div class="list-right"><input type="number" value="0" class="saleRatio saleRatio_1 kd_saleRatio"><b class="d-icon">%</b></div></li>';
		tcHtml += '<li name="monthAmount"><div class="list-left"><span>*</span><i>月均金额</i></div><div class="list-right"><input type="number" class="month-average" value="0"><b class="d-icon">元</b></div></li>';
		tcHtml += '</ul></div>';
		$('.buckle-btn').append(tcHtml);
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
	getAll:function(){//获取答案
		var arrPro=[];
		var arrType=[];
		var _json={};
		$('.cp').each(function(index){//产品描述
			var lineNum=index+1;
            var $li=$(this).find('li');
            var obj={};
            for(var i=0;i<$li.length;i++){
            	obj[$li.eq(i).attr('name')]=$li.eq(i).find('.list-right').find('input').val();
            }
            obj["serialNo"]=default_serialNo;
        	obj["lineNo"]=lineNum;
        	arrPro.push(obj);
		});
		
		$('.deduct').each(function(index){//商品扣点
			var lineNum=index+1;
            var $li=$(this).find('li');
            var obj={};
            for(var i=0;i<$li.length;i++){
            	if($li.eq(i).find('.list-right').find('span').attr('name')==undefined){
            		obj[$li.eq(i).attr('name')]=$li.eq(i).find('.list-right').find('input').val();
            	}else{
            		obj[$li.eq(i).attr('name')]=$li.eq(i).find('.list-right').find('span').attr('name');
            	}
            }
            obj["serialNo"]=default_serialNo;
        	obj["lineNo"]=lineNum;
        	arrType.push(obj);
		});
		
		$('.obj-data').each(function(){//散列数据对象
			_json[$(this).attr('name')]=$(this).val();
			_json["serialNo"]=default_serialNo;
		});
		
		var data={
			"list_1":arrPro,//产品描述答案
			"list_2":_json,//散列对象答案
			"list_3":arrType,//商品扣点
		};
		console.log(data);
		
		return data;
	}

}

/**
 * 产品描述答案生成
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
	cpTab += '<li name="type"><div class="list-left"><span>*</span><i style="color: rgb(160, 160, 165);">产品种类</i></div><div class="list-right"><input type="text" placeholder="请输入" style="color: rgb(25, 25, 25);" value="' + lists.type + '" class="typeInput" ></div></li>';
	cpTab += '<li name="enterPrice"><div class="list-left"><span>*</span><i style="color: rgb(160, 160, 165);">进价</i></div><div class="list-right"><input type="number" style="color: rgb(25, 25, 25);" value="' + asw.enterPrice + '" class="enterPrice money-layout"><b class="d-icon">元</b></div></li>';
	cpTab += '<li name="salePrice"><div class="list-left"><span>*</span><i style="color: rgb(160, 160, 165);">售价</i></div><div class="list-right"><input type="number" style="color: rgb(25, 25, 25);" value="' + asw.salePrice + '" class="salePrice money-layout"><b class="d-icon">元</b></div></li>';
	cpTab += '<li name="profit"><div class="list-left"><span>*</span><i style="color: rgb(160, 160, 165);">利润</i></div><div class="list-right"><input disabled="disabled" type="number" value="' + asw.profit + '" class="profit"><b class="d-icon">元</b></div></li>';
	cpTab += '<li name="saleRatio"><div class="list-left"><span>*</span><i style="color: rgb(160, 160, 165);">销售占比</i></div><div class="list-right"><input type="number" style="color: rgb(25, 25, 25);" value="' + asw.saleRatio + '" class="saleRatio_1 cp_saleRatio_1"><b class="d-icon">%</b></div></li>';
	cpTab += '<li name="grossProfitRate"><div class="list-left"><span>*</span><i style="color: rgb(160, 160, 165);">毛利率</i></div><div class="list-right"><input type="number" disabled="disabled" value="' + asw.grossProfitRate + '" class="grossProfitRate"><b class="d-icon">%</b></div></li>';
	cpTab += '</ul></div>';

	return cpTab;
}

/**
 * 商品扣点答案展示
 * @param {Object} lists 数据
 * @param {Object} num 页签数
 */
function tcListHtml(lists, num) {
	var asw = lists.data[0];
	var showMode = '';
	if (num == 0) {
		showMode = 'display:block';
	} else {
		showMode = 'display:none';
	}
	var tcHtml = '';
	tcHtml += '<div class="con-list deduct-lists" data-list="items' + num + '" style="' + showMode + '"><ul class="deduct">';
	tcHtml += '<li name="type"><div class="list-left"><span>*</span><i style="color: rgb(160, 160, 165);">类型</i></div><div class="list-right"><span class="code-list typename" name="' + lists.type + '" style="color: rgb(25, 25, 25);">' + getGuidValue(codeVal, lists.type) + '</span></div></li>';
	tcHtml += '<li name="ratio"><div class="list-left"><span>*</span><i style="color: rgb(160, 160, 165);">占比</i></div><div class="list-right"><input type="number" value="' + asw.ratio + '" style="color: rgb(25, 25, 25);" class="saleRatio saleRatio_1 kd_saleRatio"><b class="d-icon">%</b></div></li>';
	tcHtml += '<li name="monthAmount"><div class="list-left"><span>*</span><i style="color: rgb(160, 160, 165);">月均金额</i></div><div class="list-right"><input type="number" class="month-average" style="color: rgb(25, 25, 25);" value="' + asw.monthAmount + '"><b class="d-icon">元</b></div></li>';
	tcHtml += '</ul></div>';

	return tcHtml;
}

function createCosts() { //创建页面codeVal为下拉选择值,c为收入表,c2为其他表,c1为固定支出表
	var proArrs = arrGroup(c8, 'lineNo', 9); //产品描述数据
	var proNav = '',
		proLi = '';
		var arrName=[];
	for (var i = 0; i < proArrs.length; i++) {
		if(arrVal(proArrs[i].type,arrName)){
				proArrs.splice(i,1);
				i=i-1;
		}else{
			arrName.push(proArrs[i].type);
			if (i == 0) {
				proNav += '<span class="bg" data-list="items' + i + '">' + proArrs[i].type + '</span>';
			} else {
				proNav += '<span data-list="items' + i + '">' + proArrs[i].type + '</span>';
			}
			proLi += proListHtml(proArrs[i], i);
		}
	}
	$('<section></section>').appendTo('body');
	$('<footer id="next" onclick="submit(true);"><p>确定</p></footer>').insertAfter('section');
	//产品描述title
	var cpHtml = '';
	cpHtml += '<div class="cr-title"><p class="t-tile mode-defule">产品描述</p>';
	cpHtml += '<div class="click-icon cp-btn"><span class="add-icon"></span><span class="del-icon"></span></div></div>';
	$(cpHtml).appendTo('section');
	//产品Tablist
	var cpTab = '';
	cpTab += '<div class="tab-list cp-list"><div class="tab-nav cp-nav">' + proNav + '</div>' + proLi + '</div>';
	$(cpTab).appendTo('section');

	//具体描述
	var specificHtml = '';
	specificHtml += '<div class="x-title"><p>具体描述</p></div><div class="con-list"><ul class="other-cost"><li name="productGrossProfitRate"><div class="list-left"><span>&nbsp;&nbsp;</span><i>产品抽样加权毛利润</i></div>';
	specificHtml += '<div class="list-right"><input type="number" value="0" class="cp-weighting obj-data" name="productGrossProfitRate" disabled="disabled"><b class="d-icon">%</b></div></li></ul></div>';
	$(specificHtml).appendTo('section');
	//扣点提成
	var tcHtml = '';
	if (questionCode != "0006" && questionCode != "0010") { //服务型、贸易型、生产型
		var typeLi = '',
			typeNav = '';
		if (c10.length > 0) {
			var typeArrs = arrGroup(c10, 'lineNo', 9);
			for (var i = 0; i < typeArrs.length; i++) {
				typeLi += tcListHtml(typeArrs[i], i);
				if (i == 0) {
					typeNav += '<span class="bg" data-list="items' + i + '" name="' + typeArrs[i].type + '">' + getGuidValue(codeVal, typeArrs[i].type) + '</span>';
				} else {
					typeNav += '<span data-list="items' + i + '" name="' + typeArrs[i].type + '">' + getGuidValue(codeVal, typeArrs[i].type) + '</span>';
				}
			}
		}
		tcHtml += '<div class="cr-title"><p class="t-tile mode-defule">01.扣点提成</p>';
		tcHtml += '<div class="click-icon deduct-btn"><span class="add-icon"></span><span class="del-icon"></span></div></div>';
		tcHtml += '<div class="tab-list buckle-btn"><div class="tab-nav deduct-nav">' + typeNav + '</div>' + typeLi + '</div>';
	}
	if (questionCode == "0005" || questionCode == "0009" || questionCode == "0006" || questionCode == "0010") { //服务型和农业型  原材料和劳务成本的合计成本率为
		tcHtml += '<div class="summation" name="costRate"><div class="summation-left"><i>&nbsp;</i><span>原材料和劳务成本的合计成本率为:</span></div><div class="summation-right">' +
			'<input type="number" value="0" name="costRate" class="hjcb-costRate obj-data"><b class="summation-icon">%</></div></div>';
	}
	if (questionCode == "0008" || questionCode == "0004") { //生产型	原材料和外发加工费的合计成本率
		tcHtml += '<div class="summation" name="costRate"><div class="summation-left"><i>&nbsp;</i><span>原材料和外发加工费的合计成本率为:</span></div><div class="summation-right">' +
			'<input type="number" value="0" name="costRate" class="hjcb-costRate obj-data"><b class="summation-icon">%</></div></div>';
	}
	$(tcHtml).appendTo('section');
	//月均净利和保本情况、备注
	var yHtml = '';
	yHtml += '<div class="x-title"><p>02.月均利润</p></div><div class="con-list">';
	yHtml += '<ul class="other-cost"><li class="two-row" name="avgNetProfit"><p><span>*</span>客户生意扣除所有开支（包括家庭开支），每月平均净利有</p>';
	yHtml += '<div class="br-input"><input type="number" value="0" name="avgNetProfit" class="month-money keep-money-list obj-data"><b class="d-icon">元</b></div>';
	yHtml += '</li><li name="netGrossProfitRate"><div class="list-left"><span>*</span><i>毛利率为</i></div><div class="list-right"><input name="netGrossProfitRate" disabled="disabled" type="number" value="0" class="month-profit obj-data"><b class="d-icon">%</b></div></li>';
	yHtml += '</ul></div><div class="x-title"><p>03.保本情况</p></div><div class="con-list">';
	yHtml += '<ul class="other-cost"><li class="input-row" name="breakEvenTurnover"><p><span>*</span>客户口述，月销售额达到<input type="number" value="0" class="keep-money keep-money-list obj-data" name="breakEvenTurnover"><b class="d-icon">元</b>，可以保本</p>';
	yHtml += '</li><li name="turnoverGrossProfitRate"><div class="list-left"><span>*</span><i>毛利率为</i></div><div class="list-right"><input name="turnoverGrossProfitRate" type="number" disabled="disabled" value="0" class="keep-profit obj-data"><b class="d-icon">%</b></div></li>';
	yHtml += '</ul></div>';
	$(yHtml).appendTo('section');
	//综合毛利
	var comprehensive = '';
	comprehensive += '<div class="xx-title"><p class="q-tile mode-defule">综合毛利率</p>';
	comprehensive += '<div class="q-lr mode-defule"><input type="number" value="0" name="comprehensiveGrossProfitRate" class="comprehensiveGrossProfitRate obj-data"><b>%</b></div>';
	comprehensive += '</div><div class="x-title" style="position:relative;"><p>可变成本交叉检验其他方法</p><div class="txt" name="remark"><textarea name="remark" class="other-textarea obj-data" placeholder="此处可录入1000字"></textarea></div></div><div class="con-list" style="position:relative;"><ul><li class="input-row"><p><span>&nbsp;&nbsp;</span>其他影响现金流的因素/未来12个月的支出/收入计划</p>';
	comprehensive += '</li><li name="influenceFactor" class="textarea"><textarea name="influenceFactor" class="other-textarea obj-data" placeholder="此处可录入1000字"></textarea></li></ul></div>';
	$(comprehensive).appendTo('section');

	if (c9 != null) { //保本、综合毛利润、备注、具体描述值获取
		console.log(c9);
		var $li = $('.other-cost li');
		for (var key in c9) {
			for (var t = 0; t < $li.length; t++) {
				if ($li.eq(t).attr('name') == key) {
					$li.eq(t).css('color', '#A0A0A5');
					if ($li.eq(t).find('input').length > 0) {
						if (c9[key] != null) {
							$li.eq(t).find('input').val(c9[key]).css('color', '#191919');
							$('.br-input input').css('color', '#191919');
							$('.month-profit').css('color', '#191919');
						}
					}
				}
			}

		}
		arrProjects = c9;

		if (c9.costRate != null) {
			$('.summation-right input').val(c9.costRate).css('color', '#191919');
			$('.summation-left span').css('color', '#A0A0A5');
		}
		$('.textarea textarea').val(c9.influenceFactor).css('color', '#191919');
		$('.txt textarea').val(c9.remark).css('color', '#191919');
		$('input[name="comprehensiveGrossProfitRate"]').val(c9.comprehensiveGrossProfitRate);
	} else { //答案为空时
		var acquiesce = {};
		acquiesce["serialNo"] = default_serialNo,
			acquiesce["productGrossProfitRate"] = 0,
			acquiesce["costRate"] = 0.0,
			acquiesce["avgNetProfit"] = 0.0,
			acquiesce["netGrossProfitRate"] = 0,
			acquiesce["breakEvenTurnover"] = 0.0,
			acquiesce["turnoverGrossProfitRate"] = 0,
			acquiesce["remark"] = null,
			acquiesce["comprehensiveGrossProfitRate"] = 0.0,
			acquiesce["influenceFactor"] = null
		arrProjects = acquiesce;
	}

	calculateProfit(); //计算

	//月均净利润
	keepMoney(c2, c, c1, c0, 1);
	keepMoney(c2, c, c1, c0, 2);
	$('.month-money').on('change keyup', function() {
		keepMoney(c2, c, c1, c0, 1);
	});

	//保本情况毛利率
	$('.keep-money').on('change keyup', function() {
		keepMoney(c2, c, c1, c0, 2);
	});

}

/**
 * 页签span点击事件
 * 切换页签显示数据
 */
function spanClick() {
	$(document).on('click', '.cp-nav span', function() { //产品描述
		$('.cp-nav span').removeClass('bg');
		$(this).addClass('bg');
		$('.pro-lists').hide();
		$('.pro-lists').eq($(this).index()).show();
	});

	$(document).on('click', '.deduct-nav span', function() { //商品扣点
		$('.deduct-nav span').removeClass('bg');
		$(this).addClass('bg');
		$('.deduct-lists').hide();
		$('.deduct-lists').eq($(this).index()).show();
	});
}

//计算产品描述
function calculateProfit() {
	var sumWeighting = 0;
	var saleRatioSum = 0;
	$('.cp').each(function() {
		var EnterPrice = Number($(this).find('.enterPrice').val()); //进价
		var SalePrice = Number($(this).find('.salePrice').val()); //售价
		var saleRatios = Number($(this).find('.saleRatio_1').val()); //销售占比
		var Profit = twoDecimal(Number(SalePrice - EnterPrice)); //利润
		var GrossProfitRate = 0;
		if (SalePrice == 0) {
			GrossProfitRate = 0;
		} else {
			GrossProfitRate = oneDecimal((Profit / SalePrice) * 100);
		}
		$(this).find('.profit').val(Profit).css('color', '#191919'); //利润
		$(this).find('.profit').parent().prev().children('i').css('color', '#A0A0A5');
		$(this).find('.grossProfitRate').val(GrossProfitRate).css('color', '#191919'); //毛利率
		$(this).find('.grossProfitRate').parent().prev().children('i').css('color', '#A0A0A5');
		saleRatioSum += Number(saleRatios);
		sumWeighting += Number(GrossProfitRate) * Number(saleRatios);
	});

	var cpWeighting = 0;
	if (saleRatioSum == 0) {
		cpWeighting = oneDecimal(sumWeighting);
	} else {
		cpWeighting = oneDecimal(sumWeighting / saleRatioSum); //产品抽样加权毛利率
	}
	console.log(cpWeighting)
	$('.cp-weighting').val(cpWeighting).css('color', '#191919'); //产品抽样加权毛利率
	$('.cp-weighting').parent().prev().children('i').css('color', '#A0A0A5');
}

function crossOtherValidate() {
	var verifyResult = true; //校验的结果
	var errMask_1 = [];
	var errMask_2 = [];
	var reg = (/^(\d{0,10})$/); //0-10位的正整数
	var reg_a = (/^.{0,1000}$/); //1000位任意字符
	var reg_title = (/^(.{0,50})$/); //50位任意字符
	var reg_two = (/^(([1-9]\d{0,9})|(0))(\.\d{1,2})?$/); //10位正整数或带两位小数
	var reg_one = (/^(([1-9]\d{0,9})|(0))(\.\d{1})?$/); ////10位正整数或带1位小数
	var reg_percent = (/^(100|[1-9]?[0-9])$/); //百分数,不含小数
	var reg_per1 = (/^((100)|(([1-9]\d{0,1})|(0))(\.\d{1})?)$/); //百分比只能带一位小数

	$('.other-textarea').each(function() {//备注
		var textVal = $(this).val();
		if (textVal.length>1000) {
			console.log('字段：' + $(this).parent().prev().html() + '正则校验  >>>>>校验不通过');
			$(this).parent().append($('<label class="textarea-error">最多输入1000字符!</label>'));
			verifyResult = false;
		} else {
			$('.textarea-error').remove();
		}
	})
	
	$('.keep-money-list').each(function(){//保本
		var inputVal = $(this).val();
		if (!reg.test(inputVal)) {
			console.log('字段：' + $(this).parent().prev().html() + '正则校验  >>>>>校验不通过');
			$(this).parent().append($('<label class="error_check">输入整数且不能超10位!</label>'));
			verifyResult = false;
		} 
	})
	
	var hjcb = $('.hjcb-costRate').val(); //合计成本
	if (hjcb != '' && hjcb != undefined) {
		if (!reg_per1.test(hjcb)) {
			console.log('字段：' + $('.hjcb-costRate').parent().prev().find('span').html() + '正则校验  >>>>>校验不通过');
			$('.hjcb-costRate').parent().parent().append($('<label class="verify-error">百分比只能带一位小数!</label>'));
			verifyResult = false;
		}
	}

	var zhProfitRate = $('.comprehensiveGrossProfitRate').val(); //综合毛利率
	if (zhProfitRate != '' && zhProfitRate != undefined) {
		if (!reg_per1.test(zhProfitRate)) {
			console.log('字段：' + $('.comprehensiveGrossProfitRate').parent().prev().html() + '正则校验  >>>>>校验不通过');
			$('.comprehensiveGrossProfitRate').parent().parent().append($('<label class="verify-error">百分比只能带一位小数!</label>'));
			verifyResult = false;
		} 
	}

	var saleProVal = 0;
	$('.pro-lists').each(function() { //产品描述
		var name = $(this).find('.typeInput'); //名字
		var enterPrice = $(this).find('.enterPrice'); //进价
		var salePrice = $(this).find('.salePrice'); //售价
		var saleRatio = $(this).find('.saleRatio_1'); //占比
		if (!reg_title.test(name.val()) || name.val() == '') {
			console.log('字段：' + name.parent().prev().children('i').html() + '正则校验  >>>>>校验不通过');
			name.parent().parent().append($('<label class="verify-error">50位任意字符</label>'));
			verifyResult = false;
			$('.month-error').remove();
			errMask_1.push($(this).attr('data-list'));
		}
		if (!reg_two.test(enterPrice.val())) {
			console.log('字段：' + enterPrice.parent().prev().children('i').html() + '正则校验  >>>>>校验不通过');
			enterPrice.parent().parent().append($('<label class="verify-error">10位正整数或带两位小数!</label>'));
			verifyResult = false;
			errMask_1.push($(this).attr('data-list'));
		}

		if (!reg_two.test(salePrice.val())) {
			console.log('字段：' + salePrice.parent().prev().children('i').html() + '正则校验  >>>>>校验不通过');
			salePrice.parent().parent().append($('<label class="verify-error">10位正整数或带两位小数!</label>'));
			verifyResult = false;
			errMask_1.push($(this).attr('data-list'));
		}

		if (!reg_percent.test(saleRatio.val())) {
			console.log('字段：' + saleRatio.parent().prev().children('i').html() + '正则校验  >>>>>校验不通过');
			saleRatio.parent().parent().append($('<label class="verify-error">输入百分数,不含小数!</label>'));
			verifyResult = false;
			errMask_1.push($(this).attr('data-list'));
		} else {
			saleProVal += Number(saleRatio.val());
		}
		
		
	});
	
	//扣点提成
	var saleTypeVal=0;
	$('.deduct-lists').each(function(){
		var typeName=$(this).find('.typename');//类名
		var kdSale=$(this).find('.kd_saleRatio');//占比
		var monthAverage=$(this).find('.month-average');//月均金额
		
		if (typeName.text()=='' ||typeName.text()=='请选择') {
			console.log('字段：' + typeName.parent().prev().children('i').html() + '正则校验  >>>>>校验不通过');
			typeName.parent().parent().append($('<label class="verify-error">请选择</label>'));
			verifyResult = false;
			errMask_2.push($(this).attr('data-list'));
		}
		
		if (!reg_per1.test(kdSale.val())) {
			console.log('字段：' + kdSale.parent().prev().children('i').html() + '正则校验  >>>>>校验不通过');
			kdSale.parent().parent().append($('<label class="verify-error">百分比只能带一位小数!</label>'));
			verifyResult = false;
			errMask_2.push($(this).attr('data-list'));
		} else {
			saleTypeVal += Number(kdSale.val());
		}
		
		if (!reg.test(monthAverage.val())) {
			console.log('字段：' + monthAverage.parent().prev().children('i').html() + '正则校验  >>>>>校验不通过');
			monthAverage.parent().parent().append($('<label class="verify-error">0-10位正整数!</label>'));
			verifyResult = false;
			errMask_2.push($(this).attr('data-list'));
		}
	})
	
	if (saleProVal > 100) {
		$('.pro-lists li[name="saleRatio"]').append('<label class="verify-error">销售占比总和不能超过100%!</label>');
		verifyResult = false;
		errMask_1.push($('.cp-nav span.bg').attr('data-list'));
	}
	
	if (saleTypeVal > 100) {
		$('.deduct-lists li[name="ratio"]').append('<label class="verify-error">销售占比总和不能超过100%!</label>');
		verifyResult = false;
		errMask_2.push($('.deduct-nav span.bg').attr('data-list'));
	}
	
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
	
	errMask_2 = aRR(errMask_2);
	if (errMask_2.length > 0) {
		$('.deduct-nav span').each(function() {
			if (arrVal($(this).attr('data-list'), errMask_2)) {
				$(this).addClass('error-tab');
			} else {
				$(this).removeClass('error-tab');
			}
		})
	} else {
		$('.deduct-nav span').removeClass('error-tab');
	}
	
	if(verifyResult){
		$('.verify-error').remove();
		$('.month-error').remove();
	}
	
	return verifyResult;
}

function submit(statue) {
	var sumArr=baseOther.getAll();
	for(var i=0;i<sumArr.list_1.length;i++){
		if(sumArr.list_1[i].type==''||sumArr.list_1[i].type==null||sumArr.list_1[i].type==undefined){
			sumArr.list_1.splice(i,1);
			i=i-1;
		}
	}
	
	for(var j=0;j<sumArr.list_3.length;j++){
		if(sumArr.list_3[j].type==''||sumArr.list_3[j].type==null||sumArr.list_3[j].type==undefined){
			sumArr.list_3.splice(j,1);
			j=j-1;
		}
	}
	var ValidityState=crossOtherValidate();
	var subJosn = {};
	ModeAnswer.bossAcrossOtherTypes = sumArr.list_3;
	ModeAnswer.bossAcrossOtherCost = sumArr.list_2;
	ModeAnswer.bossAcrossVariableCosts = sumArr.list_1;
	answerJson.bossIncomeAccountModel = ModeAnswer;
	subJosn = answerJson;
	//TODO
    androidDataSubmit(statue,subJosn,ValidityState);
}
//销售模式类别选择
function type_mask(arr, _th) {
	var tabNav = []; //表示已经选择的值存放
	var NavTag = $('.deduct-nav span');
	for (var j = 0; j < NavTag.length; j++) {
		tabNav.push(NavTag.eq(j).text());
		console.log(tabNav);
	}
	var mask = '';
	mask += '<div id="t-mask"><div class="mask-bg"></div><div class="mask-con">';
	mask += '<div class="info-con"><ul>';
	for (var i = 0; i < arr.length; i++) {
		mask += '<li name="' + arr[i].key + '">' + arr[i].value + '</li>';
	}
	mask += '<li class="cancel">取消</li></ul></div></div></div>';
	$(mask).appendTo('body');
	if (tabNav.length > 0) {
		var $li = $('.info-con ul li');
		for (var t = 0; t < $li.length; t++) {
			if (arrVal($li.eq(t).text(), tabNav)) {
				$li.eq(t).hide();
				//				$li.eq(t).css('color','#A0A0A5');
			}
		}
	}

	$('.cancel').click(function() {
		$('#t-mask').remove();
	});
	$('.info-con li').not('.cancel').click(function() {
		_th.parent().siblings('.verify-error').remove();
		_th.text($(this).text()).css('color', '#191919');
		_th.attr('name', $(this).attr('name'));
		_th.parent().prev().children('i').css('color', '#A0A0A5');
		$('.deduct-nav span.bg').text($(this).text());
		$('#t-mask').remove();
	})

}

function keepMoney(c2, c, c1, c0, num) { //月均净利润c2为其他,c为收入,c1为固定支出
	var otherIncome = 0; //其他收入
	var otherFamily = 0; //家庭开支
	var moneyIncome = 0; //收入表
	var moneyOutcome = 0; //固定支出表
	var n = 0;
	$('.rato-error').remove();
	for (var i = 0; i < 12; i++) {
		var IncomSum = 0; //收入
		var outcomSum = 0; //可变成本
		var FiedcomSum = 0; //固定支出
		var QtIncomSum = 0; //其他收入
		var Inmonth = 0; //月收入
		var Kbmonth = 0; //月可变成本
		var Fiedmonth = 0; //月固定支出
		var Qtmonth = 0; //月其他
		var QtInmonth = 0; //月其他收入
		var QtoutcomSum = 0; //家庭支出
		for (var j = 0; j < c.length; j++) { //收入
			if (dateVal[i].date == c[j].date) {
				if (c[j].type == 1) {
					Inmonth = Number(c[j].amount);
					IncomSum += Number(c[j].amount);
				}

			}
		}
		for (var j = 0; j < c0.length; j++) { //可变成本
			if (dateVal[i].date == c0[j].date) {
				if (c0[j].type == 1) {
					Kbmonth = Number(c0[j].amount);
					outcomSum += Number(c0[j].amount);
				}
			}
		}
		for (var j = 0; j < c1.length; j++) { //固定支出
			if (dateVal[i].date == c1[j].date) {
				if (c1[j].type == 1) {
					if (c1[j].amount == undefined) {
						c1[j].amount = 0;
					}
					FiedcomSum += Number(c1[j].amount);
					Fiedmonth = Number(c1[j].amount);
				}
			}
		}
		for (var j = 0; j < c2.length; j++) { //其他
			if (dateVal[i].date == c2[j].date) {
				if (c2[j].type == 1) {
					if (c2[j].category == 1 || c2[j].category == 2 || c2[j].category == 3) { //家庭开支、分期还款\其他支出
						Qtmonth = 0;
						Qtmonth += Number(c2[j].amount);
						QtoutcomSum += Number(c2[j].amount);
					}
					if (c2[j].category == 4) { //其他收入
						QtIncomSum += Number(c2[j].amount);
						QtInmonth = Number(c2[j].amount)
					}
				}

			}
		}
		var Qt = QtInmonth - Qtmonth;
		if (Qt == 0 && Inmonth == 0 && Fiedmonth == 0 && Kbmonth == 0) {
			n++;
		}
		moneyIncome += IncomSum;
		moneyOutcome += FiedcomSum;
		otherIncome += QtIncomSum;
		otherFamily += QtoutcomSum;
	}
	//月均利润毛利率
	if (num == 1) {
		var month_money = $('.month-money').val(); //月均净利润
		var monthProfit = 0;
		if (moneyIncome != 0) {
			if (month_money.length > 10 || month_money % 1 != 0) {
//				$('.month-money').parent().after('<laber class="error_check">输入整数且不能超10位！</laber>');
				return false;
			}
			$('.error_check').remove();
			monthProfit = (Number(month_money) - toDecimal(otherIncome / (12 - n)) + toDecimal(otherFamily / (12 - n)) + toDecimal(moneyOutcome / (12 - n))) / toDecimal(moneyIncome / (12 - n));
		} else {
			monthProfit = 0;
		}
		$('.month-profit').val(oneDecimal(monthProfit * 100)).attr('disabled', 'disabled');
	}
	//保本情况毛利率
	if (num == 2) {
		var keep_money = $('.keep-money').val(); //保本情况
		var keepProfitMoney = 0;
		if (keep_money > 0) {
			if (keep_money.length > 10 || keep_money % 1 != 0) {
//				$('.keep-money').parent().after('<laber class="error_check">输入整数且不能超10位！</laber>');
				return false;
			}
			keepProfitMoney = (toDecimal(moneyOutcome / (12 - n)) + toDecimal(otherFamily / (12 - n)) - toDecimal(otherIncome / (12 - n))) / keep_money;
			$('.error_check').remove();
		} else {
			keepProfitMoney = 0;
			$('.keep-money').select();
//			$('.keep-money').parent().after('<laber class="error_check">月销售额输入需大于0</laber>');
			return false;

		}
		$('.keep-profit').val(oneDecimal(keepProfitMoney * 100)).attr('disabled', 'disabled');
	}
}