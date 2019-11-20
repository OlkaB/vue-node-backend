<template>
    <div class="about">
        <h1 class="title is-2">Posts</h1>

        <h2 class="title is-4">Add new</h2>

        <hr />

        <h2 class="title is-4">Published</h2>
        <template v-if="posts">
            <div v-for="(post, index) in posts" :key="index" class="box">
                <article class="media" v-if="post">
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
                        <div class="level is-mobile">
                            <div class="level-left is-block">
                                <p class="is-marginless text--14">
                                        <strong>{{ post.author }}</strong>
                                        <span v-if="post.authorEmail">{{ post.authorEmail }}</span>
                                </p>
                                <p class="text--12 is-italic">
                                    Created at: {{ post.createdAt | dateFromDateTimeString }}
                                </p>

                            </div>
                            <small class="level-right"></small>

                            <nav class="level is-mobile">
                                <div class="level-left">
                                    <span class="level-item" aria-label="edit">
                                        <span
                                            class="icon is-small has-text-info"
                                            @click="editPost(post)"
                                        >
                                            <i class="fas fa-edit" aria-hidden="true"></i>
                                        </span>
                                    </span>
                                    <span class="level-item" aria-label="delete">
                                        <span
                                            class="icon is-small has-text-danger"
                                            @click="deletePost(post)"
                                        >
                                            <i class="fas fa-trash" aria-hidden="true"></i>
                                        </span>
                                    </span>
                                </div>
                            </nav>
                        </div>
                    </div>
                </article>
            </div>

            <app-modal
                v-if="isModalVisible"
                :is-opened="isModalVisible"
                buttonPrimaryText="Save changes"
                title="Edit post"
                @clickedButtonPrimary="handleSaveChanges"
                @clickedButtonSecondary="handleCloseModal"
                @closeModal="handleCloseModal"
            >
                <form v-on:submit.prevent="">
                    <div class="field">
                        <label class="label">Title</label>
                        <div class="control">
                            <textarea
                                v-model="editedPost.title"
                                class="textarea"
                            />
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Text</label>
                        <div class="control">
                            <textarea
                                v-model="editedPost.text"
                                class="textarea"
                            />
                        </div>
                    </div>
                </form>
            </app-modal>
        </template>

        <div v-else class="notification is-warning">
            No posts yet added
        </div>
    </div>
</template>

<script>
// Libs
import { mapActions, mapGetters } from 'vuex'

// Components
import AppModal from '@/components/Modal.vue'

export default {
    components: {
        AppModal
    },
    data () {
        return {
            editedPost: null,
            isModalVisible: false
        }
    },
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
    },
    methods: {
        ...mapActions([
            'updatePost'
        ]),
        deletePost (post) {

        },
        editPost (post) {
            this.isModalVisible = true
            this.editedPost = post
        },
        handleCloseModal () {
            this.isModalVisible = false
            this.editedPost = null
        },
        async handleSaveChanges () {
            const postUpdated = await this.axios.patch(`posts/${this.editedPost.id}`, {
                data: {
                    title: this.editedPost.title,
                    text: this.editedPost.text
                }
            })

            await this.updatePost(postUpdated.data)
            this.handleCloseModal()
        }
    }
}
</script>

<style lang="sass" scoped>
.notification
    max-width: 400px
</style>
