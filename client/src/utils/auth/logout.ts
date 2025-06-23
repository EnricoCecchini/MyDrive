export const handleLogoutUser = () => {
    // Remove token from localstorage
    localStorage.removeItem("authToken")
}