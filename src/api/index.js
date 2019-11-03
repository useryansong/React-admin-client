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
export const reqUpdateCategory = (categoryId, categoryName) => ajax(BASE+ '/manage/category/update', {categoryName,categoryId}, 'POST')

//get product
export const reqProduct = (parentId) => ajax(BASE+'/manage/product/productlist',{parentId}, 'GET')

//search product list
export const reqSearchProduct = (productName) => ajax(BASE+'/manage/product/search' , {productName},'GET')

//update product status / On sale or Sold out
export const reqUpdateStatus = (productId, status) => ajax(BASE + '/manage/product/updateStatus', {productId, status}, 'POST')

//add product
// export const reqAddOrProduct = (product) => ajax (BASE+'/manage/product/add', product,'POST')

//modify product
export const reqAddOrUpdateProduct = (product) => ajax (BASE+'/manage/product/'+(product._id?'update':'add'), product,'POST')

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