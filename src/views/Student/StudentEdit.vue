<template>
      <div class="container mt-5">
            <div class="card">
                  <div class="card-header">
                        <h4>Edit Student</h4>
                  </div>
                  <div class="card-body text-center" v-if="loader || model.student.length == 0">
                        <loader-component color="loaderColor"></loader-component>
                  </div>
                  <div class="card-body" v-else>

                        <div class="mb-3">
                              <label for="name">Name</label>
                              <input type="text" v-model="model.student.name" class="form-control"
                                    :class="{ 'is-invalid': errors.name }" id="name">
                              <span v-if="errors.name" class="invalid-feedback">{{ errors.name[0] }}</span>
                        </div>

                        <div class="mb-3">
                              <label for="email">Email</label>
                              <input type="text" v-model="model.student.email" class="form-control"
                                    :class="{ 'is-invalid': errors.email }" id="email">
                              <span v-if="errors.email" class="invalid-feedback">{{ errors.email[0] }}</span>
                        </div>

                        <div class="mb-3">
                              <label for="course">Course</label>
                              <input type="text" v-model="model.student.course" class="form-control"
                                    :class="{ 'is-invalid': errors.course }" id="course">
                              <span v-if="errors.course" class="invalid-feedback">{{ errors.course[0] }}</span>
                        </div>

                        <div class="mb-3">
                              <label for="phone">Phone</label>
                              <input type="text" v-model="model.student.phone" class="form-control"
                                    :class="{ 'is-invalid': errors.phone }" id="phone">
                              <span v-if="errors.phone" class="invalid-feedback">{{ errors.phone[0] }}</span>
                        </div>

                        <div class="mb-3">
                              <button type="button" @click="updateStudent" class="btn btn-primary">Update</button>
                        </div>
                  </div>
            </div>
      </div>
</template>

<script>
import axios from 'axios';

import Swal from 'sweetalert2';

import LoaderComponent from '@/components/LoaderComponent.vue';

export default {
      name: 'studentEdit',

      data() {
            return {
                  model: {
                        student: {
                              name: '',
                              email: '',
                              course: '',
                              phone: ''
                        }
                  },

                  loader: true,
                  errors: {},
                  slug: '',
                  loaderColor: '#333'
            }
      },

      components: {
            LoaderComponent,
      },

      mounted() {
            this.setLoader();

            this.slug = this.$route.params.slug

            this.getStudentData(this.$route.params.slug);
      },

      methods: {
            setLoader() {
                  setTimeout(() => {
                        this.loader = false
                  }, 500);
            },

            getStudentData(studentSlug) {
                  axios.get(`http://127.0.0.1:8000/api/student/${studentSlug}/edit`)
                  .then(res => {
                        
                        this.model.student = res.data[0].student;

                  })
                  .catch(function(error) {
                        if(error.response) {
                              if(error.response.status == 404) {
                                    alert(error.response.data.message);
                              }
                        } 
                  });
            },

            updateStudent() {

                  var $this = this;
                  axios.put(`http://127.0.0.1:8000/api/student/${this.slug}/edit`, $this.model.student)
                        .then(res => {

                              console.log(res.data);

                              $this.errors = {};

                              const Toast = Swal.mixin({
                                    toast: true,
                                    position: 'top-end',
                                    showConfirmButton: false,
                                    timer: 3000,
                                    timerProgressBar: true,
                                    didOpen: (toast) => {
                                          toast.addEventListener('mouseenter', Swal.stopTimer)
                                          toast.addEventListener('mouseleave', Swal.resumeTimer)
                                    }
                              })

                              Toast.fire({
                                    icon: 'success',
                                    title: res.data.message
                              })


                              this.$router.push({path: '/students'})
                        })
                        .catch(function (error) {
                              if (error.response) {

                                    if (error.response.status == 422) {
                                          $this.errors = error.response.data.errors;
                                    }
                              }
                        });
            },

            
      }
}
</script>

<style scoped>

</style>