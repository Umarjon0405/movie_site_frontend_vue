import axios from "@/axios"

const state = () => ({
    movie_data: {
        data: [],
        meta: {},
        link:[]
    },
    params: {},
    movie_to_play: {}
})

const getters = {
    getMovies: state => state.movie_data,
    getMovieToPlay: state => state.movie_to_play,
    getTotalMovie: state => state.movie_data.meta&&state.movie_data.meta.last_page || 1
}

const actions = {
    async fetchMovies({commit, state}, params) {
        try {
            const { data: movies } = await axios.get('/movies', {
                params: {
                    ...state.params, ...params
                }
            });
            commit("SET_MOVIES_DATA", {movies, params})
            return Promise.resolve(movies)
        } catch (error) {
            return Promise.reject(error)
        }
    },
    async fetchActiveMovies({commit, state}, params) {
        try {
            const { data: movies } = await axios.get('/movies/get_active', {
                params: {
                    ...state.params, ...params
                }
            });
            commit("SET_MOVIES_DATA", {movies, params})
            return Promise.resolve(movies)
        } catch (error) {
            console.log(error);
            return Promise.reject(error)
        }
    },
    async show({ commit }, id) {
        try {
            const response = await axios.get(`/movies/${id}`)
            commit("SET_MOVIE_TO_PLAY", response.data)
            return Promise.resolve(response)
        } catch (error) {
            return Promise.reject(error)
        }
    },
    async createMovie({dispatch}, body) {
        try {
            const response = await axios.post('/movies', body);
            await dispatch('fetchMovies')
            return Promise.resolve(response)
        } catch (error) {
            return Promise.reject(error)
        }
    },
}
const mutations = {
    SET_MOVIES_DATA: (state, { movies, params }) => {
        state.movie_data = movies
        state.params = params
    },
    SET_MOVIE_TO_PLAY: (state, response) => {
        state.movie_to_play = response
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
