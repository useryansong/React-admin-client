import React, {Component} from 'react'
import {
    Card, Button, Table, Modal
} from 'antd'
import { formateDate } from '../../utils/dateUtils'
import LinkButton from '../../components/link-button'
import UserForm from './user-form'

/**
 * user route
 */

 export default class UserHome extends Component {

    state= {
        users:[
            {
                "_id": '1',
                "username": "test",
                "phone":"13027715151",
                "email":"test@gmail.com",
                "create_time": 1555061581734
            },
            {
                "_id": '2',
                "username": "test2",
                "phone":"13027715151",
                "email":"test2@gmail.com",
                "create_time": 1555061582580
            }
        ],
        isShow: false
    }

    initColumns = () => {
        this.columns = [
            {
                title:'username',
                dataIndex:'username',
            },
            {
                title:'email',
                dataIndex:'email',
            },
            {
                title:'phone',
                dataIndex:'phone',
            },
            {
                title:'register time',
                dataIndex:'create_time',
                render: formateDate
            },
            {
                title:'action',
                render: (user) => (
                    <span>
                        <LinkButton>Modify</LinkButton>
                        <LinkButton>Delete</LinkButton>
                    </span>
                )
            },
            
        ]
    }

    //add or update
    addOrUpdate = () => {

    }

    componentWillMount() {
        this.initColumns()
    }

     render () {
         const {users, isShow} = this.state
         const title = <Button type='primary' onClick={() => this.setState({isShow:true})}>Create user</Button>
         return (
             <Card title={title}>
                 <Table
                    bordered
                    rowKey="_id"
                    dataSource={users}
                    columns={this.columns}
                    pagination={{ defaultPageSize: 5, showQuickJumper: true }} />

                <Modal
                    title="Add user"
                    visible={isShow}
                    onOk={this.addOrUpdate}
                    onCancel={() => this.setState({isShow:false})}
                >
                   <UserForm setForm={form => this.form=form}></UserForm>
                </Modal>
             </Card>
         )
     }
 }