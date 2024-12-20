const getHeaders = (token) => {
    return {
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
        },
    };
};

export default getHeaders;
