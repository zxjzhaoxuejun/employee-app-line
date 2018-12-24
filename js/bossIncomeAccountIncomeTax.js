var arrTab = []; //损益表所得税
var arrLen = []; //存储行号用来判断页签的个数；
var Y_month = ''; //预期月份
var default_serialNo;
var ModeAnswer;
var answerJson; //整个答案
function loadBossIncomeAccountIncomeTax(data) {
  answerJson = jsonForm(data[1]);
  ModeAnswer = answerJson.bossIncomeAccountModel; //损益表模块答案
  var c = answerJson.bossIncomeAccountModel.bossIncomeAccountIncomes; //损益表收入
  if (answerJson.bossIncomeAccountModel.bossIncomeAccountIncomes == null) {
    c = [];
  }
  var c0 = answerJson.bossIncomeAccountModel.bossIncomeAccountVariableCosts; //损益表可变成本
  var c1 = answerJson.bossIncomeAccountModel.bossIncomeAccountFixedOutcomes; //损益表固定支出
  var c2 = answerJson.bossIncomeAccountModel.bossIncomeAccountOthers; //损益表其他
  var c3 = answerJson.bossIncomeAccountModel.bossIncomeAccountSummaries; //损益表所得税
  if (answerJson.bossIncomeAccountModel.bossIncomeAccountSummaries == null) {
    c3 = [];
  }
  var c4 = answerJson.bossIncomeAccountModel.bossIncomeAccountTurnoverResources; //损益表利润
  var dateVal = answerJson.bossIncomeAccountDates; //日期
  for (var i = 0; i < c.length; i++) {
    if (c[i].type == 2 && c[i].lineNo == 2) {
      if (c[i].date != undefined && c[i].date != null&&c[i].date != "undefined") {
        Y_month = c[i].date;
      }
    }
  }
  if (answerJson.serialNo.serialNo != undefined) {
    default_serialNo = answerJson.serialNo.serialNo; //单号
  } else {
    default_serialNo = null;
  }
  createSummaries(c3, dateVal); //生成页面
}
var dateAll = [];
function createSummaries(b, dateVal) {
  $('<section></section>').appendTo('body');
  $(
    '<footer id="next" onclick="submit(true);"><p>确定</p></footer>'
  ).insertAfter('section');
  //收入头部
  var IncomesHtml = '';
  IncomesHtml +=
    '<div class="cr-title"><p class="t-tile mode-defule">所得税</p></div>';
  $(IncomesHtml).appendTo('section');

  //收入表格
  var tabList = '';
  tabList += '<div class="tab-list"><div class="tab-nav"></div>';
  tabList += '<div class="tab-con tab-income">';
  tabList +=
    '<ul class="tab"><li class="tab-title"><span>月份</span><span class="percentage">所得税（元）</span></li>';
  for (var t = 0; t < dateVal.length; t++) {
    tabList +=
      '<li><span name="date">' +
      dateVal[t].date +
      '</span><input name="amount" class="money-layout" type="number" value="0"></li>';
  }
  tabList += '</ul><ul class="yq-month"></ul></div></div>';
  $(tabList).appendTo('section');
  $(
    '<li class="average"><span>周期内平均</span><span class="avg-span">12</span></li>'
  ).appendTo('.tab');
  $(
    '<li class="tab-title"><span>预期代表月份</span><span class="percentage">所得税（元）</span></li>'
  ).appendTo('.yq-month');
  if (Y_month == null || Y_month == '') {
    $(
      '<li><input type="text" name="date" disabled="disabled" class="no-month" value="' +
        Y_month +
        '"><input name="amount" type="number"  class="money-layout" value="" disabled="disabled"></li>'
    ).appendTo('.yq-month');
  } else {
    $(
      '<li><input type="text" name="date" disabled="disabled" class="no-month" value="' +
        Y_month +
        '"><input name="amount" type="number" class="money-layout"  value=""></li>'
    ).appendTo('.yq-month');
  }

  //2017-07-31新增加，老客户重贷
  for (var h = 0; h < dateVal.length; h++) {
    dateAll.push(dateVal[h].date);
  }
  var numCount = 0;
  /*******2017-07-31新增加，老客户重贷 end******/

  if (b.length > 0) {
    for (var i = 0; i < b.length; i++) {
      if (b[i].type == 5) {
        //2017-07-31新增加，老客户重贷
        if (!arrVal(b[i].date, dateAll)) {
          //判断月份是否在区间内
          numCount++;
          b[i].date = dateAll[12 - numCount];
          b[i].amount = 0;
        }
        /*******2017-07-31新增加，老客户重贷 end******/
        if (b[i].otherType == 1) {
          var $li = $('.tab li');
          for (var k = 1; k < $li.length - 1; k++) {
            if (
              $li
                .eq(k)
                .children('span')
                .text() == b[i].date
            ) {
              $li
                .eq(k)
                .children('input')
                .val(toDecimal(b[i].amount));
            }
          }
        } else if (b[i].otherType == 2) {
          $('.yq-month li')
            .eq(1)
            .children('input')
            .eq(1)
            .val(toDecimal(b[i].amount));
        }
        arrTab.push(b[i]);
      }
      //
    }
  }

  $('.yq-month input')
    .eq(1)
    .on('change keyup', function() {
      //预期月份校验
      var twoNum = parseFloat(
        $('.yq-month input')
          .eq(1)
          .val()
      );
      if (isNaN(twoNum)) {
        //		                return;
      } else {
        if (typeof twoNum == 'number') {
          var reg = /^[+\-]?\d+$/;
          if (reg.test(twoNum)) {
            //				alert(1);//是整数
            if (
              $('.yq-month input')
                .eq(1)
                .val().length > 10
            ) {
              console.log(
                '字段：' +
                  $('.yq-month input')
                    .eq(1)
                    .prev()
                    .html() +
                  '正则校验  >>>>>校验不通过'
              );
              $('.yq-month input')
                .eq(1)
                .parent()
                .append(
                  $('<label class="verify-error">输入数据不能大于10位!</label>')
                );
              stateResult = false;
            } else if (
              $('.yq-month input')
                .eq(1)
                .val() < 0
            ) {
              console.log(
                '字段：' +
                  $('.yq-month input')
                    .eq(1)
                    .prev()
                    .html() +
                  '正则校验  >>>>>校验不通过'
              );
              $('.yq-month input')
                .eq(1)
                .parent()
                .append(
                  $('<label class="verify-error">输入值不能为负数！</label>')
                );
              stateResult = false;
            } else {
              $(this)
                .siblings('.verify-error')
                .remove();
              if (
                $('.yq-month input')
                  .eq(1)
                  .prev()
                  .html() == undefined
              ) {
                console.log(
                  '字段：' +
                    $('.yq-month input')
                      .eq(1)
                      .val() +
                    '正则校验  >>>>>校验通过'
                );
              } else {
                console.log(
                  '字段：' +
                    $('.yq-month input')
                      .eq(1)
                      .prev()
                      .html() +
                    '正则校验  >>>>>校验通过'
                );
              }
              stateResult = true;
            }
          } else {
            console.log(
              '字段：' +
                $('.yq-month input')
                  .eq(1)
                  .prev()
                  .html() +
                '正则校验  >>>>>校验不通过'
            );
            $('.yq-month input')
              .eq(1)
              .parent()
              .append($('<label class="verify-error">不能输入小数！</label>'));
            stateResult = false;
          }
        }
      }
    });
  ////预期月份校验

  //动态计算周期内均值
  $('.money-layout').on('change keyup', function() {
    //	var _this=$(this);
    //	MoneyPromptText(_this);//个、十、百单位提示
    //	MoneyPromptNum(_this);//逗号数字分割
    average();
  });
  $(function() {
    //默认初始周期内均值
    var sum = 0;
    for (var i = 0; i < $('.tab li input').length; i++) {
      sum += Number(
        $('.tab li input')
          .eq(i)
          .val()
      );
    }
    sum = sum / $('.tab li input').length;
    sum = toDecimal(sum); //保留小数点后两位
    $('.avg-span').text(sum);
  });
  Input_change();
}

function average() {
  //周期内均值
  var sum = 0;
  $('.tab li input').each(function() {
    for (var i = 0; i < $(this).length; i++) {
      sum += Number(
        $(this)
          .eq(i)
          .val()
      );
    }
  });
  sum = sum / $('.tab li input').length;
  sum = toDecimal(sum); //保留小数点后两位
  $('.avg-span').text(sum);
  return sum;
}

function Input_change() {
  $('.tab-income input').on('change keyup', function() {
    var $li = $('.tab li');
    //		console.log(arrTab.length)
    if (arrTab.length == 0) {
      //		alert(1)
      for (var i = 1; i < $li.length - 1; i++) {
        var _json = {};
        _json['date'] = $li
          .eq(i)
          .children('span')
          .text();
        _json['amount'] = $li
          .eq(i)
          .children('input')
          .val();
        _json['type'] = '5';
        _json['otherType'] = '1';
        _json['lineNo'] = 1;
        _json['serialNo'] = default_serialNo;
        arrTab.push(_json);
      }
      var _json1 = {};
      _json1['date'] = $('.yq-month li')
        .eq(1)
        .children('input')
        .eq(0)
        .val();
      _json1['amount'] = $('.yq-month li')
        .eq(1)
        .children('input')
        .eq(1)
        .val();
      _json1['type'] = '5';
      _json1['otherType'] = '2';
      _json1['lineNo'] = 1;
      _json1['serialNo'] = default_serialNo;
      arrTab.push(_json1);
      console.log(arrTab);
    } else {
      valInTo($li);
    }
  });
}

function valInTo($li) {
  //预期月份
  for (var t = 0; t < arrTab.length; t++) {
    if (arrTab[t].otherType == 1 && arrTab[t].type == 5) {
      for (var i = 1; i < $li.length - 1; i++) {
        if (
          $li
            .eq(i)
            .children('span')
            .text() == arrTab[t].date
        ) {
          arrTab[t].amount = $li
            .eq(i)
            .children('input')
            .val();
        }
      }
    }
    if (arrTab[t].otherType == 2 && arrTab[t].type == 5) {
      arrTab[t].amount = $('.yq-month li')
        .eq(1)
        .children('input')
        .eq(1)
        .val();
      arrTab[t].date = $('.yq-month li')
        .eq(1)
        .children('input')
        .eq(0)
        .val();
    }
  }
}

function submit(_hl) {
  var subJosn = {};
  var $li = $('.tab li');
  valInTo($li);
  //subJosn["bossIncomeAccountModel"] = {
  //			"bossIncomeAccountSummaries" : [],
  //	};
  //subJosn["bossIncomeAccountModel"]["bossIncomeAccountSummaries"]=arrTab;
  ModeAnswer.bossIncomeAccountSummaries = arrTab;
  console.log(arrTab);

  answerJson.bossIncomeAccountModel = ModeAnswer;
  subJosn = answerJson;
  subJosn['completeStatus'] = 2;
  subJosn = JSON.stringify(subJosn);
  //TODO
  if (_hl) {
    if (verifyFunction()) {
      console.log('校验结果：通过');
      AndroidJs.saveWjDetalAnswer(subJosn, true);
    } else {
      AndroidJs.saveWjDetalAnswer(subJosn, false);
    }
  } else {
    AndroidJs.saveWjDetalAnswer(subJosn, false);
  }
  //AndroidJs.saveWjDetalAnswer(subJosn);
}
