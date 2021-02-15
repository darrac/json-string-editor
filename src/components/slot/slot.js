Vue.component('app-slot', {
  template: `
  <div>
    <h4>{{appSlot.name}}</h4>
    If a user fails to provide {{appSlot.name}} value, Kitchen plus will ask him to fill that value.
    <div class="slot-elicitation-container" v-if="elicitationSlot?.prompts?.elicitation">
      Kitchen plus will prompt for the slot in one of the following ways:
      <div
        v-for="(prompt, promptIndex) in promptsElicitation?.variations"
        class="input-container"
      >
        <input class="input-text" type="text" v-model="promptsElicitation.variations[promptIndex].value"></input>
        <button class="button button--inverted button--small" v-on:click="removeSlotElicitation(promptIndex)">-</button>
      </div>
      <button class="button button--inverted button--small" v-on:click="addSlotElicitation()">+</button>
    </div>
    <div v-if="validationsPrompts?.length">
      Alexa will validate this slot value with the following validations:
      <div v-for="validation in validationsPrompts">
        <i>{{validation.id}}</i>
        <br/>
        For this validation Alexa will prompt new value from the user in one of the following ways:
        <br/>
        <div
          v-for="(validationPrompt, validationPromptIndex) in validation?.variations"
          class="input-container"
        >
          <input class="input-text" type="text" v-model="validation.variations[validationPromptIndex].value"></input>
          <button class="button button--inverted button--small" v-on:click="removeValidationPrompt(validation, validationPromptIndex)">-</button>
        </div>
        <button class="button button--inverted button--small" v-on:click="addValidationPrompt(validation)">+</button>
      </div>
    </div>
    After Kitchen Plus prompts, user can fill the {{appSlot.name}} in one of the following ways:
    <div v-if="appSlot?.samples?.length">
      <div
        v-for="(sample, index) in appSlot.samples"
        class="input-container"
      >
        <input class="input-text" type="text" v-model="appSlot.samples[index]"></input>
        <button class="button button--inverted button--small" v-on:click="removeSlotSample(index)">-</button>
      </div>
      <button class="button button--inverted button--small" v-on:click="addSlotSample()">+</button>
    </div>
    <div v-if="slotType">
      Slot {{appSlot.name}} is of custom type <b>{{appSlot.type}}</b>.
      <br>
      <i>Note: Changing custom type values here can affect other intents where {{appSlot.type}} type is used.</i>
      <br>
      Possible values are:
      <div v-for="typeValue in slotType.values">
        <b>{{typeValue.id}}</b> - Users can pronounce this value in any of the following ways:
        <div class="input-container">
          <input class="input-text" type="text" v-model="typeValue.name.value"></input>
        </div>
        <div
          v-for="(synonym, synonymIndex) in typeValue.name.synonyms"
          class="input-container"
        >
          <input class="input-text" type="text" v-model="typeValue.name.synonyms[synonymIndex]"></input>
          <button class="button button--inverted button--small" v-on:click="removeSynonym(typeValue, synonymIndex)">-</button>
        </div>
        <button class="button button--inverted button--small" v-on:click="addSynonym(typeValue)">+</button>
      </div>
    </div>
  </div>`,
  props: ['app-slot', 'elicitation-slot', 'prompts-elicitation', 'types',  'validations-prompts'],
  data() {
    return {
      slotType: null
    }
  },
  created() {
    this.slotType = this.getCustomSlotType(this.appSlot.type);
  },
  methods: {
    addSlotElicitation: function() {
      this.promptsElicitation.variations.push({
        type: 'PlainText',
        value: ''
      });
    },
    removeSlotElicitation: function(index) {
      this.promptsElicitation.variations.splice(index, 1);
    },
    addValidationPrompt: function(validations) {
      validations.variations.push({
        type: 'PlainText',
        value: ''
      });
    },
    removeValidationPrompt: function(validation, index) {
      validation.variations.splice(index, 1);
    },
    addSlotSample: function() {
      this.appSlot.push('');
    },
    removeSlotSample: function(index) {
      this.appSlot.samples.splice(index, 1);
    },
    addSynonym: function(typeValue) {
      if (typeValue.name.synonyms === undefined) {
        Vue.set(typeValue.name, 'synonyms', []);
      }
      typeValue.name.synonyms.push('');
    },
    removeSynonym: function(typeValue, index) {
      typeValue.name.synonyms.splice(index, 1);
      if (typeValue.name.synonyms.length === 0) {
        Vue.delete(typeValue.name, 'synonyms');
      }
    },
    getCustomSlotType: function(slotTypeName) {
      const type = this.types.find((type) => {
        return type.name === slotTypeName;
      });
      return type;
    }
  }
});