import Vue from 'vue'

export default Vue.extend({
  functional: true,
  props: {
    title: {
      type: String,
      required: true,
    },
    brawler: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: '',
    },
  },
  render(h, { props, scopedSlots }) {
    return <div class="card stats-card">
      <span class="stats-card-title">
        { props.title.toLowerCase() }
      </span>
      <media-img
        path={'/brawlers/' + props.brawler + '/avatar'}
        size="160"
        clazz="stats-card-image"
      ></media-img>
      { props.icon !== '' ?
        <media-img
          path={props.icon}
          size="80"
          clazz="stats-card-icon"
        ></media-img>
        : ''
      }
      <div class="stats-card-content">
        <div>
          { scopedSlots.history({}) }
        </div>
        <div>
          { scopedSlots.stats({}) }
        </div>
      </div>
    </div>
  }
})