/*
 * formatMoneyTxet(s)
 * 功能：金额按个、十、百、千位提示
 * 参数：s，需要格式化的金额数值. 
 * 返回：返回格式化后的提示单位.
 * 
 */
function MoneyPromptText() {
	$(document).on('focus change keyup', 'input[type="number"]', function() {
		var e = $(this);
		var inputVal = e.val();
		var Mob = '手机号';
		var Ratio = '占比';
		var Bank = '银行账户';
		var familyTel = '固话';
		var dwTel = '电话';
		var interest = '利率';
		var backNum = '返点';
		var variableCb = '可变成本';
		var yearLimit='年限';
		var sendMoney='发薪日';
		var billDay='一般账期';
		var repaymentDay='还款日';
		var indexOfVal = e.parent().siblings().children('i').text();
		console.log(indexOfVal);
		if (indexOfVal.indexOf(repaymentDay) >= 0 ||indexOfVal.indexOf(billDay) >= 0 ||indexOfVal.indexOf(yearLimit) >= 0 ||indexOfVal.indexOf(sendMoney) >= 0 ||indexOfVal.indexOf(variableCb) >= 0 ||indexOfVal.indexOf(backNum) >= 0 ||indexOfVal.indexOf(interest) >= 0 ||indexOfVal.indexOf(Mob) >= 0 || indexOfVal.indexOf(Bank) >= 0 || indexOfVal.indexOf(familyTel) >= 0 || indexOfVal.indexOf(dwTel) >= 0) { //处理是手机号、固定电话、银行卡、百分比
			return false;
		}
		if(indexOfVal.indexOf(Ratio) >= 0&&indexOfVal.length<30){
			return false;
		}
		if (inputVal != '' && inputVal != 0 && inputVal != null) {
			if (!e.next().hasClass('money-show-text')) {
				e.after('<em class="money-show-text"></em>');
			}
			if(e.parents(".right").children("input").length==2&&indexOfVal=="其他"){
				$('.money-show-text').css({"top":"1.3rem"});
			}
			if(e.hasClass('wl')){
				if(e.index()==1){
					$('.money-show-text').css({"left":"30%","top":"0.8rem"});
				}if(e.index()==2){
					$('.money-show-text').css({"left":"50%","top":"0.8rem"});
				}if(e.index()==3){
					$('.money-show-text').css({"left":"70%","top":"0.8rem"});
				}
				console.log(e.index())
			}
			if(e.parent().parent().children("span").length==5){
				$('.money-show-text').css({"top":"0.5rem"});
			}
			$('.money-show-text').text(formatMoneyTxet(inputVal));
		} else {
			console.log(inputVal)
//			e.val(null);
			$('.money-show-text').remove();
		}
		e.blur(function() {
			$('.money-show-text').remove();
		})
	})
	$(document).on('focus','input[type="number"]', function() {
		var e = $(this);
		var inputVal = e.val();
		if (inputVal==0){
				e.val(null);
			}
	})
	$(document).on('blur', 'input[type="number"]', function() {
		var e = $(this);
		var familyTel = '固话';
		var Mob = '手机号';
		var dwTel = '电话';
		var indexOfVal = e.parent().siblings().children('i').text();
		if (indexOfVal.indexOf(Mob) >= 0||indexOfVal.indexOf(familyTel) >= 0 || indexOfVal.indexOf(dwTel) >= 0) { //处理是手机号、固定电话
			return false;
		}
		var inputVal = $(this).val();
		console.log(inputVal);
		if ($(this).parent().siblings().children('span').text() == '*') {
			if (inputVal == '' || inputVal == null||inputVal == 0) {
				$(this).val(0).css('color', '#A0A0A0');
			} else {
				$(this).css('color', '#191919');
			}
		} else {
			if (inputVal == '' || inputVal == null) {
				$(this).val(inputVal).css('color', '#A0A0A0');
			}else if(inputVal == 0){
				$(this).val(0).css('color', '#A0A0A0');
			}
			else {
				$(this).css('color', '#191919');
			}
		}

	})

	function formatMoneyTxet(s) {
		var b = Math.round(s, 0).toString(); //取整数位
		var TextLen = b.length; //整数位长度
		switch (TextLen) {
			case 1:
				return '(个)';
				break;
			case 2:
				return "(十)";
				break;
			case 3:
				return "(百)";
				break;
			case 4:
				return "(千)";
				break;
			case 5:
				return "(万)";
				break;
			case 6:
				return "(十万)";
				break;
			case 7:
				return "(百万)";
				break;
			case 8:
				return "(千万)";
				break;
			case 9:
				return "(亿)";
				break;
			case 10:
				return "(十亿)";
				break;
			default:
				return '';
		}
	}
}

MoneyPromptText();

//输入后浏览器自动上移
function scrollFunction() {
	$(document).on('focus', 'input', function() {
		var _that = $(this);
		if(_that.parents(".right").children("label").length==2&&_that.attr("type")=="radio"){
			_that.prop("checked",true);
			_that.attr("checked","checked");
			_that.parent("label").find("i").show();
			_that.parent("label").siblings("label").find("i").hide();
			_that.parent("label").siblings("label").find("input").prop("checked",false);
			_that.parent("label").siblings("label").find("input").attr("checked",false);
		}
		_that.click();
		$(window).scrollTop($(this).offset().top - 100);
	});
}
scrollFunction();
$(document).on("#mask","touchmove",function(){
	return false;
});
