/**
 * html实体编码 转义字符串,防止js注入
 * @param string
 */
function escapeHtml(string)
{
	var _htmlSecretEntityMap =  {
			"&":"&amp;",
			"<":"&lt;",
			">":"&gt;",
			'"':'&quot;',
			"'":"&#39;",
			"/":"&#x2F;"
	};
	return String(string).replace(/[&<>"'\/]/g,function(s){
			return _htmlSecretEntityMap[s];
	});
};

/**
 * 身份证验证
 * @param value
 * @param showTips
 * @returns {Boolean}
 */
function isCardNo(value, showTips) 
{
	if (value == "") 
	{
		if (showTips) 
		{
			alert("身份证输入不合法");
		}
		return false;
	} 
	var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
	if (reg.test(value) === false) 
	{
		if (showTips) 
		{
			alert("身份证输入不合法");
		}
		return false;
	} 
	return true;
};

/**
 * 手机验证
 * @param value
 * @param showTips
 * @returns {Boolean}
 */
function isTel(value, showTips) 
{
	if (value == "") 
	{
		if (showTips) 
		{
			alert("手机号输入不合法");
		}
		return false;
	} 
	var telReg = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
	if (telReg.test(value) === false && value != "") 
	{
		if (showTips) 
		{
			alert("手机号输入不合法");
		}
		return false;
	} 
	return true;
};

/**
 * 文本长度验证
 * @param value
 * @param maxLen
 * @param showTips
 * @returns {Boolean}
 */
function isLengthInLimit(value, maxLen, showTips) 
{
	if (value == "") 
	{
		return true;
	} 
	var _len = value.replace(/[^\x00-\xff]/g, "AA").length;
	if (_len > parseInt(maxLen)) 
	{
		if (showTips) 
		{
			alert("不能超过" + num + "个字符长度（或" + num / 2 + "个汉字）");
		}
		return false;
	}
	return true;
};