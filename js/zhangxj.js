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
function getElementsByClassNameinnextlayer(parent,tagName) {
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
    //为元素删除CSS类结束*!/
}


//自定义函数
var str="";
var type="";
var jsontype="";
var resultJson={};
var arry_fieldname=[];
var arry_fieldname_value=[];
var arry_No_Choice=[];
var answerType=null;
function show_risk(data){
    console.log(data);
    var oBody=document.body;
    var sSection=document.createElement("section");
    oBody.appendChild(sSection);//添加section
    var sFooter=document.createElement("footer");
    var sPFooter=document.createElement("p");
    sPFooter.innerHTML="确认";
    sFooter.appendChild(sPFooter);
    oBody.appendChild(sFooter);//添加footer
    var modelOjbName_all=data.modelOjbName;
    //alert(modelOjbName_all);
    var answerList=data.answer;
    //console.log(answerList);
    var answerList_OK=answerList[modelOjbName_all];
    console.log(answerList_OK);
    var subList=data.modelDetailSubList;
    //大类分为table和input两类
    for(var j=0;j<subList.length;j++){
        subList[j].index=j;
        var oSction=document.getElementsByTagName("section")[0];
        if(subList[j].type=="TABLE"){
            var sDiv_table=document.createElement("div");//////////////////////////////////////动态生成tabel类型的整体DIV
            //var arr={"name":"xiaohong","age":30};//////////////
            sDiv_table.className="problem puttable";
            sDiv_table.innerHTML='<p>'+subList[j].name+'<img src="img/add_icon.png" class="add tableBtn"><img src="img/jian_icon.png" class="jian tableBtn"/></p><div class="cy"><span class="span_zh">'+subList[j].name+'</span></div>';
            //sDiv_table.setAttribute("data-list",JSON.stringify(subList[j]));////////////////
            sDiv_table.setAttribute("data-objName",subList[j].objName);
            oSction.appendChild(sDiv_table);
            var sUl_table=document.createElement("ul");
            sDiv_table.appendChild(sUl_table);
            for(var i=0;i<subList[j].questionDetailList.length;i++){
                var Types=subList[j].questionDetailList[i].inputType;
                switch(Types){
                    case "DOUBLE":create_Double(subList[j].questionDetailList[i],sUl_table);break;
                    case "TEXTAREA":create_Textarea(subList[j].questionDetailList[i],sUl_table,oSction,sDiv_table,subList[j].objName);break;
                    case "INTEGER":create_Integer(subList[j].questionDetailList[i],sUl_table,sDiv_input);break;
                    case "CHECKBOX":create_Checkbox(subList[j].questionDetailList[i],sUl_table,subList[j].objName);break;
                    case "STRING":create_String(subList[j].questionDetailList[i],sUl_table);break;
                    case "CODE":create_Code(subList[j].questionDetailList[i],sUl_table);break;
                    case "SSQADDRESS":create_Address(subList[j].questionDetailList[i],sUl_table);break;
                    case "TELEPHONE":create_Telephone(subList[j].questionDetailList[i],sUl_table);break;
                }
            }
        }else if(subList[j].type=="INPUT"){
            var sDiv_input=document.createElement("div");//////////////////////////////动态生成input类型的整体DIV
            sDiv_input.className="problem putinput";
            sDiv_input.innerHTML="<p>"+subList[j].name+"</p>";
            sDiv_input.setAttribute("data-objName",subList[j].objName);
            oSction.appendChild(sDiv_input);
            var sUl_input=document.createElement("ul");
            sDiv_input.appendChild(sUl_input);
            for(var i=0;i<subList[j].questionDetailList.length;i++){
                var intype=subList[j].questionDetailList[i].inputType;
                switch(intype){
                    case "DOUBLE":create_Double(subList[j].questionDetailList[i],sUl_input);break;
                    case "TEXTAREA":create_Textarea(subList[j].questionDetailList[i],sUl_input,oSction,sDiv_input,subList[j].objName);break;
                    case "INTEGER":create_Integer(subList[j].questionDetailList[i],sUl_input);break;
                    case "CHECKBOX":create_Checkbox(subList[j].questionDetailList[i],sUl_input,sDiv_input,subList[j].objName);break;
                    case "STRING":create_String(subList[j].questionDetailList[i],sUl_input);break;
                    case "CODE":create_Code(subList[j].questionDetailList[i],sUl_input,subList[j].objName);break;
                    case "SSQADDRESS":create_Address(subList[j].questionDetailList[i],sUl_input);break;
                    case "TELEPHONE":create_Telephone(subList[j].questionDetailList[i],sUl_input);break;
                }
            }
        }
		//信贷员建议部分特殊处理
		if(subList[j].objName=="bossAdvise"){//当objName等于bossAdvise，生成需要特许处理的页面
			//alert(111);
			//初始化
            
			var osSection=document.getElementsByTagName("section")[0];
			
			var ossDiv=getElementsByClassName(osSection,"div","problem putinput")[0];
			var ossUl=getElementsByClassNameinnextlayer(ossDiv,"ul")[0];
			var ossLi=getElementsByClassNameinnextlayer(ossUl,"li");
			ossUl.removeChild(ossLi[length-1]);
			var osUl=getElementsByClassName(osSection,"ul","clicktab");
			var osLi_01=osUl[0].getElementsByTagName("li");
			var osLi_02=osUl[1].getElementsByTagName("li");
			
			for(var i=0;i<osLi_01.length;i++){
				
				osLi_01[i].className="zhongan";
			}
			for(var i=0;i<osLi_02.length;i++){
				osLi_02[i].className="kehu";
			}
			checkbox_total_hide();
			
		}
    }
	//初始化函数
	function checkbox_total_hide(){
		var oSection_checkbox=document.getElementsByTagName("section")[0];
		var check_box=getElementsByClassName(oSection_checkbox,"ul","clicktab");
		for(var i=0;i<check_box.length;i++){
			addClass(check_box[i],"hide_zh");
		}
	}
	
		function checkbox_total_show(){
		var oSection_checkbox=document.getElementsByTagName("section")[0];
		var check_box=getElementsByClassName(oSection_checkbox,"ul","clicktab");
		for(var i=0;i<check_box.length;i++){
			addClass(check_box[i],"active_zh");
		}
	}
	
	
	
	
    //信用报告特殊处理
    if(modelOjbName_all=="bossOwnerInfoModel"){
        var oSection_all=document.getElementsByTagName("section")[0];
        var oDiv_all=getElementsByClassName(document,"div","problem putinput");
        //alert(oDiv_all.length);
        oSection_all.removeChild(oDiv_all[2]);//删除第三个特定的div
        oSection_all.removeChild(oDiv_all[3]);//删除第四个特定的div
        var sDiv_head=document.createElement("div");
        sDiv_head.className="income";
        sDiv_head.innerHTML='<div class="ic_head_zh"><div><span class="span_bg" id="sr">'+subList[2].name+'</span><span id="zc">'+subList[3].name+'</span></div></div>';
        oSection_all.appendChild(sDiv_head);//将特定的头部插入到section里面
        var sDiv_Ul=document.createElement("div");
        sDiv_Ul.className="sr_zh";
        sDiv_Ul.innerHTML='<div class="ic_dx_zh"><ul class="dx_f_zh"></ul></div><div class="ic_dx_zh"><ul class="dx_f_zh"></ul></div>';
        var oWrap_div=getElementsByClassName(document,"div","income")[0];
        oWrap_div.appendChild(sDiv_Ul);//将包容li的ul插入到相应位置
        var oDiv_ul=getElementsByClassName(oWrap_div,"ul","dx_f_zh");
		//alert(oDiv_ul.length);
		oDiv_ul[0].innerHTML='<li><span>'+subList[2].questionDetailList[0].name+'</span><span>'+subList[2].questionDetailList[1].name+'</span><span>'+subList[2].questionDetailList[2].name+'</span><span>'+subList[2].questionDetailList[3].name+'</span></li><li data-objName='+subList[2].objName+'><span data-fieldname='+subList[2].questionDetailList[0].fieldName+'></span><span class="special" data-fieldname='+subList[2].questionDetailList[1].fieldName+'><input type="text"></span><span class="special" data-fieldname='+subList[2].questionDetailList[2].fieldName+'><input type="text"></span><span class="special" data-fieldname='+subList[2].questionDetailList[3].fieldName+'><input type="text"></span></li>';
        oDiv_ul[1].innerHTML='<li><span>'+subList[3].questionDetailList[0].name+'</span><span>'+subList[3].questionDetailList[1].name+'</span><span>'+subList[3].questionDetailList[2].name+'</span><span>'+subList[3].questionDetailList[3].name+'</span></li><li data-objName='+subList[3].objName+'><span data-fieldname='+subList[3].questionDetailList[0].fieldName+'></span><span class="special" data-fieldname='+subList[3].questionDetailList[1].fieldName+'><input type="text"></span><span class="special" data-fieldname='+subList[3].questionDetailList[2].fieldName+'><input type="text"></span><span class="special" data-fieldname='+subList[3].questionDetailList[3].fieldName+'><input type="text"></span></li>';
        //特定事件初始化
        var oDiv_header=getElementsByClassName(oWrap_div,"div","ic_head_zh")[0];
        var oDiv_change=getElementsByClassName(oWrap_div,"div","ic_dx_zh");
        oDiv_change[0].className="ic_dx_zh active_zh";
        oDiv_change[1].className="ic_dx_zh hide_zh";
        var oSpan_change=oDiv_header.getElementsByTagName("span");
        oSpan_change[0].style.background="#32be97";//点击背景的初始化
        oSpan_change[0].style.color="#FFFFFF";//点击背景的初始化
        //初始化查询次数第一个span集合中的第一个span
        var sub_li_01=oDiv_ul[0].getElementsByTagName("li")[1];//第一个需要填写数据的li
        var sub_span_01=sub_li_01.getElementsByTagName("span");//获取查询次数下面的span集合
        var sub_span_fieldname00=sub_span_01[0].dataset.fieldname;
        sub_span_01[0].innerHTML=answerList_OK[sub_li_01.dataset.objname][sub_span_fieldname00];//单独设置第一个span的内容，因为第一个span跟后面的不同，后面是input
        //初始化查询次数第一个span集合后面的input值
        for(var i=1;i<sub_span_01.length;i++){
            var that_spe=sub_span_01[i];
            var oInput_spe=that_spe.getElementsByTagName("input")[0];
            oInput_spe.value=answerList_OK[sub_li_01.dataset.objname][that_spe.dataset.fieldname];
        }
        //初始化逾期次数第一个span集合中的第一个span
        var sub_li_02=oDiv_ul[1].getElementsByTagName("li")[1];//第二个需要填写数据的li
        var sub_span_02=sub_li_02.getElementsByTagName("span");//获取逾期次数下面的span集合
        var sub_span_fieldname01=sub_span_02[0].dataset.fieldname;
        sub_span_02[0].innerHTML=answerList_OK[sub_li_02.dataset.objname][sub_span_fieldname01];//单独设置第一个span的内容，因为第一个span跟后面的不同，后面是input
        //初始化逾期次数第一个span后面的input值
        for(var i=1;i<sub_span_02.length;i++){
            var that_speci=sub_span_02[i];
            var oInput_speci=that_speci.getElementsByTagName("input")[0];
            oInput_speci.value=answerList_OK[sub_li_02.dataset.objname][that_speci.dataset.fieldname];
        }
        //点击事件绑定
        for(var i=0;i<oSpan_change.length;i++){
            oSpan_change[i].index=i;
            oSpan_change[i].onclick=function(){
                for(var j=0;j<oSpan_change.length;j++){
                    oSpan_change[j].style.background="#FFFFFF";
                    oSpan_change[j].style.color="#32be97";
                    oDiv_change[j].className="ic_dx_zh hide_zh";
                }
                this.style.background="#32be97";
                this.style.color="#FFFFFF";
                oDiv_change[this.index].className="ic_dx_zh active_zh";
            }
        }
    }
	//////////////////////////////////////////////////////////////////////////////初始化开始

    //////////////////////////////////////////////////////////////////////////TEXTAREA类型的初始化和事件绑定
    var oTextArea_zh=getElementsByClassName(document,"textarea","risk_input");//获取所有的TEXTAREA类型
    //TEXTAREA初始化
    for(var i=0;i<oTextArea_zh.length;i++){
        (function(){
            var fieldName=oTextArea_zh[i].dataset.fieldname;
            var objName_textArear=oTextArea_zh[i].dataset.objname;
            //console.log(fieldName);
            //console.log(objName_textArear);
            //console.log(answerList_OK);
            //console.log(answerList_OK[objName_textArear][fieldName]);
            oTextArea_zh[i].innerHTML=answerList_OK[objName_textArear][fieldName];

        }(i))
    }
    //TEXTAREA绑定事件
    for(var i=0;i<oTextArea_zh.length;i++){
        //that=oTextArea_zh[i];
        oTextArea_zh[i].onclick=function(){
            var oSpan=this.parentNode.getElementsByTagName("span")[0];
            this.placeholder="";
            oSpan.style.display="none";
        }
        oTextArea_zh[i].onblur=function(){
            var oSpan=this.parentNode.getElementsByTagName("span")[0];
            var str="";
            if(this.value!==""){
                str+=this.value;
            }else{
                str="";
            }
            if(str==""){
                this.placeholder="请输入";
                oSpan.style.display="inline";
            }
        }
    }
	//////////////////////////////////////////////////////////////////////////////初始化结束
    //////////////////////////////////////////////////////////////////////////////绑定事件
    var oSection_zh=document.getElementsByTagName("section")[0];
    var oFooter_zh=document.getElementsByTagName("footer")[0];
   /* 大类型为table类型*/
    var showData_table=getElementsByClassName(document,"div","puttable");
    for(var i=0;i<showData_table.length;i++){
		var that=showData_table[i];//把showData_table[i]用that储存起来，因为添加事件下面的点击事件无法访问到showData_table[i]
        var total=1;
		var iNow=0;
		var add_Btn=getElementsByClassName(that,"img","add");//获取添加按钮
		var jian_Btn=getElementsByClassName(that,"img","jian"); //获取删除按钮
		var div_wrap=getElementsByClassName(that,"div","cy");
		//初始化第一个按钮为选中状态
		function Initialization(table){
        var span_total=getElementsByClassName(table,"span","span_zh");
            addClass( span_total[0],"add_active");//将第一个标签设置为点击状态		
		}
		Initialization(showData_table[0]);
        //////////////////////////////////添加按钮
		add_Btn[0].onclick=table_Add;
		function table_Add(){
            total++;
            var sadd_Text=document.createElement("span");//点击一次，创建一个span元素
            sadd_Text.className="span_zh";
            sadd_Text.innerHTML="围栏"+total;			
            div_wrap[0].appendChild(sadd_Text);
			var span_num=getElementsByClassName(that,"span","span_zh");//获取添加后的标签长度
			for(var j=0;j<span_num.length;j++){				
				span_num[j].index=j;
				span_num[j].onclick=function(){
					iNow=this.index;
					for(var m=0;m<span_num.length;m++){
						span_num[m].className="span_zh";
					}
					this.className="span_zh add_active";
				}	
			}			
		}
        //////////////////////////////////删除按钮
        jian_Btn[0].onclick=table_Del;
		function table_Del(){
				if(total>1){
				var div_del=getElementsByClassName(that,"div","cy");
			    var span_del=getElementsByClassName(that,"span","span_zh");
			    div_del[0].removeChild(span_del[iNow]);
				Initialization(that);
				var span_del_after=getElementsByClassName(that,"span","span_zh");//获取删除后的标签长度
				//alert(span_del_after.length);
				for(m=0;m<span_del_after.length;m++){
					span_del_after[m].index=m;
					span_del_after[m].onclick=function(){
						iNow=this.index;
						for(var i=0;i<span_del_after.length;i++){
							span_del_after[i].className="span_zh";
						}
					this.className="span_zh add_active";	
					}	
				}
				total--;					
				}else{
				    total=1;
				}			
        }
    }



    //////////////////////////////////////////////////////////////////////////DOUBLE类型的初始化和事件绑定
    var oDouble_zh=getElementsByClassName(document,"li","double_zh");//获取所有的DOUBLE类型
    //DOUBLE初始化
	
    for(var i= 0;i<oDouble_zh.length;i++){
        that_Double_Initialization=oDouble_zh[i];//这里用that_Double_Initialization存储oInteger_zh[i]
        var objname_Double=that_Double_Initialization.parentNode.parentNode.dataset.objname;//获取大的div上面的data-objname值
        var field_Double=that_Double_Initialization.dataset.fieldname;//获取li上面的data-fieldname值
        Double_Initialization_input=that_Double_Initialization.getElementsByTagName("input")[0];//获取li下面的input元素
        Double_Initialization_input.value=answerList_OK[objname_Double][field_Double];//将对应的值赋值给input以初始化
    }
    //DOUBLE绑定事件
    for(var j=0;j<oDouble_zh.length;j++){
        var that_double=oDouble_zh[j];
        var oDouble_type=that_double.getElementsByTagName("input");
        for(var i=0;i<oDouble_type.length;i++){
            oDouble_type[i].indexholder=oDouble_type[i].placeholder;
            oDouble_type[i].onfocus=function(){
                this.placeholder="";
            }
            oDouble_type[i].onblur=function(){
                this.placeholder=this.indexholder;
            }
        }
    }
    //////////////////////////////////////////////////////////////////////////INTEGER类型的点击事件
    var oInteger_zh=getElementsByClassName(document,"li","integer_zh");//获取所有的INTEGER类型
    //STRING初始化
    for(var i= 0;i<oInteger_zh.length;i++){
        that_Integer_Initialization=oInteger_zh[i];//这里用that_Integer_Initialization存储oInteger_zh[i]
        //alert(that_string_Initialization.parentNode.parentNode.dataset.objname);
        var objname_Integer=that_Integer_Initialization.parentNode.parentNode.dataset.objname;//获取大的div上面的data-objname值
        var field_Integer=that_Integer_Initialization.dataset.fieldname;//获取li上面的data-fieldname值
        Integer_Initialization_input=that_Integer_Initialization.getElementsByTagName("input")[0];//获取li下面的input元素
        Integer_Initialization_input.value=answerList_OK[objname_Integer][field_Integer];//将对应的值赋值给input以初始化
    }
    //INTEGER绑定事件
    for(var j=0;j<oInteger_zh.length;j++){
        var that_integer=oInteger_zh[j];
        var oInteger_type=that_integer.getElementsByTagName("input");
        for(var i=0;i<oInteger_type.length;i++){
            oInteger_type[i].indexholder=oInteger_type[i].placeholder;
            oInteger_type[i].onfocus=function(){
                this.placeholder="";
            }
            oInteger_type[i].onblur=function(){
                this.placeholder=this.indexholder;
            }
        }
    }

    //////////////////////////////////////////////////////////////////////////STRING类型的点击事件
    var oString_zh=getElementsByClassName(document,"li","string_zh");//获取所有的STRING类型
    //STRING初始化
    for(var i= 0;i<oString_zh.length;i++){
        that_string_Initialization=oString_zh[i];//这里用that_string_Initialization存储oString_zh[i]
        //alert(that_string_Initialization.parentNode.parentNode.dataset.objname);
        var objname_string=that_string_Initialization.parentNode.parentNode.dataset.objname;//获取大的div上面的data-objname值
        var field_string=that_string_Initialization.dataset.fieldname;//获取li上面的data-fieldname值
        string_Initialization_input=that_string_Initialization.getElementsByTagName("input")[0];//获取li下面的input元素
        string_Initialization_input.value=answerList_OK[objname_string][field_string];//将对应的值赋值给input以初始化
    }
    //STRING绑定事件
    for(var j=0;j<oString_zh.length;j++){
        var that_string=oString_zh[j];
        var oString_type=that_string.getElementsByTagName("input");
        for(var i=0;i<oString_type.length;i++){
            oString_type[i].indexholder=oString_type[i].placeholder;
            oString_type[i].onfocus=function(){
                this.placeholder="";
            }
            oString_type[i].onblur=function(){
                this.placeholder=this.indexholder;
            }
        }
    }
    //////////////////////////////////////////////////////////////////////////CODE类型的点击事件
    var oCode_zh_two=getElementsByClassName(document,"li","code_zh_two");//获取所有CODE选项等于2的类型
    //CODE值等于2时的初始化
	function code_two_Init(){
		    for(var i= 0;i<oCode_zh_two.length;i++){
        that_code_Initialization=oCode_zh_two[i];//这里用that_code_Initialization存储oString_zh[i]
        var objname_code=that_code_Initialization.parentNode.parentNode.dataset.objname;//获取大的div上面的data-objname值
        var field_code=that_code_Initialization.dataset.fieldname;//获取li上面的data-fieldname值
        var code_strong=that_code_Initialization.getElementsByTagName("strong");
        var code_em01=code_strong[0].getElementsByTagName("em")[0];   //radio第一个选择按钮
        var code_em02=code_strong[1].getElementsByTagName("em")[0];   //radio第二个选择按钮
        if(code_strong[0].dataset.codediclistcode==answerList_OK[objname_code][field_code]){
            code_em01.className="s2active";//如果第一个选择按钮的field_code等于数据库里面的对应值相等，第一个按钮被选中
        }else{
            code_em02.className="s2active";//如果第二个选择按钮的field_code等于数据库里面的对应值相等，第二个按钮被选中
            
        }
      }	
	}
	code_two_Init();
	//CODE绑定事件______code值等于2的时候
	function code_two_event(){
		for(var i=0;i<oCode_zh_two.length;i++){
			(function(){                          //使用匿名函数解决多行单选框的BUG
			var oStrong_Code=oCode_zh_two[i].getElementsByTagName("strong");
            var oEm_checked_01=oStrong_Code[0].getElementsByTagName("em")[0];
            var oEm_checked_02=oStrong_Code[1].getElementsByTagName("em")[0];
			if(oCode_zh_two[i].dataset.fieldname=="loanAdvise"){/////////////////判断点击的li的fieldname属性值是否为loanAdvise，这里判断是
				oStrong_Code[0].onclick=function(){
                oEm_checked_01.className="s2active";
                oEm_checked_02.className="s2no";
				approval_show(oCode_zh_two,"loanAdvise");				          
            };
            oStrong_Code[1].onclick=function(){
                oEm_checked_01.className="s2no";
                oEm_checked_02.className="s2active";
				approval_hide(oCode_zh_two,"loanAdvise");                
            }
			}else{/////////////////判断点击的li的fieldname属性值是否为loanAdvise，这里判断否
				oStrong_Code[0].onclick=function(){
                oEm_checked_01.className="s2active";
                oEm_checked_02.className="s2no";
				}
				oStrong_Code[1].onclick=function(){
                oEm_checked_01.className="s2no";
                oEm_checked_02.className="s2active";
				}	
			}
			}(i));
		}	
	}
	code_two_event();
    //CODE绑定事件______code值大于2的时候
	function code_three_event(){
	var oCode_zh_three=getElementsByClassName(document,"li","code_zh_three");//获取所有CODE选项大于2的类型
    var val_Mask="";
    for(var i=0;i<oCode_zh_three.length;i++){
        (function(){
            that_Mask=oCode_zh_three[i];
            var oSpan_mask=getElementsByClassName(that_Mask,"span","choose")[0];//获取输入的值
            var oChoice_mask=getElementsByClassName(that_Mask,"div","right")[0];
            var oCode_mask=that_Mask.getElementsByTagName("div")[2];//通过li选取mask遮罩元素
            var oLi_Mask = that_Mask.getElementsByTagName("li"); //获取遮罩里面的li元素集
            oChoice_mask.onclick=function() {
                oCode_mask.className = "active_zh";//点击右边一整条选择框，弹出遮罩层
                for (var j = 0; j < oLi_Mask.length - 1; j++) {    //除了“取消”按钮之外的其他li
                    oLi_Mask[j].onclick = function () {
                        oCode_mask.className ="hide_zh";
                        oSpan_mask.innerHTML=this.innerHTML;//将选择的li的值赋值给外面span元素
                    }
                }
                oLi_Mask[oLi_Mask.length-1].onclick=function(){//单独设置"取消"按钮
                    oCode_mask.className="hide_zh";
                }
            }
        }(i))
      }	
	}
	code_three_event();
    ////////////////////////////////信贷员建议特殊点击事件__隐藏事件_批准
    function approval_hide(aa,select){//loanAdvise
        del_div();
        del_li();
        //删除特定li以上的其他包裹div
        function del_div(){
            var num;
            var objName;
            for(var i= 0;i<aa.length;i++){
                if(aa[i].dataset.fieldname==select){//注意：loanAdvise
                    objName=aa[i].parentNode.parentNode.dataset.objname;//获取特定fieldname属性的li上面最顶层的div的objname
                }
            }
            var oDiv_total=getElementsByClassName(oSection_zh,"div","problem");//获取最外层的div，信贷员建议页面一共有两个
            //删除特定li顶层父级div以上的div
            for(var i=0;i<oDiv_total.length;i++){
                if(oDiv_total[i].dataset.objname==objName){
                    num=i;//获取特定li所在的顶层div在section种的位置,信贷员建议页面,这个值为0(实际上是1，只是数组从0开始计算的)
                    for(var j=0;j<oDiv_total.length;j++){
                        if(j>num){
							removeClass(oDiv_total[j],"active_zh");
                            addClass(oDiv_total[j],"hide_zh");
                        }
                    }
                }
            }
        }
        //删除特定li以上的其他li
        function del_li(){
            var number;
            var section_new=document.getElementsByTagName("section")[0];
            var oDiv_new=getElementsByClassName(section_new,"div","problem puttable hide_zh");
            var oDiv_wrap=oDiv_new[0].previousElementSibling;//获取特定项的外层包裹div
            var oUl_new=oDiv_wrap.children[1];//获取包裹特定li的外层ul
            var oLi_new=getElementsByClassNameinnextlayer(oUl_new,"li");
            for(var i=0;i<oLi_new.length;i++){
                if(oLi_new[i].dataset.fieldname==select){
                    number=i;
                    for(var j=0;j<oLi_new.length;j++){
                        if(j>number){
							removeClass(oLi_new[j],"active_zh");
                            addClass(oLi_new[j],"hide_zh");
                        }
                    }
                }
            }
        }
			refuse_show();
    }
	////////////////////////////////信贷员建议特殊点击事件__显示事件_拒绝
	function refuse_show(){
			var oCheck_ul=getElementsByClassName(oSection_zh,"ul","clicktab")[0];
	        removeClass(oCheck_ul,"hide_zh");
	        addClass(oCheck_ul,"active_zh");
			var reason_li=getElementsByClassName(oCheck_ul,"li","reason")[0];
			var ZAN_reason_check=reason_li.getElementsByTagName("strong")[0];
			var customer_reason_check=reason_li.getElementsByTagName("strong")[1];
			ZAN_reason_check.onclick=function(){
				var oZAN_li=getElementsByClassName(oCheck_ul,"li","zhongan");
				
				
				

				alert(oZAN_li.length);
			}
			customer_reason_check.onclick=function(){
				alert(222);
			}
			
			
			
			
	}
	////////////////////////////////信贷员建议特殊点击事件__隐藏事件_拒绝
		function refuse_hide(){
			var oCheck_ul=getElementsByClassName(oSection_zh,"ul","clicktab")[0];
	        removeClass(oCheck_ul,"active_zh");
	        addClass(oCheck_ul,"hide_zh");
	}
    ////////////////////////////////信贷员建议特殊点击事件__显示事件_批准
    function approval_show(aa,select){//loanAdvise
        show_li();
        show_div();
        //添加特定li以上的其他包裹div
        function show_div(){
            var num;
            var objName;
            for(var i= 0;i<aa.length;i++){
                if(aa[i].dataset.fieldname==select){//注意：loanAdvise
                    objName=aa[i].parentNode.parentNode.dataset.objname;//获取特定fieldname属性的li上面最顶层的div的objname
                }
            }
            var oDiv_total=getElementsByClassName(oSection_zh,"div","problem");//获取最外层的div，信贷员建议页面一共有两个
            //添加特定li顶层父级div以上的div
            for(var i=0;i<oDiv_total.length;i++){
                if(oDiv_total[i].dataset.objname==objName){
                    num=i;//获取特定li所在的顶层div在section种的位置,信贷员建议页面,这个值为0(实际上是1，只是数组从0开始计算的)
                    for(var j=0;j<oDiv_total.length;j++){
                        if(j>num){
                            removeClass(oDiv_total[j],"hide_zh");
                            addClass(oDiv_total[j],"active_zh");
                        }
                    }
                }
            }
        }
        //添加特定li以上的其他li
        function show_li(){
            var number=0;
            var section_new=document.getElementsByTagName("section")[0];
            var oDiv_new=getElementsByClassName(section_new,"div","problem puttable hide_zh");
            var oDiv_wrap=oDiv_new[0].previousElementSibling;//获取特定项的外层包裹div
            var oUl_new=oDiv_wrap.children[1];//获取包裹特定li的外层ul
            var oLi_new=getElementsByClassNameinnextlayer(oUl_new,"li");
            for(var i=0;i<oLi_new.length;i++){
                if(oLi_new[i].dataset.fieldname==select){
                    number=i;
                    for(var j=0;j<oLi_new.length;j++){
                        if(j>number){
                            removeClass(oLi_new[j],"hide_zh");
                            addClass(oLi_new[j],"active_zh");
                        }
                    }
                }
            }
        }
		refuse_hide();
    }


//////////////////////////////////////////////////////////////////////////////数据保存上传
    var oFooter=document.getElementsByTagName("footer")[0];
    //TextArea类型单独的控制
/*    oFooter.onclick=function(){
        for(var i=0;i<oTextArea_zh.length;i++){
            (function(){
                var val_textArear=oTextArea_zh[i].value;
                var fieldName=oTextArea_zh[i].dataset.fieldname;
                var objName_textArear=oTextArea_zh[i].dataset.objname;
                answerList_OK[objName_textArear][fieldName]=val_textArear;
                resultJson[modelOjbName_all]=answerList_OK;
                console.log(resultJson);
            }(i))
        }
        return resultJson;
    }*/
	oFooter.onclick=function(){
		    //INTEGER获取数据
    for(var j=0;j<oInteger_zh.length;j++){
        var obj_int_save={};   //新建一个临时对象，用于存放fieldname和对应的input的value
        var oInput_int_save=oInteger_zh[j].getElementsByTagName("input")[0];//获取该INTEGER类型下的input元素
        var fieldname_int_save=oInteger_zh[j].dataset.fieldname;//获取该li的fieldname
        var value_int_save=oInput_int_save.value;  //获取该li下的input的value值
        obj_int_save[fieldname_int_save]=value_int_save;   //给新建的空对象赋值，把fieldname赋值给name属性,把value赋值给键值
        arry_fieldname.push(fieldname_int_save);
        arry_fieldname_value.push(obj_int_save);
    }
	    //STRING获取数据
    for(var j=0;j<oString_zh.length;j++){
        var obj_str_save={};   //新建一个临时对象，用于存放fieldname和对应的input的value
        var oInput_str_save=oString_zh[j].getElementsByTagName("input")[0];//获取该INTEGER类型下的input元素
        var fieldname_str_save=oString_zh[j].dataset.fieldname;//获取该li的fieldname
        var value_str_save=oInput_str_save.value;  //获取该li下的input的value值
        obj_str_save[fieldname_str_save]=value_str_save;   //给新建的空对象赋值，把fieldname赋值给name属性,把value赋值给键值
        arry_fieldname.push(fieldname_str_save);
        arry_fieldname_value.push(obj_str_save);
    }
	    //DOUBLE获取数据
    for(var j=0;j<oDouble_zh.length;j++){
        var obj_dou_save={};   //新建一个临时对象，用于存放fieldname和对应的input的value
        var oInput_dou_save=oDouble_zh[j].getElementsByTagName("input")[0];//获取该INTEGER类型下的input元素
        var fieldname_dou_save=oDouble_zh[j].dataset.fieldname;//获取该li的fieldname
        var value_dou_save=oInput_dou_save.value;  //获取该li下的input的value值
        obj_dou_save[fieldname_dou_save]=value_dou_save;   //给新建的空对象赋值，把fieldname赋值给name属性,把value赋值给键值
        arry_fieldname.push(fieldname_dou_save);
        arry_fieldname_value.push(obj_dou_save);
    }
        //信用报告信息特定事件获取数据
        var span_special=getElementsByClassName(document,"span","special");//获取特定事件的span集合
        for(var i=1;i<span_special.length;i++){
            var obj_special_save={};   //新建一个临时对象，用于存放fieldname和对应的input的value
            var oInput_special_save=span_special[i].getElementsByTagName("input")[0];//获取该special型下的input元素
			var fieldname_special_save=span_special[i].dataset.fieldname;//获取该span的fieldname
            var value_special_save=oInput_special_save.value;  //获取该span下的input的value值
            obj_special_save[fieldname_special_save]=value_special_save;   //给新建的空对象赋值，把fieldname赋值给name属性,把value赋值给键值
            arry_fieldname.push(fieldname_special_save);
            arry_fieldname_value.push(obj_special_save);
        }
		 //console.log(arry_fieldname);
         //console.log(arry_fieldname_value);
		for(var prop in answerList_OK){
			// console.log(answerList_OK[prop]);
			for(var brob in answerList_OK[prop]){
				// console.log(answerList_OK[prop][brob]);
				 //console.log(brob);
				for(var i=0;i<arry_fieldname.length;i++){
					// var that_fieldname=arry_fieldname[i];
					if(arry_fieldname[i]==brob){
						//alert(111);
						answerList_OK[prop][brob]=arry_fieldname_value[i][brob];
					}
				}	
			}
		}
		console.log(answerList_OK);
		return answerList_OK;
	}
}
/*动态生成函数开始*/

function create_Double(question,oul){  //   DOUBLE类型
    if(question.inputUnit==null){
        question.inputUnit="";
    }
    if(question.require){
        oul.innerHTML+='<li class="double_zh" data-fieldname=' + question.fieldName + ' data-islabel='+ question.isLabel + ' data-isdynamicshow='+question.isDynamicShow +' data-require='+question.require +' data-controlshow='+question.isControlShow +' id='+ setIndex(question.code) + '><div class="left"><span>*</span><i>' + question.name + '</i></div><div class="right"><input type="tel" placeholder="请输入' + question.name + '"/><b class="yuan">' + question.inputUnit + '</b></div></li>';
    }else{
        oul.innerHTML+='<liclass="double_zh" data-fieldname=' + question.fieldName + ' data-islabel='+ question.isLabel + ' data-isdynamicshow='+question.isDynamicShow +' data-require='+question.require +' data-controlshow='+question.isControlShow +' id='+setIndex(question.code)+'><div class="left"><span>&nbsp;&nbsp;</span><i>'+question.name+'</i></div><div class="right"><input type="tel" placeholder="请输入'+question.name+'"/><b class="yuan">'+question.inputUnit+'</b></div></li>';
    }
}
function create_Textarea(question,oul,oSection,oDiv,objName){   //   TEXTAREA类型
    oSection.removeChild(oDiv);
    var sDiv_TEXTAREA=document.createElement("div");
    sDiv_TEXTAREA.className="problem";
    if(question.require){
        sDiv_TEXTAREA.innerHTML='<div class="risk"><h2>'+question.name+'</h2><div></div></div><div class="risk_input_wrap centerfix textarea_zh" id='+setIndex(question.code)+'><span>此处可输入500字</span><textarea class="risk_input" placeholder="请输入" data-objName='+objName+' data-fieldname='+question.fieldName+'></textarea></div><div id="risk_btn"></div>  ';
    }else{
        sDiv_TEXTAREA.innerHTML='<div class="risk"><h2>'+question.name+'</h2></div><div class="risk_input_wrap centerfix textarea_zh" id='+setIndex(question.code)+'><span>此处可输入500字</span><textarea class="risk_input" placeholder="请输入" data-fieldname='+question.fieldName+'></textarea></div><div id="risk_btn"></div>  ';
    }
    oSection.appendChild(sDiv_TEXTAREA);
}
function create_Integer(question,oul){    //   INTEGER类型
    if(question.inputUnit==null){
        question.inputUnit="";
    }
    if(question.require){
        oul.innerHTML+='<li class="integer_zh" data-fieldname=' + question.fieldName + ' data-islabel='+ question.isLabel + ' data-isdynamicshow='+question.isDynamicShow +' data-require='+question.require +' data-controlshow='+question.isControlShow +' id='+setIndex(question.code)+'><div class="left"><span>*</span><i>'+question.name+'</i></div><div class="right"><input type="tel" placeholder="请输入'+question.name+'"/><b class="yuan">' + question.inputUnit + '</b></div></li>';
    }else{
        oul.innerHTML='<li class="integer_zh" data-fieldname=' + question.fieldName + ' data-islabel='+ question.isLabel + ' data-isdynamicshow='+question.isDynamicShow +' data-require='+question.require +' data-controlshow='+question.isControlShow +' id='+setIndex(question.code)+'><div class="left"><span>&nbsp;&nbsp;</span><i>'+question.name+'</i></div><div class="right"><input type="tel" placeholder="请输入'+question.name+'"/><b class="yuan">' + question.inputUnit + '</b></div></li>';
    }
}
function create_Checkbox(question,oul,objName){    //   CHECKBOX类型  


		
	    var codeDicList_check=question.codeDicList;
        var oUl_wrap_checkbox=document.createElement("ul");
        oUl_wrap_checkbox.className="clicktab";
        for(var i=0;i<codeDicList_check.length;i++){
            var checkbox_li=document.createElement("li");
            checkbox_li.innerHTML='<div class="chenckbox_zh"><label class="chenckboxNews_zh"><input type="checkbox" style="display: none"><img src="img/jx_icon.png"><span style="color:rgb(160, 160, 165);font-size:0.42rem">'+codeDicList_check[i].name+'</span></label></div>';
            oUl_wrap_checkbox.appendChild(checkbox_li);
        }
        var sWrap_checkbox=document.createElement("div");	
        sWrap_checkbox.appendChild(oUl_wrap_checkbox);
	    oul.innerHTML+=sWrap_checkbox.innerHTML;
			
}
function create_String(question,oul){     //STRING类型
    if(question.require){
        oul.innerHTML+='<li class="string_zh" data-fieldname=' + question.fieldName + ' data-islabel='+ question.isLabel + ' data-isdynamicshow='+question.isDynamicShow +' data-require='+question.require +' data-controlshow='+question.isControlShow +' id='+setIndex(question.code)+'><div class="left"><span>*</span><i>'+question.name+'</i></div><div class="right"><input type="text" placeholder="'+question.name+'"/></div></li>';
    }else{
        oul.innerHTML+='<li class="string_zh" data-fieldname=' + question.fieldName + ' data-islabel='+ question.isLabel + ' data-isdynamicshow='+question.isDynamicShow +' data-require='+question.require +' data-controlshow='+question.isControlShow +' id='+setIndex(question.code)+'><div class="left"><span>&nbsp;&nbsp;</span><i>'+question.name+'</i></div><div class="right"><input type="text" placeholder="'+question.name+'"/></div></li>';
    }
}
function create_Code(question,oul,objName){    //CODE类型
    if(question.require){
        if(question.codeDicList.length<3){
            //两个radio的样式
            oul.innerHTML+='<li class="code_zh_two" data-fieldname=' + question.fieldName + ' data-islabel='+ question.isLabel + ' data-isdynamicshow='+question.isDynamicShow +' data-require='+question.require +' data-controlshow='+question.isControlShow +' id='+setIndex(question.code)+'><div class="left"><span>*</span><i>'+question.name+'</i></div><div class="right"><strong class="s1" data-codeDicListCode='+question.codeDicList[0].code +' ><em class="s2no"></em></strong><b class="b_zh">'+question.codeDicList[0].name+'</b><strong class="s3" data-codeDicListCode='+question.codeDicList[1].code +'><em class="s2no"></em></strong><b class="b_zh">'+question.codeDicList[1].name+'</b></div></li>';
		    //特殊处理信贷员建议部分
/*            if(objName=="bossAdvise"){
                //alert(111);
                var checkbox_Wrap_zan=document.createElement("div");
                var checkbox_Wrap_kehu=document.createElement("div");
                var checkbox_Temporary_zan=document.createDocumentFragment();
                var checkbox_Temporary_kehu=document.createDocumentFragment();
                var num001=9;//模拟中安拒绝的复选框个数
                var num002=6;//模拟客户拒绝的复选框个数
                for(var j=0;j<num001;j++){
                    var checkbox_Li_zan=document.createElement("li");
                    checkbox_Li_zan.className="zhongan";
                    checkbox_Li_zan.innerHTML='<div class="chenckbox_zh"><label class="chenckboxNews_zh"><input type="checkbox" style="display: none"/><img src="img/jx_icon.png"/><span style="color:rgb(160, 160, 165);font-size:0.42rem">企业经营异常</span></label></div>';
                    checkbox_Temporary_zan.appendChild(checkbox_Li_zan);
                }
                for(var j=0;j<num002;j++){
                    var checkbox_Li_kehu=document.createElement("li");
                    checkbox_Li_kehu.className="kehu";
                    checkbox_Li_kehu.innerHTML='<div class="chenckbox_zh"><label class="chenckboxNews_zh"><input type="checkbox" style="display: none"/><img src="img/jx_icon.png"/><span style="color:rgb(160, 160, 165);font-size:0.42rem">不接受还款方式</span></label></div>';
                    checkbox_Temporary_kehu.appendChild(checkbox_Li_kehu);
                }
                checkbox_Wrap_zan.appendChild(checkbox_Temporary_zan);
                checkbox_Wrap_kehu.appendChild(checkbox_Temporary_kehu);
                //console.log(checkbox_Wrap.innerHTML);
                oul.innerHTML+='<ul class=clicktab><li class="reason"><div class="left"><span>*</span><i>拒绝原因</i></div><div class="right"><strong class="s1"><em class="s2no"></em></strong><b class="b_zh">中安拒绝</b><strong class="s3"><em class="s2no"></em></strong><b class="b_zh">客户拒绝</b></div></li><li><div class="left"><span>*</span><i>具体原因</i></div></li>'+checkbox_Wrap_zan.innerHTML +checkbox_Wrap_kehu.innerHTML+'</ul>';
            }*/
        }else{
            //含有遮罩的形式的样式
           var sCode_three_DivWrap=document.createElement("div");
            //sCode_three_DivWrap.id="empty";
            sCode_three_DivWrap.innerHTML='<div id="mask" class="hide_zh"><div class="mask_bg"></div><ul></ul></div>';
            var oCode_three_Ul=sCode_three_DivWrap.getElementsByTagName("ul")[0];
            var codeDicList=question.codeDicList;
            for(var i=0;i<codeDicList.length;i++){
                (function(){
                    var sCode_three_li=document.createElement("li");
                    sCode_three_li.setAttribute("data-code",codeDicList[i].code);
                    sCode_three_li.innerHTML=codeDicList[i].name;
                    oCode_three_Ul.appendChild(sCode_three_li);
                }(i));
            }
            var sCode_cancel=document.createElement("li");
            sCode_cancel.className="cancel";
            sCode_cancel.innerHTML="取消";
            oCode_three_Ul.appendChild(sCode_cancel);
            //var ooo=sCode_three_DivWrap.innerHTML;
            //console.log(ooo);
            oul.innerHTML+='<li class="code_zh_three" data-fieldname=' + question.fieldName + ' data-islabel='+ question.isLabel + ' data-isdynamicshow='+question.isDynamicShow +' data-require='+question.require +' data-controlshow='+question.isControlShow +' id='+setIndex(question.code)+'><div class="left"><span>*</span><i>'+question.name+'</i></div><div class="right" id="chose1401"><span class="choose" id="titleChoose">请选择</span><img src="img/down_icon.png" class="select"/></div>'+sCode_three_DivWrap.innerHTML+'</li>';
        }
    }else{
        //不必填
        if(question.codeDicList.length<3){
            //两个radio的样式
            oul.innerHTML+='<li class="code_zh_two" data-fieldname=' + question.fieldName + ' data-islabel='+ question.isLabel + ' data-isdynamicshow='+question.isDynamicShow +' data-require='+question.require +' data-controlshow='+question.isControlShow +' id='+setIndex(question.code)+'><div class="left"><span>&nbsp;&nbsp;</span><i>'+question.name+'</i></div><div class="right"><strong class="s1" data-codeDicListCode='+question.codeDicList[0].code +' ><em class="s2no"></em></strong><b class="b_zh">'+question.codeDicList[0].name+'</b><strong class="s3" data-codeDicListCode='+question.codeDicList[1].code +'><em class="s2no"></em></strong><b class="b_zh">'+question.codeDicList[1].name+'</b></div></li>';
        }else{
            //含有遮罩的形式的样式
            var sCode_three_DivWrap=document.createElement("div");
            //sCode_three_DivWrap.id="empty";
            sCode_three_DivWrap.innerHTML='<div id="mask" class="hide_zh"><div class="mask_bg"></div><ul></ul></div>';
            var oCode_three_Ul=sCode_three_DivWrap.getElementsByTagName("ul")[0];
            var codeDicList=question.codeDicList;
            for(var i=0;i<codeDicList.length;i++){
                (function(){
                    var sCode_three_li=document.createElement("li");
                    sCode_three_li.setAttribute("data-code",codeDicList[i].code);
                    sCode_three_li.innerHTML=codeDicList[i].name;
                    oCode_three_Ul.appendChild(sCode_three_li);
                }(i));
            }
            //var ooo=sCode_three_DivWrap.innerHTML;
            //console.log(ooo);
            oul.innerHTML+='<li class="code_zh_three" data-fieldname=' + question.fieldName + ' data-islabel='+ question.isLabel + ' data-isdynamicshow='+question.isDynamicShow +' data-require='+question.require +' data-controlshow='+question.isControlShow +' id='+setIndex(question.code)+'><div class="left"><span>*</span><i>'+question.name+'</i></div><div class="right" id="chose1401"><span class="choose" id="titleChoose">请选择</span><img src="img/down_icon.png" class="select"/></div>'+sCode_three_DivWrap.innerHTML+'</li>';
        }
    }
}
function create_Address(question,oul){   //SSQADDRESS类型
    if(question.require){
        oul.innerHTML+='<li class="ssqaddress_zh" data-fieldname=' + question.fieldName + ' data-islabel='+ question.isLabel + ' data-isdynamicshow='+question.isDynamicShow +' data-require='+question.require +' data-controlshow='+question.isControlShow +' id='+setIndex(question.code)+'><div class="left"><span>*</span><i>'+question.name+'</i></div><div class="right"><span class="choose">请选择</span><img src="../img/down_icon.png" class="select select_4"/></div></li>';

    }else{
        oul.innerHTML+='<li class="ssqaddress_zh" data-fieldname=' + question.fieldName + ' data-islabel='+ question.isLabel + ' data-isdynamicshow='+question.isDynamicShow +' data-require='+question.require +' data-controlshow='+question.isControlShow +' id='+setIndex(question.code)+'><div class="left"><span>&nbsp;&nbsp;</span><i>'+question.name+'</i></div><div class="right"><span class="choose">请选择</span><img src="../img/down_icon.png" class="select select_4"/></div></li>';
    }
}
function create_Telephone(question,oul){   //TELEPHONE类型
    if(question.require){
        oul.innerHTML+='<li class="telephone_zh" data-fieldname=' + question.fieldName + ' data-islabel='+ question.isLabel + ' data-isdynamicshow='+question.isDynamicShow +' data-require='+question.require +' data-controlshow='+question.isControlShow +' id='+setIndex(question.code)+'><div class="left"><span>*</span><i>单位电话</i></div><div class="right phone"><input type="number" placeholder="区号"/><b>-</b><input type="number" placeholder="电话号码"/><b>-</b><input type="number" placeholder="分机号"/></div></li>';
    }else{
        oul.innerHTML+='<li class="telephone_zh" data-fieldname=' + question.fieldName + ' data-islabel='+ question.isLabel + ' data-isdynamicshow='+question.isDynamicShow +' data-require='+question.require +' data-controlshow='+question.isControlShow +' id='+setIndex(question.code)+'><div class="left"><span>&nbsp;&nbsp;</span><i>单位电话</i></div><div class="right phone"><input type="number" placeholder="区号"/><b>-</b><input type="number" placeholder="电话号码"/><b>-</b><input type="number" placeholder="分机号"/></div></li>';
    }
}

/*动态生成函数结束*/

//分割code字符串
    function setIndex(code){
        var str="";
        str=code.split(".").join("");
        return str;
    }







