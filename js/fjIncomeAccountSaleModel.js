/**
 * 销售额模块
 * 1.淡旺季
 * 2.销售额
 */
var monthVal = []; //存放选择月份
var codeVal; //下拉选择值
var default_serialNo; //默认单号
var ModeAnswer; //销售额模块答案
var answerJson; //整个答案
function loadFJIncomeAccountSale(data) {
  answerJson = jsonForm(data[1]); //整个答案
  console.log(answerJson);
  var allDates = answerJson.bossIncomeAccountDates; //所有月份
  var ModeAnswer = answerJson.fjIncomeAccountSaleModel;
  var sale = ModeAnswer.fjIncomeAccountSale; //淡旺季数据
  var details = ModeAnswer.fjIncomeAccountSaleDetails; //销售额数据

  if (answerJson.serialNo.serialNo != undefined) {
    default_serialNo = answerJson.serialNo.serialNo; //单号
  } else {
    default_serialNo = null;
  }

  //显示月份表
  showMonthList(allDates);
  baseCtrl.baseInfo(); //点击事件集合
  createTurnover(sale, details); //显示页面数据
}

/**
 * 渲染月份列表
 * @param {Object} :allMonthArr 月份集合
 */
function showMonthList(allMonthArr) {
  var liHtml = "";
  for (var i = 0; i < allMonthArr.length; i++) {
    var isdata = allMonthArr[i].date;
    var xx = Number(isdata.substr(isdata.length - 2));
    liHtml +=
      '<li><span name="date">' +
      isdata +
      "</span>" +
      '<input name="amount" type="number" month=' +
      Number(isdata.substr(isdata.length - 2)) +
      ' value="0">' +
      "</li>";
  }

  var html =
    '<div class="tab-con tab-income" style="display:block" >' +
    '<ul class="tab">' +
    '<li class="tab-title"><span>月份</span><span class="percentage">金额（元）</span></li>' +
    liHtml +
    '<li class="tab-title" style="margin-top:0;"><span>合计</span>' +
    // '<span class="totalSale">0</span>';
    '<input type="number" style="background: #f1f0f6;" value="0" class="totalSale" disabled="disabled"/>' +
    "</li></ul></div>";
  $(".tab-list").append(html);
}

/**显示页面数据
 * @param {Object} sale:淡旺季数据
 * @param {Object} details:销售额
 */
function createTurnover(sale, details) {
  if (sale != null && sale != "") {
    //回显淡旺季
    for (var key in sale) {
      if (key == "totalSale" && key != null && sale != "") {
        $(".totalSale").val(toDecimal(sale[key])); //合计
      } else {
        for (var k = 0; k < $(".xs li").length; k++) {
          if (
            $(".xs li")
              .eq(k)
              .attr("name") == key &&
            sale[key] != null
          ) {
            var $li = $(".xs li")
              .eq(k)
              .children(".list-right");
            if ($li.children("span").length == 1) {
              $li
                .children("span")
                .text(sale[key])
                .css("color", "#191919");
              $li
                .prev()
                .children("i")
                .css("color", "#A0A0A5");
            } else if ($li.children("input").length == 1) {
              $li
                .children("input")
                .val(toDecimal(sale[key]))
                .css("color", "#191919");
              $li
                .prev()
                .children("i")
                .css("color", "#A0A0A5");
            }
          }
        }
      }
    }
  }

  //回显销售额报表
  if (details.length > 0) {
    var $liList = details; //报表集合
    for (var i = 0; i < $liList.length; i++) {
      var $li = $(".tab-con .tab li");
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
    //点击月份触发事件
    $(document).on("click", ".code-list01", function() {
      month_mask($(this));
    });

    //动态校验
    $(document).on("keyup change", "input", function() {
      crossValidate();
    });

    //动态计算销售总额与月均
    $(document).on("keyup change", 'input[name="amount"]', function() {
      getTotalSale(); //销售额合计
      getMonthlySale(); //计算月均销售
    });
  },

  getAllDates: function() {
    var _xs = {};
    _xs["busyMonthlySale"] = $(".avgwj").val(); //旺季月均
    _xs["slackMonthlySale"] = $(".avgdj").val(); //淡季月均
    _xs["totalSale"] = $(".totalSale").val(); //销售合计
    _xs["serialNo"] = default_serialNo; //单号

    if ($(".wj").text() != "" && $(".wj").text() != "请选择") {
      _xs["busySeason"] = $(".wj").text();
    } else {
      _xs["busySeason"] = null;
    }

    if ($(".dj").text() != "" && $(".dj").text() != "请选择") {
      _xs["slackSeason"] = $(".dj").text();
    } else {
      _xs["slackSeason"] = null;
    }

    var tables = []; //表格数据
    var allLi = $(".tab-con .tab li");
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
      jsonList["lineNo"] = 1;
      jsonList["serialNo"] = default_serialNo;
      tables.push(jsonList);
    }
    var data = {
      fjIncomeAccountSale: _xs,
      fjIncomeAccountSaleDetails: tables
    };
    return data;
  }
};

//月份选择事件
function month_mask(_this) {
  //月份弹层
  var mask = "";
  mask +=
    '<div class="month-mask"><div class="month-bg"></div><div class="month-list"><div class="mask-btn"><span class="month-cancel">取消</span>';
  mask +=
    '<span class="month-check">请选择月份（可多选）</span><span class="month-affirm">确认</span></div><ul>';
  for (var i = 1; i <= 12; i++) {
    mask += '<li name="' + i + '"><i></i>' + i + "月</li>";
  }
  mask += "</ul></div></div>";
  $(mask).appendTo("body");
  var _month = select_month(); //已选择的月份

  //回显示
  var _th;
  if (_this.text() != "请选择" || _this.text() != null) {
    _th = _this.text().split(",");
  }
  if (_th.length > 0) {
    var $li = $(".month-list ul li");
    for (var t = 0; t < $li.length; t++) {
      if (arrVal($li.eq(t).attr("name"), _th)) {
        $li
          .eq(t)
          .children("i")
          .addClass("active");
        $li.eq(t).css("color", "#A0A0A5");
      }
    }
  }
  var monthFull = [];
  var num = 0;
  //选择事件
  $(".month-list ul li").click(function() {
    monthFull.length = 0;
    if (
      $(this)
        .children("i")
        .hasClass("active")
    ) {
      //取消选中
      $(this)
        .children("i")
        .removeClass("active");
      $(this).css("color", "#191919");
      var ch_name = $(this).attr("name");
      for (var y = 0; y < 12; y++) {
        if (
          $(".month-list ul li")
            .eq(y)
            .children("i")
            .hasClass("active")
        ) {
          console.log(monthFull);
          if (
            !arrVal(
              $(".month-list ul li")
                .eq(y)
                .attr("name"),
              monthFull
            )
          ) {
            monthFull.push(
              $(".month-list ul li")
                .eq(y)
                .attr("name")
            );
            //						monthFull=arrVal_remove(ch_name,monthFull);
          }
        }
      }
      num++;
    } else {
      //选中
      var v = arrVal($(this).attr("name"), _month); //判断月份是否已经选择
      if (v) {
        $(".month-error").remove();
        $(this).append(
          '<label class="month-error">你选择的月份已经选了，请重新选择！</label>'
        );
      } else {
        $(".month-error").remove();
        $(this)
          .children("i")
          .addClass("active");
        $(this).css("color", "#A0A0A5");

        //循环得到选择月份
        for (var y = 0; y < 12; y++) {
          if (
            $(".month-list ul li")
              .eq(y)
              .children("i")
              .hasClass("active")
          ) {
            if (
              !arrVal(
                $(".month-list ul li")
                  .eq(y)
                  .attr("name"),
                monthFull
              )
            ) {
              monthFull.push(
                $(".month-list ul li")
                  .eq(y)
                  .attr("name")
              );
            }
          }
        }
      }
    }
  });
  $(".month-cancel").click(function() {
    //点击取消
    $(".month-mask").remove();
  });
  $(".month-affirm").click(function() {
    //点击确认按钮
    if (monthFull.length) {
      var check_m = "";
      monthFull.sort(function(x, y) {
        return x - y;
      });
      for (var j = 0; j < monthFull.length; j++) {
        check_m += monthFull[j] + ",";
      }
      check_m = check_m.substr(0, check_m.length - 1);

      //选中月份显示到页面
      _this.text(check_m).css("color", "#191919");
      _this
        .parent()
        .prev()
        .children("i")
        .css("color", "#A0A0A5");
    }
    getMonthlySale(); //调用月均销售函数
    $(".month-mask").remove(); //弹层隐藏
  });
}

//TODO销售额输入校验
function crossValidate() {
  var verifyResult = true; //校验的结果
  var reg = /^(\d{0,10})$/; //0-10位的正整数
  var inputDom = $('input[name="amount"]'); //表格
  var bsMask = []; //切换页标志

  $(".xs .month-rato").each(function() {
    //销售额校验
    if (!reg.test($(this).val())) {
      console.log(
        "字段：" +
          $(this)
            .parent()
            .prev()
            .children("i")
            .html() +
          "正则校验  >>>>>校验不通过"
      );
      $(this)
        .parent()
        .parent()
        .append($('<label class="verify-error">输入0-10位的正整数!</label>'));
      verifyResult = false;
    }
  });

  for (var i = 0; i < inputDom.length; i++) {
    //表格方面的校验
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
  //预期月份校验 end
}

//销售额总计
function getTotalSale() {
  var result = [];
  $('input[name="amount"]').each(function() {
    var x = Number($(this).val());
    result.push(x);
  });
  result = arrClean(result); //去空
  //    console.log(result)
  $(".totalSale").val(toDecimal(arrSum(result)));
}

/**
 * 计算月均销售1
 */
function getMonthlySale() {
  var busyMon = []; //存已选的旺季月份
  var slackMonArr = []; //存已选的淡季月份

  if ($(".wj").text() != "" || $(".wj").text() != null) {
    //旺季
    var wj_month = $(".wj").text();
    busyMon = arrClean(wj_month.split(","));
    if (busyMon != "请选择" && busyMon.length > 0) {
      var busyMonthlySale = getSale_age(busyMon); //旺季月均销售
      if (busyMonthlySale != 0) {
        $(".avgwj").val(busyMonthlySale);
        $(".avgwj")
          .parent()
          .parent()
          .children(".list-left")
          .children("i")
          .css("color", "#A0A0A5");
        $(".avgwj")
          .parent()
          .parent()
          .children(".list-right")
          .children("input")
          .css("color", "#191919");
      } else {
        //样式与月均初始化
        $(".avgwj").val(0);
        $(".avgwj")
          .parent()
          .parent()
          .children(".list-left")
          .children("i")
          .css("color", "#191919");
        $(".avgwj")
          .parent()
          .parent()
          .children(".list-right")
          .children("input")
          .css("color", "#A0A0A5");
      }
    } else {
      //样式与月均初始化
      $(".avgwj").val(0);
      $(".avgwj")
        .parent()
        .parent()
        .children(".list-left")
        .children("i")
        .css("color", "#191919");
      $(".avgwj")
        .parent()
        .parent()
        .children(".list-right")
        .children("input")
        .css("color", "#A0A0A5");
    }
  }

  if ($(".dj").text() != null || $(".dj").text() != "") {
    //淡季
    var dj_month = $(".dj").text();
    slackMon = arrClean(dj_month.split(","));
    if (slackMon != "请选择" && slackMon.length > 0) {
      var slackMonthlySale = getSale_age(slackMon); //淡季月均销售
      if (slackMonthlySale != 0) {
        $(".avgdj").val(slackMonthlySale);
        $(".avgdj")
          .parent()
          .parent()
          .children(".list-left")
          .children("i")
          .css("color", "#A0A0A5");
        $(".avgdj")
          .parent()
          .parent()
          .children(".list-right")
          .children("input")
          .css("color", "#191919");
      } else {
        //样式与月均初始化
        $(".avgdj").val(0);
        $(".avgdj")
          .parent()
          .parent()
          .children(".list-left")
          .children("i")
          .css("color", "#191919");
        $(".avgdj")
          .parent()
          .parent()
          .children(".list-right")
          .children("input")
          .css("color", "#A0A0A5");
      }
    } else {
      //样式与月均初始化
      $(".avgdj").val(0);
      $(".avgdj")
        .parent()
        .parent()
        .children(".list-left")
        .children("i")
        .css("color", "#191919");
      $(".avgdj")
        .parent()
        .parent()
        .children(".list-right")
        .children("input")
        .css("color", "#A0A0A5");
    }
  }
}

/**
 * 分季月均1_2
 * @param:monthArr:月份数组集
 */
function getSale_age(monthArr) {
  var saleArr = []; //金额数组
  if (monthArr.length > 0) {
    for (var i = 0; i < monthArr.length; i++) {
      var allLi = $(".tab-con .tab li");
      for (var k = 1; k < allLi.length; k++) {
        if (
          allLi
            .eq(k)
            .children("input")
            .attr("month") == monthArr[i]
        ) {
          saleArr.push(
            Number(
              allLi
                .eq(k)
                .children("input")
                .val()
            )
          );
        }
      }
    }
    var saleVal = arrSum(arrClean(saleArr));
    var aver_age = toDecimal(saleVal / monthArr.length);
    return aver_age;
  }
}

//已选月份
function select_month() {
  var _month = []; //已选的月份
  var wj = []; //存已选的旺季月份
  var dj = []; //存已选的淡季月份
  var wj_month;
  if ($(".wj").text() != "" || $(".wj").text() != null) {
    //旺季
    wj_month = $(".wj").text();
    wj = wj_month.split(",");
  }
  var dj_month;
  if ($(".dj").text() != null || $(".dj").text() != "") {
    //淡季
    dj_month = $(".dj").text();
    dj = dj_month.split(",");
  }
  _month = _month.concat(wj);
  _month = _month.concat(dj);
  _month = arrClean(_month);
  return _month;
}

/**
 * 提交函数
 * @param statue 安卓提供的状态值
 * true为手动提交，false为自动保存
 */
function submit(statue) {
  var submitArr = baseCtrl.getAllDates();
  console.log(submitArr);
  var subJosn = {};
  answerJson.fjIncomeAccountSaleModel = submitArr;
  subJosn = answerJson;

  var ValidityState = crossValidate();
  androidDataSubmit(statue, subJosn, ValidityState);
}
