package com.example.backend.repositories;

import com.example.backend.pojos.NewsArticle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface NewsArticleRepository extends JpaRepository<NewsArticle, Integer> {


    long countByCreatedByAccountID(Integer accountID);

    long countByCategoryCategoryID(Integer categoryID);

    @Query("SELECT DISTINCT n FROM NewsArticle n " +
           "LEFT JOIN FETCH n.category " +
           "LEFT JOIN FETCH n.createdBy " +
           "LEFT JOIN FETCH n.updatedBy " +
           "LEFT JOIN FETCH n.tags")
    List<NewsArticle> findAllWithDetails();

    @Query("SELECT n FROM NewsArticle n " +
           "LEFT JOIN FETCH n.category " +
           "LEFT JOIN FETCH n.createdBy " +
           "LEFT JOIN FETCH n.updatedBy " +
           "LEFT JOIN FETCH n.tags " +
           "WHERE n.newsArticleID = :id")
    Optional<NewsArticle> findByIdWithDetails(@Param("id") Integer id);

    @Query("SELECT DISTINCT n FROM NewsArticle n " +
           "LEFT JOIN FETCH n.category " +
           "LEFT JOIN FETCH n.createdBy " +
           "LEFT JOIN FETCH n.updatedBy " +
           "LEFT JOIN FETCH n.tags " +
           "WHERE LOWER(n.newsTitle) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<NewsArticle> findByNewsTitleContainingIgnoreCaseWithDetails(@Param("keyword") String keyword);

    @Query("SELECT DISTINCT n FROM NewsArticle n " +
           "LEFT JOIN FETCH n.category " +
           "LEFT JOIN FETCH n.createdBy " +
           "LEFT JOIN FETCH n.updatedBy " +
           "LEFT JOIN FETCH n.tags " +
           "WHERE n.createdBy.accountID = :accountId")
    List<NewsArticle> findByCreatedByAccountIDWithDetails(@Param("accountId") Integer accountId);
}