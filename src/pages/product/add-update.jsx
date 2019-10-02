import React, { Component } from 'react'
import {
    Card, Form, Input, Icon
} from 'antd'
import LinkButton from '../../components/link-button';

const { TextArea } = Input;
const  {Item}  = Form;

/**
 * pruductaddupdate route
 */

export default class ProductAddUpdate extends Component {
    render() {
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 8 },
          };
        const title = (
            <span>
                <LinkButton>
                    <Icon type='arrow-left' style={{fontSize:20}} />
                </LinkButton>
                <span>Add Product</span>
            </span>
        )
        return (
            <Card title={title}>
                <Form {...formItemLayout}>
                    <Item label="Product name">
                        <Input placeholder='Please input product name'></Input>
                    </Item>
                    <Item label="Product name">
                        <TextArea placeholder="Please input product desc" autosize={{ minRows: 2, maxRows: 6 }} />
                    </Item>
                    <Item label="Product price">
                        <Input type ='number' placeholder='Please input product price' addonAfter='CAD'></Input>
                    </Item>
                </Form>
            </Card>
        )
    }
}