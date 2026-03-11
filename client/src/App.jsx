import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Upload from './components/Upload';
import Try from './components/Try';
import './index.css';

function App() {
  return (

      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/try" element={<Try />} />
      </Routes>

  );
}

export default App;