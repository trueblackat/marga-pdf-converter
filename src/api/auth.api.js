import httpClient from '@/api/httpClient';

/*
  Список запросов
  Swagger - http://18.191.201.80/api/swagger/
*/

/**
 * Обновление refresh-токена.
 * Требует request header Authorization.
 * @return {Promise<object>} - обновленный объект токена пользователя
 */
const refreshToken = () => httpClient.get('/users/refresh-token');

/**
 * Регистрация пользователя с логином, email и паролем
 * @param login {string} - логин
 * @param email {string} - email
 * @param password {string} - пароль
 * @return {Promise<object>} - обновленный объект токена пользователя
 */
const registerByLoginEmailPass = ({ login, email, password }) => httpClient
  .post('/users/register', { login, email, password });

/**
 * Создание анонимного пользователя
 * @return {Promise<object>} - обновленный объект токена пользователя
 */
const registerAnonymous = () => httpClient.post('/users/unauthorized');

/**
 * Получение информации о текущем пользователе.
 * Требует request header Authorization.
 * @return {Promise<object>} - информация о пользователе
 */
const getCurrentUserInfo = () => httpClient.get('/users/me');

/**
 * Авторизация по логину и паролю
 * @param login {string} - логин
 * @param password {string} - пароль
 * @return {Promise<object>} - обновленный объект токена пользователя
 */
const loginByLogin = ({ login, password }) => httpClient.post('/users/login_password', { login, password });

/**
 * Очистка refreshtoken_cookie
 * @return {Promise<object>} - обновленный объект токена пользователя
 */
const revokeToken = () => httpClient.get('/users/revoke-token');

export default {
  refreshToken,
  registerByLoginEmailPass,
  registerAnonymous,
  getCurrentUserInfo,
  loginByLogin,
  revokeToken,
};
