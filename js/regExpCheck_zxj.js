var QestionRegChecker = function (modelName, questionList) {
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
     * 获取所有问题
     */
    this.getAllQuestionFieldMaps = function () {
        return this.questionFieldMaps;
    }

    /**
     * 获取模块问题
     */
    this.getQuestionFieldMaps = function (modelName) {
        var map = this.getAllQuestionFieldMaps();
        return map[modelName];
    };

    /**
     * 设置模块问题
     */
    this.setQuestionFieldMaps = function (modelName, questions) {
        var map = this.getAllQuestionFieldMaps();
        map[modelName] = questions;
    };

    /**
     * 获取问题
     */
    this.getQuestionFieldMap = function (modelName, field) {
        var map = this.getQuestionFieldMaps(modelName);
        if (!map) {
            return null;
        }
        return map[field];
    };

    /**
     * 设置问题
     */
    this.setQuestionFieldMap = function (modelName, field, question) {
        var map = this.getQuestionFieldMaps(modelName);
        if (!map) {
            map = {};
        }
        map[field] = question;
    };

    /**
     * 获取所有模块的codeQuestion映射
     */
    this.getAllQuestionCodeMaps = function () {
        return this.questionCodeMaps;
    };

    /**
     * 获取模块的codeQuestion映射
     */
    this.getQuestionCodeMaps = function (modelName) {
        var map = this.getAllQuestionCodeMaps();
        return map[modelName];
    };

    /**
     * 设置模块的codeQuestion映射
     */
    this.setQuestionCodeMaps = function (modelName, value) {
        var map = this.getAllQuestionCodeMaps();
        map[modelName] = value;
    }

    /**
     * 根据code获取Question
     */
    this.getQuestionCodeMap = function (modelName, code) {
        var codeQuestionMap = this.getQuestionCodeMaps(modelName);
        if (!codeQuestionMap) {
            return null;
        }
        return codeQuestionMap[code];
    };

    /**
     * 设置code对应的Question
     */
    this.setQuestionCodeMap = function (modelName, code, value) {
        var codeQuestionMap = this.getQuestionCodeMaps(modelName, code);
        if (!codeQuestionMap) {
            codeQuestionMap = {};
        }
        codeQuestionMap[code] = value;
        this.setQuestionCodeMaps(modelName, codeQuestionMap);
    }

    /**
     * 获取所有模块的动态校验字段code和校验规则名称映射
     */
    this.getAllQuestionCodeCheckRuleMaps = function () {
        return this.questionCodeCheckRuleMaps;
    };

    /**
     * 获取模块的动态校验字段code和校验规则名称映射
     */
    this.getQuestionCodeCheckRuleMaps = function (modelName) {
        var map = this.getAllQuestionCodeCheckRuleMaps();
        return map[modelName];
    };

    /**
     * 设置模块的动态字段和校验规则映射
     */
    this.setQuestionCodeCheckRuleMaps = function (modelName, value) {
        var map = this.getAllQuestionCodeCheckRuleMaps();
        map[modelName] = value;
    };

    /**
     *根据code获取该code对应的校验规则
     */
    this.getQuestionCodeCheckRuleMap = function (modelName, code) {
        var map = this.getQuestionCodeCheckRuleMaps(modelName);
        if (!map) {
            return null;
        }
        return map[code];
    };

    /**
     * 设置code和该code对应的校验规则
     */
    this.setQuestionCodeCheckRuleMap = function (modelName, code, value) {
        var map = this.getQuestionCodeCheckRuleMaps(modelName);
        if (!map) {
            map = {};
        }
        map[code] = value;
        this.setQuestionCodeCheckRuleMaps(modelName, map);
    };

    /**
     * 获取所有的动态校验规则名称的问题code的映射
     * @returns
     */
    this.getAllQuestionDynamicCheckRuleCodeMaps = function () {
        return this.questionDynamicCheckRuleCodeMaps;
    };

    /**
     * 获取模块的动态规则名称的问题和code的映射
     */
    this.getQuestionDynamicCheckRuleCodeMaps = function (modelName) {
        var map = this.getAllQuestionDynamicCheckRuleCodeMaps();
        return map[modelName];
    };

    /**
     * 设置模块的动态规则名称的问题和code的映射
     */
    this.setQuestionDynamicCheckRuleCodeMaps = function (modelName, value) {
        var map = this.getAllQuestionDynamicCheckRuleCodeMaps();
        map[modelName] = value;
    };

    /**
     * 获取模块的动态规则名称的问题和code的映射
     */
    this.getQuestionDynamicCheckRuleCodeMap = function (modelName, code) {
        var map = this.getQuestionDynamicCheckRuleCodeMaps(modelName);
        if (!map) {
            return null;
        }
        return map[code];
    };

    /**
     * 设置模块的动态规则名称的问题和code的映射
     */
    this.setQuestionDynamicCheckRuleCodeMap = function (modelName, code, value) {
        var map = this.getQuestionDynamicCheckRuleCodeMaps(modelName);
        if (!map) {
            map = {};
        }
        map[code] = value;
        this.setQuestionDynamicCheckRuleCodeMaps(modelName, map);
    };

    /**
     * 转换问题列表  模块名>>(问题字段名>>问题详细)
     * @param modelName 模块名称
     * @param questionList 问题列表
     */
    this.initQuestionMap = function (modelName, questionList) {
        var fieldMap = {}; //key值为字段名，value为字段详细
        var codeMap = {}; //模块>>code>>字段的映射 (模块名称>>{ key:code, value:问题详细})
        var codeCheckRuleMap = {}; //模块>>字段和被受控的校验规则映射    ： {模块名称>>key:字段code, value:checkRule对象(ruleCode,value:ruleObj)}
        var dynamicRuleCodeMap = {}; //模块>>动态校验名称和该字段Code的映射
        for (var index = 0; index < questionList.length; index++) {
            var question = questionList[index];
            var fieldName = question.fieldName;
            var code = question.code;
            var isDynamicCheck = question.isDynamicCheck;  //动态校验
            if ("1" == isDynamicCheck) {
                //动态校验
                var dynamicCheckRuleName = question.dynamicCheckRule;
                var checkRule = question.appDynamicCheckRule;
                if (checkRule && $.isArray(checkRule)) {
                    //当前字段控制哪些字段,转换为  被控字段对应的控制字段
                    for (var rIndex = 0; rIndex < checkRule.length; rIndex++) {
                        var rule = checkRule[rIndex];
                        var ruleCode = rule.code; //ruleCode表示该ruleCode被其他code控制
                        //被控字段
                        var controlChecks = codeCheckRuleMap[ruleCode];
                        if (!controlChecks) {
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
    };


    if (modelName && "" != modelName && questionList && $.isArray(questionList) && questionList.length > 0) {
        this.initQuestionMap(modelName, questionList);
    }
    ;

    /**
     * 是否空值
     */
    this.isBlankValue = function (value) {
        var result = false;
        if (null == value) {
            result = true;
        }
        else {
            var _type = typeof(value);
            switch (_type) {
                case "string":
                    if ("" == value.trim()) {
                        result = true;
                    }
                    break;
                case "number":
                    if ("" == value || value <= 0) {
                        result = true;
                    }
                    break;
                default:
                    break;
            }
        }
        return result;
    };

    /**
     * 提示框
     */
    this.showTips = function (modelName, field, message) {
        if (!modelName || !field || !message) {
            return;
        }
        var tip = $(".problem[modelname='" + modelName + "'] li[fieldname='" + field + "'] .left label[field='" + field + "']");
        if (tip.length > 0) {
            tip.remove();
        }
        var target = ".problem[modelname='" + modelName + "'] li[fieldname='" + field + "'] .left";
        var showHtml = "<label style='color:red; font-size:0.5rem;' field='" + field + "'>" + message + "</label>";
        $(showHtml).appendTo(target);
    };

    /**
     * 移除提示
     */
    this.removeTips = function (modelName, field) {
        var target = $(".problem[modelname='" + modelName + "'] li[fieldname='" + field + "'] .left label[field='" + field + "']");
        if (target.length > 0) {
            target.remove();
        }
    };

    /**
     * 获取正则对象
     */
    this.getRegExp = function (str) {
        return eval("/" + str + "/");
    };


    /**
     * 【内部方法】获取li下面的值
     * @param liDom li对象
     * @param inputType 输入类型
     */
    this._getValueByLijQdom = function (liDom, inputType) {
        var value = null;
        switch (inputType) {
            case "CODE":
                value = liDom.find(".right span").attr("name");
                if (undefined == value) {
                    value = liDom.find(".right input[type='radio']:checked").val();
                }
                break;
            case "TELEPHONE":
                //固话
                var inputs = liDom.find(".right input");
                var checkValue = "";
                for (var index = 0; index < inputs.length; index++) {
                    var inpuObj = inputs.eq(index);
                    checkValue = checkValue + inpuObj.val() + ",";
                }
                if (checkValue.length > 0) {
                    value = checkValue.substring(0, checkValue.length - 1);
                }
                break;
            case "ADDRESS":
                var guid = liDom.find(".right span").attr("guid");
                if (undefined == guid || null == guid) {
                    guid = "";
                }
                var extAddr = liDom.find(".x-address input").val();
                if (undefined == extAddr || null == extAddr) {
                    extAddr = ""
                }
                if ("" != extAddr) {
                    value = guid + '||' + extAddr;
                }
                else {
                    value = guid;
                }
                break;
            case "CHECKBOX":
                var spans = liDom.find(".right label.chenckboxNews img[src='img/jxt_icon.png']").siblings("span");
                var checkValue = "";
                for (var index = 0; index < spans.length; index++) {
                    var spanObj = spans.eq(index);
                    checkValue = checkValue + spanObj.attr("name") + ",";
                }
                if (checkValue.length > 0) {
                    value = checkValue.substring(0, checkValue.length - 1);
                }
                break;
            case "TEXTAREA":
                value = liDom.find(".right textarea").val();
                break;
            default:
                value = liDom.find(".right input").val();
                break;
        }

        return value;
    };


    /**
     * 获取li(jq对象)下的值
     * @param liObjs 模块的所有li
     * @param modelQuestions 模块的问题对象
     */
    this.getFieldValues = function (liObjs, modelQuestions) {
        var data = null;
        if (liObjs && liObjs.length > 0 && modelQuestions && $.isPlainObject(modelQuestions)) {
            data = {};
            for (var index = 0; index < liObjs.length; index++) {
                var jdom = liObjs.eq(index);
                var field = jdom.attr("fieldname");
                var question = modelQuestions[field];
                if (!question) {
                    console.info(field + " 问题字段不存在.");
                    continue;
                }
                var inputType = question.inputType; //类型
                var value = this._getValueByLijQdom(jdom, inputType);
                if (!value) {
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
     */
    this.checkFieldValuesAll = function (modelName, field, values) {
        //默认校验所有字段
        return this.checkFieldValues(modelName, field, values, true);
    };


    /**
     * 根据正则校验(内部调用)
     * @param jdom li的jq对象
     * @param modelName 模块
     * @param value 数据值
     * @param question 问题对象
     */
    this._checkByRegExpRule = function (jdom, modelName, value, question) {
        var fieldResult = true;
        var field = question.fieldName;
        var name = question.name;
        var inputType = question.inputType;
        //优选动态校验，若无动态校验，根据自身规则校验
        var code = question.code;
        //判断当前字段是否受其他字段控制校验规则
        var rule = this.getQuestionCodeCheckRuleMap(modelName, code);
        if (rule && $.isArray(rule) && rule.length > 0) {
            for (var rIndex = 0; rIndex < rule.length; rIndex++) {
                //当前字段所被控制的字段
                var ruleObj = rule[rIndex];
                var ctrlCode = ruleObj.code;
                var controlField = this.getQuestionCodeMap(modelName, ctrlCode);
                if (!controlField) {
                    console.info("当前字段code[" + code + "]校验规则受字段Code[" + ctrlCode + "]控制,但字段Code[" + ctrlCode + "]不存在");
                    continue;
                }
                var valueRegExp = ruleObj.key; //受控值 正则表达式
                if (this.isBlankValue(valueRegExp)) {
                    continue;
                }

                var _tarObj = $(".problem[modelname='" + modelName + "'] li[fieldname='" + controlField.fieldName + "']");
                var ctrlFieldValu = this._getValueByLijQdom(_tarObj, inputType);
                if (!ctrlFieldValu) {
                    ctrlFieldValu = "";
                }
                //前置条件>>控制字段的值满足条件
                if (this.getRegExp(valueRegExp).test(ctrlFieldValu)) {
                    //满足校验前置条件
                    var checkRuleRegExp = ruleObj.checkrule; //校验正则表达
                    if (this.isBlankValue(checkRuleRegExp)) {
                        continue;
                    }
                    //当前值校验
                    if (this.getRegExp(checkRuleRegExp).test(value)) {
                        this.removeTips(modelName, field);
                        console.info("字段：" + name + "  受控制字段[" + controlField.name + " ]值控制,正则校验>>>>>>通过");
                    }
                    else {
                        fieldResult = false;
                        console.info("字段：" + name + "  受控制字段[" + controlField.name + " ]值控制,正则校验>>>>>>【不通过】 表达式：" + checkRuleRegExp + " 数据：" + value);
                        //TODO 友好提示处理
                        this.showTips(modelName, field, "校验不通过");
                    }
                }
                else {
                    console.info("字段：" + name + "  受控制字段[" + controlField.name + " ]值控制,但控制字段值不满足正则【校验不生效】, 表达式：" + checkRuleRegExp + " 数据：" + ctrlFieldValu);
                }
            }
        }
        else {
            var regExp = question.regexRule; //正则表达式
            var regExpTips = question.regexRuleName; //正则表达式说明
            //正则匹配规则
            if (regExp && "" != regExp) {
                if (this.getRegExp(regExp).test(value)) {
                    console.info("字段：" + name + "  正则校验>>>>>>通过");
                    jdom.find(".left i").removeClass("unfinish").addClass("finish");
                    this.removeTips(modelName, field);
                }
                else {
                    fieldResult = false;
                    jdom.find(".left i").removeClass("finish").addClass("unfinish");
                    console.info("字段：" + name + "  正则校验>>>>>>【不通过】" + regExpTips + " 表达式：" + regExp + " 数据：" + value);
                    //TODO 友好提示处理
                    this.showTips(modelName, field, "校验不通过");
                }
            }
            else {
                console.info("字段：" + question.name + "  简易校验>>>>>>通过");
                jdom.find(".left i").removeClass("unfinish").addClass("finish");
                this.removeTips(modelName, field);
            }
        }
        return fieldResult;
    };

    /**
     * 获取所有模块的数据
     */
    this.getAllData = function () {
        var datas = {};
        var models = $("section .problem");
        for (var index = 0; index < models.length; index++) {
            var model = models.eq(index);
            var modelname = model.attr("modelname");
            var data = null;
            if (model.hasClass("table")) {
                data = this.getModelTableData(modelname);
            }
            else {
                data = this.getModelData(modelname);
            }
            datas[modelname] = data;
        }
        return datas;
    };

    /**
     * 获取table模块的数据
     * @param modelname 模块名称
     */
    this.getModelTableData = function (modelname) {
        var model = $(".problem[modelname='" + modelname + "']");
        var tableDatas = model.data(modelname);
        //当前选中的tab页
        var curTabIndex = model.find(".cy span.span_bg").attr("index");
        var currentData = this.getModelData(modelName);
        if (!tableDatas) {
            tableDatas = [];
            currentData["lineNo"] = 0;
            tableDatas.push(currentData);
        }
        else {
            var curKey = "tableIndex_" + curTabIndex;
            for (var key in tableDatas) {
                if (key == curKey) {
                    $.extend(tableDatas[key], currentData);
                }
                else if (key == curTabIndex) {
                    $.extend(tableDatas[key], currentData);
                }
            }
        }
        //处理行号
        this._handleTableLineNo(tableDatas);

        return tableDatas;
    };

    /**
     * 【内部调用】处理行号
     */
    this._handleTableLineNo = function (datas) {
        var maxLineNo = 0;
        //获取最大行号
        for (var index = 0; index < datas.length; datas++) {
            var data = datas[index];
            var lineNo = data["lineNo"];
            if (undefined == lineNo || null == lineNo || "" == lineNo) {
                continue;
            }
            lineNo = parseInt(lineNo);
            if (lineNo > maxLineNo) {
                maxLineNo = lineNo;
            }
        }

        //行号处理
        for (var index = 0; index < datas.length; index++) {
            var data = datas[index];
            var lineNo = data["lineNo"];
            if (null == lineNo || "" == lineNo) {
                ++maxLineNo;
                data["lineNo"] = lineNo;
            }
        }
    };

    /**
     * 获取模块的数据
     * @param modelName 模块名称
     */
    this.getModelData = function (modelName) {
        var questions = this.getQuestionFieldMaps(modelName);
        if (!questions) {
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
     * @param targetield 具体校验的某个字段,可传null,代表校验整个模块
     * @param isTabValue 布尔值
     * @param values 数据
     * @param checkAll 是否校验完所有字段，再返回结果  若为true，则校验所有字段返回结果，为false时，只要校验到一个为false时，立即返回false
     */
    this.checkFieldValues = function (modelName, targetField, values, checkAll) {
        var checkResult = true;
        var modelQuestions = this.getQuestionFieldMaps(modelName);
        if (!modelQuestions) {
            console.info(modelName + "模块问题数据不存在.");
            return false;
        }
        var target = ".problem[modelname='" + modelName + "'] li";
        if (targetField && "" != targetField) {
            target += "[fieldname='" + targetField + "']";
        }
        var liObjs = $(target);
        if (!values) {
            values = this.getFieldValues(liObjs, modelQuestions);
        }
        for (var index = 0; index < liObjs.length; index++) {
            var jdom = liObjs.eq(index);
            if (jdom.is(":hidden")) {
                console.info("忽略不可见字段");
                continue;
            }
            var field = jdom.attr("fieldname");
            var question = modelQuestions[field];
            if (!question) {
                console.info(field + " 问题字段不存在.");
                continue;
            }
            var isRequire = question.require; //是否必填
            var inputType = question.inputType; //类型
            var isDynamicCheck = question.isDynamicCheck;//是否动态校验。
            var value = values[field];
            var fieldResult = true;
            if (isRequire) {
                if (this.isBlankValue(value)) {
                    fieldResult = false;
                }
            }
            //当前字段简易校验通过
            if (fieldResult) {
                //正则校验
                fieldResult = this._checkByRegExpRule(jdom, modelName, value, question);
            }
            else {
                jdom.find(".left i").removeClass("finish").addClass("unfinish");
                console.info("字段：" + question.name + "  简易校验>>>>>>【不通过】");
                //TODO 友好提示处理
                this.showTips(modelName, field, "校验不通过");
            }

            //立即返回
            if (!fieldResult) {
                checkResult = false;
                if (!checkAll) {
                    break;
                }
            }
        }

        return checkResult;
    };
	
	    /**
     * 校验数据----------------------------------------------------------------------------------------自己调整table类型里的校验
     * @param modelName 模块名
     * @param targetield 具体校验的某个字段,可传null,代表校验整个模块
     * @param isTabValue 布尔值
     * @param values 数据
     * @param checkAll 是否校验完所有字段，再返回结果  若为true，则校验所有字段返回结果，为false时，只要校验到一个为false时，立即返回false
     */
        this.checkFieldValues_mine = function (modelName, targetField, values, checkAll) {
            var checkResult = true;
            var modelQuestions = this.getQuestionFieldMaps(modelName);
            /*if (!modelQuestions) {
                console.info(modelName + "模块问题数据不存在.");
                return false;
            }*/
            var target = ".problem[modelname='" + modelName + "'] ul.ul_wrap";
            /*if (targetField && "" != targetField) {
                target += "[fieldname='" + targetField + "']";
            }*/
            var liObjs = $(target);

/*            if (!values) {
                values = this.getFieldValues(liObjs, modelQuestions);
            }*/
            //alert(liObjs.length);
            for(var j=0;j<liObjs.length;j++){
                //取包裹ul下面的li
                var liObjs_li=liObjs.eq(j).children("li");
                for (var index = 0; index < liObjs_li.length; index++) {
                    var jdom = liObjs_li.eq(index);
                    if (jdom.is(":hidden")) {
                        console.info("忽略不可见字段");
                        continue;
                    }
                    var field = jdom.attr("fieldname");
                    var question = modelQuestions[field];
                    if (!question) {
                        console.info(field + " 问题字段不存在.");
                        continue;
                    }
                    var isRequire = question.require; //是否必填
                    var inputType = question.inputType; //类型
                    var isDynamicCheck = question.isDynamicCheck;//是否动态校验。
                    var value = values[field];
                    var fieldResult = true;
                    if (isRequire) {
                        if (this.isBlankValue(value)) {
                            fieldResult = false;
                        }
                    }
                    //当前字段简易校验通过
                    if (fieldResult) {
                        //正则校验
                        fieldResult = this._checkByRegExpRule(jdom, modelName, value, question);
                    }
                    else {
                        //jdom.find(".left i").removeClass("finish").addClass("unfinish");
                        //console.info("字段：" + question.name + "  简易校验>>>>>>【不通过】");
                        //TODO 友好提示处理
                        this.showTips_mine(modelName, field, "校验不通过");
                    }

                    //立即返回
                    if (!fieldResult) {
                        checkResult = false;
                        if (!checkAll) {
                            break;
                        }
                    }
                }
            }



            return checkResult;
        };
    /**
     * 提示框
     */
    this.showTips_mine = function (modelName, field, message) {
        if (!modelName || !field || !message) {
            return;
        }
        var tip_ul= $(".problem[modelname='" + modelName + "']").children("ul");
        for(var i=0;i<tip_ul.length;i++){
            var tip_li=tip_ul.eq(i).children("li[fieldname="+field+"]").children(".left label[field=");


        }

        var tip = $(".problem[modelname='" + modelName + "'] li[fieldname='" + field + "'] .left label[field='" + field + "']");
        if (tip.length > 0) {
            tip.remove();
        }
        var target = ".problem[modelname='" + modelName + "'] li[fieldname='" + field + "'] .left";
        var showHtml = "<label style='color:red; font-size:0.5rem;' field='" + field + "'>" + message + "</label>";
        $(showHtml).appendTo(target);
    };

    /**
     * 校验模块数据
     * @param modelName 模块名称
     * @param checkAll 是否校验所有字段
     */
    this.checkModel = function (modelName, checkAll) {
        return this.checkFieldValues(modelName, null, null, checkAll);
    };

    /**
     * 校验模块数据, 校验所有字段
     * @param modelName 模块名称
     */
    this.checkModelAll = function (modelName) {
        return this.checkModel(modelName, true);
    };

    /**
     * 校验模块某个字段
     * @param modelName 模块名称
     * @param field 字段名称
     */
    this.checkModelField = function (modelName, field) {
        return this.checkFieldValues(modelName, field, null);
    };

    /**
     * 校验单个模块所有tab
     * @param model 模块的jq对象
     */
    this.checkModelAllTable = function (model) {
        return this.checkModelTable(model, true);
    };

    /**
     * 校验单个模块table
     * @param model 模块的jq对象
     * @param checkAll 是否校验所有tab 否的话，只要校验到一个tab不通过时，立即返回false
     */
    this.checkModelTable = function (model, checkAll) {
        var result = true;
        var modelname = model.attr("modelname");
        var answerlimit = model.attr("answerlimit");
        var limitMin = model.attr("answerlimitmin");
        var values = model.data(modelname);
        if (!values) {
            console.info("【" + modelname + "】数据不存在");
            result = false;
            return result;
        }
        if (answerlimit != 0) {
            if (values.length > answerlimit) {
                result = false;
                console.info("模块" + modelname + " tab页数据量[" + values.length + "] 超过最大限制." + answerlimit)
                return result;
            }
        }
        if (limitMin != 0) {
            if (values.length < limitMin) {
                result = false;
                console.info("模块" + modelname + " tab页数据量[" + values.length + "] 低于最小限制." + limitMin)
                return result;
            }
        }
        var modelQuestions = this.getQuestionFieldMaps(modelname);
        if (!modelQuestions) {
            result = false;
            console.info(modelname + "模块问题数据不存在.");
            return result;
        }
        //获取当前tab数据
        var curTabValue = this.getFieldValues(model.find("li"), modelQuestions);
        var tabObjs = model.find(".cy");
        var curTabObj = tabObjs.find("span.span_bg");
        var tabIndex = curTabObj.attr("index");
        var curKey = "tableIndex_" + tabIndex; //TODO 此处需要统一
        for (var key in values) {
            console.info("模块【" + modelname + "】:开始校验tab：" + key);
            var tempResult = true;
            if (key == tabIndex) {
                //TODO 如果curKey 统一了,该if就不必要了
                tempResult = this.checkFieldValuesAll(modelname, null, curTabValue);
            }
            else if (key == curKey) {
                tempResult = this.checkFieldValuesAll(modelname, null, curTabValue);
            }
            else {
                tempResult = this.checkFieldValuesAll(modelname, null, values[key]);
            }
            console.info("模块【" + modelname + "】tab：" + key + ">>校验结果：" + tempResult);
            if (!tempResult) {
                result = false;
                var tIdx = key.substring(key.lastIndexOf("_") + 1);
                model.find(".cy span[index='" + tIdx + "']").removeClass("finish").addClass("unfinish");
                //不校验所有tab
                if (!checkAll) {
                    break;
                }
            }
        }

        return result;
    };

    /**
     * 校验所有
     * @param all 是否校验完所有模块,true校验完所有模块再返回结果,false只要有一个模块校验失败,立即返回false
     */
    this.checkAll = function (checkAll) {
        var result = true;
        var models = $("section .problem");
        for (var index = 0; index < models.length; index++) {
            var model = models.eq(index);
            var modelname = model.attr("modelname");
            var tempResult = true;
            console.info("校验模块 : " + modelname);
            if (model.hasClass("table")) {
                tempResult = this.checkModelAllTable(model);
            }
            else {
                tempResult = this.checkModelAll(modelname);
            }
            console.info("模块 : " + modelname + "校验结果>>" + tempResult);
            if (!tempResult) {
                result = false;
                if (!checkAll) {
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
    this.initAutoCheckTrigger = function () {
        var checker = this;
        //radio 不能用blur事件，应用change事件,用blur事件处理radio时,由于还没有数据,校验的还是旧radio值,存有问题
        //传入当前对象
        $(".problem li input[type!='radio']").blur(checker, function (even) {
            var _checker = even.data; //checker对象由参数传入进来------------------可以问下泽建，这里好像不用通过参数传进来，也可以放到外部的this?????
            var _this = $(this);
            var modelObj = _this.closest(".problem");
            var value = _this.val();
            var liObj = _this.closest("li");
            var modelName = modelObj.attr("modelname");
            if (modelName && "" != modelName) {
                var field = liObj.attr("fieldname");
                checker.checkModelField(modelName, field);
            }
        });

        $(".problem li textarea").blur(checker, function (even) {
            var _checker = even.data; //checker对象由参数传入进来
            var _this = $(this);
            var value = _this.val();
            var liObj = _this.closest("li");
            var modelObj = _this.closest(".problem");
            var modelName = modelObj.attr("modelname");
            if (modelName && "" != modelName) {
                var field = liObj.attr("fieldname");
                checker.checkModelField(modelName, field);
            }
        });

        $(".problem li input[type='radio']").change(checker, function (even) {
            var _checker = even.data; //checker对象由参数传入进来
            var _this = $(this);
            var liObj = _this.closest("li");
            var modelObj = liObj.closest(".problem");
            var modelName = modelObj.attr("modelname");
            if (modelName && "" != modelName) {
                var field = liObj.attr("fieldname");
                checker.checkModelField(modelName, field);
            }
        });
    };
};
