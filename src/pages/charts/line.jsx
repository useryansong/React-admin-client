import React, { Component } from 'react'
import { Card, Button } from 'antd'
import ReactEcharts from 'echarts-for-react';
/**
 * Line route
 */

export default class Line extends Component {

    state = {
        sales: [5, 20, 36, 10, 10, 20],
        stock: [10, 25, 30, 18, 13, 14]
    }
    update = () => {
        
    }
    getOption = (sales, stock) => {
        return {
            title: {
                text: 'ECharts example'
            },
            tooltip: {},
            legend: {
                data:['Sales','Stock']
            },
            xAxis: {
                data: ["Dome Camera","Turret Camera","Bullet Camera","NVR","DVR","Hybrid"]
            },
            yAxis: {},
            series: [{
                name: 'Sales',
                type: 'line',
                data: sales
            },{
                name: 'Stock',
                type: 'line',
                data: stock
            }]
        }
    }

    render() {
        const {sales, stock} =this.state
        return (
            <div>
                <Card>
                    <Button type="primary" onClick={this.update}>Update</Button>
                </Card>

                <Card title='Bar chart'>
                    {/* render echarts option. */}
                    <ReactEcharts option={this.getOption(sales, stock)} />
                </Card>
            </div>
        )
    }
} 