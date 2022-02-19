import axios from "@/axios"

const state = () => ({
    users_data: {
        data: [],
        meta: {},
        links: []
    },
    params: {}
})

const getters = {
    getUsers: state => state.users_data,
    getTotalUsers: state => state.users_data.meta&&state.users_data.meta.last_page || 1
}

const actions = {
    async fetchUsers({ commit, state }, params) {
        try {
            const { data: users } = await axios.get("/users", {
                params: {
                    ...state.params, ...params
                }
            })
            commit("SET_USERS_DATA", { users, params })
            return Promise.resolve(users)
        } catch (error) {
            return Promise.reject(error)
        }
    },
    async createUser( context , body) {
        try {
            const response = await axios.post("/users", body)
            return Promise.resolve(response)
        } catch (error) {
            return Promise.reject(error)
        }
    },
    async updateUser({dispatch}, body) {
        try {
            const response = await axios.put(`/users/${body.id}`, {
                ...body
            })
            dispatch('fetchUsers')
            return Promise.resolve(response)
        } catch (error) {
            return Promise.resolve(error)
        }
    },
    async deleteUser({ dispatch }, id) {
        try {
            const response = await axios.delete(`/users/${id}`)
            await dispatch('fetchUsers');
            return Promise.resolve(response)
        } catch (error) {
            return Promise.reject(response)            
        }
    },
    async updateAdmin({ dispatch }, id) {
        try {
            const response = await axios.put(`/users/admin/${id}`)
            await dispatch('fetchUsers')
            return Promise.resolve(response)
        } catch (error) {
            return Promise.reject(error)
        }  
    }
}

const mutations = {
    SET_USERS_DATA: (state, { users, params }) => {
        state.users_data = users
        state.params = params
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}