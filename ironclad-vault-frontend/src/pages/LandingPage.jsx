// src/pages/LandingPage.js - COMPLETELY REDESIGNED
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Paper,
  TextField,
  InputAdornment,
  Fade,
  Zoom,
  Chip,
  Stack,
  IconButton,
  Divider,
  Tooltip,
} from '@mui/material';
import {
  Security,
  Storage,
  Lock,
  CloudUpload,
  Visibility,
  Download,
  Search,
  ArrowForward,
  Star,
  GitHub,
  People,
  Shield,
  VerifiedUser,
  UploadFile,
  FileDownload,
  ManageAccounts,
  HistoryToggleOff,
  CheckCircle,
  TrendingUp,
  Bolt,
  LockClock,
} from '@mui/icons-material';

const LandingPage = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  const stats = [
    { value: '99.9%', label: 'Uptime', icon: <Bolt /> },
    { value: '256-bit', label: 'Encryption', icon: <Shield /> },
    { value: '24/7', label: 'Monitoring', icon: <LockClock /> },
    { value: '100%', label: 'Secure', icon: <VerifiedUser /> },
  ];

  const features = [
    {
      icon: <Lock fontSize="large" />,
      title: 'Military-Grade Encryption',
      description: 'AES-256 encryption for all stored files',
      color: '#00d4ff',
    },
    {
      icon: <Storage fontSize="large" />,
      title: 'Secure Cloud Storage',
      description: 'Redundant storage across multiple secure locations',
      color: '#ff4081',
    },
    {
      icon: <CloudUpload fontSize="large" />,
      title: 'Drag & Drop Upload',
      description: 'Seamless file management with bulk upload support',
      color: '#4caf50',
    },
    {
      icon: <Visibility fontSize="large" />,
      title: 'Real-Time Monitoring',
      description: 'Live activity tracking and instant notifications',
      color: '#ff9800',
    },
    {
      icon: <Download fontSize="large" />,
      title: 'Secure Downloads',
      description: 'End-to-end encrypted file transfers',
      color: '#9c27b0',
    },
    {
      icon: <Security fontSize="large" />,
      title: 'Role-Based Access',
      description: 'Granular permissions for teams and individuals',
      color: '#2196f3',
    },
  ];

  const steps = [
    {
      step: '01',
      title: 'Sign Up & Verify',
      description: 'Create your secure account with 2FA verification',
      icon: <VerifiedUser />,
    },
    {
      step: '02',
      title: 'Upload Files',
      description: 'Drag & drop files or use secure upload interface',
      icon: <UploadFile />,
    },
    {
      step: '03',
      title: 'Set Permissions',
      description: 'Configure access controls and sharing settings',
      icon: <ManageAccounts />,
    },
    {
      step: '04',
      title: 'Access Anytime',
      description: 'Retrieve files securely from any device',
      icon: <FileDownload />,
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            radial-gradient(circle at 15% 50%, rgba(0, 212, 255, 0.1) 0%, transparent 25%),
            radial-gradient(circle at 85% 30%, rgba(255, 64, 129, 0.1) 0%, transparent 25%),
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(255, 255, 255, 0.03) 10px,
              rgba(255, 255, 255, 0.03) 20px
            )
          `,
          opacity: 0.4,
        }}
      />

      {/* Floating Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          animation: 'float 20s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-20px)' },
          },
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <Box
          sx={{
            py: 3,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Security sx={{ fontSize: 32, color: '#00d4ff' }} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                background: 'linear-gradient(45deg, #00d4ff, #5affff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              IRON-CLAD VAULT
            </Typography>
          </Box>

          <Stack direction="row" spacing={2}>
            <Button
              color="inherit"
              onClick={() => navigate('/login')}
              sx={{ color: '#94a3b8', '&:hover': { color: '#ffffff' } }}
            >
              Sign In
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate('/register')}
              sx={{
                background: 'linear-gradient(45deg, #00d4ff, #5affff)',
                borderRadius: '50px',
                px: 3,
                '&:hover': {
                  background: 'linear-gradient(45deg, #00a3cc, #00d4ff)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              Get Started
            </Button>
          </Stack>
        </Box>

        {/* Hero Section */}
        <Box
          sx={{
            pt: { xs: 8, md: 15 },
            pb: { xs: 10, md: 20 },
            textAlign: 'center',
            position: 'relative',
          }}
        >
          <Fade in={true} timeout={1000}>
            <Box>
              <Chip
                icon={<Star sx={{ fontSize: 16 }} />}
                label="Trusted by Worldwide "
                sx={{
                  mb: 4,
                  background: 'rgba(0, 212, 255, 0.1)',
                  color: '#00d4ff',
                  fontWeight: 600,
                  backdropFilter: 'blur(10px)',
                }}
              />

              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem', lg: '5rem' },
                  mb: 3,
                  fontWeight: 900,
                  lineHeight: 1.1,
                  background: 'linear-gradient(45deg, #ffffff 30%, #94a3b8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-0.02em',
                }}
              >
                Ironclad-Secure-Vault-System<br />
                <Box component="span" sx={{ color: '#00d4ff' }}>
                  Truly Trusted
                </Box>
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  mb: 5,
                  color: '#94a3b8',
                  maxWidth: '700px',
                  mx: 'auto',
                  lineHeight: 1.6,
                  fontSize: { xs: '1.1rem', md: '1.4rem' },
                }}
              >
                Iron-Clad Secure Vault is an enterprise-grade digital vault system with 
                multi-layer encryption, role-based access control, and comprehensive audit logging.
                Keep your sensitive data protected with military-grade security.
              </Typography>

              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={3}
                justifyContent="center"
                sx={{ mb: 8 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/register')}
                  endIcon={<ArrowForward />}
                  sx={{
                    px: 5,
                    py: 1.5,
                    fontSize: '1.1rem',
                    background: 'linear-gradient(45deg, #00d4ff, #5affff)',
                    borderRadius: '50px',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #00a3cc, #00d4ff)',
                      transform: 'translateY(-3px)',
                      boxShadow: '0 20px 40px rgba(0, 212, 255, 0.3)',
                    },
                  }}
                >
                  Start Free Trial
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/docs')}
                  sx={{
                    px: 5,
                    py: 1.5,
                    fontSize: '1.1rem',
                    borderColor: '#334155',
                    color: '#ffffff',
                    borderRadius: '50px',
                    '&:hover': {
                      borderColor: '#00d4ff',
                      background: 'rgba(0, 212, 255, 0.05)',
                    },
                  }}
                >
                  View Documentation
                </Button>
              </Stack>
            </Box>
          </Fade>

          {/* Stats Bar */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              background: 'rgba(15, 23, 42, 0.7)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 4,
              maxWidth: '900px',
              mx: 'auto',
            }}
          >
            <Grid container spacing={3}>
              {stats.map((stat, index) => (
                <Grid item xs={6} md={3} key={index}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Box
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        background: 'rgba(0, 212, 255, 0.1)',
                        mb: 2,
                        color: '#00d4ff',
                      }}
                    >
                      {stat.icon}
                    </Box>
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 800,
                        color: '#ffffff',
                        mb: 0.5,
                        fontSize: { xs: '1.8rem', md: '2.2rem' },
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography sx={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                      {stat.label}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Box>

        {/* Features Section */}
        <Box sx={{ py: 15 }}>
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              mb: 2,
              fontWeight: 800,
              color: '#ffffff',
              fontSize: { xs: '2rem', md: '3rem' },
            }}
          >
            Enterprise-Grade Security Features
          </Typography>
          <Typography
            sx={{
              textAlign: 'center',
              mb: 8,
              color: '#94a3b8',
              maxWidth: '600px',
              mx: 'auto',
              fontSize: '1.1rem',
            }}
          >
            Everything you need to secure your sensitive data with confidence
          </Typography>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }}>
                  <Card
                    sx={{
                      height: '100%',
                      background: 'rgba(15, 23, 42, 0.7)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      borderRadius: 4,
                      transition: 'all 0.3s ease',
                      transform: hoveredCard === index ? 'translateY(-10px)' : 'none',
                      '&:hover': {
                        borderColor: feature.color,
                        background: 'rgba(15, 23, 42, 0.9)',
                        boxShadow: `0 20px 40px ${feature.color}20`,
                      },
                    }}
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Box
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 60,
                          height: 60,
                          borderRadius: '12px',
                          background: `${feature.color}15`,
                          color: feature.color,
                          mb: 3,
                          '& svg': { fontSize: '2rem' },
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Typography
                        variant="h5"
                        sx={{
                          mb: 2,
                          fontWeight: 700,
                          color: '#ffffff',
                          fontSize: '1.4rem',
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography sx={{ color: '#94a3b8', lineHeight: 1.7 }}>
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Zoom>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* How to Use Steps */}
        <Box sx={{ py: 15, background: 'rgba(0, 0, 0, 0.2)', borderRadius: 4, px: { xs: 2, md: 4 } }}>
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              mb: 2,
              fontWeight: 800,
              color: '#ffffff',
              fontSize: { xs: '2rem', md: '3rem' },
            }}
          >
            Get Started in 4 Simple Steps
          </Typography>
          <Typography
            sx={{
              textAlign: 'center',
              mb: 8,
              color: '#94a3b8',
              maxWidth: '600px',
              mx: 'auto',
              fontSize: '1.1rem',
            }}
          >
            Start securing your files in minutes with our intuitive platform
          </Typography>

          <Grid container spacing={4}>
            {steps.map((step, index) => (
              <Grid item xs={12} md={3} key={index}>
                <Box
                  sx={{
                    textAlign: 'center',
                    p: 4,
                    position: 'relative',
                    '&::after': index < 3 ? {
                      content: '""',
                      position: 'absolute',
                      right: { xs: 0, md: -32 },
                      top: '50%',
                      width: { xs: 0, md: 64 },
                      height: '2px',
                      background: 'linear-gradient(90deg, #00d4ff, transparent)',
                      display: { xs: 'none', md: 'block' },
                    } : {},
                  }}
                >
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #00d4ff, #5affff)',
                      mb: 3,
                      position: 'relative',
                      '&::before': {
                        content: `"${step.step}"`,
                        position: 'absolute',
                        top: -10,
                        right: -10,
                        background: '#ff4081',
                        color: '#ffffff',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        width: 30,
                        height: 30,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      },
                    }}
                  >
                    <Box sx={{ color: '#ffffff', '& svg': { fontSize: '2rem' } }}>
                      {step.icon}
                    </Box>
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 2,
                      fontWeight: 700,
                      color: '#ffffff',
                      fontSize: '1.4rem',
                    }}
                  >
                    {step.title}
                  </Typography>
                  <Typography sx={{ color: '#94a3b8', lineHeight: 1.7 }}>
                    {step.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* CTA Section */}
        <Box sx={{ py: 15, textAlign: 'center' }}>
          <Paper
            sx={{
              p: { xs: 4, md: 8 },
              background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(15, 23, 42, 0.8))',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(0, 212, 255, 0.2)',
              borderRadius: 4,
              maxWidth: '800px',
              mx: 'auto',
            }}
          >
            <Typography
              variant="h2"
              sx={{
                mb: 3,
                fontWeight: 800,
                background: 'linear-gradient(45deg, #00d4ff, #5affff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '2rem', md: '3rem' },
              }}
            >
              Ready to Secure Your Data?
            </Typography>
            <Typography
              variant="h6"
              sx={{ mb: 4, color: '#94a3b8', maxWidth: '600px', mx: 'auto' }}
            >
              Join 32,000+ developers and enterprises who trust Iron-Clad Vault for their sensitive data storage needs.
            </Typography>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={3}
              justifyContent="center"
              sx={{ mt: 6 }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/register')}
                sx={{
                  px: 6,
                  py: 1.5,
                  fontSize: '1.1rem',
                  background: 'linear-gradient(45deg, #00d4ff, #5affff)',
                  borderRadius: '50px',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #00a3cc, #00d4ff)',
                    transform: 'translateY(-3px)',
                  },
                }}
              >
                Get Started Free
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<GitHub />}
                sx={{
                  px: 6,
                  py: 1.5,
                  fontSize: '1.1rem',
                  borderColor: '#334155',
                  color: '#ffffff',
                  borderRadius: '50px',
                  '&:hover': {
                    borderColor: '#00d4ff',
                    background: 'rgba(0, 212, 255, 0.05)',
                  },
                }}
              >
                Star on GitHub
              </Button>
            </Stack>
            <Typography sx={{ mt: 4, color: '#64748b', fontSize: '0.9rem' }}>
              Free forever for individuals • No credit card required
            </Typography>
          </Paper>
        </Box>

        {/* Footer */}
        <Box sx={{ py: 6, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Security sx={{ fontSize: 32, color: '#00d4ff' }} />
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#ffffff' }}>
                  IRON-CLAD VAULT
                </Typography>
              </Box>
              <Typography sx={{ color: '#94a3b8', mb: 3 }}>
                Enterprise-grade secure digital vault system with multi-layer encryption and comprehensive audit logging.
              </Typography>
              <Stack direction="row" spacing={2}>
                <IconButton sx={{ color: '#94a3b8', '&:hover': { color: '#00d4ff' } }}>
                  <GitHub />
                </IconButton>
                <IconButton sx={{ color: '#94a3b8', '&:hover': { color: '#00d4ff' } }}>
                  <People />
                </IconButton>
              </Stack>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography variant="h6" sx={{ mb: 3, color: '#ffffff', fontWeight: 600 }}>
                Product
              </Typography>
              <Stack spacing={2}>
                {['Features', 'Pricing', 'Documentation', 'API'].map((item) => (
                  <Typography
                    key={item}
                    sx={{
                      color: '#94a3b8',
                      cursor: 'pointer',
                      '&:hover': { color: '#ffffff' },
                    }}
                  >
                    {item}
                  </Typography>
                ))}
              </Stack>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography variant="h6" sx={{ mb: 3, color: '#ffffff', fontWeight: 600 }}>
                Company
              </Typography>
              <Stack spacing={2}>
                {['About', 'Blog', 'Careers', 'Contact'].map((item) => (
                  <Typography
                    key={item}
                    sx={{
                      color: '#94a3b8',
                      cursor: 'pointer',
                      '&:hover': { color: '#ffffff' },
                    }}
                  >
                    {item}
                  </Typography>
                ))}
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ mb: 3, color: '#ffffff', fontWeight: 600 }}>
                Stay Updated
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter your email"
                variant="outlined"
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        variant="contained"
                        sx={{
                          background: 'linear-gradient(45deg, #00d4ff, #5affff)',
                          borderRadius: '50px',
                          px: 3,
                        }}
                      >
                        Subscribe
                      </Button>
                    </InputAdornment>
                  ),
                  sx: {
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '50px',
                    color: '#ffffff',
                  },
                }}
              />
            </Grid>
          </Grid>
          <Divider sx={{ my: 6, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
          <Typography sx={{ textAlign: 'center', color: '#64748b', fontSize: '0.9rem' }}>
            © 2025 Iron-Clad Vault. All rights reserved. Built with ❤️ for security-conscious developers.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default LandingPage;