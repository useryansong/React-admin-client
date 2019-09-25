import React, { Component } from 'react'
import { Card, Table, Button, Icon, Divider, message } from 'antd'
import LinkButton from '../../components/link-button'
import {reqCategory} from '../../api'

/**
 * category route
 */

export default class category extends Component {

    state = {
        categorys: [],//first level category
    }

    /**
     * inital Table all cols
     */
    initColumns = () => {
        this.columns = [
            {
                title: 'Category',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: 'Action',
                width: 300,
                render: () => (
                    <span>
                        <LinkButton>Change</LinkButton>
                        <Divider type="vertical" />
                        <LinkButton>Check</LinkButton>
                    </span>
                )
            }
        ]
    }

    /**
     * get first level category
     */
    getCategorys = async () => {
        const result = await reqCategory('0')
        console.log(result)
        if (result.status===0) {
            const categorys = result.data
            this.setState({
                categorys
            })
        } else {
            message.error ('failed')
        }
    }

    //prepare data for first render
    componentWillMount() {
        this.initColumns()
    }

    componentDidMount() {
        this.getCategorys()
    }

    render() {

        const { categorys } = this.state
        //left side of card
        const title = 'First level category'
        //right side of card
        const extra = (
            <Button type='primary'>
                <Icon type='plus' />
                Add
            </Button>
        )

        return (
            <Card title={title} extra={extra} >
                <Table 
                bordered
                rowKey="_id" 
                dataSource={categorys} 
                columns={this.columns}
                pagination={{defaultPageSize:5, showQuickJumper:true}} />;
            </Card>
        )
    }
}