var default_serialNo;
var type_val = [];
var Y_month; //预期月份
var sourceVal; //数据来源选项值
var standardVal; //数据标准选项值
var ModeAnswer;
var dateVal;
var dateAll=[];//日期区间
var answerJson; //整个答案
function loadBossTurnoverSource(data) {
	answerJson = jsonForm(data[1]);
	ModeAnswer = answerJson.bossIncomeAccountModel; //损益表模块答案
	var b = answerJson.bossIncomeAccountModel; //损益表模块
	var c = b.bossIncomeAccountIncomes; //损益表收入
	if (c == null) {
		c = [];
	};
	var c0 = b.bossIncomeAccountVariableCosts; //损益表可变成本
	var c1 = b.bossIncomeAccountFixedOutcomes; //损益表固定支出
	var c2 = b.bossIncomeAccountOthers; //损益表其他
	var c3 = b.bossIncomeAccountSummaries; //损益表所得税
	var c4 = b.bossIncomeAccountTurnoverResources; //营业额来源
	if (c4 == null) {
		c4 = [];
	};
	for (var k = 0; k < c4.length; k++) {
		if (c4[k].type == null || c4[k].resource == null) {
			c4.splice(k, 1);
			k = k - 1;
		}
	}
	var c5 = b.bossAcrossTurnover; //营业额交叉验证-销售额
	var c6 = b.bossAcrossTurnoverProjects; //营业额交叉验证-产品
	var c7 = b.bossAcrossTurnoverTypes; //营业额交叉验证-模式
	//	data[0] = $.parseJSON(data[0]);//本地展示需要对数据处理
	sourceVal = data[0].sysDicMap.bossIncomeAccountTurnoverResourceDict; //来源下拉选择值
	standardVal = data[0].sysDicMap.bossIncomeAccountTurnoverResourceTypeDict; //数据标准下拉选择值
	dateVal = answerJson.bossIncomeAccountDates; //日期
	for(var h=0;h<dateVal.length;h++){//月份区间
	 	dateAll.push(dateVal[h].date);
	 }
	for (var i = 0; i < c.length; i++) {
		if (c[i].type == 2 && c[i].lineNo == 1) {
			if (c[i].date != null || c[i].date != undefined) {
				Y_month = c[i].date
			}
		}
	}

		if(answerJson.serialNo.serialNo!=undefined){
			default_serialNo = answerJson.serialNo.serialNo;//单号
		}else{
			default_serialNo = null;
		}
	createOutcomes(c4); //生成页面
	baseFun.intoFun(null,1);
	spanClick();
	otherValBlur();
}


function createOutcomes(b){
	if (b.length>0) {//有数据时
		var datajson=arrGroup(b,'lineNo',5);
		for(var i=0;i<datajson.length;i++){
			var tag='';
			if(i==0){
				tag='<span data-list="item'+i+'" class="bg" standardname="'+datajson[i].type+'" sourcename="'+datajson[i].resource+'" lineno="'+datajson[i].lineNo+'">'+
			    getGuidValue(standardVal,datajson[i].type)+'-'+getGuidValue(sourceVal,datajson[i].resource)+'</span>';
			}else{
				tag='<span  data-list="item'+i+'" standardname="'+datajson[i].type+'" sourcename="'+datajson[i].resource+'" lineno="'+datajson[i].lineNo+'">'+
			    getGuidValue(standardVal,datajson[i].type)+'-'+getGuidValue(sourceVal,datajson[i].resource)+'</span>';
			}
			$('.tab-nav').append(tag);
			createHtml(datajson[i],i);
		}
	}else{//当加载进入没有答案时
		addHtml(0);
	}
}

/**
 * 当有答案时，创建页面
 * @param {Object} dataList 传入每个页签数组
 * @param {Object} num
 */
function createHtml(dataList,num){
    var numCount=0;
	var $liHtml='';
	var $liList=dataList.data;
	for(var j=0;j<dateAll.length;j++){
		$liHtml+='<li><span name="date">'+dateAll[j]+'</span>'+
				'<input name="amount" type="number" value="0">'+
			'</li>';
	}
	var showMode='';
	if(num==0){
		showMode='display:block';
	}else{
		showMode='display:none';
	}
	
	var otherShow='';
	if(!getGuidValue(sourceVal,dataList.resource).indexOf('其他')){
		otherShow='display:block';
	}else{
		otherShow='display:none';
	}
	var html='<div class="tab-con tab-income" style="'+showMode+'"  data-list="item'+num+'">'+
				'<p name="name"><i>&nbsp;&nbsp;</i><span style="color: rgb(160, 160, 165);">数据标准</span><span class="right-code data-standard" name="'+dataList.type+'" style="color: rgb(25, 25, 25);">'+getGuidValue(standardVal,dataList.type)+'</span></p>'+
				'<p name="name"><i>&nbsp;&nbsp;</i><span style="color: rgb(160, 160, 165);">数据来源</span><span class="right-code data-source" name="'+dataList.resource+'" style="color: rgb(25, 25, 25);">'+getGuidValue(sourceVal,dataList.resource)+'</span></p>'+
				'<div class="otherResource" style="'+otherShow+'"><i style="color:#f40137;">*</i><span style="color: rgb(160, 160, 165);">其他数据来源</span>'+
					'<input type="text" placeholder="请输入" name="otherName" style="color: rgb(25, 25, 25); display: inline-block;" value="'+delNull(dataList.otherResource)+'">'+
				'</div>'+
				'<ul class="tab">'+
					'<li class="tab-title"><span>月份</span><span class="percentage">金额（元）</span></li>'+
					$liHtml+'</ul></div>';
	            $('.tab-list').append(html);
	            
	            
    for(var i=0;i<$liList.length;i++){
		if(!arrVal($liList[i].date,dateAll)){//判断月份是否在区间内
			numCount++;
			$liList[i].date=dateAll[12-numCount];
			$liList[i].amount=0;
	    }
		var $li = $('.tab-con[data-list="item'+num+'"] .tab li');
		for (var k = 1; k < $li.length; k++) {
			if ($li.eq(k).children('span').text() == $liList[i].date) {
				$li.eq(k).children('input').val($liList[i].amount)
			}
		}
	}
	            
}

/**
 * 新增和没有数据时展示的页面
 * 添加页签的html
 */

function addHtml(num){
	var $liHtml='';
	for(var j=0;j<dateVal.length;j++){
		$liHtml+='<li><span name="date">'+dateVal[j].date+'</span>'+
				'<input name="amount" type="number" value="0">'+
			'</li>';
	}
	var tag='<span class="bg" standardname="" sourcename="" lineno="" data-list="item'+num+'">添加</span>';
	$('.tab-nav').append(tag);
	var html='<div class="tab-con tab-income"  data-list="item'+num+'">'+
				'<p name="name"><i>&nbsp;&nbsp;</i><span>数据标准</span><span class="right-code data-standard" name="">请选择</span></p>'+
				'<p name="name"><i>&nbsp;&nbsp;</i><span>数据来源</span><span class="right-code data-source" name="" >请选择</span></p>'+
				'<div class="otherResource" style="display: none;"><i style="color:#f40137;">*</i><span>其他数据来源</span>'+
					'<input type="text" placeholder="请输入" name="otherName" style="display: inline-block;">'+
				'</div>'+
				'<ul class="tab">'+
					'<li class="tab-title"><span>月份</span><span class="percentage">金额（元）</span></li>'+
					$liHtml+'</ul></div>';
	            $('.tab-list').append(html);
	            
}


/**
 * 弹窗下拉选择type_mask()方法
 * @param {Object} arr  下拉选择值数组
 * @param {Object} _th  操作的DOM节点
 * @param {Object} typeName 区分是来源和标准
 */
function type_mask_1(arr, _th, typeName) {
	var mask = '';
	mask += '<div id="t-mask"><div class="mask-bg"></div><div class="mask-con">';
	mask += '<div class="info-con mode1"><ul>';
	for (var i = 0; i < arr.length; i++) {
		mask += '<li name="' + arr[i].key + '">' + arr[i].value + '</li>';
	}
	mask += '</ul></div><div class="cancel_1">取消</div></div></div>';
	$(mask).appendTo('body');
	$('.cancel_1').click(function() {
		$('#t-mask').remove();
	});
	$('.info-con li').not('.cancel_1').click(function() { //点击选择
		var checkVal = $(this).text(); //选择的文本值
		var checkGuid=$(this).attr('name');//guid
		_th.text(checkVal).css('color', '#191919');
		_th.attr('name',checkGuid);
		_th.prev().css('color','#A0A0A5');
		$('.right-code').addClass('make-sure');
		var spanArr=[];
			for(var i=0;i<$('.tab-nav span').length;i++){
				var spanV=$('.tab-nav span').eq(i).attr('standardname')+'-'+$('.tab-nav span').eq(i).attr('sourcename');
				spanArr.push(spanV);
			}
		$('.tab-nav span.bg').attr(typeName,checkGuid);
		if($('.tab-nav span.bg').attr('standardname')!=''&&$('.tab-nav span.bg').attr('sourcename')!=''){
			var bz=getGuidValue(standardVal,$('.tab-nav span.bg').attr('standardname'));
			var ly=getGuidValue(sourceVal,$('.tab-nav span.bg').attr('sourcename'));
			var spanBgGuid=$('.tab-nav span.bg').attr('standardname')+'-'+$('.tab-nav span.bg').attr('sourcename');
			if(arrVal(spanBgGuid,spanArr)){
				_th.parent().append('<label class="verify-error">请不要选择相同类型！</label>');
				_th.text('请选择');
				_th.attr('name','');
				$('.tab-nav span.bg').attr(typeName,'');
			}else{
				$('.verify-error').remove();
				$('.tab-nav span.bg').text(bz+'-'+ly);
			}
		}
		if(typeName=='sourcename'){
			if(!checkVal.indexOf('其他')){
				_th.parent().next('.otherResource').show();
			}else{
				_th.parent().next('.otherResource').hide();
				_th.parent().next('.otherResource').children('input').val('');
			}
		}
		
		$('#t-mask').remove();
	})
}

/**
 * 提交答案
 * @param {Object} statue为true手动提交，false自动保存或者返回
 */

function submit(statue){
	var subJosn = {};
	var submitArr=baseFun.getAll(0);
	for(var i=0;i<submitArr.length;i++){
		if(submitArr[i].resource==null||submitArr[i].type==''||submitArr[i].resource==''||submitArr[i].type==null){
			submitArr.splice(i,1);
			i=i-1;
		}
	}
    console.log(submitArr);
	ModeAnswer.bossIncomeAccountTurnoverResources = submitArr;
	answerJson.bossIncomeAccountModel = ModeAnswer;
	subJosn = answerJson;
	//TODO
	var ValidityState=validateFun();
	androidDataSubmit(statue,subJosn,ValidityState);
}
