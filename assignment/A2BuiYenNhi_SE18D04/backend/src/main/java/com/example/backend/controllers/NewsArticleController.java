package com.example.backend.controllers;

import com.example.backend.pojos.NewsArticle;
import com.example.backend.services.NewsArticleService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/news")
public class NewsArticleController {

    private final NewsArticleService newsService;

    public NewsArticleController(NewsArticleService newsService) {
        this.newsService = newsService;
    }

    @GetMapping
    public List<NewsArticle> getAll() {
        return newsService.getAll();
    }

    @GetMapping("/created-by/{accountId}")
    public List<NewsArticle> getByCreatedBy(@PathVariable Integer accountId) {
        return newsService.getByCreatedBy(accountId);
    }

    @GetMapping("/search")
    public List<NewsArticle> search(@RequestParam String keyword) {
        return newsService.search(keyword);
    }

    @GetMapping("/{id}")
    public NewsArticle getById(@PathVariable Integer id) {
        return newsService.getById(id);
    }

    @PostMapping
    public NewsArticle create(@RequestBody NewsArticle news) {
        return newsService.create(news);
    }

    @PutMapping("/{id}")
    public NewsArticle update(@PathVariable Integer id, @RequestBody NewsArticle news) {
        return newsService.update(id, news);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        newsService.delete(id);
    }
}
