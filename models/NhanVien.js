class NhanVien {
  tknv = "";
  name = "";
  email = "";
  password = "";
  datepicker = "";
  luongCB = "";
  chucvu = "";
  gioLam = "";
  constructor(name, gioLam) {
    this.name = name;
    this.gioLam = gioLam; // Thêm biến giờ làm
  }

  tinhTongLuong = function () {
    switch (this.chucvu) {
      case "Sếp":
        return this.luongCB * 3;
      case "Trưởng phòng":
        return this.luongCB * 2;
      case "Nhân viên":
        return this.luongCB;
      default:
        return 0;
    }
  };

  xepLoaiNhanVien = function () {
    if (this.gioLam >= 192) {
      return "Xuất sắc";
    } else if (this.gioLam >= 176 && this.gioLam < 192) {
      return "Giỏi";
    } else if (this.gioLam >= 160 && this.gioLam < 176) {
      return "Khá";
    } else {
      return "Trung bình";
    }
  };
}
