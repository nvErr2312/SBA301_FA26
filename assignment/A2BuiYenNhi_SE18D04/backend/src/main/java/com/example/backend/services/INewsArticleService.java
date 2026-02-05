package com.example.backend.services;

import com.example.backend.pojos.NewsArticle;

import java.util.List;

public interface INewsArticleService {
    List<NewsArticle> getAll();

    NewsArticle getById(Integer id);

    NewsArticle create(NewsArticle news);

    NewsArticle update(Integer id, NewsArticle news);

    void delete(Integer id);

    List<NewsArticle> search(String keyword);

    List<NewsArticle> getByCreatedBy(Integer accountId);
}
