import * as firebase from 'firebase'

export default {
  state: {
    loadedConcerts: [
      {
        imageUrl: 'https://media.giphy.com/media/l0HlHgiDgsW2c32p2/giphy.gif'
      }
    ]
  },
  mutations: {
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
    }
  },
  actions: {
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
    }
  }
}
