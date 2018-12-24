var bindingEvent={
	//tabel里面的addjianBtn按钮事件
	addjianBtn:function(){
		$(document).on("touchend",".addjianBtn",function(){
			//parentEle父元素li
			var parentEle=$(this).closest(".problem");
			//max_index：最大可以添加多少个
			var max_index=parentEle.data("dataArry").answerLimit;			
			//min_index为最小可以删除个数
			var min_index=parentEle.data("dataArry").answerLimitMin;
			//若max_index的值为0的话，表示可以添加无穷多。
			if(max_index==0){
				max_index=999;
			};			
			if($(this).hasClass("add")){
				//判断验证是否通过
				judgeCheckFinish.judge($(this),true,true);
				//判断必填项是否全部完成
				judgeFinish.judge($(this));				
				//数据的保存
				showHtml.saveDataTool($(this));
				if(parentEle.find(".cy span").length<max_index){
					var a=$("<span></span>").appendTo(parentEle.find(".cy")).attr("data-select",'select').siblings().attr("data-select",'').end();
					var lineno=Number(parentEle.attr("data-lineno"))+1;
					var index=Number(parentEle.attr("index"))+1;
					parentEle.attr("data-lineno",lineno);
					parentEle.attr("index",index);
					a.data("answer",{"lineNo":lineno,"serialNo":showHtml.jsonData_answer_serialNo});
					a.attr("data-lineno",lineno);
					a.attr("index",index);
					//初始化数据的赋值到相对应的元素之后,使用tabel_pact的小块文字渲染方法
					showHtml.tabel_pact();
					//这再进行判断小标签块多少个，如果个数和最大值一样的话就把add加号标签隐藏起来
					if(parentEle.find(".cy span").length>=max_index){
						$(this).css({"display":"none"});
					}else{
						$(this).css({"display":"block"});
					}
					//这再进行判断小标签块多少个，如果个数大于最小值话就把jian减号标签显示起来
					if(parentEle.find(".cy span").length>=min_index){
						$(this).closest("p").find(".jian").css({"display":"block"});
					}
					//判断小标签是否为0,为0的话显示ul里面的内容
	              	if(parentEle.find(".cy span").length!=0){
	              		parentEle.find("ul").css("display","block").end().find(".cy").css("display","block");
	              	}
				};
				//样式格式化	
				showHtml.againElem($(this));
				//添加默认值
				showHtml.addDefault.pieceTool($(this));
				//小标签赋值和动态控制
				parentEle.find("ul li").each(function(){
					showHtml.tabel_table_pactContent($(this));
					showHtml.controlShow($(this));
				});
			}else if($(this).hasClass("jian")){
				parentEle.find(".cy span img").remove();
				//让获取到焦点的input标签先失去焦点,让他先执行失去焦点的事件，避免append和text方法冲突
				parentEle.find("ul li input:focus").blur();
				//数据的保存
				showHtml.saveDataTool();
				//小标签个数是否小于最下标签值min_index
				if(parentEle.find(".cy span").length>min_index){
					parentEle.find(".cy span").append('<img src="img/close_icon.png" class="closeEleBtn">');
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
			var parentEle=that.closest(".problem");
			//取min_index标签最小值
			var min_index=that.closest(".problem").data("dataArry")["answerLimitMin"];
			//取max_index标签最大值
			var max_index=that.closest(".problem").data("dataArry")["answerLimit"];
			$('<div id="mask"><div class="mask_bg"></div><div class="remove"><p class="_sc">您确认要删除吗？<img class="_ci" src="img/close_icon.png"/><p class="_qr">确认</p></div></div>').appendTo("body");
			$("._ci").click(function(){
				$(".cy span img").remove();
                $("#mask").remove();
            });
            $("._qr").click(function(){
            	closelse.remove();
                $("#mask").remove();
            	//数据必填项项完成情况判断
              	judgeFinish.judge(cyEle);
              	//数据验证的判断
              	judgeCheckFinish.judge(cyEle,true,true);
                cyEle.find("span").eq(0).attr("data-select",'select').siblings().attr("data-select",'')
                $(".cy span img").remove();
                //数据的展现(因为showData()方法里面有格式初始化的方法在里面，所以不需要另外加上数据初始化的方法)
              	showData.showData(cyEle);
              	//数据必填项项完成情况判断
              	judgeFinish.judge(cyEle);
              	//数据验证的判断
              	judgeCheckFinish.judge(cyEle,false,true);
              	//判断小标签个数是否小于最小标签值min_index
              	if(cyEle.children("span").length<=min_index){
              		cyEle.closest(".problem").children("p").children(".jian").css({"display":"none"});
              	};
              	//判断小标签个数是否小于最大标签值max_index
              	if(cyEle.children("span").length<max_index){
              		cyEle.closest(".problem").children("p").children(".add").css({"display":"block"});
              	};
              	//对标签里面的自定义属性index重新排序
              	for(var i=0;i<parentEle.find(".cy span").length;i++){
              		//ele:小标签元素
              		var ele=parentEle.find(".cy span").eq(i);
              		ele.attr("index",i);
              	};
              	parentEle.attr("index",parentEle.find(".cy span").length-1);
              	//判断小标签是否为0,为0的话隐藏ul里面的li内容
              	if(parentEle.find(".cy span").length==0){
              		parentEle.find("ul").css("display","none").end().find(".cy").css("display","none");
              	}
            });
            return false;
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
			//验证数据
			var parent=$(this).closest(".problem");
			var parentDataArry=parent.data("dataArry");
			var dataCodeObject={};
			var dataCodeArry=[];
			parentEle.find(".right input:checked").each(function(){
				dataCodeArry.push($(this).attr("data-code"));
			});
			var dataCode=dataCodeArry.join(",");
			var modelName=parent.data("dataArry")["objName"];
			var targetField=parentEle.attr("data-fieldname");
			dataCodeObject[targetField]=dataCode;
			showHtml.QestionRegChecker.checkFieldValues(modelName,targetField,dataCodeObject,true,false);
			//输入行题目字体变色判断
			showHtml.judgeEntryTopicChangeColor.lineTool($(this));
			//动态显示
//			showHtml.controlShow($(this));
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
			//判断是否所填项符合要求
			judgeCheckFinish.judge($(this),true,true);
			//数据的保存
			showHtml.saveDataTool($(this));
			$(this).attr("data-select",'select').siblings().attr("data-select","");
			//样式格式化.problem里面的ul的元素内容
			showHtml.againElem($(this));
			//初始化数据的赋值到相对应的元素之后,使用tabel_pact的小块文字渲染
			showHtml.tabel_pact();
			//数据的渲染
          	showData.showData($(this));
          	//动态验证的展示
//        	checkData.checkData();
			//黄泽建的动态验证的验证方法
			judgeCheckFinish.judge($(this),false,true);
		})
	},
	//单选框点击事件
	radioBtn:function(){
		$(document).on("click",".right",function(){
			var that=$(this);
			//dataArry是从li取出的小列表数据总和
			var dataArry=$(this).closest("li").data("dataArry");
			if(dataArry.inputType=="RADIO"){				
//				if(dataArry.codeDicList.length==2){
					tworadio($(this));
					//table小块文字填充,暂时只有code类型的判断，如有什么更新另加方法。
					showHtml.tabel_table_pactContent($(this));
//					动态显示
					showHtml.controlShow(that);
					//跨大块动态控制
					showHtml.transboundaryControlShow(that);
					//输入行题目字体变色判断
					showHtml.judgeEntryTopicChangeColor.lineTool(that);
//				}else if(dataArry.codeDicList.length>2){
//					moreTwoRadio(that,dataArry);
//				};
			}else if(dataArry.inputType=="CODE"){
				moreTwoRadio(that,dataArry);
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
			//动态验证
//			checkData.giveCheckEle(that);
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
		$(document).on("click",'input[readonly]',function(){
			//缓存保存点击时间元素
			bindingEvent.bindingEventEleBuffer=$(this);			
		});
	},
	//date模块时间段的btn点击事件
	dateZoomBtn:function(){

	},
	//date模块插件的确定btn点击事件
	dateBtnFinish:function(){
		//时间插件确定按钮执行函数
		$(document).on("touchstart",".gearDate .date_btn_box .lcalendar_finish",function(){
			//输入行题目字体变色判断
			showHtml.judgeEntryTopicChangeColor.lineTool(bindingEvent.bindingEventEleBuffer);
			//判断严重是否通过
			judgeCheckFinish.judgeLineTool(bindingEvent.bindingEventEleBuffer,false);
			bindingEvent.bindingEventEleBuffer="";
		});
	},
	//Address模块点击事件
	address:function(){
		$(document).on("click",".right",function(){
			//dataArry是从li取出的小列表数据总和
			var dataArry=$(this).closest("li").data("dataArry");
			if(dataArry.inputType=="ADDRESS"){
				//把点击促发元素存入公共的变量里面
				bindingEvent.bindingEventEleBuffer=$(this);
				//点击后底线变色效果，表示已选中
				$("section li").removeClass("ylborder");
				$("section li .x-address").removeClass("addressYlborder");
				$(this).closest("li").find(".x-address").addClass("addressYlborder");
				adree($(this).attr("id"));
				return false;
			};
		});
	},
	//adress地址弹窗的选项点击事件
	addressModuleChooseBtn:function(){
		$(document).on("click",".adr-mask ul li",function(){
			console.log(bindingEvent.bindingEventEleBuffer.find("span").attr("guid"));
			judgeCheckFinish.judgeLineTool(bindingEvent.bindingEventEleBuffer,false);
			return false;
		});
	},
	//.right和.x-address的input标签失去焦点时候要执行 的事件，主要是用他来改变table里面的小块的的文字内容
	rightinput_blur:function(){
		$(document).on("blur","section .right input",function(){
			showHtml.tabel_table_pactContent($(this));
			//输入行题目字体变色
			showHtml.judgeEntryTopicChangeColor.lineTool($(this));
		});
		$(document).on("blur","section .x-address input",function(){
			showHtml.judgeEntryTopicChangeColor.lineTool($(this));
			if($(this).closest(".x-address").attr("data-require")=="true" || $(this).val()){
				judgeCheckFinish.judge_xAddress($(this),false);
			}			
		});
	},
	//section里面的li行的点击事件
	ele_li:function(){
		$(document).on("click","section ul li",function(){
			//点击后底线变色效果，表示已选中
			$("section li").removeClass("ylborder");
			$("section li .x-address").removeClass("addressYlborder");
			$(this).addClass("ylborder");
			//是closeEleBtn按钮消失
			$("section .closeEleBtn").remove();
		});
	},
	//遮盖层事件
	coverEleEvent:function(){
		$(document).on("click","section ul li .coverEle",function(){
			//点击后底线变色效果，表示已选中
			$("section li").removeClass("ylborder");
			$("section li .x-address").removeClass("addressYlborder");
			//是closeEleBtn按钮消失
			$("section .closeEleBtn").remove();
			return false;
		});
	},
	//textarea标签失去焦点事件
	rightTextarea_blur:function(){
		$(document).on("blur","section ul li textarea",function(){
			showHtml.judgeEntryTopicChangeColor.lineTool($(this));
		});
	},
	//键盘事件
	keyboard:function(){
		//控制input number类型的键盘按上事件输入最大可输入值
		$(document).on("keyup",'.right input[data-maxlength]',function(){
//		
		});
//		控制input number类型的键盘按下事件输入最大可输入值
		$(document).on("keydown",'.right input[data-maxlength]',function(event){
			if(event.keyCode=="8"){
				console.log("触发了回退键盘案件");				
			}else{
				console.log("没有触发了回退键盘案件");
				var maxLenght=$(this).attr("data-maxlength");
				var content=$(this).val();
				var contentLength=content.length;
				if(contentLength>=maxLenght){
					console.log("输入内容大于最大输入数字或者输入不是数字");
					//取消默认事件
					event.preventDefault();
//					return false;
				};
			};
		});
	},
	//提交按钮
	submitBtn:function(){
		
		$(document).on("click","footer",function(){
			//是closeEleBtn按钮消失
			$("section .closeEleBtn").remove();
			//去除被选中li的下划线
			$("section li").removeClass("ylborder");
			$("section li .x-address").removeClass("addressYlborder");
			//判断是否填完
			judgeFinish.judge();
			//全局保存数据
			showHtml.saveDataTool();
			var a=showHtml.clearUpData();
			//判断是必选项是否完成，返回状态值
			var parent=$("section .problem:visible");
			judgeCheckFinish.judge(null,false,true);
			parent.each(function(){
				var dataArry=$(this).data("dataArry");
				if(dataArry["type"]=="INPUT"){
					if($(this).attr("data-judgefinish")=="no"||$(this).attr("data-checkstate")=="unpass"){
						a["completeStatus"]="1";
//						友好提示
//						alert("必填信息未填");
						return false;
					}else{
						a["completeStatus"]="2";
					};
				}else if(dataArry["type"]=="TABLE"){					
					if(showHtml.jsonData_common.modelOjbName=="contactInfoModel" || showHtml.jsonData_common.modelOjbName=="bossContactModel") {
						if($(this).find('.cy span').length<$(this).data("dataArry").answerLimitMin){
							$('<div id="mask"><div class="mask_bg"></div><div class="remove"><p class="_sc">至少需要'+$(this).data("dataArry").answerLimitMin+'联系人<img class="_ci" src="img/close_icon.png"/></p><p class="_qr">确认</p></div></div>').appendTo("body");
							$("._ci,._qr").click(function(){
//									$(".cy span img").remove();
				                $("#mask").remove();
				            });
							a["completeStatus"]="1"
							return false;
						};
						var judgefinishEleMum1=$(this).find('.cy span[data-judgefinish="no"]').length;
						var judgefinishEleMum2=$(this).find('.cy span[data-checkstate="unpass"]').length;
						if(judgefinishEleMum1>0||judgefinishEleMum2>0){
							a["completeStatus"]="1";
							return false;
						}else if(judgefinishEleMum1==0&&judgefinishEleMum2==0){
							a["completeStatus"]="2";
						};
						
					}else {
						var judgefinishEleMum1=$(this).find('.cy span[data-judgefinish="no"]').length;
						var judgefinishEleMum2=$(this).find('.cy span[data-checkstate="unpass"]').length;
						if(judgefinishEleMum1>0||judgefinishEleMum2>0){
							a["completeStatus"]="1";
							return false;
						}else if(judgefinishEleMum1==0&&judgefinishEleMum2==0){
							a["completeStatus"]="2";
						};
					};
				};
			});
			//提交数据
			a = zhangxiaojiang(a);
			a = zhujianan(a);
			/***************2017-08-09***************/
				if(initModeObjName=="bossContactModel"){//联系人模块
				console.log('提交数据')
				console.log(initBossContacts);//原来的值
				var submitBossContacts=a.bossContactModel.bossContacts;
					for(var i=0;i<submitBossContacts.length;i++){
						for(var j=0;j<initBossContacts.length;j++){
							if(submitBossContacts[i].lineNo==initBossContacts[j].lineNo){
								if(submitBossContacts[i].checkRemark!=initBossContacts[j].checkRemark){
									submitBossContacts[i].auditorCode=null;
									submitBossContacts[i].auditorName=null;
								}else{
									submitBossContacts[i].auditorCode=initBossContacts[j].auditorCode;
									submitBossContacts[i].auditorName=initBossContacts[j].auditorName;
								}
							}
						}
					}
				}
				
				if(initModeObjName=="bossBaseInfoModel"){//个人基本信息  initbossBaseInfo
					console.log('提交数据');
					var submitBossBaseInfo=a.bossBaseInfoModel.bossBaseInfo;
							if(submitBossBaseInfo.marrige=="{3DE4DAC9-4357-4E6B-A3BE-2D3B56B6483D}"&&initbossBaseInfo.marrige=="{3DE4DAC9-4357-4E6B-A3BE-2D3B56B6483D}"){
								if(submitBossBaseInfo.spouseRemark!=initbossBaseInfo.spouseRemark){
									submitBossBaseInfo.auditorCode=null;
									submitBossBaseInfo.auditorName=null;
								}else{
									submitBossBaseInfo.auditorCode=initbossBaseInfo.auditorCode;
									submitBossBaseInfo.auditorName=initbossBaseInfo.auditorName;
								}
							}
				
					}
				console.log(a);//上传的值
			/***************2017-08-09 end***************/
			
			if(a["completeStatus"]=="2"){
				//提交数据
				
				a=JSON.stringify(a);
				AndroidJs.saveWjDetalAnswer(a,true);
			}else if(a["completeStatus"]=="1"){
				//提交数据
				a=JSON.stringify(a);
				AndroidJs.saveWjDetalAnswer(a,false);
			};
		});
	
	
	}
};
// 联系人信息增加检测项（所有）
function zhangxiaojiang(a){
	if($(".table").length>0){
		var have;
		$(".table").each(function(){
			var dataArry = $(this).data().dataArry;
			var choiceCode = dataArry.choiceCode;
			var columnCode = dataArry.columnCode;
			var modelname= $(this).attr("modelname");
			var tip = dataArry.tip;
			var fieldName;
			$(dataArry.questionDetailList).each(function(){
				if($(this)[0].code == columnCode){
					fieldName = $(this)[0].fieldName;
				}
			});
			if(choiceCode!=null&&choiceCode!=""&&columnCode!=null&&columnCode!=""){
				for(key in a){
					if(key == showHtml.jsonData_modelOjbName){
						for(i in a[key]){
							if(i==modelname){
								if(a[key][i].length!=0){
									if(fieldName!=undefined){
										have = false;
										$(a[key][i]).each(function(){
											for(j in $(this)[0]){
												if(j == fieldName){
													if($(this)[0][j] == choiceCode){
														have = true;
													}
												}
											}
										})
									}
								}
							}
						}
					}
				}
			}
			$(this).children("p").find("label").remove();
			if(have!=undefined&&!have){
				$('<label class="message_info" field="phone">'+tip+'</label>').appendTo($(this).children("p"));
			}
		});
		if(have!=undefined){
			if(have){
				if(a["completeStatus"]=="2"){
					a["completeStatus"]="2";
				}
			}else{
				a["completeStatus"]="1";
			}
		}
	}
	return a;
}
//百分比控制
function zhujianan(a){
	var mdsl_data = $("section").data("dataArry").modelDetailSubList;
	$(mdsl_data).each(function(){
		var gcl = [];
		$($(this)[0].questionDetailList).each(function(){
			if($(this)[0].groupControlList!=null){
				if(gcl.length!=0){
					$($(this)[0].groupControlList).each(function(){
						var gclTf=true;
						var gr_val = $(this)[0];
						$(gcl).each(function(){
							if($(this)[0].groupCode==gr_val.groupCode){
								gclTf=false;
							}
						})
						if(gclTf){
							gcl.push(gr_val.groupCode)
						}
					});
				}else{
					gcl=$(this)[0].groupControlList;
				}
			}
		});
		$(this)[0]["groupControlList"]=gcl;
	});
	var modelDetailSubList = $("section").data("dataArry").modelDetailSubList;
	var modelOjbName = $("section").data("dataArry").modelOjbName
	var groupControlList1 = [];
	var groupRule = [];
	$(modelDetailSubList).each(function(){
		var groupTf = true;
		var groupControlList = $(this)[0].groupControlList;
		if(groupControlList!=undefined){
			if(groupControlList.length!=0){
				$(groupControlList).each(function(i,val){
					var gtf = $(this)[0];
					var groupCode = $(this)[0].groupCode;
					var gpTf = true;
					if(groupControlList1.length!=0){
						$(groupControlList1).each(function(j,jal){
							if(jal==groupCode){
								groupTf = false;
							}
						})
					}
					if(groupTf){
						groupControlList1.push(groupCode);
						groupRule.push(gtf);
					}else{
						if(groupControlList1.length!=0){
							$(groupControlList1).each(function(j,jal){
								if(jal==groupCode){
									gpTf = false;
								}
							})
						}
						if(gpTf){
							groupControlList1.push(groupCode);
							groupRule.push(gtf);
						}
					}
					
				});
			}
		}
	})
	if(groupControlList1.length!=0){
		$(groupControlList1).each(function(i,val){
			var groupControlList2 = [];
			$(modelDetailSubList).each(function(){
				var groupControlList = $(this)[0].groupControlList;
				if(groupControlList!=undefined){
					if(groupControlList.length!=0){
						$(groupControlList).each(function(){
							if($(this)[0].groupCode==val){
								if(groupControlList2.length!=0){
									var jtf = true;
									var jcode = $(this)[0].code;
									$(groupControlList2).each(function(j,jal){
										if(jal==jcode){
											jtf=false;
										}
									})
									if(jtf){
										groupControlList2.push($(this)[0].code);
									}
								}else{
									groupControlList2.push($(this)[0].code);
								}
							}
						})
					}
				}
			});
			if(groupControlList2.length!=0){
				var groupControlList3 = [];
				$(groupControlList2).each(function(i,val){
					$(modelDetailSubList).each(function(){
						var ojs = {};
						var objName = $(this)[0].objName;
						$($(this)[0].questionDetailList).each(function(){
							if($(this)[0].code == val){
								ojs[objName] = $(this)[0].fieldName;
								groupControlList3.push(ojs)
							}
						});

					});
				})
				if(groupControlList3.length!=0){
					var result;
					$(groupControlList3).each(function(){
						for(key in $(this)[0]){
							var fd = $(this)[0][key];
							for(jey in a[modelOjbName]){
								if(jey == key){
									if(a[modelOjbName][jey]!=null){
										if(typeof(a[modelOjbName][jey])=="object"){
											if(Array.isArray(a[modelOjbName][jey])){
												if(a[modelOjbName][jey].length!=0){
													$(a[modelOjbName][jey]).each(function(){
														for(hey in $(this)[0]){
															if(hey == fd){
																if($(this)[0][hey]!=null){
																	if(result == undefined){
																		result = 0;
																		result+=Number($(this)[0][hey]);
																	}else{
																		result+=Number($(this)[0][hey]);
																	}
																}
															}
														}
													})
												}
											}else{
												for(hey in a[modelOjbName][jey]){
													if(hey == fd){
														if(a[modelOjbName][jey][hey]!=null){
															if(result == undefined){
																result = 0;
																result+=Number(a[modelOjbName][jey][hey]);
															}else{
																result+=Number(a[modelOjbName][jey][hey]);
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
					console.log(result);
					if(result!=undefined){
						if(groupRule.length!=0){
							$(groupRule).each(function(){
								if($(this)[0].groupCode==val){
									if(!new RegExp($(this)[0].rule).test(result)){
										$('<div id="mask"><div class="mask_bg"></div><div class="remove"><p class="_sc">'+$(this)[0].tip+'<img class="_ci" src="img/close_icon.png"/><p class="_qr">确认</p></div></div>').appendTo("body");
										$("._ci,._qr").click(function(){
							                $("#mask").remove();
							            });
										a["completeStatus"] = "1";
									}
								}
							})
						}
					}
				}
			}
			console.log(groupControlList2);
		})
	};
	return a;
}
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
		$("<div class='problem table' id='" + id + "'><p>" + this.modelDetailSubListArry.name + "<img src='img/add_icon.png' class='add addjianBtn'><img src='img/jian_icon.png' class='jian addjianBtn'></p><div class='cy zhucy'></div><ul></ul></div>").appendTo($("section")).data("dataArry",this.modelDetailSubListArry).
		attr("modelname",this.modelDetailSubListArry["objName"]);
		//要推入大列表里面的小列表数据总和
		var questionDetailList=this.modelDetailSubListArry.questionDetailList;
		showHtml.QestionRegChecker.initQuestionMap(this.modelDetailSubListArry["objName"],questionDetailList);
		for(var i=0;i<questionDetailList.length;i++){
			//获取推入类型
			var inputTypes=questionDetailList[i].inputType;
			switch(inputTypes){
				case "CODE":this.create_Code(id,questionDetailList[i]);break;
				case "RADIO":this.create_Code(id,questionDetailList[i]);break;
				case "CHECKBOX":this.create_Checkbox(id,questionDetailList[i]);break;
				case "ADDRESS":this.create_Address(id,questionDetailList[i]);break;
				case "DATE":this.create_Date(id,questionDetailList[i]);break;
				case "DOUBLE":this.create_Double(id,questionDetailList[i]);break;
				case "INTEGER":this.create_Integer(id,questionDetailList[i]);break;
				case "STRING":this.create_String(id,questionDetailList[i]);break;
				case "TELEPHONE":this.create_Telephone(id,questionDetailList[i]);break;
				case "TEXTAREA":this.create_Textarea(id,questionDetailList[i]);break;
				case "DATEZONE":this.create_DateZone(id,questionDetailList[i]);break;
			};
		};
		//用来判断哪些li元素的的isLabel是"1"
		showHtml.judgeIsLabel(id);
		//判断返回答案是否为空
		this.judgeData(id);
	},
	createInput:function(id){
		$("<div class='problem' id='" + id + "'><p>" + this.modelDetailSubListArry.name + "</p><ul></ul></div>").appendTo($("section")).data("dataArry",this.modelDetailSubListArry).
		attr("modelname",this.modelDetailSubListArry["objName"]);
		//要推入大列表里面的小列表数据总和
		var questionDetailList=this.modelDetailSubListArry.questionDetailList;
		showHtml.QestionRegChecker.initQuestionMap(this.modelDetailSubListArry["objName"],questionDetailList);
		for(var i=0;i<questionDetailList.length;i++){
			//获取推入类型
			var inputTypes=questionDetailList[i].inputType;
			switch(inputTypes){
				case "CODE":this.create_Code(id,questionDetailList[i]);break;
				case "RADIO":this.create_Code(id,questionDetailList[i]);break;
				case "CHECKBOX":this.create_Checkbox(id,questionDetailList[i]);break;
				case "ADDRESS":this.create_Address(id,questionDetailList[i]);break;
				case "DATE":this.create_Date(id,questionDetailList[i]);break;
				case "DOUBLE":this.create_Double(id,questionDetailList[i]);break;
				case "INTEGER":this.create_Integer(id,questionDetailList[i]);break;
				case "STRING":this.create_String(id,questionDetailList[i]);break;
				case "TELEPHONE":this.create_Telephone(id,questionDetailList[i]);break;
				case "TEXTAREA":this.create_Textarea(id,questionDetailList[i]);break;
				case "DATEZONE":this.create_DateZone(id,questionDetailList[i]);break;
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
		if(questionDetailList.inputType=="RADIO"){			
			var _elem='<li>'+
						'<div class="left">'+
							'<span>&nbsp;&nbsp;</span>'+
							'<i>' + questionDetailList.name + '</i>'+
						'</div>'+
						'<div class="right">'+
							'<label>'+
							'<input name='+questionDetailList.code+'-radio'+' type="radio" data-code='+questionDetailList.codeDicList[0].code+' value='+questionDetailList.codeDicList[0].code+'>'+
							 questionDetailList.codeDicList[0].name+
							'<i></i>'+
							'</label>'+
							'<label>'+
							'<input name='+questionDetailList.code+'-radio'+' type="radio" data-code='+questionDetailList.codeDicList[1].code+' value='+questionDetailList.codeDicList[1].code+'>'+
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
			elem.attr("fieldName",questionDetailList.fieldName);
			elem.appendTo(pushElem);
		}else if(questionDetailList.inputType=="CODE"){
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
			elem.attr("fieldName",questionDetailList.fieldName);
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
		elem.attr("fieldName",questionDetailList.fieldName);
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
							'<p class="x-address_p1">'+
								'<span>&nbsp;&nbsp;</span>'+
								'<i>详细地址</i>'+
							'</p>'+
							'<p class="x-address_p2">'+
								'<input type="text" placeholder="请输入详细地址" />'
							'</p>'+
						'</div>'+
					'</li>';
		var elem=$(_elem);
		elem.attr("id",questionDetailList.code.split(".").join(""));
		elem.find(".right").attr("id",questionDetailList.code.split(".").join("")+"-address");
		elem.data("dataArry",questionDetailList);
		elem.attr("data-fieldName",questionDetailList.fieldName);
		elem.attr("fieldName",questionDetailList.fieldName);
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
							'<input type="text" readonly name="input_date" placeholder="日期选择" data-lcalendar="1916-01-11,2116-05-29"/>'	+			
						'</div>'+
					'</li>';
		var elem=$(_elem);
		elem.attr("id",questionDetailList.code.split(".").join(""));
		elem.find(".right input").attr("id","date-"+questionDetailList.code.split(".").join(""));
		elem.data("dataArry",questionDetailList);
		elem.attr("data-fieldName",questionDetailList.fieldName);
		elem.attr("fieldName",questionDetailList.fieldName);
		elem.appendTo(pushElem).find(".right input").each(function(){
			var id="#"+$(this).attr("id");
			var dateTool=new lCalendar();
			dateTool.init({
				"trigger":id,
				"type":"date"
			});
		});		
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
		elem.attr("fieldName",questionDetailList.fieldName);
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
		elem.attr("fieldName",questionDetailList.fieldName);
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
		elem.attr("fieldName",questionDetailList.fieldName);
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
							'<input type="number" placeholder="区号" class="telephone_left" data-maxlength="4"/>'+
							'<b>-</b>'+
							'<input type="number" placeholder="电话号码" class="telephone_center" data-maxlength="8"/>'+
							'<b>-</b>'+
							'<input type="number" placeholder="分机号" class="telephone_right" data-maxlength="4"/>'+
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
		elem.attr("fieldName",questionDetailList.fieldName);
		elem.appendTo(pushElem);			
	},
	//创建textarea模块
	create_Textarea:function(id,questionDetailList){
		//id:是附在大块的ID名
		//questionDetailList:大列表里面的小列表数据总和
		var pushElem=$('#'+id).children("ul");
		//placeholder输入框默认文字内容
		var placeholder="请输入"+questionDetailList.name;
		var _elem='<li class="textareaStyle">'+
						'<div class="left">'+
							'<span>&nbsp;&nbsp;</span>'+
							'<i>' + questionDetailList.name + '</i>'+
						'</div>'+
						'<div class="right chenckbox">'+
							'<textarea name="" rows="" cols="" placeholder="请输入" ></textarea>'+
							'<span></span>'+
						'</div>'
					'</li>';
		var elem=$(_elem);
		if(questionDetailList.inputUnit!=null){
			elem.find(".right span").text(questionDetailList.inputUnit);
		};
		
		elem.attr("id",questionDetailList.code.split(".").join(""));
		elem.data("dataArry",questionDetailList);
		elem.attr("data-fieldName",questionDetailList.fieldName);
		elem.attr("fieldName",questionDetailList.fieldName);
		elem.appendTo(pushElem);
	},
	//创建DATEZONE模块
	create_DateZone:function(id,questionDetailList){
		//id:是附在大块的ID名
		//questionDetailList:大列表里面的小列表数据总和
		var pushElem=$('#'+id).children("ul");
		var _elem='<li>'+
						'<div class="left">'+
							'<span>&nbsp;&nbsp;</span>'+
							'<i>' + questionDetailList.name + '</i>'+
						'</div>'+
						'<div class="right chenckbox" data-pluginDateNoOff="off">'+
							'<input type="text" readonly name="input_date" placeholder="日期选择" data-lcalendar="1916-01-11,2116-05-29" style="width:2.5rem;text-align:center" />'+
							'<b>-</b>'+
							'<input type="text" readonly name="input_date" placeholder="日期选择" data-lcalendar="1916-01-11,2116-05-29" style="width:2.5rem;text-align:center" />'+
						'</div>'+
					'</li>';
		var elem=$(_elem);
		elem.attr("id",questionDetailList.code.split(".").join(""));
		elem.find(".right input").each(function(index){
			$(this).attr("id","date-"+questionDetailList.code.split(".").join("")+"-"+index);
		});		
		elem.data("dataArry",questionDetailList);
		elem.attr("data-fieldName",questionDetailList.fieldName);
		elem.attr("fieldName",questionDetailList.fieldName);
		elem.appendTo(pushElem).find(".right input").each(function(){
			var id="#"+$(this).attr("id");
			var dateTool=new lCalendar();
			dateTool.init({
				"trigger":id,
				"type":"date"
			});
		});
	},
	//创建单选2个以上遮罩层
	radioMaskLayer:function(that,dataArry) {
		//that指的是点击的对象
		//dataArry是小列表数据的综合
		var MaskLayer=$('<div id="mask"><div class="mask_bg"></div><ul class="maskBox"></ul><div class="cancel cancelBtn">取消</div></div>');
		var eleArry=[];
		if(showHtml.judgeIsAllowRepeat(that)[0]==true){
			for(var i=0;i<showHtml.judgeIsAllowRepeat(that)[1].length;i++){
				var _ele='<li data-code='+showHtml.judgeIsAllowRepeat(that)[1][i][1]+'>'+showHtml.judgeIsAllowRepeat(that)[1][i][0]+'</li>';
				eleArry.push(_ele);	
			};
		}else{
			for(var i=0;i<dataArry.codeDicList.length;i++){
				var _ele='<li data-code='+dataArry.codeDicList[i].code+'>'+dataArry.codeDicList[i].name+'</li>';
				eleArry.push(_ele);	
			};
		}		
		//创建单选框的遮罩层
//		MaskLayer.find(".cancel").before($(eleArry.join("")));
		MaskLayer.find("ul").append($(eleArry.join("")));
		MaskLayer.appendTo("body");
		//创建单选框的遮罩层的取消按钮绑定事件
		$("#mask .cancel").on("click",function(){
			$(this).closest("#mask").remove();
			return false;
		});
		//选择选项时的按钮绑定事件
		$("#mask li").on("click",function(){
			that.find(".choose").attr("data-code",$(this).attr("data-code")).text($(this).text());
			that.find(".choose").attr("name",$(this).attr("data-code"));
			//给关联的table小块点击赋值
			showHtml.tabel_table_pactContent(that.closest("li"));
			//动态显示控制
			showHtml.controlShow(that);
			//跨大块动态控制
			showHtml.transboundaryControlShow(that);
			//输入行题目字体变色判断
			showHtml.judgeEntryTopicChangeColor.lineTool(that);
			$(this).closest("#mask").remove();			
			//单独验证li里面的项目
			var checkObject={};
			//存数大块的模块名
			var modelname=that.closest(".problem").attr("modelname");
			var fieldname=that.closest("li").attr("fieldname");
			var dataCode=that.closest("li").find(".right .choose").attr("data-code");
			checkObject[fieldname]=dataCode;
			showHtml.QestionRegChecker.checkFieldValues(modelname,fieldname,checkObject,true,true);
			return false;
		});
	},
	//判断返回数据的数组或者对象是否为空(返回true有；false空)
	judgeData:function(id){
		console.log(this.modelDetailSubListArry)
		var objName=this.modelDetailSubListArry.objName;
		//console.log(showcarData.jsonData_answer[objName]);
		//判断返回的答案是否有没有数据
		if(showHtml.judgeDataEmpt(showHtml.jsonData_modelOjbName_Answer[objName])){
			var parent=$("#"+id);
			//linenoMaxMin:用于存储lineNo的最大值。
			var linenoMaxMin=null;
			if(parent.data("dataArry")["type"]=="TABLE"){
				//设置index值，为了在添加小标签时候加上index自定义属性
				var index=0;
				for(var i=0;i<showHtml.jsonData_modelOjbName_Answer[objName].length;i++){
					if(linenoMaxMin==null){						
						linenoMaxMin=showHtml.jsonData_modelOjbName_Answer[objName][i]["lineNo"];
					}else{
						if(Number(linenoMaxMin)<Number(showHtml.jsonData_modelOjbName_Answer[objName][i]["lineNo"])){
							linenoMaxMin=showHtml.jsonData_modelOjbName_Answer[objName][i]["lineNo"];
						}
					};
					$("<span>未定义</span>").appendTo("#"+id+" .cy").data("answer",showHtml.jsonData_modelOjbName_Answer[objName][i])
					.attr("data-lineno",showHtml.jsonData_modelOjbName_Answer[objName][i]["lineNo"]).attr("index",i);
					index++;
				};
				//把最高值得lineNo赋给.problem的元素
				parent.attr("data-lineno",linenoMaxMin).attr("index",index-1);
				parent.find(".cy span").eq(0).attr("data-select",'select');
				if(showHtml.jsonData_common.modelOjbName=="contactInfoModel") {
					//获取答案中是否已婚的答案选项code值
					var baseInfoModel;
					if(showHtml.jsonData_common.answer.baseInfoModel){
						baseInfoModel=showHtml.jsonData_common.answer.baseInfoModel.baseInfo.marrige;
					}else if(showHtml.jsonData_common.answer.bossBaseInfoModel) {
						baseInfoModel=showHtml.jsonData_common.answer.bossBaseInfoModel.bossBaseInfo.marrige;
					}else if(showHtml.jsonData_common.answer.contactInfoModel){
						baseInfoModel=showHtml.jsonData_common.answer.contactInfoModel.contacts.marrige;
					};
					if(baseInfoModel == "{3DE4DAC9-4357-4E6B-A3BE-2D3B56B6483D}"){
						//设置最小可以删除个数
						parent.data("dataArry").answerLimitMin=2;
					}else {
						//设置最小可以删除个数
						parent.data("dataArry").answerLimitMin=3;
					};
				}else if(showHtml.jsonData_common.modelOjbName=="bossContactModel"){
					var baseInfoModel;
					var partner;
					if(showHtml.jsonData_common.answer.bossBaseInfoModel && showHtml.jsonData_common.answer.bossCompanyInfoModel) {
						baseInfoModel=showHtml.jsonData_common.answer.bossBaseInfoModel.bossBaseInfo.marrige;
						partner=showHtml.jsonData_common.answer.bossCompanyInfoModel.bossShareholderRatioInfos;
						if(partner==null){
							partner=[];
						}
						if(baseInfoModel == "{3DE4DAC9-4357-4E6B-A3BE-2D3B56B6483D}"){
							//设置最小可以删除个数
//							console.log(partner)
							if(partner!=null){
								if(partner.length!=0) {
									parent.data("dataArry").answerLimitMin=1;
								}else {
									parent.data("dataArry").answerLimitMin=2;
									}
							}
						}else {
							//设置最小可以删除个数
							if(partner.length!=0) {
								parent.data("dataArry").answerLimitMin=2;
							}else {
								parent.data("dataArry").answerLimitMin=3;
							};
						};
					};
				};
			}else if(parent.data("dataArry")["type"]=="INPUT"){
				parent.data("answer",showHtml.jsonData_modelOjbName_Answer[objName]);
			}			
		}else{
			var parent=$("#"+id);
			//判断是什么数据类型是Input还是table
			if(this.modelDetailSubListArry.type=="TABLE"){
//				var linenoMaxMin=1;
//				var elem=$("<span data-select='select'>未定义</span>").appendTo("#"+id+" .cy").attr("data-lineno",linenoMaxMin).data("answer",{"lineNo":linenoMaxMin})
//				.attr("index",0);
//				$("#"+id).attr("data-lineno",0);
				if(showHtml.jsonData_common.modelOjbName=="contactInfoModel") {
					//获取答案中是否已婚的答案选项code值
					var baseInfoModel;
					if(showHtml.jsonData_common.answer.baseInfoModel){
						baseInfoModel=showHtml.jsonData_common.answer.baseInfoModel.baseInfo.marrige;
					}else if(showHtml.jsonData_common.answer.bossBaseInfoModel) {
						baseInfoModel=showHtml.jsonData_common.answer.bossBaseInfoModel.bossBaseInfo.marrige;
					}else if(showHtml.jsonData_common.answer.contactInfoModel){
						baseInfoModel=showHtml.jsonData_common.answer.contactInfoModel.contacts.marrige;
					};
					if(baseInfoModel == "{3DE4DAC9-4357-4E6B-A3BE-2D3B56B6483D}"){
						//设置最小可以删除个数
						parent.data("dataArry").answerLimitMin=2;
					}else {
						//设置最小可以删除个数
						parent.data("dataArry").answerLimitMin=3;
					};
				}else if(showHtml.jsonData_common.modelOjbName=="bossContactModel"){
					var baseInfoModel;
					var partner
					if(showHtml.jsonData_common.answer.bossBaseInfoModel && showHtml.jsonData_common.answer.bossCompanyInfoModel) {
						baseInfoModel=showHtml.jsonData_common.answer.bossBaseInfoModel.bossBaseInfo.marrige;
						partner=showHtml.jsonData_common.answer.bossCompanyInfoModel;
						if(baseInfoModel == "{3DE4DAC9-4357-4E6B-A3BE-2D3B56B6483D}"){
							//设置最小可以删除个数
							if(partner.length!=0) {
								parent.data("dataArry").answerLimitMin=1;
							}else {
								parent.data("dataArry").answerLimitMin=2;
								}
						}else {
							//设置最小可以删除个数
							if(partner.length!=0) {
								parent.data("dataArry").answerLimitMin=2;
							}else {
								parent.data("dataArry").answerLimitMin=3;
							};
						};
					};
				};
				var parent=$("#"+id);
				parent.find("ul").css("display","none").end().find(".cy").css("display","none").end().attr("data-lineno",0).attr("index",0);
			}else if(this.modelDetailSubListArry.type=="INPUT"){
				
			}
		};
	}		
};
var judgeCheckFinish={
	judgeLineTool:function(that,showbr,xAddressSwitch){
		//showbr是用来设置是否显示验证提示
		//that传入的是li里面的元素，最大不能超过li
		//xAddressSwitch:是br值用来控制是都使用xAdress的校验，false为不触发
		var _that=this;
		this.showbr=showbr;
		var xAddressSwitch=xAddressSwitch || false;
		var parent_li=that.closest("li");
		var parent=that.closest(".problem");
		//判断存储数组，用于判断有多少个没有通过验证，并且根据这个数组的长度来判断是否全部验证通过
//		_that.unPassArry=[];
		if(that.closest("li")){
			var dataArry=parent_li.data("dataArry");
			switch(dataArry["inputType"]){
				case "CODE":_that.judge_code(parent_li,dataArry,parent);break;
				case "RADIO":_that.judge_code(parent_li,dataArry,parent);break;
				case "CHECKBOX":_that.judge_checkBox(parent_li,dataArry,parent);break;
				case "ADDRESS":_that.judge_address(parent_li,dataArry,parent,xAddressSwitch);break;
				case "DATE":_that.judge_date(parent_li,dataArry,parent);break;
				case "DOUBLE":_that.judge_double(parent_li,dataArry,parent);break;
				case "INTEGER":_that.judge_integer(parent_li,dataArry,parent);break;
				case "STRING":_that.judge_string(parent_li,dataArry,parent);break;
				case "TELEPHONE":_that.judge_phone(parent_li,dataArry,parent);break;
				case "TEXTAREA":_that.judge_textarea(parent_li,dataArry,parent);break;
				case "DATEZONE":_that.judge_dateZone(parent_li,dataArry,parent);break;
			};
		};
		//清空unPassArry数组
		if(_that.unPassArry){
			_that.unPassArry.length=0;
		};
	},
	judge:function(that,showbr,xAddressSwitch){
		//showbr是用来设置是否显示验证提示
		//xAddressSwitch:是br值用来控制是都使用xAdress的校验，false为不触发
		var xAddressSwitch=xAddressSwitch || false;
		var _that=this;
		this.showbr=showbr;
		if(that){
			//that传入的是大块里面的的元素，若没有传值就直接全部判断
			var parent=that.closest(".problem");
			//循环清空所有i标签class类名unfinish
			var check_ele=parent.find('ul li').filter(":visible");
			//判断存储数组，用于判断有多少个没有通过验证，并且根据这个数组的长度来判断是否全部验证通过
			_that.unPassArry=[];
			check_ele.each(function(){
				var dataArry=$(this).data("dataArry");
				switch(dataArry["inputType"]){
					case "CODE":_that.judge_code($(this),dataArry,parent);break;
					case "RADIO":_that.judge_code($(this),dataArry,parent);break;
					case "CHECKBOX":_that.judge_checkBox($(this),dataArry,parent);break;
					case "ADDRESS":_that.judge_address($(this),dataArry,parent,xAddressSwitch);break;
					case "DATE":_that.judge_date($(this),dataArry,parent);break;
					case "DOUBLE":_that.judge_double($(this),dataArry,parent);break;
					case "INTEGER":_that.judge_integer($(this),dataArry,parent);break;
					case "STRING":_that.judge_string($(this),dataArry,parent);break;
					case "TELEPHONE":_that.judge_phone($(this),dataArry,parent);break;
					case "TEXTAREA":_that.judge_textarea($(this),dataArry,parent);break;
					case "DATEZONE":_that.judge_dateZone($(this),dataArry,parent);break;
				};
			});
			if(parent.data("dataArry")["type"]=="INPUT"){
				parent.attr("data-checkState","");
//				parent.find("ul li .left i").filter(":visible").each(function(){
//					if($(this).hasClass("unfinish")){
//						parent.attr("data-checkState","unpass");
//					}
//				});
				if(_that.unPassArry.length!=0){
					parent.attr("data-checkState","unpass");
				}
			}else if(parent.data("dataArry")["type"]=="TABLE"){
				var selectEle=parent.find('.cy span[data-select="select"]');
				selectEle.attr("data-checkState","");
//				
				if(_that.unPassArry.length!=0){
					selectEle.attr("data-checkState","unpass");
				}
			};			
		}else{
			$("section .problem").each(function(){
				var parent=$(this).closest(".problem");
				var check_ele=parent.find('ul li').filter(":visible");
				//判断存储数组，用于判断有多少个没有通过验证，并且根据这个数组的长度来判断是否全部验证通过
				_that.unPassArry=[];
				check_ele.each(function(){
					var dataArry=$(this).data("dataArry");
					switch(dataArry["inputType"]){
						case "CODE":_that.judge_code($(this),dataArry,parent);break;
						case "RADIO":_that.judge_code($(this),dataArry,parent);break;
						case "CHECKBOX":_that.judge_checkBox($(this),dataArry,parent);break;
						case "ADDRESS":_that.judge_address($(this),dataArry,parent,xAddressSwitch);break;
						case "DATE":_that.judge_date($(this),dataArry,parent);break;
						case "DOUBLE":_that.judge_double($(this),dataArry,parent);break;
						case "INTEGER":_that.judge_integer($(this),dataArry,parent);break;
						case "STRING":_that.judge_string($(this),dataArry,parent);break;
						case "TEXTAREA":_that.judge_textarea($(this),dataArry,parent);break;
						case "DATEZONE":_that.judge_dateZone($(this),dataArry,parent);break;
						case "TELEPHONE":_that.judge_phone($(this),dataArry,parent);break;
					};
				});
				if(parent.data("dataArry")["type"]=="INPUT"){
					parent.attr("data-checkState","");
//					
					if(_that.unPassArry.length!=0){
						parent.attr("data-checkState","unpass");
					}
				}else if(parent.data("dataArry")["type"]=="TABLE"){
					var selectEle=parent.find('.cy span[data-select="select"]');
					selectEle.attr("data-checkState","");
//					
					if(_that.unPassArry.length!=0){
						selectEle.attr("data-checkState","unpass");
					}
				};	
			})
		};
	},
	//判断code
	judge_code:function(that,dataArry,parent){
		//that:是带数据的li
		//dataArry:li里面的数据
		//parent:是大块的元素类名为.problem
		//parentDataArry:大块的数据
		var parentDataArry=parent.data("dataArry");
		if(dataArry["inputType"]=="RADIO"){
			var dataCodeObject={};
			var dataCode=that.find(".right input:checked").attr("data-code");
			var modelName=parent.data("dataArry")["objName"];
			var targetField=that.attr("data-fieldname");
			dataCodeObject[targetField]=dataCode;
			if(!showHtml.QestionRegChecker.checkFieldValues(modelName,targetField,dataCodeObject,true,this.showbr)){
				if(this.unPassArry instanceof Array){
					this.unPassArry.push("unpass");
				};
			};
		}else if(dataArry["inputType"]=="CODE"){
			var dataCodeObject={};
			var dataCode=that.find(".right .choose").attr("data-code");
			var modelName=parent.data("dataArry")["objName"];
			var targetField=that.attr("data-fieldname");
			dataCodeObject[targetField]=dataCode;
			if(!showHtml.QestionRegChecker.checkFieldValues(modelName,targetField,dataCodeObject,true,this.showbr)){
				if(this.unPassArry instanceof Array){
					this.unPassArry.push("unpass");
				};
			};
		}
	},
	//判断DOUBLE
	judge_double:function(that,dataArry,parent){
		//that:是带数据的li
		//dataArry:li里面的数据
		//parent:是大块的元素类名为.problem
		//parentDataArry:大块的数据
		var parentDataArry=parent.data("dataArry");
		var dataCodeObject={};
		var dataCode=that.find(".right input").val();
		var modelName=parent.data("dataArry")["objName"];
		var targetField=that.attr("data-fieldname");
		dataCodeObject[targetField]=dataCode;
		if(!showHtml.QestionRegChecker.checkFieldValues(modelName,targetField,dataCodeObject,true,this.showbr)){
			if(this.unPassArry instanceof Array){
				this.unPassArry.push("unpass");
			};
		}
	},
	//判断INTEGER
	judge_integer:function(that,dataArry,parent){
		//that:是带数据的li
		//dataArry:li里面的数据
		//parent:是大块的元素类名为.problem
		//parentDataArry:大块的数据
		var parentDataArry=parent.data("dataArry");
		var dataCodeObject={};
		var dataCode=that.find(".right input").val();
		var modelName=parent.data("dataArry")["objName"];
		var targetField=that.attr("data-fieldname");
		dataCodeObject[targetField]=dataCode;
		if(!showHtml.QestionRegChecker.checkFieldValues(modelName,targetField,dataCodeObject,true,this.showbr)){
			if(this.unPassArry instanceof Array){
				this.unPassArry.push("unpass");
			};
		}
	},
	//判断STRING
	judge_string:function(that,dataArry,parent){
		//that:是带数据的li
		//dataArry:li里面的数据
		//parent:是大块的元素类名为.problem
		//parentDataArry:大块的数据
		var parentDataArry=parent.data("dataArry");
		var dataCodeObject={};
		var dataCode=that.find(".right input").val();
		var modelName=parent.data("dataArry")["objName"];
		var targetField=that.attr("data-fieldname");
		dataCodeObject[targetField]=dataCode;
		if(!showHtml.QestionRegChecker.checkFieldValues(modelName,targetField,dataCodeObject,true,this.showbr)){
			if(this.unPassArry instanceof Array){
				this.unPassArry.push("unpass");
			};
		}
	},
	//判断TELEPHONE
	judge_phone:function(that,dataArry,parent){
		//that:是带数据的li
		//dataArry:li里面的数据
		//parent:是大块的元素类名为.problem
		//parentDataArry:大块的数据
		var parentDataArry=parent.data("dataArry");
		var dataCodeObject={};
		var dataCodeArry=[];
		that.find(".right input").each(function(){
			dataCodeArry.push($(this).val());
		})
		var dataCode=dataCodeArry.join("-");
		if(dataCode=="--"){
			dataCode=null;
		}else{
			if(dataCode.substr(dataCode.length-1)=="-"){
				dataCode = dataCode.slice(0, -1);
			}
		}
		var modelName=parent.data("dataArry")["objName"];
		var targetField=that.attr("data-fieldname");
		dataCodeObject[targetField]=dataCode;
		if(!showHtml.QestionRegChecker.checkFieldValues(modelName,targetField,dataCodeObject,true,this.showbr)){
			if(this.unPassArry instanceof Array){
				this.unPassArry.push("unpass");
			};
		}
	},
	//判断ADDRESS
	judge_address:function(that,dataArry,parent,xAddressSwitch){
		//that:是带数据的li
		//dataArry:li里面的数据
		//parent:是大块的元素类名为.problem
		//parentDataArry:大块的数据
		//xAddressSwitch:是br值用来控制是都使用xAdress的校验
		var parentDataArry=parent.data("dataArry");
		var dataCodeObject={};
		var guid=that.find(".right .choose").attr("guid");
		var modelName=parent.data("dataArry")["objName"];
		var targetField=that.attr("data-fieldname");
		dataCodeObject[targetField]=guid;
		if(!showHtml.QestionRegChecker.checkFieldValues(modelName,targetField,dataCodeObject,true,this.showbr)){
			if(this.unPassArry instanceof Array){
				this.unPassArry.push("unpass");
			};
		};
		//xAddress的值若是false的话就不调用xAddressSwitch验证，若是true的话使用xAddress验证
		if(xAddressSwitch){
			if(that.attr("data-require")=="true"){
				this.judge_xAddress(that,this.showbr);
			}else if(that.attr("data-require")!="true" && that.find(".x-address input").val()){
				this.judge_xAddress(that,this.showbr);
			}
		}else{
			console.log("不使用xAddress验证");
		}
	},
	//判断DATE
	judge_date:function(that,dataArry,parent){
		//that:是带数据的li
		//dataArry:li里面的数据
		//parent:是大块的元素类名为.problem
		//parentDataArry:大块的数据
		var parentDataArry=parent.data("dataArry");
		var dataCodeObject={};
		var answerDate=that.find(".right input").val();
		var modelName=parent.data("dataArry")["objName"];
		var targetField=that.attr("data-fieldname");
		dataCodeObject[targetField]=answerDate;
		if(!showHtml.QestionRegChecker.checkFieldValues(modelName,targetField,dataCodeObject,true,this.showbr)){
			if(this.unPassArry instanceof Array){
				this.unPassArry.push("unpass");
			};
		};
	},
	//判断CHECKBOX
	judge_checkBox:function(that,dataArry,parent){
		//that:是带数据的li
		//dataArry:li里面的数据
		//parent:是大块的元素类名为.problem
		//parentDataArry:大块的数据
		var parentDataArry=parent.data("dataArry");
		var dataCodeObject={};
		var dataCodeArry=[];
		that.find(".right input:checked").each(function(){
			dataCodeArry.push($(this).attr("data-code"));
		});
		var dataCode=dataCodeArry.join(",");
		var modelName=parent.data("dataArry")["objName"];
		var targetField=that.attr("data-fieldname");
		dataCodeObject[targetField]=dataCode;
		if(!showHtml.QestionRegChecker.checkFieldValues(modelName,targetField,dataCodeObject,true,this.showbr)){
			if(this.unPassArry instanceof Array){
				this.unPassArry.push("unpass");
			};
		};
	},
	//判断DATEZONE
	judge_dateZone:function(that,dataArry,parent){
		//that:是带数据的li
		//dataArry:li里面的数据
		//parent:是大块的元素类名为.problem
		//parentDataArry:大块的数据
		var parentDataArry=parent.data("dataArry");
		var dataCodeObject={};
		var dataCodeArry=[];
		that.find(".right input").each(function(){
			dataCodeArry.push($(this).val());
		});
		console.log(dataCodeArry);
		var dataCode=dataCodeArry.join(",");
		var modelName=parent.data("dataArry")["objName"];
		var targetField=that.attr("data-fieldname");
		if(dataCode.trim()!=","){
			dataCodeObject[targetField]=dataCode;
		}else{
			dataCodeObject[targetField]=null;
		};
		if(!showHtml.QestionRegChecker.checkFieldValues(modelName,targetField,dataCodeObject,true,this.showbr)){
			if(this.unPassArry instanceof Array){
				this.unPassArry.push("unpass");
			};			
		};
	},
	//判断TEXTAREA
	judge_textarea:function(that,dataArry,parent){
		//that:是带数据的li
		//dataArry:li里面的数据
		//parent:是大块的元素类名为.problem
		//parentDataArry:大块的数据
		var parentDataArry=parent.data("dataArry");
		var dataCodeObject={};
		var dataCode=that.find(".right textarea").val();
		var modelName=parent.data("dataArry")["objName"];
		var targetField=that.attr("data-fieldname");
		dataCodeObject[targetField]=dataCode;
		console.log(modelName,targetField,dataCodeObject);
		if(!showHtml.QestionRegChecker.checkFieldValues(modelName,targetField,dataCodeObject,true,this.showbr)){
			if(this.unPassArry instanceof Array){
				this.unPassArry.push("unpass");
			};
		};
	},
	//判断ADDRESS的.x-address是否认填写(可以单独使用)
	judge_xAddress:function(that,showbr){
		//that:是带数据的li,最大值不能超过li
		//showbr:为br值，若是false的是提示，若是true为不提示
		var parent_li=that.closest("li");
		var parent_liDataArry=parent_li.data("dataArry");
		//正则验证规则,变成真正的正则，进行验证判断。
		var	parent_liRegexRule=parent_liDataArry["regexRule"];
		var parent_liRegexRuleArray=parent_liRegexRule.split("");
		parent_liRegexRuleArray.push("/");
		parent_liRegexRuleArray.unshift("/");
		parent_liRegexRule=parent_liRegexRuleArray.join("");
		parent_liRegexRule=eval(parent_liRegexRule);
		var parent=that.closest(".problem");
		var parentDataArry=parent.data("dataArry");
		var xAddressEle=parent_li.find(".x-address");
		//br值用来判断x-address是否要显示提示信息，若为true的话不显示提示信息，false显示提示信息
		var br;
		if(this.showbr!=undefined||this.showbr!=null){
			br=this.showbr;
		}else{
			if(showbr!=undefined||showbr!=null){
				br=showbr;
			}else{
				br=true;
			};
		};
		var xAddressEleContent=xAddressEle.find("input").val().trim();
		//把提示信息元素先删除
		parent_li.find(".x-address label").remove();
		if(xAddressEleContent){
			//有值的s方法
			if(br){
				if(this.unPassArry instanceof Array && this.unPassArry){
					if(parent_liRegexRule.test(xAddressEleContent)){
						console.log("x-address正则判断结果符合要求，并且不显示提示");
					}else{
						this.unPassArry.push("unpass");
					};
				}else{
					if(parent_liRegexRule.test(xAddressEleContent)){
						console.log("x-address正则判断结果符合要求，并且不显示提示");
					}else{
						console.log("x-address正则判断结果不符合符合要求，并且不显示提示");
					};
				};
			}else{
				if(this.unPassArry instanceof Array && this.unPassArry){
					if(parent_liRegexRule.test(xAddressEleContent)){
						console.log("x-address正则判断结果符合要求，并且显示提示");
					}else{
						var promptEle='<label class="message_info" field="sex">'+parent_li.data("dataArry")["regexRuleName"]+'</label>';
						parent_li.find(".x-address p:nth-child(1)").append(promptEle);
						this.unPassArry.push("unpass");
					};
				}else{
					if(parent_liRegexRule.test(xAddressEleContent)){
						console.log("x-address正则判断结果符合要求，并且显示提示");
					}else{
						var promptEle='<label class="message_info" field="sex">'+parent_li.data("dataArry")["regexRuleName"]+'</label>';
						parent_li.find(".x-address p:nth-child(1)").append(promptEle);
					};
				};
			};
		}else{
			if(br){
				if(this.unPassArry instanceof Array && this.unPassArry){
					this.unPassArry.push("unpass");
				}else{
					console.log("x-address判断结果为没有值，并且不显示提示");
				};
			}else{
				if(this.unPassArry instanceof Array && this.unPassArry){
					var promptEle='<label class="message_info" field="sex">'+parent_li.data("dataArry")["regexRuleName"]+'</label>';
					parent_li.find(".x-address p:nth-child(1)").append(promptEle);
					this.unPassArry.push("unpass");
				}else{
					var promptEle='<label class="message_info" field="sex">'+parent_li.data("dataArry")["regexRuleName"]+'</label>';
					parent_li.find(".x-address p:nth-child(1)").append(promptEle);
				};
			};			
		};
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
			//把当前的选中小标签或者大块INPUT的data-judgeFinish为"";
			if(parent.data("dataArry")["type"]=="TABLE"){
				parent.find('.cy span[data-select="select"]').attr("data-judgeFinish","");
			}else if(parent.data("dataArry")["type"]=="INPUT"){
				parent.attr("data-judgeFinish","");
			}
			check_ele.each(function(){
				var dataArry=$(this).data("dataArry");
				//this.judgeBr:使用来判断必填项是否为空，空的话返回true，
				_that.judgeBr="";
				switch(dataArry["inputType"]){
					case "CODE":_that.judge_code($(this),dataArry,parent);break;
					case "RADIO":_that.judge_code($(this),dataArry,parent);break;
					case "CHECKBOX":_that.judge_checkbox($(this),dataArry,parent);break;
					case "ADDRESS":_that.judge_address($(this),dataArry,parent);break;
					case "DATE":_that.judge_date($(this),dataArry,parent);break;
					case "DOUBLE":_that.judge_double($(this),dataArry,parent);break;
					case "INTEGER":_that.judge_integer($(this),dataArry,parent);break;
					case "STRING":_that.judge_string($(this),dataArry,parent);break;
					case "TELEPHONE":_that.judge_phone($(this),dataArry,parent);break;
					case "TEXTAREA":_that.judge_textarea($(this),dataArry,parent);break;
					case "DATEZONE":_that.judge_dateZone($(this),dataArry,parent);break;
				};
				//this.judgeBr是true的话就跳出这个循环,就可以判断它没有填完
				if(_that.judgeBr=="true"){
					return false;
				};
			});
		}else{
			$("section .problem").each(function(){
				var parent=$(this);
				//把当前的选中小标签或者大块INPUT的data-judgeFinish为"";
				if(parent.data("dataArry")["type"]=="TABLE"){
					parent.find('.cy span[data-select="select"]').attr("data-judgeFinish","");
				}else if(parent.data("dataArry")["type"]=="INPUT"){
					parent.attr("data-judgeFinish","");
				};
				var check_ele=$(this).find('ul li[data-require="true"]').filter(":visible");
				check_ele.each(function(){
					var dataArry=$(this).data("dataArry");
					//this.judgeBr:使用来判断必填项是否为空，空的话返回true，
					_that.judgeBr="";
					switch(dataArry["inputType"]){
						case "CODE":_that.judge_code($(this),dataArry,parent);break;
						case "RADIO":_that.judge_code($(this),dataArry,parent);break;
						case "CHECKBOX":_that.judge_checkbox($(this),dataArry,parent);break;
						case "ADDRESS":_that.judge_address($(this),dataArry,parent);break;
						case "DATE":_that.judge_date($(this),dataArry,parent);break;
						case "DOUBLE":_that.judge_double($(this),dataArry,parent);break;
						case "INTEGER":_that.judge_integer($(this),dataArry,parent);break;						
						case "STRING":_that.judge_string($(this),dataArry,parent);break;
						case "TELEPHONE":_that.judge_phone($(this),dataArry,parent);break;
						case "TEXTAREA":_that.judge_textarea($(this),dataArry,parent);break;
						case "DATEZONE":_that.judge_dateZone($(this),dataArry,parent);break;
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
		if(dataArry["inputType"]=="RADIO"){
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
		}else if(dataArry["inputType"]=="CODE"){
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
			if(!that.find(".right .choose").attr("guid") && !that.find(".x-address input").val().trim()){
				select_ele.attr("data-judgeFinish","no");
				this.judgeBr="true";
			}else if(that.find(".right .choose").attr("guid") && !that.find(".x-address input").val().trim()){
				select_ele.attr("data-judgeFinish","no");
				this.judgeBr="true";
			}else if(!that.find(".right .choose").attr("guid") && that.find(".x-address input").val().trim()){
				select_ele.attr("data-judgeFinish","no");
				this.judgeBr="true";
			}else{
				select_ele.attr("data-judgeFinish","");
			};				
		}else if(parent.data("dataArry")["type"]=="INPUT"){
			if(!that.find(".right .choose").attr("guid") && !that.find(".x-address input").val().trim()){
				parent.attr("data-judgeFinish","no");
				this.judgeBr="true";
			}else if(that.find(".right .choose").attr("guid") && !that.find(".x-address input").val().trim()){
				parent.attr("data-judgeFinish","no");
				this.judgeBr="true";
			}else if(!that.find(".right .choose").attr("guid") && that.find(".x-address input").val().trim()){
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
			if(!that.find(".right input").val().trim()){
				select_ele.attr("data-judgeFinish","no");
				this.judgeBr="true";
			}else{
				select_ele.attr("data-judgeFinish","");
			};				
		}else if(parent.data("dataArry")["type"]=="INPUT"){
			if(!that.find(".right input").val().trim()){
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
			if(!that.find(".right input").val().trim()){
				select_ele.attr("data-judgeFinish","no");
				this.judgeBr="true";
			}else{
				select_ele.attr("data-judgeFinish","");
			};				
		}else if(parent.data("dataArry")["type"]=="INPUT"){
			if(!that.find(".right input").val().trim()){
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
			if(!that.find(".right input").val().trim()){
				select_ele.attr("data-judgeFinish","no");
				this.judgeBr="true";
			}else{
				select_ele.attr("data-judgeFinish","");
			};				
		}else if(parent.data("dataArry")["type"]=="INPUT"){
			if(!that.find(".right input").val().trim()){
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
			if(!that.find(".right input").val().trim()){
				select_ele.attr("data-judgeFinish","no");
				this.judgeBr="true";
			}else{
				select_ele.attr("data-judgeFinish","");
			};				
		}else if(parent.data("dataArry")["type"]=="INPUT"){
			if(!that.find(".right input").val().trim()){
				parent.attr("data-judgeFinish","no");
				this.judgeBr="true";
			}else{
				parent.attr("data-judgeFinish","");
			};
		};
	},
	//判断TELEPHONE
	judge_phone:function(that,dataArry,parent){
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
				select_ele.attr("data-judgeFinish","");
			}else{
				select_ele.attr("data-judgeFinish","no");
				this.judgeBr="true";
			};				
		}else if(parent.data("dataArry")["type"]=="INPUT"){
			var mun=0;
			that.find(".right input").each(function(){
				if($(this).val()){
					mun++;
				}
			});
			console.log(mun)
			if(mun>=2){
				parent.attr("data-judgeFinish","");
			}else{
				parent.attr("data-judgeFinish","no");
				this.judgeBr="true";
			};
		};
	},
	//判断Textarea
	judge_textarea:function(that,dataArry,parent){
		//that:是带数据的li
		//dataArry:li里面的数据
		//parent:是大块的元素类名为.problem
		//parentDataArry:大块的数据
		var parentDataArry=parent.data("dataArry");
		if(parent.data("dataArry")["type"]=="TABLE"){
			var select_ele=parent.find('.cy span[data-select="select"]');
			if(!that.find(".right textarea").val().trim()){
				select_ele.attr("data-judgeFinish","no");
				this.judgeBr="true";
			}else{
				select_ele.attr("data-judgeFinish","");
			};				
		}else if(parent.data("dataArry")["type"]=="INPUT"){
			if(!that.find(".right textarea").val().trim()){
				parent.attr("data-judgeFinish","no");
				this.judgeBr="true";
			}else{
				parent.attr("data-judgeFinish","");
			};
		};
	},
	//判断DateZone
	judge_dateZone:function(that,dataArry,parent){
		var _that=this;
		//that:是带数据的li
		//dataArry:li里面的数据
		//parent:是大块的元素类名为.problem
		//parentDataArry:大块的数据
		var parentDataArry=parent.data("dataArry");
		if(parent.data("dataArry")["type"]=="TABLE"){
			var select_ele=parent.find('.cy span[data-select="select"]');
			that.find(".right input").each(function(){
				if(!$(this).val().trim()){
					select_ele.attr("data-judgeFinish","no");
					_that.judgeBr="true";
					return false;
				}else{
					select_ele.attr("data-judgeFinish","");
				}
			});
		}else if(parent.data("dataArry")["type"]=="INPUT"){
			that.find(".right input").each(function(){
				if(!$(this).val().trim()){
					parent.attr("data-judgeFinish","no");
					_that.judgeBr="true";
					return false;
				}else{
					parent.attr("data-judgeFinish","");
				};
			})			
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
				case "RADIO":_that.save_Code($(this),dataArry,answerName);break;
				case "CHECKBOX":_that.save_Checkbox($(this),dataArry,answerName);break;
				case "ADDRESS":_that.save_Address($(this),dataArry,answerName);break;
				case "DATE":_that.save_Date($(this),dataArry,answerName);break;
				case "DOUBLE":_that.save_Double($(this),dataArry,answerName);break;
				case "INTEGER":_that.save_Integer($(this),dataArry,answerName);break;
				case "STRING":_that.save_String($(this),dataArry,answerName);break;
				case "TEXTAREA":_that.save_Textarea($(this),dataArry,answerName);break;
				case "TELEPHONE":_that.save_Telephone($(this),dataArry,answerName);break;
				case "DATEZONE":_that.save_DateZone($(this),dataArry,answerName);break;
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
				case "RADIO":_that.save_Code($(this),dataArry,answerName);break;
				case "CHECKBOX":_that.save_Checkbox($(this),dataArry,answerName);break;
				case "ADDRESS":_that.save_Address($(this),dataArry,answerName);break;
				case "DATE":_that.save_Date($(this),dataArry,answerName);break;
				case "DOUBLE":_that.save_Double($(this),dataArry,answerName);break;
				case "INTEGER":_that.save_Integer($(this),dataArry,answerName);break;
				case "STRING":_that.save_String($(this),dataArry,answerName);break;
				case "TEXTAREA":_that.save_Textarea($(this),dataArry,answerName);break;
				case "TELEPHONE":_that.save_Telephone($(this),dataArry,answerName);break;
				case "DATEZONE":_that.save_DateZone($(this),dataArry,answerName);break;
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
			//黄子建动态验证方法数据整理之后存储答案用data()方法存储在大块数据里面的objName
		 	var answerArry=[];
		 	parentSingle_table.children(".cy").children("span").each(function(){
		 		answerArry.push($(this).data("answer"));
		 	});
//		 	console.log(answerArry);
		 	parentSingle_table.data(parentSingle_table.data("dataArry")["objName"],answerArry);
//		 	console.log(parentSingle_table.data(parentSingle_table.data("dataArry")["objName"]));
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
							case "RADIO":_that.save_Code($(this),dataArry,answerName);break;
							case "CHECKBOX":_that.save_Checkbox($(this),dataArry,answerName);break;
							case "ADDRESS":_that.save_Address($(this),dataArry,answerName);break;
							case "DATE":_that.save_Date($(this),dataArry,answerName);break;
							case "DOUBLE":_that.save_Double($(this),dataArry,answerName);break;
							case "INTEGER":_that.save_Integer($(this),dataArry,answerName);break;
							case "STRING":_that.save_String($(this),dataArry,answerName);break;
							case "TEXTAREA":_that.save_Textarea($(this),dataArry,answerName);break;
							case "TELEPHONE":_that.save_Telephone($(this),dataArry,answerName);break;
							case "DATEZONE":_that.save_DateZone($(this),dataArry,answerName);break;
						};						
					});
				var giveDataEle=$(this).find(".cy").children('span[data-select="select"]');
				var mustObject={"lineNo":giveDataEle.attr("data-lineno"),"serialNo":showHtml.jsonData_answer_serialNo};
				_that.answerTotal=$.extend(_that.answerTotal,mustObject);	
				giveDataEle.data("answer",_that.answerTotal);
				//黄子建动态验证方法数据整理之后存储答案用data()方法存储在大块数据里面的objName
			 	var answerArry=[];
			 	$(this).children(".cy").children("span").each(function(){
			 		answerArry.push($(this).data("answer"));
			 	});
			 	$(this).data(dataArry["objName"],answerArry);
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
			var mustObject={"serialNo":showHtml.jsonData_answer_serialNo};
			this.answerTotal=$.extend(this.answerTotal,mustObject);	
			parentSingle_table.data("answer",this.answerTotal);
			//黄子建动态验证方法数据存储答案用data()方法存储在大块数据里面的objName
			parentSingle_table.data(parentSingle_table.data("dataArry")["objName"],this.answerTotal);
			this.answerTotal={};
		}else{
			this.answerTotal={};
			$("section").children(".problem").each(function(){
				var dataArry=$(this).data("dataArry");				
				if(dataArry.type=="INPUT"){
					
					$(this).find("ul").children("li:visible").each(function(){						
						var dataArry=$(this).data("dataArry");
						//answerName答案名字
						var answerName=dataArry.fieldName;
//						console.log(answerName);
						//inputType用于判断是什么小数据类型，在根据不同的数据类型来实行不同
						var inputType=dataArry.inputType;
//						console.log(inputType);
						switch(inputType){
						    case "CODE":_that.save_Code($(this),dataArry,answerName);break;
							case "RADIO":_that.save_Code($(this),dataArry,answerName);break;
							case "CHECKBOX":_that.save_Checkbox($(this),dataArry,answerName);break;
							case "ADDRESS":_that.save_Address($(this),dataArry,answerName);break;
							case "DATE":_that.save_Date($(this),dataArry,answerName);break;
							case "DOUBLE":_that.save_Double($(this),dataArry,answerName);break;
							case "INTEGER":_that.save_Integer($(this),dataArry,answerName);break;
							case "STRING":_that.save_String($(this),dataArry,answerName);break;
							case "TEXTAREA":_that.save_Textarea($(this),dataArry,answerName);break;
							case "TELEPHONE":_that.save_Telephone($(this),dataArry,answerName);break;
							case "DATEZONE":_that.save_DateZone($(this),dataArry,answerName);break;
						};						
					});
				var mustObject={"serialNo":showHtml.jsonData_answer_serialNo}
				_that.answerTotal=$.extend(_that.answerTotal,mustObject);
				$(this).data("answer",_that.answerTotal);
				//黄子建动态验证方法数据存储答案用data()方法存储在大块数据里面的objName
				$(this).data($(this).data("dataArry")["objName"],this.answerTotal);
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
		if(dataArry.inputType=="RADIO"){
			if(that.find("input:checked").length==0){				
				this.answerTotal[answerName]=null;
			}else{
				this.answerTotal[answerName]=that.find("input:checked").attr("data-code");
			}
		}else if(dataArry.inputType=="CODE"){
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
			if(that.find(".x-address input").val().trim()){
				dataArry.push(that.find("span.choose").attr("guid"));
				dataArry.push(that.find(".x-address input").val());
				var data=dataArry.join("||");
				this.answerTotal[answerName]=data;
			}else{
				this.answerTotal[answerName]=that.find("span.choose").attr("guid");			
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
		//dataBr用于判断是否为空值，经过去空格处理
		var dataBr=that.find("input").val().trim();
		if(dataBr){
			this.answerTotal[answerName]=data;
		}else{
			this.answerTotal[answerName]=null;
		};		
	},
	//Double数据的存储
	save_Double:function(that,dataArry,answerName){
		//that:表示数据的li
		//dataArry:li里面的小列表数据
		//answerName:答案名字
		var data=that.find("input").val();
		//dataBr用于判断是否为空值，经过去空格处理
		var dataBr=that.find("input").val().trim();
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
		if(dataBr){
			this.answerTotal[answerName]=data;
		}else{
			this.answerTotal[answerName]=null;
		};
	},
	//Integer数据的存储
	save_Integer:function(that,dataArry,answerName){
		//that:表示数据的li
		//dataArry:li里面的小列表数据
		//answerName:答案名字		
		var data=that.find("input").val();
		//dataBr用于判断是否为空值，经过去空格处理
		var dataBr=that.find("input").val().trim();
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
		if(dataBr){
			this.answerTotal[answerName]=data;
		}else{
			this.answerTotal[answerName]=null;
		};		
	},
	//String数据的存储
	save_String:function(that,dataArry,answerName){
		//that:表示数据的li
		//dataArry:li里面的小列表数据
		//answerName:答案名字
		var data=that.find("input").val();
		//dataBr用于判断是否为空值，经过去空格处理
		var dataBr=that.find("input").val().trim();
		if(dataBr){
			this.answerTotal[answerName]=data;
		}else{
			this.answerTotal[answerName]=null;
		};
	},
	//Textarea数据的存储
	save_Textarea:function(that,dataArry,answerName){
		//that:表示数据的li
		//dataArry:li里面的小列表数据
		//answerName:答案名字
		var data=that.find(".right textarea").val();
		//dataBr用于判断是否为空值，经过去空格处理
		var dataBr=that.find(".right textarea").val().trim();
		if(dataBr){
			this.answerTotal[answerName]=data;
		}else{
			this.answerTotal[answerName]=null;
		};
	},
	//TELEPHONE数据的存储
	save_Telephone:function(that,dataArry,answerName){
		//that:表示数据的li
		//dataArry:li里面的小列表数据
		//answerName:答案名字
		var telephoneArry=[];
		that.find(".right input").each(function(){
//			
			telephoneArry.push($(this).val());
		});
		if(telephoneArry.length!=0){
			var telephone=telephoneArry.join("-");
			if(telephone=="--"){
				telephone=null;
			};
			if(telephone!=null){
				if(telephone.substr(telephone.length-1)=="-"){
					telephone = telephone.slice(0, -1);
				}
			};
			this.answerTotal[answerName]=telephone;
		}else{
			this.answerTotal[answerName]=null;
		};		
	},
	//DATEZONE数据存储
	save_DateZone:function(that,dataArry,answerName){
		//that:表示数据的li
		//dataArry:li里面的小列表数据
		//answerName:答案名字
		var temporaryArry=[];
		that.find(".right input").each(function(){
			temporaryArry.push($(this).val());
		});
		var content=temporaryArry.join(',');
		if(content.trim()!=","){
			this.answerTotal[answerName]=content;
		}else{
			this.answerTotal[answerName]=null;
		}
	}
};
//数据的渲染
var showData={
	//总体数据渲染
	showData:function(_that){
		if(!_that){
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
						if(answer[index]=="null,null"){
							answer[index]=null;
						}
						switch(type){
							case "CODE":that.showData_Code(answerEle,answer[index]);break;
							case "RADIO":that.showData_Code(answerEle,answer[index]);break;
							case "CHECKBOX":that.showData_Checkbox(answerEle,answer[index]);break;
							case "ADDRESS":that.showData_Address(answerEle,answer[index]);break;
							case "DATE":that.showData_Date(answerEle,answer[index]);break;
							case "DOUBLE":that.showData_Double(answerEle,answer[index]);break;
							case "INTEGER":that.showData_Integer(answerEle,answer[index]);break;
							case "STRING":that.showData_String(answerEle,answer[index]);break;
							case "TEXTAREA":that.showData_Textarea(answerEle,answer[index]);break;
							case "TELEPHONE":that.showData_Telephone(answerEle,answer[index]);break;
							case "DATEZONE":that.showData_DateZone(answerEle,answer[index]);break;
						};
					};					
				};
				
				//动态显示显示优先
				$(this).find('ul li[data-controlshow="1"]').each(function(){
					//动态显示控制
					showHtml.controlShow($(this));
					//跨大块动态控制
					showHtml.transboundaryControlShow($(this));
				});
				//大块单行输入行题目字体变色
				showHtml.judgeEntryTopicChangeColor.pieceTool($(this));
//				//给被动态验证的元素li附上相对应的验证规则和正则用data()checkrule存起来的等。
//				checkData.giveCheckEle();
//				//进行验证
//				checkData.checkData();
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
							case "RADIO":that.showData_Code(answerEle,answer[index]);break;
							case "CHECKBOX":that.showData_Checkbox(answerEle,answer[index]);break;
							case "ADDRESS":that.showData_Address(answerEle,answer[index]);break;
							case "DATE":that.showData_Date(answerEle,answer[index]);break;
							case "DOUBLE":that.showData_Double(answerEle,answer[index]);break;
							case "INTEGER":that.showData_Integer(answerEle,answer[index]);break;
							case "STRING":that.showData_String(answerEle,answer[index]);break;
							case "TEXTAREA":that.showData_Textarea(answerEle,answer[index]);break;
							case "TELEPHONE":that.showData_Telephone(answerEle,answer[index]);break;
							case "DATEZONE":that.showData_DateZone(answerEle,answer[index]);break;
						};
					};					
				};
				
//				
				//动态显示显示优先
				$(this).find('ul li[data-controlshow="1"]').each(function(){
					//动态显示控制
					showHtml.controlShow($(this));
					//跨大块动态控制
					showHtml.transboundaryControlShow($(this));
				});
				//大块单行输入行题目字体变色
				showHtml.judgeEntryTopicChangeColor.pieceTool($(this));
//				//给被动态验证的元素li附上相对应的验证规则和正则用data()checkrule存起来的等。
//				checkData.giveCheckEle();
//				//进行验证
//				checkData.checkData();
			};
		})
		}else{
			var that=this;
			//parent:为大块
			var parent=_that.closest(".problem");
			//每一个大块的数据
			var bigDataArry=parent.data("dataArry");
			//样式格式化.problem里面的ul的元素内容
			showHtml.againElem(parent);
			parent.find("ul li").attr("data-answerEle","no");
			if(bigDataArry.type=="TABLE"){
				//answer：把一开始加载页面的时把数据存储到.cy span[data-select="select"]里面的答案提取出来
				var answer=parent.find('.cy span[data-select="select"]').data("answer");				
				for(var index in answer){
					//取得data-fieldname属性与答案名字一样的li
					var answerEle=parent.children("ul").children('li[data-fieldname='+index+']');
					//在每一个对应的答案元素变迁li里面都添加自定义属性data-answerEle，若是属性值是yes的话表示对应的答案li
					answerEle.attr("data-answerEle","yes");
					//获取小模块的的type类型
					if(answerEle.length!=0){
						var type=answerEle.data("dataArry")["inputType"];
						switch(type){
							case "CODE":that.showData_Code(answerEle,answer[index]);break;
							case "RADIO":that.showData_Code(answerEle,answer[index]);break;
							case "CHECKBOX":that.showData_Checkbox(answerEle,answer[index]);break;
							case "ADDRESS":that.showData_Address(answerEle,answer[index]);break;
							case "DATE":that.showData_Date(answerEle,answer[index]);break;
							case "DOUBLE":that.showData_Double(answerEle,answer[index]);break;
							case "INTEGER":that.showData_Integer(answerEle,answer[index]);break;
							case "STRING":that.showData_String(answerEle,answer[index]);break;
							case "TEXTAREA":that.showData_Textarea(answerEle,answer[index]);break;
							case "TELEPHONE":that.showData_Telephone(answerEle,answer[index]);break;
							case "DATEZONE":that.showData_DateZone(answerEle,answer[index]);break;
						};
					};					
				};
				//判断是否有动态选择的选项
//				if(parent.find('ul li[data-controlshow="1"]').length!=0){
//					parent.children("ul").children('li').filter('li[data-answerEle="yes"]').css({"display":"block"}).end()					
//					.filter('li[data-answerEle="no"]').css({"display":"none"});
//				};
				//动态显示显示优先
				parent.find('ul li[data-controlshow="1"]').each(function(){
					//动态显示控制
					showHtml.controlShow($(this));
					//跨大块动态控制
					showHtml.transboundaryControlShow($(this));
				});
				//大块单行输入行题目字体变色
				showHtml.judgeEntryTopicChangeColor.pieceTool(parent);
			}else if(bigDataArry.type=="INPUT"){
				//answer：把一开始加载页面的时把数据存储到.problem里面的答案提取出来
				var answer=parent.data("answer");
				for(var index in answer){
					//取得data-fieldname属性与答案名字一样的li
					var answerEle=parent.children("ul").children('li[data-fieldname='+index+']');
					//在每一个对应的答案元素变迁li里面都添加自定义属性data-answerEle，若是属性值是yes的话表示对应的答案li
					answerEle.attr("data-answerEle","yes");
					//获取小模块的的type类型
					if(answerEle.length!=0){
						var type=answerEle.data("dataArry")["inputType"];
//					console.log(type);
						switch(type){
							case "CODE":that.showData_Code(answerEle,answer[index]);break;
							case "RADIO":that.showData_Code(answerEle,answer[index]);break;
							case "CHECKBOX":that.showData_Checkbox(answerEle,answer[index]);break;
							case "ADDRESS":that.showData_Address(answerEle,answer[index]);break;
							case "DATE":that.showData_Date(answerEle,answer[index]);break;
							case "DOUBLE":that.showData_Double(answerEle,answer[index]);break;
							case "INTEGER":that.showData_Integer(answerEle,answer[index]);break;
							case "STRING":that.showData_String(answerEle,answer[index]);break;
							case "TEXTAREA":that.showData_Textarea(answerEle,answer[index]);break;
							case "TELEPHONE":that.showData_Telephone(answerEle,answer[index]);break;
							case "DATEZONE":that.showData_DateZone(answerEle,answer[index]);break;
						};
					};					
				};
//				
				
				//动态显示显示优先
				parent.find('ul li[data-controlshow="1"]').each(function(){
					//动态显示控制
					showHtml.controlShow($(this));
					//跨大块动态控制
					showHtml.transboundaryControlShow($(this));
				});
				//大块单行输入行题目字体变色
				showHtml.judgeEntryTopicChangeColor.pieceTool(parent);
			}			
		}
	},
	//Code的数据渲染
	showData_Code:function(answerEle,answer){
		//answerEle:是符合data-fieldname属性与答案名对应的的li
		//answer:是答案
		var codeDicList_length=answerEle.data("dataArry")["inputType"];
		if(answer!=null){			
			if(codeDicList_length=="RADIO"){
				answerEle.find('input[data-code='+'"'+answer+'"'+']').prop("checked",true);			
				answerEle.find("input").each(function(){
					if($(this).prop("checked")){
						$(this).nextAll("i").css("display","block");
					}else{
						$(this).nextAll("i").css("display","none");
					};				
				});
			}else if(codeDicList_length=="CODE"){
				answerEle.find(".right .choose").attr("data-code",answer);
				answerEle.find(".right .choose").attr("name",answer);
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
			if(codeDicList_length=="RADIO"){
				
				//方案三:取消必填项的判断
				var dataArry=answerEle.data("dataArry");
					if(dataArry["defaultValue"]){
					//默认值
					var defaultValue=dataArry["defaultValue"];
					answerEle.find('input[data-code='+'"'+defaultValue+'"'+']').prop("checked",true);			
					answerEle.find("input").each(function(){
						if($(this).prop("checked")){
							$(this).nextAll("i").css("display","block");
						}else{
							$(this).nextAll("i").css("display","none");
						};				
					});
				}
			}else if(codeDicList_length=="CODE"){
				
				//方案三:取消必填项的判断
				var dataArry=answerEle.data("dataArry");
				if(dataArry["defaultValue"]){						
					//默认值
					var defaultValue=dataArry["defaultValue"];
					answerEle.find(".right .choose").attr("data-code",defaultValue);
					answerEle.find(".right .choose").attr("name",defaultValue);
					//多选答案数组信息
					var moreRadioArry=answerEle.data("dataArry")["codeDicList"];
					//对答案进行数据的排列整理，用moreRadioObject存起来
					var moreRadioObject={};
					for(var i=0;i<moreRadioArry.length;i++){
						moreRadioObject[moreRadioArry[i].code]=moreRadioArry[i].name
					};
					answerEle.find(".right .choose").text(moreRadioObject[defaultValue]);	
					if(answerEle.find(".right .choose").attr("data-code")==""){
						answerEle.find(".right .choose").css({"color":"#a09fa4"});
					}else{
						answerEle.find(".right .choose").css({"color":"#191919"});
					};
				}else{
					answerEle.find(".right .choose").attr("data-code","").text("请选择").css({"color":"#a09fa4"});
				}				
			};
		};
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
			
			//方案三:取消默认值的判断
			var dataArryTotal=answerEle.data("dataArry");
			if(dataArryTotal["defaultValue"]){
				//默认值
				var defaultValue=dataArryTotal["defaultValue"];
				var dataArry=defaultValue.split(",");
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
			}
		};
	},
	//Address的数据渲染
	showData_Address:function(answerEle,answer){
		//answerEle:是符合data-fieldname属性与答案名对应的的li
		//answer:是答案
		if(answer!=null){
			var answerArry=answer.split("||");
			console.log(answerArry);
			//provinceCity转义出省市区名称的返回值
			var provinceCity=AndroidJs.getAddressByGuid(answerArry[0]);
			answerEle.find(".right .choose").attr("guid",answerArry[0]).text(provinceCity);			
			answerEle.find(".x-address input").val(answerArry[1]);
		}else{
			//方案一:不显示默认值
//			console.log("Address数据功能正在开发中，敬请期待");
//			answerEle.find(".right .choose").attr("guid","").text("请选择");
//			answerEle.find(".x-address input").val("");
			//方案二:显示默认值
//			if(answerEle.attr("data-require")=="true"){
//				var dataArryTotal=answerEle.data("dataArry");
//				if(dataArryTotal["defaultValue"]){
//					//默认值
////					var defaultValue=dataArryTotal["defaultValue"].split("||");
////					console.log(defaultValue);
//					//provinceCity转义出省市区名称的返回值
////					var provinceCity=AndroidJs.getAddressByGuid(defaultValue[0]);
////					answerEle.find(".right .choose").attr("guid",defaultValue[0]).text(provinceCity);			
////					answerEle.find(".x-address input").val(answerArry[1]);
//				}else{
//					console.log("Address数据没有获取到");
//					answerEle.find(".right .choose").attr("guid","").text("请选择");
//					answerEle.find(".x-address input").val("");
//				}
//			}else{
//				console.log("Address数据没有获取到");
//				answerEle.find(".right .choose").attr("guid","").text("请选择");
//				answerEle.find(".x-address input").val("");
//			}
			//方案三:取消必填的判断
			var dataArryTotal=answerEle.data("dataArry");
			if(dataArryTotal["defaultValue"]){
				//默认值
					var defaultValue=dataArryTotal["defaultValue"].split("||");
					console.log(defaultValue);
				//provinceCity转义出省市区名称的返回值
					var provinceCity=AndroidJs.getAddressByGuid(defaultValue[0]);
					answerEle.find(".right .choose").attr("guid",defaultValue[0]).text(provinceCity);			
					answerEle.find(".x-address input").val(answerArry[1]);
			}else{
				console.log("Address数据没有获取到");
				answerEle.find(".right .choose").attr("guid","").text("请选择");
				answerEle.find(".x-address input").val("");
			};
		};
	},
	//Date的数据渲染
	showData_Date:function(answerEle,answer){
		//answerEle:是符合data-fieldname属性与答案名对应的的li
		//answer:是答案
		if(answer!=null){
			answerEle.find(".right input").val(answer);
		}else{
			//方案一:不显示默认值
//			answerEle.find(".right input").val("");
			//方案二:显示默认值
//			if(answerEle.attr("data-require")=="true"){
//				var dataArryTotal=answerEle.data("dataArry");
//				if(dataArryTotal["defaultValue"]){
//					var defaultValue=dataArryTotal["defaultValue"];
//					answerEle.find(".right input").val(defaultValue);
//				}else{
//					answerEle.find(".right input").val("");
//				}
//			}else{
//				answerEle.find(".right input").val("");
//			}
			//方案三:取消必填的判断
			var dataArryTotal=answerEle.data("dataArry");
			if(dataArryTotal["defaultValue"]){
				var defaultValue=dataArryTotal["defaultValue"];
				answerEle.find(".right input").val(defaultValue);
			}else{
				answerEle.find(".right input").val("");
			}
		};
	},
	//Double的数据渲染
	showData_Double:function(answerEle,answer){
		//answerEle:是符合data-fieldname属性与答案名对应的的li
		//answer:是答案
		if(answer!=null){
			answerEle.find(".right input").val(answer);
		}else{
			//方案一:不显示默认值
//			answerEle.find(".right input").val("");
			//方案二:显示默认值
//			if(answerEle.attr("data-require")=="true"){
//				var dataArryTotal=answerEle.data("dataArry");
//				if(dataArryTotal["defaultValue"]){
//					var defaultValue=dataArryTotal["defaultValue"];
//					answerEle.find(".right input").val(defaultValue);
//				}else{
//					answerEle.find(".right input").val("");
//				}
//			}else{
//				answerEle.find(".right input").val("");
//			}
			//方案三:取消必填的判断
			var dataArryTotal=answerEle.data("dataArry");
			if(dataArryTotal["defaultValue"]){
				var defaultValue=dataArryTotal["defaultValue"];
				answerEle.find(".right input").val(defaultValue);
			}else{
				answerEle.find(".right input").val("");
			}
		};
	},
	//Integer数据渲染
	showData_Integer:function(answerEle,answer){
		//answerEle:是符合data-fieldname属性与答案名对应的的li
		//answer:是答案
		if(answer!=null){
			answerEle.find(".right input").val(answer);
		}else{
			//方案一:不显示默认值
//			answerEle.find(".right input").val("");
			//方案二:显示默认值
//			if(answerEle.attr("data-require")=="true"){
//				var dataArryTotal=answerEle.data("dataArry");
//				if(dataArryTotal["defaultValue"]){
//					var defaultValue=dataArryTotal["defaultValue"];
//					answerEle.find(".right input").val(defaultValue);
//				}else{
//					answerEle.find(".right input").val("");
//				}
//			}else{
//				answerEle.find(".right input").val("");
//			};
			//方案三:取消必填的判断
			var dataArryTotal=answerEle.data("dataArry");
			if(dataArryTotal["defaultValue"]){
				var defaultValue=dataArryTotal["defaultValue"];
				answerEle.find(".right input").val(defaultValue);
			}else{
				answerEle.find(".right input").val("");
			};
		}
	},
	//String数据渲染
	showData_String:function(answerEle,answer){
		//answerEle:是符合data-fieldname属性与答案名对应的的li
		//answer:是答案
		if(answer!=null){
			answerEle.find(".right input").val(answer);
		}else{
			
			//方案三:取消必填的判断
			var dataArryTotal=answerEle.data("dataArry");
			if(dataArryTotal["defaultValue"]){
				var defaultValue=dataArryTotal["defaultValue"];
				answerEle.find(".right input").val(defaultValue);
			}else{
				answerEle.find(".right input").val("");
			};
		};
	},
	//Textarea数据渲染
	showData_Textarea:function(answerEle,answer){
		//answerEle:是符合data-fieldname属性与答案名对应的的li
		//answer:是答案
		if(answer!=null){
			answerEle.find("textarea").val(answer);
		}else{
			
			//方案三:取消默认值判断
			var dataArryTotal=answerEle.data("dataArry");
			if(dataArryTotal["defaultValue"]){
				var defaultValue=dataArryTotal["defaultValue"];
				answerEle.find(".right input").val(defaultValue);
			}else{
				answerEle.find(".right input").val("");
			}		
		};
	},
	//TELEPHONE数据渲染（没有判断默认值赋值）
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
	},
	//DATEZONE数据渲染（没有判断默认值赋值）
	showData_DateZone:function(answerEle,answer){
		//answerEle:是符合data-fieldname属性与答案名对应的的li
		//answer:是答案
		if(answer!=null){
			var answer=answer.split(",");
			for(var i=0;i<answer.length;i++){
				answerEle.find(".right input").eq(i).val(answer[i]);
			}
		}else{
			answerEle.find(".right input").val("");			
		};
	},	
};
var showHtml={
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
				console.log(ele)
				//tabel_pactEle获取tabel里面的.cy的span元素
				var tabel_pactEle=$(this).find(".cy span");
				var dataArry2=ele.data("dataArry");
				console.log(dataArry2)
				//jsonObject:用来适配,dode值对应什么名字
				var jsonObject={};
				var fieldName="";
				//下面的判断li的类型，根据类型的不同执行不同的取值(最主要的作用是CODE、CHECKBOX的code值转移)
				if(dataArry2.inputType=="CODE"||dataArry2.inputType=="CHECKBOX"||dataArry2.inputType=="RADIO"){
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
							if(dataArry2.inputType=="CODE"||dataArry2.inputType=="CHECKBOX"||dataArry2.inputType=="RADIO"){
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
						if(content.length>4){
							content=content.substring(0,4)+"…";
						};
						$(this).text(content);
					}else{
						content=dataArry2["name"];
						if(content.length>4){
							content=content.substring(0,4)+"…";
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
			var parentEle=parentEle_li.closest(".problem");
			var dataArry=parentEle_li.data("dataArry");
			//现在只有code、string类型的判断
			var table={
				table_code:function(){
					if(dataArry["inputType"]=="RADIO"){
						if(parentEle_li.find(".right input:checked").length!=0){
							var content=parentEle_li.find(".right input:checked").closest("label").text();
							if(content.length>4){
								content=content.substring(0,4)+"…";
							}
							parentEle.find(".cy span[data-select='select']").text(content);
						}else if(parentEle_li.find(".right input:checked").length==0){
							var name=parentEle_li.data("dataArry")["name"];
							if(name.length>4){
								name=name.substring(0,4)+"…";
							}
							parentEle.find('.cy span[data-select="select"]').text(name);
						}
					}else if(dataArry["inputType"]=="CODE"){
						if(parentEle_li.find(".right span.choose").attr("data-code")){
							var content=parentEle_li.find(".right span.choose").text();
							if(content.length>4){
								content=content.substring(0,4)+"…";
							}
							parentEle.find(".cy span[data-select='select']").text(content);
						}else{
							var name=parentEle_li.data("dataArry")["name"];
							if(name.length>4){
								name=name.substring(0,4)+"…";
							}
							parentEle.find('.cy span[data-select="select"]').text(name);
						}
					};	
				},
				tabel_String:function(){
					var content=parentEle_li.find(".right input").val();
					//判断是否有值和内容
					content=content.trim();
					if(content){
						if(content.length>4){
							content=content.substring(0,4)+"…";
						};
						parentEle.find('.cy span[data-select="select"]').text(content);
					}else{
						var name=parentEle_li.data("dataArry")["name"];
						if(name.length>4){
							name=name.substring(0,4)+"…";
						};
						parentEle.find('.cy span[data-select="select"]').text(name);
					};				
				}
			};
			switch(dataArry["inputType"]){
				case "CODE":table.table_code();break;
				case "STRING":table.tabel_String();break;
			};			
		}
	},
	//日期插件实例化
	plugin_date:function(){
		
	},
	//初始化隐藏小数据里面的isDynamicShow=1是进行隐藏,0为显示
	judgeIsDynamicShow:function(that){
		//that:是.problem里面的元素标签，不能超过.problem标签
		//that没有参数的时候，是全局的li进行判断（使用在刚刚初始化时使用），若有传值的时候是大块里面的li进行判断（进行特定的大块使用，例如数据的展示或者样式初始的时候）
		if(that){			
			var parent=that.closest(".problem");
			if(parent.data("transboundaryControleLEShowArray") && parent.data("transboundaryControleLEShowArray") instanceof Array){
				parent.children("ul").children("li").each(function(){
					var isDynamicShow=$(this).data("dataArry")["isDynamicShow"];
					$(this).attr("data-isDynamicShow",isDynamicShow);
					if(isDynamicShow=="1"){
						$(this).css({"display":"none"});
					};
				});
				var transboundaryControleLEShowArray=parent.data("transboundaryControleLEShowArray");
				for(var i=0;i<transboundaryControleLEShowArray.length;i++){
					$(transboundaryControleLEShowArray[i]).css({"display":"block"});
				};
			}else{
				parent.children("ul").children("li").each(function(){
					var isDynamicShow=$(this).data("dataArry")["isDynamicShow"];
					$(this).attr("data-isDynamicShow",isDynamicShow);
					if(isDynamicShow=="1"){
						$(this).css({"display":"none"});
					};
				});
			};			
		}else{
//			$("section .problem ul li").each(function(){
//				var isDynamicShow=$(this).data("dataArry")["isDynamicShow"];
//				$(this).attr("data-isDynamicShow",isDynamicShow);
//				if(isDynamicShow=="1"){
//					$(this).css({"display":"none"});
//				};
//			});
			//循环每一个problem大块元素
			$("section .problem").each(function(){
				var problemEle=$(this);
				if(problemEle.data("transboundaryControleLEShowArray") && problemEle.data("transboundaryControleLEShowArray") instanceof Array){
					problemEle.find("ul li").each(function(){
						var isDynamicShow=$(this).data("dataArry")["isDynamicShow"];
						$(this).attr("data-isDynamicShow",isDynamicShow);
						if(isDynamicShow=="1"){
							$(this).css({"display":"none"});
						};
					});
					var transboundaryControleLEShowArray=problemEle.data("transboundaryControleLEShowArray");
					for(var i=0;i<transboundaryControleLEShowArray.length;i++){
						$(transboundaryControleLEShowArray[i]).css({"display":"block"});
					};
				}else{
					problemEle.find("ul li").each(function(){
						var isDynamicShow=$(this).data("dataArry")["isDynamicShow"];
						if(isDynamicShow=="1"){
							$(this).css({"display":"none"})
						};
					});
				};
			});
		};		
	},
	//重点必填打信号星号
	starred:function(){
		var parent_problem=$("section .problem ul li");
		parent_problem.each(function(){
			var require_br=$(this).data("dataArry")["require"];
			var inputType=$(this).data("dataArry")["inputType"];
			//对ADDRESS的类型进行判断
			if(inputType=="ADDRESS"){
				if(require_br){
					$(this).find(".left span").text("*").end().attr("data-require",true).find(".x-address span").text("*").end().find(".x-address").attr("data-require",true);					
				}else{
					$(this).attr("data-require",false).find(".x-address").attr("data-require",false);	
				}
			}else{
				if(require_br){
					$(this).find(".left span").text("*").end().attr("data-require",true);				
				}else{
					$(this).attr("data-require",false);	
				}
			}
		})
	},
	//验证动态显示有哪些元素标签，一般情况下动态显示标签的类型为code,若是动态控制现实的时候isControlShow="1"
	//在动态显示的元素里面添加datat-controlShow="1"的自定义属性
	checking_controlShow:function(){
		var parent_problem=$("section .problem ul li");
		parent_problem.each(function(){
			var dataArry=$(this).data("dataArry");
			var require_br=dataArry["isControlShow"];
			if(require_br=="1"){
				$(this).attr("data-controlShow","1");
				var parent=$(this).closest(".problem");			
				var controlShowRuleList=dataArry["controlShowRuleList"];
				//控制元素的code值，已经转化为id名
				//在自身大块里被控制元素li里面data添加controlEleData-start
				var code="#"+dataArry["code"].split(".").join("");
				for(var i=0;i<controlShowRuleList.length;i++){
					//选择的答案
					var controlKey=controlShowRuleList[i]["key"];
					controlKey=controlKey.substring(1,controlKey.length-1);
					//被控制的元素数组
					var controlEleCodeArray=controlShowRuleList[i]["code"];
					//把所有被控制元素的data里面的controlEleData值清空
					for(var j=0;j<controlEleCodeArray.length;j++){
						//被控制元素的code值，已经转化为id名
						var controlEleCode="#"+controlEleCodeArray[j].split(".").join("");
						var controlEle=$(controlEleCode);
						controlEle.data("controlEleData","");
					}
					//把所有被控制元素的data里面的controlEleData赋值
					for(var j=0;j<controlEleCodeArray.length;j++){
						//被控制元素的code值，已经转化为id名
						var controlEleCode="#"+controlEleCodeArray[j].split(".").join("");
						//被控制元素(值筛选在大块里面的li元素)
						var controlEle=parent.find("ul "+controlEleCode);
						//判断是否有controlEleData这个属性值，并且是个数组
						if(controlEle.data("controlEleData") && controlEle.data("controlEleData") instanceof Array){
							var controlEleObject={};
							controlEleObject["code"]=code;
							controlEleObject["key"]=controlKey;
							controlEle.data("controlEleData").push(controlEleObject);
						}else{
							var controlEleArray=[];
							var controlEleObject={};
							controlEleObject["code"]=code;
							controlEleObject["key"]=controlKey;
							controlEleArray.push(controlEleObject);
							controlEle.data("controlEleData",controlEleArray);
						}
					}
				}				
			}else{
				$(this).attr("data-controlShow","0");	
			}
		});
		//用来判断动态控制元素是否为被控制元素，如果是的话在这个元素那里设置controlEleControlData存储数组值
		parent_problem.each(function(){
			if($(this).attr("data-controlshow")=="1" && $(this).data("controlEleData")  && $(this).data("controlEleData") instanceof Array){
				var dataArry=$(this).data("dataArry");
				var controlShowRuleList=dataArry["controlShowRuleList"];
				$(this).data("controlEleControlData",[]);
				for(var i=0;i<controlShowRuleList.length;i++){
					var arrayCodeData=controlShowRuleList[i]["code"];
					for(var j=0;j<arrayCodeData.length;j++){
						var codeIdArray=arrayCodeData[j].split(".");
						var codeId="#"+codeIdArray.join("");
						$(this).data("controlEleControlData").push(codeId);
					};
				};
			};
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
				var codeLength=dataArry["inputType"];
				var parnet=that.closest("ul");
				var controlObject={};
				if(codeLength=="RADIO"){
					var check_ele=that.find("input:checked");
//					console.log(check_ele);
					if(check_ele.length!=0){
						var data_code=check_ele.attr("data-code");
						
						//方案二，单独控制自己的内容显示隐藏，其他不受影响
						for(var i=0;i<dataArry["controlShowRuleList"].length;i++){
							for(var j=0;j<dataArry["controlShowRuleList"][i]["code"].length;j++){
								var id_content=dataArry["controlShowRuleList"][i]["code"][j].split(".").join("");
								parnet.find("#"+id_content).css({"display":"none"});	
							};
						};
						for(var i=0;i<dataArry["controlShowRuleList"].length;i++){
							var controlKeyArry=dataArry["controlShowRuleList"][i]["key"].split("");
							controlKeyArry.push("/");
							controlKeyArry.unshift("/");
							controlKeyArry=controlKeyArry.join("");								
							var controlkey=eval(controlKeyArry);
							//判断正则与选项的选择是否匹配
							if(controlkey.test(data_code)){
								for(var j=0;j<dataArry["controlShowRuleList"][i]["code"].length;j++){									
									var id_content="#"+dataArry["controlShowRuleList"][i]["code"][j].split(".").join("");
									parnet.find(id_content).css({"display":"block"});
								};
							}else{
								console.log("正则匹配不到相对应的动态控制标签");
							};
						}
							
					};
				}else if(codeLength=="CODE"){
					if(that.find(".right .choose").attr("data-code")){
						var data_code=that.find(".right .choose").attr("data-code");
						if(data_code){
							
							//方案二，单独控制自己的内容显示隐藏，其他不受影响
							for(var i=0;i<dataArry["controlShowRuleList"].length;i++){
								for(var j=0;j<dataArry["controlShowRuleList"][i]["code"].length;j++){
									var id_content=dataArry["controlShowRuleList"][i]["code"][j].split(".").join("");
									if(parnet.find("#"+id_content).data("controlEleControlData")  && parnet.find("#"+id_content).data("controlEleControlData") instanceof Array ){
										parnet.find("#"+id_content).css({"display":"none"});
										var controlEleControlData=parnet.find("#"+id_content).data("controlEleControlData")
										for(var z=0;z<controlEleControlData.length;z++){
											$(controlEleControlData[z]).css({"display":"none"});
										};
									}else{
										parnet.find("#"+id_content).css({"display":"none"});
									}
								};
							};
							for(var i=0;i<dataArry["controlShowRuleList"].length;i++){
								//提取key的值,并且把key值变成正则
								var controlKeyArry=dataArry["controlShowRuleList"][i]["key"].split("");
								controlKeyArry.push("/");
								controlKeyArry.unshift("/");
								controlKeyArry=controlKeyArry.join("");								
								var controlkey=eval(controlKeyArry);
								//判断正则与选项的选择是否匹配
								if(controlkey.test(data_code)){
									//如果匹配到的话，显示相对应的li
									for(var j=0;j<dataArry["controlShowRuleList"][i]["code"].length;j++){									
										var id_content="#"+dataArry["controlShowRuleList"][i]["code"][j].split(".").join("");
										if(parnet.find(id_content).data("controlEleControlData")  && parnet.find(id_content).data("controlEleControlData") instanceof Array){
											parnet.find(id_content).css({"display":"block"});
											showHtml.controlShow(parnet.find(id_content));
										}else{
											parnet.find(id_content).css({"display":"block"});
										}
									};	
								}else{
									//如果匹配不到的话
									console.log("正则匹配不到相对应的动态控制标签");
								};
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
					for(var i=0;i<dataArry["controlShowRuleList"].length;i++){
						//提取key的值,并且把key值变成正则
						var controlKeyArry=dataArry["controlShowRuleList"][i]["key"].split(",");
						controlKeyArry.push("/");
						controlKeyArry.unshift("/");
						controlKeyArry=controlKeyArry.join("");								
						var controlkey=eval(controlKeyArry);
						check_ele.each(function(){
							console.log("功能正在开发");
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
				 		case "RADIO":controlShow_type.show_code($(this),dataArry);break;
				 		case "CHECKBOX":controlShow_type.show_checkbox($(this),dataArry);break;
				 	};		 		 	
				});
			}			
		}else{
			//预留全局控制方法
		};				
	},
	//跨大块动态控制
	transboundaryControlShow:function(that){
		//that:指的是标签类名.problem元素里面的li元素,若有that的话单独控制里面的动态显示.
		//一般用一个事件状态激发这个函数进行动态显示
		var controlShow_type={
			show_code:function(that,dataArry){
				//that:一般传的是带数据,并且动态控制的li
				//dataArry：li里面的数据
				//codeLength:是单选项的长度
				var codeLength=dataArry["inputType"];
				var parnet=that.closest("ul");
				var controlObject={};
				if(codeLength=="RADIO"){
					console.log("单选跨块功能正在开发");
				}else if(codeLength=="CODE"){
					if(that.find(".right .choose").attr("data-code")){
						//data_code所选项的code值
						var data_code=that.find(".right .choose").attr("data-code");
						//用来存储跨大块动态控制的元素的id名
						var deferArry=[];
						//把跨大块动态控制元素推入 deferArry这个数组里面，用于判断是否是夸大快动态控制
						for(var i=0;i<dataArry["controlShowRuleList"].length;i++){
							for(var j=0;j<dataArry["controlShowRuleList"][i]["code"].length;j++){
								var id_content=dataArry["controlShowRuleList"][i]["code"][j].split(".").join("");
								if(parnet.find("#"+id_content).length==0){									
									deferArry.push("#"+id_content);
								};
							};
						};
						//判断deferArry这个临时数组有没有值，有的话代表是跨界动态控制,把这些元素先display:none
						if(deferArry.length!=0){
							for(var i=0;i<deferArry.length;i++){
								//isdynamicshowEleNumber布尔值判断执行哪些隐藏方式
								if($(deferArry[i]).closest(".problem").length>0){
									var isdynamicshowEleNumber=false;
									var problemDataArry=$(deferArry[i]).closest(".problem").data("dataArry");
									var problemDataArry_questionDetailList=problemDataArry["questionDetailList"];
									//判断isDynamicShow值是否为全部为1，若有一个0则isdynamicshowEleNumber=true;并且一起判断problemDataArry_questionDetailLis是否为数组
									if(problemDataArry_questionDetailList && problemDataArry_questionDetailList instanceof Array){
										for(var j=0;j<problemDataArry_questionDetailList.length;j++){
											if(problemDataArry_questionDetailList[j]["isDynamicShow"]=="0"){
												isdynamicshowEleNumber=true;
												break;
											};
										};
									};
									//isdynamicshowEleNumber布尔值判断执行哪些隐藏方式，并且判断是否有.problem元素
									if(isdynamicshowEleNumber){
										$(deferArry[i]).closest(".problem").find(deferArry[i]).css("display","none");
									}else if(!isdynamicshowEleNumber){
										$(deferArry[i]).closest(".problem").css("display","none");
									};
								};								
							};
						};												
						for(var i=0;i<dataArry["controlShowRuleList"].length;i++){
							//br_transboundary是跨界动态控制暂存数组，把符合匹配的元素暂存进去
							var br_transboundary=[];
							//提取key的值,并且把key值变成正则
							var controlKeyArry=dataArry["controlShowRuleList"][i]["key"].split("");
							controlKeyArry.push("/");
							controlKeyArry.unshift("/");
							controlKeyArry=controlKeyArry.join("");								
							var controlkey=eval(controlKeyArry);							
							//判断正则与选项的选择是否匹配
							if(controlkey.test(data_code)){
								//把跨大块动态控制元素推入 deferArry这个数组里面，用于判断是否是夸大快动态控制
								for(var j=0;j<dataArry["controlShowRuleList"][i]["code"].length;j++){									
									var id_content="#"+dataArry["controlShowRuleList"][i]["code"][j].split(".").join("");
									if(parnet.find(id_content).length==0){									
										br_transboundary.push(id_content);
									};									
								};
								//这个循环式为了让类名为problem元素添加data的属性值transboundaryControleLEShowArray是个变量，作用是为了judgeIsDynamicShow这个方法控制IsDynamicShow的控制								
								if(br_transboundary.length!=0){
									//把夸大快动态控制元素的父元素类名为problem的父元素添加data属性transboundaryControleLEShowArray,值为空[]，为了数据初始化，
									//然后把匹配到的元素的id名推入这个数组
									//赋值之前要进行控制元素的父元素是否存在，避免报错，进行容错
									for(var j=0;j<br_transboundary.length;j++){
										//判断是否有类名为problem这个元素
										if($(br_transboundary[j]).closest(".problem").length!=0){
											$(br_transboundary[j]).closest(".problem").data("transboundaryControleLEShowArray",[]);
										};
									};
									for(var j=0;j<br_transboundary.length;j++){	
										//判断是否有类名为problem这个元素
										if($(br_transboundary[j]).closest(".problem").length!=0){
											var transboundaryControleLEShowArray=$(br_transboundary[j]).closest(".problem").data("transboundaryControleLEShowArray");
											transboundaryControleLEShowArray.push(br_transboundary[j]);
										};
									};
								};								
								//判断br_transboundary这个临时数组有没有值，有的话代表是跨界动态控制
								if(br_transboundary.length!=0){
									console.log("夸大块控制元素的id名"+that.attr("id")+"选择匹配到答案为"+data_code);
									console.log(br_transboundary);
									for(var j=0;j<br_transboundary.length;j++){
										//判断是头是type是TABLE还是INPUT类型
										//controlDataArry为跨块控制的大块元素里面存储的数据
										//controlEle为跨块控制的大块元素
										var controlEle=$(br_transboundary[j]).closest(".problem");
										//进行元素存在判断，为了防止立鹏匹配错误
										if(controlEle.length!=0){
											var controlDataArry=controlEle.data("dataArry");
											//isdynamicshowEleNumber布尔值判断执行哪些隐藏方式
											var isdynamicshowEleNumber=false;
											var problemDataArry_questionDetailList=controlDataArry["questionDetailList"];
											//判断isDynamicShow值是否为全部为1，若有一个0则isdynamicshowEleNumber=true;并且一起判断problemDataArry_questionDetailLis是否为数组
											if(problemDataArry_questionDetailList && problemDataArry_questionDetailList instanceof Array){
												for(var z=0;z<problemDataArry_questionDetailList.length;z++){
													if(problemDataArry_questionDetailList[z]["isDynamicShow"]=="0"){
														isdynamicshowEleNumber=true;
														break;
													};
												};
											};
											if(controlDataArry["type"]=="TABLE"){												
												if(!isdynamicshowEleNumber){
													controlEle.css("display","block");
													if(controlEle.find(".cy span").length==0){
														var a=$("<span></span>").appendTo(controlEle.find(".cy")).attr("data-select",'select').siblings().attr("data-select",'').end();
														var lineno=Number(controlEle.attr("data-lineno"))+1;
														var index=Number(controlEle.attr("index"))+1;
														controlEle.attr("data-lineno",lineno);
														controlEle.attr("index",index);
														a.data("answer",{"lineNo":lineno,"serialNo":showHtml.jsonData_answer_serialNo});
														a.attr("data-lineno",lineno);
														a.attr("index",index);
														//初始化数据的赋值到相对应的元素之后,使用tabel_pact的小块文字渲染方法
														showHtml.tabel_pact();
														//显示controlEle里面的.cy和ul标签元素
														controlEle.find(".cy").css("display","block").end().find("ul").css("display","block");
														showHtml.againElem(controlEle);													
														//添加默认值
	//													showHtml.addDefault.pieceTool(controlEle);
														//小标签赋值和动态控制
														controlEle.find("ul li").each(function(){
															showHtml.tabel_table_pactContent($(this));
															showHtml.controlShow($(this));
														});														
													}else if(controlEle.find(".cy span").length>0){
														console.log("跨大块动态控制若有span小标签状态");
													};
												}else if(isdynamicshowEleNumber){
													console.log("跨大块动态控制的problem元素里的li至少有一个data-isdynamicshow=0,展现功能正在开发");
													controlEle.find(br_transboundary[j]).css("display","block");
												};
											}else if(controlDataArry["type"]=="INPUT"){
												
											};
										};
									};									
								}
								br_transboundary=[];
								break;
							}else{
								//如果匹配不到的话
								console.log("正则匹配不到相对应的动态控制标签");
							}
						};
					}
				}
			}
		}
		if(that){
			var controlShow_li=that.closest("li:visible");
			if(controlShow_li.attr("data-controlshow")=="1"){
				var dataArry=controlShow_li.data("dataArry");
			 	switch(dataArry["inputType"]){
			 		case "CODE":controlShow_type.show_code(controlShow_li,dataArry);break;
			 		case "RADIO":controlShow_type.show_code(controlShow_li,dataArry);break;
			 		case "CHECKBOX":controlShow_type.show_checkbox(controlShow_li,dataArry);break;
			 	};
			}
		}else{
			//预留全局控制方法
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
				case "RADIO":createModel.create_Code(_id,questionDetailList[i]);break;
				case "CHECKBOX":createModel.create_Checkbox(_id,questionDetailList[i]);break;
				case "ADDRESS":createModel.create_Address(_id,questionDetailList[i]);break;
				case "DATE":createModel.create_Date(_id,questionDetailList[i]);break;
				case "DOUBLE":createModel.create_Double(_id,questionDetailList[i]);break;
				case "INTEGER":createModel.create_Integer(_id,questionDetailList[i]);break;
				case "STRING":createModel.create_String(_id,questionDetailList[i]);break;
				case "TELEPHONE":createModel.create_Telephone(_id,questionDetailList[i]);break;
				case "TEXTAREA":createModel.create_Textarea(_id,questionDetailList[i]);break;
				case "DATEZONE":createModel.create_DateZone(_id,questionDetailList[i]);break;
			};
		};
		//用来判断哪些li元素的的isLabel是"1"
		this.judgeIsLabel(_id);
		//初始化隐藏小数据里面的isDynamicShow=1的li，进行隐藏.
		this.judgeIsDynamicShow(parent);
		//初始化动态验证isDynamicCheck:"1"有哪些元素标签,验证数据初始化
//		checkData.checkDataEle(parent);		
		//重点必填打信号星号
		this.starred();
		//验证动态显示有哪些元素标签，一般情况下动态显示标签的类型为code,若是动态控制现实的时候isControlShow="1"
		//在动态显示的元素里面添加datat-controlShow="1"的自定义属性
		this.checking_controlShow();
		//添加默认值
		this.addDefault.pieceTool(parent);
		//黄泽建的动态验证绑定事件
		this.QestionRegChecker.initAutoCheckTrigger();
		//x-address取消blur失去焦点事件
		$(".problem ul li .x-address input").off("blur");
	},
	//添加数据默认值默认值
	addDefault:{
		type:{
			type_double:function(parent_li,dataArry){
				//parent_li:是数据的li
				//dataArry:li里面的数据
				//方案一：对必填进行判断
//				if(dataArry["require"]==true){
//					var defaultValue=dataArry["defaultValue"];
//					if(defaultValue!=null){
//						parent_li.find(".right input").val(defaultValue);
//					}
//				}
				//方案二：对必填不进行判断
				var defaultValue=dataArry["defaultValue"];
				if(defaultValue!=null){
					parent_li.find(".right input").val(defaultValue);
				}
			},
			type_integer:function(parent_li,dataArry){
				//parent_li:是数据的li
				//dataArry:li里面的数据
				//方案一：对必填进行判断
//				if(dataArry["require"]==true){
//					var defaultValue=dataArry["defaultValue"];
//					if(defaultValue!=null){
//						parent_li.find(".right input").val(defaultValue);
//					}
//				}
				//方案二：对必填不进行判断
				var defaultValue=dataArry["defaultValue"];
				if(defaultValue!=null){
					parent_li.find(".right input").val(defaultValue);
				}
			},
			type_string:function(parent_li,dataArry){
				//parent_li:是数据的li
				//dataArry:li里面的数据
				//方案一：对必填进行判断
//				if(dataArry["require"]==true){
//					var defaultValue=dataArry["defaultValue"];
//					if(defaultValue!=null){						
//						parent_li.find(".right input").val(defaultValue);
//					}
//				}
				//方案二：对必填不进行判断
				var defaultValue=dataArry["defaultValue"];
				if(defaultValue!=null){						
					parent_li.find(".right input").val(defaultValue);
				}
			},
			type_code:function(parent_li,dataArry){
				//parent_li:是数据的li
				//dataArry:li里面的数据
				
				//方案二：对必填不进行判断
				//默认值
				var defaultValue=dataArry["defaultValue"];
				if(defaultValue!=null){
					if(dataArry["inputType"]=="RADIO"){
						parent_li.find('.right input[data-code='+'"'+defaultValue+'"'+']').prop("checked",true);			
						parent_li.find(".right input").each(function(){
							if($(this).prop("checked")){
								$(this).nextAll("i").css("display","block");
							}else{
								$(this).nextAll("i").css("display","none");
							};				
						});
					}else if(dataArry["inputType"]=="CODE"){
						parent_li.find(".right .choose").attr("data-code",defaultValue);
						parent_li.find(".right .choose").attr("name",defaultValue);
						//多选答案数组信息
						var moreRadioArry=parent_li.data("dataArry")["codeDicList"];
						//对答案进行数据的排列整理，用moreRadioObject存起来.
						var moreRadioObject={};
						for(var i=0;i<moreRadioArry.length;i++){
							moreRadioObject[moreRadioArry[i].code]=moreRadioArry[i].name
						};
						parent_li.find(".right .choose").text(moreRadioObject[defaultValue]);	
						if(parent_li.find(".right .choose").attr("data-code")==""){
							parent_li.find(".right .choose").css({"color":"#a09fa4"});
						}else{
							parent_li.find(".right .choose").css({"color":"#191919"});
						};
					};
				};
			},
			type_checkbox:function(parent_li,dataArry){
				//方案一：对必填进行判断
//				
				//方案二：对必填不进行判断
				//默认值
				var defaultValue=dataArry["defaultValue"];
				if(defaultValue!=null){
					var dataArry=defaultValue.split(",");
					//让所有选项清空不打勾勾
					parent_li.find("input").prop("checked",false).each(function(){
						$(this).closest("label").css("color","#a0a0a5");
						$(this).closest("label").find("img").attr("src","img/jx_icon.png");
					});			
					for(var i=0;i<dataArry.length;i++){			
						var checkEle=parent_li.find('input[data-code='+'"'+dataArry[i]+'"'+']').prop("checked",true);
						checkEle.closest("label").css("color","#191919");
						checkEle.closest("label").find("img").attr("src","img/jxt_icon.png");
					};
				};
			},
			type_address:function(parent_li,dataArry){
				//后续扩展
			},
			type_date:function(parent_li,dataArry){
				//后续扩展
			},
			type_textarea:function(parent_li,dataArry){
				//后续扩展
			},
			type_phone:function(parent_li,dataArry){
				//后续扩展
			},
			type_dateZone:function(parent_li,dataArry){
				//后续扩展
			},
		},
		//单行输入行默认值赋值
		lineTool:function(that){
			//that:单行li的的标签元素，最大不能超过li
			var parent_li=that.closest("li");
			var dataArry=parent_li.data("dataArry");
			var inputType=dataArry["inputType"];
			switch(inputType){
				case "DOUBLE":this.type.type_double(parent_li,dataArry);showHtml.judgeEntryTopicChangeColor.lineTool(that);break;
				case "INTEGER":this.type.type_integer(parent_li,dataArry);showHtml.judgeEntryTopicChangeColor.lineTool(that);break;
				case "STRING":this.type.type_string(parent_li,dataArry);showHtml.judgeEntryTopicChangeColor.lineTool(that);break;
				case "CODE":this.type.type_code(parent_li,dataArry);showHtml.judgeEntryTopicChangeColor.lineTool(that);break;
				case "RADIO":this.type.type_code(parent_li,dataArry);showHtml.judgeEntryTopicChangeColor.lineTool(that);break;
				case "CHECKBOX":this.type.type_checkbox(parent_li,dataArry);showHtml.judgeEntryTopicChangeColor.lineTool(that);break;
				case "ADDRESS":this.type.type_address(parent_li,dataArry);showHtml.judgeEntryTopicChangeColor.lineTool(that);break;
				case "DATE":this.type.type_date(parent_li,dataArry);showHtml.judgeEntryTopicChangeColor.lineTool(that);break;
				case "TEXTAREA":this.type.type_textarea(parent_li,dataArry);showHtml.judgeEntryTopicChangeColor.lineTool(that);break;
				case "TELEPHONE":this.type.type_phone(parent_li,dataArry);showHtml.judgeEntryTopicChangeColor.lineTool(that);break;
				case "DATEZONE":this.type.type_dateZone(parent_li,dataArry);showHtml.judgeEntryTopicChangeColor.lineTool(that);break;
			}
		},
		//大块默认值赋值
		pieceTool:function(that){
			var _that=this;
			//that:指的是.problem大块,匹配元素不能超过.problem大块元素
			var parent=that.closest(".problem");
			parent.find("ul li").each(function(){
				_that.lineTool($(this));
			});
		}
	},	
	//上传数据的整理汇总,并return返回相应的值
	clearUpData:function(){
		var that=this;
		var arry=[];
		var jsonObject={};
		$("section .problem:visible").each(function(){
			var dataArry=$(this).data("dataArry");
			if(dataArry.type=="TABLE"){
				//判断大块里面是否全部为不必填
				if($(this).find('ul li[data-require="true"]').filter(":visible").length==0){
					//循环判断span的元素的答案是否全部为空
					$(this).find(".cy").children("span:visible").each(function(){
						//span_data为每一个span的答案数据
						var span_data=$(this).data("answer");
						var span_dataBr=false;
						for(var index in span_data){
							if(index=="lineNo" || index=="serialNo"){
								//这里是判断index为lineNo、serialNo、的时候进行处理
							}else{
								if(span_data[index]!=null){
									span_dataBr=true;
									break;
								}
							}
						};
						if(span_dataBr){							
							arry.push(span_data);
						}else{
							//判断答案值全部为null的情况
						}
					});
					that.jsonData_modelOjbName_Answer[dataArry.objName]=arry;
					arry=[];
				}else{
					$(this).find(".cy").children("span:visible").each(function(){
						arry.push($(this).data("answer"));
					});	
					that.jsonData_modelOjbName_Answer[dataArry.objName]=arry;
					arry=[];
				}
			}else if(dataArry.type=="INPUT"){
				that.jsonData_modelOjbName_Answer[dataArry.objName]=$(this).data("answer");
			};			
		});
		$("section .problem:hidden").each(function(){
			var dataArry=$(this).data("dataArry");
			if(dataArry.type=="TABLE"){						
				that.jsonData_modelOjbName_Answer[dataArry.objName]=[];
			}else if(dataArry.type=="INPUT"){
				that.jsonData_modelOjbName_Answer[dataArry.objName]=null;
			};			
		});
		jsonObject[that.jsonData_modelOjbName]=that.jsonData_modelOjbName_Answer;
		//最后上传的答案的最外层的serialNo的格式是serialNo:{serialNo:xxxx}，所以要进行格式的转换处理
		jsonObject["serialNo"]={};
		jsonObject["serialNo"]["serialNo"]=that.jsonData_answer_serialNo;
		return jsonObject;
	},
	//判断isAllowRepeat的值，若是"1"的表示所选项可以重复，若是"0"的话表示所选项不能重复
	judgeIsAllowRepeat:function(that){
		//最后会返回值screenArryTotal
		//that:不能超过大块的元素标签
		var dataArry=that.closest("li").data("dataArry");
		//判断是否isAllowRepeat是否为"0"
		if(dataArry["isAllowRepeat"]=="0"){
			//codeObject存放已经选好的code值答案
			var codeObject={};
			//筛选过后的code值答案,数组里面的值为[[name,code],[name,code],...]
			var screenArry=[];
			//parent:大块的父元素
			var parent=that.closest(".problem");
			//获取fieldName答案名称
			var fieldName=dataArry["fieldName"];
			parent.find(".cy span").not('[data-select="select"]').each(function(){
				var fieldNameAnswer=$(this).data("answer")[fieldName];
				if(fieldNameAnswer){
					codeObject[fieldNameAnswer]="has";
				}
			})
			for(var i=0;i<dataArry["codeDicList"].length;i++){
				var code=dataArry["codeDicList"][i]["code"];
				var screenArryInArry=[];
				if(!codeObject[code]){
					screenArryInArry.push(dataArry["codeDicList"][i]["name"]);
					screenArryInArry.push(code);
					screenArry.push(screenArryInArry);
				}
			}
			//筛选数据总和[br,screenArry],若br为true的话代表是没有筛选值，若为false的话没有筛选值
			var screenArryTotal=[true,screenArry];
			return screenArryTotal
		}else if(dataArry["isAllowRepeat"]=="1"){
			var screenArry=[];
			var screenArryTotal=[false,screenArry];
			return screenArryTotal;
		}else if(!dataArry["isAllowRepeat"]){
			var screenArry=[];
			var screenArryTotal=[false,screenArry];
			return screenArryTotal;
		}
	},
	//输入行题目字体变色
	judgeEntryTopicChangeColor:{
		type:{
			type_double:function(parent_li,dataArry){
				//parent_li:是数据的li
				//dataArry:li里面的数据
				if(parent_li.find(".right input").val()){
					parent_li.find(".left i").css("color","rgb(160,160,165)");
				}else{
					parent_li.find(".left i").css("color","rgb(25,25,25)");
				}
			},
			type_integer:function(parent_li,dataArry){
				//parent_li:是数据的li
				//dataArry:li里面的数据
				if(parent_li.find(".right input").val()){
					parent_li.find(".left i").css("color","rgb(160,160,165)");
				}else{
					parent_li.find(".left i").css("color","rgb(25,25,25)");
				}
			},
			type_string:function(parent_li,dataArry){
				//parent_li:是数据的li
				//dataArry:li里面的数据
				if(parent_li.find(".right input").val()){
					parent_li.find(".left i").css("color","rgb(160,160,165)");
				}else{
					parent_li.find(".left i").css("color","rgb(25,25,25)");
				}
			},
			type_code:function(parent_li,dataArry){
				//parent_li:是数据的li
				//dataArry:li里面的数据
				if(dataArry["inputType"].length=="RADIO"){
					if(parent_li.find(".right input:checked").length==0){
						parent_li.find(".left i").css("color","rgb(25,25,25)");
					}else if(parent_li.find(".right input:checked").length!=0){
						parent_li.find(".left i").css("color","rgb(160,160,165)");
					}
				}else if(dataArry["inputType"]=="CODE"){
					if(parent_li.find(".right .choose").attr("data-code")){
						parent_li.find(".left i").css("color","rgb(160,160,165)");
					}else{
						parent_li.find(".left i").css("color","rgb(25,25,25)");
					}
				}				
			},
			type_checkbox:function(parent_li,dataArry){
				//parent_li:是数据的li
				//dataArry:li里面的数据
				if(parent_li.find(".right input:checked").length==0){
					parent_li.find(".left i").css("color","rgb(25,25,25)");
				}else if(parent_li.find(".right input:checked").length!=0){
					parent_li.find(".left i").css("color","rgb(160,160,165)");
				}
			},
			type_address:function(parent_li,dataArry){
				//parent_li:是数据的li
				//dataArry:li里面的数据
				//triggerEle:促发的元素
				if(parent_li.find(".right .choose").attr("guid")){
					parent_li.find(".left i").css("color","rgb(160,160,165)");
				}else{
					parent_li.find(".left i").css("color","rgb(25,25,25)");
				};
				if(parent_li.find(".x-address input").val()){
					parent_li.find(".x-address p i").css("color","rgb(160,160,165)");
				}else{
					parent_li.find(".x-address p i").css("color","rgb(25,25,25)");
				};
			},
			type_date:function(parent_li,dataArry){
				//parent_li:是数据的li
				//dataArry:li里面的数据
				if(parent_li.find(".right input").val()){
					parent_li.find(".left i").css("color","rgb(160,160,165)");
				}else{
					parent_li.find(".left i").css("color","rgb(25,25,25)");
				}
			},
			type_textarea:function(parent_li,dataArry){
				//parent_li:是数据的li
				//dataArry:li里面的数据
				if(parent_li.find(".right textarea").val()){
					parent_li.find(".left i").css("color","rgb(160,160,165)");
				}else{
					parent_li.find(".left i").css("color","rgb(25,25,25)");
				}
			},
			type_phone:function(parent_li,dataArry){
				var mun=0;
				parent_li.find(".right input").each(function(){
					if($(this).val()){
						mun++;
					}
				});			
				if(mun>0){
					parent_li.find(".left i").css("color","rgb(160,160,165)");
				}else{
					parent_li.find(".left i").css("color","rgb(25,25,25)");
				};	
			},
			type_dateZone:function(parent_li,dataArry){
				var mun=0;
				parent_li.find(".right input").each(function(){
					if($(this).val()){
						mun++;
					}
				});			
				if(mun>0){
					parent_li.find(".left i").css("color","rgb(160,160,165)");
				}else{
					parent_li.find(".left i").css("color","rgb(25,25,25)");
				};	
			}
		},
		//单行输入行题目字体变色
		lineTool:function(that){
			//that:是每行的li元素里面的子元素标签，最大不能超过li
			var parent_li=that.closest("li");
			var dataArry=parent_li.data("dataArry");
			var inputType=dataArry["inputType"];
			switch(inputType){
				case "DOUBLE":this.type.type_double(parent_li,dataArry);break;
				case "INTEGER":this.type.type_integer(parent_li,dataArry);break;
				case "STRING":this.type.type_string(parent_li,dataArry);break;
				case "CODE":this.type.type_code(parent_li,dataArry);break;
				case "RADIO":this.type.type_code(parent_li,dataArry);break;
				case "CHECKBOX":this.type.type_checkbox(parent_li,dataArry);break;
				case "ADDRESS":this.type.type_address(parent_li,dataArry);break;
				case "DATE":this.type.type_date(parent_li,dataArry);break;
				case "TEXTAREA":this.type.type_textarea(parent_li,dataArry);break;
				case "TELEPHONE":this.type.type_phone(parent_li,dataArry);break;
				case "DATEZONE":this.type.type_dateZone(parent_li,dataArry);break;
			}
		},
		//大块单行输入行题目字体变色
		pieceTool:function(that){
			var _that=this;
			//that:指的是.problem大块,匹配元素不能超过.problem大块元素
			var parent=that.closest(".problem");
			parent.find("ul li").each(function(){
				_that.lineTool($(this));
			});
		}
	},
	//判断sourceType是否来自业务系统的数据，是的话对应该字段的值是不可以修改的；1本系统2业务系统,业务系统的数据不修改
	judgeSourceSourceType:{
		//行工具
		lineTool:function(that){
			//that:输入的元素最大不能超过含有li
			var parent_li=that.closest("li");
			var dataArry_li=parent_li.data("dataArry");
			if(dataArry_li["sourceType"]==2){
				var coverEle="<div class='coverEle'></div>"
				parent_li.append(coverEle);
			}
		},
		//块工具
		pieceTool:function(that){
			var _that=this
			//that:输入的元素最大不能超过含有.problem类名的div
			var parent=that.closest(".problem");
			var dataArry_problem=parent.data("dataArry");
			parent.find("ul li").each(function(){
				_that.lineTool($(this));
			});
		}
	},
	//数据初始化时全部答案的验证判断是否必填填完，而且所填数据正确，在table的小标签和input类型的大块元素上添加自定义属性
	//data-judgefinish和data-checkstate的属性（注意必须要在全部数据存储后才使用）
	judgeAllData:{
		method:function(li_Ele,answer,label){
			var _that=this;
			//li_Ele:为答案相对应的li
			//answer:每一个小标签里面的答案
			//label:是每一个对应的小标签
			//fieldName:答案相对应的li的data-fieldname值
			var fieldName=li_Ele.attr("data-fieldname");
			if(li_Ele.attr("data-require")=="true"){
				if(answer[fieldName]==null){
					label.attr("data-judgefinish","no").attr("data-checkstate","unpass");
//					label.attr("data-checkstate","unpass");
					_that.br=true;
				}else{
					var modelName=_that.problem_Data["objName"];
					var dataCodeObject={};
					dataCodeObject[fieldName]=answer[fieldName];
					if(!showHtml.QestionRegChecker.checkFieldValues(modelName,fieldName,dataCodeObject,true,true)){
						label.attr("data-checkstate","unpass");
						_that.br=true;
					};
				};
			}else{
				if(answer[fieldName]!=null){
					var modelName=_that.problem_Data["objName"];
					var dataCodeObject={};
					dataCodeObject[fieldName]=answer[fieldName];
					if(!showHtml.QestionRegChecker.checkFieldValues(modelName,fieldName,dataCodeObject,true,true)){
						label.attr("data-checkstate","unpass");
						_that.br=true;
					};
				};
			};
		},
		method_control:function(li_Ele,controlEleData,answer,label){
			var _that=this
			//li_Ele:为答案相对应的li
			//controlEleData:为li里面的controlEleData里面的数据
			//answer:每一个小标签里面的答案
			//label:是每一个对应的小标签
			//fieldName:答案相对应的li的data-fieldname值
			var fieldName=li_Ele.attr("data-fieldname");
			//控制元素的id名字
			var code;
			//筛选出来控制元素
			var controlEle;
			//控制元素应该选的答案
			var controlKey;
			//控制元素的fileNme
			var controlFieldName;
			//matchingBr用于存储判断匹配答案的br值，匹配到的话就true，否则为false
			var matchingBr=false;		
			//判断controlEleData的数据和动态控制的元素所选答案是否一致
			for(var i=0;i<controlEleData.length;i++){
				code=controlEleData[i]["code"];
				controlEle=_that.problem_Ele.find("ul "+code);
				controlKey=controlEleData[i]["key"];
				controlFieldName=controlEle.attr("data-fieldname");
				if(answer[controlFieldName]==controlKey){
					matchingBr=true;
					break;
				}
			};
			//判断控制元素的答案是否为控制答案
			if(matchingBr){
				if(li_Ele.attr("data-require")=="true"){
					if(answer[fieldName]==null){
						label.attr("data-judgefinish","no").attr("data-checkstate","unpass");
//						label.attr("data-checkstate","unpass");
						_that.br=true;
					}else{
						var modelName=_that.problem_Data["objName"];
						var dataCodeObject={};
						dataCodeObject[fieldName]=answer[fieldName];
						if(!showHtml.QestionRegChecker.checkFieldValues(modelName,fieldName,dataCodeObject,true,true)){
							label.attr("data-checkstate","unpass");
							_that.br=true;
						};
					};
				}else{
					//不是必填项的话,判断答案是否为空,是的话才进行验证
					if(answer[fieldName]!=null){
						var modelName=_that.problem_Data["objName"];
						var dataCodeObject={};
						dataCodeObject[fieldName]=answer[fieldName];
						if(!showHtml.QestionRegChecker.checkFieldValues(modelName,fieldName,dataCodeObject,true,true)){
							label.attr("data-checkstate","unpass");
							_that.br=true;
						};
					};
				};
			}else{
				console.log("控制元素的答案没有被匹配")
			};
		},
		implementation:function(){
			//_thta:指向的是这个judgeAllData对象
			var _that=this;
			$("section .problem").each(function(){				
				//变成全局的变量
				_that.problem_Ele=$(this);
				//problem_Data:是类名为problem元素里面存储的数据,变成全局的变量
				_that.problem_Data=_that.problem_Ele.data("dataArry");
				//判断是什么类型，是TABLE或者INPUT类型
				if(_that.problem_Data["type"]=="TABLE"){
					_that.problem_Ele.find(".cy span").each(function(){
						//answer为存储的答案;
						var answer=$(this).data("answer");
						for(var index in answer){
							if(index!="serialNo" || index!="lineNo"){
								//li_Ele为和答案相对应的li
								var li_Ele=_that.problem_Ele.find('ul li[data-fieldname='+index+']');
								//这个br变量时为了判断弹出最外层的循环,设置为全局变量
								_that.br=false;
								//判断答案所对应的元素li里面data是否有controlEleData属性值，而且是个数组
								if(li_Ele.data("controlEleData")  && li_Ele.data("controlEleData") instanceof Array){
									var controlEleData=li_Ele.data("controlEleData");
									_that.method_control(li_Ele,controlEleData,answer,$(this));									
								}else{
									_that.method(li_Ele,answer,$(this));
								};
							};
							//如果验证有不通过或者必填为空的话，进行br的判断，是true直接跳出循环
							if(_that.br){
								_that.br=false;
								break;
							};
						};
					});
				}else if(_that.problem_Data["type"]=="INPUT"){
					console.log("载入界面全体验证INPUT类型正在开发");
				}
			})
		}
	}	
};
//数据初始化
var initBossContacts=[];
var initModeObjName='';
var initbossBaseInfo='';
function detailsPublic01(jsonData){
	//黄泽建的动态验证方法
	showHtml.QestionRegChecker=new QestionRegChecker();
	var that=showHtml;
	var AndroidAnswer = jsonData[1];
	jsonData = jsonData[0];
	jsonData["answer"]=AndroidAnswer;
	function jsonForm(jdata){
		var r=jdata.answer;
		var answerJson={};//答案json字符串转换
		for(var key in r){
			answerJson[key]=$.parseJSON(r[key]);
			console.log(answerJson[key])
		}
		jdata.answer = answerJson;
		return jdata;
	}
	var jsonData_common=jsonForm(jsonData);
	
	//把传过来的总数据jsonData用data()传入section标签里面dataArry。
	$("<section></section>").appendTo($("body")).data("dataArry",jsonData_common);		
	$('<footer id="next" onclick=""><p>确定</p></footer>').insertAfter('section');
	//存储全局jsonData数据在showHtml里面以便其他的作用域使用
	showHtml.jsonData_common=jsonData;
	//存储modelOjbName数据用于answer答案的2级类型类型名字。
	showHtml.jsonData_modelOjbName=showHtml.jsonData_common["modelOjbName"];
	//存储answer答案3级底层类型的数据。
	showHtml.jsonData_modelOjbName_Answer=showHtml.jsonData_common["answer"][showHtml.jsonData_modelOjbName];
	console.log(showHtml.jsonData_modelOjbName)
	
	/***************2017-08-09***************/
	initModeObjName=showHtml.jsonData_modelOjbName;
	console.log("下发的答案:");
	if(initModeObjName=="bossContactModel"){
		initBossContacts=jsonData_common.answer.bossContactModel.bossContacts;
		console.log(jsonData_common.answer.bossContactModel.bossContacts)
	}
	
	if(initModeObjName=="bossBaseInfoModel"){
		initbossBaseInfo=jsonData_common.answer.bossBaseInfoModel.bossBaseInfo;
		console.log(initbossBaseInfo)
	}
	/***************2017-08-09 end***************/
	
	//存储answer答案的serialNo的值
	//这个值我们进行判断，对serialNo的值进行格式的转换变成serialNo:xxxx,这是为了后面答案里面的serialNo格式
	if(typeof showHtml.jsonData_common["answer"]["serialNo"] != "object"){
		showHtml.jsonData_answer_serialNo=showHtml.jsonData_common["answer"]["serialNo"];
	}else{
		showHtml.jsonData_answer_serialNo=showHtml.jsonData_common["answer"]["serialNo"]["serialNo"];
	};
	for(var i=0;i<showHtml.jsonData_common["modelDetailSubList"].length;i++){
		var modeltype=showHtml.jsonData_common["modelDetailSubList"][i].type;
		//showHtml.jsonData_common["modelDetailSubList"][i]把每一大块的信息传值
		//下面的判断是判断每一大块的类型
		if(modeltype=="TABLE"){
			createModel.tableType(showHtml.jsonData_common["modelDetailSubList"][i]);
		}else if(modeltype=="INPUT"){
			createModel.inputType(showHtml.jsonData_common["modelDetailSubList"][i]);
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
	//行的点击事件
	bindingEvent.ele_li();
	//提交按钮
	bindingEvent.submitBtn();
	//date模块的btn点击事件
	bindingEvent.dateBtn();
	//date模块插件的确定btn点击事件
	bindingEvent.dateBtnFinish();
	//adress地址弹窗的选项点击事件
	bindingEvent.addressModuleChooseBtn();
	//textarea标签失去焦点事件
	bindingEvent.rightTextarea_blur();
	//遮盖层事件
	bindingEvent.coverEleEvent();
	//input输入框键盘事件
	bindingEvent.keyboard();
	//事件的绑定—end********************************************		
	//初始化数据的赋值到相对应的元素之后,使用tabel的小块文字渲染
	showHtml.tabel_pact();
	//全局渲染数据
	showData.showData();
	//初始化动态验证isDynamicCheck:"1"有哪些元素标签,验证数据初始化
//  checkData.checkDataEle();
	//验证数据
//	checkData.checkData();
	//数据存储
	showHtml.saveDataTool();
	//判断sourceType是否来自业务系统的数据,如果值为2不能填写
	$("section .problem").each(function(){
		showHtml.judgeSourceSourceType.pieceTool($(this));
	});
	//数据初始化时全部答案的验证判断是否必填填完，而且所填数据正确
	showHtml.judgeAllData.implementation();
	//黄泽建的动态验证方法，进行时间的绑定
	showHtml.QestionRegChecker.initAutoCheckTrigger();
	//x-address取消blur失去焦点事件
	$(".problem ul li .x-address input").off("blur");
};
//系统安卓动态验证
var submit=function(br){
	//输入布尔值若输入false
	//全局保存数据
	showHtml.saveDataTool();
	var a=showHtml.clearUpData();
	a["completeStatus"]=submitCount();
	console.log(a);
	//提交数据
	a=JSON.stringify(a);
	AndroidJs.saveWjDetalAnswer(a,br);
};

//$(function(){
//	$('.zhucy').click(function(){
//	submit(false);
//})
//})

function submitCount(){
			//是closeEleBtn按钮消失
			$("section .closeEleBtn").remove();
			//去除被选中li的下划线
			$("section li").removeClass("ylborder");
			$("section li .x-address").removeClass("addressYlborder");
			//判断是否填完
			judgeFinish.judge();
			//全局保存数据
			showHtml.saveDataTool();
			var a=showHtml.clearUpData();
			//判断是必选项是否完成，返回状态值
			var parent=$("section .problem:visible");
			judgeCheckFinish.judge(null,false,true);
			parent.each(function(){
				var dataArry=$(this).data("dataArry");
				if(dataArry["type"]=="INPUT"){
					if($(this).attr("data-judgefinish")=="no"||$(this).attr("data-checkstate")=="unpass"){
						a["completeStatus"]="1";
//						友好提示
						return false;
					}else{
						a["completeStatus"]="2";
					};
				}else if(dataArry["type"]=="TABLE"){					
					if(showHtml.jsonData_common.modelOjbName=="contactInfoModel" || showHtml.jsonData_common.modelOjbName=="bossContactModel") {
						if($(this).find('.cy span').length<$(this).data("dataArry").answerLimitMin){
							$('<div id="mask"><div class="mask_bg"></div><div class="remove"><p class="_sc">至少需要'+$(this).data("dataArry").answerLimitMin+'联系人<img class="_ci" src="img/close_icon.png"/></p><p class="_qr">确认</p></div></div>').appendTo("body");
							$("._ci,._qr").click(function(){
//									$(".cy span img").remove();
				                $("#mask").remove();
				            });
							a["completeStatus"]="1"
							return false;
						};
						var judgefinishEleMum1=$(this).find('.cy span[data-judgefinish="no"]').length;
						var judgefinishEleMum2=$(this).find('.cy span[data-checkstate="unpass"]').length;
						if(judgefinishEleMum1>0||judgefinishEleMum2>0){
							a["completeStatus"]="1";
							return false;
						}else if(judgefinishEleMum1==0&&judgefinishEleMum2==0){
							a["completeStatus"]="2";
						};
						
					}else {
						var judgefinishEleMum1=$(this).find('.cy span[data-judgefinish="no"]').length;
						var judgefinishEleMum2=$(this).find('.cy span[data-checkstate="unpass"]').length;
						if(judgefinishEleMum1>0||judgefinishEleMum2>0){
							a["completeStatus"]="1";
							return false;
						}else if(judgefinishEleMum1==0&&judgefinishEleMum2==0){
							a["completeStatus"]="2";
						};
					};
				};
			});
			//提交数据
			a = zhangxiaojiang(a);
			a = zhujianan(a);
			return a["completeStatus"];
		};
	


