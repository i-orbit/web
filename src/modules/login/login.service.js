class LoginService {

    authorize(credentials) {
        return window.$http.post("/authorize/login", credentials);
    }

    getAuthorizedUser() {
        return window.$http.get("/uaa/api/users/current");
    }

}

const service = new LoginService();
export default service;