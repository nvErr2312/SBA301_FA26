package com.example.backend.services;

import com.example.backend.pojos.NewsArticle;
import com.example.backend.pojos.Tag;
import com.example.backend.repositories.AccountRepository;
import com.example.backend.repositories.CategoryRepository;
import com.example.backend.repositories.NewsArticleRepository;
import com.example.backend.repositories.TagRepository;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.Optional;

@Service
public class NewsArticleService implements INewsArticleService {

    private final NewsArticleRepository newsRepository;
    private final CategoryRepository categoryRepository;
    private final AccountRepository accountRepository;
    private final TagRepository tagRepository;

    public NewsArticleService(
            NewsArticleRepository newsRepository,
            CategoryRepository categoryRepository,
            AccountRepository accountRepository,
            TagRepository tagRepository
    ) {
        this.newsRepository = newsRepository;
        this.categoryRepository = categoryRepository;
        this.accountRepository = accountRepository;
        this.tagRepository = tagRepository;
    }

    @Override
    public List<NewsArticle> getAll() {
        return newsRepository.findAllWithDetails();
    }

    @Override
    public NewsArticle getById(Integer id) {
        return newsRepository.findByIdWithDetails(id)
                .orElseThrow(() -> new RuntimeException("News not found"));
    }

    @Override
    public NewsArticle create(NewsArticle news) {
        resolveReferences(news);
        NewsArticle saved = newsRepository.save(news);
        return getById(saved.getNewsArticleID());
    }

    @Override
    public NewsArticle update(Integer id, NewsArticle news) {
        NewsArticle existing = getById(id);
        existing.setNewsTitle(news.getNewsTitle());
        existing.setHeadline(news.getHeadline());
        existing.setNewsContent(news.getNewsContent());
        existing.setNewsSource(news.getNewsSource());
        existing.setNewsStatus(news.getNewsStatus());
        if (news.getCategory() != null && news.getCategory().getCategoryID() != null) {
            existing.setCategory(categoryRepository.findById(news.getCategory().getCategoryID())
                    .orElseThrow(() -> new RuntimeException("Category not found")));
        }
        if (news.getUpdatedBy() != null && news.getUpdatedBy().getAccountID() != null) {
            existing.setUpdatedBy(accountRepository.findById(news.getUpdatedBy().getAccountID())
                    .orElseThrow(() -> new RuntimeException("Account not found")));
        }
        if (news.getTags() != null && !news.getTags().isEmpty()) {
            Set<Tag> resolved = news.getTags().stream()
                    .filter(t -> t.getTagID() != null)
                    .map(t -> tagRepository.findById(t.getTagID()))
                    .filter(Optional::isPresent)
                    .map(Optional::get)
                    .collect(Collectors.toSet());
            existing.setTags(resolved);
        } else {
            existing.setTags(new HashSet<>());
        }
        newsRepository.save(existing);
        return getById(id);
    }

    private void resolveReferences(NewsArticle news) {
        if (news.getCategory() != null && news.getCategory().getCategoryID() != null) {
            news.setCategory(categoryRepository.findById(news.getCategory().getCategoryID())
                    .orElseThrow(() -> new RuntimeException("Category not found")));
        }
        if (news.getCreatedBy() != null && news.getCreatedBy().getAccountID() != null) {
            news.setCreatedBy(accountRepository.findById(news.getCreatedBy().getAccountID())
                    .orElseThrow(() -> new RuntimeException("Account not found")));
        }
        if (news.getUpdatedBy() != null && news.getUpdatedBy().getAccountID() != null) {
            news.setUpdatedBy(accountRepository.findById(news.getUpdatedBy().getAccountID())
                    .orElseThrow(() -> new RuntimeException("Account not found")));
        }
        if (news.getTags() != null && !news.getTags().isEmpty()) {
            Set<Tag> resolved = news.getTags().stream()
                    .filter(t -> t.getTagID() != null)
                    .map(t -> tagRepository.findById(t.getTagID()))
                    .filter(Optional::isPresent)
                    .map(Optional::get)
                    .collect(Collectors.toSet());
            news.setTags(resolved);
        } else {
            news.setTags(new HashSet<>());
        }
    }

    @Override
    public void delete(Integer id) {
        newsRepository.deleteById(id);
    }

    @Override
    public List<NewsArticle> search(String keyword) {
        return newsRepository.findByNewsTitleContainingIgnoreCaseWithDetails(keyword);
    }

    @Override
    public List<NewsArticle> getByCreatedBy(Integer accountId) {
        return newsRepository.findByCreatedByAccountIDWithDetails(accountId);
    }
}