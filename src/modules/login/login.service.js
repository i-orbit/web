class LoginService {

    authorize(credentials) {
        return window.$http.post("/authorize/login", credentials);
    }

    getAuthorizedUser() {
        return window.$http.get("/uaa/api/users/current");
    }

    async changePasswordWithOriginalPassword(params, onSuccess, onError?) {
        return window.$http.put("/uaa/api/users/change-password-with-original-password", params);
    }

    changePasswordWithCaptcha(params) {
        return window.$http.put("/uaa/api/users/change-password-with-captcha", params);
    }

}

const service = new LoginService();
export default service;