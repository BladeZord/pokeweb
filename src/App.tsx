import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Listado from './pages/listado';
import NotFound from './pages/notFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Listado/>}/>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
