// Dependencies
import React from 'react';
import { Routes, Route, Navigate} from 'react-router-dom';

// Components
import Navbar from './components/Navbar/Navbar';

// Pages
import Home from './pages/Home/Home';
import Show from './pages/Show/Show';
import Form from './pages/Form/Form';

const App = () => {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Navigate to='/transactions'/>} />
        <Route path='/transactions' element={<Home/>}/>
        <Route path='/transactions/:index' element={<Show/>}/>
        <Route path='/update' element={<Form/>}/>
      </Routes>
    </>
  );
};

export default App;