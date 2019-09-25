import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import './header.less'
import {formateDate} from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import {reqWeather} from '../../api/index'
import menuList from '../../config/menuConfig'
import { Modal} from 'antd';
import LinkButton from '../../components/link-button'
import storageUtils from '../../utils/storageUtils'


class Header extends Component {

    state = {
        currentTime: formateDate(Date.now()),
        main: '',
    }

    getTime = () => {
        this.interval = setInterval(() => {
            const currentTime = formateDate(Date.now())
            this.setState({currentTime})
        },1000)
    }

    getWeather = async () => {
        //user API
        const {main, icon} = await reqWeather('Toronto')
        this.setState({main, icon})
    }


    getTitle = () => {
        //get current url
        const path = this.props.location.pathname
        let title
        menuList.forEach(item => {
            if (item.key === path) { // if current item's key is same with path, the tile of itme is what I need
               title = item.title
            }else if (item.children) {
                //find matched in all children items
                const cItem = item.children.find(cItem => cItem.key === path)
                //if true, menas there is matched
                if(cItem) {
                    //get title
                    title = cItem.title
                }
            }
        })
        return title
    }

    //Log out
    logOut = () => {
        //show confirm logout
        Modal.confirm({
            title: 'Do you Want to log out?',
            onOk: () => {
              //delete user saved
              storageUtils.removeUser()
              memoryUtils.user= {}

              //direct to login in
              this.props.history.replace('/login')
            }
          })
    }

        //after first time render()
        componentDidMount () {
            //get current time
            this.getTime()
            //get current weather
            this.getWeather()
        }

        /**
         * when the current component unmount
         */
        componentWillUnmount () {
            clearInterval(this.interval)
        }

    render() {
        const {currentTime, main} = this.state
        const username = memoryUtils.user.username
        const title = this.getTitle()
        return (
            <div className='header'>
                <div className='header-top'>
                    <span>Welcome, {username}</span>
                    <LinkButton onClick={this.logOut}>
                        Log out
                    </LinkButton>
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>{title}</div>
                    <div className='header-bottom-right'>
                        <span>{currentTime}</span>
                        <img src="http://api.map.baidu.com/images/weather/day/qing.png" alt="weather"/>
                        <span>{main}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)