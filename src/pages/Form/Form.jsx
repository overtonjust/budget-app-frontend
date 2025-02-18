// Dependencies
import React,{ useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { formatDateForm } from '../../../utils';
import './Form.scss';

// Compoenents
import  Select  from 'react-select';

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
    const [chosenOption, setChosenOption] = useState('Category')
    const options = [
        {value: 'Income', label: 'Income'},
        {value: 'Food & Drink', label: 'Food & Drink'},
        {value: 'Shopping', label: 'Shopping'},
        {value: 'Entertainment', label: 'Entertainment'},
        {value: 'Expenses', label: 'Expenses'}
    ]
    const [errorMessage, setErrorMessage] = useState('')
    const [transactionType, setTransactionType] = useState('deposit')
    const API = import.meta.env.VITE_API_KEY;

    if(pos) {
        useEffect(() => {
            fetch(`${API}/${pos}`)
                .then(res => res.json())
                .then(res => {
                    if (res.date && res.date.includes('/')) {
                        res.date = formatDateForm(res.date);
                      }
                    setTransaction(res)
                    setChosenOption({value: res.category, label: res.category})
                })
                .catch(err => console.error(err.message))
        },[pos])
    }

    const handleChange = (e) => {
       
        setTransaction((prevState) => {
            return {...prevState, [e.target.name]: e.target. value}
        })
    }

    const handleSelect = (selectedOption) => {
        setChosenOption(selectedOption)
        setTransaction((prevState) => {
            return {...prevState, category: selectedOption.value}
        })
    }

    const handleRadio = (e) => {
        setTransactionType(e.target.value)
        setTransaction((prevState) => {
            const amount = e.target.value === 'withdrawal' ? -Math.abs(prevState.amount) : Math.abs(prevState.amount)
             return {...prevState, amount}
            
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
            .then(res => {
                if(!res.ok) {
                    return res.json().then(err => {
                        throw setErrorMessage(err.error || 'An error occurred');
                    })
                } else {
                    return res.json()
                }
            })
            .then(res => {
               return pos ? navigate(`/transactions/${pos}`) :
                navigate('/transactions')
            })
            .catch(err => console.error(err.message))
    }

    
    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                {errorMessage ? <h5 className='error'>{errorMessage}</h5> : ''}
                <legend>{pos ? 'Edit details' : 'New Transaction'}</legend>
                <div className='input-box'>
                    <input 
                    type="text"
                    placeholder='Item name' 
                    name='item_name'
                    value={transaction.item_name}
                    onChange={handleChange}
                    />
                    <Select
                    value={chosenOption}
                    onChange={handleSelect}
                    placeholder={chosenOption}
                    required={true}
                    isClearable={false} 
                    options={options}
                    styles={{
                        control:(base) => ({
                            ...base,
                            border: 'none',
                            borderBottom: '1px solid #5b5b5b',
                            borderRadius: 'none',
                            fontSize: '.8em',
                            boxShadow: 'none',
                            cursor: 'pointer'
                        }),
                        menu: (base) => ({
                            ...base,
                            color: '#5b5b5b',
                            fontSize: '.8em',
                            
                        }),
                        option: (base) => ({
                            ...base,
                            backgroundColor: '#fff',
                            color: '#5b5b5b',
                            cursor: 'pointer',
                            ":hover": {
                                backgroundColor: 'rgba(0, 176, 255,.4);'
                            },
                        }),
                        placeholder: (base) => ({
                            ...base,
                            color: 'black'
                        })               
                    }}
                    />
                </div>
                <div className="radio-holder">
                    <label htmlFor="deposit">Deposit</label>
                    <input 
                    type="radio" 
                    id='deposit'
                    name='amountType'
                    value='deposit'
                    checked={transactionType === 'deposit'}
                    onChange={handleRadio}
                    />
                </div>
                <div className="radio-holder">
                    <label htmlFor="withdrawal">Withdrawal</label>
                    <input 
                    type="radio" 
                    id='withdrawal'
                    name='amountType'
                    value='withdrawal'
                    checked={transactionType === 'withdrawal'}
                    onChange={handleRadio}
                    />
                </div>
                <input 
                className='input-number'
                type="number"
                id='amount'
                name='amount'
                
                value={transaction.amount} 
                onChange={handleChange}
                />
                <br />
                <label htmlFor="date"> Transaction Date</label>
                <input 
                className='input-date'
                type="date" 
                id='date'
                name='date'
                value={transaction.date}
                onChange={handleChange}
                />
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
                className='submit-button' 
                type="submit"
                 />
            </fieldset>
        </form>
    );
};

export default Form;