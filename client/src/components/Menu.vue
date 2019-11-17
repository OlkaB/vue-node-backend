<template>
    <nav id="navbar" class="bd-navbar navbar has-shadow">
        <div class="container">
            <div class="navbar-brand">
                <a class="navbar-item" href="https://bulma.io">
                    <img src="../assets/logo.png" alt="<logo desc>" />
                </a>

                <div id="navbarBurger" class="navbar-burger burger is-active" data-target="navMenuDocumentation">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <div id="navMenuDocumentation" class="navbar-menu is-active">
                <div v-if="isUserLogged" class="navbar-start">
                    <router-link class="navbar-item bd-navbar-item-documentation is-active" to="/posts">
                        <span class="icon">
                            <i class="fas fa-book"></i>
                        </span>
                        <span>Posts</span>
                    </router-link>

                    <a class="navbar-item bd-navbar-item- is-active" href="https://bulma.io/expo/">
                        <span class="icon">
                            <i class="fas fa-star"></i>
                        </span>
                        <span>MenuItem</span>
                    </a>
                </div>

                <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="field is-grouped is-grouped-multiline">
                            <p v-if="!isUserLogged" class="control">
                                <router-link class="button is-info" to="/register">
                                    Register
                                </router-link>
                            </p>

                            <p v-if="!isUserLogged" class="control">
                                <router-link class="button is-primary" to="/signup">
                                    Signup
                                </router-link>
                            </p>

                            <p v-if="isUserLogged" class="control">
                                <span class="button is-primary" @click="handleLogout">
                                    Logout
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters(['isUserLogged'])
    },
    methods: {
        handleLogout () {
            this.$store.dispatch('updateUser', null)
            // TODO redirect
        }
    }
}
</script>
