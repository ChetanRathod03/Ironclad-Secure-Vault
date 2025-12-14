package com.java.IroncladVaultManagementSystem.service;

import com.java.IroncladVaultManagementSystem.model.AuditLog;
import com.java.IroncladVaultManagementSystem.model.FileEntity;
import com.java.IroncladVaultManagementSystem.model.User;
import com.java.IroncladVaultManagementSystem.repository.AuditLogRepository;
import com.java.IroncladVaultManagementSystem.repository.FileRepository;
import com.java.IroncladVaultManagementSystem.util.AESUtil;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class FileService {

    private final FileRepository fileRepository;
    private final AuditLogRepository auditLogRepository;
    private final SecretKey secretKey;

    public FileService(FileRepository fileRepository,
                       AuditLogRepository auditLogRepository) throws Exception {
        this.fileRepository = fileRepository;
        this.auditLogRepository = auditLogRepository;
        this.secretKey = AESUtil.generateKey();
    }

    public FileEntity uploadFile(String filename, byte[] fileData, User owner) throws IOException {
        try {
            // Create storage directory
            Path storageDir = Paths.get("vault_storage");
            Files.createDirectories(storageDir);

            // Encrypt file data
            String encryptedData = AESUtil.encrypt(Base64.getEncoder().encodeToString(fileData), secretKey);

            // Save encrypted file
            String uniqueFilename = UUID.randomUUID().toString() + "_" + filename;
            String storagePath = storageDir.resolve(uniqueFilename).toString();
            
            try (FileOutputStream fos = new FileOutputStream(storagePath)) {
                fos.write(encryptedData.getBytes());
            }

            // Save metadata
            FileEntity fileEntity = new FileEntity();
            fileEntity.setFilename(filename);
            fileEntity.setFilepath(storagePath);
            fileEntity.setOwner(owner);
            FileEntity saved = fileRepository.save(fileEntity);

            // Log action
            AuditLog log = new AuditLog();
            log.setUser(owner);
            log.setAction("UPLOAD");
            log.setFile(saved);
            auditLogRepository.save(log);

            return saved;
        } catch (Exception e) {
            throw new IOException("Error uploading file: " + e.getMessage(), e);
        }
    }

    public byte[] downloadFile(UUID fileId, User user) throws IOException {
        try {
            FileEntity fileEntity = fileRepository.findById(fileId)
                    .orElseThrow(() -> new IOException("File not found"));

            // Read encrypted data
            String encryptedData = new String(Files.readAllBytes(Path.of(fileEntity.getFilepath())));

            // Decrypt data
            String decryptedBase64 = AESUtil.decrypt(encryptedData, secretKey);
            byte[] decryptedBytes = Base64.getDecoder().decode(decryptedBase64);

            // Log download
            AuditLog log = new AuditLog();
            log.setUser(user);
            log.setAction("DOWNLOAD");
            log.setFile(fileEntity);
            auditLogRepository.save(log);

            return decryptedBytes;
        } catch (Exception e) {
            throw new IOException("Error downloading file: " + e.getMessage(), e);
        }
    }

    public List<FileEntity> listFiles(User owner) {
        return fileRepository.findByOwner(owner);
    }

    public FileEntity getFileEntityById(UUID id, User currentUser) {
        Optional<FileEntity> fileOpt = fileRepository.findById(id);
        if (fileOpt.isPresent()) {
            FileEntity file = fileOpt.get();
            if (file.getOwner().getId().equals(currentUser.getId()) ||
                "ADMIN".equals(currentUser.getRole()) ||
                "MANAGER".equals(currentUser.getRole())) {
                return file;
            }
        }
        return null;
    }

    public List<FileEntity> searchFiles(User user, String query) {
        if (query == null || query.trim().isEmpty()) {
            return fileRepository.findByOwner(user);
        }
        return fileRepository.findByOwnerAndFilenameContaining(user, query.trim());
    }

    public List<AuditLog> getAuditLogs(User user) {
        return auditLogRepository.findByUser(user);
    }

    public List<FileEntity> listAllFiles() {
        return fileRepository.findAll();
    }

    public Optional<FileEntity> findByFilename(String filename) {
        return fileRepository.findByFilename(filename);
    }

    public List<AuditLog> getAllAuditLogs() {
        return auditLogRepository.findAll();
    }

    public List<FileEntity> searchAllFiles(String query) {
        if (query == null || query.trim().isEmpty()) {
            return fileRepository.findAll();
        }
        return fileRepository.findByFilenameContaining(query.trim());
    }
}