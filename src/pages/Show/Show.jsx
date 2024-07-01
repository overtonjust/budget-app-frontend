// Dependencies
import React, {useState, useEffect} from 'react';
import { capitalize } from '../../../utils';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashArrowUp } from '@fortawesome/free-solid-svg-icons';

const Show = () => {
    const [currTransaction, setCurrTransaction] = useState(false)
    const { index } = useParams()
    const navigate = useNavigate()

    const API = import.meta.env.VITE_API_KEY

    useEffect(() => {
        fetch(`${API}/${index}`)
            .then(res => res.json())
            .then(res => setCurrTransaction(res))
            .catch(err => console.error(err))
    },[index])

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
            <article>
                <h2>{capitalize(currTransaction.item_name)}: ${currTransaction.amount}</h2>
                <p>Date processed: {currTransaction.date}</p>
                <p>From {currTransaction.source} as {currTransaction.category}</p>
                <Link to={`/update/?pos=${index}`}><button>Edit</button></Link>
                <FontAwesomeIcon onClick={handleDelete} icon={faTrashArrowUp}></FontAwesomeIcon>
            </article>
        );
    }
};

export default Show;