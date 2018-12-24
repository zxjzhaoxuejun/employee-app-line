var Y_month='';
var default_serialNo;
var comprehensiveRate;//综合毛利率
var arrIncome=[];//损益表收入
var dateAll=[];
var dateVal;
var ModeAnswer;
var answerJson;//整个答案
var c;
function loadBossIncomeAccountVariableCost(data){
	answerJson=jsonForm(data[1]);
	ModeAnswer=answerJson.bossIncomeAccountModel;//损益表模块答案
	 c=answerJson.bossIncomeAccountModel.bossIncomeAccountIncomes;//损益表收入
	var c0=answerJson.bossIncomeAccountModel.bossIncomeAccountVariableCosts;//损益表可变成本
	var c1=answerJson.bossIncomeAccountModel.bossIncomeAccountFixedOutcomes;//损益表固定支出
	var c2=answerJson.bossIncomeAccountModel.bossIncomeAccountOthers;//损益表其他
	var c3=answerJson.bossIncomeAccountModel.bossIncomeAccountSummaries;//损益表所得税
	var c4=answerJson.bossIncomeAccountModel.bossIncomeAccountTurnoverResources;//损益表利润
	var c5=answerJson.bossIncomeAccountModel.bossAcrossOtherCost;//对可变成本及其他交叉校验
	if(answerJson.serialNo.serialNo!=undefined){
		default_serialNo = answerJson.serialNo.serialNo;//单号
	}else{
		default_serialNo = null;
	}
	dateVal=answerJson.bossIncomeAccountDates;//日期
	for(var h=0;h<dateVal.length;h++){//月份区间
	 	dateAll.push(dateVal[h].date);
	 }
	comprehensiveRate=c5.comprehensiveGrossProfitRate;//综合毛利率
	for(var i=0;i<c.length;i++){
		if(c[i].type==2&&c[i].lineNo==2){
	    		if(c[i].date!=undefined&&c[i].date!=null&&c[i].date != "undefined"){
	    			Y_month=c[i].date
	    		}
	    	}
		arrIncome[i]=c[i];
	    }

	createCosts(c0,c);//生成页面
	baseFun.intoFun(null,5);
	spanClick();
	otherValBlur();
}
function createCosts(b,c){
	if (c.length>0) {//有数据时
		inTotalHtml(1);
		var datajson=arrGroup(c,'lineNo',3);
		for(var i=0;i<datajson.length;i++){
			var tag='';
			if(i==0){
				tag='<span data-list="item'+i+'" data-mask="1" class="bg" name="'+datajson[i].name+'">'+
					datajson[i].name+'</span>';
			}else{
				tag='<span  data-list="item'+i+'" name="'+datajson[i].name+'">'+
			    datajson[i].name+'</span>';
			}
			$('.tab-nav').append(tag);
			
			for(var j=0;j<b.length;j++){
				if(b[j].lineNo==datajson[i].lineNo){
					datajson[i].variableCost=b[j].variableCost;
				}
			}
			createHtml(datajson[i],i);
		}
	}else{//当加载进入没有答案时
		inTotalHtml(1);
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
				'<input name="amount" type="number" disabled="disabled" value="0">'+
			'</li>';
	}
	var showMode='';
	if(num==0){
		showMode='display:block';
	}else{
		showMode='display:none';
	}
	var html='<div class="tab-con tab-income" style="'+showMode+'" data-list="item'+num+'">'+
				'<p name="name"><i>*</i><span>百分比</span><input type="number" placeholder="请输入" value="'+delNull(dataList.variableCost)+'" class="variable-input" lineNo="'+dataList.lineNo+'" data-name="'+dataList.name+'"><b class="d-icon">%</b></p>'+
				'<ul class="tab">'+
					'<li class="tab-title"><span>月份</span><span class="percentage">可变成本'+delNull(dataList.variableCost)+'%</span></li>'+
					$liHtml+'</ul><ul class="yq-month"><li class="tab-title"><span>预期代表月份</span><span class="percentage">可变成本'+delNull(dataList.variableCost)+'%</span></li>'+
					'<li><input type="text" name="date" disabled="disabled" class="no-month" value=""><input class="expect-month" name="amount" type="number" disabled="disabled" value=""></li></ul></div>';
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
					$li.eq(k).children('input').val(toDecimal($liList[i].amount*dataList.variableCost/100))
				}
			}
		}else{
			$('.tab-con[data-list="item'+num+'"] .expect-month').val(toDecimal($liList[i].amount*dataList.variableCost/100));
			$('.tab-con[data-list="item'+num+'"] .no-month').val($liList[i].date);
		}
	}
}


$(document).on('keyup','.tab-income p input',function(){
  	   var twoNum=$(this).val();
  		var reg=(/^((100)|(([1-9]\d{0,1})|(0))(\.\d{1})?)$/);
			if(!reg.test(twoNum)){
				$('.verify-error').remove();
				$(this).parent().append('<label class="verify-error">百分比只能带一位小数！</label>');
  		        $(this).select();
			}else{
  		$('.verify-error').remove();
	  	$('.percentage').text('可变成本'+$(this).val()+'%（元）');
	  	var spanBg=$(this).attr('lineNo');
	  	for(var i=0;i<c.length;i++){
	  		if(c[i].lineNo==spanBg){
	  			if(c[i].type==1){
	  			var $li=$(this).parent().parent().find('.tab').children('li');
		    	   for(var k=1;k<$li.length;k++){
			    	 	if($li.eq(k).children('span').text()==c[i].date){
			    	 	  $li.eq(k).children('input').val(toDecimal(c[i].amount*($(this).val())/100));
			    	 	}
		    	    }
	    	    }
	  		   if(c[i].type==2){
	    	   	  $(this).parent().parent().find('.expect-month').val(toDecimal(c[i].amount*($(this).val())/100))
	    	   }
	  		}
	  		
	  	}
  	}
  });


function allCount(){//计算总计
    var dataList=baseFun.getAll(4);
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

function submit(statue){
	
var subJosn={};
var submitArr=baseFun.getAll(4);
ModeAnswer.bossIncomeAccountVariableCosts=submitArr;
answerJson.bossIncomeAccountModel =ModeAnswer;
subJosn=answerJson;
console.log(submitArr);
//TODO
var ValidityState=validateFun();
	androidDataSubmit(statue,subJosn,ValidityState);
}
