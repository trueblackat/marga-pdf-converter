import { saveAs } from 'file-saver';
import api from '@/api';
import { getAbsoluteFileApiLink } from '@/utils/misc.utils';

export default {
  data() {
    return {
      test: 123,
    };
  },
  methods: {
    async downloadFile() {
      try {
        const { link } = await api.documents.downloadItem(this.id);

        saveAs(getAbsoluteFileApiLink(link.substring(1)));
      } catch (e) {
        console.error(e);

        this.$notify.error({
          title: this.$t('messages.somethingWrongTitle'),
          message: this.$t('messages.downloadLimitOff'),
        });

        window.vm.$eventBus.$emit('show-paywall');
      }
    },
  },
};
