package com.example.backend.pojos;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@Table(name = "Category")
public class Category {

    @EqualsAndHashCode.Include
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CategoryID")
    private Integer categoryID;

    @Column(name = "CategoryName", nullable = false, length = 100)
    private String categoryName;

    @Column(name = "CategoryDescription", length = 500)
    private String categoryDescription;

    // Read-only copy for DB; custom getter below ensures JSON has value after load
    @Getter(AccessLevel.NONE)
    @Column(name = "ParentCategoryID", insertable = false, updatable = false)
    private Integer parentCategoryID;

    // ParentCategoryID -> CategoryID (self reference)
    // WRITE_ONLY: nhận từ request (Add/Edit) để lưu DB; không gửi ra response (dùng parentCategoryID)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ParentCategoryID")
    private Category parentCategory;

    @JsonIgnore
    @OneToMany(mappedBy = "parentCategory")
    private List<Category> subCategories = new ArrayList<>();

    @Column(name = "IsActive", nullable = false)
    private Integer isActive; // 1=Active, 0=Inactive

    /** For JSON: use relation ID when field is not populated by Hibernate after load. */
    public Integer getParentCategoryID() {
        if (parentCategoryID != null) return parentCategoryID;
        if (parentCategory != null) return parentCategory.getCategoryID();
        return null;
    }
}