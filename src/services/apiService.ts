import axios from "axios";

import {baseURL} from "../constants";

const apiService = axios.create({baseURL})

apiService.interceptors.request.use(request => {
    const token = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZmU0OGRiMDlmZmJmMWRhYjA5Y2NlOTg5MGZiNDE0NSIsInN1YiI6IjY1ZGU1NTUxMzk1NDlhMDE2NDRmMTUxNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1tUDlo2v3gTz6hqDJzk4Ura3Q7bRr9hOsvVEunOaMX8';
    if (token) {
        request.headers.Authorization = token
    }
    return request
})

export {
    apiService
}