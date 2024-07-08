// Dependencies
import React, {useState} from 'react';
import { Routes, Route, Navigate} from 'react-router-dom';
import './App.scss'

// Components
import Navbar from './components/Navbar/Navbar';

// Pages
import Home from './pages/Home/Home';
import Show from './pages/Show/Show';
import Form from './pages/Form/Form';

const App = () => {
  const [currentFilter, setCurrentFilter] = useState('View All')

  const handleFilterChange = (category) => {
    setCurrentFilter(category)
    
}

  return (
    <>
      <Navbar currentFilter={currentFilter} handleFilterChange={handleFilterChange}/>
      <Routes>
        <Route path='/' element={<Navigate to='/transactions'/>} />
        <Route path='/transactions' element={<Home currentFilter={currentFilter} handleFilterChange={handleFilterChange}/>}/>
        <Route path='/transactions/:id' element={<Show/>}/>
        <Route path='/update' element={<Form/>}/>
      </Routes>
    </>
  );
};

export default App;