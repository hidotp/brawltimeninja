<template>
  <div class="h-8">
    <b-button
      v-if="!loading"
      secondary
      @click="trigger"
    >Share</b-button>
    <div v-if="loading">
      <span class="italic text-sm">Generating your Sharepic...</span>
    </div>
    <lazy-sharepic-content
      v-if="loading"
      :debug="debug"
      @done="done"
    >
      <slot></slot>
    </lazy-sharepic-content>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    debug: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    trigger() {
      this.loading = true
    },
    done() {
      this.loading = false
      this.$emit('done')
    },
  },
})
</script>
