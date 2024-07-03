// Dependencies
import React, {useState, useEffect} from 'react';
import { capitalize, formatDateView } from '../../../utils';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashArrowUp, faTableCellsLarge, faUtensils, faBagShopping, faPuzzlePiece, faFileInvoiceDollar, faSackDollar, faCircleQuestion, faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';
import './Show.scss'

const Show = () => {
    const [currTransaction, setCurrTransaction] = useState(false)
    const { index } = useParams()
    const navigate = useNavigate()
    const API = import.meta.env.VITE_API_KEY
    let categoryIcon = '';
   
    useEffect(() => {
        fetch(`${API}/${index}`)
            .then(res => res.json())
            .then(res => setCurrTransaction(res))
            .catch(err => console.error(err))
    },[index])

    switch(currTransaction.category) {
        case 'Income':
            categoryIcon = faSackDollar
            break;
        case 'Food & Drink':
            categoryIcon = faUtensils
            break;
        case 'Shopping':
            categoryIcon = faBagShopping
            break;
        case 'Entertainment':
            categoryIcon = faPuzzlePiece
            break;
        case 'Expenses':
            categoryIcon = faFileInvoiceDollar
            break;
        default:
            categoryIcon = faCircleQuestion
    }

    const handleDelete = () => {
        fetch(`${API}/${index}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(res => {
                alert(res.message)
                navigate('/transactions')
            })
            .catch(err => console.error(err))
    }

    if(currTransaction) {

        return (
            <article className='showcard'>
                <header className='showcard__header'>
                    <h2 className='showcard__title'>{capitalize(currTransaction.item_name)}: 
                        <span className={currTransaction.amount > 0 ? 'green' : 'red'}>${Math.abs(currTransaction.amount)}</span>
                        <FontAwesomeIcon className='showcard__title-icon' icon={categoryIcon}/>
                    </h2>
                    <FontAwesomeIcon className='showcard__delete' onClick={handleDelete} icon={faTrashArrowUp}></FontAwesomeIcon>
                </header>
                <p className='showcard__info'>Date processed: {formatDateView(currTransaction.date)}</p>
                <p className='showcard__info'>{currTransaction.amount > 0 ? 'From' : 'To'} {currTransaction.source}</p>
                <Link to={`/update/?pos=${index}`}><button className='showcard__button'>Edit</button></Link>
            </article>
        );
    }
};

export default Show;