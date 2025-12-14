package com.java.IroncladVaultManagementSystem.controller;

import com.java.IroncladVaultManagementSystem.model.AuditLog;
import com.java.IroncladVaultManagementSystem.model.FileEntity;
import com.java.IroncladVaultManagementSystem.model.User;
import com.java.IroncladVaultManagementSystem.repository.AuditLogRepository;
import com.java.IroncladVaultManagementSystem.repository.FileRepository;
import com.java.IroncladVaultManagementSystem.service.FileService;
import com.java.IroncladVaultManagementSystem.service.UserService;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1.0/vault")
public class VaultController {

    private final FileService fileService;
    private final UserService userService;
    private final FileRepository fileRepository;
    private final AuditLogRepository auditLogRepository;

    public VaultController(FileService fileService, UserService userService, 
                          FileRepository fileRepository, AuditLogRepository auditLogRepository) {
        this.fileService = fileService;
        this.userService = userService;
        this.fileRepository = fileRepository;
        this.auditLogRepository = auditLogRepository;
    }

    private User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated()) {
            String username = auth.getName();
            return userService.findByUsername(username);
        }
        throw new RuntimeException("User not authenticated");
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {
        User user = getCurrentUser();
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("File is empty");
            }
            
            FileEntity saved = fileService.uploadFile(file.getOriginalFilename(), file.getBytes(), user);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Upload failed: " + e.getMessage());
        }
    }

    @GetMapping("/files")
    public ResponseEntity<?> listFiles() {
        try {
            User user = getCurrentUser();
            if ("ADMIN".equals(user.getRole()) || "MANAGER".equals(user.getRole())) {
                return ResponseEntity.ok(fileService.listAllFiles());
            } else {
                return ResponseEntity.ok(fileService.listFiles(user));
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Failed to load files");
        }
    }

    @GetMapping("/download/{fileId}")
    public ResponseEntity<?> downloadFile(@PathVariable UUID fileId) {
        User user = getCurrentUser();
        try {
            FileEntity file = fileService.getFileEntityById(fileId, user);
            if (file == null) {
                return ResponseEntity.notFound().build();
            }
            
            // Check permissions
            if (!"ADMIN".equals(user.getRole()) && 
                !"MANAGER".equals(user.getRole()) && 
                !file.getOwner().getId().equals(user.getId())) {
                return ResponseEntity.status(403).body("Access denied");
            }
            
            byte[] data = fileService.downloadFile(fileId, user);
            return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(data);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Download failed: " + e.getMessage());
        }
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchFiles(@RequestParam("query") String query) {
        try {
            User user = getCurrentUser();
            List<FileEntity> files;
            
            if ("ADMIN".equals(user.getRole()) || "MANAGER".equals(user.getRole())) {
                files = fileService.searchAllFiles(query);
            } else {
                files = fileService.searchFiles(user, query);
            }
            
            return ResponseEntity.ok(files);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Search failed: " + e.getMessage());
        }
    }

    @GetMapping("/audit-logs")
    public ResponseEntity<?> getAuditLogs() {
        User user = getCurrentUser();
        if (!"ADMIN".equals(user.getRole())) {
            return ResponseEntity.status(403).body("Access denied");
        }
        
        return ResponseEntity.ok(fileService.getAllAuditLogs());
    }

    @DeleteMapping("/delete/{fileId}")
    public ResponseEntity<?> deleteFile(@PathVariable UUID fileId) {
        User user = getCurrentUser();
        if (!"ADMIN".equals(user.getRole())) {
            return ResponseEntity.status(403).body("Delete not allowed");
        }
        
        try {
            FileEntity file = fileRepository.findById(fileId)
                .orElseThrow(() -> new RuntimeException("File not found"));
                
            Files.deleteIfExists(Paths.get(file.getFilepath()));
            fileRepository.delete(file);
            
            AuditLog log = new AuditLog();
            log.setUser(user);
            log.setAction("DELETE");
            log.setFile(file);
            auditLogRepository.save(log);
            
            return ResponseEntity.ok("File deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Delete failed: " + e.getMessage());
        }
    }
}