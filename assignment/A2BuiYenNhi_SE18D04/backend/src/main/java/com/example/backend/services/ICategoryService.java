package com.example.backend.services;

import com.example.backend.pojos.Category;

import java.util.List;

public interface ICategoryService {
    List<Category> getAll();

    Category getById(Integer id);

    Category create(Category category);

    Category update(Integer id, Category category);

    void delete(Integer id);

    List<Category> search(String keyword);
}
