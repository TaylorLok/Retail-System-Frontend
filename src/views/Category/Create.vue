<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Add Category</h4>
            </div>
            <div class="card-body">


                <ul v-if="Object.keys(this.errorList).length > 0" class="alert alert-warning">
                    <li class="mb-0 ms-3" v-for="(error, index) in errorList" :key="index">
                        {{ error[0] }}
                    </li>
                </ul>

                <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" v-model="model.category.name" class="form-control" placeholder="Enter the Category Name">
                </div>

                <div class="mb-3">
                    <label for="description" class="form-label">Description</label>
                    <textarea v-model="model.category.description" class="form-control"
                        placeholder="Enter Description"></textarea>
                </div>
                <button type="submit" @click="saveCategory" class="btn btn-primary"
                    style="margin-right: 10px;">Save</button>

                <RouterLink to="/category" class="btn btn-secondary">Back</RouterLink>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'categoryCreate',
    data() {
        return {
            errorList: [],
            model: {
                category: {
                    name: '',
                    description: ''
                }
            }
        }
    },
    methods: {
        saveCategory() {

            var mythis = this;
            axios.post('http://localhost:8000/api/create/category', this.model.category)
                .then(response => {

                    console.log(response.data)
                    alert(response.data.message);

                    this.model.category = {
                        name: '',
                        description: ''
                    }

                    this.errorList = '';
                })
                .catch(function (error) {

                    console.log(error.response.status);

                    if (error.response) {
                        if (error.response.status == 422) {
                            mythis.errorList = error.response.data.errors;
                        }
                        // console.log(error.response.data);
                        // console.log(error.response.status);
                        // console.log(error.response.headers);
                    }
                    else if (error.request) {
                        console.log(error.request);
                    }
                    else {
                        console.log('Error', error.message);
                    }
                    console.log(error.config);
                });

        }
    }
}

</script>