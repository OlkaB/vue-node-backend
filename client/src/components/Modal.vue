<template>
    <div
        :class="{ 'is-active': isOpened }"
        class="modal"
    >
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">
                    {{ title }}
                </p>
                <button
                    class="delete"
                    aria-label="close"
                    @click="$emit('closeModal')"
                ></button>
            </header>
            <section class="modal-card-body">
                <slot />
            </section>
            <footer class="modal-card-foot">
                <button
                    v-if="hasButtonSecondary"
                    class="button"
                    @click="$emit('clickedButtonSecondary')"
                >
                    {{ buttonSecondaryText }}
                </button>

                <button
                    v-if="hasButtonPrimary"
                    class="button is-success button--primary"
                    @click="$emit('clickedButtonPrimary')"
                >
                    {{ buttonPrimaryText }}
                </button>
            </footer>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        buttonPrimaryText: {
            type: String,
            default: 'OK'
        },
        buttonSecondaryText: {
            type: String,
            default: 'Cancel'
        },
        hasButtonPrimary: {
            type: Boolean,
            default: true
        },
        hasButtonSecondary: {
            type: Boolean,
            default: true
        },
        isOpened: {
            type: Boolean,
            default: true
        },
        title: {
            type: String,
            default: ''
        }
    }
}
</script>

<style lang="sass" scoped>
.modal
    .modal-card-title
        margin-bottom: 0

.button--primary
    margin-left: auto
</style>
