import http from './httpService';


export const transcribeByUrl = async (mediaUrl) => {
  try {
    const response = await http.post('/api/transcribe_files/', {
      media_urls: [mediaUrl]
    });
    return response.data;
  } catch (error) {
    console.error("Error transcribing URL:", error);
    throw error;
  }
};

export const transcribeByFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append('media', file); 

    const response = await http.post('/api/transcribe_files/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error transcribing file:", error);
    throw error;
  }
};
