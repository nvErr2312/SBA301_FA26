package com.example.backend.services;

import com.example.backend.constants.RoleConstants;
import com.example.backend.pojos.SystemAccount;
import com.example.backend.repositories.AccountRepository;
import com.example.backend.repositories.NewsArticleRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class AccountService implements IAccountService {

    private final AccountRepository accountRepository;
    private final NewsArticleRepository newsArticleRepository;

    public AccountService(AccountRepository accountRepository, NewsArticleRepository newsArticleRepository) {
        this.accountRepository = accountRepository;
        this.newsArticleRepository = newsArticleRepository;
    }

    @Override
    public List<SystemAccount> getAll() {
        return accountRepository.findAll();
    }

    @Override
    public SystemAccount getById(Integer id) {
        return accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Account not found"));
    }

    @Override
    public Optional<SystemAccount> login(String email, String password) {
        if (email == null || password == null) return Optional.empty();
        return accountRepository.findByAccountEmailIgnoreCase(email.trim())
                .filter(acc -> password.equals(acc.getAccountPassword()));
    }

    @Override
    public List<SystemAccount> search(String keyword) {
        return accountRepository
                .findByAccountNameContainingIgnoreCaseOrAccountEmailContainingIgnoreCase(
                        keyword, keyword
                );
    }

    @Override
    public SystemAccount create(SystemAccount account) {
        // Chỉ chấp nhận role 1 (Admin) hoặc 2 (Staff); mặc định Staff nếu null
        if (account.getAccountRole() == null) {
            account.setAccountRole(RoleConstants.STAFF);
        } else if (account.getAccountRole() != RoleConstants.ADMIN && account.getAccountRole() != RoleConstants.STAFF) {
            throw new IllegalArgumentException("AccountRole must be 1 (Admin) or 2 (Staff).");
        }
        return accountRepository.save(account);
    }

    @Override
    public SystemAccount update(Integer id, SystemAccount data) {
        SystemAccount acc = getById(id);

        acc.setAccountName(data.getAccountName());
        acc.setAccountEmail(data.getAccountEmail());
        // Chỉ cho phép role 1 (Admin) hoặc 2 (Staff)
        Integer role = data.getAccountRole();
        if (role != null && role != RoleConstants.ADMIN && role != RoleConstants.STAFF) {
            throw new IllegalArgumentException("AccountRole must be 1 (Admin) or 2 (Staff).");
        }
        if (role != null) {
            acc.setAccountRole(role);
        }

        // Chỉ update password nếu FE gửi lên
        if (data.getAccountPassword() != null && !data.getAccountPassword().isBlank()) {
            acc.setAccountPassword(data.getAccountPassword());
        }

        return accountRepository.save(acc);
    }

    @Override
    public void delete(Integer id) {
        if (newsArticleRepository.countByCreatedByAccountID(id) > 0) {
            throw new IllegalStateException("Cannot delete account: this account has created news articles.");
        }
        accountRepository.deleteById(id);
    }
}
