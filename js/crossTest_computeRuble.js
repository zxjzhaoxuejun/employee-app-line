var computeRuble = {
	//月可支计算
	mouthPay: function(dataJson) {
		var _that = this;
		var c = dataJson.answer.bossIncomeAccountModel.bossIncomeAccountIncomes; //损益表收入
		var c0 = dataJson.answer.bossIncomeAccountModel.bossIncomeAccountVariableCosts; //损益表可变成本
		var c1 = dataJson.answer.bossIncomeAccountModel.bossIncomeAccountFixedOutcomes; //损益表固定支出
		var c2 = dataJson.answer.bossIncomeAccountModel.bossIncomeAccountOthers; //损益表其他
		var c3 = dataJson.answer.bossIncomeAccountModel.bossIncomeAccountSummaries; //损益表所得税
		var c4 = dataJson.answer.bossIncomeAccountModel.bossIncomeAccountTurnoverResources; //损益表利润
		var dateVal = dataJson.answer.bossIncomeAccountDates; //日期
		var mouthPayRuble = function(c, c0, c1, c2, c3) { //可支出;//c表示收入，C0表示可变成本,c1固定支出,c2其他,c3所得税
			var CostsArr = [];
			CostsArr.length = 0;
			var expectOut = 0; //可变成本预期月
			var expectIn = 0; //收入预期月
			var n = 0;
			for (var i = 0; i < 12; i++) {
				var IncomSum = 0; //收入
				var outcomSum = 0; //可变成本
				//		var FiedcomSum=0;//固定支出
				//		var FiedInSum=0;//其他收入
				var Inmonth = 0; //月收入
				var Kbmonth = 0; //月可变成本
				var Fiedmonth = 0; //月固定支出
				var Qtmonth = 0; //月其他
				var QtInmonth = 0; //月其他收入
				var sDmonth = 0; //月所得税
				for (var j = 0; j < c.length; j++) { //收入
					if (dateVal[i].date == c[j].date) {
						if (c[j].type == 1) {
							if (c[j].amount == undefined) {
								c[j].amount = 0;
							}
							Inmonth = Number(c[j].amount);
							IncomSum += Number(c[j].amount);
						}

					}
					if (c[j].type == 2) { //预期代表月
						if (c[j].amount == undefined) {
							c[j].amount = 0;
						}
						expectIn += Number(c[j].amount);

					}
				}
				for (var k = 0; k < c0.length; k++) { //可变成本
					if (dateVal[i].date == c0[k].date) {
						if (c0[k].type == 1) {
							if (c0[k].amount == undefined) {
								c0[k].amount = 0;
							}
							Kbmonth = Number(c0[k].amount);
							outcomSum += Number(c0[k].amount);
						}
					}
					if (c0[k].type == 2) { //预期代表月
						//				alert(c0[k].amount)
						if (c0[k].amount == undefined) {
							c0[k].amount = 0;
						}
						expectOut += Number(c0[k].amount);
					}
				}

				for (var h = 0; h < c3.length; h++) { //所得税
					if (dateVal[i].date == c3[h].date) {
						if (c3[h].type == 5) {
							if (c3[h].amount == undefined) {
								c3[h].amount = 0;
							}
							sDmonth = Number(c3[h].amount);
							outcomSum += Number(c3[h].amount);

						}
					}
					if (c3[h].type == 5 && c3[h].otherType == 2) { //预期代表月
						if (c3[h].amount == undefined) {
							c3[h].amount = 0;
						}
						expectOut += Number(c3[h].amount);
					}
				}

				for (var u = 0; u < c1.length; u++) { //固定支出
					if (dateVal[i].date == c1[u].date) {
						if (c1[u].type == 1) {
							if (c1[u].amount == undefined) {
								c1[u].amount = 0;
							}
							outcomSum += Number(c1[u].amount);

							Fiedmonth = Number(c1[u].amount);

						}
					}
					if (c1[u].type == 2) { //预期代表月
						if (c1[u].amount == undefined) {
							c1[u].amount = 0;
						}
						expectOut += Number(c1[u].amount);
					}
				}
				for (var t = 0; t < c2.length; t++) { //其他
					if (dateVal[i].date == c2[t].date) {
						if (c2[t].type == 1) {
							if (c2[t].category == 1 || c2[t].category == 2 || c2[t].category == 3) { //家庭开支、分期还款
								Qtmonth = 0;
								if (c2[t].amount == undefined) {
									c2[t].amount = 0;
								}
								Qtmonth += Number(c2[t].amount);
								outcomSum += Number(c2[t].amount);

							}
							if (c2[t].category == 4) { //其他收入
								if (c2[t].amount == undefined) {
									c2[t].amount = 0;
								}
								IncomSum += Number(c2[t].amount);
								QtInmonth = Number(c2[t].amount)

							};
						};

					};
					if (c2[t].type == 2) { //预期代表月
						if (c2[t].category == 1 || c2[t].category == 2 || c2[t].category == 3) {
							if (c2[t].amount == undefined) {
								c2[t].amount = 0;
							}
							expectOut += Number(c2[t].amount);
						}
						if (c2[t].category == 4) { //其他收入
							if (c2[t].amount == undefined) {
								c2[t].amount = 0;
							}
							expectIn += Number(c2[t].amount);
						}
					}
				}
				var Qt = QtInmonth - Qtmonth;
				if (Qt == 0 && Inmonth == 0 && Fiedmonth == 0 && Kbmonth == 0 && sDmonth == 0) {
					n++;
					//			alert(n);
				}
				var difference = _that.tools.toDecimal(IncomSum - outcomSum);
				var _json = {};
				_json["date"] = dateVal[i].date;
				_json["amount"] = difference;
				_json["type"] = "9";
				_json["otherType"] = "1";
				CostsArr.push(_json);
			}
			return CostsArr;
		};
		var numericalValue = mouthPayRuble(c, c0, c1, c2, c3);
		return numericalValue;
	},
	//期间利润(完成)
	periodProfit: function(_dataJson, initialEquityDate) {
//		var dataJson=JSON.parse(JSON.stringify(_dataJson));
		var dataJson = $.extend(true,{},_dataJson);
		//损益表数据答案总和
		var bossIncomeAccountModel = dataJson["answer"]["bossIncomeAccountModel"];
		//计算月可支配
		var mouthPay = this.mouthPay(dataJson);
		bossIncomeAccountModel["bossIncomeAccountSummaries"] = mouthPay;
		//初始权益时间
		if (initialEquityDate) {
			var initialEquitiesTime = initialEquityDate;
		} else {
			var initialEquitiesTime = bossIncomeAccountModel["bossAcrossInitialEquity"]["initialEquityDate"];
		}
		initialEquitiesTimeArray = initialEquitiesTime.split("-");
		initialEquitiesTimeArray.pop();
		initialEquitiesTime = initialEquitiesTimeArray.join("-");
		//存储初始权益时间没有去掉日的原始时间。（用来后面超过15日的判断逻辑）
		var initialEquities=bossIncomeAccountModel["bossAcrossInitialEquity"]["initialEquityDate"];
		//初始时间变成秒
		var initialEquitiesTime_Second = (Date.parse(new Date(initialEquitiesTime))) / 1000;
		//equitiesPeriodMinMaxArry存储损益表周期的最大值和最小值
		var equitiesPeriodMinMaxArry = [];
		//存储对打最小值
		var maxmin = [];
		//equitiesPeriodArry:存储损益表周期数据
		var equitiesPeriodArry = dataJson.answer["bossIncomeAccountDates"];
		//获取最大损益周期最大最小事件存起来变成数组存起来
		for (var i = 0; i < equitiesPeriodArry.length; i++) {
			var sortNo = equitiesPeriodArry[i]["sortNo"];
			//判断maxmin数组是否为空数组还是有值数组，针对数组相应的个数来执行相应的方法
			if (maxmin.length == 0) {
				maxmin.push(sortNo);
			} else if (maxmin.length == 1) {
				var firstDate = maxmin[0];
				if (Number(sortNo) > Number(firstDate)) {
					maxmin.push(sortNo);
				} else if (Number(sortNo) < Number(firstDate)) {
					maxmin.unshift(firstDate);
				}
			} else if (maxmin.length == 2) {
				for (var j = 0; j < maxmin.length; j++) {
					var max = maxmin[0];
					var min = maxmin[1];
					if (Number(sortNo) > Number(max)) {
						maxmin.pop();
						maxmin.push(Number(sortNo));
					} else if (Number(sortNo) < Number(min)) {
						maxmin.shift();
						maxmin.unshift(Number(sortNo));
					};
				};
			};

			//			if(sortNo=="1"||sortNo=="12"){
			//				equitiesPeriodMinMaxArry.push(equitiesPeriodArry[i]["date"]);
			//			};
		};
		for (var i = 0; i < equitiesPeriodArry.length; i++) {
			var sortNo = equitiesPeriodArry[i]["sortNo"];
			if (sortNo == maxmin[0] || sortNo == maxmin[1]) {
				equitiesPeriodMinMaxArry.push(equitiesPeriodArry[i]["date"]);
			};
		};
		//var timeStamp1=(Date.parse(new Date(strTime1)))/1000;//第一个时间框时间戳(bi)
		//var timeStamp2=(Date.parse(new Date(strTime2)))/1000;//第2个时间框时间戳
		//equitiesPeriodMinMaxArry损益表周期数组进行数组里面的日期排序，小日期的排在第一个，大日期排在第二个
		var equitiesPeriodMin = (Date.parse(new Date(equitiesPeriodMinMaxArry[0]))) / 1000;
		var equitiesPeriodMax = (Date.parse(new Date(equitiesPeriodMinMaxArry[1]))) / 1000;
		if (equitiesPeriodMin > equitiesPeriodMax) {
			var pop = equitiesPeriodMinMaxArry.pop();
			equitiesPeriodMinMaxArry.unshift(pop);
		};
		//损益表周期的最大值和最小值变成了秒
		equitiesPeriodMin = (Date.parse(new Date(equitiesPeriodMinMaxArry[0]))) / 1000;
		equitiesPeriodMax = (Date.parse(new Date(equitiesPeriodMinMaxArry[1]))) / 1000;
		//		console.log(equitiesPeriodMin,equitiesPeriodMax)
		//		console.log(initialEquitiesTime_Second);
		//初始权益时间段的对比，然后执行相对应的计算规则;
		//1、初始权益时间介于损益表周期内，期间利润取值为初始权益月份到损益表周期最后月份的月可支配资金总和。
		if (new Date(initialEquitiesTime) >= new Date(equitiesPeriodMinMaxArry[0]) && new Date(initialEquitiesTime) <= new Date(equitiesPeriodMinMaxArry[1])) {
			//fundTotalArry用数组存储可支配资金
			var fundTotalArry = [];
			for (var i = 0; i < bossIncomeAccountModel["bossIncomeAccountSummaries"].length; i++) {
				//判断数据类型是哪一种，若为9的话是月可支配资金，并且otherType为2  
				if (bossIncomeAccountModel["bossIncomeAccountSummaries"][i]["type"] == "9" && bossIncomeAccountModel["bossIncomeAccountSummaries"][i]["otherType"] == "1") {
					//fundDate:是支配资金的时间
					var fundDate = new Date(bossIncomeAccountModel["bossIncomeAccountSummaries"][i]["date"]);
					//进行fundDate可支配资金的初始权益月份到损益表周期最后月份的日期对比
					if (fundDate >= new Date(initialEquitiesTime) && fundDate <= new Date(equitiesPeriodMinMaxArry[1])) {
						fundTotalArry.push(bossIncomeAccountModel["bossIncomeAccountSummaries"][i]["amount"]);
					};
				};
			};
			//月可支配资金总和
			var fundTotal = 0;
			for (var i = 0; i < fundTotalArry.length; i++) {
				fundTotal += Number(fundTotalArry[i])
			};
			return fundTotal;
		} else if (new Date(initialEquitiesTime) < new Date(equitiesPeriodMinMaxArry[0])) {
			//fundTotalArry用数组存储可支配资金
			var fundTotalArry = [];
			for (var i = 0; i < bossIncomeAccountModel["bossIncomeAccountSummaries"].length; i++) {
				//判断数据类型是哪一种，若为9的话是月可支配资金,并且otherType为2
				if (bossIncomeAccountModel["bossIncomeAccountSummaries"][i]["type"] == "9" && bossIncomeAccountModel["bossIncomeAccountSummaries"][i]["otherType"] == "1") {
					var fundDate = new Date(bossIncomeAccountModel["bossIncomeAccountSummaries"][i]["date"]);
					//进行fundDate可支配资金的初始权益月份到损益表周期最后月份的日期对比
					if (fundDate >= new Date(equitiesPeriodMinMaxArry[0]) && fundDate <= new Date(equitiesPeriodMinMaxArry[1])) {
						fundTotalArry.push(bossIncomeAccountModel["bossIncomeAccountSummaries"][i]["amount"]);
					};
				};
			};
			//月可支配资金总和
			var fundTotal = 0;
			//用来存储月可支配有多少个月
			var fundTotalTime=0;
			for (var i = 0; i < fundTotalArry.length; i++) {
				//如果这个月的月可支配金额为0的话，省略这个月
				if(fundTotalArry[i]!="0"){
					fundTotalTime++;
					fundTotal += Number(fundTotalArry[i]);
				}
			};
			//周期平均的月可支配资金
			var meanFundTotal = fundTotal / fundTotalTime;
			meanFundTotal = this.tools.saveTowDecimal(meanFundTotal, 2);
			//判断meanFundTotal月可支平均数是否为NaN，是的话就直接为0
			if (isNaN(meanFundTotal)) {
				meanFundTotal = 0;
			};
			//损益表周期第一个月的月份
			var firstEquitiesPeriod = new Date(equitiesPeriodMinMaxArry[0]).getMonth();
			//初始权益时间月份与损益表周期第一个月的月份的差值
			var monthDvalue = 0;
			//初始权益时间的年份和损益表周期的年份是否在同一年进行判断
			if (new Date(initialEquitiesTime).getFullYear() == new Date(equitiesPeriodMinMaxArry[0]).getFullYear()) {
				var monthDvalue = (new Date(equitiesPeriodMinMaxArry[0]).getMonth() + 1) - (new Date(initialEquitiesTime).getMonth() + 1);
				if (new Date(initialEquities).getDate() > 15) {
					monthDvalue -= 1;
				};
			} else {
				var monthDvalue_Second = equitiesPeriodMin - initialEquitiesTime_Second;
				monthDvalue = Number(this.tools.change_Second(monthDvalue_Second));
				if (new Date(initialEquities).getDate() > 15) {
					monthDvalue -= 1;
				};
			};
			var timeProfitResult = fundTotal + (monthDvalue * meanFundTotal);
			//timeProfitResult保留两位整数
			timeProfitResult = this.tools.saveTowDecimal(timeProfitResult, 0);
			//			console.log(timeProfitResult);
			return timeProfitResult;
		} else {
			//			初始权益时间大于损益表周期的情况直接返回个0
			var timeProfitResult = 0;
			return timeProfitResult;
		};
	},
	//折旧(完成)
	depreciation: function(dataJson) {
		//损益表数据答案总和
		var bossIncomeAccountModel = dataJson["answer"]["bossIncomeAccountModel"];
		//初始权益时间
		var initialEquitiesTime = bossIncomeAccountModel["bossAcrossInitialEquity"]["initialEquityDate"];
		//初始时间变成秒
		var initialEquitiesTime_Second = (Date.parse(new Date(initialEquitiesTime))) / 1000;
		//资产负载表数据答案总和
		var balanceSheetModel = dataJson["answer"]["balanceSheetModel"];
		//资产负载表总现值总和
		var totalValueTotal = 0;
		//资产负载表购买总价总和
		var buyTotalPrices = 0;
		for (var i = 0; i < balanceSheetModel.bossFixedAssets.length; i++) {
			var buyTime = balanceSheetModel.bossFixedAssets[i].buyTime;
			if (new Date(buyTime) > new Date(initialEquitiesTime)) {
				buyTotalPrices += Number(balanceSheetModel.bossFixedAssets[i]["number"]) * Number(balanceSheetModel.bossFixedAssets[i]["unitPrice"]);
				totalValueTotal += Number(balanceSheetModel.bossFixedAssets[i]["totalValue"]);
			};
		};
		//折旧值
		var depreciation = 0;
		depreciation = buyTotalPrices - totalValueTotal;
		return depreciation;
	},
	//固定资产(完成)
	fixedAssets: function(dataJson) {
		//损益表数据答案总和
		var bossIncomeAccountModel = dataJson["answer"]["bossIncomeAccountModel"]
			//初始权益时间
		var initialEquitiesTime = bossIncomeAccountModel["bossAcrossInitialEquity"]["initialEquityDate"];
		//初始时间变成秒
		var initialEquitiesTime_Second = (Date.parse(new Date(initialEquitiesTime))) / 1000;
		//固定资产综合
		var fixedAssets = 0;
		for (var i = 0; i < dataJson["answer"]["balanceSheetModel"]["bossFixedAssets"].length; i++) {
			var bossFixedAssetsArry = dataJson["answer"]["balanceSheetModel"]["bossFixedAssets"][i];
			var buyTime = bossFixedAssetsArry["buyTime"];
			if (new Date(buyTime) < new Date(initialEquitiesTime)) {
				//总现值
				var totalValue = Number(bossFixedAssetsArry["totalValue"]);
				fixedAssets += totalValue;
			};
		};
		return fixedAssets;
	},
	//实时变动固定资产(完成)
	fixedAssets_realTime: function(dataJson) {
		//损益表数据答案总和
		var bossIncomeAccountModel = dataJson["answer"]["bossIncomeAccountModel"]
			//初始权益时间
		var initialEquitiesTime = $("#demo11").val();
		//初始时间变成秒
		var initialEquitiesTime_Second = (Date.parse(new Date(initialEquitiesTime))) / 1000;
		//固定资产综合
		var fixedAssets_realTime = 0;
		for (var i = 0; i < dataJson["answer"]["balanceSheetModel"]["bossFixedAssets"].length; i++) {
			var bossFixedAssetsArry = dataJson["answer"]["balanceSheetModel"]["bossFixedAssets"][i];
			var buyTime = bossFixedAssetsArry["buyTime"];
			if (new Date(buyTime) < new Date(initialEquitiesTime)) {
				//总现值
				var totalValue = Number(bossFixedAssetsArry["totalValue"]);
				fixedAssets_realTime += totalValue;
			};
		};
		return fixedAssets_realTime;
	},
	//初始权益(完成)
	initialEquity: function(dataJson) {
		var initialEquity = 0;
		//损益表数据答案总和
		var bossIncomeAccountModel = dataJson["answer"]["bossIncomeAccountModel"];
		//初始权益答案综合
		var bossAcrossInitialEquity = bossIncomeAccountModel["bossAcrossInitialEquity"];
		
		//加的和start—————————————————————————---------------------------------------
		var add = 0;
		//现金及存款
		var cashDeposit = Number(bossAcrossInitialEquity["cashDeposit"]);
		//应收账款
		var receivableAccount = Number(bossAcrossInitialEquity["receivableAccount"]);
		//预付账款
		var prepayAccount = Number(bossAcrossInitialEquity["prepayAccount"]);
		//存货
		var stock = Number(bossAcrossInitialEquity["stock"]);
		//固定资产
		var fixedAsset = Number(this.fixedAssets(dataJson));
		//其他经营性资产
		var otherOperateAsset = Number(bossAcrossInitialEquity["otherOperateAsset"]);
		//其他非经营性资产
		var otherNonoperateAsset = Number(bossAcrossInitialEquity["otherNonoperateAsset"]);
		add = cashDeposit + receivableAccount + prepayAccount + stock + fixedAsset + otherOperateAsset + otherNonoperateAsset;
		//减的和start—————————————————————————---------------------------------------
		var jian = 0;
		//应付账款
		var payableAccount = Number(bossAcrossInitialEquity["payableAccount"]);
		//预收账款
		var prereceiveAccount = Number(bossAcrossInitialEquity["prereceiveAccount"]);
		//小贷公司贷款（除中安）
		var smallLoanCompanyLoan = Number(bossAcrossInitialEquity["smallLoanCompanyLoan"]);
		//银行信用卡贷款
		var bankCreditLoan = Number(bossAcrossInitialEquity["bankCreditLoan"]);
		//中安贷款余额
		var zaLoanBalance = Number(bossAcrossInitialEquity["zaLoanBalance"]);
		//信用卡透支
		var creditOverdraw = Number(bossAcrossInitialEquity["creditOverdraw"]);
		//银行抵押贷款
		var bankMortgageLoan = Number(bossAcrossInitialEquity["bankMortgageLoan"]);
		//私人借款
		var personalLoan = Number(bossAcrossInitialEquity["personalLoan"]);
		//其他（拆股费用等）
		var other = Number(bossAcrossInitialEquity["other"]);
		jian = payableAccount + prereceiveAccount + smallLoanCompanyLoan + bankCreditLoan + zaLoanBalance + creditOverdraw + bankMortgageLoan + personalLoan + other;
		//		console.log(add)
		//		console.log(jian);
		initialEquity = add - jian;
		//		console.log(initialEquity);
		return initialEquity;
	},
	initialEquity_realTime: function(dataJson) {
		var initialEquity = 0;
		//损益表数据答案总和
		var bossIncomeAccountModel = dataJson["answer"]["bossIncomeAccountModel"];
		//初始权益答案综合
		var bossAcrossInitialEquity = bossIncomeAccountModel["bossAcrossInitialEquity"];
		//加的和start—————————————————————————---------------------------------------
		var add = 0;
		//现金及存款
		var cashDeposit = Number($(".sr li[fieldname='cashDeposit'] input").val());
		//应收账款
		var receivableAccount = Number($(".sr li[fieldname='receivableAccount'] input").val());
		//预付账款
		var prepayAccount = Number($(".sr li[fieldname='prepayAccount'] input").val());
		//存货
		var stock = Number($(".sr li[fieldname='stock'] input").val());
		//固定资产
		var fixedAsset = Number(this.fixedAssets_realTime(dataJson));
		//其他经营性资产
		var otherOperateAsset = Number($(".sr li[fieldname='otherOperateAsset'] input").val());
		//其他非经营性资产
		var otherNonoperateAsset = Number($(".sr li[fieldname='otherNonoperateAsset'] input").val());
		add = cashDeposit + receivableAccount + prepayAccount + stock + fixedAsset + otherOperateAsset;
		//减的和start—————————————————————————---------------------------------------
		var jian = 0;
		//应付账款
		var payableAccount = Number($(".zc li[fieldname='payableAccount'] input").val());
		//预收账款
		var prereceiveAccount = Number($(".zc li[fieldname='prereceiveAccount'] input").val());
		//小贷公司贷款（除中安）
		var smallLoanCompanyLoan = Number($(".zc li[fieldname='smallLoanCompanyLoan'] input").val());
		//银行信用卡贷款
		var bankCreditLoan = Number($(".zc li[fieldname='bankCreditLoan'] input").val());
		//中安贷款余额
		var zaLoanBalance = Number($(".zc li[fieldname='zaLoanBalance'] input").val());
		//信用卡透支
		var creditOverdraw = Number($(".zc li[fieldname='creditOverdraw'] input").val());
		//银行抵押贷款
		var bankMortgageLoan = Number($(".zc li[fieldname='bankMortgageLoan'] input").val());
		//私人借款
		var personalLoan = Number($(".zc li[fieldname='personalLoan'] input").val());
		//其他（拆股费用等）
		var other = Number($(".zc li[fieldname='other'] input").val());
		jian = payableAccount + prereceiveAccount + smallLoanCompanyLoan + bankCreditLoan + zaLoanBalance + creditOverdraw + bankMortgageLoan + personalLoan + other;
		//		console.log(add)
		//		console.log(jian);
		initialEquity = add - jian;
		//		console.log(initialEquity);
		if (!initialEquity) {
			initialEquity = 0;
		}
		return initialEquity;
	},
	//应有权益(有问题)
	dueEquity: function(dataJson) {
		var dueEquity = 0;
		//损益表数据答案总和
		var bossIncomeAccountModel = dataJson["answer"]["bossIncomeAccountModel"];
		//初始权益答案综合
		var bossAcrossInitialEquity = bossIncomeAccountModel["bossAcrossInitialEquity"];
		//初始权益
		var initialEquity = this.initialEquity(dataJson);
		//期间利润
		var periodProfit = this.periodProfit(dataJson);
		//还款本金
		var refund = Number($("section .a_dd .problem ul li .right input").val());
		//var refund=0;
		//期间注资
		var timeCapital = Number($("section .a_dd .show ._xq ._zsp").text());
		//var timeCapital=0;
		//升值
		var appreciation = Number($("section .a_dd .a_ft ul li .right input").val());
		//var appreciation=0;
		dueEquity = initialEquity + (periodProfit + refund + timeCapital + appreciation);
		//期内提取的资金
		var timeExtractCapital = Number($("section .j_ian .show ._xq ._zsp").text());
		//var timeExtractCapital=80000;
		//折旧
		var depreciation = this.depreciation(dataJson);
		//贬值
		var devalue = Number($("section .j_ian .j_ft ul li").eq(1).find(".right input").val());
		//var devalue=0;
		dueEquity = dueEquity - (timeExtractCapital + depreciation + devalue);
		return dueEquity
	},
	//实际权益(有问题)
	actualEquity: function(dataJson) {
		//questionnaireCode问卷的类型
		var questionnaireCode = dataJson["answer"]["questionnaireCode"]["questionnaireCode"];
		//资产负载表总数据
		var balanceSheetModel = dataJson["answer"]["balanceSheetModel"];
		//流动资产总和-start——————————————————————————————————————————————————————————————————		
		var flowProperty = 0;
		//流动资产-现金及银行存款
		var flowProperty_cashDeposit = 0;
		//流动资产-应收账款
		var flowProperty_debtReceivable = 0;
		//流动资产-预付款项
		var flowProperty_beforehandPayment = 0;
		//流动资产-存货
		var flowProperty_stock = 0;
		//固定资产-start——————————————————————————————————————————————————————————————————
		var fixedAssets = 0;
		//其他经营资产-start——————————————————————————————————————————————————————————————
		var otherOperate = 0;
		//非其他经营资产-start————————————————————————————————————————————————————————————
		var otherUnOperate = 0;
		//短期负债-start——————————————————————————————————————————————————————————————————
		var shorLoad = 0;
		//短期负债-应付货款
		var shorLoad_copeWithGoods = 0;
		//短期负债-其他应付款项
		var shorLoad_otherCopeWithFund = 0;
		//短期负债-预收款项
		var shorLoad_advanceGatherFund = 0;
		//短期负债-短期贷款
		var shorLoad_shorLoan = 0;
		//长期负债-start———————————————————————————————————————————————————————————————————
		var longLoad = 0;
		for (var i = 0; i < balanceSheetModel["balanceSheetAnswers"].length; i++) {
			if (balanceSheetModel["balanceSheetAnswers"][i]["code"] == "0001." + questionnaireCode + ".08.01") {
				//流动资产-现金及银行存款
				flowProperty_cashDeposit = Number(balanceSheetModel["balanceSheetAnswers"][i]["value"]);
			} else if (balanceSheetModel["balanceSheetAnswers"][i]["code"] == "0001." + questionnaireCode + ".08.02.01") {
				//流动资产-应收账款
				flowProperty_debtReceivable = Number(balanceSheetModel["balanceSheetAnswers"][i]["value"]);
			} else if (balanceSheetModel["balanceSheetAnswers"][i]["code"] == "0001." + questionnaireCode + ".08.03.01") {
				//流动资产-预付款项
				flowProperty_beforehandPayment = Number(balanceSheetModel["balanceSheetAnswers"][i]["value"]);
			} else if (balanceSheetModel["balanceSheetAnswers"][i]["code"] == "0001." + questionnaireCode + ".08.04.01") {
				//流动资产-存货
				flowProperty_stock = Number(balanceSheetModel["balanceSheetAnswers"][i]["value"]);
			} else if (balanceSheetModel["balanceSheetAnswers"][i]["code"] == "0001." + questionnaireCode + ".08.05.01") {
				//固定资产
				fixedAssets = Number(balanceSheetModel["balanceSheetAnswers"][i]["value"]);
			} else if (balanceSheetModel["balanceSheetAnswers"][i]["code"] == "0001." + questionnaireCode + ".08.06.01") {
				//其他经营资产
				otherOperate = Number(balanceSheetModel["balanceSheetAnswers"][i]["value"]);
			} else if (balanceSheetModel["balanceSheetAnswers"][i]["code"] == "0001." + questionnaireCode + ".08.07.01") {
				//其他非经营资产
				otherUnOperate = Number(balanceSheetModel["balanceSheetAnswers"][i]["value"]);
			} else if (balanceSheetModel["balanceSheetAnswers"][i]["code"] == "0001." + questionnaireCode + ".08.08.01") {
				//短期负债-应付帐款
				shorLoad_copeWithGoods = Number(balanceSheetModel["balanceSheetAnswers"][i]["value"]);
			} else if (balanceSheetModel["balanceSheetAnswers"][i]["code"] == "0001." + questionnaireCode + ".08.09.01") {
				//短期负债-其他应付款项
				shorLoad_otherCopeWithFund = Number(balanceSheetModel["balanceSheetAnswers"][i]["value"]);
			} else if (balanceSheetModel["balanceSheetAnswers"][i]["code"] == "0001." + questionnaireCode + ".08.10.01") {
				//短期负债-预收款项
				shorLoad_advanceGatherFund = Number(balanceSheetModel["balanceSheetAnswers"][i]["value"]);
			} else if (balanceSheetModel["balanceSheetAnswers"][i]["code"] == "0001." + questionnaireCode + ".08.11") {
				//短期负债-短期贷款
				shorLoad_shorLoan = Number(balanceSheetModel["balanceSheetAnswers"][i]["value"]);
			} else if (balanceSheetModel["balanceSheetAnswers"][i]["code"] == "0001." + questionnaireCode + ".08.12") {
				//长期负债
				longLoad = Number(balanceSheetModel["balanceSheetAnswers"][i]["value"]);
			}
		};
		//流动资产总和
		flowProperty = flowProperty_cashDeposit + flowProperty_debtReceivable + flowProperty_beforehandPayment + flowProperty_stock;
		//短期负债
		shorLoad = shorLoad_copeWithGoods + shorLoad_otherCopeWithFund + shorLoad_advanceGatherFund + shorLoad_shorLoan;
		//实际权益
		var actualEquity = Number((flowProperty + fixedAssets + otherOperate + otherUnOperate) - (shorLoad + longLoad));
		return actualEquity;
	},
	//差别(有问题)
	difference: function(dataJson) {
		//应有权益
		var dueEquity = this.dueEquity(dataJson);
		//实际权益
		var actualEquity = this.actualEquity(dataJson);
		//差别
		var difference = Math.abs(dueEquity - actualEquity);
		return difference;
	},
	//%/（期间利润+还款本金）*100%
	percent: function(dataJson) {
		var percent = 0;
		//差别
		var difference = this.difference(dataJson);
		//期间利润
		var periodProfit = this.periodProfit(dataJson);
		//还款本金
		var refund = Number($("section .a_dd .problem ul li .right input").val());
		if (periodProfit + refund == 0) {
			return percent;
		} else {
			percent = this.tools.saveTowDecimal((difference / (periodProfit + refund)).toFixed(2) * 100,0);
			return percent;
		}
	},
	//小工具
	tools: {
		//保留整数
		//保留整数位
		toDecimal: function(x) {
			var f = parseFloat(x);
			if (isNaN(f)) {
				return;
			}
			//          f = Math.round(x*100)/100; /*改变保留小数点后几位（100=2,1000=3）*/
			f = Math.round(x, 0);
			return f;
		},
		//保留小数或者整数
		saveTowDecimal: function(x, a) {
			//a:为要保留的小数，0为保留整数
			//output输出值
			var output;
			//decimals:把a去整数
			var decimals = parseFloat(a);
			if (isNaN(x) && isNaN(decimals)) {
				return;
			} else if (decimals > 0) {
				//power次方值
				var power = Math.pow(10, decimals);
				output = Math.round(x * power) / power; /*改变保留小数点后几位（100=2,1000=3）*/
				return output;
			} else if (decimals == 0) {
				output = Math.round(x, 0);
				return output;
			}
		},
		//对秒数进行处理显示相对应的月、天，时，秒
		change_Second: function(second) {
			if (!second) {
				return 0;
			}
			var time = '';
			if (second >= 24 * 3600 * 30) {
				time += parseInt(second / (24 * 3600 * 30)); //月
				second %= 24 * 3600 * 30;
			}
			//		    if (second >= 24 * 3600) {
			//		       time += parseInt(second / (24 * 3600)) + '天';
			//		       second %= 24 * 3600;
			//		    }
			//		    if (second >= 3600) {
			//		       time += parseInt(second / 3600) + '小时';
			//		       second %= 3600;
			//		    }
			//		    if (second >= 60) {
			//		       time += parseInt(second / 60) + '分钟';
			//		       second %= 60;
			//		    }
			//		    if (second > 0) {
			//		       time += second + '秒';
			//		    }
			return time;
		}
	}
}