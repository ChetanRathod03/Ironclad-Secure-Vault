// src/pages/LoginPage.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Lock,
  Person,
} from '@mui/icons-material';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    rawPassword: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(formData.username, formData.password);
    
    if (result.success) {
      toast.success('Login successful!');
      navigate('/dashboard');
    } else {
      setError(result.message);
      toast.error('Login failed!');
    }
    
    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0a1929 0%, #132f4c 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Animation */}
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: `
            radial-gradient(circle at 20% 80%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 64, 129, 0.1) 0%, transparent 50%)
          `,
          animation: 'pulse 10s ease-in-out infinite',
          '@keyframes pulse': {
            '0%, 100%': { opacity: 1 },
            '50%': { opacity: 0.8 },
          },
        }}
      />

      <Container maxWidth="sm">
        <Paper
          elevation={24}
          sx={{
            p: 6,
            background: 'rgba(19, 47, 76, 0.9)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 212, 255, 0.3)',
            borderRadius: 4,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Security Pattern Overlay */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `
                linear-gradient(45deg, transparent 48%, rgba(0, 212, 255, 0.05) 50%, transparent 52%),
                linear-gradient(-45deg, transparent 48%, rgba(0, 212, 255, 0.05) 50%, transparent 52%)
              `,
              backgroundSize: '20px 20px',
              opacity: 0.3,
              pointerEvents: 'none',
            }}
          />

          <Box sx={{ position: 'relative', zIndex: 1 }}>
            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Lock
                sx={{
                  fontSize: '4rem',
                  color: '#00d4ff',
                  mb: 2,
                  filter: 'drop-shadow(0 0 10px rgba(0, 212, 255, 0.5))',
                }}
              />
              <Typography
                variant="h4"
                sx={{
                  mb: 1,
                  fontWeight: 700,
                  background: 'linear-gradient(45deg, #00d4ff, #5affff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Secure Login
              </Typography>
              <Typography sx={{ color: '#a0aec0' }}>
                Enter your credentials to access Iron-Clad Vault
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person sx={{ color: '#00d4ff' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'rgba(0, 212, 255, 0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: '#00d4ff',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#00d4ff',
                      boxShadow: '0 0 0 2px rgba(0, 212, 255, 0.2)',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#a0aec0',
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#00d4ff',
                  },
                }}
              />

              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: '#00d4ff' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{ color: '#00d4ff' }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'rgba(0, 212, 255, 0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: '#00d4ff',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#00d4ff',
                      boxShadow: '0 0 0 2px rgba(0, 212, 255, 0.2)',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#a0aec0',
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#00d4ff',
                  },
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{
                  mt: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  background: 'linear-gradient(45deg, #00d4ff, #5affff)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #00a3cc, #00d4ff)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 10px 20px rgba(0, 212, 255, 0.3)',
                  },
                  '&:disabled': {
                    background: 'linear-gradient(45deg, #666, #888)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: '#fff' }} />
                ) : (
                  'LOGIN'
                )}
              </Button>
            </form>

            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Typography sx={{ color: '#a0aec0' }}>
                Don't have an account?{' '}
                <Link
                  to="/register"
                  style={{
                    color: '#00d4ff',
                    textDecoration: 'none',
                    fontWeight: 600,
                  }}
                >
                  Sign Up
                </Link>
              </Typography>
              <Link
                to="/"
                style={{
                  display: 'block',
                  marginTop: 2,
                  color: '#a0aec0',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                }}
              >
                ← Back to Home
              </Link>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;