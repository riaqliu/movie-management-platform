import { createStore } from 'vuex';

const state = () => ({
  videos: []
});

const mutations = {
  setVideos(state, arg) {
    state.videos = [ arg ];
  }
};

const actions = {
  async fetchVideos({ commit }) {
    console.log("fetching videos");
    commit('setVideos', []);
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
