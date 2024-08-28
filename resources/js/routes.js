import CompaniesList from './Pages/Companies/index.vue';
import CompanyCreate from './Pages/Companies/Create.vue';
import CompanyEdit from './Pages/Companies/Edit.vue'

export const routes = [
    {
        path: "/",
        name: "CompaniesList",
        component: CompaniesList,
    },
    {
        path: "/create",
        name: "CompanyCreate",
        component: CompanyCreate,
    },
    {
        path: "/edit/:id",
        name: "CompanyEdit",
        component: CompanyEdit,
    }
];