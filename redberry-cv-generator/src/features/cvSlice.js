import { createSlice } from '@reduxjs/toolkit';

// LocalStorage-დან მონაცემების წამოღება (თუ არსებობს)
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('redberry_cv_data');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const initialState = loadState() || {
  personal: {
    name: '',
    surname: '',
    about: '',
    email: '',
    phone: '',
    image: null,
  },
  experiences: [
    { position: '', employer: '', startDate: '', endDate: '', description: '' },
  ],
  educations: [
    { institute: '', degree: '', endDate: '', description: '' },
  ],
};

const cvSlice = createSlice({
  name: 'cv',
  initialState,
  reducers: {
    updatePersonal: (state, action) => {
      state.personal = { ...state.personal, ...action.payload };
      localStorage.setItem('redberry_cv_data', JSON.stringify(state));
    },
    updateExperience: (state, action) => {
      state.experiences = action.payload;
      localStorage.setItem('redberry_cv_data', JSON.stringify(state));
    },
    updateEducation: (state, action) => {
      state.educations = action.payload;
      localStorage.setItem('redberry_cv_data', JSON.stringify(state));
    },
    resetForm: (state) => {
      localStorage.removeItem('redberry_cv_data');
      return {
        personal: { name: '', surname: '', about: '', email: '', phone: '', image: null },
        experiences: [{ position: '', employer: '', startDate: '', endDate: '', description: '' }],
        educations: [{ institute: '', degree: '', endDate: '', description: '' }],
      };
    },
  },
});

export const { updatePersonal, updateExperience, updateEducation, resetForm } = cvSlice.actions;
export default cvSlice.reducer;