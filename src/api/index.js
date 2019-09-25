/**
 * including all request function modules
 * all return is promoise
 */
import jsonp from 'jsonp'
import ajax from './ajax'
// import { resolve } from 'url'
import { message } from 'antd'

//login
//  export function reqLogin(username,password) {
//     return ajax('./login', {username,password}, 'POST')
//  }
const BASE = ''

export const reqLogin = (username, password) => ajax(BASE + '/login', { username, password }, 'POST')

//add user
export const reqAddUser = (user) => ajax('/manage/user/add', user, 'POST')

//get first/seconde level category
export const reqCategory = (parentId) => ajax(BASE+ '/manage/category/list', {parentId}, 'GET')
//add category
export const reqAddCategory = (categoryName, parentId) => ajax(BASE+ '/manage/category/add', {categoryName,parentId}, 'POST')
//update category
export const reqUpdateCategory = (categoryName,categoryId) => ajax(BASE+ '/manage/category/update', {categoryName,categoryId}, 'POST')


//weather function
export const reqWeather = (city) => {

    return new Promise((resolve, reject) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4641777241a28fcc18325668c9f48a5e`
        jsonp(url, {}, (err, data) => {
            console.log(`jsonp()`, err, data)
            //if success
            if (!err) {
                const { main, icon } = data.weather[0]
                resolve({ main, icon })
            } else {
                //failed
                message.error('weather failed')
            }
        })
    })


}
reqWeather('Toronto')