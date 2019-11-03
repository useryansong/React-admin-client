/**
 * according to old state and action, creating and returning new state
 */
import {combineReducers} from 'redux'
import storageUtils from '../utils/storageUtils'
import {SET_HEAD_TITLE, RECEIVE_USER, SHOW_ERROR_MSG, RESET_USER} from './action-types'

 /**
  * managing header tiltle reducer function
  */
 const initHeadTitle = 'Main Page'
 function headTitle(state=initHeadTitle, action) {
    switch (action.type) {
        case SET_HEAD_TITLE:
                return action.data
        default: 
        return state
    }
 }

  /**
  * managing login user reducer function
  */
 const initUser = storageUtils.getUser()

 function user(state=initUser, action) {
    switch (action.type) {
        case RECEIVE_USER:
            return action.user
        case SHOW_ERROR_MSG:
            const errorMsg = action.errorMsg
            return {...state, errorMsg}
        case RESET_USER:
            return {}
        default: 
        return state
    }
 }

 export default combineReducers({
     headTitle,
     user
 })