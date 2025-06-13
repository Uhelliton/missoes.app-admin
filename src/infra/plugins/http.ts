import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import router from '@/core/router'

const getToken = (): string | null => localStorage.getItem('app_token')

const http: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
})

// Interceptor request
http.interceptors.request.use(
    (config: AxiosRequestConfig): AxiosRequestConfig|any => {
        const token = getToken()
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error: AxiosError) => Promise.reject(error)
)

// Interceptor response
http.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => response,
    (error: AxiosError) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('app_user')
            localStorage.removeItem('app_token')
        }
        return Promise.reject(error)
    }
)

export default http
