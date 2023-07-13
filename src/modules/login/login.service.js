import {encrypt} from "../../utils/common";

class LoginService {

    authorize(credentials) {
        return window.$http.post("/authorize/login", Object.assign({}, credentials, {password: encrypt(credentials.password)}));
    }

    getAuthorizedUser() {
        return window.$http.get("/uaa/api/users/current");
    }

    getCaptcha() {
        return window.$http.get("/authorize/captcha")
    }

    async changePasswordWithOriginalPassword(params) {
        return window.$http.put(
            "/uaa/api/users/change-password-with-original-password",
                Object.assign(
                    {},
                    params,
                    {
                        originalValue: encrypt(params.originalValue),
                        newValue: encrypt(params.newValue),
                        confirmValue: encrypt(params.confirmValue),
                    }
                )
            );
    }

    changePasswordWithCaptcha(params) {
        return window.$http.put("/uaa/api/users/change-password-with-captcha", params);
    }

}

const service = new LoginService();
export default service;