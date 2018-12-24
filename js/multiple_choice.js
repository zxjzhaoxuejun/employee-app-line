var choice_fun = {
  /**
   * 创建DOM
   * @param {Object} arr 下拉选择数据
   * @param {Object} index 1.表示单选，2.表示多选
   * @param {Object} checkCode已选择的答案
   */
  domHtml: function(arr, index, checkCode) {
    var checkAnswer = checkCode.split(',');
    var liTag = '';
    for (var i = 0; i < arr.length; i++) {
      if (arrVal(arr[i].code, checkAnswer)) {
        liTag +=
          '<li class="info-con-items" name="' +
          arr[i].code +
          '">' +
          '<img src="img/jxt_icon.png">' +
          '<span class="check-title">' +
          arr[i].name +
          '</span>' +
          '</li>';
      } else {
        liTag +=
          '<li class="info-con-items" name="' +
          arr[i].code +
          '">' +
          '<img src="img/jx_icon.png">' +
          '<span class="check-title">' +
          arr[i].name +
          '</span>' +
          '</li>';
      }
    }
    var btn = '取消';
    if (index == 2) {
      btn =
        '<span class="submit-check">确定</span><span class="cancel-check">取消</span>';
    }
    var html =
      '<div id="t-mask"><div class="mask-bg"></div><div class="mask-con">' +
      '<div class="info-con mode1"><ul>' +
      liTag +
      '</ul></div><div class="cancel_1">' +
      btn +
      '</div></div></div>';

    return html;
  },
  /**
   * 多选子下拉框
   * @param {Object}
   * @param {Object} data 下拉字典
   */
  multipleChoice: function(obj, typeCode, checkCode, data) {
    var childList = [];
    for (var i = 0; i < data.length; i++) {
      if (data[i].code === typeCode) {
        childList = data[i].codeDicList;
      }
    }

    var html = this.domHtml(childList, 2, checkCode);
    $(html).appendTo('body');
    $('.info-con-items').click(function() {
      if (
        $(this)
          .children('img')
          .attr('src') == 'img/jxt_icon.png'
      ) {
        $(this)
          .children('img')
          .attr('src', 'img/jx_icon.png');
      } else {
        $(this)
          .children('img')
          .attr('src', 'img/jxt_icon.png');
      }
    });
    $('.cancel-check').click(function() {
      //关闭弹窗
      $('#t-mask').remove();
    });

    $('.submit-check').click(function() {
      //确定选择
      var codeArr = [];
      var textValue = [];
      $('.info-con-items').each(function() {
        if (
          $(this)
            .children('img')
            .attr('src') == 'img/jxt_icon.png'
        ) {
          codeArr.push($(this).attr('name'));
          var str = $(this)
            .children('span')
            .text();
          //					var str = str.split('.');
          textValue.push(str);
        }
      });
      obj
        .parent()
        .prev()
        .children('i')
        .css('color', '#999');
      obj.text(textValue).css('color', '#191919');
      obj.attr('name', codeArr);
      $('#t-mask').remove();
    });
  },
  /**
   * 单选子下拉框
   * @param {Object}
   * @param {Object} data 下拉字典
   */
  childSingleChoice: function(obj, typeCode, checkCode, data) {
    var childList = [];
    for (var i = 0; i < data.length; i++) {
      if (data[i].code === typeCode) {
        childList = data[i].codeDicList;
      }
    }

    var html = this.domHtml(childList, 1, checkCode);
    $(html).appendTo('body');
    $('.info-con-items').click(function() {
      if (
        $(this)
          .children('img')
          .attr('src') == 'img/jxt_icon.png'
      ) {
        $(this)
          .children('img')
          .attr('src', 'img/jx_icon.png');
      } else {
        $(this)
          .children('img')
          .attr('src', 'img/jxt_icon.png');
      }

      var codeArr = $(this).attr('name');
      var textValue = $(this)
        .children('span')
        .text();
      obj
        .parent()
        .prev()
        .children('i')
        .css('color', '#999');
      obj.text(textValue).css('color', '#191919');
      obj.attr('name', codeArr);
      $('#t-mask').remove();
    });
    $('.cancel_1').click(function() {
      //关闭弹窗
      $('#t-mask').remove();
    });
  },
  /**
   * 一级单选
   * @param {Object} obj 元素选择器
   * @param {Object} checkCode 已选择的答案
   * @param {Object} data 下拉字典
   */
  singleChoice: function(obj, checkCode, data) {
    var html = this.domHtml(data, 1, checkCode);
    $(html).appendTo('body');
    $('.info-con-items').click(function() {
      if (
        $(this)
          .children('img')
          .attr('src') == 'img/jxt_icon.png'
      ) {
        $(this)
          .children('img')
          .attr('src', 'img/jx_icon.png');
      } else {
        $(this)
          .children('img')
          .attr('src', 'img/jxt_icon.png');
      }

      var code = $(this).attr('name');
      var textValue = $(this)
        .children('span')
        .text();
      obj.text(textValue).css('color', '#191919');
      obj.attr('name', code);
      obj
        .parent()
        .parent()
        .next()
        .children('.list-right')
        .children('.select-check')
        .text('请选择')
        .css('color', '#ccc');
      obj
        .parent()
        .prev()
        .children('i')
        .css('color', '#999');
      obj
        .parent()
        .parent()
        .next()
        .children('.list-right')
        .children('.select-check')
        .attr('name', '');
      $('#t-mask,.verify-error').remove();
    });
    $('.cancel_1').click(function() {
      //关闭弹窗
      $('#t-mask').remove();
    });
  }
};
/**
 * 文本域最大字符输入限制
 * @param {Object} className 元素class名
 * @param {Object} maxlimit  最大输入字符
 */
function textCounter(className, maxlimit) {
  $('.' + className).on('keyup change', function() {
    if ($(this).val().length > maxlimit) {
      //如果元素区字符数大于最大字符数，按照最大字符数截断；
      $(this).val(
        $(this)
          .val()
          .substring(0, maxlimit)
      );
    } else {
      //在记数区文本框内显示剩余的字符数；
      var limitObj = $(this)
        .next()
        .children('.improt-text');
      limitObj.text(maxlimit - $(this).val().length);
    }
  });
}
/**
 * //判断某个元素是否在数组中
 * @param {Object} val 字符串
 * @param {Object} arr 数组
 */
function arrVal(val, arr) {
  for (var i = 0; i < arr.length; i++) {
    if (val == arr[i]) {
      return true;
    }
  }
}
