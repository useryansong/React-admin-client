import React, { Component } from 'react'
import { Card, Button } from 'antd'
import ReactEcharts from 'echarts-for-react';
/**
 * Bar route
 */

export default class Bar extends Component {

    state = {
        sales: [5, 20, 36, 10, 10, 20],
        stock: [10, 25, 30, 18, 13, 14]
    }
    update = () => {
        
    }
    getOption = (sales, stock) => {
        return {
            title: {
                text: 'ECharts 入门示例'
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
                type: 'bar',
                data: sales
            },{
                name: 'Stock',
                type: 'bar',
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