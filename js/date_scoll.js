function date_scoll(num1,num2,nowStarYear) {
	        var currYear=(new Date()).getFullYear();
	        var startTimeVal;
	        if(nowStarYear=="1"){
	        	startTimeVal=currYear;
	        }else{
	        	startTimeVal=currYear-100;
	        }
//	        var currYear=(new Date()).getFullYear();
			var opt={
			//初始化日期控件
		    preset: 'date', //日期
		    lang:'zh',
		    theme: 'android-ics light', //皮肤样式，黑色android-holo 白色皮肤android-ics light
		    display: 'bottom', //显示方式 
		    mode: 'scroller', //日期选择模式
		    dateFormat: 'yyyy-mm', // 日期格式
			//wheels:[3],
			onBeforeShow: function (inst) { inst.settings.wheels[0].length>2?inst.settings.wheels[0].pop():null; },//不要日
		    setText: '确认', //确认按钮名称
		    cancelText: '取消',//取消按钮名籍我
		    clearText: '清除',
		    dateOrder: 'yymm', //面板中日期排列格式
		    dayText: '日', monthText: '月', yearText: '年', //面板中年月日文字
			showOnFocus: false,
			height: num1,//高度
		    minWidth:num2,//宽度
		    rows: 3,//显示行数
		    startYear:startTimeVal,//开始年份
			endYear:currYear+100, //结束年份
//			resetText: '重置',
			//showNow: false,
			//onBeforeShow:'mobiscroll_beforeShow',//
			//onDestroy:mobiscroll_destroy,
			//onShow:'mobiscroll_show',
			//swipeDirection:'vertical',//垂直和水平vertical,horizontal
		     //nowText: "今天",
			headerText:'请选择日期'//头部标题设置、false
			}
			
			// Date demo initialization
			$('.dw-persp').css('height','4rem');
			$('#demo_date1').mobiscroll().date(opt);
			$('#demo_date2').mobiscroll().date(opt);
		
//			$(document).on("click","#demo_date2",function(){
//				$('body').append('<div class="clear-text">清除</div>');
//				$(document).on("click",".clear-text",cancel_qx);
//			})
			
        }
//			