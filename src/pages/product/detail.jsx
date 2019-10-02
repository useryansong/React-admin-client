import React, { Component } from 'react'
import { Card, Icon, List } from 'antd'
import LinkButton from '../../components/link-button'

const Item = List.Item

/**
 * pruductdetail route
 */

export default class ProductDetail extends Component {
    render() {

       const {name, desc, price} = this.props.location.state.product
        const title = (
            <span>
                <LinkButton>
                    <Icon type='arrow-left' style={{ color: 'green', marginRight: 15 }} 
                    onClick={()=>this.props.history.goBack()}></Icon>
                </LinkButton>
                <span>Product Detail</span>
            </span>
        )
        return (
            <Card title={title} className='product-detail'>
                <List>
                    <Item>
                        <span className='left'>Product Name:</span>
                        <span>{name}</span>
                    </Item>
                    <Item>
                        <span className='left'>Product Desc:</span>
                        <span>{desc}</span>
                    </Item>
                    <Item>
                        <span className='left'>Product Price:</span>
                        <span>{price}</span>
                    </Item>

                </List>
            </Card>
        )
    }
}