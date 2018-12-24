var objName;
var answerJson;//整个答案
var serialNoString;//问卷号
$("<section></section>").appendTo($("body"));
$('<footer id="next" onclick="Submit(true);"><p>确定</p></footer>').insertAfter('section');
var _dataChecker = new QestionRegChecker();

function loadOwnerSalaryInfo(data) { //页面生成方法
	var b = data[0];
	answerJson = jsonForm(data[1]); //
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
	console.log(a.salaryInfoModel.salaryInfo)
	var _topId;
	if (a.salaryInfoModel.salaryInfo != null) {
		_topId = a.salaryInfoModel.salaryInfo.id;
	} else {
		_topId = null;
	}
	$('<div class="problem" data="' + serialNoString + '" modelName="' + objName + '"><p>收入分析表</p><ul id="' + _topId + '"></ul></div>').appendTo('section');
	var wt = c.questionDetailList;
	var du = $('.problem ul');
	//	console.log(c.name)
	var _idj = {};
	for (var i = 0; i < 4; i++) {
		//		wt[i].code//行号
		//		wt[i].require//是否必填
		//		wt[i].inputType//类型
		//		wt[i].fieldName//名字
		//		wt[i].name//字段名
		console.log(wt[i].name)
		var Unit;
		if (wt[i].inputUnit == null) {
			Unit = '';
		} else {
			Unit = wt[i].inputUnit;
		}
		//文本型
		if (wt[i].inputType == "STRING") {
			if (wt[i].require) {
				$('<li fieldName="' + wt[i].fieldName + '" data="' + wt[i].code + '" isDynamicShow="' + wt[i].isDynamicShow + '" name="' + wt[i].fieldName + '" require="' + wt[i].require + '" ><div class="left"><span>*</span><i>' + wt[i].name + '</i></div><div class="right"><input type="text" placeholder="请输入' + wt[i].name + '"/><b class="yuan">' + Unit + '</b></div></li>').appendTo(du);
			} else {
				$('<li fieldName="' + wt[i].fieldName + '" data="' + wt[i].code + '"  isDynamicShow="' + wt[i].isDynamicShow + '"  name="' + wt[i].fieldName + '" require="' + wt[i].require + '" ><div class="left"><span>&nbsp;&nbsp;</span><i>' + wt[i].name + '</i></div><div class="right"><input type="text" placeholder="请输入' + wt[i].name + '"/><b class="yuan">' + Unit + '</b></div></li>').appendTo(du);
			}
		}
		//	  固定电话
		if (wt[i].inputType == "TELEPHONE") {
			//		是否必填
			if (wt[i].require) {
				$('<li fieldName="' + wt[i].fieldName + '" name="' + wt[i].fieldName + '" require="' + wt[i].require + '" isDynamicShow="' + wt[i].isDynamicShow + '" data="' + wt[i].code + '"><div class="left"><span>*</span><i title="' + wt[i].name + '">' + wt[i].name + '</i></div><div class="right"><input type="text" value="请输入' + wt[i].name + '"/><b class="yuan">' + Unit + '</b></div></li>').appendTo(du);
			} else {
				$('<li fieldName="' + wt[i].fieldName + '" name="' + wt[i].fieldName + '" require="' + wt[i].require + '" isDynamicShow="' + wt[i].isDynamicShow + '" data="' + wt[i].code + '"><div class="left"><span>&nbsp;&nbsp;</span><i title="' + wt[i].name + '">' + wt[i].name + '</i></div><div class="right"><input type="text" value="请输入' + wt[i].name + '"/><b class="yuan">' + Unit + '</b></div></li>').appendTo(du)
			}
		};
		//日期
		var dateID
		if (wt[i].inputType == "DATE") {
			var _al = wt[i].code.split(",");
			//给div设id
			var _idv = wt[i].code.replace(/\./g, "-"); //分割code
			dateID = 'date' + _idv;
			if (wt[i].require) {
				//是否必填
				$('<li fieldName="' + wt[i].fieldName + '" name="' + wt[i].fieldName + '" isDynamicShow="' + wt[i].isDynamicShow + '"  require="' + wt[i].require + '" data="' + wt[i].code + '" ><div class="left"><span>*</span><i title="' + wt[i].name + '">' + wt[i].name + '</i></div><div class="right"><input id="' + dateID + '" onclick="check_date(this.id)" type="text" readonly  name="input_date" placeholder="日期选择" data-lcalendar="1988-01-11,2020-05-29"/></div></li>').appendTo(du);
			} else {
				$('<li fieldName="' + wt[i].fieldName + '" name="' + wt[i].fieldName + '" isDynamicShow="' + wt[i].isDynamicShow + '"  require="' + wt[i].require + '" data="' + wt[i].code + '" ><div class="left"><span>&nbsp;&nbsp;</span><i title="' + wt[i].name + '">' + wt[i].name + '</i></div><div class="right"><input id="' + dateID + '" onclick="check_date(this.id)" type="text" readonly  name="input_date" placeholder="日期选择" data-lcalendar="1988-01-11,2020-05-29" /></div></li>').appendTo(du)
			}
			var calendar = new lCalendar();
			calendar.init({
				"trigger": "#" + dateID,
				"type": "date"
			});
		};
		//整数
		if (wt[i].inputType == "INTEGER") {
			if (wt[i].require) {
				//是否必填
				$('<li fieldName="' + wt[i].fieldName + '" name="' + wt[i].fieldName + '" require="' + wt[i].require + '" data="' + wt[i].code + '" ><div class="left"><span>*</span><i title="' + wt[i].name + '">' + wt[i].name + '</i></div><div class="right"><input  type="number" placeholder="请输入' + wt[i].name + '"/><b class="yuan">' + Unit + '</b></div></li>').appendTo(du);
			} else {
				$('<li fieldName="' + wt[i].fieldName + '" name="' + wt[i].fieldName + '" require="' + wt[i].require + '" data="' + wt[i].code + '" ><div class="left"><span>&nbsp;&nbsp;</span><i title="' + wt[i].name + '">' + wt[i].name + '</i></div><div class="right"><input  type="number" placeholder="请输入' + wt[i].name + '"/><b class="yuan">' + Unit + '</b></div></li>').appendTo(du);
			}
		};
		//小数
		if (wt[i].inputType == "DOUBLE") {
			if (wt[i].require) {
				//是否必填
				$('<li fieldName="' + wt[i].fieldName + '" name="' + wt[i].fieldName + '"  isDynamicShow="' + wt[i].isDynamicShow + '" require="' + wt[i].require + '" data="' + wt[i].code + '" ><div class="left"><span>*</span><i title="' + wt[i].name + '">' + wt[i].name + '</i></div><div class="right"><input data="' + wt[i].fieldName + '" type="number" placeholder="请输入' + wt[i].name + '"/><b class="yuan">' + Unit + '</b></div></li>').appendTo(du);
			} else {
				$('<li fieldName="' + wt[i].fieldName + '" name="' + wt[i].fieldName + '" isDynamicShow="' + wt[i].isDynamicShow + '"  require="' + wt[i].require + '" data="' + wt[i].code + '" ><div class="left"><span>&nbsp;&nbsp;</span><i title="' + wt[i].name + '">' + wt[i].name + '</i></div><div class="right"><input  data="' + wt[i].fieldName + '" type="number" placeholder="请输入' + wt[i].name + '"/><b class="yuan">' + Unit + '</b></div></li>').appendTo(du);
			}
		};

		//地址+详情
		if (wt[i].inputType == "ADDRESS") {
			var _idv = qL[i].code.replace(/\./g, "-"); //分割code//分割code
			//			console.log(wt[i].inputType)
			if (wt[i].require) {
				$('<li fieldName="' + wt[i].fieldName + '" class="address" isDynamicShow="' + wt[i].isDynamicShow + '" name="' + wt[i].fieldName + '" require="' + wt[i].require + '" data="' + wt[i].code + '" inputtype="' + wt[i].inputType + '"><div class="left"><span>*</span><i title="' + wt[i].name + '">' + wt[i].name + '</i></div><div id="' + _idv + '" class="right"  onclick="adree(this.id)"><span class="choose" name="">请选择</span><img src="img/down_icon.png" class="select"/></div><div class="x-address"><p><span>&nbsp;&nbsp;</span><i>详细地址</i></p><p><input type="text" value="请输入详细地址" /></p></div></li>').appendTo(du);
			} else {
				$('<li fieldName="' + wt[i].fieldName + '" class="address" isDynamicShow="' + wt[i].isDynamicShow + '" name="' + wt[i].fieldName + '" require="' + wt[i].require + '" data="' + wt[i].code + '" inputtype="' + wt[i].inputType + '"><div class="left"><span>&nbsp;&nbsp;</span><i title="' + wt[i].name + '">' + wt[i].name + '</i></div><div id="' + _idv + '" class="right"  onclick="adree(this.id)"><span class="choose" name="">请选择</span><img src="img/down_icon.png" class="select"/></div><div class="x-address"><p><span>&nbsp;&nbsp;</span><i>详细地址</i></p><p><input type="text" value="请输入详细地址" /></p></div></li>').appendTo(du);
			}
		}


		//只有省市区地址
		if (wt[i].inputType == "SSQADDRESS") {
			var _idv = qL[i].code.replace(/\./g, "-"); //分割code//分割code
			//			console.log(wt[i].inputType)
			if (wt[i].require) {
				$('<li fieldName="' + wt[i].fieldName + '" isDynamicShow="' + wt[i].isDynamicShow + '" name="' + wt[i].fieldName + '" require="' + wt[i].require + '" data="' + wt[i].code + '" inputtype="' + wt[i].inputType + '"><div class="left"><span>*</span><i title="' + wt[i].name + '">' + wt[i].name + '</i></div><div id="' + _idv + '" class="right"  onclick="adree(this.id)"><span class="choose" name="">请选择</span><img src="img/down_icon.png" class="select"/></div></li>').appendTo(du);
			} else {
				$('<li fieldName="' + wt[i].fieldName + '" isDynamicShow="' + wt[i].isDynamicShow + '" name"' + wt[i].fieldName + '" require="' + wt[i].require + '" data="' + wt[i].code + '" inputtype="' + wt[i].inputType + '"><div class="left"><span>&nbsp;&nbsp;</span><i title="' + wt[i].name + '">' + wt[i].name + '</i></div><div id="' + _idv + '" class="right"  onclick="adree(this.id)"><span class="choose" name="">请选择</span><img src="img/down_icon.png" class="select"/></div></li>').appendTo(du);
			}
		}

		//选择（弹窗）
		if (wt[i].inputType == "CODE") { //require:是否必填,data:问题code,checkMark:校验类型,limitLength:文本长度
			var _al = wt[i].codeDicList; //给div设id
			var _idv = wt[i].code.replace(/\./g, "-"); //分割code//分割code
			var adrID = 'adr' + _idv;
			if (wt[i].codeDicList == null) { //待补充，暂时想不起来
				$('<li fieldName="' + wt[i].fieldName + '" isDynamicShow="' + wt[i].isDynamicShow + '"  name="' + wt[i].fieldName + '" require="' + wt[i].require + '" data="' + wt[i].code + '" inputType="' + wt[i].inputType + '"><div class="left"><span>*</span><i title="' + wt[i].name + '">' + wt[i].name + '</i></div><div class="right" onClick="getProvinceBuy(this.id)" id="' + adrID + '"><span class="choose" data="' + wt[i].fieldName + '">请选择</span><img src="img/down_icon.png" class="select"/></div></li>').appendTo(du);

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

		//          复选框
		if (wt[i].inputType == "CHECKBOX") {
			//				是否必填
			var html = "";
			for (var h = 0; h < wt[i].codeDicList.length; h++) {
				html += '<label class="chenckboxNews">' +
					'<input type="checkbox" style="display:none"/>' +
					'<img src="img/jx_icon.png">' +
					'<span name="' + wt[i].codeDicList[h].code + '">' + wt[i].codeDicList[h].name + '</span>' +
					'</label>';

			}
			if (wt[i].require) {
				$('<li fieldName="' + wt[i].fieldName + '" code="' + code + '" isDynamicShow="' + wt[i].isDynamicShow + '" fieldName="' + wt[i].fieldName + '" require="' + wt[i].require + '" data="' + wt[i].code + '" inputtype="' + wt[i].inputType + '"><div class="left"><span>*</span><i title="' + wt[i].name + '">' + wt[i].name + '</i></div><div id="' + _idv + '" class="right chenckbox" >' + html + '</div></li>').appendTo(du);
			} else {

				$('<li fieldName="' + wt[i].fieldName + '" code="' + code + '" isDynamicShow="' + wt[i].isDynamicShow + '" fieldName="' + wt[i].fieldName + '" require="' + wt[i].require + '" data="' + wt[i].code + '" inputtype="' + wt[i].inputType + '"><div class="left"><span>*</span><i title="' + wt[i].name + '">' + wt[i].name + '</i></div><div id="' + _idv + '" class="right chenckbox">' + html + '</div></li>').appendTo(du);
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
						if ($('.problem ul li').eq(i).attr('inputType') == "CODE") {
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
	var tab_14;
	var tab_13;
	var TabName_14;
	if(Tab[14].fieldName=='costAvg'){
		tab_14=Tab[14].fieldName;
		tab_13=Tab[13].fieldName;
		TabName_14=Tab[14].name;
	}else{
		tab_14=Tab[13].fieldName;
		tab_13=Tab[14].fieldName;
		TabName_14=Tab[13].name;
	}
	console.log(Tab[14].fieldName)
	$('<div class="income"><div class="ic_head"><div><span class="span_bg" id="sr">收入（元）</span><span id="zc">支出（元）</span></div></div></div>').insertAfter('.problem');
	var Tablemonth = '';
	Tablemonth += '<div class="timeChoose"><div class="timeName"><span>月份区间</span></div>';
	Tablemonth += '<div class="timeInput"><input type="text" id="demo_date1" placeholder="选择开始月份"> - <input type="text" id="demo_date2" placeholder="选择结束月份"></div></div>';
	$('<div class="sr"><ul class="hh_f dx_table remove-li"></ul></div>').insertAfter('.ic_head');
	$('<div class="zc"><ul class="dx_f zc_table yz_table remove-li"></ul></div>').insertAfter('.ic_head');
	$('.hh_f').before(Tablemonth);
	var srTable = '';
	var zcTable = '';
	var aswTab = a.salaryInfoModel.salaryInfoMonths;
	srTable += '<li class="filter srAfter"><span class="sr-time">' + Tab[4].name + '</span><span class="yz-sr">收入合计(1)</span></li>';
	zcTable += '<li class="filter zcAfter"><span>' + Tab[4].name + '</span><span>' + Tab[5].name + '</span><span>' + Tab[6].name + '</span><span>' + Tab[7].name + '</span><span>' + Tab[8].name + '</span></li>'
	if (aswTab.length > 0) {
		for (var i = 0; i < aswTab.length; i++) {
			if(aswTab[i].id==undefined){//下发的数据没有id时
				aswTab[i].id=i;
			}
			srTable += '<li serialNo="' + serialNoString + '" name="' + aswTab[i].id + '" class="addLi"><span class="sr-time"><input name="' + Tab[4].fieldName + '" type="text" /></span></span><span class="singleTotal yz-sr"><input name="' + tab_13 + '" type="number" /></span></li>';
			zcTable += '<li name="' + aswTab[i].id + '" class="addLi"><span><input name="' + Tab[4].fieldName + '" type="text" /></span><span><input name="' + Tab[5].fieldName + '" type="number" /></span><span><input name="' + Tab[6].fieldName + '" type="number" /></span><span><input name="' + Tab[7].fieldName + '"  type="number"/></span><span><input type="number" name="' + Tab[8].fieldName + '" class="singleTotal" /></span></li>';
		}
	} else {
		//没有数据时

	}
	srTable += '<li class="filter"><span class="sr-time" name="' + Tab[9].name + '">' + Tab[9].name.substring(0, 3) + '</span><span class="verticalTotal yz-sr" name="' + Tab[9].fieldName + '"></span></li>';
	console.log(Tab[13].fieldName)
	zcTable += '<li class="filter"><span>' + TabName_14.substring(0, 3) + '</span><span name="' + Tab[10].fieldName + '" class="verticalTotal"></span><span name="' + Tab[11].fieldName + '" class="verticalTotal"></span><span name="' + Tab[12].fieldName + '" class="verticalTotal"></span><span name="' + tab_14 + '" class="verticalTotal"></span></li>';
	$(srTable).appendTo('.hh_f');
	$(zcTable).appendTo('.yz_table');
	//支出
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
				if ($('.remove-li li').hasClass('addLi')) {
					$('.remove-li li.addLi').remove();
					$('.filter-span').children('.verticalTotal').text('');
					$('.filter-input').children('input').val('');
				}
				var srTableHtml = '';
				var zcTableHtml = '';
				for (var i = 0; i < monthNum.length; i++) {
					srTableHtml += '<li serialNo="' + serialNoString + '" class="addLi" name="' + i + '"><span  class="sr-time"><input disabled="disabled" type="text" value="' + monthNum[i] + '" name="' + Tab[4].fieldName + '"/></span><span class="singleTotal yz-sr"><input name="' + tab_13 + '" type="number" class="singleTotal"/></span></li>';
					zcTableHtml += '<li serialNo="' + serialNoString + '" class="addLi" name="' + i + '"><span><input disabled="disabled" value="' + monthNum[i] + '" name="' + Tab[4].fieldName + '" type="text"  /></span><span><input name="' + Tab[5].fieldName + '" type="number"/></span><span><input name="' + Tab[6].fieldName + '" type="number"/></span><span><input name="' + Tab[7].fieldName + '"  type="number"/></span><span><input type="number" name="' + Tab[8].fieldName + '" class="singleTotal"/></span></li>';
				}
				$(srTableHtml).insertAfter('.srAfter');
				$(zcTableHtml).insertAfter('.zcAfter');
			}
		}
		calc();
	})

	date_scoll(40, 200);
	////获取答案
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
							wl_y.eq(y).text(aswA[key]);
						}
					}
				}
			}
			if (key == 'futureIncomePrize') {
				for (var y = 0; y < sr_y.length; y++) {
					if (wl_y.eq(y).attr('name') == 'futureIncomePrize') {
						if (aswA[key] != null) {
							wl_y.eq(y).text(aswA[key]);
						}
					}
				}
			}
			if (key == 'futureIncomeOther') {
				for (var y = 0; y < sr_y.length; y++) {
					if (wl_y.eq(y).attr('name') == 'futureIncomeOther') {
						wl_y.eq(y).text(aswA[key]);
					}
				}
			}
			if (key == 'futureIncomeSum') {
				for (var y = 0; y < sr_y.length; y++) {
					if (wl_y.eq(y).attr('name') == 'futureIncomeSum') {
						wl_y.eq(y).text(aswA[key]);
					}
				}
			}
			//			
			//			
		}


		var ch_total = '';
		for (var k = 0; k < $('.dx_h li').length; k++) {
			if (!($('.dx_h li').eq(k).children('span').hasClass('span_f'))) {
				ch_total += $('.dx_h li').eq(k).children('span').attr('data') + '+';
			}
		}

		$('.ic_center span').text(ch_total.substr(0, ch_total.length - 1));

		for (var k = 0; k < aswTab.length; k++) {
			for (var i = 0; i < $('ul.dx_table li').length; i++) {
				if ($('ul.dx_table li').eq(i).attr('name') == aswTab[k].id) {
					for (key in aswTab[k]) {
						if (key == 'month') { //时间
							for (var kk = 0; kk < 5; kk++) {
								if ($('ul.dx_table li').eq(i).children().eq(kk).children('input').attr('name') == 'month') {
									$('ul.dx_table li').eq(i).children().eq(kk).children('input').val(aswTab[k].month)
								}
							}
							if (k == 0) { //月份区间选择
								$('#demo_date2').val(aswTab[k].month);
							} else if (k == (aswTab.length - 1)) {
								$('#demo_date1').val(aswTab[k].month);
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
			for (var i = 0; i < $('ul.zc_table li').length; i++) {
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
									if (aswTab[k].costSum != null) {
										$('ul.zc_table li').eq(i).children().eq(kk).children('input').val(aswTab[k].costSum);
									}
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
	$('input[name="month"]').attr('disabled', 'disabled');
	
	$('.remove-li input').on('change keyup', function() { 
			if($(this).val().indexOf('.')!=-1){//小数
				console.log("请输入整数！");
				if($('.num-error')){
					$('.num-error').remove();
					$(this).parent().parent().append('<label class="num-error">请输入整数！</label>');
				}
			}else if($(this).val().length>10){
				console.log("输入数字长度不能超过10位！");
				if($('.num-lenght-error')){
					$('.num-lenght-error').remove();
					$(this).parent().parent().append('<label class="num-lenght-error">输入数字长度不能超过10位！</label>');
				}
			}else{
				$('.num-lenght-error').remove();
				$('.num-error').remove();
			}
		});
	
}


//提交数据
function Submit(_hl) {
	var inputchangTag=$('.remove-li input[type="number"]');
	var inputchangStatue=true;
	for(var n=0;n<inputchangTag.length;n++){
		if(inputchangTag.eq(n).val().indexOf('.')!=-1){//小数
			inputchangTag.eq(n).parent().parent().append('<label class="num-error">请输入整数！</label>');
			inputchangStatue=false;
		}else if(inputchangTag.eq(n).val().length>10){//大于十位数
			inputchangTag.eq(n).parent().parent().append('<label class="num-lenght-error">输入数字长度不能超过10位！</label>');
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
		_sr[_jz] = _tab;
	}
	for (var hh = 0; hh < $('.dx_f li span.wl').length; hh++) {
		var _t;
		var _jz = $('.dx_f li span.wl').eq(hh).attr("name");
		_t = $('.dx_f li span.wl').eq(hh).text();
		_sr[_jz] = _t;
	}


	if ($('.problem ul').attr('id') != null) {
		_sr["id"] = $('.problem ul').attr('id');
	} else {
		_sr["id"] = null;
	}
//	alert($('.dx_table li[name]').eq(0).attr('serialNo'))
	if($('.dx_table li.addLi').eq(0).attr('serialNo')=='undefined'){
		_sr["serialNo"] = null;
	}else{
//		alert(3)
		_sr["serialNo"] = $('.dx_table li.addLi').eq(0).attr('serialNo');
	}
	
	//console.log(_sr);//月平均，预计月
	var salaryInfoMonths = [];
	var ys = {};
	var _jj = [];

	for (var i = 0; i < $('.dx_table li[name]').length; i++) {
		var _tx = $('.dx_table li[name]').eq(i).attr("name");
		var _tt = $('.dx_table li[name]').eq(i).attr('serialNo');
		//	console.log(_tx)
		var jj = {};
		for (var j = 0; j < $('.dx_table li[name]').eq(i).children("span").length; j++) {
			var _ta = $('.dx_table li[name]').eq(i).children("span").eq(j).children("input").val();
			var _tn = $('.dx_table li[name]').eq(i).children("span").eq(j).children("input").attr("name");
			console.log(_ta);
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
			if(_tt=='undefined'){
				jj["serialNo"] = null;
			}else{
				jj["serialNo"] = _tt;
			}
			
		}
		for (var j = 1; j < $('.zc_table li[name]').eq(i).children("span").length; j++) {
			var _ta = $('.zc_table li[name]').eq(i).children("span").eq(j).children("input").val();
			var _tn = $('.zc_table li[name]').eq(i).children("span").eq(j).children("input").attr("name");
			if (_ta == "") {
				jj[_tn] = null;
			} else {
				jj[_tn] = _ta;
			}

		}
		_jj.push(jj)
	}
	_sr["incomeAvg"] = $('.hh_f .filter span[name="incomeAvg"]').text();
	if($('.problem').attr('data')=='undefined'){
		ys.serialNo = null;
	}else{
		ys.serialNo = $('.problem').attr('data');
	}
	answerJson.salaryInfoModel.salaryInfoMonths = _jj;
	answerJson.salaryInfoModel.salaryInfo = _sr;
	ys=answerJson;
	ys["completeStatus"] = completeStatus(ys["completeStatus"])
	var _ys = JSON.stringify(ys);
	console.log(_ys)
	var submitState = true;
	var outTime = 1;
	if ($('span[name="incomeAvg"]').text() > 0) {
		submitState = true;
		$('.verify-error').remove();
		if ($('span[name="costAvg"]').text() > 0) {
			$('.verify-error').remove();
		} else {
			$('span[name="incomeAvg"]').parent().append('<label class="verify-error">请在支出表格中输入正数！</label>');
			outTime = 2;
		}

	} else {
		$('span[name="incomeAvg"]').parent().append('<label class="verify-error">请在表格中输入正数！</label>')
		submitState = false;
	}

	if ($('#demo_date1').val() != '' || $('#demo_date2').val() != '') {
		submitState = true;
	} else {
		submitState = false;
		$('.timeInput').append('<i class="salaryMonthError">请选择月份区间！</i>');
	}

	// TODO 保存收入分析答案
	if (_dataChecker.checkAll(true)) {
		console.info("校验通过")
		if (_hl && submitState&&inputchangStatue) {
			console.info("最终校验通过")
			if (outTime == 2) {
				setTimeout("AndroidJs.saveWjDetalAnswer(_ys,true)", 1000);
			} else {
				AndroidJs.saveWjDetalAnswer(_ys, true);
			}
		} else {
			AndroidJs.saveWjDetalAnswer(_ys, false);
		}
	} else {
		console.info("校验不通过");
		AndroidJs.saveWjDetalAnswer(_ys, false);
	}
	console.log(_ys)
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