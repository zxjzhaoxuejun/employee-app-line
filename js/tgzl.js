function xqProvideDataModel(data) {//页面生成方法
	var b =data;
	var a=b.answer;//
	for(var i=0;i<b.modelDetailSubList.length;i++){
	console.log(b.modelDetailSubList[i])
	questionList(b.modelDetailSubList[i],a);
	}
};
function questionList(b,a){
	if(a.provideDataModel.provide!=null){
	  $("<section id='"+a.provideDataModel.provide.id+"' serialNo='"+a.serialNo+"'></section>").appendTo($("body"));
	}else{
	  $("<section id="null" serialNo='"+a.serialNo+"'></section>").appendTo("body");
	}
    $('<footer id="next" onclick="submit();"><p>确定</p></footer>').insertAfter('section');
	var q=b.questionDetailList;
	for(var i=0; i<q.length;i++){
	$('<div class="tg-list"><div class="tg-title"><p>'+q[i].name+'</p></div><div class="tg-con"><ul class="tg-nav" id="'+q[i].fieldName+'"></ul></div></div>').appendTo('section');
 // console.log(b.questionDetailList.length);
	    var check_code=q[i].codeDicList;
	    for(var k=0;k<check_code.length;k++){
			if(check_code[k].name.length>6){
			$('<li data="'+check_code[k].code+'" class="big">'+check_code[k].name+'</li>').appendTo('#'+q[i].fieldName);
			}else{
		    $('<li data="'+check_code[k].code+'">'+check_code[k].name+'</li>').appendTo('#'+q[i].fieldName);
			}
		}
		
    }
	
	//获取答案
	if(a.provideDataModel.provide!=null){
		var asW=a.provideDataModel.provide;
		for(var i=0;i<$('ul.tg-nav').length;i++){
			for(var key in asW){
					var numH=asW[key].split(',');    
	                  for(var k=0;k<numH.length;k++){
	                  	$('ul.tg-nav').children('li').eq(parseInt(numH[k])-1).addClass('check_color');
	                  }
//	                }
//				}
			}	
		}
	}

//选择
$('.tg-nav li').click(function(){
	if($(this).hasClass('check_color'))
	{
	$(this).removeClass('check_color')
	}else{
	$(this).addClass('check_color')
	}
})		
}
function submit(){
	var tg={};
//	console.log(jm)
	for(var i=0;i<$('ul.tg-nav').length;i++){
		var js;
		var jm;
		var hh='';
		jm=$('ul.tg-nav').eq(i).attr('id');
			for(var j=0;j<$('ul.tg-nav').eq(i).children('.check_color').length;j++){
			 js=$('ul.tg-nav').eq(i).children('.check_color').eq(j).attr('data');
//				    console.log(js);
		     if(j>0){
		     	hh+=','+js;
		     }else{
		     	hh+=js;
		     }
			}
			tg[jm]=hh;
//			console.log(hh);
//			console.log(jm);
		} 
tg["id"]=$('section').attr('id');
tg["serialNo"]=$('section').attr('serialNo');
var _tg={
	"serialNo": "",
	"provideDataModel": {
			"provide":{}
		}
	}
_tg.provideDataModel.provide=tg;
_tg.serialNo=$('section').attr('serialNo');
var _tgzl=JSON.stringify(_tg);
// TODO 保存以提供资料
AndroidJs.saveWjDetalAnswer(_tgzl);
console.log(_tgzl)	
}


