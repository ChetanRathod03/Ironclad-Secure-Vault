
package com.java.IroncladVaultManagementSystem.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AuthRequest {
    private String username;

    @JsonProperty("rawPassword")
    private String password;

    public AuthRequest() {
    }

    public AuthRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
