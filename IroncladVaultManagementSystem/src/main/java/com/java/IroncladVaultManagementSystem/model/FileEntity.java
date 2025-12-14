package com.java.IroncladVaultManagementSystem.model;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class FileEntity {
	    @Id
	    @GeneratedValue
	    private UUID id;

	    private String filename;
	    private String filepath;

	    @ManyToOne
	    @JoinColumn(name = "owner_id")
	    private User owner;

	    private LocalDateTime createdAt = LocalDateTime.now();

		public UUID getId() {
			return id;
		}

		public void setId(UUID id) {
			this.id = id;
		}

		public String getFilename() {
			return filename;
		}

		public void setFilename(String filename) {
			this.filename = filename;
		}

		public String getFilepath() {
			return filepath;
		}

		public void setFilepath(String filepath) {
			this.filepath = filepath;
		}

		public User getOwner() {
			return owner;
		}

		public void setOwner(User owner) {
			this.owner = owner;
		}

		public LocalDateTime getCreatedAt() {
			return createdAt;
		}

		public void setCreatedAt(LocalDateTime createdAt) {
			this.createdAt = createdAt;
		}
	    
	    
}
