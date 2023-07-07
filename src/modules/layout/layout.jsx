import AuthorizationService from "../../utils/authorization.service";
export default function Layout() {
    const user = AuthorizationService.getAuthorizedUser();
    return (
        <div>{user?.name}</div>
    )

}