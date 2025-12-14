package com.java.IroncladVaultManagementSystem.dto;



import java.util.UUID;

public class FileResponse {
    private UUID id;
    private String filename;
    private String uploadedBy;
    private String uploadTime;

    public FileResponse(UUID id, String filename, String uploadedBy, String uploadTime) {
        this.id = id;
        this.filename = filename;
        this.uploadedBy = uploadedBy;
        this.uploadTime = uploadTime;
    }

    public UUID getId() { return id; }
    public String getFilename() { return filename; }
    public String getUploadedBy() { return uploadedBy; }
    public String getUploadTime() { return uploadTime; }
}

