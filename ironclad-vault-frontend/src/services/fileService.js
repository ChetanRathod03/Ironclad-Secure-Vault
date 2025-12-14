import api from './api';

const fileService = {
  uploadFile: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    console.log('Uploading file:', file.name, file.size);
    
    return api.post('/api/v1.0/vault/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        console.log('Upload progress:', percentCompleted + '%');
      },
    });
  },

  getFiles: () => {
    console.log('Fetching files...');
    return api.get('/api/v1.0/vault/files');
  },

  downloadFile: (fileId, filename) => {
    console.log('Downloading file:', fileId, filename);
    return api.get(`/api/v1.0/vault/download/${fileId}`, {
      responseType: 'blob',
    }).then(response => {
      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      return response;
    });
  },

  deleteFile: (fileId) => {
    console.log('Deleting file:', fileId);
    return api.delete(`/api/v1.0/vault/delete/${fileId}`);
  },

  searchFiles: (query) => {
    console.log('Searching files:', query);
    return api.get(`/api/v1.0/vault/search?query=${encodeURIComponent(query)}`);
  },

  getAuditLogs: () => {
    console.log('Fetching audit logs...');
    return api.get('/api/v1.0/vault/audit-logs');
  },
};

export default fileService;