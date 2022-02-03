const YouTube = require("discord-youtube-api");
const youtube = new YouTube("AIzaSyDYPHvgCDSfQI2ftBz8ZYGPJ2givpQbLqY");

async function searchYouTubeVideo(query) {
    const videoSearch = await youtube.searchVideos(query); 
    console.log(videoSearch);
    return videoSearch.id;
}

searchYouTubeVideo("cold heart").then(console.log)