import { Routes, Route } from 'react-router-dom';
import About from './pages/About';
import Homepage from './pages/Homepage';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </>
  );
};

export default App;
