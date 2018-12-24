var num=0; //table类型 预定义
var sj={};  
var tsj={};
var answerType1;
var answerType2;
var duInput; //input 类型的ul
var duTable;  //table 类型的ul
var modelOjbName;  //模块名
var finaljson = {};  //最后输出的json对象
var objjson=[] ;  //用于存储c.name
var newA;
var duInputArr=[];  //用于存储input类型的du
var lj;
var _Code="CODE";
var _String="STRING";
var _Telephone="TELEPHONE";
var _Date="DATE";
var _Double="DOUBLE";
var _Integer="INTEGER";
var _Address="ADDRESS";
var _SSQAddress="SSQADDRESS";
var _Checkbox="CHECKBOX";
function loadCreditReportInfo(data){
	var AndroidAnswer = data[1];
//	console.log(data[1])
	data =data[0];
	data["answer"]=AndroidAnswer;
	function jsonForm(jdata){
		var r=jdata.answer;
		var answerJson={};//答案json字符串转换
		for(var key in r){
			answerJson[key]=$.parseJSON(r[key]);
			console.log(answerJson[key])
		}
		jdata.answer = answerJson;
		return jdata;
	}
	var data=jsonForm(data);
	var a=data;
	var b=a.modelOjbName;
	var e=a.answer;
	modelOjbName=data.modelOjbName;
	console.log(a);
	data.answer["completeStatus"]=2;
	$('body').attr("data-json",JSON.stringify(data.answer));
	for(i=0; i<a.modelDetailSubList.length; i++){
		// input 单条信息
		if(a.modelDetailSubList[i].type=="INPUT"){
			xqInput(a.modelDetailSubList[i],b,e);
			answerType1="input";
		}
		// table 多条信息    参考点击添加成员
		if(a.modelDetailSubList[i].type=="TABLE"){
			xqTable(a.modelDetailSubList[i],b,e,a);
			answerType2="table";
		}
	}
	$("input").attr("disabled","disabled");
}

$("<section></section>").appendTo("body");
function xqInput(c,b,e){//input类型
	var _idsp=c.code.split(".");//分割code
	var _id ="";//给div设id
	for(var i=0;i<_idsp.length;i++){
		_id+=_idsp[i];//合并code
	};
	$('<div class="problem" id="'+_id+'" objName="'+c.objName+'"><p>'+c.name+'</p><ul></ul></div>').appendTo('section');
	duInput = $("#"+_id+" ul");
	duInputArr.push(duInput);
	create(c, _id, duInput,b,e);
}

function xqTable(c,b,e,a){//table类型
	var _idsp=c.code.split(".");//分割code
	var _id ="";//给div设id
	for(var i=0;i<_idsp.length;i++){
		_id+=_idsp[i];//合并code
	};
//	$('<div class="problem" id="'+_id+'"><p>'+c.name+'</p></div>').appendTo('section');
	if($("section .titlebox").length==0){
		$('<div class="creditResult"><div class="titlebox"></div></div>').appendTo('section');
	}

//	if()
//	'<div class="titlebox"><div class="leftTitle backcolor">报告查询次数</div><div class="rightTitle">近期逾期次数</div></div>'
	duTable = $("#"+_id+" ul");
	createTb(c,_id,e,a,b);
}
function createTb(c,_id,e){
	objjson.push(c.objName);
	if($('.creditResult .leftTitle').length==0){
		$('<div class="leftTitle backcolor">'+c.name+'</div>').appendTo('.titlebox');
//		$('<div class="creditTable creditTable01"><ul><li><div>时间期限</div><div>贷款审批</div><div>信用卡审批</div><div class="border">贷款+信用卡审批</div></li><li><div>1个月内</div><div><input type="text" value=""></div><div><input type="text" value=""></div><div class="border"><input type="text" value=""></div></li><li><div>3个月内</div><div><input type="text" value=""></div><div><input type="text" value=""></div><div class="border"><input type="text" value=""></div></li><li><div>6个月内</div><div><input type="text" value=""></div><div><input type="text" value=""></div><div class="border"><input type="text" value=""></div></li></ul></div>').appendTo(".creditResult");
		$('<div class="creditTable creditTable01"><ul><li></li></ul></div>').appendTo(".creditResult");
		for(var i =0;i<c.questionDetailList.length;i++){
			$('<div fieldName="'+c.questionDetailList[i].fieldName+'">'+c.questionDetailList[i].name+'</div>').appendTo('.creditTable01 li:first-child');
		}
		if(e.creditReportInfoModel!=""){
			console.log(e.creditReportInfoModel.creditReports)
			if(e.creditReportInfoModel.creditReports!=null){
				for(var i=0;i<e.creditReportInfoModel.creditReports.length;i++){
					var _li=$('<li></li>');
					_li.appendTo(".creditTable01 ul");
					for(var j=0;j<$('.creditTable01 li:first-child').children().length;j++){
						$('<div fieldname="'+$('.creditTable01 li:first-child').children().eq(j).attr("fieldname")+'"></div>').appendTo(_li);
					}
					_li.children().first().attr("serialNo",e.creditReportInfoModel.creditReports[i].serialNo).attr("_id",e.creditReportInfoModel.creditReports[i].id).text(e.creditReportInfoModel.creditReports[i].dateLimit).siblings().append($('<input type="text"/>'));
					for(var k=0;k<_li.children('div').children('input').length;k++){
						var fn= _li.children('div').children('input').eq(k).parent().attr("fieldname");
						_li.children('div').children('input').eq(k).val(e.creditReportInfoModel.creditReports[i][fn])
						_li.children('div').children('input').eq(k).parent().attr("serialNo",e.creditReportInfoModel.creditReports[i].serialNo);
						_li.children('div').children('input').eq(k).parent().attr("_id",e.creditReportInfoModel.creditReports[i].id);
					}
					
	//				serialNo="'+c.questionDetailList[i].serialNo+'" _id="'+c.questionDetailList[i].id+'"
				}
			}
				
			
		}else{
			for(var i=0;i<5;i++){
				var _li=$('<li></li>');
				_li.appendTo(".creditTable01 ul");
				for(var j=0;j<$('.creditTable01 li:first-child').children().length;j++){
					$('<div fieldname="'+$('.creditTable01 li:first-child').children().eq(j).attr("fieldname")+'"></div>').appendTo(_li)
				}
				_li.children().first().text(i+1).siblings().append($('<input type="text"/>'));
			}
		}
	}else{
		$('<div class="rightTitle">'+c.name+'</div>').appendTo('.titlebox');
		$('<div class="creditTable creditTable02"><ul><li></li></ul></div>').appendTo(".creditResult").hide();
		for(var i =0;i<c.questionDetailList.length;i++){
			$('<div fieldName="'+c.questionDetailList[i].fieldName+'">'+c.questionDetailList[i].name+'</div>').appendTo('.creditTable02 li:first-child');
		}
		if(e.creditReportInfoModel!=""){
			console.log(e.creditReportInfoModel.creditReports)
			if(e.creditReportInfoModel.overdues!=null){
				for(var i=0;i<e.creditReportInfoModel.overdues.length;i++){
					var _li=$('<li></li>');
					_li.appendTo(".creditTable02 ul");
					for(var j=0;j<$('.creditTable02 li:first-child').children().length;j++){
						$('<div fieldname="'+$('.creditTable02 li:first-child').children().eq(j).attr("fieldname")+'"><input type="text"/></div>').appendTo(_li)
					}
					for(var k=0;k<_li.children('div').children('input').length;k++){
						var fn= _li.children('div').children('input').eq(k).parent().attr("fieldname");
						_li.children('div').children('input').eq(k).val(e.creditReportInfoModel.overdues[i][fn]);
	//					if(e.creditReportInfoModel.creditReports[i].serialNo!=undefined){
	//						_li.children('div').children('input').eq(k).parent().attr("serialNo",e.creditReportInfoModel.creditReports[i].serialNo);
	//					}
	//					_li.children('div').children('input').eq(k).parent().attr("_id",e.creditReportInfoModel.creditReports[i].id);
					}
				}
			}
		}else{
			for(var i=0;i<5;i++){
				var _li=$('<li></li>');
				_li.appendTo(".creditTable02 ul");
				for(var j=0;j<$('.creditTable02 li:first-child').children().length;j++){
					$('<div fieldname="'+$('.creditTable02 li:first-child').children().eq(j).attr("fieldname")+'"><input type="text"/></div>').appendTo(_li)
				}
			}
		}
	}
	ct_click();

}
function ct_click(){
	$(".leftTitle").addClass("backcolor");
	$(".rightTitle").removeClass("backcolor");
	$(".creditTable01").show();
	$(".creditTable02").hide();
	
	$(".leftTitle").click(function  () {
		$(".leftTitle").addClass("backcolor");
		$(".rightTitle").removeClass("backcolor");
		$(".creditTable01").show();
		$(".creditTable02").hide();
	});
	$(".rightTitle").click(function  () {
		$(".leftTitle").removeClass("backcolor");
		$(".rightTitle").addClass("backcolor");
		$(".creditTable01").hide();
		$(".creditTable02").show();
	});
}
function mask2(id,_this){
	var that = id.answerChoice.split(",");
	$('<div id="mask"><div class="mask_bg"></div><ul><li class="cancel">取消</li></ul></div>').appendTo("body");
	if(that.length==1){
		$(".cancel").before($('<li>1</li><li>2</li><li>3</li><li>4</li><li class="linone">5</li>'));
	}else{
		for(var i =0;i<that.length;i++){
			$(".cancel").before($("<li>"+that[i]+"</li>"));
		}
	}
	$("#mask li").on("click",function(){
		$("#mask").remove();
		_this.children("span").html($(this).html()).css({"color":"#191919"});
		_this.siblings(".left").children("i").css({"color":"#a09fa4"});
		if($(this).html()=="取消"){
			_this.children("span").html("请选择").css({"color":"#a09fa4"});
			_this.siblings(".left").children("i").css({"color":"#191919"});
		}else{
			$(".show ul").remove();
			$(".cy").children().remove();
			$("<span>成员1</span>").appendTo($(".cy"));
		};
		return false;
	});
}
function create(c, _id, du,b,e) {    //c=a.modelDetailSubList[i] _id=c.code.split(".") du=duInput/duTable  b=a.modelOjbName;  e=a.answer;
		if(sj[modelOjbName]){
			
		}else{
			sj[modelOjbName]=[];
		}
		if(tsj["questionTableAnswerList"]){
			
		}else{
			tsj["questionTableAnswerList"]=[];
		}
		var _idj = {};
		for (var i = 0; i < c.questionDetailList.length; i++) {
			//console.log(c.questionDetailList[i].code);
			//	  文本框
			if (c.questionDetailList[i].inputType == "STRING") {
				//		是否必填
				if (c.questionDetailList[i].require) {
					$('<li data="' + c.questionDetailList[i].fieldName + '"><div class="left"><span>*</span><i title="' + c.questionDetailList[i].name + '">' + c.questionDetailList[i].name + '</i></div><div class="right"><input type="text" value="请输入' + c.questionDetailList[i].name + '"/></div></li>').appendTo(du);
					} else {
					$('<li data="' + c.questionDetailList[i].fieldName + '"><div class="left"><span>&nbsp;&nbsp;</span><i title="' + c.questionDetailList[i].name + '">' + c.questionDetailList[i].name + '</i></div><div class="right"><input type="text" value="请输入' + c.questionDetailList[i].name + '"/></div></li>').appendTo(du)
	            }
			};
			//						选择(单选or下拉列表)
			if (c.questionDetailList[i].inputType == "CODE") {
				var _al = c.questionDetailList[i].answerChoice.split(",");//给div设id
				var _idv = c.questionDetailList[i].code.replace(/\./g, "-"); //分割code

				if (c.questionDetailList[i].require) {
					//				是否必填
					if (_al.length == 2) {
						//					两个    
						$('<li  data="' + c.questionDetailList[i].fieldName + '"><div class="left"><span>*</span><i>' + c.questionDetailList[i].name + '</i></div><div class="right"><label><input name="textbox" type="radio" value="' + _al[0] + '"/>' + _al[0] + '<i></i></label><label><input name="textbox" type="radio" value="' + _al[1] + '"/>' + _al[1] + '<i></i></label></div></li>').appendTo(du);
						radioClick ();//单选框点击事件
					} else {
						//									多个
						$('<li " data="' + c.questionDetailList[i].fieldName + '"><div class="left"><span>*</span><i>' + c.questionDetailList[i].name + '</i></div><div id="' + _idv + '" class="right"><span class="choose">请选择</span><img src="img/down_icon.png" class="select"/></div></li>').appendTo(du);
						_iddv = $('#' + _idv);
						_idj[_idv] = c.questionDetailList[i]; //单独的id存到json里面
						_iddv.on("click", function() {
							var id = this.id;
							mask2(_idj[id], $(this)); //遮罩层
						});
					}
				} else {
					if (_al.length == 2) {
						//		两个
						$('<li data="' + c.questionDetailList[i].fieldName + '"><div class="left"><span>&nbsp;&nbsp;</span><i>' + c.questionDetailList[i].name + '</i></div><div class="right"><label><input name="textbox" type="radio" value="' + _al[0] + '"/>' + _al[0] + '<i></i></label><label><input name="textbox" type="radio" value="' + _al[1] + '"/>' + _al[1] + '<i></i></label></div></li>').appendTo(du);
						radioClick ();   //单选框点击事件
					} else {
						//	多个
						$('<li data="' + c.questionDetailList[i].fieldName + '"><div class="left"><span>&nbsp;&nbsp;</span><i>' + c.questionDetailList[i].name + '</i></div><div id="' + _idv + '" class="right"><span class="choose">请选择</span><img src="img/down_icon.png" class="select"/></div></li>').appendTo(du);
						_iddv = $('#' + _idv);
						_idj[_idv] = c.questionDetailList[i]; //单独的id存到json里面
						_iddv.on("click", function() {
							var id = this.id;
							mask2(_idj[id], $(this)); //遮罩层
						});
					}
				}
			};
			//		  日期
			if (c.questionDetailList[i].inputType == "DATE") {
				var _al =c.questionDetailList[i].code.split(",");
							//给div设id
				var _idv=c.questionDetailList[i].code.replace(/\./g,"-");//分割code
				var dateID='date'+_idv;
				if (c.questionDetailList[i].require) {
					//								是否必填
					$('<li data="' + c.questionDetailList[i].fieldName + '"><div class="left"><span>*</span><i>' + c.questionDetailList[i].name + '</i></div><div class="right"><input id="'+dateID+'" onclick="check_date(this.id)" type="text" readonly name="input_date" value="日期选择" data-lcalendar="1988-01-11,2020-05-29"/></div></li>').appendTo(du);
				} else {
					$('<li data="' + c.questionDetailList[i].fieldName + '"><div class="left"><span>&nbsp;&nbsp;</span><i>' + c.questionDetailList[i].name + '</i></div><div class="right"><input id="'+dateID+'" onclick="check_date(this.id)" type="text" readonly name="input_date" value="日期选择" data-lcalendar="1988-01-11,2020-05-29" /></div></li>').appendTo(du)
				}
			};
			//			整数
			if (c.questionDetailList[i].inputType == "INTEGER") {
				if (c.questionDetailList[i].require) {
					//								是否必填
					$('<li data="' + c.questionDetailList[i].fieldName + '"><div class="left"><span>*</span><i>' + c.questionDetailList[i].name + '</i></div><div class="right"><input type="number" value="请输入发薪日"/></div></li>').appendTo(du);
				} else {
					$('<li data="' + c.questionDetailList[i].fieldName + '"><div class="left"><span>&nbsp;&nbsp;</span><i>' + c.questionDetailList[i].name + '</i></div><div class="right"><input type="number" value="请输入发薪日"/></div></li>').appendTo(du);
				}
			};
			//			小数
			if (c.questionDetailList[i].inputType == "DOUBULE") {
				if (c.questionDetailList[i].require) {
					//								是否必填
					$('<li data="' + c.questionDetailList[i].fieldName + '"><div class="left"><span>*</span><i>' + c.questionDetailList[i].name + '</i></div><div class="right"><input type="number" value="请输入发薪日"/></div></li>').appendTo(du);
				} else {
					$('<li data="' + c.questionDetailList[i].fieldName + '"><div class="left"><span>&nbsp;&nbsp;</span><i>' + c.questionDetailList[i].name + '</i></div><div class="right"><input type="number" value="请输入发薪日"/></div></li>').appendTo(du);
				}
			};
			//          复选框
			if (c.questionDetailList[i].inputType == "CHECKBOX") {
				//				是否必填
				if (c.questionDetailList[i].require){
					var _al = c.questionDetailList[i].answerChoice.split(",");//给div设id
						//		 默认多个选项
					var str='<li style="height:auto;" data="' + c.questionDetailList[i].fieldName + '"><div class="left"><span>*</span><i>' + c.questionDetailList[i].name + '</i></div><div class="in_come"><ul class="income_h"></ul></div></li>';
					$(str).appendTo(du);
					var innerStr="";
					console.log(_al);
					$(".in_come .income_h").children().remove();//每次循环之前清除原有的li
					for(var j =0;j<_al.length;j++){
						innerStr='<li><img src="img/jx_icon.png"/><span>'+_al[j]+'</span></li>';
						$(".in_come .income_h").append(innerStr);
						console.log(innerStr);
					}
					Liclick () ;
				}else{
					var _al = c.questionDetailList[i].answerChoice.split(",");//给div设id
						//		 默认多个选项
					var str='<li style="height:auto;" data="' + c.questionDetailList[i].fieldName + '"><div class="left"><span>&nbsp;&nbsp;</span><i>' + c.questionDetailList[i].name + '</i></div><div class="in_come"><ul class="income_h"></ul></div></li>';
					$(str).appendTo(du);
					var innerStr="";
					console.log(_al);
					$(".in_come .income_h").children().remove();//每次循环之前清除原有的li
					for(var j =0;j<_al.length;j++){
						innerStr='<li><img src="img/jx_icon.png"/><span>'+_al[j]+'</span></li>';
						$(".in_come .income_h").append(innerStr);
						console.log(innerStr);
					}
					Liclick () ;
				}
					
			};
			//表格
		}
	//个人基本信息	
	if(b=='baseInfoModel'){
		objjson.push(c.objName);
		if(c.objName=='baseInfo'){
			for(var j=0;j<du.children().length;j++){
				for(var key in e.baseInfoModel.baseInfo){
					if(key==du.children().eq(j).attr("data")){
						if(du.children().eq(j).children(".right").children("span").length==1){
							du.children().eq(j).children(".right").children("span").text(e.baseInfoModel.baseInfo[key]);
							if(e.baseInfoModel.baseInfo[key]!="请选择"){
								du.children().eq(j).children(".left").children("i").css({"color":"#a09fa4"});
								du.children().eq(j).children(".right").children("span").css({"color":"#191919"});
							}
						}else if(du.children().eq(j).children(".right").children("input").length==1){
							du.children().eq(j).children(".right").children("input").val(e.baseInfoModel.baseInfo[key]);
							if(e.baseInfoModel.baseInfo[key]!=""){
								du.children().eq(j).children(".left").children("i").css({"color":"#a09fa4"});
								du.children().eq(j).children(".right").children("label").css({"color":"#191919"});
							}
						}else if(du.children().eq(j).children(".right").children("label").length==2){
							for(var k=0;k<du.children().eq(j).children(".right").children("label").length;k++){
								if(du.children().eq(j).children(".right").children("label").eq(k).children("input").val()==e.baseInfoModel.baseInfo[key]){
									du.children().eq(j).children(".right").children("label").eq(k).children("input").attr("checked",true);
									du.children().eq(j).children(".right").children("label").eq(k).children("input").next("i").show().parent().siblings().children("i").hide();
									du.children().eq(j).children(".right").children("label").eq(k).children("input").parent().siblings().children("input").attr("checked",false);
									du.children().eq(j).children(".right").children("label").eq(k).children("input").parent().parent().siblings(".left").children("i").css({"color":"#a09fa4"});
								}
							}
						}else if(du.children().eq(j).children(".textCon").children("textarea").length==1){
							du.children().eq(j).children(".textCon").children("textarea").text(e.baseInfoModel.baseInfo[key]);
						}
					}	
				}
			
			}
			
		}
		
		
		if(c.objName=='familyInfos'){
			for(var j=0;j<du.children().length;j++){
				for (var n=0;n<e.baseInfoModel.familyInfos.length;n++) {
					for(var key in e.baseInfoModel.familyInfos[n]){
						if(key==du.children().eq(j).attr("data")){
							if(du.children().eq(j).children(".right").children("span").length==1){
								du.children().eq(j).children(".right").children("span").text(e.baseInfoModel.familyInfos[n][key]);
								if(e.baseInfoModel.familyInfos[n][key]!="请选择"){
									du.children().eq(j).children(".left").children("i").css({"color":"#a09fa4"});
									du.children().eq(j).children(".right").children("span").css({"color":"#191919"});
								}
							}else if(du.children().eq(j).children(".right").children("input").length==1){
								du.children().eq(j).children(".right").children("input").val(e.baseInfoModel.familyInfos[n][key]);
								if(e.baseInfoModel.familyInfos[n][key]!=""){
									du.children().eq(j).children(".left").children("i").css({"color":"#a09fa4"});
									du.children().eq(j).children(".right").children("label").css({"color":"#191919"});
								}
							}else if(du.children().eq(j).children(".right").children("label").length==2){
								for(var k=0;k<du.children().eq(j).children(".right").children("label").length;k++){
									if(du.children().eq(j).children(".right").children("label").eq(k).children("input").val()==e.baseInfoModel.familyInfos[n][key]){
										du.children().eq(j).children(".right").children("label").eq(k).children("input").attr("checked",true);
										du.children().eq(j).children(".right").children("label").eq(k).children("input").next("i").show().parent().siblings().children("i").hide();
										du.children().eq(j).children(".right").children("label").eq(k).children("input").parent().siblings().children("input").attr("checked",false);
										du.children().eq(j).children(".right").children("label").eq(k).children("input").parent().parent().siblings(".left").children("i").css({"color":"#a09fa4"});
									}
								}
							}else if(du.children().eq(j).children(".textCon").children("textarea").length==1){
								du.children().eq(j).children(".textCon").children("textarea").text(e.baseInfoModel.familyInfos[n][key]);
							}
						}	
					}
				}
			}
			
		}
	}
	//信贷员建议
	if (b=="adviseModel") {
		objjson.push(c.objName);
		if (c.objName=="advise") {
			for (var j=0;j<du.children().length;j++) {
				for (var key in  e.adviseModel.advise) {
					if(key==du.children().eq(j).attr("data")){
						if(du.children().eq(j).children(".right").children("span").length==1){
							du.children().eq(j).children(".right").children("span").text(e.adviseModel.advise[key]);
							if(e.adviseModel.advise[key]!="请选择"){
								du.children().eq(j).children(".left").children("i").css({"color":"#a09fa4"});
								du.children().eq(j).children(".right").children("span").css({"color":"#191919"});
							}
						}else if(du.children().eq(j).children(".right").children("input").length==1){
							du.children().eq(j).children(".right").children("input").val(e.adviseModel.advise[key]);
							if(e.adviseModel.advise[key]!=""){
								du.children().eq(j).children(".left").children("i").css({"color":"#a09fa4"});
								du.children().eq(j).children(".right").children("label").css({"color":"#191919"});
							}
						}else if(du.children().eq(j).children(".right").children("label").length==2){
							for(var k=0;k<du.children().eq(j).children(".right").children("label").length;k++){
								if(du.children().eq(j).children(".right").children("label").eq(k).children("input").val()==e.adviseModel.advise[key]){
									du.children().eq(j).children(".right").children("label").eq(k).children("input").attr("checked",true);
									du.children().eq(j).children(".right").children("label").eq(k).children("input").next("i").show().parent().siblings().children("i").hide();
									du.children().eq(j).children(".right").children("label").eq(k).children("input").parent().siblings().children("input").attr("checked",false);
									du.children().eq(j).children(".right").children("label").eq(k).children("input").parent().parent().siblings(".left").children("i").css({"color":"#a09fa4"});
								}
							}
						}else if(du.children().eq(j).children(".textCon").children("textarea").length==1){
							du.children().eq(j).children(".textCon").children("textarea").text(e.adviseModel.advise[key]);
						}
					}
				}
			}
		}
	}
	//贷款用途
	if(b=='loanPurposeModel'){
		objjson.push(c.objName);
//				console.log(b);
				if(c.objName=='loanPurpose'){
				for(var j=0;j<du.children().length;j++){
					for(var key in e.loanPurposeModel.loanPurpose){
						console.log(e.loanPurposeModel.loanPurpose[key]);
						if(key==du.children().eq(j).attr("data")){
							if(du.children().eq(j).children(".right").children("span").length==1){
								du.children().eq(j).children(".right").children("span").text(e.loanPurposeModel.loanPurpose[key]);
								if(e.loanPurposeModel.loanPurpose[key]!="请选择"){
									du.children().eq(j).children(".left").children("i").css({"color":"#a09fa4"});
									du.children().eq(j).children(".right").children("span").css({"color":"#191919"});
								}
							}else if(du.children().eq(j).children(".right").children("input").length==1){
								du.children().eq(j).children(".right").children("input").val(e.loanPurposeModel.loanPurpose[key]);
								if(e.loanPurposeModel.loanPurpose[key]!=""){
									du.children().eq(j).children(".left").children("i").css({"color":"#a09fa4"});
									du.children().eq(j).children(".right").children("label").css({"color":"#191919"});
								}
							}else if(du.children().eq(j).children(".right").children("label").length==2){
								for(var k=0;k<du.children().eq(j).children(".right").children("label").length;k++){
									if(du.children().eq(j).children(".right").children("label").eq(k).children("input").val()==e.loanPurposeModel.loanPurpose[key]){
										du.children().eq(j).children(".right").children("label").eq(k).children("input").attr("checked",true);
										du.children().eq(j).children(".right").children("label").eq(k).children("input").next("i").show().parent().siblings().children("i").hide();
										du.children().eq(j).children(".right").children("label").eq(k).children("input").parent().siblings().children("input").attr("checked",false);
										du.children().eq(j).children(".right").children("label").eq(k).children("input").parent().parent().siblings(".left").children("i").css({"color":"#a09fa4"});
									}
								}
							}else if(du.children().eq(j).children(".textCon").children("textarea").length==1){
								du.children().eq(j).children(".textCon").children("textarea").text(e.loanPurposeModel.loanPurpose[key]);
							}
						}	
					}
				
				}
			}
		}		
		
	//工作单位信息
	if(b=='companyInfoModel'){
		objjson.push(c.objName);
				if(c.objName=='companyInfo'){
				for(var j=0;j<du.children().length;j++){
					for(var key in e.companyInfoModel.companyInfo){
						console.log(e.companyInfoModel.companyInfo[key]);
						if(key==du.children().eq(j).attr("data")){
							if(du.children().eq(j).children(".right").children("span").length==1){
								du.children().eq(j).children(".right").children("span").text(e.companyInfoModel.companyInfo[key]);
								if(e.companyInfoModel.companyInfo[key]!="请选择"){
									du.children().eq(j).children(".left").children("i").css({"color":"#a09fa4"});
									du.children().eq(j).children(".right").children("span").css({"color":"#191919"});
								}
							}else if(du.children().eq(j).children(".right").children("input").length==1){
								du.children().eq(j).children(".right").children("input").val(e.companyInfoModel.companyInfo[key]);
								if(e.companyInfoModel.companyInfo[key]!=""){
									du.children().eq(j).children(".left").children("i").css({"color":"#a09fa4"});
									du.children().eq(j).children(".right").children("label").css({"color":"#191919"});
								}
							}else if(du.children().eq(j).children(".right").children("label").length==2){
								for(var k=0;k<du.children().eq(j).children(".right").children("label").length;k++){
									if(du.children().eq(j).children(".right").children("label").eq(k).children("input").val()==e.companyInfoModel.companyInfo[key]){
										du.children().eq(j).children(".right").children("label").eq(k).children("input").attr("checked",true);
										du.children().eq(j).children(".right").children("label").eq(k).children("input").next("i").show().parent().siblings().children("i").hide();
										du.children().eq(j).children(".right").children("label").eq(k).children("input").parent().siblings().children("input").attr("checked",false);
										du.children().eq(j).children(".right").children("label").eq(k).children("input").parent().parent().siblings(".left").children("i").css({"color":"#a09fa4"});
									}
								}
							}else if(du.children().eq(j).children(".textCon").children("textarea").length==1){
								du.children().eq(j).children(".textCon").children("textarea").text(e.companyInfoModel.companyInfo[key]);
							}
						}	
					}
				
				}
			}
		}		
	//信用报告信息
	if (b=="creditReportInfoModel") {
		//贷记卡信息
		objjson.push(c.objName);
		if (c.objName=="creditInfo"){
			if(e.creditReportInfoModel.creditInfo!=null){
				du.parent().attr("_id",e.creditReportInfoModel.creditInfo.id);
				du.parent().attr("serialNo",e.creditReportInfoModel.creditInfo.serialNo);
			}
			for (var j=0;j<du.children().length;j++) {
				for (var key in  e.creditReportInfoModel.creditInfo) {
					if(key==du.children().eq(j).attr("data")){
						if(du.children().eq(j).children(".right").children("span").length==1){
							du.children().eq(j).children(".right").children("span").text(e.creditReportInfoModel.creditInfo[key]);
							if(e.creditReportInfoModel.creditInfo[key]!="请选择"){
								du.children().eq(j).children(".left").children("i").css({"color":"#a09fa4"});
								du.children().eq(j).children(".right").children("span").css({"color":"#191919"});
							}
						}else if(du.children().eq(j).children(".right").children("input").length==1){
							du.children().eq(j).children(".right").children("input").val(e.creditReportInfoModel.creditInfo[key]);
							if(e.creditReportInfoModel.creditInfo[key]!=""){
								du.children().eq(j).children(".left").children("i").css({"color":"#a09fa4"});
								du.children().eq(j).children(".right").children("label").css({"color":"#191919"});
							}
						}else if(du.children().eq(j).children(".right").children("label").length==2){
							for(var k=0;k<du.children().eq(j).children(".right").children("label").length;k++){
								if(du.children().eq(j).children(".right").children("label").eq(k).children("input").val()==e.creditReportInfoModel.creditInfo[key]){
									du.children().eq(j).children(".right").children("label").eq(k).children("input").attr("checked",true);
									du.children().eq(j).children(".right").children("label").eq(k).children("input").next("i").show().parent().siblings().children("i").hide();
									du.children().eq(j).children(".right").children("label").eq(k).children("input").parent().siblings().children("input").attr("checked",false);
									du.children().eq(j).children(".right").children("label").eq(k).children("input").parent().parent().siblings(".left").children("i").css({"color":"#a09fa4"});
								}
							}
						}else if(du.children().eq(j).children(".textCon").children("textarea").length==1){
							du.children().eq(j).children(".textCon").children("textarea").text(e.creditReportInfoModel.creditInfo[key]);
						}
					}
				}
			}
		};
		if (c.objName =="loanInfo") {//贷款信息
//			console.log(e)
			console.log(e.creditReportInfoModel)
			
			if(e.creditReportInfoModel.loanInfo!=null){
				du.parent().attr("_id",e.creditReportInfoModel.loanInfo.id);
				du.parent().attr("serialNo",e.creditReportInfoModel.loanInfo.serialNo);
			}
			for (var j=0;j<du.children().length;j++) {
				for (var key in  e.creditReportInfoModel.loanInfo) {
					if(key==du.children().eq(j).attr("data")){
						if(du.children().eq(j).children(".right").children("span").length==1){
							du.children().eq(j).children(".right").children("span").text(e.creditReportInfoModel.loanInfo[key]);
							if(e.creditReportInfoModel.loanInfo[key]!="请选择"){
								du.children().eq(j).children(".left").children("i").css({"color":"#a09fa4"});
								du.children().eq(j).children(".right").children("span").css({"color":"#191919"});
							}
						}else if(du.children().eq(j).children(".right").children("input").length==1){
							du.children().eq(j).children(".right").children("input").val(e.creditReportInfoModel.loanInfo[key]);
							if(e.creditReportInfoModel.loanInfo[key]!=""){
								du.children().eq(j).children(".left").children("i").css({"color":"#a09fa4"});
								du.children().eq(j).children(".right").children("label").css({"color":"#191919"});
							}
						}else if(du.children().eq(j).children(".right").children("label").length==2){
							for(var k=0;k<du.children().eq(j).children(".right").children("label").length;k++){
								if(du.children().eq(j).children(".right").children("label").eq(k).children("input").val()==e.creditReportInfoModel.loanInfo[key]){
									du.children().eq(j).children(".right").children("label").eq(k).children("input").attr("checked",true);
									du.children().eq(j).children(".right").children("label").eq(k).children("input").next("i").show().parent().siblings().children("i").hide();
									du.children().eq(j).children(".right").children("label").eq(k).children("input").parent().siblings().children("input").attr("checked",false);
									du.children().eq(j).children(".right").children("label").eq(k).children("input").parent().parent().siblings(".left").children("i").css({"color":"#a09fa4"});
								}
							}
						}else if(du.children().eq(j).children(".textCon").children("textarea").length==1){
							du.children().eq(j).children(".textCon").children("textarea").text(e.creditReportInfoModel.loanInfo[key]);
						}
					}
				}
			}
		}
		//信用报告查询次数
		if (c.objName=="creditReports"){    };
		// 最近24个月内逾期次数
		if (c.objName=="overdues"){    };
	}			

	
	
}//

	//调用日期插件
	function check_date (id) {
		var calendar=new lCalendar();
		calendar.init({
			"trigger":"#"+id+'',
			"type":"date"
		});
	}
	// 单选框添加事件避免冲突
	function radioClick () {
		$(".problem li label input[type='radio']").on("click", function() {
			$(this).next("i").show().parent().siblings().children("i").hide();
			$(this).attr("checked", true);
			$(this).parent().siblings().children("input").attr("checked", false);
			$(this).parent().parent().siblings(".left").children("i").css({"color": "#a09fa4"})
		});
	}
	//复选框添加点击事件
	function Liclick () {
		$(".in_come .income_h li").click(function  () {
			if($(this).children("span").hasClass("span_f")){
				$(this).children("span").removeClass("span_f");
				$(this).children("img").attr("src","img/jx_icon.png");
			}else{
				$(this).children("span").addClass("span_f");
				$(this).children("img").attr("src","img/jxt_icon.png");
			};
		})
	}
	
function submit() {
//	function submit(){
	var data=$('body').attr('data-json');
        /*empty*/
//     console.log(data)
//     data["completeStatus"] = 2;
         AndroidJs.saveWjDetalAnswer(data, false);
	var jsTemp={}; //临时数组用于保存_json
	for(j=0;j<duInputArr.length;j++){
		if(answerType1 == "input"){
			var _json1={};
			var jv;
			for(var i=0;i<duInputArr[j].children().length;i++){
				//console.log(duInputArr[j].children());
				var jm = duInputArr[j].children().eq(i).attr("data");
				var jd = duInputArr[j].children().eq(i).attr("_id");
				//  span内容
				if (duInputArr[j].children().eq(i).children(".right").children("span").length == 1) {
					jv = duInputArr[j].children().eq(i).children(".right").children("span").text();
				//输入框
				} else if (duInputArr[j].children().eq(i).children(".right").children("input").length == 1) {
					jv = duInputArr[j].children().eq(i).children(".right").children("input").val();
					// 单选框
				} else if (duInputArr[j].children().eq(i).children(".right").children("label").length == 2) {
					for (var k = 0; k <duInputArr[j].children().eq(i).children(".right").children("label").length; k++) {
						if (duInputArr[j].children().eq(i).children(".right").children("label").eq(k).children("input").attr("checked")) {
							jv = duInputArr[j].children().eq(i).children(".right").children("label").eq(k).children("input").val();
						}
					}
					//文本框
				} else if (duInputArr[j].children().eq(i).children(".textCon").children("textarea").length == 1) {
					jv = duInputArr[j].children().eq(i).children(".textCon").children("textarea").text();
				} 
				if(jd==undefined){
					jd=null;
				}
				_json1[jm]=jv;	
			}
		}
		jsTemp[duInputArr[j].parent().attr("objName")]=_json1;
	}
	// 传值
	console.log(jsTemp)
	if (modelOjbName =="creditReportInfoModel") {
		finaljson["creditReportInfoModel"] = {
			"creditInfo": {},
			"creditReports": [],
			"loanInfo": {},
			"overdues": []
		};
		for (var i=0;i<objjson.length;i++) {
			if (objjson[i] =="creditInfo") {
				finaljson["creditReportInfoModel"]["creditInfo"]=jsTemp.creditInfo;
				for(var j=0;j<$(".problem").length;j++){
					if($(".problem").eq(i).attr("objName")=="creditInfo"){
						finaljson["creditReportInfoModel"]["creditInfo"]["id"]=$(".problem").eq(j).attr("_id");
						finaljson["creditReportInfoModel"]["creditInfo"]["serialNo"]=$(".problem").eq(j).attr("serialNo");
					}
				}
			}
			if (objjson[i] =="loanInfo") {
				finaljson["creditReportInfoModel"]["loanInfo"]=jsTemp.loanInfo;
				for(var q=0;q<$(".problem").length;q++){
					if($(".problem").eq(q).attr("objName")=="loanInfo"){
						finaljson["creditReportInfoModel"]["loanInfo"]["id"]=$(".problem").eq(q).attr("_id");
					finaljson["creditReportInfoModel"]["loanInfo"]["serialNo"]=$(".problem").eq(q).attr("serialNo");
					}
				}
			}
			if (objjson[i] =="creditReports") {
				for(var k=0;k<$(".creditTable01").children("ul").children().first().siblings().length;k++){
					var newJc={};
					for(var j=0;j<$(".creditTable01").children("ul").children().first().siblings().eq(k).children().length;j++){
						var jm = $(".creditTable01").children("ul").children().first().siblings().eq(k).children().eq(j).attr("fieldname");
						var jz ;
						if($(".creditTable01").children("ul").children().first().siblings().eq(k).children().eq(j).children("input").length==0){
							jz = $(".creditTable01").children("ul").children().first().siblings().eq(k).children().eq(j).text();
							if(jz==""){
								jz=null;
							}
						}else{
							jz = $(".creditTable01").children("ul").children().first().siblings().eq(k).children().eq(j).children("input").val();
							if(jz==""){
								jz=null;
							}
						}
						newJc[jm]=jz;
						newJc["id"]=$(".creditTable01").children("ul").children().first().siblings().eq(k).children().eq(j).attr("_id");
						newJc["serialNo"]=$(".creditTable01").children("ul").children().first().siblings().eq(k).children().eq(j).attr("serialNo");
					}
					finaljson["creditReportInfoModel"]["creditReports"].push(newJc);
				}
			}
			if (objjson[i] =="overdues") {
				for(var k=0;k<$(".creditTable02").children("ul").children().first().siblings().length;k++){
					var newJc={};
					for(var j=0;j<$(".creditTable02").children("ul").children().first().siblings().eq(k).children().length;j++){
						var jm = $(".creditTable02").children("ul").children().first().siblings().eq(k).children().eq(j).attr("fieldname");
						var jz ;
						if($(".creditTable02").children("ul").children().first().siblings().eq(k).children().eq(j).children("input").length==0){
							jz = $(".creditTable02").children("ul").children().first().siblings().eq(k).children().eq(j).text();
							if(jz==""){
								jz=null;
							}
						}else{
							jz = $(".creditTable02").children("ul").children().first().siblings().eq(k).children().eq(j).children("input").val();
							if(jz==""){
								jz=null;
							}
						}
						newJc[jm]=jz;
						newJc["id"]=$(".creditTable01").children("ul").children().first().siblings().eq(k).children().eq(j).attr("_id");
						newJc["serialNo"]=$(".creditTable01").children("ul").children().first().siblings().eq(k).children().eq(j).attr("serialNo");
					}
					finaljson["creditReportInfoModel"]["overdues"].push(newJc);
				}
			}
		}
		var _finaljson=JSON.stringify(finaljson);
		AndroidJs.saveWjDetalAnswer(_finaljson);
		console.log(_finaljson);
		
	}

};




















