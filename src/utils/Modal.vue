<template>
  <transition name="modal">
    <div class="modal modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div v-if="!!$slots['header']" class="modal-header">
            <slot name="header"></slot>
          </div>
          <button class="btn close-icon" @click="$emit('close')"></button>

          <div class="modal-body">
            <slot name="body">default body</slot>
          </div>

          <div v-if="!!$slots['footer']" class="modal-footer">
            <slot name="footer">
              default footer
              <button class="modal-default-button" @click="$emit('close')">OK</button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  // display: table-cell;
  // vertical-align: middle;
}

.modal-container {
  margin: 0px auto;
  padding: 5px 10px;
  background-color: #fff;
  position: relative;
  border-radius: 0.3rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  max-height: 500px;
  overflow-y: auto; 
  @media(max-width: 400px) {
    width: 300px;
  }
  @media (min-width: 576px) {
    max-width: 500px;
    margin: 1.75rem auto;
  } 
}

.modal-header {
    // padding: 0.5rem 0rem;
    border-bottom: none;
}
.modal-header h3 {
  margin-top: 0;
}

.modal-body {
  margin: 0px;
  padding: 0.5rem 0rem;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.close-icon {
  position: absolute;
  right: 2%;
  top: 3%;
  width: 32px;
  height: 32px;
  opacity: 0.3;
  background: transparent;
}
.close-icon:hover {
  opacity: 1;
}
.close-icon:before, 
.close-icon:after {
  position: absolute;
  left: 12px;
  top: 10px;
  content: ' ';
  height: 20px;
  width: 2px;
  background-color: #333;
}
.close-icon:before {
  transform: rotate(45deg);
}
.close-icon:after {
  transform: rotate(-45deg);
}
</style>
