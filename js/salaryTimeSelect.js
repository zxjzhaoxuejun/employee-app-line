/*
 *DateDiffNoMonth 日期区间判断
 *StringToDate 将字符串转换成日期
 *sDate1, sDate2输入的两个日期
 * 
 * */
function DateDiffNoMonth(sDate1, sDate2,_th) {
	var months=0; //
	var normalMonth=0;
	var sDate1 = $('#demo_date1').val(); //开始日期
	var sDate2 = $('#demo_date2').val(); //结束日期
	var nowTime = new Date();
	console.log(nowTime);
	//日期格式为yyyy-mm 
	var oDate1 = StringToDate(sDate1);
	var oDate2 = StringToDate(sDate2);
	console.log(oDate1);
	console.log(oDate2);
//	alert(new Date(oDate2))
	/*alert('取整-->'+parseInt((oDate2 - oDate1) / 1000 / 60 / 60 /24));
	alert('非取整-->'+(oDate2 - oDate1) / 1000 / 60 / 60 /24);*/
	if (parseInt((oDate2 - oDate1) / 1000 / 60 / 60 / 24 / 29.5) < (oDate2 - oDate1) / 1000 / 60 / 60 / 24 / 29.5) { //开始日期小于结束日期
		months = parseInt((oDate2 - oDate1) / 1000 / 60 / 60 / 24 / 29.5) + 1;
		console.log(oDate2 - oDate1);
	} else {
		months = parseInt((oDate2 - oDate1) / 1000 / 60 / 60 / 24 / 29.5);
		console.log(oDate2 - oDate1);
		//					console.log(months);
	}
	if (parseInt((nowTime - oDate2) / 1000 / 60 / 60 / 24 / 29.5) < (nowTime - oDate2) / 1000 / 60 / 60 / 24 / 29.5) { //结束日期与当前日期比较
		normalMonth = parseInt((nowTime - oDate2) / 1000 / 60 / 60 / 24 / 29.5);
		console.log(normalMonth);
	} else {
		normalMonth = parseInt((nowTime - oDate2) / 1000 / 60 / 60 / 24 / 29.5) - 1;
		console.log(normalMonth);
	}
	if (normalMonth >= 0) { //判断是否大于当前月份
		if (months >= 4 && months <= 6) {
			var dateArr=[];//时间戳
			var datelayout=[];//时间格式
			for(var i=0;i<months;i++){
				dateArr.push(oDate2-2592000000*i);
			}
//			datelayout.push(new Date(dateArr[i]).toLocaleDateString());
            for(var j=0;j<dateArr.length;j++){
            	var d=new Date(dateArr[j]);
				var M=d.getMonth()+1;//月
				var Y=d.getFullYear();//年
				var D=d.getDate();//日
				if(D==31||D==30){
					if(M==12&&D==31){
						d=(Y+1)+'-'+'1';
					}else{
					d=Y+'-'+(M+1);
					}
					
				}else{
					d=Y+'-'+M;
				}
            	console.log(new Date(dateArr[j]).toLocaleDateString())
            	//d=d.substring(0,(d.length-2));//截取年月
            	//d=d.replace('/','-');//替换日期格式
            	console.log(d)
            	//d=d.replace('1/','2');
            	//if(d=="2016-1/"){
            		//d="2016-2";
            	//}
            	//console.log(d.length);
            	datelayout.push(d);
            }
			console.log(dateArr);
			console.log(datelayout);
			return datelayout;//返回时间格式数组
//			return months;
		} else if (months <= 0) {
			$('.salaryMonthError').remove();
			_th.append('<i class="salaryMonthError">结束月份减开始月份要大于等于4个月小于等于6个月</i>');
			_th.children().find('input').select();
//			alert('结束月份要大于开始月份');
		} else if (months > 0 && months < 4) {
			$('.salaryMonthError').remove();
			_th.append('<i class="salaryMonthError">结束月份减开始月份要大于等于4个月小于等于6个月</i>');
			_th.children().find('input').select();
//			alert('结束月份减开始月份要大于等于4个月');
		} else if (months > 6) {
			$('.salaryMonthError').remove();
			_th.append('<i class="salaryMonthError">结束月份减开始月份要大于等于4个月小于等于6个月</i>');
			_th.children().find('input').select();
//			alert('结束月份减开始月份要小于等于6个月');
		}
	} else {
		$('.salaryMonthError').remove();
		_th.append('<i class="salaryMonthError">结束月份不能大于当前月份</i>');
		_th.children().find('input').select();
//		alert('结束月份要小于等于当前月份');
	}
	/*将字符串转换成日期*/
	function StringToDate(sDate) {
		var arys = sDate.split('-');
		console.log(arys)
		var newDate = new Date(arys[0], parseInt(arys[1], 10) - 1);
		return newDate;
	}
}