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
    // If response is ok — just return it
    (response) => response,

    // If response has error
    (error) => {
        if (error.response?.status === 401 ||
            error.response?.status === 403) {
            // Clear everything
            localStorage.removeItem("token")
            localStorage.removeItem("user")

            // Redirect to login with message
            window.location.href = "/login?expired=true"
        }
        return Promise.reject(error)
    }
)

export default axiosInstance