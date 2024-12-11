import {api} from "./baseUrl";


export async function getNationalities() {

    try {
        const result = await api.get(`/nationality/burundibushasha/v1/nationalities/list`)
        return result.data
    } catch (error) {
        throw new Error(`Error fetching nationalities ${error.message}`)
    }
}