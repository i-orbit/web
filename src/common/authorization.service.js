const __ORBIT_U_ = "__ORBIT_U_";

class AuthorizationService {

    static getAuthorizedUser() {
        const user = sessionStorage.getItem(__ORBIT_U_);
        return user == null ? null : JSON.parse(sessionStorage.getItem(__ORBIT_U_));
    }

    static storeAuthorizedUser(user) {
        sessionStorage.setItem(__ORBIT_U_, JSON.stringify(user));
    }

}

export default AuthorizationService;