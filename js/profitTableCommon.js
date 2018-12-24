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
	var tag='<span class="bg" name="" data-list="item'+num+'">添加</span>';
	$('.tab-nav').append(tag);
	var displayText='';
	if(Y_month==''){
		displayText='disabled="disabled"';
	}
	var html='<div class="tab-con tab-income"  data-list="item'+num+'">'+
				'<p name="name"><i>*</i><span>费用类型</span><span class="right-code income-account make-sure" name="">请选择</span></p>'+
				'<div class="otherResource" style="display: none;"><i style="color:#f40137;">*</i><span>其他费用</span>'+
					'<input type="text" placeholder="请输入" name="otherName" style="display: inline-block;">'+
				'</div>'+
				'<ul class="tab">'+
					'<li class="tab-title"><span>月份</span><span class="percentage">金额（元）</span></li>'+
					$liHtml+'</ul><ul class="yq-month"><li class="tab-title"><span>预期代表月份</span><span class="percentage">金额（元）</span></li>'+
					'<li><input type="text" name="date" disabled="disabled" class="no-month" value="'+Y_month+'"><input name="amount" class="expect-month" type="number" '+displayText+' value=""></li></ul></div>';
	            $('.tab-list').append(html);
	            
}

/**
 * 收入和可变成本的添加页签
 * @param {Object} num
 */
function inAddHtml(num,time){
	var $liHtml='';
	for(var j=0;j<dateVal.length;j++){
		$liHtml+='<li><span name="date">'+dateVal[j].date+'</span>'+
				'<input name="amount" type="number" value="0">'+
			'</li>';
	}
	var tag='<span class="bg" name="" data-list="item'+num+'">添加</span>';
	$('.tab-nav').append(tag);
	var displayText='';
	if(time==''){
		displayText='disabled="disabled"';
	}
	var html='<div class="tab-con tab-income"  data-list="item'+num+'">'+
				'<p name="name"><i>*</i><span>生意模式</span><input type="text" placeholder="请输入" value="" class="typeIncome"></p>'+
				'<ul class="tab">'+
					'<li class="tab-title"><span>月份</span><span class="percentage">收入（元）</span></li>'+
					$liHtml+'</ul><ul class="yq-month"><li class="tab-title"><span>预期代表月份</span><span class="percentage">收入（元）</span></li>'+
					'<li><input type="text" name="date" disabled="disabled" class="no-month" value="'+time+'"><input name="amount" class="expect-month" type="number" '+displayText+' value=""></li></ul></div>';
	            $('.tab-list').append(html);
	            
}



/**
 * 总额页签
 */
function totalHtml(){
	var $liHtml='';
	for(var j=0;j<dateVal.length;j++){
		$liHtml+='<li><span name="date">'+dateVal[j].date+'</span>'+
				'<span class="total-span" style="border:none">0</span>'+
			'</li>';
	}
	var tag='<span data-list="itemTotal" onclick="allCount();">总额</span>';
	$('.tab-nav').append(tag);
	var html='<div class="tab-con tab-income" data-list="itemTotal" style="display:none;">'+
				'<p name="name"><i>*</i><span>费用类型</span><span class="right-code">总额</span></p>'+
				'<ul class="tab">'+
					'<li class="tab-title"><span>月份</span><span class="percentage">金额（元）</span></li>'+
					$liHtml+'</ul><ul class="yq-month"><li class="tab-title"><span>预期代表月份</span><span class="percentage">金额（元）</span></li>'+
					'<li><span name="date" class="no-month">'+Y_month+'</span><span class="expect-month" style="border:none">0</span></li></ul></div>';
	            $('.tab-list').append(html);
}


/**
 * 收入总额页签
 */
function inTotalHtml(num){
	var titleShow='';
	if(num==1){
		titleShow='display:none';
	}else{
		titleShow='display:block';
	}
	var $liHtml='';
	for(var j=0;j<dateVal.length;j++){
		$liHtml+='<li><span name="date">'+dateVal[j].date+'</span>'+
				'<span class="total-span" style="border:none">0</span>'+
			'</li>';
	}
	var tag='<span data-list="itemTotal" onclick="allCount();">总计</span>';
	$('.tab-nav').append(tag);
	var html='<div class="tab-con tab-income" data-list="itemTotal" style="display:none;">'+
				'<p name="name" style="'+titleShow+'"><i>*</i><span>生意模式</span><input type="text" disabled="disabled" value="总计" class="typeIncome"></p>'+
				'<ul class="tab">'+
					'<li class="tab-title"><span>月份</span><span class="percentage">金额（元）</span></li>'+
					$liHtml+'</ul><ul class="yq-month"><li class="tab-title"><span>预期代表月份</span><span class="percentage">金额（元）</span></li>'+
					'<li><span name="date" class="no-month">'+Y_month+'</span><span class="expect-month" style="border:none">0</span></li></ul></div>';
	            $('.tab-list').append(html);
}
