<template>
      <div class="container mt-5">
            <div class="card">
                  <div class="card-header">
                        <h4>Add Student</h4>
                  </div>
                  <div class="card-body text-center" v-if="loader">
                        <span class="loader"></span>
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
                              <button type="button" @click="addStudent" class="btn btn-success">Save</button>
                        </div>
                  </div>
            </div>
      </div>
</template>

<script>
import axios from 'axios';

import Swal from 'sweetalert2';



import { useRouter } from 'vue-router';


export default {
      name: 'studentCreate',

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
            }
      },

      mounted() {
            this.setLoader();
      },

      methods: {
            setLoader() {
                  setTimeout(() => {
                        this.loader = false
                  }, 500);
            },

            addStudent() {

                  var $this = this;
                  axios.post('http://127.0.0.1:8000/api/add/student', $this.model.student)
                        .then(res => {

                              $this.errors = {};

                              $this.model.student.name = '';
                              $this.model.student.email = '';
                              $this.model.student.course = '';
                              $this.model.student.phone = '';

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
            }
      }
}
</script>

<style scoped>
.loader {
      width: 48px;
      height: 48px;
      border: 5px solid #333;
      border-bottom-color: transparent;
      border-radius: 50%;
      display: inline-block;
      box-sizing: border-box;
      animation: rotation 1s linear infinite;
}

@keyframes rotation {
      0% {
            transform: rotate(0deg);
      }

      100% {
            transform: rotate(360deg);
      }
}
</style>