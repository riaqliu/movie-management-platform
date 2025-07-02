import { createStore } from 'vuex';

import api from '@/lib/axios';

const state = () => ({
  movies: [],
  hasFetchedInitially: false
});

const mutations = {
  setMovies(state, list) {
    state.movies = list;
  },
  addMovie(state, value) {
    const exists = state.movies.some(m => m.id === value.id)
    if (!exists) state.movies.push(value)
  },
  setHasFetchedInitially(state, value) {
    state.hasFetchedInitially = value;
  }

};

const actions = {
  async fetchMovies({ commit }, filters = {}) {
    console.info('[DEBUG] fetching movies with args: ', filters);
    try {
      const { id } = filters;
      const URL = '/movies/' + (id ?? '');
      const response = await api.get(URL);

      if (response.data.length > 0) {
        commit('setMovies', [ ...response.data ]);
      } else {
        commit('addMovie', response.data );
      }

    } catch (err) {
      console.error(`[DEBUG] Error occurred: ${err}`)
    }
  },
};

const getters = {}


const store = createStore({
  state,
  mutations,
  actions,
  getters
});

export default store
