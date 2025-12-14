# TODO: Fix Registration and Login Password Issue

## Backend Changes
- [x] Update User.java: Add email and rawPassword fields with getters/setters
- [x] Create RegisterRequest.java DTO with username, email, rawPassword, role
- [x] Update AuthRequest.java: Add @JsonProperty("rawPassword") on password field
- [x] Update UserController.java: Use RegisterRequest for register, AuthRequest for login
- [x] Update UserService.java: saveUser encode user.getRawPassword()

## Frontend Changes
- [x] Update RegisterPage.jsx: Change password to rawPassword in formData and API call
- [x] Update LoginPage.jsx: Change password to rawPassword in formData and login call
- [x] Update AuthContext.jsx: login function takes rawPassword parameter
- [x] Update authService.js: login sends {username, rawPassword}

## Testing
- [ ] Test registration functionality
- [ ] Test login functionality
