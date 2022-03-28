<template>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Edit Brand
        </h2>

        <div class="d-flex">
            <div class="ms-auto">
                <router-link :to="{ name: 'brands.index' }" class="text-sm font-medium">
                    <button class="btn btn-primary">List</button>
                </router-link>
            </div>
        </div>
    </div>


    <form class="space-y-6" @submit.prevent="saveBrand">
        <div class="grid grid-cols-3 gap-4">
            <div class="sm:max-w-md">
                <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                <div class="mt-1">
                    <input type="text" name="name" id="name"
                           class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                           v-model="name"
                           @blur="vx.name.$touch">

                    <p class="text-danger" v-if="vx.name.$error">
                        Name is required</p>
                </div>
            </div>
        </div>

        <button type="submit"
                class="inline-flex items-center mt-2 px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase bg-gray-800 rounded-md border border-transparent ring-gray-300 transition duration-150 ease-in-out hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring disabled:opacity-25"
        >Update</button>

    </form>
</template>

<script>
    import { useRouter } from 'vue-router';
    import useVuelidate from "@vuelidate/core";
    import {required} from "@vuelidate/validators"

    export default {
        name: "Edit",
        props: ['id'],

        setup() {
            return {vx: useVuelidate()}
        },

        mounted() {
            this.getBrand()
        },

        data() {
            return {
                name: '',
                router: useRouter(),
            }

        },



        methods: {
            async validate() {
                const validate = await this.vx.$validate()
                return this.vx.$errors.length;
            },

            async saveBrand() {
                const errors = await this.validate();
                if (errors) return

                axios.put('/api/brands/' + this.id, {
                    name: this.name
                })
                .then(response => {
                    console.log(response.data)
                    this.router.push({name: 'brands.index'})
                })
                .catch(error => {
                    console.log(error.response)
                })
            },


            getBrand() {
                axios.get('/api/brands/'+ this.id)
                .then(response => {
                    console.log(response.data)
                    this.name = response.data?.name
                })
                .catch(error => {
                    console.log(error.response)
                })
            }



        },


        validations() {
            return {
                name: {required},
            }
        },

    }
</script>

<style scoped>

</style>
