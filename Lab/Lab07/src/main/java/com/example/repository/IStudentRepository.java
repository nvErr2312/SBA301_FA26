package com.example.repository;

import com.example.pojos.Student;

import java.util.List;

public interface IStudentRepository {
    void save(Student student);
    void update(Student student);
    void delete(Student student);
    Student findById(int studentId);
    Student findByEmail(String email);
    List<Student> findAll();

}
