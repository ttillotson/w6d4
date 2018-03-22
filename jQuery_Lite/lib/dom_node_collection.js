class DOMNodeCollection {
  constructor (HTMLArray) {
    this.array = HTMLArray;
  }

  html (string) {
    if (string) {
      this.innerHTML = string;
      return this;
    } else {
      return this.innerHTML;
    }

  }

  empty () {
    this.html = "";
  }

  append (arg) {
    if (arg instanceof HTMLElement) {
      arg.outerHTML = this.innerHTML;
    } else if (arg instanceof String) {
      this.innerHTML = arg;
    } else if (arg instanceof DOMNodeCollection) {
      arg.outerHTML = this.innerHTML;
    } else {
      return undefined;
    }
  }

  attr (name, value) {
    this.setAttribute(name, value);
  }

  addClass () {

  }

  removeClass () {

  }
// traversal

  children () {

  }

  parent () {

  }

  find () {

  }

  remove () {

  }

}

module.exports = DOMNodeCollection;
