package com.example.backend.services;

import com.example.backend.pojos.Tag;
import com.example.backend.repositories.TagRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TagService implements ITagService {
    private final TagRepository tagRepository;

    public TagService(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    @Override
    public List<Tag> getAll() {
        return tagRepository.findAll();
    }

    @Override
    public Tag getById(Integer id) {
        return tagRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tag not found"));
    }

    @Override
    public Tag create(Tag tag) {
        return tagRepository.save(tag);
    }

    @Override
    public Tag update(Integer id, Tag tag) {
        Tag existing = getById(id);
        existing.setTagName(tag.getTagName());
        existing.setNote(tag.getNote());
        return tagRepository.save(existing);
    }

    @Override
    public void delete(Integer id) {
        tagRepository.deleteById(id);
    }

    @Override
    public List<Tag> search(String keyword) {
        return tagRepository.findByTagNameContainingIgnoreCase(keyword);
    }
}
