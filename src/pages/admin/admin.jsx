import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Layout } from 'antd';
import {connect} from 'react-redux'
// import memoryUtils from '../../utils/memoryUtils'
import LeftNav from '../../components/left-nav/left-nav'
import Header from '../../components/header/header'
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
import User from '../user/user';


const { Footer, Sider, Content } = Layout;

/**
 * admin router component
 */
class Admin extends Component {

    render() {
        const user = this.props.user
        console.log(user==={})
        console.log(user)
        //if there is no user ===> no login user
        if (Object.keys(user).length===0) {
            return (
                <Redirect to='/login' />
            )

        }
        return (
            <Layout style={{height:'100%'}}>
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content style={{margin:20,backgroundColor: '#fff'}}>
                        <Switch>
                            <Route path='/home' component={Home}/>
                            <Route path='/category' component={Category}/>
                            <Route path='/product' component={Product}/>
                            <Route path='/role' component={Role}/>
                            <Route path='/user' component={User}/>
                            <Route path='/charts/bar' component={Bar}/>
                            <Route path='/charts/line' component={Line}/>
                            <Route path='/charts/Pie' component={Pie}/>
                            <Redirect to='/home'/>
                        </Switch>
                    </Content>
                    <Footer style={{textAlign:'center', color:'#ccc'}}>Recommend google Chrome</Footer>
                </Layout>
            </Layout>
        )
    }
}

export default connect(
    state => ({user:state.user}),
    {}
)(Admin)