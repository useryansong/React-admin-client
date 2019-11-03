import React, { Component } from 'react'
import {
    Card, Form, Input, Icon, Button, message
} from 'antd'
import LinkButton from '../../components/link-button';
import {reqAddOrUpdateProduct} from '../../api/index'

const { TextArea } = Input;
const { Item } = Form;

/**
 * pruductaddupdate route
 */
class ProductAddUpdate extends Component {

    validatePrice = (rule,value,callback) => {
        if (value *1 >0) {
            callback()
        }else {
            callback('price must be higher than 0')
        }
    }

    componentWillMount () {
        //get state
        const product = this.props.location.state
        this.isUpdate = !! product
        this.product = product || {}
    }

    submit = () => {
        //form validation
        this.props.form.validateFields(async (error, values) => {
            if (!error) {
                //get data
                const {name,desc, price} = values
                const product = {name, desc, price}

                //if is update, need id
                if(this.isUpdate) {
                    product._id = this.product._id
                }
                //reqest api
                const result = await reqAddOrUpdateProduct(product)
                console.log(result)

                if (result.status===0){
                    message.success(`${this.isUpdate ? 'update':'Add'}successfully`)
                    this.props.history.goBack()
                }else {
                    message.error(`${this.isUpdate ? 'update':'Add'}failed`)
                }
            }
        })
    }
    render() {
        const {isUpdate, product} = this

        const { getFieldDecorator } = this.props.form
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 8 },
        };
        const title = (
            <span>
                <LinkButton onClick={()=>this.props.history.goBack()}>
                    <Icon type='arrow-left' style={{ fontSize: 20 }} />
                </LinkButton>
                <span>{isUpdate ? 'Modify': 'Add'}</span>
            </span>
        )


        return (
            <Card title={title}>
                <Form {...formItemLayout}>
                    <Item label="Product name">
                        {
                            getFieldDecorator('name', {
                                initialValue: product.name,
                                rules: [
                                    { required: true, message: 'must input product name' }
                                ]
                            })(
                                <Input placeholder='Please input product name'></Input>
                            )
                        }
                    </Item>
                    <Item label="Product desc">
                        {
                            getFieldDecorator('desc', {
                                initialValue: product.desc,
                                rules: [
                                    { required: true, message: 'must input product desc' }
                                ]
                            })(
                                <TextArea placeholder="Please input product desc" autosize={{ minRows: 2, maxRows: 6 }} />
                            )
                        }
                    </Item>
                    <Item label="Product price">
                        {
                            getFieldDecorator('price', {
                                initialValue: product.price,
                                rules: [
                                    { required: true, message: 'must input product desc' },
                                    {validator: this.validatePrice}
                                ]
                            })(
                                <Input type='number' placeholder='Please input product price' addonAfter='CAD'></Input>)
                        }

                    </Item>
                    <Item wrapperCol={{ span: 12, offset: 6 }}>
                        <Button type='primary' onClick={this.submit}>Submit</Button>
                    </Item>
                </Form>
            </Card>
        )
    }
}

export default Form.create()(ProductAddUpdate)