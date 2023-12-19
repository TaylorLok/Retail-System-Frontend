<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Add Product</h4>
            </div>
            <div class="card-body">

               
                <ul v-if="Object.keys(this.errorList).length > 0" class="alert alert-warning">
                    <li class="mb-0 ms-3" v-for="(error, index) in errorList" :key="index">
                        {{ error[0] }}
                    </li>
                </ul>
                
                <div class="mb-3">
                    <label for="name" class="form-label">Product Name</label>
                    <input type="text" v-model="model.product.name" class="form-control" placeholder="Enter Product Name">
                </div>
                <div class="mb-3">
                    <label for="price" class="form-label">Price</label>
                    <input type="number" v-model="model.product.price" class="form-control" placeholder="Enter Price">
                </div>
                <div class="mb-3">
                    <label for="stock" class="form-label">Stock</label>
                    <input type="number" v-model="model.product.stock" class="form-control" placeholder="Enter Stock">
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Description</label>
                    <textarea v-model="model.product.description" class="form-control" placeholder="Enter Description"></textarea>
                </div>
                <button type="submit" @click="saveProduct" class="btn btn-primary" style="margin-right: 10px;">Save</button>

                <RouterLink to="/products" class="btn btn-secondary">Back</RouterLink>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'productCreate',
        data(){
            return{
                errorList:[],
                model:{
                    product:{
                        name:'',
                        price:'',
                        stock:'',
                        description:''
                    }
                }
            }
        },
        methods:{
            saveProduct(){
                
                var mythis = this;
                axios.post('http://localhost:8000/api/create/product', this.model.product)
                .then(response => {

                    console.log(response.data)
                    alert(response.data.message);

                    this.model.product = {
                        name:'',
                        price:'',
                        stock:'',
                        description:''
                    }

                    this.errorList = '';
                })
                .catch(function (error) {

                    console.log(error.response.status);

                    if (error.response) 
                    {
                        if(error.response.status == 422){
                            mythis.errorList = error.response.data.errors;
                        }
                        // console.log(error.response.data);
                        // console.log(error.response.status);
                        // console.log(error.response.headers);
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