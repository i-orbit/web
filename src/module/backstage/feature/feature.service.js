import {http} from "../../../common/request";
import {services} from "../../../common/services";

class FeatureService {

    getTree(includeMenus = 'N') {
        return http.get(`/${services.uaa}/api/features/tree-of-features`, {includeMenus: includeMenus});
    }

}

export const featureService = new FeatureService();