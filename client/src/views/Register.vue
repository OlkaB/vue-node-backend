<template>
    <app-auth
        :isLoading="isLoading"
        buttonText="Register"
        endpoint="register"
        http-method="post"
        title="Register"
        @formSuccess="handleRegister"
        @isLoading="updateIsLoading"
    />
</template>

<script>
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
        async handleRegister () {
            this.$toasted.success("You've been successfully registered")
            this.isLoading = false
            this.$router.push('/posts')
        },
        updateIsLoading (value) {
            this.isLoading = value
        }
    }
}
</script>
