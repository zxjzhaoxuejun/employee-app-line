var du; //du为页面上第一个'.problem ul'
var num = 1; //table的一个变量
var sj = {}; //传回后台的数据json
var tsj = {}; //table的json{code:value}
var sos = {};
var _sc = [];
var osf = [];
var answerType; //判断这个页面是什么样的类型
var _tc = false; //mask弹窗变量，出现mask，_tc为true，关闭_tc为false，供安卓调用
var tf; //提交验证是否弹窗
var vCode; //动态显示的code
var _data; //后台传过来的json
function loadQuestion(json) { //页面生成方法
	var data = $.parseJSON(json.modelValue);
    if(json.id!=undefined){
        data["id"]=json.id;
    }else{
        data["id"]=null;
    };
    if(json.questionTableAnswerMap!=undefined){
        data["questionTableAnswerMap"]=json.questionTableAnswerMap;
    }else{
        data["questionTableAnswerMap"]=null;
    };
    if(json.value!=undefined){
        data["value"]=json.value;
    }else{
        data["value"]=null;
    };
    if(json.completeStatus!=undefined){
        data["completeStatus"]=json.completeStatus;
    }else{
        data["completeStatus"]=0;
    };
    _data = data; //把后台传过来的json赋值给_data
    console.log(data)
    //刚进来的时候先创建section放到body里面
    $("<section></section>").appendTo($("body"));
    if (data.questionTableList.length != 0) {
        var _idsp = data.questionTableList[0].code.split("."); //分割code
        var _id = ""; //给div设id
        for (var i = 0; i < _idsp.length; i++) {
            _id += _idsp[i]; //合并code
        }
        ;
    } else {
        var _idsp = data.code.split("."); //分割code
        var _id = ""; //给div设id
        for (var i = 0; i < _idsp.length; i++) {
            _id += _idsp[i]; //合并code
        }
        ;
    }
    var cp = $("<div modelname='question' class='problem' id='" + _id + "'><div class='pb'><p class='pp'>Q" + data.sortNo + "." + data.name + "</p></div><ul></ul></div>");
    if (data.photograph=='TRUE') {
        cp.append($("<img src='img/photo_icon.png'/ class='camera'>"));
    }
    ;
    $("section").append(cp);
    $(".camera").click(function () { //调用摄像头，安卓原生方法
        //TODO 摄像头
        AndroidJs.takePhoto();
    });

    if (data.answerType == "TABLE") { //TABLE类型
        du = center(data, _id); //执行center函数
        answerType = "TABLE";
    }
    ;
    if (data.answerType == "MULTIPLE") { //MULTIPLE类型
        du = center(data, _id); //执行center函数
        answerType = "MULTIPLE";
    }
    ;
    if (data.answerType == "ONLYTABLE") { //ONLYTABLE类型
        du = right(data, _id); //执行right函数
        answerType = "ONLYTABLE";
    }
    ;
    if (data.answerType == "CHECKBOXMULT") { //CHECKBOXMULT类型
        du = left(data, _id); //执行left函数
        answerType = "CHECKBOXMULT";
        du.parent().next(".show").children(".cy").hide();
        du.parent().next(".show").children("p").first().children(".add,.jian").hide();
    }
    ;
    if (data.answerType == "INPUTTABLE") { //INPUTTABLE类型
        du = inputTable(data, _id);
        answerType = "INPUTTABLE";
    }
    ;
    if (data.answerType == "INPUT") { //INPUT类型
        du = _input(data, _id);
        answerType = "INPUT";
    }
    if (data.isEnd) { //判断是否是最后一个(后台传过来的数据)
        $("#next p").text("确认");
    }
    if (data.answerType == "TABLE" || data.answerType == "ONLYTABLE" || data.answerType == "INPUTTABLE") { //table类型
        //判断所有页签是否为0;为0的话'.cy'整一行隐藏,加减也隐藏;为1的话,减号隐藏(不能再减);
        if (du.parent().next(".show").children(".cy").children("span").length == 0) {
            du.parent().next(".show").children(".cy").hide();
            du.parent().next(".show").children("p").first().children(".add,.jian").hide();
        } else if (du.parent().next(".show").children(".cy").children("span").length == 1) {
            du.parent().next(".show").children("p").first().children(".jian").hide();
        }
        //如果num等于最大的值,加号隐藏(不能加);
        if (num == data.answerLimit) {
            du.parent().next(".show").children("p").first().children(".add").hide();
        }
        //answerLimitMin如果为0可以无限加，如果不为0;就有最小值
        if (num > 1) {
            if (data.answerLimitMin != 0) {
                if (num > data.answerLimitMin) {
                    du.parent().next(".show").children("p").first().children(".jian").show();
                } else {
                    du.parent().next(".show").children("p").first().children(".jian").hide();
                }

            }
        }
    }
    //添加校验
    //黄泽建校验规则调用方法开始
    var _checked = [];
    var _chk = _data;
    _chk["fieldName"] = _data.code;
    _chk["inputType"] = _data.answerInput;
    _checked.push(_chk);
    h_zjChecked.initQuestionMap("question", _checked);
    h_zjChecked.initAutoCheckTrigger();
    //黄泽建校验规则调用方法结束
    
};

function center(v, _id) { //TABLE、Multiple类型;_id:给div设的id;v:大json;
    console.log(v)
    var du = $("#" + _id + " ul");
    $('<li fieldname="' + v.code + '"><div class="left"><span>*</span><i>' + v.shortName + '</i></div><div class="right"><span class="choose">请选择</span><img src="img/down_icon.png" class="select"/></div></li>').appendTo(du);
    du.find(".right").on("click", function () { //请选择
        var _li = v.codeDicList; //问题的答案
        maskMp(_li, $(this), v, _id, du); //遮罩层;_li:问题的答案;$(this):'.right';v:json数据;_id:div的id;du:du为页面上第一个'.problem ul';
    });
    //如果答案不为空
    if (v.value != null) {
        for (var i = 0; i < v.codeDicList.length; i++) { //循环答案数组
            if (v.codeDicList[i].code == v.value) { //判断code是否等于value值
                du.find(".choose").text(v.codeDicList[i].name);
                du.children().first().attr("_name", v.codeDicList[i].code);
                du.children().first().find(".right span").attr("name", v.codeDicList[i].code);
            }
        }
        du.find(".choose").css({
            'color': '#191919'
        }).parent().siblings(".left").children("i").css({
            'color': '#a09fa4'
        });
        if (v.questionTableAnswerMap == null || v.questionTableAnswerMap == "") { //判断后台是否有传答案过来
            if (v.isControlShow == 0) { //判断是否有动态控制
                _tb(du, v, _id); //du:du为页面上第一个'.problem ul';v:json数据;_id:div的id;
            } else {
                for (var i = 0; i < v.controlShowRuleList.length; i++) {
                    if (du.children().attr("_name") != undefined) {
                        if (du.children().attr("_name").match(v.controlShowRuleList[i].key)) {
                            vCode = v.controlShowRuleList[i].code; //是否动态显示的问题
                            if ($(".show").length == 0) { //判断是否有'.show'
                                num = 1;
                                tsj = {};
                                _tb(du, v, _id, vCode); //du:du为页面上第一个'.problem ul';v:json数据;_id:div的id;vCode:显示的code名;
                            }
                        }
                    }
                }
            }
        }
    }
    if (v.questionTableAnswerMap != null && v.value != null) { //判断后台是否有传答案数据过来
        //_tb(du,v,_id);//执行table创建函数
        if (v.isControlShow == 0) { //判断是否有动态控制
            _tb(du, v, _id); //du:du为页面上第一个'.problem ul';
        } else {
            for (var i = 0; i < v.controlShowRuleList.length; i++) {
                if (du.children().attr("_name") != undefined) {
                    if (du.children().attr("_name").match(v.controlShowRuleList[i].key)) {
                        vCode = v.controlShowRuleList[i].code; //是否动态显示的问题
                        if ($(".show").length == 0) {
                            num = 1;
                            tsj = {};
                            _tb(du, v, _id, vCode); //du:du为页面上第一个'.problem ul';
                        }
                    }
                }
            }
        }
    } else { //如果后台没有传答案数据过来正常创建

    }
    return du; //把du传出去
};

function right(c, _id) { //ONLYTABLE类型;_id:给div设的id;c:大json;
    var du = $("#" + _id + " ul");
    _tb(du, c, _id); ////du:du为页面上第一个'.problem ul';v:json数据;_id:div的id;
    console.log(c)
    return du;
};

function inputTable(v, _id) { //INPUTTABLE类型;_id:给div设的id;v:大json;
    var du = $("#" + _id + " ul");
    _ipt(v, du, _id); //du:du为页面上第一个'.problem ul';v:json数据;_id:div的id;vCode:
    if (v.value != null) { //如果答案不为空
        du.children("li").first().find("input").val(v.value);
        if (v.questionTableAnswerMap == null || v.questionTableAnswerMap == "") {
            if (v.isControlShow == 0) { //判断是否有动态控制
                _tb(du, v, _id); //du:du为页面上第一个'.problem ul';v:json数据;_id:div的id;
            } else {
                for (var i = 0; i < v.controlShowRuleList.length; i++) { //循环控制规则
                    if (du.find(".right input").val().match(v.controlShowRuleList[i].key)) { //正则匹配
                        vCode = v.controlShowRuleList[i].code; //是否动态显示的问题
                        if ($(".show").length == 0) { //假如'.show的长度为0的话'
                            num = 1;
                            tsj = {}; //table数据滞空
                            _tb(du, v, _id, vCode); //du:du为页面上第一个'.problem ul';v:json数据;_id:div的id;vCode:显示的code名;
                        }
                    }
                }
                var d_u = du.parents("section").find(".show ul");
                for (var i = 0; i < d_u.children().length; i++) { //循环li
                    for (var j = 0; j < v.questionTableList.length; j++) { //循环json问题
                        if (d_u.children().eq(i).attr("data") == v.questionTableList[j].code) { //判断li的code名和问题的code名是否相等
                            if (v.questionTableList[j].isControlShow == 1) { //判断问题的受控制字段为0并且控制动态的值为1
                                if (v.questionTableList[j].codeDicList.length > 2) {
                                    if (d_u.children().eq(i).is(":visible")) { //判断li是否显示
                                        var cr = d_u.children().eq(i).attr("_name"); //li的属性_name
                                        var appCr = v.questionTableList[j].controlShowRuleList; //动态控制的规则
                                        $(appCr).each(function () { //循环动态控制规则的数组
                                            var appCd = $(this)[0].code;
                                            d_u.children().each(function () { //循环li
                                                for (var p = 0; p < appCd.length; p++) {
                                                    if ($(this).attr("data") == appCd[p]) { //判断li的code和控制的code是否相等
                                                        $(this).hide(); //li显示
                                                    }
                                                }

                                            })
                                        })
                                        $(appCr).each(function () { //循环动态控制规则的数组
                                            if (regular($(this)[0].key).test(cr)) { //正则匹配
                                                for (var u = 0; u < $(this)[0].code.length; u++) { //循环控制的code
                                                    var cu = $(this)[0].code[u];
                                                    d_u.children().each(function () { //循环li
                                                        if ($(this).attr("data") == cu) { //判断li的code和控制的code是否相等
                                                            $(this).show(); //li显示
                                                        }
                                                    })
                                                }
                                            }
                                        })
                                    }
                                    ;
                                } else if (v.questionTableList[j].codeDicList.length == 2) {
                                    if (d_u.children().eq(i).is(":visible")) { //判断li是否显示
                                        d_u.children().eq(i).find('input').each(function () {
                                            if ($(this).prop("checked")) {
                                                var cr = $(this).val(); //li的属性_name
                                                var appCr = v.questionTableList[j].controlShowRuleList; //动态控制的规则
                                                $(appCr).each(function () { //循环动态控制规则的数组
                                                    var appCd = $(this)[0].code;
                                                    d_u.children().each(function () { //循环li
                                                        for (var p = 0; p < appCd.length; p++) {
                                                            if ($(this).attr("data") == appCd[p]) { //判断li的code和控制的code是否相等
                                                                $(this).hide(); //li显示
                                                            }
                                                        }

                                                    })
                                                })
                                                $(appCr).each(function () { //循环动态控制规则的数组
                                                    if (regular($(this)[0].key).test(cr)) { //正则匹配
                                                        for (var u = 0; u < $(this)[0].code.length; u++) { //循环控制的code
                                                            var cu = $(this)[0].code[u];
                                                            d_u.children().each(function () { //循环li
                                                                if ($(this).attr("data") == cu) { //判断li的code和控制的code是否相等
                                                                    $(this).show(); //li显示
                                                                }
                                                            })
                                                        }
                                                    }
                                                })
                                            }
                                        })
                                    }
                                    ;
                                }
                            }
                        }
                    }
                }

            }
        }
    } else {
        if (v.isControlShow == 0) { //判断是否有动态控制
            _tb(du, v, _id); //du:du为页面上第一个'.problem ul';v:json数据;_id:div的id;
        }
    }
    if (v.questionTableAnswerMap != null && v.value != null) { //判断后台是否有传答案数据过来
        if (v.controlShowRuleList != null && v.controlShowRuleList.length != 0) {
            for (var i = 0; i < v.controlShowRuleList.length; i++) {
                if (v.value != undefined) {
                    if (v.value.match(v.controlShowRuleList[i].key)) {
                        vCode = v.controlShowRuleList[i].code; //是否动态显示的问题
                        if ($(".show").length == 0) { //判断是否有'.show'
                            num = 1;
                            tsj = {};
                            _tb(du, v, _id, vCode); //du:du为页面上第一个'.problem ul';v:json数据;_id:div的id;vCode:显示的code名;
                        }
                    }
                }
            }
            du.children("li").first().find(".left i").css({
                'color': '#a09fa4'
            });
        } else {
            if (v.isControlShow == 0) { //判断是否有动态控制
                _tb(du, v, _id); //du:du为页面上第一个'.problem ul';v:json数据;_id:div的id;
            }
        }
        //		_tb(du, v, _id); //执行table创建函数
    } else { //如果后台没有传答案数据过来正常创建
        if (v.isControlShow == 0) { //判断是否有动态控制
            _tb(du, v, _id); //du:du为页面上第一个'.problem ul';v:json数据;_id:div的id;
        }
    }
    if (v.controlShowRuleList != null) { //判断是否有动态控制
        for (var i = 0; i < v.controlShowRuleList.length; i++) { //
            var _test = regular(v.controlShowRuleList[i].key);
            if (_test.test(v.value)) {
                $(".show").show()
            } else {
                $(".show").hide()
            }
        }
    }
    return du;
};

function _ipt(cqt, du, _id) { //INPUTTABLE;_id:给div设的id;cqt:大json;du:du为页面上第一个'.problem ul';
    var _iptli;
    var isModification='';//是否能修改
    if(cqt.sourceType=='1'){//1,能改，2不能改
    	sModification='style="background:#fff"';
    }else if(cqt.sourceType=='2'){
    	sModification='disabled="disabled" style="background:#f8f8f8"';
    }else{
    	sModification='style="background:#fff"';
    }
    var _cut = cqt.inputUnit; //单位
    if (_cut == null) {
        _cut = "";
    }
    if (cqt.answerInput == "STRING") { //文本;type='text'
        _iptli = $('<li fieldName="' + cqt.code + '" invesT="' + cqt.isLabel + '" require="' + cqt.require + '" data="' + cqt.code + '" checkMark="' + cqt.checkMark + '" limitLength="' + cqt.limitLength + '"><div class="left"><span>*</span><i title="' + cqt.name + '">' + cqt.name + '</i></div><div class="right"><input type="text" '+sModification+' placeholder="请输入' + cqt.name + '"/><b class="yuan">' + _cut + '</b></div></li>')
    }
    ;
    if (cqt.answerInput == "DATE") { //日期
        var _al = cqt.code.split(","); //给div设id
        var _idv = cqt.code.replace(/\./g, "-"); //分割code
        var dateID = 'date' + _idv;
        _iptli = $('<li fieldName="' + cqt.code + '" invesT="' + cqt.isLabel + '" require="' + cqt.require + '" data="' + cqt.code + '" checkMark="' + cqt.checkMark + '" limitLength="' + cqt.limitLength + '"><div class="left"><span>*</span><i title="' + cqt.name + '">' + cqt.name + '</i></div><div class="right"><input '+sModification+' id="' + dateID + '" type="text" readonly name="input_date" placeholder="日期选择" data-lcalendar="1916-01-11,2116-05-29"/></div></li>');

    }
    ;
    if (cqt.answerInput == "INTEGER") { //整数;type='tel'
        _iptli = $('<li fieldName="' + cqt.code + '" invesT="' + cqt.isLabel + '" require="' + cqt.require + '" data="' + cqt.code + '" checkMark="' + cqt.checkMark + '" limitLength="' + cqt.limitLength + '"><div class="left"><span>*</span><i title="' + cqt.name + '">' + cqt.name + '</i></div><div class="right"><input '+sModification+' astype="integer" type="number" placeholder="请输入' + cqt.name + '"/><b class="yuan">' + _cut + '</b></div></li>');
    }
    ;
    if (cqt.answerInput == "DOUBLE") { //小数;type='number'
        _iptli = $('<li fieldName="' + cqt.code + '" invesT="' + cqt.isLabel + '" require="' + cqt.require + '" data="' + cqt.code + '" checkMark="' + cqt.checkMark + '" limitLength="' + cqt.limitLength + '"><div class="left"><span>*</span><i title="' + cqt.name + '">' + cqt.name + '</i></div><div class="right"><input '+sModification+' type="number" placeholder="请输入' + cqt.name + '"/><b class="yuan">' + _cut + '</b></div></li>');
    }
    ;
    if (cqt.answerInput == "TELEPHONE") { //电话;type='number'
        _iptli = $('<li invesT="' + cqt.isLabel + '" require="' + cqt.require + '" data="' + cqt.code + '" checkMark="' + cqt.checkMark + '" limitLength="' + cqt.limitLength + '"><div class="left"><span>*</span><i title="' + cqt.name + '">' + cqt.name + '</i></div><div class="right phone"><input type="number" '+sModification+' placeholder="区号"/><b>-</b><input type="number" placeholder="电话号码"/><b>-</b><input '+sModification+' type="number" placeholder="分机号"/></div></li>');
    }
    if (cqt.answerInput == "ADDRESS") { //省市区加详细地址
        _iptli = $('<li invesT="' + cqt.isLabel + '"  class="address" isDynamicShow="' + cqt.isDynamicShow + '" name="' + cqt.fieldName + '" require="' + cqt.require + '" data="' + cqt.code + '" inputtype="' + cqt.inputType + '"><div class="left"><span>*</span><i title="' + cqt.name + '">' + cqt.name + '</i></div><div id="' + _idv + '" class="right"  onclick="adree(this.id)"><span class="choose" cdxq="dzxq">请选择</span><img src="img/down_icon.png" class="select"/></div><div class="x-address"><p><span>&nbsp;&nbsp;</span><i>详细地址</i></p><p><input type="text" placeholder="请输入详细地址" /></p></div></li>').appendTo(du);
    }
    if (cqt.answerInput == "SSQADDRESS") { //只有省市区地址
        _iptli = $('<li invesT="' + cqt.isLabel + '"  isDynamicShow="' + cqt.isDynamicShow + '" name="' + cqt.fieldName + '" require="' + cqt.require + '" data="' + cqt.code + '" inputtype="' + cqt.inputType + '"><div class="left"><span>*</span><i title="' + cqt.name + '">' + cqt.name + '</i></div><div id="' + _idv + '" class="right"  onclick="adree(this.id)"><span class="choose" cdz="dz">请选择</span><img src="img/down_icon.png" class="select"/></div></li>').appendTo(du);
    }
    if (_iptli != undefined) {
        if (!cqt.require) { //require:是否必填,data:问题code,checkMark:校验类型,limitLength:文本长度
            _iptli.find(".left span").html("&nbsp;&nbsp;");
        }
        _iptli.appendTo(du);
    }
    if (cqt.answerInput == "DATE") {
        var calendar = new lCalendar();
        calendar.init({
            'trigger': '#' + dateID,
            'type': 'date'
        });
    }
    du.find("input").on("keyup keypress keydown blur", function () {
        vCode = [];
        if (cqt.isControlShow == 0) { //判断是否控制动态显示
            if ($(".show").length == 0) {
                num = 1;
                tsj = {};
                _tb(du, cqt, _id);
            }
            ;
        } else {
            for (var i = 0; i < cqt.controlShowRuleList.length; i++) {
                var _test = regular(cqt.controlShowRuleList[i].key);
                if (_test.test($(this).val())) {
                    vCode = cqt.controlShowRuleList[i].code; //是否动态显示的问题
                    if ($(".show").length == 0) {
                        num = 1;
                        tsj = {};
                        _tb(du, cqt, _id, vCode);
                    }
                }
            }
            var _cdl = 0;
            for (_cdl; _cdl < vCode.length; _cdl++) {

            }
            if (_cdl == 0) {
                $(".show").remove();
            }
        }
        if (du.parent().next(".show").find(".cy span").length == 0) {
            du.parent().next(".show").children(".cy").hide();
            du.parent().next(".show").children("p").first().children(".add,.jian").hide();
        } else if (du.parent().next(".show").find(".cy span").length == 1) {
            du.parent().next(".show").children("p").first().children(".jian").hide();
        }
        if (num == _data.answerLimit) {
            du.parent().next(".show").children("p").first().children(".add").hide();
        }
        if (num > 1) {
            du.parent().next(".show").children("p").first().children(".jian").show();
        }
        if (du.find("input").val() == "") {
            du.children("li").first().find(".left i").css({
                "color": "#191919"
            });
        } else {
            du.children("li").first().find(".left i").css({
                "color": "#a09fa4"
            });
        }
    })
}

function left(d, _id) { //CHECKBOXMULT类型;_id:给div设的id;cqt:大json;
    if (d.questionTableAnswerMap != null) { //判断后台是否有传答案数据过来
        var du = $("#" + _id + " ul");
        c_hockbox(d, du);

        if (d.isControlShow == 0) {
            _tb(du, d, _id);
        }
        if (d.value != null) {
            var t_v = d.value.split(",");
            for (var k = 0; k < du.children().first("li").find(".chenckbox label").length; k++) {
                for (var l = 0; l < t_v.length; l++) {
                    if (du.children().first("li").find(".chenckbox label").eq(k).children("span").attr("name") == t_v[l]) {
                        du.children().first("li").find(".chenckbox label").eq(k).children("input").attr("checked", true);
                        du.children().first("li").find(".chenckbox label").eq(k).children("img").attr("src", "img/jxt_icon.png");
                        du.children().first("li").find(".chenckbox label").eq(k).children('span').css('color', '#191919');
                    }
                }
            }
        }

        _tb(du, d, _id); //执行table创建函数

    } else { //如果后台没有传答案数据过来正常创建
        var du = $("#" + _id + " ul");
        c_hockbox(d, du)
        if (d.isControlShow == 0) {
            _tb(du, d, _id);
        }
    }
    var s_tring = AndroidJs.getCheckMultiValue(d.investigateModelCode, d.code);
    if (s_tring != "" && s_tring != null) {
        var st_array = s_tring.split(",");
        for (var i = 0; i < du.children("li").first().find("label").length; i++) {
            for (var j = 0; j < st_array.length; j++) {
                if (du.children("li").first().find("label").eq(i).find("span").attr("name") == st_array[j]) {
                    du.children("li").first().find("label").eq(i).css("position", "relative");
                    du.children("li").first().find(".chenckboxNews").eq(i).children("input").attr("disabled", "true")
                    du.children("li").first().find(".chenckboxNews").eq(i).unbind("click");
                    $("<div></div>").css({
                        "width": "0.38rem",
                        "height": "0.38rem",
                        "position": "absolute",
                        "top": "0.53rem",
                        "left": "0.36rem",
                        "opacity": "0.4",
                        "background": "black",
                    }).appendTo(du.children("li").first().find(".chenckboxNews").eq(i))
                }
            }
        }
    }
    return du;
}

function c_hockbox(cqt, du) { //CHECKBOXMULT;cqt:大json;du:du为页面上第一个'.problem ul';
    var html = "";
    var _cn = "";
    for (var h = 0; h < cqt.codeDicList.length; h++) {
        _cn += cqt.codeDicList[h].code + ":" + cqt.codeDicList[h].name + ","
        html += '<label class="chenckboxNews">' +
            '<input type="checkbox" style="display:none"/>' +
            '<img src="img/jx_icon.png">' +
            '<span " name="' + cqt.codeDicList[h].code + '">' + cqt.codeDicList[h].name + '</span>' +
            '</label>';
    }
    var c_n = _cn.substring(0, _cn.length - 1);
    $('<li invesT="' + cqt.isLabel + '" _cn="' + c_n + '" _cb="' + cqt.type + ' code="' + cqt.code + '" isDynamicShow="' + cqt.isDynamicShow + '" " data="' + cqt.code + '" ><div class="r_t chenckbox nlh" >' + html + '</div></li>').appendTo(du);
    $(".chenckbox").find("span").css({
        "color": "#a0a0a5"
    });
}

function _input(v, _id) { //INPUT;v:大json;
    var _iptli;
    var du = $("#" + _id).children("ul");
    var _cut = v.inputUnit;
    if (_cut == null) { //单位
        _cut = "";
    }
    var isModification='';//是否能修改
    if(v.sourceType=='1'){//1,能改，2不能改
    	sModification='style="background:#fff"';
    }else if(v.sourceType=='2'){
    	sModification='disabled="disabled" style="background:#f8f8f8"';
    }else{
    	sModification='style="background:#fff"';
    }
    if (v.answerInput == "INTEGER") { //整数;type='tel'
        _iptli = $('<li invesT="' + v.isLabel + '" require="' + v.require + '" data="' + v.code + '" checkMark="' + v.checkMark + '" limitLength="' + v.limitLength + '"><div class="left"><span>*</span><i title="' + v.shortName + '">' + v.shortName + '</i></div><div class="right"><input '+sModification+' astype="integer" type="number" placeholder="请输入' + v.shortName + '" /><b class="yuan">' + _cut + '</b></div></li>');
    }
    ;

    if (v.answerInput == "DOUBLE") { //小数;type='number'
        _iptli = $('<li invesT="' + v.isLabel + '" require="' + v.require + '" data="' + v.code + '" checkMark="' + v.checkMark + '" limitLength="' + v.limitLength + '"><div class="left"><span>*</span><i title="' + v.shortName + '">' + v.shortName + '</i></div><div class="right"><input '+sModification+' type="number" placeholder="请输入' + v.shortName + '" /><b class="yuan">' + _cut + '</b></div></li>');
    }
    ;
    if (v.answerInput == "STRING") { //文本;type='text'
        _iptli = $('<li invesT="' + v.isLabel + '" require="' + v.require + '" data="' + v.code + '" checkMark="' + v.checkMark + '" limitLength="' + v.limitLength + '"><div class="left"><span>*</span><i title="' + v.shortName + '">' + v.shortName + '</i></div><div class="right"><input '+sModification+' type="text" placeholder="请输入' + v.shortName + '" /><b class="yuan"></b>' + _cut + '</div></li>')
    }
    ;
    if (v.answerInput == "TEXTAREA") {
        _iptli = $('<li class="textareaStyle" invesT="' + v.isLabel + '" require="' + v.require + '" data="' + v.code + '" checkMark="' + v.checkMark + '" limitLength="' + v.limitLength + '">' +
            '<div class="left">' +
            '<span>*</span>' +
            '<i>' + v.name + '</i>' +
            '</div>' +
            '<div class="textCons right">' +
            '<textarea '+sModification+'></textarea>' +
            '</div>' +
            '</li>');
    }
    if (_iptli != undefined) {
        if (!v.require) { //require:是否必填,data:问题code,checkMark:校验类型,limitLength:文本长度
            _iptli.find(".left span").html("&nbsp;&nbsp;");
        }
        _iptli.appendTo(du);
    }
    if (v.value != null && v.value != "") {
        if (du.children().first().find("input").length == 1) {
            du.children().first().find("input").val(v.value);
        } else {
            du.children().first().find(".textCons textarea").val(v.value);
        }

    }
    du.children().first().attr("fieldName", v.code);
    var _checked = [];
    var _chk = _data;
    _chk["fieldName"] = v.code;
    _chk["inputType"] = v.answerInput;
    _checked.push(_chk);
    console.log(_checked)
    h_zjChecked.initQuestionMap("question", _checked);
    h_zjChecked.initAutoCheckTrigger();
    return du;
}

var h_zjChecked = new QestionRegChecker(); //校验

function maskMp(that, _this, v, _id, du) { //Multiple类型遮罩层that:问题的答案,_this:第一个问题的span,v:大json,du:_id下面的ul;_id:code拼接字符串,
    $('<div id="mask"><div class="mask_bg"></div><ul><div class="m_div"></div><li class="cancel">取消</li></ul></div>').appendTo("body");
    if (that == null) { //判断传过来的答案是否为空
        $(".cancel").before($('<li>1</li><li>2</li><li>3</li><li>4</li><li class="linone">5</li>'));
    } else {
        for (var i = 0; i < that.length; i++) {
            $(".m_div").append($("<li _name='" + that[i].code + "'>" + that[i].name + "</li>")) //把问题li添加到页面上
        }
    }
    _tc = true; //安卓变量
    $("#mask li").on("click", function () {
        console.log(tsj)
        _tc = false; //安卓变量
        $("#mask").remove();
        if ($(this).html() != "取消") {
            vCode = {}; //用于存放动态显示的code;
            if ($(this).attr("_name") != _this.children().attr("name")) {
                _this.children().attr("isChange", "1")
            } else {
                _this.children().attr("isChange", "0");
            }
            _this.children().attr("name", $(this).attr("_name")); //把选中的值赋给span
            _this.parent().attr("_name", $(this).attr("_name")); //把选中的值赋给li
            _this.children("span").html($(this).html()).css({
                "color": "#191919"
            });
            _this.siblings(".left").children("i").css({
                "color": "#a09fa4"
            });
            if (v.isControlShow == 0) { //判断是否有动态控制
                if ($(".show").length == 0) { //判断页面上是否有'.show'
                    num = 1;
                    tsj = {}; //把table数据滞空
                    _tb(du, v, _id); //执行_tb函数;du:_id下面的ul;v:大json;
                    if (du.parent().next(".show").find(".cy span").length == 0) { //判断页签长度为0的话
                        du.parent().next(".show").children(".cy").hide(); //整个'.cy'隐藏
                        du.parent().next(".show").children("p").first().children(".add,.jian").hide(); //加减号也隐藏
                    } else if (du.parent().next(".show").find(".cy span").length == 1) { //页签长度为1的话
                        du.parent().next(".show").children("p").first().children(".jian").hide(); //减号隐藏
                    }
                    if (num == _data.answerLimit) { //判断num等于json的限制长度
                        du.parent().next(".show").children("p").first().children(".add").hide(); //加号隐藏
                    }
                    if (num > 1) { //判断num大于1的时候,减号显示
                        du.parent().next(".show").children("p").first().children(".jian").show();
                    }
                }
            } else { //有动态显示
                if (_this.children().attr("isChange") != 0) {
                    for (var i = 0; i < v.controlShowRuleList.length; i++) { //循环动态规则的数组
                        if ($(this).attr("_name").match(v.controlShowRuleList[i].key)) { //判断所选的guid和动态规则的正则是否匹配
                            vCode = v.controlShowRuleList[i].code; //是否动态显示的问题
                            if ($(".show").length == 0) { //判断页面上是否有'.show'
                                num = 1;
                                tsj = {}; //把table数据滞空
                                _tb(du, v, _id, vCode); //执行_tb函数;du:_id下面的ul;v:大json;_id:code拼接字符串;vCode:动态显示的code
                                if (du.parent().next(".show").find(".cy span").length == 0) { //判断页签长度为0的话
                                    du.parent().next(".show").children(".cy").hide(); //整个'.cy'隐藏
                                    du.parent().next(".show").children("p").first().children(".add,.jian").hide(); //加减号也隐藏
                                } else if (du.parent().next(".show").find(".cy span").length == 1) { //页签长度为1的话
                                    du.parent().next(".show").children("p").first().children(".jian").hide(); //减号隐藏
                                }
                                if (num == _data.answerLimit) { //判断num等于json的限制长度
                                    du.parent().next(".show").children("p").first().children(".add").hide(); //加号隐藏
                                }
                                if (num > 1) { //判断num大于1的时候,减号显示
                                    du.parent().next(".show").children("p").first().children(".jian").show();
                                }
                            } else if ($(".show").length == 1) { //判断页面上是否有'.show'
                                $(".show ul li").hide(); //有的话把所有li隐藏
                                $(".show ul li").each(function () { //循环所有li
                                    var data = $(this).attr("data"); //li里面的属性data(code)
                                    var _this = $(this); //每个li
                                    for (var i = 0; i < vCode.length; i++) { //循环受控制的code名
                                        if (vCode[i] == data) { //判断code与data是否相等
                                            _this.show() //相等的话li显示
                                        }
                                    }
                                })
                            }
                        }
                    }
                    var _cdl = 0; //用于判断动态控制的数组是否为空
                    for (_cdl; _cdl < vCode.length; _cdl++) {

                    }
                    if (_cdl == 0) { //为空的话,'.show'删除
                        $(".show").remove();
                        tsj = {};
                    }
                }

            }
        }
    });
    if (du.find(".right span").text() == "请选择") {
        du.children("li").first().find(".left i").css({
            "color": "#191919"
        });
    } else {
        du.children("li").first().find(".left i").css({
            "color": "#a09fa4"
        });
    }
}

function _tb(id, b, _id, vCode) { //id(du):_id下面的ul,b:大json,_id:code拼接字符串,vCode:动态显示的问题;
    //	var invesT;//必填的name
    //	for(var i=0;i<b.questionTableList.length;i++){
    //		if(b.questionTableList[i].isLabel==1){
    //			invesT=b.questionTableList[i].name;
    //		}
    //	}
    if (b.questionTableAnswerMap != null) { //判断json有没有传答案过来，没有则为null
        $('<div class="problem show" modelname="questionShow"><p>请完善' + b.shortName + '<img src="img/add_icon.png"/ class="add"><img src="img/jian_icon.png" class="jian"/></p><div class="cy"></div><ul></ul></div>').insertAfter(id.parent());
        var _cde; //isLabel为1的code名
        var c_e = null; //用于判断是否有isLabel为1的问题
        for (var i = 0; i < b.questionTableList.length; i++) { //循环json里面的所有问题
            if (b.questionTableList[i].isLabel == 1) { //有isLabel为1的话;给_cde,c_e赋值
                _cde = b.questionTableList[i].code;
                c_e = 1;
            }
        }
        num = 0; //先把num设为0
        for (var i in b.questionTableAnswerMap) { //循环答案的对象
            tsj[i] = []; //把数据转到tsj里面,i为第i个
            for (var j = 0; j < b.questionTableAnswerMap[i].length; j++) {
                var t_sq = {}; //设置一个对象，给数组赋值
                t_sq["investigateTableCode"] = b.questionTableAnswerMap[i][j].investigateTableCode; //答案所相对应的code名
                t_sq["id"] = b.questionTableAnswerMap[i][j].id; //答案所相对应的id名
                t_sq["value"] = b.questionTableAnswerMap[i][j].value; //答案所相对应的vale值
                t_sq["lineNo"] = b.questionTableAnswerMap[i][j].lineNo; //答案所相对应的那一列
                t_sq["source"] = b.questionTableAnswerMap[i][j].source; //答案所相对应的那一列
                tsj[i].push(t_sq); //把对象推到tsj里面
            }
            num++; //num++;
        }
        var du = $("#" + _id).next().children("ul");
        var _once = true; //once为true的话不执行
        create(b, _id, du, _once); //du:_id下面的ul;b:大json;_id下面的ul;_once:只执行一次,把第一列数据展示到页面上
        for (var i in tsj) { //循环tsj里面的数据;添加页签
            if (c_e == null) { //判断是否没有isLabel为1的问题
                $('<span>页签</span>').appendTo(id.parent().siblings(".show").children(".cy"))
            }
            var s_li = id.parent().next(".show").children("ul").children(); //'.show li'
            for (var j = 0; j < tsj[i].length; j++) { //循环tsj[i]里面的数组
                if (tsj[i][j]["investigateTableCode"] == _cde) { //判断code名和isLabel为1的问题code名是否相等
                    for (k = 0; k < s_li.length; k++) { //循环'.shou li'
                        if (s_li.eq(k).attr("data") == _cde) { //判断li里面的code和isLabel为1的问题code名是否相等
                            if (s_li.eq(k).find(".right span").length == 1) { //判断类型,span类型
                                if (tsj[i][j]["value"] == null) { //如果value值为空的话
                                    $('<span>页签</span>').appendTo(id.parent().siblings(".show").children(".cy"))
                                } else { //不为空的话
                                    var t_n = s_li.eq(k).attr("_tn").split(","); //_tn里面有所有的gudi所对应的中文，以逗号截取
                                    for (var l = 0; l < t_n.length; l++) { //循环截取的数组
                                        if (t_n[l].substring(0, t_n[l].indexOf(":")) == tsj[i][j]["value"]) { //判断guid和value是否相等
                                            if (t_n[l].substring(t_n[l].indexOf(":") + 1).length > 4) { //判断中文长度是否大于4,大于4就截取前4位
                                                $('<span data-source="'+tsj[i][j]["source"]+'">' + t_n[l].substring(t_n[l].indexOf(":") + 1).substr(0, 4) + '</span>').appendTo(id.parent().siblings(".show").children(".cy"))
                                            } else {
                                                $('<span data-source="'+tsj[i][j]["source"]+'">' + t_n[l].substring(t_n[l].indexOf(":") + 1) + '</span>').appendTo(id.parent().siblings(".show").children(".cy"))
                                            }

                                        }
                                    }
                                }
                            } else if (s_li.eq(k).find(".right input").length == 1) { //input类型
                                if (tsj[i][j]["value"] == null) { //如果value值为空的话
                                    $('<span>页签</span>').appendTo(id.parent().siblings(".show").children(".cy"))
                                } else {
                                    if (tsj[i][j]["value"].length > 4) { //判断value值的长度大于4的时候截取前4位
                                        $('<span>' + tsj[i][j]["value"].substr(0, 4) + '</span>').appendTo(id.parent().siblings(".show").children(".cy"))
                                    } else {
                                        $('<span>' + tsj[i][j]["value"] + '</span>').appendTo(id.parent().siblings(".show").children(".cy"))
                                    }

                                }
                            } else if (s_li.eq(k).children(".right").hasClass("chenckbox")) { //checkbox类型(多选)
                                if (tsj[i][j]["value"] == null) { //如果value值为空的话
                                    $('<span>页签</span>').appendTo(id.parent().siblings(".show").children(".cy"))
                                } else {
                                    var t_n = s_li.eq(k).attr("_cn").split(","); //_cn存的是所有多选的guid和中文,以逗号截取
                                    var t_v = ""; //多选的中文
                                    var t_m = tsj[i][j]["value"].split(","); //以逗号截取value
                                    for (var l = 0; l < t_n.length; l++) { //循环_cn截取的数组
                                        for (var f = 0; f < t_m.length; f++) { //循环value截取的数组
                                            if (t_n[l].substring(0, t_n[l].indexOf(":")) == t_m[f]) { //判断截取的guid是否相等
                                                t_v += t_n[l].substring(t_n[l].indexOf(":") + 1) + ","; //多选的中文拼接
                                            }
                                        }

                                    }
                                    if (t_v.slice(0, -1).length > 4) { //判断中文的长度大于4的时候截取前4位
                                        $('<span>' + t_v.slice(0, -1).substr(0, 4) + '</span>').appendTo(id.parent().siblings(".show").children(".cy"))
                                    } else {
                                        $('<span>' + t_v.slice(0, -1) + '</span>').appendTo(id.parent().siblings(".show").children(".cy"))
                                    }
                                }
                            } else if (s_li.eq(k).find(".right label").length == 2) { //radio类型
                                if (tsj[i][j]["value"] == null) { //如果value值为空的话
                                    $('<span>页签</span>').appendTo(id.parent().siblings(".show").children(".cy"))
                                } else {
                                    var _tn = s_li.eq(k).attr("_tn").split(","); //_tn存的是所有radio的guid和中文,以逗号截取
                                    for (var q = 0; q < _tn.length; q++) { //循环_tn截取的数组
                                        if (_tn[q].substring(0, _tn[q].indexOf(":")) == tsj[i][j]["value"]) { //判断截取的guid和value值是否相等
                                            if (_tn[q].substring(_tn[q].indexOf(":") + 1).length > 4) { //判断中文的长度大于4的时候截取前4位
                                                $('<span>' + _tn[q].substring(_tn[q].indexOf(":") + 1) + '</span>').appendTo(id.parent().siblings(".show").children(".cy"))
                                            } else {
                                                $('<span>' + _tn[q].substring(_tn[q].indexOf(":") + 1) + '</span>').appendTo(id.parent().siblings(".show").children(".cy"))
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
        $(".cy span:first-child").addClass("span_bg"); //第一个span添加类名
        if (b.questionTableAnswerMap != null) { //判断后台是否有数据传过来
            var questionTableAnswerMap = b.questionTableAnswerMap;
            $(b.questionTableList).each(function () { //循环问题
                if ($(this)[0].isAllowRepeat == "0") { //是否重复控制,0的话为是,1的话为否
                    var n_ame = $(this)[0].name; //问题的name值(唯一性)
                    var c_ode = $(this)[0].code; //问题的code名
                    for (i in questionTableAnswerMap) { //循环每一列答案
                        $(questionTableAnswerMap[i]).each(function () { //循环答案的数据
                            if ($(this)[0].investigateTableCode == c_ode) { //判断答案里面的code和问题的code是否相等
                                if ($(this)[0].value != null) { //判断答案假如不为空的话
                                	n_ame=n_ame.replace('、','');
                                	n_ame=n_ame.replace('（㎡）','');
                                	n_ame=n_ame.replace('?','');
                                	n_ame=n_ame.replace('/','');
                                    du.siblings(".cy").children("span").eq(i - 1).attr(n_ame, $(this)[0].value); //给相对应的span添加属性
                                }
                            }
                        })
                    }
                }
            })
        }
        $(".show").show(); //'.show'默认隐藏,让'.show'显示
        if (vCode != undefined) {
            if (vCode.length != 0) { //判断是否有动态控制显示
                s_li.hide(); //把所有li隐藏
                $(s_li).each(function () { //循环所有li
                    var q_this = $(this);
                    for (var i = 0; i < vCode.length; i++) { //循环动态控制的数组
                        if (vCode[i] == q_this.attr("data")) { //判断li所对应的code和动态控制的code是否相等
                            q_this.show(); //相等的话,相对应的li显示
                        }
                    }
                })
                var d_u = du.parents("section").find(".show ul");
                for (var i = 0; i < d_u.children().length; i++) { //循环li
                    for (var j = 0; j < b.questionTableList.length; j++) { //循环json问题
                        if (d_u.children().eq(i).attr("data") == b.questionTableList[j].code) { //判断li的code名和问题的code名是否相等
                            if (b.questionTableList[j].isControlShow == 1) { //判断问题的受控制字段为0并且控制动态的值为1
                                if (b.questionTableList[j].codeDicList.length > 2) {
                                    if (d_u.children().eq(i).is(":visible")) { //判断li是否显示
                                        var cr = d_u.children().eq(i).attr("_name"); //li的属性_name
                                        var appCr = b.questionTableList[j].controlShowRuleList; //动态控制的规则
                                        $(appCr).each(function () { //循环动态控制规则的数组
                                            var appCd = $(this)[0].code;
                                            d_u.children().each(function () { //循环li
                                                for (var p = 0; p < appCd.length; p++) {
                                                    if ($(this).attr("data") == appCd[p]) { //判断li的code和控制的code是否相等
                                                        $(this).hide(); //li显示
                                                    }
                                                }

                                            })
                                        })
                                        $(appCr).each(function () { //循环动态控制规则的数组
                                            if (regular($(this)[0].key).test(cr)) { //正则匹配
                                                for (var u = 0; u < $(this)[0].code.length; u++) { //循环控制的code
                                                    var cu = $(this)[0].code[u];
                                                    d_u.children().each(function () { //循环li
                                                        if ($(this).attr("data") == cu) { //判断li的code和控制的code是否相等
                                                            $(this).show(); //li显示
                                                        }
                                                    })
                                                }
                                            }
                                        })
                                    }
                                    ;
                                } else if (b.questionTableList[j].codeDicList.length == 2) {
                                    if (d_u.children().eq(i).is(":visible")) { //判断li是否显示
                                        d_u.children().eq(i).find('input').each(function () {
                                            if ($(this).prop("checked")) {
                                                var cr = $(this).val(); //li的属性_name
                                                var appCr = b.questionTableList[j].controlShowRuleList; //动态控制的规则
                                                $(appCr).each(function () { //循环动态控制规则的数组
                                                    var appCd = $(this)[0].code;
                                                    d_u.children().each(function () { //循环li
                                                        for (var p = 0; p < appCd.length; p++) {
                                                            if ($(this).attr("data") == appCd[p]) { //判断li的code和控制的code是否相等
                                                                $(this).hide(); //li显示
                                                            }
                                                        }

                                                    })
                                                })
                                                $(appCr).each(function () { //循环动态控制规则的数组
                                                    if (regular($(this)[0].key).test(cr)) { //正则匹配
                                                        for (var u = 0; u < $(this)[0].code.length; u++) { //循环控制的code
                                                            var cu = $(this)[0].code[u];
                                                            d_u.children().each(function () { //循环li
                                                                if ($(this).attr("data") == cu) { //判断li的code和控制的code是否相等
                                                                    $(this).show(); //li显示
                                                                }
                                                            })
                                                        }
                                                    }
                                                })
                                            }
                                        })
                                    }
                                    ;
                                }

                            }
                        }
                    }
                }

            }

        }
    } else {
        var invesT; //必填的name
        for (var i = 0; i < b.questionTableList.length; i++) {
            if (b.questionTableList[i].isLabel == 1) { //判断有isLabel的问题
                invesT = b.questionTableList[i].name; //有的话,给invesT赋值
            }
        }
        if (invesT == undefined) { //假如没有isLabel的问题
            invesT = "页签";
        }
        $('<div class="problem show" modelname="questionShow"><p>请完善' + b.shortName + '<img src="img/add_icon.png"/ class="add"><img src="img/jian_icon.png" class="jian"/></p><div class="cy"><span>页签</span></div><ul></ul></div>').insertAfter(id.parent());
        $(".cy span:first-child").addClass("span_bg"); //第一个span添加类名
        if (b.answerLimitMin != null) { //判断是否有控制最少的页签
            for (var i = num; i < b.answerLimitMin; i++) { //有的话循环添加span
                $('<span>页签</span>').appendTo($(".cy"));
            }
        }
        var du = $("#" + _id).next().children("ul"); //du:_id下面的ul;
        var _once = false; //once为false的话不执行
        create(b, _id, du, _once, vCode); //du:_id下面的ul;b:大json;_id下面的ul;_once:只执行一次,把第一列数据展示到页面上
        $(".show").show(); //'.show'默认隐藏,让'.show'显示
    }
    if (b.answerLimit == 1) { //判断数据下发的最小值为1的情况下,加减号和'.cy'隐藏
        $(".add").hide();
        $(".jian").hide();
        $(".cy").hide();
    }
    id.parent().next().next(".show").remove(); //假如创建出来两个'.show',把多出来的一个删除
    //			var num =1;
    //						var sj ={};//数据
    id.parent().next(".show").children("p").children(".add").unbind("click").on("click", function () { //加
        var s_t = ""; //isLabel为1的答案
        var s_l = ""; //isLabel为1的name值
        var ns_t = null; //用于判断是否有isLabel为1的li
        var l_i = id.parent().next(".show").children("ul").children(); //'.show li'
        for (var i = 0; i < l_i.length; i++) { //循环所有的li
            if (l_i.eq(i).attr("invest") == 1) { //判断isLbel为1的li
                ns_t = 1; //有的话给ns_t赋值
                if (l_i.eq(i).find(".right span").length == 1) { //判断类型;span类型
                    s_l = l_i.eq(i).find(".left i").text();
                    s_t = l_i.eq(i).find(".right span").text();
                } else if (l_i.eq(i).find(".right input").length == 1) { //input类型
                    s_l = l_i.eq(i).find(".left i").text();
                    s_t = l_i.eq(i).find(".right input").val();
                } else if (l_i.eq(i).children(".right").hasClass("chenckbox")) { //checkbox类型
                    s_l = l_i.eq(i).find(".left i").text();
                    var _st = "";
                    for (var j = 0; j < l_i.eq(i).find(".right label").length; j++) { //循环所有label
                        if (l_i.eq(i).find(".right label").eq(j).children("input").prop("checked")) { //判断是否选中
                            _st += l_i.eq(i).find(".right label").eq(j).children("span").text() + ","; //多选相加
                        }
                    }
                    s_t = _st.slice(0, -1); //截取最后面的逗号
                } else if (l_i.eq(i).find(".right label").length == 2) { //单选类型
                    s_l = l_i.eq(i).find(".left i").text();
                    var _st = "";
                    $(l_i.eq(i).find(".right label")).each(function () { //循环单选
                        if ($(this).find("input").attr("checked") == "checked") { //判断哪个选中
                            s_t = $(this).text();
                        }
                    })
                }
            }
            ;
        }
        var _ic = num; //把num给_ic赋值
        var nb = id.children().find(".right span").html(); //ul下面选中的值(房产信息和联系人类型的，数字类型的)
        var _nub; //设置一个变量，用于判断是否有页签控制最大值
        if (b.answerLimit == 0) { //假如页签控制最大值为0的话，为无限大
            _nub = 999999999;
        } else {
            _nub = b.answerLimit
        }
        _oSave($(this), tsj, s_t, s_l); //$(this)加号,tsj为存储数据的对象,s_t为isLabel为1的答案,s_l为isLabel为1的name值
        if (ns_t == null && num < _nub) { //判断是否没有isLabel的问题并且num值小于页签控制的最大值
            num++; //num递增1
            if (num >= nb) { //判断num是否大于等于ul下面选中的值(房产信息和联系人类型的，数字类型的)
                id.children().find(".right span").html(num); //大的话会跟着num的递增而改变(联动)
                id.children().find(".right span").attr("name", num); //大的话会跟着num的递增而改变(联动)
                id.children().attr("_name", num); //大的话会跟着num的递增而改变(联动)
            }
            $('<span>页签</span>').appendTo(id.parent().next(".show").children(".cy")).addClass("span_bg").siblings().removeClass("span_bg"); //添加页签,为单前页签添加类名,其他页签删除类名
            id.parent().next(".show").children("ul").html(""); //把ul清空
            var _once = false; //once为false的话不执行
            create(b, _id, du, _once, vCode); //du:_id下面的ul;b:大json;_id下面的ul;_once:只执行一次,把第一列数据展示到页面上//重新创建li
            if (num > 1) { //判断num大于1的时候,减号显示
                id.parent().next(".show").children("p").first().children(".jian").show();
            }
        } else if (num == b.answerLimit && s_t != "" && s_t != "请选择") { //判断num和页签最大值相等的时候,加号隐藏
            id.parent().next(".show").children("p").first().children(".add").hide();
        };
        if (s_t != "" && s_t != "请选择" && num < _nub) { //判断li第一个元素的内容是否为span
            num++; //num递增1
            if (num >= nb) { //判断num是否大于等于ul下面选中的值(房产信息和联系人类型的，数字类型的)
                id.children().find(".right span").html(num); //大的话会跟着num的递增而改变(联动)
                id.children().find(".right span").attr("name", num); //大的话会跟着num的递增而改变(联动)
                id.children().attr("_name", num); //大的话会跟着num的递增而改变(联动)
            }
            $('<span>页签</span>').appendTo(id.parent().next(".show").children(".cy")).addClass("span_bg").siblings().removeClass("span_bg"); //添加页签,为单前页签添加类名,其他页签删除类名
            id.parent().next(".show").children("ul").html(""); //把ul清空
            var _once = false; //once为false的话不执行
            create(b, _id, du, _once, vCode); //du:_id下面的ul;b:大json;_id下面的ul;_once:只执行一次,把第一列数据展示到页面上
            if (num > 1) { //判断num大于1的时候,减号显示
                id.parent().next(".show").children("p").first().children(".jian").show();
            }
        } else if (num == b.answerLimit && s_t != "" && s_t != "请选择") { //判断num和页签最大值相等的时候,加号隐藏
            _oSave($(this), tsj, s_t, s_l); //$(this)加号,tsj为存储数据的对象,s_t为isLabel为1的答案,s_l为isLabel为1的name值
            id.parent().next(".show").children("p").first().children(".add").hide();
        }
        if (num == b.answerLimit) {
            id.parent().next(".show").children("p").first().children(".add").hide();
        }
    })

    //span点击事件
    $(document).unbind("click").on("click", ".show .cy span", function () {
        console.log(tsj)
        var s=$(this).attr('data-source');
        _oSave($(this), tsj); //保存数据;$(this):span;tsj:存储的数据
        $(this).addClass("span_bg").siblings().removeClass("span_bg"); //单前span添加类名，其他span删除类名
        id.parent().next(".show").children("ul").html(""); //把ul清空
        var _once = false; //once为false的话不执行
        create(b, _id, du, _once, vCode); //du:_id下面的ul;b:大json;_id下面的ul;_once:只执行一次,把第一列数据展示到页面上
        for (var i = 0; i < id.parent().next(".show").find("ul li").length; i++) { //把json里面的数据显示到页面
            var _ids = id.parent().next(".show").find("ul li").eq(i).attr("data"); //li的code名
            for (var p = 0; p < tsj[$(this).index() + 1].length; p++) { //循环当前选中列的数据
            	
            	//2018-12-21 修改页签切换
            	console.log(tsj[$(this).index() + 1][p])
            	var isEdiy=false;
            	var isColor='#fff';
            	if(s==1){
            		isEdiy=true;
            		isColor='#dedede';
            	}
            	//2018-12-21 end修改页签切换
            	
                if (_ids == tsj[$(this).index() + 1][p].investigateTableCode) { //判断code名和li的code名是否相等
                    id.parent().next(".show").find("ul li").eq(i).show(); //把li显示到页面上
                    if (id.parent().next(".show").find("ul li").eq(i).find(".right span").length == 1) { //判断类型;span类型
                        if (tsj[$(this).index() + 1][p].value != null) { //判断答案不为空
                            var _lcd = id.parent().next(".show").find("ul li").eq(i).attr("_cd"); //type类型(code)
                            var _tn = id.parent().next(".show").find("ul li").eq(i).attr("_tn"); //所有的guid和所对应的中文
                            var dzxq = id.parent().next(".show").find("ul li").eq(i).find(".right span"); //li下面的span
                            if (_lcd != undefined) { //判断问题是否为code类型的
                                var _tns = _tn.split(","); //以逗号截取
                                for (var y = 0; y < _tns.length; y++) { //循环截取出来的数组
                                    if (tsj[$(this).index() + 1][p].value.match(_tns[y].substring(0, _tns[y].indexOf(":")))) { //判断guid和value是否相等
                                    	id.parent().next(".show").find("ul li").eq(i).find(".right").css('background',isColor);
                                        id.parent().next(".show").find("ul li").eq(i).find(".right span").text(_tns[y].substring(_tns[y].indexOf(":") + 1)).attr('data-source',s); //把中文到span上
                                        id.parent().next(".show").find("ul li").eq(i).attr("_name", _tns[y].substring(0, _tns[y].indexOf(":"))); //把guid当成属性值存到li里面
                                    }
                                }
                            }
                            if (dzxq.attr("cdxq") != undefined) { //省市区加详细地址
                                var _tv = tsj[$(this).index() + 1][p].value.split("||"); //一大串guid加||加详细地址,用竖杆切割成数组，分别为guid和详细地址
                                dzxq.attr("guid", _tv[0]); //把guid附到li上面
                                var Atv = AndroidJs.getAddressByGuid(_tv[0]); //调用安卓方法，返回一个中文的字符串
                                id.parent().next(".show").find("ul li").eq(i).find(".right span").text(Atv); //把字符串赋到span上
                                id.parent().next(".show").find("ul li").eq(i).find(".x-address input").val(_tv[1]); //把详细地址附到input上
                            }
                            if (dzxq.attr("cdz") != undefined) { //省市区
                                var _tv = tsj[$(this).index() + 1][p].value.split("||"); //一大串guid加||加详细地址,用竖杆切割成数组，分别为guid和详细地址
                                dzxq.attr("guid", _tv[0]); //把guid附到li上面
                                var Atv = AndroidJs.getAddressByGuid(_tv[0]); //调用安卓方法，返回一个中文的字符串
                                id.parent().next(".show").find("ul li").eq(i).find(".right span").text(Atv); //把字符串赋到span上
                            }
                        }
                        if (tsj[$(this).index() + 1][p].value != null) {
                            if (tsj[$(this).index() + 1][p].value != "请选择") {
                                id.parent().next(".show").find("ul li").eq(i).find(".left i").css({
                                    "color": "#a09fa4"
                                });
                                id.parent().next(".show").find("ul li").eq(i).find(".right span").css({
                                    "color": "#191919"
                                });
                            }
                        }
                        continue;
                    } else if (id.parent().next(".show").find("ul li").eq(i).find(".right input").length == 1) { //input类型
                        if (tsj[$(this).index() + 1][p].value != null) { //判断答案不为空
                            id.parent().next(".show").find("ul li").eq(i).find(".right input").val(tsj[$(this).index() + 1][p].value).attr('disabled',isEdiy); //把值赋到input上
                        }
                        if (tsj[$(this).index() + 1][p].value != null) {
                            if (tsj[$(this).index() + 1][p].value != "" && tsj[$(this).index() + 1][p].value != undefined && tsj[$(this).index() + 1][p].value != null) {
                                id.parent().next(".show").find("ul li").eq(i).find(".left i").css({
                                    "color": "#a09fa4"
                                });
                                id.parent().next(".show").find("ul li").eq(i).find(".right label").css({
                                    "color": "#191919"
                                });
                            }
                        }
                        continue;
                    } else if (id.parent().next(".show").find("ul li").eq(i).find(".right label").length == 2) { //单选类型
                        for (var j = 0; j < id.parent().next(".show").find("ul li").eq(i).find(".right label").length; j++) { //循环label
                            if (tsj[$(this).index() + 1][p].value != null) { //判断答案不为空
                                if (id.parent().next(".show").find("ul li").eq(i).find(".right label").eq(j).children("input").val() == tsj[$(this).index() + 1][p].value) { //判断value值和label的value值是否相等
                                    id.parent().next(".show").find("ul li").eq(i).find(".right label").eq(j).children("input").attr("checked", true); //把input的属性设为被选中
                                    id.parent().next(".show").find("ul li").eq(i).find(".right label").eq(j).children("input").next("i").show().parent().siblings().children("i").hide(); //选中的label里面的i显示，未选中的i隐藏
                                    id.parent().next(".show").find("ul li").eq(i).find(".right label").eq(j).children("input").parent().siblings().children("input").attr("checked", false); //未选中的设为false
                                    id.parent().next(".show").find("ul li").eq(i).find(".right label").eq(j).children("input").parents("li").find(".left i").css({
                                        "color": "#a09fa4"
                                    });
                                }
                            }
                        }
                        continue;
                    } else if (id.parent().next(".show").find("ul li").eq(i).find(".textCons textarea").length == 1) { //textarea类型
                        if (tsj[$(this).index() + 1][p].value != null) { //判断答案不为空
                            id.parent().next(".show").find("ul li").eq(i).find(".textCons textarea").val(tsj[$(this).index() + 1][p].value).attr('disabled',isEdiy); //给textarea赋值
                            if ($('.textCons textarea').val() != "") {
                                $('.textareaStyle i').css({
                                    "color": "#a09fa4"
                                });
                            } else {
                                $('.textareaStyle i').css({
                                    "color": "#191919"
                                });
                            }
                        }
                        continue;
                    } else if (id.parent().next(".show").find("ul li").eq(i).find(".phone input").length == 3) { //固定电话
                        if (tsj[$(this).index() + 1][p].value != null) { //判断答案不为空
                            var t_v = tsj[$(this).index() + 1][p].value; //固定电话07XX-8XXXXXX0-0XX
                            var _tv = t_v.split("-"); //以-来分割
                            for (var j = 0; j < id.parent().next(".show").find("ul li").eq(i).find(".phone input").length; j++) {
                                if (_tv[j] != undefined) {
                                    id.parent().next(".show").find("ul li").eq(i).find(".phone input").eq(j).val(_tv[j]); //分别给3个input赋值
                                }
                            }
                        }
                        continue;
                    } else if (id.parent().next(".show").find("ul li").eq(i).children(".right").hasClass("chenckbox")) { //checkbox类型
                        if (tsj[$(this).index() + 1][p].value != null) { //判断答案不为空
                            var t_v = tsj[$(this).index() + 1][p].value.split(","); //value值以逗号分割
                            for (var k = 0; k < du.children().eq(i).find(".right label").length; k++) { //循环label
                                for (var l = 0; l < t_v.length; l++) { //循环分割的数组
                                    if (du.children().eq(i).find(".right label").eq(k).children("span").attr("name") == t_v[l]) { //判断guid和数组里面的值是否相等
                                        du.children().eq(i).find(".right label").eq(k).children("input").attr("checked", true); //把想等的当前input设值
                                        du.children().eq(i).find(".right label").eq(k).children("img").attr("src", "img/jxt_icon.png"); //添加图片
                                        du.children().eq(i).find(".right label").eq(k).children('span').css('color', '#191919');
                                        du.children().eq(i).find(".left i").css('color', '#a0a0a0');
                                    }
                                }
                            }
                        }
                        continue;
                    } else if (id.parent().next(".show").find("ul li").eq(i).find(".qdate input").length == 2) { //两个时间
                        if (tsj[$(this).index() + 1][p].value != null) { //判断答案不为空
                            var t_v = tsj[$(this).index() + 1][p].value; //20XX-XX-XX,20XX-XX-XX
                            var _tv = t_v.split(","); //以逗号来分割
                            for (var j = 0; j < id.parent().next(".show").find("ul li").eq(i).find(".qdate input").length; j++) {
                                if (_tv[j] != undefined) {
                                    id.parent().next(".show").find("ul li").eq(i).find(".qdate input").eq(j).val(_tv[j]); //分别给3个input赋值
                                }
                            }
                        }
                        continue;
                    }
                }
            }
        }
        for (var i = 0; i < du.children().length; i++) { //循环li
            for (var j = 0; j < b.questionTableList.length; j++) { //循环json问题
                if (du.children().eq(i).attr("data") == b.questionTableList[j].code) { //判断li的code名和问题的code名是否相等
                    if (b.questionTableList[j].isControlShow == 1) { //判断问题的受控制字段为0并且控制动态的值为1
                        if (b.questionTableList[j].codeDicList.length > 2) {
                            if (du.children().eq(i).is(":visible")) { //判断li是否显示
                                var cr = du.children().eq(i).attr("_name"); //li的属性_name
                                var appCr = b.questionTableList[j].controlShowRuleList; //动态控制的规则
                                $(appCr).each(function () { //循环动态控制规则的数组
                                    var appCd = $(this)[0].code;
                                    du.children().each(function () { //循环li
                                        for (var p = 0; p < appCd.length; p++) {
                                            if ($(this).attr("data") == appCd[p]) { //判断li的code和控制的code是否相等
                                                $(this).hide(); //li显示
                                            }
                                        }

                                    })
                                });
                                $(appCr).each(function () { //循环动态控制规则的数组
                                    if (regular($(this)[0].key).test(cr)) { //正则匹配
                                        for (var u = 0; u < $(this)[0].code.length; u++) { //循环控制的code
                                            var cu = $(this)[0].code[u];
                                            du.children().each(function () { //循环li
                                                if ($(this).attr("data") == cu) { //判断li的code和控制的code是否相等
                                                    $(this).show(); //li显示
                                                    $(this).attr("d_ata", b.questionTableList[j].code);
                                                }
                                            })
                                        }
                                    }
                                })
                            }
                            ;
                        } else if (b.questionTableList[j].codeDicList.length == 2) {
                            if (du.children().eq(i).is(":visible")) { //判断li是否显示
                                du.children().eq(i).find('input').each(function () {
                                    if ($(this).prop("checked")) {
                                        var cr = $(this).val(); //li的属性_name
                                        var appCr = b.questionTableList[j].controlShowRuleList; //动态控制的规则
                                        $(appCr).each(function () { //循环动态控制规则的数组
                                            var appCd = $(this)[0].code;
                                            du.children().each(function () { //循环li
                                                for (var p = 0; p < appCd.length; p++) {
                                                    if ($(this).attr("data") == appCd[p]) { //判断li的code和控制的code是否相等
                                                        $(this).hide(); //li显示
                                                    }
                                                }

                                            })
                                        })
                                        $(appCr).each(function () { //循环动态控制规则的数组
                                            if (regular($(this)[0].key).test(cr)) { //正则匹配
                                                for (var u = 0; u < $(this)[0].code.length; u++) { //循环控制的code
                                                    var cu = $(this)[0].code[u];
                                                    du.children().each(function () { //循环li
                                                        if ($(this).attr("data") == cu) { //判断li的code和控制的code是否相等
                                                            $(this).show(); //li显示
                                                        }
                                                    })
                                                }
                                            }
                                        })
                                    }
                                })
                            }
                            ;
                        }
                        ;
                    }
                }
            }
        }

        du.parent().siblings(".show").find(".cy span").each(function () { //循环所有span
            if ($(this).hasClass("span_bg")) { //判断是否有类名
                var newJ = {}; //校验当前模块
                $(tsj[$(this).index() + 1]).each(function () {
                    newJ[$(this)[0].investigateTableCode] = $(this)[0].value;
                })
                h_zjChecked.checkFieldValuesAll("questionShow", null, newJ, false);
            }
        })
        return false;
    })

    //减
    id.parent().next(".show").find("p .jian").unbind("click").on("click", function () {
        var s_t = ""; //isLabel为1的答案
        var l_i = id.parent().next(".show").children("ul").children(); //ul下面的li
        for (var i = 0; i < l_i.length; i++) { //循环li
            if (l_i.eq(i).attr("invest") == 1) {
                if (s_t != "" && s_t != "请选择") {
                    if (l_i.eq(i).find(".right span").length == 1) {
                        s_t = l_i.eq(i).find(".right span").text();
                    } else if (l_i.eq(i).find(".right input").length == 1) {
                        s_t = l_i.eq(i).find(".right input").val();
                    }
                }
            }
            ;
        }
        _oSave($(this), tsj, s_t) //$(this)减号,tsj为存储数据的对象,s_t为isLabel为1的答案

        if (num > 1) { //num大于1的话，添加删除在页签上
            for (var i = 0; i < id.parent().next(".show").children(".cy").children().length; i++) {
            	/*2018-12-21 修改*/
            	var isShowClose='block';
            	if(id.parent().next(".show").children(".cy").children().eq(i).attr('data-source')==1){
            		isShowClose='none';
            	}
            	/*2018-12-21 修改 end*/
                $("<img src='img/close_icon.png' style='display:"+isShowClose+"'/>").appendTo(id.parent().next(".show").children(".cy").children().eq(i));
            }
        }
        ;
        id.parent().next(".show").children(".cy").children("span").children("img").unbind("click").click(function () { //页签上的图片的点击事件
            var _tp = $(this).parent(); //点击图片的span
            var _ixd = $(this).parent().index() + 1; //当前的下标
            $('<div id="mask"><div class="mask_bg"></div><div class="remove"><p class="s_c">您确认要删除吗？<img class="_ci" src="img/close_icon.png"/><p class="_qr">确认</p></div></div>').appendTo("body"); //遮罩层
            $("._ci").click(function () { //取消
                $(".cy span img").remove(); //删除图片
                $("#mask").remove(); //删除遮罩层
            });
            $("._qr").click(function () { //确认
                var _ic = _ixd; //下标
                $(".cy span img").remove(); //删除图片
                $("#mask").remove(); //删除遮罩层
                delete tsj[_ixd]; //删除tsj里面的数据
                if (_ixd < num) { //判断下标的值是否小于num
                    //					var _sos=tsj;
                    var _sol = 0; //定义一个变量
                    var _sos = {}; //定义一个新的对象
                    for (var i in tsj) { //循环对象
                        _sol++; //tsj的i
                        _sos[_sol] = tsj[i]; //给新的对象赋值
                    }
                    for (var i in _sos) { //循环新的对象
                        for (var j = 0; j < _sos[i].length; j++) { //循环新对象里面的答案
                            _sos[i][j].lineNo = i; //给新对象里面的lineNo赋值
                        }
                    }
                    tsj = _sos; //把新的对象赋值给tsj
                }

                num--; //num递减
                if (num == 1) { //判断num为1的时候，减号隐藏
                    id.parent().next(".show").children("p").first().children(".jian").hide();
                }
                id.parent().next(".show").children(".cy").children("span").eq(_ixd - 1).remove(); //删除span
                if (num + 1 == id.children("li:first-child").find(".right span").text()) { //减的话上面的数字是数字的话数字会跟着变
                    id.children("li:first-child").find(".right span").text(num);
                }

                id.parent().next(".show").children("ul").html(""); //把ul清空
                var _once = false; //once为false的话不执行
                create(b, _id, du, _once, vCode); //du:_id下面的ul;b:大json;_id下面的ul;_once:只执行一次,把第一列数据展示到页面上
                if (_ixd == 1) { //_ixd为1的话把_ixd置为2
                    _ixd = 2
                }
                id.parent().next(".show").children(".cy").children("span").eq(_ixd - 2).addClass("span_bg").siblings().removeClass("span_bg"); //给删除的上一个span添加类名
                for (var i = 0; i < id.parent().next(".show").children("ul").children().length; i++) { //把json里面的数据显示到页面
                    var _ids = id.parent().next(".show").children("ul").children().eq(i).attr("data"); //获取li所对应的code
                    for (var p = 0; p < tsj[_ixd - 1].length; p++) { //循环答案
                        if (_ids == tsj[_ixd - 1][p].investigateTableCode) { //判断答案和li所对应的code是否相等
                            id.parent().next(".show").children("ul").children().eq(i).show(); //相等的话把li显示在页面上
                            if (id.parent().next(".show").children("ul").children().eq(i).find(".right span").length == 1) { //判断类型
                                if (tsj[_ixd - 1][p].value != null) { //判断值是否为空
                                    var _lcd = id.parent().next(".show").children("ul").children().eq(i).attr("_cd"); //type类型(code)
                                    var _tn = id.parent().next(".show").children("ul").children().eq(i).attr("_tn"); //所有的guid和所对应的中文
                                    var dzxq = id.parent().next(".show").children("ul").children().eq(i).find(".right span"); //li下面的span
                                    if (_lcd != undefined) { //判断问题是否为code类型的
                                        var _tns = _tn.split(","); //以逗号截取
                                        for (var y = 0; y < _tns.length; y++) { //循环截取出来的数组
                                            if (tsj[_ixd - 1][p].value.match(_tns[y].substring(0, _tns[y].indexOf(":")))) { //判断guid和value是否相等
                                                id.parent().next(".show").children("ul").children().eq(i).find(".right span").text(_tns[y].substring(_tns[y].indexOf(":") + 1)); //把中文到span上
                                                id.parent().next(".show").children("ul").children().eq(i).attr("_name", _tns[y].substring(0, _tns[y].indexOf(":"))); //把guid当成属性值存到li里面
                                            }
                                        }
                                    }
                                    if (dzxq.attr("cdxq") != undefined) { //省市区加详细地址
                                        var _tv = tsj[_ixd - 1][p].value.split("||"); //一大串guid加||加详细地址,用竖杆切割成数组，分别为guid和详细地址
                                        dzxq.attr("guid", _tv[0]); //把guid附到li上面
                                        var Atv = AndroidJs.getAddressByGuid(_tv[0]); //调用安卓方法，返回一个中文的字符串
                                        id.parent().next(".show").children("ul").children().eq(i).find(".right span").text(Atv); //把字符串赋到span上
                                        id.parent().next(".show").children("ul").children().eq(i).find(".x-address input").val(_tv[1]); //把详细地址附到input上
                                    }
                                    if (dzxq.attr("cdz") != undefined) { //省市区
                                        var _tv = tsj[_ixd - 1][p].value.split("||"); //一大串guid加||加详细地址,用竖杆切割成数组，分别为guid和详细地址
                                        dzxq.attr("guid", _tv[0]); //把guid附到li上面
                                        var Atv = AndroidJs.getAddressByGuid(_tv[0]); //调用安卓方法，返回一个中文的字符串
                                        id.parent().next(".show").children("ul").children().eq(i).find(".right span").text(Atv); //把字符串赋到span上
                                    }
                                }
                                if (tsj[_ixd - 1][p].value != null) {
                                    if (id.parent().next(".show").children("ul").children().eq(i).find(".right span").text() != "请选择") {
                                        id.parent().next(".show").children("ul").children().eq(i).find(".left i").css({
                                            "color": "#a09fa4"
                                        });
                                        id.parent().next(".show").children("ul").children().eq(i).find(".right span").css({
                                            "color": "#191919"
                                        });
                                    }
                                }
                                continue;
                            } else if (id.parent().next(".show").children("ul").children().eq(i).find(".right input").length == 1) { //input类型
                                if (tsj[_ixd - 1][p].value != null) { //判断答案不为空
                                    id.parent().next(".show").children("ul").children().eq(i).find(".right input").val(tsj[_ixd - 1][p].value); //把值赋到input上
                                }
                                if (tsj[_ixd - 1][p].value != null) {
                                    if (tsj[_ixd - 1][p].value != "" && tsj[_ixd - 1][p].value != undefined && tsj[_ixd - 1][p].value != null) {
                                        id.parent().next(".show").children("ul").children().eq(i).find(".left i").css({
                                            "color": "#a09fa4"
                                        });
                                        id.parent().next(".show").children("ul").children().eq(i).find(".right label").css({
                                            "color": "#191919"
                                        });
                                    }
                                }
                                continue;
                            } else if (id.parent().next(".show").children("ul").children().eq(i).find(".right label").length == 2) { //单选类型
                                for (var j = 0; j < id.parent().next(".show").children("ul").children().eq(i).find(".right label").length; j++) { //循环label
                                    if (tsj[_ixd - 1][p].value != null) { //判断答案不为空
                                        if (id.parent().next(".show").children("ul").children().eq(i).find(".right label").eq(j).children("input").val() == tsj[_ixd - 1][p].value) { //判断value值和label的value值是否相等
                                            id.parent().next(".show").children("ul").children().eq(i).find(".right label").eq(j).children("input").attr("checked", true); //把input的属性设为被选中
                                            id.parent().next(".show").children("ul").children().eq(i).find(".right label").eq(j).children("input").next("i").show().parent().siblings().children("i").hide(); //选中的label里面的i显示，未选中的i隐藏
                                            id.parent().next(".show").children("ul").children().eq(i).find(".right label").eq(j).children("input").parent().siblings().children("input").attr("checked", false); //未选中的设为false
                                            id.parent().next(".show").children("ul").children().eq(i).find(".right label").eq(j).children("input").parents("li").find(".left i").css({
                                                "color": "#a09fa4"
                                            });
                                        }
                                    }
                                }
                                continue;
                            } else if (id.parent().next(".show").children("ul").children().eq(i).find(".textCons textarea").length == 1) { //textarea类型
                                if (tsj[_ixd - 1][p].value != null) { //判断答案不为空
                                    id.parent().next(".show").children("ul").children().eq(i).find(".textCons textarea").val(tsj[_ixd - 1][p].value); //给textarea赋值
                                    if ($('.textCons textarea').val() != "") {
                                        $('.textareaStyle i').css({
                                            "color": "#a09fa4"
                                        });
                                    } else {
                                        $('.textareaStyle i').css({
                                            "color": "#191919"
                                        });
                                    }
                                }
                                continue;
                            } else if (id.parent().next(".show").children("ul").children().eq(i).find(".phone input").length == 3) { //固定电话
                                if (tsj[_ixd - 1][p].value != null) { //判断答案不为空
                                    var t_v = tsj[_ixd - 1][p].value; //固定电话07XX-8XXXXXX0-0XX
                                    var _tv = t_v.split("-"); //以-来分割
                                    for (var j = 0; j < id.parent().next(".show").children("ul").children().eq(i).find(".phone input").length; j++) {
                                        if (_tv[j] != undefined) {
                                            find(".right label")
                                        }
                                    }
                                }
                                continue;
                            } else if (id.parent().next(".show").children("ul").children().eq(i).children(".right").hasClass("chenckbox")) { //checkbox类型
                                if (tsj[_ixd - 1][p].value != null) { //判断答案不为空
                                    var t_v = tsj[_ixd - 1][p].value.split(","); //value值以逗号分割
                                    for (var k = 0; k < id.parent().next(".show").children("ul").children().eq(i).find(".right label").length; k++) { //循环label
                                        for (var l = 0; l < t_v.length; l++) { //循环分割的数组
                                            if (id.parent().next(".show").children("ul").children().eq(i).find(".right label").eq(k).children("span").attr("name") == t_v[l]) { //判断guid和数组里面的值是否相等
                                                id.parent().next(".show").children("ul").children().eq(i).find(".right label").eq(k).children("input").attr("checked", true); //把想等的当前input设值
                                                find(".qdate input")
                                                id.parent().next(".show").children("ul").children().eq(i).find(".right label").eq(k).children('span').css('color', '#191919');
                                                id.parent().next(".show").children("ul").children().eq(i).find(".left i").css('color', '#a0a0a0');
                                            }
                                        }
                                    }
                                }
                                continue;
                            } else if (id.parent().next(".show").children("ul").children().eq(i).find(".qdate input").length == 2) { //两个日期
                                if (tsj[_ixd - 1][p].value != null) { //判断答案不为空
                                    var t_v = tsj[_ixd - 1][p].value; //20XX-XX-XX,20XX-XX-XX
                                    var _tv = t_v.split(","); //以-来分割
                                    for (var j = 0; j < id.parent().next(".show").children("ul").children().eq(i).find(".qdate input").length; j++) {
                                        if (_tv[j] != undefined) {
                                            id.parent().next(".show").children("ul").children().eq(i).find(".qdate input").eq(j).val(_tv[j]); //分别给2个input赋值
                                        }
                                    }
                                }
                                continue;
                            }
                        }
                    }
                }
                for (var i = 0; i < du.children().length; i++) { //循环li
                    for (var j = 0; j < b.questionTableList.length; j++) { //循环json问题
                        if (du.children().eq(i).attr("data") == b.questionTableList[j].code) { //判断li的code名和问题的code名是否相等
                            if (b.questionTableList[j].isControlShow == 1) { //判断问题的受控制字段为0并且控制动态的值为1
                                if (du.children().eq(i).is(":visible")) { //判断li是否显示
                                    var cr = du.children().eq(i).attr("_name"); //li的属性_name
                                    var appCr = b.questionTableList[j].controlShowRuleList; //动态控制的规则
                                    $(appCr).each(function () { //循环动态控制规则的数组
                                        if (regular($(this)[0].key).test(cr)) { //正则匹配
                                            for (var u = 0; u < $(this)[0].code.length; u++) { //循环控制的code
                                                var cu = $(this)[0].code[u];
                                                du.children().each(function () { //循环li
                                                    if ($(this).attr("data") == cu) { //判断li的code和控制的code是否相等
                                                        $(this).show(); //li显示
                                                        $(this).attr("d_ata", b.questionTableList[j].code);
                                                    }
                                                })
                                            }
                                        }
                                    })
                                }
                                ;
                            }
                        }
                    }
                }
                var _cs = _sc.join();
                //TODO 删除的id字符串
                //				console.log(sj[3])
                if (_data.answerLimitMin != 0) { //判断数据是否有最小值
                    if (num <= _data.answerLimitMin) { //判断num是否小于等于数据的最小值
                        $(".jian").hide(); //减号隐藏
                    }
                }
                if (num < b.answerLimit) { //判断num和页签最大值相等的时候,加号隐藏
                    id.parent().next(".show").children("p").first().children(".add").show();
                }
            });
            return false;
        })
    })

    function _oSave(_this, tsj, s_t, s_l) { //保存数据;_this：页面上的加减号或者span,tsj:数据;
        var sp_x; //span的下标
        for (var z = 0; z < id.parent().siblings(".show").find(".cy span").length; z++) { //循环所有span
            if (id.parent().siblings(".show").find(".cy span").eq(z).hasClass("span_bg")) { //判断是否有类名
                sp_x = z; //把下标赋给sp_x
            }
        }
        ;
        var this_li = _this.parent().siblings("ul").children(); //所有li
        tsj[sp_x + 1] = []; //把数据清空，再重新存数据
        //			console.log(_this.parent().siblings("ul").children())
        for (var i = 0; i < this_li.length; i++) { //循环所有的li
            if (this_li.eq(i).css("display") == "none") { //判断是否显示,把显示的数据存储
            } else {
                var _js = {}; //创建新的对象
                var _jm = this_li.eq(i).attr("data"); //当前li所对应的code名
                var _jz = ""; //答案
                if (this_li.eq(i).find(".right span").length == 1) { //判断类型
                    if (this_li.eq(i).attr("_cd") == "CODE") { //code类型
                        _jz = this_li.eq(i).attr("_name"); //guid
                        if (_jz == "" || _jz == undefined) { //假如为空的话,把值设为null
                            _jz = null;
                        }
                    } else if (this_li.eq(i).find(".right span").attr("cdxq") == "dzxq") { //地址详情
                        var ssq = this_li.eq(i).find(".right span").attr("guid"); //guid
                        var dzxq = this_li.eq(i).find(".x-address input").val(); //详细地址的value值
                        _jz = ssq + "||" + dzxq; //value值为guid+value值
                        if (_jz == "" || _jz == "请选择" || ssq == undefined) { //假如为空的话,把值设为null
                            _jz = null;
                        }
                    } else if (this_li.eq(i).find(".right span").attr("cdz") == "dz") { //地址
                        var ssq = this_li.eq(i).find(".right span").attr("guid"); //guid
                        _jz = ssq; //value值为guid
                        if (_jz == "" || _jz == "请选择" || ssq == undefined) { //假如为空的话,把值设为null
                            _jz = null;
                        }
                    }
                } else if (this_li.eq(i).find(".right input").length == 1) { //input类型
                    _jz = this_li.eq(i).find(".right input").val(); //value为input的value值
                    if (_jz == "" || _jz == "请选择") { //假如为空的话,把值设为null
                        _jz = null;
                    }
                } else if (this_li.eq(i).find(".right label").length == 2) { //单选类型
                    if (this_li.eq(i).find(".right label").eq(0).children("input").prop("checked") == false && this_li.eq(i).find(".right label").eq(1).children("input").prop("checked") == false) { //判断是否都没选中
                        _jz = null;
                    } else {
                        for (var j = 0; j < this_li.eq(i).find(".right label").length; j++) { //循环label
                            if (this_li.eq(i).find(".right label").eq(j).children("input").attr("checked")) { //判断是否选中
                                _jz = this_li.eq(i).find(".right label").eq(j).children("input").val(); //value为input的value值
                            }
                        }
                    }
                } else if (this_li.eq(i).find(".textCons textarea").length == 1) { //textarea类型
                    _jz = this_li.eq(i).find(".textCons textarea").val(); //value为text值
                    if (_jz == "") { //假如为空的话,把值设为null
                        _jz = null;
                    }
                } else if (this_li.eq(i).find(".phone input").length == 3) { //家庭固话类型
                    var _pho = ""; //定义一个空的字符串
                    for (var j = 0; j < this_li.eq(i).find(".phone input").length; j++) { //循环input
                        _pho += this_li.eq(i).find(".phone input").eq(j).val() + "-"; //把值到_pho上
                    }
                    var p_h = _pho.slice(0, -1); //删除最后一位
                    if (p_h == "--") { //如果没有值的话，为null
                        p_h = null;
                    }
                    if (p_h != null) {
                        if (p_h.substr(p_h.length - 1) == "-") {
                            p_h = p_h.slice(0, -1);
                        }
                    }
                    _jz = p_h;
                } else if (this_li.eq(i).children(".right").hasClass("chenckbox")) { //checkbox类型
                    var csp = ""; //定义一个空的字符串
                    for (var k = 0; k < this_li.eq(i).find(".chenckbox label").length; k++) { //循环所有labeel
                        if (this_li.eq(i).find(".chenckbox label").eq(k).children("input").prop("checked")) { //判断是否有选中
                            csp += this_li.eq(i).find(".chenckbox label").eq(k).children("span").attr("name") + ","; //选中的把guid和逗号拼接起来
                        }
                    }
                    var _csp = csp.slice(0, -1); //删除最后一位
                    if (csp == "") { //如果没有值的话，为null
                        _csp = null;
                    }
                    _jz = _csp;
                } else if (this_li.eq(i).find(".qdate input").length == 2) { //两个日期
                    var _pho = ""; //定义一个空的字符串
                    for (var j = 0; j < this_li.eq(i).find(".qdate input").length; j++) { //循环input
                        _pho += this_li.eq(i).find(".qdate input").eq(j).val() + ","; //把值到_pho上
                    }
                    var p_h = _pho.slice(0, -1); //删除最后一位
                    if (p_h == ",") { //如果没有值的话，为null
                        p_h = null;
                    }
                    _jz = p_h;
                }
                _js["investigateTableCode"] = _jm; //定义code名
                _js["value"] = _jz; //定义value值
                if (_js["value"] == "") { //如果值为空的话，传null
                    _js["value"] = null
                }
                _js["lineNo"] =
                _js["lineNo"] = sp_x + 1; //tabel的列数,第几列
                tsj[sp_x + 1].push(_js); //把数据推到数组里面
            }
        }
        ;
        //		if(s_t!=""&&s_t!="请选择"){
        //			id.parent().next(".show").children(".cy").children("span").eq(sp_x).text(s_t);
        //		}
    }
}


function create(c, _id, du, _once, vCode) { //创建页面函数c:问题json，_id:div的id，du:添加元素的ul，_once:只执行一次的函数是否执行（后台答案显示在页面上），vCode:显示的问题
    if (sj["questionTableAnswerList"]) { //如果全局sj拥有"questionTableAnswerList"的话

    } else {
        sj["questionTableAnswerList"] = []; //没有就给他一个空的数组
    }

    var _idj = {}; //定义一个空的对象
    if (c.isControlShow == 1) { //判断是否有动态控制显示
        for (var i = 0; i < c.questionTableList.length; i++) { //循环所有的问题
            _crdLi = crd(c.questionTableList[i], _id, du, _idj); //把每个问题创建出来;c.questionTableList[i]:问题,_id:div的id,du:添加元素的ul,_idj:空对象
        }
        du.children().hide(); //先把所有的li隐藏
        if (vCode != undefined) { //vCode为动态显示的问题code名
            for (var i = 0; i < du.children().length; i++) { //循环li
                for (var j = 0; j < vCode.length; j++) { //循环动态显示的数组
                    if (du.children().eq(i).attr("data") == vCode[j]) { //判断code是否相等
                        du.children().eq(i).show(); //相等的所对应的li显示
                    }
                }
            }
        } else { //如果没有vCode传过来的话,把不受动态控制的问题显示出来
            for (var i = 0; i < du.children().length; i++) { //循环li
                for (var j = 0; j < c.questionTableList.length; j++) { //循环所有问题
                    if (c.questionTableList[j].isDynamicShow == 0) { //判断是否受动态控制
                        if (du.children().eq(i).attr("data") == c.questionTableList[j].code) { //判断li所相对应的code和列表的里面的code是否相等
                            du.children().eq(i).show(); //将li显示出来
                        }
                    }

                }
            }
        }
    } else if (c.isControlShow == 0) { //没有动态控制显示
        for (var i = 0; i < c.questionTableList.length; i++) { //循环所有的问题
            _crdLi = crd(c.questionTableList[i], _id, du, _idj); //把每个问题创建出来;c.questionTableList[i]:问题,_id:div的id,du:添加元素的ul,_idj:空对象
        }
        du.children().hide(); //先把所有的li隐藏
        for (var i = 0; i < du.children().length; i++) { //循环所有li
            for (var j = 0; j < c.questionTableList.length; j++) { //循环所有问题
                if (du.children().eq(i).attr("data") == c.questionTableList[j].code) { //判断li所相对应的code和列表的里面的code是否相等
                    if (c.questionTableList[j].isDynamicShow == 0) { //判断是否受动态控制
                        du.children().eq(i).show(); //将li显示出来
                    }
                }
            }
        }
    }
    if (c.answerLimitMin != null && c.answerLimitMin != 0) { //判断是否有页签最小值
        var n_l = 0; //定义一个变量用于判断数据里有几个页签
        for (var k in tsj) { //循环数据，有一个页签n_l加1
            n_l++
        }
        if (n_l == 0) { //判断如果tsj里面没有页签的值的话
            for (var i = num; i < c.answerLimitMin + 1; i++) { //循环页签最小值
                tsj[i] = []; //给tsj定义一个空的数组
                for (var j = 0; j < du.children().length; j++) { //循环所有li
                    var _nsj = {}; //定义一个空的对象
                    if (du.children().eq(j).css("display") == "none") { //判断li是否显示,给_nsj赋值,然后推进tsj的数组里面

                    } else {
                        _nsj["id"] = null;
                        _nsj["investigateTableCode"] = du.children().eq(j).attr("data");
                        _nsj["value"] = null;
                        _nsj["lineNo"] = i;
                        tsj[i].push(_nsj)
                    }
                }
                num++
            }
            num = num - 1;
        }
    }
    if (_once) { //页面进来的时候只执行一次
        if (c.questionTableAnswerMap != null) { //判断后台传过来的是否有答案的数据
            if (c.answerType == "ONLYTABLE" || c.answerType == "TABLE" || c.answerType == "MULTIPLE" || c.answerType == "CHECKBOXMULT" || c.answerType == "INPUTTABLE") { //判断类型
                var newC = c.questionTableAnswerMap[1]; //后台的答案数据
                for (var i = 0; i < newC.length; i++) { //遍历答案数据
                	/*2018-12-21 修改*/
                	var isEdiy=false;
                	var isColor='#fff';
                	if(newC[i].source==1){
                		isEdiy=true;
                		isColor='#dedede';
                	}
                	/*2018-12-21 修改 end*/
                	
                    for (var j = 0; j < du.children().length; j++) { //循环li
                        if (newC[i].investigateTableCode == du.children().eq(j).attr("data")) { //判断li的code和后台传过来的答案的code是否相同
                            du.children().eq(j).attr("_id", newC[i].id); //把后台的id传给li
                            du.children().eq(j).show(); //li显示出来
                            if (du.children().eq(j).find(".right span").length == 1) { //判断li是什么样的类型，span类型
                                if (newC[i].value != null && newC[i].value != "") { //判断数据是否为空
                                    var dzxq = du.children().eq(j).find(".right span"); //地址详情的span
                                    if (du.children().eq(j).attr("_cd") != undefined) { //判断类型是否是code(弹窗类型)
                                        var _qa = du.children().eq(j).attr("_tn").split(","); //用逗号把所有选项切割开来
                                        for (var q = 0; q < _qa.length; q++) { //循环切割开来的数组
                                            if (_qa[q].substring(0, _qa[q].indexOf(":")) == newC[i].value) { //判断guid是否相等
                                            	du.children().eq(j).find(".right").css('background',isColor);
                                                du.children().eq(j).find(".right span").text(_qa[q].substring(_qa[q].indexOf(":") + 1)).attr('data-source',newC[i].source); //把guid所对应的中文显示到页面上
                                                du.children().eq(j).attr("_name", _qa[q].substring(0, _qa[q].indexOf(":"))); //给li加上中文所对应的guid
                                                du.children().eq(j).find(".right span").attr("name", _qa[q].substring(0, _qa[q].indexOf(":"))); //给span加上中文所对应的guid
                                                if (newC[i].value != "请选择") { //颜色调整
                                                    du.children().eq(j).find(".left i").css({
                                                        "color": "#a09fa4"
                                                    });
                                                    du.children().eq(j).find(".right span").css({
                                                        "color": "#191919"
                                                    });
                                                }
                                            }
                                        }
                                    }
                                    if (dzxq.attr("cdxq") != undefined) { //判断类型是否为地址详情(省市区+详细地址)
                                        var _tv = newC[i].value.split("||"); //答案用||切割开来
                                        dzxq.attr("guid", _tv[0]); //给span添加guid
                                        var Atv = AndroidJs.getAddressByGuid(_tv[0]); //调用安卓的方法将guid转为中文
                                        du.children().eq(j).find(".right span").text(Atv); //把省市区附到span上
                                        du.children().eq(j).find(".x-address input").val(_tv[1]); //把详细地址附到input上
                                        if (Atv != null) { //颜色调整
                                            du.children().eq(j).find(".left i").css({
                                                "color": "#a09fa4"
                                            });
                                            du.children().eq(j).find(".right span").css({
                                                "color": "#191919"
                                            });
                                            du.children().eq(j).find(".x-address p i").css({
                                                "color": "#a09fa4"
                                            });
                                        }
                                    }
                                    if (dzxq.attr("cdz") != undefined) { //判断类型是否为地址详情(省市区)
                                        var _tv = newC[i].value.split("||"); //答案用||切割开来
                                        dzxq.attr("guid", _tv[0]); //给span添加guid
                                        var Atv = AndroidJs.getAddressByGuid(_tv[0]); //调用安卓的方法将guid转为中文
                                        du.children().eq(j).find(".right span").text(Atv); //把省市区附到span上
                                        if (Atv != null) { //颜色调整
                                            du.children().eq(j).find(".left i").css({
                                                "color": "#a09fa4"
                                            });
                                            du.children().eq(j).find(".right span").css({
                                                "color": "#191919"
                                            });
                                        }
                                    }
                                }
                            } else if (du.children().eq(j).find(".right input").length == 1) { //input类型
                                if (newC[i].value != "" && newC[i].value != null) {
                                    du.children().eq(j).find(".right input").val(newC[i].value).attr('disabled',isEdiy); //把值附到input上
                                    du.children().eq(j).find(".left i").css({
                                        "color": "#a09fa4"
                                    });
                                    du.children().eq(j).find(".right label").css({
                                        "color": "#191919"
                                    });
                                }
                            } else if (du.children().eq(j).find(".right label").length == 2) { //radio类型
                                for (var k = 0; k < du.children().eq(j).find(".right label").length; k++) { //循环label
                                    if (du.children().eq(j).find(".right label").eq(k).children("input").val() == newC[i].value) { //判断答案的值和label的value值是否相等
                                        du.children().eq(j).find(".right label").eq(k).children("input").attr("checked", true); //相等的话把当前的input置为true
                                        du.children().eq(j).find(".right label").eq(k).children("input").next("i").show().parent().siblings().children("i").hide(); //当前的i显示,其他的i隐藏
                                        du.children().eq(j).find(".right label").eq(k).children("input").parent().siblings().children("input").attr("checked", false); //将其他的input置为false
                                        du.children().eq(j).find(".right label").eq(k).children("input").parents("li").find(".left i").css({
                                            "color": "#a09fa4"
                                        }); //颜色调整
                                    }
                                }
                            } else if (du.children().eq(j).find(".textCons textarea").length == 1) { //textarea类型
                                if (newC[i].value != null) { //判断是否值为空
                                    du.children().eq(j).find(".textCons textarea").val(newC[i].value); //把值附到textarea上
                                    $(".textareaStyle i").css({
                                        "color": "#a09fa4"
                                    });
                                }
                            } else if (du.children().eq(j).find(".phone input").length == 3) { //家庭电话类型
                                if (newC[i].value != null) { //判断是否值为空
                                    var t_v = newC[i].value;
                                    var _tv = t_v.split("-"); //把值用-切割开来
                                    if (_tv.length != "1") {
                                        for (var k = 0; k < du.children().eq(j).find(".phone input").length; k++) { //循环input
                                            du.children().eq(j).find(".phone input").eq(k).val(_tv[k]); //把相对应的值赋给input
                                        }
                                    } else {
                                        du.children().eq(j).find(".phone input").eq(1).val(_tv[0]);
                                    }
                                    if (newC[i].value != "--") { //颜色调整
                                        du.children().eq(j).find(".left i").css({
                                            "color": "#a09fa4"
                                        });
                                    }
                                }
                                continue;
                            } else if (du.children().eq(j).children(".right").hasClass("chenckbox")) { //多选类型
                                if (newC[i].value != null) { //判断是否值为空
                                    var t_v = newC[i].value.split(","); //把值用逗号切割开来
                                    for (var k = 0; k < du.children().eq(j).find(".right label").length; k++) { //循环所有的label
                                        for (var l = 0; l < t_v.length; l++) { //循环用逗号切割开来的数组
                                            if (du.children().eq(j).find(".right label").eq(k).children("span").attr("name") == t_v[l]) { //判断guid和切割开来的guid是否相等
                                                du.children().eq(j).find(".right label").eq(k).children("input").attr("checked", true); //相等就把该input置为true
                                                du.children().eq(j).find(".right label").eq(k).children("img").attr("src", "img/jxt_icon.png"); //添加选中图片
                                                du.children().eq(j).find(".right label").eq(k).children('span').css('color', '#191919'); //颜色调整
                                                du.children().eq(j).find(".left i").css('color', '#a0a0a0');
                                            }
                                        }
                                    }
                                }
                                continue;
                            } else if (du.children().eq(j).find(".qdate input").length == 2) { //两个日期
                                if (newC[i].value != null) { //判断是否值为空
                                    var t_v = newC[i].value;
                                    var _tv = t_v.split(","); //把值用-切割开来
                                    for (var k = 0; k < du.children().eq(j).find(".qdate input").length; k++) { //循环input
                                        if (_tv[k] != undefined) {
                                            du.children().eq(j).find(".qdate input").eq(k).val(_tv[k]); //把相对应的值赋给input
                                        }

                                    }
                                    if (newC[i].value != "--") { //颜色调整
                                        du.children().eq(j).find(".left i").css({
                                            "color": "#a09fa4"
                                        });
                                    }
                                }
                                continue;
                            }
                        }
                    }
                }
            }
        }
    }


    for (var i = 0; i < du.children().length; i++) { //循环所有li
        for (var j = 0; j < c.questionTableList.length; j++) { //循环所有问题
            if (du.children().eq(i).attr("data") == c.questionTableList[j].code) { //判断li的code和问题的code是否相等
                if (c.questionTableList[j].isControlShow == 1) { //判断该问题不受别的问题控制并且可以控制别的问题动态显示
                    if (du.children().eq(i).is(":visible")) { //判断该li是否显示
                        if (du.children().eq(i).find(".right span").length == 1) { //code类型
                            var cr = du.children().eq(i).attr("_name"); //所选中的code值
                            var appCr = c.questionTableList[j].controlShowRuleList; //该问题的动态显示规则
                            $(appCr).each(function () { //循环动态规则的数组
                                if (regular($(this)[0].key).test(cr)) { //匹配正则
                                    for (var u = 0; u < $(this)[0].code.length; u++) { //循环正则匹配的code数组
                                        var cu = $(this)[0].code[u];
                                        du.children().each(function () { //循环li
                                            if ($(this).attr("data") == cu) { //判断li的code和正则匹配的code相等的话,li显示
                                                $(this).show();
                                            }
                                        })
                                    }
                                }
                            })
                        } else if (du.children().eq(i).find(".right input").length == 1) { //input类型
                            var cr = du.children().eq(i).find(".right input").val(); //input的value值
                            var appCr = c.questionTableList[j].controlShowRuleList; //该问题的动态显示规则
                            $(appCr).each(function () { //循环动态规则的数组
                                if (regular($(this)[0].key).test(cr)) { //匹配正则
                                    for (var u = 0; u < $(this)[0].code.length; u++) { //循环正则匹配的code数组
                                        var cu = $(this)[0].code[u];
                                        du.children().each(function () { //循环li
                                            if ($(this).attr("data") == cu) { //判断li的code和正则匹配的code相等的话,li显示
                                                $(this).show();
                                            }
                                        })
                                    }
                                }
                            })
                        } else if (du.children().eq(j).find(".right label").length == 2) {
                            for (var k = 0; k < du.children().eq(j).find(".right label").length; k++) { //循环label
                                if (du.children().eq(j).find(".right label").eq(k).children("input").prop("checked")) { //判断label的input是否选中
                                    var cr = du.children().eq(i).find(".right label").eq(k).children("input").val(); //input的value值
                                    var appCr = c.questionTableList[j].controlShowRuleList; //该问题的动态显示规则
                                    $(appCr).each(function () { //循环动态规则的数组
                                        if (regular($(this)[0].key).test(cr)) { //匹配正则
                                            for (var u = 0; u < $(this)[0].code.length; u++) { //循环正则匹配的code数组
                                                var cu = $(this)[0].code[u];
                                                du.children().each(function () { //循环li
                                                    if ($(this).attr("data") == cu) { //判断li的code和正则匹配的code相等的话,li显示
                                                        $(this).show();
                                                    }
                                                })
                                            }
                                        }
                                    })
                                }
                            }
                        }
                    }
                    ;
                }
            }
        }
    }


    //校验
    $(".show li").each(function (index, obj) //循环li
    {
        $(obj).attr("fieldname", $(obj).attr("data")); //li添加属性
    });

    var questionList = c.questionTableList; //校验规则
    for (var qIndex = 0; qIndex < questionList.length; qIndex++) //循环问题,给问题添加属性
    {
        questionList[qIndex]["fieldName"] = questionList[qIndex]["code"];
        questionList[qIndex]["inputType"] = questionList[qIndex]["type"];
    }
    var _checked = [];
    var _chk = _data;
    _chk["fieldName"] = _data.code;
    _chk["inputType"] = _data.answerInput;
    _checked.push(_chk);
    h_zjChecked.initQuestionMap("question", _checked);
    h_zjChecked.initQuestionMap("questionShow", questionList);
    h_zjChecked.initAutoCheckTrigger();
}


function crd(cqt, _id, du, _idj) { //创建页面cqt:c.questionTableList[i];
    var _crdLi;
    var isModification='';//是否能修改
    if(cqt.sourceType=='1'){//1,能改，2不能改
    	sModification='style="background:#fff"';
    }else if(cqt.sourceType=='2'){
    	sModification='disabled="disabled" style="background:#f8f8f8"';
    }else{
    	sModification='style="background:#fff"';
    }
    if (cqt.type == "STRING") { //文本框
        var _cut = cqt.inputUnit; //单位
        if (_cut == null) {
            _cut = "";
        }
        if (cqt.require) { //require:是否必填,data:问题code,checkMark:校验类型,limitLength:文本长度
            _crdLi = $('<li invesT="' + cqt.isLabel + '" require="' + cqt.require + '" data="' + cqt.code + '" checkMark="' + cqt.checkMark + '" limitLength="' + cqt.limitLength + '"><div class="left"><span>*</span><i title="' + cqt.name + '">' + cqt.name + '</i></div><div class="right"><input type="text" '+sModification+' placeholder="请输入' + cqt.name + '"/><b class="yuan">' + _cut + '</b></div></li>')
            _crdLi.appendTo(du);
        } else {
            _crdLi = $('<li invesT="' + cqt.isLabel + '" require="' + cqt.require + '" data="' + cqt.code + '" checkMark="' + cqt.checkMark + '" limitLength="' + cqt.limitLength + '"><div class="left"><span>&nbsp;&nbsp;</span><i title="' + cqt.name + '">' + cqt.name + '</i></div><div class="right"><input '+sModification+' type="text" placeholder="请输入' + cqt.name + '"/><b class="yuan">' + _cut + '</b></div></li>')
            _crdLi.appendTo(du)
        }
    }
    ;

if (cqt.type == "RADIO") { //单选
    	var _al = cqt.code.split(",");
        var _idv = cqt.code.replace(/\./g, "-"); //分割code
        var adrID = 'adr' + _idv; //给div设id
        if (cqt.answerChoice == null) { //待补充，暂时想不起来
            _crdLi = $('<li invesT="' + cqt.isLabel + '" require="' + cqt.require + '" data="' + cqt.code + '" checkMark="' + cqt.checkMark + '" limitLength="' + cqt.limitLength + '"><div class="left"><span>*</span><i title="' + cqt.name + '">' + cqt.name + '</i></div><div class="right" onClick="getProvinceBuy(this.id)" id="' + adrID + '"><span class="choose">请选择</span><img src="img/down_icon.png" class="select"/></div></li>');
            _crdLi.appendTo(du);
        } else {
            var _cl = cqt.codeDicList;
            var _idv = cqt.code.replace(/\./g, "-"); //分割code
            var t_yn = "";
            for (var s = 0; s < cqt.codeDicList.length; s++) {
                t_yn += cqt.codeDicList[s].code + ":" + cqt.codeDicList[s].name + ","
            }
        var _tyn = t_yn.substring(0, t_yn.length - 1); //给div设id
        var _cut = cqt.inputUnit; 
        if (_cut == null) {
            _cut = "";
        }
        if (cqt.require) { //require:是否必填,data:问题code,checkMark:校验类型,limitLength:文本长度
            _crdLi = $('<li _tn="' + _tyn + '" invesT="' + cqt.isLabel + '" require="' + cqt.require + '" data="' + cqt.code + '" checkMark="' + cqt.checkMark + '" limitLength="' + cqt.limitLength + '"><div class="left"><span>*</span><i title="' + cqt.name + '">' + cqt.name + '</i></div><div class="right"><label><input name="' + cqt.code + '" type="radio" '+sModification+' value="' + cqt.codeDicList[0].code + '"/>' + cqt.codeDicList[0].name + '<i></i></label><label><input name="cqt.code" type="radio" '+sModification+' value="' + cqt.codeDicList[1].code + '"/>' + cqt.codeDicList[1].name + '<i></i></label></div></li>');
            _crdLi.appendTo(du);
        } else {
           _crdLi = $('<li _tn="' + _tyn + '" invesT="' + cqt.isLabel + '" require="' + cqt.require + '" data="' + cqt.code + '" checkMark="' + cqt.checkMark + '" limitLength="' + cqt.limitLength + '"><div class="left"><span>&nbsp;&nbsp;</span><i title="' + cqt.name + '">' + cqt.name + '</i></div><div class="right"><label><input name="' + cqt.code + '" type="radio" '+sModification+' value="' + cqt.codeDicList[0].code + '"/>' + cqt.codeDicList[0].name + '<i></i></label><label><input name="' + cqt.code + '" '+sModification+' type="radio" value="' + cqt.codeDicList[1].code + '"/>' + cqt.codeDicList[1].name + '<i></i></label></div></li>');
           _crdLi.appendTo(du);
        }
       }
    };

    if (cqt.type == "CODE") { //选择（弹窗）//require:是否必填,data:问题code,checkMark:校验类型,limitLength:文本长度
        var _al = cqt.code.split(",");
        var _idv = cqt.code.replace(/\./g, "-"); //分割code
        var adrID = 'adr' + _idv; //给div设id
        if (cqt.answerChoice == null) { //待补充，暂时想不起来
            _crdLi = $('<li invesT="' + cqt.isLabel + '" require="' + cqt.require + '" data="' + cqt.code + '" checkMark="' + cqt.checkMark + '" limitLength="' + cqt.limitLength + '"><div class="left"><span>*</span><i title="' + cqt.name + '">' + cqt.name + '</i></div><div class="right" onClick="getProvinceBuy(this.id)" id="' + adrID + '"><span class="choose">请选择</span><img src="img/down_icon.png" class="select"/></div></li>');
            _crdLi.appendTo(du);
        } else {
            var _cl = cqt.codeDicList;
            var _idv = cqt.code.replace(/\./g, "-"); //分割code
            var t_yn = "";
            for (var s = 0; s < cqt.codeDicList.length; s++) {
                t_yn += cqt.codeDicList[s].code + ":" + cqt.codeDicList[s].name + ","
            }
            var _tyn = t_yn.substring(0, t_yn.length - 1); //给div设id
            if (cqt.require) { //是否必填
//              if (_cl.length == 2) { //判断是弹窗还是radio//两个
//                  _crdLi = $('<li _tn="' + _tyn + '" invesT="' + cqt.isLabel + '" require="' + cqt.require + '" data="' + cqt.code + '" checkMark="' + cqt.checkMark + '" limitLength="' + cqt.limitLength + '"><div class="left"><span>*</span><i title="' + cqt.name + '">' + cqt.name + '</i></div><div class="right"><label><input name="' + cqt.code + '" type="radio" value="' + cqt.codeDicList[0].code + '"/>' + cqt.codeDicList[0].name + '<i></i></label><label><input name="cqt.code" type="radio" value="' + cqt.codeDicList[1].code + '"/>' + cqt.codeDicList[1].name + '<i></i></label></div></li>');
//                  _crdLi.appendTo(du);

//              } else { //多个
                    _crdLi = $('<li _tn="' + _tyn + '" _cd="' + cqt.type + '" invesT="' + cqt.isLabel + '" require="' + cqt.require + '" data="' + cqt.code + '" checkMark="' + cqt.checkMark + '" limitLength="' + cqt.limitLength + '"><div class="left"><span>*</span><i title="' + cqt.name + '">' + cqt.name + '</i></div><div id="' + _idv + '" class="right"><span class="choose">请选择</span><img src="img/down_icon.png" class="select"/></div></li>');
                    _crdLi.appendTo(du);
                    _iddv = $('#' + _idv);
                    _idj[_idv] = cqt; //单独的id存到json里面
                    if (cqt.isAllowRepeat == 0) {
                        _iddv.on("click", function () { //给每个id绑定事件
                            var id = this.id; //点击的id
                            mask2(_idj[id], $(this), true); //遮罩层
                        });
                    } else {
                        _iddv.on("click", function () { //给每个id绑定事件
                            var id = this.id; //点击的id
                            mask2(_idj[id], $(this)); //遮罩层
                        });
                    }
//              }
            } else {
//              if (_cl.length == 2) { //判断是弹窗还是radio//两个
//                  _crdLi = $('<li _tn="' + _tyn + '" invesT="' + cqt.isLabel + '" require="' + cqt.require + '" data="' + cqt.code + '" checkMark="' + cqt.checkMark + '" limitLength="' + cqt.limitLength + '"><div class="left"><span>&nbsp;&nbsp;</span><i title="' + cqt.name + '">' + cqt.name + '</i></div><div class="right"><label><input name="' + cqt.code + '" type="radio" value="' + cqt.codeDicList[0].code + '"/>' + cqt.codeDicList[0].name + '<i></i></label><label><input name="' + cqt.code + '" type="radio" value="' + cqt.codeDicList[1].code + '"/>' + cqt.codeDicList[1].name + '<i></i></label></div></li>');
//                  _crdLi.appendTo(du);
//              } else { //多个
                    _crdLi = $('<li _tn="' + _tyn + '" _cd="' + cqt.type + '"  invesT="' + cqt.isLabel + '" require="' + cqt.require + '" data="' + cqt.code + '" checkMark="' + cqt.checkMark + '" limitLength="' + cqt.limitLength + '"><div class="left"><span>&nbsp;&nbsp;</span><i title="' + cqt.name + '">' + cqt.name + '</i></div><div id="' + _idv + '" class="right"><span class="choose">请选择</span><img src="img/down_icon.png" class="select"/></div></li>');
                    _crdLi.appendTo(du);
                    _iddv = $('#' + _idv);
                    _idj[_idv] = cqt; //单独的id存到json里面
                    if (cqt.isAllowRepeat == 0) {
                        _iddv.on("click", function () { //给每个id绑定事件
                            var id = this.id; //点击的id
                            mask2(_idj[id], $(this), true); //遮罩层
                        });
                    } else {
                        _iddv.on("click", function () { //给每个id绑定事件
                        	/*限制弹窗2018-12-21*/
                        	if($(this).children('span').attr('data-source')==1){
                        		return;
                        	}
                        	/*限制弹窗2018-12-21 end*/
                            var id = this.id; //点击的id
                            mask2(_idj[id], $(this)); //遮罩层
                        });
                    }
//              }
            }
        }
    }
    ;

    if (cqt.type == "DATE") { //日期
        var _al = cqt.code.split(",");
        //给div设id
        var _idv = cqt.code.replace(/\./g, "-"); //分割code
        var dateID = 'date' + _idv;
        if (cqt.require) { //是否必填
            _crdLi = $('<li invesT="' + cqt.isLabel + '" require="' + cqt.require + '" data="' + cqt.code + '" checkMark="' + cqt.checkMark + '" limitLength="' + cqt.limitLength + '"><div class="left"><span>*</span><i title="' + cqt.name + '">' + cqt.name + '</i></div><div class="right"><input id="' + dateID + '" type="text" readonly '+sModification+' name="input_date" placeholder="日期选择" data-lcalendar="1916-01-11,2116-05-29"/></div></li>');
            _crdLi.appendTo(du);
        } else {
            _crdLi = $('<li invesT="' + cqt.isLabel + '" require="' + cqt.require + '" data="' + cqt.code + '" checkMark="' + cqt.checkMark + '" limitLength="' + cqt.limitLength + '"><div class="left"><span>&nbsp;&nbsp;</span><i title="' + cqt.name + '">' + cqt.name + '</i></div><div class="right"><input id="' + dateID + '" '+sModification+' type="text" readonly name="input_date" placeholder="日期选择" data-lcalendar="1916-01-11,2116-05-29" /></div></li>');
            _crdLi.appendTo(du);
        }
        var calendar = new lCalendar();
        calendar.init({
            'trigger': '#' + dateID,
            'type': 'date'
        });
    }
    ;

    if (cqt.type == "DATEZONE") { //日期(任意选择时间段)
        var _al = cqt.code.split(",");
        //给div设id
        var _idv = cqt.code.replace(/\./g, "-"); //分割code
        var dateID = 'date' + _idv;
        if (cqt.require) {
            //是否必填
            _crdLi = $('<li invesT="' + cqt.isLabel + '" require="' + cqt.require + '" data="' + cqt.code + '" checkMark="' + cqt.checkMark + '" limitLength="' + cqt.limitLength + '"><div class="left"><span>*</span><i>' + cqt.name + '</i></div><div class="right phone qdate"><input '+sModification+' style="width:2.5rem;text-align:center" id="' + dateID + '" type="text" readonly="" name="input_date" placeholder="日期选择" data-lcalendar="1916-01-11,2116-05-29"><b>-</b><input style="width:2.5rem;text-align:center" id="' + (dateID + "1") + '" type="text" readonly="" name="input_date" placeholder="日期选择" data-lcalendar="1916-01-11,2116-05-29"></div></li>')
            _crdLi.appendTo(du);
        } else {
            _crdLi = $('<li invesT="' + cqt.isLabel + '" require="' + cqt.require + '" data="' + cqt.code + '" checkMark="' + cqt.checkMark + '" limitLength="' + cqt.limitLength + '"><div class="left"><span>&nbsp;&nbsp;</span><i>' + cqt.name + '</i></div><div class="right phone qdate"><input '+sModification+' style="width:2.5rem;text-align:center" id="' + dateID + '" type="text" readonly="" name="input_date" placeholder="日期选择" data-lcalendar="1916-01-11,2116-05-29"><b>-</b><input style="width:2.5rem;text-align:center" id="' + (dateID + "1") + '" type="text" readonly="" name="input_date" placeholder="日期选择" data-lcalendar="1916-01-11,2116-05-29"></div></li>')
            _crdLi.appendTo(du);
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
    }
    ;

    if (cqt.type == "INTEGER") { //整数
        var _cut = cqt.inputUnit; //单位
        if (_cut == null) {
            _cut = "";
        }
        if (cqt.require) { //是否必填
            _crdLi = $('<li invesT="' + cqt.isLabel + '" require="' + cqt.require + '" data="' + cqt.code + '" checkMark="' + cqt.checkMark + '" limitLength="' + cqt.limitLength + '"><div class="left"><span>*</span><i title="' + cqt.name + '">' + cqt.name + '</i></div><div class="right"><input kj type="number" '+sModification+' placeholder="请输入' + cqt.name + '"/><b class="yuan">' + _cut + '</b></div></li>');
            _crdLi.appendTo(du);
        } else {
            _crdLi = $('<li invesT="' + cqt.isLabel + '" require="' + cqt.require + '" data="' + cqt.code + '" checkMark="' + cqt.checkMark + '" limitLength="' + cqt.limitLength + '"><div class="left"><span>&nbsp;&nbsp;</span><i title="' + cqt.name + '">' + cqt.name + '</i></div><div class="right"><input astype="integer" '+sModification+' type="number" placeholder="请输入' + cqt.name + '"/><b class="yuan">' + _cut + '</b></div></li>');
            _crdLi.appendTo(du);
        }
    }
    ;

    if (cqt.type == "DOUBLE") { //小数
        var _cut = cqt.inputUnit;
        if (_cut == null) {
            _cut = "";
        }
        if (cqt.require) { //是否必填
            _crdLi = $('<li invesT="' + cqt.isLabel + '" require="' + cqt.require + '" data="' + cqt.code + '" checkMark="' + cqt.checkMark + '" limitLength="' + cqt.limitLength + '"><div class="left"><span>*</span><i title="' + cqt.name + '">' + cqt.name + '</i></div><div class="right"><input type="number" '+sModification+' placeholder="请输入' + cqt.name + '"/><b class="yuan">' + _cut + '</b></div></li>');
            _crdLi.appendTo(du);
        } else {
            _crdLi = $('<li invesT="' + cqt.isLabel + '" require="' + cqt.require + '" data="' + cqt.code + '" checkMark="' + cqt.checkMark + '" limitLength="' + cqt.limitLength + '"><div class="left"><span>&nbsp;&nbsp;</span><i title="' + cqt.name + '">' + cqt.name + '</i></div><div class="right"><input type="number" '+sModification+' placeholder="请输入' + cqt.name + '"/><b class="yuan">' + _cut + '</b></div></li>');
            _crdLi.appendTo(du);
        }
    }
    ;

    if (cqt.type == "TELEPHONE") { //电话
        var _cut = cqt.inputUnit;
        if (_cut == null) {
            _cut = "";
        }
        if (cqt.require) { //是否必填
            _crdLi = $('<li invesT="' + cqt.isLabel + '" require="' + cqt.require + '" data="' + cqt.code + '" checkMark="' + cqt.checkMark + '" limitLength="' + cqt.limitLength + '"><div class="left"><span>*</span><i title="' + cqt.name + '">' + cqt.name + '</i></div><div class="right phone"><input '+sModification+' type="number" placeholder="区号"/><b>-</b><input type="number" '+sModification+' placeholder="电话号码"/><b>-</b><input type="number" '+sModification+' placeholder="分机号"/></div></li>');
            _crdLi.appendTo(du);
        } else {
            _crdLi = $('<li invesT="' + cqt.isLabel + '" require="' + cqt.require + '" data="' + cqt.code + '" checkMark="' + cqt.checkMark + '" limitLength="' + cqt.limitLength + '"><div class="left"><span>&nbsp;&nbsp;</span><i title="' + cqt.name + '">' + cqt.name + '</i></div><div class="right phone"><input '+sModification+' type="number" placeholder="区号"/><b>-</b><input type="number" '+sModification+' placeholder="电话号码"/><b>-</b><input type="number" '+sModification+' placeholder="分机号"/></div></li>');
            _crdLi.appendTo(du);
        }
    }

    if (cqt.type == "CHECKBOX") { //复选框
        var html = "";
        var _cn = "";
        for (var h = 0; h < cqt.codeDicList.length; h++) {
            _cn += cqt.codeDicList[h].code + ":" + cqt.codeDicList[h].name + ","
            html += '<label class="chenckboxNews">' +
                '<input type="checkbox" style="display:none"/>' +
                '<img src="img/jx_icon.png">' +
                '<span " name="' + cqt.codeDicList[h].code + '">' + cqt.codeDicList[h].name + '</span>' +
                '</label>';
        }
        var c_n = _cn.substring(0, _cn.length - 1);
        if (cqt.require) { //是否必填
            $('<li invesT="' + cqt.isLabel + '" _cn="' + c_n + '" _cb="' + cqt.type + '" code="' + cqt.code + '" isDynamicShow="' + cqt.isDynamicShow + '" " data="' + cqt.code + '" ><div class="left"><span>*</span><i title="' + cqt.name + '">' + cqt.name + '</i></div><div class="right chenckbox" >' + html + '</div></li>').appendTo(du);
        } else {
            $('<li invesT="' + cqt.isLabel + '" _cn="' + c_n + '" _cb="' + cqt.type + '" code="' + cqt.code + '" isDynamicShow="' + cqt.isDynamicShow + '" " require="' + cqt.require + '" data="' + cqt.code + '"><div class="left"><span>&nbsp;&nbsp;</span><i title="' + cqt.name + '">' + cqt.name + '</i></div><div class="right chenckbox">' + html + '</div></li>').appendTo(du);
        }
    }
    ;

    if (cqt.type == "ADDRESS") { //地址+详情
        var _idv = cqt.code.replace(/\./g, "-"); //分割code//分割code
        if (cqt.require) { //是否必填
            $('<li invesT="' + cqt.isLabel + '"  class="address" isDynamicShow="' + cqt.isDynamicShow + '" name="' + cqt.fieldName + '" require="' + cqt.require + '" data="' + cqt.code + '" inputtype="' + cqt.inputType + '"><div class="left"><span>*</span><i title="' + cqt.name + '">' + cqt.name + '</i></div><div id="' + _idv + '" class="right"  onclick="adree(this.id)"><span class="choose" cdxq="dzxq">请选择</span><img src="img/down_icon.png" class="select"/></div><div class="x-address"><p><span>&nbsp;&nbsp;</span><i>详细地址</i></p><p><input type="text" placeholder="请输入详细地址" /></p></div></li>').appendTo(du);
        } else {
            $('<li invesT="' + cqt.isLabel + '"  class="address" isDynamicShow="' + cqt.isDynamicShow + '" name="' + cqt.fieldName + '" require="' + cqt.require + '" data="' + cqt.code + '" inputtype="' + cqt.inputType + '"><div class="left"><span>&nbsp;&nbsp;</span><i title="' + cqt.name + '">' + cqt.name + '</i></div><div id="' + _idv + '" class="right"  onclick="adree(this.id)"><span class="choose" cdxq="dzxq">请选择</span><img src="img/down_icon.png" class="select"/></div><div class="x-address"><p><span>&nbsp;&nbsp;</span><i>详细地址</i></p><p><input type="text" placeholder="请输入详细地址" /></p></div></li>').appendTo(du);
        }
    }


    if (cqt.type == "SSQADDRESS") { //只有省市区地址
        var _idv = cqt.code.replace(/\./g, "-"); //分割code//分割code
        //			console.log(cqt.inputType)
        if (cqt.require) { //是否必填
            $('<li invesT="' + cqt.isLabel + '"  isDynamicShow="' + cqt.isDynamicShow + '" name="' + cqt.fieldName + '" require="' + cqt.require + '" data="' + cqt.code + '" inputtype="' + cqt.inputType + '"><div class="left"><span>*</span><i title="' + cqt.name + '">' + cqt.name + '</i></div><div id="' + _idv + '" class="right"  onclick="adree(this.id)"><span class="choose" cdz="dz">请选择</span><img src="img/down_icon.png" class="select"/></div></li>').appendTo(du);
        } else {
            $('<li invesT="' + cqt.isLabel + '"  isDynamicShow="' + cqt.isDynamicShow + '" name"' + cqt.fieldName + '" require="' + cqt.require + '" data="' + cqt.code + '" inputtype="' + cqt.inputType + '"><div class="left"><span>&nbsp;&nbsp;</span><i title="' + cqt.name + '">' + cqt.name + '</i></div><div id="' + _idv + '" class="right"  onclick="adree(this.id)"><span class="choose" cdz="dz">请选择</span><img src="img/down_icon.png" class="select"/></div></li>').appendTo(du);
        }
    }

    if (cqt.type == "TEXTAREA") { //textarea
        var _idv = cqt.code.replace(/\./g, "-"); //分割code//分割code
        if (cqt.require) {
            $('<li class="textareaStyle" invesT="' + cqt.isLabel + '" require="' + cqt.require + '" data="' + cqt.code + '" checkMark="' + cqt.checkMark + '" limitLength="' + cqt.limitLength + '">' +
                '<div class="left">' +
                '<span>*</span>' +
                '<i>' + cqt.name + '</i>' +
                '</div>' +
                '<div class="textCons right">' +
                '<textarea '+sModification+'></textarea>' +
                '</div>' +
                '</li>').appendTo(du);
        } else {
            $('<li class="textareaStyle" invesT="' + cqt.isLabel + '" require="' + cqt.require + '" data="' + cqt.code + '" checkMark="' + cqt.checkMark + '" limitLength="' + cqt.limitLength + '">' +
                '<div class="left">' +
                '<span>&nbsp;&nbsp;</span>' +
                '<i>' + cqt.name + '</i>' +
                '</div>' +
                '<div class="textCons right">' +
                '<textarea '+sModification+'></textarea>' +
                '</div>' +
                '</li>').appendTo(du);
        }
    }
    if (cqt.defaultValue != null && cqt.defaultValue != "") { //默认值
        if (cqt.require) { //判断是否必填
            if (_crdLi.children(".right").find("input").length == 1) { //input类型
                _crdLi.children(".right").find("input").val(cqt.defaultValue) //赋值
            } else if (_crdLi.children(".right").find("span").length == 1) { //code类型
                var _lcd = _crdLi.attr("_cd");
                var _tn = _crdLi.attr("_tn");
                var dzxq = _crdLi.find(".right span")
                if (_lcd != undefined) { //判断_cd是否有值
                    var _tns = _tn.split(","); //用逗号切割
                    for (var y = 0; y < _tns.length; y++) { //循环切割的数组
                        if (cqt.defaultValue.match(_tns[y].substring(0, _tns[y].indexOf(":")))) { //判断默认值和guid是否相等
                            _crdLi.find(".right span").text(_tns[y].substring(_tns[y].indexOf(":") + 1)); //给span赋值
                            _crdLi.attr("_name", _tns[y].substring(0, _tns[y].indexOf(":"))); //把guid添加到属性上
                            _crdLi.find(".right span").attr("_name", _tns[y].substring(0, _tns[y].indexOf(":"))); //把guid添加到属性上
                        }
                    }
                }
                if (_crdLi.find(".right span").text() != "请选择") { //颜色调整
                    _crdLi.find(".left i").css({
                        "color": "#a09fa4"
                    });
                    _crdLi.find(".right span").css({
                        "color": "#191919"
                    });
                }

            } else if (_crdLi.find(".right label").length == 2) { //单选类型
                // maybedoing
                for (var j = 0; j < _crdLi.find(".right label").length; j++) { //循环label
                    if (_crdLi.find(".right label").eq(j).children("input").val() == cqt.defaultValue) { //判断默认值和input的value值是否相等
                        _crdLi.find(".right label").eq(j).children("input").attr("checked", true); //把input置为true
                        _crdLi.find(".right label").eq(j).children("input").next("i").show().parent().siblings().children("i").hide(); //把当前input的i显示,其他的隐藏
                        _crdLi.find(".right label").eq(j).children("input").parent().siblings().children("input").attr("checked", false); //把其他input置为false
                        _crdLi.find(".right label").eq(j).children("input").parents("li").find(".left i").css({
                            "color": "#a09fa4"
                        });
                    }
                }

            }
        }
    }

    $('.problem li .chenckboxNews').unbind("click").on("click", function () { //checkbox复选框事件
        if ($(this).children('input').prop('checked') == true) { //判断当前多选框是否被选中
            $(this).children('img').attr('src', 'img/jxt_icon.png');
            $(this).children('span').css('color', '#191919');
            $(this).parents("li").find(".left i").css('color', '#a0a0a0');
        } else {
            $(this).children('img').attr('src', 'img/jx_icon.png');
            $(this).children('span').css('color', '#a0a0a0');
        }
        if ($('.problem li .chenckboxNews').children('input').prop('checked')) { //颜色调整

        } else {
            $(this).parents("li").find(".left i").css('color', '#191919');
        }
    })
    $('.textCons textarea').on('focus', function () {
        $(this).addClass('textYellow');
    }).on('blur', function () {
        $(this).removeClass('textYellow');
        if ($('.textCons textarea').val() != "") {
            $('.textareaStyle i').css({
                "color": "#a09fa4"
            });
        } else {
            $('.textareaStyle i').css({
                "color": "#191919"
            });
        }
    })
    $(".x-address").find("input").on("focus", function () { //获取焦点//详细地址
        //		$(this).parents("li").addClass("ylborder");//添加当前黄色下边框
        $(this).parents("li").siblings().removeClass("ylborder"); //删除其他黄色下边框
    }).on("blur", function () { //失去焦点
        $(this).parents("li").removeClass("ylborder");
        if ($(this).val() != "") {
            $(this).parent().siblings("p").children("i").css({
                "color": "#a09fa4"
            });
        } else {
            $(this).parent().siblings("p").children("i").css({
                "color": "#191919"
            });
        }
    });
    $(".problem li input[type='text'],input[type='number'],input[type='tel']").on("keyup change", function () { //获取焦点
        var _that = $(this);
        if ($(this).parents("li").attr("invest") == "1") { //判断是否是islabel为1
            $(".problem .cy span").each(function () { //循环所有的span
                if ($(this).hasClass("span_bg")) { //判断单签的那个页签
                    if (_that.val().length > 4) { //长度大于4的话取前4位
                        $(this).text(_that.val().substr(0, 4));
                    } else {
                        if (_that.val() == "") { //如果value值为空的话
                            $(this).text("页签"); //span的文字为页签
                        } else {
                            $(this).text(_that.val()); //把值赋给页签
                        }
                    }
                }
            })
        }

    });
    $(".problem li input[type='text'],input[type='number'],input[type='tel']").on("focus", function () { //获取焦点
        $(this).parents("li").addClass("ylborder"); //添加当前黄色下边框
        $(this).parents("li").siblings().removeClass("ylborder"); //删除其他黄色下边框
    });
    $(".problem li input[type='text'],input[type='number'],input[type='tel']").on("blur", function () { //失去焦点
        $(this).parents("li").removeClass("ylborder"); //删除当前黄色下边框
        if ($(this).val() != "") {
            $(this).parent().siblings(".left").children("i").css({
                "color": "#a09fa4"
            });
        } else {
            $(this).parent().siblings(".left").children("i").css({
                "color": "#191919"
            });
        }
    });
    $(".problem li label input[type='radio']").unbind("click").on("click", function () { //单选
        $(this).next("i").show().parent().siblings().children("i").hide(); //把i隐藏
        $(this).attr("checked", true); //把选中的input置为true
        $(this).parent().siblings().children("input").attr("checked", false); //把其他的input置为false
        $(this).parents("li").find(".left i").css({
            "color": "#a09fa4"
        });
        $(this).parents("li").addClass("ylborder").siblings().removeClass("ylborder");
        var _that = $(this).parent("label");
        if ($(this).parents("li").attr("invest") == "1") { //判断isLabel是否为1
            $(".problem .cy span").each(function () { //循环所有页签
                if ($(this).hasClass("span_bg")) { //判断当前选中的页签
                    if (_that.text().length > 4) { //判断长度是否大于4,大于4的话就截取前4位
                        $(this).text(_that.text().substr(0, 4));
                    } else {
                        if (_that.text() == "") { //如果value值为空的话
                            $(this).text("页签"); //span的文字为页签
                        } else {
                            $(this).text(_that.text()); //把值赋给页签
                        }
                    }
                }
            })
        }
        var _this = $(this); //单前点击的radio
        var r_t = true; //设个布尔值变量
        for (var q = 0; q < _data.questionTableList.length; q++) { //循环所有的问题列表
            if ($(this).parents("li").attr("data") == _data.questionTableList[q].code) { //
                if (_data.questionTableList[q].isControlShow == 1) {
                    for (var i = 0; i < _data.questionTableList[q].controlShowRuleList.length; i++) {
                        var _dcd = _data.questionTableList[q].controlShowRuleList[i].code;
                        if ($(this).val().match(_data.questionTableList[q].controlShowRuleList[i].key)) {
                            r_t = false;
                            for (var l = 0; l < _data.questionTableList[q].controlShowRuleList.length; l++) {
                                for (var n = 0; n < _this.parents("ul").children().length; n++) {
                                    for (var m = 0; m < _data.questionTableList[q].controlShowRuleList[l].code.length; m++) {
                                        if (_this.parents("ul").children().eq(n).attr("data") == _data.questionTableList[q].controlShowRuleList[l].code[m]) {
                                            _this.parents("ul").children().eq(n).hide();
                                            for (var h = 0; h < _this.parents("ul").children().length; h++) {
                                                if (_this.parents("ul").children().eq(h).attr("d_ata") != undefined) {
                                                    if (_this.parents("ul").children().eq(h).attr("d_ata") == _this.parents("ul").children().eq(n).attr("data")) {
                                                        _this.parents("ul").children().eq(h).hide()
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }

                            }
                            for (var j = 0; j < _this.parents("ul").children().length; j++) {
                                for (var k = 0; k < _dcd.length; k++) {
                                    if (_this.parents("ul").children().eq(j).attr("data") == _dcd[k]) {
                                        _this.parents("ul").children().eq(j).show();
                                        _this.parents("ul").children().eq(j).attr("d_ata", _data.questionTableList[q].code);
                                        for (var g = 0; g < _this.parents("ul").children().length; g++) {
                                            if (_this.parents("ul").children().eq(g).attr("d_ata") != undefined) {
                                                if (_this.parents("ul").children().eq(g).attr("d_ata") == _this.parents("ul").children().eq(j).attr("data")) {
                                                    _this.parents("ul").children().eq(g).show()
                                                }
                                            }

                                        }
                                    }
                                }
                            }
                        } else {
                            if (r_t == true) {
                                for (var l = 0; l < _data.questionTableList[q].controlShowRuleList.length; l++) {
                                    for (var n = 0; n < _this.parents("ul").children().length; n++) {
                                        for (var m = 0; m < _data.questionTableList[q].controlShowRuleList[l].code.length; m++) {
                                            if (_this.parents("ul").children().eq(n).attr("data") == _data.questionTableList[q].controlShowRuleList[l].code[m]) {
                                                _this.parents("ul").children().eq(n).hide();
                                                for (var g = 0; g < _this.parents("ul").children().length; g++) {
                                                    if (_this.parents("ul").children().eq(g).attr("d_ata") != undefined) {
                                                        if (_this.parents("ul").children().eq(g).attr("d_ata") == $(this).parents("li").attr("data")) {
                                                            _this.parents("ul").children().eq(g).hide();
                                                            _this.parents("ul").children().eq(g).removeAttr("d_ata");
                                                            for (var h = 0; h < _this.parents("ul").children().length; h++) {
                                                                if (_this.parents("ul").children().eq(h).attr("d_ata") != undefined) {
                                                                    if (_this.parents("ul").children().eq(h).attr("d_ata") == _this.parents("ul").children().eq(g).attr("data")) {
                                                                        _this.parents("ul").children().eq(h).hide()
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
                    }
                }
            }
        }
    });

    return _crdLi;
}


function mask2(id, _this, isAllowRepeat) { //创建遮罩层函数（1/2/3/4/5），id:外面传进来的code名，_this:外面传进来点击的对象
    _tc = true;
    var that = id.codeDicList;
    $('<div id="mask"><div class="mask_bg"></div><ul><div class="m_div"></div><li class="cancel">取消</li></ul></div>').appendTo("body");
    if (that.length == 1) {
        $(".cancel").before($('<li>1</li><li>2</li><li>3</li><li>4</li><li class="linone">5</li>'));
    } else {
        for (var i = 0; i < id.codeDicList.length; i++) {
            $(".m_div").append($("<li _name='" + id.codeDicList[i].code + "'>" + id.codeDicList[i].name + "</li>"))
        }
    }
    if (isAllowRepeat) {
        $("#mask li").each(function () {
            var th_at = $(this);
            _this.parents(".show").find(".cy span").each(function () {
                if ($(this).attr(id.name) != undefined) {
                    if ($(this).attr(id.name) == th_at.attr("_name")) {
                        th_at.hide();
                    }
                }

            })
        })
    }
    $("#mask li").on("click", function () {
        _tc = false;
        _this.parent().attr("_name", $(this).attr("_name"));
        _this.children(".right span").attr("name", $(this).attr("_name"));
        $("#mask").remove();
        var _that = $(this).html();
        if ($(this).hasClass('cancel')) {
        } else {
            _this.children("span").html($(this).html()).css({
                "color": "#191919"
            });
            _this.siblings(".left").children("i").css({
                "color": "#a09fa4"
            });
            if (_this.parent().attr("invest") == "1") {
                _this.parents(".show").find(".cy span").each(function () {
                    if ($(this).hasClass("span_bg")) {
                        if (_that.length > 4) {
                            $(this).text(_that.substr(0, 4));
                        } else {
                            $(this).text(_that);
                        }
                    }
                })
            }
        }
        if (id.isControlShow == 1) {
            var c_t = false;
            for (var i = 0; i < id.controlShowRuleList.length; i++) {
                var _dcd = id.controlShowRuleList[i].code;
                if ($(this).attr("_name") != undefined) {
                    if ($(this).attr("_name").match(id.controlShowRuleList[i].key)) {
                        c_t = true
                        for (var l = 0; l < id.controlShowRuleList.length; l++) {
                            for (var n = 0; n < _this.parents("ul").children().length; n++) {
                                for (var m = 0; m < id.controlShowRuleList[l].code.length; m++) {
                                    if (_this.parents("ul").children().eq(n).attr("data") == id.controlShowRuleList[l].code[m]) {
                                        _this.parents("ul").children().eq(n).hide();
                                        for (var h = 0; h < _this.parents("ul").children().length; h++) {
                                            if (_this.parents("ul").children().eq(h).attr("d_ata") != undefined) {
                                                if (_this.parents("ul").children().eq(h).attr("d_ata") == _this.parents("ul").children().eq(n).attr("data")) {
                                                    _this.parents("ul").children().eq(h).hide();
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                        }
                        for (var j = 0; j < _this.parents("ul").children().length; j++) {
                            for (var k = 0; k < _dcd.length; k++) {
                                if (_this.parents("ul").children().eq(j).attr("data") == _dcd[k]) {
                                    console.log(_dcd[k])
                                    _this.parents("ul").children().eq(j).show();
                                    _this.parents("ul").children().eq(j).attr("d_ata", id.code);
                                    for (var g = 0; g < _this.parents("ul").children().length; g++) {
                                        if (_this.parents("ul").children().eq(g).attr("d_ata") != undefined) {
                                            if (_this.parents("ul").children().eq(g).attr("d_ata") == _this.parents("ul").children().eq(j).attr("data")) {
                                                _this.parents("ul").children().eq(g).show();
                                            }
                                        }

                                    }
                                }
                            }
                        }
                    } else {
                        if (c_t == false) {
                            for (var l = 0; l < id.controlShowRuleList.length; l++) {
                                for (var n = 0; n < _this.parents("ul").children().length; n++) {
                                    for (var m = 0; m < id.controlShowRuleList[l].code.length; m++) {
                                        if (_this.parents("ul").children().eq(n).attr("data") == id.controlShowRuleList[l].code[m]) {
                                            _this.parents("ul").children().eq(n).hide();
                                            for (var g = 0; g < _this.parents("ul").children().length; g++) {
                                                if (_this.parents("ul").children().eq(g).attr("d_ata") != undefined) {
                                                    if (_this.parents("ul").children().eq(g).attr("d_ata") == _this.parents("ul").children().eq(n).attr("data")) {
                                                        _this.parents("ul").children().eq(g).hide();
                                                        //														_this.parents("ul").children().eq(g).removeAttr("d_ata");
                                                        for (var h = 0; h < _this.parents("ul").children().length; h++) {
                                                            if (_this.parents("ul").children().eq(h).attr("d_ata") != undefined) {
                                                                if (_this.parents("ul").children().eq(h).attr("d_ata") == _this.parents("ul").children().eq(g).attr("data")) {
                                                                    _this.parents("ul").children().eq(h).hide();
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
                }

            }
        }
        var t_hat = $(this);
        if (isAllowRepeat) {
            _this.parents(".show").find(".cy span").each(function () {
                if ($(this).hasClass("span_bg")) {
                    console.log(id)
                    $(this).attr(id.name, t_hat.attr("_name"))
                }
            })
        }
        return false;
    });
}

function status1(tsj, tf) {
    var status;
    if (answerType == "ONLYTABLE") {
        var arr = hzjChecked(tsj, tf);
        if (arr == 2) {
            status = 2;
        } else {
            status = 0;
            $(sj["questionTableAnswerList"]).each(function () {
                if ($(this)[0].value != null) {
                    status = 1;
                    return false;
                }
            })
        }
    }
    ;
    if (answerType == "TABLE" || answerType == "MULTIPLE") {
        if (du.children("li:first-child").find(".right span").text() != "请选择") {
            var arr = hzjChecked(tsj, tf);
            var _tj = {};
            _tj[_data.code] = sj["value"];
            var _tarr = h_zjChecked.checkFieldValuesAll("question", null, _tj, !tf);
            console.log(_tarr)
            //doing
            if (arr == 2) {
                if (_tarr) {
                    status = 2;
                } else {
                    status = 1;
                }
            } else {
                status = 1;
            }
        } else {
            if (tf) {

            }
            if (answerType == "MULTIPLE") {
                var _tarr = h_zjChecked.checkFieldValuesAll("question", null, _tj, !tf);
            }
            status = 0;
        }
    }
    ;
    return status;
}
function submit(tf) { //提交数据
    if (_data.id == null) { //判断后台是否有传id过来
        _data.id = null; //没有就把id为null传回去
    }
    if (_data.value == null) { //判断后台是否有传value过来
        _data.value = null; //没有就把id为null传回去
    }
    sj["id"] = _data.id; //把全局的sj（传回给后台的数据）赋值
    sj["investigateQuestionCode"] = _data.code; //把全局的sj（传回给后台的数据）赋值
    sj["value"] = _data.value; //把全局的sj（传回给后台的数据）赋值
    if (answerType == "ONLYTABLE" || answerType == "TABLE" || answerType == "MULTIPLE" || answerType == "CHECKBOXMULT" || answerType == "INPUTTABLE") {
        var sp_x;
        for (var z = 0; z < du.parent().siblings(".show").children(".cy").children("span").length; z++) {
            if (du.parent().siblings(".show").children(".cy").children("span").eq(z).hasClass("span_bg")) {
                sp_x = z;
            }
        }
        ;
        if (sp_x == undefined) {
            sp_x = 0;
        }
        tsj[sp_x + 1] = [];
        for (var i = 0; i < du.parent().siblings(".show").children("ul").children().length; i++) {
            if (du.parent().siblings(".show").children("ul").children().eq(i).css("display") == "none") {
            } else {
                var _js = {};
                var _jm = du.parent().siblings(".show").children("ul").children().eq(i).attr("data");
                var _jz;
                var _jd = du.parent().siblings(".show").children("ul").children().eq(i).attr("_id");
                if (_jd == undefined) {
                    _jd = null;
                }
                if (du.parent().siblings(".show").children("ul").children().eq(i).find(".right span").length == 1) {
                    if (du.parent().siblings(".show").children("ul").children().eq(i).attr("_cd") == "CODE") {
                        _jz = du.parent().siblings(".show").children("ul").children().eq(i).attr("_name");
                        if (_jz == "" || _jz == undefined) {
                            _jz = null;
                        }
                    } else if (du.parent().siblings(".show").children("ul").children().eq(i).find(".right span").attr("cdxq") == "dzxq") {
                        var ssq = du.parent().siblings(".show").children("ul").children().eq(i).find(".right span").attr("guid");
                        var dzxq = du.parent().siblings(".show").children("ul").children().eq(i).find(".x-address input").val();
                        _jz = ssq + "||" + dzxq;
                        if (_jz.trim() == "" || _jz == "请选择" || ssq == undefined) {
                            _jz = null;
                        }
                    } else if (du.parent().siblings(".show").children("ul").children().eq(i).find(".right span").attr("cdz") == "dz") {
                        var ssq = du.parent().siblings(".show").children("ul").children().eq(i).find(".right span").attr("guid");
                        _jz = ssq;
                        if (_jz.trim() == "" || _jz == "请选择" || ssq == undefined) {
                            _jz = null;
                        }
                    }
                } else if (du.parent().siblings(".show").children("ul").children().eq(i).find(".right input").length == 1) {
                    _jz = du.parent().siblings(".show").children("ul").children().eq(i).find(".right input").val();
                    if (_jz.trim() == "" || _jz == "请选择") {
                        _jz = null;
                    }
                } else if (du.parent().siblings(".show").children("ul").children().eq(i).find(".right label").length == 2) {
                    _jz = null;
                    for (var j = 0; j < du.parent().siblings(".show").children("ul").children().eq(i).find(".right label").length; j++) {
                        if (du.parent().siblings(".show").children("ul").children().eq(i).find(".right label").eq(j).children("input").attr("checked")) {
                            _jz = du.parent().siblings(".show").children("ul").children().eq(i).find(".right label").eq(j).children("input").val();
                            if (_jz.trim() == "" || _jz == "请选择") {
                                _jz = null;
                            }
                        }
                    }
                } else if (du.parent().siblings(".show").children("ul").children().eq(i).find(".textCons textarea").length == 1) {
                    _jz = du.parent().siblings(".show").children("ul").children().eq(i).find(".textCons textarea").val();
                    if (_jz.trim() == "" || _jz == "请选择") {
                        _jz = null;
                    }
                } else if (du.parent().siblings(".show").children("ul").children().eq(i).find(".phone input").length == 3) {
                    var _pho = "";
                    for (var j = 0; j < du.parent().siblings(".show").children("ul").children().eq(i).find(".phone input").length; j++) {
                        _pho += du.parent().siblings(".show").children("ul").children().eq(i).find(".phone input").eq(j).val() + "-";
                    }
                    var p_h = _pho.slice(0, -1);
                    if (p_h == "--") {
                        p_h = null;
                    }
                    if (p_h != null) {
                        if (p_h.substr(p_h.length - 1) == "-") {
                            p_h = p_h.slice(0, -1);
                        }
                    }
                    _jz = p_h;
                } else if (du.parent().siblings(".show").children("ul").children().eq(i).children(".right").hasClass("chenckbox")) {
                    var csp = "";
                    for (var k = 0; k < du.parent().siblings(".show").children("ul").children().eq(i).find(".chenckbox label").length; k++) {
                        if (du.parent().siblings(".show").children("ul").children().eq(i).find(".chenckbox label").eq(k).children("input").prop("checked")) {
                            csp += du.parent().siblings(".show").children("ul").children().eq(i).find(".chenckbox label").eq(k).children("span").attr("name") + ",";
                        }
                    }
                    var _csp = csp.slice(0, -1);
                    if (csp.trim() == "") {
                        _csp = null;
                    }
                    _jz = _csp;
                } else if (du.parent().siblings(".show").children("ul").children().eq(i).find(".qdate input").length == 2) {
                    var _pho = "";
                    for (var j = 0; j < du.parent().siblings(".show").children("ul").children().eq(i).find(".qdate input").length; j++) {
                        _pho += du.parent().siblings(".show").children("ul").children().eq(i).find(".qdate input").eq(j).val() + ",";
                    }
                    var p_h = _pho.slice(0, -1);
                    if (p_h == ",") {
                        p_h = null;
                    }
                    _jz = p_h;
                }
                _js["investigateTableCode"] = _jm;
                _js["value"] = _jz;
                _js["lineNo"] = sp_x + 1;
                _js["id"] = _jd;
                tsj[sp_x + 1].push(_js);
            }
        }
        ;
        sj["questionTableAnswerList"] = [];
        console.log(tsj)
        if ($(".show").length != 0) {
            for (var i in tsj) {
                for (var j = 0; j < tsj[i].length; j++) {
                    sj["questionTableAnswerList"].push(tsj[i][j]);
                }
            }
        }
    }
    if (answerType == "ONLYTABLE" || answerType == "TABLE" || answerType == "MULTIPLE") {
        if (du.children("li:first-child").find(".right span").text() == "请选择") {
            sj["value"] = null;
        } else {
            if (sj["value"] = du.children("li:first-child").attr("_name") != null) {
                sj["value"] = du.children("li:first-child").attr("_name");
            } else {
                sj["value"] = du.children("li:first-child").find(".right span").text();
            }
        }
        if (sj["value"] == "") {
            sj["value"] = null;
        }
        var status = status1(tsj, tf);
        console.log(status)
        //		$(".show").removeClass("table");
        //		checked.checkAll(true);
        //		console.log(aa)
        //TODO
        if (status == undefined) {
            status = 0;
        }
        if (sj.questionTableAnswerList.length == 0 && sj.value != null) {
            status = 2;
        }
        sj["completeStatus"] = status;
        du.parent().siblings(".show").find(".cy span").each(function () {
            if ($(this).hasClass("span_bg")) {
                var newJ = {};
                $(tsj[$(this).index() + 1]).each(function () {
                    newJ[$(this)[0].investigateTableCode] = $(this)[0].value;
                })
                h_zjChecked.checkFieldValuesAll("questionShow", null, newJ, false);
            }
        });
        sj = percent(sj, tf);
    }
    if (answerType == "CHECKBOXMULT") {
        var csp = "";
        console.log(du)
        for (var k = 0; k < du.children().first().find(".chenckbox label").length; k++) {
            if (du.children().first().find(".chenckbox label").eq(k).children("input").prop("checked")) {
                csp += du.children().first().find(".chenckbox label").eq(k).children("span").attr("name") + ",";
            }
        }
        var _csp = csp.slice(0, -1);
        if (csp.trim() == "") {
            _csp = null;
        }
        sj["value"] = _csp;
        if (sj["value"] == "") {
            sj["value"] = null;
        }
        var status;
        var arr = hzjChecked(tsj, tf);
        var _tj = {};
        _tj[_data.code] = sj["value"];
        //		var _tarr = h_zjChecked.checkFieldValuesAll("question",null,_tj,!tf);
        //doing
        if (arr == 2) {
            //			if(_tarr){
            //				status=2;
            //			}else{
            //				status=1;
            //			}
            status = 2
        } else {
            status = 1;
        }
        if (status == 1) {
            status = 0;
            $(sj["questionTableAnswerList"]).each(function () {
                if ($(this)[0].value != null) {
                    status = 1;
                    return false;
                }
            })
        }
        console.log(status)
        //		$(".show").removeClass("table");
        //		checked.checkAll(true);
        //		console.log(aa)
        //TODO
        if (status == undefined) {
            status = 0;
        }
        if (sj.questionTableAnswerList.length == 0 && sj.value != null) {
            status = 2;
        }
        ;
        sj["completeStatus"] = status;
        sj = percent(sj, tf);
    }
    if (answerType == "INPUTTABLE") {
        if (du.children("li:first-child").find(".right input").val().trim() != "") {
            sj["value"] = du.children("li:first-child").find(".right input").val();
        } else {
            sj["value"] = null;
        }
        if (sj["value"] == "") {
            sj["value"] = null;
        }
        var status;
        var arr = hzjChecked(tsj, tf);
        var _tj = {};
        _tj[_data.code] = sj["value"];
        var _tarr = h_zjChecked.checkFieldValuesAll("question", null, _tj, !tf);
        //doing
        if (sj["questionTableAnswerList"].length != 0) {
            if (arr == 2) {
                if (_tarr) {
                    status = 2;
                } else {
                    status = 1;
                }
            } else {
                status = 1;
            }
        } else {
            if (_tarr) {
                status = 2
            } else {
                if (sj["value"] != null) {
                    status = 1
                } else {
                    status = 0
                }
            }
        }
        if (sj["questionTableAnswerList"].length == 0 && !_tarr) {
            status = 0;
        }
        console.log(status)
        //		$(".show").removeClass("table");
        //		checked.checkAll(true);
        //		console.log(aa)
        //TODO
        if (status == undefined) {
            status = 0;
        }
        sj["completeStatus"] = status;
        du.parent().siblings(".show").find(".cy span").each(function () {
            if ($(this).hasClass("span_bg")) {
                var newJ = {};
                $(tsj[$(this).index() + 1]).each(function () {
                    newJ[$(this)[0].investigateTableCode] = $(this)[0].value;
                })
                h_zjChecked.checkFieldValuesAll("questionShow", null, newJ, false);
            }
        });
        sj = percent(sj, tf);
    }
    if (answerType == "INPUT") {
        if (du.children().first().find(".right input").length == 1) {
            sj["value"] = du.children().first().find(".right input").val();
        } else {
            sj["value"] = du.children().first().find("textarea").val();
        }
        sj["questionTableAnswerList"] = [];
        if (sj["value"] == "") {
            sj["value"] = null;
        }
        //		$(".show").addClass("table");
        //		$(".problem[modelname='questionShow']").data("questionShow", arr);
        var status;
        var _tarr = h_zjChecked.checkFieldValuesAll("question", null, _tj, !tf);
        //doing
        if (_tarr) {
            status = 2
        } else {
            if (sj["value"] != null) {
                status = 1
            } else {
                status = 0
            }
        }
        console.log(status)
        //		$(".show").removeClass("table");
        //		checked.checkAll(true);
        //		console.log(aa)
        //TODO
        if (status == undefined) {
            status = 0;
        }
        sj["completeStatus"] = status;
        sj = percent(sj, tf);
    }
    var _sj = JSON.stringify(sj)
    console.log(sj);
    AndroidJs.saveQuestionAnswer(_sj, tf)
    //	return _sj
};

//check_mark 校验标识(0表示不校验,1校验身份证，2手机号，3文本)
//文本需要校验长度，limitLength
function newCheck(tf, tsj) { //验证输入规则
    var _check = [];
    var dq = _data.questionTableList;
    for (i in tsj) {
        for (var j = 0; j < tsj[i].length; j++) {
            for (var k = 0; k < dq.length; k++) {
                var ft = true;
                if (tsj[i][j].investigateTableCode == dq[k].code) {
                    if (dq[k].isDynamicCheck == 1) {
                        for (var l = 0; l < dq[k].dynamicCheckRuleList.length; l++) {
                            var _cv = {};
                            if (dq[k].dynamicCheckRuleList[l].key.match(tsj[i][j].value)) {
                                for (var m = 0; m < tsj[i].length; m++) {
                                    if (tsj[i][m].investigateTableCode == dq[k].dynamicCheckRuleList[l].code) {
                                        var sa = regular(dq[k].dynamicCheckRuleList[l].checkrule);
                                        if (sa.test(tsj[i][m].value)) {
                                            _cv[tsj[i][m].investigateTableCode] = 2;
                                        } else {
                                            _cv[tsj[i][m].investigateTableCode] = 1;
                                            if (tf) {
                                                for (var n = 0; n < du.children().length; n++) {
                                                    if (du.children().eq(n).attr("data") == dq[k].dynamicCheckRuleList[l].code) {
                                                        du.children().eq(n).children(".left").find("i");
                                                    }
                                                }
                                                alert("请输入正确的" + dq[k].name);
                                            }
                                        }
                                        if (tsj[i][m].value == null || tsj[i][m].value == "" || tsj[i][m].value == "请选择" || tsj[i][m].value == undefined) {
                                            _cv[tsj[i][m].investigateTableCode] = 0;
                                        }
                                        _check.push(_cv);
                                    }

                                }
                            }
                        }
                    }
                    if (dq[k].require) {
                        for (var q = 0; q < _check.length; q++) {
                            for (key in _check[q]) {
                                if (key == dq[k].code) {
                                    ft = false;
                                }
                            }
                        }
                        if (ft) {
                            var _cv = {};
                            if (tsj[i][j].value == null) {
                                _cv[tsj[i][j].investigateTableCode] = 0;
                                _check.push(_cv);
                                if (tf) {
                                    alert("请填完必填项")
                                }
                            } else {
                                if (dq[k].checkMark == 2) {
                                    _cv = isTel(tsj[i][j], tf);
                                    _check.push(_cv);
                                } else if (dq[k].checkMark == 3) {
                                    _cv = isSt(tsj[i][j], dq[k].limitLength, tf);
                                    _check.push(_cv);
                                } else if (dq[k].checkMark == 0) {
                                    _cv[tsj[i][j].investigateTableCode] = 2
                                    _check.push(_cv);
                                } else if (dq[k].checkMark == 1) {
                                    _cv = isCardNo(card, tf);
                                    _check.push(_cv);
                                }
                            }
                        }
                    } else {
                        for (var q = 0; q < _check.length; q++) {
                            for (key in _check[q]) {
                                if (key == dq[k].code) {
                                    ft = false;
                                }
                            }
                        }
                        if (ft) {
                            if (tsj[i][j].value != null) {
                                var _cv = {};
                                if (dq[k].checkMark == 2) {
                                    _cv = isTel(tsj[i][j], tf);
                                    _check.push(_cv);
                                } else if (dq[k].checkMark == 3) {
                                    _cv = isSt(tsj[i][j], dq[k].limitLength, tf);
                                    _check.push(_cv);
                                } else if (dq[k].checkMark == 0) {
                                    _cv[tsj[i][j].investigateTableCode] = 2
                                    _check.push(_cv);
                                } else if (dq[k].checkMark == 1) {
                                    _cv = isCardNo(card, tf);
                                    _check.push(_cv);
                                }
                            }

                        }
                    }
                }
            }
        }
    }
    var _checked = [];
    for (var e = 0; e < _check.length; e++) {
        for (key in _check[e]) {
            _checked.push(_check[e][key]);
        }
    }
    var status = _inArray(_checked);
    return status;
}

function isCardNo(card, tf) { //身份证验证
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (card.value == "" || card.value == null) {
        if (tf) {
            alert("身份证输入不合法");
        }
        var t_v = {};
        t_v[card.investigateTableCode] = 0;
        return t_v;
    } else if (reg.test(card.value) === false && card.value != "" && card.value != null) {
        if (tf) {
            alert("身份证输入不合法");
        }
        var t_v = {};
        t_v[card.investigateTableCode] = 1;
        return t_v;
    } else {
        var t_v = {};
        t_v[card.investigateTableCode] = 2;
        return t_v;
    }
}

function isTel(tel, tf) { //手机验证
    var telReg = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    if (tel.value == "" || tel.value == null) {
        if (tf) {
            alert("请输入手机号");
        }
        var t_v = {};
        t_v[tel.investigateTableCode] = 0;
        return t_v;
    } else if (telReg.test(tel.value) === false && tel.value != "" && tel.value != null) {
        if (tf) {
            alert("手机号输入不合法");
        }
        var t_v = {};
        t_v[tel.investigateTableCode] = 1;
        return t_v;
    } else {
        var t_v = {};
        t_v[tel.investigateTableCode] = 2;
        return t_v;
    }
}

function isSt(st, num, tf) { //文本长度验证
    if (st.value == "" || st.value == null) {
        if (tf) {
            alert("请输入");
        }
        var t_v = {};
        t_v[st.investigateTableCode] = 0;
        return t_v;
    } else if (st.value.replace(/[^\x00-\xff]/g, "AA").length > parseInt(num) && st != "" && st != null) {
        if (tf) {
            alert("不能超过" + num + "个字符长度（或" + num / 2 + "个汉字）");
        }
        var t_v = {};
        t_v[st.investigateTableCode] = 1;
        return t_v;
    } else {
        var t_v = {};
        t_v[st.investigateTableCode] = 2;
        return t_v;
    }
}

function _inArray(osf) { //数组验证
    var status = 1;
    //	var in_array =function(arr){
    //		for(var i=0,k=arr.length;i<k;i++){
    //			if(this==arr[i]){
    //				return true;
    //			}
    //		}
    //		return false;
    //	}
    //	Number.prototype.in_array=in_array;
    //	var sa =0;
    //	var sd =1;
    //	var sf =2;
    //	for(var i=0;i<_osf.length;i++){
    //		console.log(osf[i])
    //		if(!sa.in_array(osf[i])&&!sd.in_array(osf[i])){
    //			status =2;
    //		}
    //		if(!sd.in_array(osf[i])&&!sf.in_array(osf[i])){
    //			status =0;
    //		}
    //	}
    Array.prototype.unique = function () {
        var n = []; //一个新的临时数组
        for (var i = 0; i < this.length; i++) { //遍历当前数组
            //如果当前数组的第i已经保存进了临时数组，那么跳过，
            //否则把当前项push到临时数组里面
            if (n.indexOf(this[i]) == -1) n.push(this[i]);
        }
        return n;
    }
    var _osf = osf.unique();
    if (_osf.length == 1) {
        status = _osf[0];
    } else {
        status = 1;
    }
    return status;
}


function regular(_str) { //正则
    var s_tr = "/" + _str + "/";
    return eval(s_tr)
}


function dialogStatus() {
    //TODO 弹窗状态
    AndroidJs.dialogStatus(_tc);
}

function close() {
    $("#mask").remove();
    _tc = false;
}
$("#next").click(next);

function next() {
    //TODO 下一题
    submit(true);
}
//check_mark 校验标识(0表示不校验,1校验身份证，2手机号，3文本)
//文本需要校验长度，limitLength


function hzjChecked(tsj, tf) {
    var tbstatus = 2;
    for (i in tsj) {
        var newJ = {};
        $(tsj[i]).each(function () {
            newJ[$(this)[0].investigateTableCode] = $(this)[0].value;
        })
        var a = h_zjChecked.checkFieldValuesAll("questionShow", null, newJ, true);
        if (!a) {
            tbstatus = 1
            if (tf) {
                $(".cy span").eq(i - 1).addClass("unfinish");
            }
        } else {
            if (tf) {
                $(".cy span").eq(i - 1).removeClass("unfinish")
            }
        }
    }
    return tbstatus
}

function percent(sj, tf) {
    var groupControlList = _data.groupControlList;
    var questionTableList = _data.questionTableList;
    var groupControlList1 = [];
    if (groupControlList != undefined && groupControlList != null) {
        if (groupControlList.length != 0) {
            $(groupControlList).each(function (i) {
                var groupCode = $(this)[0].groupCode;
                var groupTip = $(this)[0].tip;
                var groupTf = true;
                if (groupControlList1.length != 0) {
                    $(groupControlList1).each(function (k, val) {
                        if (val == groupCode) {
                            groupTf = false;
                        }
                    })
                }
                if (groupTf) {
                    groupControlList1.push($(this)[0].groupCode);
                }
            })
        }
    }
    if (questionTableList != undefined && questionTableList != null && questionTableList.length != 0) {
        $(questionTableList).each(function () {
            var qgroupControlList = $(this)[0].groupControlList;
            if (qgroupControlList != undefined && qgroupControlList != null && qgroupControlList.length != 0) {
                $(qgroupControlList).each(function () {
                    var groupCode = $(this)[0].groupCode;
                    var groupTf = true;
                    if (groupControlList1.length != 0) {
                        $(groupControlList1).each(function (k, val) {
                            if (val == groupCode) {
                                groupTf = false;
                            }
                        })
                    }
                    if (groupTf) {
                        groupControlList1.push($(this)[0].groupCode);
                    }
                });
            }
        });
    }
    ;
    if (groupControlList1.length != 0) {
        $(groupControlList1).each(function (i, val) {
            var groupControlList2 = [];
            var gcRule;
            var gcTip;
            if (groupControlList != undefined && groupControlList != null) {
                if (groupControlList.length != 0) {
                    $(groupControlList).each(function () {
                        var jtf = true;
                        var jcode = $(this)[0].code;
                        if (groupControlList2.length != 0) {
                            $(groupControlList2).each(function (j, jal) {
                                if (jal == jcode) {
                                    jtf = false;
                                }
                            })
                            if (jtf) {
                                groupControlList2.push($(this)[0].code);
                                gcRule = $(this)[0].rule;
                                gcTip = $(this)[0].tip;
                            }
                        } else {
                            groupControlList2.push($(this)[0].code);
                            gcRule = $(this)[0].rule;
                            gcTip = $(this)[0].tip;
                        }
                    });
                }
                ;
            }
            ;
            if (questionTableList != undefined && questionTableList != null && questionTableList != null) {
                $(questionTableList).each(function () {
                    var qgroupControlList = $(this)[0].groupControlList;
                    if (qgroupControlList != undefined && qgroupControlList != null) {
                        if (qgroupControlList.length != 0) {
                            $(qgroupControlList).each(function () {
                                var jtf = true;
                                var jcode = $(this)[0].code;
                                if (groupControlList2.length != 0) {
                                    $(groupControlList2).each(function (j, jal) {
                                        if (jal == jcode) {
                                            jtf = false;
                                        }
                                    })
                                    if (jtf) {
                                        groupControlList2.push($(this)[0].code);
                                        gcRule = $(this)[0].rule;
                                        gcTip = $(this)[0].tip;
                                    }
                                } else {
                                    groupControlList2.push($(this)[0].code);
                                    gcRule = $(this)[0].rule;
                                    gcTip = $(this)[0].tip;
                                }
                            });
                        }
                    }
                });
            }
            ;
            if (groupControlList2.length != 0) {
                var gcValue = "";
                $(groupControlList2).each(function (j, jal) {
                    for (key in sj) {
                        if (key == "investigateQuestionCode") {
                            if (sj[key] == jal) {
                                gcValue = 0;
                                gcValue += Number(sj["value"]);
                            }
                        }
                    }
                    if (sj["questionTableAnswerList"].length != 0) {
                        $(sj["questionTableAnswerList"]).each(function () {
                            if ($(this)[0].investigateTableCode == jal) {
                                if (gcValue != "") {
                                    gcValue += Number($(this)[0].value);
                                } else {
                                    gcValue = 0;
                                    gcValue += Number($(this)[0].value);
                                }
                            }
                        })
                    }
                });
                if (gcValue != "") {
                    if (!new RegExp(gcRule).test(gcValue)) {
                        if (tf) {
                            $('<div id="mask"><div class="mask_bg"></div><div class="remove"><p class="_sc">'+gcTip+'<img class="_ci" src="img/close_icon.png"/><p class="_qr">确认</p></div></div>').appendTo("body");
                        	$("._ci,._qr").click(function(){
				                $("#mask").remove();
				            });
                        }
                        sj["completeStatus"] = "1";
                    }
                }
            }
        });
    }
    ;
    return sj;
}
