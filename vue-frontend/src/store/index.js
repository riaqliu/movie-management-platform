import { createStore } from 'vuex';

import api from '@/lib/axios';

const state = () => ({
  movies: []
});

const mutations = {
  setMovies(state, arg) {
    state.movies = [ arg ];
  }
};

const actions = {
  async fetchMovies({ commit }) {
    console.info("[DEBUG] fetching movies");
    try {
      const response = await api.get('/movies/');
      console.log("response: ", response);
      commit('setMovies', []);
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
