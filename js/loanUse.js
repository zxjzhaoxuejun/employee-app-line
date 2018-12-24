//创建内容模块
var createModel={
	//table类型的的初始化
	tableType:function(modelDetailSubListArry){
		//modelDetailSubListArry:每一大块里面的数据综合
		//存储全局modelDetailSubListArry数据在createModel对象里面，变成共有变量，以便其他的作用域使用。
		this.modelDetailSubListArry=modelDetailSubListArry;
		//获取code值用于元素的id名字
		var _id=modelDetailSubListArry.code.split(".").join("");		
		//运行推入Table表单类型函数
		this.createTable(_id);		
	},
	//input类型的的初始化
	inputType:function(modelDetailSubListArry){
	//modelDetailSubListArry:每一大块里面的数据综合
	//存储全局modelDetailSubListArry数据在createModel对象里面，变成共有变量，以便其他的作用域使用。
	this.modelDetailSubListArry=modelDetailSubListArry;
	//获取code值用于元素的id名字
	var _id=modelDetailSubListArry.code.split(".").join("");		
	//运行推入Table表单类型函数
	this.createInput(_id);
	},
	createTable:function(id){
		//把大模块的所有数据的种类用data存到下面的div里面dataArry		
		$("<div class='problem' id='" + id + "'><p>" + this.modelDetailSubListArry.name + "<img src='img/add_icon.png' class='add addjianBtn'><img src='img/jian_icon.png' class='jian addjianBtn'></p><div class='cy zhucy'></div><ul></ul></div>").appendTo($("section")).data("dataArry",this.modelDetailSubListArry);				
		//要推入大列表里面的小列表数据总和
		var questionDetailList=this.modelDetailSubListArry.questionDetailList;		
		for(var i=0;i<questionDetailList.length;i++){
			//获取推入类型
			var inputTypes=questionDetailList[i].inputType;
			switch(inputTypes){
				case "CODE":this.create_Code(id,questionDetailList[i]);break;
				case "CHECKBOX":this.create_Checkbox(id,questionDetailList[i]);break;
				case "ADDRESS":this.create_Address(id,questionDetailList[i]);break;
				case "DATE":this.create_Date(id,questionDetailList[i]);break;
				case "DOUBLE":this.create_Double(id,questionDetailList[i]);break;
				case "INTEGER":this.create_Integer(id,questionDetailList[i]);break;
				case "STRING":this.create_String(id,questionDetailList[i]);break;
				case "TELEPHONE":this.create_Telephone(id,questionDetailList[i]);break;
				case "TEXTAREA":this.create_Textarea(id,questionDetailList[i]);break;
			};
		};
		//用来判断哪些li元素的的isLabel是"1"
		showHtml.judgeIsLabel(id);
		//判断返回答案是否为空
		this.judgeData(id);
	},
	createInput:function(id){
		$("<div class='problem' id='" + id + "'><p>" + this.modelDetailSubListArry.name + "</p><ul></ul></div>").appendTo($("section")).data("dataArry",this.modelDetailSubListArry);
		//要推入大列表里面的小列表数据总和
		var questionDetailList=this.modelDetailSubListArry.questionDetailList;
		for(var i=0;i<questionDetailList.length;i++){
			//获取推入类型
			var inputTypes=questionDetailList[i].inputType;
			switch(inputTypes){
				case "CODE":this.create_Code(id,questionDetailList[i]);break;
				case "CHECKBOX":this.create_Checkbox(id,questionDetailList[i]);break;
				case "ADDRESS":this.create_Address(id,questionDetailList[i]);break;
				case "DATE":this.create_Date(id,questionDetailList[i]);break;
				case "DOUBLE":this.create_Double(id,questionDetailList[i]);break;
				case "INTEGER":this.create_Integer(id,questionDetailList[i]);break;
				case "STRING":this.create_String(id,questionDetailList[i]);break;
				case "TELEPHONE":this.create_Telephone(id,questionDetailList[i]);break;
				case "TEXTAREA":this.create_Textarea(id,questionDetailList[i]);break;
			};
		};
		//用来判断哪些li元素的的isLabel是"1"
		showHtml.judgeIsLabel(id);
		//判断返回答案是否为空
		this.judgeData(id);
	},
//	创建模块Code方法
	create_Code:function(id,questionDetailList){
		//questionDetailList:大列表里面的小列表数据总和
		var pushElem=$('#'+id).children("ul");
//		id:是附在大块的ID名
		if(questionDetailList.codeDicList.length==2){			
			var _elem='<li>'+
						'<div class="left">'+
							'<span>&nbsp;&nbsp;</span>'+
							'<i>' + questionDetailList.name + '</i>'+
						'</div>'+
						'<div class="right">'+
							'<label>'+
							'<input name='+questionDetailList.code+'-radio'+' type="radio" data-code='+questionDetailList.codeDicList[0].code+'>'+
							 questionDetailList.codeDicList[0].name+
							'<i></i>'+
							'</label>'+
							'<label>'+
							'<input name='+questionDetailList.code+'-radio'+' type="radio" data-code='+questionDetailList.codeDicList[1].code+'>'+
							questionDetailList.codeDicList[1].name+
							'<i></i>'+
							'</label>'+
						'</div>'+
					 '</li>';
			var elem=$(_elem);
			//在li的元素以code值设置为id名
			elem.attr("id",questionDetailList.code.split(".").join(""));			
			//把制定自己的questionDetailList:大列表里面的小列表数据总和存到元素里面用dataArry
			elem.data("dataArry",questionDetailList);
			elem.attr("data-fieldName",questionDetailList.fieldName);
			elem.appendTo(pushElem);
		}else if(questionDetailList.codeDicList.length>2){
			var _elem='<li>'+
						'<div class="left">'+
							'<span>&nbsp;&nbsp;</span>'+
							'<i>' + questionDetailList.name + '</i>'+
						'</div>'+
						'<div class="right">'+
							'<span class="choose" data-code="">请选择</span><img src="img/down_icon.png" class="select"/>'
						'</div>'
					  '</li>';
			var elem=$(_elem);
			//在li的元素以code值设置为id名
			elem.attr("id",questionDetailList.code.split(".").join(""));
			//把制定自己的questionDetailList:大列表里面的小列表数据存到元素里面用dataArry
			elem.data("dataArry",questionDetailList);
			elem.attr("data-fieldName",questionDetailList.fieldName);
			elem.appendTo(pushElem);		 
		}
	},
	//创建"Checkbox"模块
	create_Checkbox:function(id,questionDetailList){
		//id:是附在大块的ID名
		//questionDetailList:大列表里面的小列表数据总和
		var pushElem=$('#'+id).children("ul");
		var _elem='<li>'+
						'<div class="left">'+
							'<span>&nbsp;&nbsp;</span>'+
							'<i>' + questionDetailList.name + '</i>'+
						'</div>'+
						'<div class="right chenckbox">'+													
						'</div>'+
					'</li>';
		var elem=$(_elem);
		//在.right的元素以code值设置为id名
		elem.attr("id",questionDetailList.code.split(".").join(""));
		//把制定自己的questionDetailList:大列表里面的小列表数据存到元素里面用dataArry
		elem.data("dataArry",questionDetailList);
		elem.attr("data-fieldName",questionDetailList.fieldName);
		for(var i=0;i<questionDetailList.codeDicList.length;i++){			
			var codeDicList_name=questionDetailList.codeDicList[i].name;
			var _chenckboxNewsELe='<label class="chenckboxNews">'+
									'<input type="checkbox" style="display:none"/>'+
									'<img src="img/jx_icon.png">'+
									'<span>'+codeDicList_name+'</span>'+
								  '</label>'
			var chenckboxNewsELe=$(_chenckboxNewsELe);			
			chenckboxNewsELe.data("dataArry",questionDetailList.codeDicList[i]);
			chenckboxNewsELe.find("input").attr("data-code",questionDetailList.codeDicList[i]["code"]);
			elem.find(".chenckbox").append(chenckboxNewsELe);		
		}
		elem.appendTo(pushElem);			
	},
	//创建Address模块
	create_Address:function(id,questionDetailList){
		//id:是附在大块的ID名
		//questionDetailList:大列表里面的小列表数据总和
		var pushElem=$('#'+id).children("ul");
		var _elem='<li class="address">'+
						'<div class="left">'+
							'<span>&nbsp;&nbsp;</span>'+
							'<i>' + questionDetailList.name + '</i>'+
						'</div>'+
						'<div class="right" onclick="">'+
							'<span class="choose" name="" guid="">请选择</span>'+
							'<img src="img/down_icon.png" class="select"/>'+
						'</div>'+
						'<div class="x-address">'+
							'<p>'+
								'<span>&nbsp;&nbsp;</span>'+
								'<i>详细地址</i>'+
							'</p>'+
							'<p>'+
								'<input type="text" placeholder="请输入详细地址" />'
							'</p>'+
						'</div>'+
					'</li>';
		var elem=$(_elem);
		elem.attr("id",questionDetailList.code.split(".").join(""));
		elem.find(".right").attr("id",questionDetailList.code.split(".").join("")+"-address");
		elem.data("dataArry",questionDetailList);
		elem.attr("data-fieldName",questionDetailList.fieldName);
		elem.appendTo(pushElem);		
	},
	//创建Date模块	
	create_Date:function(id,questionDetailList){
		//id:是附在大块的ID名
		//questionDetailList:大列表里面的小列表数据总和
		var pushElem=$('#'+id).children("ul");
		var _elem='<li>'+
						'<div class="left">'+
							'<span>&nbsp;&nbsp;</span>'+
							'<i>' + questionDetailList.name + '</i>'+
						'</div>'+
						'<div class="right chenckbox" data-pluginDateNoOff="off">'+
							'<input type="text" readonly name="input_date" placeholder="日期选择" data-lcalendar="1988-01-11,2020-05-29"/>'	+			
						'</div>'+
					'</li>';
		var elem=$(_elem);
		elem.attr("id",questionDetailList.code.split(".").join(""));
		elem.find(".right input").attr("id","date-"+questionDetailList.code.split(".").join(""));
		elem.data("dataArry",questionDetailList);
		elem.attr("data-fieldName",questionDetailList.fieldName);
		elem.appendTo(pushElem);		
	},
	//创建Double模块
	create_Double:function(id,questionDetailList){
		//id:是附在大块的ID名
		//questionDetailList:大列表里面的小列表数据总和
		var pushElem=$('#'+id).children("ul");
		//placeholder输入框默认文字内容
		var placeholder="请输入"+questionDetailList.name;
		var _elem='<li>'+
						'<div class="left">'+
							'<span>&nbsp;&nbsp;</span>'+
							'<i>' + questionDetailList.name + '</i>'+
						'</div>'+
						'<div class="right chenckbox">'+
							'<input type="number" placeholder='+placeholder+'>'+
							'<span></span>'+
						'</div>'+
					'</li>';
		var elem=$(_elem);
		if(questionDetailList.inputUnit!=null){
			elem.find(".right span").text(questionDetailList.inputUnit);
		};
		elem.attr("id",questionDetailList.code.split(".").join(""));
		elem.data("dataArry",questionDetailList);
		elem.attr("data-fieldName",questionDetailList.fieldName);
		elem.appendTo(pushElem);			
	},
	//创建Integer模块
	create_Integer:function(id,questionDetailList){
		//id:是附在大块的ID名
		//questionDetailList:大列表里面的小列表数据总和
		var pushElem=$('#'+id).children("ul");
		var _elem='<li>'+
						'<div class="left">'+
							'<span>&nbsp;&nbsp;</span>'+
							'<i>' + questionDetailList.name + '</i>'+
						'</div>'+
						'<div class="right chenckbox">'+
							'<input type="number" placeholder="请输入'+questionDetailList.name+'" />'+
							'<span></span>'+
						'</div>'+
					'</li>';
		var elem=$(_elem);
		if(questionDetailList.inputUnit!=null){
			elem.find(".right span").text(questionDetailList.inputUnit);
		};
		elem.attr("id",questionDetailList.code.split(".").join(""));
		elem.data("dataArry",questionDetailList);
		elem.attr("data-fieldName",questionDetailList.fieldName);
		elem.appendTo(pushElem);
	},
	//创建String模块
	create_String:function(id,questionDetailList){
			//id:是附在大块的ID名
		//questionDetailList:大列表里面的小列表数据总和
		var pushElem=$('#'+id).children("ul");
		//placeholder输入框默认文字内容
		var placeholder="请输入"+questionDetailList.name;
		var _elem='<li>'+
						'<div class="left">'+
							'<span>&nbsp;&nbsp;</span>'+
							'<i>' + questionDetailList.name + '</i>'+
						'</div>'+
						'<div class="right chenckbox">'+
							'<input type="text" placeholder='+placeholder+'>'+
							'<span></span>'+
						'</div>'+
					'</li>';
		var elem=$(_elem);
		if(questionDetailList.inputUnit!=null){
			elem.find(".right span").text(questionDetailList.inputUnit);
		}
		elem.attr("id",questionDetailList.code.split(".").join(""));
		elem.data("dataArry",questionDetailList);
		elem.attr("data-fieldName",questionDetailList.fieldName);
		elem.appendTo(pushElem);			
	},
	//创建TELEPHONE模块
	create_Telephone:function(id,questionDetailList){
		//id:是附在大块的ID名
		//questionDetailList:大列表里面的小列表数据总和
		var pushElem=$('#'+id).children("ul");
		//placeholder输入框默认文字内容
		var placeholder="请输入"+questionDetailList.name;
		var _elem='<li>'+
						'<div class="left">'+
							'<span>&nbsp;&nbsp;</span>'+
							'<i>' + questionDetailList.name + '</i>'+
						'</div>'+
						'<div class="right chenckbox">'+
							'<input type="number" placeholder="区号">'+
//							'<b>-</b>'+
							'<input type="number" placeholder="电话号码"/>'+
//							'<b>-</b>'+
							'<input type="number" placeholder="分机号"/>'+
							'<span></span>'+
						'</div>'+
					'</li>';
		var elem=$(_elem);
		if(questionDetailList.inputUnit!=null){
			elem.find(".right span").text(questionDetailList.inputUnit);
		}
		elem.attr("id",questionDetailList.code.split(".").join(""));
		elem.data("dataArry",questionDetailList);
		elem.attr("data-fieldName",questionDetailList.fieldName);
		elem.appendTo(pushElem);			
	},
	//创建textarea模块
	create_Textarea:function(id,questionDetailList){
		//id:是附在大块的ID名
		//questionDetailList:大列表里面的小列表数据总和
		var pushElem=$('#'+id).children("ul");
		//placeholder输入框默认文字内容
		var placeholder="请输入"+questionDetailList.name;
		var _elem='<li>'+												
						'<textarea name="" rows="" cols="" placeholder="请输入" ></textarea>'+
						'<span></span>'+
					'</li>';
		var elem=$(_elem);
		if(questionDetailList.inputUnit!=null){
			elem.find(".right span").text(questionDetailList.inputUnit);
		}
		elem.attr("id",questionDetailList.code.split(".").join(""));
		elem.data("dataArry",questionDetailList);
		elem.attr("data-fieldName",questionDetailList.fieldName);
		elem.appendTo(pushElem);
	},
	//创建单选2个以上遮罩层
	radioMaskLayer:function(that,dataArry) {
		//that指的是点击的对象
		//dataArry是小列表数据的综合
		var MaskLayer=$('<div id="mask"><div class="mask_bg"></div><ul><li class="cancel">取消</li></ul></div>');
		var eleArry=[];
		for(var i=0;i<dataArry.codeDicList.length;i++){
			var _ele='<li data-code='+dataArry.codeDicList[i].code+'>'+dataArry.codeDicList[i].name+'</li>';
			eleArry.push(_ele);	
		};
		$(eleArry.join(""));
		//创建单选框的遮罩层
		MaskLayer.find(".cancel").before($(eleArry.join("")));
		MaskLayer.appendTo("body");
		//创建单选框的遮罩层的取消按钮绑定事件
		$("#mask .cancel").on("click",function(){
			$(this).closest("#mask").remove();
		});
		//选择选项时的按钮绑定事件
		$("#mask li").not(".cancel").on("click",function(){
			that.find(".choose").attr("data-code",$(this).attr("data-code")).text($(this).text());
			//给关联的table小块点击赋值
			showHtml.tabel_table_pactContent(that.closest("li"));
			//动态显示控制
			showHtml.controlShow(that);
			$(this).closest("#mask").remove();
		});		
	},
	//判断返回数据的数组或者对象是否为空(返回true有；false空)
	judgeData:function(id){		
		var objName=this.modelDetailSubListArry.objName;
		//console.log(showcarData.jsonData_answer[objName]);
		//判断返回的答案是否有没有数据
		if(showHtml.judgeDataEmpt(showHtml.jsonData_modelOjbName_Answer[objName])){
			var parent=$("#"+id);
			//linenoMaxMin:用于存储lineNo的最大值。
			var linenoMaxMin=null;
			if(parent.data("dataArry")["type"]=="TABLE"){
				for(var i=0;i<showHtml.jsonData_modelOjbName_Answer[objName].length;i++){
					if(linenoMaxMin==null){						
						linenoMaxMin=showHtml.jsonData_modelOjbName_Answer[objName][i]["lineNo"];
					}else{
						if(linenoMaxMin<showHtml.jsonData_modelOjbName_Answer[objName][i]["lineNo"]){
							linenoMaxMin=showHtml.jsonData_modelOjbName_Answer[objName][i]["lineNo"];
						}
					};
					$("<span>未定义</span>").appendTo("#"+id+" .cy").data("answer",showHtml.jsonData_modelOjbName_Answer[objName][i])
					.attr("data-lineno",showHtml.jsonData_modelOjbName_Answer[objName][i]["lineNo"]);
				};
				//把最高值得lineNo赋给.problem的元素
				parent.attr("data-lineno",linenoMaxMin);
				parent.find(".cy span").eq(0).attr("data-select",'select');
			}else if(parent.data("dataArry")["type"]=="INPUT"){
				parent.data("answer",showHtml.jsonData_modelOjbName_Answer[objName]);
			}			
		}else{
			//判断是什么数据类型是Input还是table
			if(this.modelDetailSubListArry.type=="TABLE"){
				var linenoMaxMin=1;
				var elem=$("<span data-select='select'>未定义</span>").appendTo("#"+id+" .cy").attr("data-lineno",linenoMaxMin).data("answer",{"lineNo":linenoMaxMin});
				$("#"+id).attr("data-lineno",linenoMaxMin);
			}			
		};
	}		
};
var bindingEvent={
	//tabel里面的addjianBtn按钮事件
	addjianBtn:function(){
		$(document).on("touchend",".addjianBtn",function(){
			//parentEle父元素li
			var parentEle=$(this).closest(".problem");
			//max_index：最大可以添加多少个
			var max_index=parentEle.data("dataArry").answerLimit;
			//max_index为0意思是无限大
			if(max_index==0){
				max_index=999;
			}
			if($(this).hasClass("add")){
				parentEle.find(".cy span img").remove();
				//判断必填项是否全部完成
				judgeFinish.judge($(this));
				//数据的保存
				showHtml.saveDataTool($(this));
				if(parentEle.find(".cy span").length<max_index){
					var a=$("<span></span>").appendTo(parentEle.find(".cy")).attr("data-select",'select').siblings().attr("data-select",'').end();
					var lineno=Number(parentEle.attr("data-lineno"))+1;				
					parentEle.attr("data-lineno",lineno);					
					a.data("answer",{"lineNo":lineno,"serialNo":showHtml.jsonData_answer_serialNo});
					a.attr("data-lineno",lineno);					
					//初始化数据的赋值到相对应的元素之后,使用tabel_pact的小块文字渲染
					showHtml.tabel_pact();
				};
			//样式格式化	
			showHtml.againElem($(this));			
			}else if($(this).hasClass("jian")){
				parentEle.find(".cy span img").remove();
				//数据的保存
				showHtml.saveDataTool();
				if(parentEle.find(".cy span").length!=1){
					parentEle.find(".cy span").append('<img src="img/close_icon.png"/ class="closeEleBtn">');
				};								
			};						
		});
	},
	//删除关闭按钮事件
	closeEleBtn:function(){
		$(document).on("click",".closeEleBtn",function(){
			var that=$(this);
			var closelse=that.closest("span");
			var cyEle=that.closest(".cy");
			$('<div id="mask"><div class="mask_bg"></div><div class="remove"><p class="_sc">您确认要删除吗？<img class="_ci" src="img/close_icon.png"/><p class="_qr">确认</p></div></div>').appendTo("body");
			$("._ci").click(function(){
				$(".cy span img").remove();
                $("#mask").remove();
            });
            $("._qr").click(function(){
            	closelse.remove();
                $("#mask").remove();
                cyEle.find("span").eq(0).attr("data-select",'select').siblings().attr("data-select",'')
                $(".cy span img").remove();
                //数据的展现
              	showData.showData();
            });
		});
	},
	//多选按钮事件
	checkBoxBtn:function(){
		$(document).on("click",".chenckbox label",function(){
			var parentEle=$(this).closest("li");
			var checkBr=$(this).find("input").prop("checked");
			//复选框选中效果
			if(checkBr){
				$(this).css("color","#191919");
				$(this).find("img").attr("src","img/jxt_icon.png");								
			}else{
				$(this).css("color","#a0a0a5");
				$(this).find("img").attr("src","img/jx_icon.png");				
			};
			//动态显示
			showHtml.controlShow($(this));
			//判断是否为标签，是的话用来对小框框的赋值
			var checkBoxSelectContentArry=[];
			if(parentEle.data("dataArry").isLabel=="1"){
				var checkContent=$(this).find("span").text();
				var cyele=$(this).closest("div.problem").find(".cy span[data-select='select']");
				//var checkBoxSelectContentArry=[];
				var checkBoxSelectContentString="";
				$(this).closest(".right").find("input:checked").each(function(){
					if($(this).prop("checked")){
						checkBoxSelectContentArry.push($(this).nextAll("span").text());						
					};
				});
				checkBoxSelectContentString=checkBoxSelectContentArry.join("、");
				if(checkBoxSelectContentString.length>5){
					checkBoxSelectContentString=checkBoxSelectContentString.substring(0,5);
				};
				cyele.text(checkBoxSelectContentString);
				if(cyele.text()==""){
					cyele.text(parentEle.data("dataArry")["name"]);
				};
			};
		});
	},
	//tabel的小方块选择
	tabelsmallBoxBtn:function(){
		$(document).on("click",".zhucy span",function(){
			//判断必填项是否全部完成
			judgeFinish.judge($(this));
			//数据的保存
			showHtml.saveDataTool($(this));
			$(this).attr("data-select",'select').siblings().attr("data-select","");
			//样式格式化.problem里面的ul的元素内容
			showHtml.againElem($(this));
			//初始化数据的赋值到相对应的元素之后,使用tabel_pact的小块文字渲染
			showHtml.tabel_pact();
			//数据的渲染
          	showData.showData();
		})
	},
	//单选框点击事件
	radioBtn:function(){
		$(document).on("click",".right",function(){
			var that=$(this);
			//dataArry是从li取出的小列表数据总和
			var dataArry=$(this).closest("li").data("dataArry");
			if(dataArry.inputType=="CODE"){				
				if(dataArry.codeDicList.length==2){
					tworadio($(this));
					//table小块文字填充,暂时只有code类型的判断，如有什么更新另加方法。
					showHtml.tabel_table_pactContent($(this));
//					动态显示
					showHtml.controlShow(that);
				}else if(dataArry.codeDicList.length>2){
					moreTwoRadio(that,dataArry);
				};
			};			
		});
		//两个单选事件
		var tworadio=function(that){
			that.find("input").each(function(){
				if($(this).prop("checked")){
					$(this).nextAll("i").css("display","block");
				}else{
					$(this).nextAll("i").css("display","none");
				};				
			});
		};
		//多余两个单选事件
		var moreTwoRadio=function(that,dataArry){
			createModel.radioMaskLayer(that,dataArry);
			//判断选择是否是空的颜色字体的改变
			if(that.attr("data-code")==""){
				that.find(".choose").css({"color":"#a09fa4"});
			}else{
				that.find(".choose").css({"color":"#191919"});
			};			
		};
	},
	//date模块的btn点击事件
	dateBtn:function(){
		$(document).on("click",".right",function(){
			var that=$(this);
			//dataArry是从li取出的小列表数据总和
			var dataArry=$(this).closest("li").data("dataArry");
			if(dataArry.inputType=="DATE"){
				var id="#"+that.find("input").attr("id");
				var pluginDateNoOff=$(this).attr("data-pluginDateNoOff");
				var calendar;
				if(pluginDateNoOff=="off"){
					calendar=new lCalendar();
					$(this).attr("data-pluginDateNoOff","no");
					showHtml.plugin_date(id,calendar);
				}else if(pluginDateNoOff=="no"){
					showHtml.plugin_date(id,calendar);
				};				
			};			
		});
	},
	//Address模块点击事件
	address:function(){
		$(document).on("click",".right",function(){
			//dataArry是从li取出的小列表数据总和
			var dataArry=$(this).closest("li").data("dataArry");
			if(dataArry.inputType=="ADDRESS"){
				adree($(this).attr("id"));
			}
		});
	},
	//.right的input标签失去焦点时候要执行 的事件，主要是用他来改变table里面的小块的的文字内容
	rightinput_blur:function(){
		$(document).on("blur",".right input",function(){
			showHtml.tabel_table_pactContent($(this));
		});
	},
	//提交按钮
	submitBtn:function(){
		$(document).on("click","footer",function(){
			//判断是否填完
			judgeFinish.judge();
			//全局保存数据
			showHtml.saveDataTool();
			var a=showHtml.clearUpData();
			//判断是必选项是否完成，返回状态值
			var parent=$("section div.problem");
			parent.each(function(){
				var dataArry=$(this).data("dataArry");
				if(dataArry["type"]=="INPUT"){
					if($(this).attr("data-judgefinish")=="no"){
						a["completeStatus"]="1";
						return false;
					}else{
						a["completeStatus"]="2";
					};
				}else if(dataArry["type"]=="TABLE"){
					var judgefinishEleMum=$(this).find('.cy span[data-judgefinish="no"]').length;
					if(judgefinishEleMum>0){
						a["completeStatus"]="1";
						return false;
					}else if(judgefinishEleMum==0){
						a["completeStatus"]="2";
					};
				};
			});
			AndroidJs.saveWjDetalAnswer(a)
			
		});
	}		
};
var judgeFinish={
	//判断必填项是否有填入，若没有填入值得话，
	//若大块类型为table的，在小块里面添加自定义属性data-judgeFinish为no
	//若大块类型为input的，在这大块标签里面添加自定义属性data-judgeFinish为no
	//judge()方法必须在，table里面的.cy span的data-select="select"改变之前使用
	judge:function(that){
		//that传入的是大块里面的的元素，若没有传值就直接全部判断
		var _that=this;
		if(that){
			var parent=that.closest(".problem");
			var check_ele=parent.find('ul li[data-require="true"]').filter(":visible");
			check_ele.each(function(){
				var dataArry=$(this).data("dataArry");
				//this.judgeBr:使用来判断必填项是否为空，空的话返回true，
				_that.judgeBr="";
				switch(dataArry["inputType"]){
					case "CODE":_that.judge_code($(this),dataArry,parent);break;
					case "CHECKBOX":_that.judge_checkbox($(this),dataArry,parent);break;
					case "ADDRESS":_that.judge_address($(this),dataArry,parent);break;
					case "DATE":_that.judge_date($(this),dataArry,parent);break;
					case "DOUBLE":_that.judge_double($(this),dataArry,parent);break;
					case "INTEGER":_that.judge_integer($(this),dataArry,parent);break;
					case "STRING":_that.judge_string($(this),dataArry,parent);break;
					case "TELEPHONE":_that.judge_telephone($(this),dataArry,parent);break;
				};
				//this.judgeBr是true的话就跳出这个循环,就可以判断它没有填完
				if(_that.judgeBr=="true"){
					return false;
				};
			});
		}else{
			$("section .problem").each(function(){
				var check_ele=$(this).find('ul li[data-require="true"]').filter(":visible");
				var parent=$(this);
				check_ele.each(function(){
					var dataArry=$(this).data("dataArry");
					//this.judgeBr:使用来判断必填项是否为空，空的话返回true，
					_that.judgeBr="";
					switch(dataArry["inputType"]){
						case "CODE":_that.judge_code($(this),dataArry,parent);break;
						case "CHECKBOX":_that.judge_checkbox($(this),dataArry,parent);break;
						case "ADDRESS":_that.judge_address($(this),dataArry,parent);break;
						case "DATE":_that.judge_date($(this),dataArry,parent);break;
						case "DOUBLE":_that.judge_double($(this),dataArry,parent);break;
						case "INTEGER":_that.judge_integer($(this),dataArry,parent);break;						
						case "STRING":_that.judge_string($(this),dataArry,parent);break;
						case "TELEPHONE":_that.judge_telephone($(this),dataArry,parent);break;
					};
					//this.judgeBr是true的话就跳出这个循环,就可以判断它没有填完
					if(_that.judgeBr=="true"){
						return false;
					};
				})
			})
		}
	},
	//判断code
	judge_code:function(that,dataArry,parent){
		//that:是带数据的li
		//dataArry:li里面的数据
		//parent:是大块的元素类名为.problem
		//parentDataArry:大块的数据
		var parentDataArry=parent.data("dataArry");
		if(dataArry["codeDicList"].length==2){
			if(parent.data("dataArry")["type"]=="TABLE"){
				var select_ele=parent.find('.cy span[data-select="select"]');
				if(that.find(".right input:checked").length==0){
					select_ele.attr("data-judgeFinish","no");
					this.judgeBr="true";
				}else if(that.find(".right input:checked").length!=0){
					select_ele.attr("data-judgeFinish","");
				};								
			}else if(parent.data("dataArry")["type"]=="INPUT"){
				if(that.find(".right input:checked").length==0){
					parent.attr("data-judgeFinish","no");
					this.judgeBr="true";
				}else if(that.find(".right input:checked").length!=0){
					parent.attr("data-judgeFinish","");
				};				
			};			
		}else if(dataArry["codeDicList"].length>2){
			if(parent.data("dataArry")["type"]=="TABLE"){
				var select_ele=parent.find('.cy span[data-select="select"]');
				if(!that.find(".right .choose").attr("data-code")){
					select_ele.attr("data-judgeFinish","no");
					this.judgeBr="true";
				}else{
					select_ele.attr("data-judgeFinish","");
				};				
			}else if(parent.data("dataArry")["type"]=="INPUT"){
				if(!that.find(".right .choose").attr("data-code")){
					parent.attr("data-judgeFinish","no");
					this.judgeBr="true";
				}else{
					parent.attr("data-judgeFinish","");
				}
			};
		};
	},
	//判断"CHECKBOX"
	judge_checkbox:function(that,dataArry,parent){
		//that:是带数据的li
		//dataArry:li里面的数据
		//parent:是大块的元素类名为.problem
		//parentDataArry:大块的数据
		var parentDataArry=parent.data("dataArry");
		if(parent.data("dataArry")["type"]=="TABLE"){
			var select_ele=parent.find('.cy span[data-select="select"]');
			if(that.find(".right input:checked").length==0){
				select_ele.attr("data-judgeFinish","no");
				this.judgeBr="true";
			}else if(that.find(".right input:checked").length!=0){
				select_ele.attr("data-judgeFinish","");
			};				
		}else if(parent.data("dataArry")["type"]=="INPUT"){
			if(that.find(".right input:checked").length==0){
				parent.attr("data-judgeFinish","no");
				this.judgeBr="true";
			}else if(that.find(".right input:checked").length!=0){
				parent.attr("data-judgeFinish","");
			};
		};
	},
	//判断Address
	judge_address:function(that,dataArry,parent){
		//that:是带数据的li
		//dataArry:li里面的数据
		//parent:是大块的元素类名为.problem
		//parentDataArry:大块的数据
		var parentDataArry=parent.data("dataArry");
		if(parent.data("dataArry")["type"]=="TABLE"){
			var select_ele=parent.find('.cy span[data-select="select"]');
			if(!that.find(".right .choose").attr("guid")){
				select_ele.attr("data-judgeFinish","no");
				this.judgeBr="true";
			}else{
				select_ele.attr("data-judgeFinish","");
			};				
		}else if(parent.data("dataArry")["type"]=="INPUT"){
			if(!that.find(".right .choose").attr("guid")){
				parent.attr("data-judgeFinish","no");
				this.judgeBr="true";
			}else{
				parent.attr("data-judgeFinish","");
			};
		};
	},
	//判断Date
	judge_date:function(that,dataArry,parent){
		//that:是带数据的li
		//dataArry:li里面的数据
		//parent:是大块的元素类名为.problem
		//parentDataArry:大块的数据
		var parentDataArry=parent.data("dataArry");
		if(parent.data("dataArry")["type"]=="TABLE"){
			var select_ele=parent.find('.cy span[data-select="select"]');
			if(!that.find(".right input").val()){
				select_ele.attr("data-judgeFinish","no");
				this.judgeBr="true";
			}else{
				select_ele.attr("data-judgeFinish","");
			};				
		}else if(parent.data("dataArry")["type"]=="INPUT"){
			if(!that.find(".right input").val()){
				parent.attr("data-judgeFinish","no");
				this.judgeBr="true";
			}else{
				parent.attr("data-judgeFinish","");
			};
		};
	},
	//判断Double
	judge_double:function(that,dataArry,parent){
		//that:是带数据的li
		//dataArry:li里面的数据
		//parent:是大块的元素类名为.problem
		//parentDataArry:大块的数据
		var parentDataArry=parent.data("dataArry");
		if(parent.data("dataArry")["type"]=="TABLE"){
			var select_ele=parent.find('.cy span[data-select="select"]');
			if(!that.find(".right input").val()){
				select_ele.attr("data-judgeFinish","no");
				this.judgeBr="true";
			}else{
				select_ele.attr("data-judgeFinish","");
			};				
		}else if(parent.data("dataArry")["type"]=="INPUT"){
			if(!that.find(".right input").val()){
				parent.attr("data-judgeFinish","no");
				this.judgeBr="true";
			}else{
				parent.attr("data-judgeFinish","");
			};
		};
	},
	//判断Integer模块
	judge_integer:function(that,dataArry,parent){
		//that:是带数据的li
		//dataArry:li里面的数据
		//parent:是大块的元素类名为.problem
		//parentDataArry:大块的数据
		var parentDataArry=parent.data("dataArry");
		if(parent.data("dataArry")["type"]=="TABLE"){
			var select_ele=parent.find('.cy span[data-select="select"]');
			if(!that.find(".right input").val()){
				select_ele.attr("data-judgeFinish","no");
				this.judgeBr="true";
			}else{
				select_ele.attr("data-judgeFinish","");
			};				
		}else if(parent.data("dataArry")["type"]=="INPUT"){
			if(!that.find(".right input").val()){
				parent.attr("data-judgeFinish","no");
				this.judgeBr="true";
			}else{
				parent.attr("data-judgeFinish","");
			};
		};
	},
	//判断String
	judge_string:function(that,dataArry,parent){
		//that:是带数据的li
		//dataArry:li里面的数据
		//parent:是大块的元素类名为.problem
		//parentDataArry:大块的数据
		var parentDataArry=parent.data("dataArry");
		if(parent.data("dataArry")["type"]=="TABLE"){
			var select_ele=parent.find('.cy span[data-select="select"]');
			if(!that.find(".right input").val()){
				select_ele.attr("data-judgeFinish","no");
				this.judgeBr="true";
			}else{
				select_ele.attr("data-judgeFinish","");
			};				
		}else if(parent.data("dataArry")["type"]=="INPUT"){
			if(!that.find(".right input").val()){
				parent.attr("data-judgeFinish","no");
				this.judgeBr="true";
			}else{
				parent.attr("data-judgeFinish","");
			};
		};
	},
	//判断TELEPHONE
	judge_telephone:function(that,dataArry,parent){
		//that:是带数据的li
		//dataArry:li里面的数据
		//parent:是大块的元素类名为.problem
		//parentDataArry:大块的数据
		var parentDataArry=parent.data("dataArry");
		if(parent.data("dataArry")["type"]=="TABLE"){
			var select_ele=parent.find('.cy span[data-select="select"]');
			var mun=0;
			that.find(".right input").each(function(){
				if($(this).val()){
					mun++;
				}
			});			
			if(mun>=2){
				select_ele.attr("data-judgeFinish","no");
				this.judgeBr="true";
			}else{
				select_ele.attr("data-judgeFinish","");
			};				
		}else if(parent.data("dataArry")["type"]=="INPUT"){
			var mun=0;
			that.find(".right input").each(function(){
				if($(this).val()){
					mun++;
				}
			});
			if(mun>=2){
				parent.attr("data-judgeFinish","no");
				this.judgeBr="true";
			}else{
				parent.attr("data-judgeFinish","");
			};
		};
	},
	//判断Textarea
	judge_telephone:function(that,dataArry,parent){
		//that:是带数据的li
		//dataArry:li里面的数据
		//parent:是大块的元素类名为.problem
		//parentDataArry:大块的数据
		var parentDataArry=parent.data("dataArry");
		if(parent.data("dataArry")["type"]=="TABLE"){
			var select_ele=parent.find('.cy span[data-select="select"]');
			if(!that.find(".right textarea").val()){
				select_ele.attr("data-judgeFinish","no");
				this.judgeBr="true";
			}else{
				select_ele.attr("data-judgeFinish","");
			};				
		}else if(parent.data("dataArry")["type"]=="INPUT"){
			if(!that.find(".right textarea").val()){
				parent.attr("data-judgeFinish","no");
				this.judgeBr="true";
			}else{
				parent.attr("data-judgeFinish","");
			};
		};
	}
};
//数据的保存
var saveData={
	//单独块存储table数据
	singleSaveData_table:function(that,bigDataArry){
		//存储总对象saveData
		var _that=this;
		//that:表示点击的元素
		//bigDataArry:表示大块的数据里面的所有数据
		//DataEle_li:表示数据的li
		var DataEle_li=that.closest(".problem").find("ul").children("li:visible");
		//设置answerTotal为saveData共有变量用来存储修改总答案
		this.answerTotal={};
		DataEle_li.each(function(){
			var dataArry=$(this).data("dataArry");
			//answerName答案名字
			var answerName=dataArry.fieldName;
			//inputType用于判断是什么小数据类型，在根据不同的数据类型来实行不同
			var inputType=dataArry.inputType;
			switch(inputType){
				case "CODE":_that.save_Code($(this),dataArry,answerName);break;
				case "CHECKBOX":_that.save_Checkbox($(this),dataArry,answerName);break;
				case "ADDRESS":_that.save_Address($(this),dataArry,answerName);break;
				case "DATE":_that.save_Date($(this),dataArry,answerName);break;
				case "DOUBLE":_that.save_Double($(this),dataArry,answerName);break;
				case "INTEGER":_that.save_Integer($(this),dataArry,answerName);break;
				case "STRING":_that.save_String($(this),dataArry,answerName);break;
				case "TEXTAREA":_that.save_Textarea($(this),dataArry,answerName);break;
				case "TELEPHONE":_that.save_Telephone($(this),dataArry,answerName);break;
			}
		});	
		this.giveData_table(false,that);		
	},
	//单独块存储input数据
	singleSaveData_input:function(that,bigDataArry){		
		//存储总对象saveData
		var _that=this
		//that:表示点击的元素
		//bigDataArry:表示大块的数据里面的所有数据
		//DataEle_li:表示数据的li
		var DataEle_li=that.closest(".problem").find("ul").children("li:visible");
		//设置answerTotal为saveData共有变量用来存储修改总答案
		this.answerTotal={};
		DataEle_li.each(function(){
			var dataArry=$(this).data("dataArry");
			//answerName答案名字
			var answerName=dataArry.fieldName;
			//inputType用于判断是什么小数据类型，在根据不同的数据类型来实行不同
			var inputType=dataArry.inputType;
			switch(inputType){
				case "CODE":_that.save_Code($(this),dataArry,answerName);break;
				case "CHECKBOX":_that.save_Checkbox($(this),dataArry,answerName);break;
				case "ADDRESS":_that.save_Address($(this),dataArry,answerName);break;
				case "DATE":_that.save_Date($(this),dataArry,answerName);break;
				case "DOUBLE":_that.save_Double($(this),dataArry,answerName);break;
				case "INTEGER":_that.save_Integer($(this),dataArry,answerName);break;
				case "STRING":_that.save_String($(this),dataArry,answerName);break;
				case "TEXTAREA":_that.save_Textarea($(this),dataArry,answerName);break;
				case "TELEPHONE":_that.save_Telephone($(this),dataArry,answerName);break;
			}
		});	
		this.giveData_input(false,that);
	},
	//单独块存储table数据赋予给.cy span[data-select="select"]元素里面,打开会把所有的tabel块的数据存储到.cy span[data-select="select"]，无需填写第二个参数
	//可以单独拿出来使用的赋值
	giveData_table:function(br,that){
		var _that=this;
		//br输入的是布尔值，用来判断是否开启页面的全部table赋值，true为开启，false为关闭
		//注意：这里面把数据存储到.cy span[data-select="select"]里面，并且在改变data-select="select"时候先执行存储数据
		if(!br){
			var parentSingle_table=that.closest(".problem");
			var giveDataEle=parentSingle_table.find(".cy").children('span[data-select="select"]');
			var mustObject={"lineNo":giveDataEle.attr("data-lineno"),"serialNo":showHtml.jsonData_answer_serialNo}
			this.answerTotal=$.extend(this.answerTotal,mustObject);	
			giveDataEle.data("answer",this.answerTotal);
			this.answerTotal={};
		}else{
			this.answerTotal={};
			$("section").children(".problem").each(function(){				
				var dataArry=$(this).data("dataArry");				
				if(dataArry.type=="TABLE"){					
					$(this).find("ul").children("li:visible").each(function(){						
						var dataArry=$(this).data("dataArry");
						//answerName答案名字
						var answerName=dataArry.fieldName;
						//inputType用于判断是什么小数据类型，在根据不同的数据类型来实行不同
						var inputType=dataArry.inputType;
						switch(inputType){
							case "CODE":_that.save_Code($(this),dataArry,answerName);break;
							case "CHECKBOX":_that.save_Checkbox($(this),dataArry,answerName);break;
							case "ADDRESS":_that.save_Address($(this),dataArry,answerName);break;
							case "DATE":_that.save_Date($(this),dataArry,answerName);break;
							case "DOUBLE":_that.save_Double($(this),dataArry,answerName);break;
							case "INTEGER":_that.save_Integer($(this),dataArry,answerName);break;
							case "STRING":_that.save_String($(this),dataArry,answerName);break;
							case "TEXTAREA":_that.save_Textarea($(this),dataArry,answerName);break;
							case "TELEPHONE":_that.save_Telephone($(this),dataArry,answerName);break;
						};						
					});
				var giveDataEle=$(this).find(".cy").children('span[data-select="select"]');
				var mustObject={"lineNo":giveDataEle.attr("data-lineno"),"serialNo":showHtml.jsonData_answer_serialNo};
				_that.answerTotal=$.extend(_that.answerTotal,mustObject);	
				giveDataEle.data("answer",_that.answerTotal);
				_that.answerTotal={};
				};				
			});			
		};
	},
	giveData_input:function(br,that){
		var _that=this;
		//br输入的是布尔值，用来判断是否开启页面的全部table赋值，true为开启，false为关闭
		//注意：这里面把数据存储到.problem里面
		if(!br){
			var parentSingle_table=that.closest(".problem");
			var mustObject={"serialNo":showHtml.jsonData_answer_serialNo}
			this.answerTotal=$.extend(this.answerTotal,mustObject);	
			parentSingle_table.data("answer",this.answerTotal);			
			this.answerTotal={};
		}else{
			this.answerTotal={};
			$("section").children(".problem").each(function(){
				var dataArry=$(this).data("dataArry");				
				if(dataArry.type=="INPUT"){					
					$(this).find("ul").children("li").each(function(){						
						var dataArry=$(this).data("dataArry");
						//answerName答案名字
						var answerName=dataArry.fieldName;
//						console.log(answerName);
						//inputType用于判断是什么小数据类型，在根据不同的数据类型来实行不同
						var inputType=dataArry.inputType;
//						console.log(inputType);
						switch(inputType){
						case "CODE":_that.save_Code($(this),dataArry,answerName);break;
							case "CODE":_that.save_Code($(this),dataArry,answerName);break;
							case "CHECKBOX":_that.save_Checkbox($(this),dataArry,answerName);break;
							case "ADDRESS":_that.save_Address($(this),dataArry,answerName);break;
							case "DATE":_that.save_Date($(this),dataArry,answerName);break;
							case "DOUBLE":_that.save_Double($(this),dataArry,answerName);break;
							case "INTEGER":_that.save_Integer($(this),dataArry,answerName);break;
							case "STRING":_that.save_String($(this),dataArry,answerName);break;
							case "TEXTAREA":_that.save_Textarea($(this),dataArry,answerName);break;
							case "TELEPHONE":_that.save_Telephone($(this),dataArry,answerName);break;
						};						
					});
				var mustObject={"serialNo":showHtml.jsonData_answer_serialNo}
				_that.answerTotal=$.extend(_that.answerTotal,mustObject);
				$(this).data("answer",_that.answerTotal);
				_that.answerTotal={};
				};				
			});			
		}
	},
	//Code数据的存储
	save_Code:function(that,dataArry,answerName){
		//that:表示数据的li
		//dataArry:li里面的小列表数据
		//answerName:答案名字
		if(dataArry.codeDicList.length==2){
			if(that.find("input:checked").length==0){				
				this.answerTotal[answerName]=null;
			}else{
				this.answerTotal[answerName]=that.find("input:checked").attr("data-code");
			}
		}else if(dataArry.codeDicList.length>2){
			if(!that.find(".right span").attr("data-code")){				
				this.answerTotal[answerName]=null;
			}else{
				this.answerTotal[answerName]=that.find("span.choose").attr("data-code");
			}
		}		
	},
	//Checkbox数据的存储
	save_Checkbox:function(that,dataArry,answerName){
		//that:表示数据的li
		//dataArry:li里面的小列表数据
		//answerName:答案名字
		var dataArry=[];
		that.find("label input:checked").each(function(){
			var _data=$(this).closest("label").data("dataArry");
			dataArry.push(_data.code);	
		});
		var data=dataArry.join(",");
		if(data==""){
			this.answerTotal[answerName]=null;	
		}else{
			this.answerTotal[answerName]=data;	
		};			
	},
	//Address数据存储
	save_Address:function(that,dataArry,answerName){
		//that:表示数据的li
		//dataArry:li里面的小列表数据
		//answerName:答案名字
		var dataArry=[];
		if(that.find("span.choose").attr("guid")){
			if(that.find(".x-address input").val()){
				dataArry.push(that.find("span.choose").attr("guid"));
				dataArry.push(that.find(".x-address input").val());
				var data=dataArry.join("||");
				this.answerTotal[answerName]=data;
			}else{
				this.answerTotal[answerName]=that.find("span.choose").attr("guid")			
			}
		}else{
			this.answerTotal[answerName]=null;
		}
	},
	//Date数据存储
	save_Date:function(that,dataArry,answerName){
		//that:表示数据的li
		//dataArry:li里面的小列表数据
		//answerName:答案名字
		var data=that.find("input").val();
		if(data){
			this.answerTotal[answerName]=data;
		}else{
			this.answerTotal[answerName]=null;
		}		
	},
	//Double数据的存储
	save_Double:function(that,dataArry,answerName){
		//that:表示数据的li
		//dataArry:li里面的小列表数据
		//answerName:答案名字
		var data=that.find("input").val();
		//方案一：控制了input的值不能小于0
//		var data=that.find("input").val();
//		if(!data){
//			this.answerTotal[answerName]=null;
//		}else if(data<0){
//			this.answerTotal[answerName]="0";
//			that.find("input").val(0);
//		}else if(data>0){
//			this.answerTotal[answerName]=data;
//		}
		//方案二：没有控制了input的值,可以负数和正数
		if(!data){
			this.answerTotal[answerName]=null;
		}else{
			this.answerTotal[answerName]=data;
		}
	},
	//Integer数据的存储
	save_Integer:function(that,dataArry,answerName){
		//that:表示数据的li
		//dataArry:li里面的小列表数据
		//answerName:答案名字		
		var data=that.find("input").val();
		//方案一：控制了input的值不能小于0
//		if(!data){
//			this.answerTotal[answerName]=null;
//		}else if(data<0){
//			this.answerTotal[answerName]="0";
//			that.find("input").val(0);
//		}else if(data>0){
//			this.answerTotal[answerName]=data;
//		}
		//方案二：没有控制了input的值,可以负数和正数
		if(!data){
			this.answerTotal[answerName]=null;
		}else{
			this.answerTotal[answerName]=data;
		}		
	},
	//String数据的存储
	save_String:function(that,dataArry,answerName){
		//that:表示数据的li
		//dataArry:li里面的小列表数据
		//answerName:答案名字
		var data=that.find("input").val();
		if(!data){
			this.answerTotal[answerName]=null;
		}else{
			this.answerTotal[answerName]=data;
		};
	},
	//Textarea数据的存储
	save_Textarea:function(that,dataArry,answerName){
		//that:表示数据的li
		//dataArry:li里面的小列表数据
		//answerName:答案名字
		var data=that.find("textarea").val();
		if(!data){
			this.answerTotal[answerName]=null;
		}else{
			this.answerTotal[answerName]=data;
		};
	},
	//TELEPHONE数据的存储
	save_Telephone:function(that,dataArry,answerName){
		//that:表示数据的li
		//dataArry:li里面的小列表数据
		//answerName:答案名字
		var telephoneArry=[];
		that.find(".right input").each(function(){
			if($(this).val()){
				telephoneArry.push($(this).val());
			};
		});
		if(telephoneArry.length!=0){
			var telephone=telephoneArry.join("-");
			this.answerTotal[answerName]=telephone;
		}else{
			this.answerTotal[answerName]=null;
		};		
	}
};
var showHtml={
	//初始化数据
	showHtml:function(jsonData){
		var that=this;
		var jsonData_common=jsonData;		
		//把传过来的总数据jsonData用data()传入section标签里面dataArry。
		$("<section></section>").appendTo($("body")).data("dataArry",jsonData_common);		
		$('<footer id="next" onclick=""><p>确定</p></footer>').insertAfter('section');
		//存储全局jsonData数据在showHtml里面以便其他的作用域使用
		this.jsonData_common=jsonData;
		console.log(this.jsonData_common);
		//存储modelOjbName数据用于answer答案的2级类型类型名字。
		this.jsonData_modelOjbName=this.jsonData_common["modelOjbName"];
		//存储answer答案3级底层类型的数据。
		this.jsonData_modelOjbName_Answer=this.jsonData_common["answer"][this.jsonData_modelOjbName];
		//存储answer答案的serialNo的值
		this.jsonData_answer_serialNo=this.jsonData_common["answer"]["serialNo"];
		for(var i=0;i<this.jsonData_common["modelDetailSubList"].length;i++){
			var modeltype=this.jsonData_common["modelDetailSubList"][i].type;
			//this.jsonData_common["modelDetailSubList"][i]把每一大块的信息传值
			//下面的判断是判断每一大块的类型
			if(modeltype=="TABLE"){
				createModel.tableType(this.jsonData_common["modelDetailSubList"][i]);
			}else if(modeltype=="INPUT"){
				createModel.inputType(this.jsonData_common["modelDetailSubList"][i]);
			};
		};
		//事件的绑定—start********************************************
		//addjianBtn加减绑定
		bindingEvent.addjianBtn();
		//删除关闭按钮事件
		bindingEvent.closeEleBtn();
		//多选按钮事件
		bindingEvent.checkBoxBtn();
		//tabel的小方块选择
		bindingEvent.tabelsmallBoxBtn();
		//单选框点击事件
		bindingEvent.radioBtn();
		//.right的input标签失去焦点事件
		bindingEvent.rightinput_blur();
		//Address模块点击事件
		bindingEvent.address();
		//date模块的btn点击事件
		bindingEvent.dateBtn()
		//提交按钮
		bindingEvent.submitBtn()
		//事件的绑定—end********************************************		
		//初始化数据的赋值到相对应的元素之后,使用tabel的小块文字渲染
		this.tabel_pact();		
		//初始化隐藏小数据里面的isDynamicShow=1的li，进行隐藏.
		this.judgeIsDynamicShow();
		//重点必填打信号星号
		this.starred();
		//初始化动态验证isDynamicCheck:"1"有哪些元素标签
		//checkData.checkDataEle();
		//验证动态显示有哪些元素标签，一般情况下动态显示标签的类型为code,若是动态控制现实的时候isControlShow="1"
		//在动态显示的元素里面添加datat-controlShow="1"的自定义属性
		this.checking_controlShow();
		//数据的展现
		showData.showData();
	},
	//判断是否有传回来的数据
	judgeDataEmpt:function(judgedata){
		//judgedata:是对应的大块的答案数据
		if(judgedata instanceof Array){
			if(judgedata.length>0){
				return true;
			}else{
				return false;
			}
		}else {
			var index=0;
			for(var i in judgedata){
				index++;
				if(index!=0){
					return true;
				};
			};
			return false;
		}
	},
	//判断是否是关联标签，每条小数据里面isLabel:"1"表示是关联标签,"0"表示不是关联标签
	judgeIsLabel:function(id){
		//id:指元素的id名,这个元素一定要在.problem元素里面
		var parent=$("#"+id).closest("div.problem");
		var parent_li=parent.children("ul").children("li");
		parent_li.each(function(){			
			var dataArry=$(this).data("dataArry");
			if(dataArry.isLabel=="1"){
				$(this).attr("data-isLabel","1");
			};
		});		
	},
	//初始化数据的赋值到相对应的元素之后,使用tabel_pact的小块文字渲染
	tabel_pact:function(){
		$("section .problem").each(function(){
			var dataArry=$(this).data("dataArry");
			if(dataArry.type=="TABLE"){
				//查找li关联标签元素
				var ele=$(this).find('li[data-isLabel="1"]');
				//tabel_pactEle获取tabel里面的.cy的span元素
				var tabel_pactEle=$(this).find(".cy span");
				var dataArry2=ele.data("dataArry");
				//jsonObject:用来适配,dode值对应什么名字
				var jsonObject={};
				var fieldName="";
				//下面的判断li的类型，根据类型的不同执行不同的取值(最主要的作用是CODE、CHECKBOX的code值转移)
				if(dataArry2.inputType=="CODE"||dataArry2.inputType=="CHECKBOX"){
					for(var i=0;i<dataArry2["codeDicList"].length;i++){
						jsonObject[dataArry2["codeDicList"][i]["code"]]=dataArry2["codeDicList"][i]["name"];
					}
					fieldName=dataArry2.fieldName;
				}else{
					fieldName=dataArry2.fieldName;
				};
				//tabel_pactEle标题小块
				tabel_pactEle.each(function(){
					var answer=$(this).data("answer");
					var content="";
					if(answer){
						if(answer[fieldName]==null){
							content=dataArry2["name"];
						}else if(answer[fieldName].split(",").length==1){
							if(dataArry2.inputType=="CODE"||dataArry2.inputType=="CHECKBOX"){
								var _content=jsonObject[answer[fieldName].split(",")[0]];							
								content+=_content;
							}else{
								var _content=answer[fieldName];	
								content+=_content;
							}
						}else{
							for(var i=0;i<answer[fieldName].split(",").length;i++){
								var _content=jsonObject[answer[fieldName].split(",")[i]]+"，";
								content+=_content;
							};
						};
						if(content.length>5){
							content=content.substring(0,5);
						};
						$(this).text(content);
					}else{
						content=dataArry2["name"];
						if(content.length>5){
							content=content.substring(0,5);
						};
						$(this).text(content);
					};
				});
			};
		});
	},
	//table小块文字填充,暂时只有code、string类型的判断，如有什么更新另加方法，这个函数方法需要放在事件的里面促发，来修改table的小块文字
	tabel_table_pactContent:function(that){
		//that:是事件的促发元素，必须是大块里面带数据的li里面的的元素
		//parentEle_li是大块里面带数据的li
		var parentEle_li=that.closest('li');
		if(parentEle_li.attr("data-islabel")=="1"){
			//parentEle是大块
			var parentEle=parentEle_li.closest("div.problem");
			var dataArry=parentEle_li.data("dataArry");
			//现在只有code、string类型的判断
			var table={
				table_code:function(){
					if(dataArry["codeDicList"].length==2){
						var content=parentEle_li.find(".right input:checked").closest("label").text();
						if(content.length>5){
							content=content.substring(0,5);
						}
						parentEle.find(".cy span[data-select='select']").text(content);
					}else if(dataArry["codeDicList"].length>2){
						var content=parentEle_li.find(".right span.choose").text();
						if(content.length>5){
							content=content.substring(0,5);
						}
						parentEle.find(".cy span[data-select='select']").text(content);
					};	
				},
				tabel_String:function(){
					var content=parentEle_li.find(".right input").val();
					if(content.length>5){
						content=content.substring(0,5);
					}
					parentEle.find('.cy span[data-select="select"]').text(content)
				}
			};
			switch(dataArry["inputType"]){
				case "CODE":table.table_code();break;
				case "STRING":table.tabel_String();break;
			};			
		}
	},
	//日期插件
	plugin_date:function(id,pluginName){
		//id:是传入的input的id，格式：#id名字；
		//pluginName:是new出来的日期插件名字
		pluginName.init({
			"trigger":id,
			"type":"date"
		});
	},
	//初始化隐藏小数据里面的isDynamicShow=1是进行隐藏,0为显示
	judgeIsDynamicShow:function(that){
		//that:是.problem里面的元素标签，不能超过.problem标签
		//that没有参数的时候，是全局的li进行判断（使用在刚刚初始化时使用），若有传值的时候是大块里面的li进行判断（进行特定的大块使用，例如数据的展示或者样式初始的时候）
		if(that){
			var parent=that.closest(".problem");
			parent.children("ul").children("li").each(function(){
				var isDynamicShow=$(this).data("dataArry")["isDynamicShow"];
				$(this).attr("data-isDynamicShow",isDynamicShow);
				if(isDynamicShow=="1"){
					$(this).css({"display":"none"});
				};
			});
		}else{
			$("section .problem ul li").each(function(){
				var isDynamicShow=$(this).data("dataArry")["isDynamicShow"];
				$(this).attr("data-isDynamicShow",isDynamicShow);
				if(isDynamicShow=="1"){
					$(this).css({"display":"none"});
				};
			});
		};		
	},
	//重点必填打信号星号
	starred:function(){
		var parent_problem=$("section .problem ul li");
		parent_problem.each(function(){
			var require_br=$(this).data("dataArry")["require"];
			if(require_br){
				$(this).find(".left span").text("*").end().attr("data-require",true);				
			}else{
				$(this).attr("data-require",false);	
			}
		})
	},
	//验证动态显示有哪些元素标签，一般情况下动态显示标签的类型为code,若是动态控制现实的时候isControlShow="1"
	//在动态显示的元素里面添加datat-controlShow="1"的自定义属性
	checking_controlShow:function(){
		var parent_problem=$("section .problem ul li");
		parent_problem.each(function(){
			var require_br=$(this).data("dataArry")["isControlShow"];
			if(require_br=="1"){
				$(this).attr("data-controlShow","1");				
			}else{
				$(this).attr("data-controlShow","0");	
			}
		});
	},
	//控制动态显示函数，
	controlShow:function(that){
		//that:指的是标签类名.problem元素里面的li元素,若有that的话单独控制里面的动态显示.
		//一般用一个事件状态激发这个函数进行动态显示
		var controlShow_type={
			show_code:function(that,dataArry){
				//that:一般传的是带数据,并且动态控制的li
				//dataArry：li里面的数据
				//codeLength:是单选项的长度
				var codeLength=dataArry["codeDicList"].length;
				var parnet=that.closest("ul");
				var controlObject={}
				if(codeLength==2){
					var check_ele=that.find("input:checked");
//					console.log(check_ele);
					if(check_ele.length!=0){
						var data_code=check_ele.attr("data-code");
						//方案一，只管自己的内容显示，其他的隐藏
//						for(var i=0;i<dataArry["appControlShowRule"].length;i++){
//							var controlKeyArry=dataArry["appControlShowRule"][i]["key"].split(",");
//							controlKeyArry.push("/");
//							controlKeyArry.unshift("/");
//							controlKeyArry=controlKeyArry.join("");								
//							var controlkey=eval(controlKeyArry);
//							//判断正则与选项的选择是否匹配
//							if(controlkey.test(data_code)){
//								that.closest("ul").children("li").css({"display":"none"});
//								for(var j=0;j<dataArry["appControlShowRule"][i]["code"].length;j++){									
//									var id_content="#"+dataArry["appControlShowRule"][i]["code"][j].split(".").join("");
//									$(id_content).css({"display":"block"});
//								};
//								that.css({"display":"block"});
//								break;
//							}else{
//								that.closest("ul").children("li").css({"display":"none"}).filter('[data-isDynamicShow="0"]').css({"display":"block"});
//								that.css({"display":"block"});
//							};
//						};
						//方案二，单独控制自己的内容显示隐藏，其他不受影响
						for(var i=0;i<dataArry["appControlShowRule"].length;i++){
							for(var j=0;j<dataArry["appControlShowRule"][i]["code"].length;j++){
								console.log(1);
								var id_content=dataArry["appControlShowRule"][i]["code"][j].split(".").join("");
								parnet.find("#"+id_content).css({"display":"none"});	
							};
						};
						for(var i=0;i<dataArry["appControlShowRule"].length;i++){
							var controlKeyArry=dataArry["appControlShowRule"][i]["key"].split(",");
							controlKeyArry.push("/");
							controlKeyArry.unshift("/");
							controlKeyArry=controlKeyArry.join("");								
							var controlkey=eval(controlKeyArry);
							//判断正则与选项的选择是否匹配
							if(controlkey.test(data_code)){
								for(var j=0;j<dataArry["appControlShowRule"][i]["code"].length;j++){									
									var id_content="#"+dataArry["appControlShowRule"][i]["code"][j].split(".").join("");
									parnet.find(id_content).css({"display":"block"});
								};
							}else{
								console.log("正则匹配不到相对应的动态控制标签");
							};
						}
							
					};
				}else if(codeLength>2){
					if(that.find(".right .choose").attr("data-code")){
						var data_code=that.find(".right .choose").attr("data-code");
						if(data_code){
							//方案一，只管自己的内容显示，其他的隐藏
//							for(var i=0;i<dataArry["appControlShowRule"].length;i++){
//								//提取key的值,并且把key值变成正则
//								var controlKeyArry=dataArry["appControlShowRule"][i]["key"].split(",");
//								controlKeyArry.push("/");
//								controlKeyArry.unshift("/");
//								controlKeyArry=controlKeyArry.join("");								
//								var controlkey=eval(controlKeyArry);
//								//判断正则与选项的选择是否匹配
//								if(controlkey.test(data_code)){
//									that.closest("ul").children("li").css({"display":"none"});
//									for(var j=0;j<dataArry["appControlShowRule"][i]["code"].length;j++){									
//										var id_content="#"+dataArry["appControlShowRule"][i]["code"][j].split(".").join("");
//										$(id_content).css({"display":"block"});
//									};
//									that.css({"display":"block"});
//									break;
//								}else{
//									that.closest("ul").children("li").css({"display":"none"}).filter('[data-isDynamicShow="0"]').css({"display":"block"});
//									that.css({"display":"block"});	
//								};
//							};
							//方案二，单独控制自己的内容显示隐藏，其他不受影响
							for(var i=0;i<dataArry["appControlShowRule"].length;i++){
								for(var j=0;j<dataArry["appControlShowRule"][i]["code"].length;j++){
									var id_content=dataArry["appControlShowRule"][i]["code"][j].split(".").join("");
									parnet.find("#"+id_content).css({"display":"none"});	
								};
							};
							for(var i=0;i<dataArry["appControlShowRule"].length;i++){
								//提取key的值,并且把key值变成正则
								var controlKeyArry=dataArry["appControlShowRule"][i]["key"].split(",");
								controlKeyArry.push("/");
								controlKeyArry.unshift("/");
								controlKeyArry=controlKeyArry.join("");								
								var controlkey=eval(controlKeyArry);
								//判断正则与选项的选择是否匹配
								if(controlkey.test(data_code)){
									//如果匹配到的话，显示相对应的li
									for(var j=0;j<dataArry["appControlShowRule"][i]["code"].length;j++){									
										var id_content="#"+dataArry["appControlShowRule"][i]["code"][j].split(".").join("");
										parnet.find(id_content).css({"display":"block"});
									};	
								}else{
									//如果匹配不到的话
									console.log("正则匹配不到相对应的动态控制标签");
								}
							};
							
						};						
					};
				};
			},
			show_checkbox:function(that,dataArry){
				//that:一般传的是带数据,并且动态控制的li
				//dataArry：li里面的数据
				var check_ele=that.find("input:checked");
				if(check_ele.length!=0){					
					for(var i=0;i<dataArry["appControlShowRule"].length;i++){
						//提取key的值,并且把key值变成正则
						var controlKeyArry=dataArry["appControlShowRule"][i]["key"].split(",");
						controlKeyArry.push("/");
						controlKeyArry.unshift("/");
						controlKeyArry=controlKeyArry.join("");								
						var controlkey=eval(controlKeyArry);
						check_ele.each(function(){
							
						})
					}
				}
			}
		};
		if(that){
			var controlShow_li=that.closest("li:visible");
			if(controlShow_li.attr("data-controlshow")=="1"){
				controlShow_li.each(function(){
				 	var dataArry=$(this).data("dataArry");
				 	switch(dataArry["inputType"]){
				 		case "CODE":controlShow_type.show_code($(this),dataArry);break;
				 		case "CHECKBOX":controlShow_type.show_checkbox($(this),dataArry);break;
				 	};		 		 	
				});
			}			
		}else{
			
		};				
	},
	//数据保存的自动方法工具
	saveDataTool:function(that){
		//that有数据表示是块里面存储数据，没有参数的话代表是全部数据存储
		//that：指的是点击事件的元素
		if(that){
			//bigDataArry:每一个大块里面的所有数据
			var bigDataArry=that.closest(".problem").data("dataArry");
			var parentEle=that.closest(".problem");
			//bigDataArry_type:是了大块模板类型，用于辨别存储数据的方法
			var bigDataArry_type=bigDataArry.type;
			switch(bigDataArry_type){
				case "TABLE":saveData.singleSaveData_table(that,bigDataArry);break;
				case "INPUT":saveData.singleSaveData_input(that,bigDataArry);break;
			}
		}else{
			saveData.giveData_table(true);
			saveData.giveData_input(true);
		};
	},
	//样式格式化inputType的.problem里面的ul的元素内容
	againElem:function(that){
		//that：为点击元素,变迁元素一定要是大块里面的标签
		//parent为.problem的元素;
		var parent=that.closest(".problem");
		var bigData=parent.data("dataArry");
		parent.find("ul").html("");
		var _id=bigData.code.split(".").join("");
		//要推入大列表里面的小列表数据总和
		var questionDetailList=bigData.questionDetailList;
		for(var i=0;i<questionDetailList.length;i++){
			//获取推入类型
			var inputTypes=questionDetailList[i].inputType;
			switch(inputTypes){
				case "CODE":createModel.create_Code(_id,questionDetailList[i]);break;
				case "CHECKBOX":createModel.create_Checkbox(_id,questionDetailList[i]);break;
				case "ADDRESS":createModel.create_Address(_id,questionDetailList[i]);break;
				case "DATE":createModel.create_Date(_id,questionDetailList[i]);break;
				case "DOUBLE":createModel.create_Double(_id,questionDetailList[i]);break;
				case "INTEGER":createModel.create_Integer(_id,questionDetailList[i]);break;
				case "STRING":createModel.create_String(_id,questionDetailList[i]);break;
				case "TELEPHONE":createModel.create_Telephone(_id,questionDetailList[i]);break;
				case "TEXTAREA":createModel.create_Textarea(_id,questionDetailList[i]);break;
			};
		};
		//用来判断哪些li元素的的isLabel是"1"
		this.judgeIsLabel(_id);
		//初始化隐藏小数据里面的isDynamicShow=1的li，进行隐藏.
		this.judgeIsDynamicShow(parent);
		//初始化动态验证isDynamicCheck:"1"有哪些元素标签
		//checkData.checkDataEle(parent);
		//重点必填打信号星号
		this.starred();
		//验证动态显示有哪些元素标签，一般情况下动态显示标签的类型为code,若是动态控制现实的时候isControlShow="1"
		//在动态显示的元素里面添加datat-controlShow="1"的自定义属性
		this.checking_controlShow();
	},
	//上传数据的整理汇总,并return返回相应的值
	clearUpData:function(){
		var that=this;
		var arry=[];
		var jsonObject={};
		$("section .problem").each(function(){
			var dataArry=$(this).data("dataArry");
			if(dataArry.type=="TABLE"){								
				$(this).find(".cy").children("span").each(function(){
					arry.push($(this).data("answer"));
				});	
				that.jsonData_modelOjbName_Answer[dataArry.objName]=arry;
				arry=[];
			}else if(dataArry.type=="INPUT"){
				that.jsonData_modelOjbName_Answer[dataArry.objName]=$(this).data("answer");
			};			
		});
		jsonObject[that.jsonData_modelOjbName]=that.jsonData_modelOjbName_Answer;
		jsonObject["serialNo"]=that.jsonData_answer_serialNo;		
		return jsonObject;
	},
};
//数据的渲染
var showData={
	//总体数据渲染
	showData:function(){
		var parent=$("section .problem");
		//that:指的是这个showData模块对象
		var that=this;
		parent.each(function(){
			//每一个大块的数据
			var bigDataArry=$(this).data("dataArry");
			//样式格式化.problem里面的ul的元素内容
			showHtml.againElem($(this)); 
			$(this).find("ul li").attr("data-answerEle","no");
			if(bigDataArry.type=="TABLE"){
				//answer：把一开始加载页面的时把数据存储到.cy span[data-select="select"]里面的答案提取出来
				var answer=$(this).find('.cy span[data-select="select"]').data("answer");				
				for(var index in answer){
					//取得data-fieldname属性与答案名字一样的li
					var answerEle=$(this).children("ul").children('li[data-fieldname='+index+']');
					//在每一个对应的答案元素变迁li里面都添加自定义属性data-answerEle，若是属性值是yes的话表示对应的答案li
					answerEle.attr("data-answerEle","yes");
					//获取小模块的的type类型
					if(answerEle.length!=0){
						var type=answerEle.data("dataArry")["inputType"];
						switch(type){
							case "CODE":that.showData_Code(answerEle,answer[index]);break;
							case "CHECKBOX":that.showData_Checkbox(answerEle,answer[index]);break;
							case "ADDRESS":that.showData_Address(answerEle,answer[index]);break;
							case "DATE":that.showData_Date(answerEle,answer[index]);break;
							case "DOUBLE":that.showData_Double(answerEle,answer[index]);break;
							case "INTEGER":that.showData_Integer(answerEle,answer[index]);break;
							case "STRING":that.showData_String(answerEle,answer[index]);break;
							case "TEXTAREA":that.showData_Textarea(answerEle,answer[index]);break;
							case "TELEPHONE":that.showData_Telephone(answerEle,answer[index]);break;
						};
					};					
				};
				//判断是否有动态选择的选项
				if($(this).find('ul li[data-controlshow="1"]').length!=0){
					$(this).children("ul").children('li').filter('li[data-answerEle="yes"]').css({"display":"block"}).end()					
					.filter('li[data-answerEle="no"]').css({"display":"none"});
				};
			}else if(bigDataArry.type=="INPUT"){
				//answer：把一开始加载页面的时把数据存储到.problem里面的答案提取出来
				var answer=$(this).data("answer");
				for(var index in answer){
					//取得data-fieldname属性与答案名字一样的li
					var answerEle=$(this).children("ul").children('li[data-fieldname='+index+']');
					//在每一个对应的答案元素变迁li里面都添加自定义属性data-answerEle，若是属性值是yes的话表示对应的答案li
					answerEle.attr("data-answerEle","yes");
					//获取小模块的的type类型
					if(answerEle.length!=0){
						var type=answerEle.data("dataArry")["inputType"];
//					console.log(type);
						switch(type){
							case "CODE":that.showData_Code(answerEle,answer[index]);break;
							case "CHECKBOX":that.showData_Checkbox(answerEle,answer[index]);break;
							case "ADDRESS":that.showData_Address(answerEle,answer[index]);break;
							case "DATE":that.showData_Date(answerEle,answer[index]);break;
							case "DOUBLE":that.showData_Double(answerEle,answer[index]);break;
							case "INTEGER":that.showData_Integer(answerEle,answer[index]);break;
							case "STRING":that.showData_String(answerEle,answer[index]);break;
							case "TEXTAREA":that.showData_Textarea(answerEle,answer[index]);break;
							case "TELEPHONE":that.showData_Telephone(answerEle,answer[index]);break;
						};
					};					
				};
				if($(this).find('ul li[data-controlshow="1"]').length!=0){
					$(this).children("ul").children('li').filter('li[data-answerEle="yes"]').css({"display":"block"}).end()					
					.filter('li[data-answerEle="no"]').css({"display":"none"});
				};
			};
		})
	},
	//Code的数据渲染
	showData_Code:function(answerEle,answer){
		//answerEle:是符合data-fieldname属性与答案名对应的的li
		//answer:是答案
		var codeDicList_length=answerEle.data("dataArry")["codeDicList"].length;
		if(answer!=null){			
			if(codeDicList_length==2){
				answerEle.find('input[data-code='+'"'+answer+'"'+']').prop("checked",true);			
				answerEle.find("input").each(function(){
					if($(this).prop("checked")){
						$(this).nextAll("i").css("display","block");
					}else{
						$(this).nextAll("i").css("display","none");
					};				
				});
			}else if(codeDicList_length>2){
				answerEle.find(".right .choose").attr("data-code",answer);
				//多选答案数组信息
				var moreRadioArry=answerEle.data("dataArry")["codeDicList"];
				//对答案进行数据的排列整理，用moreRadioObject存起来
				var moreRadioObject={};
				for(var i=0;i<moreRadioArry.length;i++){
					moreRadioObject[moreRadioArry[i].code]=moreRadioArry[i].name
				};
				answerEle.find(".right .choose").text(moreRadioObject[answer]);	
				if(answerEle.find(".right .choose").attr("data-code")==""){
					answerEle.find(".right .choose").css({"color":"#a09fa4"});
				}else{
					answerEle.find(".right .choose").css({"color":"#191919"});
				};
			}
		}else{
			if(codeDicList_length==2){
				answerEle.find(".right input").each(function(){	
					$(this).prop("checked",false);
					if($(this).prop("checked")){
						$(this).nextAll("i").css("display","block");
					}else{
						$(this).nextAll("i").css("display","none");
					};	
				});
			}else if(codeDicList_length>2){
				answerEle.find(".right .choose").attr("data-code","").text("请选择").css({"color":"#a09fa4"});				
			}
		}
	},
	//Checkbox的数据渲染
	showData_Checkbox:function(answerEle,answer){
		//answerEle:是符合data-fieldname属性与答案名对应的的li
		//answer:是答案
		if(answer!=null){
			var dataArry=answer.split(",");
			answerEle.find("input").prop("checked",false).each(function(){
				$(this).closest("label").css("color","#a0a0a5");
				$(this).closest("label").find("img").attr("src","img/jx_icon.png");
			});			
			for(var i=0;i<dataArry.length;i++){			
				var checkEle=answerEle.find('input[data-code='+'"'+dataArry[i]+'"'+']').prop("checked",true);
				checkEle.closest("label").css("color","#191919");
				checkEle.closest("label").find("img").attr("src","img/jxt_icon.png");
			};
		}else{
			answerEle.find(".right input").prop("checked",false).each(function(){
				$(this).closest("label").css("color","#a0a0a5");
				$(this).closest("label").find("img").attr("src","img/jx_icon.png");
			});			
		};
	},
	//Address的数据渲染
	showData_Address:function(answerEle,answer){
		//answerEle:是符合data-fieldname属性与答案名对应的的li
		//answer:是答案
		if(answer!=null){
			console.log("Address数据功能正在开发中，敬请期待");
			answerEle.find(".right .choose").attr("guid","").text("请选择");
			answerEle.find("x-address input").val("");
		}else{
			console.log("Address数据功能正在开发中，敬请期待");
			answerEle.find(".right .choose").attr("guid","").text("请选择");
			answerEle.find(".x-address input").val("");
		}
	},
	//Date的数据渲染
	showData_Date:function(answerEle,answer){
		//answerEle:是符合data-fieldname属性与答案名对应的的li
		//answer:是答案
		if(answer!=null){
			answerEle.find(".right input").val(answer);
		}else{
			answerEle.find(".right input").val("");
		};
	},
	//Double的数据渲染
	showData_Double:function(answerEle,answer){
		//answerEle:是符合data-fieldname属性与答案名对应的的li
		//answer:是答案
		if(answer!=null){
			answerEle.find(".right input").val(answer);
		}else{
			answerEle.find(".right input").val("");
		};
	},
	//Integer数据渲染
	showData_Integer:function(answerEle,answer){
		//answerEle:是符合data-fieldname属性与答案名对应的的li
		//answer:是答案
		if(answer!=null){
			answerEle.find(".right input").val(answer);
		}else{
			answerEle.find(".right input").val("");
		}
	},
	//String数据渲染
	showData_String:function(answerEle,answer){
		//answerEle:是符合data-fieldname属性与答案名对应的的li
		//answer:是答案
		if(answer!=null){
			answerEle.find(".right input").val(answer);
		}else{
			answerEle.find(".right input").val("");
		};
	},
	//Textarea数据渲染
	showData_Textarea:function(answerEle,answer){
		//answerEle:是符合data-fieldname属性与答案名对应的的li
		//answer:是答案
		if(answer!=null){
			answerEle.find("textarea").val(answer);
		}else{
			answerEle.find("textarea").val("");
		};
	},
	//TELEPHONE数据渲染
	showData_Telephone:function(answerEle,answer){
		//answerEle:是符合data-fieldname属性与答案名对应的的li
		//answer:是答案
		if(answer!=null){
			var answer=answer.split("-");
			for(var i=0;i<answer.length;i++){
				answerEle.find(".right input").eq(i).val(answer[i]);
			}
		}else{
			answerEle.find(".right input").val("");
		};
	}
};
