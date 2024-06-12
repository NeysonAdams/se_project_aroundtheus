export default class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._elementsContainer = document.querySelector(selector);
  }

  setItems(items) {
    this._items = items;
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(item, isPutOnFirstPlase = false) {
    if (isPutOnFirstPlase) this._elementsContainer.prepend(item);
    else this._elementsContainer.appendChild(item);
  }
}
