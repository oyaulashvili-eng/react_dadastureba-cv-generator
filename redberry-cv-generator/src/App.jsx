import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Step1Personal from './components/Step1Personal';
import Step2Experience from './components/Step2Experience';
import Step3Education from './components/Step3Education';
import CvPreview from './components/CvPreview';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Routes>
          <Route path="/" element={<Step1Personal />} />
          <Route path="/experience" element={<Step2Experience />} />
          <Route path="/education" element={<Step3Education />} />
          <Route path="/cv" element={<CvPreview />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;