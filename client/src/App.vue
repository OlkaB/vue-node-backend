<template>
    <div id="app">
        <app-menu />
        <main class="bd-main">
            <div class="container">
                <router-view class="content m-a m-t-8" />
            </div>
        </main>
    </div>
</template>

<script>
import AppMenu from '@/components/Menu.vue'

export default {
    components: {
        AppMenu
    }
}
</script>

<style lang="sass">
.content
    max-width: 1400px
</style>
