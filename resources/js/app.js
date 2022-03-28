require('./bootstrap');

require('alpinejs');
import swal from 'sweetalert';
import { createApp } from "vue";
import ShoeList from "./components/Shoe/List"
import router from "./router/index"


createApp({
    components: {
        ShoeList
    }
}).use(router).mount('#app')


// import { createApp } from "vue";
// import router from './router'
// import CompaniesIndex from './components/companies/CompaniesIndex'
//
// createApp({
//     components: {
//         CompaniesIndex
//     }
// }).use(router).mount('#app')
