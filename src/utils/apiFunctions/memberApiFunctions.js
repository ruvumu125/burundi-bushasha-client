import {api} from "./baseUrl";
import getHeaders from "../../components/getHeaders.js";
import Cookies from "js-cookie";

const token = Cookies.get("jwtToken");

export async function registerMember(newMemberData) {
    const response = await api.post("/members/burundibushasha/v1/register",newMemberData);
    return response.status === 200;
}
export async function upgradeToCandidate(newCandidateData) {
    const response = await api.post("/members/burundibushasha/v1/candidate",newCandidateData,getHeaders(token).headers);
    return response.status === 200;
}



