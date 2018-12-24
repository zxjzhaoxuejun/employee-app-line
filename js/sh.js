

function quesetion(data) {//页面生成方法
	$("<section></section>").appendTo($("body"));
	$("<div class='hinned'></div>").appendTo($("body"));
//	if (data.answerType == "Table") {
//		du=left(data);
//		answerType ="Table"
//	};
	if (data.answerType == "Multiple") {
		du=center(data);
		answerType ="Multiple"
	};
//	if (data.answerType == "OnlyTable") {
//		du=right(data);
//		answerType ="OnlyTable"
//	};
//	if(data.isEnd){
//		$("#next p").text("确认");
//	}
};