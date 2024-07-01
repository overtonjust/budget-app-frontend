// Dependencies
import React, {useState, useEffect} from 'react';
import { capitalize } from '../../../utils';
import { Link } from 'react-router-dom';



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
            <main>
                <h2>Checking Acccount: ${total}</h2>
                <ul>
                    {transactions.map((transaction, index) => {
                        return (
                            <li key={transaction.id}>
                                <p>{transaction.date}</p>
                                <p><Link to={`/transactions/${index}`}>{capitalize(transaction.item_name)}</Link></p>
                                <p>${transaction.amount}</p>
                            </li>
                        )
                    })}
                </ul>
            </main>
        );
    }

    
};

export default Home;