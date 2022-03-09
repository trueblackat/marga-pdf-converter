import httpClient from '@/api/httpClient';

const confirmEmail = (code, email, userId) => {
  const params = {
    code,
    email,
    user_id: userId,
  };

  return httpClient.post('/users/confirm-email', params);
};

export default {
  confirmEmail,
};
