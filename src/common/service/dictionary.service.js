import {http} from "../request";
import {services} from "../services";

class DictionaryService {

    getCategory(code) {
        return http.get(`/${services.core}/api/dictionaries/categories/${code}`);
    }

}

export const dictionaryService = new DictionaryService();