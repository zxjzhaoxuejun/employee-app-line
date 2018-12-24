//答案json字符串转换
function jsonForm(answerText){
    var answerJson={};//答案json字符串转换
	var r=answerText;//AndroidJs.getWjDetailAnswer();
		for(var key in r){
		answerJson[key]=$.parseJSON(r[key]);
	   }
	return answerJson;
}