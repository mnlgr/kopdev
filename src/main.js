import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import * as firebase from 'firebase'
import 'vuetify/dist/vuetify.min.css'
import { store } from './store'
import DateFilter from './filters/date'
import AlertCmp from './components/Shared/Alert.vue'
import EditConcertDetailsDialog from './components/Concert/Edit/EditConcertDetailsDialog.vue'
import EditConcertDateDialog from './components/Concert/Edit/EditConcertDateDialog.vue'
import EditConcertTimeDialog from './components/Concert/Edit/EditConcertTimeDialog.vue'
import RegisterDialog from './components/Concert/Registration/RegisterDialog.vue'

Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)
Vue.component('app-edit-concert-details-dialog', EditConcertDetailsDialog)
Vue.component('app-edit-concert-date-dialog', EditConcertDateDialog)
Vue.component('app-edit-concert-time-dialog', EditConcertTimeDialog)
Vue.component('app-concert-register-dialog', RegisterDialog)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyDZ8TcvM6C6AF04vkjpK8C8MBCayk3jfEA',
      authDomain: 'koplesh-1a17e.firebaseapp.com',
      databaseURL: 'https://koplesh-1a17e.firebaseio.com',
      projectId: 'koplesh-1a17e',
      storageBucket: 'gs://koplesh-1a17e.appspot.com/'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
        this.$store.dispatch('fetchUserData')
      }
    })
    this.$store.dispatch('loadConcerts')
  }
})
