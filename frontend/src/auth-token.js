
export const authToken = () => {
    const token =  document.cookie.split("=")[1];
    return {headers: {"Authorization" : `Bearer ${token}`}};
}