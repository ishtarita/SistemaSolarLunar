<template>
  <div class="Simulador">
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";

// import { mapState } from "vuex";
export default {
  name: "Simulador",
  methods: {
    ...mapActions(["render", "rerender", "update"]),
    ...mapMutations(["resize", "createScene"]),
  },
  mounted() {
    this.render({ el: this.$el }).then(() => {
      this.update();
      window.addEventListener("resize", () => {
        this.resize({
          width: this.$el.offsetWidth,
          height: this.$el.offsetHeight,
        });
      });
    });
  },
};
</script>

