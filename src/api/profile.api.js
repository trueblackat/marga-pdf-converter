import httpClient from '@/api/httpClient';

/**
 * Подтверждение почты
 * @param code {string} - код из письма
 * @param email {string} - email пользователя
 * @param userId {string} - id пользователя
 * @return {Promise<object>} - обновленный объект токена пользователя
 */
const confirmEmail = (code, email, userId) => {
  const params = {
    code,
    email,
    user_id: userId,
  };

  return httpClient.post('/users/confirm-email', params);
};

/**
 * Изменение пароля
 * @param oldPassword {string} - старый пароль пользователя
 * @param newPassword {string} - новый пароль пользователя
 * @return {Promise<object>} - обновленный объект токена пользователя
 */
const changePassword = (oldPassword, newPassword) => httpClient.post(
  '/users/change-password',
  { old_password: oldPassword, new_password: newPassword },
);

/**
 * Изменение почты.
 * @param newEmail {string} - новая почта
 * @return {Promise<object>} - обновленный объект токена пользователя
 */
const changeEmail = (newEmail) => httpClient.post(
  '/users/change_email',
  { new_email: newEmail },
);

/**
 * Восстановление пароля (из ссылки на почту)
 * @param userId {string} - id пользователя
 * @param code {string} - код из письма
 * @param newPassword {string} - новый пароль пользователя
 * @return {Promise<object>} - обновленный объект токена пользователя
 */
const restorePassword = (userId, code, newPassword) => httpClient.post(
  '/users/restore-password',
  { user_id: userId, code, new_password: newPassword },
);

/**
 * Отправка ссылки на напоминание пароля
 * @param email {string} - почта, на которую отправить ссылку
 * @return {Promise<any>}
 */
const remindPassword = (email) => httpClient.post('/users/send-password', { email });

export default {
  confirmEmail,
  changePassword,
  remindPassword,
  restorePassword,
  changeEmail,
};
