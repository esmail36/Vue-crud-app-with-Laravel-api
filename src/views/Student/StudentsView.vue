<template>
      <div class="card py-4 bg-dark text-white">
            <div class="car-header d-flex px-4 align-items-center justify-content-between">
                  <h4>
                        Students
                  </h4>

                  <router-link to="/student/create" class="btn btn-primary float-end">Add Student</router-link>
            </div>

            <div class="card-body">
                  <table class="table table-dark table-striped table-hover table-responsive-md">
                        <thead>
                              <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Course</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Created at</th>
                                    <th scope="col">Actions</th>
                              </tr>
                        </thead>

                        <tbody v-if="emptyRecord">
                              <td colspan="7" class="text-center">
                                    <img class="img-responsive" :src="require('@/assets/images/empty-data.png')"
                                          alt="empty-data">
                              </td>
                        </tbody>

                        <tbody v-if="!emptyRecord && students.length > 0">
                              <tr v-for="(student, index) in students" :key="index">
                                    <th>{{ student.id }}</th>
                                    <td>{{ student.name }}</td>
                                    <td>{{ student.course }}</td>
                                    <td>{{ student.email }}</td>
                                    <td>{{ student.phone }}</td>
                                    <td>{{ format(new Date(student.created_at), 'Y-MM-dd') }}</td>
                                    <td>
                                          <div class="btns">
                                                <router-link class="btn btn-success btn-sm"
                                                      :to="{ path: `/student/${student.slug}/edit` }">Edit</router-link>
                                                <button class="btn btn-danger btn-sm mx-2"
                                                      @click="deleteStudent(student.slug)">Delete</button>
                                          </div>
                                    </td>
                              </tr>
                        </tbody>

                        <tbody v-else-if="!emptyRecord && students.length == 0">
                              <td colspan="7" class="text-center">
                                    <span class="loader"></span>
                              </td>
                        </tbody>

                  </table>
            </div>
      </div>
</template>

<script>

import axios from 'axios';

import Swal from 'sweetalert2';

import { format } from 'date-fns';

export default {
      name: 'studentsView',
      data() {
            return {
                  students: [],
                  loader: true,
                  format,
                  emptyRecord: false,
                  emptyMsg: '',
            }
      },

      mounted() {
            this.getStudents();
            this.setLoader();
      },

      methods: {

            getStudents() {
                  axios.get('http://127.0.0.1:8000/api/students')
                        .then(res => {
                              if (res.data == 204) {
                                    this.emptyRecord = true
                              } else {

                                    this.students = res.data.students;
                              }

                        })
                        .catch(function (error) {

                        })
            },

            setLoader() {
                  setTimeout(() => {
                        this.loader = false
                  }, 1500)
            },

            deleteStudent(studentSlug) {
                  Swal.fire({
                        title: 'Are you sure?',
                        text: "You won't be able to revert this!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, delete it!'
                  }).then((result) => {
                        if (result.isConfirmed) {

                              axios.delete(`http://127.0.0.1:8000/api/student/${studentSlug}/delete`)
                              
                              .then(res => {
                                    
                                    this.emptyMsg = res.data.message
                                    this.getStudents();
                              })
                              
                              .catch(function(error) {

                              })

                              Swal.fire(
                                    'Deleted!',
                                    this.emptyMsg,
                                    'success'
                              )
                        }
                  })
            },

      }
}
</script>

<style scoped>
.loader {
      width: 48px;
      height: 48px;
      border: 5px solid #FFF;
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

@media (max-width: 767px) {
      img {
            height: 180px;
            object-fit: cover;
      }

}

.btns {
      text-align: center;
}
</style>    