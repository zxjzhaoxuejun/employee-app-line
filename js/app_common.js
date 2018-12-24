/**
 * 2017-12-26
 * 新的校验数据方法
 */
function validateFun() { //校验方法
	var inputDom = $('input[name="amount"]'); //表格
	var verifyResult = true; //校验的结果
	var bsMask=[];
	$('.right-code').each(function(){//其他必填校验
		if(!$(this).text().indexOf('其他')){
			var otherVal=$(this).parent().next('.otherResource').children('input').val();
			if(otherVal==''||otherVal== '请输入'){
				$(this).parent().next('.otherResource').append($('<label class="verify-error verify-height">输入数据不能为空!</label>'));
				verifyResult = false;
				bsMask.push($(this).parent().parent().attr('data-list'));
			}
		}
		if($(this).hasClass('make-sure')){
			if(!$(this).text().indexOf('请选择')){
				$(this).parent().append($('<label class="verify-error verify-height">选项不能为空!</label>'));
				verifyResult = false;
				bsMask.push($(this).parent().parent().attr('data-list'));
			}
		}
	});
	
	$('.typeIncome').each(function(){//收入
		if($(this).val()==''||$(this).val()== '请输入'){
			$(this).after($('<label class="verify-error verify-height">输入数据不能为空!</label>'));
			verifyResult = false;
			bsMask.push($(this).parent().parent().attr('data-list'));
		}
	});
	
	
	$('.variable-input').each(function(){//可变成本
		var reg=(/^((100)|(([1-9]\d{0,1})|(0))(\.\d{1})?)$/);
		if(!reg.test($(this).val())){
			$(this).after($('<label class="verify-error">百分比只能带一位小数！</label>'));
			verifyResult = false;
			bsMask.push($(this).parent().parent().attr('data-list'));
		}
	});
	//预期月份校验
	var currYear=(new Date()).getFullYear();
	var currMonth=(new Date()).getMonth()+1;
	if(currMonth<10){
		currMonth='0'+currMonth;
	}
	var nowTime=currYear+'-'+currMonth;
	if($('#demo_date1').val()!=''){
		if($('#demo_date1').val()<nowTime){
			$('.yq-verify-error').remove();
			$('#demo_date1').after('<label class="yq-verify-error">选择日期不能小于当前日期！</label>');
			verifyResult = false;
			bsMask.push($('#demo_date1').parent().parent().parent().attr('data-list'));
		}else{
			$('.yq-verify-error').remove();
		}
	}
	//预期月份校验 end

	for (var i = 0; i < inputDom.length; i++) { //表格方面的校验
		var reg = (/^(\d{0,10})$/);//0-10位的正整数
		var inputVal=$.trim(inputDom.eq(i).val());
		if(!reg.test(inputVal)){
			console.log('字段：' + inputDom.eq(i).prev().html() + '正则校验  >>>>>校验不通过');
			inputDom.eq(i).parent().append($('<label class="verify-error">输入0-10位的正整数!</label>'));
			verifyResult = false;
			bsMask.push(inputDom.eq(i).parent().parent().parent().attr('data-list'));
		}else{
			if (inputDom.eq(i).prev().html() == undefined) {
				console.log('字段：' + inputDom.eq(i).val() + '正则校验  >>>>>校验通过');
			} else {
				console.log('字段：' + inputDom.eq(i).prev().html() + '正则校验  >>>>>校验通过');
			}
		}	
	}
	bsMask=aRR(bsMask);
	
	if(bsMask.length>0){
		$('.tab-nav span').each(function(){
			if(arrVal($(this).attr('data-list'),bsMask)){
				$(this).addClass('error-tab');
			}else{
				$(this).removeClass('error-tab');
				}
		})
	}else{
		$('.tab-nav span').removeClass('error-tab');
	}
	console.log('校验结果：' + verifyResult);
	if (verifyResult) {
		$('.verify-error').remove();
	}
	return verifyResult;
}



/**
 * 页签span点击事件
 * 切换页签显示数据
 */
function spanClick(){
	$(document).on('click','.tab-nav span',function(){
		$('.tab-nav span').removeClass('bg');
		$(this).addClass('bg');
		$('.tab-con').hide();
		$('.tab-con').eq($(this).index()).show();
	});
}

/**
 * 下拉弹窗触发事件
 * 添加、删除触发事件
 * 获取提交数据触发事件
 * model表示模块名 1.营业额数据来源；2.固定支出；3.其他；4.收入
 * listCodeVal表示下拉选项值
 */
var baseFun={
	intoFun:function(listCodeVal,model){
		//数据来源下拉选择
		$(document).on('click','.data-source',function() {
			baseFun.codeList($(this),sourceVal,'sourcename',model);
		});
		//end
		//数据标准下拉选择
		$(document).on('click','.data-standard',function() {
			baseFun.codeList($(this),standardVal,'standardname',model);
		});
		
		//固定支出下拉选项income-account
		$(document).on('click','.income-account',function() {
			baseFun.codeList($(this),listCodeVal,null,model);
		});
		$(document).on('change keyup','input',function() {
			validateFun();//动态校验
		});
		//添加页签
		$(document).on('click','.add-icon',function(){
			var len=new Date().getTime(); //时间戳
			if(model==4){
				var time=$('#demo_date1').val();
				baseFun.addTab(len,'income',time);
			}else{
				baseFun.addTab(len);
			}
		});
		
		//删除页签
		$(document).on('click','.del-icon',function(){
			var num=0;
			if(model==1){
				num=0;
			}else{
				num=1;
			}
			baseFun.delDom(num);
		})
	},
	/**
	 * 添加页签
	 * 
	 */
	addTab:function(len,addType,time){//addtype表示不同的模块
		$('.tab-con').hide();
		$('.tab-nav span').removeClass('bg');
		if(addType=='income'){
			inAddHtml(len,time);
			if($('.tab-nav span').length>=4){
				$('.add-icon').hide();
			}
		}else{
			addHtml(len);
		}
	},
	/**
	 * 删除页签
	 * DOM结构
	 */
	delDom:function(eqNum){
		var spanLen=$('.tab-nav span');
		for (var i = 0; i < spanLen.length; i++) {
			$('<i class="tab-colse" name="' + i + '"></i>').appendTo(spanLen.eq(i));
		}
		$(document).on('click','.tab-con',function() {
			$('.tab-colse').remove();
		});
		
		$('.tab-colse').unbind("click").click(function() {
			if ($(this).parent().attr('data-list') == 'itemTotal'||$(this).parent().attr('data-mask') == '1') {
			var del = '';
			del += '<div id="mask"><div class="mask_bg"></div><div class="remove">';
			del += '<p class="_sc">系统带出不能删除！<p class="down">知道了</p></div></div>';
			$(del).appendTo('body');
			$('.down').click(function() {
				$('#mask').remove();
				$('.tab-colse').remove();
			});

		}else{
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
				$('.add-icon').show();
				$('#mask').remove();
				_th.parent().remove();
				$('.tab-colse').remove();
				var delNum=_th.parent().attr('data-list');
				$('.tab-con[data-list="'+delNum+'"]').remove();
				if($('.tab-con').eq(eqNum).attr('class')){
					$('.tab-con').eq(eqNum).show();
					spanLen.eq(eqNum).addClass('bg');
				}else{
					$('.tab-con').eq(0).show();
					spanLen.eq(0).addClass('bg');
				}
				
			});
		}
		});
	},
	/**
	 * 下拉值弹出框
	 * @param {Object} obj 点击的DOM
	 * @param {Object} typeJson 下拉值数组
	 * @param {Object} typeName 区分是来源和标准
	 */
	codeList:function(obj,typeJson,typeName,typeNum){
		if(typeNum==1){
			type_mask_1(typeJson, obj, typeName);
		}else{
			type_mask_2(typeJson, obj);
		}
		
	},
	
	/**
	 * 获取表格数据
	 */
	getAll:function(model){//model:0.营业额数据来源；1.固定支出;2.损益表-其他;3.损益表-收入;4.损益表-可变成本
		var allData=[];
		$('.tab-con').each(function(index,i){
			if($(this).attr('data-list')!="itemTotal"){
				_ele=$(this);
				var obj=_ele.find('.tab').children('li');
				for(var i=1;i<obj.length;i++){
					var jsonList={};
					jsonList['date']=obj.eq(i).children('span').text();//日期
					if(obj.eq(i).children('input').val()==''){//金额
						jsonList['amount']=null;
					}else{
						jsonList['amount']=obj.eq(i).children('input').val();
					}
					jsonList['lineNo']=index+1;
					jsonList['serialNo']=default_serialNo;
					
					if(model==0){//区分模块
						jsonList['type']=_ele.find('.right-code').eq(0).attr('name');
						if(_ele.find('.right-code').eq(1).attr('name')==undefined){
							jsonList['resource']=null;
						}else{
							jsonList['resource']=_ele.find('.right-code').eq(1).attr('name');
						}
		
						var otherVal=_ele.find('.otherResource').children('input').val();
						if(otherVal==''){
							jsonList['otherResource']=null;
						}else{
							jsonList['otherResource']=otherVal;
						}
					}else if(model==1){//固定支出
						jsonList['name']=_ele.find('.right-code').eq(0).attr('name');
						jsonList['type']='1';
						var otherVal=_ele.find('.otherResource').children('input').val();
						if(otherVal==''){
							jsonList['nameOther']=null;
						}else{
							jsonList['nameOther']=otherVal;
						}
					}else if(model==2){//损益表-其他
						jsonList['name']=_ele.find('.right-code').eq(0).attr('name');
						jsonList['category']=_ele.find('.right-code').eq(0).attr('category');
						jsonList['type']='1';
						var otherVal=_ele.find('.otherResource').children('input').val();
						if(otherVal==''){
							jsonList['otherName']=null;
						}else{
							jsonList['otherName']=otherVal;
						}
					}else if(model==3){//损益表-收入
						jsonList['name']=_ele.find('.typeIncome').val();
						jsonList['type']='1';
					}else if(model==4){//可变成本
						jsonList['variableCost']=_ele.find('.variable-input').val();
						jsonList['name']=_ele.find('.variable-input').attr('data-name');
						jsonList['type']='1';
					}
					allData.push(jsonList);
				}
				if(model!=0){
					var expect_obj=_ele.find('.yq-month').children('li').eq(1);//预期月份
					var otherVal=_ele.find('.otherResource').children('input').val();
						if(otherVal==''){
							otherVal=null;
						}else{
							otherVal=otherVal;
						}
					var expect_json={};
					var yDate='';
						if(expect_obj.find('.no-month').val()==undefined||expect_obj.find('.no-month').val()=="undefined"){
							yDate=null
						}else{
							yDate=expect_obj.find('.no-month').val();
						}
					if(model==1){//固定支出
						expect_json={
							"type":'2',
							"date":yDate,//expect_obj.find('.no-month').val(),
							"amount":expect_obj.find('.expect-month').val(),
							"nameOther":otherVal,
							"name":_ele.find('.right-code').eq(0).attr('name'),
							"lineNo":index+1,
							"serialNo":default_serialNo,
						};
					}else if(model==2){//损益表-其他
						expect_json={
							"type":'2',
							"date":yDate,//expect_obj.find('.no-month').val(),
							"amount":expect_obj.find('.expect-month').val(),
							"otherName":otherVal,
							"name":_ele.find('.right-code').eq(0).attr('name'),
							"category":_ele.find('.right-code').eq(0).attr('category'),
							"lineNo":index+1,
							"serialNo":default_serialNo,
						};
					}else if(model==3){//损益表-收入
						expect_json={
							"type":'2',
							"date":yDate,//expect_obj.find('.no-month').val(),
							"amount":expect_obj.find('.expect-month').val(),
							"name":_ele.find('.typeIncome').val(),
							"lineNo":index+1,
							"serialNo":default_serialNo,
						};
					}else if(model==4){//可变成本
						expect_json={
							"type":'2',
							"date":yDate,//expect_obj.find('.no-month').val(),
							"amount":expect_obj.find('.expect-month').val(),
							"variableCost":_ele.find('.variable-input').val(),
							"lineNo":index+1,
							"name":_ele.find('.variable-input').attr('data-name'),
							"serialNo":default_serialNo,
						};
					}
					allData.push(expect_json);
				}
			}
		});
		return allData;
	}
}

/**
 * 弹窗下拉选择type_mask_2()方法
 * @param {Object} arr  下拉选择值数组
 * @param {Object} _th  操作的DOM节点
 */
function type_mask_2(arr, _th) {
	var tabNav = [];
	var NavTag = $('.tab-nav span');
	for (var j = 1; j < NavTag.length; j++) {//已选择的项
		tabNav.push(NavTag.eq(j).attr('name'));
	}
	var mask = '';
	mask += '<div id="t-mask"><div class="mask-bg"></div><div class="mask-con">';
	mask += '<div class="info-con mode1"><ul>';
	for (var i = 0; i < arr.length; i++) {
		mask += '<li name="' + arr[i].key + '">' + arr[i].value + '</li>';
	}
	mask += '</ul></div><div class="cancel_1">取消</div></div></div>';
	$(mask).appendTo('body');
	$('.cancel_1,.mask-bg').click(function() {
		$('#t-mask').remove();
	});
	
	if (tabNav.length > 0) { //去除已选择的项
		var $maskLi = $('.info-con ul li');
		for (var t = 0; t < $maskLi.length; t++) {
			if (arrVal($maskLi.eq(t).attr('name'), tabNav)) {
				$maskLi.eq(t).hide();
			}
		}
	}
	
	$('.info-con li').not('.cancel_1').click(function() { //点击选择
		var checkVal = $(this).text(); //选择的文本值
		var checkGuid=$(this).attr('name');//guid
		_th.text(checkVal).css('color', '#191919');
		_th.attr('name',checkGuid);
		_th.prev().css('color','#A0A0A5');
		$('.tab-nav span.bg').attr('name',checkGuid).text(checkVal);
		
		if(!checkVal.indexOf('其他')){
			_th.parent().next('.otherResource').show();
		}else{
			_th.parent().next('.otherResource').hide();
			_th.parent().next('.otherResource').children('input').val('');
		}
		if (!checkVal.indexOf("其他支出")) {
			_th.attr('category',3);
		} else if (checkVal == "家庭开支") {
			_th.attr('category',1);
		} else if (checkVal == "分期还款") {
			_th.attr('category',2);
		} else if(checkVal == "其他收入"){
			_th.attr('category',4);
		}
		$('.verify-error').remove();
		$('#t-mask').remove();
	})
}

function otherValBlur(){
	$(document).on('blur','.otherResource input',function(){
	if($(this).val()!=''){
		$(this).css('color','#191919');
		$(this).prev('span').css('color','#A0A0A5');
	}else{
		$(this).css('color','#A0A0A5');
		$(this).prev('span').css('color','#191919');
	}
})
}


/**
 * delNull(val)除去null空值
 * @param {Object} val
 */
function delNull(val) {
	var backNull = '';
	if (val == null || val == "NULL") {
		backNull = "";
	} else {
		backNull = val;
	}
	//		var backNull=val==null||val=='Null'?"":val;
	return backNull
}
