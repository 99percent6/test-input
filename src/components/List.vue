<template>
  <div id="list">
    <div v-for="num in 4" :key="num">
      <item :index="num"/>
    </div>
  </div>
</template>

<script>
import Item from './ListItem'

export default {
  name: 'List',
  components: {
    Item
  }
}
</script>