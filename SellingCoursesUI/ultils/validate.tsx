
export function validateFullName(fullName: string) {
  if (fullName.trim() === '') {
    return 'Vui lòng nhập họ và tên';
  }
  return '';
}

export function validateEmail(email: string) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (email.trim() === '') {
    return 'Vui lòng nhập email';
  } else if (!emailRegex.test(email)) {
    return 'email không hợp lệ'
  }
  return '';
}

export function validatePassword(password: string) {

  const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/
  const capitalLettersRegex = /[A-Z]/

  if (password.trim() === '') {
    return 'Vui lòng nhập mật khẩu'
  }

  if (password.length < 8) {
    return 'Độ dài mật khẩu tối thiểu 8 ký tự'
  }

  if (!capitalLettersRegex.test(password)) {
    return 'Mật khẩu phải có ít nhất một ký tự in hoa'
  }

  if (!specialCharRegex.test(password)) {
    return 'Mật khẩu có ít nhất một ký tự đặc biệt';
  }
  return '';
}

export const validatePhoneNumber = (phoneNumber: string) => {
  const regex = /^(03|05|07|08|09)+([0-9]{8})$/;
  if (!regex.test(phoneNumber)) {
    return 'Số điện thoại không hợp lệ'
  }
  return ''
}