<template>
    <div class="overflow-hidden overflow-x-auto p-6 bg-white dark:bg-gray-800 border-gray-200">
        <div class="flex justify-end mb-4">
            <router-link to="/create" class="px-4 py-2 rounded-md text-white bg-gray-800 hover:bg-indigo-700">Create</router-link>
        </div>
        <div class="min-w-full align-middle">
            <table class="min-w-full divide-y divide-gray-200 border">
                <thead>
                    <tr>
                        <th class="px-4 py-3 bg-gray-50">
                            <span class="text-xs font-medium tracking-wider leading-4 text-left text-gray-500 uppercase">Name</span>
                        </th>
                        <th class="px-4 py-3 bg-gray-50">
                            <span class="text-xs font-medium tracking-wider leading-4 text-left text-gray-500 uppercase">Email</span>
                        </th>
                        <th class="px-4 py-3 bg-gray-50">
                            <span class="text-xs font-medium tracking-wider leading-4 text-left text-gray-500 uppercase">Address</span>
                        </th>
                        <th class="px-4 py-3 bg-gray-50">
                            <span class="text-xs font-medium tracking-wider leading-4 text-left text-gray-500 uppercase">Website</span>
                        </th>
                        <th class="px-4 py-3 bg-gray-50">
                            <span class="text-xs font-medium tracking-wider leading-4 text-left text-gray-500 uppercase">Actions</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(company, key) in companies" :key="company.id">
                        <td>{{ company.name }}</td>
                        <td>{{ company.email }}</td>
                        <td>{{ company.address }}</td>
                        <td>{{ company.website }}</td>
                        <td>
                            <router-link :to="{name: 'CompanyEdit', params: {id: company.id}}" class="px-4 py-2 rounded-md text-white bg-gray-800 hover:bg-indigo-700">Edit</router-link>
                            <button
                                v-on:click="deleteCompany(company.id)"
                                type="button"
                                class="ms-1 bg-red-600 hover:bg-red-500 rounded-md text-white px-3 py-1 font-bold ease-in-out duration-150"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import toastr from 'toastr';

export default {
    name: "Companies",
    data() {
        return {
            companies: [],
        };
    },
    mounted() {
        this.getCompanies()
    },
    methods: {
        async getCompanies() {
            await axios
                .get('/api/companies')
                .then((res) => {
                    this.companies = res.data.data
                })
                .catch((res) => {
                    toastr.error(res.message)
                })
                .finally(() => {})
        },

        async deleteCompany(id) {
            if(confirm('Are you sure want to delete?')) {
                await axios
                    .delete(`/api/companies/${id}`)
                    .then(() => {
                        this.getCompanies()
                        toastr.success('Deleted Successfully')
                    })
                    .catch((res) => {
                        toastr.error(res.message)
                    })
                    .finally(() => {})
            }
        }
    }
};
</script>