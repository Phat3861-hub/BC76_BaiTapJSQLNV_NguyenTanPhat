//============ kiểm tra dữ liệu rỗng ===========

function checkEmptyValue(theThongBao, value) {
  if (value == "") {
    theThongBao.innerHTML = "Vui lòng không bỏ trống";
    return false;
  } else {
    theThongBao.innerHTML = "";
    return true;
  }
}
function validateHoTen(theThongBao, value) {
  // Biểu thức chính quy kiểm tra chữ cái và khoảng trắng
  let regex =
    /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểẾỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/;

  if (!regex.test(value)) {
    theThongBao.innerHTML = "Họ tên chỉ được chứa chữ cái và khoảng trắng.";
    return false;
  } else {
    theThongBao.innerHTML = "";
    return true;
  }
}

function checkMinMaxValue(theThongBao, value, min, max) {
  let isNumber = /^\d+$/.test(value);

  if (!isNumber) {
    theThongBao.innerHTML = "Vui lòng chỉ nhập các ký số.";
    return false;
  }
  let doDaiValue = value.length;
  if (doDaiValue < min || doDaiValue > max) {
    theThongBao.innerHTML = `Vui lòng nhập trong khoảng từ ${min} - ${max}ký số`;
    return false;
  } else {
    theThongBao.innerHTML = "";
    return true;
  }
}

function checkPassword(theThongBao, value, min, max) {
  let regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;

  let doDaiValue = value.length;

  if (doDaiValue < min || doDaiValue > max) {
    theThongBao.innerHTML = `Mật khẩu phải có độ dài từ ${min} - ${max} ký tự.`;
    return false;
  }

  if (!regex.test(value)) {
    theThongBao.innerHTML =
      "Mật khẩu phải chứa ít nhất 1 chữ cái in hoa, 1 chữ số và 1 ký tự đặc biệt.";
    return false;
  }

  theThongBao.innerHTML = "";
  return true;
}

function checkDate(theThongBao, value) {
  let regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;

  if (!regex.test(value)) {
    theThongBao.innerHTML = "Ngày làm phải đúng định dạng mm/dd/yyyy.";
    return false;
  }

  theThongBao.innerHTML = "";
  return true;
}

function checkSalary(theThongBao, value, min, max) {
  let isNumber = /^\d+$/.test(value);
  let luong = parseFloat(value);
  if (!isNumber) {
    theThongBao.innerHTML = "Vui lòng chỉ nhập số.";
    return false;
  }
  if (luong < min || luong > max) {
    theThongBao.innerHTML = `Lương cơ bản phải nằm trong khoảng từ ${min.toLocaleString()} - ${max.toLocaleString()}.`;
    return false;
  }

  theThongBao.innerHTML = "";
  return true;
}

function checkSoGioLam(theThongBao, value, min, max) {
  let isNumber = /^\d+$/.test(value);
  let soGio = parseInt(value, 10);

  if (!isNumber) {
    theThongBao.innerHTML = "Vui lòng chỉ nhập số.";
    return false;
  }
  if (soGio < min || soGio > max) {
    theThongBao.innerHTML = `Số giờ làm phải nằm trong khoảng từ ${min} - ${max} giờ.`;
    return false;
  }

  theThongBao.innerHTML = "";
  return true;
}

function checkEmailValue(theThongBao, value) {
  let regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let checkEmail = regexEmail.test(value); // true || false
  if (checkEmail) {
    theThongBao.innerHTML = "";
    return true;
  } else {
    theThongBao.innerHTML = "vui lòng nhập đúng định dạng email";
    return false;
  }
}
