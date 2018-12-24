//工作贷款、贷款信息、信贷员建议等模板的推入执行
var modeType={
	mode1:function(data){//工作单位】贷款用途、信贷员建议模块		
//		var _jsele=$('<script src="js/gz_dk.js"></script>');
//		$("body").append(_jsele);
		xqCompanyInfoModel(data);
	},
	mode2:function(data){//信贷员报告信息
//		var _jsele=$('<script src="js/dk.js"></script>');
//		$("body").append(_jsele);
		xqCreditReportInfoModel(data);
	},
	mode3:function(data){//个人基本信息
//		var _jsele=$('<script src="js/base.js"></script>');
//		$("body").append(_jsele);
		xqBaseInfoModel(data);
	},
	mode4:function(data){//车产房产
//		var _jsele=$('<script src="js/zhucar.js"></script>');
//		$("body").append(_jsele);
		showcarData.showCar(data);
	},
	mode5:function(data){//已提供资料
//		var _jsele=$('<script src="js/tgzl.js"></script>');
//		$("body").append(_jsele);
		xqProvideDataModel(data);
	},
	mode6:function(data){//收入分析表
//		var _jsele=$('<script src="js/income.js"></script>');
//		$("body").append(_jsele);
		xqIncome(data);
	},
}

//模板样式判断
function testModeType(jsonData) {	
	var ModeType=jsonData.modelOjbName;
	if(ModeType=="companyInfoModel"||ModeType=="loanPurposeModel"||ModeType=="adviseModel"){//工作单位、信贷员建议、贷款用途模块
		modeType.mode1(jsonData);
	}else if(ModeType=="creditReportInfoModel"){
		modeType.mode2(jsonData);
	}else if(ModeType=="baseInfoModel"){//个人基本信息模块
		modeType.mode3(jsonData);
	}else if(ModeType=="assetInfoModel"||ModeType=="contactInfoModel"){
		modeType.mode4(jsonData);
	}else if(ModeType=="provideDataModel"){//已提供资料模块
		modeType.mode5(jsonData);
	}else if(ModeType=="salaryInfoModel"){//收入分析表模块
		modeType.mode6(jsonData);
	}	
}