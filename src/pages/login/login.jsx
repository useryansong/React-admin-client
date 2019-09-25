import React, { Component } from 'react'
import { Form, Icon, Input, Button, message } from 'antd';
import {Redirect} from 'react-router-dom'

import './login.less'
import avatar from '../../assets/images/logo192.png'
import { reqLogin } from '../../api/index'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'

/**
 * login router component
 */
class Login extends Component {

    handleSubmit = (event) => {
        //stop default event
        event.preventDefault()
        this.props.form.validateFields(async (err, values) => {
            //validation success
            if (!err) {
                //console.log('Received values of form: ', values);
                const { username, password } = values
                const result = await reqLogin(username, password)// {status:0 or 1, data: }
                console.log('request success', result)
                if (result.status === 0) {//login success
                    message.success('login successully')

                    //SAVE user
                    const user = result.data
                    memoryUtils.user = user // save in RAM
                    storageUtils.saveUser(user) //save data in local

                    //nav to admin page
                    this.props.history.replace('/')
                } else {//login failed
                    message.error(result.msg)
                }
            } else {
                console.log('request failed')

            }
        });
        //get form
        // const form = this.props.form
        //get form data
        // const values = form.getFieldsValue()  
    }

    render() {
        //if has aready login, nav to admin
        const user = memoryUtils.user
        if(!user) {
            return (
                <Redirect to='/'/>
            )
        }

        //receive the form function
        const form = this.props.form
        const { getFieldDecorator } = form
        return (
            <div className="login">
                <header className="login-header">
                    <img src={avatar} alt='avatar' />
                    <h1>Administration System</h1>
                </header>
                <section className="login-content">
                    <h2>Sign in</h2>
                    <div>
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <Form.Item>
                                {getFieldDecorator('username', {
                                    rules: [
                                        { required: true, whitespace: true, message: 'Please input your username!' },
                                        { min: 4, message: 'username too short' },
                                        { max: 12, message: 'username too long' },
                                        { pattern: /^[a-zA-Z0-9_]+$/, message: 'username must be letter, number or _' },
                                    ],
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Username"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('password', {
                                    rules: [
                                        { required: true, message: 'Please input your Password!' },
                                        { min: 4, message: 'password too short' },
                                        { max: 12, message: 'password too long' },
                                        { pattern: /^[a-zA-Z0-9_]+$/, message: 'password must be letter, number or _' },
                                    ],
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="Password"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Sign in
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </section>
            </div>
        )
    }
}

/**
 * 1. high level funcion
 *  1). the special function
 *      a. have props of function
 *      b. return to function
 *  2. comment high level function:
 *      a. setTimeout()/setInterval()
 *      b. Promise: Promise(() => {}) then ()
 *      c. array: forEach()/filter()/map()...
 *      d. fn.bind()
 *
 * 
 * 2. high level component
 *  1). it is the function
 *  2). receive a component, then return a new component, the new component will give the special props to old component
 */
const WrapLogin = Form.create()(Login)
export default WrapLogin

/**
 * 1.js-form-validation
 * 2.get form data
 */

/**
 * async and await
 * 1. make easier for using promise object: don't need to use then()
 * 2. where to use await?
 *  at the left side of promise: don't want promise, just want the value after promise funciton
 * 3. where to use async/
 * at the left side of the function which include await
 */