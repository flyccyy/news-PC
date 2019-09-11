import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
    state:{
        userForm:{
            name:'',
            photo:''
        }
    },
    mutations:{
        changeUser(state,value){
            state.userForm = value
        }
    }
})

export default store