package com.example.backend.pojos;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "SystemAccount")
public class SystemAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "AccountID")
    private Integer accountID;

    @Column(name = "AccountName", nullable = false, length = 100)
    private String accountName;

    @Column(name = "AccountEmail", nullable = false, length = 150, unique = true)
    private String accountEmail;

    /** 1 = Admin (quản lý tài khoản), 2 = Staff (quản lý danh mục, tin, tag, profile) */
    @Column(name = "AccountRole", nullable = false)
    private Integer accountRole;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(name = "AccountPassword", nullable = false, length = 100)
    private String accountPassword;
}
