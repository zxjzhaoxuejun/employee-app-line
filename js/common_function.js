//保留整数位
function toDecimal(x) {
  var f = parseFloat(x);
  if (isNaN(f)) {
    return;
  }
  //          f = Math.round(x*100)/100; /*改变保留小数点后几位（100=2,1000=3）*/
  f = Math.round(x, 0);
  return f;
}

//保留小数点后两位
function twoDecimal(x) {
  var f = parseFloat(x);
  if (isNaN(f)) {
    return;
  }
  f = Math.round(x * 100) / 100; /*改变保留小数点后几位（100=2,1000=3）*/
  //          f = Math.round(x,0);
  return f;
}

//保留小数点后1位
function oneDecimal(x) {
  var f = parseFloat(x);
  if (isNaN(f)) {
    return;
  }
  f = Math.round(x * 10) / 10; /*改变保留小数点后几位（100=2,1000=3）*/
  //          f = Math.round(x,0);
  return f;
}

// 在数组中查找最大值
function arrayMax(arrs) {
  var max = arrs[0];
  var ilen = arrs.length;
  for (var i = 1; i < ilen; i++) {
    if (arrs[i] > max) {
      max = arrs[i];
    }
  }
  return max;
}

function foce_blur() {
  //输入时添加下划线
  $(".con-list li input").on("focus", function() {
    $(this)
      .parent()
      .parent()
      .css("border-bottom", "0.04rem #faaa28 solid");
  });
  $(".con-list li input").on("blur", function() {
    $(".rato-error").remove();
    $(this)
      .parent()
      .parent()
      .css("border-bottom", "0.04rem #e6e6eb solid");
    $(this)
      .parent()
      .parent()
      .children(".list-left")
      .children("i")
      .css("color", "#A0A0A5");
    $(this)
      .parent()
      .parent()
      .children(".list-right")
      .children("input")
      .css("color", "#191919");
    if ($(this).hasClass("salePrice") || $(this).hasClass("enterPrice")) {
      //保留两位小数
      var twoNum = parseFloat(
        $(this)
          .parent()
          .parent()
          .children(".list-right")
          .children("input")
          .val()
      );
      if (isNaN(twoNum)) {
        return;
      } else {
        //		alert(typeof(twoNum));
        if (typeof twoNum == "number") {
          var reg = /^\d{1,9}(?:\.\d{1,2})?$/;
          if (reg.test(twoNum)) {
            //				alert(1);//是2位小数
            $(".month-error").remove();
          } else {
            //不是2位小数
            if (twoNum < 0) {
              $(this)
                .parent()
                .parent()
                .append('<label class="month-error">请输入正数！</label>');
              submitBtn = false;
              return false;
            } else if (twoNum.toString().length > 10) {
              $(this)
                .parent()
                .parent()
                .append(
                  '<label class="month-error">输入的数不能大于10位！</label>'
                );
              submitBtn = false;
              return false;
            } else {
              $(this)
                .parent()
                .parent()
                .append('<label class="month-error">只能输入2位小数！</label>');
              submitBtn = false;
              return false;
            }
          }
          submitBtn = true;
        }
      }
    } else if (
      $(this).hasClass("comprehensiveGrossProfitRate") ||
      $(this).hasClass("kd_saleRatio")
    ) {
      //保留1位小数
      var twoNum = parseFloat(
        $(this)
          .parent()
          .parent()
          .children(".list-right")
          .children("input")
          .val()
      );
      if (isNaN(twoNum)) {
        return;
      } else {
        //		alert(typeof(twoNum));
        if (typeof twoNum == "number") {
          var reg = /^\d{1,9}(?:\.\d{0,1})?$/;
          if (reg.test(twoNum)) {
            $(".month-error").remove();
          } else {
            //不是2位小数
            if (twoNum < 0) {
              $(this)
                .parent()
                .parent()
                .append('<label class="month-error">请输入正数！</label>');
              submitBtn = false;
              return false;
            } else if (twoNum.toString().length > 10) {
              $(this)
                .parent()
                .parent()
                .append(
                  '<label class="month-error">输入的数不能大于10位！</label>'
                );
              submitBtn = false;
              return false;
            } else {
              $(this)
                .parent()
                .parent()
                .append('<label class="month-error">只能输入1位小数！</label>');
              submitBtn = false;
              return false;
            }
          }
          submitBtn = true;
        }
      }
    } else {
      var twoNum = parseFloat(
        $(this)
          .parent()
          .parent()
          .children(".list-right")
          .children("input")
          .val()
      );
      if (isNaN(twoNum)) {
        return;
      } else {
        //		alert(typeof(twoNum));
        if (typeof twoNum == "number") {
          var reg = /^[+\-]?\d+$/;
          if (reg.test(twoNum)) {
            //				alert(1);//是整数
            $(".month-error").remove();
            if (twoNum < 0) {
              $(this)
                .parent()
                .parent()
                .append('<label class="month-error">请输入正数！</label>');
              submitBtn = false;
              return false;
            }
            if (twoNum.toString().length > 10) {
              $(this)
                .parent()
                .parent()
                .append(
                  '<label class="month-error">输入的数不能大于10位！</label>'
                );
              submitBtn = false;
              return false;
            }
          } else {
            //不是整数
            $(this)
              .parent()
              .parent()
              .append('<label class="month-error">请输入整数！</label>');
            submitBtn = false;
            return false;
          }
        }
        submitBtn = true;
      }
    }
    //	$(this).parent().parent().children('.list-right').children('input').val(twoNum);
  });
  $(".otherResource input").on("focus", function() {
    $(this)
      .parent()
      .css("border-bottom", "0.04rem #faaa28 solid");
  });
  $(".otherResource input").on("blur", function() {
    $(this)
      .parent()
      .css("border-bottom", "0.04rem #e6e6eb solid");
    $(this)
      .parent()
      .children("span")
      .css("color", "#A0A0A5");
    $(this)
      .parent()
      .children("input")
      .css("color", "#191919");
  });
  $(".summation-right input").on("focus", function() {
    $(this)
      .parent()
      .parent()
      .css("border-bottom", "0.04rem #faaa28 solid");
  });
  $(".summation-right input").on("blur", function() {
    $(this)
      .parent()
      .parent()
      .css("border-bottom", "0.04rem #e6e6eb solid");
    if ($(this).val() != "" && $(this).val() != 0) {
      $(this)
        .parent()
        .prev()
        .children("span")
        .css("color", "#A0A0A5");
      $(this).css("color", "#191919");
    }
  });
}

function arrVal(val, arr) {
  //判断某个元素是否在数组中
  for (var i = 0; i < arr.length; i++) {
    if (val == arr[i]) {
      return true;
    }
  }
}

function arrVal_remove(val, arr) {
  //判断某个元素是否在数组中并删除此元素
  for (var i = 0; i < arr.length; i++) {
    if (val == arr[i]) {
      arr.splice(i, 1);
      return arr;
    }
  }
}

function split_str(str, num) {
  //按照某规则截取,str为传入的被截字符串，num为选择返回哪一种类型（字符长度，数组）
  var st = str.split(",");
  var strLen = st.length;
  if (num == 1) {
    return strLen; //返回数组长度
  }
  if (num == 2) {
    return st; //返回截取后生成的数组
  }
}

//去除数组重复元素
function aRR(arr) {
  var temp = {};
  for (var i = 0; i < arr.length; i++) temp[arr[i]] = true;
  var r = [];
  for (var k in temp) r.push(k);
  return r;
}

function repeatObject(arr) {
  //去除数组中重复对象
  var unique = {};
  arr.forEach(function(a) {
    unique[JSON.stringify(a)] = 1;
  });
  arr = Object.keys(unique).map(function(u) {
    return JSON.parse(u);
  });
  return arr;
}

function arrClean(arr) {
  //清除数组中的空元素
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == "" || arr[i] == undefined) {
      arr.splice(i, 1);
      i--;
    }
  }
  return arr;
}

function cutString(str, len) {
  //截取字符串长度，超过的用“...”
  var s;
  if (str != null) {
    if (str.length > len) {
      s = str.substr(0, len) + "...";
    } else {
      s = str;
    }
  }
  return s;
}

function verifyFunction() {
  //校验方法
  var inputLen = $(".tab input").length; //表格
  //	var conListLen=$('.con-list ul li input').length;
  //	var conListInupt=$('.con-list ul li input');
  var verifyResult = true; //校验的结果
  //	if($('.tab-list .right-code').html()!=undefined){//营业额数据来源
  //		if($('.tab-list .right-code').html()=='请选择'){
  //			console.log('字段：'+$('.tab-list .right-code').prev().text()+'正则校验  >>>>>校验不通过');
  //			$('.tab-list .right-code').parent().append($('<label class="verify-error">输入数据不能为空!</label>'));
  //			verifyResult=false;
  //			return false;
  //		}
  //
  //  }

  if ($(".xs-type").css("display") != "none") {
    //销售模式不隐藏时校验
    var conListLen = $(".xs-type .con-list ul li input").length;
    var conListInupt = $(".xs-type .con-list ul li input");
    var $type = $(".xs-type");
    tableType(conListLen, conListInupt, $type, 1);
  }

  if ($(".pro-type").css("display") != "none") {
    //产品不隐藏时校验
    var conListLen = $(".pro-type .con-list ul li input").length;
    var conListInupt = $(".pro-type .con-list ul li input");
    var $type = $(".pro-type");
    tableType(conListLen, conListInupt, $type, 2);
  }

  if ($(".buckle-btn").css("display") != "none") {
    //商品扣成不隐藏时校验
    var conListLen = $(".buckle-btn .con-list ul li input").length;
    var conListInupt = $(".buckle-btn .con-list ul li input");
    var $type = $(".buckle-btn");
    tableType(conListLen, conListInupt, $type, 1);
  }
  if ($(".cp-list").css("display") != "none") {
    //产品描述不隐藏时校验
    var conListLen = $(".cp-list .con-list ul li input").length;
    var conListInupt = $(".cp-list .con-list ul li input");
    var $type = $(".cp-list");
    tableType(conListLen, conListInupt, $type, 2);
  }
  if ($(".otherResource").css("display") != "none") {
    if (
      $(".otherResource input").val() == "" ||
      $(".otherResource input").val() == "请输入"
    ) {
      $(".otherResource input")
        .parent()
        .append(
          $(
            '<label class="verify-error verify-height">输入数据不能为空!</label>'
          )
        );
      verifyResult = false;
      return false;
    }
  }
  if (
    $(".tab-income p input").val() == " " ||
    $(".tab-income p input").val() == "请输入"
  ) {
    $(".tab-income p input")
      .parent()
      .append(
        $('<label class="verify-error verify-height">输入数据不能为空!</label>')
      );
    verifyResult = false;
    return false;
  }

  if (
    $(".tab-income p .income-account").text() == " " ||
    $(".tab-income p .income-account").text() == "请选择"
  ) {
    $(".tab-income p .income-account")
      .parent()
      .append(
        $('<label class="verify-error verify-height">输入数据不能为空!</label>')
      );
    verifyResult = false;
    return false;
  }

  for (var i = 0; i < inputLen; i++) {
    //表格方面的校验
    //		alert($('.tab-list input').eq(i).val())
    console.log(
      $(".tab input")
        .eq(i)
        .css("display")
    );
    if (
      $(".tab input")
        .eq(i)
        .css("display") != "none"
    ) {
      if (
        $(".tab input")
          .eq(i)
          .val() == " " ||
        $(".tab input")
          .eq(i)
          .val() == ""
      ) {
        if (
          $(".tab input")
            .eq(i)
            .prev()
            .html() == undefined
        ) {
          console.log(
            "字段：" +
              $(".tab input")
                .eq(i)
                .val() +
              "正则校验  >>>>>校验不通过"
          );
          //					$('.tab input').eq(i).parent().append($('<label class="verify-error">输入数据不能为空!</label>'));
        } else {
          console.log(
            "字段：" +
              $(".tab input")
                .eq(i)
                .prev()
                .html() +
              "正则校验  >>>>>校验不通过"
          );
          //					$('.tab input').eq(i).parent().append($('<label class="verify-error">输入数据不能为空!</label>'));
        }
        //				verifyResult=false;
      } else {
        //				console.log($('.tab input').eq(i).attr('disabled'))
        if (
          $(".tab input")
            .eq(i)
            .attr("disabled") != "disabled"
        ) {
          var twoNum = parseFloat(
            $(".tab input")
              .eq(i)
              .val()
          );
          if (isNaN(twoNum)) {
            //		                return;
          } else {
            if (typeof twoNum == "number") {
              var reg = /^[+\-]?\d+$/;
              if (reg.test(twoNum)) {
                //				alert(1);//是整数
                if (
                  $(".tab input")
                    .eq(i)
                    .val().length > 10
                ) {
                  console.log(
                    "字段：" +
                      $(".tab input")
                        .eq(i)
                        .prev()
                        .html() +
                      "正则校验  >>>>>校验不通过"
                  );
                  $(".tab input")
                    .eq(i)
                    .parent()
                    .append(
                      $(
                        '<label class="verify-error">输入数据不能大于10位!</label>'
                      )
                    );
                  verifyResult = false;
                } else if (
                  $(".tab input")
                    .eq(i)
                    .val() < 0
                ) {
                  console.log(
                    "字段：" +
                      $(".tab input")
                        .eq(i)
                        .prev()
                        .html() +
                      "正则校验  >>>>>校验不通过"
                  );
                  $(".tab input")
                    .eq(i)
                    .parent()
                    .append(
                      $(
                        '<label class="verify-error">输入值不能为负数！</label>'
                      )
                    );
                  verifyResult = false;
                } else {
                  if (
                    $(".tab input")
                      .eq(i)
                      .prev()
                      .html() == undefined
                  ) {
                    console.log(
                      "字段：" +
                        $(".tab input")
                          .eq(i)
                          .val() +
                        "正则校验  >>>>>校验通过"
                    );
                  } else {
                    console.log(
                      "字段：" +
                        $(".tab input")
                          .eq(i)
                          .prev()
                          .html() +
                        "正则校验  >>>>>校验通过"
                    );
                  }
                }
              } else {
                console.log(
                  "字段：" +
                    $(".tab input")
                      .eq(i)
                      .prev()
                      .html() +
                    "正则校验  >>>>>校验不通过"
                );
                $(".tab input")
                  .eq(i)
                  .parent()
                  .append(
                    $('<label class="verify-error">不能输入小数！</label>')
                  );
                verifyResult = false;
              }
            }
          }
        }
      }
    }
  }

  var yq_val = 0;
  if (
    $(".yq-month li")
      .eq(1)
      .children("input")
      .eq(1)
      .attr("disabled") != "disabled"
  ) {
    yq_val = $(".yq-month li")
      .eq(1)
      .children("input")
      .eq(1)
      .val();
  }
  if (yq_val == "") {
    yq_val = 0;
  }
  if (isNaN(yq_val)) {
    //		                return;
  } else {
    var reg = /^[+\-]?\d+$/;
    if (reg.test(yq_val)) {
      //				alert(1);//是整数
      if (yq_val.length > 10) {
        console.log(
          "字段：" +
            $(".yq-month li")
              .eq(1)
              .children("input")
              .eq(1)
              .prev()
              .html() +
            "正则校验  >>>>>校验不通过"
        );
        $(".yq-month li")
          .eq(1)
          .children("input")
          .eq(1)
          .parent()
          .append(
            $('<label class="verify-error">输入数据不能大于10位!</label>')
          );
        verifyResult = false;
      } else if (yq_val < 0) {
        console.log(
          "字段：" +
            $(".yq-month li")
              .eq(1)
              .children("input")
              .eq(1)
              .prev()
              .html() +
            "正则校验  >>>>>校验不通过"
        );
        $(".yq-month li")
          .eq(1)
          .children("input")
          .eq(1)
          .parent()
          .append($('<label class="verify-error">输入值不能为负数！</label>'));
        verifyResult = false;
      } else {
        if (yq_val == undefined) {
          console.log(
            "字段：" +
              $(".yq-month li")
                .eq(1)
                .children("input")
                .eq(1)
                .val() +
              "正则校验  >>>>>校验通过"
          );
        } else {
          console.log(
            "字段：" +
              $(".yq-month li")
                .eq(1)
                .children("input")
                .eq(1)
                .prev()
                .html() +
              "正则校验  >>>>>校验通过"
          );
        }
      }
    } else {
      console.log(
        "字段：" +
          $(".yq-month li")
            .eq(1)
            .children("input")
            .eq(1)
            .prev()
            .html() +
          "正则校验  >>>>>校验不通过"
      );
      $(".yq-month li")
        .eq(1)
        .children("input")
        .eq(1)
        .parent()
        .append($('<label class="verify-error">不能输入小数！</label>'));
      verifyResult = false;
    }

    //						}
  }

  //	alert(conListLen)
  function tableType(conListLen, conListInupt, $type, $num) {
    if (conListLen > 0) {
      if ($type.css("display") != "none") {
        if ($(".buckle-btn").css("display") == "none") {
        } else {
          //		$('.verify-error').remove();
          if ($num == 1) {
            if (
              $(".code-list").text() == "请选择" ||
              $(".code-list").text() == ""
            ) {
              console.log(
                "字段：" +
                  $(".code-list")
                    .parent()
                    .prev()
                    .children("i")
                    .text() +
                  "正则校验  >>>>>校验不通过"
              );
              $(".code-list")
                .parent()
                .parent()
                .append(
                  $('<label class="verify-error">输入数据不能为空!</label>')
                );
              verifyResult = false;
              return false;
            }
          }
        }
        //		}
        for (var j = 0; j < conListLen; j++) {
          if (conListInupt.eq(j).css("display") != "none") {
            if (
              conListInupt.eq(j).val() == "" ||
              conListInupt.eq(j).val() == " " ||
              conListInupt.eq(j).val() == "请输入"
            ) {
              if (conListInupt.eq(j).attr("disabled") != "disabled") {
                var verifyField = conListInupt
                  .eq(j)
                  .parent()
                  .prev()
                  .find("i")
                  .html(); //校验字段
                if (verifyField != undefined) {
                  console.log(
                    "字段：" + verifyField + "正则校验  >>>>>校验不通过"
                  );
                  conListInupt
                    .eq(j)
                    .parent()
                    .parent()
                    .append(
                      '<label class="verify-error">输入' +
                        verifyField +
                        "不能为空!</label>"
                    );
                } else {
                  console.log("字段：正则校验  >>>>>校验不通过");
                  conListInupt
                    .eq(j)
                    .parent()
                    .parent()
                    .append(
                      '<label class="verify-error">输入不能为空!</label>'
                    );
                }
                verifyResult = false;
              }
              conListInupt
                .eq(j)
                .siblings(".verify-error")
                .remove();
            } else {
              var verifyField = conListInupt
                .eq(j)
                .parent()
                .prev()
                .find("i")
                .html(); //校验字段
              console.log("字段：" + verifyField + "正则校验  >>>>>校验通过");
            }
          }
        }
      }
    }
  }
  console.log("校验结果：" + verifyResult);
  if (verifyResult) {
    $(".verify-error").remove();
  }
  return verifyResult;
}

//获取数组中重复数据的个数
function arrRepeatNum(testArr) {
  var numNull = [];
  for (var i = 0; i < testArr.length; i++) {
    if (testArr[i].amount == 0) {
      numNull.push(testArr[i].lineNo);
    }
  }
  if (numNull.length > 0) {
    //判断数组中重复数据的个数
    var temp = [];
    var tempArr = [];
    var num = 1;
    var test = "";
    for (var j = 0; j < numNull.length; j++) {
      for (var k = j + 1; k < numNull.length; k++) {
        if (numNull[j] == numNull[k]) {
          test = numNull[k];
          numNull[k] = numNull[numNull.length - 1];
          numNull[numNull.length - 1] = test;
          numNull.length--;
          k--;
          num++;
        }
      }
      temp[j] = num;
      num = 1;
      tempArr[j] = numNull[j];
    }

    for (var i = 0; i < tempArr.length; i++) {
      console.log(tempArr[i] + "个数" + temp[i]);
      if (temp[i] == 13) {
        for (var h = 0; h < testArr.length; h++) {
          if (testArr[h].lineNo == tempArr[i]) {
            testArr.splice(h, 1);
            h = h - 1;
          }
        }
      }
    }
  }

  return testArr;
}

/* 
 * formatMoney(s,type) 
 * 功能：金额按千位逗号分割 
 * 参数：s，需要格式化的金额数值. 
 * 参数：type,判断格式化后的金额是否需要小数位. 
 * 返回：返回格式化后的数值字符串. 
 */
function MoneyPromptNum(e) {
  var inputVal = e.val();
  if (inputVal != "" || inputVal != 0) {
    if (!e.next().hasClass("money-show")) {
      e.after('<i class="money-show"></i>');
    }
    $(".money-show").text(formatMoney(inputVal, 0));
    var leftWidth =
      70 - twoDecimal($(".money-show").width() / $(document).width()) * 100 / 2;
    $(".money-show").css("left", leftWidth + "%");
  } else {
    $(".money-show").remove();
  }
  e.blur(function() {
    $(".money-show").remove();
  });

  function formatMoney(s, type) {
    if (/[^0-9\.]/.test(s)) return "0";
    if (s == null || s == "") return "0";
    s = s.toString().replace(/^(\d*)$/, "$1.");
    s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
    s = s.replace(".", ",");
    var re = /(\d)(\d{3},)/;
    while (re.test(s)) s = s.replace(re, "$1,$2");
    s = s.replace(/,(\d\d)$/, ".$1");
    if (type == 0) {
      // 不带小数位(默认是有小数位)
      var a = s.split(".");
      if (a[1] == "00") {
        s = a[0];
      }
    }
    return "￥" + s;
  }
}
/*
 * formatMoneyTxet(s)
 * 功能：金额按个、十、百、千位提示
 * 参数：s，需要格式化的金额数值. 
 * 返回：返回格式化后的提示单位.
 * 
 */
function MoneyPromptText() {
  $(document).on("focus change keyup", 'input[type="number"]', function() {
    var e = $(this);
    var inputVal = e.val();
    var Mob = "手机号";
    var Ratio = "占比";
    var Bank = "银行账户";
    var familyTel = "固话";
    var dwTel = "电话";
    var interest = "利率";
    var hjInterest = "合计成本率";
    var bfInterest = "百分比";
    var spanOfVal = e
      .parent()
      .siblings()
      .children("span")
      .text(); //合计成本率
    var pOfVal = e
      .parent()
      .siblings("p")
      .text(); //综合毛利率
    var bfOfVal = e.siblings("span").text(); //百分比
    var indexOfVal = e
      .parent()
      .siblings()
      .children("i")
      .text();
    if (pOfVal.indexOf(interest) >= 0) {
      //综合毛利率
      return false;
    }
    if (bfOfVal.indexOf(bfInterest) >= 0) {
      //百分比
      return false;
    }
    if (spanOfVal.indexOf(hjInterest) >= 0) {
      //合计成本率
      return false;
    }
    if (
      indexOfVal.indexOf(Ratio) >= 0 ||
      indexOfVal.indexOf(Mob) >= 0 ||
      indexOfVal.indexOf(Bank) >= 0 ||
      indexOfVal.indexOf(familyTel) >= 0 ||
      indexOfVal.indexOf(dwTel) >= 0
    ) {
      //处理是手机号、固定电话、银行卡、百分比
      return false;
    }

    if (inputVal != "" && inputVal != 0 && inputVal != null) {
      if (!e.next().hasClass("money-show-text")) {
        e.after('<em class="money-show-text"></em>');
      }
      $(".money-show-text").text(formatMoneyTxet(inputVal));
    } else {
      console.log(inputVal);
      //			e.val(null);
      $(".money-show-text").remove();
    }

    e.blur(function() {
      $(".money-show-text").remove();
    });
  });
  $(document).on("focus", 'input[type="number"]', function() {
    var e = $(this);
    var inputVal = e.val();
    if (inputVal == 0) {
      e.val(null);
    }
  });
  $(document).on("blur", 'input[type="number"]', function() {
    var inputVal = $(this).val();
    console.log(inputVal);
    if (
      $(this)
        .parent()
        .siblings()
        .children("span")
        .text() == "*"
    ) {
      if (inputVal == "" || inputVal == null || inputVal == 0) {
        $(this)
          .val(0)
          .css("color", "#A0A0A0");
      } else {
        $(this).css("color", "#191919");
      }
    } else {
      if (inputVal == "" || inputVal == null) {
        $(this)
          .val(inputVal)
          .css("color", "#A0A0A0");
      } else if (inputVal == 0) {
        $(this)
          .val(0)
          .css("color", "#A0A0A0");
      } else {
        $(this).css("color", "#191919");
      }
    }
  });

  function formatMoneyTxet(s) {
    var b = Math.abs(Math.round(s, 0)).toString(); //取整数位
    var TextLen = b.length; //整数位长度
    switch (TextLen) {
      case 1:
        return "(个)";
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
        return "";
    }
  }
}
$(function() {
  MoneyPromptText();
});
//输入后浏览器自动上移
function scrollFunction() {
  $(document).on("focus", "input", function() {
    var _that = $(this);
    if (
      _that.parents(".right").children("label").length == 2 &&
      _that.attr("type") == "radio"
    ) {
      _that.prop("checked", true);
      _that.attr("checked", "checked");
      _that
        .parent("label")
        .find("i")
        .show();
      _that
        .parent("label")
        .siblings("label")
        .find("i")
        .hide();
      _that
        .parent("label")
        .siblings("label")
        .find("input")
        .prop("checked", false);
      _that
        .parent("label")
        .siblings("label")
        .find("input")
        .attr("checked", false);
    }
    _that.click();
    $(window).scrollTop($(this).offset().top - 100);
  });
}
scrollFunction();

/**
 * 2018-01-04
 * 判断数组中是否有重复
 * @param {Object} arr
 */
function isRepeat(arr) {
  var hash = {};
  for (var i in arr) {
    if (hash[arr[i]]) {
      return true;
    }
    hash[arr[i]] = true;
  }
  return false;
}

/**
 * 2017-12-26
 * 让数组按照某个字段进行分组
 * @param {Object} arr 传入的数组
 * @param {Object} str 按照某个字段分组
 * @modelName {Object} number 模块名称
 * 1.固定支出；2.损益表-其他;3.收入；4.损益表-可变成本；5.营业额数据来源;6.现金流量表
 * 7.营业额交叉检验-产品；8.营业额交叉检验-模式；9.可变成本及其交叉检验-产品描述；
 */
function arrGroup(arr, str, modelName) {
  var map = {},
    dest = [];
  for (var i = 0; i < arr.length; i++) {
    var ai = arr[i];
    if (!map[ai[str]]) {
      var jsondata = {};
      if (modelName == 1) {
        //固定支出
        jsondata = {
          lineNo: ai.lineNo,
          name: ai.name,
          nameOther: ai.nameOther,
          data: [ai]
        };
      } else if (modelName == 2) {
        //损益表-其他
        jsondata = {
          lineNo: ai.lineNo,
          name: ai.name,
          otherName: ai.otherName,
          category: ai.category,
          data: [ai]
        };
      } else if (modelName == 5) {
        //营业额数据来源
        jsondata = {
          lineNo: ai.lineNo,
          type: ai.type,
          otherResource: ai.otherResource,
          resource: ai.resource,
          data: [ai]
        };
      } else if (modelName == 3) {
        //收入
        jsondata = {
          lineNo: ai.lineNo,
          name: ai.name,
          data: [ai]
        };
      } else if (modelName == 4) {
        //可变成本
        jsondata = {
          lineNo: ai.lineNo,
          name: ai.name,
          variableCost: ai.variableCost,
          data: [ai]
        };
      } else if (modelName == 6) {
        //现金流量表
        jsondata = {
          lineNo: ai.lineNo,
          name: ai.name,
          data: [ai]
        };
      } else if (modelName == 7) {
        //营业额交叉检验-产品
        jsondata = {
          lineNo: ai.lineNo,
          type: ai.type,
          data: [ai]
        };
      } else if (modelName == 8) {
        //营业额交叉检验-模式
        jsondata = {
          lineNo: ai.lineNo,
          type: ai.type,
          typeOther: ai.typeOther,
          data: [ai]
        };
      } else if (modelName == 9) {
        //可变成本及其交叉检验-产品描述
        jsondata = {
          lineNo: ai.lineNo,
          type: ai.type,
          data: [ai]
        };
      }else if(modelName == 10){
      	//净利润列表
        jsondata = {
          lineNo: ai.lineNo,
          data: [ai]
        };
      }

      dest.push(jsondata);
      map[ai[str]] = ai;
    } else {
      for (var j = 0; j < dest.length; j++) {
        var dj = dest[j];
        if (dj[str] == ai[str]) {
          dj.data.push(ai);
          break;
        }
      }
    }
  }
  console.log(dest);
  return dest;
}

/**
 *2017-12-26
 * 将guid从数组中解析成中文
 * @param {Object} arr 传入的guid数组
 * @param {Object} guid 需要解析成中文的guid
 */
function getGuidValue(arr, guid) {
  var textVal = "";
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].key == guid) {
      textVal = arr[i].value;
    }
  }
  return textVal;
}

/**
 * 2018-01-04
 * 现金流量表校验
 *
 */
function flowValidate() {
  var inFlowInput = $(".tab-income .tab input");
  var outFlowInput = $(".tab-outcome .tab input");
  var reg = /^(\d{0,10})$/; //0-10位的正整数
  var reg_zf = /^(-)?(\d{0,10})$/; //10位正负整数
  var regText = /^([\s\S]{0,20})$/; //20位任意字符
  var reg_a = /^([\s\S]{0,500})$/; //500位任意字符
  var verifyResult = true; //校验的结果
  var inMask = [];
  var outMask = [];
  if ($("#demo_date1").val() == "" || $("#demo_date2").val() == "") {
    return verifyResult;
  }
  inFlowInput.each(function() {
    //流入项表格
    if (!reg.test($(this).val())) {
      console.log(
        "字段：" +
          $(this)
            .prev()
            .html() +
          "正则校验  >>>>>校验不通过"
      );
      $(this)
        .parent()
        .append($('<label class="verify-error">输入0-10位的正整数!</label>'));
      verifyResult = false;
      inMask.push(
        $(this)
          .parent()
          .parent()
          .parent()
          .attr("data-list")
      );
    }
  });

  outFlowInput.each(function() {
    //流出项表格
    if (!reg.test($(this).val())) {
      console.log(
        "字段：" +
          $(this)
            .prev()
            .html() +
          "正则校验  >>>>>校验不通过"
      );
      $(this)
        .parent()
        .append($('<label class="verify-error">输入0-10位的正整数!</label>'));
      verifyResult = false;
      outMask.push(
        $(this)
          .parent()
          .parent()
          .parent()
          .attr("data-list")
      );
    }
  });

  $(".inflow-input").each(function() {
    //流入项名称
    if (
      !regText.test($(this).val()) ||
      $(this)
        .val()
        .trim().length == 0
    ) {
      console.log(
        "字段：" +
          $(this)
            .prev()
            .html() +
          "正则校验  >>>>>校验不通过"
      );
      $(this)
        .parent()
        .append($('<label class="verify-error">最多输入20位字符!</label>'));
      verifyResult = false;
      inMask.push(
        $(this)
          .parent()
          .parent()
          .attr("data-list")
      );
    }
  });

  $(".outflow-input").each(function() {
    //流出项名称
    if (
      !regText.test($(this).val()) ||
      $(this)
        .val()
        .trim().length == 0
    ) {
      console.log(
        "字段：" +
          $(this)
            .prev()
            .html() +
          "正则校验  >>>>>校验不通过"
      );
      $(this)
        .parent()
        .append($('<label class="verify-error">最多输入20位字符!</label>'));
      verifyResult = false;
      outMask.push(
        $(this)
          .parent()
          .parent()
          .attr("data-list")
      );
    }
  });

  var area = $(".txt textarea").val(); //备注校验
  if (!reg_a.test(area)) {
    console.log(
      "字段：" +
        $(".txt textarea")
          .parent()
          .prev()
          .html() +
        "正则校验  >>>>>校验不通过"
    );
    $(".txt textarea")
      .parent()
      .append($('<label class="textarea-error">最多输入500位字符!</label>'));
    verifyResult = false;
  } else {
    $(".textarea-error").remove();
  }

  var amountVal = $(".start-money").val(); //金额输入
  if (!reg_zf.test(amountVal)) {
    console.log(
      "字段：" +
        $(".start-money")
          .prev()
          .html() +
        "正则校验  >>>>>校验不通过"
    );
    $(".start-money")
      .parent()
      .append($('<label class="verify-error">输入0-10位的整数!</label>'));
    verifyResult = false;
  }

  outMask = aRR(outMask);
  inMask = aRR(inMask);
  if (inMask.length > 0) {
    $(".inflow span").each(function() {
      if (arrVal($(this).attr("data-list"), inMask)) {
        $(this).addClass("error-tab");
      } else {
        $(this).removeClass("error-tab");
      }
    });
  } else {
    $(".inflow span").removeClass("error-tab");
  }

  if (outMask.length > 0) {
    $(".outflow span").each(function() {
      if (arrVal($(this).attr("data-list"), outMask)) {
        $(this).addClass("error-tab");
      } else {
        $(this).removeClass("error-tab");
      }
    });
  } else {
    $(".outflow span").removeClass("error-tab");
  }

  if (verifyResult) {
    $(".verify-error").remove();
  }
  return verifyResult;
}

/**
 * 2018-01-05
 * //输入时添加下划线
 */
function foceBlurFun() {
  $(".con-list li input").on("focus", function() {
    $(this)
      .parent()
      .parent()
      .css("border-bottom", "0.04rem #faaa28 solid");
  });
  $(".con-list li input").on("blur", function() {
    $(this)
      .parent()
      .parent()
      .css("border-bottom", "0.04rem #e6e6eb solid");
    $(this)
      .parent()
      .parent()
      .children(".list-left")
      .children("i")
      .css("color", "#A0A0A5");
    $(this)
      .parent()
      .parent()
      .children(".list-right")
      .children("input")
      .css("color", "#191919");
  });
  $(".otherResource input").on("focus", function() {
    $(this)
      .parent()
      .css("border-bottom", "0.04rem #faaa28 solid");
  });
  $(".otherResource input").on("blur", function() {
    $(this)
      .parent()
      .css("border-bottom", "0.04rem #e6e6eb solid");
    $(this)
      .parent()
      .children("span")
      .css("color", "#A0A0A5");
    $(this)
      .parent()
      .children("input")
      .css("color", "#191919");
  });
  $(".summation-right input").on("focus", function() {
    $(this)
      .parent()
      .parent()
      .css("border-bottom", "0.04rem #faaa28 solid");
  });
  $(".summation-right input").on("blur", function() {
    $(this)
      .parent()
      .parent()
      .css("border-bottom", "0.04rem #e6e6eb solid");
    if ($(this).val() != "" && $(this).val() != 0) {
      $(this)
        .parent()
        .prev()
        .children("span")
        .css("color", "#A0A0A5");
      $(this).css("color", "#191919");
    }
  });
}

/**
 * 2018-01-09
 * 提交给后台的数据
 * @param {Object} statue 为true手动提交，false自动保存或者返回
 * @param {Object} subJosn 数据
 * @param {Object} ValidityState 其他校验状态
 */
function androidDataSubmit(statue, subJosn, ValidityState) {
  //TODO
  if (statue) {
    if (ValidityState) {
      console.log("最终校验结果：通过");
      subJosn["completeStatus"] = 2;
      console.log(subJosn);
      subJosn = JSON.stringify(subJosn);
      AndroidJs.saveWjDetalAnswer(subJosn, true);
    } else {
      console.log("最终校验结果：不通过");
      subJosn["completeStatus"] = 1;
      subJosn = JSON.stringify(subJosn);
      AndroidJs.saveWjDetalAnswer(subJosn, false);
    }
  } else {
    if (ValidityState) {
      subJosn["completeStatus"] = 2;
    } else {
      subJosn["completeStatus"] = 1;
    }
    subJosn = JSON.stringify(subJosn);
    AndroidJs.saveWjDetalAnswer(subJosn, false);
  }
}

//数组Number元素求和
function arrSum(arr) {
  var s = 0;
  arr.forEach(function(val, idx, arr) {
    s += val;
  }, 0);

  return s;
}
