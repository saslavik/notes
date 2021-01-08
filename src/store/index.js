import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
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
    }
  },
  actions: {
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