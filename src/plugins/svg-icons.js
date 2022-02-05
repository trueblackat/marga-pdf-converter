import Vue from 'vue';

const req = require.context('../assets/icons/', false, /\.svg$/);
const requireAll = (requireContext) => requireContext.keys().map(requireContext);
const commonRequiredIcons = requireAll(req);

const icons = {};

commonRequiredIcons.forEach((item) => {
  const icon = {
    id: item.default.id.replace('-usage', ''),
    url: item.default.url,
    viewBox: item.default.viewBox,
  };

  icons[icon.id] = icon;
});

Vue.prototype.$svgIcons = icons;
