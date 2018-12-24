//计算
function calc(){
//$(function(){
	$(function() {
	$('.yz-sr input').on('change keyup', function() {
		var Incom = 0;
		var InputLen = $('.yz-sr input').length;
		for (var i = 0; i < $('.yz-sr input').length; i++) {
			Incom += Number($('.yz-sr input').eq(i).val());
		}
		$('span[name="incomeAvg"]').text(toDecimal(Incom / InputLen));
	});
	$('.dx_f input,.hh_f input').on('change keyup', function() { //计算每月可用资金
		$('.verify-error').remove();
		var InSum = Number($('span[name="incomeAvg"]').text());
		var OutSum = Number($('span[name="costAvg"]').text());
		var Differ = toDecimal(InSum - OutSum);
		$('input[data="disposableIncome"]').val(Differ);
	});
})
				var arrText=[];//c类
				var arr=[];  //存储复选框选项内容
				var num="";   //储存 “核实方式”内容字符串
				var A_type;
				var B_type;
				var yt;
				//var totalSum;//当前收入合计总数   
				
					//收入支出点击事件
					$("#sr").on('touchstart',function(){
						$(this).addClass("span_bg").siblings().removeClass("span_bg");
						$(".sr").show();
						$(".zc").hide();
					});
					$("#zc").on('touchstart',function(){
						$(this).addClass("span_bg").siblings().removeClass("span_bg");
						$(".zc").show();
						$(".sr").hide();
					});
					//选项卡点击事件
					$(".ic_select ul li").on('touchstart',function(){
						$(this).addClass("li_bt").siblings().removeClass("li_bt");
						$(".ic_dx").hide().eq($(this).index()).show();
					});
					//复选框点击事件及“核实方式”内容展示
					$(".dx li").click(function(){//A类
						$(".dx_h li").children("i").addClass("ch_img");
						$(".dx_h li").children("span").addClass("span_f");
						$(".dx_h li").children("i").removeClass("on");
						if($(this).children("span").hasClass("span_f")){
							$(".dx li").children("i").addClass("ch_img");
							$(".dx li").children("span").addClass("span_f");
							$(".dx li").children("i").removeClass("on");
							$(this).children("i").addClass('on');
							$(this).children("span").removeClass("span_f");
							A_type=$(this).children("span").html().substr(0,2);
						}else{
							A_type=null;
							$(".dx li").children("i").addClass("ch_img");
							$(".dx li").children("i").removeClass("on");
							$(".dx li").children("span").addClass("span_f");
						}
						
						$(".ic_center span").html(A_type);
						arrText.length=0;
					    yt=$(".ic_center span").html();
					    if(yt=="A2"||yt=="A3"){//B类不能选择的
					    	$(".jj li").children("i").addClass("ch_img");
					    	$(".jj li").children("span").removeClass("span_f");
							$(".jj li").children("i").removeClass("on");
							B_type=null;
					    }if(yt=="A3"){//c类不能选择的
					    	$(".qt li").children("span").removeClass("span_f");
							$(".qt li").children("i").removeClass("on");
							$(".qt li").children("i").addClass("ch_img");
							arrText.length=0;
					    }if(yt=="A4"||yt=="A5"||yt=="A6"){//不能再选B1、C7
					    	$(".jj li").eq(0).children("i").addClass("ch_img");
					    	$(".jj li").eq(0).children("span").removeClass("span_f");
							$(".jj li").eq(0).children("i").removeClass("on");
//					    	$(".qt li").eq(1).hide();
//							$(".jj li").eq(0).hide();
                            $(".qt li").eq(1).children("span").removeClass("span_f");
							$(".qt li").eq(1).children("i").removeClass("on");
							$(".qt li").eq(1).children("i").addClass("ch_img");
//							$(".jj li").eq(0).off('click')
					    }
//					    else{
//					    	$(".qt li").eq(1).show();
//							$(".jj li").eq(0).show();
//					    }
					})
					$(".jj li").on('click',function(){//B类
						A_type=$(".dx li").children("span").not('.span_f').html().substr(0,2);
						if(yt=="A2"||yt=="A3"){
					    	$(".jj li").children("i").addClass("ch_img");
					    	$(".jj li").children("span").removeClass("span_f");
							$(".jj li").children("i").removeClass("on");
					    }
						else{
						if(yt=="A4"||yt=="A5"||yt=="A6"){
					    	$(".jj li").eq(0).children("i").addClass("ch_img");
					    	$(".jj li").eq(0).children("span").removeClass("span_f");
							$(".jj li").eq(0).children("i").removeClass("on");
					    }
						if($(this).children("span").hasClass("span_f")){
							$(".jj li").children("i").addClass("ch_img");
							$(".jj li").children("span").addClass("span_f");
							$(".jj li").children("i").removeClass("on");
							$(this).children("i").addClass('on');
							$(this).children("span").removeClass("span_f");
							B_type=$(this).children("span").html().substr(0,2);
							if(A_type!='A1'){
							$(".jj li").eq(0).children("span").removeClass("span_f");
                            }
						}else{
							B_type=null;
							$(".jj li").children("i").removeClass("on");
							$(".jj li").children("i").addClass("ch_img");
							$(".jj li").children("span").addClass("span_f");
							if(A_type!='A1'){
							$(".jj li").eq(0).children("span").removeClass("span_f");
							}
						}
						if(arrText.length>0){
						var _total='';
                       for(var j=0;j<arrText.length;j++){
                     	_total+=arrText[j]+'+';
                       };
                       var y=_total.substr(0,_total.length-1);
						yt=A_type+'+'+y;	
						}else{
						$(".ic_center span").html(A_type);
					    yt=A_type;
						}
						if(B_type!=null){
							var cc=yt+'+'+B_type;
							$(".ic_center span").html(cc)
								}else{
								$(".ic_center span").html(yt);
							}
						}
					})
					
					$(".qt li").on('touchstart',function(){//C类
						A_type=$(".dx li").children("span").not('.span_f').html().substr(0,2);
						console.log(A_type)
						if(yt=="A3"){
							$(".qt li").children("span").removeClass("span_f");
							$(".qt li").children("i").removeClass("on");
							$(".qt li").children("i").addClass("ch_img");
							arrText.length=0;
						}else{
						$(".qt li").children("i").addClass('ch_img');
						if(yt=="A4"||yt=="A5"||yt=="A6"){
					    	$(".qt li").eq(1).children("span").removeClass("span_f");
							$(".qt li").eq(1).children("i").removeClass("on");
							$(".qt li").eq(1).children("i").addClass("ch_img");
					    }
						if($(this).children("span").hasClass("span_f")){
							$(this).children("span").removeClass("span_f");
							$(this).children("i").addClass('on');
							arr.push($(this).children("span").attr('data'));
						    var tx=$(this).children("span").text().substr(0,2);
							arrText.push(tx);
						}else{
							$(this).children("span").addClass("span_f");
							$(this).children("i").removeClass('on');
							$(this).children("i").addClass('ch_img');
							if(A_type!="A1"&&A_type!="A2"){
							$(".qt li").eq(1).children("span").removeClass("span_f");
							}
							num="";
							var kk=$(this).children("span").attr('data');
							var tx=$(this).children("span").text().substr(0,2);
							for(var i in arr){
								if(arr[i]==kk){
									arr.splice(i,1);
                                }
							}
							for(var t in arrText){
								if(arrText[t]==tx){
									arrText.splice(t,1);
								}
							}
//								//num+=arr[i].substring(0,2)+"+";
//								num+="+"+arr[i].substring(0,2);
						  };
						}
//						var content=num.substring(1,num.length);
//						$(".ic_center span").html(content);
//                   console.log(arr);
                   
                    var _total='';
	                     for(var j=0;j<arrText.length;j++){
	                     	_total+=arrText[j]+'+';
	                     }
	                     
                     var y=_total.substr(0,_total.length-1);
                     var t;
                     if(y!=''){
                     	 if(B_type!=null){
                           t=A_type+'+'+B_type+'+'+y;
                         }else{
                           t=A_type+'+'+y;
                         }
	                     }else{
		                     if(B_type!=null){
	                           t=A_type+'+'+B_type;
	                         }else{
	                           t=A_type;
	                         }
	                    }
                     $(".ic_center span").html(t);
//                   arrText.length=0;
					});
					for(var k=0;k<$(".dx_h li").length;k++){
							if(!($('.dx_h li').eq(k).children('span').hasClass('span_f'))){
								arr.push($('.dx_h li').eq(k).children('span').attr('data'));
							}
					}
					//输入框获取焦点事件
					$(".problem li input").on("focus",function(){
						$(this).parent().parent().addClass("ylborder");
						$(this).parent().parent().siblings().removeClass("ylborder");
					});
					$(".problem li input").on("blur",function(){
						$(this).parent().parent().removeClass("ylborder");
						if($(this).val()!=""){
							$(this).parent().siblings(".left").children("i").css({"color":"#a09fa4"});
						}else{
							$(this).parent().siblings(".left").children("i").css({"color":"#191919"});
						}
					});
					//文本框焦点事件
					$("textarea").on("focus",function(){
						if($("textarea").text()==""){
							$(".b_k").hide();
						}
						$("textarea").addClass("textYellow");
					}).on("blur",function(){
						if($("textarea").text()==""){
							$(".b_k").show();
						}else{
							$(".b_k").hide();
						}
						$("textarea").removeClass("textYellow");
					});
//					//下拉框点击弹窗事件
//					$(".choose").parent().click(function(){
//						var that = $(this).children("span");
//						
//						return false;
//					});
				
				//对所有的input监听   内容改变重新计算结果
				$(".dx_f li input").bind("change keyup",function  () {
					updataSum(); //行求和
//					incomesummary();  //收入列求和
					outSummary();   //支出列求和   
				})
				//计算表格 行之和
				function updataSum () {
					$(".dx_f li input.singleTotal").each(function  () {
						var p=$(this).parent().parent();//找到对应的行 即li
						var hsum=0;  //行求和
//						console.log(p.find("input").eq(0).val());
//						console.log(p.find("input").eq(1).val());
//						console.log(p.find("input").eq(2).val());
						hsum=Number(p.find("input").eq(1).val())+Number(p.find("input").eq(2).val())+Number(p.find("input").eq(3).val());
						$(this).val(hsum);
//						console.log(hsum)
						return hsum;
					});
				}
				//计算支出表格之和
				function outSummary() {
					var vsum=0;  //列求和
					var outTotal=0;
					var Tvsum=0;
					var Dvsum=0;
					var YDvsum=0;
					for (var j=0;j<$(".zc_table span.verticalTotal").length;j++){
						var vsum=0;
						for (var i=1;i<$('.zc_table li').length-2;i++){
						    vsum+=Number($('.zc_table li').eq(i).children('span').eq(j+1).children('input').val());
						 }
					 vsum=Number(vsum/($(".zc_table li").length-3));
					 Tvsum=toDecimal(vsum);
					 $(".zc_table li span.verticalTotal").eq(j).html(Tvsum);
//				     console.log(vsum);
					}
					
					//薪贷
					for (var j=0;j<$(".dx_table span.verticalTotal").length;j++){
						var Dsum=0;
						for (var i=1;i<$('.dx_table li').length-2;i++){
						    Dsum+=Number($('.dx_table li').eq(i).children('span').eq(j+1).children('input').val());
						 }
					 Dsum=Number(Dsum/($(".dx_table li").length-3));
					 Dvsum=toDecimal(Dsum);
					 $(".dx_table li span.verticalTotal").eq(j).html(Dvsum);
					}
					//业主贷
					for (var j=0;j<$(".yz_table span.verticalTotal").length;j++){
						var YDsum=0;
						for (var i=1;i<$('.yz_table li').length-1;i++){
							console.log($('.yz_table li').eq(i).children('span').eq(j+1).children('input').val())
						    YDsum+=Number($('.yz_table li').eq(i).children('span').eq(j+1).children('input').val());
						    console.log(YDsum)
						 }
					 YDsum=Number(YDsum/($(".yz_table li").length-2));
					 YDvsum=toDecimal(YDsum);
					 $(".yz_table li span.verticalTotal").eq(j).html(YDvsum);
//				     console.log(vsum);
					}
				}
				
//})
};
//保留小数点后两位
function toDecimal(x) {  
            var f = parseFloat(x);  
            if (isNaN(f)) {  
                return;  
            }  
//          f = Math.round(x*100)/100; /*改变保留小数点后几位（100=2,1000=3）*/
            f = Math.round(x,0);
            return f;  
        }