/**
 * save local data module
 */
import store from 'store'
const USER_KEY = 'user_key'

export default {
    /**
     * save user
     */
    saveUser(user) {
        // localStorage.setItem(USER_KEY, JSON.stringify(user))
        store.set(USER_KEY,user)
    },
    /**
     * read user
     */
    getUser () {
        // return JSON.parse(localStorage.getItem('user_key') || '{}')
        return store.get(USER_KEY) || {}
    },
    /**
     * delete user
     */
    removeUser () {
        // localStorage.removeItem('user_key')
        store.remove(USER_KEY)
    }

}