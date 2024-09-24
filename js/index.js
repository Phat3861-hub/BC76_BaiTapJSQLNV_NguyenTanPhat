let arrNhanVien = [];

document.getElementById("formQLNV").onsubmit = function (event) {
  event.preventDefault();

  let nhanVien = getValueForm();

  if (nhanVien) {
    arrNhanVien.push(nhanVien);
    setLocalStorage("arrNhanVien", arrNhanVien);
    renderDataNhanVien();
  }
  event.target.reset();
};

function renderDataNhanVien(arr = arrNhanVien) {
  let content = "";
  for (let nhanVien of arr) {
    let newNhanVien = new NhanVien();
    Object.assign(newNhanVien, nhanVien);
    let { tknv, name, email, datepicker, chucvu } = newNhanVien;
    content += `
    <tr>
        <td>${tknv}</td>
        <td>${name}</td>
        <td>${email}</td>
        <td>${datepicker}</td>
        <td>${chucvu}</td>
        <td>${newNhanVien.tinhTongLuong()}</td>
        <td>${newNhanVien.xepLoaiNhanVien()}</td>
        <td>
            <button onclick="deleteNhanVien('${tknv}')"  class="btn btn-danger">Xóa</button>
            <button onclick="getInfoNhanVien('${tknv}')" id="btnThem" data-toggle="modal"
									data-target="#myModal"  class="btn btn-warning">Sửa</button>
        </td>
    </tr>
`;
  }
  document.getElementById("tableDanhSach").innerHTML = content;
}
function deleteNhanVien(taiKhoan) {
  let index = arrNhanVien.findIndex((item, i) => item.tknv == taiKhoan);
  if (index != -1) {
    arrNhanVien.splice(index, 1);
    renderDataNhanVien();
    setLocalStorage("arrNhanVien", arrNhanVien);
  }
}
function getValueForm() {
  let arrField = document.querySelectorAll("#formQLNV input, #formQLNV select");

  let nhanVien = new NhanVien();

  let flag = true;

  for (let field of arrField) {
    let { value, id } = field;
    nhanVien[id] = value;
    let theThongBao = field
      .closest(".form-group")
      .querySelector(".sp-thongbao");

    // Kiểm tra trường không để trống
    if (!checkEmptyValue(theThongBao, value)) {
      flag = false;
      continue; // Bỏ qua các kiểm tra sau nếu trường này không hợp lệ
    }

    let dataValue = field.getAttribute("data-validation");
    let dataMin = field.getAttribute("data-min") * 1;
    let dataMax = field.getAttribute("data-max") * 1;

    switch (dataValue) {
      case "email":
        if (!checkEmailValue(theThongBao, value)) {
          flag = false;
        }
        break;

      case "minMax":
        if (!checkMinMaxValue(theThongBao, value, dataMin, dataMax)) {
          flag = false;
        }
        break;

      case "name":
        if (!validateHoTen(theThongBao, value)) {
          flag = false;
        }
        break;

      case "password":
        if (!checkPassword(theThongBao, value, dataMin, dataMax)) {
          flag = false;
        }
        break;

      case "date":
        if (!checkDate(theThongBao, value)) {
          flag = false;
        }
        break;

      case "salary":
        if (!checkSalary(theThongBao, value, dataMin, dataMax)) {
          flag = false;
        }
        break;

      case "time":
        if (!checkSoGioLam(theThongBao, value, dataMin, dataMax)) {
          flag = false;
        }
        break;

      default:
        break; // Nếu không có trường hợp nào khớp, không làm gì cả
    }
  }

  return flag ? nhanVien : null;
}

function getInfoNhanVien(taiKhoan) {
  let nhanVien = arrNhanVien.find((item, index) => item.tknv == taiKhoan);
  if (nhanVien) {
    let arrField = document.querySelectorAll(
      "#formQLNV input, #formQLNV select"
    );
    for (let field of arrField) {
      // field đại diện cho các select input tìm kiếm được trong form
      field.value = nhanVien[field.id];
      if (field.id == "tknv") {
        field.readOnly = true;
      }
    }
  }
}

document.getElementById("btnCapNhat").onclick = function () {
  let nhanVien = getValueForm();
  if (nhanVien) {
    let index = arrNhanVien.findIndex((item, i) => item.tknv == nhanVien.tknv);
    if (index != -1) {
      arrNhanVien[index] = nhanVien;
      renderDataNhanVien();
      setLocalStorage("arrNhanVien", arrNhanVien);
      document.getElementById("tknv").readOnly = false;
      document.getElementById("formQLNV").reset();
    }
  }
};

document.getElementById("btnTimNV").onclick = function (event) {
  let loaiNhanVien = document.getElementById("searchName").value.trim();
  let theThongBao = document.querySelector(".sp-thongbao");

  if (!loaiNhanVien) {
    theThongBao.innerHTML = "Vui lòng chọn loại nhân viên.";
    return;
  }

  let ketQua = [];
  for (let nhanVien of arrNhanVien) {
    let newNhanVien = new NhanVien();
    Object.assign(newNhanVien, nhanVien);

    // Kiểm tra loại nhân viên
    if (newNhanVien.xepLoaiNhanVien() === loaiNhanVien) {
      ketQua.push(newNhanVien);
    }
  }

  // Hiển thị kết quả
  if (ketQua.length > 0) {
    theThongBao.innerHTML = "";
    renderDataNhanVien(ketQua);
  } else {
    theThongBao.innerHTML = "Không tìm thấy nhân viên nào.";
  }
};

// tạo ra một function sẽ giúp đưa bất kĩ dũ liệu nào xuống local storage lưu trữ

window.onload = function () {
  let dataLocal = getLocalStorage("arrNhanVien");
  if (dataLocal) {
    console.log(dataLocal);
    arrNhanVien = dataLocal;
    renderDataNhanVien();
  }
};

function setLocalStorage(key, data) {
  let dataString = JSON.stringify(data);
  localStorage.setItem(key, dataString);
}

function getLocalStorage(key) {
  let dataLocal = localStorage.getItem(key);
  return dataLocal ? JSON.parse(dataLocal) : null;
}
