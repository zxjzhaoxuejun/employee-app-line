/**
 * 其他特殊校验
 */
$.fn.OtherChecker = {};
$.fn.OtherChecker.identitycard = {
	city: [null, null, null, null, null, null, null, null, null, null, //00-09
	             null, "北京", "天津 ", "河北", "山西", "内蒙古", null, null, null, null, //10-19 
	             null, "辽宁", "吉林", "黑龙江", null, null, null, null, null, null, //20-29
	             null, "上海", "江苏", "浙江", "安微", "福建", "江西", "山东", null, null, //30-39
	             null, "河南", "湖北", "湖南", "广东", "广西", "海南", null, null, null, //40-49
	             "重庆", "四川", "贵州", "云南", "西藏", null, null, null, null, null, //50-59
	             null, "陕西", "甘肃", "青海", "宁夏", "新疆", null, null, null, null, null, //60-69
	             "台湾", null, null, null, null, null, null, null, null, null, //70-79
	             "香港", "澳门", null, null, null, null, null, null, null, null, //80-89
	             "国外"], //90
	
	wiMap : [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2], //加权因子
	checkCodeArr : ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"], //校验码
	get18From15 : function(idNumber)
	{
		var newNumber = idNumber.substring(0, 6).concat("19").concat(idNumber.substring(6));
		var lastCode = this.getLastCode(newNumber);
		return newNumber.concat(lastCode);
	},
	
	get15From18 : function(idCardNum)
	{
		//去掉19
		idCardNum = idCardNum.substring(0, 6) + idCardNum.substring(8);
		//去掉最后一位校验位
		return idCardNum.substring(0, idCardNum.length -1);
	},
	
	/**
	 * 校验15位身份证
	 */
	check15 : function(idNumber)
	{
		var idNum18 = this.get18From15(idNumber);
		return this.check18(idNum18);
	},
	

	/**
	 * 是否合法年月日
	 */
	isValidBirthDate : function(year, month, day)
	{
		if (!$.isNumeric(year) || !$.isNumeric(month) || !$.isNumeric(day))
		{   
			return false;
		}
		var result = false;
		try
		{
			var dateStr = year.concat("-").concat(month).concat("-").concat(day);
			var resultDateStr = "";
			var myDate = new Date(dateStr);
			//转换正常才有值
//			var myDataTure='';
            if(dateStr=="1970-01-01"){
            	result = true;
            	return result;
            }
			if (myDate.valueOf())
			{
				
				var _fullYear = myDate.getFullYear();
				resultDateStr = resultDateStr.concat(_fullYear).concat("-");
				var _month = myDate.getMonth() + 1;
				if (_month < 10)
				{
					resultDateStr = resultDateStr.concat("0");
				}
				resultDateStr = resultDateStr.concat(_month).concat("-");
				var _day = myDate.getDate();
				if (_day < 10 )
				{
					resultDateStr = resultDateStr.concat("0");
				}
				resultDateStr = resultDateStr.concat(_day);
			}
			if (dateStr === resultDateStr)
			{
				result = true;
			}
		}
		catch(e){}
		
		return result;
	},
	
	
	/**
	 * 校验18位身份证
	 */
	check18 : function(idNumber)
	{
		if (!/^\d{17}(\d|X|x)$/.test(idNumber))
		{
			return false;
		}
		idNumber = idNumber.replace("x","X");
		var checkCode = idNumber.substring(17);
		var cityIndex = parseInt(idNumber.substring(0, 2));
		//省市
		if (this.city[cityIndex] == null)
		{
			return false;
		}
		console.log('城市g');
		var isBirthDateValid = this.isValidBirthDate(idNumber.substring(6, 10), idNumber.substring(10, 12), idNumber.substring(12, 14));
		if (!isBirthDateValid)
		{
			return false;
		}
		//加权积
		var iSum = 0;
		for (var index = 0; index < 17; index++)
		{    
			iSum += this.wiMap[index] * parseInt(idNumber[index], 10);
		}
		
		if (checkCode != this.checkCodeArr[iSum % 11])
		{
			return false;
		}
		return true;
	},
	
	/**
	 * 校验
	 * @param idNumber 身份证号
	 */
	check : function(idNumber)
	{
		if (!idNumber)
		{
			return false;
		}
		if (idNumber.length == 15)
		{
			return this.check15(idNumber);
		}
		else if (idNumber.length == 18)
		{
			return this.check18(idNumber);
		}
		else
		{
			return false;
		}
	},
	
	/**
	 * 获取校验位(最后一位)
	 */
	getLastCode : function(idCardNum)
	{
		if (idCardNum.length != 17)
		{
			return "";
		}
		var sum = 0;
		for (var index = 0; index < idCardNum.length; index++)
		{
			var tmpNum = 0;
			try
			{
				tmpNum = parseInt(idCardNum.charAt(index));
			}
			catch(e)
			{
				tmpNum = 0; 
			}
			sum += tmpNum * this.wiMap[index];
		}
		var type = parseInt(sum % 11);
		
		return this.checkCodeArr[type];
	},
	
	/**
	 * 获取出生日期
	 */
	getBirthDate : function(idCardNum)
	{
		if (this.check(idCardNum))
		{
			if (idCardNum.length == 18)
			{
				var birth = idCardNum.substring(6, 10) + "-" + idCardNum.substring(10, 12) + "-" + idCardNum.substring(12, 14) + " 00:00:00";
				return birth;
			}
			else if (idCardNum.length == 15)
			{
				var birth = idCardNum.substring(6, 8) + "-" + idCardNum.substring(8, 10) + "-" + idCardNum.substring(10, 12) + " 00:00:00";
				return birth;
			}
			return null;
		}
		else
		{
			return null;
		}
	},
	
	/**
	 * 获取性别
	 */
	getSex : function(idCardNum)
	{
		if (this.check(idCardNum))
		{
			if (idCardNum.length == 18)
			{
				var sexNum = parseInt(idCardNum.substring(16, 17));
				return sexNum % 2;
			}
			else if (idCardNum.length == 15)
			{
				var sexNum = parseInt(idCardNum.substring(14, 15));
				return sexNum % 2;
			}
			return -1;
		}
		else
		{
			return -1;
		}
	}
};
$.fn.OtherChecker.dategreateqtoday = {//大于等于当前时间
	verson:"0.1",
	check:function(date1){
		var d = new Date();
		var year = d.getFullYear();
		var month = d.getMonth()+1;
		if(month<10){
			month = "0"+month;
		}
		var day = d.getDate();
		if(day<10){
			day = "0"+day;
		}
   	 	var str = year+"-"+month+"-"+day;//当前日期
   	 	if(date1==str){
   	 		return true
   	 	}else{
   	 		var oDate1 = new Date(date1);
	        var oDate2 = new Date(str);
	        if(oDate1.getTime() > oDate2.getTime()){
	            return true;                    
	        } else {
	        	return false;
	        }
   	 	}
	}
};
$.fn.OtherChecker.datelighteqtoday = {//小于等于当前时间
	verson:"0.1",
	check:function(date1){
		var d = new Date();
		var year = d.getFullYear();
		var month = d.getMonth()+1;
		if(month<10){
			month = "0"+month;
		}
		var day = d.getDate();
		if(day<10){
			day = "0"+day;
		}
   	 	var str = year+"-"+month+"-"+day;//当前日期
   	 	if(date1==str){
   	 		return true;
   	 	}else{
   	 		var oDate1 = new Date(date1);
	        var oDate2 = new Date(str);
	        if(oDate1.getTime() > oDate2.getTime()){
	            return false;                    
	        } else {
	        	return true;
	        }
   	 	}
	}
};
$.fn.OtherChecker.datebt = {//不用校验
	verson:"0.1",
	check:function(date1){
		var _str = date1.split(",");
		for(var i=0;i<_str.length;i++){
			if(_str[i]==""){
				return false;
			}
		}
		for(var i=0;i<_str.length;i++){
			if(i==1){
				if(_str[0]<_str[i]){
					return true;
				}else{
					return false;
				}
			}
		}
	}
};
$.fn.OtherChecker.datebtabftd = {//第一个<当前时间,第二个不校验
	verson:"0.1",
	check:function(date1){
		var _str = date1.split(",");
		for(var i=0;i<_str.length;i++){
			if(_str[i]==""){
				return false;
			};
		};
		var _result = true;
		for(var i=0;i<_str.length;i++){
			if(_result){
				if(i==0){
					var d = new Date();
					var year = d.getFullYear();
					var month = d.getMonth()+1;
					if(month<10){
						month = "0"+month;
					}
					var day = d.getDate();
					if(day<10){
						day = "0"+day;
					}
			   	 	var str = year+"-"+month+"-"+day;//当前日期
			   	 	if(_str[i]==str){
			   	 	 	_result = false;
			   	 	}else{
			   	 		var oDate1 = new Date(_str[i]);
				        var oDate2 = new Date(str);
						if(oDate1.getTime() > oDate2.getTime()){
				        	_result = false;             
				       };
				       if(_str[0]<_str[i]){
							
						}else{
							_result = false;
						}
			   	 	}
				};
			}
		};
		if(_result){
			return true;
		}else{
			return false;
		}
	}
}
$.fn.OtherChecker.datebtbbftd = {//第一个<当前时间,第二个<当前时间
	verson:"0.1",
	check:function(date1){
		var _str = date1.split(",");
		for(var i=0;i<_str.length;i++){
			if(_str[i]==""){
				return false;
			};
		};
		var _result = true;
		for(var i=0;i<_str.length;i++){
			if(_result){
				if(i==0){
					var d = new Date();
					var year = d.getFullYear();
					var month = d.getMonth()+1;
					if(month<10){
						month = "0"+month;
					}
					var day = d.getDate();
					if(day<10){
						day = "0"+day;
					}
			   	 	var str = year+"-"+month+"-"+day;//当前日期
			   	 	if(_str[i]==str){
			   	 	 	_result = false;
			   	 	}else{
			   	 		var oDate1 = new Date(_str[i]);
				        var oDate2 = new Date(str);
						if(oDate1.getTime() > oDate2.getTime()){
				        	_result = false;            
				        }
			   	 	}
				   	 	
				};
			}
			if(_result){
				if(i==1){
					var d = new Date();
					var year = d.getFullYear();
					var month = d.getMonth()+1;
					if(month<10){
						month = "0"+month;
					}
					var day = d.getDate();
					if(day<10){
						day = "0"+day;
					}
			   	 	var str = year+"-"+month+"-"+day;//当前日期
			   	 	if(_str[i]==str){
			   	 	 	_result = false;
			   	 	}else{
			   	 		var oDate1 = new Date(_str[i]);
				        var oDate2 = new Date(str);
						if(oDate1.getTime() > oDate2.getTime()){
				        	_result = false;                  
				        }
						if(_str[0]<_str[i]){
							
						}else{
							_result = false;
						}
			   	 	}
				};
			}
		};
		if(_result){
			return true;
		}else{
			return false;
		}
	}
};
$.fn.OtherChecker.datebtbaaftd = {//第一个>当前时间,第二个>当前时间
	verson:"0.1",
	check:function(date1){
		var _str = date1.split(",");
		for(var i=0;i<_str.length;i++){
			if(_str[i]==""){
				return false;
			};
		};
		var _result = true;
		for(var i=0;i<_str.length;i++){
			if(_result){
				if(i==0){
					var d = new Date();
					var year = d.getFullYear();
					var month = d.getMonth()+1;
					if(month<10){
						month = "0"+month;
					}
					var day = d.getDate();
					if(day<10){
						day = "0"+day;
					}
			   	 	var str = year+"-"+month+"-"+day;//当前日期
			   	 	if(_str[i]==str){
			   	 	 	_result = false;
			   	 	}else{
			   	 		var oDate1 = new Date(_str[i]);
				        var oDate2 = new Date(str);
						if(oDate1.getTime() < oDate2.getTime()){
				        	_result = false;                    
				        }
			   	 	}
				};
			}
			if(_result){
				if(i==1){
					var d = new Date();
					var year = d.getFullYear();
					var month = d.getMonth()+1;
					if(month<10){
						month = "0"+month;
					}
					var day = d.getDate();
					if(day<10){
						day = "0"+day;
					}
			   	 	var str = year+"-"+month+"-"+day;//当前日期
			   	 	if(_str[i]==str){
			   	 	 	_result = false;
			   	 	}else{
			   	 		var oDate1 = new Date(_str[i]);
				        var oDate2 = new Date(str);
						if(oDate1.getTime() < oDate2.getTime()){
				        	_result = false;                    
				        }
						if(_str[0]<_str[i]){
							
						}else{
							_result = false;
						}
			   	 	}
				};
			}
		};
		if(_result){
			return true;
		}else{
			return false;
		}
	}
}
$.fn.OtherChecker.datebtbbaftd = {//第一个不校验,第二个>当前时间
	verson:"0.1",
	check:function(date1){
		var _str = date1.split(",");
		for(var i=0;i<_str.length;i++){
			if(_str[i]==""){
				return false;
			};
		};
		var _result = true;
		for(var i=0;i<_str.length;i++){
			if(_result){
				if(i==1){
					var d = new Date();
					var year = d.getFullYear();
					var month = d.getMonth()+1;
					if(month<10){
						month = "0"+month;
					}
					var day = d.getDate();
					if(day<10){
						day = "0"+day;
					}
			   	 	var str = year+"-"+month+"-"+day;//当前日期
			   	 	if(_str[i]==str){
			   	 	 	_result = false;
			   	 	}else{
			   	 		var oDate1 = new Date(_str[i]);
				        var oDate2 = new Date(str);
						if(oDate1.getTime() < oDate2.getTime()){
				        	_result = false;                    
				        }
						if(_str[0]<_str[i]){
							
						}else{
							_result = false;
						}
			   	 	}
				};
			}
		};
	}
};
//
$.fn.OtherChecker.datebeforetoday={//小于当前时间 
	verson:"0.1",
	check:function(date1){
		var d = new Date();
		var year = d.getFullYear();
		var month = d.getMonth()+1;
		if(month<10){
			month = "0"+month;
		}
		var day = d.getDate();
		if(day<10){
			day = "0"+day;
		}
   	 	var str = year+"-"+month+"-"+day;//当前日期
   	 	if(date1==str){
   	 		return false;
   	 	}
        var oDate1 = new Date(date1);
        var oDate2 = new Date(str);
        if(oDate1.getTime() > oDate2.getTime()){
            return false;                    
        } else {
        	return true;
        }
	}	
};
$.fn.OtherChecker.dateaftertoday={//大于当前时间
	verson:"0.1",
	check:function(date1){
		var d = new Date();
		var year = d.getFullYear();
		var month = d.getMonth()+1;
		if(month<10){
			month = "0"+month;
		}
		var day = d.getDate();
		if(day<10){
			day = "0"+day;
		}
   	 	var str = year+"-"+month+"-"+day;//当前日期
   	 	if(date1==str){
   	 		return false;
   	 	}
        var oDate1 = new Date(date1);
        var oDate2 = new Date(str);
        if(oDate1.getTime() > oDate2.getTime()){
            return true;                    
        } else {
        	return false;
        }
	}	
};
$.fn.OtherChecker.datebtbbftdeq={//两个日期都小于等于当前日期
	verson:"0.1",
	check:function(date1){
		var _str = date1.split(",");
		for(var i=0;i<_str.length;i++){
			if(_str[i]==""){
				return false;
			};
		};
		var _result = true;
		for(var i=0;i<_str.length;i++){
			if(_result){
				if(i==0){
					var d = new Date();
					var year = d.getFullYear();
					var month = d.getMonth()+1;
					if(month<10){
						month = "0"+month;
					}
					var day = d.getDate();
					if(day<10){
						day = "0"+day;
					}
			   	 	var str = year+"-"+month+"-"+day;//当前日期
			   	 	if(_str[i]==str){
			   	 	 	
			   	 	}else{
			   	 		var oDate1 = new Date(_str[i]);
				        var oDate2 = new Date(str);
						if(oDate1.getTime() > oDate2.getTime()){
				        	_result = false;           
				        }
			   	 	}
				   	 	
				};
			}
			if(_result){
				if(i==1){
					var d = new Date();
					var year = d.getFullYear();
					var month = d.getMonth()+1;
					if(month<10){
						month = "0"+month;
					}
					var day = d.getDate();
					if(day<10){
						day = "0"+day;
					}
			   	 	var str = year+"-"+month+"-"+day;//当前日期
			   	 	if(_str[i]==str){
			   	 	 	
			   	 	}else{
			   	 	 	var oDate1 = new Date(_str[i]);
				        var oDate2 = new Date(str);
						if(oDate1.getTime() > oDate2.getTime()){
				        	_result = false;                   
				        }
						if(_str[0]<_str[i]){
						
						}else{
							_result = false;
						}
			   	 	}
				};
			}
				
		};
		if(_result){
			return true;
		}else{
			return false;
		}
	}	
};
$.fn.OtherChecker.dateabeforeb={//第一个日期小于第二个日期
	verson:"0.1",
	check:function(date1){
		var _str = date1.split(",");
		for(var i=0;i<_str.length;i++){
			if(_str[i]==""){
				return false;
			};
		};
		var _result = true;
		for(var i=0;i<_str.length;i++){
			if(_result){
				if(i==1){
					if(_str[0]<_str[i]){
					
					}else{
						_result = false;
					}
				};
			}
				
		};
		if(_result){
			return true;
		}else{
			return false;
		}
	}	
};