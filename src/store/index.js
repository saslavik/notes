import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    notes: [
      {
        title: 'First Note',
        importance: 0,
        descr: 'Description for first note',
        date: new Date(Date.now()).toLocaleString(),
      },
      {
        title: 'Second Note',
        importance: 1,
        descr: 'Description for Second note',
        date: new Date(Date.now()).toLocaleString(),
      },
      {
        title: 'Third Note',
        importance: 2,
        descr: 'Description for Third note',
        date: new Date(Date.now()).toLocaleString(),
      },
    ],
  },
  mutations: {
    removeNote(state, index) {
      state.notes.splice(index, 1);
    },
    editNote(state, {index, title, descr}) {
      state.notes[index].title = title;
      state.notes[index].descr = descr;
      state.notes[index].date = new Date(Date.now()).toLocaleString();
    },
    addNote(state, {title, descr, importance}) {
      state.notes.push({title: title, descr: descr, importance: importance, date: new Date(Date.now()).toLocaleString()});
    },
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {
    regUser({commit}, authData) {
      const key = 'AIzaSyDJ9UweV7XCHDm2IX2KoNkfCaPO4IaZK6g'
      return axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`, {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
      .then((res) => {
        commit('setToken', res.data.idToken)
      })
      .catch(e => console.log(e));
    },
    authUser({commit}, authData) {
      const key = 'AIzaSyCu77Ngra3M7e7zzB2eVyriMUQsRGoKgAo'
      return axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`, {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
      .then((res) => {
        commit('setToken', res.data.idToken)
      })
      .catch(e => console.log(e));
    },
    removeNote({commit}, payload) {
      commit('removeNote', payload);
    },
    editNote({commit}, payload) {
      commit('editNote', payload);
    },
    addNote({commit}, payload) {
      commit('addNote', payload);
    }
  },
  getters: {
    noteList(state) {
      return state.notes;
    }
  },
});