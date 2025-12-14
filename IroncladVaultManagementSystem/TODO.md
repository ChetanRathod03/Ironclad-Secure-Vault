# TODO: Complete Frontend Implementation

## Phase 4: Services and Interceptors
- [x] Create AuthService: Handle login/register API calls, token management.
- [x] Create VaultService: Handle all vault-related API calls (upload, list, download, etc.).
- [x] Create HTTP Interceptor: Add JWT token to requests, handle 401 errors.

## Phase 5: Backend Adjustments
- [x] Ensure CORS is configured in SecurityConfig.java to allow requests from http://localhost:4200.

## Phase 6: Update Components to Use Services
- [x] Update Login Component: Use AuthService instead of direct HttpClient.
- [x] Update Register Component: Use AuthService instead of direct HttpClient.
- [x] Update Home Component: Use VaultService instead of direct HttpClient, handle logout via AuthService.
- [x] Update app.config.ts: Add the AuthInterceptor to the HTTP client.

## Phase 7: Testing and Finalization
- [ ] Run backend on port 8080.
- [ ] Run frontend on port 4200.
- [ ] Test full flow: register, login, upload file, list files, download, etc.
- [ ] Handle errors and edge cases (invalid login, unauthorized actions).
