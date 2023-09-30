export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Метод отрисовки всех элементов
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  // Метод добавления DOM-элемента в контейнер
  addItem(element) {
    this._container.prepend(element);
  }
}
