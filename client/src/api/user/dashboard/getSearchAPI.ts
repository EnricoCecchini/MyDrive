import usersApiClient from "../_userAPI"

interface GetSearchResultsInterface {
    text: string
    tags: string[]
    limit: number
    offset: number
}

export const getSearchResults = async ({ text="", tags, limit=20, offset=0 }: GetSearchResultsInterface) => {
    console.log("Fetching search results")

    try {
        const tags_str = tags.map((tag) => {return `tag=${tag}&`})
        const resp = await usersApiClient.get(`/dashboard/search?text=${text}&${tags_str}&limit=${limit}&offset=${offset}`)

        console.log("Search Resp:", resp)
        return resp

    } catch (e: any) {
        console.error("Error fetching search results:", e)

        const message =
            e.response?.data?.detail ||
            "Error fetching search results.";

        return {
            status: e.response.data.status || 400,
            message: message
        };
    }
}
