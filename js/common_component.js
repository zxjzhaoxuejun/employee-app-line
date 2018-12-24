/**
 * 2018-05-18
 * 公用组件
 * 方法
 */
var answerJson; //整个答案
/**
 * 1.经营真实性模块
 * @param {Object} data 数据
 */
function loadFJInvestigateConclusionManageTruth(data) {
	answerJson = jsonForm(data[1]);
	var resultDetails =
		answerJson.fjInvestigateConclusionManageTruthModel
		.fjInvestigateConclusionManageTruth; //答案
	console.log(answerJson);
	var listJson = data[0].sysDicMap.manageTruthDict; //经营真实性字典
	var headHtml = componentsDom.componentTitle('请从经营真实性角度分析'); //头部
	var contentHtml =
		'<div class="con-list"><ul>' +
		componentsDom.componentSingeCheck({
			title: '分析结果',
			name: 'analysisResult',
			isrequery: '*'
		}) +
		componentsDom.componentChildSingeCheck({
			title: '分析结果详情',
			name: 'analysisResultDetail',
			isrequery: '*'
		}) +
		'</ul>';
	contentHtml += componentsDom.componentTextarea({
		title: '请对经营真实性做详细说明',
		name: 'detailDescript',
		isrequery: '*'
	});
	contentHtml += '</div>';
	var footerHtml =
		'<footer id="next" onclick="submit(true);"><p>确定</p></footer>'; //尾部
	var allHtml = headHtml + contentHtml + footerHtml;
	$(allHtml).appendTo('body');
	$('body').attr('data-index', 1);
	checkFun(listJson);
	if (resultDetails) {
		//填充答案
		answerFill(resultDetails, listJson);
	}
}

/**
 * 2.经营情况模块
 * @param {Object} data 传入数据
 */
function loadFJInvestigateConclusionManageSituation(data) {
	answerJson = jsonForm(data[1]);
	var resultDetails =
		answerJson.fjInvestigateConclusionManageSituationModel
		.fjInvestigateConclusionManageSituation; //答案
	console.log(answerJson);
	var listJson = data[0].sysDicMap.manageSituationDict; //经营情况字典
	var headHtml = componentsDom.componentTitle('请从经营情况的角度分析'); //头部
	var contentHtml =
		'<div class="con-list"><ul>' +
		componentsDom.componentSingeCheck({
			title: '分析结果',
			name: 'analysisResult',
			isrequery: '*'
		}) +
		componentsDom.componentChildSingeCheck({
			title: '分析结果详情',
			name: 'analysisResultDetail',
			isrequery: '*'
		}) +
		'</ul>';
	contentHtml += componentsDom.componentTextarea({
		title: '请对经营情况做详细说明',
		name: 'detailDescript',
		isrequery: '*'
	});
	contentHtml += '</div>';
	var footerHtml =
		'<footer id="next" onclick="submit(true);"><p>确定</p></footer>'; //尾部
	var allHtml = headHtml + contentHtml + footerHtml;
	$(allHtml).appendTo('body');
	$('body').attr('data-index', 2);
	checkFun(listJson);
	if (resultDetails) {
		//填充答案
		answerFill(resultDetails, listJson);
	}
}

/**
 * 3.隐藏风险模块
 * @param {Object} data 传入数据
 */
function loadFJInvestigateConclusionRisk(data) {
	answerJson = jsonForm(data[1]);
	var resultDetails =
		answerJson.fjInvestigateConclusionRiskModel.fjInvestigateConclusionRisk; //答案
	console.log(answerJson);
	var listJson = data[0].sysDicMap.riskDict; //隐藏风险字典
	var headHtml = componentsDom.componentTitle('请从隐藏风险的角度分析'); //头部
	var contentHtml =
		'<div class="con-list"><ul>' +
		componentsDom.componentSingeCheck({
			title: '分析结果',
			name: 'analysisResult',
			isrequery: '*'
		}) +
		componentsDom.componentChildSingeCheck({
			title: '分析结果详情',
			name: 'analysisResultDetail',
			isrequery: '*'
		}) +
		'</ul>';
	contentHtml += componentsDom.componentTextarea({
		title: '请对隐藏风险做详细说明',
		name: 'detailDescript',
		isrequery: '*'
	});
	contentHtml += '</div>';
	var footerHtml =
		'<footer id="next" onclick="submit(true);"><p>确定</p></footer>'; //尾部
	var allHtml = headHtml + contentHtml + footerHtml;
	$(allHtml).appendTo('body');
	$('body').attr('data-index', 3);
	checkFun(listJson);
	if (resultDetails) {
		//填充答案
		answerFill(resultDetails, listJson);
	}
}

/**
 * 4.业外投资模块
 * @param {Object} data 传入数据
 */
function loadFJInvestigateConclusionInvestment(data) {
	answerJson = jsonForm(data[1]);
	var resultDetails =
		answerJson.fjInvestigateConclusionInvestmentModel
		.fjInvestigateConclusionInvestment; //答案
	console.log(answerJson);
	var listJson = data[0].sysDicMap.investmentDict; //业外投资字典
	var code_05 = data[0].sysDicMap.cashFlowDict; //现金流字典
	var code_06 = data[0].sysDicMap.manageStabilityDict; //经营稳定性字典
	var headHtml = componentsDom.componentTitle('请从业外投资的角度分析'); //头部
	var contentHtml =
		'<div class="con-list"><ul>' +
		componentsDom.componentSingeCheck({
			title: '分析结果',
			name: 'analysisResult',
			isrequery: '*'
		}) +
		componentsDom.componentChildSingeCheck({
			title: '分析结果详情',
			name: 'analysisResultDetail',
			isrequery: '*'
		}) +
		'</ul>';
	contentHtml += componentsDom.componentTextarea({
		title: '请对业外投资做详细说明',
		name: 'detailDescript',
		isrequery: '*'
	});
	contentHtml += '</div>';
	var footerHtml =
		'<footer id="next" onclick="submit(true);"><p>确定</p></footer>'; //尾部
	var allHtml = headHtml + contentHtml + footerHtml;
	$(allHtml).appendTo('body');
	$('body').attr('data-index', 4);
	checkFun(listJson);
	if (resultDetails) {
		//填充答案
		answerFill(resultDetails, listJson);
	}
}

/**
 * 5.现金流模块
 * @param {Object} data 传入数据
 */
function loadFJInvestigateConclusionCashFlow(data) {
	answerJson = jsonForm(data[1]);
	var resultDetails =
		answerJson.fjInvestigateConclusionCashFlowModel
		.fjInvestigateConclusionCashFlow; //答案
	console.log(answerJson);
	var listJson = data[0].sysDicMap.cashFlowDict; //现金流字典
	var code_06 = data[0].sysDicMap.manageStabilityDict; //经营稳定性字典
	var headHtml = componentsDom.componentTitle('请从现金流的角度分析'); //头部
	var contentHtml =
		'<div class="con-list"><ul>' +
		componentsDom.componentSingeCheck({
			title: '分析结果',
			name: 'analysisResult',
			isrequery: '*'
		}) +
		componentsDom.componentDoubleCheck({
			title: '分析结果详情',
			name: 'analysisResultDetail',
			isrequery: '*'
		}) +
		'</ul>';
	contentHtml += componentsDom.componentTextarea({
		title: '请对现金流做详细说明',
		name: 'detailDescript',
		isrequery: '*'
	});
	contentHtml += '</div>';
	var footerHtml =
		'<footer id="next" onclick="submit(true);"><p>确定</p></footer>'; //尾部
	var allHtml = headHtml + contentHtml + footerHtml;
	$(allHtml).appendTo('body');
	$('body').attr('data-index', 5);
	checkFun(listJson);
	if (resultDetails) {
		//填充答案
		answerFill(resultDetails, listJson);
	}
}

/**
 * 6.经营稳定性模块
 * @param {Object} data 传入数据
 */
function loadFJInvestigateConclusionManageStability(data) {
	answerJson = jsonForm(data[1]);
	var resultDetails =
		answerJson.fjInvestigateConclusionManageStabilityModel
		.fjInvestigateConclusionManageStability; //答案
	console.log(answerJson);
	var listJson = data[0].sysDicMap.manageStabilityDict; //经营稳定性字典
	var headHtml = componentsDom.componentTitle('请从经营稳定性的角度分析'); //头部
	var contentHtml =
		'<div class="con-list"><ul>' +
		componentsDom.componentSingeCheck({
			title: '分析结果',
			name: 'analysisResult',
			isrequery: '*'
		}) +
		componentsDom.componentChildSingeCheck({
			title: '分析结果详情',
			name: 'analysisResultDetail',
			isrequery: '*'
		}) +
		'</ul>';
	contentHtml += componentsDom.componentTextarea({
		title: '请对经营稳定性做详细说明',
		name: 'detailDescript',
		isrequery: '*'
	});
	contentHtml += '</div>';
	var footerHtml =
		'<footer id="next" onclick="submit(true);"><p>确定</p></footer>'; //尾部
	var allHtml = headHtml + contentHtml + footerHtml;
	$(allHtml).appendTo('body');
	$('body').attr('data-index', 6);
	checkFun(listJson);
	if (resultDetails) {
		//填充答案
		answerFill(resultDetails, listJson);
	}
}

/**
 * 下拉选择触发函数
 * @param {数据字典} listJson
 */
function checkFun(listJson) {
	$(document).on('click', '.single-choice', function() {
		//一级单选
		var checkCode = $(this).attr('name'); //已选择的答案
		if (!$(this).attr('name')) {
			checkCode = '';
		}
		choice_fun.singleChoice($(this), checkCode, listJson);
	});
	$(document).on('click', '.multiple-choice', function() {
		//子级多选
		var typeCode = $(this)
			.parent()
			.parent()
			.prev()
			.children('.list-right')
			.children('span')
			.attr('name'); //父元素code
		var checkCode = $(this).attr('name'); //已选择的答案
		if (!$(this).attr('name')) {
			checkCode = '';
		}
		if (!typeCode) {
			if (!$(this)
				.parent()
				.parent()
				.prev()
				.children()
				.hasClass('verify-error')
			) {
				$('<label class="verify-error">请先选择父级</label>').appendTo(
					$(this)
					.parent()
					.parent()
					.prev()
				);
			}
		} else {
			choice_fun.multipleChoice($(this), typeCode, checkCode, listJson);
		}
	});

	$(document).on('click', '.child-choice', function() {
		//子级单选
		var typeCode = $(this)
			.parent()
			.parent()
			.prev()
			.children('.list-right')
			.children('span')
			.attr('name'); //父元素code
		var checkCode = $(this).attr('name'); //已选择的答案
		if (!$(this).attr('name')) {
			checkCode = '';
		}
		if (!typeCode) {
			if (!$(this)
				.parent()
				.parent()
				.prev()
				.children()
				.hasClass('verify-error')
			) {
				$('<label class="verify-error">请先选择父级</label>').appendTo(
					$(this)
					.parent()
					.parent()
					.prev()
				);
			}
		} else {
			choice_fun.childSingleChoice($(this), typeCode, checkCode, listJson);
		}
	});
}

/**
 * 答案填充
 * @param {*} json答案
 * @param {*} code字典
 */
function answerFill(json, code) {
	$('.con-list li').each(function() {
		for (var key in json) {
			if ($(this).attr('name') === key) {
				console.log(json[key])
				$(this)
					.find('.list-right')
					.children('span')
					.eq(0)
					.attr('name', json[key])
					.text(code_resolver(code, json[key]));
				if (json[key]) {
					$(this)
						.find('.list-right')
						.children('span')
						.eq(0)
						.css('color', '#191919');
					$(this)
						.find('.list-left')
						.children('i')
						.css('color', '#999');
				}
			}
		}
	});
	$('.textarea-mode').each(function() {
		for (var key in json) {
			if ($(this).attr('name') === key) {
				if (json[key] == null) {
					json[key] = '';
				}
				$(this)
					.find('.textarea-input')
					.text(json[key]);
			}
		}
	});
}

/**
 * 字典解析
 * @param {字典} code
 * @param {*被解析的编码} str
 */
function code_resolver(code, str) {
	if (str.indexOf(',')) {
		var arr = str.split(',');
		var rel = [];
		for (var t = 0; t < arr.length; t++) {
			for (var i = 0; i < code.length; i++) {
				if (code[i].code === arr[t]) {
					rel.push(code[i].name);
				} else {
					for (var j = 0; j < code[i].codeDicList.length; j++) {
						if (code[i].codeDicList[j].code === arr[t]) {
							//							return code[i].codeDicList[j].name;
							rel.push(code[i].codeDicList[j].name);
						}
					}
				}
			}
		}

		return rel;
	} else {
		for (var i = 0; i < code.length; i++) {
			if (code[i].code === str) {
				return code[i].name;
			} else {
				for (var j = 0; j < code[i].codeDicList.length; j++) {
					if (code[i].codeDicList[j].code === str) {
						return code[i].codeDicList[j].name;
					}
				}
			}
		}
	}

}

/**
 * 获取答案
 */
function getAnswer() {
	var _json = {};
	var verify = true; //校验的结果
	$('.con-list li').each(function() {
		var name = $(this).attr('name');
		var guid = $(this)
			.find('.list-right')
			.children('span')
			.eq(0)
			.attr('name');
		if (
			$(this)
			.find('.list-left')
			.children('span')
			.text() === '*'
		) {
			if (!guid) {
				if (!$(this)
					.children()
					.hasClass('verify-error')
				) {
					$('<label class="verify-error">请先选择分析结果</label>').appendTo(
						$(this)
					);
				}
				verify = false;
			} else {
				$(this)
					.find('.verify-error')
					.remove();
			}
		}
		_json[name] = guid ? guid : '';
	});
	$('.textarea-mode').each(function() {
		var name = $(this).attr('name');
		var value = $(this)
			.find('.textarea-input')
			.val();
		if (
			value.length >
			$(this)
			.find('.textarea-input')
			.attr('max-len') ||
			value.length == 0
		) {
			$(
				'<label class="verify-error" style="top:6rem;">请输入500个汉字以内</label>'
			).appendTo($(this));
			verify = false;
		} else {
			$(this)
				.find('.verify-error')
				.remove();
		}
		_json[name] = value;
	});
	var result = {
		data: _json,
		resultVerify: verify
	};
	return result;
}

/**
 * 提交答案
 * @param {状态} statue
 */
function submit(statue) {
	console.log(getAnswer());
	var result = getAnswer(); //答案数据
	//TODO
	/* 提交给后台的数据
	 * @param {Object} statue 为true手动提交，false自动保存或者返回
	 * @param {Object} answerJson 数据
	 * @param {Object} ValidityState 其他校验状态
	 */
	var ValidityState = result.resultVerify;
	var pageIndex = $('body').attr('data-index');
	var subJosn = {};
	switch (pageIndex) {
		case '1':
			answerJson.fjInvestigateConclusionManageTruthModel.fjInvestigateConclusionManageTruth =
				result.data;
			subJosn = answerJson;
			break;
		case '2':
			answerJson.fjInvestigateConclusionManageSituationModel.fjInvestigateConclusionManageSituation =
				result.data;
			subJosn = answerJson;
			break;
		case '3':
			answerJson.fjInvestigateConclusionRiskModel.fjInvestigateConclusionRisk =
				result.data;
			subJosn = answerJson;
			break;
		case '4':
			answerJson.fjInvestigateConclusionInvestmentModel.fjInvestigateConclusionInvestment =
				result.data;
			subJosn = answerJson;
			break;
		case '5':
			answerJson.fjInvestigateConclusionCashFlowModel.fjInvestigateConclusionCashFlow =
				result.data;
			subJosn = answerJson;
			break;
		case '6':
			answerJson.fjInvestigateConclusionManageStabilityModel.fjInvestigateConclusionManageStability =
				result.data;
			subJosn = answerJson;
			break;
		default:
			subJosn = answerJson;
	}
	if (statue) {
		if (ValidityState) {
			console.log('最终校验结果：通过');
			subJosn['completeStatus'] = 2;
			console.log(subJosn);
			subJosn = JSON.stringify(subJosn);
			AndroidJs.saveWjDetalAnswer(subJosn, true);
		} else {
			console.log('最终校验结果：不通过');
			subJosn['completeStatus'] = 1;
			subJosn = JSON.stringify(subJosn);
			AndroidJs.saveWjDetalAnswer(subJosn, false);
		}
	} else {
		if (ValidityState) {
			subJosn['completeStatus'] = 2;
		} else {
			subJosn['completeStatus'] = 1;
		}
		subJosn = JSON.stringify(subJosn);
		AndroidJs.saveWjDetalAnswer(subJosn, false);
	}
}

/**
 * 组件ＤＯＭ结构
 */
var componentsDom = {
	/**
	 * 标题组件
	 * @param {Object} json 数据
	 */
	componentTitle: function(json) {
		var html = '<div class="cr-title"><p class="t-tile">' + json + '</p></div>';
		return html;
	},
	/**
	 * 文本输入组件
	 * @param {Object} json 数据
	 */
	componentText: function(json) {
		var html =
			'<li name="busySeasonAvgSaleAmount">' +
			'<div class="list-left">' +
			'<span>*</span><i>姓名</i>' +
			'</div>' +
			'<div class="list-right">' +
			'<input type="text" placeholder="请输入">' +
			'</div>' +
			'</li>';
		return html;
	},
	/**
	 * 文本输入数字组件
	 * @param {Object} json 数据
	 */
	componentNumber: function(json) {
		var html =
			'<li name="busySeasonAvgSaleAmount">' +
			'<div class="list-left">' +
			'<span>*</span><i>月均销售额</i>' +
			'</div>' +
			'<div class="list-right">' +
			'<input type="number" placeholder="请输入"><b class="d-icon">元</b>' +
			'</div>' +
			'</li>';
		return html;
	},
	/**
	 * 子级复选组件
	 * @param {Object} json 数据
	 */
	componentDoubleCheck: function(json) {
		var html =
			'<li name="' +
			json.name +
			'">' +
			'<div class="list-left">' +
			'<span>' +
			json.isrequery +
			'</span>' +
			'<i>' +
			json.title +
			'</i>' +
			'</div>' +
			'<div class="list-right">' +
			'<span class="select-check multiple-choice">请选择</span>' +
			'<span class="down-select"></span>' +
			'</div>' +
			'</li>';

		return html;
	},
	/**
	 * 单选组件
	 * @param {Object} json 数据
	 */
	componentSingeCheck: function(json) {
		var html =
			'<li name="' +
			json.name +
			'" >' +
			'<div class="list-left">' +
			'<span>' +
			json.isrequery +
			'</span>' +
			'<i>' +
			json.title +
			'</i>' +
			'</div>' +
			'<div class="list-right">' +
			'<span class="select-check single-choice">请选择</span>' +
			'<span class="down-select"></span>' +
			'</div>' +
			'</li>';

		return html;
	},
	/**
	 * 子级单选组件
	 * @param {Object} json 数据
	 */
	componentChildSingeCheck: function(json) {
		var html =
			'<li name="' +
			json.name +
			'" >' +
			'<div class="list-left">' +
			'<span>' +
			json.isrequery +
			'</span>' +
			'<i>' +
			json.title +
			'</i>' +
			'</div>' +
			'<div class="list-right">' +
			'<span class="select-check child-choice">请选择</span>' +
			'<span class="down-select"></span>' +
			'</div>' +
			'</li>';

		return html;
	},
	/**
	 * 文本域组件
	 * @param {Object} json 数据
	 */
	componentTextarea: function(json) {
		var html =
			'<div class="textarea-mode" name="' +
			json.name +
			'">' +
			'<div class="textarea-titel">' +
			'<span>' +
			json.isrequery +
			'</span>' +
			'<i>' +
			json.title +
			'</i>' +
			'</div>' +
			'<textarea name="message" class="textarea-input" placeholder="请输入" max-len="500" onKeyDown="textCounter(this.className,500);"></textarea>' +
			'<div class="limit-mode">' +
			'<span class="improt-text max-text-limit">0</span>' +
			'<span class="max-text-limit">/500字</span>' +
			'</div>' +
			'</div>';

		return html;
	}
};