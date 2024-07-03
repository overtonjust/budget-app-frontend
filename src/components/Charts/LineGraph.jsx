import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const LineGraph = () => {
    const data = [
        {
            name: 'January',
            'Income': 10,
            'Food & Drink': 20,
            'Shopping': 30,
            'Entertainment': 40,
            'Expenses': 50
        },
        {
            name: 'February',
            'Income': 50,
            'Food & Drink': 40,
            'Shopping': 30,
            'Entertainment': 20,
            'Expenses': 10
        },
        {
            name: 'March',
            'Income': 100,
            'Food & Drink': 25,
            'Shopping': 40,
            'Entertainment': 70,
            'Expenses': 200
        },
        {
            name: 'April',
            'Income': '',
            'Food & Drink': '',
            'Shopping': '',
            'Entertainment': '',
            'Expenses': ''
        },
        {
            name: 'May',
            'Income': '',
            'Food & Drink': '',
            'Shopping': '',
            'Entertainment': '',
            'Expenses': ''
        },
        {
            name: 'June',
            'Income': '',
            'Food & Drink': '',
            'Shopping': '',
            'Entertainment': '',
            'Expenses': ''
        },
        {
            name: 'July',
            'Income': '',
            'Food & Drink': '',
            'Shopping': '',
            'Entertainment': '',
            'Expenses': ''
        },
        {
            name: 'August',
            'Income': '',
            'Food & Drink': '',
            'Shopping': '',
            'Entertainment': '',
            'Expenses': ''
        },
        {
            name: 'September',
            'Income': '',
            'Food & Drink': '',
            'Shopping': '',
            'Entertainment': '',
            'Expenses': ''
        },
        {
            name: 'October',
            'Income': '',
            'Food & Drink': '',
            'Shopping': '',
            'Entertainment': '',
            'Expenses': ''
        },
        {
            name: 'November',
            'Income': '',
            'Food & Drink': '',
            'Shopping': '',
            'Entertainment': '',
            'Expenses': ''
        },
        {
            name: 'December',
            'Income': '',
            'Food & Drink': '',
            'Shopping': '',
            'Entertainment': '',
            'Expenses': ''
        },
        
    ]


    return (
        <div>
            <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 20,
                    left: 20,
                    right: 50
                }}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Line type="monotone" dataKey="Income" stroke='red'/>
                <Line type="monotone" dataKey="Food & Drink" stroke='blue'/>
                <Line type="monotone" dataKey="Shopping" stroke='green'/>
                <Line type="monotone" dataKey="Entertainment" stroke='orange'/>
                <Line type="monotone" dataKey="Expenses" stroke='brown'/>
            </LineChart>
        </div>
    );
};

export default LineGraph;