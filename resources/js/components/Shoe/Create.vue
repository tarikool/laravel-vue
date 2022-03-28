<template>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Add Shoe
        </h2>

        <div class="d-flex">
            <div class="ms-auto">
                <router-link :to="{ name: 'shoes.index' }" class="text-sm font-medium">
                    <button class="btn btn-primary">List</button>
                </router-link>
            </div>
        </div>
    </div>


    <form class="space-y-6" @submit.prevent="saveShoe">
        <div class="grid grid-cols-3 gap-4">
            <div class="row">
                <div class="col-md-4 mb-2">
                    <label for="brand_id" class="block text-sm font-medium text-gray-700">Brand</label>
                    <div class="mt-1">

                        <select name="brand_id" id="brand_id"
                               class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                               v-model="brand_id"
                               @blur="vx.brand_id.$touch">
                            <option value="">Select a brand</option>
                            <template v-for="brand in brandList" :key="brand.id">
                                <option :value="brand.id"
                                        v-text="brand.name"
                                ></option>
                            </template>

                        </select>

                        <p class="text-danger" v-if="vx.brand_id.$error">
                            Brand is required</p>
                    </div>
                </div>
                <div class="col-md-4 mb-2">
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
                <div class="col-md-4 mb-2">
                    <label for="size" class="block text-sm font-medium text-gray-700">Size</label>
                    <div class="mt-1">
                        <input type="text" name="size" id="size"
                               class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                               v-model="size"
                               @blur="vx.size.$touch">

                        <p class="text-danger" v-if="vx.size.$error">
                            Size is required</p>
                    </div>
                </div>
                <div class="col-md-4 mb-2">
                    <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
                    <div class="mt-1">
                        <input type="text" name="size" id="price"
                               class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                               v-model="price"
                               @blur="vx.price.$touch">

                        <p class="text-danger" v-if="vx.price.$error">
                            Price is required</p>
                    </div>
                </div>

                <div class="col-md-4 mb-2">
                    <label for="total" class="block text-sm font-medium text-gray-700">Total</label>
                    <div class="mt-1">
                        <input type="text" name="size" id="total"
                               class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                               v-model="total"
                               @blur="vx.total.$touch">
                        <p class="text-danger" v-if="vx.total.$error">
                            Total is required</p>
                    </div>
                </div>

                <div class="col-md-4 mb-2">
                    <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                    <div class="mt-1">
                        <textarea type="text" name="size" id="description"
                               class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                               v-model="description"
                                  @blur="vx.description.$touch"></textarea>
                        <p class="text-danger" v-if="vx.description.$error">
                            Description is required</p>
                    </div>
                </div>
            </div>
        </div>

        <button type="submit"
                class="inline-flex items-center mt-2 px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase bg-gray-800 rounded-md border border-transparent ring-gray-300 transition duration-150 ease-in-out hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring disabled:opacity-25"
        >Create</button>

    </form>
</template>

<script>
    import { useRouter } from 'vue-router';
    import useVuelidate from "@vuelidate/core";
    import {required} from "@vuelidate/validators"

    export default {
        name: "Create",

        setup() {
            return {vx: useVuelidate()}
        },

        mounted() {
            this.getBrandList()
        },

        data() {
            return {
                brand_id: '',
                name: '',
                size: '',
                price: '',
                description: '',
                total: '',
                brandList: [],

                router: useRouter(),
            }

        },


        methods: {
            async validate() {
                const validate = await this.vx.$validate()
                return this.vx.$errors.length;
            },


            async saveShoe() {
                const errors = await this.validate();
                if (errors) return

                axios.post('/api/shoes', {
                    name: this.name
                })
                .then(response => {
                    console.log(response.data)
                    this.router.push({name: 'shoes.index'})
                })
                .catch(error => {
                    console.log(error.response)
                })
            },

            getBrandList() {
                axios.get('/api/brands')
                    .then(response => {
                        console.log(response.data)
                        this.brandList = response.data
                    })
                    .catch(error => {
                        console.log('brand-list-error:', error.response)
                    })
            },




        },


        validations() {
            return {
                brand_id: {required},
                name: {required},
                size: {required},
                price: {required},
                total: {required},
                description: {required},
            }
        },

    }
</script>

<style scoped>

</style>
