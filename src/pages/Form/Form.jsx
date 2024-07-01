import React,{ useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Form = () => {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const pos = searchParams.get('pos')
    
    const [transaction, setTransaction] = useState({
        item_name: "",
        amount: 0,
        date: "",
        source: "",
        category: ""
    })
    const API = import.meta.env.VITE_API_KEY;

    if(pos) {
        useEffect(() => {
            fetch(`${API}/${pos}`)
                .then(res => res.json())
                .then(res => setTransaction(res))
                .catch(err => console.error(err))
        },[pos])
    }

    const handleChange = (e) => {
        setTransaction((prevState) => {
            return {...prevState, [e.target.name]: e.target. value}
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const APIKEY = pos ? `${API}/${pos}` : API
        const methodType = pos ? 'PUT' : 'POST'
        
        fetch(APIKEY, {
            method: methodType,
            body: JSON.stringify(transaction),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(res => {
                pos ? navigate(`/transactions/${pos}`) :
                navigate('/transactions')
            })
            .catch(err => console.error(err))
    }
    

    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <legend>{pos ? 'Edit details' : 'New Transaction'}</legend>
                <input 
                type="text"
                placeholder='Item name' 
                name='item_name'
                value={transaction.item_name}
                onChange={handleChange}
                />
                <br />
                <input 
                type="number"
                id='amount'
                name='amount'
                value={transaction.amount} 
                onChange={handleChange}
                />
                <label htmlFor="amount"> +/- Amount</label>
                <br />
                <input 
                type="date" 
                id='date'
                name='date'
                value={transaction.date}
                onChange={handleChange}
                />
                <label htmlFor="date"> Transaction Date</label>
                <br />
                <input 
                type="text" 
                placeholder='Transaction source'
                name='source'
                value={transaction.source}
                onChange={handleChange}
                />
                <br />
                <input 
                type="text"
                placeholder='category'
                name='category'
                value={transaction.category}
                onChange={handleChange}
                />
                <br />
                <input 
                type="submit"
                 />
            </fieldset>
        </form>
    );
};

export default Form;