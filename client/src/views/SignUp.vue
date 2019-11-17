<template>
    <app-auth
        :isLoading="isLoading"
        buttonText="Sign up"
        endpoint="login"
        http-method="post"
        title="Sign up"
        @formSuccess="handleSignUp"
        @isLoading="updateIsLoading"
    />
</template>

<script>
// Components
import AppAuth from '@/components/auth/Auth.vue'

export default {
    components: {
        AppAuth
    },
    data () {
        return {
            isLoading: false
        }
    },
    methods: {
        async handleSignUp () {
            this.$toasted.success("You've been successfully logged in")
            this.isLoading = false
            this.$router.push('/posts')
        },
        updateIsLoading (value) {
            this.isLoading = value
        }
    }
}
</script>
