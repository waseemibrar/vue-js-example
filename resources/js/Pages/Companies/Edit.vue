<template>
    <div>
        <div class="flex justify-between mb-4">
            <h3 class="font-semibold text-xl text-gray-800 dark:text-gray-100 leading-tight">Edit Company</h3>
            <router-link to="/" class="inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest text-white uppercasse bg-gray-800 rounded-md border border-transparent ring-gray-300 transition duration-150 ease-in-out hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring disabled:opacity-25">Back</router-link>
        </div>
        <form class="space-y-6" @submit.prevent="handleSubmit">
            <div>
                <label class="block font-medium text-sm text-gray-700">Name</label>
                <input class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full" type="text" v-model="company.name" placeholder="Name"/>
            </div>
            <div>
                <label class="block font-medium text-sm text-gray-700">Email</label>
                <input class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full" type="email" v-model="company.email" placeholder="name@example.com"/>
            </div>
            <div>
                <label class="block font-medium text-sm text-gray-700">Address</label>
                <input class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full" type="text" v-model="company.address" placeholder="Address"/>
            </div>
            <div>
                <label class="block font-medium text-sm text-gray-700">Website</label>
                <input class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full" type="url" v-model="company.website" placeholder="https://google.com"/>
            </div>
            <div>
                <button
                    type="submit"
                    class="inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest text-white uppercasse bg-gray-800 rounded-md border border-transparent ring-gray-300 transition duration-150 ease-in-out hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring disabled:opacity-25"
                >
                    Save
                </button>
            </div>
        </form>
    </div>
</template>
<script>
import axios from 'axios';
import toastr from 'toastr';

export default {
    name: "CompanyEdit",
    data() {
        return {
            company: {},
        };
    },
    mounted() {
        this.getCompany(this.$route.params.id)
    },
    methods: {
        async handleSubmit(e) {
            await axios
                .put(`/api/companies/${this.company.id}`, this.company)
                .then((res) => {
                    toastr.success('Updated Successfully')
                })
                .catch((res) => {
                    if(res.response.data.errors) {
                        let errors = res.response.data.errors
                        for (let key in errors) {
                            toastr.error(errors[key])
                        }
                    } else {
                        toastr.error(res.message)
                    }
                })
                .finally(() => {})
        },

        async getCompany(id) {
            await axios
                .get(`/api/companies/${id}`)
                .then((res) => {
                    this.company = res.data.data
                })
                .catch((res) => {
                    toastr.error(res.message)
                })
                .finally(() => {})
        },
    }
};
</script>