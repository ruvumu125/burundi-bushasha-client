import {api} from "./baseUrl";


export async function getCountries() {

    try {
        const result = await api.get(`/country/burundibushasha/v1/countries/list`)
        return result.data
    } catch (error) {
        throw new Error(`Error fetching countries ${error.message}`)
    }
}

