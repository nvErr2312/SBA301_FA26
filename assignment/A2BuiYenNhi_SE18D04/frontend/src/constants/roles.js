/**
 * Phân quyền theo bảng SystemAccount (cột AccountRole).
 * Dùng các hằng số này thay vì gõ số 1, 2 để code dễ đọc.
 */
export const ROLE_ADMIN = 1   // Admin: quản lý tài khoản (Account Management)
export const ROLE_STAFF = 2   // Staff: quản lý danh mục, tin tức, tag, profile

/** Kiểm tra có phải Admin không */
export function isAdmin(role) {
  return role === ROLE_ADMIN
}

/** Kiểm tra có phải Staff không */
export function isStaff(role) {
  return role === ROLE_STAFF
}

/** Trả về tên hiển thị của role (dùng trong table, form) */
export function getRoleLabel(role) {
  if (role === ROLE_ADMIN) return 'Admin'
  if (role === ROLE_STAFF) return 'Staff'
  return '—'
}
