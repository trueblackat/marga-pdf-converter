export const booleanToNumber = (value) => {
  if (typeof value === 'boolean') {
    return +value;
  }

  return undefined;
};

/**
 * Каждую минуту проверяет, не наступило ли время, переданное в параметре.
 * Если текущее время приближается к дедлайну ближе, чем 2 периода - идет вызов callback.
 *
 * @param untilTime {number} - Время в мс, до которого нужно вести отсчет
 * @param callback {function} - коллбек-функция, вызываемая после истечения времени
 * @param period {number} - периодичность проверки
 */
export const intervalUntil = (untilTime, callback, period = 1000 * 60) => {
  const clear = () => {
    clearInterval(window.intervalUntilTime);
    delete window.intervalUntilTime;
  };

  if (window.intervalUntilTime) clear();

  window.intervalUntilTime = setInterval(() => {
    if (new Date().valueOf() + 2 * period >= untilTime) {
      callback();
      clear();
    }
  }, period);
};
