// Dependencies
import React, {useState} from 'react';
import { useMediaQuery } from 'react-responsive';

// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableCellsLarge, faUtensils, faBagShopping, faPuzzlePiece, faFileInvoiceDollar, faSackDollar, faCircleQuestion, faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';


const Menuboard = ({handleFilterChange}) => {
    
    return (
        <aside className='menuboard'>
            <nav className='menuboard__option' onClick={() => handleFilterChange('View All')}>
                <FontAwesomeIcon className='menuboard__icon' icon={faTableCellsLarge}/>
                <span className='menuboard__icon-label'>View All</span>
            </nav>
            <nav className='menuboard__option' onClick={() =>  handleFilterChange('Income')}>
                <FontAwesomeIcon className='menuboard__icon' icon={faSackDollar}/>
                <span className='menuboard__icon-label'>Income</span>
            </nav>
            <nav className='menuboard__option' onClick={() =>  handleFilterChange('Food & Drink')}>
                <FontAwesomeIcon className='menuboard__icon' icon={faUtensils}/>
                <span className='menuboard__icon-label'>Food & Drink</span>
            </nav>
            <nav className='menuboard__option' onClick={() =>  handleFilterChange('Shopping')}>
                <FontAwesomeIcon className='menuboard__icon' icon={faBagShopping}/>
                <span className='menuboard__icon-label'>Shopping</span>
            </nav>
            <nav className='menuboard__option' onClick={() =>  handleFilterChange('Entertainment')}>
                <FontAwesomeIcon className='menuboard__icon' icon={faPuzzlePiece}/>
                <span className='menuboard__icon-label'>Entertainment</span>
            </nav>
            <nav className='menuboard__option' onClick={() =>  handleFilterChange('Expenses')}>
                <FontAwesomeIcon className='menuboard__icon' icon={faFileInvoiceDollar}/>
                <span className='menuboard__icon-label'>Expenses</span>
            </nav>
        </aside>
    );
};

export default Menuboard;