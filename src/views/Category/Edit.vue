<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Edit Category</h4>
            </div>
            <div class="card-body">

               
                <ul v-if="Object.keys(this.errorList).length > 0" class="alert alert-warning">
                    <li class="mb-0 ms-3" v-for="(error, index) in errorList" :key="index">
                        {{ error[0] }}
                    </li>
                </ul>
                
                <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" v-model="model.category.name" class="form-control" placeholder="Enter Category Name">
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Description</label>
                    <textarea v-model="model.category.description" class="form-control" placeholder="Enter Description"></textarea>
                </div>
                <button type="submit" @click="updateCategory" class="btn btn-primary" style="margin-right: 10px;">Update</button>

                <RouterLink to="/category" class="btn btn-secondary">Back</RouterLink>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'categoryEdit',
        data(){
            return{
                categoryId:'',
                errorList:[],
                model:{
                    category:{
                        name:'',
                        description:''
                    }
                }
            }
        },
        mounted(){
            //console.log(this.$route.params.id);
            this.categoryId = this.$route.params.id;
            this.getSingleCategory(this.$route.params.id);
        },
        methods:{

            getSingleCategory(categoryId){
                axios.get(`http://localhost:8000/api/category/${categoryId}`)
                .then(response => {
                    console.log(response.data);
                   this.model.category = response.data;
                })
                .catch(function (error) {

                    console.log(error.response);

                    if (error.response) 
                    {
                        if(error.response.status == 404){
                            alert(error.response.data.message);
                        }
                    }
                });
            },

            updateCategory(){
                
                var mythis = this;
                axios.put(`http://localhost:8000/api/category/${this.categoryId}/edit`, this.model.category)
                .then(response => {

                    console.log(response.data)
                    alert(response.data.message);

                    this.errorList = '';
                    
                })
                .catch(function (error) {

                    console.log(error.response.status);

                    if (error.response) 
                    {
                        if(error.response.status == 422){
                            mythis.errorList = error.response.data.errors;
                        }

                        if(error.response.status == 404){
                            alert(error.response.data.message);
                        }
                    } 
                    else if (error.request) 
                    {
                        console.log(error.request);
                    } 
                    else 
                    {
                        console.log('Error', error.message);
                    }
                    console.log(error.config);
                });
                
            }
        }
    }

</script>