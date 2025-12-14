// src/pages/AuditLogsPage.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
  Chip,
} from '@mui/material';
import {
  Security,
  Person,
  FilePresent,
  Download,
  Delete,
  Search,
} from '@mui/icons-material';
import fileService from '../services/fileService';

const AuditLogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAuditLogs();
  }, []);

  const fetchAuditLogs = async () => {
    try {
      const response = await fileService.getAuditLogs();
      console.log('Audit logs response:', response);
      
      if (Array.isArray(response.data)) {
        setLogs(response.data);
      } else if (response.data && Array.isArray(response.data.logs)) {
        setLogs(response.data.logs);
      } else {
        console.warn('Unexpected audit logs format:', response.data);
        setError('Unexpected data format received');
      }
    } catch (error) {
      console.error('Error fetching audit logs:', error);
      setError(error.message || 'Failed to fetch audit logs');
    } finally {
      setLoading(false);
    }
  };

  const getActionIcon = (action) => {
    switch (action.toLowerCase()) {
      case 'upload':
        return <FilePresent sx={{ color: '#4caf50' }} />;
      case 'download':
        return <Download sx={{ color: '#2196f3' }} />;
      case 'delete':
        return <Delete sx={{ color: '#f44336' }} />;
      case 'search':
        return <Search sx={{ color: '#ff9800' }} />;
      default:
        return <Security sx={{ color: '#9c27b0' }} />;
    }
  };

  const getActionColor = (action) => {
    switch (action.toLowerCase()) {
      case 'upload':
        return 'success';
      case 'download':
        return 'info';
      case 'delete':
        return 'error';
      case 'search':
        return 'warning';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #0a1929 0%, #132f4c 100%)',
        }}
      >
        <CircularProgress sx={{ color: '#00d4ff' }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a1929 0%, #132f4c 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              mb: 2,
              fontWeight: 700,
              background: 'linear-gradient(45deg, #00d4ff, #5affff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Audit Logs
          </Typography>
          <Typography sx={{ color: '#a0aec0' }}>
            Comprehensive security monitoring and activity tracking for Iron-Clad Vault
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Paper
          sx={{
            background: 'rgba(19, 47, 76, 0.9)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 212, 255, 0.3)',
            borderRadius: 2,
          }}
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      color: '#00d4ff',
                      fontWeight: 600,
                      borderBottom: '1px solid rgba(0, 212, 255, 0.3)',
                    }}
                  >
                    Timestamp
                  </TableCell>
                  <TableCell
                    sx={{
                      color: '#00d4ff',
                      fontWeight: 600,
                      borderBottom: '1px solid rgba(0, 212, 255, 0.3)',
                    }}
                  >
                    User
                  </TableCell>
                  <TableCell
                    sx={{
                      color: '#00d4ff',
                      fontWeight: 600,
                      borderBottom: '1px solid rgba(0, 212, 255, 0.3)',
                    }}
                  >
                    Action
                  </TableCell>
                  <TableCell
                    sx={{
                      color: '#00d4ff',
                      fontWeight: 600,
                      borderBottom: '1px solid rgba(0, 212, 255, 0.3)',
                    }}
                  >
                    Resource
                  </TableCell>
                  <TableCell
                    sx={{
                      color: '#00d4ff',
                      fontWeight: 600,
                      borderBottom: '1px solid rgba(0, 212, 255, 0.3)',
                    }}
                  >
                    IP Address
                  </TableCell>
                  <TableCell
                    sx={{
                      color: '#00d4ff',
                      fontWeight: 600,
                      borderBottom: '1px solid rgba(0, 212, 255, 0.3)',
                    }}
                  >
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {logs.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      sx={{
                        textAlign: 'center',
                        color: '#a0aec0',
                        py: 4,
                      }}
                    >
                      No audit logs available
                    </TableCell>
                  </TableRow>
                ) : (
                  logs.map((log, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        '&:hover': {
                          backgroundColor: 'rgba(0, 212, 255, 0.05)',
                        },
                      }}
                    >
                      <TableCell sx={{ color: '#ffffff' }}>
                        {new Date(log.timestamp).toLocaleString()}
                      </TableCell>
                      <TableCell sx={{ color: '#ffffff' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Person sx={{ color: '#00d4ff', fontSize: '1rem' }} />
                          {log.username}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ color: '#ffffff' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {getActionIcon(log.action)}
                          <Chip
                            label={log.action}
                            size="small"
                            color={getActionColor(log.action)}
                            variant="outlined"
                            sx={{
                              color: '#ffffff',
                              borderColor: 'rgba(0, 212, 255, 0.3)',
                            }}
                          />
                        </Box>
                      </TableCell>
                      <TableCell sx={{ color: '#ffffff' }}>
                        {log.resource || 'N/A'}
                      </TableCell>
                      <TableCell sx={{ color: '#ffffff' }}>
                        {log.ipAddress || 'N/A'}
                      </TableCell>
                      <TableCell sx={{ color: '#ffffff' }}>
                        <Chip
                          label={log.status}
                          size="small"
                          color={log.status === 'SUCCESS' ? 'success' : 'error'}
                          variant="outlined"
                          sx={{
                            color: '#ffffff',
                            borderColor: log.status === 'SUCCESS'
                              ? 'rgba(76, 175, 80, 0.5)'
                              : 'rgba(244, 67, 54, 0.5)',
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </Box>
  );
};

export default AuditLogsPage;
