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
  removeMovie(state, value) {
    const index  = state.movies.findIndex(m => m.id === value)
    if (index !== -1) {
      state.movies.splice(index, 1)
    }
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

  // async updateMovie({ commit }, filters) {
  //   console.info('[DEBUG] updating movie with args: ', filters);
  //   try {
  //   } catch (err) {
  //     console.error(`[DEBUG] Error occurred: ${err}`);
  //   }
  // },

  async deleteMovie({ commit }, id) {
    console.info('[DEBUG] deleting movie with args: ', id);
    try {
      const URL = `/movies/${id}/`;
      await api.delete(URL);
      commit('removeMovie', id );

    } catch (err) {
      console.error(`[DEBUG] Error occurred: ${err}`);
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
