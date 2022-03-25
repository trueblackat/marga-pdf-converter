export default {
  email: 'Электронная почта',
  password: 'Пароль',
  passwordRetype: 'Повторите пароль',
  subscription: 'Подписки',
  subscriptions: 'Подписки',
  myFiles: 'Мои файлы',
  login: 'Логин',
  entrance: 'Вход',
  register: 'Регистрация',
  today: 'Сегодня',
  popup: 'Попап',
  code: 'Код',
  info: 'Информация',
  auth: {
    forgotPasswordQuestion: 'Забыли пароль?',
    subscriptionNotExistsQuestion: 'Нет подписки?',
    takeFree: 'Получите бесплатно',
    incorrectCodeMessage: 'Код не верен, проверьте правильность введенных данных',
    typeCodeMessage: 'Введите код подтверждения, который пришел вам на почту',
    checkEnterDataMessage: 'Проверьте правильность введенных данных',
    oldPassword: 'Старый пароль',
    newPassword: 'Новый пароль',
    approvePasswordMessage: 'Подтвердите пароль',
    setEmailForSentMessage: 'Введите вашу почту чтобы, мы смогли вам отправить проверочный код',
  },
  documents: {
    maxSize: 'Макс. 50 Mb',
    pages: 'Нет страниц | {n} страница | {n} страницы | {n} страниц',
  },
  actions: {
    goBack: 'Вернуться назад',
    send: 'Отправить',
    close: 'Закрыть',
    addFile: 'Добавить файл',
    restorePassword: 'Восстановить пароль',
    setNewPassword: 'Задать новый пароль',
    enter: 'Войти',
    out: 'Выйти',
    change: 'Изменить',
    approve: 'Подтвердить',
    approveEmail: 'Подтвердить почту',
    changeEmail: 'Изменить почту',
    changePassword: 'Сменить пароль',
    convertToPdf: 'Конвертировать в PDF',
    convert: 'Конвертировать',
    splitFile: 'Разделить файл',
    split: 'Разделить',
    mergePages: 'Объединить страницы',
    merge: 'Объединить',
    dontConvert: 'Не конвертировать',
    select: 'Выбрать',
    scaleDown: 'Уменьшить масштаб',
    scaleUp: 'Увеличить масштаб',
    scaleSet: 'Настроить масштаб',
  },
  profile: {
    title: 'Профиль',
    statistic: {
      load: 'Залито файлов',
      convert: 'Сконвертировано файлов',
      merge: 'Объединено файлов',
      split: 'Разделено файлов',
    },
    subscribe: {
      resume: 'Продлить подписку',
      order: 'Оформить подписку',
      continueOrder: 'Продолжить оформление',
      ends: 'Срок подписки истекает:',
      notExists: 'Подписка не оформлена',
      successPayment: {
        title: 'Успешная оплата!',
        message: 'Спасибо за оплату!',
      },
      errorPayment: {
        title: 'Ошибка при оплате подписки!',
        message: 'Обратитесь к администратору - admin@pdf-maker.com',
      },
    },
  },
  footer: {
    rights: 'Pdf Editor {year} © Все права защищены',
    socialLinks: 'Социальные сети',
    mobileApps: 'Мобильные приложения',
  },
  modes: {
    convert: {
      title: 'Конвертировать файл',
      subTitle: 'из .DOC, .DOCX, .JPG или .EXCEL в .PDF',
      caption: 'Выберите файл для конвертирования',
    },
    merge: {
      title: 'Объединить файлы',
      subTitle: 'из нескольких .PDF в один',
      caption: 'Выберите файл для объединения',
    },
    split: {
      title: 'Разделить файл',
      subTitle: 'из одного .PDF в два или больше',
      caption: 'Выберите файл для разделения',
    },
  },
  subscriptionsData: {
    step: 'Шаг',
    steps: {
      first: 'Выбор подписки',
      second: 'Регистрация аккаунта',
    },
    one: {
      title: 'на 1 месяц',
      features: [
        'Единый аккаунт для всех ваших устройств',
        'Хранилище файлов',
        'Выгрузка неограниченного количества файлов в день',
      ],
      price: '4,99$/month',
      priceCaption: '',
      priceDiscount: '',
    },
    three: {
      title: 'на 3 месяца', // 3 months premium subscription
      features: [
        'Единый аккаунт для всех ваших устройств',
        'Хранилище файлов',
        'Выгрузка неограниченного количества файлов в день',
      ],
      price: '4,99$/month',
      priceCaption: '13,65$ за 3 месяца',
      priceDiscount: '',
    },
    year: {
      title: 'на год', // 1 year premium subscription
      features: [
        'Единый аккаунт для всех ваших устройств',
        'Хранилище файлов',
        'Выгрузка неограниченного количества файлов в день',
      ],
      price: '3,99$/month',
      priceCaption: '48$ за 1 год ',
      priceDiscount: '-25%',
    },
  },
};
