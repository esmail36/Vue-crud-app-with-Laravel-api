<template>
      <span class="loader" :style="{borderColor: color}" style="border-bottom-color: transparent;"></span>
</template>

<script>
      export default {
            name: 'LoaderComponent',

            data() {
                  return {
                        color: '',
                  }
            }
      }
</script>

<style scoped>
.loader {
      width: 48px;
      height: 48px;
      border: 5px solid;
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