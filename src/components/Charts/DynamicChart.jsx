import React from 'react';
import { Chart as ChartJS } from 'chart.js/auto'
import { Doughnut, Bar } from 'react-chartjs-2';
import { currentMonth, monthsArray } from '../../../utils';


const DynamicChart = ({values, filter}) => {
    

    const textCenter = {
        id: 'textCenter',
        beforeDatasetDraw(chart, args, pluginOptions) {
            const { ctx, data } = chart

            ctx.save()
            ctx.font = ' bold 20px Inter'
            ctx.fillStyle = '#00B0FF'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillText(`${currentMonth()}`, chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y)
        }
    }

    if(filter === 'View All'){
        return (
            <Doughnut
                data={{
                    labels: ['Income', 'Food & Drink', 'Shopping', 'Entertainment', 'Expense'],
                    datasets: [
                        {
                            label: 'July',
                            data: values
                        },  
                    ],
                }}
                plugins={[textCenter]}
            />
        );
    } else {
        return (
            <Bar
                data={{
                    labels: monthsArray,
                    datasets: [
                        {
                            label: filter,
                            data: values
                        }
                    ]
                }}
            />
        )
    }
};

export default DynamicChart;