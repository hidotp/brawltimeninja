<template>
  <plotly
    :traces="graph.traces"
    :layout="graph.layout"
  ></plotly>
</template>

<script lang="ts">
import { differenceInWeeks, parseISO } from 'date-fns'
import Vue, { PropType } from 'vue'
import { TrophiesRow } from '~/model/Clicker'

export default Vue.extend({
  props: {
    brawler: {
      type: String,
    },
    playerTag: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      history: [] as TrophiesRow[],
    }
  },
  fetchDelay: 0,
  async fetch() {
    const data = await this.$clicker.query('player.brawler_history',
      'brawler',
      ['timestamp'],
      ['timestamp', 'brawler_trophies'],
      {
        ...this.$clicker.defaultSlices('brawler'),
        // TODO use ID
        ...(this.brawler != undefined ? {
          brawler_name: [this.brawler.toUpperCase()],
        } : {}),
        player_tag: [this.playerTag],
      },
      { cache: 60 })

    this.history = data.data.map(b => ({
      timestamp: b.timestamp,
      trophies: b.brawler_trophies,
    } as TrophiesRow))
  },
  computed: {
    graph(): any {
      const dates = this.history.map(({ timestamp }) => timestamp as unknown as string).sort()
      const trophies = this.history.map(({ trophies }) => trophies)

      const biweekly = 1000*60*60*24*14
      const monthly = biweekly * 2
      const interval = dates.length > 0 && differenceInWeeks(new Date(), parseISO(dates[0])) > 8 ? monthly : biweekly

      const traces = [{
        x: dates,
        y: trophies,
        mode: 'lines',
        type: 'scatter',
        line: {
          color: '#f2d024',
        },
        marker: {
          color: '#f2d024',
        },
      }]

      const layout = {
        xaxis: {
          fixedrange: true,
          tickcolor: 'rgba(255, 255, 255, 0.75)',
          tickmode: 'linear',
          tick0: '2020-07-12', // season start
          dtick: interval,
          ticklen: 3,
          tickangle: 0,
        },
        yaxis: {
          fixedrange: true,
          tickcolor: 'rgba(255, 255, 255, 0.75)',
          tickmode: 'auto',
          ticklen: 3,
          tickangle: 0,
        },
        margin: { t: 5, l: 50, b: 24, r: 25 },
      }

      return { traces, layout }
    },
  },
})
</script>
