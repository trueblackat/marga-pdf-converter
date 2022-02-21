export default function (el, binding) {
  el.classList.toggle('is-loading', binding.value);
}
