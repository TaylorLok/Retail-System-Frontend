<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h4>
          Categories
          <RouterLink class="btn btn-primary float-end" to="/category/create">Add Category</RouterLink>
        </h4>
      </div>
      <div class="card-body">
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody v-if="this.categories.length > 0">
            <tr v-for="category in categories" :key="category.id">
              <td>{{ category.id }}</td>
              <td>{{ category.name }}</td>
              <td>{{ category.description }}</td>
              <td>{{ formatDate(category.created_at) }}</td>
              <td>
                <RouterLink :to="{ path: '/category/' + category.id + '/edit' }" class="btn btn-success"
                  style="margin-right: 5px">
                  Edit
                </RouterLink>
                <button type="button" @click="deleteCategory(category.id)" class="btn btn-danger">
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
import axios from "axios";

export default {
  name: "Category",
  data() {
    return {
      categories: [],
    };
  },
  mounted() {
    this.getCategories();
  },
  methods: {
    getCategories() {
      axios.get("http://localhost:8000/api/categories").then((response) => {
        this.categories = response.data;
      });
    },

    formatDate(dateTime) {
      const date = new Date(dateTime);
      return `${date.toISOString().slice(0, 19).replace("T", " ")}`;
    },

    deleteCategory(categoryId) {
      if (confirm("Are you sure want to delete this category?")) {
        console.log(categoryId);
        axios
          .delete(`http://localhost:8000/api/delete/category/${categoryId}`)
          .then((response) => {
            console.log(response.data);
            alert(response.data.message);
            this.getCategories();
          })
          .catch(function (error) {
            console.log(error.response);
            if (error.response) {
              if (error.response.status == 404) {
                alert(error.response.data.message);
              }
            }
          });
      }
    },
  },
};
</script>
