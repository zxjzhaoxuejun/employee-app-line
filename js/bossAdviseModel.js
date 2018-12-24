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

function loadBossAdvise(data) {
    console.log(data);
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
    var serialNo=answerList.serialNo;
    //alert(serialNo);
    var answerList_OK = answerList[modelOjbName_all];
    console.log(answerList_OK);
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
            //sUl_table.style.border="0.2rem solid black";
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
                        create_Integer(subList[j].questionDetailList[i], sUl_table);
                        break;
                    case "CHECKBOX":
                        create_Checkbox(subList[j].questionDetailList[i], sUl_table, subList[j].objName);
                        break;
                    case "STRING":
                        create_String(subList[j].questionDetailList[i], sUl_table);
                        break;
                    case "CODE":
                        create_Code(subList[j].questionDetailList[i], sUl_table,subList[j].objName);
                        break;
                    case "SSQADDRESS":
                        create_SSQADDRESS(subList[j].questionDetailList[i], sUl_table);
                        break;
                    case "TELEPHONE":
                        create_Telephone(subList[j].questionDetailList[i], sUl_table);
                        break;
                    case "DATE":
                        create_Date(subList[j].questionDetailList[i], sUl_table);
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
    //-----------------------------------------------------------Input大类初始化------------------------------------------------------------------------------
    //------------------------------------------------------中安拒绝特定初始化函数--------------------------------------------------------------------------------
    function Approval_hide(){//批准页面整体隐藏------初始化
        var oSection = document.getElementsByTagName("section")[0];
        var oDiv=getElementsByClassName(oSection, "div", "problem");
        for(var i=1;i<oDiv.length;i++){
            removeClass(oDiv[i],"active_zh");
            addClass(oDiv[i],"hide_zh");
        }
    }
    function Approval_show(){//批准页面整体显示------初始化
        var oSection = document.getElementsByTagName("section")[0];
        var oDiv=getElementsByClassName(oSection, "div", "problem");
        for(var i=1;i<oDiv.length;i++){
            removeClass(oDiv[i],"hide_zh");
            addClass(oDiv[i],"active_zh");
        }
    }
    function checkbox_total_hide() {//拒绝页面整体隐藏------初始化
        var oSection = document.getElementsByTagName("section")[0];
        var oDiv_First = getElementsByClassName(oSection, "div", "problem putinput")[0];//获取第一层,class名为"problem putinput"的div
        var oUl_First=getElementsByClassNameinnextlayer(oDiv_First,"ul")[0];//获取ul
        var oLi_hide=getElementsByClassNameinnextlayer(oUl_First,"li");//获取ul下面所有的li集合
        var oLi_checkbox=getElementsByClassName(oUl_First, "li", "checkbox_zh");//选取所有的checkbox类型

        for(var i=0;i<oLi_hide.length;i++){//--------------------将所有的li的class类都设置为显示状态
            removeClass(oLi_hide[i], "hide_zh");
            addClass(oLi_hide[i], "active_zh");
        }
        for(var j=0;j<oLi_checkbox.length;j++){//--------------------将所有的checkbox设置为隐藏状态
            removeClass(oLi_checkbox[j], "active_zh");
            addClass(oLi_checkbox[j], "hide_zh");
        }
        removeClass(oLi_checkbox[0].previousElementSibling, "active_zh");
        addClass(oLi_checkbox[0].previousElementSibling, "hide_zh");
    }
    function checkbox_total_show() {//拒绝页面整体显示------初始化
        var oSection = document.getElementsByTagName("section")[0];
        var oDiv_First = getElementsByClassName(oSection, "div", "problem putinput")[0];//获取第一层,class名为"problem putinput"的div
        var oUl_First=getElementsByClassNameinnextlayer(oDiv_First,"ul")[0];
        var oLi_show=getElementsByClassNameinnextlayer(oUl_First,"li");//获取ul下面所有的li集合
        var oLi_checkbox=getElementsByClassName(oUl_First, "li", "checkbox_zh");//选取所有的checkbox类型

        for(var i=1;i<oLi_show.length;i++){//--------------------将所有的li(除了第一个li)的class类都设置为隐藏状态
            removeClass(oLi_show[i], "active_zh");
            addClass(oLi_show[i], "hide_zh");
        }
        for(var j=0;j<oLi_checkbox.length;j++){//--------------------将所有的checkbox设置为显示状态
            removeClass(oLi_checkbox[j], "hide_zh");
            addClass(oLi_checkbox[j], "active_zh");
        }
        removeClass(oLi_checkbox[0].previousElementSibling, "hide_zh");
        addClass(oLi_checkbox[0].previousElementSibling, "active_zh");//设置checkbox上面的那个li为显示状态

        var oStrong=oLi_checkbox[0].previousElementSibling.getElementsByTagName("strong");//选取checkbox上面的那个li
        var oEm_01=oStrong[0].getElementsByTagName("em")[0];
        var oEm_02=oStrong[1].getElementsByTagName("em")[0];
        if(answerList_OK[oDiv_First.dataset.objname]&&answerList_OK[oDiv_First.dataset.objname].hasOwnProperty(oLi_checkbox[0].previousElementSibling.dataset.fieldname)){
            if(oStrong[0].dataset.codediclistcode==answerList_OK[oDiv_First.dataset.objname][oLi_checkbox[0].previousElementSibling.dataset.fieldname]){
                oEm_01.className = "s2no";//如果第一个选择按钮的field_code等于数据库里面的对应值相等，第一个按钮被选中
                oEm_02.className = "s2active";
                zhongan_sub_show();
            }else if(oStrong[1].dataset.codediclistcode==answerList_OK[oDiv_First.dataset.objname][oLi_checkbox[0].previousElementSibling.dataset.fieldname]){
                oEm_01.className = "s2no";//如果第二个选择按钮的field_code等于数据库里面的对应值相等，第一个按钮被选中
                oEm_02.className = "s2active";
                customer_sub_show();
            }else{
                oEm_01.className = "s2no";//如果两个选择按钮的field_code都不等于数据库里面的对应值相等，设置第一个按钮被选中
                oEm_02.className = "s2active";
                zhongan_sub_show();
            }
        }else{
            oEm_01.className = "s2no";//如果这个属性不存在，默认设置第一个按钮处理选中状态
            oEm_02.className = "s2active";
            zhongan_sub_show();
        }
    }
    function zhongan_sub_show() {//客户拒绝子页面单独显示------事件绑定
        var oSection = document.getElementsByTagName("section")[0];
        var oDiv_First = getElementsByClassName(oSection, "div", "problem putinput")[0];//获取第一层,class名为"problem putinput"的div
        var oUl_First_zhongan = getElementsByClassNameinnextlayer(oDiv_First, "ul")[0];
        var oLi_show_zhongan = getElementsByClassName(oUl_First_zhongan, "li", "checkbox_zh");
        removeClass(oLi_show_zhongan[1], "active_zh");
        addClass(oLi_show_zhongan[1], "hide_zh");
        removeClass(oLi_show_zhongan[0], "hide_zh");
        addClass(oLi_show_zhongan[0], "active_zh");
    }
    function customer_sub_show() {//中安拒绝子页面单独显示------事件绑定
        var oSection = document.getElementsByTagName("section")[0];
        var oDiv_First = getElementsByClassName(oSection, "div", "problem putinput")[0];//获取第一层,class名为"problem putinput"的div
        var oUl_First_cus = getElementsByClassNameinnextlayer(oDiv_First, "ul")[0];
        var oLi_show_customer = getElementsByClassName(oUl_First_cus, "li", "checkbox_zh");
        removeClass(oLi_show_customer[1], "hide_zh");
        addClass(oLi_show_customer[1], "active_zh");
        removeClass(oLi_show_customer[0], "active_zh");
        addClass(oLi_show_customer[0], "hide_zh");
    }
    function checkbox_total_event() {//拒绝页面整体显示------初始化
        var oSection = document.getElementsByTagName("section")[0];
        var oDiv_First = getElementsByClassName(oSection, "div", "problem putinput")[0];//获取第一层,class名为"problem putinput"的div
        var oUl_First=getElementsByClassNameinnextlayer(oDiv_First,"ul")[0];
        var oLi_show=getElementsByClassNameinnextlayer(oUl_First,"li");//获取ul下面所有的li集合
        var oLi_checkbox=getElementsByClassName(oUl_First, "li", "checkbox_zh");//选取所有的checkbox类型

        for(var i=1;i<oLi_show.length;i++){//--------------------将所有的li(除了第一个li)的class类都设置为隐藏状态
            removeClass(oLi_show[i], "active_zh");
            addClass(oLi_show[i], "hide_zh");
        }
        for(var j=0;j<oLi_checkbox.length;j++){//--------------------将所有的checkbox设置为显示状态
            removeClass(oLi_checkbox[j], "hide_zh");
            addClass(oLi_checkbox[j], "active_zh");
        }
        removeClass(oLi_checkbox[0].previousElementSibling, "hide_zh");
        addClass(oLi_checkbox[0].previousElementSibling, "active_zh");//设置checkbox上面的那个li为显示状态

        var oStrong=oLi_checkbox[0].previousElementSibling.getElementsByTagName("strong");//选取checkbox上面的那个li
        var _oI=oStrong[0].parentNode.previousElementSibling.getElementsByTagName("i")[0];
        var _oB_01=oStrong[0].nextElementSibling;
        var _oB_02=oStrong[1].nextElementSibling;
        var oEm_01=oStrong[0].getElementsByTagName("em")[0];
        var oEm_02=oStrong[1].getElementsByTagName("em")[0];
        if(oEm_01.className =="s2active"){
            oEm_02.className = "s2no";
            _oB_01.style.color="rgb(0,0,0)";
            _oB_02.style.color="rgb(160, 160, 165)";
            zhongan_sub_show();
        }else if(oEm_02.className == "s2active"){
            oEm_01.className = "s2no";
            _oB_01.style.color="rgb(160, 160, 165)";
            _oB_02.style.color="rgb(0,0,0)";
            customer_sub_show();
        }else{
            _oI.style.color="rgb(160, 160, 165)";
            oEm_01.className ="s2active"
            oEm_02.className = "s2no";
            _oB_01.style.color="rgb(0,0,0)";
            _oB_02.style.color="rgb(160, 160, 165)";
            zhongan_sub_show();
        }
    }
//----------------------------------------------------------DOUBLE初始化---------------------------------------------------------------------------
    var oDouble_zh = getElementsByClassName(document, "li", "double_zh");//获取所有的DOUBLE类型
    for (var i = 0; i < oDouble_zh.length; i++) {
        that_Double_Initialization = oDouble_zh[i];//这里用that_Double_Initialization存储oInteger_zh[i]
        var objname_Double = that_Double_Initialization.parentNode.parentNode.dataset.objname;//获取大的div上面的data-objname值
        var field_Double = that_Double_Initialization.dataset.fieldname;//获取li上面的data-fieldname值
        Double_Initialization_input = that_Double_Initialization.getElementsByTagName("input")[0];//获取li下面的input元素
        Double_Initialization_I= that_Double_Initialization.getElementsByTagName("i")[0];//获取li下面的i元素,即左边的显示值
        //如果double在Input大类中
        if (that_Double_Initialization.parentNode.parentNode.className == "problem putinput") {
            if(answerList_OK[objname_Double]&&answerList_OK[objname_Double].hasOwnProperty(field_Double)){
                if (answerList_OK[objname_Double][field_Double] == undefined || answerList_OK[objname_Double][field_Double] == null) {
                    Double_Initialization_input.value = "";
                    Double_Initialization_I.style.color="rgb(0, 0, 0)";//-------------------------颜色颜色
                } else {
                    Double_Initialization_input.value = answerList_OK[objname_Double][field_Double];//将对应的值赋值给input以初始化
                    Double_Initialization_I.style.color="rgb(160, 160, 165)";//-------------------------颜色
                }
            }else{
                Double_Initialization_input.value = "";
                Double_Initialization_I.style.color="rgb(0, 0, 0)";//-------------------------颜色颜色
            }
        }
    }
//----------------------------------------------------------INTEGER初始化---------------------------------------------------------------------------

    var oInteger_zh = getElementsByClassName(document, "li", "integer_zh");//获取所有的INTEGER类型
    for (var i = 0; i < oInteger_zh.length; i++) {
        that_Integer_Initialization = oInteger_zh[i];//这里用that_Integer_Initialization存储oInteger_zh[i]
        var objname_Integer = that_Integer_Initialization.parentNode.parentNode.dataset.objname;//获取大的div上面的data-objname值
        var field_Integer = that_Integer_Initialization.dataset.fieldname;//获取li上面的data-fieldname值
        Integer_Initialization_input = that_Integer_Initialization.getElementsByTagName("input")[0];//获取li下面的input元素
        Integer_Initialization_I = that_Integer_Initialization.getElementsByTagName("i")[0];//获取li下面的input元素
        //如果double在Input大类中
        if (that_Integer_Initialization.parentNode.parentNode.className == "problem putinput") {
            if(answerList_OK[objname_Integer]&&answerList_OK[objname_Integer].hasOwnProperty(field_Integer)){
                if (answerList_OK[objname_Integer][field_Integer] == undefined || answerList_OK[objname_Integer][field_Integer] == null) {
                    Integer_Initialization_input.value = "";
                    Integer_Initialization_I.style.color="rgb(0, 0, 0)";//-------------------------颜色颜色
                } else {
                    Integer_Initialization_input.value = answerList_OK[objname_Integer][field_Integer];//将对应的值赋值给input以初始化
                    Integer_Initialization_I.style.color="rgb(160, 160, 165)";//-------------------------颜色
                }
            }else{
                Integer_Initialization_input.value = "";
                Integer_Initialization_I.style.color="rgb(0, 0, 0)";//-------------------------颜色颜色
            }
        }
    }
//----------------------------------------------------------STRING初始化---------------------------------------------------------------------------
    var oString_zh = getElementsByClassName(document, "li", "string_zh");//获取所有的STRING类型
    for (var i = 0; i < oString_zh.length; i++) {
        that_string_Initialization = oString_zh[i];//这里用that_string_Initialization存储oString_zh[i]
        var objname_string = that_string_Initialization.parentNode.parentNode.dataset.objname;//获取大的div上面的data-objname值
        var field_string = that_string_Initialization.dataset.fieldname;//获取li上面的data-fieldname值
        string_Initialization_input = that_string_Initialization.getElementsByTagName("input")[0];//获取li下面的input元素
        string_Initialization_I = that_string_Initialization.getElementsByTagName("i")[0];//获取li下面的input元素
        //如果STRING在Input大类中
        if (that_string_Initialization.parentNode.parentNode.className == "problem putinput") {
            if(answerList_OK[objname_string]&&answerList_OK[objname_string].hasOwnProperty(field_string)){
                if (answerList_OK[objname_string][field_string] == undefined || answerList_OK[objname_string][field_string] == null) {
                    string_Initialization_input.value = "";
                    string_Initialization_I.style.color="rgb(0, 0, 0)";//-------------------------颜色颜色
                } else {
                    string_Initialization_input.value = answerList_OK[objname_string][field_string];//将对应的值赋值给input以初始化
                    string_Initialization_I.style.color="rgb(160, 160, 165)";//-------------------------颜色
                }
            }else{
                string_Initialization_input.value = "";
                string_Initialization_I.style.color="rgb(0, 0, 0)";//-------------------------颜色颜色
            }
        }
    }
//----------------------------------------------------------DATE初始化---------------------------------------------------------------------------
    var oDate_zh = getElementsByClassName(document, "li", "date_zh");//获取所有的STRING类型
    for (var i = 0; i < oDate_zh.length; i++) {
        that_date_Initialization = oDate_zh[i];//这里用that_string_Initialization存储oString_zh[i]
        var objname_date = that_date_Initialization.parentNode.parentNode.dataset.objname;//获取大的div上面的data-objname值
        var field_date = that_date_Initialization.dataset.fieldname;//获取li上面的data-fieldname值
        date_Initialization_input = that_date_Initialization.getElementsByTagName("input")[0];//获取li下面的input元素
        //如果STRING在Input大类中
        if (that_date_Initialization.parentNode.parentNode.className == "problem putinput") {
            if(answerList_OK[objname_string]&&answerList_OK[objname_string].hasOwnProperty(field_string)){
                if (answerList_OK[objname_string][field_string] == undefined || answerList_OK[objname_string][field_string] == null) {
                    date_Initialization_input.value = "";
                } else {
                    date_Initialization_input.value = answerList_OK[objname_string][field_string];//将对应的值赋值给input以初始化
                }
            }else{
                date_Initialization_input.value = "";
            }
        }/* else {//如果在Table大类中
         if (answerList_OK[objname_string][0] && answerList_OK[objname_string][0].hasOwnProperty(field_string)) {
         if (answerList_OK[objname_string][0][field_string] == undefined || answerList_OK[objname_string][0][field_string] == null) {
         date_Initialization_input.value = "";
         } else {
         date_Initialization_input.value = answerList_OK[objname_string][0][field_string];//将对应的值赋值给input以初始化
         }
         } else {
         date_Initialization_input.value = "";
         }
         }*/
    }
//----------------------------------------------------------TELEPHONE初始化---------------------------------------------------------------------------
    var oTelephone_zh = getElementsByClassName(document, "li", "telephone_zh");//获取所有的TELEPHONE类型
    for (var i = 0; i < oTelephone_zh.length; i++) {
        that_oTelephone_Initialization = oTelephone_zh[i];//这里用that_oTelephone_Initialization存储oTelephone_zh[i]
        var objname_telephone = that_oTelephone_Initialization.parentNode.parentNode.dataset.objname;//获取大的div上面的data-objname值
        var field_telephone = that_oTelephone_Initialization.dataset.fieldname;//获取li上面的data-fieldname值
        telephone_Initialization_input = that_oTelephone_Initialization.getElementsByTagName("input");//获取li下面的input元素集合
        if (that_oTelephone_Initialization.parentNode.parentNode.className == "problem putinput") {
            if(answerList_OK[objname_telephone]&&answerList_OK[objname_telephone].hasOwnProperty(field_telephone)){
                if (answerList_OK[objname_telephone][field_telephone] == undefined || answerList_OK[objname_telephone][field_telephone] == null) {
                    for(var m=0;m<telephone_Initialization_input.length;m++){
                        telephone_Initialization_input[m].value = "";
                    }
                } else {
                    var tel_num=answerList_OK[objname_telephone][field_telephone].split("-");
                    for(var m=0;m<telephone_Initialization_input.length;m++){
                        telephone_Initialization_input[m].value=tel_num[m];//将对应的值赋值给input以初始化
                    }
                }
            }else{
                for(var m=0;m<telephone_Initialization_input.length;m++){
                    telephone_Initialization_input[m].value = "";
                }
            }
        }
    }
//----------------------------------------------------------SSQADDRESS初始化---------------------------------------------------------------------------
    var oSsqAddress_zh = getElementsByClassName(document, "li", "ssqaddress_zh");//获取所有的SSQADDRESS类型
    for (var i = 0; i < oSsqAddress_zh.length; i++) {
        that_SsqAddress_Initialization = oSsqAddress_zh[i];//这里用that_oTelephone_Initialization存储oTelephone_zh[i]
        var objname_SsqAddress = that_SsqAddress_Initialization.parentNode.parentNode.dataset.objname;//获取大的div上面的data-objname值
        var field_SsqAddress = that_SsqAddress_Initialization.dataset.fieldname;//获取li上面的data-fieldname值
        SsqAddress_Initialization_span =getElementsByClassName(that_SsqAddress_Initialization, "span", "choose")[0];//获取li下面的input元素
        if (that_SsqAddress_Initialization.parentNode.parentNode.className == "problem putinput") {
            if(answerList_OK[objname_SsqAddress]&&answerList_OK[objname_SsqAddress].hasOwnProperty(field_SsqAddress)){
                if (answerList_OK[objname_SsqAddress][field_SsqAddress] == undefined || answerList_OK[objname_SsqAddress][field_SsqAddress] == null) {
                    SsqAddress_Initialization_span.innerHTML = "请选择";
                } else {
                    //var adress_input=AndroidJs.getAddressByGuid(answerList_OK[objname_SsqAddress][field_SsqAddress]);
                    //SsqAddress_Initialization_span.innerHTML = adress_input;//将对应的值赋值给input以初始化
                    SsqAddress_Initialization_span.innerHTML = answerList_OK[objname_SsqAddress][field_SsqAddress];//将对应的值赋值给input以初始化
                }
            }else{
                SsqAddress_Initialization_span.innerHTML = "请选择";
            }
        }
    }
//----------------------------------------------------------CHECKBOX初始化---------------------------------------------------------------------------
    var oCheckbox_zh = getElementsByClassName(document, "li", "checkbox_zh");//获取所有的SSQADDRESS类型
    for (var i = 0; i < oCheckbox_zh.length; i++) {
        (function(){
            that_Checkbox_Initialization = oCheckbox_zh[i];//这里用that_oTelephone_Initialization存储oTelephone_zh[i]
            that_Checkbox_Initialization.style.border="none";//清除他们的CSS样式中，li中的border-bottom样式
            var objname_Checkbox = that_Checkbox_Initialization.parentNode.parentNode.dataset.objname;//获取大的div上面的data-objname值
            var field_Checkbox = that_Checkbox_Initialization.dataset.fieldname;//获取li上面的data-fieldname值
            Checkbox_Initialization_li = getElementsByClassName(that_Checkbox_Initialization, "li", "check_li");//获取check_li子集
            if (that_Checkbox_Initialization.parentNode.parentNode.className == "problem putinput"){
                if(answerList_OK[objname_Checkbox]&&answerList_OK[objname_Checkbox].hasOwnProperty(field_Checkbox)){//如果这个属性存在
                    if(answerList_OK[objname_Checkbox][field_Checkbox]==null||answerList_OK[objname_Checkbox][field_Checkbox]==undefined||answerList_OK[objname_Checkbox][field_Checkbox]==""){
//---------------------------------------如果存在这个属性，但是属性为空，什么都不要做
                    }else{
                        for(var j=0;j<Checkbox_Initialization_li.length;j++){
                            var that_checkbox=Checkbox_Initialization_li[j];
                            var check_img=that_checkbox.getElementsByTagName("img")[0];
                            var check_span=that_checkbox.getElementsByTagName("span")[0];
                            var str_answerList=answerList_OK[objname_Checkbox][field_Checkbox];
                            var arry_answerList=str_answerList.split(",");
                            for(var m=0;m<arry_answerList.length;m++){
                                if(that_checkbox.dataset.code==arry_answerList[m]){
                                    check_img.src="img/jxt_icon.png";
                                    check_span.style.color="rgb(0,0,0)";
                                    addClass(that_checkbox,"checked");
                                    addClass(check_img,"checked_img");
                                    //addClass(that_checkbox,"border_bottom");
                                }
                            }
                        }
                    }
                }else{
//---------------------------------------如果不存在这个属性，什么都不要做
                }
            }
        }(i))
    }
//----------------------------------------------------------CODE_two初始化-------------------------------------------------------------------------------
    var oCode_zh_two = getElementsByClassName(document, "li", "code_zh_two");//获取所有CODE选项等于2的类型
    function code_two_Init() {//-------------------------------------------------------只有两个按钮的时候初始化
        for (var i = 0; i < oCode_zh_two.length; i++) {
            that_code_Initialization = oCode_zh_two[i];//这里用that_code_Initialization存储oString_zh[i]
            var objname_code = that_code_Initialization.parentNode.parentNode.dataset.objname;//获取大的div上面的data-objname值
            var field_code = that_code_Initialization.dataset.fieldname;//获取li上面的data-fieldname值
            var oI_code=that_code_Initialization.getElementsByTagName("i")[0];
            var code_strong = that_code_Initialization.getElementsByTagName("strong");
            var code_em01 = code_strong[0].getElementsByTagName("em")[0];   //radio第一个选择按钮
            var code_em02 = code_strong[1].getElementsByTagName("em")[0];   //radio第二个选择按钮
            var b_01=code_strong[0].nextElementSibling;
            var b_02=code_strong[1].nextElementSibling;
            //特殊处理_________因为这个页面要通过radio隐藏元素
            if (field_code == "loanAdvise") {
                //特殊处理_________如果大的类型为input
                if (answerList_OK[objname_code]) {//----------------------如果这个大的属性存在
                    if (code_strong[1].dataset.codediclistcode == answerList_OK[objname_code][field_code]) {
                        code_em02.className = "s2active";//如果第二个选择按钮的field_code等于数据库里面的对应值相等，第二个按钮被选中
                        code_em01.className = "s2no";
                        oI_code.style.color="rgb(160, 160, 165)";
                        checkbox_total_show();
                        Approval_hide();
                        b_02.style.color="rgb(0,0,0)";//-------------------颜色
                        b_01.style.color="rgb(160, 160, 165)";//-------------------颜色
                    } else if (code_strong[0].dataset.codediclistcode == answerList_OK[objname_code][field_code]) {
                        code_em01.className = "s2active";//如果第一个选择按钮的field_code等于数据库里面的对应值相等，第一个按钮被选中
                        code_em02.className = "s2no";
                        oI_code.style.color="rgb(160, 160, 165)";
                        checkbox_total_hide();
                        Approval_show();
                        b_01.style.color="rgb(0,0,0)";//-------------------颜色
                        b_02.style.color="rgb(160, 160, 165)";//-------------------颜色
                    } else {
                        code_em01.className = "s2active";//如果这两个选择按钮的field_code都不等于数据库里面的对应值相等，默认第一个按钮被选中
                        code_em02.className = "s2no";
                        oI_code.style.color="rgb(160, 160, 165)";
                        checkbox_total_hide();
                        Approval_show();
                        b_01.style.color="rgb(0,0,0)";//-------------------颜色
                        b_02.style.color="rgb(160, 160, 165)";//-------------------颜色
                    }
                } else {//----------------------如果这个大的属性不存在
                    code_em01.className = "s2active";//如果这两个选择按钮的field_code都不等于数据库里面的对应值相等，默认第一个按钮被选中
                    code_em02.className = "s2no";
                    oI_code.style.color="rgb(160, 160, 165)";
                    checkbox_total_hide();
                    Approval_show();
                    b_01.style.color="rgb(0,0,0)";//-------------------颜色
                    b_02.style.color="rgb(160, 160, 165)";//-------------------颜色
                }
            }else {
                //通用处理_________如果大的类型为input
                if (that_code_Initialization.parentNode.parentNode.className == "problem putinput") {
                    if(answerList_OK[objname_code]&&answerList_OK[objname_code].hasOwnProperty(field_code)){//-----------------------如果存在这个属性
                        if (code_strong[0].dataset.codediclistcode == answerList_OK[objname_code][field_code]) {
                            code_em01.className = "s2active";//如果第一个选择按钮的field_code等于数据库里面的对应值相等，第一个按钮被选中
                            code_em02.className = "s2no";
                            oI_code.style.color="rgb(160, 160, 165)";
                            b_01.style.color="rgb(0,0,0)";//-------------------颜色
                            b_02.style.color="rgb(160, 160, 165)";//-------------------颜色
                        } else if (code_strong[1].dataset.codediclistcode == answerList_OK[objname_code][field_code]) {
                            code_em02.className = "s2active";//如果第二个选择按钮的field_code等于数据库里面的对应值相等，第二个按钮被选中
                            code_em01.className = "s2no";
                            oI_code.style.color="rgb(160, 160, 165)";
                            b_02.style.color="rgb(0,0,0)";//-------------------颜色
                            b_01.style.color="rgb(160, 160, 165)";//-------------------颜色
                        }else{//如果两个选择按钮的field_code都不等于数据库里面的对应值相等，两个按钮都未被选中
                            code_em01.className = "s2no";
                            code_em02.className = "s2no";
                            b_01.style.color="rgb(160, 160, 165)";//-------------------颜色
                            b_02.style.color="rgb(160, 160, 165)";//-------------------颜色
                        }
                    }else{
                        code_em01.className = "s2no";//---------------假如不存在这个属性，两个单选框都置空
                        code_em02.className = "s2no";//---------------假如不存在这个属性，两个单选框都置空
                        b_01.style.color="rgb(160, 160, 165)";//-------------------颜色
                        b_02.style.color="rgb(160, 160, 165)";//-------------------颜色
                    }
                }
            }
        }
    }
    code_two_Init();
//----------------------------------------------------------CODE_three初始化-------------------------------------------------------------------------------
    var oCode_zh_three = getElementsByClassName(document, "li", "code_zh_three");//获取所有CODE选项大于2的类型
    function code_three_Init() {//-------------------------------------------------------按钮大于2的时候初始化
        for (var i = 0; i < oCode_zh_three.length; i++) {
            code_three_Initialization = oCode_zh_three[i];//这里用code__three_Initialization存储oCode_zh_three[i]
            var objname_code_three = code_three_Initialization.parentNode.parentNode.dataset.objname;//获取大的div上面的data-objname值
            var field_code_three = code_three_Initialization.dataset.fieldname;//获取li上面的data-fieldname值
            var oSpan_choose=getElementsByClassName(code_three_Initialization, "span", "choose")[0];//获取用户输入框的值
            var oLi_chooseLi=getElementsByClassName(code_three_Initialization, "li", "choosethree");//获取用户输入框的值
            for(var j=0;j<oLi_chooseLi.length;j++){
                //通用处理_________如果大的类型为input
                if (code_three_Initialization.parentNode.parentNode.className == "problem putinput"){
                    if(answerList_OK[objname_code_three]&&answerList_OK[objname_code_three].hasOwnProperty(field_code_three)){//假如答案中这个属性存在
                        if(answerList_OK[objname_code_three][field_code_three]==null||answerList_OK[objname_code_three][field_code_three]==undefined){
                            oSpan_choose.innerHTML="请选择";//假如答案中这个属性存在，但是为空，用户输入框的值默认为"请选择"
                        }else{
                            if(oLi_chooseLi[j].dataset.code==answerList_OK[objname_code_three][field_code_three]){
                                oSpan_choose.innerHTML=oLi_chooseLi[j].innerHTML;
                            }
                        }
                    }else{
                        oSpan_choose.innerHTML="请选择";
                    }
                } /*else {
                 //通用处理_________如果大的类型为table
                 if (answerList_OK[objname_code_three] && answerList_OK[objname_code_three][0] && answerList_OK[objname_code_three][0].hasOwnProperty(field_code_three)) {
                 if (answerList_OK[objname_code_three][0][field_code_three] == null || answerList_OK[objname_code_three][0][field_code_three] == "") {
                 oSpan_choose.innerHTML = "请选择";//假如答案中这个属性存在，但是为空，用户输入框的值默认为"请选择"
                 } else {//----------------假如有答案
                 if (oLi_chooseLi[j].dataset.code == answerList_OK[objname_code_three][0][field_code_three]) {
                 //alert(oLi_chooseLi[j].innerHTML);
                 oSpan_choose.innerHTML = oLi_chooseLi[j].innerHTML;
                 }
                 }
                 } else {
                 oSpan_choose.innerHTML = "请选择";
                 }
                 }*/
            }
        }
    }
    code_three_Init();
//----------------------------------------------------------TEXTAREA类型的初始化-------------------------------------------------------------------------------
    var oTextArea_zh = getElementsByClassName(document, "textarea", "risk_input");//获取所有的TEXTAREA类型
    for (var i = 0; i < oTextArea_zh.length; i++) {
        (function () {
            var fieldName = oTextArea_zh[i].dataset.fieldname;
            var objName_textArear = oTextArea_zh[i].dataset.objname;
            oTextArea_zh[i].innerHTML = answerList_OK[objName_textArear][fieldName];
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
        oTextArea_zh[i].onblur = function () {
            var oSpan = this.parentNode.getElementsByTagName("span")[0];
            var str = "";
            if (this.value !== "") {
                str += this.value;
            } else {
                str = "";
            }
            if (str == "") {
                this.placeholder = "请输入";
                oSpan.style.display = "inline";
            }
        }
    }
//---------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------生成每个大的table类下的多个标签和ul
    var osection_all=document.getElementsByTagName("section")[0];
    var table_div_all= getElementsByClassName(osection_all, "div", "puttable");
    var num_islabel;
    var iNow=0;
    for(var i=0;i<table_div_all.length;i++){
        var _that_table=table_div_all[i];
        var obJname=_that_table.dataset.objname;
        var len_all;
        if(answerList_OK[obJname]!=null){
            len_all=answerList_OK[obJname].length;
        }else{
            len_all=1;
        }
        var div_wrap_oSpan=getElementsByClassName(_that_table, "div", "cy")[0];//获取容纳标签的div
        var oUl_first=getElementsByClassNameinnextlayer(_that_table,"ul")[0];
        oUl_first.className="ul_wrap";
        var frag_span=document.createDocumentFragment();
        var frag_ul=document.createDocumentFragment();
        if(len_all>1){//-------------------------------------当答案中有多组答案
            for(var j=1;j<len_all;j++){//--------------------------有答案中有多少个数组就生成多少个数组
                var os_span=document.createElement("span");
                os_span.className="span_zh";
                os_span.innerHTML="类型";
                frag_span.appendChild(os_span);
                var os_ul=document.createElement("ul");
                os_ul.className="ul_wrap";
                os_ul.innerHTML=oUl_first.innerHTML;
                frag_ul.appendChild(os_ul);
            }
            div_wrap_oSpan.appendChild(frag_span);
            _that_table.appendChild(frag_ul);
        }
//--------------------------------------------------Tabel大类初始化-------------------------------------------------------------------------------
//-------------------------------------------------------------------内容初始化(设置各种类型的li)
        var oSpan_comp=div_wrap_oSpan.getElementsByTagName("span");//获取生成之后的span
        var oUl_comp=getElementsByClassNameinnextlayer(_that_table,"ul");//获取生成之后的ul
        for(j=0;j<oUl_comp.length;j++){
            _ul=oUl_comp[j];
            var oLi_type=getElementsByClassNameinnextlayer(_ul,"li");
            for(var m=0;m<oLi_type.length;m++){
                var _fieldname=oLi_type[m].dataset.fieldname;
                if(oLi_type[m].className=="double_zh"){//---------------------------double类型
                    var _oInput_dou=oLi_type[m].getElementsByTagName("input")[0];
                    if (answerList_OK[obJname]&&answerList_OK[obJname][j]&&answerList_OK[obJname][j][_fieldname]) {//-------------------假如对于答案存在
                        if (answerList_OK[obJname][j][_fieldname] == null || answerList_OK[obJname][j][_fieldname] == undefined || answerList_OK[obJname][j][_fieldname] == "") {//假如答案存在，但是为空或者未定义
                            _oInput_dou.value = "";
                        } else {//假如答案存在，而且值不为空  不为未定义
                            _oInput_dou.value = answerList_OK[obJname][j][_fieldname];
                        }
                    }else if(answerList_OK[obJname]==""||answerList_OK[obJname]==null){//-------------------假如对于答案数组压根儿就不存在
                        _oInput_dou.value = "";
                    }else{//-------------------假如对于答案不存在存在
                        _oInput_dou.value = "";
                    }
                }else if(oLi_type[m].className=="integer_zh"){//---------------------------integer类型
                    var _oInput_int=oLi_type[m].getElementsByTagName("input")[0];
                    var _oI_int=oLi_type[m].getElementsByTagName("i")[0];
                    if(answerList_OK[obJname]&&answerList_OK[obJname][j]&&answerList_OK[obJname][j][_fieldname]){//-------------------假如对于答案存在
                        if(answerList_OK[obJname][j][_fieldname] == null || answerList_OK[obJname][j][_fieldname] == undefined || answerList_OK[obJname][j][_fieldname] == ""){//假如答案存在，但是为空或者未定义
                            _oInput_int.value = "";
                            _oI_int.style.color="rgb(0, 0, 0)";
                        }else{//假如答案存在，而且值不为空  不为未定义
                            _oInput_int.value = answerList_OK[obJname][j][_fieldname];
                            _oI_int.style.color="rgb(160, 160, 165)";
                        }
                    }else if(answerList_OK[obJname]==""||answerList_OK[obJname]==null){//-------------------假如对于答案数组压根儿就不存在
                        _oInput_int.value = "";
                        _oI_int.style.color="rgb(0, 0, 0)";
                    }else{//-------------------假如对于答案不存在存在
                        _oInput_int.value = "";
                        _oI_int.style.color="rgb(0, 0, 0)";
                    }
                }else if(oLi_type[m].className=="string_zh"){//---------------------------string类型
                    var _oInput_str=oLi_type[m].getElementsByTagName("input")[0];
                    var _oI_str=oLi_type[m].getElementsByTagName("i")[0];
                    if(answerList_OK[obJname]&&answerList_OK[obJname][j]&&answerList_OK[obJname][j][_fieldname]){//-------------------假如对于答案存在
                        if(answerList_OK[obJname][j][_fieldname] == null || answerList_OK[obJname][j][_fieldname] == undefined || answerList_OK[obJname][j][_fieldname] == ""){//假如答案存在，但是为空或者未定义
                            _oInput_str.value = "";
                            _oI_str.style.color="rgb(0, 0, 0)";
                        }else{//假如答案存在，而且值不为空  不为未定义
                            _oInput_str.value = answerList_OK[obJname][j][_fieldname];
                            _oI_str.style.color="rgb(160, 160, 165)";
                        }
                    }else if(answerList_OK[obJname]==""||answerList_OK[obJname]==null){//-------------------假如对于答案数组压根儿就不存在
                        _oInput_str.value = "";
                        _oI_str.style.color="rgb(0, 0, 0)";
                    }else{
                        _oInput_str.value = "";//-------------------假如对于答案不存在存在
                    }
                }else if(oLi_type[m].className=="telephone_zh"){//---------------------------telephone类型
                    var _oInput_tel=oLi_type[m].getElementsByTagName("input");
                    var _oI_tel=oLi_type[m].getElementsByTagName("i")[0];
                    if(answerList_OK[obJname]&&answerList_OK[obJname][j]&&answerList_OK[obJname][j][_fieldname]){//-------------------假如对于答案存在
                        if(answerList_OK[obJname][j][_fieldname] == null || answerList_OK[obJname][j][_fieldname] == undefined || answerList_OK[obJname][j][_fieldname] == ""){//假如答案存在，但是为空或者未定义
                            for(var t=0;t<_oInput_tel.length;t++){
                                _oInput_tel[t].value="";
                                _oI_tel.style.color="rgb(0, 0, 0)";
                            }
                        }else{//假如答案存在，而且值不为空  不为未定义
                            var tel_arry=answerList_OK[obJname][j][_fieldname].split("-");
                            for(var t=0;t<_oInput_tel.length;t++){
                                _oInput_tel[t].value=tel_arry[t];//将对应的值赋值给input以初始化
                                _oInput_tel[t].style.color="rgb(0, 0, 0)";
                                _oI_tel.style.color="rgb(160, 160, 165)";
                            }
                        }
                    }else if(answerList_OK[obJname]==""||answerList_OK[obJname]==null){//-------------------假如对于答案数组压根儿就不存在
                        for(var t=0;t<_oInput_tel.length;t++){
                            _oInput_tel[t].value="";
                            _oI_tel.style.color="rgb(0, 0, 0)";
                        }
                    }else{//-------------------假如对于答案不存在存在
                        for(var t=0;t<_oInput_tel.length;t++){
                            _oInput_tel[t].value="";
                            _oI_tel.style.color="rgb(0, 0, 0)";
                        }
                    }
                }else if(oLi_type[m].className=="ssqaddress_zh"){//---------------------------ssqaddress类型
                    var _oSpan_ssq=getElementsByClassName(oLi_type[m], "span", "choose")[0];
                    var _oI_ssq=oLi_type[m].getElementsByTagName("i")[0];
                    if(answerList_OK[obJname]&&answerList_OK[obJname][j]&&answerList_OK[obJname][j][_fieldname]){//-------------------假如对于答案存在
                        if(answerList_OK[obJname][j][_fieldname] == null || answerList_OK[obJname][j][_fieldname] == undefined || answerList_OK[obJname][j][_fieldname] == ""){//假如答案存在，但是为空或者未定义
                            _oSpan_ssq.innerHTML="请选择";
                            _oI_ssq.style.color="rgb(0, 0, 0)";
                        }else{//假如答案存在，而且值不为空  不为未定义
                            iNow++;
                            var idd=_oSpan_ssq.parentNode.getAttribute("id");
                            _oSpan_ssq.parentNode.setAttribute("id",idd+iNow);//设置每个ssq的id不一样
                            _oSpan_ssq.setAttribute("guid",answerList_OK[obJname][j][_fieldname]);//自定义有答案的那个span，设置它的guid属性
                            var _adress=AndroidJs.getAddressByGuid(answerList_OK[obJname][j][_fieldname]);//------------------------------------------------Android函数
                            _oSpan_ssq.innerHTML = _adress;//将对应的值赋值给span以初始化//------------------------------------------------Android函数
                            //_oSpan_ssq.innerHTML =answerList_OK[obJname][j][_fieldname];//将对应的值赋值给span以初始化
                            _oSpan_ssq.style.color="rgb(0, 0, 0)";
                            _oI_ssq.style.color="rgb(160, 160, 165)";
                        }
                    }else if(answerList_OK[obJname]==""||answerList_OK[obJname]==null){//-------------------假如对于答案数组压根儿就不存在
                        _oSpan_ssq.innerHTML="请选择";
                        _oI_ssq.style.color="rgb(0, 0, 0)";
                    }else{//-------------------假如对于答案不存在存在
                        _oSpan_ssq.innerHTML="请选择";
                        _oI_ssq.style.color="rgb(0, 0, 0)";
                    }
                }else if(oLi_type[m].className=="code_zh_two"){//---------------------------code_two类型
                    var _code_oI=oLi_type[m].getElementsByTagName("i")[0];
                    var _strong=oLi_type[m].getElementsByTagName("strong");
                    var _code_em01 = _strong[0].getElementsByTagName("em")[0];   //radio第一个选择按钮
                    var _code_em02 = _strong[1].getElementsByTagName("em")[0];   //radio第二个选择按钮
                    var _b_01=_strong[0].nextElementSibling;
                    var _b_02=_strong[1].nextElementSibling;
                    if(answerList_OK[obJname]&&answerList_OK[obJname][j]&&answerList_OK[obJname][j][_fieldname]){//-------------------假如对于答案存在
                        if(answerList_OK[obJname][j][_fieldname] == null || answerList_OK[obJname][j][_fieldname] == undefined || answerList_OK[obJname][j][_fieldname] == ""){//假如答案存在，但是为空或者未定义
                            _code_em01.className = "s2no";//---------------假如这个属性为空或者未定义，两个单选框都置空
                            _code_em02.className = "s2no";//---------------假如这个属性为空或者未定义，两个单选框都置空
                            _b_01.style.color = "rgb(160, 160, 165)";//-------------------颜色
                            _b_02.style.color = "rgb(160, 160, 165)";//-------------------颜色
                        }else{//假如答案存在，而且值不为空  不为未定义
                            if(_strong[0].dataset.codediclistcode == answerList_OK[obJname][j][_fieldname]){
                                _code_em01.className = "s2active";//如果第一个选择按钮的field_code等于数据库里面的对应值相等，第一个按钮被选中
                                _code_em02.className = "s2no";
                                _code_oI.style.color = "rgb(160, 160, 165)";
                                _b_01.style.color = "rgb(0,0,0)";//-------------------颜色
                                _b_02.style.color = "rgb(160, 160, 165)";//-------------------颜色
                            }else if(_strong[1].dataset.codediclistcode == answerList_OK[obJname][j][_fieldname]){
                                _code_em01.className = "s2no";
                                _code_em02.className = "s2active";//如果第二个选择按钮的field_code等于数据库里面的对应值相等，第二个按钮被选中
                                _code_oI.style.color = "rgb(160, 160, 165)";
                                _b_02.style.color = "rgb(0,0,0)";//-------------------颜色
                                _b_01.style.color = "rgb(160, 160, 165)";//-------------------颜色
                            }
                        }
                    }else if(answerList_OK[obJname]==""||answerList_OK[obJname]==null){//-------------------假如对于答案数组压根儿就不存在
                        _code_em01.className = "s2no";//---------------假如这个属性不存在，两个单选框都置空
                        _code_em02.className = "s2no";//---------------假如这个属性不存在，两个单选框都置空
                        _b_01.style.color = "rgb(160, 160, 165)";//-------------------颜色
                        _b_02.style.color = "rgb(160, 160, 165)";//-------------------颜色
                    }else{//-------------------假如对于答案不存在存在
                        _code_em01.className = "s2no";//---------------假如这个属性不存在，两个单选框都置空
                        _code_em02.className = "s2no";//---------------假如这个属性不存在，两个单选框都置空
                        _b_01.style.color = "rgb(160, 160, 165)";//-------------------颜色
                        _b_02.style.color = "rgb(160, 160, 165)";//-------------------颜色
                    }
                }else if(oLi_type[m].className=="code_zh_three"){//---------------------------code_three类型
                    var _oSpan_choose=getElementsByClassName(oLi_type[m], "span", "choose")[0];//获取用户输入框的值
                    var _oLi_chooseLi=getElementsByClassName(oLi_type[m], "li", "choosethree");//获取用户输入框的值
                    var _oI_choose=oLi_type[m].getElementsByTagName("i")[0];
                    if(answerList_OK[obJname]&&answerList_OK[obJname][j]&&answerList_OK[obJname][j][_fieldname]){//-------------------假如对于答案存在
                        if(answerList_OK[obJname][j][_fieldname] == null || answerList_OK[obJname][j][_fieldname] == undefined || answerList_OK[obJname][j][_fieldname] == ""){//假如答案存在，但是为空或者未定义
                            _oSpan_choose.innerHTML="请选择";//假如答案中这个属性存在，但是为空，用户输入框的值默认为"请选择"
                        }else{
                            for(var p=0;p<_oLi_chooseLi.length;p++){//假如答案中这个属性存在，而且不为空
                                if(_oLi_chooseLi[p].dataset.code == answerList_OK[obJname][j][_fieldname]){
                                    _oSpan_choose.innerHTML=_oLi_chooseLi[p].innerHTML;
                                    _oSpan_choose.style.color="rgb(0,0,0)";
                                    _oI_choose.style.color="rgb(160, 160, 165)";
                                }
                            }
                        }
                    }else if(answerList_OK[obJname]==""||answerList_OK[obJname]==null){//-------------------假如对于答案数组压根儿就不存在
                        _oSpan_choose.innerHTML="请选择";
                    }else{//-------------------假如对于答案不存在存在
                        _oSpan_choose.innerHTML="请选择";
                    }
                }
            }
        }
//-------------------------------------------------------------------答案大于1的时候内容初始化结束
        //-------------------------------------------------------------------标签背景初始化(设置第一个标签为选中状态)
        for(var j=0;j<len_all;j++){
            removeClass(oSpan_comp[j], "add_active");
        }
        addClass(oSpan_comp[0], "add_active");//将第一个标签设置为点击状态
//-------------------------------------------------------------------ul内容显示初始化(设置第一个ul为显示状态,其他为隐藏状态)
        for(var j=0;j<len_all;j++){
            addClass(oUl_comp[j], "hide_zh");
        }
        removeClass(oUl_comp[0], "hide_zh");//将第一个ul设置为显示状态，其他为隐藏状态
        /*//-------------------------------------------------------------------设置答案中的地址的li的id
         for(var j=0;j<len_all;j++){
         var idd=
         }
         removeClass(oUl_comp[0], "hide_zh");//将第一个ul设置为显示状态，其他为隐藏状态*/
//-------------------------------------------------------------------标签内容初始化(设置各个标签的文字内容)
        var _oLi=getElementsByClassNameinnextlayer(oUl_comp[0], "li");//选取一个ul下面所有的li集合,这里我们用于判断这些li中哪个的islabel为1，因为三个ul都是一样的，所以
        //我们取第一个ul为例
        for (var j = 0; j < _oLi.length; j++) {
            if (_oLi[j].dataset.islabel == "1") {//选取islabel等于1的那个li
                num_islabel = j;
            }
        }
        var className_li = $(_oLi[num_islabel]).attr("class");//获取isLabel值为1的那个元素的className
//-------------------------------------------islabel为1的li,具体三种情况分别是codeTwo  codeThree   String

        function label_init() {
            switch (className_li) {
                /*                    case "string_zh":
                 var inPut_Add = oLi_total[num_li].getElementsByTagName("input")[0];//获取input元素
                 if (inPut_Add.value == "undefined" || inPut_Add.value == "" || inPut_Add.value == "null") {
                 oSpan_table.textContent = i_Add.textContent;//假如最初内容为空或者未定义，则标签名字用input行的名字
                 } else {
                 oSpan_table.textContent = inPut_Add.value;//假如有最初内容，则标签名字用input的value值
                 }
                 inPut_Add.onblur = function () {//初始化下的判断点击事件
                 oSpan_table.textContent = inPut_Add.value;//失去焦点的时候，标签的名就用input的value值
                 if (inPut_Add.value == "undefined" || inPut_Add.value == "" || inPut_Add.value == "null") {//当输入框输入为空或者未定义，则标签名采用input行的名字
                 oSpan_table.textContent = i_Add.textContent;
                 }
                 }
                 break;*/
                case "code_zh_two":
                    for(var i=0;i<oUl_comp.length;i++){
                        var oLi_show=getElementsByClassNameinnextlayer(oUl_comp[i], "li");
                        var i_tabel=oLi_show[num_islabel].getElementsByTagName("i")[0];
                        var oStrong_table_01 = oLi_show[num_islabel].getElementsByTagName("strong")[0];
                        var oStrong_table_02 = oLi_show[num_islabel].getElementsByTagName("strong")[1];
                        var oem_table_01 = oLi_show[num_islabel].getElementsByTagName("em")[0];
                        var oem_table_02 = oLi_show[num_islabel].getElementsByTagName("em")[1];
                        var ob_table_01 = oLi_show[num_islabel].getElementsByTagName("b")[0];
                        var ob_table_02 = oLi_show[num_islabel].getElementsByTagName("b")[1];
                        if (oem_table_01.className == "s2active") {
                            oSpan_comp[i].textContent = ob_table_01.textContent;
                            ob_table_01.style.color="rgb(0,0,0)";//--------------------------颜色
                            ob_table_02.style.color="rgb(160, 160, 165)";//--------------------------颜色
                        } else if (oem_table_02.className == "s2active") {
                            oSpan_comp[i].textContent = ob_table_02.textContent;
                            ob_table_02.style.color="rgb(0,0,0)";//--------------------------颜色
                            ob_table_01.style.color="rgb(160, 160, 165)";//--------------------------颜色
                        } else {
                            oSpan_comp[i].textContent = i_tabel.textContent;
                            ob_table_01.style.color="rgb(160, 160, 165)";//--------------------------颜色
                            ob_table_02.style.color="rgb(160, 160, 165)";//--------------------------颜色
                        }
                    }
                    break;
                /*                    case "code_zh_three":
                 label_code_three(oSpan_table,oLi_total[num_li]);
                 break;*/
            }
        }
        label_init();
    }
    checker.initAutoCheckTrigger();//---------------------------校验

//-------------------------------------------------------------事件绑定-------------------------------------------------------------------------------

//----------------------------------------------------------DOUBLE绑定事件-------------------------------------------------------------------------------
    function event_double() {
        var oDouble_zh = getElementsByClassName(document, "li", "double_zh");//获取所有的DOUBLE类型
        for (var j = 0; j < oDouble_zh.length; j++) {
            var that_double = oDouble_zh[j];
            var oDouble_type = that_double.getElementsByTagName("input");
            for (var i = 0; i < oDouble_type.length; i++) {
                oDouble_type[i].indexholder = oDouble_type[i].placeholder;
                oDouble_type[i].onfocus = function () {
                    this.placeholder = "";
                    addClass(this.parentNode.parentNode,"border_bottom");
                    return false;
                }
                oDouble_type[i].onblur = function () {
                    var oDouble_I=this.parentNode.parentNode.getElementsByTagName("i")[0];
                    this.placeholder = this.indexholder;
                    removeClass(this.parentNode.parentNode,"border_bottom");
                    if(this.value==""){
                        oDouble_I.style.color="rgb(0,0,0)";
                    }else{
                        oDouble_I.style.color="rgb(160,160,165)";
                    }
                }
            }
//---------------------------------------------判断得到焦点，底部边框变黄
        }
    }
    event_double();
//----------------------------------------------------------INTEGER绑定事件-------------------------------------------------------------------------------
    function event_integer() {
        var oInteger_zh = getElementsByClassName(document, "li", "integer_zh");//获取所有的INTEGER类型
        for (var j = 0; j < oInteger_zh.length; j++) {
            var that_integer = oInteger_zh[j];
            var oInteger_type = that_integer.getElementsByTagName("input");
            for (var i = 0; i < oInteger_type.length; i++) {
                oInteger_type[i].indexholder = oInteger_type[i].placeholder;
                oInteger_type[i].onfocus = function () {
                    this.placeholder = "";
                    addClass(this.parentNode.parentNode,"border_bottom");
                }
                oInteger_type[i].onblur = function () {
                    var oInteger_I=this.parentNode.parentNode.getElementsByTagName("i")[0];
                    this.placeholder = this.indexholder;
                    removeClass(this.parentNode.parentNode,"border_bottom");
                    if(this.value==""){
                        oInteger_I.style.color="rgb(0,0,0)";
                    }else{
                        oInteger_I.style.color="rgb(160,160,165)";
                    }
                }
            }
        }
    }
    event_integer();
//----------------------------------------------------------STRING绑定事件-------------------------------------------------------------------------------
    function event_sting() {
        var oString_zh = getElementsByClassName(document, "li", "string_zh");//获取所有的STRING类型
        for (var j = 0; j < oString_zh.length; j++) {
            var that_string = oString_zh[j];
            var oString_type = that_string.getElementsByTagName("input");
            for (var i = 0; i < oString_type.length; i++) {
                oString_type[i].indexholder = oString_type[i].placeholder;
                oString_type[i].onfocus = function () {
                    this.placeholder = "";
                    addClass(this.parentNode.parentNode,"border_bottom");
                }
                oString_type[i].onblur = function () {
                    this.placeholder = this.indexholder;
                    removeClass(this.parentNode.parentNode,"border_bottom");
                    var oString_I=this.parentNode.parentNode.getElementsByTagName("i")[0];
                    if(this.value==""){
                        oString_I.style.color="rgb(0,0,0)";
                    }else{
                        oString_I.style.color="rgb(160,160,165)";
                    }
                }
            }
        }
    }
    event_sting();
//----------------------------------------------------------DATE绑定事件-------------------------------------------------------------------------------
    function event_date() {
        var oDate_zh = getElementsByClassName(document, "li", "date_zh");//获取所有的DATE类型
        //alert(oDate_zh.length);
        for (var j = 0; j < oDate_zh.length; j++) {
            (function () {
                var that_date = oDate_zh[j];
                var oDate_type = that_date.getElementsByTagName("input")[0];
                var idd = that_date.id;
                oDate_type.indexholder = oDate_type.placeholder;
                oDate_type.onclick = function () {
                    //removeClass(gearDate,"active_zh");
                    //addClass(gearDate,"hide_zh");
                    var calendar = new lCalendar();//---------------------创建日期对象插件
                    calendar.init({
                        'trigger': '#' + idd + '',
                        'type': 'date'
                    });
                    /*                    var gearDate = getElementsByClassName(document, "div", "gearDate")[0];
                     var oBtn_date = getElementsByClassName(document, "div", "date_btn_box")[0];//--------获取确定取消按钮
                     var cancel = oBtn_date.getElementsByTagName("div")[0];
                     var finish = oBtn_date.getElementsByTagName("div")[1];
                     var year = getElementsByClassName(document, "div", "gear date_yy")[0];//--------------获取年
                     var year_val = year.getAttribute("val");
                     var month = getElementsByClassName(document, "div", "gear date_mm")[0];//--------------获取月
                     var month_val = month.getAttribute("val");
                     var day = getElementsByClassName(document, "div", "gear date_dd")[0];//--------------获取日
                     var day_val = day.getAttribute("val");*/

                }
                oDate_type.onfocus = function () {
                    this.placeholder = "";
                }
                oDate_type.onblur = function () {
                    this.placeholder = this.indexholder;
                }
            }(j))
        }
    }
    event_date();
//----------------------------------------------------------TELEPHONE绑定事件-------------------------------------------------------------------------------
    function event_telephone() {
        var oTelephone_zh = getElementsByClassName(document, "li", "telephone_zh");//获取所有的TELEPHONE类型
        for (var j = 0; j < oTelephone_zh.length; j++) {
            var that_telephone = oTelephone_zh[j];
            var oTelephone_type = that_telephone.getElementsByTagName("input");
            for (var i = 0; i < oTelephone_type.length; i++) {
                oTelephone_type[i].indexholder = oTelephone_type[i].placeholder;
                oTelephone_type[i].onfocus = function () {
                    this.placeholder = "";
                    addClass(this.parentNode.parentNode,"border_bottom");
                }
                oTelephone_type[i].onblur = function () {
                    this.placeholder = this.indexholder;
                    removeClass(this.parentNode.parentNode,"border_bottom");
                    var oTelephone_I=this.parentNode.parentNode.getElementsByTagName("i")[0];
                    if(this.value==""){
                        oTelephone_I.style.color="rgb(0,0,0)";
                    }else{
                        oTelephone_I.style.color="rgb(160,160,165)";
                    }
                }
            }
        }
    }
    event_telephone();
//----------------------------------------------------------SSQADDRESS绑定事件-------------------------------------------------------------------------------
    function event_SsqAddress() {
        var oSsqAddress_zh = getElementsByClassName(document, "li", "ssqaddress_zh");//获取所有的SSQADDRESS类型
        for (var j = 0; j < oSsqAddress_zh.length; j++) {
            (function () {
                var that_ssqadress = oSsqAddress_zh[j];
                var oDiv_click = getElementsByClassName(that_ssqadress, "div", "right")[0];
                var oSpan_click = getElementsByClassName(that_ssqadress, "span", "choose")[0];
                var oI_click = that_ssqadress.getElementsByTagName("i")[0];
                oDiv_click.onclick = function () {
                    adree(this.id)
                    oSpan_click.style.color="rgb(0,0,0)";
                    oI_click.style.color="rgb(160, 160, 165)";
                };
            }(j))
        }
    }
    event_SsqAddress();
//----------------------------------------------------------CHECKBOX绑定事件-------------------------------------------------------------------------------
    function event_checkbox(){
        var oCccheckbox_zh = getElementsByClassName(document, "li", "checkbox_zh");//获取所有的CHECKBOX类型
        var On_Off;
        for (var j = 0; j < oCccheckbox_zh.length; j++){
            var total_num=0;
            (function(){
                var oUl_checkbox=getElementsByClassName(oCccheckbox_zh[j], "ul", "clicktab")[0];
                var oLi_checkbox=getElementsByClassName(oUl_checkbox, "li", "check_li");
                for(var t=0;t<oLi_checkbox.length;t++){
                    if(hasClass(oLi_checkbox[t], "checked")){
                        total_num=total_num+1;
                    }
                }
                oUl_checkbox.setAttribute("data-checknum",total_num);
                //alert(total_num);
            }(j))
        }
        for (var j = 0; j < oCccheckbox_zh.length; j++){
            (function(){
                var oUl_click_checkbox=getElementsByClassName(oCccheckbox_zh[j], "ul", "clicktab")[0];
                var oLi_click_checkbox=getElementsByClassName(oUl_click_checkbox, "li", "check_li");
                for(var t=0;t<oLi_click_checkbox.length;t++){
                    if(hasClass(oLi_click_checkbox[t], "checked")){
                        oLi_click_checkbox[t].onOff=false;
                    }else{
                        oLi_click_checkbox[t].onOff=true;
                    }
                    oLi_click_checkbox[t].index=t;
                    oLi_click_checkbox[t].onclick=function(){
                        var oImg_click=getElementsByClassName(this, "img", "check")[0];
                        if(this.onOff){
                            this.parentNode.dataset.checknum=Number(this.parentNode.dataset.checknum)+1;
                            oImg_click.src="img/jxt_icon.png";
                            addClass(oImg_click,"checked_img");
                            addClass(this,"checked");
                            oImg_click.nextElementSibling.style.color="rgb(0, 0, 0)";
                            this.onOff=false;
                            var _oLabel=getElementsByClassName(this.parentNode, "label", "jiaoyan")[0];
                            if(_oLabel){
                                this.parentNode.removeChild(_oLabel);
                            }
                            //addClass(this,"border_bottom");//为checkbox添加底部黄线
                        }else{
                            this.parentNode.dataset.checknum-=1;
                            oImg_click.src="img/jx_icon.png";
                            removeClass(oImg_click,"checked_img");
                            removeClass(this,"checked");
                            oImg_click.nextElementSibling.style.color="rgb(160, 160, 165)";
                            this.onOff=true;
                            if(Number(this.parentNode.dataset.checknum) ==0){
                                var sLabel = document.createElement("label");
                                sLabel.innerHTML = "请选择必填数据";
                                sLabel.className = "jiaoyan";
                                sLabel.style.cssText = "color:red; font-size:0.4rem";
                                this.parentNode.appendChild(sLabel);
                            }
                            //removeClass(this,"border_bottom");
                        }
                        return false;
                    }
                }
            }(j))
        }
    }
    event_checkbox();
//----------------------------------------------------------CODE_two绑定事件-------------------------------------------------------------------------------
    function code_two_event() {
        var oCode_zh_two = getElementsByClassName(document, "li", "code_zh_two");//获取所有CODE选项等于2的类型
        for (var i = 0; i < oCode_zh_two.length; i++) {
            (function () {                          //使用匿名函数解决多行单选框的BUG=
                var oStrong_Code = oCode_zh_two[i].getElementsByTagName("strong");
                var oEm_checked_01 = oStrong_Code[0].getElementsByTagName("em")[0];
                var oEm_checked_02 = oStrong_Code[1].getElementsByTagName("em")[0];
                var oB_01=oStrong_Code[0].nextElementSibling;
                var oB_02=oStrong_Code[1].nextElementSibling;
//------------------------点击消除黄色框框
                var pos=getPosition(oCode_zh_two[i]);
                var oX_div=pos.x;
                var oY_div=pos.y;
                var oX_dis_div=oX_div+oCode_zh_two[i].offsetWidth;
                var oY_dis_div=oY_div+oCode_zh_two[i].offsetHeight;
                if (oCode_zh_two[i].dataset.fieldname == "loanAdvise") {/////////////////判断点击的li的fieldname属性值是否为loanAdvise，这里判断是

                    function click_loanAdvise_left() {
                        var that=this;
                        var _oSection = document.getElementsByTagName("section")[0];
                        var _oLi_codeTwo=getElementsByClassName(_oSection, "li", "code_zh_two");
                        for(var t=0;t<_oLi_codeTwo.length;t++){
                            removeClass(_oLi_codeTwo[t],"border_bottom");
                        }
                        addClass(this.parentNode.parentNode,"border_bottom");
                        oEm_checked_01.className = "s2active";
                        oEm_checked_02.className = "s2no";
                        checkbox_total_hide();
                        Approval_show();
                        oB_01.style.color="rgb(0,0,0)";//------------------------------------------颜色
                        oB_02.style.color="rgb(160, 160, 165)";//------------------------------------------颜色
                        _oSection.onclick = function (event) {
                            var event = event || window.event;
                            var scroll_doc=document.body.scrollTop?document.body.scrollTop:document.documentElement.scrollTop;
                            //alert(event.clientY);
                            if(400<event.clientX&&event.clientX<1080&&160-scroll_doc<event.clientY&&event.clientY<290-scroll_doc){
                                //----------------如果点击的坐标在特定li中，不做任何事
                            }else{
                                removeClass(that.parentNode.parentNode,"border_bottom");
                            }
                        }
                    }
                    oStrong_Code[0].onclick = click_loanAdvise_left;
                    oB_01.onclick = click_loanAdvise_left;

                    function click_loanAdvise_right() {
                        var that = this;
                        var _oSection = document.getElementsByTagName("section")[0];
                        var _oLi_codeTwo = getElementsByClassName(_oSection, "li", "code_zh_two");
                        for (var t = 0; t < _oLi_codeTwo.length; t++) {
                            removeClass(_oLi_codeTwo[t], "border_bottom");
                        }
                        addClass(this.parentNode.parentNode,"border_bottom");
                        oEm_checked_01.className = "s2no";
                        oEm_checked_02.className = "s2active";
                        Approval_hide();
                        checkbox_total_event();
                        oB_02.style.color="rgb(0,0,0)";//------------------------------------------颜色
                        oB_01.style.color="rgb(160, 160, 165)";//------------------------------------------颜色
                        _oSection.onclick = function (event) {
                            var event = event || window.event;
                            var scroll_doc=document.body.scrollTop?document.body.scrollTop:document.documentElement.scrollTop;
                            //alert(event.clientY);
                            if(400<event.clientX&&event.clientX<1080&&160-scroll_doc<event.clientY&&event.clientY<290-scroll_doc){
                                //----------------如果点击的坐标在特定li中，不做任何事
                            }else{
                                removeClass(that.parentNode.parentNode,"border_bottom");
                            }
                        }
                    }
                    oStrong_Code[1].onclick =click_loanAdvise_right;
                    oB_02.onclick =click_loanAdvise_right;
                }else if(oCode_zh_two[i].dataset.fieldname == "refuseReason" ){
                    function click_refuseReason_left(){
                        var that=this;
                        var _oSection = document.getElementsByTagName("section")[0];
                        var _oLi_codeTwo = getElementsByClassName(_oSection, "li", "code_zh_two");
                        for (var t = 0; t < _oLi_codeTwo.length; t++) {
                            removeClass(_oLi_codeTwo[t], "border_bottom");
                        }
                        addClass(this.parentNode.parentNode,"border_bottom");
                        oEm_checked_01.className = "s2active";
                        oEm_checked_02.className = "s2no";
                        zhongan_sub_show();
                        oB_01.style.color="rgb(0,0,0)";//------------------------------------------颜色
                        oB_02.style.color="rgb(160, 160, 165)";//------------------------------------------颜色
                        _oSection.onclick = function (event) {
                            var event = event || window.event;
                            //alert(event.clientX);
                            if(400<event.clientX&&event.clientX<1080&&300<event.clientY&&event.clientY<460){
                                //----------------如果点击的坐标在特定li中，不做任何事
                            }else{
                                removeClass(that.parentNode.parentNode,"border_bottom");
                            }
                        }
                    }
                    oStrong_Code[0].onclick=click_refuseReason_left;
                    oB_01.onclick = click_refuseReason_left;

                    function click_refuseReason_right(){
                        var that=this;
                        var _oSection = document.getElementsByTagName("section")[0];
                        var _oLi_codeTwo = getElementsByClassName(_oSection, "li", "code_zh_two");
                        for (var t = 0; t < _oLi_codeTwo.length; t++) {
                            removeClass(_oLi_codeTwo[t], "border_bottom");
                        }
                        addClass(this.parentNode.parentNode,"border_bottom");
                        oEm_checked_01.className = "s2no";
                        oEm_checked_02.className = "s2active";
                        customer_sub_show();
                        oB_02.style.color="rgb(0,0,0)";//------------------------------------------颜色
                        oB_01.style.color="rgb(160, 160, 165)";//------------------------------------------颜色
                        _oSection.onclick = function (event) {
                            var event = event || window.event;
                            //alert(event.clientY);
                            if(400<event.clientX&&event.clientX<1080&&300<event.clientY&&event.clientY<460){
                                //----------------如果点击的坐标在特定li中，不做任何事
                            }else{
                                removeClass(that.parentNode.parentNode,"border_bottom");
                            }
                        }
                    }
                    oStrong_Code[1].onclick = click_refuseReason_right;
                    oB_02.onclick =click_refuseReason_right;
                }else {/////////////////判断点击的li的fieldname属性值是否为loanAdvise，这里判断否

                    function code_click_left() {
                        var _that=this;
                        this.parentNode.parentNode.style.borderBottomColor="#faaa28";//改变底部li颜色
                        oEm_checked_01.className = "s2active";
                        oEm_checked_02.className = "s2no";
                        oB_01.style.color="rgb(0,0,0)";//------------------------------------------颜色
                        oB_02.style.color="rgb(160, 160, 165)";//------------------------------------------颜色
                    }
                    oStrong_Code[0].onclick = code_click_left;
                    oB_01.onclick =code_click_left;

                    function code_click_right() {
                        var _that=this;
                        this.parentNode.parentNode.style.borderBottomColor="#faaa28";//改变底部li颜色
                        oEm_checked_01.className = "s2no";
                        oEm_checked_02.className = "s2active";
                        oB_02.style.color="rgb(0,0,0)";//------------------------------------------颜色
                        oB_01.style.color="rgb(160, 160, 165)";//------------------------------------------颜色
                    }
                    oStrong_Code[1].onclick = code_click_right;
                    oB_02.onclick =code_click_right;
                }
            }(i));
        }
    }
    code_two_event();
//----------------------------------------------------------CODE_three绑定事件-------------------------------------------------------------------------------
    function code_three_event() {
        var oCode_zh_three = getElementsByClassName(document, "li", "code_zh_three");//获取所有CODE选项大于2的类型
        var val_Mask = "";
        for (var i = 0; i < oCode_zh_three.length; i++) {
            (function () {
                var that_Mask = oCode_zh_three[i];
                var oSpan_mask = getElementsByClassName(that_Mask, "span", "choose")[0];//获取输入的值
                var oI_mask = that_Mask.getElementsByTagName("i")[0];//获取输入的值
                var oChoice_mask = getElementsByClassName(that_Mask, "div", "right")[0];
                var oCode_mask = that_Mask.getElementsByTagName("div")[2];//通过li选取mask遮罩元素
                var oLi_Mask = that_Mask.getElementsByTagName("li"); //获取遮罩里面的li元素集
                oChoice_mask.onclick = function () {
                    oCode_mask.className = "active_zh";//点击右边一整条选择框，弹出遮罩层
                    for (var j = 0; j < oLi_Mask.length - 1; j++) {    //除了“取消”按钮之外的其他li
                        oLi_Mask[j].onclick = function () {
                            oCode_mask.className = "hide_zh";
                            oSpan_mask.innerHTML = this.innerHTML;//将选择的li的值赋值给外面span元素
                            oSpan_mask.style.color="rgb(0,0,0)";
                            oI_mask.style.color="rgb(160, 160, 165)";
                        }
                    }
                    oLi_Mask[oLi_Mask.length - 1].onclick = function () {//单独设置"取消"按钮
                        oCode_mask.className = "hide_zh";
                    }
                }
            }(i))
        }
    }
    code_three_event();
//------------------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------Tabel类事件-------------------------------------------------------------------------------
    function radiochange() {
        for (var i = 0; i < table_div_all.length; i++) {//------------------------------通过单选按钮改变标签的文字
            var _that_table_ev = table_div_all[i];
            var _div_ev = getElementsByClassName(_that_table_ev, "div", "cy")[0];
            var _span = _div_ev.getElementsByTagName("span");
            var len=Math.ceil(_span.length/3)-1;
            var _ul_ev = getElementsByClassName(_that_table_ev, "ul", "ul_wrap");
            for (var j = 0; j < _ul_ev.length; j++) {
                (function () {
                    var _oSection = document.getElementsByTagName("section")[0];
                    var oLi_click = getElementsByClassNameinnextlayer(_ul_ev[j], "li")[num_islabel];
                    //var oI_click = oLi_click.getElementsByTagName("i")[0];
                    var oStrong_click = oLi_click.getElementsByTagName("strong");
                    var oB1_click = oLi_click.getElementsByTagName("b")[0];
                    var oB2_click = oLi_click.getElementsByTagName("b")[1];
                    var oE1_click = oStrong_click[0].getElementsByTagName("em")[0];
                    var oE2_click = oStrong_click[1].getElementsByTagName("em")[0];
                    oStrong_click[0].dex = j;
                    oB1_click.dex = j;
                    function tab_code_left() {
                        var _that=this;
                        _span[this.dex].innerHTML = oB1_click.innerHTML;
                        oE1_click.className = "s2active";
                        oE2_click.className = "s2no";
                        //oI_click.style.color = "rgb(160, 160, 165)";
                        oB1_click.style.color = "rgb(0,0,0)";//--------------------------颜色
                        oB2_click.style.color = "rgb(160, 160, 165)";//--------------------------颜色
                        this.parentNode.parentNode.style.borderBottomColor = "#faaa28";//改变底部li颜色
                        var _oSection = document.getElementsByTagName("section")[0];
                        //-----测量该li的位置
                        _oSection.onclick = function (event) {
                            var event = event || window.event;
                            //alert(event.clientY);
                            var scroll=document.body.scrollTop||document.documentElement.scrollTop;
                            if (400 > event.clientX||event.clientY<1430+140*len-scroll||event.clientY>1590+140*len-scroll ) {
                                _that.parentNode.parentNode.style.borderBottomColor = "#E6E6EB";
                            }
                        }
                    }
                    oStrong_click[0].onclick = tab_code_left;
                    oB1_click.onclick = tab_code_left;
                    oStrong_click[1].dex = j;
                    oB2_click.dex = j;
                    function tab_code_right() {
                        var _that=this;
                        _span[this.dex].innerHTML = oB2_click.innerHTML;
                        oE1_click.className = "s2no";
                        oE2_click.className = "s2active";
                        //oI_click.style.color = "rgb(160, 160, 165)";
                        oB2_click.style.color = "rgb(0,0,0)";//--------------------------颜色
                        oB1_click.style.color = "rgb(160, 160, 165)";//--------------------------颜色
                        this.parentNode.parentNode.style.borderBottomColor = "#faaa28";//改变底部li颜色
                        var _oSection = document.getElementsByTagName("section")[0];
                        //-----测量该li的位置
                        _oSection.onclick = function (event) {
                            var event = event || window.event;
                            var scroll=document.body.scrollTop||document.documentElement.scrollTop;
                            //alert(event.clientY);
                            if (400 > event.clientX||event.clientY<1430+140*len-scroll||event.clientY>1590+140*len-scroll ) {
                                _that.parentNode.parentNode.style.borderBottomColor = "#E6E6EB";
                            }
                        }
                    }
                    oStrong_click[1].onclick = tab_code_right;
                    oB2_click.onclick = tab_code_right;
                }(j))
            }
        }
    }
    radiochange();
    function tab_tab(){
        for(var i=0;i<table_div_all.length;i++){//------------------------------标签之间的切换效果
            var _that_table_event=table_div_all[i];
            var _div_event=getElementsByClassName(_that_table_event, "div", "cy")[0];
            var _span_event=_div_event.getElementsByTagName("span");
            var _ul_event=getElementsByClassName(_that_table_event, "ul", "ul_wrap");
            for(var j=0;j<_span_event.length;j++){
                _span_event[j].dex=j;
                _span_event[j].onclick=function(){
                    for(var m=0;m<_span_event.length;m++){
                        removeClass(_span_event[m],"add_active");//清除所有span标签的显示效果
                        addClass(_ul_event[m],"hide_zh");//给所有的ul添加隐藏效果

                    }
                    addClass(this,"add_active");//添加点击标签的小时效果
                    removeClass(_ul_event[this.dex],"hide_zh");//给点击的那个ul去除隐藏效果
                }
            }
        }
    }
    tab_tab();
    for(var i=0;i<table_div_all.length;i++){//------------------------------添加删除效果
        var that_table = table_div_all[i];//table_div_all[i]用that_table储存起来，因为添加事件下面的点击事件无法访问到table_div_all[i]
        var objname_table = that_table.dataset.objname;
        var oDiv_Del = document.createElement("div");//新加一个删除页面的布局div
        oDiv_Del.className = "mask_zh hide_zh";
        oDiv_Del.innerHTML = '<div class="mask_bg_zh"></div>' +
            '<div class="remove">' +
            '<p class="_sc">您确认要删除吗？<img class="_ci" src="img/close_icon.png"></p>' +
            '<p class="_qr">确认</p>' +
            '</div>';
        that_table.appendChild(oDiv_Del);//将这个唯一的删除页面布局添加到页面中
        var oCy_table = getElementsByClassName(that_table, "div", "cy")[0];//包含标签的div
        var oSpan_table = getElementsByClassNameinnextlayer(oCy_table, "span");//标签的value值
        var oUl_total=getElementsByClassName(that_table, "ul", "ul_wrap");//获取ul
        var oLi_total=getElementsByClassNameinnextlayer(oUl_total[0], "li");//获取ul下面的li
        var i_Add = oLi_total[num_islabel].getElementsByTagName("i")[0];//获取islabel等于1的那个input元素前面的名字
        var total = oSpan_table.length;
        var iNow = 0;
        var num_li;
        var add_Btn = getElementsByClassName(that_table, "img", "add");//获取添加按钮
        var jian_Btn = getElementsByClassName(that_table, "img", "jian"); //获取删除按钮
        var div_wrap = getElementsByClassName(that_table, "div", "cy");//获取包含标签的容器div

        function table_Add() {
            total++;
            var soDiv_Add_Wrap = document.createElement("div");//添加一个包含生成div和ul标签的div容器
            var soSpan_Add = document.createElement("span");//添加一个标签的span
            soSpan_Add.className = "span_zh";//为新加的这个span赋值类名
            soSpan_Add.textContent = i_Add.textContent;////直接取值islabel为1的那个值
            var soUl_Add = document.createElement("ul");//新添加的一个ul
            soUl_Add.className = "ul_wrap";
            soUl_Add.innerHTML = oUl_total[0].innerHTML;//将之前整个ul里面的内容赋值添加的这个ul的内容
            //为city的那个插件点击事件，赋值不同的id
            var SsqAddress = getElementsByClassName(soUl_Add, "li", "ssqaddress_zh");
            for (var i = 0; i < SsqAddress.length; i++) {
                var that_right = SsqAddress[i];
                var right_click = getElementsByClassName(that_right, "div", "right")[0];
                right_click.id = right_click.id + total;
            }
            //------------------------------------------------------------------ 因为动态生成的ul里面的内容是直接复制第一个内容的，所以生成的ul必须清空内容,这里好像主要是针对code_three和ssqadress
            //-------------同时还要初始化字体颜色
            //-------------针对下面的code_three
            var so_li_codethree = getElementsByClassName(soUl_Add, "li", "code_zh_three");
            for (var m = 0; m < so_li_codethree.length; m++) {
                var so_span_choose_codethree = getElementsByClassName(so_li_codethree[m], "span", "choose")[0];
                var so_I_codethree=so_li_codethree[m].getElementsByTagName("i")[0];
                so_span_choose_codethree.innerHTML = "请选择";
                so_span_choose_codethree.style.color="rgb(160,160,165)";
                so_I_codethree.style.color="rgb(0,0,0)";
            }
            //-------------针对下面的ssqaddress
            var so_li_ssqaddress = getElementsByClassName(soUl_Add, "li", "ssqaddress_zh");
            for (var m = 0; m < so_li_ssqaddress.length; m++) {
                var so_span_choose_ssq = getElementsByClassName(so_li_ssqaddress[m], "span", "choose")[0];
                var so_I_ssq = so_li_ssqaddress[m].getElementsByTagName("i")[0];
                so_span_choose_ssq.innerHTML = "请选择";
                so_span_choose_ssq.style.color="rgb(160,160,165)";
                so_I_ssq.style.color="rgb(0,0,0)";
            }
            //-------------针对下面的integer
            var so_li_integer = getElementsByClassName(soUl_Add, "li", "integer_zh");
            for (var m = 0; m < so_li_integer.length; m++) {
                var so_Input_int = so_li_integer[m].getElementsByTagName("input")[0];
                var so_I_int = so_li_integer[m].getElementsByTagName("i")[0];
                so_I_int.style.color="rgb(0,0,0)";
            }
            //-------------针对下面的string
            var so_li_string = getElementsByClassName(soUl_Add, "li", "string_zh");
            for (var m = 0; m < so_li_string.length; m++) {
                var so_Input_int = so_li_string[m].getElementsByTagName("input")[0];
                var so_I_int = so_li_string[m].getElementsByTagName("i")[0];
                so_I_int.style.color="rgb(0,0,0)";
            }
            //------------------------------------------------------------------处理ul内容完成
            oCy_table.appendChild(soSpan_Add);//将新加的span添加到类名为cy的div里面
            that_table.appendChild(soUl_Add);//将新加的ul添加到最大的table里面
            soSpan_Add.setAttribute("index", total - 1);//------------------------------校验
            var soSpan_Add_text = oCy_table.getElementsByTagName("span");//获取添加之后，类名为cy的div里面的span的个数
            var oUl_add_num = getElementsByClassName(that_table, "ul", "ul_wrap");//获取添加之后，整个table里面的className为ul_wrap的ul个数
            for (var j = 0; j < oUl_add_num.length - 1; j++) {
                soSpan_Add_text[j].className = "span_zh";
                soSpan_Add_text[j].style.color = "#32be97";
                addClass(oUl_add_num[j], "hide_zh");
            }
            addClass(soSpan_Add_text[oUl_add_num.length - 1], "add_active");
            //----------------------------------------------因为这里有标签动态生成了这些类，所以要重新初始化和绑定下事件
            code_two_event();
            event_SsqAddress();
            code_three_event();
            event_telephone();
            event_sting();
            event_integer();
            event_double();
            //----------------------------------------------击直接生成，然后初始化

            function product() {
                var oUl_add_num = getElementsByClassName(that_table, "ul", "ul_wrap");//获取添加之后，整个table里面的className为ul_wrap的ul个数
                var oLi_Add = getElementsByClassNameinnextlayer(oUl_add_num[oUl_add_num.length - 1], "li")[num_islabel];//获取这个ul下面位置为islabel的那个li
                switch (oLi_Add.className) {//这里分三种情况判断生产标签的内容(添加时间)
                    case "code_zh_two":
                        var oI_Add= oLi_Add.getElementsByTagName("i")[0];
                        var strong_Add = oLi_Add.getElementsByTagName("strong");
                        var em_Add = oLi_Add.getElementsByTagName("em");
                        var b_Add = oLi_Add.getElementsByTagName("b");
                        em_Add[0].className = "s2no";//初始化radio1未被选中
                        em_Add[1].className = "s2no";//初始化radio2未被选中
                        oI_Add.style.color = "rgb(0,0,0)";
                        b_Add[0].style.color = "rgb(160, 160, 165)"//-----------------------颜色
                        b_Add[1].style.color = "rgb(160, 160, 165)";//-----------------------颜色
                        strong_Add[0].onclick = function () {
                            em_Add[0].className = "s2active";
                            em_Add[1].className = "s2no";
                            oI_Add.style.color = "rgb(160, 160, 165)";
                            b_Add[0].style.color = "rgb(0,0,0)"//-----------------------颜色
                            b_Add[1].style.color = "rgb(160, 160, 165)";//-----------------------颜色
                            soSpan_Add.textContent = b_Add[0].textContent;
                            this.parentNode.parentNode.style.borderBottomColor = "#faaa28";//改变底部li颜色
                        };
                        strong_Add[1].onclick = function () {
                            em_Add[0].className = "s2no";
                            em_Add[1].className = "s2active";
                            oI_Add.style.color = "rgb(160, 160, 165)";
                            b_Add[1].style.color = "rgb(0,0,0)"//-----------------------颜色
                            b_Add[0].style.color = "rgb(160, 160, 165)";//-----------------------颜色
                            soSpan_Add.textContent = b_Add[1].textContent;
                            this.parentNode.parentNode.style.borderBottomColor = "#faaa28";//改变底部li颜色
                        };
                        break;
                    /*                    case "string_zh":
                     var oInput_Add = oLi_Add.getElementsByTagName("input")[0];
                     var oI_Add = oLi_Add.getElementsByTagName("i")[0];
                     if (oInput_Add.value == "") {
                     soSpan_Add.textContent = oI_Add.textContent;
                     }
                     oInput_Add.onblur = function () {
                     soSpan_Add.textContent = oInput_Add.value;
                     if (oInput_Add.value == "") {
                     soSpan_Add.textContent = oI_Add.textContent;
                     }
                     };
                     break;*/
                    /*                    case "code_zh_three":
                     var right_Div_Add=getElementsByClassName(oLi_Add, "li", "right")[0];//获取右边的div元素，用于提供点击事件
                     var span_Add=getElementsByClassName(oLi_Add, "span", "choose")[0];//获取span信息框，最后对它赋值
                     var mask_Add=oLi_Add.getElementsByTagName("div")[2];
                     var mask_li_Add=getElementsByClassName(oLi_Add, "li", "choosethree");
                     label_code_three(soSpan_Add,oLi_Add);
                     break;*/
                }
            }
            product();
            //----------------------------------------------标签之间的切换

            function btn_pic() {
                var oDiv_tab_total = getElementsByClassNameinnextlayer(that_table, "div")[0];
                var oUl_tab_total = getElementsByClassName(that_table, "ul", "ul_wrap");
                var sPan_tab = oDiv_tab_total.getElementsByTagName("span");
                for (var i = 0; i < sPan_tab.length; i++) {
                    var oLi_tab = getElementsByClassNameinnextlayer(oUl_tab_total[i], "li");
                    if (oLi_tab[num_islabel].className == "code_zh_two") {
                        sPan_tab[i].index = i;
                        sPan_tab[i].onclick = function () {
                            for (var j = 0; j < sPan_tab.length; j++) {
                                sPan_tab[j].className = "span_zh";
                                oUl_tab_total[j].className = "ul_wrap hide_zh";
                            }
                            this.className = "span_zh add_active";
                            oUl_tab_total[this.index].className = "ul_wrap";
                        }
                        //radiochange();
                    }
                }
                radiochange();
            }
            btn_pic();
        }
        add_Btn[0].onclick = table_Add;
        //----------------------------------------------删除按钮功能

        function table_Del() {
            if (total > 1) {
                var oUl_wrap = getElementsByClassName(that_table, "ul", "ul_wrap");//获取class为oUl_wrap的大的ul集合
                var oDiv_cy = getElementsByClassName(that_table, "div", "cy")[0];//获取容纳删除按钮的最大div
                var ospan_del = getElementsByClassName(oDiv_cy, "span", "span_zh");//获取容纳删除按钮的每个span
                var del_page = getElementsByClassName(that_table, "div", "mask_zh")[0];//获取遮罩的那个全屏页面
                var oDel_Ok = getElementsByClassName(del_page, "p", "_qr")[0];//获取遮罩页面中的确定元素
                var oDel_XX = getElementsByClassName(del_page, "img", "_ci")[0];//获取遮罩页面中右上角的X元素
                var num;
                for (var j = 0; j < ospan_del.length; j++) {
                    ospan_del[j].innerHTML += '<img src="img/close_icon.png" class="cyimg"/>';//添加每个标签右上角的小xx
                }
                var oDel_Btn = getElementsByClassName(that_table, "img", "cyimg");//获取删除按钮右上角的那个小xx
                for (var i = 0; i < oDel_Btn.length; i++) {
                    oDel_Btn[i].index = i;
//-----------------------------------------------点击删除按钮函数开始
                    oDel_Btn[i].onclick = function () {
                        removeClass(del_page, "hide_zh");
                        addClass(del_page, "active_zh");
                        num = this.index;
//-------------------------------------弹出层确定按钮函数开始
                        function confirm() {//遮罩页面确定点击之后的事件
                            removeClass(del_page, "active_zh");
                            that_table.removeChild(oUl_wrap[num]);
                            var oUl_wrap_after = getElementsByClassName(that_table, "ul", "ul_wrap");//获取删除之后的大的ul集合
                            for (var j = 0; j < oUl_wrap_after.length; j++) {
                                addClass(oUl_wrap_after[j], "hide_zh");
                            }
                            removeClass(oUl_wrap_after[0], "hide_zh");//初始化显示第一个ul的内容
                            addClass(del_page, "hide_zh");//点击确定之后，隐藏遮罩页面
                            oDiv_cy.removeChild(ospan_del[num]);
                            var ospan_del_after = getElementsByClassName(oDiv_cy, "span", "span_zh");//获取容纳删除按钮的每个span
                            addClass(ospan_del_after[0], "add_active");//删除按钮之后，让第一个按钮保持选中状态
                            var oDel_Btn_after = getElementsByClassName(that_table, "img", "cyimg");
                            for (var j = 0; j < oDel_Btn_after.length; j++) {
                                ospan_del_after[j].removeChild(oDel_Btn_after[j]);
                            }
                            jian_Btn[0].onclick = table_Del;
                            total--;
                            tab_tab();
                            radiochange();
                        }
                        oDel_Ok.onclick =confirm;
//-------------------------------------弹出层确定按钮函数结束
//-------------------------------------弹出层取消按钮函数开始
                        function cancel() {
                            addClass(del_page, "hide_zh");//点击确定之后，隐藏遮罩页面
                            for (var j = 0; j < ospan_del.length; j++) {
                                ospan_del[j].removeChild(oDel_Btn[j]);
                            }
                            jian_Btn[0].onclick = table_Del;
                            tab_tab();
                            radiochange();
                        }
                        oDel_XX.onclick =cancel;
//-------------------------------------弹出层取消按钮函数结束
                    }
                    jian_Btn[0].onclick = table_Del;
//-----------------------------------------------点击删除按钮函数结束
                }
                //total--;
                jian_Btn[0].onclick = table_Del;
                //console.log(total);
            } else {
                total = 1;
            }
        }
        jian_Btn[0].onclick = table_Del;
    }
//----------------------------------------------------------数据上传保存-------------------------------------------------------------------------------
    var oFooter = document.getElementsByTagName("footer")[0];
    var oSection = document.getElementsByTagName("section")[0];
    var _on_off;
    var completeStatus;
    function submitResult(bool) {
        var bossAdviseModel = {};
//--------------------------------------------------------------------------大类为input类型
        var oDiv_answer_input = getElementsByClassName(oSection, "div", "putinput");
        var input_total = {};
        var inputResult = true;
        var sttr="";
        for (var i = 0; i < oDiv_answer_input.length; i++) {
            var answer_input = oDiv_answer_input[i];
            var answer_input_objname = oDiv_answer_input[i].dataset.objname;
            var modname = oDiv_answer_input[i].getAttribute("modelname");
            answer_input[answer_input_objname] = {};
            var answer_input_ul = getElementsByClassNameinnextlayer(answer_input, "ul")[0];
            var answer_input_li = getElementsByClassNameinnextlayer(answer_input_ul, "li");
            var answer_input_obj = {};
            var obj_input_save = {};   //新建一个临时对象，用于存放fieldname和对应的input的value
            for (var j = 0; j < answer_input_li.length; j++) {
                if (hasClass(answer_input_li[j], "integer_zh")) {
//---------------------------INTEGER获取数据
                    var oInput_int_save = answer_input_li[j].getElementsByTagName("input")[0];//获取该INTEGER类型下的input元素
                    var fieldname_int_save = answer_input_li[j].dataset.fieldname;//获取该li的fieldname
                    var value_int_save = oInput_int_save.value;  //获取该li下的input的value值
                    if(value_int_save==""){
                        obj_input_save[fieldname_int_save] = null;
                    }else{
                        obj_input_save[fieldname_int_save] = value_int_save;
                    }
//---------------------------DOUBle获取数据
                } else if (hasClass(answer_input_li[j], "double_zh")) {
                    var oInput_dou_save = answer_input_li[j].getElementsByTagName("input")[0];//获取该INTEGER类型下的input元素
                    var fieldname_dou_save = answer_input_li[j].dataset.fieldname;//获取该li的fieldname
                    var value_dou_save = oInput_dou_save.value;  //获取该li下的input的value值
                    if(value_dou_save==""){
                        obj_input_save[fieldname_dou_save] = null;
                    }else{
                        obj_input_save[fieldname_dou_save] = value_dou_save;
                    }
//---------------------------STRING获取数据
                } else if (hasClass(answer_input_li[j], "string_zh")) {
                    var oInput_str_save = answer_input_li[j].getElementsByTagName("input")[0];//获取该STRING类型下的input元素
                    var fieldname_str_save = answer_input_li[j].dataset.fieldname;//获取该li的fieldname
                    var value_str_save = oInput_str_save.value;  //获取该i元素下面用户输入的值
                    if(value_str_save==""){
                        obj_input_save[fieldname_str_save] = null;
                    }else{
                        obj_input_save[fieldname_str_save] = value_str_save;
                    }
//---------------------------CODE值等于2获取数据
                } else if (hasClass(answer_input_li[j], "code_zh_two")) {
                    var code_answer;
                    var oStrong_code = answer_input_li[j].getElementsByTagName("strong");
                    var oEm_code_01 = oStrong_code[0].getElementsByTagName("em")[0];
                    var oEm_code_02 = oStrong_code[1].getElementsByTagName("em")[0];
                    if (oEm_code_01.className == "s2active") {
                        code_answer = oStrong_code[0].dataset.codediclistcode;
                    } else if (oEm_code_02.className == "s2active") {
                        code_answer = oStrong_code[1].dataset.codediclistcode;
                    }else{
                        code_answer=null;
                    }
                    var oInput_str_save = answer_input_li[j].getElementsByTagName("input")[0];//获取该INTEGER类型下的input元素
                    var fieldname_str_save = answer_input_li[j].dataset.fieldname;//获取该li的fieldname
                    if(code_answer==""||code_answer==undefined||code_answer=="undefined"||code_answer==null){
                        obj_input_save[fieldname_str_save] = null;
                    }else{
                        obj_input_save[fieldname_str_save] = code_answer;
                    }
//---------------------------CODE值等于3获取数据
                } else if (hasClass(answer_input_li[j], "code_zh_three")) {

                    var code_answer_three;
                    var oSpan_code_three_save = getElementsByClassName(answer_input_li[j], "span", "choose")[0];//获取该CODE类型下的span元素
                    var fieldname_code_three_save = answer_input_li[j].dataset.fieldname;//获取该li的fieldname
                    var value_code_three_save = oSpan_code_three_save.innerHTML;  //获取该li下的input的value值
                    if(value_code_three_save==""){
                        obj_input_save[fieldname_code_three_save] = null;
                    }else{
                        obj_input_save[fieldname_code_three_save] = value_code_three_save;
                    }
//---------------------------CHECKBOX获取数据
                } else if (hasClass(answer_input_li[j], "checkbox_zh")) {
                    var checkbox_arry =[];
                    var checkbox_anser;
                    var fieldname_checkbox_save = answer_input_li[j].dataset.fieldname;//获取该li的fieldname
                    var oCheckbox_check_li = getElementsByClassName(answer_input_li[j], "li", "check_li");
                    obj_input_save[fieldname_checkbox_save] = "";
                    for (var m = 0; m < oCheckbox_check_li.length; m++) {
                        var oCheckbox_img = oCheckbox_check_li[m].getElementsByTagName("img")[0];//获取img
                        if (hasClass(oCheckbox_img, "checked_img")) {
                            checkbox_arry.push(oCheckbox_check_li[m].dataset.code);
                        }
                    }
                    var stt = checkbox_arry.join(",");
                    if(stt==""){
                        obj_input_save[fieldname_checkbox_save]=null;
                    }else{
                        obj_input_save[fieldname_checkbox_save] = stt;
                    }
                }
            }
            bossAdviseModel[answer_input_objname] = obj_input_save;
            //console.log(obj_input_save);
            if(bool){
                var _inputResult = checker.checkFieldValues(modname, null, obj_input_save, true);
                if (!_inputResult) {
                    inputResult = false;
                }
            }

        }
//--------------------------------------------------------------------------大类为table类型
        var oDiv_answer_table = getElementsByClassName(oSection, "div", "puttable");
        for (var i = 0; i < oDiv_answer_table.length; i++) {
            var table_total = {};
            var answer_table = oDiv_answer_table[i];
            var answer_table_objname = oDiv_answer_table[i].dataset.objname;
            var modname = oDiv_answer_table[i].getAttribute("modelname");
            var answer_table_ul = getElementsByClassName(answer_table, "ul", "ul_wrap");
            var answer_tab = [];
            for (var j = 0; j < answer_table_ul.length; j++) {
                var table_sub_ul = answer_table_ul[j];
                var table_sub_li = getElementsByClassNameinnextlayer(table_sub_ul, "li");
                var obj_table_save = {};   //新建一个临时对象，用于存放fieldname和对应的input的value
                for (var m = 0; m < table_sub_li.length; m++) {
//---------------------------INTEGER获取数据
                    if (hasClass(table_sub_li[m], "integer_zh")) {
                        var oTable_int_save = table_sub_li[m].getElementsByTagName("input")[0];//获取该INTEGER类型下的input元素
                        var fieldname_tab_int_save = table_sub_li[m].dataset.fieldname;//获取该li的fieldname
                        var value_tab_int_save = oTable_int_save.value;  //获取该li下的input的value值
                        if(value_tab_int_save==""){
                            obj_table_save[fieldname_tab_int_save] = null;
                        }else{
                            obj_table_save[fieldname_tab_int_save] = value_tab_int_save;
                        }
//---------------------------DOUBle获取数据
                    } else if (hasClass(table_sub_li[m], "double_zh")) {
                        var oTable_dou_save = table_sub_li[m].getElementsByTagName("input")[0];//获取该INTEGER类型下的input元素
                        var fieldname_table_dou_save = table_sub_li[m].dataset.fieldname;//获取该li的fieldname
                        var value_table_dou_save = oTable_dou_save.value;  //获取该li下的input的value值
                        if(value_table_dou_save==""){
                            obj_table_save[fieldname_table_dou_save] = null;
                        }else{
                            obj_table_save[fieldname_table_dou_save] = value_table_dou_save;
                        }
//---------------------------STRING获取数据
                    } else if (hasClass(table_sub_li[m], "string_zh")) {
                        var oTable_str_save = table_sub_li[m].getElementsByTagName("input")[0];//获取该INTEGER类型下的input元素
                        var fieldname_table_str_save = table_sub_li[m].dataset.fieldname;//获取该li的fieldname
                        var value_table_str_save = oTable_str_save.value;  //获取该li下的input的value值
                        if(value_table_str_save==""){
                            obj_table_save[fieldname_table_str_save] = null;
                        }else{
                            obj_table_save[fieldname_table_str_save] = value_table_str_save;
                        }
//---------------------------CODE值等于2获取数据
                    } else if (hasClass(table_sub_li[m], "code_zh_two")) {
                        var code_tab_answer;
                        var oStrong_tab_code = table_sub_li[m].getElementsByTagName("strong");
                        var oEm_tab_code_01 = oStrong_tab_code[0].getElementsByTagName("em")[0];
                        var oEm_tab_code_02 = oStrong_tab_code[1].getElementsByTagName("em")[0];
                        if (oEm_tab_code_01.className == "s2active") {
                            code_tab_answer = oStrong_tab_code[0].dataset.codediclistcode;
                        } else if (oEm_tab_code_02.className == "s2active") {
                            code_tab_answer = oStrong_tab_code[1].dataset.codediclistcode;
                        }else{
                            code_tab_answer=null
                        }
                        var fieldname_tab_code_save = table_sub_li[m].dataset.fieldname;//获取该li的fieldname
                        if(code_tab_answer==null||code_tab_answer==""){
                            obj_table_save[fieldname_tab_code_save] = null;
                        }else{
                            obj_table_save[fieldname_tab_code_save] = code_tab_answer;
                        }
//---------------------------CODE值等于3获取数据
                    } else if (hasClass(table_sub_li[m], "code_zh_three")) {
                        var oLi_choose_answer=getElementsByClassName(table_sub_li[m], "li", "choosethree");
                        var oTab_code_three_span = getElementsByClassName(table_sub_li[m], "span", "choose")[0];//获取该INTEGER类型下的span元素
                        var value_code_three_tab; //获取该span下的input的value值
                        for(t=0;t<oLi_choose_answer.length;t++){
                            if(oLi_choose_answer[t].innerHTML==oTab_code_three_span.innerHTML){
                                value_code_three_tab=oLi_choose_answer[t].dataset.code;
                            }
                        }
                        var fieldname_tab_code_three = table_sub_li[m].dataset.fieldname;//获取该li的fieldname
                        obj_table_save[fieldname_tab_code_three] = value_code_three_tab;


//---------------------------SSQADDRESS获取数据
                    } else if (hasClass(table_sub_li[m], "ssqaddress_zh")) {
                        var oTab_ssqaddress_span = getElementsByClassName(table_sub_li[m], "span", "choose")[0];//获取该INTEGER类型下的input元素
                        var fieldname_tab_ssqaddress = table_sub_li[m].dataset.fieldname;//获取该li的fieldname
                        var tab_guid = oTab_ssqaddress_span.getAttribute("guid");
                        if(tab_guid==""){
                            obj_table_save[fieldname_tab_ssqaddress] = null;
                        }else{
                            obj_table_save[fieldname_tab_ssqaddress] = tab_guid;
                        }
//---------------------------TELEPHONE获取数据
                    } else if (hasClass(table_sub_li[m], "telephone_zh")) {
                        var oTable_tel_save = table_sub_li[m].getElementsByTagName("input");//获取该INTEGER类型下的input元素
                        var fieldname_table_tel = table_sub_li[m].dataset.fieldname;//获取该li的fieldname
                        var tel = oTable_tel_save[0].value +"-"+ oTable_tel_save[1].value +"-"+ oTable_tel_save[2].value;
                        for(var t=0;t<oTable_tel_save.length;t++){
                            if(oTable_tel_save[t].value==""){
                                tel=null;
                                break;
                            }
                        }
                        var value_table_tel = tel;  //获取该li下的input的value值
                        if(tel=""){
                            obj_table_save[fieldname_table_tel] = null;
                        }else{
                            obj_table_save[fieldname_table_tel] = value_table_tel;
                        }
                    }
                }
                //console.log(obj_table_save);
                answer_tab.push(obj_table_save);
            }
            bossAdviseModel[answer_table_objname] = answer_tab;
            //console.log(bossAdviseModel);
        }

//因为这个页面有动态控制，所以需要判断，分为三种情况，第一种是显示"批准",第二种是显示"拒绝"下面的"中安拒绝",第三种是显示"拒绝"下面的"客户拒绝"
        var arry_checkbox_result=[];
        var completeStatus_text;
        for (var i = 0; i < oDiv_answer_input.length; i++) {
            var oLi_result_codeTwo = getElementsByClassName(oDiv_answer_input[i], "li", "code_zh_two");
            for (var j = 0; j < oLi_result_codeTwo.length; j++) {
                if (oLi_result_codeTwo[j].dataset.fieldname == "loanAdvise") {//加入选定的codeTwo选项的fieldname为loanAdvise的时候
                    var oEm_result = oLi_result_codeTwo[j].getElementsByTagName("em");
                    var oLi_codeTwo_parent = oLi_result_codeTwo[j].parentNode.parentNode;//选择包括这个li的最大div,即这个页面中的第一个problem putinput
                    var oCheckbox_result = getElementsByClassName(oLi_codeTwo_parent, "li", "checkbox_zh");//选取第一个problem putinput下的checkbox集合
                    var oCheckbox_pre_li=oCheckbox_result[0].previousElementSibling;//选取第一个checkbox前一个li
                    var oEm_pre_result=oCheckbox_pre_li.getElementsByTagName("em");//选取前一个li下面的em
                    arry_checkbox_result.push(oCheckbox_pre_li.dataset.fieldname);//选取第一个checkbox前一个li的fieldname值
                    for (var m = 0; m < oCheckbox_result.length; m++) {
                        arry_checkbox_result.push(oCheckbox_result[m].dataset.fieldname);
                    }
//----------------------------------------------开始判断三种情况
                    if (oEm_result[0].className == "s2active") {//---------------------假如"批准"大项被选定
                        for (var prop in bossAdviseModel) {
                            for (var brob in bossAdviseModel[prop]) {
                                for (var t = 0; t < arry_checkbox_result.length; t++) {
                                    if (arry_checkbox_result[t] == brob) {//------------------------如果属性等于arry_checkbox_result里面的值，则删掉
                                        delete bossAdviseModel[prop][brob];
                                    }
                                }
                            }
                        }
                        break;
                    }else if(oEm_result[1].className == "s2active"&&oEm_pre_result[0].className=="s2active"){//---------------------假如"拒绝"大项被选定,"中安拒绝"小项被选定
                        for(var pro in bossAdviseModel){
                            if(pro!=oLi_codeTwo_parent.dataset.objname){
                                delete bossAdviseModel[pro];//删掉objname不等于bossAdvise的大类
                            }else{
                                for(var bro in bossAdviseModel[pro]){
                                    if(bro!=oCheckbox_result[0].dataset.fieldname&&bro!=oCheckbox_pre_li.dataset.fieldname&&bro!=oCheckbox_pre_li.previousElementSibling.dataset.fieldname){
                                        delete bossAdviseModel[pro][bro];
                                    }
                                }
                            }
                        }
                        status_one();
                        if(bool){
                            if(completeStatus_text==1){
                                var _oUl_01=oCheckbox_result[0].getElementsByTagName("ul")[0];
                                var _oLabel_01=getElementsByClassName(_oUl_01, "label", "jiaoyan")[0];
                                if(!_oLabel_01){
                                    var sLabel_01 = document.createElement("label");
                                    sLabel_01.innerHTML = "请选择必填数据";
                                    sLabel_01.className = "jiaoyan";
                                    sLabel_01.style.cssText = "color:red; font-size:0.4rem;";
                                    _oUl_01.appendChild(sLabel_01);
                                }
                            }
                        }
                        break;
                    }else if(oEm_result[1].className == "s2active"&&oEm_pre_result[1].className=="s2active"){//---------------------假如"拒绝"大项被选定,"客户拒绝"小项被选定
                        for(var pro in bossAdviseModel){
                            if(pro!=oLi_codeTwo_parent.dataset.objname){
                                delete bossAdviseModel[pro];//删掉objname不等于bossAdvise的大类
                            }else{
                                for(var bro in bossAdviseModel[pro]){
                                    if(bro!=oCheckbox_result[1].dataset.fieldname&&bro!=oCheckbox_pre_li.dataset.fieldname&&bro!=oCheckbox_pre_li.previousElementSibling.dataset.fieldname){
                                        delete bossAdviseModel[pro][bro];
                                    }
                                }
                            }
                        }
                        status_two();
                        if(bool){
                            if(completeStatus_text==1){
                                var _oUl_02=oCheckbox_result[1].getElementsByTagName("ul")[0];
                                var _oLabel_02=getElementsByClassName(_oUl_02, "label", "jiaoyan")[0];
                                if(!_oLabel_02){
                                    var sLabel_02 = document.createElement("label");
                                    sLabel_02.innerHTML = "请选择必填数据";
                                    sLabel_02.className = "jiaoyan";
                                    sLabel_02.style.cssText = "color:red; font-size:0.4rem;";
                                    _oUl_02.appendChild(sLabel_02);
                                }
                            }
                        }
                        break;
                    }
                }
            }
        }
        function status_one(){
            var oDiv_total = getElementsByClassName(oSection, "div", "problem")[0];
            var checke_box=getElementsByClassName(oDiv_total, "li", "checkbox_zh")[0];
            var oImg=getElementsByClassName(checke_box, "img", "check");
            for(var i=0;i<oImg.length;i++){
                if(hasClass(oImg[i], "checked_img")){
                    completeStatus_text=2;
                    break;
                }else{
                    completeStatus_text=1;
                }
            }
        }
        function status_two(){
            var oDiv_total = getElementsByClassName(oSection, "div", "problem")[0];
            var checke_box=getElementsByClassName(oDiv_total, "li", "checkbox_zh")[1];
            var oImg=getElementsByClassName(checke_box, "img", "check");
            for(var i=0;i<oImg.length;i++){
                if(hasClass(oImg[i], "checked_img")){
                    completeStatus_text=2;
                    break;
                }else{
                    completeStatus_text=1;
                }
            }
        }

//---------------------------------------------------------------------------------------------------------------------
        //-----------------------------校验
        if(bool){
            $(".problem[modelname='" + modname + "']").data(modname, answer_tab);
            var tableResult = true;
            for (var index = 0; index < answer_tab.length; index++) {
                var result = checker.checkFieldValues(modname, null, answer_tab[index], true);
                if (!result) {
                    tableResult = false;
                }
            }
            var resultObj = {};
            // 提交时添加
            if (tableResult && inputResult) {
                console.info("数据校验通过");
//已完成
                resultObj["completeStatus"] = 2;
                _on_off=true;
            }
            else {
                console.info("数据校验不通过");
                resultObj["completeStatus"] = 1;
                _on_off=false;
            }
            resultJson.completeStatus=resultObj["completeStatus"];
        }else{
            resultJson.completeStatus=1;
        }
        resultJson[modelOjbName_all]=bossAdviseModel;
        //console.log(bossAdviseModel);
        resultJson.serialNo=serialNo;
        answer_result=JSON.stringify(resultJson);
        //console.log(resultJson);

    }
    oFooter.onclick = function() {
        submitResult(true);
        console.log(resultJson);
        if(_on_off){
            AndroidJs.saveWjDetalAnswer(answer_result,true);
        }else{
            AndroidJs.saveWjDetalAnswer(answer_result,false);
        }
    }
    oSection.onclick=function(){
        submitResult(false);
    }
}

function submit(bool){
    var oFooter = document.getElementsByTagName("footer")[0];
    var oSection = document.getElementsByTagName("section")[0];
    oSection.click();
    console.log(answer_result);
    if(!bool||bool==false){
        AndroidJs.saveWjDetalAnswer(answer_result,false);
    }else{
        AndroidJs.saveWjDetalAnswer(answer_result,true);
    }
}

//----------------------------------------------------------动态生成函数开始-------------------------------------------------------------------------------

//----------------------------------------------------------DOUBLE类型-------------------------------------------------------------------------------
function create_Double(question, oul) {
    if (question.inputUnit == null) {
        question.inputUnit = "";
    }
    if (question.require) {
        oul.innerHTML += '<li class="double_zh" data-regexRule='+question.regexRule +' fieldname='+ question.fieldName +' data-fieldname=' + question.fieldName + ' data-islabel=' + question.isLabel + ' data-isdynamicshow=' + question.isDynamicShow + ' data-require=' + question.require + ' data-controlshow=' + question.isControlShow + ' id=' + setIndex(question.code) + '><div class="left"><span>*</span><i>' + question.name + '</i></div><div class="right"><input type="tel" placeholder="请输入' + question.name + '"/><b class="yuan">' + question.inputUnit + '</b></div></li>';
    } else {
        oul.innerHTML += '<liclass="double_zh" data-regexRule='+question.regexRule +' fieldname='+question.fieldName+' data-fieldname=' + question.fieldName + ' data-islabel=' + question.isLabel + ' data-isdynamicshow=' + question.isDynamicShow + ' data-require=' + question.require + ' data-controlshow=' + question.isControlShow + ' id=' + setIndex(question.code) + '><div class="left"><span>&nbsp;&nbsp;</span><i>' + question.name + '</i></div><div class="right"><input type="tel" placeholder="请输入' + question.name + '"/><b class="yuan">' + question.inputUnit + '</b></div></li>';
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
        oul.innerHTML += '<li class="integer_zh" data-regexRule='+question.regexRule +' fieldname='+question.fieldName+' data-fieldname=' + question.fieldName + ' data-islabel=' + question.isLabel + ' data-isdynamicshow=' + question.isDynamicShow + ' data-require=' + question.require + ' data-controlshow=' + question.isControlShow + ' id=' + setIndex(question.code) + '><div class="left"><span>*</span><i>' + question.name + '</i></div><div class="right"><input type="tel" placeholder="请输入' + question.name + '"/><b class="yuan">' + question.inputUnit + '</b></div></li>';
    } else {
        oul.innerHTML = '<li class="integer_zh" data-regexRule='+question.regexRule+' fieldname='+question.fieldName+' data-fieldname=' + question.fieldName + ' data-islabel=' + question.isLabel + ' data-isdynamicshow=' + question.isDynamicShow + ' data-require=' + question.require + ' data-controlshow=' + question.isControlShow + ' id=' + setIndex(question.code) + '><div class="left"><span>&nbsp;&nbsp;</span><i>' + question.name + '</i></div><div class="right"><input type="tel" placeholder="请输入' + question.name + '"/><b class="yuan">' + question.inputUnit + '</b></div></li>';
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
    oLi_wrap.setAttribute("data-regexRule", question.regexRule);
    oLi_wrap.setAttribute("data-require", question.require);
    oLi_wrap.setAttribute("data-islabel", question.isLabel);
    var sWrap_checkbox = document.createElement("div");
    sWrap_checkbox.appendChild(oLi_wrap);
    oul.innerHTML += sWrap_checkbox.innerHTML;
}
//---------------------------------------------------------- STRING类型-------------------------------------------------------------------------------
function create_String(question, oul) {
    if (question.require) {
        oul.innerHTML += '<li class="string_zh" data-regexRule='+question.regexRule +' fieldname='+question.fieldName+' data-fieldname=' + question.fieldName + ' data-islabel=' + question.isLabel + ' data-isdynamicshow=' + question.isDynamicShow + ' data-require=' + question.require + ' data-controlshow=' + question.isControlShow + ' id=' + setIndex(question.code) + '><div class="left"><span>*</span><i>' + question.name + '</i></div><div class="right"><input type="text" placeholder="' + question.name + '"/></div></li>';
    } else {
        oul.innerHTML += '<li class="string_zh" data-regexRule='+question.regexRule+' fieldname='+question.fieldName+ ' data-fieldname=' + question.fieldName + ' data-islabel=' + question.isLabel + ' data-isdynamicshow=' + question.isDynamicShow + ' data-require=' + question.require + ' data-controlshow=' + question.isControlShow + ' id=' + setIndex(question.code) + '><div class="left"><span>&nbsp;&nbsp;</span><i>' + question.name + '</i></div><div class="right"><input type="text" placeholder="' + question.name + '"/></div></li>';
    }
}
//---------------------------------------------------------- CODE类型-------------------------------------------------------------------------------
function create_Code(question, oul, objName) {
    if (question.require) {
        if (question.codeDicList.length < 3) {
            //两个radio的样式
            oul.innerHTML += '<li class="code_zh_two" data-regexRule='+question.regexRule+' fieldname='+question.fieldName + ' data-fieldname=' + question.fieldName + ' data-islabel=' + question.isLabel + ' data-isdynamicshow=' + question.isDynamicShow + ' data-require=' + question.require + ' data-controlshow=' + question.isControlShow + ' id=' + setIndex(question.code) + '><div class="left"><span>*</span><i>' + question.name + '</i></div><div class="right"><strong class="s1" data-codeDicListCode=' + question.codeDicList[0].code + ' ><em class="s2no"></em></strong><b class="b_zh">' + question.codeDicList[0].name + '</b><strong class="s3" data-codeDicListCode=' + question.codeDicList[1].code + '><em class="s2no"></em></strong><b class="b_zh">' + question.codeDicList[1].name + '</b></div></li>';
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
            oul.innerHTML += '<li class="code_zh_three" data-regexRule='+question.regexRule+' fieldname='+question.fieldName+' data-fieldname=' + question.fieldName + ' data-islabel=' + question.isLabel + ' data-isdynamicshow=' + question.isDynamicShow + ' data-require=' + question.require + ' data-controlshow=' + question.isControlShow + ' id=' + setIndex(question.code) + '><div class="left"><span>*</span><i>' + question.name + '</i></div><div class="right" id="chose1401"><span class="choose" id="titleChoose">请选择</span><img src="img/down_icon.png" class="select"/></div>' + sCode_three_DivWrap.innerHTML + '</li>';
        }
    } else {
        //不必填
        if (question.codeDicList.length < 3) {
            //两个radio的样式
            oul.innerHTML += '<li class="code_zh_two" data-regexRule='+question.regexRule+' fieldname='+question.fieldName+ ' data-fieldname=' + question.fieldName + ' data-islabel=' + question.isLabel + ' data-isdynamicshow=' + question.isDynamicShow + ' data-require=' + question.require + ' data-controlshow=' + question.isControlShow + ' id=' + setIndex(question.code) + '><div class="left"><span>&nbsp;&nbsp;</span><i>' + question.name + '</i></div><div class="right"><strong class="s1" data-codeDicListCode=' + question.codeDicList[0].code + ' ><em class="s2no"></em></strong><b class="b_zh">' + question.codeDicList[0].name + '</b><strong class="s3" data-codeDicListCode=' + question.codeDicList[1].code + '><em class="s2no"></em></strong><b class="b_zh">' + question.codeDicList[1].name + '</b></div></li>';
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
            oul.innerHTML += '<li class="code_zh_three" data-regexRule='+question.regexRule+' fieldname='+question.fieldName+' data-fieldname=' + question.fieldName + ' data-islabel=' + question.isLabel + ' data-isdynamicshow=' + question.isDynamicShow + ' data-require=' + question.require + ' data-controlshow=' + question.isControlShow + ' id=' + setIndex(question.code) + '><div class="left"><span>*</span><i>' + question.name + '</i></div><div class="right" id="chose1401"><span class="choose" id="titleChoose">请选择</span><img src="img/down_icon.png" class="select"/></div>' + sCode_three_DivWrap.innerHTML + '</li>';
        }
    }
}
//---------------------------------------------------------- SSQADDRESS类型-------------------------------------------------------------------------------
function create_SSQADDRESS(question, oul) {
    if (question.require) {
        oul.innerHTML += '<li class="ssqaddress_zh" data-regexRule='+question.regexRule+' fieldname='+question.fieldName+ ' data-fieldname=' + question.fieldName + ' data-islabel=' + question.isLabel + ' data-isdynamicshow=' + question.isDynamicShow + ' data-require=' + question.require + ' data-controlshow=' + question.isControlShow + ' id=' + setIndex(question.code) + '><div class="left"><span>*</span><i>' + question.name + '</i></div><div class="right" id=' + question.fieldName + '><span class="choose">请选择</span><img src="img/down_icon.png" class="select select_4"/></div></li>';

    } else {
        oul.innerHTML += '<li class="ssqaddress_zh" data-regexRule='+question.regexRule+' fieldname='+question.fieldName+ ' data-fieldname=' + question.fieldName + ' data-islabel=' + question.isLabel + ' data-isdynamicshow=' + question.isDynamicShow + ' data-require=' + question.require + ' data-controlshow=' + question.isControlShow + ' id=' + setIndex(question.code) + '><div class="left"><span>&nbsp;&nbsp;</span><i>' + question.name + '</i></div><div class="right" id=' + question.fieldName + '><span class="choose">请选择</span><img src="img/down_icon.png" class="select select_4"/></div></li>';
    }
}
//---------------------------------------------------------- TELEPHONE类型-------------------------------------------------------------------------------
function create_Telephone(question, oul) {
    if (question.require) {
        oul.innerHTML += '<li class="telephone_zh" data-regexRule='+question.regexRule+' fieldname='+question.fieldName+' data-fieldname=' + question.fieldName + ' data-islabel=' + question.isLabel + ' data-isdynamicshow=' + question.isDynamicShow + ' data-require=' + question.require + ' data-controlshow=' + question.isControlShow + ' id=' + setIndex(question.code) + '><div class="left"><span>*</span><i>单位电话</i></div><div class="right phone"><input type="number" placeholder="区号"/><b>-</b><input type="number" placeholder="电话号码"/><b>-</b><input type="number" placeholder="分机号"/></div></li>';
    } else {
        oul.innerHTML += '<li class="telephone_zh" data-regexRule='+question.regexRule+' fieldname='+question.fieldName+' data-fieldname=' + question.fieldName + ' data-islabel=' + question.isLabel + ' data-isdynamicshow=' + question.isDynamicShow + ' data-require=' + question.require + ' data-controlshow=' + question.isControlShow + ' id=' + setIndex(question.code) + '><div class="left"><span>&nbsp;&nbsp;</span><i>单位电话</i></div><div class="right phone"><input type="number" placeholder="区号"/><b>-</b><input type="number" placeholder="电话号码"/><b>-</b><input type="number" placeholder="分机号"/></div></li>';
    }
}
//---------------------------------------------------------- DATE类型-------------------------------------------------------------------------------
function create_Date(question, oul) {
    if (question.require) {
        oul.innerHTML += '<li class="date_zh" data-regexRule='+question.regexRule+' fieldname='+question.fieldName+' data-fieldname=' + question.fieldName + ' data-islabel=' + question.isLabel + ' data-isdynamicshow=' + question.isDynamicShow + ' data-require=' + question.require + ' data-controlshow=' + question.isControlShow + ' id=' + question.fieldName + '><div class="left"><span>*</span><i>' + question.name + '</i></div><div class="right"><input type="text" placeholder="' + question.name + '"/></div></li>';
    } else {
        oul.innerHTML += '<li class="date_zh" data-regexRule='+question.regexRule+' fieldname='+question.fieldName+' data-fieldname=' + question.fieldName + ' data-islabel=' + question.isLabel + ' data-isdynamicshow=' + question.isDynamicShow + ' data-require=' + question.require + ' data-controlshow=' + question.isControlShow + ' id=' + question.fieldName + '><div class="left"><span>&nbsp;&nbsp;</span><i>' + question.name + '</i></div><div class="right"><input type="text" placeholder="' + question.name + '"/></div></li>';
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
//获取offsetTop和offsetLeft
function getPosition(e){
    var x= 0,y=0;
    while(e!=null){
        x+= e.offsetLeft;
        y+= e.offsetTop;
        e= e.offsetParent;
    }
    return{x:x,y:y}
}