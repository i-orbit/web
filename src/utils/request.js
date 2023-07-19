import axios, {AxiosRequestConfig} from 'axios';
import messages from "./message";


const responseInterceptor = {
    onFulfilled(response) {
        if (response.status >= 200 && response.status < 220) {
            return response.data;
        } else {
            return response;
        }
    },
    onRejected(error) {
        // 如果是登录请求，不处理交给登录页面自己处理
        if (error.config.url.endsWith("/authorize/login")) {
            return Promise.reject(error);
        }
        if (error.response.status === 401) {
            window.location.href = "/login";
        }
        messages.error(error.response.data.message)
        return Promise.reject(error);
    }
}

class Request {

    contextPath: string;

    constructor() {
        this.contextPath = (process.env.NODE_ENV === 'development' ? '/orbit' : '');
        sessionStorage.setItem("__C_CONTEXT_PATH_", this.contextPath)
        axios.interceptors.response.use(responseInterceptor.onFulfilled, responseInterceptor.onRejected);
    }

    get(url: string, params?: any): Promise<any> {
        url = this.contextPath + url;
        return axios.get(url, {params: params})
    }

    del(url: string, params?: any): Promise<any> {
        url = this.contextPath + url;
        return axios.delete(url, {params: params})
    }

    post(url: string, data?: any, config?: AxiosRequestConfig): Promise<any> {
        url = this.contextPath + url;
        return axios.post(url, data, config)
    }

    put(url: string, data?: any, config?: AxiosRequestConfig): Promise<any> {
        url = this.contextPath + url;
        return axios.put(url, data, config)
    }

    patch(url: string, data?: any, config?: AxiosRequestConfig | undefined): Promise<any> {
        url = this.contextPath + url;
        return axios.patch(url, data, config)
    }

    getContentPath(): string {
        return this.contextPath;
    }

}

export const http = new Request();