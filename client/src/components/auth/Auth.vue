<template>
    <div class="columns">
        <div class="column is-6 is-offset-3">
            <div class="panel is-info">
                <div class="panel-heading">{{ title }}</div>
                <form class="p-em075" v-on:submit.prevent="handleRegister">

                    <div
                        v-if="errorMessage"
                        class="notification is-danger"
                    >
                        <button
                            @click="errorMessage = null"
                            class="delete"
                            type="button"
                        ></button>
                        <p>{{ errorMessage }}</p>
                    </div>

                    <div class="field">
                        <label class="label">Email</label>
                        <div :class="{'has-icons-right': form.email.error}" class="control has-icons-left">
                            <input
                                v-focus
                                v-model="form.email.value"
                                :class="{'is-danger': form.email.error }"
                                class="input"
                                type="email"
                                placeholder="harry.potter@hogwart.com"
                            />

                            <span class="icon is-small is-left">
                                <i class="fas fa-envelope"></i>
                            </span>

                            <span v-if="form.email.error" class="icon is-small is-right">
                                <i class="fas fa-exclamation-triangle"></i>
                            </span>
                        </div>

                        <p v-if="form.email.error" class="help is-danger">{{ form.email.error }}</p>
                    </div>

                    <div class="field">
                        <label class="label">Password</label>
                        <p :class="{'has-icons-right': form.password.error}" class="control has-icons-left">
                            <input v-model="form.password.value" :class="{'is-danger': form.password.error }" class="input" type="password" placeholder="********" />

                            <span class="icon is-small is-left">
                                <i class="fas fa-lock"></i>
                            </span>

                            <span v-if="form.password.error" class="icon is-small is-right">
                                <i class="fas fa-exclamation-triangle"></i>
                            </span>
                        </p>

                        <p v-if="form.password.error" class="help is-danger">{{ form.password.error }}</p>
                    </div>

                    <div class="field m-t-24">
                        <button :class="{'is-loading': isLoading}" class="button is-success">{{ buttonText }}</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    props: {
        buttonText: {
            type: String,
            default: null
        },
        endpoint: {
            type: String,
            default: null
        },
        httpMethod: {
            type: String,
            default: null
        },
        isLoading: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: null
        }
    },
    data () {
        return {
            errorMessage: null,
            form: {
                email: {
                    value: null,
                    error: null
                },
                password: {
                    value: null,
                    error: null
                }
            },
            responseErrors: null
        }
    },
    watch: {
        responseErrors (responseErrors) {
            if (responseErrors) {
                if (Array.isArray(responseErrors)) {
                    responseErrors.map(error => {
                        if (this.form[error.path]) {
                            this.form[error.path].error = error.message
                        }
                    })
                } else {
                    this.errorMessage = responseErrors
                }
            }
        }
    },
    methods: {
        ...mapActions([
            'updateUser'
        ]),
        cleanFormErrors () {
            this.responseErrors = null
            this.errorMessage = null

            Object.keys(this.form).map(field => {
                this.form[field].error = null
            })
        },
        async handleRegister () {
            this.$emit('isLoading', true)

            // clean errors
            this.cleanFormErrors()

            const response = await this.axios[this.httpMethod](
                this.endpoint,
                this.httpMethod !== 'get'
                    ? {
                        email: this.form.email.value,
                        password: this.form.password.value
                    }
                    : null
            )

            if (
                response &&
                (
                    !!response.error ||
                    (!!response.data && !!response.data.error)
                )
            ) {
                this.responseErrors = response.error || response.data.error
                this.$emit('isLoading', false)
                this.updateUser(null)
            }

            if (response && !!response.data && !response.data.error) {
                this.updateUser(response.data)

                this.$emit('formSuccess', {
                    form: this.form,
                    response: response.data
                })
            }
        }
    }
}
</script>
