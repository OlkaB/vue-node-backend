<template>
    <div class="about">
        <div class="level is-mobile">
            <h1 class="title is-2 m-b-0 level-left">
                Posts
            </h1>

            <button
                @click="handleAddNewPost"
                class="button is-primary level-right"
            >
                + Add new
            </button>
        </div>

        <hr />

        <h2 class="title is-4">Published</h2>

        <template v-if="posts && posts.length > 0 ">
            <div v-for="(post, index) in postsSorted" :key="index" class="box">
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
                        <div class="level">
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
                                    <span class="level-item action" aria-label="edit">
                                        <span
                                            class="icon is-small has-text-info"
                                            @click="editPost(post)"
                                        >
                                            <i class="fas fa-edit" aria-hidden="true"></i>
                                        </span>
                                    </span>
                                    <span class="level-item action" aria-label="delete">
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
                                rows="1"
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
            editedPost: {
                title: null,
                text: null
            },
            isModalVisible: false,
            isLoadingData: true,
            isNewPostAdded: false
        }
    },
    computed: {
        ...mapGetters([
            'posts'
        ]),
        postsSorted () {
            return (
                this.posts && Array.isArray(this.posts)
                    ? [...this.posts].sort((prev, next) => prev.createdAt > next.createdAt ? -1 : 1)
                    : []
            )
        }
    },
    async created () {
        const posts = await this.axios.get('posts')

        if (posts && !!posts.data) {
            this.$store.dispatch('updatePosts', posts.data)
        }

        this.isLoadingData = false
    },
    methods: {
        ...mapActions([
            'updatePost',
            'user'
        ]),
        async deletePost (post) {
            const isDeleteConfirmed = confirm('Delete this post?')
            if (isDeleteConfirmed && post) {
                const postsAfterDeletion = await this.axios.delete(`posts/${post.id}`)

                if (postsAfterDeletion && !!postsAfterDeletion.data) {
                    this.$store.dispatch('updatePosts', postsAfterDeletion.data)
                }
            }
        },
        editPost (post) {
            this.isModalVisible = true
            this.editedPost = post
        },
        handleAddNewPost () {
            this.isNewPostAdded = true
            this.isModalVisible = true
        },
        handleCloseModal () {
            this.isModalVisible = false
            this.isNewPostAdded = false
            this.editedPost = {
                title: null,
                text: null
            }
        },
        async handleSaveChanges () {
            let successMessage = null
            let postsAfterUpdate = null
            if (this.isNewPostAdded) {
                postsAfterUpdate = await this.axios.post(`posts`, {
                    title: this.editedPost.title,
                    text: this.editedPost.text,
                    author: 'John Doe' // TODO
                })
                await this.updatePosts(postsAfterUpdate.data)
                successMessage = 'Post added successfully'
            } else {
                postsAfterUpdate = await this.axios.patch(`posts/${this.editedPost.id}`, {
                    data: {
                        title: this.editedPost.title,
                        text: this.editedPost.text
                    }
                })
                await this.updatePosts(postsAfterUpdate.data)
                successMessage = 'Post edited successfully'
            }

            this.handleCloseModal()

            if (successMessage) {
                this.$toasted.success(successMessage)
            }
        }
    }
}
</script>

<style lang="sass" scoped>
.notification
    max-width: 400px

.action
    cursor: pointer

.title.m-b-0
    margin-bottom: 0
</style>
