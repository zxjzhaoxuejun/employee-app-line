var _showMask = false; //mask弹窗变量，出现_showMask为true，关闭_showMask为false，供安卓调用
$("<section></section>").appendTo("body");
$('<footer id="next"><p>确定</p></footer>').insertAfter("section"); 

var lastTabModel = ""; //上一次选中tab页所属的模块, 用于加载点击不同tab切换数据时判断
var _dataChecker = new QestionRegChecker();
/**
 * 详情展示 页面生成方法
 * @param data 数据
 */
var answerJson;//整个答案
function detailShowCore(data) 
{
	answerJson=jsonForm(data[1]);
	var models = data[0].modelDetailSubList;
	var curModelName = data[0].modelOjbName;
	$("section").attr("name", curModelName);
	var answers = answerJson[curModelName]; 
	for (var index = 0; index < models.length; index++) 
	{
		var modelObj = models[index];
		var modelType = modelObj.type; //模块("table"\"input");区别："table"可以动态增减相同模块的数据.
		var answerLimit = modelObj.answerLimit; //对应table最大新增限制数
		var answerLimitMin = modelObj.answerLimitMin; //对应table最小限制数
		var modelCode = modelObj.code;
		var dispalyName = modelObj.name;
		var modelname = modelObj.objName;
		//问题列表
		var questionList = modelObj.questionDetailList;
		//解析模块问题映射.
		_dataChecker.initQuestionMap(modelname, questionList);
		//创建模块头,返回创建的目标jqDom
		var targetObj = createModelName(modelname, dispalyName, modelCode, modelType, answerLimit, answerLimitMin);
		//生成问题
		createQuestion(questionList, targetObj);
		if (answers)
		{
			var modelAnswer = answers[modelname];
			if (modelAnswer)
			{
				//填充数据
				fillModelDatas(modelname, modelAnswer, modelType);
			}
		}
	}
	
	//按钮的事件
	initTrigger();
	_dataChecker.initAutoCheckTrigger();
};

/**
 * 获取模块的问题
 * @param modelName
 */
function getModelQuestions(modelName)
{
	return _dataChecker.getQuestionFieldMaps(modelName);
};

/**
 * 获取问题对象
 * @param modelName 模块名
 * @param field 字段
 */
function getQuestionObjDetail(modelName, field)
{
	if (!modelName || "" == modelName || !field || "" == field)
	{
		return {};
	}
	var questions = getModelQuestions(modelName);
	return questions[field];
};

/**
 * 创建模块头
 * @param code 
 * @param displayName 页面上展示的模块名称
 * @param modelName 模块名称
 * @param type 模块类型
 * @param answerLimit tab页限制,只针对table有效
 * @param answerLimitMin tab页最少限制,只针对table有效
 * @returns
 */
function createModelName(modelName, displayName, code, type, answerLimit, answerLimitMin)
{
	var _id = formatCode(code);
	var html = "";
	if ("TABLE" == type)
	{
		html = '<div class="problem table" id="' + _id + '" modelname="' + modelName + '" answerlimit="' + answerLimit + '" answerlimitmin="' + answerLimitMin + '">';
		html += '<p>' + displayName + getAddHtmlIcon(modelName) + getSubHtmlIcon(modelName) +'</p>';
		html += '<div class="cy" modelname="' + modelName + '"></div><ul></ul></div>';
	}
	else
	{
		html = '<div class="problem" id="' + _id + '" modelname="'+ modelName + '"><p>' + displayName + '</p><ul></ul></div>';
	}
	$(html).appendTo("section");
	var targetObj = $("#" + _id + " ul");
	return targetObj;
};


/**
 * 初始化日期控件
 * @param id
 */
function initDate(id) { //日期插件
	var calendar = new lCalendar();
	calendar.init({
		'trigger': '#' + id + '',
		'type': 'date'
	});
};

/**
 * 填充数据
 * @param modelName 模块名
 * @param answer 问题答案
 */
function fillData(modelName, answer)
{
	if (!modelName || !answer)
	{
		return ;
	} 
	var liObjs = $(".problem[modelname='" + modelName + "'] ul li");
	//模块对应的问题
	var questions = getModelQuestions(modelName);
	//遍历答案
	for(var liIndex = 0; liIndex < liObjs.length; liIndex++)
	{
		var liObj = liObjs.eq(liIndex);
		var fieldName = liObj.attr("fieldName");
		var question = questions[fieldName];
		if ("1" == question.isDynamicShow)
		{
			//显示、隐藏
			liObj.hide();
		}
		var answerVal = answer[fieldName];
		if (answerVal == null)
		{
			continue;
		}
		if ("CODE" == question.inputType)
		{
			var ch_code = question.codeDicList;
			var spanObj = liObj.children(".right").children("span");
			if (spanObj.length == 1)
			{
				var successMatch = false;
				for (var codeIndex = 0; codeIndex < ch_code.length; codeIndex++)
				{
					if(answerVal == ch_code[codeIndex].code)
					{
						successMatch = true;
						spanObj.text(ch_code[codeIndex].name);
						spanObj.attr('name',answerVal);
						if ("请选择" != answerVal)
						{
							liObj.children(".left").children("i").removeClass("unfinish").addClass("finish");
							liObj.children(".right").children("span").removeClass("unfinish").addClass("finish");
						}
					}
				}
				if (!successMatch)
				{
					spanObj.attr('name',answerVal);
					spanObj.text(answerVal);
				}
			}
			else 
			{
				var lableObj = liObj.children(".right").children("label[type='radio']");
				if (lableObj.length == 2)
				{
					for (var codeIndex = 0; codeIndex < ch_code.length; codeIndex++)
					{
						if (ch_code[codeIndex].code == answerVal)
						{
							for (var labelIndex = 0; labelIndex < lableObj.length; labelIndex++)
							{
								var inputObj = lableObj.eq(labelIndex).children("input");
								if (inputObj.val() == answerVal)
								{
									inputObj.attr("checked", true);
									inputObj.next("i").show().parent().siblings().children("i").hide();
									inputObj.parent().siblings().children("input").attr("checked", false);
									inputObj.parent().parent().siblings(".left").children("i").removeClass("unfinish").addClass("finish");
								}
							}
						}
					}
				}
			}
		}
		else if (liObj.attr("inputtype") == "ADDRESS")
		{
			var _address= answerVal.split('||');
			var _guid = _address[0];
			if (_guid)
			{
				var _addressText = AndroidJs.getAddressByGuid(_guid);
				var spanObj = liObj.children(".right").children("span");
				spanObj.attr('guid', _guid);
				spanObj.text(_addressText);
			}
			liObj.children('.x-address').children().children('input').val(_address[1]).removeClass("unfinish").addClass("finish");
			liObj.children('.x-address').children().children('i').css('color','#a0a0a5');
		}
		else if (liObj.attr("inputtype") == "TEXTAREA")
		{
			liObj.children(".right").children("textarea").val(answerVal);
			liObj.children(".left").children("i").removeClass("unfinish").addClass("finish");
		}
		else if (liObj.children(".right").children("input").length==1) 
		{
			liObj.children(".right").children("input").val(answerVal);
			if (null != answerVal && answerVal != "")
			{
				liObj.children(".left").children("i").removeClass("unfinish").addClass("finish");
				liObj.children(".right").children("label").removeClass("unfinish").addClass("finish");
			}
		}
		else if(liObj.children(".right").children("label").length==2)
		{
			var labelObj = liObj.children(".right").children("label");
			for (var labelIndex = 0; labelIndex < labelObj.length; labelIndex++)
			{
				var inputObj = labelObj.eq(labelIndex).children("input");
				if (inputObj.val() == answerVal)
				{
					inputObj.attr("checked", true);
					inputObj.next("i").show().parent().siblings().children("i").hide();
					inputObj.parent().siblings().children("input").attr("checked",false);
					inputObj.parent().parent().siblings(".left").children("i").removeClass("unfinish").addClass("finish");
				}
			}
		}
	}
};

/**
 * 填充数据
 * @param modelName 模块
 * @param answers 该模块的答案
 * @param modelType 模块类型
 */
function fillModelDatas(modelName, answers, modelType)
{
	//数组：说明该数据为table数据
	if ($.isArray(answers) && "TABLE" == modelType)
	{
		var answerLength = answers.length;
		if (answerLength == 0 && answerLimitMin == 0)
		{
			return ;
		}
		var answer = answers[0];
		fillData(modelName, answer);
		
		var modelObj = $('.table[modelname="' + modelName + '"]');
		var answerLimit = modelObj.attr("answerLimit");
		var answerLimitMin = modelObj.attr("answerLimitMin");
		//超过限制时隐藏
		if (answerLength != 0 && answerLimit != 0 && answerLength >= answerLimit)
		{
			modelObj.find(".add").hide();
		}
		var maxLineNo = 0;
		//低于限制时隐藏-号，同时补充相应的tab页
		if (answerLength == 1 || answerLength <= answerLimitMin)
		{
			modelObj.find(".jian").hide();
			for (var index = 0 ; index < answerLength; index++)
			{
				if (answers[index]["lineNo"] > maxLineNo)
				{
					maxLineNo = answers[index]["lineNo"];
				}
				else
				{
					maxLineNo++;
				}
			}
			//取其中一个作为模板
			var templateObj = {}; 
			$.extend(templateObj, answers[0]);
			for (var field in templateObj)
			{
				//清空数据
				templateObj[field] = null;
			}
			var addSize = answerLimitMin - answerLength;
			for (var index = 0 ; index < addSize ; index++)
			{
				var newObj = {};
				$.extend(newObj, templateObj);
				maxLineNo++ ;
				newObj["lineNo"] = maxLineNo;
				answers.push(newObj);
			}
		}
		
		//取第一个展示
		for (var index = 0; index < answers.length; index++)
		{
			var obj = answers[index];
			var lineNo = obj["lineNo"] == null ? "" : obj["lineNo"];
			//数据存到内存中.
			putModelTableData(modelName, lineNo, obj);//模型的table数据
		}
		
		if (answerLimit != 0 && answers.length > answerLimit)
		{
			modelObj.find(".add").hide();
		}
		//初始化tab页
		initTableTab(modelName, answers, false);
	}
	else
	{
		//填充数据
		fillData(modelName, answers);
	}
};

/**
 * 是否必填的html
 * @param require
 * @returns {String}
 */
function getRequireHtmlSpan(require)
{
	if (require)
	{
		return '<span>*</span>';
	}
	else
	{
		return '<span>&nbsp;&nbsp;</span>';
	}
};

/**
 * 下拉选择图标html
 * @returns {String}
 */
function getSelectHtml()
{
	var html = '<span class="choose" >请选择</span><img src="img/down_icon.png" class="select"/>';
	return html;
};

/**
 * +号图标html
 * @param modelname 模块名
 * @returns {String}
 */
function getAddHtmlIcon(modelname)
{
	var html = '<img src="img/add_icon.png" class="add" />';
	return html;
};

/**
 * -号图标html
 * @param modelname
 * @returns {String}
 */
function getSubHtmlIcon(modelname)
{
	var html = '<img src="img/jian_icon.png" class="jian"';
	if (modelname && "" != modelname)
	{
		html += ' modelname="' + modelname + '"';
	}
	return html + ' />';
};

/**
 * 关闭按钮图标html
 * @returns {String}
 */
function getCloseHtmlIcon()
{
	return '<img src="img/close_icon.png">';
};

/**
 * 隐藏html
 */
function getHideStyleHtml()
{
	return 'style="display:none"';
};

/**
 * 将Code中的“.”转换
 * @param code
 * @returns 转换结果
 */
function formatCode(code)
{
	return code.replace(/\./g, "_");
};

/**
 * 复选框添加点击事件
 * @param targetDiv 目标id
 */
function checkBoxLiClick(targetDiv) {
	$("#" + targetDiv + " .in_come .income_h li").click(function() {
		if ($(this).children("span").hasClass("span_f")) 
		{
			$(this).children("span").removeClass("span_f");
			$(this).children("img").attr("src", "img/jx_icon.png");
		} 
		else 
		{
			$(this).children("span").addClass("span_f");
			$(this).children("img").attr("src", "img/jxt_icon.png");
		};
	})
};

/**
 * 生成问题 
 * @param questions 问题列表
 * @param targetObj 问题所在的模块
 */
function createQuestion(questions, targetObj)
{
	for (var index = 0; index < questions.length ; index++)
	{
		var question = questions[index];
		var dataUnit = question.inputUnit;
		if (!dataUnit)
		{
			dataUnit = "";
		}
		var dateID = null;//日期控件id
		var htmlDivRightTriggerId = null; //弹出框触发事件的id;
		var checkBoxId = null; //复选框ID
		var isRequire = question.require; //是否必填
		var isLabel = question.isLabel; //是否为页签
		var isDynamicShow  = question.isDynamicShow;
		var questionName = question.name; //问题名称
		var questionCode = question.code; //问题code
		var fieldName = question.fieldName;//字段名称
		var inputType = question.inputType; //类型
		var htmlLiStart = '<li isDynamicShow="' + isDynamicShow + '" isLabel="' + isLabel + '" fieldName="' + fieldName + '" data="' + questionCode + '" require="' + isRequire + '" inputtype="' + inputType + '"';
		if (isDynamicShow == "1")
		{
			//不显示
			htmlLiStart += getHideStyleHtml();
		}
		htmlLiStart += '>'; 
		
		var htmlDivLeft = '<div class="left">' + getRequireHtmlSpan(isRequire) + '<i title="' + questionName + '">' + questionName + '</i></div>';
		var htmlDivRight = "";
		
		if (inputType == "STRING") 
		{
			htmlDivRight = '<div class="right"><input type="text" name="' + fieldName + '" placeholder="请输入' + questionName + '"/></div>';
		}
		else if(inputType == "TELEPHONE")
		{
			htmlDivRight = '<div class="right"><input type="text" name="' + fieldName + '" placeholder="请输入' + questionName + '"/></div>';
		}
		else if(inputType=="ADDRESS") 
		{
			//地址+加详情
			var _idv = formatCode(questionCode); //分割code
			//固定电话
			htmlDivRight = '<div id="' + _idv + '" class="right" onclick="adree(this.id)">' + getSelectHtml() + '</div><div class="x-address"><p><span>&nbsp;&nbsp;</span><i>详细地址</i></p><p><input type="text" name="' + fieldName + '" value="请输入详细地址" /></p></div>';
		}
		else if(inputType=="SSQADDRESS")
		{
			//只有省市区地址
			var _idv = formatCode(questionCode); //分割code
			htmlDivRight = '<div id="' + _idv + '" class="right"  onclick="adree(this.id)">' + getSelectHtml() + '</div>';
		}
		else if (inputType == "CODE") 
		{ 
			//require:是否必填,data:问题code,checkMark:校验类型,limitLength:文本长度
			//选择（弹窗）
			var _idv = formatCode(questionCode); //分割code
			var adrID = 'adr' + _idv;
			if (question.answerChoice == null) 
			{ 	//TODO 待补充，暂时想不起来
				htmlDivRight = '<div class="right" onClick="getProvinceBuy(this.id)" id="' + adrID + '" isControlShow="'+ question.isControlShow + '">' + getSelectHtml() + '</div>';
			} 
			else 
			{
				var _al = question.codeDicList;
				//判断是弹窗还是radio
				if (_al.length == 2) 
				{ 
					//两个
					htmlDivRight = '<div class="right" isControlShow="'+ question.isControlShow + '"><label><input name="' + fieldName + '" type="radio" value="' + _al[0].code + '"/>' + _al[0].name + '<i></i></label><label><input name="' + fieldName + '" type="radio" value="' + _al[1].code + '"/>' + _al[1].name + '<i></i></label></div>';
				} 
				else 
				{
					//多个
					htmlDivRight = '<div id="' + _idv + '" class="right" isControlShow="'+ question.isControlShow + '">' + getSelectHtml() + '</div>';
					htmlDivRightTriggerId = _idv;
				}
			}
		}
		else if (inputType == "DATE") 
		{
			//给div设id
			var _idv = formatCode(questionCode); //分割code
			dateID = 'date_' + _idv;
			htmlDivRight = '<div class="right"><input id="' + dateID + '" name="' + fieldName + '" type="text" readonly placeholder="日期选择" data-lcalendar="1988-01-11,2020-05-29"/></div>';
		}
		else if (inputType == "INTEGER" || inputType == "DOUBLE") 
		{
			//整数 //小数
			htmlDivRight = '<div class="right"><input type="number" name="' + fieldName + '" placeholder="请输入' + questionName + '"/><b class="yuan">' + dataUnit + '</b></div>';
		}
		else if (inputType == "CHECKBOX") 
		{
			// 默认多个选项
			var codeList = question.codeDicList;
			if (codeList && $.isArray(codeList))
			{
				var html = "";
				for (var cIndex = 0; cIndex < question.codeDicList.length; cIndex++) {
					html += '<label class="chenckboxNews"><input type="checkbox" style="display:none"/><img src="img/jx_icon.png">'; 
					html += '<span name="' + codeList[cIndex].code + '">' + codeList[cIndex].name + '</span>';
					html += '</label>';
				}
			}
			htmlDivRight = '<div class="right chenckbox" >' + html + '</div>';
		}
		else if (inputType == "TEXTAREA") 
		{
			htmlLiStart = '<li isDynamicShow="' + isDynamicShow + '" isLabel="' + isLabel + '" require="' + isRequire + '" fieldName="' + fieldName + '" data="' + questionCode + '" class="_textarea" inputtype="' + inputType + '">';
			htmlDivLeft = '<div class="left">' + getRequireHtmlSpan(isRequire) + '<i>' + questionName + '</i></div>';
			htmlDivRight = '<div class="right"><textarea type="text" name="' + fieldName + '" placeholder="请输入' + questionName + '"/></div>';
		}
		else if (inputType= "DATEZONE")
		{
			var _idv = formatCode(questionCode); //分割code
			dateID = 'date_' + _idv;
			htmlLiStart = '<li isDynamicShow="' + isDynamicShow + '" isLabel="' + isLabel + '" require="' + isRequire + '" fieldName="' + fieldName + '" data="' + questionCode + '" class="_textarea" inputtype="' + inputType + '">';
			htmlDivLeft = '<div class="left">' + getRequireHtmlSpan(isRequire) + '<i>' + questionName + '</i></div>';
			htmlDivRight = '<div class="right">'+
				'<input type="text" id="' + dateID +'0" readonly name="input_date" placeholder="日期选择" data-lcalendar="1916-01-11,2116-05-29" style="width:2.5rem;text-align:center" />'+
				'<b>-</b>'+
				'<input type="text" id="' + dateID +'1" readonly name="input_date" placeholder="日期选择" data-lcalendar="1916-01-11,2116-05-29" style="width:2.5rem;text-align:center" />'+
				'</div>';
			
			var html = htmlLiStart + htmlDivLeft + htmlDivRight + "</li>";  
			$(html).appendTo(targetObj);
			initDate(dateID+ "0");
			initDate(dateID+ "1");
			continue;
		}
		var html = htmlLiStart + htmlDivLeft + htmlDivRight + "</li>";  
		$(html).appendTo(targetObj);
		
		if (dateID && "" != dateID)
		{
			initDate(dateID);
		}
		//弹窗事件
		if (htmlDivRightTriggerId && "" != htmlDivRightTriggerId)
		{
			var _iddv = $("#" + htmlDivRightTriggerId);
			_iddv.on("click", function() { //给每个id绑定事件
				var _selectThis = $(this);
				var _modelName = _selectThis.closest(".problem").attr("modelname");
				var _filedName = _selectThis.closest("li").attr("fieldname");
				
				var quesiotns = getQuestionObjDetail(_modelName, _filedName);
				mask2(quesiotns, _selectThis); //遮罩层
			});
		}
	}
};


/**
 * 初始化页签头
 * @param modelName
 * @param tabAnswerDatas 页签答案数据
 * @param autoSize 新增页签时自动调整index
 */
function initTableTab(modelName, tabAnswerDatas, autoSize)
{
	var appendTarget = '.table[modelname="' + modelName + '"] .cy'; //拼接目标
	if (tabAnswerDatas && $.isArray(tabAnswerDatas) && tabAnswerDatas.length != 0)
	{
		var questions = getModelQuestions(modelName);
		var fieldValue = null;
		for (var index = 0 ;index <  tabAnswerDatas.length; index++)
		{
			var question = null;
			//表格数据
			var tableAnswer = tabAnswerDatas[index];
			var fieldCode = null;
			for (var field in tableAnswer)
			{
				question = questions[field];
				//只处理label字段
				if (!question || question["isLabel"] != "1")
				{
					continue;
				}
				fieldValue = tableAnswer[field]; //答案值
				if (!fieldValue)
				{
					fieldValue = question["name"];
					break;
				}
				var inputType = question["inputType"]; 
				if ("CODE" == inputType)
				{
					var codeList = question["codeDicList"] == null ? [] : question["codeDicList"]; 
					for (var codeIndex = 0 ; codeIndex < codeList.length ; codeIndex++)
					{
						if (fieldValue == codeList[codeIndex]["code"])
						{
							fieldCode = fieldValue;
							fieldValue = codeList[codeIndex]["name"];
							break;
						}
					}
				}
				else if ("STRING" == inputType)
				{
					//添加事件
					tabStringTitleChangeTrigger(modelName, field, question);
				}
			}
			if (!fieldValue || "" == fieldValue)
			{
				if (!question){continue;}
//				fieldValue = question["name"] == null ? "unKnow" : question["name"];
				fieldValue = "页签";
			}
			
			if (fieldValue.length > 4)
			{
				fieldValue = fieldValue.substring(0, 4) + "…";
			}
			
			if (index == 0)
			{
				$('<span index="' + tableAnswer["lineNo"] + '" class="span_bg" name="' + fieldCode + '">' + fieldValue + '</span>').appendTo(appendTarget);
			}
			else
			{
				$('<span index="' + tableAnswer["lineNo"] + '" name="' + fieldCode + '">' + fieldValue + '</span>').appendTo(appendTarget);
			}
		}
	}
	else
	{
		var liObjs = $(".table[modelname='" + modelName + "'] li");
		var defaultName; //默认名
		var tableObj = {};
		for (var index = 0 ; index < liObjs.length ; index++)
		{
			var liObj = liObjs.eq(index);
			if (liObj.attr("islabel") == "1")
			{
				defaultName = liObj.find(".left i").text();
			}
			var fieldName = liObj.attr("fieldname");
			tableObj[fieldName] = null;
		}
		
		if (!defaultName)
		{
			defaultName = "";
		}
		var spanIndex = 0;
		if (autoSize)
		{
			//已经存在的对象
			//重新编号，取最大的编号加1;
			var existsObj = $(appendTarget + " span");
			for (var index = 0; index < existsObj.length; index++)
			{
				var _indx = existsObj.eq(index).attr("index");
				var idx = parseInt(_indx);
				if (idx > spanIndex)
				{
					spanIndex = idx;
				}
			}
			spanIndex += 1;
			tableObj["lineNo"] = spanIndex
		}
		
		if (defaultName.length > 4)
		{
			defaultName = defaultName.substring(0, 4) +　"…";
		}
		defaultName = "页签";
		$('<span index="' + spanIndex + '" class="span_bg">' + defaultName + '</span>').appendTo(appendTarget);
		putModelTableData(modelName, spanIndex, tableObj);
	}
};

/**
 * 由手动输入字符串控制的页签头事件控制
 */
function tabStringTitleChangeTrigger(modelName, field, question)
{
	$('.table[modelname="' + modelName + '"] input[name="' + field + '"]').unbind("change").change(function(){
		var changeVal = $(this).val();
		if ("" == changeVal)
		{
//			changeVal = question.name == null ? "" : question.name;
			changeVal = "页签";
		}
		if (changeVal.length > 4)
		{
			changeVal = changeVal.substring(0, 4) + "…";
		}
		//当前页签更改文字
		$('.table[modelname="' + modelName + '"] .cy').find("span.span_bg").text(changeVal);
	});
};


/**
 * tab页切换事件控制
 */
function switchTabTrigger()
{
	//页签切换事件,所有模块统一控制
	$('.cy span').unbind("click").click(function(){
		//即将选中的页签
		var _toShowSpan = $(this);
		var modelObj = _toShowSpan.closest(".table");
		var modelname = modelObj.attr("modelname");
		//选中的是当前页签，且模块相同
		if (_toShowSpan.hasClass("span_bg"))
		{
			if ("" == lastTabModel || lastTabModel == modelname)
			{
				return ;
			}
		}
		lastTabModel = modelname; //记录上次选中的是哪个模块的tab
		var toShowIndex = _toShowSpan.attr("index");
		//内存中   即将选中的tab的数据
		var toShowTableData = getModelTableDataByIndex(modelname, toShowIndex); //模型的table数据
		//当前选中的页签
		var currentSpan = $('.cy[modelname="' + modelname + '"] span.span_bg');
		//当前选中的页签KEY
		var currentIndex = currentSpan.attr("index");
		//当前数据
		var curTableValue = _dataChecker.getModelData(modelname);
		//保存数据
		putModelTableData(modelname, currentIndex, curTableValue);
		//重新填充数据
		reFillModelTableValues(modelname, toShowTableData);
		currentSpan.removeClass('span_bg');
		_toShowSpan.addClass("span_bg");
		//校验数据
		var finishRequire = _dataChecker.checkFieldValuesAll(modelname, null, toShowTableData);
		if (finishRequire)
		{
			if (_toShowSpan.hasClass("unfinish"))
			{
				_toShowSpan.removeClass("unfinish").addClass("finish");
			}
		}
	});
};

/**
 * +号事件控制
 */
function addTrigger()
{
	$(".add").unbind("click").click(function(){
		var _this = $(this);
		var modelObj =  _this.parent().parent();
		var modelname = modelObj.attr("modelname");
		if (!modelname || "" == modelname)
		{
			_this.hide();
			return;
		}
		var limit = modelObj.attr("answerLimit");
		
		var spans = $('.cy[modelname="' + modelname + '"] span');
		if (limit != 0 && spans.length >= limit)
		{
			_this.hide();
			return ;
		}
		//隐藏删除图标
		$('.cy[modelname="' + modelname + '"] span img').hide();
		
		//当前选中的页签
		var curSelectObj = modelObj.find('.cy[modelname="' + modelname + '"] span.span_bg');
		var curSelectId = curSelectObj.attr('index');
		//转存table数据后清空原有table
		var tableValue = _dataChecker.getModelData(modelname);
		//保存数据
		putModelTableData(modelname, curSelectId, tableValue);
		reFillModelTableValues(modelname, {}); //tab数据,传入空对象表示清空数据
		
		$('.jian[modelname="' + modelname + '"]').show();
		//移除背景色
		curSelectObj.removeClass('span_bg');
		//添加 页签头
		initTableTab(modelname, null, true);
		if (limit != 0 && $('.cy[modelname="' + modelname + '"] span').length >= limit)
		{
			_this.hide();
		}
		//tab页切换重新绑定事件,否则新增的tab页没有事件
		switchTabTrigger();
	});
};

/**
 * -号事件控制
 */
function subTrigger()
{
	$('.jian').unbind("click").click(function(){
		var _this = $(this);
		var modelObj = _this.parent().parent();
		var limit = modelObj.attr("answerLimit");
		var limitMin = modelObj.attr("answerLimitMin");
		var modelname = modelObj.attr("modelname");
		if (!modelname || "" == modelname)
		{
			_this.hide();
			return;
		}
		
		var spans = $('.cy[modelname="' + modelname + '"] span');
		if (spans.length <= 1 || (limitMin != 0 && spans.length <= limitMin))
		{
			_this.hide();
			return ;
		}
		
		for (var index = 0 ; index < spans.length; index++)
		{
			var span = spans.eq(index);
			var imgs = span.find("img");
			if (0 == imgs.length)
			{
				$(getCloseHtmlIcon()).appendTo(span);
			}
			else
			{
				imgs.show();
			}
		}
		//移除事件
		imgDeleteTrigger();
	});
};

/**
 * "移除"图标事件控制
 */
function imgDeleteTrigger()
{
	$('.cy span img').unbind("click").click(function(){
		var _this = $(this);
		var spanObj =  _this.parent();
		var spanIndex = spanObj.attr("index");
		var modelObj = spanObj.parent().parent();
		var modelname = modelObj.attr("modelname");
		var answerlimit = modelObj.attr("answerlimit");
		var answerlimitMin = modelObj.attr("answerlimitMin");
		$('<div id="mask"><div class="mask_bg"></div><div class="remove"><p class="_sc">您确认要删除吗？<img class="_ci" src="img/close_icon.png"/><p class="_qr">确认</p></div></div>').appendTo("body");
		$('._qr').unbind("click").click(function(){
			$('#mask').remove();
			//页面将要展示的页签
			var nextSpan = null;
			var spanLength = modelObj.find('span').length;
			if (spanLength <= answerlimitMin)
			{
				_this.hide();
				$('.table[modelname="' + modelname + '"] .jian').hide();
				console.info("至少得保留" + answerlimitMin + "个页签.");
				return ;
			} 
			
			//移除的是当前选中的页签
			if (spanObj.hasClass('span_bg'))
			{
				//取出相邻节点的数据
				var otherSpans = spanObj.siblings('span');
				if (otherSpans.length == 0 && modelname && "" != modelname)
				{
					$('.table[modelname="' + modelname + '"] .jian').hide();
					//不存在,不允许删除.
					_this.hide();
					console.info("不能删除至少得保留一个页签.");
					return ;
				}
				
				nextSpan = otherSpans.eq(0);
			}
			if (modelname && "" != modelname)
			{
				// 剩下的页签个数
				var spanLength = $('.cy[modelname="' + modelname + '"] span').length;
				if (spanLength <= 1)
				{
					$('.table[modelname="' + modelname + '"] .jian').hide();
					console.info("不能删除至少得保留一个页签.");
					return ;
				}
				spanObj.remove();
				spanLength = spanLength - 1;
				if (spanLength == 1)
				{
					$('.table[modelname="' + modelname + '"] .jian').hide();
				}
				if (answerlimit > spanLength)
				{
					$('.table[modelname="' + modelname + '"] .add').show();
				}
				var tableKey = getTableTabKey(spanIndex);
				deleteModelTableDatas(modelname, tableKey); //移除数据
				
				$('.cy[modelname="' + modelname + '"] span img').hide();
				if (nextSpan)
				{
					var nextIndex = nextSpan.attr("index");
					var nextTableValue = getModelTableDataByIndex(modelname, nextIndex); //模型的table数据
					//重新填充数据
					reFillModelTableValues(modelname, nextTableValue);
					nextSpan.addClass('span_bg');
					var finishRequire = _dataChecker.checkFieldValuesAll(modelname, null, nextTableValue);
					if (finishRequire)
					{
						if (nextSpan.hasClass("unfinish"))
						{
							nextSpan.removeClass("unfinish").addClass("finish");
						}
					}
				}
			}
			else
			{
				spanObj.remove();
				$('.cy span img').hide();
			}
		});
		
		$('._ci').unbind("click").click(function(){
			$('#mask').remove();
		});
	});
};

/**
 * 复选框事件
 */
function initCheckBoxTrigger()
{
	$('.chenckboxNews').on("click", function() {
		if ($(this).children('input').prop('checked') == true) 
		{
			$(this).children('img').attr('src', 'img/jxt_icon.png');
			$(this).children('span').css('color', '#191919');
			$(this).closest("li .left i").css('color', '#a0a0a0');

		}
		else 
		{
			$(this).children('img').attr('src', 'img/jx_icon.png');
			$(this).children('span').css('color', '#a0a0a0');
			$(this).closest("li .left i").css('color', '#191919');
		}
	});
};


/**
 * 初始化事件
 */
function initTrigger()
{
	//添加
	addTrigger();
	//删减事件
	subTrigger();
	//tab页切换
	switchTabTrigger();
	//复选框事件
	initCheckBoxTrigger();
	//提交按钮事件
	submitDatasTrigger();
};


function getSelectObjByCode(dataArr, code)
{
	for (var index = 0; index < dataArr.length; index++)
	{
		if (dataArr[index].code == code)
		{
			return dataArr[index];
		}
	}
	return null;
};

/**
 * 创建遮罩层函数（1/2/3/4/5），id:外面传进来的code名，targetObj:外面传进来点击的对象
 * @param question 问题对象
 * @param clickObj 当前点击的对象
 */
function mask2(question, clickObj) 
{
	_showMask = true;
	var codeList = question.codeDicList;
	$('<div id="mask"><div class="mask_bg"></div><ul><li class="cancel">取消</li></ul></div>').appendTo("body");
	if (codeList) 
	{
		var modelObj = clickObj.closest(".problem");
		if (modelObj.hasClass("table"))
		{
			var isAllowRepeat = question.isAllowRepeat;
			if ("1" != isAllowRepeat)
			{
				var answerLimit = modelObj.attr("answerLimit");
				var answerLimitMin = modelObj.attr("answerLimitMin");
				//不允许选重复
				var spanObjs = modelObj.find(".cy span");
				var filterCode = []; //过滤后的codeList
				var addCurCode = false; // 控制当前数据
				for (var indexCode = 0 ; indexCode < codeList.length ; indexCode++)
				{
					var codeExists = false;
					for (var indexExist = 0 ; indexExist < spanObjs.length ; indexExist++)
					{
						var spanObj = spanObjs.eq(indexExist);
						var code = spanObj.attr("name");
						if (!code){continue;}
						if (!addCurCode && spanObj.hasClass("span_bg"))
						{
							var codeObj = getSelectObjByCode(codeList, code);
							if (null != codeObj)
							{
								filterCode.push(codeObj);
								addCurCode = true;
							}
						}
						if (codeList[indexCode].code == code)
						{
							codeExists = true;
						}
					}
					if (!codeExists)
					{
						filterCode.push(codeList[indexCode]);
					}
				}
				codeList = filterCode;
				if (filterCode.length <= 1)
				{
					modelObj.find("img.add").hide();
				}
				else if (filterCode.length >= 2)
				{
					if (0 == answerLimit || answerLimit > spanObjs.length)
					{
						modelObj.find("img.add").show();
					}
				}
			}
		}
		
		for(var index = 0; index < codeList.length; index++)
		{
			$(".cancel").before($("<li name=" + codeList[index].code + ">" + codeList[index].name + "</li>"))
	    }
	}

	var checkY = question.appControlShowRule;
	$("#mask li").on("click", clickObj, function(event) {
		var targetObj = event.data;
		_showMask = false;
		$("#mask").remove();
		var choice = $(this);
		if (choice.hasClass('cancel'))
		{
			
		}
		else
		{
			//获取问题所在的模块
			var modelObj = targetObj.closest(".problem");
			var liObj = targetObj.closest("li");
			// 若为表格,且当前字段 为页签头字段. 修改页签头.
			if (modelObj.hasClass("table") && liObj.attr("islabel") == "1")
			{
				var textValue = choice.html();
				if ("" == textValue)
				{
					textValue = "页签";
				}
				else if (textValue.length > 4)
				{
					textValue = textValue.substring(0, 4) + "…";
				}
				var curSpan = modelObj.find(".cy span.span_bg");
				curSpan.attr("name", choice.attr("name"));
				curSpan.html(textValue);
			}
			var name = choice.attr('name');
			targetObj.children("span").html(choice.html()).removeClass("unfinish").addClass("finish");
			targetObj.children("span").attr('name', name);
			if (checkY != null)
			{
				for (var y=0; y < checkY.length ; y++)
				{
					if (name == checkY[y].key)
					{
						for (var t = 0; t< checkY[y].code.length; t++)
						{
							for (var z = 0; z < targetObj.parent().siblings().length ; z++)
							{
						       if (targetObj.parent().siblings().eq(z).attr('data') == checkY[y].code[t])
						       {
						    	   targetObj.parent().siblings().eq(z).show();
						       }
					        }
						}
					}
					else
					{
						for (var z = 0; z < targetObj.parent().siblings().length; z++)
						{
							if (targetObj.parent().siblings().eq(z).attr("isDynamicShow") == 1)
							{
								targetObj.parent().siblings().eq(z).hide();
							}
						}
					}
				}
			}
			targetObj.siblings(".left").children("i").removeClass("unfinish").addClass("finish");
		}
		return false;
	});
};

/**
 * 生成tab页签key
 * @param index 第几个tab
 * @returns {String}
 */
function getTableTabKey(index)
{
	return "tableIndex_" + index;
};

/**
 * 获取模块数据
 * @param modelname
 * @param index
 * @returns tableDatas
 */
function getModelTableDatas(modelname)
{
	var modelObj = $(".table[modelname='" + modelname + "']");
	var modelDatas = modelObj.data(modelname); 
	if (!modelDatas)
	{
		modelDatas = {};
		modelObj.data(modelname, modelDatas);
	}
	return modelDatas;
};

/**
 * 存值 
 * @param modelname 模块
 * @param index tab行号
 * @param data 数据
 */
function putModelTableData(modelname, index, data)
{
	if (null == index || !data || "{}" == JSON.stringify(data))
	{
		return;
	}
	var modelDatas = getModelTableDatas(modelname); //模型的table数据
	var tableKey = getTableTabKey(index);
	var tableDatas = modelDatas[tableKey];
	if (!tableDatas)
	{
		tableDatas = {};
		modelDatas[tableKey] = tableDatas;
	}
	$.extend(tableDatas, data);
};

/**
 * 获取模块数据
 * @param modelname
 * @param index
 * @returns tableDatas
 */
function getModelTableDataByIndex(modelname, index)
{
	if (null == index) //此处不能用!index作为条件,因为index为数字，当index=0 时 , !index结果为true
	{
		return {};
	}
	var modelDatas = getModelTableDatas(modelname); //模型的table数据
	var tableKey = getTableTabKey(index);
	var tableDatas = modelDatas[tableKey];
	if (!tableDatas)
	{
		tableDatas = {};
		modelDatas[tableKey] = tableDatas;
	}
	return tableDatas;
};

/**
 * 移除数据
 * @param modelname 模块名
 * @param tableKey 页签
 */
function deleteModelTableDatas(modelname, tableKey)
{
	var modelDatas = getModelTableDatas(modelname); //模型的table数据
	if (!modelDatas)
	{
		return;
	}
	if (!tableKey)
	{
		delete modelTableDatas[modelname];
		return;
	}
	
	var tableDatas = modelDatas[tableKey];
	if (!tableDatas)
	{
		return;
	}
	delete modelDatas[tableKey];
};

/**
 * 转换code为名称
 * @param modelname 模块
 * @param field 字段
 * @param code code
 * @returns
 */
function getModelFieldCodeName(modelname, field, code)
{
	if (!code || "" == code)
	{
		return code;
	}
	var question = getQuestionObjDetail(modelname, field);
	
	//code 转换名称
	var result;
	var codeList = question.codeDicList;
	if (codeList && $.isArray(codeList))
	{
		for (var codeIndex = 0; codeIndex < codeList.length; codeIndex++)
		{
			if (code == codeList[codeIndex].code)
			{
				result = codeList[codeIndex].name;
				break;
			}
		}
	}
	
	if (!result)
	{
		return code;
	}
	return result;
};

/**
 * 数字格式化
 * @param inputType
 * @param value
 */
function formatNumberValue(inputType , value)
{
	if (value && "" != value)
   	{
		try
		{
			var number = null; //转换后的number
			if ("DOUBLE" == inputType)
			{
				number = parseFloat(value);
			}
			else if("INTEGER" == inputType)
			{
				number = parseInt(value, 10); //以10为基数
			}
			else
			{
				return value;
			}
			
			if ($.isNumeric(number))
			{
				value = number;
			}
		}
		catch(e)
		{
			console.error(e);
		}
   	}
	return value;
};

/**
 * 重新填充模块tab数据
 * @param modelname 模块
 * @param tableData 要填充的数据
 * 返回 原有的数据对象.
 */
function reFillModelTableValues(modelname, tableData)
{
	var modelObj = $('.table[modelname="' + modelname + '"]');
	var liObjs = modelObj.find('li');
	for (var index = 0; index < liObjs.length; index++)
	{
		var liObj = liObjs.eq(index);
	   	var fieldName = liObj.attr('fieldname');
	   	var inputType = liObj.attr("inputtype");
		var newValue = tableData[fieldName] == null ? "" : tableData[fieldName]; //新值
		var rightObj = liObj.children('.right');
		var spanObj = rightObj.children('span');
		if ("DATEZONE" == inputType)
		{
			var inputObjs = rightObj.children("input");
			if ("" == newValue)
			{
				for (var i = 0 ; i< inputObjs.length ; i++)
				{
					inputObjs.eq(i).val("");
				}
			}
			else
			{
				var v = newValue.split(",");
				for (var i = 0 ; i< inputObjs.length ; i++)
				{
					inputObjs.eq(i).val(v[i]);
				}
			}
		}
		if (spanObj.length == 1)
		{ 
			spanObj.attr('name', newValue);
			if (inputType == "CODE")
			{
				//code 转换名称
				var newText = getModelFieldCodeName(modelname, fieldName, newValue);
				spanObj.text(newText);
			}
			else
			{
				spanObj.text(newValue);
			}
		}
		var inputObj = rightObj.children('input');
	    if (inputObj.length == 1)
	    {
	    	inputObj.val(newValue);
		}
	}
};

/**
 * 自动保存数据
 */
function autoSaveDatas()
{
	detailSubmit(false);
};

/**
 * 提交事件处理
 */
function submitDatasTrigger()
{
	$("#next").unbind("click").click(function(){
		detailSubmit(true);
	});
};

/**
 * 详情提交或保存
 * @param manuSubmit false：自动保存(不校验数据)，true:手动保存
 */
function detailSubmit(manuSubmit)
{
	var resultObj = {};
	var datas = _dataChecker.getAllData();
	var curModelName = $("section").attr("name");
	answerJson.bossOffBalanceAssetModel = datas;
	var hideTips = false;
	//手动保存
	if (manuSubmit)
	{
		hideTips = false;//校验不通过时显示提示信息
	}
	else
	{
		//自动保存隐藏提示信息
		hideTips = true;//校验不通过隐藏提示信息
	}
	var autoClose = false; //是否自动关闭当前页面
	if (_dataChecker.checkAll(true, hideTips))
	{
		console.info("数据校验通过");
		//已完成
		resultObj=answerJson;
		resultObj["completeStatus"] = 2;
		if (manuSubmit)
		{
			autoClose = true;
		}
	}
	else
	{
		console.info("数据校验不通过");
		resultObj=answerJson;
		resultObj["completeStatus"] = 1;
	}
	var json = JSON.stringify(resultObj);
	console.info(json);
	AndroidJs.saveWjDetalAnswer(json, autoClose);
};

/**
 * 设置table行号
 * @param modelDatas 数据
 * @param lineNo 行号
 */
function setTableLineNo(modelDatas, lineNo)
{
	for (var index = 0 ; index < modelDatas.length ; index++ )
	{
		var lineNo = modelDatas[index]["lineNo"];
		if (null == lineNo || "" == lineNo)
		{
			++lineNo;
			modelDatas[index]["lineNo"] = lineNo;
		}
	}
};
