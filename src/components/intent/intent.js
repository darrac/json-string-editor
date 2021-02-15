Vue.component('intent', {
  template: `
  <div class="intent">
    <h2 class="intent-title">{{ intent.name }}</h2>
    <div>User can invoke this Intent by saying:</div>
    <div
      v-for="(utterance, index) in intent.samples"
      class="input-container"
    >
      <input class="input-text" type="text" rows="5" v-model="intent.samples[index]"></input>
      <button class="button button--inverted button--small" v-on:click="removeSample(index)">-</button>
    </div>
    <button class="button button--inverted button--small" v-on:click="addSample()">+</button>

    <div v-if="intent?.slots?.length">
      <slots
        v-bind:slots="intent?.slots"
        v-bind:elicitation-slots="elicitationIntent?.slots"
        v-bind:prompts="prompts"
        v-bind:types="types"
      ></slots>
    </div>
  </div>`,
  props: ['intent', 'elicitation-intent', 'prompts', 'types'],
  data: function() {
    return {
      samples: this.intent.samples
    }
  },
  methods: {
    addSample: function() {
      this.samples.push('');
    },
    removeSample: function(index) {
      this.samples.splice(index, 1);
    }
  }
});