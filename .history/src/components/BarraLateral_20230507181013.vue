<script>
import Button from "primevue/button";

export default {
  name: "BarraLateral",
  components: {
    Button,
  },
  props: {},
  methods: {
    logout: function () {
      this.$router.push("/");
    },
  },
};
</script>

<template>
  <div class="barraLateral"></div>
</template>

<style>
.barraLateral {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10vw;

  background: linear-gradient(180deg, #da0b5e 0%, #000d5a 100%);
}
</style>
