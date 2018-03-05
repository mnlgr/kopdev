import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)
export const store = new Vuex.Store({
  state: {
    loadedConcerts: [
      {
        imageUrl: 'https://media.giphy.com/media/l0HlHgiDgsW2c32p2/giphy.gif'
      }
    ],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    registerUserForConcert (state, payload) {
      const id = payload.id
      if (state.user.registeredConcerts.findIndex(concert => concert.id === id) >= 0) {
        return
      }
      state.user.registeredConcerts.push(id)
      state.user.fbKeys[id] = payload.fbKey
    },
    unregisterUserFromConcert (state, payload) {
      const registeredConcerts = state.user.registeredConcerts
      registeredConcerts.splice(registeredConcerts.findIndex(concert => concert.id === payload), 1)
      Reflect.deleteProperty(state.user.fbKeys, payload)
    },
    setLoadedConcerts (state, payload) {
      state.loadedConcerts = payload
    },
    createConcert (state, payload) {
      state.loadedConcerts.push(payload)
    },
    updateConcert (state, payload) {
      const concert = state.loadedConcerts.find(concert => {
        return concert.id === payload.id
      })
      if (payload.title) {
        concert.title = payload.title
      }
      if (payload.description) {
        concert.description = payload.description
      }
      if (payload.date) {
        concert.date = payload.date
      }
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    registerUserForConcert ({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.user
      firebase.database().ref('/users/' + user.id).child('/registrations/')
        .push(payload)
        .then(data => {
          commit('setLoading', false)
          commit('registerUserForConcert', {id: payload, fbKey: data.key})
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    unregisterUserFromConcert ({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.user
      if (!user.fbKeys) {
        return
      }
      const fbKey = user.fbKeys[payload]
      firebase.database().ref('/users/' + user.id + '/registrations/').child(fbKey)
        .remove()
        .then(() => {
          commit('setLoading', false)
          commit('unregisterUserFromConcert', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    loadConcerts ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('concerts').orderByChild('expires').startAt(Date.now() / 1000).once('value')
        .then((data) => {
          const concerts = []
          const obj = data.val()
          for (let key in obj) {
            concerts.push({
              id: key,
              title: obj[key].title,
              day: obj[key].day,
              link: obj[key].link,
              expires: obj[key].expires,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date,
              location: obj[key].location,
              creatorId: obj[key].creatorId,
              similar: obj[key].similar,
              divers: obj[key].divers,
              hour: obj[key].hour,
              prix: obj[key].prix
            })
          }
          commit('setLoadedConcerts', concerts)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    createConcert ({commit, getters}, payload) {
      const concert = {
        title: payload.title,
        expires: payload.expires,
        imageUrl: payload.imageUrl,
        day: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id,
        similar: payload.similar,
        divers: payload.divers,
        hour: payload.hour,
        prix: payload.prix,
        link: payload.link
      }
      firebase.database().ref('concerts').push(concert)
        .then((data) => {
          const key = data.key
          commit('createConcert', {
            ...concert,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
      // Reach out to firebase and store it
    },
    updateConcertData ({commit}, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if (payload.title) {
        updateObj.title = payload.title
      }
      if (payload.description) {
        updateObj.description = payload.description
      }
      if (payload.date) {
        updateObj.date = payload.date
      }
      firebase.database().ref('concerts').child(payload.id).update(updateObj)
        .then(() => {
          commit('setLoading', false)
          commit('updateConcert', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registeredConcerts: [],
              fbKeys: {}
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registeredConcerts: [],
              fbKeys: {}
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {
        id: payload.uid,
        registeredConcerts: [],
        fbKeys: {}
      })
    },
    fetchUserData ({commit, getters}) {
      commit('setLoading', true)
      firebase.database().ref('/users/' + getters.user.id + '/registrations/').once('value')
        .then(data => {
          const dataPairs = data.val()
          let registeredConcerts = []
          let swappedPairs = {}
          for (let key in dataPairs) {
            registeredConcerts.push(dataPairs[key])
            swappedPairs[dataPairs[key]] = key
          }
          const updatedUser = {
            id: getters.user.id,
            registeredConcerts: registeredConcerts,
            fbKeys: swappedPairs
          }
          commit('setLoading', false)
          commit('setUser', updatedUser)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    },
    clearError ({commit}) {
      commit('clearError')
    }
  },
  getters: {
    loadedConcerts (state) {
      return state.loadedConcerts.sort((concertA, concertB) => {
        return concertA.date < concertB.date
      })
    },
    featuredConcerts (state, getters) {
      return getters.loadedConcerts.slice(0, 5)
    },
    loadedConcert (state) {
      return (concertId) => {
        return state.loadedConcerts.find((concert) => {
          return concert.id === concertId
        })
      }
    },
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
})
