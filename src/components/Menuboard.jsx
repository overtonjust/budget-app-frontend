// Dependencies
import React, {useState} from 'react';
import { useMediaQuery } from 'react-responsive';

// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableCellsLarge, faUtensils, faBagShopping, faPuzzlePiece, faFileInvoiceDollar, faSackDollar, faCircleQuestion, faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';


const Menuboard = ({handleFilterChange, setOpen }) => {
    
    const handleClick = (arg) => {
        handleFilterChange(arg)
        setOpen(false)
    }

    return (
        <aside className='menuboard'>
            <nav className='menuboard__option' onClick={() => handleClick('View All')}>
                <FontAwesomeIcon className='menuboard__icon' icon={faTableCellsLarge}/>
                <span className='menuboard__icon-label'>View All</span>
            </nav>
            <nav className='menuboard__option' onClick={() =>  handleClick('Income')}>
                <FontAwesomeIcon className='menuboard__icon' icon={faSackDollar}/>
                <span className='menuboard__icon-label'>Income</span>
            </nav>
            <nav className='menuboard__option' onClick={() =>  handleClick('Food & Drink')}>
                <FontAwesomeIcon className='menuboard__icon' icon={faUtensils}/>
                <span className='menuboard__icon-label'>Food & Drink</span>
            </nav>
            <nav className='menuboard__option' onClick={() =>  handleClick('Shopping')}>
                <FontAwesomeIcon className='menuboard__icon' icon={faBagShopping}/>
                <span className='menuboard__icon-label'>Shopping</span>
            </nav>
            <nav className='menuboard__option' onClick={() =>  handleClick('Entertainment')}>
                <FontAwesomeIcon className='menuboard__icon' icon={faPuzzlePiece}/>
                <span className='menuboard__icon-label'>Entertainment</span>
            </nav>
            <nav className='menuboard__option' onClick={() =>  handleClick('Expenses')}>
                <FontAwesomeIcon className='menuboard__icon' icon={faFileInvoiceDollar}/>
                <span className='menuboard__icon-label'>Expenses</span>
            </nav>
        </aside>
    );
};

export default Menuboard;