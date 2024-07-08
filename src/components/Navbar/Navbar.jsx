// Dependencies
import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import './Navbar.scss'

// Components
import Hamburger from 'hamburger-react';
import { faMoneyBillTransfer} from '@fortawesome/free-solid-svg-icons';
import Menuboard from '../Menuboard';

const Navbar = ({currentFilter, handleFilterChange}) => {
    const [isOpen, setOpen] = useState(false)

    const mobile = useMediaQuery({
        query: '(max-width: 768px)'
      })

      if(mobile) {

          return (
              <nav className='navbar'>
                  <h4 className='navbar__title'><Link to='/transactions'>Simply Budgeting</Link></h4>
                  <div className='navbar__menu'>
                      <Hamburger className='navbar__menu-button' toggled={isOpen} toggle={setOpen} size={24}/>
                      <div className={`navbar__menu-options ${isOpen ? 'show' : ''}`}>
                          {/* <Link to='/update'><FontAwesomeIcon className='navbar__icon' icon={faMoneyBillTransfer} /></Link>  */}
                          <Menuboard setOpen={setOpen} handleFilterChange={handleFilterChange}/>
                      </div>
                  </div>
              </nav>
          );
      } else {
        return (
            <nav className='navbar'>
                <h4 className='navbar__title'><Link to='/transactions'>Simply Budgeting</Link></h4>
                <div className='navbar__menu'>
                    <Link to='/update'><FontAwesomeIcon className='navbar__icon' icon={faMoneyBillTransfer} /></Link> 
                </div>
            </nav>
        )
      }

};

export default Navbar;