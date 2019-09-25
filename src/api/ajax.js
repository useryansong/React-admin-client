/**
 * Function module that can send asynchronous ajax requests
 * 
 * return: promise
 * 
 * 1.handle the error of request
 */
import axios from 'axios'
import {message} from 'antd'

export default function ajax(url, data = {}, type = 'GET') {

    return new Promise((resolve, reject) => {
        let promise
        //1. runing ajax
        if (type === 'GET') {
            //send get request
           promise = axios.get(url, {//config object
                params: data
            })
        } else {//send post}
            promise = axios.post(url, data)
        }
        //2. if success, calling resolve
        promise.then(response => {
            resolve(response.data)
        })
        //3. if failed, not calling reject, hinting abnormal message
    }).catch(error => {
        message.error('request error:' + error.message)
    })

}


// //request login API
// ajax('/login', {username:'Tom',password:'12345'}, 'POST').then()