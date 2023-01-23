import React, { useState } from 'react';
import Home from './pages/Home';
import Details from './pages/Details';
import { IImage } from './pages/Home';
import {
  Routes, Route
} from 'react-router-dom';
import Loading from './components/Loading';

function App() {
  const [detail, setDetail] = useState<IImage>();
  return (
    <>
      <Routes>
        <Route path='/' element={<Home setDetail={setDetail} />} />
        <Route path='/details' element={<Details {...detail} />} />
      </Routes>
      <Loading />
    </>
  );
}

export default App;
