import apiClient from './Cliente.js';

export const getMovies = () => {
  return apiClient.get('/movies');
};

export const getShowtimesByMovie = (movieId) => {
  return apiClient.get(`/showtimes/movie/${movieId}`);
};

export const getShowtimeDetails = (showtimeId) => {
  return apiClient.get(`/showtimes/${showtimeId}`);
};

export const createPurchase = (payload) => {
  return apiClient.post('/purchases', payload);
};

export const getMyPurchases = () => {
  return apiClient.get('/purchases');
};

export const getCards = () => {
  return apiClient.get('/cards');
};
export const saveCard = (cardData) => {
  return apiClient.post('/cards', cardData);
};
export const deleteCard = (cardId) => {
  return apiClient.delete(`/cards/${cardId}`);
};

export const getUserProfile = () => {
  return apiClient.get('/auth');
};
export const updateUserProfile = (data) => {
  return apiClient.put('/auth', data);
};
