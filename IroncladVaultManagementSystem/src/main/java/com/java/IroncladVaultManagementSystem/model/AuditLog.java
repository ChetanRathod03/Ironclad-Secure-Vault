package com.java.IroncladVaultManagementSystem.model;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class AuditLog {
	    @Id
	    @GeneratedValue
	    private UUID id;

	    @ManyToOne
	    @JoinColumn(name = "user_id")
	    private User user;

	    private String action;

	    @ManyToOne
	    @JoinColumn(name = "file_id")
	    private FileEntity file;

	    private LocalDateTime timestamp = LocalDateTime.now();

		public UUID getId() {
			return id;
		}

		public void setId(UUID id) {
			this.id = id;
		}

		public User getUser() {
			return user;
		}

		public void setUser(User user) {
			this.user = user;
		}

		public String getAction() {
			return action;
		}

		public void setAction(String action) {
			this.action = action;
		}

		public FileEntity getFile() {
			return file;
		}

		public void setFile(FileEntity file) {
			this.file = file;
		}

		public LocalDateTime getTimestamp() {
			return timestamp;
		}

		public void setTimestamp(LocalDateTime timestamp) {
			this.timestamp = timestamp;
		}
	    
	    
}
