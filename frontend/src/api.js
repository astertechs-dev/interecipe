import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
});

export const getRecipes = () => api.get('/recipes/');
export const getRecipeById = (id) => api.get(`/recipes/${id}`);
export const createRecipe = (recipe) => api.post('/recipes/', recipe);
export const updateRecipe = (id, recipe) => api.put(`/recipes/${id}`, recipe);
export const deleteRecipe = (id) => api.delete(`/recipes/${id}`);

export default api;