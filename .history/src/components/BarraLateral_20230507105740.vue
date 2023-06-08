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
  <div
    class="barraLateral align-items-center justify-content-evenly flex-column"
  ></div>
</template>

<style>
.barraLateral {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50vw;
  min-height: 100vh;
  height: auto;
  background: linear-gradient(180deg, #001796 0%, #000d5a 100%);
}

#logo {
  width: 40%;
  min-width: 200px;
}
</style>
