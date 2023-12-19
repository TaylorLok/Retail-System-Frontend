<template>
    <div class="container mt-5">
      <div class="card">
        <div class="card-header">
            <h4>Products
                <RouterLink class="btn btn-primary float-end" to="/products/create">Add Product</RouterLink>
            </h4>
        </div>
        <div class="card-body">
            <table class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>SKU</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <!-- <th>Desc</th> -->
                        <th>Created At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody v-if="this.products.length > 0">
                    <tr v-for="product in products" :key="product.id">
                        <td>{{ product.id }}</td>
                        <td>{{ product.sku }}</td>
                        <td>{{ product.name }}</td>
                        <td>{{ product.price }}</td>
                        <td>{{ product.stock }}</td>
                        <!-- <td>{{ product.description }}</td> -->
                        <td>{{ product.created_at }}</td>
                        <td>
                            <RouterLink :to="{ path: '/product/'+product.id+'/edit'}" class="btn btn-success" style="margin-right: 5px;">
                                Edit 
                            </RouterLink>
                            <button type="button" @click="deleteProduct(product.id)" class="btn btn-danger">
                                Delete
                            </button>
                        </td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td colspan="7" class="text-center">Loading...</td>
                    </tr>
                </tbody>
            </table> 
        </div>
      </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
       name: 'Products',
        data() {
           return {
               products: []
           }
        },
       mounted(){
         this.getProducts();
       },
       methods:{
            getProducts(){
                axios.get('http://localhost:8000/api/products')
                .then(response => {
                    this.products = response.data

                    //console.log(this.products)
                })
            },

            deleteProduct(productId){
               
                if(confirm("Are you sure want to delete this product?")){
                    console.log(productId)
                    axios.delete(`http://localhost:8000/api/delete/product/${productId}`)
                    .then(response => {
                        console.log(response.data)
                        alert(response.data.message)
                        this.getProducts()
                    })
                    .catch(function (error) {
                        console.log(error.response)
                        if (error.response) 
                        {
                            if(error.response.status == 404){
                                alert(error.response.data.message)
                            }
                        }
                    })
                }
            }
       }
    }
</script>