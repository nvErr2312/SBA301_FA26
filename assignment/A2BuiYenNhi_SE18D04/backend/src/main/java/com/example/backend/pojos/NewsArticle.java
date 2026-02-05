package com.example.backend.pojos;

import com.example.backend.pojos.SystemAccount;
import com.example.backend.pojos.Category;
import com.example.backend.pojos.Tag;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@Table(name = "NewsArticle")
public class NewsArticle {

    @EqualsAndHashCode.Include
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "NewsArticleID")
    private Integer newsArticleID;

    @Column(name = "NewsTitle", nullable = false, length = 200)
    private String newsTitle;

    @Column(name = "Headline", length = 300)
    private String headline;

    @Column(name = "CreatedDate", nullable = false)
    private LocalDateTime createdDate;

    @Column(name = "NewsContent", nullable = false, columnDefinition = "NVARCHAR(MAX)")
    private String newsContent;

    @Column(name = "NewsSource", nullable = false, length = 150)
    private String newsSource;

    // FK: NewsArticle.CategoryID -> Category.CategoryID
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CategoryID", nullable = false)
    private Category category;

    @Column(name = "NewsStatus", nullable = false)
    private Integer newsStatus; // 1=Visible, 0=Hidden

    // FK: CreatedByID -> SystemAccount.AccountID
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CreatedByID", nullable = false)
    private SystemAccount createdBy;

    // FK: UpdatedByID -> SystemAccount.AccountID
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "UpdatedByID")
    private SystemAccount updatedBy;

    @Column(name = "ModifiedDate")
    private LocalDateTime modifiedDate;

    // Many-to-Many via join table NewsTag(NewsArticleID, TagID)
    @ManyToMany
    @JoinTable(
            name = "NewsTag",
            joinColumns = @JoinColumn(name = "NewsArticleID"),
            inverseJoinColumns = @JoinColumn(name = "TagID")
    )
    private Set<Tag> tags = new HashSet<>();

    @PrePersist
    public void prePersist() {
        // DB có default GETDATE(), nhưng set ở Java giúp tránh null khi insert từ JPA
        if (createdDate == null) createdDate = LocalDateTime.now();
        if (modifiedDate == null) modifiedDate = createdDate;
    }

    @PreUpdate
    public void preUpdate() {
        modifiedDate = LocalDateTime.now();
    }
}