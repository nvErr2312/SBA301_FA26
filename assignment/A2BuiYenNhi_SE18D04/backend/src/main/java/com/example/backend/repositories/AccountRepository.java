package com.example.backend.repositories;

import com.example.backend.pojos.SystemAccount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<SystemAccount, Integer> {

    List<SystemAccount> findByAccountNameContainingIgnoreCaseOrAccountEmailContainingIgnoreCase(String name, String email);

    Optional<SystemAccount> findByAccountEmailIgnoreCase(String accountEmail);
}