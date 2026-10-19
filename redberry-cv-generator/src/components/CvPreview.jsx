import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetForm } from '../features/cvSlice';
import { useNavigate } from 'react-router-dom';

const CvPreview = () => {
  const { personal, experiences, educations } = useSelector((state) => state.cv);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleReset = () => {
    dispatch(resetForm());
    navigate('/');
  };

  return (
    <div style={{ padding: '30px', border: '1px solid #ddd', maxWidth: '700px', margin: '20px auto' }}>
      <button onClick={handleReset} style={{ float: 'right', backgroundColor: '#f44336', color: '#fff' }}>
        ახალი CV-ის შექმნა
      </button>

      {/* პირადი ინფო */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ color: '#f93b1d' }}>{personal.name} {personal.surname}</h1>
          <p>📧 {personal.email}</p>
          <p>📞 {personal.phone}</p>
          {personal.about && (
            <div>
              <h3>ჩემ შესახებ</h3>
              <p>{personal.about}</p>
            </div>
          )}
        </div>
        {personal.image && (
          <img
            src={personal.image}
            alt="Profile"
            style={{ width: '130px', height: '130px', borderRadius: '50%', objectFit: 'cover' }}
          />
        )}
      </div>

      <hr />

      {/* გამოცდილება */}
      <div>
        <h3>გამოცდილება</h3>
        {experiences.map((exp, index) => (
          <div key={index} style={{ marginBottom: '15px' }}>
            <h4>{exp.position} - {exp.employer}</h4>
            <small>{exp.startDate} — {exp.endDate}</small>
            <p>{exp.description}</p>
          </div>
        ))}
      </div>

      <hr />

      {/* განათლება */}
      <div>
        <h3>განათლება</h3>
        {educations.map((edu, index) => (
          <div key={index}>
            <h4>{edu.institute}, {edu.degree}</h4>
            <small>{edu.endDate}</small>
            <p>{edu.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CvPreview;