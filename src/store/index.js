import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import moment from 'moment';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    login: null,
    notes: [],
  },
  mutations: {
    setNotes(state, notes) {
      state.notes = notes
    },
    removeNote(state, index) {
      state.notes.splice(index, 1);
    },
    editNote(state, {index, note}) {
      state.notes[index].title = note.title;
      state.notes[index].descr = note.descr;
      state.notes[index].date = note.date;
    },
    addNote(state, note) {
      state.notes.push(note);
    },
    setToken(state) {
      state.token = localStorage.getItem('token');
    },
    setLogin(state) {
      state.login = localStorage.getItem('login');
    },
    logout(state) {
      localStorage.removeItem('token');
      localStorage.removeItem('login');
      state.token = null;
      state.login = null;
    },
    setName(state, name) {
      state.login = name;
    }
  },
  actions: {
    regUser({commit, dispatch}, authData) {
      const key = 'AIzaSyDJ9UweV7XCHDm2IX2KoNkfCaPO4IaZK6g'
      return axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`, {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
      .then((res) => {
        localStorage.setItem('login', res.data.localId)
        localStorage.setItem('token', res.data.idToken)
        commit('setToken')
        commit('setLogin')
        dispatch('getPosts')
      })
      .catch(e => console.log(e));
    },
    authUser({commit, dispatch}, authData) {
      const key = 'AIzaSyDJ9UweV7XCHDm2IX2KoNkfCaPO4IaZK6g'
      return axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`, {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
      .then((res) => {
        localStorage.setItem('login', res.data.localId)
        localStorage.setItem('token', res.data.idToken)
        commit('setToken')
        commit('setLogin')
        dispatch('getPosts')
      })
      .catch(e => console.log(e));
    },
    getPosts({commit, state}) {
      return axios.get(`https://notes-app-556f0-default-rtdb.firebaseio.com/${state.login}.json`)
        .then(res => {
          const notesArray = []
          for (let key in res.data) {
            notesArray.push({...res.data[key], id: key})
          }
          commit('setNotes', notesArray);
        })
    },
    addNote({state, dispatch}, {title, descr, importance}) {
      let note = {}
      note.title = title,
      note.descr = descr,
      note.importance = importance,
      note.date = moment();
      return axios.post(`https://notes-app-556f0-default-rtdb.firebaseio.com/${state.login}.json`, note)
        .then(() => {
          dispatch('getPosts')
        })
    },
    removeNote({state, dispatch, commit}, {id, index}) {
      commit('removeNote', index)
      return axios.delete(`https://notes-app-556f0-default-rtdb.firebaseio.com/${state.login}/${id}.json`)
        .then(() => {
          dispatch('getPosts')
        })
    },
    editNote({commit, state, dispatch}, {note, id, index}) {
      note.date = new Date(Date.now()).toLocaleString();
      commit('editNote', {index, note});
      return axios.put(`https://notes-app-556f0-default-rtdb.firebaseio.com/${state.login}/${id}.json`, note)
      .then(() => {
        dispatch('getPosts')
      })
    },
    setToken({commit}) {
      commit('setToken')
    },
    setLogin({commit}) {
      commit('setLogin')
    },
    logout({commit}) {
      commit('logout')
    }
  },
  getters: {
    noteList(state) {
      return state.notes;
    },
    getToken(state) {
      return state.token;
    }
  },
});