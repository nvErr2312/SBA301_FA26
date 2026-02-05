package com.example.backend.services;

import com.example.backend.pojos.SystemAccount;

import java.util.List;
import java.util.Optional;

public interface IAccountService {

    List<SystemAccount> getAll();

    SystemAccount getById(Integer id);

    Optional<SystemAccount> login(String email, String password);

    List<SystemAccount> search(String keyword);

    SystemAccount create(SystemAccount account);

    SystemAccount update(Integer id, SystemAccount account);

    void delete(Integer id);
}