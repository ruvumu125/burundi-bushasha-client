import {api} from "./baseUrl";

/* This function adds a new vehicule type to the database */
export async function loginUser(login) {
    try {
        const response = await api.post("/authentication/burundibushasha/v1/auth/authenticate", login)
        if (response.status >= 200 && response.status < 300) {
            return response.data
        } else {
            return null
        }
    } catch (error) {
        console.log(error);
        return null
    }
}

export async function verifyEmail(token) {
    try {
        const result = await api.get(`/members/burundibushasha/v1/verify/${token}`)
        return result.data
    } catch (error) {
        throw new Error(`Error fetching vehicule type ${error.message}`)
    }
}