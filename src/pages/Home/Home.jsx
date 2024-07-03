// Dependencies
import React, {useState, useEffect} from 'react';
import { capitalize, formatDateView } from '../../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableCellsLarge, faUtensils, faBagShopping, faPuzzlePiece, faFileInvoiceDollar, faSackDollar, faCircleQuestion, faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import LineGraph from '../../components/Charts/LineGraph';
import './Home.scss'


const Home = () => {
    const [transactions, setTransactions] = useState([])

    const API = import.meta.env.VITE_API_KEY;

    useEffect(() => {
        fetch(API)
            .then(res => res.json())
            .then(res => setTransactions(res))
            .catch(err => console.error(err))
    },[])

    if(transactions.length > 1) {
        const total = transactions.reduce((sum, transaction) => {
            sum += Number(transaction.amount);
            return sum;
        },0)

       

        return (
            <main className='dashboard'>
                <aside className='menuboard'>
                    <nav className='menuboard__option'>
                        <FontAwesomeIcon className='menuboard__icon' icon={faTableCellsLarge}/>
                        <span className='menuboard__icon-label'>View All</span>
                    </nav>
                    <nav className='menuboard__option'>
                        <FontAwesomeIcon className='menuboard__icon' icon={faSackDollar}/>
                        <span className='menuboard__icon-label'>Income</span>
                    </nav>
                    <nav className='menuboard__option'>
                        <FontAwesomeIcon className='menuboard__icon' icon={faUtensils}/>
                        <span className='menuboard__icon-label'>Food & Drink</span>
                    </nav>
                    <nav className='menuboard__option'>
                        <FontAwesomeIcon className='menuboard__icon' icon={faBagShopping}/>
                        <span className='menuboard__icon-label'>Shopping</span>
                    </nav>
                    <nav className='menuboard__option'>
                        <FontAwesomeIcon className='menuboard__icon' icon={faPuzzlePiece}/>
                        <span className='menuboard__icon-label'>Entertainment</span>
                    </nav>
                    <nav className='menuboard__option'>
                        <FontAwesomeIcon className='menuboard__icon' icon={faFileInvoiceDollar}/>
                        <span className='menuboard__icon-label'>Expenses</span>
                    </nav>
                </aside>
                <section className='content'>
                    <header className='content__heading'>
                        <h3>Checking Acccount: <span className={total > 0 ? 'green' : 'red'}>${total}</span></h3>
                    </header>
                    <LineGraph className='chart'/>
                </section>
                <aside className='history'>
                    <header className='history__header'>
                        <h4>Transaction History</h4>
                    </header>
                    <ul className='history__list'>
                        {transactions.map((transaction, index) => {
                            let iconName = '';
                            switch(transaction.category) {
                                case 'Income':
                                    iconName = faSackDollar
                                    break;
                                case 'Food & Drink':
                                    iconName = faUtensils
                                    break;
                                case 'Shopping':
                                    iconName = faBagShopping
                                    break;
                                case 'Entertainment':
                                    iconName = faPuzzlePiece
                                    break;
                                case 'Expenses':
                                    iconName = faFileInvoiceDollar
                                    break;
                                default:
                                    iconName = faCircleQuestion
                            }

                            return (
                                <Link to={`/transactions/${index}`} key={transaction.id}>
                                    <li className='history__item' >
                                        <span className='history__box'>
                                            <FontAwesomeIcon className='history__icon' icon={iconName} />
                                        </span>
                                        <div>
                                            <p className='history__name'>{capitalize(transaction.item_name)}</p>
                                            <p className='history__date'>{formatDateView(transaction.date)}</p>
                                        </div>
                                        <span className={transaction.amount > 0 ? 'history__amount green' : 'history__amount red'}>${Math.abs(transaction.amount)}</span>
                                    </li>
                                </Link>
                            )
                        })}
                    </ul>
                    <footer className='history__footer'>
                        <div className='history__footer-box'>
                            <FontAwesomeIcon className='history__footer-icon' icon={faMoneyBillTransfer}/>
                            <p className='history__footer-text'>Missing Transaction ?</p>
                        </div>
                        <Link to='/update'>
                            <button className='history__footer-button'>Add New</button>
                        </Link>
                    </footer>
                </aside>
            </main>
        );
    }

    
};

export default Home;