<template>
      <div class="card">
            <div class="car-header d-flex">
                  <h4>
                        Students
                  </h4>

                  <router-link to="/student/create" class="btn btn-primary btn-sm float-end">Add Student</router-link>
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
                        <tbody>
                              <tr v-for="(student, index) in students" :key="index">
                                    <th>{{ student.id }}</th>
                                    <td>{{ student.name }}</td>
                                    <td>{{ student.course }}</td>
                                    <td>{{ student.email }}</td>
                                    <td>{{ student.phone }}</td>
                                    <td>{{ student.created_at }}</td>
                                    <td>
                                          <div class="btns">
                                                <router-link class="btn btn-success btn-sm" :to="`/student/${student.id}/edit`">Edit</router-link>
                                          </div>
                                    </td>
                              </tr>
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
                  }
            },

            mounted() {
                  this.getStudents();
            },

            methods: {

                  getStudents() {
                        axios.get('http://127.0.0.1:8000/api/students')
                        .then(res => {
                              this.students = res.data.students;
                              // console.log(res.data.students);
                        })
                        .catch(function(error) {

                        })
                  }

            }
      }
</script>

<style lang="scss" scoped></style>    