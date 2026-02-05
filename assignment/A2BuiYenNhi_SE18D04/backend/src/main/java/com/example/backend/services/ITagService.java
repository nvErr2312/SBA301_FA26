package com.example.backend.services;

import com.example.backend.pojos.Tag;

import java.util.List;

public interface ITagService {
    List<Tag> getAll();

    Tag getById(Integer id);

    Tag create(Tag tag);

    Tag update(Integer id, Tag tag);

    void delete(Integer id);

    List<Tag> search(String keyword);
}
