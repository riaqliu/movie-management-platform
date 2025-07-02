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
  setHasFetchedInitially(state, value) {
    state.hasFetchedInitially = value;
  }

};

const actions = {
  async fetchMovies({ commit }) {
    console.info("[DEBUG] fetching movies");
    try {
      const response = await api.get('/movies/');
      commit('setMovies', [ ...response.data ]);
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
