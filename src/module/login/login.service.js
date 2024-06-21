import {encrypt} from "../../common/common";
import {http} from "../../common/request";

class LoginService {

    authorize(credentials) {
        return http.post("/authorize/login", Object.assign({}, credentials, {password: encrypt(credentials.password)}));
    }

    getAuthorizedUser() {
        return http.get("/uaa/api/users/authorized", {}, {timeout: 2000});
    }

    async changePasswordWithOriginalPassword(params) {
        return http.put(
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
        return http.put(
            "/uaa/api/users/change-password-with-captcha",
            Object.assign(
                {},
                params,
                {
                    newValue: encrypt(params.newValue),
                    confirmValue: encrypt(params.confirmValue),
                }
            )
        );
    }

}

export const loginService = new LoginService();