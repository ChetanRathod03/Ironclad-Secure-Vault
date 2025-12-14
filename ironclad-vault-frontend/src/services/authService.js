import api from './api';

const authService = {
  login: (username, password) => {
    console.log('Sending login request:', { username, password });
    return api.post('/api/v1.0/users/login', { 
      username, 
      rawPassword: password 
    });
  },

  register: (userData) => {
    console.log('Sending register request:', userData);
    return api.post('/api/v1.0/users/register', {
      username: userData.username,
      email: userData.email,
      password: userData.password,
      role: userData.role || 'USER'
    });
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

export default authService;