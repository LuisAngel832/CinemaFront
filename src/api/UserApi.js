import apiClient from './Cliente.js';

export const getMovies = () => {
  return apiClient.get('/movies');
};

export const getAllMovies = () => {
  return apiClient.get('/movies/all');
}

export const getStats = () => {
  return apiClient.get('/admin/stats');
}

export const  getShowtimes = () => {
  return apiClient.get('/showtimes');
}

export const updateMovie = (idMovie, movieBody) => {
  return apiClient.put(`/movies/${idMovie}`, movieBody);
};

export const deleteMovie = (idMovie) => {
  return apiClient.delete(`/movies/${idMovie}`);
};

export const getAllRooms = () => {
  return apiClient.get('/rooms');
}

export const updateRoom = (roomId, payload) => {
  return apiClient.put(`/showtimes/${roomId}`, payload);
}

export const deleteRoom = (roomId) => {
  return apiClient.delete(`/showtimes/${roomId}`);
}

export const createMovie = (movieBody, file) => {
  const formData = new FormData();

  formData.append(
    "movie",
    new Blob([JSON.stringify(movieBody)], { type: "application/json" })
  );

  if (file) {
    formData.append("file", file);
  }

  return apiClient.post("/movies", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const createShowtime = (body) => {
  return apiClient.post("/showtimes", body);
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
