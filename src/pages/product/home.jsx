import React, { Component } from 'react'
import { Card, Select, Input, Icon, Button, Table, message } from 'antd'
import LinkButton from '../../components/link-button'
import { reqProduct, reqSearchProduct, reqUpdateStatus } from '../../api'

const Option = Select.Option
/**
 * pruduct route
 */

export default class ProductHome extends Component {

    state = {
        product:[],
        parentId: '0',
        productName:''
        
    }
    initColumns = () => {
         this.columns = [
            {
                title: 'Product name',
                dataIndex: 'name',
            },
            {
                title: 'Product description',
                dataIndex: 'desc',
            },
            {
                title: 'Price',
                dataIndex: 'price',
                render: (price) => "$"+price
            },
            {
                width: 100,
                title: 'Status',
                render: (product) => {
                    const {status, _id} = product
                    return (
                        <span>
                            <Button 
                            type='primary' 
                            onClick={()=> this.updateStatus(_id, status === 0? 1 : 0)}
                            >
                            {status === 0 ? 'Sold out': 'On sales'}
                            </Button>
                            <span>{status === 0? 'On sales': 'Sold out'}</span>
                        </span>
                    )
                }
            },
            {
                width: 100,
                title: 'Actions',
                render: (product) => {
                    return (
                        <span>
                            <LinkButton onClick={() => this.props.history.push('/product/detail', {product})}>Detail</LinkButton>
                            <LinkButton>Modify</LinkButton>
                        </span>
                    )
                }
            },
        ];
    }

    getProducts = async () => {
        const { parentId } = this.state
        const result = await reqProduct(parentId)
        if (result.status === 0) {
            //get category array(fisrt/ second)
            const products = result.data
            if (parentId === '0') {
                //update first category
                this.setState({
                    product: products
                })
            } 
        } else {
            message.error('failed')
        }
    }
    searchByName = async () => {
        const {productName} = this.state
        const result = await reqSearchProduct(productName)
        if (result.status === 0) {
            const products = result.data
            this.setState({
                product:products
            })
        }
    }

    //update product status
    updateStatus = async (productId, status) => {
       const result = await reqUpdateStatus(productId, status)
       if (result.status===0) {
           message.success('update successfully')
           this.getProducts()
       }
    }

    componentWillMount(){
        this.initColumns()
    }

    componentDidMount() {
        this.getProducts()
    }

    render() {

        const { product,productName } = this.state
        
        const title = (
            <span>
                <Select value='1' style={{ width: 150 }}>
                    <Option value='1'>Search by Name</Option>
                    <Option value='2'>Search by description</Option>
                </Select>
                <Input 
                    placeholder='Please input keyword' 
                    style={{ width: 200, margin: '0 15px' }} 
                    value={productName}
                    onChange = {event => this.setState({productName:event.target.value})}
                    />
                <Button type='primary' onClick={this.searchByName}>Search</Button>
            </span>
        )
        const extra = (
            <Button type='primary' onClick={() => this.props.history.push('/product/addupdate')}>
                <Icon type='plus'></Icon>
                Add Product
            </Button>
        )
        return (
            <Card title={title} extra={extra}>
                <Table
                    bordered
                    rowKey='_id'
                    dataSource={product}
                    columns={this.columns} />
            </Card>
        )
    }
}