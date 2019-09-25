import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import logo from '../../assets/images/logo192.png'
import menuList from '../../config/menuConfig'
import { Menu, Icon } from 'antd';

import './left-nav.less'

const { SubMenu } = Menu;


class LeftNav extends Component {

    /**
     * according to the data of menuList, creating the array of label
     */
    // getMenuNodes = (menuList) => {
    //     return menuList.map(item => {
    //         if (!item.children) {
    //             return (
    //                 <Menu.Item key={item.key}>
    //                     <Link to={item.key}>
    //                         <Icon type={item.icon} />
    //                         <span>{item.title}</span>
    //                     </Link>
    //                 </Menu.Item>
    //             )
    //         } else {
    //             return (
    //                 <SubMenu
    //                     key={item.key}
    //                     title={
    //                         <span>
    //                             <Icon type={item.icon} />
    //                             <span>{item.title}</span>
    //                         </span>
    //                     }
    //                 >
    //                     {this.getMenuNodes(item.children)}
    //                 </SubMenu>
    //             )
    //         }
    //     })
    // }

    getMenuNodes = (menuList) => {
        return menuList.reduce((pre, item) => {
            //add <Menu.Item> or <SubMenu> to pre   
            if (!item.children) {
                pre.push((
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                ))
            } else {
                pre.push((
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                ))
            }
            return pre
        }, [])
    }

    render() {
        //get the current url
        const path = this.props.location.pathname
        // console.log(typeof path)
        return (
            <div className='left-nav'>
                <Link to='/' className='left-nav-header'>
                    <img src={logo} alt="logo" />
                    <h1>Admin System</h1>
                </Link>
                {/* Menu component */}
                <Menu
                    mode="inline"
                    theme="dark"
                    defaultSelectedKeys={[path]}
                >
                    {
                        this.getMenuNodes(menuList)
                    }

                </Menu>
            </div>

        )
    }
}

/**
 * withRouter high level component:
 * incluing a componnet which is not the router
 */
export default withRouter(LeftNav)