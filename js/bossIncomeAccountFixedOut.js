var default_serialNo;//单号
var type_val=[];
var Y_month='';//预期月份
var dateVal;//日期
var dateAll=[];
var codeVal;//下拉值
var ModeAnswer;
var answerJson;//整个答案
function loadBossIncomeAccountFixedOut(data){
     answerJson=jsonForm(data[1]);
	ModeAnswer=answerJson.bossIncomeAccountModel;//损益表模块答案
	var b=answerJson.bossIncomeAccountModel;//损益表模块
	var c=b.bossIncomeAccountIncomes;//损益表收入
	if(b.bossIncomeAccountIncomes==null){
		c=[];
	};
	var c0=b.bossIncomeAccountVariableCosts;//损益表可变成本
	var c1=b.bossIncomeAccountFixedOutcomes;//损益表固定支出
	if(b.bossIncomeAccountFixedOutcomes==null){
		c1=[];
	};
	var c2=b.bossIncomeAccountOthers;//损益表其他
	var c3=b.bossIncomeAccountSummaries;//损益表所得税
	var c4=b.bossIncomeAccountTurnoverResources;//损益表利润
	var c5=b.bossAcrossTurnover;//营业额交叉验证-销售额
	var c6=b.bossAcrossTurnoverProjects;//营业额交叉验证-产品
	var c7=b.bossAcrossTurnoverTypes ;//营业额交叉验证-模式
	codeVal=data[0].sysDicMap.bossIncomeAccountFixedOutcomeDict;//下拉选择值
	dateVal=answerJson.bossIncomeAccountDates;//日期
	for(var h=0;h<dateVal.length;h++){//月份区间
	 	dateAll.push(dateVal[h].date);
	 }
    for(var i=0;i<c.length;i++){
    	if(c[i].type==2&&c[i].lineNo==2){
    		if(c[i].date!=undefined&&c[i].date!=null&&c[i].date != "undefined"){
    			Y_month=c[i].date;
    		}
    	}
    }
    
	if(answerJson.serialNo.serialNo!=undefined){
		default_serialNo = answerJson.serialNo.serialNo;//单号
	}else{
		default_serialNo = null;
	}
	for(var i=0;i<c1.length;i++){
		if(c1[i].name=='null'||c1[i].name==''||c1[i].name==null){
			c1.splice(i,1);
			i=i-1;
		}
	}
	createOutcomes(c1);//生成页面
	baseFun.intoFun(codeVal,2);
	spanClick();
	otherValBlur();
}

function createOutcomes(b){
	if (b.length>0) {//有数据时
		totalHtml();
		var datajson=arrGroup(b,'lineNo',1);
		for(var i=0;i<datajson.length;i++){
			var tag='';
			if(i==0){
				tag='<span data-list="item'+i+'" class="bg" name="'+datajson[i].name+'" lineno="'+datajson[i].lineNo+'">'+
			    getGuidValue(codeVal,datajson[i].name)+'</span>';
			}else{
				tag='<span  data-list="item'+i+'" name="'+datajson[i].name+'" lineno="'+datajson[i].lineNo+'">'+
			    getGuidValue(codeVal,datajson[i].name)+'</span>';
			}
			$('.tab-nav').append(tag);
			createHtml(datajson[i],i);
		}
	}else{//当加载进入没有答案时
		totalHtml();
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
	if(!getGuidValue(codeVal,dataList.name).indexOf('其他')){
		otherShow='display:block';
	}else{
		otherShow='display:none';
	}
	var html='<div class="tab-con tab-income" style="'+showMode+'"  data-list="item'+num+'">'+
				'<p name="name"><i>*</i><span style="color: rgb(160, 160, 165);">费用类型</span><span class="right-code income-account make-sure" name="'+dataList.name+'" style="color: rgb(25, 25, 25);">'+getGuidValue(codeVal,dataList.name)+'</span></p>'+
				'<div class="otherResource" style="'+otherShow+'"><i style="color:#f40137;">*</i><span style="color: rgb(160, 160, 165);">其他费用</span>'+
					'<input type="text" placeholder="请输入" name="otherName" style="color: rgb(25, 25, 25); display: inline-block;" value="'+delNull(dataList.nameOther)+'">'+
				'</div>'+
				'<ul class="tab">'+
					'<li class="tab-title"><span>月份</span><span class="percentage">金额（元）</span></li>'+
					$liHtml+'</ul><ul class="yq-month"><li class="tab-title"><span>预期代表月份</span><span class="percentage">金额（元）</span></li>'+
					'<li><input type="text" name="date" disabled="disabled" class="no-month" value="'+Y_month+'"><input name="amount" class="expect-month" type="number"  value=""></li></ul></div>';
	            $('.tab-list').append(html);    
	            
    for(var i=0;i<$liList.length;i++){
    	if($liList[i].type=='1'){
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
		}else{
			if(Y_month==''){
				$('.tab-con[data-list="item'+num+'"] .expect-month').val('').attr('disabled','disabled');
			}else{
				$('.tab-con[data-list="item'+num+'"] .expect-month').val($liList[i].amount);
			}
			
		}
	}            
}

//各项列表之和
function allCount(){
	var dataList=baseFun.getAll(1);
	var y_monthSum=0;
	for(var j=0;j<dateVal.length;j++){
	var $liSum=0;
		for(var i=0;i<dataList.length;i++){
			if(dateVal[j].date==dataList[i].date&&dataList[i].type==1){
				$liSum+=Number(dataList[i].amount);
			}
			else if(dataList[i].type==2){
				y_monthSum+=Number(dataList[i].amount);
			}
		}
		$('.tab-con[data-list="itemTotal"] .total-span').eq(j).text($liSum);
    }
   var expVal=y_monthSum/12;
   if(expVal==0){
   		$('.tab-con[data-list="itemTotal"] .expect-month').text('');
   }else{
   		$('.tab-con[data-list="itemTotal"] .expect-month').text(expVal);
   }
}

/**
 * 提交答案
 * @param {Object} statue
 */
function submit(statue){
	var subJosn={};
	var submitArr=baseFun.getAll(1);
	for(var i=0;i<submitArr.length;i++){
		if(submitArr[i].name==null||submitArr[i].name==''||submitArr[i].name=='null'){
			submitArr.splice(i,1);
			i=i-1;
		}
	}
	console.log(submitArr);
	ModeAnswer.bossIncomeAccountFixedOutcomes=submitArr;
	answerJson.bossIncomeAccountModel=ModeAnswer;
	subJosn=answerJson;
	var ValidityState=validateFun();
	//调用保存方法
	androidDataSubmit(statue,subJosn,ValidityState);
}