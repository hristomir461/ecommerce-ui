<template>
    <div class="row">
        <div class="col-3"></div>
        <div class="col-md-6 px-5 px-md-0">
            <h1>Create Category</h1>
            <form>
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" class="form-control" v-model="name">
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea type="text" class="form-control" v-model="description"></textarea>
                </div>
                <div class="form-group">
                    <label>ImageUrl</label>
                    <input type="url" class="form-control" v-model="imageUrl">
                </div>
                <a class="btn btn-primary" @click="create">Submit</a>
            </form>
        </div>
        <div class="col-3"></div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            name: null,
            description: null,
            imageUrl: null,
        }
    },
    methods: {
        async create() {
            await axios({
                method: 'post',
                url: "/api/category/create",
                data: JSON.stringify({
                    name: this.name,
            description: this.description,
            imageUrl: this.imageUrl,
                }), 
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        }
    },
}
</script>
<style scoped></style>
