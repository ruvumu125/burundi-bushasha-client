import {api} from "./baseUrl";


export async function getVolunteeringAreas() {

    try {
        const result = await api.get(`/volunteering_area/burundibushasha/v1/volunteering_areas/list`)
        return result.data
    } catch (error) {
        throw new Error(`Error fetching volunteering areas ${error.message}`)
    }
}

