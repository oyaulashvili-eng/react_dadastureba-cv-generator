import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { updatePersonal } from '../features/cvSlice';
import { useNavigate } from 'react-router-dom';

const Step1Personal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const personalData = useSelector((state) => state.cv.personal);

  const formik = useFormik({
    initialValues: personalData,
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, 'მინიმუმ 2 სიმბოლო')
        .matches(/^[ა-ჰ]+$/, 'მხოლოდ ქართული ასოები')
        .required('სავალდებულოა'),
      surname: Yup.string()
        .min(2, 'მინიმუმ 2 სიმბოლო')
        .matches(/^[ა-ჰ]+$/, 'მხოლოდ ქართული ასოები')
        .required('სავალდებულოა'),
      email: Yup.string()
        .email('არასწორი ელ-ფოსტის ფორმატი')
        .matches(/@redberry\.ge$/, 'უნდა მთავრდებოდეს @redberry.ge-ით')
        .required('სავალდებულოა'),
      phone: Yup.string()
        .matches(/^\+995\d{9}$/, 'ფორმალური ნომერი (+995XXXXXXXXX)')
        .required('სავალდებულოა'),
    }),
    onSubmit: (values) => {
      dispatch(updatePersonal(values));
      navigate('/experience');
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        formik.setFieldValue('image', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px' }}>
      <h2>პირადი ინფო</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>სახელი:</label>
          <input
            type="text"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name && (
            <span style={{ color: 'red' }}>{formik.errors.name}</span>
          )}
        </div>

        <div>
          <label>გვარი:</label>
          <input
            type="text"
            name="surname"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.surname}
          />
          {formik.touched.surname && formik.errors.surname && (
            <span style={{ color: 'red' }}>{formik.errors.surname}</span>
          )}
        </div>

        <div>
          <label>ფოტო:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <div>
          <label>ჩემ შესახებ:</label>
          <textarea
            name="about"
            onChange={formik.handleChange}
            value={formik.values.about}
          />
        </div>

        <div>
          <label>ელ-ფოსტა:</label>
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <span style={{ color: 'red' }}>{formik.errors.email}</span>
          )}
        </div>

        <div>
          <label>მობილურის ნომერი:</label>
          <input
            type="text"
            name="phone"
            placeholder="+995599123456"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
          />
          {formik.touched.phone && formik.errors.phone && (
            <span style={{ color: 'red' }}>{formik.errors.phone}</span>
          )}
        </div>

        <button type="submit" style={{ marginTop: '15px' }}>შემდეგი</button>
      </form>
    </div>
  );
};

export default Step1Personal;