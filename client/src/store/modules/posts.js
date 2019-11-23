const state = {
    posts: []
}

const getters = {
    posts: state => state.posts
}

const actions = {
    updatePosts ({ commit }, data) {
        commit('updatePosts', data)
    },
    updatePost ({ commit }, data) {
        commit('updatePost', data)
    }
}

const mutations = {
    updatePosts (state, data) {
        if (!data) {
            state.posts = null
            return
        }

        state.posts = data
    },
    updatePost (state, data) {
        if (!data) return

        state.posts = state.posts.map(post => {
            if (post.id === data.id) return data
            return post
        })
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
