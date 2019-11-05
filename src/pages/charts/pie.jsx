import React, { Component } from 'react'
import { Card, Button } from 'antd'
import ReactEcharts from 'echarts-for-react';
/**
 * Pie route
 */

export default class Line extends Component {


    update = () => {
        
    }
    getOption = () => {
        return {
            title : {
                text: '某站点用户访问来源',
                subtext: '纯属虚构',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['Dome camera','Turret camera','Bullet camera','NVR','DVR']
            },
            series : [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:[
                        {value:335, name:'Dome camera'},
                        {value:310, name:'Turret camera'},
                        {value:234, name:'Bullet camera'},
                        {value:135, name:'NVR'},
                        {value:1548, name:'DVR'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
    }

    render() {
        
        return (
            <div>
                <Card>
                    <Button type="primary" onClick={this.update}>Update</Button>
                </Card>

                <Card title='Bar chart'>
                    {/* render echarts option. */}
                    <ReactEcharts option={this.getOption()} />
                </Card>
            </div>
        )
    }
} 