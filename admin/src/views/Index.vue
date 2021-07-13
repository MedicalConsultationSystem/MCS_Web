<template>
  <div class="index">

  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      tagsList: [],
      collapse: false
    };
  },
};
</script>
<style scoped>
.index {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.content {
  width: auto;
  height: 100%;
  padding: 10px;
  overflow-y: scroll;
  box-sizing: border-box;
}
.rightContainer.content-collapse {
  left: 48px;
}
.rightContainer {
  position: absolute;
  left: 180px;
  right: 0;
  top: 72px;
  height: 100%;
  overflow-y: scroll;
  padding-bottom: 30px;
  transition: left 0.3s ease-in-out;
}
</style>
