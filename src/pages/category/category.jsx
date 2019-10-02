import React, { Component } from 'react'
import { Card, Table, Button, Icon, Divider, message, Modal } from 'antd'
import LinkButton from '../../components/link-button'
import { reqCategory, reqUpdateCategory, reqAddCategory } from '../../api'
import AddFrom from './add-form'
import UpdateForm from './update-form'

/**
 * category route
 */

export default class category extends Component {

    state = {
        categorys: [],//first level category
        parentId:"0",
        parentName: '',
        subCategorys: [],// second level
        showStatus: 0,// Add/update component visible or not,0 both invisible, 1 show add, 2 show update
    }

    /**
     * inital Table all cols
     */
    initColumns = () => {
        this.columns = [
            {
                title: 'Category',
                dataIndex: 'name'
            },
            {
                title: 'Action',
                width: 300,
                render: (record) => (
                    <span>
                        <LinkButton onClick={() => this.showUpdate(record)}>Change</LinkButton>
                        <Divider type="vertical" />
                        {/*pass parameters to event callback function */}
                        {this.state.parentId === '0' ? <LinkButton onClick={() => { this.showSubCategorys(record) }}>Check</LinkButton> : null}
                    </span>
                )
            }
        ]
    }

    /**
     * get first/second level category
     */
    getCategorys = async () => {
        const { parentId } = this.state
        const result = await reqCategory(parentId)
        console.log(result)
        if (result.status === 0) {
            //get category array(fisrt/ second)
            const categorys = result.data
            if (parentId === "0") {
                //update first category
                this.setState({
                    categorys
                })
            } else {
                //update second category
                this.setState({
                    subCategorys: categorys
                })
            }
        } else {
            message.error('failed')
        }
    }

    //show second category in the first category
    showSubCategorys = (categories) => {
        this.setState({
            parentId: category._id,
            parentName: category.name
        }, () => {
            //will do after data update and render()
            this.getCategorys()
        })

    }

    showCategorys = () => {
        this.setState({
            parentId: '0',
            parentName: '',
            subCategorys: []
        })
    }

    // click cancel to invisible confirm
    handleCancel = () => {
        //clear input data
        this.form.resetFields()
        this.setState({
            showStatus: 0
        })
    }

    //show add
    showAdd = () => {
        this.setState({
            showStatus: 1
        })
    }

    //add category
    addCategory =async () => {

        //invisible
        this.setState({
            showStatus:0
        })
        //get data and send to server
        const {parentId, categoryName} = this.form.getFieldsValue()
        console.log(parentId, categoryName)
        //clear input data
        this.form.resetFields()
        const result = await reqAddCategory(categoryName,parentId)
        console.log(result)
        if (result.status === 0) {
            this.getCategorys()
        }
    }

    //show update
    showUpdate = (record) => {
        //save category object
        this.category = record
        //update state
        this.setState({
            showStatus: 2
        })
    }

    //update category
    updateCategory =() => {

        //form validation
        this.form.validateFields(async (err, values) => {
            if(!err) {
                this.setState({
                    showStatus: 0
                })
                const categoryId = this.category._id
                // const categoryName = this.form.getFieldValue("categoryName")
                const {categoryName} = values
                //clear input data
                this.form.resetFields()
                //2.send request update category
                const result = await reqUpdateCategory({ categoryId, categoryName })
                if (result.status === 0) {
                    //3. reshow category
                    this.getCategorys()
                }
            }
        })
        

    }

    //prepare data for first render
    componentWillMount() {
        this.initColumns()
    }

    componentDidMount() {
        this.getCategorys()
    }

    render() {

        const { categorys, subCategorys, parentId, parentName, showStatus } = this.state
        const category = this.category || {}
        //left side of card
        const title = parentId === '0' ? 'First level category' : (
            <span>
                <LinkButton onClick={this.showCategorys}>First level category</LinkButton>
                <Icon type='arrow-right' style={{ marginRight: 5 }}></Icon>
                <span>{parentName}</span>
            </span>
        )
        //right side of card
        const extra = (
            <Button type='primary' onClick={this.showAdd}>
                <Icon type='plus' />
                Add
            </Button>
        )

        return (
            <Card title={title} extra={extra} >
                <Table
                    bordered
                    rowKey="_id"
                    dataSource={parentId === '0' ? categorys : subCategorys}
                    columns={this.columns}
                    pagination={{ defaultPageSize: 5, showQuickJumper: true }} />;

                <Modal
                    title="Add category"
                    visible={showStatus === 1}
                    onOk={this.addCategory}
                    onCancel={this.handleCancel}
                >
                    <AddFrom 
                    categorys={categorys}
                    setForm={(form) => { this.form = form }}></AddFrom>
                </Modal>
                <Modal
                    title="Update category"
                    visible={showStatus === 2}
                    onOk={this.updateCategory}
                    onCancel={this.handleCancel}
                >
                    <UpdateForm
                        categoryName={category.name}
                        setForm={(form) => { this.form = form }} />
                </Modal>
            </Card>
        )
    }
}