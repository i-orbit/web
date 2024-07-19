import {http} from "../../../common/request";
import {services} from "../../../common/services";


class TenantService {

    list(params) {
        return http.get(`/${services.uaa}/api/tenants`, Object.assign({}, params, {states: params.states?.join(',')}))
    }

    get(id) {
        return http.get(`/${services.uaa}/api/tenants/${id}`);
    }

}

export const tenantService = new TenantService();