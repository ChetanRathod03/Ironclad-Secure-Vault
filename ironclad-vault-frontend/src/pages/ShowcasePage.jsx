// src/pages/ShowcasePage.js
import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Avatar,
  AvatarGroup,
  Stack,
  IconButton,
} from '@mui/material';
import {
  GitHub,
  Star,
  ForkRight,
  Visibility,
  Code,
  Rocket,
  Business,
  School,
  Security,
} from '@mui/icons-material';

const ShowcasePage = () => {
  const showcaseProjects = [
    {
      title: 'Financial Data Platform',
      description: 'Secure storage for financial documents with audit trails',
      users: 1500,
      stars: 420,
      logo: '🏦',
      industry: 'Finance',
    },
    {
      title: 'Healthcare Records System',
      description: 'HIPAA compliant medical record storage with encryption',
      users: 3200,
      stars: 680,
      logo: '🏥',
      industry: 'Healthcare',
    },
    {
      title: 'Legal Document Vault',
      description: 'Secure document management for legal firms',
      users: 850,
      stars: 210,
      logo: '⚖️',
      industry: 'Legal',
    },
    {
      title: 'Government Archive',
      description: 'Classified document storage with multi-level security',
      users: 500,
      stars: 150,
      logo: '🏛️',
      industry: 'Government',
    },
    {
      title: 'Startup Tech Stack',
      description: 'Secure file storage for SaaS applications',
      users: 4200,
      stars: 890,
      logo: '🚀',
      industry: 'Technology',
    },
    {
      title: 'Educational Platform',
      description: 'Secure storage for educational materials and research',
      users: 2800,
      stars: 340,
      logo: '🎓',
      industry: 'Education',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'CTO, FinSecure Inc.',
      content: 'Iron-Clad Vault transformed how we handle sensitive financial data. The security features are unmatched.',
      avatar: 'SC',
    },
    {
      name: 'Marcus Johnson',
      role: 'Security Lead, HealthCorp',
      content: 'HIPAA compliance was our biggest challenge. This platform made it simple and secure.',
      avatar: 'MJ',
    },
    {
      name: 'Alex Rivera',
      role: 'Lead Developer, TechStart',
      content: 'The API integration was seamless. Our developers love the comprehensive documentation.',
      avatar: 'AR',
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', background: '#0f172a', pt: 8 }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Chip
            icon={<Star sx={{ fontSize: 16 }} />}
            label="32K+ Stars on GitHub"
            sx={{
              mb: 3,
              background: 'rgba(0, 212, 255, 0.1)',
              color: '#00d4ff',
              fontWeight: 600,
              fontSize: '1.1rem',
              py: 1.5,
            }}
          />
          
          <Typography
            variant="h1"
            sx={{
              mb: 3,
              fontWeight: 900,
              background: 'linear-gradient(45deg, #ffffff 30%, #94a3b8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '2.5rem', md: '4rem' },
            }}
          >
            Projects Showcase
          </Typography>
          
          <Typography sx={{ color: '#94a3b8', maxWidth: '600px', mx: 'auto', fontSize: '1.2rem' }}>
            See how 32,000+ developers and enterprises are using Iron-Clad Vault to secure their applications
          </Typography>
        </Box>

        {/* Stats */}
        <Grid container spacing={4} sx={{ mb: 10 }}>
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 3 }}>
              <Typography variant="h2" sx={{ fontWeight: 900, color: '#00d4ff', mb: 1 }}>
                32K+
              </Typography>
              <Typography sx={{ color: '#94a3b8' }}>GitHub Stars</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 3 }}>
              <Typography variant="h2" sx={{ fontWeight: 900, color: '#4caf50', mb: 1 }}>
                110+
              </Typography>
              <Typography sx={{ color: '#94a3b8' }}>Countries</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 3 }}>
              <Typography variant="h2" sx={{ fontWeight: 900, color: '#ff4081', mb: 1 }}>
                99.9%
              </Typography>
              <Typography sx={{ color: '#94a3b8' }}>Uptime</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 3 }}>
              <Typography variant="h2" sx={{ fontWeight: 900, color: '#ff9800', mb: 1 }}>
                24/7
              </Typography>
              <Typography sx={{ color: '#94a3b8' }}>Support</Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Showcase Projects */}
        <Typography variant="h2" sx={{ mb: 4, fontWeight: 800, color: '#ffffff' }}>
          Featured Projects
        </Typography>
        
        <Grid container spacing={4} sx={{ mb: 10 }}>
          {showcaseProjects.map((project, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Card sx={{ 
                height: '100%',
                background: 'rgba(15, 23, 42, 0.7)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: '#00d4ff',
                  transform: 'translateY(-8px)',
                },
              }}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: '12px',
                        background: 'rgba(0, 212, 255, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem',
                        mr: 3,
                      }}
                    >
                      {project.logo}
                    </Box>
                    <Box>
                      <Typography variant="h5" sx={{ fontWeight: 700, color: '#ffffff' }}>
                        {project.title}
                      </Typography>
                      <Chip
                        label={project.industry}
                        size="small"
                        sx={{
                          background: 'rgba(0, 212, 255, 0.1)',
                          color: '#00d4ff',
                          mt: 1,
                        }}
                      />
                    </Box>
                  </Box>
                  
                  <Typography sx={{ color: '#94a3b8', mb: 3, lineHeight: 1.6 }}>
                    {project.description}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Stack direction="row" spacing={2}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <People sx={{ fontSize: 16, color: '#94a3b8' }} />
                        <Typography sx={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                          {project.users.toLocaleString()}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Star sx={{ fontSize: 16, color: '#ffb300' }} />
                        <Typography sx={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                          {project.stars}
                        </Typography>
                      </Box>
                    </Stack>
                    
                    <IconButton sx={{ color: '#94a3b8' }}>
                      <Visibility />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Testimonials */}
        <Typography variant="h2" sx={{ mb: 4, fontWeight: 800, color: '#ffffff' }}>
          Loved by Devs Around the World
        </Typography>
        
        <Grid container spacing={4} sx={{ mb: 10 }}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ 
                height: '100%',
                background: 'rgba(15, 23, 42, 0.7)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ mb: 3 }}>
                    <Security sx={{ fontSize: 40, color: '#00d4ff', mb: 2 }} />
                    <Typography sx={{ color: '#94a3b8', fontStyle: 'italic', lineHeight: 1.7 }}>
                      "{testimonial.content}"
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ background: 'linear-gradient(45deg, #00d4ff, #5affff)' }}>
                      {testimonial.avatar}
                    </Avatar>
                    <Box>
                      <Typography sx={{ fontWeight: 600, color: '#ffffff' }}>
                        {testimonial.name}
                      </Typography>
                      <Typography sx={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                        {testimonial.role}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* CTA */}
        <Box sx={{ textAlign: 'center', py: 10 }}>
          <Typography variant="h2" sx={{ mb: 3, fontWeight: 900, color: '#ffffff' }}>
            Ready to Join Them?
          </Typography>
          <Typography sx={{ color: '#94a3b8', mb: 5, fontSize: '1.2rem' }}>
            Start securing your projects with enterprise-grade protection today
          </Typography>
          
          <Stack direction="row" spacing={3} justifyContent="center">
            <IconButton
              size="large"
              sx={{
                background: 'linear-gradient(45deg, #00d4ff, #5affff)',
                color: '#ffffff',
                '&:hover': { background: 'linear-gradient(45deg, #00a3cc, #00d4ff)' },
              }}
            >
              <GitHub />
            </IconButton>
            <IconButton
              size="large"
              sx={{
                background: 'linear-gradient(45deg, #4caf50, #8bc34a)',
                color: '#ffffff',
                '&:hover': { background: 'linear-gradient(45deg, #388e3c, #4caf50)' },
              }}
            >
              <Code />
            </IconButton>
            <IconButton
              size="large"
              sx={{
                background: 'linear-gradient(45deg, #ff4081, #ff79b0)',
                color: '#ffffff',
                '&:hover': { background: 'linear-gradient(45deg, #c60055, #ff4081)' },
              }}
            >
              <Rocket />
            </IconButton>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default ShowcasePage;