const DOMNodeCollection = require ('./dom_node_collection');

Window.prototype.$l = function (argument) {
  const queue = [];

  if (argument instanceof Function) {
    queue.push(argument);
  }
  document.addEventListener("DOMContentLoaded", runQueue);

  function runQueue () {
    queue.forEach((el) => el());
  }

  if (argument instanceof HTMLElement) {
    return new DOMNodeCollection(Array.from(argument));
  }

  let nodelist = document.querySelectorAll(argument);
  return new DOMNodeCollection(Array.from(nodelist));
};

module.exports = Window;
