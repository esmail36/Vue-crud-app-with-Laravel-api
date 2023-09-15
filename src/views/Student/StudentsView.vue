<template>
      <div class="card py-4">
            <div class="car-header d-flex px-4 align-items-center justify-content-between">
                  <h4>
                        Students
                  </h4>

                  <router-link to="/student/create" class="btn btn-primary float-end">Add Student</router-link>
            </div>

            <div class="card-body">
                  <table class="table table-dark table-striped table-hover">
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
                        <tbody v-if="this.students.length > 0">
                              <tr v-for="(student, index) in students" :key="index">
                                    <th>{{ student.id }}</th>
                                    <td>{{ student.name }}</td>
                                    <td>{{ student.course }}</td>
                                    <td>{{ student.email }}</td>
                                    <td>{{ student.phone }}</td>
                                    <td>{{ student.created_at }}</td>
                                    <td>
                                          <div class="btns">
                                                <router-link class="btn btn-success btn-sm"
                                                      :to="`/student/${student.id}/edit`">Edit</router-link>
                                                <button class="btn btn-danger btn-sm mx-2">Delete</button>
                                          </div>
                                    </td>
                              </tr>
                        </tbody>

                        <tbody v-else>
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

export default {
      name: 'students',
      data() {
            return {
                  students: [],
                  loader: true,
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
                              this.students = res.data.students;
                              // console.log(res.data.students);
                        })
                        .catch(function (error) {

                        })
            },

            setLoader() {
                  setTimeout(() => {
                        this.loader = false
                  }, 1500)
            }

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
}</style>    