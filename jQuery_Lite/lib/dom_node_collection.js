class DOMNodeCollection {
  constructor (HTMLArray) {
    this.elements = HTMLArray;
  }

  html (string) {
    for (let i = 0; i < this.elements.length; i++) {
      if (string) {
        this.elements[i].innerHTML = string;
      } else {
        return this.elements[0].innerHTML;
      }
    }
  }

  empty () {
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].innerHTML = "";
    }
  }

  append (...args) {
    for (var i = 0; i < this.elements.length; i++) {
      for (var j = 0; j < args.length; j++) {
        // debugger
        if (args[j] instanceof HTMLElement) {
          this.elements[i].appendChild(args[j]);
        } else if (typeof args[j] === "string") {
          let argObj = document.createElement(args[j]);
          this.elements[i].appendChild(argObj);
        } else if (args[j] instanceof DOMNodeCollection) {
          args[j].outerHTML = this.elements[i].innerHTML;
          this.elements[i].innerHTML = args[j].outerHTML;
        } else {
          return undefined;
        }
      }
    }
  }

  attr (name, value) {
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].setAttribute(name, value);
    }
  }

  addClass (adClass) {
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].classList.add(adClass);
    }
  }

  removeClass (remClass) {
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].classList.remove(remClass);
    }
  }
// traversal
// returns DNC of all children in an array
  children () {
    let children = [];
    for (let i = 0; i < this.elements.length; i++) {
      let nodelist = this.elements[i].childNodes;
      children = children.concat(Array.from(nodelist));
    }

    return new DOMNodeCollection(children);
  }

  parent () {
    let parents = [];
    for (let i = 0; i < this.elements.length; i++) {
      let parent = this.elements[i].parentNode;

      parents.push(parent);
    }

    return new DOMNodeCollection(parents);
  }



  find (attr) {
    let matched = [];

    for (let i = 0; i < this.elements.length; i++) {
      let found = Array.from(this.elements[i].querySelectorAll(attr));
      matched = matched.concat(found);
    }
    return new DOMNodeCollection(matched);
  }

  remove () {
    this.elements.forEach((el) => el.remove());
  }

  on (eventType, callback) {
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].addEventListener(eventType, callback);
      this.elements[i].setAttribute('eventScript', callback);
    }
  }

  off (eventType) {
    for (let i = 0; i < this.elements.length; i++) {
      let callback = this.elements[i].getAttribute('eventScript');
      this.elements[i].removeAttribute('eventScript');
      this.elements[i].removeEventListener(eventType, callback);
    }
  }


}

module.exports = DOMNodeCollection;
