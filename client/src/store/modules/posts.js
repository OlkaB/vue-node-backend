const state = {
    posts: null
}

const getters = {
    posts: state => state.posts
}

const actions = {
    updatePosts ({ commit }, data) {
        commit('updatePosts', data)
    }
}

const mutations = {
    updatePosts (state, data) {
        if (!data) {
            state.posts = null
            return
        }

        state.posts = data
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
