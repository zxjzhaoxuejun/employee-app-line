var questionCode='';//问卷号
var tipVal='';//提示信息
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
var answer_result;
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
var checker=new QestionRegChecker();//---------------------------校验
function loadBossIndustryRisk(sjson) {
	var AndroidAnswer = sjson[1];
	sjson = sjson[0];
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
    //获取问卷号
    questionCode=data.questionnaireCode;
    questionCode=questionCode.split('.')[1];
    
    var oBody = document.body;
    var sSection = document.createElement("section");
    oBody.appendChild(sSection);//添加section
    var sFooter = document.createElement("footer");
    var sPFooter = document.createElement("p");
    sPFooter.innerHTML = "确认";
    sFooter.appendChild(sPFooter);
    oBody.appendChild(sFooter);//添加footer
    var modelOjbName_all = data.modelOjbName;
    //alert(modelOjbName_all);
    var answerList = data.answer;
    //console.log(answerList);
    var answerList_OK = answerList[modelOjbName_all];
    //console.log(answerList_OK);
    var subList = data.modelDetailSubList;
    //大类分为table和input两类
    for (var j = 0; j < subList.length; j++) {
        subList[j].index = j;

        checker.initQuestionMap(subList[j].objName, subList[j].questionDetailList);//---------------------------校验

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
                        create_Textarea(subList[j].questionDetailList[i], sUl_table, oSction, sDiv_table, subList[j].objName);
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
                }
            }
        } else if (subList[j].type == "INPUT") {
            var sDiv_input = document.createElement("div");//////////////////////////////动态生成input类型的整体DIV
            sDiv_input.className = "problem putinput";
            sDiv_input.setAttribute("modelname",subList[j].objName);//---------------------------校验
            //sDiv_input.innerHTML = "<p>" + subList[j].name + "</p>";
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
                        create_Textarea(subList[j].questionDetailList[i], sUl_input, oSction, sDiv_input, subList[j].objName);
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
                }
            }
        }
    }
//-------------------------------------------------------------初始化开始-------------------------------------------------------------------------------

//----------------------------------------------------------TEXTAREA类型的初始化-------------------------------------------------------------------------------

    var oTextArea_zh = getElementsByClassName(document, "textarea", "risk_input");//获取所有的TEXTAREA类型
    for (var i = 0; i < oTextArea_zh.length; i++) {
        (function () {
            var fieldName = oTextArea_zh[i].dataset.fieldname;
            var objName_textArear = oTextArea_zh[i].parentNode.parentNode.dataset.objname;
            if(answerList_OK[objName_textArear]&&answerList_OK[objName_textArear].hasOwnProperty(fieldName)){//-------------------------如果该属性存在
                if(answerList_OK[objName_textArear][fieldName]==""||answerList_OK[objName_textArear][fieldName]==undefined||answerList_OK[objName_textArear][fieldName]==null){
                    oTextArea_zh[i].innerHTML = "";
                }else{
                    if(typeof(answerList_OK[objName_textArear][fieldName])=="number"){
                        oTextArea_zh[i].innerHTML =String(answerList_OK[objName_textArear][fieldName]);
                    }else{
                        oTextArea_zh[i].innerHTML = String(answerList_OK[objName_textArear][fieldName]);
                    }
                }
            }else{
                oTextArea_zh[i].innerHTML = "";//-------------------------如果该属性不存在,内容置空
            }
        }(i))
    }
//----------------------------------------------------------TEXTAREA类型事件绑定-------------------------------------------------------------------------------
    for (var i = 0; i < oTextArea_zh.length; i++) {
        //that=oTextArea_zh[i];
        oTextArea_zh[i].onclick = function () {
            var oSpan = this.parentNode.getElementsByTagName("span")[0];
            this.placeholder = "";
            oSpan.style.display = "none";
        }
        //bind(oTextArea_zh[i], "blur", jiaoyan);
        bind(oTextArea_zh[i], "blur", text_blur);
        function jiaoyan() {
            var oDiv_wrap = getElementsByClassName(document, "div", "problem")[0];
            var oIput_area = document.getElementsByTagName("textarea")[0];
            var value_area = oIput_area.innerHTML;
            var onoff=isNull(value_area);
            if (onoff) {
                var jiaoyan_label=getElementsByClassName(document, "label", "jiaoyan");
                if(jiaoyan_label.length>0){
                    for(var m=0;m<jiaoyan_label.length;m++){
                        oDiv_wrap.removeChild(jiaoyan_label[m]);
                    }
                }
                var sLabel = document.createElement("label");
                sLabel.innerHTML = "校验不通过";
                sLabel.className="jiaoyan";
                sLabel.style.cssText = "color:red; font-size:0.5rem;";
                oDiv_wrap.appendChild(sLabel);
            }else{
                var jiaoyan_label_ok=getElementsByClassName(document, "label", "jiaoyan");
                for(j=0;j<jiaoyan_label_ok.length;j++){
                    oDiv_wrap.removeChild(jiaoyan_label_ok[j]);
                }
            }
        }
            function text_blur() {
                var oSpan = this.parentNode.getElementsByTagName("span")[0];
                var oLabel = getElementsByClassName(document, "label", "jiaoyan")[0];
                var require=this.dataset.require;
                var regexrule=this.dataset.regexrule;
                var str = "";
                if (this.value !== "") {
                    str += this.value;
                } else {
                    str = "";
                }
                if (str == "") {
                    this.placeholder = tipVal;
                    oSpan.style.display = "inline";
                    if(require=="true"){
                        removeClass(oLabel,"hide_zh");
                        addClass(oLabel,"active_zh");
                    }
                }else{
                    if (require == "true") {
                        removeClass(oLabel, "active_zh");
                        addClass(oLabel, "hide_zh");
                    }
                }
            }
    }
//----------------------------------------------------------数据上传保存-------------------------------------------------------------------------------
    var oFooter = document.getElementsByTagName("footer")[0];
    var oSection = document.getElementsByTagName("section")[0];
    var oDiv_lone=document.getElementById("lone");
    //--------------------------------
    for(var prop in answerList ){
        if(prop!=modelOjbName_all){
            delete answerList[prop]
        }
    }
    //console.log(answerList);
    //----------------------------------
    var completeStatus_text=2;
    var _on_off;
    oFooter.onclick = function(){
        var oTextArea=getElementsByClassName(document, "textarea", "risk_input")[0];
        var require=oTextArea.dataset.require;
        var oLabel = getElementsByClassName(document, "label", "jiaoyan")[0];
        submitResult();
        //console.log(answer_result);
        if(_on_off){
            if(require=="true"){
                removeClass(oLabel,"active_zh");
                addClass(oLabel,"hide_zh");
            }
            AndroidJs.saveWjDetalAnswer(answer_result,true);
        }else{
            if(require=="true"){
                removeClass(oLabel,"hide_zh");
                addClass(oLabel,"active_zh");
                AndroidJs.saveWjDetalAnswer(answer_result,false);
            }else{
                AndroidJs.saveWjDetalAnswer(answer_result,true);
            }

        }
    }
    oDiv_lone.onclick=function(){
        submitResult();
    }
        function submitResult(){
        for (var i = 0; i < oTextArea_zh.length; i++) {
            (function () {
                var obj_input_save = {};
                var require=oTextArea_zh[i].dataset.require;
                var val_textArear = oTextArea_zh[i].value;
                if(val_textArear==""){
                    if(require=="true"){
                        completeStatus_text=1;
                        _on_off=false;
                    }else{
                        completeStatus_text=2;
                        _on_off=true;
                    }
                }else{
                    completeStatus_text=2;
                    _on_off=true;
                }
                var fieldName = oTextArea_zh[i].dataset.fieldname;
                var objName_textArear = oTextArea_zh[i].parentNode.parentNode.dataset.objname;
                obj_input_save[fieldName] = val_textArear;
                resultJson[objName_textArear] = obj_input_save;
            }(i))
        }
        var answer={};
        answer[modelOjbName_all]=resultJson;
        answer.completeStatus=completeStatus_text;
        answer_result=JSON.stringify(answer);
    }
}
function submit(bool){
    var oFooter = document.getElementsByTagName("footer")[0];
    var oSection = document.getElementsByTagName("section")[0];
    var oDiv_lone=document.getElementById("lone");
    oDiv_lone.onclick();
    console.log(answer_result);
    if(!bool||bool==false){
        AndroidJs.saveWjDetalAnswer(answer_result,false);
    }else{
        AndroidJs.saveWjDetalAnswer(answer_result,true);
    }
}
//----------------------------------------------------------动态生成函数开始-------------------------------------------------------------------------------

//---------------------------------------------------------- TEXTAREA类型-------------------------------------------------------------------------------
function create_Textarea(question, oul, oSection, oDiv, objName,name) {
    //oSection.removeChild(oDiv);
    var oInput_Div=getElementsByClassName(document, "div", "problem putinput")[0];
    var sDiv_TEXTAREA = document.createElement("div");
    //sDiv_TEXTAREA.className = "problem";
    
    if(questionCode=='0003'||questionCode=='0007'){//贸易型
    	tipVal='从是否代理、社会人际关系、稳定客源、收款难易程度等方面进行描述';
    }else if(questionCode=='0005'||questionCode=='0009'){//服务型
    	tipVal='从生意地理位置、周边人流、周边竞争环境、装修档次、员工着装、内部管理等方面进行描述';
    }else if(questionCode=='0004'||questionCode=='0006'||questionCode=='0008'||questionCode=='0010'){//农业型和生产加工
    	tipVal='从准入门槛、技术含量、行业竞争等方面进行描述';
    }
    if (question.require) {
        sDiv_TEXTAREA.innerHTML = '<div class="risk"><h2>' + question.name + '</h2><div>*</div></div><div class="risk_input_wrap centerfix textarea_zh" id=' + setIndex(question.code) + '><span>此处可输入500字</span><textarea class="risk_input" data-require='+question.require+' maxlength="500" data-regexRule='+question.regexRule +' placeholder="'+tipVal+'" data-regexRuleName='+question.regexRuleName +' data-fieldname=' + question.fieldName + '></textarea></div><label class="jiaoyan hide_zh" style="color: red; font-size: 0.4rem;margin-left:0.3rem;margin-top:0.2rem">请输入500位任意字符必填数据</label><div class="lone" id="lone"></div>';
    } else {
        sDiv_TEXTAREA.innerHTML = '<div class="risk"><h2>' + question.name + '</h2></div><div class="risk_input_wrap centerfix textarea_zh" id=' + setIndex(question.code) + '><span>此处可输入500字</span><textarea class="risk_input" data-require='+question.require+' maxlength="500" data-regexRule='+question.regexRule +' placeholder="'+tipVal+'" data-regexRuleName='+question.regexRuleName +' data-fieldname=' + question.fieldName + '></textarea></div><label class="jiaoyan hide_zh" style="color: red; font-size: 0.4rem;margin-left:0.3rem;margin-top:0.2rem">请输入500位任意字符必填数据</label><div class="lone" id="lone"></div>';
    }
    oInput_Div.innerHTML+=sDiv_TEXTAREA.innerHTML;
}

//--------------------------------------------------------- 动态生成函数结束-------------------------------------------------------------------------------
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
//用途：检查输入字符串是否为空或者全部都是空格,如果全是空返回true,否则返回false
function isNull( str ){
    if ( str == "" ) return true;
    var regu = "^[ ]+$";
    var re = new RegExp(regu);
    return re.test(str);
}
