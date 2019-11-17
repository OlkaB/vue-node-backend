const state = {
    user: null,
    authToken: null
}

const getters = {
    user: state => state.user,
    authToken: state => state.authToken,
    isUserLogged: state => !!state.authToken
}

const actions = {
    updateUser ({ commit }, data) {
        commit('updateUser', data)
    },
    logout ({ commit }) {
        commit('logout')
    }
}

const mutations = {
    updateUser (state, data) {
        if (!data) {
            state.user = null
            state.authToken = null
            return
        }

        if (data && data.token) {
            state.authToken = data.token
            delete data.token
        }

        state.user = data.user
    },
    logout (state) {
        state.authToken = null
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
