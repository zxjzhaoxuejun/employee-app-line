
var sj;
var otherTimeArr=[];
var load = false;
var mask1_lists,mask2_lists;
$('.textCons textarea').on('blur', function() {
	if ($('.textCons textarea').val().trim() != "") {
		$('.textCons span').hide();
	} else {
		$('.textCons span').show();
	}
	$('.textCons textarea').removeClass('textYellow');
});
$('.textCons textarea').on('focus', function() {
	$('.textCons span').hide();
	$(this).addClass('textYellow');
});
$(".problem li input").on("focus", function() {
	$(this).parent().parent().addClass("ylborder");
	$(this).parent().parent().siblings().removeClass("ylborder");
});
$(".problem li input").on("blur", function() {
	$(this).parent().parent().removeClass("ylborder");
	if ($(this).val().trim() != "") {
		$(this).parent().siblings(".left").children("i").css({
			"color": "#a09fa4"
		});
	} else {
		$(this).parent().siblings(".left").children("i").css({
			"color": "#191919"
		});
	}
});
$(".a_dd .show li .right span").parent().on("click", function() {
	mask1($(this));
});
$(".j_ian #section14 .show li .right span").parent().on("click", function() {
	mask2($(this));
});
$(".j_ian #section15 .show li .right span").parent().on("click", function() {
	mask3($(this));
});

function mask1(_this) {
	var liHtml='';
	for(var k=0;k<mask1_lists.length;k++){//isControlShow="1"
	   if(!mask1_lists[k].value.indexOf('其他')){
	   	liHtml+='<li name="'+mask1_lists[k].key+'" isControlShow="1">'+mask1_lists[k].value+'</li>';
	   }else{
	   	liHtml+='<li name="'+mask1_lists[k].key+'">'+mask1_lists[k].value+'</li>';
	   }
	}
	
	
	$('<div id="mask"><div class="mask_bg"></div><ul>'+liHtml+'<li class="cancel">取消</li></ul></div>').appendTo("body");
	$("#mask li").each(function(){
		var th_at=$(this);
		$("#section13 .show").find(".cy span").each(function(){
			if($(this).attr("DynamicShow")!=undefined){
				if($(this).attr("DynamicShow")==th_at.attr("name")){
					th_at.hide();
				}
			}
			
		})
	})
	$("#mask li").on("click", function() {
		var _that = $(this);
		if ($(this).text() == "取消") {
			$("#mask").remove();
		} else {
			$("#mask").remove();
			_this.children().text($(this).text()).css({
				"color": "#191919"
			});
			_this.siblings(".left").children("i").css({
				"color": "#a09fa4"
			});
			_this.parent().attr("name", $(this).attr("name"));
			$("#section13 .show").find(".cy span").each(function(){
				if($(this).hasClass("span_bg")){
					$(this).removeAttr("DynamicShow");
					$(this).attr("DynamicShow",_that.attr("name"));
				}
			});
		}
		if (_that.text() != "取消") {
			$("#section13 .cy span").each(function() {
				if ($(this).hasClass("span_bg")) {
					if (_that.text().length > 4) {
						$(this).text(_that.text().substr(0, 4))
					} else {
						$(this).text(_that.text())
					}
				}
			})
		}
		$("#section13 .show").find(".cy span").each(function() {
			if ($(this).hasClass("span_bg")) {
				$(this).removeAttr("isControlShow");
				if (_that.attr("isControlShow") == "1") {
					$(this).attr("isControlShow", "1");
				}
			}
		});
		if (_that.attr("isControlShow") == "1") {
			$("#section13 li").eq(1).show();
		} else {
			$("#section13 li").eq(1).hide();
		}
	});
}

function mask2(_this) {
	var liHtml='';
	for(var k=0;k<mask2_lists.length;k++){//isControlShow="1"
	   if(!mask2_lists[k].value.indexOf('其他')&&mask2_lists[k].value.length<4){
	   	liHtml+='<li name="'+mask2_lists[k].key+'" isControlShow="1">'+mask2_lists[k].value+'</li>';
	   }else{
	   	liHtml+='<li name="'+mask2_lists[k].key+'">'+mask2_lists[k].value+'</li>';
	   }
	}
	
	
	$('<div id="mask"><div class="mask_bg"></div><ul><div class="m_div">'+liHtml+'</div><li class="cancel">取消</li></ul></div>').appendTo("body");
	$("#mask li").each(function(){
		var th_at=$(this);
		$("#section14 .show").find(".cy span").each(function(){
			if($(this).attr("DynamicShow")!=undefined){
				if($(this).attr("DynamicShow")==th_at.attr("name")){
					th_at.hide();
				}
			}
			
		})
	})
	$("#mask li").on("click", function() {
		var _that = $(this);
		if ($(this).text() == "取消") {
			$("#mask").remove();
		} else {
			$("#mask").remove();
			_this.children().text($(this).text()).css({
				"color": "#191919"
			});
			_this.siblings(".left").children("i").css({
				"color": "#a09fa4"
			});
			_this.parent().attr("name", $(this).attr("name"));
			$("#section14 .show").find(".cy span").each(function(){
				if($(this).hasClass("span_bg")){
					$(this).removeAttr("DynamicShow");
					$(this).attr("DynamicShow",_that.attr("name"));
				}
			});
		}
		if (_that.text() != "取消") {
			$("#section14 .cy span").each(function() {
				if ($(this).hasClass("span_bg")) {
					if (_that.text().length > 4) {
						$(this).text(_that.text().substr(0, 4))
					} else {
						$(this).text(_that.text())
					}

				}
			})
		}
		$("#section14 .show").find(".cy span").each(function() {
			if ($(this).hasClass("span_bg")) {
				$(this).removeAttr("isControlShow");
				if (_that.attr("isControlShow") == "1") {
					$(this).attr("isControlShow", "1");
				}
			}
		});
		if (_that.attr("isControlShow") == "1") {
			$("#section14 li").eq(1).show();
		} else {
			$("#section14 li").eq(1).hide();
		}
	});
}

function mask3(_this) {
	$('<div id="mask"><div class="mask_bg"></div><ul><div class="m_div"><li name="{69E70A28-8629-4148-9B70-0C7075A90A93}">其他亲属</li><li name="{BB371C93-CB2C-4F0E-B215-509FCD654E9C}">同学</li><li name="{BC8C881E-7ABC-47D4-B3AE-E51E9DCF3DA7}">朋友</li><li name="{D273B17C-EAA9-47BD-889B-BA4142E50B22}">合伙人</li><li name="{D36C49E1-308E-40C0-8AD6-676338A4913F}" isControlShow="1">其他</li><li name="{FEB0D593-BC9E-431F-A218-83F03B85E392}">兄弟姐妹</li></div><li class="cancel">取消</li></ul></div>').appendTo("body");
	$("#mask li").on("click", function() {
		var _that = $(this);
		if ($(this).text() == "取消") {
			$("#mask").remove();
		} else {
			$("#mask").remove();
			_this.children().text($(this).text()).css({
				"color": "#191919"
			});
			_this.siblings(".left").children("i").css({
				"color": "#a09fa4"
			});
			_this.parent().attr("name", $(this).attr("name"))
		}
		if (_that.text() != "取消") {
			$("#section15 .cy span").each(function() {
				if ($(this).hasClass("span_bg")) {
					if (_that.text().length > 4) {
						$(this).text(_that.text().substr(0, 4))
					} else {
						$(this).text(_that.text())
					}

				}
			});
		}
		$("#section15 .show").find(".cy span").each(function() {
			if ($(this).hasClass("span_bg")) {
				$(this).removeAttr("isControlShow");
				if (_that.attr("isControlShow") == "1") {
					$(this).attr("isControlShow", "1");
				}
			}
		});
		if (_that.attr("isControlShow") == "1") {
			$("#section15 li").eq(1).show();
		} else {
			$("#section15 li").eq(1).hide();
		}
	});
}

var other = { //加
	advance: function(v, bossOthersPayableAccounts) {
		var a_dd = {};
		var a_num = 1;
		if (v) {
			$("#section13 .cy").children().remove();
			a_num = 0;
			$(bossOthersPayableAccounts).each(function(i) {
				a_num++;
				if (i==0) {//$(this)[0].lineNo == "1"
					csh($("#section13 .show li"), $(this)[0]);
				}
				console.log($(this)[0])
				a_dd[i + 1] = [];
				if ($(this)[0]["category"] != null) {
					var _cd = $("#section13 .show li:first").attr("ct").split(",");
					var jv;
					var jp = $(this)[0]["category"];
					$(_cd).each(function(i) {
						if (_cd[i].substring(0, _cd[i].indexOf(":")) == jp) {
							$("#section13 .show li:first").attr("name", bossOthersPayableAccounts[0]["category"]);
							jv = _cd[i].substring(_cd[i].indexOf(":") + 1);
						}
					})
					if (jv == undefined) {
						jv = "页签"
					}
					var guidArr_1=[];
					
					for(var g=0;g<mask1_lists.length;g++){
						guidArr_1.push(mask1_lists[g].key);
					}
					
					
					var arra =guidArr_1;// ["{BD38EA40-B814-4629-B0DB-B3A224A9E880}","{5CBAD805-C82A-8D7C-E055-52C8D2E0C3C8}","{7EEAE491-4D86-44A0-9420-00348B238997}","{D0920350-3E33-4A8E-A626-6D0C2106A1E2}","{5BFC0847-CC7A-4208-ADB3-340047D8D966}","{5BFC0847-CC7A-4208-ADB3-340047D8D966}","{1E5F4994-FE87-4955-88FD-DC3067BD78E5}","{94CBC214-9CD6-4FF2-A893-3FB71BDC91D0}"];
					var g = false;
					$.each(arra, function(i,val) {
						if(val==jp){
							g=true;
						}
					});
					if (jv.length > 4) {
						if(g){
							if(!jv.indexOf('其他')){//jp=="{1E5F4994-FE87-4955-88FD-DC3067BD78E5}"
								$("<span iscontrolshow='1' dynamicshow='"+jp+"'>" + jv.substr(0, 4) + "</span>").appendTo("#section13 .cy");
							}else{
								$("<span dynamicshow='"+jp+"'>" + jv.substr(0, 4) + "</span>").appendTo("#section13 .cy");
							}
						}else{
							$("<span>页签</span>").appendTo("#section13 .cy");
						}
					} else {
						if(g){
							if(!jv.indexOf('其他')){//jp=="{1E5F4994-FE87-4955-88FD-DC3067BD78E5}"
								$("<span iscontrolshow='1' dynamicshow='"+jp+"'>" + jv + "</span>").appendTo("#section13 .cy");	
							}else{
								$("<span dynamicshow='"+jp+"'>" + jv + "</span>").appendTo("#section13 .cy");
							}
						}else{
							$("<span>页签</span>").appendTo("#section13 .cy");
						}
					}
				} else {
					$("<span>页签</span>").appendTo("#section13 .cy");
				}
				
//				a_dd[i + 1].push($(this)[0]);
				
				for (key in $(this)[0]) {
					var _this = $(this);
					$("#section13 .show li").each(function() {
						if (key == $(this).attr("fieldname")) {
							var td = {};
							td[key] = _this[0][key];
							a_dd[i + 1].push(td)
						}
					})
				}
				$("#section13 .cy").children().first().addClass("span_bg");
			})
			if ($("#section13 .cy").children().length > 1) {
				$("#section13 .jian").show();
			}
			if ($("#section13 .cy span").eq(0).attr("iscontrolshow") == "1") {
				$("#section13 li").eq(1).show();
			} else {
				$("#section13 li").eq(1).hide();
			};
			var guidArr_1=[];
					
					for(var g=0;g<mask1_lists.length;g++){
						guidArr_1.push(mask1_lists[g].key);
					}
			
			
			var arre =guidArr_1; //["{BD38EA40-B814-4629-B0DB-B3A224A9E880}", "{7EEAE491-4D86-44A0-9420-00348B238997}", "{D0920350-3E33-4A8E-A626-6D0C2106A1E2}", "{94CBC214-9CD6-4FF2-A893-3FB71BDC91D0}", "{5BFC0847-CC7A-4208-ADB3-340047D8D966}"];
			console.log(a_dd)
			for (key in a_dd) {
				$.each(a_dd[key], function(i, val) {
					for (k in val) {
						$.each(arre, function(j, jal) {
							if (jal == val[k]) {
								console.log(a_dd[key])
								var ayr = [];
								for (jey in a_dd[key]) {
									for (hey in a_dd[key][jey]) {
										if (hey == "category") {
											ayr.push(a_dd[key][jey]);
										}
										if (hey == "categoryOther") {
											ayr.push(a_dd[key][jey]);
										}
										if (hey == "date") {
											ayr.push(a_dd[key][jey]);
										}
										if (hey == "amount") {
											ayr.push(a_dd[key][jey]);
										}
									}
								}
								a_dd[key] = ayr;
							}
						})
					}
				});
			}
			a_Save();
		}

		function a_Save() {
			var i_dx;
			$("#section13 .cy span").each(function() {
				if ($(this).hasClass("span_bg")) {
					i_dx = $(this).index() + 1;
				}
			});
			a_dd[i_dx] = [];
			$("#section13 .show ul li").each(function() {
				if($(this).is(":visible")){
					var newtsj = {};
					if ($(this).children(".right").children("span").length == 1) {
						var a_v = $(this).attr("name");
						if (a_v == undefined) {
							a_v = null;
						}
						newtsj[$(this).attr("fieldname")] = a_v;
					} else if ($(this).children(".right").children("input").length == 1) {
						var a_v = $(this).children(".right").children("input").val();
						if (a_v.trim() == "") {
							a_v = null;
						}
						newtsj[$(this).attr("fieldname")] = a_v;
					}
					a_dd[i_dx].push(newtsj);
				}
			});
			total = 0;
			for (var i in a_dd) {
				$(a_dd[i]).each(function() {
					if ($(this)[0].amount != undefined) {
						if ($(this)[0].amount != null) {
							total += parseInt($(this)[0].amount)
						}
					}
				})
			};
			$("#section13 ._zsp").text(total);
			return a_dd;
		}
		this.a_Save = a_Save;
		$("#section13 .add").on("click", function() {
			if ($("#section13 .cy:visible").length == 0) {
				$("#section13 .cy,#section13 ul,#section13 .jian").show();
				a_Save();
			} else {
				a_Save();
				var s_t = "";
				var s_l = "";
				var ns_t = null;
				var l_i = $("#section13 .show ul li");
				for (var i = 0; i < l_i.length; i++) {
					l_i.eq(i).find(".left label").remove();
					if (l_i.eq(i).attr("islabel") == 1) {
						ns_t = 1;
						if (l_i.eq(i).children(".right").children("span").length == 1) {
							s_l = l_i.eq(i).children(".left").children("i").text();
							s_t = l_i.eq(i).children(".right").children("span").text();
						} else if (l_i.eq(i).children(".right").children("input").length == 1) {
							s_l = l_i.eq(i).children(".left").children("i").text();
							s_t = l_i.eq(i).children(".right").children("input").val();
						} else if (l_i.eq(i).children(".right").hasClass("chenckbox")) {
							s_l = l_i.eq(i).children(".left").children("i").text();
							var _st = "";
							for (var j = 0; j < l_i.eq(i).children(".right").children("label").length; j++) {
								if (l_i.eq(i).children(".right").children("label").eq(j).children("input").prop("checked")) {
									_st += l_i.eq(i).children(".right").children("label").eq(j).children("span").text() + ",";
								}
							}
							s_t = _st.slice(0, -1);
						}
					};
				}
				if (ns_t == null && $("#section13 .problem ul li").first().find(".right span").text() != "请选择") {
					a_num++;
					$("#section13 .show ul li").eq(1).hide();
					$('<span>页签</span>').appendTo("#section13 .cy").addClass("span_bg").siblings().removeClass("span_bg");
					$("#section13 .show ul li").each(function() {
						if ($(this).children(".right").children("span").length == 1) {
							$("#section13 .show li:first").removeAttr("name");
							$(this).children(".right").children("span").text("请选择").css({
								"color": "#a0a0a5"
							});;
							$(this).children(".left").children("i").css({
								"color": "#191919"
							});
						} else if ($(this).children(".right").children("input").length == 1) {
							$(this).children(".right").children("input").val("");
							$(this).children(".left").children("i").css({
								"color": "#191919"
							});
						}
					});
					if (a_num > 0) {
						$("#section13 ._xq").children("#section13 .jian").show();
					}
				};
				if (s_t != "" && s_t != "请选择") {
					//判断li第一个元素的内容是否为span
					a_num++;
					$('<span>页签</span>').appendTo("#section13 .cy").addClass("span_bg").siblings().removeClass("span_bg");
					a_num++;
					if (a_num > 0) {
						$("#section13 ._xq").children("#section13 .jian").show();
					}
					$("#section13 .show ul li").each(function() {
						if ($(this).children(".right").children("span").length == 1) {
							$("#section13 .show li:first").removeAttr("name");
							$(this).children(".right").children("span").text("请选择").css({
								"color": "#a0a0a5"
							});;
							$(this).children(".left").children("i").css({
								"color": "#191919"
							});
						} else if ($(this).children(".right").children("input").length == 1) {
							$(this).children(".right").children("input").val("");
							$(this).children(".left").children("i").css({
								"color": "#191919"
							});
						}
					});
				};
			}

		});





		$(document).on("click", "#section13 .cy span", function() {
			a_Save();
			console.log(a_dd)
			$(this).addClass("span_bg").siblings().removeClass("span_bg");
			if ($(this).attr("iscontrolshow") == "1") {
				$("#section13 li").eq(1).show();
			} else {
				$("#section13 li").eq(1).hide();
			}
			var _idx = $(this).index();
			$("#section13 .show ul li").each(function() {
				$(this).find(".left label").remove();
				var fn = $(this).attr("fieldname");
				var a_jv;
				$(a_dd[_idx + 1]).each(function() {
					for (key in $(this)[0]) {
						if (key == fn) {
							a_jv = $(this)[0][key]
						}
					}
				})
				if ($(this).children(".right").children("span").length == 1) {
					$("#section13 .show li:first").removeAttr("name");
					if (a_jv != null) {
						var _cd = $("#section13 .show li:first").attr("ct").split(",");
						var jv;
						var jp = a_jv;
						var _this = $(this);
						var k= false;
						$(_cd).each(function(i) {
							if (_cd[i].substring(0, _cd[i].indexOf(":")) == jp) {
								k = true;
								$("#section13 .show li:first").attr("name", jp);
								a_jv = _cd[i].substring(_cd[i].indexOf(":") + 1);
								_this.children(".right").children("span").text(a_jv).css({
									"color": "#191919"
								});
								_this.children(".left").children("i").css({
									"color": "#a0a0a5"
								});
							}
						})
						if(!k){
							_this.children(".right").children("span").text("请选择").css({
								"color": "#a0a0a5"
							});
							_this.children(".left").children("i").css({
								"color": "#191919"
							});
						}
						
					} else {
						$(this).children(".right").children("span").text("请选择").css({
							"color": "#a0a0a5"
						});
						$(this).children(".left").children("i").css({
							"color": "#191919"
						});
					}
				} else if ($(this).children(".right").children("input").length == 1) {
					if(a_jv!=null){
						if($(this).children(".right").children("input").attr("name")!="input_date"){
							if(!isNaN(parseInt(a_jv))){
								$(this).children(".right").children("input").val(parseInt(a_jv));
							}else{
								$(this).children(".right").children("input").val(a_jv);
							}
						}else{
							$(this).children(".right").children("input").val(a_jv);
						}
						$(this).children(".left").children("i").css({"color":"#a0a0a5"});
					}else{
						$(this).children(".right").children("input").val("");
						$(this).children(".left").children("i").css({"color":"#191919"});
					}
				}
			});
			// $("#section13 .problem .cy span").each(function(){
			// 	if(a_dd[$(this).index()+1][0][0]!=null){
			// 		$(this).text(a_dd[$(this).index()+1][0][0])
			// 	}
			// });
		});
		$("#section13 .jian").on("click", function() {
			a_Save();
			$("#section13 .problem .cy span").each(function() {
				if (a_dd[$(this).index() + 1][0][0] != null) {
					$(this).text(a_dd[$(this).index() + 1][0][0])
				}
			});
			if (a_num > 0) {
				$("#section13 .cy span").each(function() {
					$("<img src='img/close_icon.png'/>").appendTo($(this));
				})
				$("#section13 .cy span img").click(function() {
					var _tp = $(this).parent();
					var _tidx = $(this).parent().index();
					$('<div id="mask"><div class="mask_bg"></div><div class="remove"><p class="s_c">您确认要删除吗？<img class="_ci" src="img/close_icon.png"/><p class="_qr">确认</p></div></div>').appendTo("body");
					$("._ci").click(function() {
						$("#section13 .cy span img").remove();
						$("#mask").remove();
					});
					$("._qr").click(function() {
						$("#section13 .cy span img").remove();
						$("#mask").remove();
						if (a_num == 1) {
							$("#section13 .jian,#section13 .cy,#section13 ul").hide();
							$("#section13 ._zsp").text("0");
						} else {
							_tp.remove();
							if (_tidx == 0) {
								$("#section13 .show .cy span").eq(0).addClass("span_bg").siblings().removeClass("span_bg");
							} else {
								$("#section13 .show .cy span").eq(_tidx - 1).addClass("span_bg").siblings().removeClass("span_bg");
							}
							delete a_dd[_tidx + 1];
							if (_tidx + 1 < a_num) {
								var _sol = 0;
								var _sos = {};
								for (var i in a_dd) {
									_sol++;
									_sos[_sol] = a_dd[i];
								}
								a_dd = _sos;
							}
							a_num--;
							// if (a_num == 1) {
							// 	$("#section13 .jian").hide();
							// }
							$("#section13 .show ul li").each(function() {
								$(this).find(".left label").remove();
								if (_tidx == 0) {
									_tidx = 1
								}
								var fn = $(this).attr("fieldname");
								var a_jv;
								$(a_dd[_tidx]).each(function() {
									for (key in $(this)[0]) {
										if (key == fn) {
											a_jv = $(this)[0][key]
										}
									}
								})
								if ($(this).children(".right").children("span").length == 1) {
									$("#section13 .show li:first").removeAttr("name");
									if (a_jv != null) {
										var _cd = $("#section13 .show li:first").attr("ct").split(",");
										var jv;
										var jp = a_jv;
										$(_cd).each(function(i) {
											if (_cd[i].substring(0, _cd[i].indexOf(":")) == jp) {
												$("#section13 .show li:first").attr("name", jp);
												a_jv = _cd[i].substring(_cd[i].indexOf(":") + 1);
											}
										})
										$(this).children(".right").children("span").text(a_jv).css({
											"color": "#191919"
										});
										$(this).children(".left").children("i").css({
											"color": "#a0a0a5"
										});

									} else {
										$(this).children(".right").children("span").text("请选择").css({
											"color": "#a0a0a5"
										});
										$(this).children(".left").children("i").css({
											"color": "#191919"
										});
									}
								} else if ($(this).children(".right").children("input").length == 1) {
									if(a_jv!=null){
										if($(this).children(".right").children("input").attr("name")!="input_date"){
											if(!isNaN(parseInt(a_jv))){
												$(this).children(".right").children("input").val(parseInt(a_jv));
											}else{
												$(this).children(".right").children("input").val(a_jv);
											}
										}else{
											$(this).children(".right").children("input").val(a_jv);
										}
										$(this).children(".left").children("i").css({"color":"#a0a0a5"});
									}else{
										$(this).children(".right").children("input").val("");
										$(this).children(".left").children("i").css({"color":"#191919"});
									}
								}
							});
							a_Save();
							$("#section13 .cy span").each(function() {
								if ($(this).hasClass("span_bg")) {
									if ($(this).attr("iscontrolshow") == "1") {
										$("#section13 li").eq(1).show();
									} else {
										$("#section13 li").eq(1).hide();
									}
								}
							})
						};

					});
				})
			}
		});
		var total;
		if ($.isEmptyObject(a_dd)) {
			total = 0;
		};
		$("#section13 .amount").find("input").on("keyup", function() {
			a_Save();
		});
		// if (a_num == 1) {
		// 	$("#section13 .jian").hide();
		// };
	}

}
var jian = { //减
	advance: function(v, bossOthersPayableAccounts) {
		var a_dd = {};
		var a_num = 1;
		if (v) {
			$("#section14 .cy").children().remove();
			a_num = 0;
			$(bossOthersPayableAccounts).each(function(i) {
				a_num++;
				if (i==0) {//$(this)[0].lineNo == "1"
					csh($("#section14 .show li"), $(this)[0]);
				}
				a_dd[i + 1] = [];
				
				if ($(this)[0]["category"] != null) {
					var _cd = $("#section14 .show li:first").attr("ct").split(",");
					var jv;
					var jp = $(this)[0]["category"];
					console.log(jp)
					$(_cd).each(function(i) {

						if (_cd[i].substring(0, _cd[i].indexOf(":")) == jp) {
							$("#section14 .show li:first").attr("name", bossOthersPayableAccounts[0]["category"]);
							jv = _cd[i].substring(_cd[i].indexOf(":") + 1);
						}
					})
					if (jv == undefined) {
						jv = "页签"
					}
					var guidArr_2=[];
					for(var g=0;g<mask2_lists.length;g++){
						guidArr_2.push(mask2_lists[g].key);
					}
					
					var arra =guidArr_2;// ["{37A37E66-50F4-4D8C-8908-826F776198ED}","{4BFAB7EA-D916-4508-8078-88F340468549}","{FF912F6F-44FD-442A-A9FC-C280DFA655E4}","{C2BA3062-E717-4B99-A68C-CAF6B2B9E628}","{B0F7B4AC-3875-401F-A4EB-BE01E45FECDE}","{2955FC4B-35E4-4B30-97D6-6DDAC83A822D}","{1897A6D1-52F3-4819-9033-3CD26579FFBB}"];
					var g = false;
					$.each(arra, function(i,val) {
						if(val==jp){
							g=true;
						}
					});
					
					if (jv.length > 4) {
						if(g){
							if(!jv.indexOf('其他')&&jv.length<4){//jp=="{1897A6D1-52F3-4819-9033-3CD26579FFBB}"
								$("<span iscontrolshow='1' dynamicshow='"+jp+"'>" + jv.substr(0, 4) + "</span>").appendTo("#section14 .cy");
							}else{
								$("<span dynamicshow='"+jp+"'>" + jv.substr(0, 4) + "</span>").appendTo("#section14 .cy");
							};
						}else{
							$("<span>页签</span>").appendTo("#section14 .cy");
						}
					} else {
						if(g){
							if(!jv.indexOf('其他')&&jv.length<4){//jp=="{1897A6D1-52F3-4819-9033-3CD26579FFBB}"
								$("<span iscontrolshow='1' dynamicshow='"+jp+"'>" + jv + "</span>").appendTo("#section14 .cy");
							}else{
								$("<span dynamicshow='"+jp+"'>" + jv + "</span>").appendTo("#section14 .cy");
							};
						}else{
							$("<span>页签</span>").appendTo("#section14 .cy");
						}
					}
				} else {
					$("<span>页签</span>").appendTo("#section14 .cy");
				}
//				console.log($(this)[0]);
//				a_dd[i+1].push($(this)[0]);
				for (key in $(this)[0]) {
					var _this = $(this);
					$("#section14 .show li").each(function() {
						if (key == $(this).attr("fieldname")) {
							var td = {};
							td[key] = _this[0][key];
							a_dd[i + 1].push(td)
						}
					})
				}
				$("#section14 .cy").children().first().addClass("span_bg");
			})
			if ($("#section14 .cy").children().length > 1) {
				$("#section14 .jian").show();
			};
			if ($("#section14 .cy span").eq(0).attr("iscontrolshow") == "1") {
				$("#section14 li").eq(1).show();
			} else {
				$("#section14 li").eq(1).hide();
			};
			var guidArr_2=[];
					for(var g=0;g<mask2_lists.length;g++){
						guidArr_2.push(mask2_lists[g].key);
					}
			
			var arre =guidArr_2 ;//["{37A37E66-50F4-4D8C-8908-826F776198ED}", "{4BFAB7EA-D916-4508-8078-88F340468549}", "{FF912F6F-44FD-442A-A9FC-C280DFA655E4}", "{C2BA3062-E717-4B99-A68C-CAF6B2B9E628}", "{B0F7B4AC-3875-401F-A4EB-BE01E45FECDE}","{2955FC4B-35E4-4B30-97D6-6DDAC83A822D}"];
			for (key in a_dd) {
				$.each(a_dd[key], function(i, val) {
					for (k in val) {
						$.each(arre, function(j, jal) {
							if (jal == val[k]) {
								var ayr = [];
								for (jey in a_dd[key]) {
									for (hey in a_dd[key][jey]) {
										if (hey == "category") {
											ayr.push(a_dd[key][jey]);
										}
										if (hey == "date") {
											ayr.push(a_dd[key][jey]);
										}
										if (hey == "categoryOther") {
											ayr.push(a_dd[key][jey]);
										}
										if (hey == "amount") {
											ayr.push(a_dd[key][jey]);
										}
									}
								}
								a_dd[key] = ayr;
							}
						})
					}
				});
			}
			
			a_Save();
		}
			console.log(a_dd)
		function a_Save() {
			var i_dx;
			$("#section14 .cy span").each(function() {
				if ($(this).hasClass("span_bg")) {
					i_dx = $(this).index() + 1;
				}
			});
			a_dd[i_dx] = [];
			$("#section14 .show ul li").each(function() {
				if($(this).is(":visible")){
					
					var newtsj = {};
					if ($(this).children(".right").children("span").length == 1) {
						var a_v = $(this).attr("name");
						if (a_v == undefined) {
							
							a_v = null;
						}
						if (a_v == "请选择" || a_v == "取消") {
							a_v = null
						}
						newtsj[$(this).attr("fieldname")] = a_v;
					} else if ($(this).children(".right").children("input").length == 1) {
						var a_v = $(this).children(".right").children("input").val();
						if (a_v.trim() == "") {
							a_v = null;
						}
						newtsj[$(this).attr("fieldname")] = a_v;
					}
					a_dd[i_dx].push(newtsj);
				}
			});
			total = 0;
			for (var i in a_dd) {
				$(a_dd[i]).each(function() {
					if ($(this)[0].amount != undefined) {
						if ($(this)[0].amount != null) {
							total += parseInt($(this)[0].amount)
						}
					}
				})
			};
			$("#section14").attr("total", total);
			var s1 = parseInt($("#section14").attr("total"));
			var s2 = parseInt($("#section15").attr("total"));
			$("#section14 ._zsp").text(s1 + s2);
			if ($("#section14 .cy:visible").length == 0) {
				$("#section14 ._zsp").text(s2);
			} else if ($("#section15 .cy:visible").length == 0) {
				$("#section14 ._zsp").text(s1);
			} else if ($("#section14 .cy:visible").length == 0 && $("#section15 .cy:visible").length == 0) {
				$("#section14 ._zsp").text("0");
			}
			console.log(a_dd)
			return a_dd;
		}
		this.a_Save = a_Save;
		$("#section14 .add").on("click", function() {

			if ($("#section14 .cy:visible").length == 0) {
				$("#section14 .cy,#section14 ul,#section14 .jian").show();
				a_Save();
			} else {
				a_Save();
				var s_t = "";
				var s_l = "";
				var ns_t = null;
				var l_i = $("#section14 .show ul li");
				for (var i = 0; i < l_i.length; i++) {
					l_i.eq(i).find(".left label").remove();
					if (l_i.eq(i).attr("islabel") == 1) {
						ns_t = 1;
						if (l_i.eq(i).children(".right").children("span").length == 1) {
							s_l = l_i.eq(i).children(".left").children("i").text();
							s_t = l_i.eq(i).children(".right").children("span").text();
						} else if (l_i.eq(i).children(".right").children("input").length == 1) {
							s_l = l_i.eq(i).children(".left").children("i").text();
							s_t = l_i.eq(i).children(".right").children("input").val();
						} else if (l_i.eq(i).children(".right").hasClass("chenckbox")) {
							s_l = l_i.eq(i).children(".left").children("i").text();
							var _st = "";
							for (var j = 0; j < l_i.eq(i).children(".right").children("label").length; j++) {
								if (l_i.eq(i).children(".right").children("label").eq(j).children("input").prop("checked")) {
									_st += l_i.eq(i).children(".right").children("label").eq(j).children("span").text() + ",";
								}
							}
							s_t = _st.slice(0, -1);
						}
					};
				}
				if (ns_t == null && $("#section14 .problem ul li").first().find(".right span").text() != "请选择") {
					a_num++;
					$("#section14 .show ul li").eq(1).hide();
					$('<span>页签</span>').appendTo("#section14 .cy").addClass("span_bg").siblings().removeClass("span_bg");
					$("#section14 .show ul li").each(function() {
						if ($(this).children(".right").children("span").length == 1) {
							$("#section14 .show li:first").removeAttr("name");
							$(this).children(".right").children("span").text("请选择").css({
								"color": "#a0a0a5"
							});;
							$(this).children(".left").children("i").css({
								"color": "#191919"
							});
						} else if ($(this).children(".right").children("input").length == 1) {
							$(this).children(".right").children("input").val("");
							$(this).children(".left").children("i").css({
								"color": "#191919"
							});
						}
					});
					if (a_num > 1) {
						$("#section14 ._xq").children("#section14 .jian").show();
					}
				};
				if (s_t != "" && s_t != "请选择") {
					//判断li第一个元素的内容是否为span
					a_num++;
					$('<span>页签</span>').appendTo("#section14 .cy").addClass("span_bg").siblings().removeClass("span_bg");
					a_num++;
					if (a_num > 1) {
						$("#section14 ._xq").children("#section14 .jian").show();
					}
					$("#section14 .show ul li").each(function() {
						if ($(this).children(".right").children("span").length == 1) {
							$(this).children(".right").children("span").text("请选择").css({
								"color": "#a0a0a5"
							});;
							$(this).children(".left").children("i").css({
								"color": "#191919"
							});
						} else if ($(this).children(".right").children("input").length == 1) {
							$(this).children(".right").children("input").val("");
							$(this).children(".left").children("i").css({
								"color": "#191919"
							});
						}
					});
				};
			};


		});





		$(document).on("click", "#section14 .cy span", function() {
			a_Save();
			$(this).addClass("span_bg").siblings().removeClass("span_bg");
			if ($(this).attr("iscontrolshow") == "1") {
				$("#section14 li").eq(1).show();
			} else {
				$("#section14 li").eq(1).hide();
			}
			var _idx = $(this).index();
			$("#section14 .show ul li").each(function() {
				$(this).find(".left label").remove();
				var fn = $(this).attr("fieldname");
				console.log(fn)
				var a_jv;
				$(a_dd[_idx+1]).each(function() {
					for (key in $(this)[0]) {
						if (key == fn) {
							a_jv = $(this)[0][key]
						}
					}
				})
				if ($(this).children(".right").children("span").length == 1) {
					$("#section14 .show li:first").removeAttr("name");
					if (a_jv != null) {
						var _cd = $("#section14 .show li:first").attr("ct").split(",");
						var jv;
						var jp = a_jv;
						console.log(a_jv)
						var _this = $(this);
						var k= false;
						$(_cd).each(function(i) {
							if (_cd[i].substring(0, _cd[i].indexOf(":")) == jp) {
								k = true;
								$("#section14 .show li:first").attr("name", jp);
								a_jv = _cd[i].substring(_cd[i].indexOf(":") + 1);
								console.log(a_jv)
								_this.children(".right").children("span").text(a_jv).css({
									"color": "#191919"
								});
								_this.children(".left").children("i").css({
									"color": "#a0a0a5"
								});
							}
						})
						if(!k){
							_this.children(".right").children("span").text("请选择").css({
								"color": "#a0a0a5"
							});
							_this.children(".left").children("i").css({
								"color": "#191919"
							});
						}
						
					} else {
						$(this).children(".right").children("span").text("请选择").css({
							"color": "#a0a0a5"
						});
						$(this).children(".left").children("i").css({
							"color": "#191919"
						});
					}
				} else if ($(this).children(".right").children("input").length == 1) {
					if(a_jv!=null){
						console.log(a_jv)
						if($(this).children(".right").children("input").attr("name")!="input_date"){
							if(!isNaN(parseInt(a_jv))){
								$(this).children(".right").children("input").val(parseInt(a_jv));
							}else{
								$(this).children(".right").children("input").val(a_jv);
							}
						}else{
							$(this).children(".right").children("input").val(a_jv);
						}
						$(this).children(".left").children("i").css({"color":"#a0a0a5"});
					}else{
						$(this).children(".right").children("input").val("");
						$(this).children(".left").children("i").css({"color":"#191919"});
					}
				}
			});
			// $("#section14 .problem .cy span").each(function(){
			// 	if(a_dd[$(this).index()+1][0][0]!=null){
			// 		$(this).text(a_dd[$(this).index()+1][0][0])
			// 	}
			// });
		});
		$("#section14 .jian").on("click", function() {
			a_Save();
			$("#section14 .problem .cy span").each(function() {
				if (a_dd[$(this).index() + 1][0][0] != null) {
					$(this).text(a_dd[$(this).index() + 1][0][0])
				}
			});
			if (a_num > 0) {
				$("#section14 .cy span").each(function() {
					$("<img src='img/close_icon.png'/>").appendTo($(this));
				})
				$("#section14 .cy span img").click(function() {
					var _tp = $(this).parent();
					var _tidx = $(this).parent().index();
					$('<div id="mask"><div class="mask_bg"></div><div class="remove"><p class="s_c">您确认要删除吗？<img class="_ci" src="img/close_icon.png"/><p class="_qr">确认</p></div></div>').appendTo("body");
					$("._ci").click(function() {
						$("#section14 .cy span img").remove();
						$("#mask").remove();
					});
					$("._qr").click(function() {
						$("#section14 .cy span img").remove();
						$("#mask").remove();
						if (a_num == 1) {
							$("#section14 .jian,#section14 .cy,#section14 ul").hide();
							$("#section14 ._zsp").text("0");
						} else {
							_tp.remove();
							if (_tidx == 0) {
								$("#section14 .show .cy span").eq(0).addClass("span_bg").siblings().removeClass("span_bg");
							} else {
								$("#section14 .show .cy span").eq(_tidx - 1).addClass("span_bg").siblings().removeClass("span_bg");
							}
							delete a_dd[_tidx + 1];
							if (_tidx + 1 < a_num) {
								var _sol = 0;
								var _sos = {};
								for (var i in a_dd) {
									_sol++;
									_sos[_sol] = a_dd[i];
								}
								a_dd = _sos;
							}
							a_num--;
							$("#section14 .show ul li").each(function() {
								$(this).find(".left label").remove();
								if (_tidx == 0) {
									_tidx = 1
								}
								var fn = $(this).attr("fieldname");
								var a_jv;
								$(a_dd[_tidx]).each(function() {
									for (key in $(this)[0]) {
										if (key == fn) {
											a_jv = $(this)[0][key]
										}
									}
								})
								if ($(this).children(".right").children("span").length == 1) {
									$("#section14 .show li:first").removeAttr("name");
									if (a_jv != null) {
										var _cd = $("#section14 .show li:first").attr("ct").split(",");
										var jv;
										var jp = a_jv;
										$(_cd).each(function(i) {
											if (_cd[i].substring(0, _cd[i].indexOf(":")) == jp) {
												$("#section14 .show li:first").attr("name", jp);
												a_jv = _cd[i].substring(_cd[i].indexOf(":") + 1);
											}
										})
										$(this).children(".right").children("span").text(a_jv).css({
											"color": "#191919"
										});
										$(this).children(".left").children("i").css({
											"color": "#a0a0a5"
										});

									} else {
										$(this).children(".right").children("span").text("请选择").css({
											"color": "#a0a0a5"
										});
										$(this).children(".left").children("i").css({
											"color": "#191919"
										});
									}
								} else if ($(this).children(".right").children("input").length == 1) {
									if(a_jv!=null){
										if($(this).children(".right").children("input").attr("name")!="input_date"){
											if(!isNaN(parseInt(a_jv))){
												$(this).children(".right").children("input").val(parseInt(a_jv));
											}else{
												$(this).children(".right").children("input").val(a_jv);
											}
										}else{
											$(this).children(".right").children("input").val(a_jv);
										}
										$(this).children(".left").children("i").css({"color":"#a0a0a5"});
									}else{
										$(this).children(".right").children("input").val("");
										$(this).children(".left").children("i").css({"color":"#191919"});
									}
								}
							});
							a_Save();
							$("#section14 .cy span").each(function() {
								if ($(this).hasClass("span_bg")) {
									if ($(this).attr("iscontrolshow") == "1") {
										$("#section14 li").eq(1).show();
									} else {
										$("#section14 li").eq(1).hide();
									}
								}
							})
						}

					});
				})
			}
		});
		var total;
		if ($.isEmptyObject(a_dd)) {
			total = 0;
		};
		$("#section14 .amount").find("input").on("keyup", function() {
			a_Save();
		});
	},
	newAd: function(v, bossBorrowInfos) {
		var a_dd = {};
		var a_num = 1;
		if (v) {
			$("#section15 .cy").children().remove();
			a_num = 0;
			$(bossBorrowInfos).each(function(i) {
				a_num++;
				if ($(this)[0].lineNo == "1") {
					csh($("#section15 .show li"), $(this)[0]);
				}
				a_dd[i + 1] = [];
				if ($(this)[0]["relationship"] != null) {
					var _cd = $("#section15 .show li:first").attr("ct").split(",");
					var jv;
					var jp = $(this)[0]["relationship"];
					$(_cd).each(function(i) {
						if (_cd[i].substring(0, _cd[i].indexOf(":")) == jp) {
							$("#section15 .show li:first").attr("name", bossBorrowInfos[0]["relationship"]);
							jv = _cd[i].substring(_cd[i].indexOf(":") + 1);
						}
					})
					if (jv == undefined) {
						jv = "页签"
					}
					if (jv.length > 4) {
						if (jp == "{D36C49E1-308E-40C0-8AD6-676338A4913F}") {
							$("<span iscontrolshow='1'>" + jv.substr(0, 4) + "</span>").appendTo("#section15 .cy");
						} else {
							$("<span>" + jv.substr(0, 4) + "</span>").appendTo("#section15 .cy");
						}
					} else {
						if (jp == "{D36C49E1-308E-40C0-8AD6-676338A4913F}") {
							$("<span iscontrolshow='1'>" + jv + "</span>").appendTo("#section15 .cy");
						} else {
							$("<span>" + jv + "</span>").appendTo("#section15 .cy");
						};
					}

				} else {
					$("<span>页签</span>").appendTo("#section15 .cy");
				}
				for (key in $(this)[0]) {
					var _this = $(this);
					$("#section15 .show li").each(function() {
						if (key == $(this).attr("fieldname")) {
							var td = {};
							td[key] = _this[0][key];
							a_dd[i + 1].push(td);
						}
					})
				}
				$("#section15 .cy").children().first().addClass("span_bg");
			})
			if ($("#section15 .cy").children().length > 1) {
				$("#section15 .jian").show();
			}
			if ($("#section15 .cy span").eq(0).attr("iscontrolshow") == "1") {
				$("#section15 li").eq(1).show();
			} else {
				$("#section15 li").eq(1).hide();
			};
			var arre = ["{69E70A28-8629-4148-9B70-0C7075A90A93}", "{BB371C93-CB2C-4F0E-B215-509FCD654E9C}", "{BC8C881E-7ABC-47D4-B3AE-E51E9DCF3DA7}", "{D273B17C-EAA9-47BD-889B-BA4142E50B22}", "{FEB0D593-BC9E-431F-A218-83F03B85E392}"];
			for (key in a_dd) {
				$.each(a_dd[key], function(i, val) {
					for (k in val) {
						$.each(arre, function(j, jal) {
							if (jal == val[k]) {
								console.log(a_dd[key])
								var ayr = [];
								for (jey in a_dd[key]) {
									for (hey in a_dd[key][jey]) {
										if (hey == "relationship") {
											ayr.push(a_dd[key][jey]);
										}
										if (hey == "date") {
											ayr.push(a_dd[key][jey]);
										}
										if (hey == "amount") {
											ayr.push(a_dd[key][jey]);
										}
									}
								}
								a_dd[key] = ayr;
							}
						})
					}
				});
			}
			
			a_Save();
			console.log(a_dd)
		}

		function a_Save() {
			var i_dx;
			$("#section15 .cy span").each(function() {
				if ($(this).hasClass("span_bg")) {
					i_dx = $(this).index() + 1;
				}
			});
			a_dd[i_dx] = [];
			$("#section15 .show ul li").each(function() {
				if ($(this).is(":visible")) {
					var newtsj = {};
					if ($(this).children(".right").children("span").length == 1) {
						var a_v = $(this).attr("name");
						if (a_v == undefined) {
							a_v = null;
						}
						if (a_v == "请选择" || a_v == "取消") {
							a_v = null
						}
						newtsj[$(this).attr("fieldname")] = a_v;
					} else if ($(this).children(".right").children("input").length == 1) {
						var a_v = $(this).children(".right").children("input").val();
						if (a_v.trim() == "") {
							a_v = null;
						}
						newtsj[$(this).attr("fieldname")] = a_v;
					}
					a_dd[i_dx].push(newtsj);
				}
			});
			total = 0;
			for (var i in a_dd) {
				$(a_dd[i]).each(function() {
					if ($(this)[0].amount != undefined) {
						if ($(this)[0].amount != null) {
							total += parseInt($(this)[0].amount)
						}
					}
				})
			};
			$("#section15").attr("total", total);
			var s1 = parseInt($("#section14").attr("total"));
			var s2 = parseInt($("#section15").attr("total"));
			$("#section14 ._zsp").text(s1 + s2);
			if ($("#section14 .cy:visible").length == 0) {
				$("#section14 ._zsp").text(s2);
			} else if ($("#section15 .cy:visible").length == 0) {
				$("#section14 ._zsp").text(s1);
			} else if ($("#section14 .cy:visible").length == 0 && $("#section15 .cy:visible").length == 0) {
				$("#section14 ._zsp").text("0");
			}
			return a_dd;
		}
		this.b_Save = a_Save;
		$("#section15 .add").on("click", function() {
			console.log($("#section15 .cy:visible").length)
			if ($("#section15 .cy:visible").length == 0) {
				$("#section15 .cy,#section15 ul,#section15 .jian").show();
				a_Save();
			} else {
				a_Save();
				var s_t = "";
				var s_l = "";
				var ns_t = null;
				var l_i = $("#section15 .show ul li");
				for (var i = 0; i < l_i.length; i++) {
					l_i.eq(i).find(".left label").remove();
					if (l_i.eq(i).attr("islabel") == 1) {
						ns_t = 1;
						if (l_i.eq(i).children(".right").children("span").length == 1) {
							s_l = l_i.eq(i).children(".left").children("i").text();
							s_t = l_i.eq(i).children(".right").children("span").text();
						} else if (l_i.eq(i).children(".right").children("input").length == 1) {
							s_l = l_i.eq(i).children(".left").children("i").text();
							s_t = l_i.eq(i).children(".right").children("input").val();
						} else if (l_i.eq(i).children(".right").hasClass("chenckbox")) {
							s_l = l_i.eq(i).children(".left").children("i").text();
							var _st = "";
							for (var j = 0; j < l_i.eq(i).children(".right").children("label").length; j++) {
								if (l_i.eq(i).children(".right").children("label").eq(j).children("input").prop("checked")) {
									_st += l_i.eq(i).children(".right").children("label").eq(j).children("span").text() + ",";
								}
							}
							s_t = _st.slice(0, -1);
						}
					};
				}
				if (ns_t == null && $("#section15 .problem ul li").first().find(".right span").text() != "请选择") {
					a_num++;
					$("#section15 li").eq(1).hide();
					$('<span>页签</span>').appendTo("#section15 .cy").addClass("span_bg").siblings().removeClass("span_bg");
					$("#section15 .show ul li").each(function() {
						if ($(this).children(".right").children("span").length == 1) {
							$("#section15 .show li:first").removeAttr("name");
							$(this).children(".right").children("span").text("请选择").css({
								"color": "#a0a0a5"
							});;
							$(this).children(".left").children("i").css({
								"color": "#191919"
							});
						} else if ($(this).children(".right").children("input").length == 1) {
							$(this).children(".right").children("input").val("");
							$(this).children(".left").children("i").css({
								"color": "#191919"
							});
						}
					});
					if (a_num > 1) {
						$("#section15 ._xq").children("#section15 .jian").show();
					}
				};
				if (s_t != "" && s_t != "请选择") {
					//判断li第一个元素的内容是否为span
					a_num++;
					$('<span>页签</span>').appendTo("#section15 .cy").addClass("span_bg").siblings().removeClass("span_bg");
					a_num++;
					if (a_num > 1) {
						$("#section15 ._xq").children("#section15 .jian").show();
					}
					$("#section15 .show ul li").each(function() {
						if ($(this).children(".right").children("span").length == 1) {
							$(this).children(".right").children("span").text("请选择").css({
								"color": "#a0a0a5"
							});;
							$(this).children(".left").children("i").css({
								"color": "#191919"
							});
						} else if ($(this).children(".right").children("input").length == 1) {
							$(this).children(".right").children("input").val("");
							$(this).children(".left").children("i").css({
								"color": "#191919"
							});
						}
					});
				};
			}

		});





		$(document).on("click", "#section15 .cy span", function() {
			a_Save();
			$(this).addClass("span_bg").siblings().removeClass("span_bg");
			if ($(this).attr("iscontrolshow") == "1") {
				$("#section15 li").eq(1).show();
			} else {
				$("#section15 li").eq(1).hide();
			}
			var _idx = $(this).index();
			$("#section15 .show ul li").each(function() {
				$(this).find(".left label").remove();
				var fn = $(this).attr("fieldname");
				var a_jv;
				$(a_dd[_idx + 1]).each(function() {
					for (key in $(this)[0]) {
						if (key == fn) {
							a_jv = $(this)[0][key]
						}
					}
				})
				if ($(this).children(".right").children("span").length == 1) {
					$("#section15 .show li:first").removeAttr("name");
					if (a_jv != null) {
						var _cd = $("#section15 .show li:first").attr("ct").split(",");
						var jv;
						var jp = a_jv;
						$(_cd).each(function(i) {
							if (_cd[i].substring(0, _cd[i].indexOf(":")) == jp) {
								$("#section15 .show li:first").attr("name", jp);
								a_jv = _cd[i].substring(_cd[i].indexOf(":") + 1);
							}
						})
						$(this).children(".right").children("span").text(a_jv).css({
							"color": "#191919"
						});
						$(this).children(".left").children("i").css({
							"color": "#a0a0a5"
						});
					} else {
						$(this).children(".right").children("span").text("请选择").css({
							"color": "#a0a0a5"
						});
						$(this).children(".left").children("i").css({
							"color": "#191919"
						});
					}
				} else if ($(this).children(".right").children("input").length == 1) {
					if(a_jv!=null){
						if($(this).children(".right").children("input").attr("name")!="input_date"){
							if(!isNaN(parseInt(a_jv))){
								$(this).children(".right").children("input").val(parseInt(a_jv));
							}else{
								$(this).children(".right").children("input").val(a_jv);
							}
						}else{
							$(this).children(".right").children("input").val(a_jv);
						}
						$(this).children(".left").children("i").css({"color":"#a0a0a5"});
					}else{
						$(this).children(".right").children("input").val("");
						$(this).children(".left").children("i").css({"color":"#191919"});
					}
				}
			});
			// $("#section15 .problem .cy span").each(function(){
			// 	if(a_dd[$(this).index()+1][0][0]!=null){
			// 		$(this).text(a_dd[$(this).index()+1][0][0])
			// 	}
			// });
		});
		$("#section15 .jian").on("click", function() {
			a_Save();
			$("#section15 .problem .cy span").each(function() {
				if (a_dd[$(this).index() + 1][0][0] != null) {
					$(this).text(a_dd[$(this).index() + 1][0][0])
				}
			});
			if (a_num > 0) {
				$("#section15 .cy span").each(function() {
					$("<img src='img/close_icon.png'/>").appendTo($(this));
				})
				$("#section15 .cy span img").click(function() {
					var _tp = $(this).parent();
					var _tidx = $(this).parent().index();
					$('<div id="mask"><div class="mask_bg"></div><div class="remove"><p class="s_c">您确认要删除吗？<img class="_ci" src="img/close_icon.png"/><p class="_qr">确认</p></div></div>').appendTo("body");
					$("._ci").click(function() {
						$("#section15 .cy span img").remove();
						$("#mask").remove();
					});
					$("._qr").click(function() {
						$("#section15 .cy span img").remove();
						$("#mask").remove();
						if (a_num == 1) {
							a_Save();
							$("#section15 .cy,#section15 ul").hide();
							$("#section15 .jian").hide();
							a_Save();
						} else {
							_tp.remove();
							if (_tidx == 0) {
								$("#section15 .show .cy span").eq(0).addClass("span_bg").siblings().removeClass("span_bg");
							} else {
								$("#section15 .show .cy span").eq(_tidx - 1).addClass("span_bg").siblings().removeClass("span_bg");
							}
							delete a_dd[_tidx + 1];
							if (_tidx + 1 < a_num) {
								var _sol = 0;
								var _sos = {};
								for (var i in a_dd) {
									_sol++;
									_sos[_sol] = a_dd[i];
								}
								a_dd = _sos;
							}
							a_num--;
							// if (a_num == 1) {
							// 	$("#section15 .jian").hide();
							// }
							$("#section15 .show ul li").each(function() {
								$(this).find(".left label").remove();
								if (_tidx == 0) {
									_tidx = 1
								}
								var fn = $(this).attr("fieldname");
								var a_jv;
								$(a_dd[_tidx]).each(function() {
									for (key in $(this)[0]) {
										if (key == fn) {
											a_jv = $(this)[0][key]
										}
									}
								})
								if ($(this).children(".right").children("span").length == 1) {
									$("#section15 .show li:first").removeAttr("name");
									if (a_jv != null) {
										var _cd = $("#section15 .show li:first").attr("ct").split(",");
										var jv;
										var jp = a_jv;
										$(_cd).each(function(i) {
											if (_cd[i].substring(0, _cd[i].indexOf(":")) == jp) {
												$("#section15 .show li:first").attr("name", jp);
												a_jv = _cd[i].substring(_cd[i].indexOf(":") + 1);
											}
										})
										$(this).children(".right").children("span").text(a_jv).css({
											"color": "#191919"
										});
										$(this).children(".left").children("i").css({
											"color": "#a0a0a5"
										});

									} else {
										$(this).children(".right").children("span").text("请选择").css({
											"color": "#a0a0a5"
										});
										$(this).children(".left").children("i").css({
											"color": "#191919"
										});
									}
								} else if ($(this).children(".right").children("input").length == 1) {
									if(a_jv!=null){
										if($(this).children(".right").children("input").attr("name")!="input_date"){
											if(!isNaN(parseInt(a_jv))){
												$(this).children(".right").children("input").val(parseInt(a_jv));
											}else{
												$(this).children(".right").children("input").val(a_jv);
											}
										}else{
											$(this).children(".right").children("input").val(a_jv);
										}
										$(this).children(".left").children("i").css({"color":"#a0a0a5"});
									}else{
										$(this).children(".right").children("input").val("");
										$(this).children(".left").children("i").css({"color":"#191919"});
									}
								}
							});
							a_Save();
							$("#section15 .cy span").each(function() {
								if ($(this).hasClass("span_bg")) {
									if ($(this).attr("iscontrolshow") == "1") {
										$("#section15 li").eq(1).show();
									} else {
										$("#section15 li").eq(1).hide();
									}
								}
							})
						}

					});
				})
			}

		});
		var total;
		if ($.isEmptyObject(a_dd)) {
			total = 0;
		};
		$("#section15 .amount").find("input").on("keyup", function() {
			a_Save();
		});
		// if (a_num == 1) {

		// };
	}
}

function csh(li, _this) {
	$(li).each(function() {
		var _that = $(this);
		for (key in _this) {
			if ($(this).attr("fieldname") == key) {
				if (_this[key] != null) {
					if ($(this).children(".right").children("input").length == "1") {
						if ($(this).children(".right").children("input").attr("name") == "input_date") {
							$(this).children(".right").children("input").val(_this[key]);
						} else {
							if (!isNaN(parseInt(_this[key]))) {
								$(this).children(".right").children("input").val(parseInt(_this[key]));
							} else {
								$(this).children(".right").children("input").val(_this[key]);
							}
						}
						$(this).children(".left").children("i").css({
							"color": "#a09fa4"
						})
					} else if ($(this).children(".right").children("span").length == "1") {
						var _cd = $(this).attr("ct").split(",");
						$(_cd).each(function(i) {
							if (_cd[i].substring(0, _cd[i].indexOf(":")) == _this[key]) {
								_that.children(".right").children("span").text(_cd[i].substring(_cd[i].indexOf(":") + 1)).css({
									"color": "#191919"
								});
								_that.children(".left").children("i").css({
									"color": "#a09fa4"
								})
							}
						})

					}
				}
			}
		}

	})
}

$("#next").click(function() {
	submit(true)
})

function submit(tf) {
	// var sj = {
	// 	"bossIncomeAccountModel": {
	// 		"bossAcrossCheck": {},
	// 		"bossAcrossCheckPeriods": []
	// 	}
	// };
	if (sj != undefined) {
		sj["bossIncomeAccountModel"]["bossAcrossCheckPeriods"] = [];
		sj["bossIncomeAccountModel"]["bossBorrowInfos"] = [];
		sj["bossIncomeAccountModel"]["bossAcrossCheck"] = {};
	} else {
		sj = {
			"bossIncomeAccountModel": {
				"bossAcrossCheck": {},
				"bossAcrossCheckPeriods": [],
				"bossBorrowInfos": []
			}
		}
	}



	//					var bossReceivableAccountsA_dd=credit.a_Save();
	//					sj["balanceSheetModel"]["bossReceivableAccounts"]=tsj(bossReceivableAccountsA_dd);
	//					var bossReceivableAccountsVlue={};
	//					bossReceivableAccountsVlue["value"]=$("#section0 ._zsp").text();
	//					bossReceivableAccountsVlue["code"]=$("#section0 ._zsp").parents(".problem").attr("_code");
	//					sj["balanceSheetModel"]["balanceSheetAnswers"].push(bossReceivableAccountsVlue);

	// bossAcrossCheckPeriods; //加减

	// other.advance();
	var otArry = [];
	if ($("#section13 .cy:visible").length == 0) {

	} else {
		var otherA_dd = tsj(other.a_Save());
		$(otherA_dd).each(function() {
			$(this)[0]["type"] = "1";
		})
		otArry = otArry.concat(otherA_dd);
	}
	if ($("#section14 .cy:visible").length == 0) {

	} else {
		var jianA_dd = tsj(jian.a_Save());
		$(jianA_dd).each(function() {
			$(this)[0]["type"] = "2"
		})
		otArry = otArry.concat(jianA_dd);
	}
	var nd = tsj(jian.b_Save());
	console.log(nd)
	if ($("#section15 .cy:visible").length == 0) {
		sj["bossIncomeAccountModel"]["bossBorrowInfos"] = [];
	} else {
		sj["bossIncomeAccountModel"]["bossBorrowInfos"] = nd;
	}





	var status = "2";
	var otObj = {};
	$(".lr li").each(function() { //期间利润、还款本金
		if ($(this).find(".right span").length == 1) {
			otObj[$(this).attr("fieldname")] = $(this).find(".s_pan").text();
		}
		if ($(this).find(".right input").length == 1) {
			$(this).find(".left label").remove();
			otObj[$(this).attr("fieldname")] = $(this).find("input").val();
			if (otObj[$(this).attr("fieldname")].trim() == "") {
				otObj[$(this).attr("fieldname")] = null;
			}else{
				if(!fushu($(this).find("input").val())){
					$('<label class="message_info">10位正整数</label>').appendTo($(this).find(".left"));
					status="1";
				};
			};
			
		}
	});

	
	otObj[$("#section13 ._xq span:nth-of-type(1)").attr("fieldname")] = $("#section13 ._xq span:nth-of-type(2)").text(); //期间注资
	otObj[$(".a_dd .a_ft li:first").attr("fieldname")] = $(".a_dd .a_ft li:first").find("input").val(); //升值
	if (otObj[$(".a_dd .a_ft li:first").attr("fieldname")].trim() == "") {
		otObj[$(".a_dd .a_ft li:first").attr("fieldname")] = null;
	}else{
		$(".a_dd .a_ft li:first").find(".left label").remove();
		if(!fushu($(".a_dd .a_ft li:first").find("input").val())){
			$('<label class="message_info">10位正整数</label>').appendTo($(".a_dd .a_ft li:first").find(".left"));
			status="1";
		};
	}
	otObj[$("#section14 ._xq span:nth-of-type(1)").attr("fieldname")] = $("#section14 ._xq span:nth-of-type(2)").text(); //提取资金
	$(".j_ian .j_ft li").each(function() { //贬值
		if ($(this).find(".right span").length == 1) {
			otObj[$(this).attr("fieldname")] = $(this).find(".right span").text();
		}
		if ($(this).find(".right input").length == 1) {
			if ($(this).find(".right input").val().trim() == "") {
				otObj[$(this).attr("fieldname")] = null;
			} else {
				otObj[$(this).attr("fieldname")] = $(this).find(".right input").val();
				$(this).find(".left label").remove();
				if(!fushu($(this).find("input").val())){
					$('<label class="message_info">10位正整数</label>').appendTo($(this).find(".left"));
					status="1";
				};
			}
		}
	})
	$(".r_esult li").each(function() { //结果
		if ($(this).find(".right span").length == 1) {
			otObj[$(this).attr("fieldname")] = $(this).find(".right span").text();
		}
		if ($(this).find(".right input").length == 1) {
			if ($(this).find(".right input").val().trim() == "") {
				otObj[$(this).attr("fieldname")] = null;
			} else {
				otObj[$(this).attr("fieldname")] = $(this).find(".right input").val();
				if (otObj[$(this).attr("fieldname")] == "") {
					otObj[$(this).attr("fieldname")] = null;
				}
			}
		}
	})
	if ($(".r_eason textarea").val().trim() != "") {
		otObj[$(".r_eason li:first").attr("fieldname")] = $(".r_eason textarea").val();
	} else {
		otObj[$(".r_eason li:first").attr("fieldname")] = null;
	}
	sj["bossIncomeAccountModel"]["bossAcrossCheckPeriods"] = otArry;
	for (key in otObj) {
		if (otObj[key] == "NaN") {
			otObj[key] = "0";
		}
	};
	
	sj["bossIncomeAccountModel"]["bossAcrossCheck"] = otObj;
	console.log(otArry)

	if ($('#section13 .show:visible').length != 0) {
		$('#section13 .show li').find("label").remove();
		$('#section13 .cy span').removeClass("unfinish");
		$('#section13 .show li').each(function() {
			if ($(this).is(":visible")) {
				if ($(this).find('input').val() == "") {
					$(this).find(".left").append('<label class="message_info">请输入必填数据</label>');
					$('#section13 .cy span').each(function() {
						if ($(this).hasClass("span_bg")) {
							$(this).addClass("unfinish");
							status = "1";
						}
					})
				}else{
					if($(this).find('input').attr("type")=="number"){
						if(!fushu($(this).find('input').val())){
							if($(this).parent(".b_r").length!=0){
								$(this).parents(".problem").prev().find(".left label").remove();
								$('<label class="message_info">10位正整数</label>').appendTo($(this).parents(".problem").prev().find(".left"))
							}else{
								$(this).find(".left label").remove();
								$('<label class="message_info">10位正整数</label>').appendTo($(this).find(".left"))
							};
							$('#section13 .cy span').each(function(){
								if($(this).hasClass("span_bg")){
									$(this).addClass("unfinish");
									status="1";
								}
							})
						};									
					}
				};
				if ($(this).find('.right span').length == 1) {
					if ($(this).attr("name") == undefined) {
						status = "1";
						$(this).find(".left").append('<label class="message_info">请输入必填数据</label>');
					}
				}
			}
		});
		if ($("#section13 .show ul li:nth-of-type(3) input").val().trim() != "") {
			$("#section13 .show ul li:nth-of-type(3) input").parents("li").find(".left label").remove();

			function lit(date1) {
				var d = new Date();
				var year = d.getFullYear();
				var month = d.getMonth() + 1;
				if (month < 10) {
					month = "0" + month;
				}
				var day = d.getDate();
				if (day < 10) {
					day = "0" + day;
				}
				var str = year + "-" + month + "-" + day; //当前日期
				if (date1 == str) {
					return true;
				}
				var oDate1 = new Date(date1);
				var oDate2 = new Date(str);
				if (oDate1.getTime() > oDate2.getTime()) {
					return false;
				} else {
					return true;
				}
			}
			var k = lit($("#section13 .show ul li:nth-of-type(3) input").val());
			if (!k) {
				status = "1";
				$('#section13 .cy span').each(function() {
					if ($(this).hasClass("span_bg")) {
						$(this).addClass("unfinish");
					}
				})
				$("#section13 .show ul li:nth-of-type(3) input").parents("li").children(".left").append('<label class="message_info">小于等于当前时间</label>');
			}
		}

		$(sj["bossIncomeAccountModel"]["bossAcrossCheckPeriods"]).each(function() {
			if ($(this)[0].type == "1") {
				for (key in $(this)[0]) {
					if ($(this)[0][key] == null) {
						$('#section13 .cy span').eq($(this)[0].lineNo - 1).addClass("unfinish");
						status = "1";
					}
				}
			}
		});
		$(sj["bossIncomeAccountModel"]["bossAcrossCheckPeriods"]).each(function() {
			if ($(this)[0].type == "1") {
				for (key in $(this)[0]) {
					if ($(this)[0][key] == null) {
						$('#section13 .cy span').eq($(this)[0].lineNo - 1).addClass("unfinish");
						status = "1";
					};
					var ki = $(this)[0];
					if (ki.type == "1") {
						if (key == "date") {
							function lot(date1) {
								var d = new Date();
								var year = d.getFullYear();
								var month = d.getMonth() + 1;
								if (month < 10) {
									month = "0" + month;
								}
								var day = d.getDate();
								if (day < 10) {
									day = "0" + day;
								}
								var str = year + "-" + month + "-" + day; //当前日期
								if (date1 == str) {
									return true;
								}
								var oDate1 = new Date(date1);
								var oDate2 = new Date(str);
								if (oDate1.getTime() > oDate2.getTime()) {
									return false;
								} else {
									return true;
								}
							}
							var k = lot(ki["date"]);
							if (!k) {
								status = "1";
								$('#section13 .cy span').eq(ki.lineNo - 1).addClass("unfinish");
							}
						}
						if(key=="amount"){
							if(!fushu(ki["amount"])){
								status="1";
								$('#section13 .cy span').eq(ki.lineNo-1).addClass("unfinish");
							};
						};
					}
				}
			};
			
		});
	}
	if ($('#section14 .show:visible').length != 0) {
		$('#section14 .show li').find("label").remove();
		$('#section14 .cy span').removeClass("unfinish");
		$('#section14 .show li').each(function() {
			if ($(this).is(":visible")) {
				if ($(this).find('input').val() == "") {
					$(this).find(".left").append('<label class="message_info">请输入必填数据</label>');
					$('#section14 .cy span').each(function() {
						if ($(this).hasClass("span_bg")) {
							$(this).addClass("unfinish");
							status = "1";
						}
					})
				}else{
					if($(this).find('input').attr("type")=="number"){
						if(!fushu($(this).find('input').val())){
							if($(this).parent(".b_r").length!=0){
								$(this).parents(".problem").prev().find(".left label").remove();
								$('<label class="message_info">10位正整数</label>').appendTo($(this).parents(".problem").prev().find(".left"))
							}else{
								$(this).find(".left label").remove();
								$('<label class="message_info">10位正整数</label>').appendTo($(this).find(".left"))
							};
							$('#section14 .cy span').each(function(){
								if($(this).hasClass("span_bg")){
									$(this).addClass("unfinish");
									status="1";
								}
							})
						};									
					}
				};
				if ($(this).find('.right span').length == 1) {
					if ($(this).attr("name") == undefined) {
						status = "1";
						$(this).find(".left").append('<label class="message_info">请输入必填数据</label>');
					}
				}
			}
		});
		if ($("#section14 .show ul li:nth-of-type(3) input").val().trim() != "") {
			$("#section14 .show ul li:nth-of-type(3) input").parents("li").find(".left label").remove();

			function lit1(date1) {
				var d = new Date();
				var year = d.getFullYear();
				var month = d.getMonth() + 1;
				if (month < 10) {
					month = "0" + month;
				}
				var day = d.getDate();
				if (day < 10) {
					day = "0" + day;
				}
				var str = year + "-" + month + "-" + day; //当前日期
				if (date1 == str) {
					return true;
				}
				var oDate1 = new Date(date1);
				var oDate2 = new Date(str);
				if (oDate1.getTime() > oDate2.getTime()) {
					return false;
				} else {
					return true;
				}
			}
			var k = lit1($("#section14 .show ul li:nth-of-type(3) input").val());
			if (!k) {
				status = "1";
				$('#section14 .cy span').each(function() {
					if ($(this).hasClass("span_bg")) {
						$(this).addClass("unfinish");
					}
				})
				$("#section14 .show ul li:nth-of-type(3) input").parents("li").children(".left").append('<label class="message_info">小于等于当前时间</label>');
			}
		}

		$(sj["bossIncomeAccountModel"]["bossAcrossCheckPeriods"]).each(function() {
			if ($(this)[0].type == "2") {
				for (key in $(this)[0]) {
					if ($(this)[0][key] == null) {
						$('#section14 .cy span').eq($(this)[0].lineNo - 1).addClass("unfinish");
						status = "1";
					}
				}
			}
		});
		$(sj["bossIncomeAccountModel"]["bossAcrossCheckPeriods"]).each(function() {
			if ($(this)[0].type == "2") {
				for (key in $(this)[0]) {
					if ($(this)[0][key] == null) {
						$('#section14 .cy span').eq($(this)[0].lineNo - 1).addClass("unfinish");
						status = "1";
					};
					var ki = $(this)[0];
					if (ki.type == "2") {
						if (key == "date") {
							function lot1(date1) {
								var d = new Date();
								var year = d.getFullYear();
								var month = d.getMonth() + 1;
								if (month < 10) {
									month = "0" + month;
								}
								var day = d.getDate();
								if (day < 10) {
									day = "0" + day;
								}
								var str = year + "-" + month + "-" + day; //当前日期
								if (date1 == str) {
									return true;
								}
								var oDate1 = new Date(date1);
								var oDate2 = new Date(str);
								if (oDate1.getTime() > oDate2.getTime()) {
									return false;
								} else {
									return true;
								}
							}
							var k = lot1(ki["date"]);
							if (!k) {
								status = "1";
								$('#section14 .cy span').eq(ki.lineNo - 1).addClass("unfinish");
							}
						}
						if(key=="amount"){
							if(!fushu(ki["amount"])){
								status="1";
								$('#section14 .cy span').eq(ki.lineNo-1).addClass("unfinish");
							};
						};
					}
				}
			};

		});
	}
	if ($('#section15 .show:visible').length != 0) {
		$('#section15 .show li').find("label").remove();
		$('#section15 .cy span').removeClass("unfinish");
		$('#section15 .show li').each(function() {
			if ($(this).is(":visible")) {
				if ($(this).find('input').val() == "") {
					$(this).find(".left").append('<label class="message_info">请输入必填数据</label>');
					$('#section15 .cy span').each(function() {
						if ($(this).hasClass("span_bg")) {
							$(this).addClass("unfinish");
							status = "1";
						}
					})
				}else{
					if($(this).find('input').attr("type")=="number"){
						if(!fushu($(this).find('input').val())){
							if($(this).parent(".b_r").length!=0){
								$(this).parents(".problem").prev().find(".left label").remove();
								$('<label class="message_info">10位正整数</label>').appendTo($(this).parents(".problem").prev().find(".left"))
							}else{
								$(this).find(".left label").remove();
								$('<label class="message_info">10位正整数</label>').appendTo($(this).find(".left"))
							};
							$('#section15 .cy span').each(function(){
								if($(this).hasClass("span_bg")){
									$(this).addClass("unfinish");
									status="1";
								}
							})
						};									
					}
				};
				if ($(this).find('.right span').length == 1) {
					if ($(this).attr("name") == undefined) {
						status = "1";
						$(this).find(".left").append('<label class="message_info">请输入必填数据</label>');
					}
				}
			}
		});
		if ($("#section15 .show ul li:nth-of-type(3) input").val().trim() != "") {
			$("#section15 .show ul li:nth-of-type(3) input").parents("li").find(".left label").remove();

			function lit2(date1) {
				var d = new Date();
				var year = d.getFullYear();
				var month = d.getMonth() + 1;
				if (month < 10) {
					month = "0" + month;
				}
				var day = d.getDate();
				if (day < 10) {
					day = "0" + day;
				}
				var str = year + "-" + month + "-" + day; //当前日期
				if (date1 == str) {
					return true;
				}
				var oDate1 = new Date(date1);
				var oDate2 = new Date(str);
				if (oDate1.getTime() > oDate2.getTime()) {
					return false;
				} else {
					return true;
				}
			}
			var k = lit2($("#section15 .show ul li:nth-of-type(3) input").val());
			if (!k) {
				status = "1";
				$('#section15 .cy span').each(function() {
					if ($(this).hasClass("span_bg")) {
						$(this).addClass("unfinish");
					}
				})
				$("#section15 .show ul li:nth-of-type(3) input").parents("li").children(".left").append('<label class="message_info">小于等于当前时间</label>');
			}
		}
		$(sj["bossIncomeAccountModel"]["bossBorrowInfos"]).each(function() {
			for (key in $(this)[0]) {
				if ($(this)[0][key] == null) {
					$('#section15 .cy span').eq($(this)[0].lineNo - 1).addClass("unfinish");
					status = "1";
				}
			}
		});
		$(sj["bossIncomeAccountModel"]["bossBorrowInfos"]).each(function() {
			for (key in $(this)[0]) {
				if ($(this)[0][key] == null) {
					$('#section15 .cy span').eq($(this)[0].lineNo - 1).addClass("unfinish");
					status = "1";
				};
				var ki = $(this)[0];
				if (key == "date") {
					function lot2(date1) {
						var d = new Date();
						var year = d.getFullYear();
						var month = d.getMonth() + 1;
						if (month < 10) {
							month = "0" + month;
						}
						var day = d.getDate();
						if (day < 10) {
							day = "0" + day;
						}
						var str = year + "-" + month + "-" + day; //当前日期
						if (date1 == str) {
							return true;
						}
						var oDate1 = new Date(date1);
						var oDate2 = new Date(str);
						if (oDate1.getTime() > oDate2.getTime()) {
							return false;
						} else {
							return true;
						}
					}
					var k = lot2(ki["date"]);
					if (!k) {
						status = "1";
						$('#section15 .cy span').eq(ki.lineNo - 1).addClass("unfinish");
					}
				}
				if(key=="amount"){
					if(!fushu(ki["amount"])){
						status="1";
						$('#section15 .cy span').eq(ki.lineNo-1).addClass("unfinish");
					};
				};
			}
		});
	}

	sj["completeStatus"] = status;
	for(var t=0;t<otherTimeArr.length;t++){//把不在初始权益范围内的期间注资和期间提取合并
		sj["bossIncomeAccountModel"]["bossAcrossCheckPeriods"].push(otherTimeArr[t]);
	}
	
	console.log(sj)
	var _sj = JSON.stringify(sj);
	if (tf == undefined) {
		var tf = false;
	}
	if (tf) {
		if (status == "2") {
			AndroidJs.saveWjDetalAnswer(_sj, true);
		} else {
			AndroidJs.saveWjDetalAnswer(_sj, false);
		}

	} else {
		AndroidJs.saveWjDetalAnswer(_sj, false);
	}
}
$(document).on("keyup", "input[type='number']", function() {
//	if ($(this).val().indexOf(".") > 0) {
//		var sval = $(this).val().substr(0, $(this).val().indexOf(".")) + $(this).val().substring($(this).val().indexOf(".") + 1);
//		$(this).val(sval.trim());
//	}
	if ($(this).val().length >= 10) {
		$(this).val($(this).val().substr(0, 10));
	}
})

function tsj(a_dd) {
	var tsj = [];
	for (i in a_dd) {
		var _tsj = {};
		$(a_dd[i]).each(function() {
			for (key in $(this)[0]) {
				_tsj[key] = $(this)[0][key];
			};

		});
		_tsj["lineNo"] = i;
		tsj.push(_tsj);
	}
	return tsj;
}
//loadBossCrossExaminationQy(a)
$("#section13 .show ul li:nth-of-type(3) input,#section14 .show ul li:nth-of-type(3) input,#section15 .show ul li:nth-of-type(3) input").on("blur", function() {
	$(this).parents("li").find(".left label").remove();

	function lct(date1) {
		var d = new Date();
		var year = d.getFullYear();
		var month = d.getMonth() + 1;
		if (month < 10) {
			month = "0" + month;
		}
		var day = d.getDate();
		if (day < 10) {
			day = "0" + day;
		}
		var str = year + "-" + month + "-" + day; //当前日期
		if (date1 == str) {
			return true;
		}
		var oDate1 = new Date(date1);
		var oDate2 = new Date(str);
		if (oDate1.getTime() > oDate2.getTime()) {
			return false;
		} else {
			return true;
		}
	}
	var k = lct($(this).val());
	if (!k) {
		$(this).parents("li").children(".left").append('<label class="message_info">小于等于当前时间</label>');
	}
})



function loadBossCrossExaminationQy(sjson) {
	var AndroidAnswer = sjson[1];
	sjson = sjson[0];
	mask1_lists=sjson.sysDicMap.bossOtherFundSourceDict;
	mask2_lists=sjson.sysDicMap.bossLargeExpenseDict;
	
	var section_13_val='';//ct的参数值
	for(var w=0;w<mask1_lists.length;w++){
		section_13_val+=mask1_lists[w].key+":"+mask1_lists[w].value+',';
	}
	$('.section13 li[fieldName="category"]').attr('ct',section_13_val);
	
	var section_14_val='';//ct的参数值
	for(var z=0;z<mask2_lists.length;z++){
		section_14_val+=mask2_lists[z].key+":"+mask2_lists[z].value+',';
	}
	$('.section14 li[fieldName="category"]').attr('ct',section_14_val);
	
	
	sjson["answer"]=AndroidAnswer;
	console.log(sjson)
	function jsonForm(data){
		var r=data.answer;
		var answerJson={};//答案json字符串转换
		for(var key in r){
			answerJson[key]=$.parseJSON(r[key]);
		}
		data.answer = answerJson;
//		console.log(data)
		return data;
	}
	var json=jsonForm(sjson);
	
	sj = json.answer;
	load = true;
	var bossAcrossCheckPeriods = [];
	var initialDate=json.answer.bossIncomeAccountModel.bossAcrossInitialEquity.initialEquityDate;//初始权益时间
	$('#demo12').attr('data-lcalendar',initialDate+',2116-05-29');
	$('#demo11').attr('data-lcalendar',initialDate+',2116-05-29');
	var periadsArr=json.answer.bossIncomeAccountModel.bossAcrossCheckPeriods;//期间注资和期间提取
	if(periadsArr==null){
		periadsArr=[];
	}
	for(var k=0;k<periadsArr.length;k++){
		if(periadsArr[k].date>=initialDate){
			bossAcrossCheckPeriods.push(periadsArr[k]);
		}else{
			otherTimeArr.push(periadsArr[k]);
		}
	}
//	var bossAcrossCheckPeriods = json.answer.bossIncomeAccountModel.bossAcrossCheckPeriods;
	
	console.log(bossAcrossCheckPeriods);
	console.log(otherTimeArr);
	var _jia = [];
	var _jian = [];
	var calendar = new lCalendar();
	calendar.init({
		'trigger': '#demo11',
		'type': 'date'
	});
	var calendar = new lCalendar();
	calendar.init({
		'trigger': '#demo12',
		'type': 'date'
	});
	var calendar = new lCalendar();
	calendar.init({
		'trigger': '#demo13',
		'type': 'date'
	});
	$(bossAcrossCheckPeriods).each(function() {
		if ($(this)[0].type == "1") {
			_jia.push($(this)[0])
		}
		if ($(this)[0].type == "2") {
			_jian.push($(this)[0])
		}
	})
	
	if (_jia != null) {
		if (_jia.length != 0) {
			var v = true;
			console.log(_jia)
			other.advance(v, _jia)
		} else {
			other.advance();
			$("#section13 .cy,#section13 ul,#section13 .jian").hide();
		};
	} else {
		other.advance();
		$("#section13 .cy,#section13 ul,#section13 .jian").hide();
	};


	if (_jian != null) {
		if (_jian.length != 0) {
			var v = true;
			jian.advance(v, _jian)
		} else {
			jian.advance();
			$("#section14 .cy,#section14 ul,#section14 .jian").hide();
		};
	} else {
		jian.advance();
		$("#section14 .cy,#section14 ul,#section14 .jian").hide();
	};

	var bossBorrowInfos = json.answer.bossIncomeAccountModel.bossBorrowInfos;
	
	if (bossBorrowInfos != null) {
		if (bossBorrowInfos.length != 0) {
			var v = true;
			jian.newAd(v, bossBorrowInfos)
		} else {
			jian.newAd();
			$("#section15 .cy,#section15 ul,#section15 .jian").hide();
		};
	} else {
		jian.newAd();
		$("#section15 .cy,#section15 ul,#section15 .jian").hide();
	};
	console.log(bossBorrowInfos)

	var bossAcrossCheck = json.answer.bossIncomeAccountModel.bossAcrossCheck;
	console.log(bossAcrossCheck);
	$("section li").each(function() {
		for (key in bossAcrossCheck) {
			if (key == $(this).attr("fieldname")) {
				if (bossAcrossCheck[key] != null) {
					if (!isNaN(parseInt(bossAcrossCheck[key]))) {
						$(this).find(".right input").val(parseInt(bossAcrossCheck[key])).parent(".right").siblings(".left").children("i").css({
							"color": "#a09fa4"
						});
					} else {
						$(this).find(".right input").val(bossAcrossCheck[key]).parent(".right").siblings(".left").children("i").css({
							"color": "#a09fa4"
						});
					}

					$(this).find(".right span").text(bossAcrossCheck[key]).css({
						"color": "#191919"
					}).parent(".right").siblings(".left").children("i").css({
						"color": "#a09fa4"
					});
					$(this).find("textarea").val(bossAcrossCheck[key]).siblings("span").hide();
				}
			}
		}


	})
	//保留整数位
function zs_toDecimal(x) {
	var f = parseFloat(x);
	if (isNaN(f)) {
		return;
	}
	//          f = Math.round(x*100)/100; /*改变保留小数点后几位（100=2,1000=3）*/
	f = Math.round(x, 0);
	return f;
}
	console.log(json)
	var periodProfit = computeRuble.periodProfit(json); //期间利润
	if (typeof periodProfit == "number") {
		if (!isNaN(periodProfit)) {
			$(".lr li:first").find(".right span").text(periodProfit)
		} else {
			$(".lr li:first").find(".right span").text("0")
		}
	}
	var depreciation = computeRuble.depreciation(json); //折旧
	if (typeof depreciation == "number") {
		if (!isNaN(depreciation)) {
			$(".j_ian .j_ft li:first").find(".right span").text(depreciation)
		} else {
			$(".j_ian .j_ft li:first").find(".right span").text("0")
		}
	}
	var dueEquity = computeRuble.dueEquity(json); //所有权益
	if (typeof dueEquity == "number") {
		if (!isNaN(dueEquity)) {
			$(".r_esult li:first").find(".right span").text(zs_toDecimal(dueEquity))
		} else {
			$(".r_esult li:first").find(".right span").text("0")
		}

	}
	var actualEquity = computeRuble.actualEquity(json); //实际权益
	if (typeof actualEquity == "number") {
		if (!isNaN(actualEquity)) {
			$(".r_esult li:nth-of-type(2)").find(".right span").text(zs_toDecimal(actualEquity))
		} else {
			$(".r_esult li:nth-of-type(2)").find(".right span").text("0")
		}

	}
	var difference = computeRuble.difference(json); //差别权益
	if (typeof difference == "number") {
		if (!isNaN(difference)) {
			$(".r_esult li:nth-of-type(3)").find(".right span").text(zs_toDecimal(difference))
		} else {
			$(".r_esult li:nth-of-type(3)").find(".right span").text("0")
		}

	}
	var percent = computeRuble.percent(json); //%
	if (typeof percent == "number") {
		if (!isNaN(percent)) {
			$(".r_esult li:nth-of-type(4)").find(".right span").text(percent)
		} else {
			$(".r_esult li:nth-of-type(4)").find(".right span").text("0")
		}

	}
}
$(document).on("blur","input[type='number']",function(){
	$(this).parents("li").find("label").remove();
	if($(this).val()!=""){
		if(!fushu($(this).val())){
			a = false;
			if($(this).parent(".b_r").length!=0){
				$(this).parents(".problem").prev().find(".left label").remove();
				$('<label class="message_info">10位正整数</label>').appendTo($(this).parents(".problem").prev().find(".left"))
			}else{
				$(this).find(".left label").remove();
				$('<label class="message_info">10位正整数</label>').appendTo($(this).parents("li").find(".left"))
			}
		};
	}
});
function fushu(val){
	var telReg = /^(\d{0,10})$/;
	if(val!=""){
		if(telReg.test(val)){
			return true;
		}else{
			return false;
		}
	}
	
}
// if (!load) {
// 	other.advance();
// 	jian.advance();
// 	jian.newAd();
// }