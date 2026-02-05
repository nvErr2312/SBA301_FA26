package com.example.backend.constants;

/**
 * Phân quyền theo cột AccountRole trong bảng SystemAccount.
 * Dùng các hằng số này thay vì gõ số 1, 2 để code dễ đọc.
 */
public final class RoleConstants {
    /** Admin (1): quản lý tài khoản (Account Management) */
    public static final int ADMIN = 1;

    /** Staff (2): quản lý danh mục, tin tức, tag, profile */
    public static final int STAFF = 2;

    private RoleConstants() {}
}
