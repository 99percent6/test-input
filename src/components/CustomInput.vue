<template>
  <div id="custom-input">
    <div class="container-input" :class="{ 'activeDiv': isActiveInput }">
      <input :id="`input-${index}`" type="text" @input="onInput" @focus="onFocus" @blur="onBlur" v-model="value" v-number-check>
    </div>
  </div>
</template>

<script>
import numberCheck from '../directives/'

export default {
  name: 'CustomInput',
  props: {
    index: {
      type: Number,
      required: true
    }
  },
  directives: { numberCheck },
  data () {
    return {
      value: '',
      isActiveInput: false
    }
  },
  methods: {
    onInput (e) {
      let { value } = e.target
      let input = document.getElementById(`input-${this.index}`)
      input.style.minWidth = '50px'
      input.style.width = ((input.value.length + 1) * 7) + 'px'
      input.style.padding = '0 5px'
      this.formatValue(value)
    },
    onFocus () {
      this.isActiveInput = true
      this.$emit('onFocus')
    },
    onBlur () {
      this.isActiveInput = false
      this.$emit('onBlur')
    },
    formatValue (value) {
      value = value.replace(/\s+/g,'')
      if (value.length > 3) {
        let int = Math.floor(value.length / 3)
        let buffer = []
        for (let i = 1; i <= int; i++) {
          let tailLength = 3
          let tail = value.substring(value.length - tailLength)
          if (tail) {
            buffer.unshift(tail)
          }
          value = value.substring(0, value.length - tailLength)
        }
        if (value) {
          buffer.unshift(value)
        }
        this.value = buffer.join(' ')
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../css/variables/colors';
@import '../css/helpers/functions/color';
$violet: color(violet);
$gray: color(gray);

.container-input {
  padding: 5px 0;
  border-bottom: 1px solid $gray;
  width: auto;
  &.activeDiv {
    border-bottom: 1px solid $violet;
  }
}
input[type="text"] {
  font-size: 14px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.21;
  letter-spacing: normal;
  outline: 0;
  border: none;
  width: 50px;
}
</style>
