// Dependencies
import React from 'react';
import { Chart as ChartJS } from 'chart.js/auto'
import { currentMonth, monthsArray } from '../../../utils';

// Components
import { Doughnut, Bar } from 'react-chartjs-2';

const DynamicChart = ({values, filter}) => {

    const colormap = {
        'Income': '#28B87B',
        'Food & Drink': '#fa8a19',
        'Shopping': '#bf00ff',
        'Entertainment': '#00B0FF',
        'Expenses': '#D10D24'
    }


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
                    labels: ['Income', 'Food & Drink', 'Shopping', 'Entertainment', 'Expenses'],
                    datasets: [
                        {
                            label: 'July',
                            data: values,
                            backgroundColor: Object.values(colormap)
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
                            data: values,
                            backgroundColor: colormap[filter]
                        }
                    ]
                }}
                
            />
        )
    }
};

export default DynamicChart;