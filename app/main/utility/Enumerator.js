
class Enumerator {
  constructor(object) {
    Object.keys(object).forEach((key) => {
      if ({}.hasOwnProperty.call(object, key)) {
        this[key] = object[key];
      }
    });
    // freeze: 不允許新增、修改、刪除對象的屬性；防止物件的原型被改變
    return Object.freeze(this)
  }

  has(key) {
    return {}.hasOwnProperty.call(this, key)
  }
}

module.exports = Enumerator