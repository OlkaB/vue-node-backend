<template>
    <div id="app">
        <app-menu />
        <router-view class="content m-a m-t-8 p-16" />
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
