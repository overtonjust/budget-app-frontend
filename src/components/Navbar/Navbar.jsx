// Dependencies
import React from 'react';
import './Navbar.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';


// Components
import { faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    return (
        <nav className='navbar'>
            <h4 className='navbar__title'><Link to='/transactions'>Simply Budgeting</Link></h4>
            <Link to='/update'><FontAwesomeIcon className='navbar__icon' icon={faMoneyBillTransfer} /></Link>
        </nav>
    );
};

export default Navbar;