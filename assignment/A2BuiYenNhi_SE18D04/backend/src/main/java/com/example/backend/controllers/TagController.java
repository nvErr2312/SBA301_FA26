package com.example.backend.controllers;
import com.example.backend.pojos.Tag;
import com.example.backend.services.TagService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tags")
public class TagController {

    private final TagService tagService;

    public TagController(TagService tagService) {
        this.tagService = tagService;
    }

    @GetMapping
    public List<Tag> getAll() {
        return tagService.getAll();
    }

    @GetMapping("/search")
    public List<Tag> search(@RequestParam String keyword) {
        return tagService.search(keyword);
    }

    @GetMapping("/{id}")
    public Tag getById(@PathVariable Integer id) {
        return tagService.getById(id);
    }

    @PostMapping
    public Tag create(@RequestBody Tag tag) {
        return tagService.create(tag);
    }

    @PutMapping("/{id}")
    public Tag update(@PathVariable Integer id, @RequestBody Tag tag) {
        return tagService.update(id, tag);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        tagService.delete(id);
    }
}