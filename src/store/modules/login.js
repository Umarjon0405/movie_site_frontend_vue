import axios from "@/axios"

const state = () => ({
   
})

const getters = {
   
}

const actions = {
    async signIn({ commit }, body) {
        body.grant_type = process.env.VUE_APP_GRANT_TYPE
        body.client_secret = process.env.VUE_APP_CLIENT_SECRET
        body.client_id = process.env.VUE_APP_CLIENT_ID
        try {
            const login = await axios.post(process.env.VUE_APP_OAUTH_URL, {
                ...body
            })    
            commit('SET_TOKEN', login.data)
            return Promise.resolve()
        } catch (error) {
            return Promise.reject()
        }
        
    }
}

const mutations = {
    SET_TOKEN: (state, login) => {
        localStorage.access_token = login.access_token
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}