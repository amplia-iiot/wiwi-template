<template>
  <v-app>
    <v-dialog scrollable :value="true" persistent>
      <v-card>
        <v-card-title class="pa-0">
          <v-toolbar flat>
            <v-toolbar-title>
              <h2 class="no-padding no-margin primary--text">
                {{ title }}
              </h2>
            </v-toolbar-title>
            <v-spacer />
            <v-divider vertical inset></v-divider>
            <v-hover v-slot="{ hover }">
              <v-btn
                :color="hover ? 'red' : 'grey'"
                text
                data-test-id="close-widget-modal"
                @click="close"
              >
                <v-icon>ogicon-times</v-icon>
              </v-btn>
            </v-hover>
          </v-toolbar>
        </v-card-title>
        <v-card-text style="height:100vh;" class="pa-0">
          <wiwi ref="wiwi" @close="$emit('close')"></wiwi>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>
<script>
import config from '../meta-widget.json'
import wiwi from './components/wiwi.vue'

export default {
  name: "WIWizard",
  components: {
    wiwi
  },
  computed: {
    title() {
      {{#if_eq WiWiType "wizard"}}
      return config.actions[Object.keys(config.actions)[0]][0];
      {{/if_eq}}
      {{#if_eq WiWiType "widget"}}
      return config.widgets[0];
      {{/if_eq}}
    }
  }
};
</script>
<style scoped>
@import "../node_modules/opengate-icons/dist/opengate-icons-1.7.0.css";
</style>
