import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
} from '@mui/material';
import {
  CloudUpload,
  Search,
  Download,
  Delete,
  Folder,
  Description,
  Image,
  InsertDriveFile,
} from '@mui/icons-material';
import fileService from '../services/fileService';
import { toast } from 'react-toastify';

const FileManagerPage = () => {
  const { isAdmin } = useAuth();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    try {
      setLoading(true);
      const response = await fileService.getFiles();
      
      // Check if response is array or has data property
      if (Array.isArray(response.data)) {
        setFiles(response.data);
      } else if (response.data && Array.isArray(response.data.files)) {
        setFiles(response.data.files);
      } else {
        console.error('Unexpected response format:', response.data);
        toast.error('Unexpected response format from server');
      }
    } catch (error) {
      console.error('Error loading files:', error);
      toast.error(error.message || 'Failed to load files');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setUploadDialogOpen(true);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      setUploadProgress(10);
      
      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      await fileService.uploadFile(selectedFile);
      
      clearInterval(progressInterval);
      setUploadProgress(100);

      setTimeout(() => {
        setUploadDialogOpen(false);
        setSelectedFile(null);
        setUploadProgress(0);
        loadFiles();
        toast.success('File uploaded successfully');
      }, 500);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error.message || 'Failed to upload file');
      setUploadDialogOpen(false);
      setSelectedFile(null);
      setUploadProgress(0);
    }
  };

  const handleDownload = async (fileId, filename) => {
    try {
      await fileService.downloadFile(fileId, filename);
      toast.success('File download started');
    } catch (error) {
      console.error('Download error:', error);
      toast.error(error.message || 'Failed to download file');
    }
  };

  const handleDelete = async (fileId) => {
    if (!isAdmin()) {
      toast.error('Only administrators can delete files');
      return;
    }

    if (window.confirm('Are you sure you want to delete this file?')) {
      try {
        await fileService.deleteFile(fileId);
        toast.success('File deleted successfully');
        loadFiles();
      } catch (error) {
        console.error('Delete error:', error);
        toast.error(error.message || 'Failed to delete file');
      }
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      loadFiles();
      return;
    }
    
    try {
      const response = await fileService.searchFiles(searchTerm);
      
      if (Array.isArray(response.data)) {
        setFiles(response.data);
      } else if (response.data && Array.isArray(response.data.files)) {
        setFiles(response.data.files);
      } else {
        console.error('Unexpected search response format:', response.data);
        toast.error('Unexpected response format from server');
      }
    } catch (error) {
      console.error('Search error:', error);
      toast.error(error.message || 'Failed to search files');
    }
  };

  const getFileIcon = (filename) => {
    if (!filename) return <InsertDriveFile sx={{ color: '#a0aec0' }} />;
    
    const ext = filename.split('.').pop().toLowerCase();
    switch (ext) {
      case 'pdf':
        return <Description sx={{ color: '#ff4081' }} />;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return <Image sx={{ color: '#4caf50' }} />;
      case 'doc':
      case 'docx':
        return <Description sx={{ color: '#2196f3' }} />;
      default:
        return <InsertDriveFile sx={{ color: '#a0aec0' }} />;
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ mb: 1, fontWeight: 600, color: '#fff' }}>
            File Manager
          </Typography>
          <Typography sx={{ color: '#a0aec0' }}>
            Securely manage your encrypted files
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<CloudUpload />}
          component="label"
          sx={{
            background: 'linear-gradient(45deg, #00d4ff, #5affff)',
            '&:hover': {
              background: 'linear-gradient(45deg, #00a3cc, #00d4ff)',
            },
          }}
        >
          Upload File
          <input
            type="file"
            hidden
            onChange={handleFileSelect}
          />
        </Button>
      </Box>

      {/* Search Bar */}
      <Card sx={{ 
        mb: 3,
        background: 'rgba(19, 47, 76, 0.7)',
        border: '1px solid rgba(0, 212, 255, 0.2)',
      }}>
        <CardContent>
          <TextField
            fullWidth
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: '#00d4ff' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    variant="contained"
                    onClick={handleSearch}
                    sx={{
                      background: 'linear-gradient(45deg, #00d4ff, #5affff)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #00a3cc, #00d4ff)',
                      },
                    }}
                  >
                    Search
                  </Button>
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
              },
            }}
          />
        </CardContent>
      </Card>

      {/* Files Table */}
      <Card sx={{ 
        background: 'rgba(19, 47, 76, 0.7)',
        border: '1px solid rgba(0, 212, 255, 0.2)',
      }}>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: '#00d4ff', fontWeight: 600 }}>File Name</TableCell>
                  <TableCell sx={{ color: '#00d4ff', fontWeight: 600 }}>Type</TableCell>
                  <TableCell sx={{ color: '#00d4ff', fontWeight: 600 }}>Size</TableCell>
                  <TableCell sx={{ color: '#00d4ff', fontWeight: 600 }}>Uploaded</TableCell>
                  <TableCell sx={{ color: '#00d4ff', fontWeight: 600 }}>Status</TableCell>
                  <TableCell sx={{ color: '#00d4ff', fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <LinearProgress />
                    </TableCell>
                  </TableRow>
                ) : files.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                      <Folder sx={{ fontSize: 60, color: '#a0aec0', mb: 2 }} />
                      <Typography sx={{ color: '#a0aec0' }}>
                        No files uploaded yet
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  files.map((file) => (
                    <TableRow
                      key={file.id || file.filename}
                      sx={{
                        '&:hover': {
                          background: 'rgba(0, 212, 255, 0.05)',
                        },
                      }}
                    >
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          {getFileIcon(file.filename)}
                          <Typography sx={{ color: '#fff' }}>
                            {file.filename || 'Unnamed File'}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={file.filename ? file.filename.split('.').pop().toUpperCase() : 'FILE'}
                          size="small"
                          sx={{
                            background: 'rgba(0, 212, 255, 0.1)',
                            color: '#00d4ff',
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ color: '#a0aec0' }}>
                        {file.fileSize ? formatFileSize(file.fileSize) : 'Unknown size'}
                      </TableCell>
                      <TableCell sx={{ color: '#a0aec0' }}>
                        {file.createdAt ? new Date(file.createdAt).toLocaleDateString() : 'Unknown date'}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={file.status || "ENCRYPTED"}
                          size="small"
                          sx={{
                            background: 'rgba(76, 175, 80, 0.1)',
                            color: '#4caf50',
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Tooltip title="Download">
                            <IconButton
                              size="small"
                              onClick={() => handleDownload(file.id, file.filename)}
                              sx={{ color: '#00d4ff' }}
                            >
                              <Download />
                            </IconButton>
                          </Tooltip>
                          {isAdmin() && (
                            <Tooltip title="Delete">
                              <IconButton
                                size="small"
                                onClick={() => handleDelete(file.id)}
                                sx={{ color: '#ff4081' }}
                              >
                                <Delete />
                              </IconButton>
                            </Tooltip>
                          )}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Upload Dialog */}
      <Dialog
        open={uploadDialogOpen}
        onClose={() => !uploadProgress && setUploadDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ color: '#fff', background: '#132f4c' }}>
          Upload File
        </DialogTitle>
        <DialogContent sx={{ background: '#132f4c', pt: 3 }}>
          {selectedFile && (
            <Box sx={{ mb: 3 }}>
              <Typography sx={{ color: '#a0aec0', mb: 1 }}>
                File: {selectedFile.name}
              </Typography>
              <Typography sx={{ color: '#a0aec0', mb: 2 }}>
                Size: {formatFileSize(selectedFile.size)}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={uploadProgress}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  '& .MuiLinearProgress-bar': {
                    background: 'linear-gradient(90deg, #00d4ff, #5affff)',
                  },
                }}
              />
              <Typography sx={{ mt: 1, color: '#00d4ff', textAlign: 'center' }}>
                {uploadProgress}%
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ background: '#132f4c' }}>
          <Button
            onClick={() => {
              setUploadDialogOpen(false);
              setSelectedFile(null);
              setUploadProgress(0);
            }}
            sx={{ color: '#a0aec0' }}
            disabled={uploadProgress > 0 && uploadProgress < 100}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            variant="contained"
            disabled={uploadProgress > 0}
            sx={{
              background: 'linear-gradient(45deg, #00d4ff, #5affff)',
              '&:hover': {
                background: 'linear-gradient(45deg, #00a3cc, #00d4ff)',
              },
            }}
          >
            {uploadProgress > 0 ? 'Uploading...' : 'Upload'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FileManagerPage;