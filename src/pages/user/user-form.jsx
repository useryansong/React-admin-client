import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Form,
    Select,
    Input
} from 'antd'

const Item = Form.Item
const Option = Select.Option

/**
 * Add user Form component
 */

class UserForm extends Component {
    static propTypes = {
        setForm:PropTypes.func.isRequired
    }

    componentWillMount () {
        this.props.setForm(this.props.form)
    }
    render() {
        const { getFieldDecorator } = this.props.form
        const formItemLayout = {
            labelCol: {span:4},
            wrapperCol: {span:15},
        }
        return (
            <Form>
            
                <Item label='username' {...formItemLayout}>
                    {
                        getFieldDecorator('username', {
                            initiaValue: ''
                        })(
                            <Input placeholder='Please type username'></Input>
                        )
                    }
                </Item>
            </Form>
        )
    }
}

export default Form.create()(UserForm)