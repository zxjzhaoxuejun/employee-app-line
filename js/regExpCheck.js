var QestionRegChecker = function(modelName, questionList){
	this.defaultTipsMsg = "请输入正确的数据";
	/**
	 * 问题字段名映射
	 */
	this.questionFieldMaps = {}; //存储各个模块的问题：模块名>>(问题字段名>>问题详细)
	/**
	 * 问题code对应的问题信息
	 */
	this.questionCodeMaps = {}; //模块>>code>>字段的映射 (模块名称>>{ key:code, value:问题详细})
	/**
	 * 问题对应的【被受控规则】
	 */
	this.questionCodeCheckRuleMaps = {}; //模块>>字段和受控的校验规则映射    ： {模块名称>>key:字段code, value:checkRule对象(ruleCode,value:ruleObj)}
	/**
	 * 控制规则名称对应的问题code >>暂时用不到
	 */
	this.questionDynamicCheckRuleCodeMaps = {}; //模块>>动态校验名称和该字段Code的映射
	
	/**
	 * 动态显示
	 */
	this.donamicShowCodeRuleMaps= {};//动态显示映射.code>>受哪些code控制动态显示.
	
	/**
	 * 获取所有被动态控制显示的字段映射
	 */
	this.getAllDonamicShowRuleMaps = function(){
		return this.donamicShowCodeRuleMaps;
	};
	/**
	 * 获取被动态控制显示的字段映射
	 */
	this.getDonamicShowRuleMaps = function(modelName){
		var map = this.getAllDonamicShowRuleMaps();
		return map[modelName];
	};
	/**
	 * 设置所有被动态控制显示的字段映射
	 */
	this.setDonamicShowRuleMaps = function(modelName, questions){
		var map = this.getAllDonamicShowRuleMaps();
		map[modelName] = questions;
	};
	
	/**
	 * 获取被动态控制显示的字段映射
	 */
	this.getDonamicShowRuleMap = function(modelName, code){
		var map = this.getDonamicShowRuleMaps(modelName);
		var rule = null;
		if (map)
		{
			rule = map[code];
		}
		if (undefined == rule || null == rule)
		{
			//兼容跨模块控制问题.
			var allRule = this.getAllDonamicShowRuleMaps();
			for (var key in allRule)
			{
				var obj = allRule[key][code];
				if (undefined != obj && null != obj)
				{
					rule = obj;
					break;
				}
			}
		}
		return rule;
	};
	
	/**
	 * 设置被动态控制显示的字段映射
	 */
	this.setDonamicShowRuleMap = function(modelName, code, question){
		var map = this.getDonamicShowRuleMaps(modelName);
		if (!map)
		{
			map = {};
		}
		map[code] = question;
	};
	
	/**
	 * 获取所有问题
	 */
	this.getAllQuestionFieldMaps = function()
	{
		return this.questionFieldMaps; 
	};
	
	/**
	 * 获取模块问题
	 */
	this.getQuestionFieldMaps = function(modelName)
	{
		var map = this.getAllQuestionFieldMaps();
		return map[modelName];
	};
	
	/**
	 * 设置模块问题
	 */
	this.setQuestionFieldMaps = function(modelName, questions)
	{
		var map = this.getAllQuestionFieldMaps();
		map[modelName] = questions;
	};
	
	/**
	 * 获取问题
	 */
	this.getQuestionFieldMap = function(modelName, field)
	{
		var map = this.getQuestionFieldMaps(modelName);
		if (!map)
		{
			return null;
		}
		return map[field];
	};
	
	/**
	 * 设置问题
	 */
	this.setQuestionFieldMap = function(modelName, field, question)
	{
		var map = this.getQuestionFieldMaps(modelName);
		if (!map)
		{
			map = {};
		}
		map[field] = question;
	};
	
	/**
	 * 获取所有模块的codeQuestion映射 
	 */
	this.getAllQuestionCodeMaps = function()
	{
		return this.questionCodeMaps;
	};
	
	/**
	 * 获取模块的codeQuestion映射
	 */
	this.getQuestionCodeMaps = function(modelName)
	{
		var map = this.getAllQuestionCodeMaps();
		return map[modelName];
	};
	
	/**
	 * 设置模块的codeQuestion映射
	 */
	this.setQuestionCodeMaps = function(modelName, value)
	{
		var map = this.getAllQuestionCodeMaps();
		map[modelName] = value;
	};
	
	/**
	 * 根据code获取Question
	 */
	this.getQuestionCodeMap = function(modelName, code)
	{
		var codeQuestionMap = this.getQuestionCodeMaps(modelName);
		var question = null;
		if (codeQuestionMap) 
		{
			question = codeQuestionMap[code];
		}
		
		if (undefined == question || null == question)
		{
			//兼容跨模块控制问题.
			var map = this.getAllQuestionCodeMaps();
			for (var key in map)
			{
				var obj = map[key][code];
				if (undefined != obj && null != obj)
				{
					question = obj;
				}
			}
		}
		return question;
	};
	
	/**
	 * 设置code对应的Question
	 */
	this.setQuestionCodeMap = function(modelName, code, value)
	{
		var codeQuestionMap = this.getQuestionCodeMaps(modelName, code);
		if (!codeQuestionMap)
		{
			codeQuestionMap = {};
		}
		codeQuestionMap[code] = value;
		this.setQuestionCodeMaps(modelName, codeQuestionMap);
	};
	
	/**
	 * 获取所有模块的动态校验字段code和校验规则名称映射
	 */
	this.getAllQuestionCodeCheckRuleMaps = function()
	{
		return this.questionCodeCheckRuleMaps;
	};
	
	/**
	 * 获取模块的动态校验字段code和校验规则名称映射
	 */
	this.getQuestionCodeCheckRuleMaps = function(modelName)
	{
		var map = this.getAllQuestionCodeCheckRuleMaps();
		return map[modelName];
	};
	
	/**
	 * 设置模块的动态字段和校验规则映射
	 */
	this.setQuestionCodeCheckRuleMaps = function(modelName, value)
	{
		var map = this.getAllQuestionCodeCheckRuleMaps();
		map[modelName] = value;
	};
	
	/**
	 *根据code获取该code对应的校验规则
	 */
	this.getQuestionCodeCheckRuleMap = function(modelName, code)
	{
		var map = this.getQuestionCodeCheckRuleMaps(modelName);
		if (!map)
		{
			return null;
		}
		return map[code];
	};
	
	/**
	 * 设置code和该code对应的校验规则
	 */
	this.setQuestionCodeCheckRuleMap = function(modelName, code, value)
	{
		var map = this.getQuestionCodeCheckRuleMaps(modelName);
		if (!map)
		{
			map = {};
		}
		map[code] = value;
		this.setQuestionCodeCheckRuleMaps(modelName, map);
	};
	
	/**
	 * 获取所有的动态校验规则名称的问题code的映射
	 * @returns 
	 */
	this.getAllQuestionDynamicCheckRuleCodeMaps = function()
	{
		return this.questionDynamicCheckRuleCodeMaps;
	};
	
	/**
	 * 获取模块的动态规则名称的问题和code的映射
	 */
	this.getQuestionDynamicCheckRuleCodeMaps = function(modelName)
	{
		var map = this.getAllQuestionDynamicCheckRuleCodeMaps();
		return map[modelName];
	};
	
	/**
	 * 设置模块的动态规则名称的问题和code的映射
	 */
	this.setQuestionDynamicCheckRuleCodeMaps = function(modelName, value)
	{
		var map = this.getAllQuestionDynamicCheckRuleCodeMaps();
		map[modelName] = value;
	};
	
	/**
	 * 获取模块的动态规则名称的问题和code的映射
	 */
	this.getQuestionDynamicCheckRuleCodeMap = function(modelName, code)
	{
		var map = this.getQuestionDynamicCheckRuleCodeMaps(modelName);
		if (!map)
		{
			return null;
		}
		return map[code];
	};
	
	/**
	 * 设置模块的动态规则名称的问题和code的映射
	 */
	this.setQuestionDynamicCheckRuleCodeMap = function(modelName, code, value)
	{
		var map = this.getQuestionDynamicCheckRuleCodeMaps(modelName);
		if (!map)
		{
			map = {};
		}
		map[code] = value;
		this.setQuestionDynamicCheckRuleCodeMaps(modelName, map);
	};
	
	
	
	/**
	 * 根据问题fieldName查询问题对象,不区分modelname,找到即返回
	 * @param fieldName 问题名称
	 */
	this.getQuestionObjByFiildName = function(fieldName)
	{
		var allFieldMaps = this.getAllQuestionFieldMaps();
		for (var key in allFieldMaps)
		{
			var modelQuestions = allFieldMaps[key];
			var	question = modelQuestions[fieldName];
			if (question)
			{
				return question;
			}
		}
		return null; 
	};
	
	
	/**
	 * 转换问题列表  模块名>>(问题字段名>>问题详细)
	 * @param modelName 模块名称
	 * @param questionList 问题列表
	 */
	this.initQuestionMap = function(modelName, questionList)
	{
		var fieldMap = {}; //key值为字段名，value为字段详细
		var codeMap = {}; //模块>>code>>字段的映射 (模块名称>>{ key:code, value:问题详细})
		var codeCheckRuleMap = {}; //模块>>字段和被受控的校验规则映射    ： {模块名称>>key:字段code, value:checkRule对象(ruleCode,value:ruleObj)}
		var dynamicRuleCodeMap = {}; //模块>>动态校验名称和该字段Code的映射
		var dynamicShowRuleMap = {}; //动态显示映射.  code1 :受哪些code2控制动态显示.
		for (var index = 0 ;index < questionList.length; index++)
		{
			var question = questionList[index];
			var fieldName = question.fieldName;
			var code = question.code;
			var isDynamicCheck = question.isDynamicCheck;  //动态校验
			var isControlShow = question.isControlShow;  //控制动态显示
			var showRules = question.controlShowRuleList;  //动态显示规则
			if ("1" == isControlShow)
			{
				if (showRules && $.isArray(showRules) && showRules.length > 0)
				{
					for (var rIndex = 0 ; rIndex < showRules.length ; rIndex++)
					{
						var rule = showRules[rIndex];
						var codeArr = rule.code;
						var key = rule.key;
						if (codeArr && $.isArray(codeArr) && codeArr.length > 0)
						{
							for (var sIndex = 0; sIndex < codeArr.length ; sIndex++)
							{
								var rCode = codeArr[sIndex];
								var donamicShow = dynamicShowRuleMap[rCode];
								if (!donamicShow)
								{
									donamicShow = [];
									dynamicShowRuleMap[rCode] = donamicShow;
								}
								var newObj = {};
								newObj.key = key; //对象被code控制
								newObj.code = code;
								donamicShow.push(newObj);
							}
						}
					}
				}
			}
			
			if ("1" == isDynamicCheck)
			{
				//动态校验
				var dynamicCheckRuleName = question.dynamicCheckRule;
				var checkRule = question.dynamicCheckRuleList;
				if (checkRule && $.isArray(checkRule))
				{
					//当前字段控制哪些字段,转换为  被控字段对应的控制字段
					for (var rIndex = 0; rIndex < checkRule.length; rIndex++)
					{
						var rule = checkRule[rIndex];
						var ruleCode = rule.code; //ruleCode表示该ruleCode被其他code控制
						//被控字段
						var controlChecks = codeCheckRuleMap[ruleCode];
						if (!controlChecks)
						{
							controlChecks = [];
							codeCheckRuleMap[ruleCode] = controlChecks;
						}
						//转换code >> 
						var newObj = {};
						$.extend(newObj, rule);
						newObj.code = code; //对象被code控制
						controlChecks.push(newObj);
					}
				}
				dynamicRuleCodeMap[dynamicCheckRuleName] = code;
			}
			
			codeMap[code] = question;
			fieldMap[fieldName] = question;
		}
		this.setQuestionFieldMaps(modelName, fieldMap);
		this.setQuestionCodeMaps(modelName, codeMap);
		this.setQuestionCodeCheckRuleMaps(modelName, codeCheckRuleMap);
		this.setQuestionDynamicCheckRuleCodeMaps(modelName, dynamicRuleCodeMap);
		this.setDonamicShowRuleMaps(modelName, dynamicShowRuleMap);
		
	};
	
	
	if (modelName && "" != modelName && questionList &&　$.isArray(questionList) && questionList.length > 0)
	{
		this.initQuestionMap(modelName, questionList);
	};
	
	
	/**
	 * 数字格式化
	 * @param inputType
	 * @param value
	 */
	this.formatNumberValue = function(inputType , value)
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
	 * 是否空值
	 */
	this.isBlankValue = function(value)
	{
		var result = false;
		if (null == value)
		{
			result = true;
		}
		else
		{
			var _type = typeof(value);
			switch(_type)
			{
				case "string": 
					if ("" == value.trim())
					{
						result = true;
					}
					break;
				case "number": 
					if (value < 0 )
					{
						result = true;
					}
					break;
				default: break;
			}
		}
		return result ;
	};
	
	/**
	 * 提示框
	 */
	this.showTips = function(modelName, field, message)
	{
		if (!modelName || !field)
		{
			return;
		}
		if (!message)
		{
			message = this.defaultTipsMsg;
		}
		var tip = $(".problem[modelname='" + modelName +"'] li[fieldname='" + field + "'] .left label[field='" + field + "']");
		if (tip.length > 0)
		{
			tip.remove();
		}
		var target = ".problem[modelname='" + modelName +"'] li[fieldname='" + field + "'] .left";
		var showHtml = "<label class='message_info' field='" + field + "'>" + message + "</label>";
		$(showHtml).appendTo(target);
	};
	
	/**
	 * 移除提示
	 */
	this.removeTips = function(modelName, field)
	{
		var target = $(".problem[modelname='" + modelName +"'] li[fieldname='" + field + "'] .left label[field='" + field + "']");
		if (target.length > 0)
		{
			target.remove();
		}
	};
	
	/**
	 * 获取正则对象
	 */
	this.getRegExp = function(str)
	{
		return new RegExp(str); //eval("/" + str +"/");
	};
	
	/**
	 * 判断是否为其他特殊校验
	 * @param regExpValue 数据
	 */
	this.isOtherCheck = function(regExpValue)
	{
		var reg = new RegExp("^other_");
		return reg.test(regExpValue);
	};
	
	/**
	 * 特殊校验
	 * @param modelName 模块名称
	 * @param field 字段
	 * @param checkType 校验器类型 
	 * @param value 数据
	 * @param hideTips  是否隐藏不通过信息
	 */
	this.checkByOther = function(modelName, field, checkType, value, hideTips)
	{
		var result = false;
		var otherCheck = $.fn.OtherChecker[checkType];
		if (!otherCheck || "{}" == JSON.stringify(otherCheck))
		{
			console.warn("模块:" + modelName + " ;存在特殊校验规则字段【" + field + "】, 不支持的校验类型. " + checkType);
		}
		else
		{  
			result = otherCheck.check(value);
		}
		if (!result)
		{
			console.info("模块:" + modelName + " ;存在特殊校验规则字段【" + field + "】, 校验不通过. 校验类型:" + checkType +";数据:" + value);
			//提示处理
			if (!hideTips)
			{
				if(checkType=="dategreateqtoday"){
					this.showTips(modelName, field , "大于等于当前时间");
				}else if(checkType=="datelighteqtoday"){
					this.showTips(modelName, field , "小于等于当前时间");
				}else if(checkType=="datebtabftd"){
					this.showTips(modelName, field , "第一个时间小于今天");
				}else if(checkType=="datebeforetoday"){
					this.showTips(modelName, field , "时间段都要小于今天");
				}else if(checkType=="dateaftertoday"){
					this.showTips(modelName, field , "时间段都要大于今天");
				}else if(checkType=="datebtbbaftd"){
					this.showTips(modelName, field , "第二个时间大于今天");
				}else if(checkType=="datebtbbftdeq"){
					this.showTips(modelName, field , "两个日期都小于等于当前日期");
				}else if(checkType=="datebtbbftd"){
					//第一个<当前时间,第二个<当前时间
					this.showTips(modelName, field , "第一个时间以及第二个时间都要小于当前时间");
				}else if(checkType=="datebtbaaftd"){
					//第一个>当前时间,第二个>当前时间
					this.showTips(modelName, field , "第一个时间以及第二个时间都要大于当前时间");
				}else if(checkType=="dateabeforeb"){
					//第一个<第二个
					this.showTips(modelName, field , "第一个时间小于第二个时间");
				}else{
					this.showTips(modelName, field , this.defaultTipsMsg);	
				}
			}
		}
		else
		{
			console.info("模块:" + modelName + " ;存在特殊校验规则字段【" + field + "】, 校验通过.");
			this.removeTips(modelName, field);
		}
		return result;
	};
	
	
	/**
	 * 【内部方法】获取li下面的值
	 * @param liDom li对象 
	 * @param inputType 输入类型
	 */
	this._getValueByLijQdom = function(liDom, inputType)
	{
		var value = null;
		switch(inputType)
		{
			case "CODE":
				value = liDom.find(".right span").attr("name");	
				if (undefined == value)
				{
					value = liDom.find(".right input[type='radio'][checked='checked']").val();
					if (undefined == value || "" == value)
					{
						value = liDom.find(".right input[type='radio']:checked").val(); 
					}
				}
				break;
			case "DATEZONE":
			   var date1 = liDom.find(".right input").eq(0).val();
			   var date2 = liDom.find(".right input").eq(1).val();
			   if(date1==undefined||date1==''){
			   	date1='';
			   }
			   if(date2==undefined||date2==''){
			   	date2='';
			   }
			   if(date1!=''||date2!=''){
			   value=date1+','+date2;
			   }
				break;
			case "TELEPHONE":
				//固话
				var inputs = liDom.find(".right input");
				var checkValue = "";
				for (var index = 0 ; index < inputs.length ; index++)
				{
					var inpuObj = inputs.eq(index);
					if(index==2&&inpuObj.val()==""){
						checkValue = checkValue + inpuObj.val() ;
					}else{
						checkValue = checkValue + inpuObj.val() + "-";
					}
				}
				if (checkValue.length > 0)
				{
					value = checkValue.substring(0, checkValue.length -1);
					console.log(value)
				}
				if(value=="--"||value=="-"){
					value =null;
				}
				break;
			case "ADDRESS":
				 var guid = liDom.find(".right span").attr("guid");
				 if (undefined == guid || null == guid) 
				 {
					 guid = "";
				 }
				
				 var extAddr = liDom.find(".x-address input").val();
				 if (undefined == extAddr || null == extAddr)
				 {
					 extAddr = ""
				 }
				 if ("" != extAddr)
				 {
					 value = guid + '||'+ extAddr; 
				 }
				 else
				 {
					 value = guid;
				 }
				break;
			case "CHECKBOX":
				var spans = liDom.find(".right label.chenckboxNews img[src='img/jxt_icon.png']").siblings("span");
				var checkValue = "";
				for (var index = 0 ; index < spans.length ; index++)
				{
					var spanObj = spans.eq(index);
					checkValue = checkValue + spanObj.attr("name") + ",";
				}
				if (checkValue.length > 0)
				{
					value = checkValue.substring(0, checkValue.length -1);
				}
				break;
			case "TEXTAREA":
				value = liDom.find(".right textarea").val()||liDom.find(".textCon textarea").val();
				
				break;
			default: 
				value = liDom.find(".right input").val();
//				value = this.formatNumberValue(inputType, value);
				break;
		}
	
		return value;
	};
	
	
	/**
	 * 获取li(jq对象)下的值 
	 * @param liObjs 模块的所有li
	 * @param modelQuestions 模块的问题对象
	 */
	this.getFieldValues = function(liObjs, modelQuestions)
	{
		var data = null;
		if (liObjs && liObjs.length > 0 && modelQuestions && $.isPlainObject(modelQuestions))
		{
			data = {};
			for (var index = 0 ; index < liObjs.length ; index++)
			{
				var jdom = liObjs.eq(index);
				var field = jdom.attr("fieldname");
				var question = modelQuestions[field];
				if (!question)
				{
					console.info(field + " 问题字段不存在.");
					continue ; 
				}
				var value = this._getValueByLijQdom(jdom, question.inputType);
				if (undefined == value || null == value)
				{
					value = "";
				}
				data[field] = value;
			}
		}
		return data;
	};
	
	/**
	 * 校验数据
	 * @param modelName 模块名
	 * @param field 具体校验的某个字段,可传null,代表校验整个模块
	 * @param isTabValue 布尔值
	 * @param values 数据
	 * @param hideTips 校验不通过时 是否隐藏提示信息
	 */
	this.checkFieldValuesAll = function(modelName, field, values, hideTips)
	{
		//默认校验所有字段
		return this.checkFieldValues(modelName, field, values, true, hideTips);
	};
	
	/**
	 * 根据正则校验(内部调用)
	 * @param jdom li的jq对象
	 * @param modelName 模块
	 * @param value 数据值
	 * @param question 问题对象
	 * @param hideTips 校验不通过时 是否隐藏提示信息
	 * @param values 当前字段依赖的其他字段的数据
	 */
	this._checkByRegExpRule = function(jdom, modelName, value, question, hideTips, values)
	{
		var fieldResult = true;
		var field = question.fieldName;
		var name = question.name;
		//优选动态校验，若无动态校验，根据自身规则校验
		var code = question.code;
		//判断当前字段是否受其他字段控制校验规则
		var rule = this.getQuestionCodeCheckRuleMap(modelName, code);
		if (rule && $.isArray(rule) && rule.length > 0)
		{
			var inputType = question.inputType;
			for (var rIndex = 0 ; rIndex < rule.length ; rIndex++)
			{
				//当前字段所被控制的字段
				var ruleObj = rule[rIndex];
				var ctrlCode = ruleObj.code;
				var controlField = this.getQuestionCodeMap(modelName, ctrlCode);
				var ruleTips = controlField.regexRuleName;
				if (!controlField)
				{
					console.info("当前字段code[" + code + "]校验规则受字段Code[" + ctrlCode + "]控制,但字段Code[" + ctrlCode + "]不存在");
					continue;
				}
				var valueRegExp = ruleObj.key; //受控值 正则表达式
				if (this.isBlankValue(valueRegExp))
				{
					continue;
				}
				var ctrlFieldValu = null;
				if (values && values[controlField.fieldName])
				{
					ctrlFieldValu = values[controlField.fieldName];
				}
				else
				{
					var _tarObj = $(".problem[modelname='" + modelName + "'] li[fieldname='" + controlField.fieldName + "']");
					if (_tarObj.length == 0)
					{
						_tarObj = $(".problem li[fieldname='" + controlField.fieldName + "']"); //跨模块取值
					}
					ctrlFieldValu =  this._getValueByLijQdom(_tarObj, controlField.inputType); 
				}
				if (!ctrlFieldValu)
				{
					ctrlFieldValu = "";
				}
				
				var beforeCheck = false; //前置校验
				//“other_” 开头特殊校验
				if (this.isOtherCheck(valueRegExp))
				{
					var otherMethod = valueRegExp.substring(6);
					if ("" == otherMethod)
					{
						console.info("存在特殊校验规则字段Code【 "  + ctrlCode + " 】,name【" + controlField.fieldName + "】, 校验规则不存在." + valueRegExp);
						continue;
					}
					console.info("字段[" + field + "] 受  特殊校验规则字段Code【 "  + ctrlCode + " 】,name【" + controlField.fieldName + "】 前置校验开始");
					beforeCheck = this.checkByOther(modelName, controlField.fieldName, otherMethod, ctrlFieldValu, true); //前置校验不必提示
				}
				//前置条件>>控制字段的值满足条件
				else if (this.getRegExp(valueRegExp).test(ctrlFieldValu))
				{
					beforeCheck = true;
				}
				console.info("受控字段[" + field + "]前置校验结果" +　beforeCheck);
				if (beforeCheck)
				{
					//满足校验前置条件
					var checkRuleRegExp = ruleObj.checkrule; //校验正则表达
					if (this.isBlankValue(checkRuleRegExp))
					{
						continue;
					}
					//“other_” 开头特殊校验
					if (this.isOtherCheck(checkRuleRegExp))
					{
						var otherMethod = checkRuleRegExp.substring(6);
						if ("" == otherMethod)
						{
							console.info("存在特殊校验规则字段Code【 "  + ctrlCode + " 】,name【" + controlField.fieldName + "】, 校验规则不存在." + checkRuleRegExp);
							continue;
						}
						fieldResult = this.checkByOther(modelName, field, otherMethod, value, hideTips);
						console.info("字段：" + name + "  受控制字段[" + controlField.name + " ]值控制,方法特殊校验结果>>>>>>" + fieldResult);
					}
					//当前值校验
					else if (this.getRegExp(checkRuleRegExp).test(value))
					{
						console.info("字段：" + name + "  受控制字段[" + controlField.name + " ]值控制,正则校验>>>>>>通过");
					}
					else
					{
						fieldResult = false;
						console.info("字段：" + name + "  受控制字段[" + controlField.name + " ]值控制,正则校验>>>>>>【不通过】 表达式：" + checkRuleRegExp + " 数据：" + value );
						//提示处理
						if (!hideTips)
						{
							this.showTips(modelName, field , ruleTips);
						}
					}
				}
				else
				{
					console.info("字段：" + name + "  受控制字段[" + controlField.name + " ]值控制,但控制字段值不满足正则【校验不生效】, 表达式：" + checkRuleRegExp + " 数据：" + ctrlFieldValu );
					console.info("字段：" + name + "根据自身规则校验");
					fieldResult = this._selfCheck(jdom, modelName, value, question, hideTips);
				}
			}
		}
		else
		{
			fieldResult = this._selfCheck(jdom, modelName, value, question, hideTips);
		}
		if (fieldResult)
		{
			this.removeTips(modelName, field);
		}
		return fieldResult;
	};
	
	/**
	 * 根据自身规则校验(内部调用)
	 * @param jdom li的jq对象
	 * @param modelName 模块
	 * @param value 数据值
	 * @param question 问题对象
	 * @param hideTips 校验不通过时 是否隐藏提示信息
	 */
	this._selfCheck = function(jdom, modelName, value, question, hideTips)
	{
		var fieldResult = true;
		var field = question.fieldName;
		var name = question.name;
		var regExp = question.regexRule; //正则表达式
		var regExpTips = question.regexRuleName; //正则表达式说明
		//正则匹配规则
		if (regExp && "" != regExp)
		{
			//“other_” 开头特殊校验
			if (this.isOtherCheck(regExp))
			{
				var otherMethod = regExp.substring(6);
				if ("" == otherMethod)
				{
					console.info("存在特殊校验规则字段【" + name + "】, 校验规则不存在." + regExp);
				}
				else
				{
					fieldResult = this.checkByOther(modelName, field, otherMethod, value, hideTips);
				}
			}
			else if (this.getRegExp(regExp).test(value))
			{
				console.info("字段：" + name + "  正则校验>>>>>>通过");
				jdom.find(".left i").removeClass("unfinish").addClass("finish");
			}
			else
			{
				fieldResult = false;
				console.info("字段：" + name + "  正则校验>>>>>>【不通过】" + regExpTips  +" 表达式：" + regExp + " 数据：" + value );
				//提示处理
				if (!hideTips)
				{
					jdom.find(".left i").removeClass("finish").addClass("unfinish");
					this.showTips(modelName, field , regExpTips);
				}
			}
		}
		else
		{
			console.info("字段：" + question.name + "  简易校验>>>>>>通过");
			jdom.find(".left i").removeClass("unfinish").addClass("finish");
		}
		
		return fieldResult;
	};
	
	/**
	 * 获取所有模块的数据
	 */
	this.getAllData = function()
	{
		var datas = {};
		var models = $("section .problem");
		for (var index = 0; index < models.length; index++)
		{
			var model = models.eq(index);
			var modelname = model.attr("modelname");
			var data = null;
			if (model.hasClass("table"))
			{
				data = this.getModelTableData(modelname);
			}
			else
			{
				data = this.getModelData(modelname);
			}
			datas[modelname] = data;
		}
		return datas;
	};
	
	/**
	 * 获取table模块的数据,返回对象
	 * @param modelname 模块名称
	 */
	this.getModelTableData = function(modelname)
	{
		var model = $(".problem[modelname='" + modelname + "']");
		var tableDatas = model.data(modelname);
		//当前选中的tab页
		var curTabIndex = model.find(".cy span.span_bg").attr("index");
		var currentData = this.getModelData(modelname);
		if (!tableDatas)
		{
			tableDatas = [];
			currentData["lineNo"] = 0;
			tableDatas.push(currentData);
		}
		else
		{
			if ($.isArray(tableDatas))
			{
				var tbLength = tableDatas.length;
				for (var key = 0; key < tbLength; key++)
				{
					if (key == curTabIndex)
					{
						$.extend(tableDatas[key], currentData);
					}
				}
				//处理行号
				this._handleTableLineNo(tableDatas);
			}
			else
			{
				var curKey = "tableIndex_" + curTabIndex;
				var arr = [];
				for (var key in tableDatas)
				{
					if (key == curKey)
					{
						$.extend(tableDatas[key], currentData);
					}
					arr.push(tableDatas[key]);
				}
				
				//处理行号
				this._handleTableLineNo(arr);
				
				return arr;
			}
		}
		
		return tableDatas;
	};
	
	/**
	 * 【内部调用】处理行号
	 * @param 数组数据
	 */
	this._handleTableLineNo = function(datas)
	{
		var maxLineNo = 0;
		//获取最大行号
		for (var index = 0 ; index < datas.length; datas++)
		{
			var data = datas[index];
			var lineNo = data["lineNo"];
			if (undefined == lineNo || null == lineNo || "" == lineNo)
			{
				continue;
			}
			lineNo = parseInt(lineNo);
			if (lineNo > maxLineNo)
			{
				maxLineNo = lineNo;
			}
		}
		
		//行号处理
		for (var index = 0 ; index < datas.length ; index++ )
		{
			var data = datas[index];
			var lineNo = data["lineNo"];
			if (null == lineNo || "" == lineNo)
			{
				++maxLineNo;
				data["lineNo"] = lineNo;
			}
		}
	};
	
	/**
	 * 获取模块的数据
	 * @param modelName 模块名称
	 */
	this.getModelData = function(modelName)
	{
		var questions = this.getQuestionFieldMaps(modelName);
		if (!questions)
		{
			console.info(modelName + "模块问题数据不存在.");
			return null;
		}
		var target = ".problem[modelname='" + modelName + "'] li";
		var liObjs = $(target);
		return this.getFieldValues(liObjs, questions);
	};
	
	/**
	 * 校验数据
	 * @param modelName 模块名
	 * @param fieldName 字段名
	 * @param values 数据
	 * @param needCycle 是否需要递归判断上级是否满足动态显示.
	 * @param cycleDeep 当前是第n层循环（最大5层循环.防止陷入死循环） 
	 */
	this._isMatchDynamicShow = function(modelName, fieldName, values, needCycle, cycleDeep)
	{
		var isMatch = false; //动态显示的字段默认为隐藏.
		var modelQuestions = this.getQuestionFieldMaps(modelName);
		if (!modelQuestions)
		{
			console.info(modelName + "模块问题数据不存在.");
			return isMatch;
		}
		var question = modelQuestions[fieldName];
		if (!question)
		{
			//跨模块问题
			question = this.getQuestionObjByFiildName(fieldName);
			if (!question)
			{
				console.info("问题字段不存在:" + fieldName);
				return isMatch; 
			}
		}
		// 该字段是否动态显示，受其它字段控制显示.
		var donamicShow = this.getDonamicShowRuleMap(modelName, question.code);
		if (donamicShow && $.isArray(donamicShow) && donamicShow.length > 0)
		{
			if (needCycle && undefined == cycleDeep)
			{
				cycleDeep = 1; //默认当前为第一层循环
			}
			for (var sIndex = 0 ; sIndex < donamicShow.length ; sIndex++)
			{
				var showRule = donamicShow[sIndex];
				var controlField = this.getQuestionCodeMap(modelName, showRule.code);
				var regExpKey = showRule.key;
				//默认没有更上一层控制.
				//控制字段是否满足动态显示规则. 递归判断控制字段是否满足动态显示. 主要处理情景：字段1控制字段2显示,字段2控制字段3显示...
				var isParentMatchShow = true;
				var controlDonamicShow = this.getDonamicShowRuleMap(modelName, controlField.code);
				//判断上级控制字段是否还有被更上一级控制
				if (controlDonamicShow && $.isArray(controlDonamicShow) && controlDonamicShow.length > 0)
				{
					console.info("字段:[" + fieldName + "]受[" +　controlField.fieldName　+　"]控制,字段[" + controlField.fieldName +"]受其他字段控制....");
					isParentMatchShow = this._isMatchDynamicShow(modelName, controlField.fieldName, values, needCycle, cycleDeep);
					while (needCycle && isParentMatchShow && cycleDeep < 5)
					{
						cycleDeep++ ;
						if (!this._isMatchDynamicShow(modelName, controlField.fieldName, values, needCycle, cycleDeep))
						{
							isParentMatchShow = false;
							break;
						}
					}
				}
				var ctrlFieldValu = values[controlField.fieldName];
				// 此处一定要=== 不能用 == (当ctrlFieldValu = null 时,undefined == ctrlFieldValu 返回为true) 
				// 当有传入字段时,且字段值为null时,不再重新获取值.
				if (undefined === ctrlFieldValu)
				{
					var _tarObj = $(".problem[modelname='" + modelName + "'] li[fieldname='" + controlField.fieldName + "']");
					if (_tarObj.length == 0)
					{
						_tarObj = $(".problem li[fieldname='" + controlField.fieldName + "']"); //跨模块取值
					}
					
					if (_tarObj.is(":hidden") && !isParentMatchShow)
					{
						console.info("动态显示控制字段:" + controlField.fieldName + "为隐藏且不满足动态显示规则.");
						continue;
					}
					
					ctrlFieldValu = this._getValueByLijQdom(_tarObj, controlField.inputType); 					
				}
				
				if (this.isBlankValue(ctrlFieldValu))
				{
					console.info("字段:[" + fieldName + "]受控制,动态显示控制字段:" + controlField.fieldName + "数据为空");
					continue;
				}
				if (this.getRegExp(regExpKey).test(ctrlFieldValu))
				{
					isMatch = true;
					break;
				}
			}
		}
		else
		{
			isMatch = true; //递归方法中,默认值不能随便改,影响到递归逻辑主要控制.
			console.info("字段[" + fieldName + "]没有配置动态显示规则.默认为满足动态显示规则.");
		}
		if (!isMatch) 
		{
			console.info("字段[" + fieldName + "]不满足动态显示规则.");
		}
		return isMatch;
	};
	
	/**
	 * 校验数据
	 * @param modelName 模块名
	 * @param targetield 具体校验的某个字段,可传null,代表校验整个模块
	 * @param values 数据
	 * @param checkAll 是否校验完所有字段，再返回结果  若为true，则校验所有字段返回结果，为false时，只要校验到一个为false时，立即返回false
	 * @param hideTips 校验不通过时 是否隐藏提示信息
	 */
	this.checkFieldValues = function(modelName, targetField, values, checkAll, hideTips)
	{
		var checkResult = true;
		var modelQuestions = this.getQuestionFieldMaps(modelName);
		if (!modelQuestions)
		{
			console.info(modelName + "模块问题数据不存在.");
			return false;
		}
		var target = ".problem[modelname='" + modelName + "'] li";
		if (targetField && "" !=targetField)
		{
			target += "[fieldname='" + targetField + "']";
		}
		var liObjs = $(target);
		if (!values)
		{
			values = this.getFieldValues(liObjs, modelQuestions);
		}
		for (var index = 0 ; index < liObjs.length ; index++)
		{
			var jdom = liObjs.eq(index);
			var field = jdom.attr("fieldname");
			var question = modelQuestions[field];
			if (!question)
			{
				console.info("问题字段不存在:" + field);
				continue ; 
			}
			var isDynamicShow = question.isDynamicShow;//是否动态显示.
			if ("1" == isDynamicShow)
			{
				var isMatch = this._isMatchDynamicShow(modelName, field, values, true); //是否满足动态显示规则
				if (!isMatch)
				{
					console.info("字段:" + field + " 为不满足动态显示.不校验.");
					continue;
				}
			}
			else
			{
				if (jdom.is(":hidden"))
				{
					console.info("字段:" + field + " 为非动态显示字段且为隐藏,不校验.");
					continue;
				}
			}
			
			var isRequire = question.require; //是否必填
			var inputType = question.inputType; //类型
			var isDynamicCheck = question.isDynamicCheck;//是否动态校验。
			var value = values[field];
			var fieldResult = false;
			
			//当前字段简易校验通过
			if (!this.isBlankValue(value))
			{
				//正则校验
				fieldResult = this._checkByRegExpRule(jdom, modelName, value, question, hideTips, values);
			}
			else
			{
				if (isRequire)
				{
					console.info("字段：" + question.name + "  简易校验>>>>>>【不通过】");
					//提示处理
					if (!hideTips)
					{
						jdom.find(".left i").removeClass("finish").addClass("unfinish");
						this.showTips(modelName, field , "请输入必填数据");
					}
				}
				else
				{
					fieldResult = true;
					console.info("字段：" + question.name + "  简易校验通过>>为空, 非必填");
					this.removeTips(modelName, field);
				}
			}
			
			//立即返回
			if (!fieldResult)
			{
				checkResult = false;
				if (!checkAll)
				{
					break;
				}
			}
		}
		
		return checkResult;
	};
	
	/**
	 * 校验模块数据 
	 * @param modelName 模块名称 
	 * @param checkAll 是否校验所有字段 
	 * @param hideTips 校验不通过时 校验不通过时 是否隐藏提示信息
	 */
	this.checkModel = function(modelName, checkAll, hideTips)
	{
		return this.checkFieldValues(modelName, null, null, checkAll, hideTips);
	};
	
	/**
	 * 校验模块数据, 校验所有字段
	 * @param modelName 模块名称 
	 * @param hideTips 校验不通过时 校验不通过时 是否隐藏提示信息
	 */
	this.checkModelAll = function(modelName, hideTips)
	{
		return this.checkModel(modelName, true, hideTips);
	};
	
	/**
	 * 校验模块某个字段
	 * @param modelName 模块名称 
	 * @param field 字段名称 
	 * @param checkAll 是否校验所有字段 
	 * @param hideTips 校验不通过时 校验不通过时 是否隐藏提示信息
	 */
	this.checkModelField = function(modelName, field, checkAll, hideTips)
	{
		return this.checkFieldValues(modelName, field, null, checkAll, hideTips);
	};
	
	/**
	 * 校验单个模块所有tab
	 * @param model 模块的jq对象
	 * @param hideTips 校验不通过时 是否隐藏提示信息
	 */
	this.checkModelAllTable = function(model, hideTips)
	{
		return this.checkModelTable(model, true, hideTips);
	};
	
	/**
	 * 校验单个模块table 
	 * @param model 模块的jq对象
	 * @param checkAll 是否校验所有tab 否的话，只要校验到一个tab不通过时，立即返回false
	 * @param hideTips 校验不通过时 是否隐藏提示信息
	 */
	this.checkModelTable = function(model, checkAll, hideTips)
	{
		var result = true;
		var modelname = model.attr("modelname");
		var answerlimit = model.attr("answerlimit"); 
		var limitMin = model.attr("answerlimitmin");
		var values = model.data(modelname);
		if (!values)
		{
			console.info("【" + modelname + "】数据不存在");
			result = false;
			return result ;
		}
		if (answerlimit != 0)
		{
			if (values.length > answerlimit)
			{
				result = false;
				console.info("模块" + modelname + " tab页数据量[" + values.length + "] 超过最大限制." + answerlimit)
				return result ;
			}
		}
		if (limitMin != 0)
		{
			if (values.length < limitMin)
			{
				result = false;
				console.info("模块" + modelname + " tab页数据量[" + values.length + "] 低于最小限制." + limitMin)
				return result;
			}
		}
		var modelQuestions = this.getQuestionFieldMaps(modelname);
		if (!modelQuestions)
		{
			result = false;
			console.info(modelname + "模块问题数据不存在.");
			return result;
		}
		//获取当前tab数据
		var curTabValue = this.getFieldValues(model.find("li"), modelQuestions);
		var tabObjs = model.find(".cy");
		var curTabObj = tabObjs.find("span.span_bg");
		var tabIndex = curTabObj.attr("index");
		
		//values 有可能为数组 ，也有可能为对象
		if ($.isArray(values))
		{
			var valueLength = values.length;
			for (var key = 0 ; key < valueLength ; key++)
			{
				console.info("模块【" + modelname + "】:开始校验tab：" + key);
				var tempResult = true;
				if (key == tabIndex)
				{
					tempResult = this.checkFieldValuesAll(modelname, null, curTabValue, hideTips);
				}
				else
				{
					tempResult = this.checkFieldValuesAll(modelname, null, values[key], true);//非当前tab不提示
				}
				console.info("模块【" + modelname + "】tab：" + key + ">>校验结果：" + tempResult);
				if (!tempResult)
				{
					result = false;
					if (!hideTips)
					{
						model.find(".cy span[index='" + key + "']").removeClass("finish").addClass("unfinish");
					}
					//不校验所有tab
					if (!checkAll)
					{
						break;
					}
				}
				else
				{
					model.find(".cy span[index='" + key + "']").removeClass("unfinish").addClass("finish");
				}
			}
		}
		else
		{
			var curKey = "tableIndex_" + tabIndex; //TODO 此处需要统一
			for (var key in values)
			{
				console.info("模块【" + modelname + "】:开始校验tab：" + key);
				var tempResult = true;
				if (key == curKey)
				{
					tempResult = this.checkFieldValuesAll(modelname, null, curTabValue, hideTips);
				}
				else
				{
					tempResult = this.checkFieldValuesAll(modelname, null, values[key], true);//非当前tab不提示
				}
				console.info("模块【" + modelname + "】tab：" + key + ">>校验结果：" + tempResult);
				var tIdx = key.substring(key.lastIndexOf("_") + 1);
				if (!tempResult)
				{
					result = false;
					if (!hideTips)
					{
						model.find(".cy span[index='" + tIdx + "']").removeClass("finish").addClass("unfinish");
					}
					//不校验所有tab
					if (!checkAll)
					{
						break;
					}
				}
				else
				{
					model.find(".cy span[index='" + tIdx + "']").removeClass("unfinish").addClass("finish");
				}
			}
		}
		
		
		return result;
	};
	
	/**
	 * 校验所有
	 * @param all 是否校验完所有模块,true校验完所有模块再返回结果,false只要有一个模块校验失败,立即返回false
	 * @param hideTips 校验不通过时 是否隐藏提示信息
	 */
	this.checkAll = function(checkAll, hideTips)
	{
		var result = true;
		var models = $("section .problem");
		for (var index = 0 ; index < models.length ; index++)
		{
			var model = models.eq(index);
			var modelname = model.attr("modelname");
			var tempResult = true;
			console.info("校验模块 : " + modelname);
			if (model.hasClass("table"))
			{
				tempResult = this.checkModelAllTable(model, hideTips);
			}
			else
			{
				tempResult = this.checkModelAll(modelname, hideTips);
			}
			console.info("模块 : " + modelname + "校验结果>>" + tempResult);
			if (!tempResult)
			{
				result = false;
				if (!checkAll)
				{
					break;
				}
			}
		}
		console.info("所有模块返回结果 ：" + result);
		return result;
	};
	
	/**
	 * 添加自动校验事件
	 */
	this.initAutoCheckTrigger = function()
	{
		var checker = this;
		//radio 不能用blur事件，应用change事件,用blur事件处理radio时,由于还没有数据,校验的还是旧radio值,存有问题
		//传入当前对象
		$(".problem li input[type!='radio']").not("[data-lcalendar]").blur(checker, function(even){
			var _checker = even.data; //checker对象由参数传入进来
			var _this = $(this);
			var modelObj = _this.closest(".problem");
			var value = _this.val();
			var liObj = _this.closest("li");
			var modelName = modelObj.attr("modelname");
			if (modelName && "" != modelName)
			{
				var field = liObj.attr("fieldname");
				_checker.checkModelField(modelName, field);
			}
		});
		
		$(".problem li textarea").blur(checker, function(even){
			var _checker = even.data; //checker对象由参数传入进来
			var _this = $(this);
			var value = _this.val();
			var liObj = _this.closest("li");
			var modelObj = _this.closest(".problem");
			var modelName = modelObj.attr("modelname");
			if (modelName && "" != modelName)
			{
				var field = liObj.attr("fieldname");
				_checker.checkModelField(modelName, field);
			}
		});
		
		$(".problem li input[type='radio']").change(checker, function(even){
			var _checker = even.data; //checker对象由参数传入进来
			var _this = $(this);
			var liObj = _this.closest("li");
			var modelObj = liObj.closest(".problem");
			var modelName = modelObj.attr("modelname");
			if (modelName && "" != modelName)
			{
				var field = liObj.attr("fieldname");
				_checker.checkModelField(modelName, field);
			}
		});
	};
};
