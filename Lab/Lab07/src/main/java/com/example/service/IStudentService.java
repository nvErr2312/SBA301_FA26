package com.example.service;

import com.example.pojos.Student;

import java.util.List;

public interface IStudentService {
    void save(Student student);
    void update(Student student);
    void delete(Student student);
    Student findById(int studentId);
    Student findByEmail(String email);
    List<Student> findAll();

}
