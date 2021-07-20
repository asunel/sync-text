// Restricts input for the set of matched elements to the given inputFilter function.
(function ($) {
  $.fn.inputFilter = function (inputFilter) {
    return this.on('input keydown keyup mousedown mouseup select contextmenu drop', function () {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty('oldValue')) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = '';
      }
    });
  };
}(jQuery));

var copyToClipboard = function (text) {
  var $temp = $('<input>');
  $('body').append($temp);
  $temp.val(text).select();
  document.execCommand('copy');
  $temp.remove();
}

var getTextFromClipboard = function () {
  var $temp = $('<input>');
  $('body').append($temp);
  $temp.focus();
  document.execCommand('paste');
  var text = $temp.val();
  $temp.remove();
  return text;
}

var calculateAge = function (dob) {
  return Math.floor((new Date() - dob) / (365.25 * 24 * 60 * 60 * 1000));
};

var isValidDate = function (year, month, day) {
  var date = new Date(year, month - 1, day);
  return (date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day);
};

var converToDateFormatString = function (partialyear, month, day) {
  var year = '20' + partialyear;
  var today = new Date();
  var dob = new Date(year, month - 1, day);
  if (dob > today) {
    dob = new Date(+('19' + partialyear), month - 1, day);
  }

  return dob;
};

var cloneDate = function (dateToClone) {
  return new Date(dateToClone.getTime());
};

var getRandomDate = function (minAge, maxAge) {
  var today = new Date();
  var fromDate = cloneDate(today);
  var toDate = cloneDate(today);
  fromDate = new Date(fromDate.setFullYear(fromDate.getFullYear() - maxAge));
  toDate = new Date(toDate.setFullYear(toDate.getFullYear() - minAge));

  var from_ts = fromDate.getTime();
  var to_ts = toDate.getTime();
  var randomDate = new Date(Math.floor(Math.random() * (to_ts - from_ts)) + from_ts);
  return randomDate;
};

function getCheckboxChecked(id) {
  return $(id).prop('checked');
}

function setCheckbox(id, checked, triggerChange = false) {
  $(id).prop('checked', checked);
  if (triggerChange) {
    $(id).change();
  }
}

function enableControl(id, enabled) {
  $(id).prop('disabled', !enabled)
}

function convertToYYMMDD(date) {
  return date.toISOString().split('T')[0].replaceAll('-', '').slice(2)
}
