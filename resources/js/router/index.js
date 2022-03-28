import { createRouter, createWebHistory } from "vue-router";

import BrandList from '../components/Brand/List'
import BrandCreate from '../components/Brand/Create'
import BrandEdit from '../components/Brand/Edit'

import ShoeList from '../components/Shoe/List'
import ShoeCreate from '../components/Shoe/Create'
import ShoeEdit from '../components/Shoe/Edit'

const routes = [
    {
        path: '/brands',
        name: 'brands.index',
        component: BrandList
    },
    {
        path: '/brands/create',
        name: 'brands.create',
        component: BrandCreate
    },
    {
        path: '/brands/:id/edit',
        name: 'brands.edit',
        component: BrandEdit,
        props: true
    },

    {
        path: '/dashboard',
        name: 'dashboard',
        component: ShoeList
    },
    {
        path: '/shoes',
        name: 'shoes.index',
        component: ShoeList
    },
    {
        path: '/shoes/create',
        name: 'shoes.create',
        component: ShoeCreate
    },
    {
        path: '/shoes/:id/edit',
        name: 'shoes.edit',
        component: ShoeEdit,
        props: true
    },
]

export default createRouter({
    history: createWebHistory(),
    routes
})
