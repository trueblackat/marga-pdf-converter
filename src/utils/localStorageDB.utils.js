class LocalStorageDB {
  constructor(dbPrefix) {
    this.dbPrefix = `${dbPrefix}@`;
  }

  /**
   * Добавить данные в localStorage
   * @param {string} key - ключ
   * @param {any} value  - значение
   */
  put(key, value) {
    const localValue = JSON.stringify(value);

    localStorage.setItem(this.dbPrefix + key, localValue);

    return true;
  }

  /**
   * Получить данные из localStorage по ключу
   * @param {string} key object key id
   * @returns {object|null}
   */
  get(key) {
    const data = localStorage.getItem(this.dbPrefix + key);

    if (data === null) return false;

    let localData = false;

    try {
      localData = JSON.parse(data);
    } catch (e) {
      console.error(e);
    }

    return localData;
  }

  /**
   * Удаление значения по ключу
   * @param key
   */
  delete(key) {
    localStorage.removeItem(this.dbPrefix + key);
  }

  /**
   * Полная очистка БД для данного префикса
   */
  drop() {
    const rowsCount = localStorage.length;

    for (let i = 0; i < rowsCount; i += 1) {
      const key = localStorage.key(i);

      if (key.startsWith(this.dbPrefix)) this.delete(key);
    }
  }
}

const localStorageDb = new LocalStorageDB('pdfConverter');

export default localStorageDb;
