package com.example.backend.services;

import com.example.backend.pojos.Category;
import com.example.backend.repositories.CategoryRepository;
import com.example.backend.repositories.NewsArticleRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CategoryService implements ICategoryService {

    private final CategoryRepository categoryRepository;
    private final NewsArticleRepository newsArticleRepository;

    public CategoryService(CategoryRepository categoryRepository, NewsArticleRepository newsArticleRepository) {
        this.categoryRepository = categoryRepository;
        this.newsArticleRepository = newsArticleRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Category> getAll() {
        List<Category> list = categoryRepository.findAllWithParent();
        list.forEach(this::fillParentCategoryID);
        return list;
    }

    @Override
    @Transactional(readOnly = true)
    public Category getById(Integer id) {
        Category c = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        fillParentCategoryID(c);
        return c;
    }

    /** Populate parentCategoryID while session is open so JSON has value after reload. */
    private void fillParentCategoryID(Category c) {
        if (c.getParentCategory() != null) {
            c.setParentCategoryID(c.getParentCategory().getCategoryID());
        }
    }

    @Override
    public Category create(Category category) {
        resolveParentCategory(category);
        return categoryRepository.save(category);
    }

    @Override
    public Category update(Integer id, Category category) {
        Category existing = getById(id);
        existing.setCategoryName(category.getCategoryName());
        existing.setCategoryDescription(category.getCategoryDescription());
        existing.setIsActive(category.getIsActive());
        resolveParentCategory(category);
        existing.setParentCategory(category.getParentCategory());
        return categoryRepository.save(existing);
    }

    /** Gán parentCategory thành reference thật từ DB để Hibernate ghi đúng ParentCategoryID. */
    private void resolveParentCategory(Category category) {
        if (category.getParentCategory() != null && category.getParentCategory().getCategoryID() != null) {
            Integer parentId = category.getParentCategory().getCategoryID();
            category.setParentCategory(categoryRepository.getReferenceById(parentId));
        } else {
            category.setParentCategory(null);
        }
    }

    @Override
    public void delete(Integer id) {
        if (newsArticleRepository.countByCategoryCategoryID(id) > 0) {
            throw new IllegalStateException("Cannot delete category: it is already used by one or more news articles.");
        }
        // Chỉ delete khi còn tồn tại → tránh lỗi "row count 0" khi xóa trùng / đã xóa rồi
        categoryRepository.findById(id).ifPresent(categoryRepository::delete);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Category> search(String keyword) {
        List<Category> list = categoryRepository.findByCategoryNameContainingIgnoreCaseWithParent(keyword);
        list.forEach(this::fillParentCategoryID);
        return list;
    }

}
