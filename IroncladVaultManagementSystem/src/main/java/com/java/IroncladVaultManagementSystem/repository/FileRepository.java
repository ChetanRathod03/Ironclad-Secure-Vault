package com.java.IroncladVaultManagementSystem.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import com.java.IroncladVaultManagementSystem.model.FileEntity;
import com.java.IroncladVaultManagementSystem.model.User;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface FileRepository extends JpaRepository<FileEntity, UUID> {
    List<FileEntity> findByOwner(User owner);
    List<FileEntity> findByOwnerAndFilenameContaining(User owner, String name);
    Optional<FileEntity> findByOwnerAndFilename(User owner, String filename);
    Optional<FileEntity> findByFilename(String filename);
    List<FileEntity> findByFilenameContaining(String name);
}
