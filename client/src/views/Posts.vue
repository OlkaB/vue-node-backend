<template>
    <div class="about">
        <h1 class="title is-2">Posts</h1>

        <h2 class="title is-4">Add new</h2>

        <h2 class="title is-4">Published</h2>
        <template v-if="posts">
            <div v-for="(post, index) in posts" :key="index" class="box">
                <article class="media">
                    <div class="media-left">
                        <figure class="image is-64x64">
                            <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image">
                        </figure>
                    </div>
                    <div class="media-content">
                        <div class="content">
                            <p>
                                <strong>John Smith</strong> <small>@johnsmith</small> <small>31m</small>
                                <br>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur sit amet massa fringilla egestas. Nullam condimentum luctus turpis.
                            </p>
                        </div>
                        <nav class="level is-mobile">
                            <div class="level-left">
                                <a class="level-item" aria-label="reply">
                                    <span class="icon is-small">
                                        <i class="fas fa-reply" aria-hidden="true"></i>
                                    </span>
                                </a>
                                <a class="level-item" aria-label="retweet">
                                    <span class="icon is-small">
                                        <i class="fas fa-retweet" aria-hidden="true"></i>
                                    </span>
                                </a>
                                <a class="level-item" aria-label="like">
                                    <span class="icon is-small">
                                        <i class="fas fa-heart" aria-hidden="true"></i>
                                    </span>
                                </a>
                            </div>
                        </nav>
                    </div>
                </article>
            </div>
        </template>

        <div v-else class="notification is-warning">
            No posts yet added
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters(['posts'])
    },
    async created () {
        const posts = await this.axios.get('posts')

        if (posts && !!posts.data) {
            this.$store.dispatch('updatePosts', posts.data)
        }
    }
}
</script>

<style lang="sass" scoped>
.notification
    max-width: 400px
</style>
