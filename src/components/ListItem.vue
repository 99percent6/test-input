<template>
  <div id="list-item" class="container">
    <div class="logo" :class="{ 'activeLogo': isActiveInput }">
      <img src="../assets/hugh.png">
    </div>
    <div class="content">
      <div class="title" :class="{ 'activeTitle': isActiveInput }">
        Hugh is
      </div>
      <div class="input">
        <custom-input :index="index" @onFocus="handleInputEvent(true)" @onBlur="handleInputEvent(false)"/>
        <div class="hours">hours old</div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomInput from './CustomInput'

export default {
  name: 'ListItem',
  props: {
    index: {
      type: Number,
      required: true
    }
  },
  components: {
    CustomInput
  },
  data () {
    return {
      isActiveInput: false
    }
  },
  methods: {
    handleInputEvent (value) {
      this.isActiveInput = value
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../css/variables/colors';
@import '../css/helpers/functions/color';
$violet: color(violet);

.container {
  display: flex;
  justify-content: center;
  margin-bottom: 32px;

  .logo {
    margin-right: 16px;
    border-radius: 50%;
    &.activeLogo {
      border: 2px solid $violet;
    }
  }
  img {
    width: 55px;
    height: 55px;
  }
  .title {
    text-align: left;
    text-transform: uppercase;
    font-size: 13px;
    font-weight: bold;
    font-style: normal;
    font-stretch: condensed;
    line-height: 1.31;
    letter-spacing: 0.8px;
    margin-bottom: 8px;
    &.activeTitle {
      color: $violet;
    }
  }
  .input {
    display: flex;
  }
  .hours {
    margin-left: 8px;
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.21;
    letter-spacing: normal;
  }
}
</style>
