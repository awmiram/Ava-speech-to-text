import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { transcribeByFile, transcribeByUrl } from '../services/transcribeApi';


export const processFile = createAsyncThunk(
  'transcribe/processFile',
  async (file, { rejectWithValue }) => {
    try {
      const response = await transcribeByFile(file);
      if (response && response.length > 0) return response[0];
      throw new Error("دیتای نامعتبر");
    } catch (error) {
      return rejectWithValue('ارسال فایل با خطا مواجه شد. لطفاً وضعیت اینترنت را بررسی کنید.');
    }
  }
);

export const processUrl = createAsyncThunk(
  'transcribe/processUrl',
  async (url, { rejectWithValue }) => {
    try {
      const response = await transcribeByUrl(url);
      if (response && response.length > 0) {
        return { data: response[0], mediaUrl: response[0].download_url || url };
      }
      throw new Error("دیتای نامعتبر");
    } catch (error) {
      return rejectWithValue('ارسال لینک با خطا مواجه شد. لطفاً لینک را بررسی کنید.');
    }
  }
);

const transcribeSlice = createSlice({
  name: 'transcribe',
  initialState: {
    status: 'idle', //'idle', 'recording', 'loading', 'success', 'error'
    errorMsg: '',
    transcriptionData: null,
    mediaUrl: null
  },
  reducers: {
  
    resetTranscription: (state) => {
      state.status = 'idle';
      state.errorMsg = '';
      state.transcriptionData = null;
      state.mediaUrl = null;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setMediaUrl: (state, action) => {
      state.mediaUrl = action.payload;
    },
    setErrorMsg: (state, action) => {
      state.errorMsg = action.payload;
      state.status = 'error';
    }
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(processFile.pending, (state) => {
        state.status = 'loading';
        state.errorMsg = '';
      })
      .addCase(processFile.fulfilled, (state, action) => {
        state.status = 'success';
        state.transcriptionData = action.payload;
      })
      .addCase(processFile.rejected, (state, action) => {
        state.status = 'error';
        state.errorMsg = action.payload;
      })
      
      .addCase(processUrl.pending, (state) => {
        state.status = 'loading';
        state.errorMsg = '';
      })
      .addCase(processUrl.fulfilled, (state, action) => {
        state.status = 'success';
        state.transcriptionData = action.payload.data;
        state.mediaUrl = action.payload.mediaUrl;
      })
      .addCase(processUrl.rejected, (state, action) => {
        state.status = 'error';
        state.errorMsg = action.payload;
      });
  }
});

export const { resetTranscription, setStatus, setMediaUrl, setErrorMsg } = transcribeSlice.actions;
export default transcribeSlice.reducer;
