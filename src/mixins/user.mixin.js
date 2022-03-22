import { truncate } from 'lodash';

export default {
  computed: {
    computedLogin() {
      const login = this.user.login || `user-${this.user.id}`;

      return truncate(login, { length: 20 });
    },
  },
};
