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
 * Add category Form component
 */

class AddForm extends Component {
    static propTypes = {
        setForm:PropTypes.func.isRequired
    }

    componentWillMount () {
        this.props.setForm(this.props.form)
    }
    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <Form>
                <Item>
                    {
                        getFieldDecorator('parentId', {
                            initialValue:'0'
                        })(
                            <Select>
                                <Option value='0'>First Level category</Option>
                                <Option value='1'>Computer</Option>
                                <Option value='2'>Books</Option>
                            </Select>
                        )
                    }

                </Item>
                <Item>
                    {
                        getFieldDecorator('categoryName', {
                            initiaValue: ''
                        })(
                            <Input placeholder='Please type category name'></Input>
                        )
                    }
                </Item>
            </Form>
        )
    }
}

export default Form.create()(AddForm)