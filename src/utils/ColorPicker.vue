<template>
    <div class="input-group picker-input">
        <input :disabled="true" v-model="color.hex" placeholder="Color" class="w-full">
        <a href="#" :style="{backgroundColor: color.hex}" class="btn-open-color rounded-br rounded-tr" @click.prevent="showPicker = !showPicker">
            <font-awesome-icon class="text-white" icon="search"></font-awesome-icon>
        </a>
        <div class="picker-fade" v-show="showPicker" @click="closePicker"></div>
        <div class="picker-box" v-show="showPicker">
            <picker v-model="color" @change-color="onChange"></picker>
        </div>
    </div>
</template>

<script>
    import { Chrome } from 'vue-color'

    export default {
        data () {
            return {
                showPicker: false,
                color: {
                    hex: ''
                }
            }
        },
        created() {
            if(this.value != null && this.value != '') {
                this.color.hex = this.value; 
                this.$emit('input', this.color)
            }
        },
        props: {
            value: {
                required: true
            }
        },
        components: { 'picker': Chrome },
        watch: {
            value (value) {
                if (this.color !== value)
                    this.color = value
            },
            color () {
                let vm = this
                vm.$emit('input', vm.color)
            }
        },
        methods: {
            onChange (val) {
                this.color = val.hex
            },
            openPicker () {
                this.showPicker = true
            },
            closePicker () {
                this.showPicker = false
            }
        }
    }
</script>
<style lang="scss" scoped>
    .picker-input {
        position: relative;
        z-index: 98;
    }
    .picker-box {
        position: absolute;
        top: 34px;
        left: 1px;
        z-index: 99;
    }
    .picker-fade {
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 97;
        left: 0;
        top: 0;
    }

    .btn-open-color {
        position: absolute;
        height: 32px;
        width: 32px;
        background-color: #7c7c7c;
        right: 0;
        text-align: center;
        svg {
            width: 22px;
            height: 32px;
        }
    }
</style>