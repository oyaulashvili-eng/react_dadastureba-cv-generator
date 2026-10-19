import React from 'react';
import { useFormik, FieldArray, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { updateExperience } from '../features/cvSlice';
import { useNavigate } from 'react-router-dom';

const Step2Experience = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const experiences = useSelector((state) => state.cv.experiences);

  const formik = useFormik({
    initialValues: { experiences },
    validationSchema: Yup.object({
      experiences: Yup.array().of(
        Yup.object({
          position: Yup.string().min(2, 'მინიმუმ 2 სიმბოლო').required('სავალდებულოა'),
          employer: Yup.string().min(2, 'მინიმუმ 2 სიმბოლო').required('სავალდებულოა'),
          startDate: Yup.date().required('სავალდებულოა'),
          endDate: Yup.date().required('სავალდებულოა'),
          description: Yup.string().required('სავალდებულოა'),
        })
      ),
    }),
    onSubmit: (values) => {
      dispatch(updateExperience(values.experiences));
      navigate('/education');
    },
  });

  return (
    <FormikProvider value={formik}>
      <div style={{ padding: '20px', maxWidth: '500px' }}>
        <h2>გამოცდილება</h2>
        <form onSubmit={formik.handleSubmit}>
          <FieldArray
            name="experiences"
            render={(arrayHelpers) => (
              <div>
                {formik.values.experiences.map((exp, index) => (
                  <div key={index} style={{ borderBottom: '1px solid #ccc', marginBottom: '15px', paddingBottom: '10px' }}>
                    <h4>გამოცდილება {index + 1}</h4>
                    <div>
                      <label>თანამდებობა:</label>
                      <input
                        type="text"
                        name={`experiences[${index}].position`}
                        onChange={formik.handleChange}
                        value={exp.position}
                      />
                    </div>
                    <div>
                      <label>დამსაქმებელი:</label>
                      <input
                        type="text"
                        name={`experiences[${index}].employer`}
                        onChange={formik.handleChange}
                        value={exp.employer}
                      />
                    </div>
                    <div>
                      <label>დაწყების თარიღი:</label>
                      <input
                        type="date"
                        name={`experiences[${index}].startDate`}
                        onChange={formik.handleChange}
                        value={exp.startDate}
                      />
                    </div>
                    <div>
                      <label>დამთავრების თარიღი:</label>
                      <input
                        type="date"
                        name={`experiences[${index}].endDate`}
                        onChange={formik.handleChange}
                        value={exp.endDate}
                      />
                    </div>
                    <div>
                      <label>აღწერა:</label>
                      <textarea
                        name={`experiences[${index}].description`}
                        onChange={formik.handleChange}
                        value={exp.description}
                      />
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    arrayHelpers.push({ position: '', employer: '', startDate: '', endDate: '', description: '' })
                  }
                >
                  მეტი გამოცდილების დამატება
                </button>
              </div>
            )}
          />
          <div style={{ marginTop: '20px' }}>
            <button type="button" onClick={() => navigate('/')}>უკან</button>
            <button type="submit" style={{ marginLeft: '10px' }}>შემდეგი</button>
          </div>
        </form>
      </div>
    </FormikProvider>
  );
};

export default Step2Experience;