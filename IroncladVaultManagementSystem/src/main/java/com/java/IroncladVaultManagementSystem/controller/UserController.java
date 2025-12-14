package com.java.IroncladVaultManagementSystem.controller;

import com.java.IroncladVaultManagementSystem.config.JwtUtil;
import com.java.IroncladVaultManagementSystem.dto.AuthRequest;
import com.java.IroncladVaultManagementSystem.dto.AuthResponse;
import com.java.IroncladVaultManagementSystem.dto.RegisterRequest;
import com.java.IroncladVaultManagementSystem.model.User;
import com.java.IroncladVaultManagementSystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1.0/users")
public class UserController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    @Autowired
    public UserController(UserService userService, AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest) {
        try {
            if (userService.userExists(registerRequest.getUsername())) {
                return ResponseEntity.badRequest().body("Username already exists");
            }
            
            User user = new User();
            user.setUsername(registerRequest.getUsername());
            user.setEmail(registerRequest.getEmail());
            user.setRawPassword(registerRequest.getPassword());
            user.setRole(registerRequest.getRole() != null ? registerRequest.getRole() : "USER");
            
            User savedUser = userService.saveUser(user);
            return ResponseEntity.ok(savedUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody AuthRequest authRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
            );
            
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = jwtUtil.generateToken(authRequest.getUsername());
            
            User user = userService.findByUsername(authRequest.getUsername());
            return ResponseEntity.ok(new AuthResponse(token, user.getUsername(), user.getRole()));
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Login failed: Invalid username or password");
        }
    }
}