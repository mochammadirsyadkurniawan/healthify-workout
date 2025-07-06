export const exerciseOptions = {
    method: "GET",
    headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_REACT_APP_RAPID_API_KEY,
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
};
export const youtubeOptions = {
    method: "GET",
    headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_REACT_APP_YOUTUBE_API_KEY,
        "X-RapidAPI-Host": "youtube-search-and-download.p.rapidapi.com",
    },
};

export const fetchData = async (url, options) => {
    const response = await fetch(`${url}?limit=100`, options);
    const data = await response.json();
    return data;
};


// export const fetchData = async (url, options) => {
//     let allData = [];
//     let nextUrl = url;

//     while (nextUrl) {
//         const response = await fetch(nextUrl, options);
//         const data = await response.json();
//         allData = [...allData, ...data];

//         // Periksa apakah ada pagination atau next page URL
//         nextUrl = data.next ? `${url}?page=${data.next}` : null;
//     }

//     return allData;
// };




// // default untuk development pake code ini
// export const fetchData = async (url, options) => {
//     const response = await fetch(url, options);
//     const data = await response.json();
//     return data;
// };


