<template>
   <div class="card" style="width: 18rem;"  v-for="product of products" :key="product.id">
  <img class="card-img-top" :src="productsImages[(product.id -1)]"  alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">{{ product.name }}</h5>
    <p class="card-text">{{ product.description }}</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
<img class="card-img-top" :src="getImage" alt="Card image cap">
</template>
<script>
import axios from 'axios';
export default {
    data(){
      return{
        products: [],
        productsImages: [],
      }
    },
    async mounted() {
      await axios.get('/api/product/all')
            .then((response) => {
              this.products = Object.values(response.data)
        
              Object.values(response.data).forEach(async (product) =>
           await axios.get('/api/product/'+product.imageId+'/image').then(response => this.productsImages.push(response.data))
            )})
            
    },
}
</script>
<style>
    
</style>