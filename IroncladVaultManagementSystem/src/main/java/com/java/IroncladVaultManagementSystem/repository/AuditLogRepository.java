package com.java.IroncladVaultManagementSystem.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import com.java.IroncladVaultManagementSystem.model.AuditLog;
import com.java.IroncladVaultManagementSystem.model.User;

import java.util.List;
import java.util.UUID;

public interface AuditLogRepository extends JpaRepository<AuditLog, UUID> {
    List<AuditLog> findByUser(User user);
}
