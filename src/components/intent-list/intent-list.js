Vue.component('intent-list', {
  template: `<div>
    <intent 
      v-for="intent in intents" 
      v-bind:key="intent.name" 
      v-bind:intent="intent"
      v-bind:elicitation-intent="findElicitationIntent(intent.name)"
      v-bind:prompts="prompts"
      v-bind:types="types"
    >
    </intent>
  </div>`,
  props: ['intents', 'elicitation-intents', 'prompts', 'types'],
  methods: {
    findElicitationIntent: function(intentName) {
      const elicitationIntent = this.elicitationIntents.find(( intent ) => {
        return intent.name === intentName;
      });
      return elicitationIntent;
    }
  }
});