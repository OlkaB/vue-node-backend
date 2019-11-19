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
                            <h2 class="title is-size-4">
                                {{ post.title }}
                            </h2>
                            <p>
                                {{ post.text }}
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
                        <div class="level is-mobile">
                            <small class="level-left"><strong>{{ post.author }}</strong> <span v-if="post.authorEmail">{{ post.authorEmail }}</span></small>
                            <small class="level-right">Created at: {{ post.createdAt | dateFromDateTimeString }}</small>
                        </div>
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
        ...mapGetters([
            'posts'
        ])
    },
    async created () {
        const posts = await this.axios.get('posts')

        if (posts && !!posts.data) {
            this.$store.dispatch('updatePosts', posts.data)
        }

        // test patch request
        // const postsPATCH = await this.axios.patch(`posts/${5}`, {
        //     data: {
        //         author: 'Amy LeeToo',
        //         text: 'Ldkjshdska hdhakjds djaksdjkash jkdask',
        //         title: 'Hello here my love here'
        //     }
        // })
    }
}
</script>

<style lang="sass" scoped>
.notification
    max-width: 400px
</style>
