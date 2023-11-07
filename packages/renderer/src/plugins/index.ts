import type {App} from 'vue';
import vuetify from './vuetify';
import pinia from './pinia';

export function registerPlugins(app: App<Element>): void {
  app.use(vuetify).use(pinia);
}
