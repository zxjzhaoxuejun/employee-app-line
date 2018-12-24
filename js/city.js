//  ========== 
//  = 省市区三级联动 = 
//  =====2016-06-26===== 

var ch_id;//点击的id

var provinces,citys,areas;

function adree(id){
	provinces = eval('('+AndroidJs.getProvinces()+')');
	var html='';
	html+='<div class="adr-mask"><div class="adr-mask-bg"></div><div class="adr-mask-con"><div class="adr-contorl-btn">选择地区<span>取消</span></div><div class="aderr-nav"><span>请选择</span></div></div></div>'
	$(html).appendTo('body');
//			console.log(data);
            var province='<div class="province"><ul class="city01"></ul></div>';
            $(province).appendTo('.adr-mask-con');
	            for(var i=0;i<provinces.length;i++){//循环出所有省
	//          console.log(a[i].name)
	            $('<li guid="'+provinces[i].guid+'" onclick="getCityBuy('+i+')">'+provinces[i].name+'</li>').appendTo('.city01');
	        }

	$('.adr-contorl-btn span').click(function(){
		$('.adr-mask').remove();
	})
	return ch_id=id;
}
	     //市级
  function getCityBuy(i){
               citys =  eval('('+AndroidJs.getCitys(i)+')');
//				console.log(data);
				$('.province').hide();
	            var city='<div class="s-city"><ul class="city02"></ul></div>';
	            $(city).appendTo('.adr-mask-con');

//	            for(var j=0;j<a.length;j++){
//		            if(a[j].code==vCode){
		            	$('.aderr-nav span').eq(0).text(provinces[i].name).css({'color':'#191919','border':'none'});
		            	$('<span>请选择</span>').appendTo('.aderr-nav');
		            	for(var j=0;j<citys.length;j++){
		            		$('<li onclick="getAreaBuy('+i+','+j+')">'+citys[j].name+'</li>').appendTo('.city02');
		            	}
//		            }
//	            }



    $('.aderr-nav span').eq(0).click(function(){
	    $('.aderr-nav span').css({'color':'#191919','border':'none'});
	    $(this).css({'color':'#f40137','border-bottom':'0.06rem #F40137 solid'});
		$('.s-city').remove();
		$('.province').show();
		$('.area').remove();
		$('.aderr-nav span').eq(1).remove();
    });
}


//区级
function getAreaBuy(i,j){
//	alert(val)
  areas =  eval('('+AndroidJs.getAreas(j)+')');
//				console.log(data);
				$('.province').hide();
				$('.s-city').hide();
	            var area='<div class="area"><ul class="city03"></ul></div>';
	            $(area).appendTo('.adr-mask-con');

//	            for(var j=0;j<a.length;j++){

//		            if(a[j].code==num){
//		            	for(var k=0;k<a[j].children.length;k++){
//		            		if(a[j].children[k].code==val){
		            			$('.aderr-nav span').eq(1).text(citys[j].name).css({'color':'#191919','border':'none'});
		            	        $('<span>请选择</span>').appendTo('.aderr-nav');
		            			for(var k=0;k<areas.length;k++){
//		            				console.log(c[j].children[k].children[f].code)
		            			$("<li id="+areas[k].name+" onclick='getallArea("+i+","+j+","+k+")'>"+areas[k].name+"</li>").appendTo('.city03');
		            			}
//		            		}
//		            	}
//	                }
//	            }



	$('.aderr-nav span').eq(0).click(function(){
	$('.s-city').remove();
	$('.province').show();
	$('.area').remove();
});
$('.aderr-nav span').eq(1).click(function(){
	$('.aderr-nav span').css({'color':'#191919','border':'none'});
	$(this).css({'color':'#f40137','border-bottom':'0.06rem #F40137 solid'});
	$('.s-city').show();
	$('.province').hide();
	$('.area').remove();
	$('.aderr-nav span').eq(2).remove();
});
}

//选择的省市区值
function getallArea(i,j,k){
$('.adr-mask').remove();
//var pro;
//var cityN;
//var f_guid;

//				for(var i=0; i<a.length;i++){
//					if(a[i].code==val){
//						pro=a[i].name;//获取省名
//						for(var j=0;j<a[i].children.length;j++){
//							if(a[i].children[j].code==vall){
//							 cityN=a[i].children[j].name;//获取市名
//							  for(var k=0;k<a[i].children[j].children.length;k++){
//							 	  if(a[i].children[j].children[k].name==valll){
//							 	  	 f_guid=a[i].children[j].children[k].guid;
//							 	  }
//							   }
//							}
//						}
//					}
//				}
//				var fVal=pro+cityN+valll;
				var fVal=provinces[i].name+citys[j].name+areas[k].name;
				var f_guid=provinces[i].guid+'@'+citys[j].guid+'@'+areas[k].guid;
	            $('#'+ch_id).children('span').text(fVal).css('color','#191919');
	            $('#'+ch_id).parent().find('.left').children('i').css('color','#a0a0a5');
	            $('#'+ch_id).children('span').attr('guid',f_guid);



}


