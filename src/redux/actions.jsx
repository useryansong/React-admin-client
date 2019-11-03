/**
 * including n * action creator module
 * sync action: object{type:'xxx',data: data}
 * async action: function dispatch => {}
 */
import {reqLogin} from '../api'
import {SET_HEAD_TITLE, RECEIVE_USER, SHOW_ERROR_MSG,RESET_USER} from './action-types'
import storageUtils from '../utils/storageUtils'

 /**
  * setup sync of headtitle action
  */
 export const setHeadTitle = (headTitle) => ({type: SET_HEAD_TITLE,data:headTitle})

 export const receiveUser = (user) => ({type:RECEIVE_USER,user})

 /*
 log out 
  */
export const logout =() => {
    //delete user info in local
    storageUtils.removeUser()
    //return action object
    return {type:RESET_USER}
}

 /*
 display error message action
 */
 export const showErrorMsg = (errorMsg) => ({type:SHOW_ERROR_MSG,errorMsg})
 /**
  * login async action
  */

  export const login = (username, password) => {
      return async dispatch => {
          //1. run async ajax
           const result = await reqLogin(username, password) //{status:0, data: user
        //    const username = result.username
        //    const password = result.password
           if (result.status===0) {
               const user = result.data
               //save in local
               storageUtils.saveUser(user)
               //dispatch 
               dispatch(receiveUser(user))
           }else {
            const msg = "username or password wrong1"
            // message.error(msg)
            dispatch(showErrorMsg(msg))
           }
        }
  }