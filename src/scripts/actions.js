// import { v4 as uuidv4 } from "uuid";

function clickOutside(el, callbackfn) {
  function onClick(event) {
    event.preventDefault();
    if (!el.contains(event.target)) {
      callbackfn();
    }
  }
  document.body.addEventListener("click", onClick);
  return {
    update(newCallbackFn) {
      callbackfn = newCallbackFn;
    },
    destroy() {
      document.body.removeEventListener("click", onClick);
    },
  };
}

module.exports = {
  clickOutside,
};
