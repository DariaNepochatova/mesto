export default class Section {
  constructor(renderer, containerSelector) {
   
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Метод отрисовки всех элементов
  renderItems(data) {
    data.forEach((item) => {
      this._renderer(item);
    });
  }

  // Метод добавления DOM-элемента в контейнер
  addItemPrepend(element) {
    this._container.prepend(element);
  }

  addItemAppend(element) {
    this._container.append(element);
  }
}
