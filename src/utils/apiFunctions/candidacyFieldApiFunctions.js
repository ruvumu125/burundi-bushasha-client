import {api} from "./baseUrl";

export async function getCandidacyFields() {

    try {
        const result = await api.get(`/candidacy_field/burundibushasha/v1/candidacy_fields/list`)
        return result.data
    } catch (error) {
        throw new Error(`Error fetching volunteering areas ${error.message}`)
    }
}
