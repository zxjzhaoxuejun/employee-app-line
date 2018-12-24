var monthVal = []; //存放选择月份
var codeVal; //下拉选择值
var default_serialNo;
var ModeAnswer;
var answerJson; //整个答案
function loadBossCrossExaminationTurnover(data) {
  answerJson = jsonForm(data[1]);
  ModeAnswer = answerJson.bossIncomeAccountModel; //损益表模块答案
  var b = answerJson.bossIncomeAccountModel; //损益表模块
  var c = b.bossIncomeAccountIncomes; //损益表收入
  var c0 = b.bossIncomeAccountVariableCosts; //损益表可变成本
  var c1 = b.bossIncomeAccountFixedOutcomes; //损益表固定支出
  var c2 = b.bossIncomeAccountOthers; //损益表其他
  var c3 = b.bossIncomeAccountSummaries; //损益表所得税
  var c4 = b.bossIncomeAccountTurnoverResources; //损益表利润
  var c5 = b.bossAcrossTurnover; //营业额交叉验证-销售额
  var c6 = b.bossAcrossTurnoverProjects; //营业额交叉验证-产品
  if (c6 == null) {
    c6 = [];
  }
  var c7 = b.bossAcrossTurnoverTypes; //营业额交叉验证-模式
  if (c7 == null) {
    c7 = [];
  }
  codeVal = data[0].sysDicMap.bossAcrossTurnoverTypeDict; //下拉选择值
  if (answerJson.serialNo.serialNo != undefined) {
    default_serialNo = answerJson.serialNo.serialNo; //单号
  } else {
    default_serialNo = null;
  }
  createTurnover(c5, c6, c7); //生成页面
  baseCtrl.baseInfo();
  spanClick();
}

function createTurnover(c5, c6, c7) {
  //创建页面
  if (c5 != null) {
    //获取答案——销售额
    for (var key in c5) {
      for (var k = 0; k < $('.xs li').length - 1; k++) {
        if (
          $('.xs li')
            .eq(k)
            .attr('name') == key &&
          c5[key] != null
        ) {
          var $li = $('.xs li')
            .eq(k)
            .children('.list-right');
          if ($li.children('span').length == 1) {
            $li
              .children('span')
              .text(c5[key])
              .css('color', '#191919');
            $li
              .prev()
              .children('i')
              .css('color', '#A0A0A5');
          } else if ($li.children('input').length == 1) {
            $li
              .children('input')
              .val(c5[key])
              .css('color', '#191919');
            $li
              .prev()
              .children('i')
              .css('color', '#A0A0A5');
          }
        }
      }
    }
    if (c5.remark != null) {
      $('.txt textarea').val(c5.remark);
    } else {
      $('.txt textarea').val('');
    }
    saleWeighted();
  }
  if (c6.length > 0) {
    //营业额交叉验证-产品
    var proArr = arrGroup(c6, 'lineNo', 7);
    for (var j = 0; j < proArr.length; j++) {
      if (proArr[j].type != undefined) {
        proAswHtml(proArr[j], j);
      }
    }
  }

  if (c7.length > 0) {
    //营业额交叉验证-模式
    var typeArr = arrGroup(c7, 'lineNo', 8);
    for (var i = 0; i < typeArr.length; i++) {
      if (typeArr[i].type != undefined) {
        xsAswHtml(typeArr[i], i);
      }
    }
  }
}

/**
 * 营业额交叉验证-模式答案显示
 * @param {Object} dataList
 * @param {Object} num
 */
function xsAswHtml(dataList, num) {
  var showModel = 'display:none';
  if (num == 0) {
    showModel = 'display:block';
    $('.xs-nav').append(
      '<span class="bg" data-list="item' +
        num +
        '" name="' +
        dataList.type +
        '">' +
        getGuidValue(codeVal, dataList.type) +
        '</span>'
    );
  } else {
    $('.xs-nav').append(
      '<span data-list="item' +
        num +
        '" name="' +
        dataList.type +
        '">' +
        getGuidValue(codeVal, dataList.type) +
        '</span>'
    );
  }

  var showOther = '';
  if (!getGuidValue(codeVal, dataList.type).indexOf('其他')) {
    showOther = 'display:block';
  } else {
    showOther = 'display:none';
  }
  var html =
    '<div class="con-list xs-items" data-list="item' +
    num +
    '" style="' +
    showModel +
    '">' +
    '<ul>' +
    '<li name="type">' +
    '<div class="list-left"><span>*</span><i style="color: rgb(160, 160, 165);">类别名称</i></div>' +
    '<div class="list-right"><span class="code-list" name="' +
    dataList.type +
    '" style="color: rgb(25, 25, 25);">' +
    getGuidValue(codeVal, dataList.type) +
    '</span></div>' +
    '</li>' +
    '<li name="typeOther" class="typeOtherClass" style="' +
    showOther +
    '">' +
    '<div class="list-left"><span>*</span><i style="color: rgb(160, 160, 165);">其他类别名称</i></div>' +
    '<div class="list-right">' +
    '<input type="text" placeholder="输入其他类别名称" style="color: rgb(25, 25, 25);" value="' +
    dataList.typeOther +
    '" class="other-type-val">' +
    '</div>' +
    '</li>' +
    '<li name="monthSaleAmount">' +
    '<div class="list-left"><span>*</span><i style="color: rgb(160, 160, 165);">月均金额</i></div>' +
    '<div class="list-right">' +
    '<input type="number" value="' +
    dataList.data[0].monthSaleAmount +
    '" class="month-average" style="color: rgb(25, 25, 25);"><b class="d-icon">元</b>' +
    '</div>' +
    '</li>' +
    '<li name="saleRatio">' +
    '<div class="list-left"><span>*</span><i style="color: rgb(160, 160, 165);">销售占比</i></div>' +
    '<div class="list-right">' +
    '<input type="number" value="' +
    dataList.data[0].saleRatio +
    '" class="saleRatio" style="color: rgb(25, 25, 25);"><b class="d-icon">%</b>' +
    '</div>' +
    '</li>' +
    '<li class="red-color">' +
    '<div class="list-left"><i>加权平均营业额</i></div>' +
    '<div class="list-right">' +
    '<input type="number" value="0" class="type_sala_Avg" disabled="disabled"><b class="d-icon">元</b>' +
    '</div>' +
    '</li>' +
    '</ul>' +
    '</div>';
  $('.xs-type').append(html);
  typeWeighted(1);
}

/**
 * 营业额交叉验证-产品答案显示
 * @param {Object} dataList
 * @param {Object} num
 */
function proAswHtml(dataList, num) {
  var showModel = 'display:none';
  if (num == 0) {
    showModel = 'display:block';
    $('.type-nav').append(
      '<span class="bg" data-list="item' +
        num +
        '">' +
        dataList.type +
        '</span>'
    );
  } else {
    $('.type-nav').append(
      '<span data-list="item' + num + '">' + dataList.type + '</span>'
    );
  }
  var html =
    '<div class="con-list type-items" data-list="item' +
    num +
    '" style="' +
    showModel +
    '">' +
    '<ul>' +
    '<li name="type">' +
    '<div class="list-left"><span>*</span><i style="color: rgb(160, 160, 165);">类别名称</i></div>' +
    '<div class="list-right">' +
    '<input type="text" placeholder="请输入" style="color: rgb(25, 25, 25);" value="' +
    dataList.type +
    '" class="pro-val" >' +
    '</div>' +
    '</li>' +
    '<li name="monthSaleAmount">' +
    '<div class="list-left"><span>*</span><i style="color: rgb(160, 160, 165);">月均金额</i></div>' +
    '<div class="list-right">' +
    '<input type="number" value="' +
    dataList.data[0].monthSaleAmount +
    '" style="color: rgb(25, 25, 25);" class="month-average" ><b class="d-icon">元</b>' +
    '</div>' +
    '</li>' +
    '<li name="saleRatio">' +
    '<div class="list-left"><span>*</span><i style="color: rgb(160, 160, 165);">销售占比</i></div>' +
    '<div class="list-right">' +
    '<input type="number" value="' +
    dataList.data[0].saleRatio +
    '" class="saleRatio" style="color: rgb(25, 25, 25);" ><b class="d-icon">%</b>' +
    '</div>' +
    '</li>' +
    '<li class="red-color">' +
    '<div class="list-left"><i>加权平均营业额</i></div>' +
    '<div class="list-right">' +
    '<input type="number" value="0" class="pro_sala_Avg" disabled="disabled"><b class="d-icon">元</b>' +
    '</div>' +
    '</li>' +
    '</ul>' +
    '</div>';
  $('.pro-type').append(html);
  typeWeighted(2);
}

var baseCtrl = {
  baseInfo: function() {
    $(document).on('click', '.code-list01', function() {
      //月份选择
      month_mask($(this));
    });
    $(document).on('click', '.xs-btn .add-icon', function() {
      //销售添加
      var len = new Date().getTime(); //时间戳
      baseCtrl.addXsHtml(len);
      typeWeighted(1);
    });
    $(document).on('click', '.pro-btn .add-icon', function() {
      //产品类型添加
      var len = new Date().getTime(); //时间戳
      baseCtrl.addTypeHtml(len);
      typeWeighted(2);
    });
    $(document).on('click', '.xs-btn .del-icon', function() {
      //删除页签
      baseCtrl.delDom(1);
    });
    $(document).on('click', '.pro-btn .del-icon', function() {
      //删除页签
      baseCtrl.delDom(2);
    });
    $(document).on('focus', 'input', function() {
      //获取焦点输入框显示下划线
      foceBlurFun();
    });
    $(document).on('keyup change', 'input', function() {
      //动态校验
      crossValidate();
    });
    $(document).on('keyup change', '.month-rato', function() {
      //动态计算销售额加权
      saleWeighted();
    });
    $(document).on('keyup change', '.xs-items input', function() {
      //动态计算销售模式加权
      typeWeighted(1);
    });
    $(document).on('keyup change', '.type-items input', function() {
      //动态计算产品类型加权
      typeWeighted(2);
    });
    $(document).on('click', '.code-list', function() {
      //销售模式选择
      type_mask(codeVal, $(this));
    });

    $(document).on('blur change', '.pro-val', function() {
      //动态显示输入的页签
      var nowVal = $(this).val();
      var tagArr = [];
      $('.pro-val').each(function() {
        tagArr.push($(this).val());
      });
      if (isRepeat(tagArr)) {
        $(this)
          .parent()
          .parent()
          .append('<label class="month-error">不能输入相同页签!</label>');
        $(this).val('');
      } else {
        $('.type-nav span.bg').text(nowVal);
        $(this).css('color', '#191919');
      }
    });
  },
  addXsHtml: function(num) {
    $('.xs-items').hide();
    $('.xs-nav span').removeClass('bg');
    $('.xs-nav').append(
      '<span class="bg" data-list="item' + num + '">页签1</span>'
    );
    var html =
      '<div class="con-list xs-items" data-list="item' +
      num +
      '">' +
      '<ul>' +
      '<li name="type">' +
      '<div class="list-left"><span>*</span><i>类别名称</i></div>' +
      '<div class="list-right"><span class="code-list">请选择</span></div>' +
      '</li>' +
      '<li name="typeOther" class="typeOtherClass" style="display:none;">' +
      '<div class="list-left"><span>*</span><i>其他类别名称</i></div>' +
      '<div class="list-right">' +
      '<input type="text" placeholder="输入其他类别名称" class="other-type-val">' +
      '</div>' +
      '</li>' +
      '<li name="monthSaleAmount">' +
      '<div class="list-left"><span>*</span><i>月均金额</i></div>' +
      '<div class="list-right">' +
      '<input type="number" value="0" class="month-average" ><b class="d-icon">元</b>' +
      '</div>' +
      '</li>' +
      '<li name="saleRatio">' +
      '<div class="list-left"><span>*</span><i>销售占比</i></div>' +
      '<div class="list-right">' +
      '<input type="number" value="0" class="saleRatio" ><b class="d-icon">%</b>' +
      '</div>' +
      '</li>' +
      '<li class="red-color">' +
      '<div class="list-left"><i>加权平均营业额</i></div>' +
      '<div class="list-right">' +
      '<input type="number" value="0" class="type_sala_Avg" disabled="disabled"><b class="d-icon">元</b>' +
      '</div>' +
      '</li>' +
      '</ul>' +
      '</div>';
    $('.xs-type').append(html);
  },
  addTypeHtml: function(num) {
    $('.type-items').hide();
    $('.type-nav span').removeClass('bg');
    $('.type-nav').append(
      '<span class="bg" data-list="item' + num + '">页签1</span>'
    );
    var html =
      '<div class="con-list type-items" data-list="item' +
      num +
      '">' +
      '<ul>' +
      '<li name="type">' +
      '<div class="list-left"><span>*</span><i>类别名称</i></div>' +
      '<div class="list-right">' +
      '<input type="text" placeholder="请输入" class="pro-val" >' +
      '</div>' +
      '</li>' +
      '<li name="monthSaleAmount">' +
      '<div class="list-left"><span>*</span><i>月均金额</i></div>' +
      '<div class="list-right">' +
      '<input type="number" value="0" class="month-average" ><b class="d-icon">元</b>' +
      '</div>' +
      '</li>' +
      '<li name="saleRatio">' +
      '<div class="list-left"><span>*</span><i>销售占比</i></div>' +
      '<div class="list-right">' +
      '<input type="number" value="0" class="saleRatio" ><b class="d-icon">%</b>' +
      '</div>' +
      '</li>' +
      '<li class="red-color">' +
      '<div class="list-left"><i>加权平均营业额</i></div>' +
      '<div class="list-right">' +
      '<input type="number" value="0" class="pro_sala_Avg" disabled="disabled"><b class="d-icon">元</b>' +
      '</div>' +
      '</li>' +
      '</ul>' +
      '</div>';
    $('.pro-type').append(html);
  },
  delDom: function(model) {
    var spanLen = '';
    var modelName = '';
    if (model == 1) {
      //1.销售模式；2.产品类型
      spanLen = $('.xs-nav span');
      modelName = 'xs-items';
    } else {
      spanLen = $('.type-nav span');
      modelName = 'type-items';
    }
    for (var i = 0; i < spanLen.length; i++) {
      $('<i class="tab-colse" name="' + i + '"></i>').appendTo(spanLen.eq(i));
    }
    $(document).on('click', '.con-list', function() {
      $('.tab-colse').remove();
    });
    $('.tab-colse')
      .unbind('click')
      .click(function() {
        var _th = $(this);
        var del = '';
        del += '<div id="mask"><div class="mask_bg"></div><div class="remove">';
        del +=
          '<p class="_sc">您确认要删除吗？<img class="_ci" src="img/close_icon.png"/><p class="_qr">确认</p></div></div>';
        $(del).appendTo('body');
        $('._ci').click(function() {
          $('#mask').remove();
          $('.tab-colse').remove();
        });
        $('._qr').click(function() {
          $('#mask').remove();
          _th.parent().remove();
          $('.tab-colse').remove();
          var delNum = _th.parent().attr('data-list');
          $('.' + modelName + '[data-list="' + delNum + '"]').remove();
          $('.' + modelName)
            .eq(0)
            .show();
          if (model == 1) {
            $('.xs-nav span')
              .eq(0)
              .addClass('bg');
          } else {
            $('.type-nav span')
              .eq(0)
              .addClass('bg');
          }
          typeWeighted(model);
        });
      });
  },
  getAllData: function() {
    var _xs = {};
    _xs['busySeasonAvgSaleAmount'] = $('.avgwj').val();
    _xs['shoulderSeasonAvgSaleAmount'] = $('.avgpj').val();
    _xs['slackSeasonAvgSaleAmount'] = $('.avgdj').val();
    _xs['serialNo'] = default_serialNo;
    if ($('.turnover-textarea').val() != '') {
      _xs['remark'] = $('.turnover-textarea').val();
    } else {
      _xs['remark'] = null;
    }
    if ($('.wj').text() != '' && $('.wj').text() != '请选择') {
      _xs['busySeasonMonthCount'] = split_str($('.wj').text(), 1);
      _xs['busySeason'] = $('.wj').text();
    } else {
      _xs['busySeasonMonthCount'] = 0;
      _xs['busySeason'] = null;
    }
    if ($('.dj').text() != '' && $('.dj').text() != '请选择') {
      _xs['slackSeasonMonthCount'] = split_str($('.dj').text(), 1);
      _xs['slackSeason'] = $('.dj').text();
    } else {
      _xs['slackSeasonMonthCount'] = 0;
      _xs['slackSeason'] = null;
    }
    if ($('.pj').text() != '' && $('.pj').text() != '请选择') {
      _xs['shoulderSeasonMonthCount'] = split_str($('.pj').text(), 1);
      _xs['shoulderSeason'] = $('.pj').text();
    } else {
      _xs['shoulderSeasonMonthCount'] = 0;
      _xs['shoulderSeason'] = null;
    }
    var typesArr = [];
    $('.xs-items').each(function() {
      //销售模式取值
      var index = $(this).index();
      var name = $(this)
        .find('.code-list')
        .text();
      var guid = $(this)
        .find('.code-list')
        .attr('name');
      if (guid == undefined) {
        guid = null;
      }
      var otherVal = '';
      if (!name.indexOf('其他')) {
        otherVal = $(this)
          .find('.other-type-val')
          .val();
      } else {
        otherVal = null;
      }
      var monthVal = $(this)
        .find('.month-average')
        .val();
      var sale = $(this)
        .find('.saleRatio')
        .val();
      var jsonList = {
        lineNo: index,
        monthSaleAmount: monthVal,
        saleRatio: sale,
        type: guid,
        typeOther: otherVal,
        serialNo: default_serialNo
      };
      typesArr.push(jsonList);
    });
    var projectsArr = [];
    $('.type-items').each(function() {
      //产品类型取值
      var index = $(this).index();
      var name = $(this)
        .find('.pro-val')
        .val();
      if (name == '') {
        name = null;
      }
      var monthVal = $(this)
        .find('.month-average')
        .val();
      var sale = $(this)
        .find('.saleRatio')
        .val();
      var jsonList = {
        lineNo: index,
        monthSaleAmount: monthVal,
        saleRatio: sale,
        type: name,
        serialNo: default_serialNo
      };
      projectsArr.push(jsonList);
    });

    var data = {
      turnover: _xs,
      projects: projectsArr,
      types: typesArr
    };
    return data;
  }
};

/**
 * 页签span点击事件
 * 切换页签显示数据
 */
function spanClick() {
  $(document).on('click', '.xs-nav span', function() {
    $('.xs-nav span').removeClass('bg');
    $(this).addClass('bg');
    $('.xs-items').hide();
    $('.xs-items')
      .eq($(this).index())
      .show();
  });

  $(document).on('click', '.type-nav span', function() {
    $('.type-nav span').removeClass('bg');
    $(this).addClass('bg');
    $('.type-items').hide();
    $('.type-items')
      .eq($(this).index())
      .show();
  });
}

function saleWeighted() {
  //销售额加权平均
  var slackSeasonMonth = 0;
  var busySeasonMonth = 0;
  var shoulderSeasonMonth = 0;
  if ($('.wj').text() != '' && $('.wj').text() != '请选择') {
    busySeasonMonth = split_str($('.wj').text(), 1); //旺季月份数量
  } else {
    busySeasonMonth = 0;
  }
  if ($('.dj').text() != '' && $('.dj').text() != '请选择') {
    slackSeasonMonth = split_str($('.dj').text(), 1); //淡季月份数量
  } else {
    slackSeasonMonth = 0;
  }
  if ($('.pj').text() != '' && $('.pj').text() != '请选择') {
    shoulderSeasonMonth = split_str($('.pj').text(), 1); //平季月份数量
  } else {
    shoulderSeasonMonth = 0;
  }
  var busySeasonAvgSale = Number($('.avgwj').val()); //旺季月平均
  var slackSeasonAvgSale = Number($('.avgdj').val()); //淡季月平均
  var shoulderSeasonAvgSale = Number($('.avgpj').val()); //平季月平均
  var sale_Avg = 0;
  sale_Avg =
    (busySeasonMonth * busySeasonAvgSale +
      slackSeasonMonth * slackSeasonAvgSale +
      shoulderSeasonMonth * shoulderSeasonAvgSale) /
    (busySeasonMonth + slackSeasonMonth + shoulderSeasonMonth);
  $('.xs_avg').val(toDecimal(sale_Avg)); //保留整数
}

function typeWeighted(num) {
  var obj = '',
    className = '';
  if (num == 1) {
    //销售模式
    obj = $('.xs-items');
    className = $('.type_sala_Avg');
  } else {
    //产品类型
    obj = $('.type-items');
    className = $('.pro_sala_Avg');
  }
  var monthAverage = 0; //月金额
  var saleRatioVal = 0; //销售占比
  obj.each(function() {
    monthAverage += Number(
      $(this)
        .find('.month-average')
        .val()
    );
    saleRatioVal += Number(
      $(this)
        .find('.saleRatio')
        .val()
    );
  });
  var typeSala_Avg = toDecimal(Number(monthAverage * 100 / saleRatioVal));
  className.val(typeSala_Avg);
}

function crossValidate() {
  //营业额交叉检验的字段校验
  var verifyResult = true; //校验的结果
  var errMask_1 = [];
  var errMask_2 = [];
  var reg = /^(\d{0,10})$/; //0-10位的正整数
  var reg_a = /^.{0,1000}$/; //1000位任意字符
  var reg_title = /^(.{0,20})$/; //20位任意字符
  var reg_percent = /^(100|[1-9]?[0-9])$/; //百分比

  $('.xs .month-rato').each(function() {
    //销售额
    if (!reg.test($(this).val())) {
      console.log(
        '字段：' +
          $(this)
            .parent()
            .prev()
            .children('i')
            .html() +
          '正则校验  >>>>>校验不通过'
      );
      $(this)
        .parent()
        .parent()
        .append($('<label class="verify-error">输入0-10位的正整数!</label>'));
      verifyResult = false;
    }
  });

  var textVal = $('.turnover-textarea').val();
  if (textVal.length > 1000) {
    console.log(
      '字段：' +
        $('.txt')
          .prev()
          .html() +
        '正则校验  >>>>>校验不通过'
    );
    $('.txt').append(
      $('<label class="textarea-error">最多输入1000字符!</label>')
    );
    verifyResult = false;
  } else {
    $('.textarea-error').remove();
  }
  var saleTypeVal = 0;
  $('.xs-items').each(function() {
    //销售模式
    var name = $(this).find('.code-list');
    var monthVal = $(this).find('.month-average');
    var sale = $(this).find('.saleRatio');
    var otherVal = $(this).find('.other-type-val');
    if (name.text() == '' || name.text() == '请选择') {
      console.log(
        '字段：' +
          name
            .parent()
            .prev()
            .children('i')
            .html() +
          '正则校验  >>>>>校验不通过'
      );
      name
        .parent()
        .parent()
        .append($('<label class="verify-error">请选择!</label>'));
      verifyResult = false;
      errMask_1.push($(this).attr('data-list'));
    } else {
      if (!name.text().indexOf('其他')) {
        if (!reg_title.test(otherVal.val()) || otherVal.val() == '') {
          console.log(
            '字段：' +
              otherVal
                .parent()
                .prev()
                .children('i')
                .html() +
              '正则校验  >>>>>校验不通过'
          );
          otherVal
            .parent()
            .parent()
            .append(
              $('<label class="verify-error">必填，最多输入20个字符!</label>')
            );
          verifyResult = false;
          errMask_1.push($(this).attr('data-list'));
        }
      }
    }

    if (!reg.test(monthVal.val())) {
      console.log(
        '字段：' +
          monthVal
            .parent()
            .prev()
            .children('i')
            .html() +
          '正则校验  >>>>>校验不通过'
      );
      monthVal
        .parent()
        .parent()
        .append($('<label class="verify-error">输入0-10位的正整数!</label>'));
      verifyResult = false;
      errMask_1.push($(this).attr('data-list'));
    }

    if (!reg_percent.test(sale.val())) {
      console.log(
        '字段：' +
          sale
            .parent()
            .prev()
            .children('i')
            .html() +
          '正则校验  >>>>>校验不通过'
      );
      sale
        .parent()
        .parent()
        .append($('<label class="verify-error">输入百分数,不含小数!</label>'));
      verifyResult = false;
      errMask_1.push($(this).attr('data-list'));
    } else {
      saleTypeVal += Number(sale.val());
    }
  });

  var saleProVal = 0;
  $('.type-items').each(function() {
    //产品类型
    var name = $(this).find('.pro-val');
    var monthVal = $(this).find('.month-average');
    var sale = $(this).find('.saleRatio');
    if (!reg_title.test(name.val()) || name.val() == '') {
      console.log(
        '字段：' +
          name
            .parent()
            .prev()
            .children('i')
            .html() +
          '正则校验  >>>>>校验不通过'
      );
      name
        .parent()
        .parent()
        .append(
          $('<label class="verify-error">必填，最多输入20个字符!</label>')
        );
      verifyResult = false;
      errMask_2.push($(this).attr('data-list'));
    }

    if (!reg.test(monthVal.val())) {
      console.log(
        '字段：' +
          monthVal
            .parent()
            .prev()
            .children('i')
            .html() +
          '正则校验  >>>>>校验不通过'
      );
      monthVal
        .parent()
        .parent()
        .append($('<label class="verify-error">输入0-10位的正整数!</label>'));
      verifyResult = false;
      errMask_2.push($(this).attr('data-list'));
    }

    if (!reg_percent.test(sale.val())) {
      console.log(
        '字段：' +
          sale
            .parent()
            .prev()
            .children('i')
            .html() +
          '正则校验  >>>>>校验不通过'
      );
      sale
        .parent()
        .parent()
        .append($('<label class="verify-error">输入百分数,不含小数!</label>'));
      verifyResult = false;
      errMask_2.push($(this).attr('data-list'));
    } else {
      saleProVal += Number(sale.val());
    }
  });
  if (saleTypeVal > 100) {
    $('.xs-items li[name="saleRatio"]').append(
      '<label class="verify-error">销售模式占比总和不能超过100%!</label>'
    );
    verifyResult = false;
    errMask_1.push($('.xs-nav span.bg').attr('data-list'));
  }
  if (saleProVal > 100) {
    $('.type-items li[name="saleRatio"]').append(
      '<label class="verify-error">产品类型占比总和不能超过100%!</label>'
    );
    verifyResult = false;
    errMask_2.push($('.type-nav span.bg').attr('data-list'));
  }
  errMask_1 = aRR(errMask_1);
  if (errMask_1.length > 0) {
    $('.xs-nav span').each(function() {
      if (arrVal($(this).attr('data-list'), errMask_1)) {
        $(this).addClass('error-tab');
      } else {
        $(this).removeClass('error-tab');
      }
    });
  } else {
    $('.xs-nav span').removeClass('error-tab');
  }

  errMask_2 = aRR(errMask_2);
  if (errMask_2.length > 0) {
    $('.type-nav span').each(function() {
      if (arrVal($(this).attr('data-list'), errMask_2)) {
        $(this).addClass('error-tab');
      } else {
        $(this).removeClass('error-tab');
      }
    });
  } else {
    $('.type-nav span').removeClass('error-tab');
  }
  if (verifyResult) {
    $('.verify-error').remove();
  }
  return verifyResult;
}

function month_mask(_this) {
  //月份遮罩选择
  var mask = '';
  mask +=
    '<div class="month-mask"><div class="month-bg"></div><div class="month-list"><div class="mask-btn"><span class="month-cancel">取消</span>';
  mask +=
    '<span class="month-check">请选择月份（可多选）</span><span class="month-affirm">确认</span></div><ul>';
  for (var i = 1; i <= 12; i++) {
    mask += '<li name="' + i + '"><i></i>' + i + '月</li>';
  }
  mask += '</ul></div></div>';
  $(mask).appendTo('body');
  var _month = select_month(); //已选择的月份
  var _th;
  if (_this.text() != '请选择' || _this.text() != null) {
    _th = _this.text().split(',');
  }
  if (_th.length > 0) {
    var $li = $('.month-list ul li');
    for (var t = 0; t < $li.length; t++) {
      if (arrVal($li.eq(t).attr('name'), _th)) {
        $li
          .eq(t)
          .children('i')
          .addClass('active');
        $li.eq(t).css('color', '#A0A0A5');
      }
    }
  }
  var monthFull = [];
  var num = 0;
  $('.month-list ul li').click(function() {
    monthFull.length = 0;
    if (
      $(this)
        .children('i')
        .hasClass('active')
    ) {
      $(this)
        .children('i')
        .removeClass('active');
      $(this).css('color', '#191919');
      var ch_name = $(this).attr('name');
      for (var y = 0; y < 12; y++) {
        if (
          $('.month-list ul li')
            .eq(y)
            .children('i')
            .hasClass('active')
        ) {
          console.log(monthFull);
          if (
            !arrVal(
              $('.month-list ul li')
                .eq(y)
                .attr('name'),
              monthFull
            )
          ) {
            monthFull.push(
              $('.month-list ul li')
                .eq(y)
                .attr('name')
            );
            //						monthFull=arrVal_remove(ch_name,monthFull);
          }
        }
      }
      num++;
    } else {
      var v = arrVal($(this).attr('name'), _month); //判断月份是否已经选择
      if (v) {
        $('.month-error').remove();
        $(this).append(
          '<label class="month-error">你选择的月份已经选了，请重新选择！</label>'
        );
      } else {
        $('.month-error').remove();
        $(this)
          .children('i')
          .addClass('active');
        $(this).css('color', '#A0A0A5');
        for (var y = 0; y < 12; y++) {
          if (
            $('.month-list ul li')
              .eq(y)
              .children('i')
              .hasClass('active')
          ) {
            if (
              !arrVal(
                $('.month-list ul li')
                  .eq(y)
                  .attr('name'),
                monthFull
              )
            ) {
              monthFull.push(
                $('.month-list ul li')
                  .eq(y)
                  .attr('name')
              );
            }
          }
        }
      }
    }
  });
  $('.month-cancel').click(function() {
    //点击取消
    $('.month-mask').remove();
  });
  $('.month-affirm').click(function() {
    //点击确认按钮
    if (monthFull.length) {
      var check_m = '';
      monthFull.sort(function(x, y) {
        return x - y;
      });
      for (var j = 0; j < monthFull.length; j++) {
        check_m += monthFull[j] + ',';
      }
      check_m = check_m.substr(0, check_m.length - 1);
      _this.text(check_m).css('color', '#191919');
      _this
        .parent()
        .prev()
        .children('i')
        .css('color', '#A0A0A5');
    }
    saleWeighted(); //调用加权月平均函数
    $('.month-mask').remove();
  });
}

function select_month() {
  var _month = []; //已选的月份
  var wj = []; //存已选的旺季月份
  var dj = []; //存已选的淡季月份
  var pj = []; //存已选的平季月份
  var wj_month;
  if ($('.wj').text() != '' || $('.wj').text() != null) {
    //旺季
    wj_month = $('.wj').text();
    wj = wj_month.split(',');
  }
  var dj_month;
  if ($('.dj').text() != null || $('.dj').text() != '') {
    //淡季
    dj_month = $('.dj').text();
    dj = dj_month.split(',');
  }
  var pj_month;
  if ($('.pj').text() != null || $('.pj').text() != '') {
    //平季
    pj_month = $('.pj').text();
    pj = pj_month.split(',');
  }
  _month = _month.concat(wj);
  _month = _month.concat(pj);
  _month = _month.concat(dj);
  _month = arrClean(_month);
  return _month;
}

//销售模式类别选择
function type_mask(arr, _th) {
  var tabNav = [];
  var NavTag = $('.xs-type .tab-nav span');
  for (var j = 0; j < NavTag.length; j++) {
    tabNav.push(NavTag.eq(j).text());
    console.log(tabNav);
  }
  var mask = '';
  mask += '<div id="t-mask"><div class="mask-bg"></div><div class="mask-con">';
  mask += '<div class="info-con"><ul>';
  for (var i = 0; i < arr.length; i++) {
    mask += '<li name="' + arr[i].key + '">' + arr[i].value + '</li>';
  }
  mask += '<li class="cancel">取消</li></ul></div></div></div>';
  $(mask).appendTo('body');

  $('.cancel,.mask-bg').click(function() {
    $('#t-mask').remove();
  });

  if (tabNav.length > 0) {
    //隐藏已选择项
    var $li = $('.info-con ul li');
    for (var t = 0; t < $li.length; t++) {
      if (arrVal($li.eq(t).text(), tabNav)) {
        $li.eq(t).hide();
      }
    }
  }

  $('.info-con li')
    .not('.cancel')
    .click(function() {
      //		_th.parent().siblings('.verify-error').remove();
      var checkVal = $(this).text(); //选择的文本值
      var checkGuid = $(this).attr('name'); //guid
      _th.text(checkVal).css('color', '#191919');
      _th.attr('name', checkGuid);
      _th
        .parent()
        .prev()
        .children('i')
        .css('color', '#A0A0A5');
      $('.xs-type .tab-nav span.bg')
        .attr('name', checkGuid)
        .text(checkVal);
      if (!checkVal.indexOf('其他')) {
        _th
          .parent()
          .parent()
          .next('.typeOtherClass')
          .show();
      } else {
        _th
          .parent()
          .parent()
          .next('.typeOtherClass')
          .hide();
        _th
          .parent()
          .parent()
          .next('.typeOtherClass')
          .find('.other-type-val')
          .val('');
      }
      $('.verify-error').remove();
      $('#t-mask').remove();
    });
}

/**
 * 提交答案
 * @param {Object} statue 安卓提供的状态值
 * true为手动提交，false为自动保存
 */
function submit(statue) {
  var submitArr = baseCtrl.getAllData();
  console.log(submitArr);
  for (var i = 0; i < submitArr.projects.length; i++) {
    if (submitArr.projects[i].type == null) {
      submitArr.projects.splice(i, 1);
      i = i - 1;
    }
  }
  for (var j = 0; j < submitArr.types.length; j++) {
    if (submitArr.types[j].type == null) {
      submitArr.types.splice(j, 1);
      j = j - 1;
    }
  }
  var subJosn = {};
  ModeAnswer.bossAcrossTurnover = submitArr.turnover;
  ModeAnswer.bossAcrossTurnoverProjects = submitArr.projects;
  ModeAnswer.bossAcrossTurnoverTypes = submitArr.types;
  answerJson.bossIncomeAccountModel = ModeAnswer;
  subJosn = answerJson;
  //TODO
  var ValidityState = crossValidate();
  androidDataSubmit(statue, subJosn, ValidityState);
}
