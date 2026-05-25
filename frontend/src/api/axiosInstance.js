import axios from "axios"

// Create a custom axios instance
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
})
// This runs before every REQUEST — adds token automatically
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token")
        if (token && token !== "null") {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

// This runs after every RESPONSE
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Only redirect on 401 Unauthorized — not 403
        if (error.response?.status === 401) {
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            window.location.href = "/login?expired=true"
        }
        return Promise.reject(error)
    }
)

export default axiosInstance