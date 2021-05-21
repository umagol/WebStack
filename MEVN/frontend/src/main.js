import '@babel/polyfill'
import 'mutationobserver-shim'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import Vue from 'vue'
createApp(App).use(router).mount('#app')
