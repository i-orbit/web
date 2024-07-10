import {encrypt} from "../../common/common";
import {http} from "../../common/request";
import {services} from "../../common/services";

class LoginService {

    authorize(credentials) {
        return http.post("/authorize/login", Object.assign({}, credentials, {password: encrypt(credentials.password)}));
    }

    getAuthorizedUser() {
        return http.get(`/${services.uaa}/api/users/authorized`, {}, {timeout: 2000});
    }

    async changePasswordWithOriginalPassword(params) {
        return http.put(
            `/${services.uaa}/api/users/passwords/change`,
            Object.assign(
                {},
                params,
                {
                    originalPassword: encrypt(params.originalPassword),
                    newPassword: encrypt(params.newPassword),
                    confirmPassword: encrypt(params.confirmPassword),
                }
            )
        );
    }

    changePasswordWithCaptcha(params) {
        return http.put(
            `/${services.uaa}/api/users/change-password-with-captcha`,
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