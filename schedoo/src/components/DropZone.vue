<template>
  <div
    @dragenter.prevent="toggleActive"
    @dragleave.prevent="toggleActive"
    @dragover.prevent
    @drop.prevent="toggleActive"
    :class="{ 'active-dropzone': active }"
    class="dropzone"
  >
    <span>Drag or drop file</span>
    <span>OR</span>
    <label for="myFile">Select File</label>
    <input id="myFile" type="file" class="myFile"/>
  </div>
</template>

<script>
import { ref } from "vue";
export default {

  name: "DropZone",
  props: ['myFile'],
  setup() {
    const active = ref(false);

    const toggleActive = () => {
      active.value = !active.value;
    };

    return { active, toggleActive };
  },
  methods: {
    selectedFile(e) {
      this.$emit('change', e);
    },
  }
};
</script>

<style scoped lang="scss">
.dropzone {
  width: 300px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 12px;
  border: 2px solid #303030;
  background-color: whitesmoke;
  transition: 0.3s ease all;

  label {
    padding: 6px 10px;
    border-radius: 10px;
    color: white;
    background-color: #303030;
    transition: 0.3s ease all;
  }

  label:hover{
    background-color: rgba(48, 48, 48, 0.7);
  }

  input {
    display: none;
  }
}

.active-dropzone {
  color: whitesmoke;
  border-color: whitesmoke;
  background-color: #989898;

  label {
    color: #303030;
    background-color: whitesmoke;
  }
}
</style>
