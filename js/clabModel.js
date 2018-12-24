var num = 0; //table类型 预定义
var sj = {};
var tsj = {};
var answerType1;
var answerType2;
var duInput; //input 类型的ul
var duTable; //table 类型的ul
var modelOjbName; //模块名
//var finaljson = {}; //最后输出的json对象
var objjson = []; //用于存储c.name
var duInputArr = []; //用于存储input类型的du
var _Code = "CODE";
var _String = "STRING";
var _Telephone = "TELEPHONE";
var _Date = "DATE";
var _Double = "DOUBLE";
var _Integer = "INTEGER";
var _Address = "ADDRESS";
var _SSQAddress = "SSQADDRESS";
var _Checkbox = "CHECKBOX";
var _TEXTAREA = "TEXTAREA";
var _DATEZONE="DATEZONE";
var objName;
var serialNoString;//问卷号
var _dataChecker = new QestionRegChecker();
var answerJson;//整个答案
function loadClab(data) {
	var a = data[0];
	var b = a.modelOjbName;
	answerJson = jsonForm(data[1]);
	if(answerJson["serialNo"].serialNo!=undefined){
		serialNoString=answerJson["serialNo"].serialNo;//问卷号
	}else{
		serialNoString=null;//问卷号
	}
	var h = a.modelDetailSubList[0].objName;
	modelOjbName = data[0].modelOjbName;
	for (var i = 0; i < data[0].modelDetailSubList.length; i++) {
		var modelObj = data[0].modelDetailSubList[i];
		objName=modelObj.objName;
		_dataChecker.initQuestionMap(modelObj.objName, modelObj.questionDetailList);
		if (data[0].modelDetailSubList[i].type == "INPUT") {
			xqInput(modelObj, data[0].modelOjbName,answerJson);
			answerType1 = "input";
		} else if (modelObj.type == "TABLE") {
			xqTable(modelObj, data[0].answer.baseInfoModel,answerJson);
			answerType2 = "table";
		}
	}
	_dataChecker.initAutoCheckTrigger();
}

function xqInput(c, b, e, h) { //input类型
	var model_id;
	if (e[b][h] != null) {
		model_id = e[b][h].id;
	} else {
		model_id = null;
	}
	$("<section id='" + serialNoString + "' name='" + model_id + "' ></section>").appendTo("body");
	$('<footer id="next" onclick="submit(true);"><p>确定</p></footer>').insertAfter('section');
	var _idsp = c.code.split("."); //分割code
	var _id = ""; //给div设id
	for (var i = 0; i < _idsp.length; i++) {
		_id += _idsp[i]; //合并code
	};
	$('<div class="problem" id="' + _id + '" modelName="'+objName+'"><p>' + c.name + '</p><ul></ul></div>').appendTo('section');
	duInput = $("#" + _id + " ul");
	duInputArr.push(duInput);
	create(c, _id, duInput, b, e);
}

function create(c, _id, du, b, e) { //c=a.modelDetailSubList[i] _id=c.code.split(".") du=duInput/duTable  b=a.modelOjbName;  e=a.answer;
	if (sj[modelOjbName]) {

	} else {
		sj[modelOjbName] = [];
	}
	if (tsj["questionTableAnswerList"]) {

	} else {
		tsj["questionTableAnswerList"] = [];
	}
	var _idj = {};
	var question = c.questionDetailList;
	var _ch = [];
	for (var i = 0; i < question.length; i++) {
		//			console.log(c.questionDetailList[i].code);
		var code = c.questionDetailList[i].code
			//			console.log(question[i].inputUnit);
		var Unit;
		if (question[i].inputUnit == null) {
			Unit = '';
		} else {
			Unit = question[i].inputUnit;
		}
		//	  文本框
		if (question[i].inputType == _String) {
			//		是否必填
			if (question[i].require) {
				$('<li sourceType="'+question[i].sourceType+'" data="' + question[i].fieldName + '" fieldName="' + question[i].fieldName + '" require="' + question[i].require + '" isDynamicShow="' + question[i].isDynamicShow + '" code="' + code + '"><div class="left"><span>*</span><i title="' + question[i].name + '">' + question[i].name + '</i></div><div class="right"><input type="text" placeholder=""/><b class="yuan">' + Unit + '</b></div></li>').appendTo(du);
			} else {
				$('<li sourceType="'+question[i].sourceType+'" data="' + question[i].fieldName + '" fieldName="' + question[i].fieldName + '"  require="' + question[i].require + '" isDynamicShow="' + question[i].isDynamicShow + '" code="' + code + '"><div class="left"><span>&nbsp;&nbsp;</span><i title="' + question[i].name + '">' + question[i].name + '</i></div><div class="right"><input type="text" placeholder=""/><b class="yuan">' + Unit + '</b></div></li>').appendTo(du)
			}
		};
		
		//备注型文本框
		if (question[i].inputType == _TEXTAREA) {
			//		是否必填
			console.log(question[i].name)
			if (question[i].require) {
				$('<li sourceType="'+question[i].sourceType+'" class="text-con" data="' + question[i].fieldName + '" fieldName="' + question[i].fieldName + '" require="' + question[i].require + '" isDynamicShow="' + question[i].isDynamicShow + '" code="' + code + '"><div class="left text-textarea01"><span>*</span><i title="' + question[i].name + '">' + question[i].name + '</i></div><div class="right text-textarea02"><textarea></textarea><b class="yuan">' + Unit + '</b></div></li>').appendTo(du);
			} else {
				$('<li sourceType="'+question[i].sourceType+'" class="text-con" data="' + question[i].fieldName + '" fieldName="' + question[i].fieldName + '"  require="' + question[i].require + '" isDynamicShow="' + question[i].isDynamicShow + '" code="' + code + '"><div class="left text-textarea01"><span>&nbsp;&nbsp;</span><i title="' + question[i].name + '">' + question[i].name + '</i></div><div class="right text-textarea02"><textarea></textarea><b class="yuan">' + Unit + '</b></div></li>').appendTo(du)
			}
		};
		//	  固定电话
		if (question[i].inputType == _Telephone) {
			//		是否必填
			if (question[i].require) {
				$('<li sourceType="'+question[i].sourceType+'" data="' + question[i].fieldName + '" fieldName="' + question[i].fieldName + '"  require="' + question[i].require + '" isDynamicShow="' + question[i].isDynamicShow + '" code="' + code + '"><div class="left"><span>*</span><i title="' + question[i].name + '">' + question[i].name + '</i></div><div class="right phone"><input type="number" placeholder="区号"/><b>-</b><input type="number" placeholder="电话号码"/><b>-</b><input type="number" placeholder="分机号"/></div></li>').appendTo(du);
			} else {
				$('<li sourceType="'+question[i].sourceType+'" data="' + question[i].fieldName + '" fieldName="' + question[i].fieldName + '"  require="' + question[i].require + '" isDynamicShow="' + question[i].isDynamicShow + '" code="' + code + '"><div class="left"><span>&nbsp;&nbsp;</span><i title="' + question[i].name + '">' + question[i].name + '</i></div><div class="right phone"><input type="number" placeholder="区号"/><b>-</b><input type="number" placeholder="电话号码"/><b>-</b><input type="number" placeholder="分机号"/></div></li>').appendTo(du)
			}
		};
		//选择(单选or下拉列表)
		if (question[i].inputType == _Code) {
			var _al = question[i].codeDicList; //给div设id
			var _idv = question[i].code.replace(/\./g, "-"); //分割code
			if (question[i].require) {
				//				是否必填	

				if (_al.length == 2) {
					var ch = question[i].controlShowRuleList;
					_ch.push(ch);
					$('<li sourceType="'+question[i].sourceType+'" id="' + i + '" code="' + code + '" fieldName="' + question[i].fieldName + '"  data="' + question[i].fieldName + '" inputType="' + question[i].inputType + '" require="' + question[i].require + '" isDynamicShow="' + question[i].isDynamicShow + '"><div class="left"><span>*</span><i>' + question[i].name + '</i></div><div class="right" isControlShow="' + question[i].isControlShow + '"><label><input name="' + question[i].code + '" type="radio" value="' + question[i].codeDicList[0].code + '"/>' + question[i].codeDicList[0].name + '<i></i></label><label><input name="' + question[i].code + '" type="radio" value="' + question[i].codeDicList[1].code + '"/>' + question[i].codeDicList[1].name + '<i></i></label></div></li>').appendTo(du);
					//						radioClick (_ch);//单选框点击事件
				} else {
					//									多个
					$('<li sourceType="'+question[i].sourceType+'" code="' + code + '" fieldName="' + question[i].fieldName + '"  data="' + question[i].fieldName + '" inputType="' + question[i].inputType + '" require="' + question[i].require + '" isDynamicShow="' + question[i].isDynamicShow + '"><div class="left"><span>*</span><i>' + question[i].name + '</i></div><div id="' + _idv + '" class="right" isControlShow="' + question[i].isControlShow + '"><span class="choose">请选择</span><img src="img/down_icon.png" class="select"/></div></li>').appendTo(du);
					_iddv = $('#' + _idv);
					_idj[_idv] = question[i]; //单独的id存到json里面
					_iddv.on("click", function() {
						var id = this.id;
						mask2(_idj[id], $(this)); //遮罩层
					});
				}
			} else {
				if (_al.length == 2) {
					var ch = question[i].controlShowRuleList;
					_ch.push(ch);
					//						console.log(_ch)
					//		两个
					$('<li sourceType="'+question[i].sourceType+'" code="' + code + '"  fieldName="' + question[i].fieldName + '" data="' + question[i].fieldName + '" inputType="' + question[i].inputType + '" require="' + question[i].require + '" isDynamicShow="' + question[i].isDynamicShow + '"><div class="left"><span>&nbsp;&nbsp;</span><i>' + question[i].name + '</i></div><div class="right" isControlShow="' + question[i].isControlShow + '"><label><input name="' + question[i].code + '" type="radio" value="' + question[i].codeDicList[0].code + '"/>' + question[i].codeDicList[0].name + '<i></i></label><label><input name="' + question[i].code + '" type="radio" value="' + question[i].codeDicList[1].code + '"/>' + question[i].codeDicList[1].name + '<i></i></label></div></li>').appendTo(du);
					radioClick(_ch); //单选框点击事件
				} else {
					//	多个
					$('<li  sourceType="'+question[i].sourceType+'" code="' + code + '" fieldName="' + question[i].fieldName + '" data="' + question[i].fieldName + '" inputType="' + question[i].inputType + '" require="' + question[i].require + '" isDynamicShow="' + question[i].isDynamicShow + '"><div class="left"><span>&nbsp;&nbsp;</span><i>' + question[i].name + '</i></div><div id="' + _idv + '" class="right" isControlShow="' + question[i].isControlShow + '"><span class="choose">请选择</span><img src="img/down_icon.png" class="select"/></div></li>').appendTo(du);
					_iddv = $('#' + _idv);
					_idj[_idv] = question[i]; //单独的id存到json里面
					_iddv.on("click", function() {
						var id = this.id;
						mask2(_idj[id], $(this)); //遮罩层
					});
				}
			}
		};
		//		  日期
		var dateID;
		if (question[i].inputType == _Date) {
			var _al = question[i].code.split(",");
			//给div设id
			var _idv = question[i].code.replace(/\./g, "-"); //分割code
			dateID = 'date' + _idv;
			if (question[i].require) {
				//								是否必填
				$('<li sourceType="'+question[i].sourceType+'" code="' + code + '" fieldName="' + question[i].fieldName + '"  data="' + question[i].fieldName + '" require="' + question[i].require + '" isDynamicShow="' + question[i].isDynamicShow + '"><div class="left"><span>*</span><i>' + question[i].name + '</i></div><div class="right"><input id="' + dateID + '" type="text"  readonly name="input_date" placeholder="日期选择" data-lcalendar="1916-01-11,2116-05-29"/></div></li>').appendTo(du);
			} else {
				$('<li sourceType="'+question[i].sourceType+'" code="' + code + '"  fieldName="' + question[i].fieldName + '" data="' + question[i].fieldName + '" require="' + question[i].require + '" isDynamicShow="' + question[i].isDynamicShow + '"><div class="left"><span>&nbsp;&nbsp;</span><i>' + question[i].name + '</i></div><div class="right"><input id="' + dateID + '"  type="text" readonly name="input_date" placeholder="日期选择" data-lcalendar="1916-01-11,2116-05-29" /></div></li>').appendTo(du)
			}
			var calendar = new lCalendar();
			calendar.init({
				"trigger": "#" + dateID,
				"type": "date"
			});
		};
		
		if (question[i].inputType== _DATEZONE) { //日期(任意选择时间段)
		var _al = question[i].code.split(",");
		//给div设id
		var _idv = question[i].code.replace(/\./g, "-"); //分割code
		var dateID = 'date' + _idv;
		if (question[i].require) {
			//是否必填
			$('<li sourceType="'+question[i].sourceType+'" code="' + code + '" fieldName="' + question[i].fieldName + '"  data="' + question[i].fieldName + '" require="' + question[i].require + '" isDynamicShow="' + question[i].isDynamicShow + '"><div class="left"><span>*</span><i>' + question[i].name + '</i></div><div class="right phone qdate"><input style="width:2.5rem;text-align:center" id="' + dateID + '" type="text" readonly="" name="input_date" placeholder="日期选择" data-lcalendar="1916-01-11,2116-05-29"><b>-</b><input style="width:2.5rem;text-align:center" id="' + (dateID + "1") + '" type="text" readonly="" name="input_date" placeholder="日期选择" data-lcalendar="1916-01-11,2116-05-29"></div></li>').appendTo(du);
		} else {
			$('<li sourceType="'+question[i].sourceType+'" code="' + code + '" fieldName="' + question[i].fieldName + '"  data="' + question[i].fieldName + '" require="' + question[i].require + '" isDynamicShow="' + question[i].isDynamicShow + '"><div class="left"><span>&nbsp;&nbsp;</span><i>' + question[i].name + '</i></div><div class="right phone qdate"><input style="width:2.5rem;text-align:center" id="' + dateID + '" type="text" readonly="" name="input_date" placeholder="日期选择" data-lcalendar="1916-01-11,2116-05-29"><b>-</b><input style="width:2.5rem;text-align:center" id="' + (dateID + "1") + '" type="text" readonly="" name="input_date" placeholder="日期选择" data-lcalendar="1916-01-11,2116-05-29"></div></li>').appendTo(du);
		}
		var calendar = new lCalendar();
		calendar.init({
			'trigger': '#' + dateID,
			'type': 'date'
		});
		var calendar = new lCalendar();
		calendar.init({
			'trigger': '#' + dateID + '1',
			'type': 'date'
		});
	};


		
		//			整数
		if (question[i].inputType == _Integer) {
			if (question[i].require) {
				//								是否必填
				$('<li sourceType="'+question[i].sourceType+'" code="' + code + '" fieldName="' + question[i].fieldName + '"  data="' + question[i].fieldName + '" require="' + question[i].require + '" isDynamicShow="' + question[i].isDynamicShow + '"><div class="left"><span>*</span><i>' + question[i].name + '</i></div><div class="right"><input type="number" placeholder="请输入' + question[i].name + '"/><b class="yuan">' + Unit + '</b></div></li>').appendTo(du);
			} else {
				$('<li sourceType="'+question[i].sourceType+'" code="' + code + '" fieldName="' + question[i].fieldName + '"  data="' + question[i].fieldName + '" require="' + question[i].require + '" isDynamicShow="' + question[i].isDynamicShow + '"><div class="left"><span>&nbsp;&nbsp;</span><i>' + question[i].name + '</i></div><div class="right"><input type="number" placeholder="请输入' + question[i].name + '"/><b class="yuan">' + Unit + '</b></div></li>').appendTo(du);
			}
		};
		//			小数
		if (question[i].inputType == _Double) {
			if (question[i].require) {
				//								是否必填
				$('<li sourceType="'+question[i].sourceType+'" code="' + code + '" fieldName="' + question[i].fieldName + '"  data="' + question[i].fieldName + '" require="' + question[i].require + '" isDynamicShow="' + question[i].isDynamicShow + '"><div class="left"><span>*</span><i>' + question[i].name + '</i></div><div class="right"><input type="number" placeholder="请输入' + question[i].name + '"/><b class="yuan">' + Unit + '</b></div></li>').appendTo(du);
			} else {
				$('<li sourceType="'+question[i].sourceType+'" code="' + code + '" fieldName="' + question[i].fieldName + '"  data="' + question[i].fieldName + '" require="' + question[i].require + '" isDynamicShow="' + question[i].isDynamicShow + '"><div class="left"><span>&nbsp;&nbsp;</span><i>' + question[i].name + '</i></div><div class="right"><input type="number" placeholder="请输入' + question[i].name + '"/><b class="yuan">' + Unit + '</b></div></li>').appendTo(du);
			}
		};
		//地址+详情
		if (question[i].inputType == _Address) {
			var _idv = question[i].code.replace(/\./g, "-"); //分割code//分割code
			//			console.log(question[i].inputType)
			if (question[i].require) {
				$('<li sourceType="'+question[i].sourceType+'" code="' + code + '" fieldName="' + question[i].fieldName + '"  class="address" isDynamicShow="' + question[i].isDynamicShow + '" data="' + question[i].fieldName + '" require="' + question[i].require + '" inputtype="' + question[i].inputType + '"><div class="left"><span>*</span><i title="' + question[i].name + '">' + question[i].name + '</i></div><div id="' + _idv + '" class="right"  onclick="adree(this.id)"><span class="choose" name="">请选择</span><img src="img/down_icon.png" class="select"/></div><div class="x-address"><p><span>*</span><i>详细地址</i></p><p><input type="text" placeholder="请输入详细地址" /></p></div></li>').appendTo(du);
			} else {
				$('<li sourceType="'+question[i].sourceType+'" code="' + code + '" fieldName="' + question[i].fieldName + '"  class="address" isDynamicShow="' + question[i].isDynamicShow + '" data="' + question[i].fieldName + '" require="' + question[i].require + '" inputtype="' + question[i].inputType + '"><div class="left"><span>&nbsp;&nbsp;</span><i title="' + question[i].name + '">' + question[i].name + '</i></div><div id="' + _idv + '" class="right"  onclick="adree(this.id)"><span class="choose" name="">请选择</span><img src="img/down_icon.png" class="select"/></div><div class="x-address"><p><span>&nbsp;&nbsp;</span><i>详细地址</i></p><p><input type="text" placeholder="请输入详细地址" /></p></div></li>').appendTo(du);
			}
		}
		//只有省市区地址
		if (question[i].inputType == _SSQAddress) {
			var _idv = question[i].code.replace(/\./g, "-"); //分割code//分割code
			//			console.log(question[i].inputType)
			if (question[i].require) {
				$('<li sourceType="'+question[i].sourceType+'" code="' + code + '" fieldName="' + question[i].fieldName + '"  isDynamicShow="' + question[i].isDynamicShow + '" data="' + question[i].fieldName + '" require="' + question[i].require + '" inputtype="' + question[i].inputType + '"><div class="left"><span>*</span><i title="' + question[i].name + '">' + question[i].name + '</i></div><div id="' + _idv + '" class="right"  onclick="adree(this.id)"><span class="choose" name="">请选择</span><img src="img/down_icon.png" class="select"/></div></li>').appendTo(du);
			} else {
				$('<li sourceType="'+question[i].sourceType+'" code="' + code + '" fieldName="' + question[i].fieldName + '"  isDynamicShow="' + question[i].isDynamicShow + '" data="' + question[i].fieldName + '" require="' + question[i].require + '" inputtype="' + question[i].inputType + '"><div class="left"><span>&nbsp;&nbsp;</span><i title="' + question[i].name + '">' + question[i].name + '</i></div><div id="' + _idv + '" class="right"  onclick="adree(this.id)"><span class="choose" name="">请选择</span><img src="img/down_icon.png" class="select"/></div></li>').appendTo(du);
			}
		}
		//          复选框
		if (question[i].inputType == _Checkbox) {
			//				是否必填
			var html = "";
			for (var h = 0; h < question[i].codeDicList.length; h++) {
				html += '<label class="chenckboxNews chenckbox08">' +
					'<input type="checkbox" style="display:none"/>' +
					'<img src="img/jx_icon.png">' +
					'<span name="' + question[i].codeDicList[h].code + '">' + question[i].codeDicList[h].name + '</span>' +
					'</label>';

			}
			if (question[i].require) {
				$('<li  sourceType="'+question[i].sourceType+'" fieldName="' + question[i].fieldName + '" code="' + code + '" isDynamicShow="' + question[i].isDynamicShow + '" data="' + question[i].fieldName + '" require="' + question[i].require + '" inputtype="' + question[i].inputType + '"><div class="left"><span>*</span><i title="' + question[i].name + '">' + question[i].name + '</i></div><div id="' + _idv + '" class="right chenckbox lennum" >' + html + '</div></li>').appendTo(du);
			} else {

				$('<li  sourceType="'+question[i].sourceType+'" fieldName="' + question[i].fieldName + '" code="' + code + '" isDynamicShow="' + question[i].isDynamicShow + '" data="' + question[i].fieldName + '" require="' + question[i].require + '" inputtype="' + question[i].inputType + '"><div class="left"><span>*</span><i title="' + question[i].name + '">' + question[i].name + '</i></div><div id="' + _idv + '" class="right chenckbox lennum">' + html + '</div></li>').appendTo(du);
			}
		};
	}
	//信贷员建议
//	console.log(c)
	if (b == 'adviseModel') {
		objjson.push(c.objName);
		var asw = e.adviseModel.advise;
		if (c.objName == 'advise') {
			for (var j = 0; j < du.children().length; j++) {
				if (du.children().eq(j).attr("isDynamicShow") == 1) {
					//					//显示、隐藏
					du.children().eq(j).hide();
				}
				for (var key in asw) {
					if (key == du.children().eq(j).attr("data")) {
						if (du.children().eq(j).attr("inputtype") == _Code) {
//							console.log(c.questionDetailList[j].codeDicList)
							var ch_code = c.questionDetailList[j].codeDicList;
							for (var k = 0; k < ch_code.length; k++) {
								if (du.children().eq(j).children(".right").children("span").length == 1) {
									if (ch_code[k].code == asw[key]) {
										du.children().eq(j).children(".right").children("span").text(ch_code[k].name);
										du.children().eq(j).children(".right").children("span").attr('name', ch_code[k].code);
										if (asw[key] != "请选择") {
											du.children().eq(j).children(".left").children("i").css({
												"color": "#a09fa4"
											});
											du.children().eq(j).children(".right").children("span").css({
												"color": "#191919"
											});
										}
									}
								} else if (du.children().eq(j).children(".right").children("label").length == 2) {

									if (ch_code[k].code == asw[key]) {
										for (var k = 0; k < du.children().eq(j).children(".right").children("label").length; k++) {
											var tes = du.children().eq(j).children(".right").children("label").eq(k).children("input");
											if (tes.val() == asw[key]) {
												if (du.children().eq(j).children('.right').attr('iscontrolshow') == 1) {
													if (du.children().eq(j).attr('id') == 0) {
														var rule = c.questionDetailList[0].controlShowRuleList;
														for (var r = 0; r < rule.length; r++) {
															if (tes.val().match(rule[r].key)) {
																for (var t = 0; t < rule[r].code.length; t++) {
																	for (var g = 0; g < du.children().length; g++) {
																		du.children().eq(g+1).hide();
																		if (du.children().eq(g).attr('code') == rule[r].code[t]) {
																			du.children().eq(g).show();
																		}
																	}
																}
															}

														}
													}
												}
												tes.attr("checked", true);
												tes.next("i").show().parent().siblings().children("i").hide();
												tes.parent().siblings().children("input").attr("checked", false);
												tes.parent().parent().siblings(".left").children("i").css({
													"color": "#a09fa4"
												});
											}
										}
									}
								}


							}
						} else if (du.children().eq(j).children(".right").children("input").length == 1) {
							du.children().eq(j).children(".right").children("input").val(asw[key]);
							if (asw[key] != "") {
								du.children().eq(j).children(".left").children("i").css({
									"color": "#a09fa4"
								});
								du.children().eq(j).children(".right").children("label").css({
									"color": "#191919"
								});
							}
						} else if (du.children().eq(j).children(".textCon").children("textarea").length == 1) {
							du.children().eq(j).children(".textCon").children("textarea").text(asw[key]);
						}else if(du.children().eq(j).children(".right").children("input").length==3){
//							alert(2)固定电话
//                        var tel;
                          if(asw[key]!=null){
                          	var tel=asw[key].split('-');
                            du.children().eq(j).children(".right").children("input").eq(0).val(tel[0]);
                            du.children().eq(j).children(".right").children("input").eq(1).val(tel[1]);
                            du.children().eq(j).children(".right").children("input").eq(2).val(tel[2]);
                            console.log(tel);
                           }
						}else if(du.children().eq(j).children('.chenckbox').children('label').length>0){
							console.log(asw[key]);
							if(asw[key]!=null){
							     var ch_box=asw[key].split(',');
							    for(var h=0;h<ch_box.length;h++){
									for(var k=0;k<du.children().eq(j).children('.chenckbox').children('label').length;k++){
										if(du.children().eq(j).children('.chenckbox').children('label').eq(k).children('span').attr('name')==ch_box[h]){
											if(ch_box[h]=='{4FD8B723-64E9-42AB-B768-89351F5F91F8}'||ch_box[h]=='{2722BF7C-E7D8-49EF-96D5-5AED2DE8395B}'){
												$('.text-con').show();
												if(asw.denyReasonOther!=null){
												$('.text-textarea02').children('textarea').text(asw.denyReasonOther);
												}
											}else{
												$('.text-con').hide();
											}
											du.children().eq(j).children('.chenckbox').children('label').eq(k).children('img').attr('src','img/jxt_icon.png');
											du.children().eq(j).children('.chenckbox').children('label').eq(k).children('span').css('color','#191919');
											du.children().eq(j).children('.left').children('i').css('color','#a0a0a5');
										}
									}
								}
							}
						}

					}

				}

			}
		
			du.children().hide();
			for(var i=0;i<du.children().length;i++){
				if(du.children().eq(i).attr("isdynamicshow")==0&&du.children().eq(i).children(".right").attr("iscontrolshow")==0){
					du.children().eq(i).show();
				}
				if(du.children().eq(i).children(".right").attr("iscontrolshow")==1){
					du.children().eq(0).show();//修改2016-07-16
					$('.text-con').hide();
					if(du.children().eq(i).find("label").length==2){
						for(var k=0;k<du.children().eq(i).find("label").length;k++){
							if(du.children().eq(i).find("label").eq(k).children("input").attr("checked")=="checked"){
								var _dvl=du.children().eq(i).find("label").eq(k).children("input").val();
								var _dfn=du.children().eq(i).attr("data");
								var ch_code = c.questionDetailList;
								for(var l=0;l<ch_code.length;l++){
									if(ch_code[l].fieldName==_dfn){
										for(var n=0;n<ch_code[l].controlShowRuleList.length;n++){
											if(_dvl.match(ch_code[l].controlShowRuleList[n].key)){
												for(var m=0;m<ch_code[l].controlShowRuleList[n].code.length;m++){
													for(var o=0;o<du.children().length;o++){
														if(ch_code[l].controlShowRuleList[n].code[m]==du.children().eq(o).attr("code")){
															du.children().eq(o).show();
															$('.text-con').show();
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
//			$('.text-con').show();
		}
		
	}

	//贷款用途
	if (b == 'loanPurposeModel') {
		objjson.push(c.objName);
		if (c.objName == 'loanPurpose') {
			var asw = e.loanPurposeModel.loanPurpose;
			for (var j = 0; j < du.children().length; j++) {

				for (var key in asw) {
					if (key == du.children().eq(j).attr("data")) {
						if (du.children().eq(j).attr("inputtype") == "CODE") {
							var ch_code = c.questionDetailList[j].answerChoice.split(',');
							var codeList=c.questionDetailList[j].codeDicList;
							console.log(codeList)
							var Tx = [];
							for (var k in ch_code) {
								Tx = ch_code[k].split(':');
								if (du.children().eq(j).children(".right").children("span").length == 1) {
									console.log(asw[key])
									for(var i=0;i<codeList.length;i++){
										if(codeList[i].code==asw[key]){
										du.children().eq(j).children(".right").children("span").text(codeList[i].name);
										du.children().eq(j).children(".right").children("span").attr('name', codeList[i].code);
										if (asw[key] != "请选择") {
											du.children().eq(j).children(".left").children("i").css({
												"color": "#a09fa4"
											});
											du.children().eq(j).children(".right").children("span").css({
												"color": "#191919"
											});
										}
									}
									}
//									if (Tx[0] == asw[key]) 
								} else if (du.children().eq(j).children(".right").children("label").length == 2) {
									if (Tx[0] == asw[key]) {

										for (var k = 0; k < du.children().eq(j).children(".right").children("label").length; k++) {
											if (du.children().eq(j).children(".right").children("label").eq(k).children("input").val() == Tx[0]) {
												du.children().eq(j).children(".right").children("label").eq(k).children("input").attr("checked", true);
												du.children().eq(j).children(".right").children("label").eq(k).children("input").next("i").show().parent().siblings().children("i").hide();
												du.children().eq(j).children(".right").children("label").eq(k).children("input").parent().siblings().children("input").attr("checked", false);
												du.children().eq(j).children(".right").children("label").eq(k).children("input").parent().parent().siblings(".left").children("i").css({
													"color": "#a09fa4"
												});
											}
										}
									}
								}

							}
						} else if (du.children().eq(j).children(".right").children("input").length == 1) {
							du.children().eq(j).children(".right").children("input").val(asw[key]);
							if (asw[key] != "") {
								du.children().eq(j).children(".left").children("i").css({
									"color": "#a09fa4"
								});
								du.children().eq(j).children(".right").children("label").css({
									"color": "#191919"
								});
							}
						} else if (du.children().eq(j).children(".textCon").children("textarea").length == 1) {
							du.children().eq(j).children(".textCon").children("textarea").text(asw[key]);
						}else if (du.children().eq(j).children(".text-textarea02").children("textarea").length == 1) {
							if(asw[key]!=null){
							du.children().eq(j).children(".text-textarea02").children("textarea").text(asw[key]).css({
									"color": "#191919"
								});
							du.children().eq(j).children(".left").children("i").css({
									"color": "#a09fa4"
								});
							}
						}
					}
				}

			}
		}
	}
	//工作单位信息
	if (b == 'companyInfoModel') {
		objjson.push(c.objName);
		if (c.objName == 'companyInfo') {
			var asw = e.companyInfoModel.companyInfo;
			for (var j = 0; j < du.children().length; j++) {
				if (du.children().eq(j).attr("isDynamicShow") == 1) {
					//					//显示、隐藏
					du.children().eq(j).hide();
				}
				for (var key in asw) {
					if (key == du.children().eq(j).attr("data")) {
						if (du.children().eq(j).attr("inputtype") == _Address) {
							if (asw[key] != null) {
								var dz = asw[key].split('||');
							}
							var squ =AndroidJs.getAddressByGuid(dz[0]);
							if (du.children().eq(j).children(".right").children("span").length == 1) {
								du.children().eq(j).children(".right").children("span").attr('guid', dz[0]);
								du.children().eq(j).children(".right").children("span").text(squ).css('color', '#191919');
								du.children().eq(j).children(".left").children("i").css('color', '#a0a0a5');
								du.children().eq(j).children('.x-address').children().children('input').val(dz[1]).css('color', '#191919');
								du.children().eq(j).children('.x-address').children().children('i').css('color', '#a0a0a5');
							}
						}
						if (du.children().eq(j).attr("inputtype") == _Code) {
							var ch_code = c.questionDetailList[j].codeDicList;
							for (var k = 0; k < ch_code.length; k++) {

								if (du.children().eq(j).children(".right").children("span").length == 1) {
									if (ch_code[k].code == asw[key]) {
										du.children().eq(j).children(".right").children("span").text(ch_code[k].name);
										du.children().eq(j).children(".right").children("span").attr('name', ch_code[k].code);
										if (asw[key] != "请选择") {
											du.children().eq(j).children(".left").children("i").css({
												"color": "#a09fa4"
											});
											du.children().eq(j).children(".right").children("span").css({
												"color": "#191919"
											});
										}
									}
								} else if (du.children().eq(j).children(".right").children("label").length == 2) {
									if (ch_code[k].code == asw[key]) {
										for (var k = 0; k < du.children().eq(j).children(".right").children("label").length; k++) {
											if (du.children().eq(j).children(".right").children("label").eq(k).children("input").val() == asw[key]) {
												du.children().eq(j).children(".right").children("label").eq(k).children("input").attr("checked", true);
												du.children().eq(j).children(".right").children("label").eq(k).children("input").next("i").show().parent().siblings().children("i").hide();
												du.children().eq(j).children(".right").children("label").eq(k).children("input").parent().siblings().children("input").attr("checked", false);
												du.children().eq(j).children(".right").children("label").eq(k).children("input").parent().parent().siblings(".left").children("i").css({
													"color": "#a09fa4"
												});
											}
										}
									}
								}

							}
						} else if (du.children().eq(j).children(".right").children("input").length == 1) {
							du.children().eq(j).children(".right").children("input").val(asw[key]);
							if (asw[key] != "") {
								du.children().eq(j).children(".left").children("i").css({
									"color": "#a09fa4"
								});
								du.children().eq(j).children(".right").children("label").css({
									"color": "#191919"
								});
							}
						}else if (du.children().eq(j).children(".qdate").children("input").length == 2) {
							if(asw[key]!=null){
								var Qdate=asw[key].split(',');
								du.children().eq(j).children(".qdate").children("input").eq(0).val(Qdate[0]).css('color','#191919');
								du.children().eq(j).children(".qdate").children("input").eq(1).val(Qdate[1]).css('color','#191919');
								du.children().eq(j).children(".left").children("i").css('color','#A0A0A5');
							}
						}else if (du.children().eq(j).children(".textCon").children("textarea").length == 1) {
							du.children().eq(j).children(".textCon").children("textarea").text(asw[key]);
						}else if(du.children().eq(j).children(".right").children("input").length==3){
//							alert(2)固定电话
//                        var tel;
                          if(asw[key]!=null){
                          	var tel=asw[key].split('-');
                            du.children().eq(j).children(".right").children("input").eq(0).val(tel[0]);
                            du.children().eq(j).children(".right").children("input").eq(1).val(tel[1]);
                            du.children().eq(j).children(".right").children("input").eq(2).val(tel[2]);
                            console.log(tel);
                           }
						}
					}
				}

			}
		}
	}
	//业主贷工作/生意单位信息
	if (b == 'businessInfoModel') {
		objjson.push(c.objName);
		if (c.objName == 'ownerBusinessInfo') {
			var asw = e.businessInfoModel.ownerBusinessInfo;
//			console.log(asw)
				//			console.log(du.children().length)
			for (var j = 0; j < du.children().length; j++) {
				if (du.children().eq(j).attr("isDynamicShow") == 1) {
					//					//显示、隐藏
					du.children().eq(j).hide();
				}
				for (var key in asw) {
					if (key == du.children().eq(j).attr("data")) {
						if (du.children().eq(j).attr("inputtype") == _Address) {
							if (asw[key] != null) {
//								alert(5)
								var dz = asw[key].split('||');
							    var squ =AndroidJs.getAddressByGuid(dz[0]);
							   if (du.children().eq(j).children(".right").children("span").length == 1) {
								du.children().eq(j).children(".right").children("span").attr('guid', dz[0]);
								du.children().eq(j).children(".right").children("span").text(squ).css('color', '#191919');
								du.children().eq(j).children(".left").children("i").css('color', '#a0a0a5');
								du.children().eq(j).children('.x-address').children().children('input').val(dz[1]).css('color', '#191919');
								du.children().eq(j).children('.x-address').children().children('i').css('color', '#a0a0a5');
							   }
						   }
						}
						if (du.children().eq(j).attr("inputtype") == "CODE") {
							var ch_code = c.questionDetailList[j].codeDicList;
							for (var n = 0; n < ch_code.length; n++) {
								if (du.children().eq(j).children(".right").children("span").length == 1) {
									if (ch_code[n].code == asw[key]) {
										du.children().eq(j).children(".right").children("span").text(ch_code[n].name);
										du.children().eq(j).children(".right").children("span").attr('name', ch_code[n].code);
										if (asw[key] != "请选择") {
											du.children().eq(j).children(".left").children("i").css({
												"color": "#a09fa4"
											});
											du.children().eq(j).children(".right").children("span").css({
												"color": "#191919"
											});
										}

										
										
									}
								} else if (du.children().eq(j).children(".right").children("label").length == 2) {
									if (ch_code[n].code == asw[key]) {
										for (var k = 0; k < du.children().eq(j).children(".right").children("label").length; k++) {
											var Lab = du.children().eq(j).children(".right").children("label").eq(k).children("input");
											if (Lab.val() == asw[key]) {
												Lab.attr("checked", true);
												Lab.next("i").show().parent().siblings().children("i").hide();
												Lab.parent().siblings().children("input").attr("checked", false);
												Lab.parent().parent().siblings(".left").children("i").css({
													"color": "#a09fa4"
												});
											}
										}

									}
								}
							}
						} else if (du.children().eq(j).children(".right").children("input").length == 1) {
							du.children().eq(j).children(".right").children("input").val(asw[key]);
							if (asw[key] != "") {
								du.children().eq(j).children(".left").children("i").css({
									"color": "#a09fa4"
								});
								du.children().eq(j).children(".right").children("label").css({
									"color": "#191919"
								});
							}
						}else if (du.children().eq(j).children(".qdate").children("input").length == 2) {
							if(asw[key]!=null){
								var Qdate=asw[key].split(',');
								du.children().eq(j).children(".qdate").children("input").eq(0).val(Qdate[0]).css('color','#191919');
								du.children().eq(j).children(".qdate").children("input").eq(1).val(Qdate[1]).css('color','#191919');
								du.children().eq(j).children(".left").children("i").css('color','#A0A0A5');
							}
						}else if (du.children().eq(j).children(".textCon").children("textarea").length == 1) {
							du.children().eq(j).children(".textCon").children("textarea").text(asw[key]);
						}else if(du.children().eq(j).children(".right").children("input").length==3){
//							alert(2)固定电话
//                        var tel;
                          if(asw[key]!=null){
                          	var tel=asw[key].split('-');
                            du.children().eq(j).children(".right").children("input").eq(0).val(tel[0]);
                            du.children().eq(j).children(".right").children("input").eq(1).val(tel[1]);
                            du.children().eq(j).children(".right").children("input").eq(2).val(tel[2]);
                            console.log(tel);
                           }
						}
					}

				}
			}

		}
		
		
	}
	$('.chenckboxNews').on("click", function() {
		if ($(this).children('input').prop('checked') == true) {
			$(this).children('img').attr('src', 'img/jxt_icon.png');
			$(this).children('span').css('color', '#191919');
			$(this).parent().parent().find('.left').children('i').css('color', '#a0a0a0');
			var otherSpan=$(this).children('span').text().substr(4,$(this).children('span').text().length);
			if(otherSpan=="其它原因"){
				$('.text-con').show();
			}

		} else {
			$(this).children('img').attr('src', 'img/jx_icon.png');
			$(this).children('span').css('color', '#a0a0a0');
			$(this).parent().parent().find('.left').children('i').css('color', '#191919');
			var otherSpan=$(this).children('span').text().substr(4,$(this).children('span').text().length);
			if(otherSpan=="其它原因"){
				$('.text-con').hide();
			}
		}
	})
	radioClick(_ch);
	foce_blur();
	
	for(var j=0;j<du.children().length;j++){
			    if(du.children().eq(j).children('.right').attr("isControlShow")==1){
//					alert(1)
//                    du.children().eq(j).children('.right').children("span").attr('name')==''
					for(var y=0;y<question[j].controlShowRuleList.length;y++){
						var str=regular(question[j].controlShowRuleList[y].key);
						var valT=du.children().eq(j).children('.right').children("span").attr('name');
//						console.log("/"+qL[j].controlShowRuleList[y].key+"/")
//                         alert(str.test(valT))
						if(str.test(valT)){
//							console.log(du.children().eq(j).children('.right').children("span").attr('name'))
							for(var t=0;t<question[j].controlShowRuleList[y].code.length;t++){
//								console.log(qL[j].controlShowRuleList[y].code[t])
                               
								for(var z=0;z<du.children().length;z++){
							       if(du.children().eq(z).attr('code')==question[j].controlShowRuleList[y].code[t]){
							       	  du.children().eq(z).show();
							       	  console.log(z)
							       }
						        }
						    }
						}else{
								for(var z=0;z<du.children().length;z++){
							       if(du.children().eq(z).attr("isDynamicShow")==1){
//							       	  du.children().eq(z).hide();
//							       	  console.log(z)
							        }
						        }
						}
                    }
				}
			
			}
	
//	if($('span[name="{9375E1F9-2CC6-427A-A847-707BD860CABD}"]').css('color')=='rgb(25, 25, 25)'||$('span[name="{DB30E9C7-7AB8-46C3-9D32-2E73648DB3FC}"]').css('color')=='rgb(25, 25, 25)'){
////		||$('span[name="{DB30E9C7-7AB8-46C3-9D32-2E73648DB3FC}"]').css('color')=='rgb(25, 25, 25)'
//		    $('.text-con').show();
//	}else{
//	    $('.text-con').hide();	
//	}
var $liLen=$('li').length;//页面li标签的个数
	for(var i=0;i<$liLen;i++){//判断是否为不能修改
		if($('li').eq(i).attr('sourceType')==2){
			$('li').eq(i).children('.right').find('input').attr('disabled','disabled');
		}
	}
}


// 单选框添加事件避免冲突
function radioClick(_al) {
	$(".problem li#0 label input[type='radio']").on("click", function() {
		//	console.log(_al[1])
		if (_al[0] != null) {
			for (var h = 0; h < _al[0].length; h++) {
				var reg = regular(_al[0][h].key)
				if (reg.test($(this).val())) {
					for (var i = 0; i < $(".problem li").length; i++) {
						$(".problem li").eq(i + 1).hide();
						for (var j = 0; j < _al[0][h].code.length; j++) {
							if ($(".problem li").eq(i).attr('code') == _al[0][h].code[j]) {
								$(".problem li").eq(i).show();
							}
						}

					}
				}
			}
		}
		$(this).next("i").show().parent().siblings().children("i").hide();
		$(this).attr("checked", true);
		$(this).parent().siblings().children("input").attr("checked", false);
		$(this).parent().parent().siblings(".left").children("i").css({
			"color": "#a09fa4"
		})
	});
	$(".problem li#1 label input[type='radio']").on("click", function() {
		//	console.log(_al[1])
		if (_al[1] != null) {
			for (var h = 0; h < _al[0].length; h++) {
				var reg = regular(_al[1][h].key)
				if (reg.test($(this).val())) {
					for (var i = 0; i < $(".problem li").length; i++) {
						//                 	   $(".problem li").eq(i+2).hide();
						for (var j = 0; j < _al[1][h].code.length; j++) {
							if ($(".problem li").eq(i).attr('code') == _al[1][h].code[j]) {
								if($(".problem li").eq(i).children('.chenckbox').find('label:last-child').children('span').css('color')=='rgb(25, 25, 25)'){
									$('.text-con').show();
								}else{
									$('.text-con').hide();
								}
								$(".problem li").eq(i).show();
								if (i == "10") {
									$(".problem li").eq(i + 1).hide();
								} else {
									$(".problem li").eq(i - 1).hide();
								}
							}
						}

					}
				}
			}
		}
		$(this).next("i").show().parent().siblings().children("i").hide();
		$(this).attr("checked", true);
		$(this).parent().siblings().children("input").attr("checked", false);
		$(this).parent().parent().siblings(".left").children("i").css({
			"color": "#a09fa4"
		});
	});

}

function foce_blur() {
	$(".problem li input").on("focus", function() { //获取焦点
		$(this).parent().parent().addClass("ylborder");
		$(this).parent().parent().siblings().removeClass("ylborder");
	});
	$('.x-address input').on("blur", function() {
		if ($(this).val() != "" || $(this).val() != "请输入详情地址") {
			$(this).css({
				"color": "#191919"
			});
			$(this).parent().prev().children('i').css('color', '#a0a0a5')
		} else {
			$(this).css({
				"color": "#a0a0a5"
			});
			$(this).parent().prev().children('i').css('color', '#191919')
		}
	})
	$(".problem li input").on("blur", function() { //失去焦点
		$(this).parent().parent().removeClass("ylborder");
		if ($(this).val() != ""|| $(this).val().substr(0,3) != "请输入") {
			$(this).parent().siblings(".left").children("i").css({
				"color": "#a09fa4"
			});
		} else {
			$(this).parent().siblings(".left").children("i").css({
				"color": "#191919"
			});
		}
	});
	//radio
	$(".problem li label input[type='radio']").on("click", function() { //单选
		$(this).next("i").show().parent().siblings().children("i").hide();
		$(this).attr("checked", true);
		$(this).parent().siblings().children("input").attr("checked", false);
		$(this).parent().parent().siblings(".left").children("i").css({
			"color": "#a09fa4"
		});
	});

}

function submit(_hl) {
	var finaljson = {}; //最后输出的json对象
//	var addressStatu=true;
//	if($('div').hasClass('x-address')){//地址必填校验
//		var $_span=$('.x-address p span');
//			if($_span.text()=="*"){
//				var addrssVal=$_span.parent().parent().prev().children('span').text();
//				var ext_addrssVal=$_span.parent().next().children('input').val();
//				if(addrssVal!=""&&ext_addrssVal!=""){
//					addressStatu=true;
//				}else{
//					$_span.parent().parent().prev().prev().append('<label class="message_info">请输入必填数据</label>');
//					addressStatu=false;
//				}
//			}
//		}
//	var kk=$(".text-textarea02").children("textarea").val()
//						alert(kk)
	var jsTemp = []; //临时数组用于保存input类型的_json
	for (j = 0; j < duInputArr.length; j++) {
		if (answerType1 == "input") {
			var _json1 = {};
			var jv;
			for (var i = 0; i < duInputArr[j].children().length; i++) {
				//console.log(duInputArr[j].children());
				if (duInput.children().eq(i).css('display') != "none") {
					console.log(i)
					var jm = duInputArr[j].children().eq(i).attr("data");
										console.log(jm)
					var jd = duInputArr[j].children().eq(i).attr("_id");
					//  span内容
					if (duInputArr[j].children().eq(i).children(".right").children("span").length == 1) {
						if (duInput.children().eq(i).attr('inputtype') == "ADDRESS") {
							if(duInputArr[j].children().eq(i).children(".right").children("span").attr('guid')==undefined){
                                jv=null;
							}else{
								jv = duInputArr[j].children().eq(i).children(".right").children("span").attr('guid') + '||' + duInput.children().eq(i).children(".x-address").children().find('input').val();
							}

						} else {
							if(duInputArr[j].children().eq(i).children(".right").children("span").attr('name')==undefined){
								jv=null;
							}else{
								jv = duInputArr[j].children().eq(i).children(".right").children("span").attr('name');
							}
						}
						//输入框
					} else if (duInputArr[j].children().eq(i).children(".right").children("input").length == 1) {
						jv = duInputArr[j].children().eq(i).children(".right").children("input").val();
						// 单选框
					} else if (duInputArr[j].children().eq(i).children(".right").children("label").length == 2) {
//						for (var k = 0; k < duInputArr[j].children().eq(i).children(".right").children("label").length; k++) {
							var yh=duInputArr[j].children().eq(i).children(".right").children("label");
							if (yh.eq(0).children("input").attr("checked")) {
								jv = duInputArr[j].children().eq(i).children(".right").children("label").eq(0).children("input").val();
							}else if(yh.eq(1).children("input").attr("checked")){
								jv = duInputArr[j].children().eq(i).children(".right").children("label").eq(1).children("input").val();
							}else{
								jv=null;
							}
//						}
						//文本框
					}else if (duInputArr[j].children().eq(i).children(".text-textarea02").children("textarea").length == 1) {
						jv = duInputArr[j].children().eq(i).children(".text-textarea02").children("textarea").val();
					}else if (duInputArr[j].children().eq(i).children(".qdate").children("input").length == 2) {
						var dateInput=duInputArr[j].children().eq(i).children(".qdate").children("input");
						if(dateInput.eq(0).val()!=''&&dateInput.eq(1).val()!=''){
							var date_0 = dateInput.eq(0).val();
							var date_1 = dateInput.eq(1).val();
							jv=date_0+','+date_1;
						}else{
							jv=null;
						}
					}
					else if (duInputArr[j].children().eq(i).children(".textCon").children("textarea").length == 1) {
						jv = duInputArr[j].children().eq(i).children(".textCon").children("textarea").text();
					}else if (duInputArr[j].children().eq(i).children(".chenckbox").children("label").length > 0) {
						var ch_box = duInputArr[j].children().eq(i).children(".chenckbox").children("label");
						var jy = '';
						for (var u = 0; u < ch_box.length; u++) {
							if (duInputArr[j].children().eq(i).children(".chenckbox").children("label").eq(u).children('img').attr('src') == 'img/jxt_icon.png') {
								jy += duInputArr[j].children().eq(i).children(".chenckbox").children("label").eq(u).children('span').attr('name') + ',';
							}
						}
						jv = jy.substr(0, jy.length - 1);
					}
					else if (duInputArr[j].children().eq(i).children(".right").children("input").length == 3) {
		                var areaCode=duInputArr[j].children().eq(i).children(".right").children("input").eq(0).val();
		                var telCode=duInputArr[j].children().eq(i).children(".right").children("input").eq(1).val();
		                var extension=duInputArr[j].children().eq(i).children(".right").children("input").eq(2).val();
		                if(areaCode==""&&telCode==""&&extension==""){
		                	jv=null;
		                }else if(areaCode!=""&&telCode!=""&&extension==""){
					        jv = areaCode+'-'+telCode;
                        }else{
                        	jv = areaCode+'-'+telCode+'-'+extension;
                        }
		            }
					if (jd == undefined) {
						jd = null;
					}
					_json1[jm] = jv;
				}
			}
		}
//		_json1["serialNo"] = $('section').attr('id');
//		_json1["id"] = $('section').attr('name');
		jsTemp.push(_json1);
		console.log(_json1)
	}
	// 设置json格式进行传值
	
	// 2 详细贷款用途页面  input类型
	if (modelOjbName == "loanPurposeModel") {
//		finaljson["loanPurposeModel"] = {
//			"loanPurpose": {}
//		};
		for (var i = 0; i < objjson.length; i++) {
			if (objjson[i] == "loanPurpose") {
				answerJson.loanPurposeModel.loanPurpose = jsTemp[0];
				finaljson=answerJson;
			}
		}
		finaljson["completeStatus"] = completeStatus(finaljson["completeStatus"])
		var _finaljson = JSON.stringify(finaljson);
		console.log(_finaljson)
			 if (_dataChecker.checkAll(true))
		    {
		       console.info("校验通过")
			   if(_hl){
			    	AndroidJs.saveWjDetalAnswer(_finaljson,true);
			    }else{
			    	AndroidJs.saveWjDetalAnswer(_finaljson,false);
			    }
			}
		    else
		    {
			   console.info("校验不通过");
			   AndroidJs.saveWjDetalAnswer(_finaljson,false);
		    }
	};
	//3信贷员建议 页面   table类型   
	if (modelOjbName == "adviseModel") {
//		finaljson["adviseModel"] = {
//			"advise": {}
//		};
		console.log(objjson);
		for (var i = 0; i < objjson.length; i++) {
			if (objjson[i] == "advise") {
				answerJson.adviseModel.advise = jsTemp[0];
				finaljson=answerJson;
			}
		}
		if(completeStatus(finaljson["completeStatus"])==2&&lableState()==2){
			finaljson["completeStatus"] =2;
		}else{
			finaljson["completeStatus"] =1;
		}
//		 completeStatus(finaljson["completeStatus"]);
		var _finaljson = JSON.stringify(finaljson);
		console.log(_finaljson)
		   if (_dataChecker.checkAll(true))
		    {
		       console.info("校验通过")
		       if(_hl){
			    	AndroidJs.saveWjDetalAnswer(_finaljson,true);
			    }else{
			    	AndroidJs.saveWjDetalAnswer(_finaljson,false);
			    }
			}
		    else
		    {
			   console.info("校验不通过");
			   AndroidJs.saveWjDetalAnswer(_finaljson,false);
		    }
	
	};
	//4 工作单位信息  input类型
	if (modelOjbName == "companyInfoModel") {
//		finaljson["companyInfoModel"] = {
//			"companyInfo": {}
//		};
		//		console.log(objjson);
		for (var i = 0; i < objjson.length; i++) {
			if (objjson[i] == "companyInfo") {

				answerJson.companyInfoModel.companyInfo= jsTemp[0];
				finaljson=answerJson;
				//				console.log(finaljson);
			}
		}
		finaljson["completeStatus"] = completeStatus(finaljson["completeStatus"]);

		var _finaljson = JSON.stringify(finaljson);
		console.log(_finaljson)
		 if (_dataChecker.checkAll(true))
		    {
		       console.info("校验通过")
			    if(_hl){
			    	AndroidJs.saveWjDetalAnswer(_finaljson,true);
			    }else{
			    	AndroidJs.saveWjDetalAnswer(_finaljson,false);
			    }
			}
		    else
		    {
			   console.info("校验不通过");
			   AndroidJs.saveWjDetalAnswer(_finaljson,false);
		    }
	
	};

	//5 生意工作单位信息  input类型
	if (modelOjbName == "businessInfoModel") {
//		finaljson{};
		//		console.log(objjson);
		for (var i = 0; i < objjson.length; i++) {
			if (objjson[i] == "ownerBusinessInfo") {

				answerJson.businessInfoModel.ownerBusinessInfo = jsTemp[0];
				finaljson=answerJson;
				//				console.log(finaljson);
			}
		}
		finaljson["completeStatus"] = completeStatus(finaljson["completeStatus"]);

		var _finaljson = JSON.stringify(finaljson);
		console.log(_finaljson)
		
		
		
		//TODO
			if (_dataChecker.checkAll(true))
		    {
		       console.info("校验通过")
//			   AndroidJs.saveWjDetalAnswer(_finaljson);
			    if(_hl){
			    	AndroidJs.saveWjDetalAnswer(_finaljson,true);
			    }else{
			    	AndroidJs.saveWjDetalAnswer(_finaljson,false);
			    }
			}
		    else
		    {
			   console.info("校验不通过");
			   AndroidJs.saveWjDetalAnswer(_finaljson,false);
		    }
	
	};

};

function completeStatus(Tjson) {
	//状态判断
	//console.log($('.problem li').length)
	var t1;
	var t2;
	for (var w = 0; w < $('.problem li').length; w++) {
		if($('.problem li').eq(w).css('display')!="none"){
			if ($('.problem li').eq(w).attr('require') == "true") {
				if ($('.problem li').eq(w).children('.right').children('span').length == 1) {
					if ($('.problem li').eq(w).children('.right').children('span').text() == "请选择") {
						t1 = 1;
					}
				} else if ($('.problem li').eq(w).children('.right').children('input').length == 1) {
					var te = $('.problem li').eq(w).children('.right').children('input').val();
					if (te == '') {
						t2 = 1;
					}
				}
	
			}
		}
	}
	if (t1 == 1 || t2 == 1) {
		Tjson = 1;
	} else {
		Tjson = 2;
	}
	return Tjson;
}

function mask2(id, _this) { //创建遮罩层函数（1/2/3/4/5），id:外面传进来的code名，_this:外面传进来点击的对象
	_tc = true;
	var that = id.codeDicList;
	var checkY = id.controlShowRuleList;
	$('<div id="mask"><div class="mask_bg"></div><ul><div class="m_div"></div><li class="cancel">取消</li></ul></div>').appendTo("body");
	if (that.length == 1) {
		$(".cancel").before($('<li>1</li><li>2</li><li>3</li><li>4</li><li class="linone">5</li>'));
	} else {
		for (var k = 0; k < that.length; k++) {
			$("<li name=" + that[k].code + ">" + that[k].name + "</li>").appendTo('.m_div');
		}
	}
	$("#mask li").on("click", function() {
		_tc = false;
		$("#mask").remove();
		if ($(this).hasClass('cancel')) {} else {
			_this.children("span").html($(this).html()).css({
				"color": "#191919"
			});
			_this.children("span").attr('name', $(this).attr('name'));
			if (checkY != null) {
				var hh;
				var hcode;
				for (var y = 0; y < checkY.length; y++) {
					hh = checkY[y].key;
					hcode = checkY[y].code;
					if (($(this).attr('name')).match(hh)) {
						for (var t = 0; t < hcode.length; t++) {
							for (var z = 0; z < _this.parent().siblings().length; z++) {
								if (_this.parent().siblings().eq(z).attr('code') == hcode[t]) {
									//								       	console.log(hcode[t])
									_this.parent().siblings().eq(z).show();
								}
							}
						}
					} else {
						for (var f = 0; f < _this.parent().siblings().length; f++) {
							for (var t = 0; t < hcode.length; t++) {
								if (_this.parent().siblings().eq(f).attr('code') == hcode[t]) {
									//									console.log(checkY[y].code[t])
									_this.parent().siblings().eq(f).hide();
								}
							}
						}
					}
				}
			}
			_this.siblings(".left").children("i").css({
				"color": "#a09fa4"
			});
		}
		return false;
	});
}
//正则转换函数
function regular(_str) {
	var s_tr = "/" + _str + "/";
	return eval(s_tr)
}

function lableState(){
	var lableS=$('#0').children('.right').children('label');
//	alert(lableS.eq(0).children('i').css('display'))
	if(lableS.eq(0).children('i').css('display')=="none"&&lableS.eq(1).children('i').css('display')=="none"){
		return 1;
	}else{
		return 2;
	}
}
