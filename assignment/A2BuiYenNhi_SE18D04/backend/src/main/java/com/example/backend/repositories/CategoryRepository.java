package com.example.backend.repositories;

import com.example.backend.pojos.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Integer> {

    @org.springframework.data.jpa.repository.EntityGraph(attributePaths = "parentCategory")
    @Query("SELECT c FROM Category c")
    List<Category> findAllWithParent();

    @org.springframework.data.jpa.repository.EntityGraph(attributePaths = "parentCategory")
    @Query("SELECT c FROM Category c WHERE LOWER(c.categoryName) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Category> findByCategoryNameContainingIgnoreCaseWithParent(String keyword);
}