import {http} from "../../common/request";
import {services} from "../../common/services";


class TenantService {

    getTenant(params) {
        return http.get(`/${services.uaa}/api/tenants`, Object.assign({}, params, {states: params.states?.join('')}))
    }

}

export const tenantService = new TenantService();