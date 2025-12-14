// src/pages/DocsPage.js
import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Divider,
  Grid,
} from '@mui/material';
import {
  ExpandMore,
  CheckCircle,
  Security,
  Lock,
  Upload,
  Download,
  People,
  History,
  Code,
  Api,
  Settings,
  Help,
} from '@mui/icons-material';

const DocsPage = () => {
  const faqs = [
    {
      question: 'How does the encryption work?',
      answer: 'We use AES-256 encryption for all files. Each file is encrypted client-side before upload and decrypted only when accessed by authorized users.',
    },
    {
      question: 'Is there a file size limit?',
      answer: 'Free tier: 100MB per file. Pro tier: 5GB per file. Enterprise: Custom limits based on your needs.',
    },
    {
      question: 'Can I share files with team members?',
      answer: 'Yes! You can create shareable links with expiration dates and password protection.',
    },
    {
      question: 'How secure are your servers?',
      answer: 'Our servers are hosted on AWS with multiple security layers, regular audits, and SOC 2 compliance.',
    },
  ];

  const apiEndpoints = [
    { method: 'POST', endpoint: '/api/v1.0/users/register', description: 'Register new user' },
    { method: 'POST', endpoint: '/api/v1.0/users/login', description: 'User login' },
    { method: 'POST', endpoint: '/vault/upload', description: 'Upload file' },
    { method: 'GET', endpoint: '/vault/files', description: 'List files' },
    { method: 'GET', endpoint: '/vault/download/{filename}', description: 'Download file' },
    { method: 'DELETE', endpoint: '/vault/delete/{filename}', description: 'Delete file (Admin only)' },
    { method: 'GET', endpoint: '/vault/audit-logs', description: 'Get audit logs' },
  ];

  return (
    <Box sx={{ minHeight: '100vh', background: '#0f172a', pt: 8 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h1"
          sx={{
            mb: 2,
            fontWeight: 900,
            background: 'linear-gradient(45deg, #ffffff 30%, #94a3b8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: { xs: '2.5rem', md: '3.5rem' },
          }}
        >
          Documentation
        </Typography>
        <Typography sx={{ color: '#94a3b8', mb: 6, fontSize: '1.2rem' }}>
          Everything you need to know about Iron-Clad Vault
        </Typography>

        <Grid container spacing={6}>
          <Grid item xs={12} md={8}>
            {/* Quick Start */}
            <Paper sx={{ p: 4, mb: 4, background: 'rgba(15, 23, 42, 0.7)' }}>
              <Typography variant="h4" sx={{ mb: 3, color: '#ffffff', fontWeight: 700 }}>
                🚀 Quick Start Guide
              </Typography>
              
              <List>
                {[
                  'Create an account with email verification',
                  'Set up two-factor authentication for added security',
                  'Create your first vault or organization',
                  'Upload files using drag & drop or API',
                  'Configure access permissions for team members',
                  'Monitor activity through the audit dashboard',
                ].map((item, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckCircle sx={{ color: '#00d4ff' }} />
                    </ListItemIcon>
                    <ListItemText primary={item} sx={{ color: '#94a3b8' }} />
                  </ListItem>
                ))}
              </List>
            </Paper>

            {/* API Documentation */}
            <Paper sx={{ p: 4, mb: 4, background: 'rgba(15, 23, 42, 0.7)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Api sx={{ fontSize: 32, color: '#00d4ff' }} />
                <Typography variant="h4" sx={{ color: '#ffffff', fontWeight: 700 }}>
                  API Reference
                </Typography>
              </Box>
              
              <Box sx={{ background: '#1e293b', borderRadius: 2, p: 3, mb: 3 }}>
                <Typography sx={{ color: '#94a3b8', mb: 2 }}>Base URL:</Typography>
                <Chip label="http://localhost:8080" sx={{ background: '#00d4ff', color: '#ffffff' }} />
              </Box>

              {apiEndpoints.map((api, index) => (
                <Box
                  key={index}
                  sx={{
                    p: 3,
                    mb: 2,
                    background: '#1e293b',
                    borderRadius: 2,
                    borderLeft: '4px solid #00d4ff',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                    <Chip
                      label={api.method}
                      sx={{
                        background: api.method === 'POST' ? '#4caf50' : 
                                   api.method === 'GET' ? '#2196f3' : 
                                   api.method === 'DELETE' ? '#ff4081' : '#ff9800',
                        color: '#ffffff',
                        fontWeight: 600,
                      }}
                    />
                    <Typography sx={{ color: '#ffffff', fontFamily: 'monospace' }}>
                      {api.endpoint}
                    </Typography>
                  </Box>
                  <Typography sx={{ color: '#94a3b8' }}>{api.description}</Typography>
                </Box>
              ))}
            </Paper>

            {/* FAQs */}
            <Paper sx={{ p: 4, background: 'rgba(15, 23, 42, 0.7)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Help sx={{ fontSize: 32, color: '#00d4ff' }} />
                <Typography variant="h4" sx={{ color: '#ffffff', fontWeight: 700 }}>
                  Frequently Asked Questions
                </Typography>
              </Box>

              {faqs.map((faq, index) => (
                <Accordion
                  key={index}
                  sx={{
                    background: '#1e293b',
                    mb: 2,
                    '&:before': { display: 'none' },
                  }}
                >
                  <AccordionSummary expandIcon={<ExpandMore sx={{ color: '#00d4ff' }} />}>
                    <Typography sx={{ color: '#ffffff', fontWeight: 500 }}>
                      {faq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography sx={{ color: '#94a3b8' }}>{faq.answer}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            {/* Sidebar Navigation */}
            <Paper sx={{ p: 3, background: 'rgba(15, 23, 42, 0.7)', position: 'sticky', top: 100 }}>
              <Typography variant="h6" sx={{ mb: 3, color: '#ffffff', fontWeight: 700 }}>
                Contents
              </Typography>
              
              <List>
                {[
                  { icon: <Security />, text: 'Getting Started', href: '#getting-started' },
                  { icon: <Lock />, text: 'Security Features', href: '#security' },
                  { icon: <Upload />, text: 'File Upload Guide', href: '#upload' },
                  { icon: <Download />, text: 'Download & Access', href: '#download' },
                  { icon: <People />, text: 'Team Management', href: '#team' },
                  { icon: <History />, text: 'Audit Logs', href: '#audit' },
                  { icon: <Code />, text: 'API Integration', href: '#api' },
                  { icon: <Settings />, text: 'Configuration', href: '#config' },
                ].map((item, index) => (
                  <ListItem
                    key={index}
                    button
                    component="a"
                    href={item.href}
                    sx={{
                      mb: 1,
                      borderRadius: 2,
                      '&:hover': { background: 'rgba(0, 212, 255, 0.1)' },
                    }}
                  >
                    <ListItemIcon sx={{ color: '#00d4ff' }}>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} sx={{ color: '#94a3b8' }} />
                  </ListItem>
                ))}
              </List>

              <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

              <Typography variant="body2" sx={{ color: '#64748b', textAlign: 'center' }}>
                Need help?<br />
                Contact support@ironclad-vault.com
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default DocsPage;