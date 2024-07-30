import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DocumentUploader from './DocumentUploader';
import VerifyHash from './VerifyHash';
import Navigation from './Navigation';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path="/" Component={DocumentUploader} />
          <Route path="/verify" Component={VerifyHash} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;



// 603cf02416dc96bfcc3fb904f656fc4b617bf8eb6ded02d787fc939d9a7b7ae8


// f4164e2bff07c499199751649703cfb9b7e6848e568cc062067f4fdd036032c3