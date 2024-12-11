import {api} from "./baseUrl";

export async function registerMember(newMemberData) {
    const response = await api.post(
        "/members/burundibushasha/v1/register",
        newMemberData, // Send JSON directly
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    return response.status === 200;
}



