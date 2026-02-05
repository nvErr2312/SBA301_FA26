package com.example.backend.controllers;

import com.example.backend.pojos.SystemAccount;
import com.example.backend.services.IAccountService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/accounts")
public class AccountController {

    private final IAccountService accountService;

    public AccountController(IAccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping
    public List<SystemAccount> getAll() {
        return accountService.getAll();
    }

    @GetMapping("/search")
    public List<SystemAccount> search(@RequestParam String keyword) {
        return accountService.search(keyword);
    }

    @GetMapping("/{id}")
    public SystemAccount getById(@PathVariable Integer id) {
        return accountService.getById(id);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String email = body != null ? body.get("email") : null;
        String password = body != null ? body.get("password") : null;
        if (email == null || password == null) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Email and password are required."));
        }
        var optional = accountService.login(email, password);
        if (optional.isPresent()) {
            return ResponseEntity.ok(optional.get());
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", "Invalid email or password."));
    }

    @PostMapping
    public SystemAccount create(@RequestBody SystemAccount account) {
        return accountService.create(account);
    }

    @PutMapping("/{id}")
    public SystemAccount update(
            @PathVariable Integer id,
            @RequestBody SystemAccount account
    ) {
        return accountService.update(id, account);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        accountService.delete(id);
    }
}
