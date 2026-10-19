import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { updateEducation } from '../features/cvSlice';
import { useNavigate } from 'react-router-dom';

const Step3Education = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const educations = useSelector((state) => state.cv.educations);

  const formik = useFormik({
    initialValues: {
      institute: educations[0]?.institute || '',
      degree: educations[0]?.degree || '',
      endDate: educations[0]?.endDate || '',
      description: educations[0]?.description || '',
    },
    validationSchema: Yup.object({
      institute: Yup.string().min(2, 'მინიმუმ 2 სიმბოლო').required('სავალდებულოა'),
      degree: Yup.string().required('სავალდებულოა'),
      endDate: Yup.date().required('სავალდებულოა'),
      description: Yup.string().required('სავალდებულოა'),
    }),
    onSubmit: (values) => {
      dispatch(updateEducation([values]));
      navigate('/cv');
    },
  });

  return (
    <div style={{ padding: '20px', maxWidth: '500px' }}>
      <h2>განათლება</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>სასწავლებელი:</label>
          <input
            type="text"
            name="institute"
            onChange={formik.handleChange}
            value={formik.values.institute}
          />
        </div>
        <div>
          <label>ხარისხი:</label>
          <select
            name="degree"
            onChange={formik.handleChange}
            value={formik.values.degree}
          >
            <option value="">აირჩიეთ ხარისხი</option>
            <option value="საშუალო სკოლის დიპლომი">საშუალო სკოლის დიპლომი</option>
            <option value="ბაკალავრი">ბაკალავრი</option>
            <option value="მაგისტრი">მაგისტრი</option>
            <option value="დოქტორი">დოქტორი</option>
          </select>
        </div>
        <div>
          <label>დამთავრების თარიღი:</label>
          <input
            type="date"
            name="endDate"
            onChange={formik.handleChange}
            value={formik.values.endDate}
          />
        </div>
        <div>
          <label>აღწერა:</label>
          <textarea
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
          />
        </div>
        <div style={{ marginTop: '20px' }}>
          <button type="button" onClick={() => navigate('/experience')}>უკან</button>
          <button type="submit" style={{ marginLeft: '10px' }}>დასრულება</button>
        </div>
      </form>
    </div>
  );
};

export default Step3Education;