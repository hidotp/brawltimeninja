<template>
  <card
    v-if="article != undefined"
    :title="modeName + ' Description'"
    :loading="$fetchState.pending"
    tag="article"
    itemscope
    itemtype="http://schema.org/AnalysisNewsArticle"
    light
    xxl
  >
    <template v-slot:content>
      <p
        class="prose prose-sm sm:prose lg:prose-lg"
      >{{ article.description }}</p>

      <div
        v-show="expand"
        class="mt-10 prose prose-sm sm:prose lg:prose-lg xl:prose-xl"
      >
        <h1>
          {{ modeName }} Guide
        </h1>
        <p v-if="article.author != undefined">
          This guide was written by {{ article.author }}
          <template v-if="article.attribution != undefined">
            <wrapped-component
              :wrap="article.attributionLink != undefined"
            >
              <a
                slot="wrapper"
                rel="nofollow"
                :href="article.attributionLink"
              ></a>
              <span>({{ article.attribution }})</span>
            </wrapped-component>
          </template>.
        </p>
      </div>

      <nuxt-content
        v-show="expand"
        :document="article"
        itemprop="articleBody"
        class="mt-10 prose prose-sm sm:prose lg:prose-lg xl:prose-xl"
      ></nuxt-content>
    </template>

    <b-button
      slot="actions"
      light
      @click="expand = !expand"
    >{{ !expand ? 'Read more' : 'Read less' }}</b-button>
  </card>
</template>

<script lang="ts">
import { IContentDocument } from '@nuxt/content/types/content'
import Vue from 'vue'
import { formatMode } from '~/lib/util'

export default Vue.extend({
  props: {
    mode: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      article: undefined as IContentDocument|undefined,
      expand: false,
    }
  },
  fetchDelay: 0,
  async fetch() {
    // TODO fetch description from API / game files
    // TODO add a TOC
    this.article = await this.$content(`modes/${this.mode}`).fetch().catch(() => undefined) as IContentDocument|undefined
  },
  computed: {
    modeName(): string {
      return formatMode(this.mode)
    },
  },
})
</script>
