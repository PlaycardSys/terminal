import {defineStore} from 'pinia';

export const useSnackbarStore = defineStore('snackbar', {
  state: () => ({
    snackbar: {message: '', type: ''},
    isVisible: false,
  }),
  actions: {
    success(message: string) {
      this.snackbar = {message, type: 'success'};
      this.isVisible = true;
    },
    error(message: string) {
      this.snackbar = {message, type: 'error'};
      this.isVisible = true;
    },
    clear() {
      this.isVisible = false;
    },
  },
});
