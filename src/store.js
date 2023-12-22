import { createStore } from 'vuex';
import router from './router';

export default createStore({

    state:{
        isLoggedIn: !!localStorage.getItem('token'),
        user: null
    },
    mutations: {
        LOGIN(state, {user}) {
            state.isLoggedIn = true;
            state.user = user;
            console.log('Logged in');
        },
        LOGOUT(state) {
            state.isLoggedIn = false;
            state.user = null;
            console.log('Logged out');
        }
    },
    actions: {
        login(context, token) {
            localStorage.setItem('token', token);
            context.commit('LOGIN');
            router.push({name: 'home'});
        },
        logout(context) {
            localStorage.removeItem('token');
            context.commit('LOGOUT');
            router.push({name: 'login'});
        }
    },
})
