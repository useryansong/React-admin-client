import React, {Component} from 'react'
import {Card, Button, Table, Modal} from 'antd'
import AddForm from './Add-form'
import {formateDate} from '../../utils/dateUtils'

/**
 * role route
 */

 export default class Role extends Component {
     state = {
         roles:[
             {
                 "_id":"1",
                "name":"admin",
                "create_time":1554639552758,
                "auth_time":1557630307021,
                "auth_name":"admin"
            },
            {
                "_id":"2",
                "name":"admin2",
                "create_time":1554639536419,
                "auth_time":1558410638946,
                "auth_name":"admin"
            }
         ],
         role: {},
         isShowAdd:false,//if show add page
         isShowAuth: false
     }
     initColumn = () => {
         this.columns = [
             {
                 title: 'role name',
                 dataIndex: 'name'
             },
             {
                title: 'create_time',
                dataIndex: 'create_time',
                render: (create_time) => formateDate(create_time)
            },
            {
                title: 'auth_time',
                dataIndex: 'auth_time',
                render: (auth_time) => formateDate(auth_time)
            },
            {
                title: 'auth_name',
                dataIndex: 'auth_name'
            }
         ]
     }

     onRow = (role) => {
        return {
            onClick: event => {
                this.setState({
                    role
                })
            },
        }
     }
     addRole = () => {

     }

     updateRole = () => {

     }

     componentWillMount() {
         this.initColumn()
     }

     render () {
         const {roles, role, isShowAdd, isShowAuth} = this.state
         const title = (
             <span>
                 <Button type='primary' onClick={() => this.setState({isShowAdd:true})}>Create user</Button>&nbsp; &nbsp;
                 <Button type='primary' disabled={!role._id} onClick={() => this.setState({isShowAuth:true})}>Setup user</Button>
             </span>
         )
         return (
             <Card title={title}>
                 <Table
                    bordered
                    rowKey='_id'
                    dataSource={roles}
                    columns={this.columns}
                    rowSelection={
                        {
                            type:'radio', 
                            selectedRowKeys:[role._id],
                            onSelect: (role) => {
                                this.setState({
                                    role
                                })
                            }
                        }
                        
                    }
                    onRow={this.onRow}
                 />
                 <Modal
                    title="Add role"
                    visible={isShowAdd}
                    onOk={this.addRole}
                    onCancel={() => {this.setState({
                        isShowAdd:false
                    })}}
                >
                    <AddForm 
                    setForm={(form) => { this.form = form }}></AddForm>
                </Modal>
                <Modal
                    title="Setup role auth"
                    visible={isShowAuth}
                    onOk={this.updateRole}
                    onCancel={() => {this.setState({
                        isShowAuth:false
                    })}}
                >
                    {/* <AuthForm role={role}></AuthForm> */}
                </Modal>
             </Card>
         )
     }
 }