import axios from "@/axios"

const state = () => ({
    types: {
        data: [],
        meta: {},
        links:[]
    },
    activeTypes: {
        data:[]
    }
})

const getters = {
    getTypes: state =>state.types.data,
    getActiveTypes: state =>state.activeTypes.data.data
}

const actions = {
    async fetchTypes({ commit }, payload) {
        try {
            const { data: types } = await axios.get('/types')
            commit('SET_TYPES', types)
            return Promise.resolve(types)
        } catch (error) {
            return Promise.reject(error)
        }
    },
    async createType({ dispatch }, payload) {
        try {
            const response = await axios.post('/types', payload)
            dispatch('fetchTypes')
            return Promise.resolve(response)
        } catch (error) {
            return Promise.reject(error)
        }
    },
    async updateType({ dispatch }, payload) {
        try {
            const response = await axios.put(`/types/${payload.id}`, payload)
            dispatch('fetchTypes')
            return Promise.resolve(response)
        } catch (error) {
            return Promise.reject(error)
        }
    },
    async deleteType({ dispatch }, id) {
        try {
            const response = await axios.delete(`/types/${id}`)
            dispatch('fetchTypes')
            return Promise.resolve(response)
        } catch (error) {
            return Promise.reject(error)
        }
    },
    async updateActive({ dispatch }, id) {
        try {
            const response = await axios.put(`/types/active/${id}`)
            dispatch('fetchTypes')
            return Promise.resolve(response)
        } catch (error) {
            return Promise.reject(error)
        }
    },
    async fetchActiveTypes({ commit },) {
        try {
            const type = await axios.get(`/types/get_active`)
            commit('SET_ACTIVE_TYPES', type)
            return Promise.resolve(type)
        } catch (error) {
            return Promise.reject(error)
        }
    }
}

const mutations = {
    SET_TYPES: (state, types) => {
        state.types.data = types.data
    },
    SET_ACTIVE_TYPES: (state, types) => {
        state.activeTypes.data = types.data
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}