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

  removeMovie(state, value) {
    const index  = state.movies.findIndex(m => m.id == value)
    if (index !== -1) {
      state.movies.splice(index, 1)
    }
  },

  modifyMovie(state, payload) {
    const movie = state.movies.find(m => m.id == payload.id);
    if (movie) {
      Object.assign(movie, payload)
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

      if (!response.data.length) return;

      commit('setMovies', [ ...response.data ]);

    } catch (err) {
      console.error(`[DEBUG] Error occurred: ${err}`)
    }
  },

  async updateMovie({ commit }, payload) {
    console.info('[DEBUG] updating movie with args: ', payload);
    try {
      const formData = new FormData();
      formData.append('id', payload.id);
      formData.append('title', payload.title);
      formData.append('description', payload.description);
      if (payload.video_file instanceof File) {
        formData.append('video_file', payload.video_file);
      }

      await api.patch(`/movies/${payload.id}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      commit('modifyMovie', payload);
    } catch (err) {
      console.error(`[DEBUG] Error occurred: ${err}`);
    }
  },

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
