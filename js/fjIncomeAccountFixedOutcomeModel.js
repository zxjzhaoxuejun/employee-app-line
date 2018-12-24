/**
 * 损益表-固定支出
 * 1.支出分类
 * 2.对应月报表数据：fjIncomeAccountFixedOutcomeModel.fjIncomeAccountFixedOutcomes(type|date|amount|lineNo)
 */
var default_serialNo; //默认单号
var ModeAnswer; //损益表答案
var answerJson; //整个答案
var allDates; //所有月份
function loadFJIncomeAccountFixedOutcome(data) {
  var dict = data[0]; //整个字典数据
  console.log(dict);
  var b = dict.sysDicMap.fixedOutcomeDict; //标签分类type

  answerJson = jsonForm(data[1]); //整个答案
  console.log(answerJson);

  allDates = answerJson.bossIncomeAccountDates; //所有月份
  var ModeAnswer = answerJson.fjIncomeAccountFixedOutcomeModel; //固定开支模块
  var comeSum = ModeAnswer.fjIncomeAccountFixedOutcomeSummaries; //年总开支与合计
  var come = ModeAnswer.fjIncomeAccountFixedOutcomes; //各月份金额[type|date|amount|lineNo]

  if (answerJson.serialNo.serialNo != undefined) {
    default_serialNo = answerJson.serialNo.serialNo; //单号
  } else {
    default_serialNo = null;
  }

  createOutcomes(b); //根据字典初始化页面

  creatFixdeOutcomes(comeSum, come); //回显页面数据

  baseCtrl.baseInfo(); //点击事件集合
}

/**
 * 初始化渲染切换页签
 * @param {Object} b:下发字典页签数组
 */
function createOutcomes(b) {
  if (b.length > 0) {
    //有数据时
    //		var datajson=arrGroup(b,'lineNo',5);
    for (var i = 0; i < b.length; i++) {
      var tag = "";
      if (i == 0) {
        tag =
          '<span data-list="item' +
          i +
          '" class="bg" data-type="' +
          b[i].key +
          '">' +
          b[i].value +
          "</span>";
      } else {
        tag =
          '<span  data-list="item' +
          i +
          '" data-type="' +
          b[i].key +
          '">' +
          b[i].value +
          "</span>";
      }
      $(".tab-nav").append(tag);
      var typeNa = b[i].key;
      showMonthList(allDates, typeNa, i); //初始化月份表单
    }
  }
}

/**
 * 回显总开支与月金额
 * @param {Object} comeSum:总计Arr
 * @param {Object} come:表格数据 Arr
 */
function creatFixdeOutcomes(comeSum, come) {
  if (comeSum.length > 0) {
    for (var i = 0; i < comeSum.length; i++) {
      //年总开支
      if (comeSum[i].type == "yearTotal") {
        $(".yearTotal").val(comeSum[i].total);
      } else {
        //显示总计
        var tabCon = $(".tab-list .tab-con");
        for (var k = 0; k < tabCon.length; k++) {
          if (
            tabCon.eq(k).attr("data-type") == comeSum[i].type &&
            comeSum[i].total != "" &&
            comeSum[i].total != null
          ) {
            tabCon
              .eq(k)
              .children()
              .find("li input[class='sum_counts']")
              .val(comeSum[i].total);
          }
        }
      }
    }
  }

  //回显表格数据
  if (come.length > 0) {
    var datajson = arrGroup(come, "type", 9); //数据分类

    for (var i = 0; i < datajson.length; i++) {
      var tabs = $(".tab-list .tab-con"); //表格集合
      for (var k = 0; k < tabs.length; k++) {
        if (tabs.eq(k).attr("data-type") == datajson[i].type) {
          var details = datajson[i].data;
          var $thistab = tabs.eq(k).find("li");
          getEchoCome(details, $thistab);
        }
      }
    }
  }
}

/**
 * 回显不同type的表格
 * @param {Object} details:表格数据
 * @param {Object} $thistab:当前类型
 */
function getEchoCome(details, $thistab) {
  //回显表格
  if (details.length > 0) {
    var $liList = details; //报表集合
    for (var i = 0; i < $liList.length; i++) {
      var $li = $thistab;
      for (var k = 1; k < $li.length; k++) {
        if (
          $li
            .eq(k)
            .children("span")
            .text() == $liList[i].date
        ) {
          //排除下发为null的情况
          if ($liList[i].amount != null) {
            $li
              .eq(k)
              .children("input")
              .val($liList[i].amount);
          }
        }
      }
    }
  }
}

var baseCtrl = {
  baseInfo: function() {
    //动态校验表格数据
    $(document).on("keyup change", "input", function() {
      validateFun();
    });

    //动态计算表格总计
    $(document).on("keyup change", 'input[name="count"]', function() {
      var resu = []; //存放填写数据
      $(this)
        .parent()
        .parent()
        .find('li input[name="count"]')
        .each(function(i, v) {
          var x = Number($(v).val());
          resu.push(x);
        });
      resu = arrClean(resu); //除去空元素
      //	console.log(resu);
      $(this)
        .parent()
        .parent()
        .find("li input[class='sum_counts']")
        .val(toDecimal(arrSum(resu)));

      getAllCount(); //动态刷新年总开支
    });

    //动态切换
    $(document).on("click", ".tab-nav span", function() {
      $(".tab-nav span").removeClass("bg");
      $(this).addClass("bg");
      $(".tab-con").hide();
      $(".tab-con")
        .eq($(this).index())
        .show();
    });
  },
  getAllcomes: function() {
    //获取表格数据
    var tables = []; //表格数据
    var _sum = []; //合计
    var alltab = $(".tab-list .tab-con");
    for (var k = 0; k < alltab.length; k++) {
      var allLi = alltab.eq(k).find("li"); //当前type下li
      var typeVal = alltab.eq(k).attr("data-type");

      for (var i = 1; i < allLi.length - 1; i++) {
        var jsonList = {};
        jsonList["date"] = allLi
          .eq(i)
          .children("span")
          .text(); //日期
        if (
          allLi
            .eq(i)
            .children("input")
            .val() == ""
        ) {
          //金额
          jsonList["amount"] = null;
        } else {
          jsonList["amount"] = allLi
            .eq(i)
            .children("input")
            .val();
        }
        jsonList["lineNo"] = k + 1;
        jsonList["serialNo"] = default_serialNo;
        jsonList["type"] = typeVal;
        tables.push(jsonList);
      }
      var sumJson = {};
      sumJson["type"] = typeVal;
      sumJson["total"] = allLi
        .eq(allLi.length - 1)
        .children("input")
        .val();
      _sum.push(sumJson);
    }

    var yarJson = {};
    yarJson["type"] = "yearTotal";
    yarJson["total"] = $(".yearTotal").val();
    _sum.push(yarJson);

    var data = {
      fjIncomeAccountFixedOutcomeSummaries: _sum,
      fjIncomeAccountFixedOutcomes: tables
    };
    return data;
  }
};

//输入正则验证
function validateFun() {
  //校验方法
  var inputDom = $('input[name="count"]'); //表格
  var verifyResult = true; //校验的结果
  var bsMask = []; //切换页标志
  for (var i = 0; i < inputDom.length; i++) {
    //表格方面的校验
    var reg = /^(\d{0,10})$/; //0-10位的正整数
    var inputVal = $.trim(inputDom.eq(i).val());
    if (!reg.test(inputVal)) {
      console.log(
        "字段：" +
          inputDom
            .eq(i)
            .prev()
            .html() +
          "正则校验  >>>>>校验不通过"
      );
      inputDom
        .eq(i)
        .parent()
        .append($('<label class="verify-error">输入0-10位的正整数!</label>'));
      verifyResult = false;
      bsMask.push(
        inputDom
          .eq(i)
          .parent()
          .parent()
          .parent()
          .attr("data-list")
      );
    } else {
      if (
        inputDom
          .eq(i)
          .prev()
          .html() == undefined
      ) {
        console.log(
          "字段：" + inputDom.eq(i).val() + "正则校验  >>>>>校验通过"
        );
      } else {
        console.log(
          "字段：" +
            inputDom
              .eq(i)
              .prev()
              .html() +
            "金额正则校验  >>>>>校验通过"
        );
      }
    }
  }
  bsMask = aRR(bsMask); //给标签加上error-tab属性

  if (bsMask.length > 0) {
    $(".tab-nav span").each(function() {
      if (arrVal($(this).attr("data-list"), bsMask)) {
        $(this).addClass("error-tab");
      } else {
        $(this).removeClass("error-tab");
      }
    });
  } else {
    $(".tab-nav span").removeClass("error-tab");
  }
  console.log("校验结果：" + verifyResult);
  if (verifyResult) {
    $(".verify-error").remove();
  }
  return verifyResult;
}

//年总开支求和
function getAllCount() {
  var resu_all = [];
  $('input[name="count"]').each(function() {
    var x = Number($(this).val());
    resu_all.push(x);
  });
  resu_all = arrClean(resu_all);
  //	console.log(resu_all)
  $(".yearTotal").val(toDecimal(arrSum(resu_all)));
}

/**
 * 月份表渲染
 * @param {Object} allMonthArr:月份集合
 * @param {Object} type :类型
 * @param {Object} num
 */
function showMonthList(allMonthArr, type, num) {
  //  var numCount=0;
  var liHtml = "";
  for (var i = 0; i < allMonthArr.length; i++) {
    liHtml +=
      '<li><span name="date">' +
      allMonthArr[i].date +
      "</span>" +
      '<input name="count" type="number" value="0">' +
      "</li>";
  }
  var showMode = "";
  if (num == 0) {
    showMode = "display:block";
  } else {
    showMode = "display:none";
  }

  var html =
    '<div class="tab-con tab-income" style="' +
    showMode +
    '" data-list="item' +
    num +
    '" data-type="' +
    type +
    '">' +
    '<ul class="tab">' +
    '<li class="tab-title"><span>月份</span><span class="percentage">金额（元）</span></li>' +
    liHtml +
    '<li class="tab-title" style="margin-top:0;"><span>合计</span>' +
    '<input type="number" style="background: #f1f0f6;" value="0" class="sum_counts"  disabled="disabled"/>' +
    "</li></ul></div>";
  $(".tab-list").append(html);
}

/**
 * 提交函数
 * @param statue 安卓提供的状态值
 * true为手动提交，false为自动保存
 */
function submit(statue) {
  // 获取所有数据
  var submitArr = baseCtrl.getAllcomes();
  console.log(submitArr);

  var subJosn = {};
  answerJson.fjIncomeAccountFixedOutcomeModel = submitArr;
  subJosn = answerJson;

  var ValidityState = validateFun();
  androidDataSubmit(statue, subJosn, ValidityState);
}
