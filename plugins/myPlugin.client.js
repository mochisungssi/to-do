import { createStore } from "vuex"

import VuexPersist from 'vuex-persist';


const vuexLocalStorage = new VuexPersist({
  storage: window.localStorage,
})

const store = createStore({
    plugins: [vuexLocalStorage.plugin],
    state: {
        tasks: [
            {
                id: 1,
                name: "Do something awesome!",
                status: {
                done: false
                }
            },
            {
                id: 2,
                name: "Buy toilet paper",
                status: {
                done: false
                }
            },
            {
                id: 3,
                name: "Learn Vue",
                status: {
                done: false
                }
            }
        ]
    },
    mutations: {
        'STORE_TASKS' : (state, newState) => {
            state.tasks = newState
        }
    },
});

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(store);
  // Install the store instance as a plugin
});