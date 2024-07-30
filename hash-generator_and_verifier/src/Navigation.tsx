import React from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Upload and Hash</Link></li>
        <li><Link to="/verify">Verify Hash</Link></li>
      </ul>
    </nav>
  );
};

export default Navigation;
