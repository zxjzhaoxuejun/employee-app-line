var _Code = "CODE";
var _String = "STRING";
var _Telephone = "TELEPHONE";
var _Date = "DATE";
var _Double = "DOUBLE";
var _Integer = "INTEGER";
var _Address = "ADDRESS";
var _SSQAddress = "SSQADDRESS";
var _Checkbox = "CHECKBOX";
var objName;
var serialNoString;//问卷号
var answerJson;//整个答案
$("<section></section>").appendTo($("body"));
$('<footer id="next" onclick="Submit(true);"><p>确定</p></footer>').insertAfter('section');

var _dataChecker = new QestionRegChecker();

function loadSalaryInfo(data) { //页面生成方法
	var b = data[0];
	answerJson = jsonForm(data[1]); //
	console.log(answerJson)
	if(answerJson["serialNo"].serialNo!=undefined){
		serialNoString=answerJson["serialNo"].serialNo;//问卷号
	}else{
		serialNoString=null;//问卷号
	}
	for (var i = 0; i < b.modelDetailSubList.length; i++) {
		var modelObj = data[0].modelDetailSubList[i];
		objName = modelObj.objName;
		_dataChecker.initQuestionMap(modelObj.objName, modelObj.questionDetailList);
		//	console.log(b.modelDetailSubList[i])
		questionList(b.modelDetailSubList[i], answerJson); //上部分列表;
		questionTable(b.modelDetailSubList[i], answerJson); //下部分表格
	}
	_dataChecker.initAutoCheckTrigger();
};

function questionList(c, a) {
	if (a.salaryInfoModel.salaryInfo != null) {
		$('<div class="problem" data="' + serialNoString + '" modelName="' + objName + '"><p>收入分析表</p><ul id="' + a.salaryInfoModel.salaryInfo.id + '"></ul></div>').appendTo('section');
	} else {
		$('<div class="problem" data="' + serialNoString + '" modelName="' + objName + '"><p>收入分析表</p><ul id="null"></ul></div>').appendTo('section');
	}
	var wt = c.questionDetailList;
	var du = $('.problem ul');
	var _idj = {};
	for (var i = 0; i < 5; i++) {
		//		wt[i].code//行号
		//		wt[i].require//是否必填
		//		wt[i].inputType//类型
		//		wt[i].fieldName//名字
		//		wt[i].name//字段名
		var Unit;
		if (wt[i].inputUnit == null) {
			Unit = '';
		} else {
			Unit = wt[i].inputUnit;
		}
		//文本型
		if (wt[i].inputType == _String) {
			if (wt[i].require) {
				$('<li data="' + wt[i].code + '" isDynamicShow="' + wt[i].isDynamicShow + '" name="' + wt[i].fieldName + '" fieldName="' + wt[i].fieldName + '" require="' + wt[i].require + '" ><div class="left"><span>*</span><i>' + wt[i].name + '</i></div><div class="right"><input type="text" placeholder="请输入' + wt[i].name + '"/><b class="yuan">' + Unit + '</b></div></li>').appendTo(du);
			} else {
				$('<li data="' + wt[i].code + '"  isDynamicShow="' + wt[i].isDynamicShow + '" fieldName="' + wt[i].fieldName + '" name="' + wt[i].fieldName + '" require="' + wt[i].require + '" ><div class="left"><span>&nbsp;&nbsp;</span><i>' + wt[i].name + '</i></div><div class="right"><input type="text" placeholder="请输入' + wt[i].name + '"/><b class="yuan">' + Unit + '</b></div></li>').appendTo(du);
			}
		}
		//	  固定电话
		if (wt[i].inputType == _Telephone) {
			//		是否必填
			if (wt[i].require) {
				$('<li name="' + wt[i].fieldName + '" fieldName="' + wt[i].fieldName + '" require="' + wt[i].require + '" isDynamicShow="' + wt[i].isDynamicShow + '" data="' + wt[i].code + '"><div class="left"><span>*</span><i title="' + wt[i].name + '">' + wt[i].name + '</i></div><div class="right"><input type="text" value="请输入' + wt[i].name + '"/><b class="yuan">' + Unit + '</b></div></li>').appendTo(du);
			} else {
				$('<li name="' + wt[i].fieldName + '" fieldName="' + wt[i].fieldName + '" require="' + wt[i].require + '" isDynamicShow="' + wt[i].isDynamicShow + '" data="' + wt[i].code + '"><div class="left"><span>&nbsp;&nbsp;</span><i title="' + wt[i].name + '">' + wt[i].name + '</i></div><div class="right"><input type="text" value="请输入' + wt[i].name + '"/><b class="yuan">' + Unit + '</b></div></li>').appendTo(du)
			}
		};
		//日期
		var dateID
		if (wt[i].inputType == _Date) {
			var _al = wt[i].code.split(",");
			//给div设id
			var _idv = wt[i].code.replace(/\./g, "-"); //分割code
			dateID = 'date' + _idv;
			if (wt[i].require) {
				//是否必填
				$('<li  name="' + wt[i].fieldName + '" fieldName="' + wt[i].fieldName + '" isDynamicShow="' + wt[i].isDynamicShow + '"  require="' + wt[i].require + '" data="' + wt[i].code + '" ><div class="left"><span>*</span><i title="' + wt[i].name + '">' + wt[i].name + '</i></div><div class="right"><input id="' + dateID + '"  type="text" readonly  name="input_date" placeholder="日期选择" data-lcalendar="1988-01-11,2020-05-29"/></div></li>').appendTo(du);
			} else {
				$('<li  name="' + wt[i].fieldName + '" fieldName="' + wt[i].fieldName + '" isDynamicShow="' + wt[i].isDynamicShow + '"  require="' + wt[i].require + '" data="' + wt[i].code + '" ><div class="left"><span>&nbsp;&nbsp;</span><i title="' + wt[i].name + '">' + wt[i].name + '</i></div><div class="right"><input id="' + dateID + '"  type="text" readonly  name="input_date" placeholder="日期选择" data-lcalendar="1988-01-11,2020-05-29" /></div></li>').appendTo(du)
			}
			var calendar = new lCalendar();
			calendar.init({
				"trigger": "#" + dateID,
				"type": "date"
			});
		};
		//整数
		if (wt[i].inputType == _Integer) {
			if (wt[i].require) {
				//是否必填
				$('<li name="' + wt[i].fieldName + '" fieldName="' + wt[i].fieldName + '" require="' + wt[i].require + '" data="' + wt[i].code + '" ><div class="left"><span>*</span><i title="' + wt[i].name + '">' + wt[i].name + '</i></div><div class="right"><input  type="number" placeholder="请输入' + wt[i].name + '"/><b class="yuan">' + Unit + '</b></div></li>').appendTo(du);
			} else {
				$('<li name="' + wt[i].fieldName + '" fieldName="' + wt[i].fieldName + '" require="' + wt[i].require + '" data="' + wt[i].code + '" ><div class="left"><span>&nbsp;&nbsp;</span><i title="' + wt[i].name + '">' + wt[i].name + '</i></div><div class="right"><input  type="number" placeholder="请输入' + wt[i].name + '"/><b class="yuan">' + Unit + '</b></div></li>').appendTo(du);
			}
		};
		//小数
		if (wt[i].inputType == _Double) {
			if (wt[i].require) {
				//是否必填
				$('<li name="' + wt[i].fieldName + '" fieldName="' + wt[i].fieldName + '" isDynamicShow="' + wt[i].isDynamicShow + '" require="' + wt[i].require + '" data="' + wt[i].code + '" ><div class="left"><span>*</span><i title="' + wt[i].name + '">' + wt[i].name + '</i></div><div class="right"><input data="' + wt[i].fieldName + '" type="number" placeholder="请输入' + wt[i].name + '"/><b class="yuan">' + Unit + '</b></div></li>').appendTo(du);
			} else {
				$('<li name="' + wt[i].fieldName + '" fieldName="' + wt[i].fieldName + '" isDynamicShow="' + wt[i].isDynamicShow + '"  require="' + wt[i].require + '" data="' + wt[i].code + '" ><div class="left"><span>&nbsp;&nbsp;</span><i title="' + wt[i].name + '">' + wt[i].name + '</i></div><div class="right"><input  data="' + wt[i].fieldName + '" type="number" placeholder="请输入' + wt[i].name + '"/><b class="yuan">' + Unit + '</b></div></li>').appendTo(du);
			}
		};

		//地址+详情
		if (wt[i].inputType == _Address) {
			var _idv = qL[i].code.replace(/\./g, "-"); //分割code//分割code
			//			console.log(wt[i].inputType)
			if (wt[i].require) {
				$('<li  class="address" fieldName="' + wt[i].fieldName + '" isDynamicShow="' + wt[i].isDynamicShow + '" name="' + wt[i].fieldName + '" require="' + wt[i].require + '" data="' + wt[i].code + '" inputtype="' + wt[i].inputType + '"><div class="left"><span>*</span><i title="' + wt[i].name + '">' + wt[i].name + '</i></div><div id="' + _idv + '" class="right"  onclick="adree(this.id)"><span class="choose" name="">请选择</span><img src="img/down_icon.png" class="select"/></div><div class="x-address"><p><span>&nbsp;&nbsp;</span><i>详细地址</i></p><p><input type="text" value="请输入详细地址" /></p></div></li>').appendTo(du);
			} else {
				$('<li  class="address" fieldName="' + wt[i].fieldName + '" isDynamicShow="' + wt[i].isDynamicShow + '" name="' + wt[i].fieldName + '" require="' + wt[i].require + '" data="' + wt[i].code + '" inputtype="' + wt[i].inputType + '"><div class="left"><span>&nbsp;&nbsp;</span><i title="' + wt[i].name + '">' + wt[i].name + '</i></div><div id="' + _idv + '" class="right"  onclick="adree(this.id)"><span class="choose" name="">请选择</span><img src="img/down_icon.png" class="select"/></div><div class="x-address"><p><span>&nbsp;&nbsp;</span><i>详细地址</i></p><p><input type="text" value="请输入详细地址" /></p></div></li>').appendTo(du);
			}
		}


		//只有省市区地址
		if (wt[i].inputType == _SSQAddress) {
			var _idv = qL[i].code.replace(/\./g, "-"); //分割code//分割code
			//			console.log(wt[i].inputType)
			if (wt[i].require) {
				$('<li fieldName="' + wt[i].fieldName + '" isDynamicShow="' + wt[i].isDynamicShow + '" name="' + wt[i].fieldName + '" require="' + wt[i].require + '" data="' + wt[i].code + '" inputtype="' + wt[i].inputType + '"><div class="left"><span>*</span><i title="' + wt[i].name + '">' + wt[i].name + '</i></div><div id="' + _idv + '" class="right"  onclick="adree(this.id)"><span class="choose" name="">请选择</span><img src="img/down_icon.png" class="select"/></div></li>').appendTo(du);
			} else {
				$('<li fieldName="' + wt[i].fieldName + '" isDynamicShow="' + wt[i].isDynamicShow + '" name"' + wt[i].fieldName + '" require="' + wt[i].require + '" data="' + wt[i].code + '" inputtype="' + wt[i].inputType + '"><div class="left"><span>&nbsp;&nbsp;</span><i title="' + wt[i].name + '">' + wt[i].name + '</i></div><div id="' + _idv + '" class="right"  onclick="adree(this.id)"><span class="choose" name="">请选择</span><img src="img/down_icon.png" class="select"/></div></li>').appendTo(du);
			}
		}

		//选择（弹窗）
		if (wt[i].inputType == _Code) { //require:是否必填,data:问题code,checkMark:校验类型,limitLength:文本长度
			var _al = wt[i].codeDicList; //给div设id
			var _idv = wt[i].code.replace(/\./g, "-"); //分割code//分割code
			var adrID = 'adr' + _idv;
			if (wt[i].codeDicList == null) { //待补充，暂时想不起来
				$('<li isDynamicShow="' + wt[i].isDynamicShow + '"  name="' + wt[i].fieldName + '" require="' + wt[i].require + '" data="' + wt[i].code + '" inputType="' + wt[i].inputType + '"><div class="left"><span>*</span><i title="' + wt[i].name + '">' + wt[i].name + '</i></div><div class="right" onClick="getProvinceBuy(this.id)" id="' + adrID + '"><span class="choose" data="' + wt[i].fieldName + '">请选择</span><img src="img/down_icon.png" class="select"/></div></li>').appendTo(du);

			} else {
				var _al = wt[i].codeDicList;
				//给div设id
				var _idv = wt[i].code.replace(/\./g, "-"); //分割code

				if (wt[i].require) {
					//是否必填
					if (_al.length == 2) { //判断是弹窗还是radio
						//两个
						$('<li fieldName="' + wt[i].fieldName + '" isDynamicShow="' + wt[i].isDynamicShow + '"  name="' + wt[i].fieldName + '" require="' + wt[i].require + '" data="' + wt[i].code + '" inputType="' + wt[i].inputType + '"><div class="left"><span>*</span><i title="' + wt[i].name + '">' + wt[i].name + '</i></div><div class="right"><label><input name="textbox" type="radio" value="' + _al[0].code + '"/>' + _al[0].name + '<i></i></label><label><input name="textbox" type="radio" value="' + _al[1].code + '"/>' + _al[1].name + '<i></i></label></div></li>').appendTo(du);
					} else {
						//多个
						$('<li fieldName="' + wt[i].fieldName + '" isDynamicShow="' + wt[i].isDynamicShow + '"  name="' + wt[i].fieldName + '" require="' + wt[i].require + '" data="' + wt[i].code + '" inputType="' + wt[i].inputType + '"><div class="left"><span>*</span><i title="' + wt[i].name + '">' + wt[i].name + '</i></div><div id="' + _idv + '" class="right"><span class="choose">请选择</span><img src="img/down_icon.png" class="select"/></div></li>').appendTo(du);
						_iddv = $('#' + _idv);
						_idj[_idv] = wt[i]; //单独的id存到json里面
						_iddv.on("click", function() { //给每个id绑定事件
							var id = this.id; //点击的id
							mask2(_idj[id], $(this)); //遮罩层
						});
					}
				} else {
					if (_al.length == 2) { //判断是弹窗还是radio
						//两个
						$('<li fieldName="' + wt[i].fieldName + '" isDynamicShow="' + wt[i].isDynamicShow + '" name="' + wt[i].fieldName + '" require="' + wt[i].require + '" data="' + wt[i].code + '" inputType="' + wt[i].inputType + '"><div class="left"><span>&nbsp;&nbsp;</span><i title="' + wt[i].name + '">' + wt[i].name + '</i></div><div class="right"><label><input name="textbox" type="radio" value="' + _al[0].code + '"/>' + _al[0].name + '<i></i></label><label><input name="textbox" type="radio" value="' + _al[1].code + '"/>' + _al[1].name + '<i></i></label></div></li>').appendTo(du);
					} else {
						//多个
						$('<li fieldName="' + wt[i].fieldName + '" isDynamicShow="' + wt[i].isDynamicShow + '"  name="' + wt[i].fieldName + '" require="' + wt[i].require + '" data="' + wt[i].code + '" inputType="' + wt[i].inputType + '"><div class="left"><span>&nbsp;&nbsp;</span><i title="' + wt[i].name + '">' + wt[i].name + '</i></div><div id="' + _idv + '" class="right"><span class="choose">请选择</span><img src="img/down_icon.png" class="select"/></div></li>').appendTo(du);
						_iddv = $('#' + _idv);
						_idj[_idv] = wt[i]; //单独的id存到json里面
						_iddv.on("click", function() { //给每个id绑定事件
							var id = this.id; //点击的id
							mask2(_idj[id], $(this)); //遮罩层
						});
					}
				}
			}
		};

		//checkbox复选框
		if (wt[i].type == _Checkbox) {
			var _al = wt[i].code.split(",");
			//给div设id
			var _idv = wt[i].code.replace(/\./g, "-"); //分割code
			if (wt[i].require) {
				//是否必填
				$('<li fieldName="' + wt[i].fieldName + '" isDynamicShow="' + wt[i].isDynamicShow + '" name="' + wt[i].fieldName + '" invesT="' + wt[i].isLabel + '" require="' + wt[i].require + '" data="' + wt[i].code + '" checkMark="' + wt[i].checkMark + '" limitLength="' + wt[i].limitLength + '"><div class="left"><span>*</span><i title="' + wt[i].name + '">' + wt[i].name + '</i></div><div id="' + _idv + '" class="right"><span class="choose">请选择</span><img src="img/down_icon.png" class="select"/></div></li>').appendTo(du);
				_iddv = $('#' + _idv);
				_idj[_idv] = wt[i]; //单独的id存到json里面
				_iddv.on("click", function() { //给每个id绑定事件
					var id = this.id; //点击的id
					maskBox(_idj[id], $(this)); //遮罩层
				});
			} else {
				$('<li fieldName="' + wt[i].fieldName + '" isDynamicShow="' + wt[i].isDynamicShow + '" name="' + wt[i].fieldName + '" invesT="' + wt[i].isLabel + '" require="' + wt[i].require + '" data="' + wt[i].code + '" checkMark="' + wt[i].checkMark + '" limitLength="' + wt[i].limitLength + '"><div class="left"><span>*</span><i title="' + wt[i].name + '">' + wt[i].name + '</i></div><div id="' + _idv + '" class="right"><span class="choose">请选择</span><img src="img/down_icon.png" class="select"/></div></li>').appendTo(du);
				_iddv = $('#' + _idv);
				_idj[_idv] = wt[i]; //单独的id存到json里面
				_iddv.on("click", function() { //给每个id绑定事件
					var id = this.id; //点击的id
					maskBox(_idj[id], $(this)); //遮罩层
				});
			}
		};

	}

	//传送过来的答案

	if (a.salaryInfoModel.salaryInfo != null) {
		var aswIn = a.salaryInfoModel.salaryInfo;
		for (var i = 0; i < $('.problem ul li').length; i++) {
			if ($('.problem ul').eq(i).attr('isDynamicShow') == 1) {
				$('.problem ul').eq(i).hide();
			}
			for (key in aswIn) {
				if ($('.problem ul li').eq(i).attr('name') == key) {
					if ($('.problem ul li').eq(i).children('.right').children('input').length == 1) {
						$('.problem ul li').eq(i).children('.right').children('input').val(aswIn[key]);
						$('.problem ul li').eq(i).children(".left").children("i").css({
							"color": "#a09fa4"
						});
					} else if ($('.problem ul li').eq(i).children('.right').children('span').length == 1) {
						if ($('.problem ul li').eq(i).attr('inputType') == _Code) {
							var _ch = c.questionDetailList[i].codeDicList;

							for (var k = 0; k < _ch.length; k++) {
								if (_ch[k].code == aswIn[key]) {
									$('.problem ul li').eq(i).children('.right').children('span').text(_ch[k].name).css({
										"color": "#191919"
									});
									$('.problem ul li').eq(i).children('.right').children('span').attr('name', _ch[k].code)
									$('.problem ul li').eq(i).children(".left").children("i").css({
										"color": "#a09fa4"
									});
								}
							}
						}
					}

				}

			}
		}
	}

	$('li[fieldname="name"] .right input').attr('disabled', 'disabled');

}


//表的创建
function questionTable(v, a) {
	var Tab = v.questionDetailList;
	var chckebox1 = Tab[5].codeDicList;
	var chckebox2 = Tab[6].codeDicList;
	var chckebox3 = Tab[7].codeDicList;
	$('<div class="income"><div class="ic_head"><div><span class="span_bg" id="sr">收入（元）</span><span id="zc">支出（元）</span></div></div></div>').insertAfter('.problem');
	$('<div class="sr"><div class="ic_center"><b>核实方式</b><span>A1+A2+B1+B6</span></div></div>').insertAfter('.ic_head');
	var html = '';
	html += '<div class="ic_select"><ul>';
	html += '<li class="li_bt" name="' + Tab[5].fieldName + '">' + Tab[5].name + '</li>';
	html += '<li class="li_ct" name="' + Tab[6].fieldName + '">' + Tab[6].name + '</li>';
	html += '<li name="' + Tab[7].fieldName + '">' + Tab[7].name + '</li></ul></div>';
	$(html).insertAfter('.ic_center');

	var dxhtml = ''; //底薪
	dxhtml += '<div class="ic_dx dx"><ul class="dx_h acquiesce">';
	for (var i = 0; i < chckebox1.length; i++) {
		dxhtml += '<li><i class="ch_img"></i><span class="span_f" data=' + chckebox1[i].code + '>' + chckebox1[i].name + '</span></li>';
	}
	dxhtml += '</ul></div>';

	var jjhtml = ''; //奖金
	jjhtml += '<div class="ic_dx jj"><ul class="dx_h acquiesce">';
	for (var i = 0; i < chckebox2.length; i++) {
		jjhtml += '<li><i class="ch_img"></i><span class="span_f" data=' + chckebox2[i].code + '>' + chckebox2[i].name + '</span></li>';
	}
	jjhtml += '</ul></div>';
	var qthtml = ''; //其他
	qthtml += '<div class="ic_dx qt"><ul class="dx_h">';
	for (var i = 0; i < chckebox3.length; i++) {
		qthtml += '<li><i class="ch_img"></i><span class="span_f" data=' + chckebox3[i].code + '>' + chckebox3[i].name + '</span></li>';
	}
	qthtml += '</ul></div>';
	var tabLiat = dxhtml + jjhtml + qthtml
	$(tabLiat).insertAfter('.ic_select');

	var srTable = '';
	var timeTitle = Tab[8].name; //时间
	var dxTitle = Tab[9].name; //底薪
	var jjTitle = Tab[10].name; //奖金
	var qtTitle = Tab[11].name; //其他
	var htTotal = Tab[12].name; //收入合计
	var aswTab = a.salaryInfoModel.salaryInfoMonths;
	var a_serialNo = serialNoString;
	if (aswTab.length > 1) {
		console.log(aswTab)
		srTable += '<div class="timeChoose"><div class="timeName"><span>月份区间</span></div>';
		srTable += '<div class="timeInput"><input type="text" id="demo_date1" placeholder="选择开始月份"> - <input type="text" id="demo_date2" placeholder="选择结束月份"></div></div>';
		srTable += '<ul class="dx_f dx_table">';
		srTable += '<li class="filter srAfter" ><span>' + timeTitle + '</span><span>' + dxTitle + '(元)</span><span>' + jjTitle + '(元)</span><span>' + qtTitle + '(元)</span><span>' + htTotal + '(元)</span></li>';
		for (var i = 0; i < aswTab.length; i++) {
			if(aswTab[i].id==undefined){//下发的数据没有id时
				aswTab[i].id=i;
			}
			srTable += '<li serialNo="' + serialNoString + '" class="addLi" name="' + aswTab[i].id + '" id="' + aswTab[i].id + '"><span><input disabled="disabled" type="text" name="' + Tab[8].fieldName + '"/></span><span><input name="' + Tab[9].fieldName + '" type="number"/></span><span><input name="' + Tab[10].fieldName + '" type="number"/></span><span><input name="' + Tab[11].fieldName + '" type="number"/></span><span><input type="number" name="' + Tab[12].fieldName + '" class="singleTotal"/></span></li>';
		}
		srTable += '<li class="filter  filter-span"><span>月平均</span><span class="verticalTotal" name="' + Tab[17].fieldName + '" ></span><span class="verticalTotal" name="' + Tab[18].fieldName + '"></span><span name="' + Tab[19].fieldName + '" class="verticalTotal"></span><span name="' + Tab[20].fieldName + '" class="verticalTotal"></span></li>';
		srTable += '<li class="filter  filter-input"><span>未来预期月份</span><input type="number" name="' + Tab[25].fieldName + '" class="wl s_wl"><input type="number" name="' + Tab[26].fieldName + '" class="wl s_wl"><input type="number" name="' + Tab[27].fieldName + '" class="wl s_wl"><input type="number" name="' + Tab[28].fieldName + '" class="wl s_wl" disabled="disabled"></span></li>';
		srTable += '</ul></div>';
		$(srTable).insertAfter('.qt');

		//支出
		var zcTable = '';
		zcTable += '<div class="zc"><ul class="dx_f zc_table">';
		zcTable += '<li class="filter zcAfter"><span>时间</span><span>房租</span><span>房/车贷还款</span><span>其他还款</span><span>支出合计(1)</span></li>';
		for (var i = 0; i < aswTab.length; i++) {
			zcTable += '<li serialNoString="' + a_serialNo + '" class="addLi"  name="' + aswTab[i].id + '" id="' + aswTab[i].id + '"><span><input disabled="disabled" name="' + Tab[8].fieldName + '" type="text" value=""/></span><span><input name="' + Tab[13].fieldName + '" type="number"/></span><span><input name="' + Tab[14].fieldName + '" type="number"/></span><span><input name="' + Tab[15].fieldName + '"  type="number"/></span><span><input type="number" name="' + Tab[16].fieldName + '" class="singleTotal"/></span></li>';
		}
		zcTable += '<li class="filter filter-span"><span>月平均</span><span name="' + Tab[21].fieldName + '" class="verticalTotal"></span><span name="' + Tab[22].fieldName + '" class="verticalTotal"></span><span name="' + Tab[23].fieldName + '" class="verticalTotal"></span><span name="' + Tab[24].fieldName + '" class="verticalTotal"></span></li>';
		zcTable += '<li class="filter filter-input"><span>未来预期月份</span><input type="number" name="' + Tab[29].fieldName + '" class="wl z_wl"><input type="number" name="' + Tab[30].fieldName + '" class="wl z_wl"><input type="number" name="' + Tab[31].fieldName + '" class="wl z_wl"><input type="number" name="' + Tab[32].fieldName + '" class="wl z_wl" disabled="disabled"></span></li>';
		zcTable += '</ul></div>';
		$(zcTable).insertAfter('.sr');
	} else { //没有数据时
		srTable += '<div class="timeChoose"><div class="timeName"><span>月份区间</span></div>';
		srTable += '<div class="timeInput"><input type="text" id="demo_date1" placeholder="选择开始月份"> - <input type="text" id="demo_date2" placeholder="选择结束月份"></div></div>';
		srTable += '<ul class="dx_f dx_table">';
		srTable += '<li class="filter srAfter"><span>' + timeTitle + '</span><span>' + dxTitle + '</span><span>' + jjTitle + '</span><span>' + qtTitle + '</span><span>' + htTotal + '</span></li>';
		//var j_month;
		//for(var i=0;i<=5;i++){
		// j_month=Nmonth-i;
		//srTable+='<li serialNo="'+a_serialNo+'" name="null"><span><input disabled="disabled" type="text" value="'+Nyear+'-'+j_month+'" name="'+Tab[8].fieldName+'"/></span><span><input name="'+Tab[9].fieldName+'" type="number"/></span><span><input name="'+Tab[10].fieldName+'" type="number"/></span><span><input name="'+Tab[11].fieldName+'" type="number"/></span><span><input type="number" name="'+Tab[12].fieldName+'" class="singleTotal"/></span></li>';
		//}
		srTable += '<li class="filter filter-span"><span>月平均</span><span class="verticalTotal" name="' + Tab[17].fieldName + '" ></span><span class="verticalTotal" name="' + Tab[18].fieldName + '"></span><span name="' + Tab[19].fieldName + '" class="verticalTotal"></span><span name="' + Tab[20].fieldName + '" class="verticalTotal"></span></li>';
		srTable += '<li class="filter filter-input"><span>未来预期月份</span><input type="number" name="' + Tab[25].fieldName + '" class="wl s_wl"><input type="number" name="' + Tab[26].fieldName + '" class="wl s_wl"><input type="number" name="' + Tab[27].fieldName + '" class="wl s_wl"><input type="number" name="' + Tab[28].fieldName + '" class="wl s_wl" disabled="disabled"></span></li>';
		srTable += '</ul></div>';
		$(srTable).insertAfter('.qt');


		//支出
		var zcTable = '';
		zcTable += '<div class="zc"><ul class="dx_f zc_table">';
		zcTable += '<li class="filter zcAfter" ><span>时间</span><span>房租</span><span>房/车贷还款</span><span>其他还款</span><span>支出合计(1)</span></li>';
		zcTable += '<li class="filter filter-span"><span>月平均</span><span name="' + Tab[21].fieldName + '" class="verticalTotal"></span><span name="' + Tab[22].fieldName + '" class="verticalTotal"></span><span name="' + Tab[23].fieldName + '" class="verticalTotal"></span><span name="' + Tab[24].fieldName + '" class="verticalTotal"></span></li>';
		zcTable += '<li class="filter filter-input"><span>未来预期月份</span><input name="' + Tab[29].fieldName + '" class="wl z_wl" type="number"><input name="' + Tab[30].fieldName + '" class="wl z_wl" type="number"><input name="' + Tab[31].fieldName + '" class="wl z_wl" type="number"><input name="' + Tab[32].fieldName + '" class="wl z_wl" disabled="disabled"></li>';
		zcTable += '</ul></div>';
		$(zcTable).insertAfter('.sr');
	}
	//alert(monthNum)
	$('.z_wl').on('change keyup', function() {
		$('.z_wl').eq(3).val(Number($('.z_wl').eq(0).val()) + Number($('.z_wl').eq(1).val()) + Number($('.z_wl').eq(2).val()));
	})
	$('.s_wl').on('change keyup', function() {
		$('.s_wl').eq(3).val(Number($('.s_wl').eq(0).val()) + Number($('.s_wl').eq(1).val()) + Number($('.s_wl').eq(2).val()));
	});

	$('.timeInput input').on('change keyup', function() { //日期选择
		var monthNum = [];
		var _th = $(this).parent().parent();
		var Time1 = $('#demo_date1').val();
		var Time2 = $('#demo_date2').val();
		console.log(Time1);
		console.log(Time2);
		if (Time1 != '' && Time2 != '') {
			monthNum = DateDiffNoMonth(Time1, Time2, _th);
			if (monthNum != undefined) {
				$('.salaryMonthError').remove();
				if ($('.dx_f li').hasClass('addLi')) {
					$('.dx_f li.addLi').remove();
					$('.filter-span').children('.verticalTotal').text('');
					$('.filter-input').children('input').val('');
				}
				var srTableHtml = '';
				var zcTableHtml = '';
				for (var i = 0; i < monthNum.length; i++) {
					srTableHtml += '<li serialNo="' + a_serialNo + '" class="addLi" name="' + i + '"><span><input disabled="disabled" type="text" value="' + monthNum[i] + '" name="' + Tab[8].fieldName + '"/></span><span><input name="' + Tab[9].fieldName + '" type="number"/></span><span><input name="' + Tab[10].fieldName + '" type="number"/></span><span><input name="' + Tab[11].fieldName + '" type="number"/></span><span><input type="number" name="' + Tab[12].fieldName + '" class="singleTotal"/></span></li>';
					zcTableHtml += '<li serialNo="' + a_serialNo + '" class="addLi" name="' + i + '"><span><input disabled="disabled" value="' + monthNum[i] + '" name="' + Tab[8].fieldName + '" type="text"  /></span><span><input name="' + Tab[13].fieldName + '" type="number"/></span><span><input name="' + Tab[14].fieldName + '" type="number"/></span><span><input name="' + Tab[15].fieldName + '"  type="number"/></span><span><input type="number" name="' + Tab[16].fieldName + '" class="singleTotal"/></span></li>';
				}
				$(srTableHtml).insertAfter('.srAfter');
				$(zcTableHtml).insertAfter('.zcAfter');
			}
		}
		calc();
	})

	date_scoll(40, 200);
	//获取答案
	if (a.salaryInfoModel.salaryInfoMonths != null) {
		var aswTab = a.salaryInfoModel.salaryInfoMonths;
		var aswA = a.salaryInfoModel.salaryInfo;
		var sr_y = $('ul li.filter').children('.verticalTotal');
		var wl_y = $('ul li.filter').children('.wl');
		for (key in aswA) {
			if (key == 'baseSalaryAvg') {
				for (var y = 0; y < sr_y.length; y++) {
					if (sr_y.eq(y).attr('name') == 'baseSalaryAvg') {
						if (aswA[key] != null) {
							sr_y.eq(y).text(aswA[key]);
						}
					}
				}
			}
			if (key == 'incomePrizeAvg') {
				for (var y = 0; y < sr_y.length; y++) {
					if (sr_y.eq(y).attr('name') == 'incomePrizeAvg') {
						if (aswA[key] != null) {
							sr_y.eq(y).text(aswA[key]);
						}
					}
				}
			}
			if (key == 'incomeOtherAvg') { //其他月均收入
				for (var y = 0; y < sr_y.length; y++) {
					if (sr_y.eq(y).attr('name') == 'incomeOtherAvg') {
						if (aswA[key] != null) {
							sr_y.eq(y).text(aswA[key]);
						}
					}
				}
			}
			if (key == 'incomeAvg') { //合计收入月均
				for (var y = 0; y < sr_y.length; y++) {
					if (sr_y.eq(y).attr('name') == 'incomeAvg') {
						if (aswA[key] != null) {
							sr_y.eq(y).text(aswA[key]);
						}
					}
				}
			}
			if (key == 'rentAvg') { //房租月均
				for (var y = 0; y < sr_y.length; y++) {
					if (sr_y.eq(y).attr('name') == 'rentAvg') {
						if (aswA[key] != null) {
							sr_y.eq(y).text(aswA[key]);
						}
					}
				}
			}
			if (key == 'houseCarRepayAvg') { //车房月均还款
				for (var y = 0; y < sr_y.length; y++) {
					if (sr_y.eq(y).attr('name') == 'houseCarRepayAvg') {
						if (aswA[key] != null) {
							sr_y.eq(y).text(aswA[key]);
						}
					}
				}
			}
			if (key == 'otherRepayAvg') {
				for (var y = 0; y < sr_y.length; y++) {
					if (sr_y.eq(y).attr('name') == 'otherRepayAvg') {
						if (aswA[key] != null) {
							sr_y.eq(y).text(aswA[key]);
						}
					}
				}
			}
			if (key == 'costAvg') {
				for (var y = 0; y < sr_y.length; y++) {
					if (sr_y.eq(y).attr('name') == 'costAvg') {
						if (aswA[key] != null) {
							sr_y.eq(y).text(aswA[key]);
						}
					}
				}
			}
			if (key == 'futureBaseSalary') {
				for (var y = 0; y < wl_y.length; y++) {
					if (wl_y.eq(y).attr('name') == 'futureBaseSalary') {
						if (aswA[key] != null) {
							wl_y.eq(y).val(aswA[key]);
						}
					}
				}
			}
			if (key == 'futureIncomePrize') {
				for (var y = 0; y < sr_y.length; y++) {
					if (wl_y.eq(y).attr('name') == 'futureIncomePrize') {
						if (aswA[key] != null) {
							wl_y.eq(y).val(aswA[key]);
						}
					}
				}
			}
			if (key == 'futureIncomeOther') {
				for (var y = 0; y < sr_y.length; y++) {
					if (wl_y.eq(y).attr('name') == 'futureIncomeOther') {
						if (aswA[key] != null) {
							wl_y.eq(y).val(aswA[key]);
						}
					}
				}
			}
			if (key == 'futureIncomeSum') {
				for (var y = 0; y < sr_y.length; y++) {
					if (wl_y.eq(y).attr('name') == 'futureIncomeSum') {
						if (aswA[key] != null) {
							wl_y.eq(y).val(aswA[key]);
						}
					}
				}
			}
			if (key == 'futureCost') {
				for (var y = 0; y < sr_y.length; y++) {
					if (wl_y.eq(y).attr('name') == 'futureCost') {
						if (aswA[key] != null) {
							wl_y.eq(y).val(aswA[key]);
						}
					}
				}
			}
			if (key == 'futureHouseCarRepay') {
				for (var y = 0; y < sr_y.length; y++) {
					if (wl_y.eq(y).attr('name') == 'futureHouseCarRepay') {
						if (aswA[key] != null) {
							wl_y.eq(y).val(aswA[key]);
						}
					}
				}
			}
			if (key == 'futureOtherRepay') {
				for (var y = 0; y < sr_y.length; y++) {
					if (wl_y.eq(y).attr('name') == 'futureOtherRepay') {
						if (aswA[key] != null) {
							wl_y.eq(y).val(aswA[key]);
						}
					}
				}
			}
			if (key == 'futureRent') {
				for (var y = 0; y < sr_y.length; y++) {
					if (wl_y.eq(y).attr('name') == 'futureRent') {
						if (aswA[key] != null) {
							wl_y.eq(y).val(aswA[key]);
						}
					}
				}
			}


		}
		if (aswA != null) { //底薪checkbox
			if (aswA.checkMethodBaseSalary != null) {
				var ch_box = aswA.checkMethodBaseSalary.split(',');
				for (var i in ch_box) {
					//				alert(ch_box[i])
					for (var j = 0; j < $('.dx li').length; j++) {
						if ($('.dx li').eq(j).children('span').attr('data') == ch_box[i]) {
							$('.dx li').eq(j).children('span').removeClass('span_f');
							$('.dx li').eq(j).children('i').removeClass('ch_img').addClass('on');
						}
					}
				}
			}
		}
		if (aswA != null) { //奖励checkbox
			if (aswA.checkMethodPrize != null) {
				var ch_box1 = aswA.checkMethodPrize.split(',');
				for (var i in ch_box1) {
					for (var j = 0; j < $('.jj li').length; j++) {
						if ($('.jj li').eq(j).children('span').attr('data') == ch_box1[i]) {
							$('.jj li').eq(j).children('span').removeClass('span_f');
							$('.jj li').eq(j).children('i').removeClass('ch_img').addClass('on');
						}
					}
				}
			}
		}
		if (aswA != null) { //其他checkbox
			if (aswA.checkMethodOther != null) {
				var ch_box1 = aswA.checkMethodOther.split(',');
				for (var i in ch_box1) {
					for (var j = 0; j < $('.qt li').length; j++) {
						if ($('.qt li').eq(j).children('span').attr('data') == ch_box1[i]) {
							$('.qt li').eq(j).children('span').removeClass('span_f');
							$('.qt li').eq(j).children('i').removeClass('ch_img').addClass('on');
						}
					}
				}
			}
		}

		var ch_total = '';
		for (var k = 0; k < $('.dx_h li').length; k++) {
			if (!($('.dx_h li').eq(k).children('span').hasClass('span_f'))) {
				ch_total += $('.dx_h li').eq(k).children('span').text().substr(0, 2) + '+';
			}
		}

		$('.ic_center span').text(ch_total.substr(0, ch_total.length - 1));

		for (var k = 0; k < aswTab.length; k++) {
			for (var i = 1; i < $('ul.dx_table li').length - 2; i++) {
				if ($('ul.dx_table li').eq(i).attr('name') == aswTab[k].id) {
					for (key in aswTab[k]) {
						console.log(key)
						if (key == 'month') { //时间
							for (var kk = 0; kk < 5; kk++) {
								console.log($('ul.dx_table li').eq(i).children().eq(kk).children('input').attr('name'))
								if ($('ul.dx_table li').eq(i).children().eq(kk).children('input').attr('name') == 'month') {
									console.log(3)
									$('ul.dx_table li').eq(i).children().eq(kk).children('input').val(aswTab[k].month)
								}
							}
							if (k == 0) {
								$('#demo_date2').val(aswTab[k].month);
							} else if (k == (aswTab.length - 1)) {
								$('#demo_date1').val(aswTab[k].month);
							}
						} else if (key == 'incomeBaseSalary') { //底薪
							for (var kk = 0; kk < 5; kk++) {
								if ($('ul.dx_table li').eq(i).children().eq(kk).children('input').attr('name') == 'incomeBaseSalary') {
									$('ul.dx_table li').eq(i).children().eq(kk).children('input').val(aswTab[k].incomeBaseSalary)
								}
							}
						} else if (key == 'incomePrize') { //奖金
							for (var kk = 0; kk < 5; kk++) {
								if ($('ul.dx_table li').eq(i).children().eq(kk).children('input').attr('name') == 'incomePrize') {
									$('ul.dx_table li').eq(i).children().eq(kk).children('input').val(aswTab[k].incomePrize)
								}
							}
						} else if (key == 'incomeOther') { //其他
							for (var kk = 0; kk < 5; kk++) {
								if ($('ul.dx_table li').eq(i).children().eq(kk).children('input').attr('name') == 'incomeOther') {
									$('ul.dx_table li').eq(i).children().eq(kk).children('input').val(aswTab[k].incomeOther)
								}
							}
						} else if (key == 'incomeSum') { //合计
							for (var kk = 0; kk < 5; kk++) {
								if ($('ul.dx_table li').eq(i).children().eq(kk).children('input').attr('name') == 'incomeSum') {
									$('ul.dx_table li').eq(i).children().eq(kk).children('input').val(aswTab[k].incomeSum)
								}
							}
						}

					}

				}
			}

			////支出

			for (var i = 1; i < $('ul.zc_table li').length - 2; i++) {
				if ($('ul.zc_table li').eq(i).attr('name') == aswTab[k].id) {
					for (key in aswTab[k]) {
						if (key == 'month') { //时间
							for (var kk = 0; kk < 5; kk++) {
								if ($('ul.zc_table li').eq(i).children().eq(kk).children('input').attr('name') == 'month') {
									$('ul.zc_table li').eq(i).children().eq(kk).children('input').val(aswTab[k].month)
								}
							}
						} else if (key == 'costRent') { //房租
							for (var kk = 0; kk < 5; kk++) {
								if ($('ul.zc_table li').eq(i).children().eq(kk).children('input').attr('name') == 'costRent') {
									$('ul.zc_table li').eq(i).children().eq(kk).children('input').val(aswTab[k].costRent)
								}
							}
						} else if (key == 'costHouseCarRepay') { //车房还款
							for (var kk = 0; kk < 5; kk++) {
								if ($('ul.zc_table li').eq(i).children().eq(kk).children('input').attr('name') == 'costHouseCarRepay') {
									$('ul.zc_table li').eq(i).children().eq(kk).children('input').val(aswTab[k].costHouseCarRepay)
								}
							}
						} else if (key == 'costOtherRepay') { //其他还款
							for (var kk = 0; kk < 5; kk++) {
								if ($('ul.zc_table li').eq(i).children().eq(kk).children('input').attr('name') == 'costOtherRepay') {
									$('ul.zc_table li').eq(i).children().eq(kk).children('input').val(aswTab[k].costOtherRepay)
								}
							}
						} else if (key == 'costSum') { //合计
							for (var kk = 0; kk < 5; kk++) {
								if ($('ul.zc_table li').eq(i).children().eq(kk).children('input').attr('name') == 'costSum') {
									$('ul.zc_table li').eq(i).children().eq(kk).children('input').val(aswTab[k].costSum)
								}
							}
						}

					}

				}
			}


		}
	}
	$('input[data="disposableIncome"]').attr('disabled', 'disabled');
	//	$('input[data="disposableIncome"]').val(0);
	$('input[data="disposableIncome"]').css({
		'background': '#f8f8f8'
	});
	$(function() {
		$('.dx_f input').on('change keyup', function() { //计算每月可用资金(8月8日修改)
			if($(this).val().indexOf('.')!=-1){//小数
				console.log("请输入整数！");
				if($('.num-error')){
					$('.num-error').remove();
					if($(this).parent().hasClass('filter')){
						$(this).parent().append('<label class="num-error">请输入整数！</label>');
					}else{
						$(this).parent().parent().append('<label class="num-error">请输入整数！</label>');
					}
					
				}
			}else if($(this).val().length>10){
				console.log("输入数字长度不能超过10位！");
				if($('.num-lenght-error')){
					$('.num-lenght-error').remove();
					if($(this).parent().hasClass('filter')){
						$(this).parent().append('<label class="num-lenght-error">输入数字长度不能超过10位！</label>');
					}else{
						$(this).parent().parent().append('<label class="num-lenght-error">输入数字长度不能超过10位！</label>');
					}
				}
			}else{
				$('.num-lenght-error').remove();
				$('.num-error').remove();
			}
			var InSum = $('span[name="incomeAvg"]').text();
			var OutSum = $('span[name="costAvg"]').text();
			var Differ = toDecimal(InSum - OutSum);
			$('input[data="disposableIncome"]').val(Differ);
		});
		$('input').focus(function() {
			$('.verify-error').remove();
		});
	})

}



//提交数据
function Submit(_hl) {
	var inputchangTag=$('.dx_f input[type="number"]');
	var inputchangStatue=true;
	for(var n=0;n<inputchangTag.length;n++){
		if(inputchangTag.eq(n).val().indexOf('.')!=-1){//小数
			if(inputchangTag.eq(n).parent().hasClass('filter')){
				inputchangTag.eq(n).parent().append('<label class="num-error">请输入整数！</label>');
			}else{
				inputchangTag.eq(n).parent().parent().append('<label class="num-error">请输入整数！</label>');
			}
			inputchangStatue=false;
		}else if(inputchangTag.eq(n).val().length>10){//大于十位数
			if(inputchangTag.eq(n).parent().hasClass('filter')){
				inputchangTag.eq(n).parent().append('<label class="num-lenght-error">输入数字长度不能超过10位！</label>');
			}else{
				inputchangTag.eq(n).parent().parent().append('<label class="num-lenght-error">输入数字长度不能超过10位！</label>');
			}
			inputchangStatue=false;
		}
	}
	var _sr = {}; //提交的json
	var salaryInfoModel = {};
	var salaryInfo = [];
	for (var i = 0; i < $('.problem ul li').length; i++) {
		if ($('.problem ul').eq(i).css('display') != 'none') {
			var _li;
			var _jz = $('.problem ul li').eq(i).attr('name');

			if ($('.problem ul li').eq(i).children('.right').children('input').length == 1) {
				_li = $('.problem ul li').eq(i).children('.right').children('input').val();

			}
			if ($('.problem ul li').eq(i).children('.right').children('span').length == 1) {
				_li = $('.problem ul li').eq(i).children('.right').children('span').attr('name');

			}
			_sr[_jz] = _li;
		}
	}

	for (var k = 0; k < $('.dx_f li span.verticalTotal').length; k++) {
		var _tab;
		var _jz = $('.dx_f li span.verticalTotal').eq(k).attr("name");
		_tab = $('.dx_f li span.verticalTotal').eq(k).text();
		_sr[_jz] = _tab - 0;
	}
	for (var hh = 0; hh < $('.dx_f li input.wl').length; hh++) {
		var _t;
		var _jz = $('.dx_f li input.wl').eq(hh).attr("name");
		_t = $('.dx_f li input.wl').eq(hh).val();
		_sr[_jz] = _t - 0;
	}

	if ($('.problem ul').attr('id') != null) {
		_sr["id"] = $('.problem ul').attr('id');
	} else {
		_sr["id"] = null;
	}
	_sr["serialNo"] = $('.dx_f li .singleTotal').eq(0).parent().parents().attr('serialNo');


	var _dj = '';
	for (var oo = 0; oo < $('.dx .dx_h li').length; oo++) {
		var _dx;
		if (($('.dx .dx_h li').eq(oo).children('i').hasClass('on'))) {
			_dx = $('.dx .dx_h li').eq(oo).children('span').attr('data');
			_dj += _dx + ',';
		}
	}
	var _jjc = '';
	for (var w = 0; w < $('.jj .dx_h li').length; w++) {
		var _jx;
		if (($('.jj .dx_h li').eq(w).children('i').hasClass('on'))) {
			_jx = $('.jj .dx_h li').eq(w).children('span').attr('data');
			_jjc += _jx + ',';
		}
	}
	var _qj = '';
	for (var o = 0; o < $('.qt .dx_h li').length; o++) {
		var _qx;
		if (($('.qt .dx_h li').eq(o).children('i').hasClass('on'))) {
			_qx = $('.qt .dx_h li').eq(o).children('span').attr('data');
			_qj += _qx + ',';
		}
	}

	var dxJ = $('.ic_select ul li').eq(0).attr('name');
	var jxJ = $('.ic_select ul li').eq(1).attr('name');
	var qxJ = $('.ic_select ul li').eq(2).attr('name');

	if (_qj != '') {
		_sr[qxJ] = _qj.substr(0, _qj.length - 1);
	} else {
		_sr[qxJ] = null;
	}
	if (_dj != '') {
		_sr[dxJ] = _dj.substr(0, _dj.length - 1);
	} else {
		_sr[dxJ] = null;
	}

	if (_jjc != '') {
		_sr[jxJ] = _jjc.substr(0, _jjc.length - 1);
	} else {
		_sr[jxJ] = null;
	}
	//console.log(_sr);//月平均，预计月
	var salaryInfoMonths = [];
	var ys = {}
	var _jj = [];

	for (var i = 0; i < $('.dx_table li[name]').length; i++) {
		var _tx = $('.dx_table li[name]').eq(i).attr("name");
		var _tt = $('.dx_f li .singleTotal').eq(i).parent().parents().attr('serialNo');
		var jj = {};
		for (var j = 0; j < $('.dx_table li[name]').eq(i).children("span").length; j++) {
			var _ta = $('.dx_table li[name]').eq(i).children("span").eq(j).children("input").val();
			var _tn = $('.dx_table li[name]').eq(i).children("span").eq(j).children("input").attr("name");
			if (_ta == "") {
				jj[_tn] = null;
			} else {
				jj[_tn] = _ta;
			}
			if (_tx != null) {
				jj["id"] = _tx;
			} else {
				jj["id"] = null;
			}
			jj["serialNo"] = _tt;
			//		console.log(_ta)
		}
		for (var j = 1; j < $('.zc_table li[name]').eq(i).children("span").length; j++) {
			var _ta = $('.zc_table li[name]').eq(i).children("span").eq(j).children("input").val();

			var _tn = $('.zc_table li[name]').eq(i).children("span").eq(j).children("input").attr("name");
			if (_ta == "") {
				jj[_tn] = null;
			} else {
				jj[_tn] = _ta;
			}

			//		console.log(_ta)
		}
		_jj.push(jj)
	}

	console.log(_jj)
//	ys.serialNo = $('.problem').attr('data');
	answerJson.salaryInfoModel.salaryInfoMonths = _jj;
	answerJson.salaryInfoModel.salaryInfo = _sr;
	ys=answerJson;
	ys["completeStatus"] = completeStatus(ys["completeStatus"])
	var _ys = JSON.stringify(ys);
//	console.log(ys)
	var submitState = true;
	var incomeAvgMoney = $('span[name="incomeAvg"]').text(); //收入月均值
	var costAvgMoney = $('span[name="costAvg"]').text(); //支出月均值

	if ($('#demo_date1').val() != '' || $('#demo_date2').val() != '') {
		submitState = true;
	} else {
		submitState = false;
		$('.timeInput').append('<i class="salaryMonthError">请选择月份区间！</i>');
	}

	if (incomeAvgMoney >= 2000) { //收入合计的月平均需大于等于2000
		submitState = true;
		$('.verify-error').remove();
	} else {
		$('span[name="incomeAvg"]').parent().append('<label class="verify-error">收入合计的月平均需大于等于2000</label>')
		submitState = false;
	}
//	console.log(_ys)
		// TODO 保存收入分析答案
	if (_dataChecker.checkAll(true)) {
		console.log(ys);
//		console.info("校验通过")
//		console.log('基本数据校验通过');
		//			   AndroidJs.saveWjDetalAnswer(_ys);
		if (_hl && submitState&&inputchangStatue) {
			console.log('手动点击基本数据校验通过');
			if (costAvgMoney == 0) { //检查支出合计的月平均，如果等于0，则提示“请确认客户支出是否为0？”
				//		alert('请确认客户支出是否为0？');
//				console.log('支出数据基本数据校验不通过');
				submitState = false;
				var costHtml = '<div class="cost-mask"><div class="cost-mask-bg"></div><div class="cost-con"><p class="prompt-con">请确认客户支出是否为0？<img class="cancel-img" src="img/close_icon.png"></p><p class="submit-mask">确认</p></div></div>';
				$(costHtml).appendTo('body');
				$('.cancel-img').click(function() {
					submitState = false;
					$('.cost-mask').remove();
//					console.log('点击取消支出数据基本数据校验不通过');
					AndroidJs.saveWjDetalAnswer(_ys, false);
				});
				$('.submit-mask').click(function() {
//					console.log('点击确定支出数据基本数据校验不通过');
					submitState = true;
//					console.info("校验最终通过")
					$('.cost-mask').remove();
					AndroidJs.saveWjDetalAnswer(_ys, true);
				})
				AndroidJs.saveWjDetalAnswer(_ys, false);
			} else {
//				console.info("校验最终通过")
				AndroidJs.saveWjDetalAnswer(_ys, true);
			}
		} else {
			console.log('自动点击基本数据校验通过');
			AndroidJs.saveWjDetalAnswer(_ys, false);
		}
	} else {
//		console.info("校验不通过");
//		console.log('基本数据校验不通过');
		AndroidJs.saveWjDetalAnswer(_ys, false);
	}

	return _ys;
}



function mask2(id, _this) { //创建遮罩层函数（1/2/3/4/5），id:外面传进来的code名，_this:外面传进来点击的对象
	_tc = true;
	var that = id.codeDicList;
	var checkY = id.controlShowRuleList;
	$('<div id="mask"><div class="mask_bg"></div><ul><li class="cancel">取消</li></ul></div>').appendTo("body");
	if (that.length == 1) {
		$(".cancel").before($('<li>1</li><li>2</li><li>3</li><li>4</li><li class="linone">5</li>'));
	} else {
		for (var k = 0; k < that.length; k++) {
			$(".cancel").before($("<li name=" + that[k].code + ">" + that[k].name + "</li>"))
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
				for (var y = 0; y < checkY.length; y++) {
					if ($(this).attr('name') == checkY[y].key) {
						for (var t = 0; t < checkY[y].code.length; t++) {
							for (var z = 0; z < _this.parent().siblings().length; z++) {
								if (_this.parent().siblings().eq(z).attr('data') == checkY[y].code[t]) {
									_this.parent().siblings().eq(z).show();
								}
							}
						}
					} else {
						for (var z = 0; z < _this.parent().siblings().length; z++) {
							if (_this.parent().siblings().eq(z).attr("isDynamicShow") == 1) {
								_this.parent().siblings().eq(z).hide();
							}
						}

					}
				}
			}
			_this.siblings(".left").children("i").css({
				"color": "#a09fa4"
			});
		}
		//		console.log(_tc)
		return false;
	});
}



function completeStatus(Tjson) {
	//状态判断
	//console.log($('.problem li').length)
	var t1;
	var t2;
	for (var w = 0; w < $('.problem li').length; w++) {
		if ($('.problem li').eq(w).attr('require') == "true") {
			if ($('.problem li').eq(w).children('.right').children('span').length == 1) {
				if ($('.problem li').eq(w).children('.right').children('span').text() == "请选择") {
					t1 = 1;
				}
			} else if ($('.problem li').eq(w).children('.right').children('input').length == 1) {
				var te = $('.problem li').eq(w).children('.right').children('input').val();
				//			var noText=te.substr(0,3);
				//			console.log(te)
				if (te == '') {
					t2 = 1;
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