//获取ID的函数开始
function id(obj) {
    return document.getElementById(obj);
}
//获取ID的函数结束

//缓冲运动方法开始
function move(obj,json,fn){  //采用json格式
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        var onOff=true;   //设定一个onOff开关。因为只用了一个定时器，当有很多缓冲运动时，有的运动先到达而停止定时器，所以设定这么一个开关来解决。
        for(var attr in json){  //遍历json内部所有属性
            var pos=0;
            if(attr=="opacity"){
                pos=parseInt(parseFloat(getStyle(obj,attr))*100);
            }else{
                pos=parseInt(getStyle(obj,attr));
            }
            var speed=(json[attr]-pos)/8>0?Math.ceil((json[attr]-pos)/8):Math.floor((json[attr]-pos)/8);
            if(pos!=json[attr]){  //假如json内部有任意一个变量未到达设定值，开关onOff都为假
                onOff=false;
            }
            if(attr=="opacity"){
                obj.style.filter="alpha(opacity="+(pos+speed)+")";
                obj.style.opacity=(pos+speed)/100;
            }else{
                obj.style[attr]=pos+speed+"px";
            }
            if(onOff) {  //当json内部所有变量都到达设定值时，才关闭定时器。注：这里是为了解决有的运动先停止而关闭定时器的Bug。
                clearInterval(obj.timer);
                fn&&fn();
            }
        }
    },30)
}

function getStyle(obj,attr){
    return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
}
//缓冲运动方法结束

//为元素注册方法开始
function bind(obj, ev, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(ev, fn, false);
    } else {
        obj.attachEvent('on' + ev, function() {
            fn.call(obj);
        });
    }
}
//为元素注册方法结束

//获取屏幕的宽高开始
function view() {
    return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight
    };
}
//获取屏幕的宽高结束

//获取某个元素的具体字节点类型集合开始
function getElementsByClassNameinnextlayer(parent,tagName){
    var arry=[];
    var oTag=parent.children;
    for(var i=0;i<oTag.length;i++){
        var name=parent.children[i].nodeName.toLowerCase();
        if(name==tagName){
            arry.push(parent.children[i]);
        }
    }
    return arry;
}
//获取某个元素的具体字节点类型集合结束

//按照className获取元素开始
function getElementsByClassName(target,tagName,className) {
    var tag = target.getElementsByTagName(tagName);
    var tagAll = [];
    for(var i = 0 ; i<tag.length ; i++){
        if(tag[i].className.indexOf(className) != -1){
            tagAll[tagAll.length] = tag[i];
        }
    }
    return tagAll;
}
//按照className获取元素结束


//为元素添加CSS类开始
function addClass(obj,sClass) {
    var aClass = obj.className.split(' ');
    if (!obj.className) {
        obj.className = sClass;
        return;
    }
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) return;
    }
    obj.className += ' ' + sClass;
}
//为元素添加CSS类结束

//为元素删除CSS类开始
function removeClass(obj, sClass) {
    var aClass = obj.className.split(' ');
    if (!obj.className) return;
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) {
            aClass.splice(i, 1);
            obj.className = aClass.join(' ');
            break;
        }
    }
}
//为元素删除CSS类结束*!/
//判断元素是否含有某个类开始
function hasClass(obj, cls) {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

//自定义函数
var str="";
var type="";
var jsontype="";
var resultJson={};
var arry_fieldname_input=[];
var arry_fieldname_input_value=[];
var arry_fieldname_table=[];
var arry_fieldname_table_value=[];
var arry_No_Choice=[];
var answerType=null;
//var checker=new QestionRegChecker();//---------------------------校验
function loadBossOwnerInfo(sjson) {
	var AndroidAnswer = sjson[1];
	sjson =sjson[0];
	sjson["answer"]=AndroidAnswer;
	function jsonForm(data){
		var r=data.answer;
		var answerJson={};//答案json字符串转换
		for(var key in r){
			answerJson[key]=$.parseJSON(r[key]);
		}
		data.answer = answerJson;
		return data;
	}
	var data=jsonForm(sjson);
    console.log(data);
    var oBody = document.body;
//  data["completeStatus"] = 2;
     data.answer["completeStatus"]=2;
       console.log(data.answer)
    $('body').attr("data-json",JSON.stringify(data.answer));
    var sSection = document.createElement("section");
    oBody.appendChild(sSection);//添加section
    //var sFooter = document.createElement("footer");
    //var sPFooter = document.createElement("p");
    //sPFooter.innerHTML = "确认";
    //sFooter.appendChild(sPFooter);
    //oBody.appendChild(sFooter);//添加footer
    var modelOjbName_all = data.modelOjbName;
    //alert(modelOjbName_all);
    var answerList = data.answer;
    //console.log(answerList);
    var serialNo=answerList.serialNo;
    var answerList_OK = answerList[modelOjbName_all];
    console.log(answerList_OK);
    var subList = data.modelDetailSubList;
    //大类分为table和input两类
    for (var j = 0; j < subList.length; j++) {
        subList[j].index = j;


        var oSction = document.getElementsByTagName("section")[0];
        if (subList[j].type == "TABLE") {
            var sDiv_table = document.createElement("div");//////////////////////////////////////动态生成tabel类型的整体DIV
            sDiv_table.className = "problem puttable";
            sDiv_table.setAttribute("modelname",subList[j].objName);//---------------------------校验
            sDiv_table.innerHTML = '<p>' + subList[j].name + '<img src="img/add_icon.png" class="add tableBtn"><img src="img/jian_icon.png" class="jian tableBtn"/></p><div class="cy"><span class="span_zh" index=0>aaaaa<img src="img/close_icon.png"/></span></div>';
            //sDiv_table.setAttribute("data-list",JSON.stringify(subList[j]));////////////////
            sDiv_table.setAttribute("data-objName", subList[j].objName);
            oSction.appendChild(sDiv_table);
            var sUl_table = document.createElement("ul");
            sDiv_table.appendChild(sUl_table);
            for (var i = 0; i < subList[j].questionDetailList.length; i++) {
                var Types = subList[j].questionDetailList[i].inputType;
                switch (Types) {
                    case "DOUBLE":
                        create_Double(subList[j].questionDetailList[i], sUl_table);
                        break;
                    case "TEXTAREA":
                        create_Textarea(subList[j].questionDetailList[i], sUl_table, oSction, sDiv_table, subList[j].objName);
                        break;
                    case "INTEGER":
                        create_Integer(subList[j].questionDetailList[i], sUl_table, sDiv_input);
                        break;
                    case "CHECKBOX":
                        create_Checkbox(subList[j].questionDetailList[i], sUl_table, subList[j].objName);
                        break;
                    case "STRING":
                        create_String(subList[j].questionDetailList[i], sUl_table);
                        break;
                    case "CODE":
                        create_Code(subList[j].questionDetailList[i], sUl_table);
                        break;
                    case "SSQADDRESS":
                        create_SSQADDRESS(subList[j].questionDetailList[i], sUl_table);
                        break;
                    case "TELEPHONE":
                        create_Telephone(subList[j].questionDetailList[i], sUl_table);
                        break;
                    case "DATE":
                        create_Date(subList[j].questionDetailList[i], sUl_input);
                        break;
                }
            }
        } else if (subList[j].type == "INPUT") {
            var sDiv_input = document.createElement("div");//////////////////////////////动态生成input类型的整体DIV
            sDiv_input.className = "problem putinput";
            sDiv_input.setAttribute("modelname",subList[j].objName);//---------------------------校验
            sDiv_input.innerHTML = "<p>" + subList[j].name + "</p>";
            sDiv_input.setAttribute("data-objName", subList[j].objName);
            oSction.appendChild(sDiv_input);
            var sUl_input = document.createElement("ul");
            sDiv_input.appendChild(sUl_input);
            for (var i = 0; i < subList[j].questionDetailList.length; i++) {
                var intype = subList[j].questionDetailList[i].inputType;
                switch (intype) {
                    case "DOUBLE":
                        create_Double(subList[j].questionDetailList[i], sUl_input);
                        break;
                    case "TEXTAREA":
                        create_Textarea(subList[j].questionDetailList[i], sUl_input, oSction, sDiv_input, subList[j].objName);
                        break;
                    case "INTEGER":
                        create_Integer(subList[j].questionDetailList[i], sUl_input);
                        break;
                    case "CHECKBOX":
                        create_Checkbox(subList[j].questionDetailList[i], sUl_input, sDiv_input, subList[j].objName);
                        break;
                    case "STRING":
                        create_String(subList[j].questionDetailList[i], sUl_input);
                        break;
                    case "CODE":
                        create_Code(subList[j].questionDetailList[i], sUl_input, subList[j].objName);
                        break;
                    case "SSQADDRESS":
                        create_SSQADDRESS(subList[j].questionDetailList[i], sUl_input);
                        break;
                    case "TELEPHONE":
                        create_Telephone(subList[j].questionDetailList[i], sUl_input);
                        break;
                    case "DATE":
                        create_Date(subList[j].questionDetailList[i], sUl_input);
                        break;
                }
            }
        }
    }
    //----------------------------------------------------------INTEGER初始化---------------------------------------------------------------------------

    var oInteger_zh = getElementsByClassName(document, "li", "integer_zh");//获取所有的INTEGER类型
    for (var i = 0; i < oInteger_zh.length; i++) {
        that_Integer_Initialization = oInteger_zh[i];//这里用that_Integer_Initialization存储oInteger_zh[i]
        var objname_Integer = that_Integer_Initialization.parentNode.parentNode.dataset.objname;//获取大的div上面的data-objname值
        var field_Integer = that_Integer_Initialization.dataset.fieldname;//获取li上面的data-fieldname值
        Integer_Initialization_span = getElementsByClassName(that_Integer_Initialization, "span", "right_span")[0];//获取li下面的input元素
        //如果double在Input大类中
        if (that_Integer_Initialization.parentNode.parentNode.className == "problem putinput") {
            if (answerList_OK[objname_Integer] && answerList_OK[objname_Integer].hasOwnProperty(field_Integer)) {
                if (answerList_OK[objname_Integer][field_Integer] == undefined || answerList_OK[objname_Integer][field_Integer] == null ) {
                    Integer_Initialization_span.innerHTML = "";
                } else {
                    Integer_Initialization_span.innerHTML = answerList_OK[objname_Integer][field_Integer];//将对应的值赋值给input以初始化
                }
            } else {
                Integer_Initialization_span.innerHTML = "";
            }
        }
    }
    //----------------------------------------------------------DOUBLE初始化---------------------------------------------------------------------------
    var oDouble_zh = getElementsByClassName(document, "li", "double_zh");//获取所有的DOUBLE类型
    for (var i = 0; i < oDouble_zh.length; i++) {
        that_Double_Initialization = oDouble_zh[i];//这里用that_Double_Initialization存储oInteger_zh[i]
        var objname_Double = that_Double_Initialization.parentNode.parentNode.dataset.objname;//获取大的div上面的data-objname值
        var field_Double = that_Double_Initialization.dataset.fieldname;//获取li上面的data-fieldname值
        Double_Initialization_span = getElementsByClassName(that_Double_Initialization, "span", "right_span")[0];//获取li下面的input元素
        //如果double在Input大类中
        if (that_Double_Initialization.parentNode.parentNode.className == "problem putinput") {
            if (answerList_OK[objname_Double] && answerList_OK[objname_Double].hasOwnProperty(field_Double)) {
                if (answerList_OK[objname_Double][field_Double] == undefined || answerList_OK[objname_Double][field_Double] == null) {
                    Double_Initialization_span.innerHTML = "";
                } else {
                    Double_Initialization_span.innerHTML = answerList_OK[objname_Double][field_Double];//将对应的值赋值给input以初始化
                }
            } else {
                Double_Initialization_span.innerHTML = "";
            }
        }
    }
    //------------------------------------------------------------------------------------信用报告特殊处理
    if (modelOjbName_all == "bossOwnerInfoModel") {
        var oSection_all = document.getElementsByTagName("section")[0];
        var oDiv_all = getElementsByClassName(document, "div", "problem");
        oSection_all.removeChild(oDiv_all[2]);//删除第三个特定的div//
        oSection_all.removeChild(oDiv_all[3]);//删除第四个特定的div//
        var sDiv_head = document.createElement("div");
        sDiv_head.className = "income";
        sDiv_head.innerHTML = '<div class="ic_head_zh"><div><span class="span_bg" id="sr">' + subList[2].name + '</span><span id="zc">' + subList[3].name + '</span></div></div>';
        oSection_all.appendChild(sDiv_head);//将特定的头部插入到section里面
        var sDiv_Ul = document.createElement("div");//生成包含表格数据的大的div
        sDiv_Ul.className = "sr_zh";
        sDiv_Ul.innerHTML = '<div class="ic_dx_zh" id="ic_dx_01" data-objname='+subList[2].objName+'><ul class="dx_f_zh"></ul></div><div class="ic_dx_zh" id="ic_dx_02" data-objname='+subList[3].objName+'><ul class="dx_f_zh"></ul></div>';
        var oWrap_div = getElementsByClassName(document, "div", "income")[0];
        oWrap_div.appendChild(sDiv_Ul);//将包容li的ul插入到相应位置
        var oDiv_ul = getElementsByClassName(oWrap_div, "ul", "dx_f_zh");//选取包括表格下面li的ul
        //alert(oDiv_ul.length);
        //-------------------------------------------数据初始化
        //生成表格中"查询次数"中固定的第一行
        oDiv_ul[0].innerHTML = '<li><span>' + subList[2].questionDetailList[0].name + '</span><span>' + subList[2].questionDetailList[1].name + '</span><span>' + subList[2].questionDetailList[2].name + '</span><span>' + subList[2].questionDetailList[3].name + '</span></li>';
        //生成表格中"逾期次数"中固定的第一行
        oDiv_ul[1].innerHTML = '<li><span>' + subList[3].questionDetailList[0].name + '</span><span>' + subList[3].questionDetailList[1].name + '</span><span>' + subList[3].questionDetailList[2].name + '</span><span>' + subList[3].questionDetailList[3].name + '</span></li>';
        //-------------------------------------------------------------------假如答案为空,生成按照原型图的形式
        //按照原型生成"查询次数"中的其他行
        console.log(oDiv_ul[0].parentNode.dataset.objname);
        var qq=oDiv_ul[0].parentNode.dataset.objname;
        //-------------------按照答案生成"查询次数"中的其他行
        if(answerList_OK[oDiv_ul[0].parentNode.dataset.objname]!=null&&answerList_OK[oDiv_ul[0].parentNode.dataset.objname].length!=0){
            var fragMent=document.createDocumentFragment();
            var oBjname_qurey=answerList_OK[oDiv_ul[0].parentNode.dataset.objname];
            for(var j=0;j<oBjname_qurey.length;j++){
                var sLi_qurey_answer=document.createElement("li");
                sLi_qurey_answer.className="query_span";
                sLi_qurey_answer.innerHTML='<span>'+oBjname_qurey[j].dateLimit+'</span><span>'+oBjname_qurey[j].loanCount+'</span><span>'+oBjname_qurey[j].creditCount+'</span><span>'+oBjname_qurey[j].loanCreditCount+'</span>';
                fragMent.appendChild(sLi_qurey_answer);
            }
            oDiv_ul[0].appendChild(fragMent);
        }
            //-------------------按照答案生成"逾期次数"中的其他行
            if(answerList_OK[oDiv_ul[1].parentNode.dataset.objname]!=null&&answerList_OK[oDiv_ul[1].parentNode.dataset.objname].length!=0){
                var fragMent_overdu=document.createDocumentFragment();
                var oBjname_overdu=answerList_OK[oDiv_ul[1].parentNode.dataset.objname];
                for(var j=0;j<oBjname_overdu.length;j++){
                    var sLi_overdu_answer=document.createElement("li");
                    sLi_overdu_answer.className="overdu_span";
                    sLi_overdu_answer.innerHTML='<span>'+oBjname_overdu[j].type+'</span><span>'+oBjname_overdu[j].loan+'</span><span>'+oBjname_overdu[j].credit+'</span><span>'+oBjname_overdu[j].semiCredit+'</span>';
                    fragMent_overdu.appendChild(sLi_overdu_answer);
                }
                oDiv_ul[1].appendChild(fragMent_overdu);
            }
        var a1=answerList_OK[oDiv_ul[0].parentNode.dataset.objname]==null||answerList_OK[oDiv_ul[0].parentNode.dataset.objname].length==0;
        var a2=answerList_OK[oDiv_ul[1].parentNode.dataset.objname]==null||answerList_OK[oDiv_ul[1].parentNode.dataset.objname].length==0;
        if(a1&&!a2){
            $('div[class="ic_head_zh"] span[class="span_bg"]').remove();
            $('div[class="sr_zh"] div[id="ic_dx_01"]').remove();
            $("#zc").addClass("span_active");
            //$('div[class="income"]').remove();
        }else if(a2&&!a1){

            $('div[class="ic_head_zh"] span[id="zc"]').remove();
            $('div[class="sr_zh"] div[id="ic_dx_02"]').remove();
            $("#sr").addClass("span_active");
        }else if(a1&&a2){
            $('div[class="income"]').remove();

        }
        //---------------------------------------特定事件初始化
        if(!a1&&!a2){
            var oDiv_header = getElementsByClassName(oWrap_div, "div", "ic_head_zh")[0];
            var oDiv_change = getElementsByClassName(oWrap_div, "div", "ic_dx_zh");
            //初始化"查询次数"为显示状态
            oDiv_change[0].className = "ic_dx_zh active_zh";
            oDiv_change[1].className = "ic_dx_zh hide_zh";
            var oSpan_change = oDiv_header.getElementsByTagName("span");
            oSpan_change[0].style.background = "#32be97";//点击背景的初始化
            oSpan_change[0].style.color = "#FFFFFF";//点击背景的初始化
            //初始化查询次数第一个span集合中的第一个span
            //点击事件绑定
            for (var i = 0; i < oSpan_change.length; i++) {
                oSpan_change[i].index = i;
                oSpan_change[i].onclick = function () {
                    for (var j = 0; j < oSpan_change.length; j++) {
                        oSpan_change[j].style.background = "#FFFFFF";
                        oSpan_change[j].style.color = "#32be97";
                        oDiv_change[j].className = "ic_dx_zh hide_zh";
                    }
                    this.style.background = "#32be97";
                    this.style.color = "#FFFFFF";
                    oDiv_change[this.index].className = "ic_dx_zh active_zh";
                }
            }
        }
    }
//-------------------------------------------------------------初始化开始-------------------------------------------------------------------------------

//----------------------------------------------------------STRING初始化---------------------------------------------------------------------------
    var oString_zh = getElementsByClassName(document, "li", "string_zh");//获取所有的STRING类型
    for (var i = 0; i < oString_zh.length; i++) {
        that_string_Initialization = oString_zh[i];//这里用that_string_Initialization存储oString_zh[i]
        var objname_string = that_string_Initialization.parentNode.parentNode.dataset.objname;//获取大的div上面的data-objname值
        var field_string = that_string_Initialization.dataset.fieldname;//获取li上面的data-fieldname值
        string_Initialization_input = that_string_Initialization.getElementsByTagName("input")[0];//获取li下面的input元素
        //如果STRING在Input大类中
        if (that_string_Initialization.parentNode.parentNode.className == "problem putinput") {
            if(answerList_OK[objname_string]&&answerList_OK[objname_string].hasOwnProperty(field_string)){
                if (answerList_OK[objname_string][field_string] == undefined || answerList_OK[objname_string][field_string] == null || answerList_OK[objname_string][field_string] == "") {
                    string_Initialization_input.value = "";
                } else {
                    string_Initialization_input.value = answerList_OK[objname_string][field_string];//将对应的值赋值给input以初始化
                }
            }else{
                string_Initialization_input.value = "";
            }
        }
    }


//----------------------------------------------------------数据上传保存-------------------------------------------------------------------------------
    //var oFooter = document.getElementsByTagName("footer")[0];
    //var oSection = document.getElementsByTagName("section")[0];
      
       
}
//$(function(){
//	$('.tj').click(function(){
//	submit();
//})
//})

function submit(){
	var data=$('body').attr('data-json');
        /*empty*/
       console.log(data)
//     data["completeStatus"] = 2;
         AndroidJs.saveWjDetalAnswer(data, false);
    }
//----------------------------------------------------------动态生成函数开始-------------------------------------------------------------------------------

//----------------------------------------------------------DOUBLE类型-------------------------------------------------------------------------------
function create_Double(question, oul) {
    if (question.inputUnit == null) {
        question.inputUnit = "";
    }
    if (question.require) {
        oul.innerHTML += '<li class="double_zh" fieldname='+ question.fieldName +' data-fieldname=' + question.fieldName + ' data-islabel=' + question.isLabel + ' data-isdynamicshow=' + question.isDynamicShow + ' data-require=' + question.require + ' data-controlshow=' + question.isControlShow + ' id=' + setIndex(question.code) + '><div class="left"><span>*</span><i>' + question.name + '</i></div><div class="right"><span class="right_span">double类型</span><b class="yuan">' + question.inputUnit + '</b></div></li>';
    } else {
        oul.innerHTML += '<liclass="double_zh" fieldname='+question.fieldName+' data-fieldname=' + question.fieldName + ' data-islabel=' + question.isLabel + ' data-isdynamicshow=' + question.isDynamicShow + ' data-require=' + question.require + ' data-controlshow=' + question.isControlShow + ' id=' + setIndex(question.code) + '><div class="left"><span>&nbsp;&nbsp;</span><i>' + question.name + '</i></div><div class="right"><span class="right_span">double类型</span><b class="yuan">' + question.inputUnit + '</b></div></li>';
    }
}
//---------------------------------------------------------- TEXTAREA类型-------------------------------------------------------------------------------
function create_Textarea(question, oul, oSection, oDiv, objName) {
    oSection.removeChild(oDiv);
    var sDiv_TEXTAREA = document.createElement("div");
    sDiv_TEXTAREA.className = "problem";
    if (question.require) {
        sDiv_TEXTAREA.innerHTML = '<div class="risk"><h2>' + question.name + '</h2><div></div></div><div class="risk_input_wrap centerfix textarea_zh" id=' + setIndex(question.code) + '><span>此处可输入500字</span><textarea class="risk_input" placeholder="请输入" data-objName=' + objName + ' data-fieldname=' + question.fieldName + '></textarea></div><div id="risk_btn"></div>  ';
    } else {
        sDiv_TEXTAREA.innerHTML = '<div class="risk"><h2>' + question.name + '</h2></div><div class="risk_input_wrap centerfix textarea_zh" id=' + setIndex(question.code) + '><span>此处可输入500字</span><textarea class="risk_input" placeholder="请输入" data-fieldname=' + question.fieldName + '></textarea></div><div id="risk_btn"></div>  ';
    }
    oSection.appendChild(sDiv_TEXTAREA);
}
//---------------------------------------------------------- INTEGER类型-------------------------------------------------------------------------------
function create_Integer(question, oul) {
    if (question.inputUnit == null) {
        question.inputUnit = "";
    }
    if (question.require) {
        oul.innerHTML += '<li class="integer_zh" fieldname='+question.fieldName+' data-fieldname=' + question.fieldName + ' data-islabel=' + question.isLabel + ' data-isdynamicshow=' + question.isDynamicShow + ' data-require=' + question.require + ' data-controlshow=' + question.isControlShow + ' id=' + setIndex(question.code) + '><div class="left"><span>*</span><i>' + question.name + '</i></div><div class="right"><span class="right_span">int类型</span><b class="yuan">' + question.inputUnit + '</b></div></li>';
    } else {
        oul.innerHTML = '<li class="integer_zh" fieldname='+question.fieldName+' data-fieldname=' + question.fieldName + ' data-islabel=' + question.isLabel + ' data-isdynamicshow=' + question.isDynamicShow + ' data-require=' + question.require + ' data-controlshow=' + question.isControlShow + ' id=' + setIndex(question.code) + '><div class="left"><span>&nbsp;&nbsp;</span><i>' + question.name + '</i></div><div class="right"><span class="right_span">int类型</span><b class="yuan">' + question.inputUnit + '</b></div></li>';
    }
}
//---------------------------------------------------------- CHECKBOX类型-------------------------------------------------------------------------------
function create_Checkbox(question, oul, objName) {
    var codeDicList_check = question.codeDicList;
    var oUl_wrap_checkbox = document.createElement("ul");
    oUl_wrap_checkbox.className = "clicktab";
    var fragMent = document.createDocumentFragment();
    for (var i = 0; i < codeDicList_check.length; i++) {
        var checkbox_li = document.createElement("li");
        checkbox_li.className="check_li";
        checkbox_li.innerHTML = '<div class="chenckbox_zh"><label class="chenckboxNews_zh"><input type="checkbox" style="display: none"><img src="img/jx_icon.png" class="check"><span style="color:rgb(160, 160, 165);font-size:0.42rem">' + codeDicList_check[i].name + '</span></label></div>';
        checkbox_li.setAttribute("data-name", codeDicList_check[i].name);
        checkbox_li.setAttribute("data-code", codeDicList_check[i].code);
        checkbox_li.setAttribute("data-typeCode", codeDicList_check[i].typeCode);
        fragMent.appendChild(checkbox_li);
    }
    oUl_wrap_checkbox.appendChild(fragMent);
    var oLi_wrap = document.createElement("li");
    oLi_wrap.appendChild(oUl_wrap_checkbox);
    oLi_wrap.className="checkbox_zh";
    oLi_wrap.setAttribute("fieldname", question.fieldName);
    oLi_wrap.setAttribute("data-fieldname", question.fieldName);
    oLi_wrap.setAttribute("data-require", question.require);
    oLi_wrap.setAttribute("data-islabel", question.isLabel);
    var sWrap_checkbox = document.createElement("div");
    sWrap_checkbox.appendChild(oLi_wrap);
    oul.innerHTML += sWrap_checkbox.innerHTML;
}
//---------------------------------------------------------- STRING类型-------------------------------------------------------------------------------
function create_String(question, oul) {
    if (question.require) {
        oul.innerHTML += '<li class="string_zh" fieldname='+question.fieldName+' data-fieldname=' + question.fieldName + ' data-islabel=' + question.isLabel + ' data-isdynamicshow=' + question.isDynamicShow + ' data-require=' + question.require + ' data-controlshow=' + question.isControlShow + ' id=' + setIndex(question.code) + '><div class="left"><span>*</span><i>' + question.name + '</i></div><div class="right"><input type="text" placeholder="' + question.name + '"/></div></li>';
    } else {
        oul.innerHTML += '<li class="string_zh" fieldname='+question.fieldName+ ' data-fieldname=' + question.fieldName + ' data-islabel=' + question.isLabel + ' data-isdynamicshow=' + question.isDynamicShow + ' data-require=' + question.require + ' data-controlshow=' + question.isControlShow + ' id=' + setIndex(question.code) + '><div class="left"><span>&nbsp;&nbsp;</span><i>' + question.name + '</i></div><div class="right"><input type="text" placeholder="' + question.name + '"/></div></li>';
    }
}
//---------------------------------------------------------- CODE类型-------------------------------------------------------------------------------
function create_Code(question, oul, objName) {
    if (question.require) {
        if (question.codeDicList.length < 3) {
            //两个radio的样式
            oul.innerHTML += '<li class="code_zh_two" fieldname='+question.fieldName + ' data-fieldname=' + question.fieldName + ' data-islabel=' + question.isLabel + ' data-isdynamicshow=' + question.isDynamicShow + ' data-require=' + question.require + ' data-controlshow=' + question.isControlShow + ' id=' + setIndex(question.code) + '><div class="left"><span>*</span><i>' + question.name + '</i></div><div class="right"><strong class="s1" data-codeDicListCode=' + question.codeDicList[0].code + ' ><em class="s2no"></em></strong><b class="b_zh">' + question.codeDicList[0].name + '</b><strong class="s3" data-codeDicListCode=' + question.codeDicList[1].code + '><em class="s2no"></em></strong><b class="b_zh">' + question.codeDicList[1].name + '</b></div></li>';
        } else {
            //含有遮罩的形式的样式
            var sCode_three_DivWrap = document.createElement("div");
            sCode_three_DivWrap.innerHTML = '<div id="mask" class="hide_zh"><div class="mask_bg"></div><ul></ul></div>';
            var oCode_three_Ul = sCode_three_DivWrap.getElementsByTagName("ul")[0];
            var codeDicList = question.codeDicList;
            for (var i = 0; i < codeDicList.length; i++) {
                (function () {
                    var sCode_three_li = document.createElement("li");
                    sCode_three_li.setAttribute("data-code", codeDicList[i].code);
                    sCode_three_li.className="choosethree";
                    sCode_three_li.innerHTML = codeDicList[i].name;
                    oCode_three_Ul.appendChild(sCode_three_li);
                }(i));
            }
            var sCode_cancel = document.createElement("li");
            sCode_cancel.className = "cancel";
            sCode_cancel.innerHTML = "取消";
            oCode_three_Ul.appendChild(sCode_cancel);
            //var ooo=sCode_three_DivWrap.innerHTML;
            //console.log(ooo);
            oul.innerHTML += '<li class="code_zh_three" fieldname='+question.fieldName+' data-fieldname=' + question.fieldName + ' data-islabel=' + question.isLabel + ' data-isdynamicshow=' + question.isDynamicShow + ' data-require=' + question.require + ' data-controlshow=' + question.isControlShow + ' id=' + setIndex(question.code) + '><div class="left"><span>*</span><i>' + question.name + '</i></div><div class="right" id="chose1401"><span class="choose" id="titleChoose">请选择</span><img src="img/down_icon.png" class="select"/></div>' + sCode_three_DivWrap.innerHTML + '</li>';
        }
    } else {
        //不必填
        if (question.codeDicList.length < 3) {
            //两个radio的样式
            oul.innerHTML += '<li class="code_zh_two" fieldname='+question.fieldName+ ' data-fieldname=' + question.fieldName + ' data-islabel=' + question.isLabel + ' data-isdynamicshow=' + question.isDynamicShow + ' data-require=' + question.require + ' data-controlshow=' + question.isControlShow + ' id=' + setIndex(question.code) + '><div class="left"><span>&nbsp;&nbsp;</span><i>' + question.name + '</i></div><div class="right"><strong class="s1" data-codeDicListCode=' + question.codeDicList[0].code + ' ><em class="s2no"></em></strong><b class="b_zh">' + question.codeDicList[0].name + '</b><strong class="s3" data-codeDicListCode=' + question.codeDicList[1].code + '><em class="s2no"></em></strong><b class="b_zh">' + question.codeDicList[1].name + '</b></div></li>';
        } else {
            //含有遮罩的形式的样式
            var sCode_three_DivWrap = document.createElement("div");
            //sCode_three_DivWrap.id="empty";
            sCode_three_DivWrap.innerHTML = '<div id="mask" class="hide_zh"><div class="mask_bg"></div><ul></ul></div>';
            var oCode_three_Ul = sCode_three_DivWrap.getElementsByTagName("ul")[0];
            var codeDicList = question.codeDicList;
            for (var i = 0; i < codeDicList.length; i++) {
                (function () {
                    var sCode_three_li = document.createElement("li");
                    sCode_three_li.setAttribute("data-code", codeDicList[i].code);
                    sCode_three_li.className="choosethree";
                    sCode_three_li.innerHTML = codeDicList[i].name;
                    oCode_three_Ul.appendChild(sCode_three_li);
                }(i));
            }
            oul.innerHTML += '<li class="code_zh_three" fieldname='+question.fieldName+' data-fieldname=' + question.fieldName + ' data-islabel=' + question.isLabel + ' data-isdynamicshow=' + question.isDynamicShow + ' data-require=' + question.require + ' data-controlshow=' + question.isControlShow + ' id=' + setIndex(question.code) + '><div class="left"><span>*</span><i>' + question.name + '</i></div><div class="right" id="chose1401"><span class="choose" id="titleChoose">请选择</span><img src="img/down_icon.png" class="select"/></div>' + sCode_three_DivWrap.innerHTML + '</li>';
        }
    }
}
//---------------------------------------------------------- SSQADDRESS类型-------------------------------------------------------------------------------
function create_SSQADDRESS(question, oul) {
    if (question.require) {
        oul.innerHTML += '<li class="ssqaddress_zh" fieldname='+question.fieldName+ ' data-fieldname=' + question.fieldName + ' data-islabel=' + question.isLabel + ' data-isdynamicshow=' + question.isDynamicShow + ' data-require=' + question.require + ' data-controlshow=' + question.isControlShow + ' id=' + setIndex(question.code) + '><div class="left"><span>*</span><i>' + question.name + '</i></div><div class="right" id=' + question.fieldName + '><span class="choose">请选择</span><img src="img/down_icon.png" class="select select_4"/></div></li>';

    } else {
        oul.innerHTML += '<li class="ssqaddress_zh" fieldname='+question.fieldName+ ' data-fieldname=' + question.fieldName + ' data-islabel=' + question.isLabel + ' data-isdynamicshow=' + question.isDynamicShow + ' data-require=' + question.require + ' data-controlshow=' + question.isControlShow + ' id=' + setIndex(question.code) + '><div class="left"><span>&nbsp;&nbsp;</span><i>' + question.name + '</i></div><div class="right" id=' + question.fieldName + '><span class="choose">请选择</span><img src="img/down_icon.png" class="select select_4"/></div></li>';
    }
}
//---------------------------------------------------------- TELEPHONE类型-------------------------------------------------------------------------------
function create_Telephone(question, oul) {
    if (question.require) {
        oul.innerHTML += '<li class="telephone_zh" fieldname='+question.fieldName+' data-fieldname=' + question.fieldName + ' data-islabel=' + question.isLabel + ' data-isdynamicshow=' + question.isDynamicShow + ' data-require=' + question.require + ' data-controlshow=' + question.isControlShow + ' id=' + setIndex(question.code) + '><div class="left"><span>*</span><i>单位电话</i></div><div class="right phone"><input type="number" placeholder="区号"/><b>-</b><input type="number" placeholder="电话号码"/><b>-</b><input type="number" placeholder="分机号"/></div></li>';
    } else {
        oul.innerHTML += '<li class="telephone_zh" fieldname='+question.fieldName+' data-fieldname=' + question.fieldName + ' data-islabel=' + question.isLabel + ' data-isdynamicshow=' + question.isDynamicShow + ' data-require=' + question.require + ' data-controlshow=' + question.isControlShow + ' id=' + setIndex(question.code) + '><div class="left"><span>&nbsp;&nbsp;</span><i>单位电话</i></div><div class="right phone"><input type="number" placeholder="区号"/><b>-</b><input type="number" placeholder="电话号码"/><b>-</b><input type="number" placeholder="分机号"/></div></li>';
    }
}
//---------------------------------------------------------- DATE类型-------------------------------------------------------------------------------
function create_Date(question, oul) {
    if (question.require) {
        oul.innerHTML += '<li class="date_zh" fieldname='+question.fieldName+' data-fieldname=' + question.fieldName + ' data-islabel=' + question.isLabel + ' data-isdynamicshow=' + question.isDynamicShow + ' data-require=' + question.require + ' data-controlshow=' + question.isControlShow + ' id=' + question.fieldName + '><div class="left"><span>*</span><i>' + question.name + '</i></div><div class="right"><input type="text" placeholder="' + question.name + '"/></div></li>';
    } else {
        oul.innerHTML += '<li class="date_zh" fieldname='+question.fieldName+' data-fieldname=' + question.fieldName + ' data-islabel=' + question.isLabel + ' data-isdynamicshow=' + question.isDynamicShow + ' data-require=' + question.require + ' data-controlshow=' + question.isControlShow + ' id=' + question.fieldName + '><div class="left"><span>&nbsp;&nbsp;</span><i>' + question.name + '</i></div><div class="right"><input type="text" placeholder="' + question.name + '"/></div></li>';
    }
}
//---------------------------------------------------------- 动态生成函数结束-------------------------------------------------------------------------------
//分割code字符串
function setIndex(code) {
    var str = "";
    str = code.split(".").join("");
    return str;
}

//判断一个数据是否为数组
function isArray(prop) {
    return prop instanceof Array;
}








