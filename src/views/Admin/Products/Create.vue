<template>
    <div class="row">
        <div class="col-3"></div>
        <div class="col-md-6 px-5 px-md-0">
            <h1>Create Product</h1>
            <div class="form-group">
                <label>Name</label>
                <input type="text" class="form-control" v-model="name">
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea type="text" class="form-control" v-model="description"></textarea>
            </div>
            <div class="form-group">
                <label>Price</label>
                <input type="number" class="form-control" v-model="price">
            </div>
            <div class="form-group">
                <label>Category</label>
                <select class="form-control" v-model="categoryId">
                    <option v-for="category of categories" :key="category.id" :value="category.id">{{ category.name }}
                    </option>
                </select>
                <div class="flex justify-center mt-2">
                    <img v-if="!imageSrc" ref="pic" src="" />
                </div>
                <br />
                <div v-show="imageSrc">
                    <img ref="img" :src="imageSrc" style="width: 271px; height: 271px" />
                </div>
                <div class="flex justify-center mt-2">
                    <q-btn type="button" rounded color="primary" @click="imageInput.click()">
                        Качи снимка
                    </q-btn>
                    <input type="file" ref="imageInput" accept=".jpg,.jpeg,.png" @change="fileChanged"
                        :style="{ display: 'none' }" />
                </div>
                <div v-if="selectedFile" class="my-2 align-baseline text-center">
                    <span>Снимка: </span>
                    <span>{{ selectedFile.name }}</span>
                </div>
                <div class="row q-mb-lg"></div>
                <div class="row q-mb-lg">
                    <q-btn size="lg" class="full-width" rounded color="primary" label="Запази промените"
                        @click="updateUser()" />
                </div>
            </div>
            <a class="btn btn-primary" @click="create">Submit</a>
        </div>
        <div class="col-3"></div>
    </div>
</template>
<style>
@import 'cropperjs/dist/cropper.css';
</style>
<script>
import axios from 'axios';
import Cropper from 'cropperjs';
import { ref, watchEffect, onMounted, watch } from 'vue';
export default {
    setup() {
        let imageInput = ref(null); // template ref for file input
        let selectedFile = ref(null);
        let imageSrc = ref(null);
        let img = ref(null);
        let fileReader = new FileReader();
        let cropper = null;
        fileReader.onload = (event) => {
            imageSrc.value = event.target.result;
        };
        const handleImageCropped = () => {
            if (cropper.getCroppedCanvas() != null)
                return cropper.getCroppedCanvas().toDataURL();
        };
        const fileChanged = (e) => {
            const files = e.target.files || e.dataTransfer.files;
            if (files.length) {
                selectedFile.value = files[0];
            }
        };
        onMounted(() => {
            cropper = new Cropper(img.value, {
                viewMode: 1,
                aspectRatio: 1,
                minContainerWidth: 400,
                minContainerHeight: 400,
                minCropBoxWidth: 171,
                minCropBoxHeight: 171,
                movable: true,
                background: false,
            });
        });
        watchEffect(() => {
            if (selectedFile.value) {
                fileReader.readAsDataURL(selectedFile.value);
            } else {
                imageSrc.value = null;
            }
        });
        watch(
            imageSrc,
            () => {
                if (imageSrc.value) {
                    cropper.replace(imageSrc.value);
                }
            },
            {
                flush: 'post', // watch runs after component updates
            }
        );
        return {
            imageInput,
            selectedFile,
            fileChanged,
            imageSrc,
            img,
            handleImageCropped,
        };
    },
    data() {
        return {
            name: null,
            description: null,
            price: null,
            categoryId: null,
        }
    },
    props: ['categories'],
    methods: {
        async create() {
            axios({
                method: 'post',
                url: "/api/product/create",
                data: JSON.stringify({
                    name: this.name,
                    description: this.description,
                    price: this.price,
                    categoryId: this.categoryId,
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(response => {
                let productId = response.data.id;
                var formData = new FormData();
                formData.append('image', new Blob([this.handleImageCropped()], {
                    type: "image/png"
                }));
                axios({
                    method: 'post',
                    url: '/api/product/' + productId + '/upload/image',
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                })
                
            }
            ).then(() =>this.$router.push('/admin/product/all'));
        }
    },
}
</script>
