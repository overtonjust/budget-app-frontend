// Dependencies
import React, {useState, useEffect} from 'react';
import { capitalize, formatDateView, currentMonth, monthsArray } from '../../../utils';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import './Home.scss'

// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableCellsLarge, faUtensils, faBagShopping, faPuzzlePiece, faFileInvoiceDollar, faSackDollar, faCircleQuestion, faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';
import DynamicChart from '../../components/Charts/DynamicChart';
import Menuboard from '../../components/Menuboard';


const Home = ({currentFilter, handleFilterChange}) => {
    const [transactions, setTransactions] = useState([])
    const [filteredTransactions, setFilteredTransactions] = useState([])
    const [chartData, setChartData] = useState([])

    const mobile = useMediaQuery({
        query: '(max-width: 768px)'
      })
    

    const API = import.meta.env.VITE_API_KEY;

    useEffect(() => {
        fetch(API)
            .then(res => res.json())
            .then(res => {
                setTransactions(res)
                setFilteredTransactions(res)
            })
            .catch(err => console.error(err))
    },[])

    useEffect(() => {
        setFilteredTransactions(filterData(transactions, currentFilter))
    }, [currentFilter, transactions])

    useEffect(() => {
        if (currentFilter === 'View All') {
            setChartData(formatDoughnutData(transactions));
        } else {
            setChartData(formatBarData(filteredTransactions));
        }
    }, [transactions, filteredTransactions]);


    const filterData = (dataArr, category) => {
        if (!category || category === 'View All') return dataArr;
        return dataArr.filter((data) => data.category === category);
    }


    const formatDoughnutData = (transactions) => {
        const totalMap = [
            {
                name: 'Income', 
                total: 0
            },
            {
                name: 'Food & Drink',
                total: 0
            },
            {
                name: 'Shopping',
                total: 0
            },
            {
                name: 'Entertainment',
                total: 0
            },
            {
                name: 'Expenses',
                total: 0
            }]

        const currMonthlyTransactions = transactions.filter((transaction) => {
            const dateToCheck = new Date(transaction.date)
            const month = monthsArray[dateToCheck.getMonth()]

            return month === currentMonth()
        })

        currMonthlyTransactions.forEach(transaction => {
            const category = transaction.category
            const amount = Math.abs(transaction.amount)
            const correctObj = totalMap.find((obj) => obj.name === category)
            
            correctObj.total += amount
        })

        return totalMap.map(ele => ele.total)
    }

   const formatBarData = (transactions) => {
        const yearMap = 
            {
                'January': 0, 
                'February': 0,
                'March': 0,
                'April': 0,
                'May': 0,
                'June': 0,
                'July': 0,
                'August': 0,
                'September': 0,
                'October': 0,
                'November': 0,
                'December': 0
            };

        transactions.forEach(transaction => {
            const amount = Math.abs(transaction.amount)
            
            const dateToCheck = new Date(transaction.date)
            const month = monthsArray[dateToCheck.getMonth()]

            yearMap[month] += amount
        })

        return Object.values(yearMap)
   }


    if(transactions.length > 1) {
        const total = transactions.reduce((sum, transaction) => {
            sum += Number(transaction.amount);
            return sum;
        },0)

        const colorChoice = (total) => {
            if(total > 100) {
                return 'green'
            } else if(total > 0 && total < 100) {
                return 'yellow'
            } else {
                return 'red'
            }
        }
       
        if(mobile) {
            return (
                <main className='dashboard'>
                    <section className='content'>
                        <header className='content__heading'>
                            <h3>Checking Acccount: <span className={colorChoice(total)}>${Math.abs(total)}</span></h3>
                        </header>
                        <DynamicChart values={chartData} filter={currentFilter} />
                        <aside className='history'>
                            <header className='history__header'>
                                <h4>Transaction History</h4>
                            </header>
                            <ul className='history__list'>
                                {filteredTransactions.map((transaction, index) => {
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
                                        <Link to={`/transactions/${transaction.id}`} key={transaction.id}>
                                            <li className='history__item' >
                                                <div className='history__holder'>
                                                    <span className='history__box'>
                                                        <FontAwesomeIcon className='history__icon' icon={iconName} />
                                                    </span>
                                                    <div>
                                                        <p className='history__name'>{capitalize(transaction.item_name)}</p>
                                                        <p className='history__date'>{formatDateView(transaction.date)}</p>
                                                    </div>
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
                    </section>
                </main>
            )
        } else {
            return (
                <main className='dashboard'>
                    <Menuboard  handleFilterChange={handleFilterChange}/>
                    <section className='content'>
                        <header className='content__heading'>
                            <h3>Checking Acccount: <span className={colorChoice(total)}>${Math.abs(total)}</span></h3>
                        </header>
                        <DynamicChart values={chartData} filter={currentFilter} />
                    </section>
                    <aside className='history'>
                        <header className='history__header'>
                            <h4>Transaction History</h4>
                        </header>
                        <ul className='history__list'>
                            {filteredTransactions.map((transaction, index) => {
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
                                    <Link to={`/transactions/${transaction.id}`} key={transaction.id}>
                                        <li className='history__item' >
                                            <div className='history__holder'>
                                                <span className='history__box'>
                                                    <FontAwesomeIcon className='history__icon' icon={iconName} />
                                                </span>
                                                <div>
                                                    <p className='history__name'>{capitalize(transaction.item_name)}</p>
                                                    <p className='history__date'>{formatDateView(transaction.date)}</p>
                                                </div>
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
    }

    
};

export default Home;