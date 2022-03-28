<template>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Brand List
        </h2>

        <div class="d-flex">
            <div class="ms-auto">
                <router-link :to="{ name: 'brands.create' }" class="text-sm font-medium">
                    <button class="btn btn-primary">Add</button>
                </router-link>
            </div>
        </div>
    </div>

    <div class="overflow-hidden overflow-x-auto min-w-full align-middle sm:rounded-md">

        <table class="w-full border divide-y divide-gray-200 mt-1">
            <thead>
            <tr>
                <th class="px-6 py-3 bg-gray-50">
                    <span class="text-xs font-medium tracking-wider leading-4 text-left text-gray-500 uppercase">
                        Name</span>
                </th>
                <th class="px-6 py-3 bg-gray-50">
                    <span class="text-xs font-medium tracking-wider leading-4 text-left text-gray-500 uppercase">
                        Shoe List</span>
                </th>
                <th class="px-6 py-3 bg-gray-50">
                    <span class="text-xs font-medium tracking-wider leading-4 text-left text-gray-500 uppercase">
                        Action</span>
                </th>
            </tr>
            </thead>

            <tbody class="bg-white divide-y divide-gray-200 divide-solid">
            <template v-for="brand in brandList" :key="brand.id">
                <tr class="bg-white">
                    <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                        {{ brand.name }}
                    </td>
                    <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                        {{ brand.shoes_count }}
                    </td>

                    <td>
                        <router-link :to="{ name: 'brands.edit', params: { id: brand.id } }"
                                     class="mr-2 inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150">
                            Edit
                        </router-link>
                        <button class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150"
                                @click="deleteBrand(brand)"
                        >Delete</button>
                    </td>

                </tr>
            </template>
            </tbody>

        </table>
    </div>
</template>

<script>
    import {useRouter} from "vue-router";

    export default {
        name: "List",
        mounted() {
            this.getList()
        },

        data() {
            return {
                brandList: [],
                router: useRouter(),
            }
        },

        methods: {
            getList() {
                axios.get('/api/brands')
                .then(response => {
                    console.log(response.data)
                    this.brandList = response.data
                })
                .catch(error => {
                    console.log('brand-list-error:', error.response)
                })
            },


            deleteBrand(brand) {
                swal("Are you sure you want to do this?", {
                    buttons: {
                        cancel: 'cancel',
                        yes: {
                            className: 'btn-danger'
                        }
                    },
                }).then(response => {
                    if (response) {
                        axios.delete('api/brands/' + brand.id)
                        .then(response => {
                            console.log(response)

                            this.getList()
                        })
                        .catch(error => {
                            console.log(error.response)
                        })
                    }
                })
            }
        },

    }
</script>

<style scoped>

</style>
