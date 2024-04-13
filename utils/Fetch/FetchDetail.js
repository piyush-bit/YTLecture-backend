import axios from "axios";
import fs from "fs";
// import puppeteer from "puppeteer";
import dataProcessor from "./Arrange.js";
import subCatogrise from "./datapgpt.js";


class YouTubePlaylistFetcher {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  async getPlaylistDetails(playlistId) {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/playlists?id=${playlistId}&part=snippet&key=${this.apiKey}`
      );

      const playlistInfo = response.data.items[0].snippet;
      return {
        title: playlistInfo.title,
        description: playlistInfo.description,
        publishedAt: playlistInfo.publishedAt,
        channelTitle: playlistInfo.channelTitle,
        thumbnailUrl: playlistInfo.thumbnails.medium.url, // Using the default thumbnail URL
      };
    } catch (error) {
      console.error(
        `An error occurred while fetching playlist details: ${error.message}`
      );
      return {
        title: null,
        description: null,
        publishedAt: null,
        channelId: null,
        thumbnailUrl: null,
        videoCount: null,
      };
    }
  }

  async getPlaylistItems(playlistId) {
    const playlistItems = [];
    let nextPageToken = "";

    try {
      do {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${playlistId}&part=snippet&maxResults=50&pageToken=${nextPageToken}&key=${this.apiKey}`
        );

        for (const item of response.data.items) {
          const videoId = item.snippet.resourceId.videoId;
          const videoDetails = await this.getVideoDetails(videoId);
          if (videoDetails) {
            playlistItems.push(videoDetails);
          }
        }

        nextPageToken = response.data.nextPageToken;
      } while (nextPageToken);

      return playlistItems;
    } catch (error) {
      console.error(
        `An error occurred while fetching playlist items: ${error.message}`
      );
      return [];
    }
  }

  async getVideoDetails(videoId) {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,contentDetails&key=${this.apiKey}`
      );

      const videoInfo = response.data.items[0];
      return {
        title: videoInfo.snippet.title,
        description: videoInfo.snippet.description,
        embedLink: `https://www.youtube.com/watch?v=${videoId}`,
        duration: videoInfo.contentDetails.duration,
        img: videoInfo.snippet.thumbnails.medium.url,
      };
    } catch (error) {
      console.error(
        `An error occurred while fetching video details: ${error.message}`
      );
      return null;
    }
  }

  async formatFullData(playlistId, playlistDetails, playlistItems) {
    return {
      playlistId: playlistId,
      title: playlistDetails.title,
      playlist_link: `https://www.youtube.com/playlist?list=${playlistId}`,
      playlist_img: playlistDetails.thumbnailUrl,
      description: playlistDetails.description,
      views: playlistDetails.videoCount,
      updatedDate: playlistDetails.publishedAt,
      channelName: playlistDetails.channelTitle,
      channelId: playlistDetails.channelId,
      // views: await scrapeWebsite(playlistId),
      data: playlistItems,
    };
  }

  formatThirdData(playlistItems) {
    return playlistItems.map((videoDetails, i) => ({
      title: videoDetails.title,
    }));
  }

  saveToJson(data, outputFilePath) {
    fs.writeFileSync(outputFilePath, JSON.stringify(data, null, 2), "utf-8");
  }

  async fetchPlaylistData(playlistId) {
    const playlistDetails = await this.getPlaylistDetails(playlistId);

    if (!playlistDetails.title) {
      console.log("Playlist details not found.");
      return;
    }

    const playlistItems = await this.getPlaylistItems(playlistId);

    if (!playlistItems.length) {
      console.log("No videos found in the playlist.");
      return;
    }

    const fullData = await this.formatFullData(
      playlistId,
      playlistDetails,
      playlistItems
    );

    const thirdData = this.formatThirdData(playlistItems);

    // const fullDataOutputFile = `_full_data.json`;
    // const thirdDataOutputFile = `_third_data.json`;

    // this.saveToJson(fullData, fullDataOutputFile);
    // this.saveToJson(partialData, partialDataOutputFile);
    // this.saveToJson(thirdData, thirdDataOutputFile);

    // console.log(`Full data has been saved to ${fullDataOutputFile}.`);
    // console.log(`Partial data has been saved to ${partialDataOutputFile}.`);
    // console.log(`Third data has been saved to ${thirdDataOutputFile}.`);
    return { fullData, thirdData };
  }
}
// async function scrapeWebsite(playlistId) {
//   // Launch a headless browser
//   const browser = await puppeteer.launch();

//   // Open a new page
//   const page = await browser.newPage();

//   // Navigate to the website
//   await page.goto(`https://www.youtube.com/playlist?list=${playlistId}`);

//   // Wait for the element to be available in the DOM
//   await page.waitForSelector(
//     "#page-manager > ytd-browse > ytd-playlist-header-renderer > div > div.immersive-header-content.style-scope.ytd-playlist-header-renderer > div.thumbnail-and-metadata-wrapper.style-scope.ytd-playlist-header-renderer > div > div.metadata-action-bar.style-scope.ytd-playlist-header-renderer > div.metadata-text-wrapper.style-scope.ytd-playlist-header-renderer > ytd-playlist-byline-renderer > div > yt-formatted-string:nth-child(4)"
//   );

//   // Extract the text content of the selected element
//   const elementText = await page.$eval(
//     "#page-manager > ytd-browse > ytd-playlist-header-renderer > div > div.immersive-header-content.style-scope.ytd-playlist-header-renderer > div.thumbnail-and-metadata-wrapper.style-scope.ytd-playlist-header-renderer > div > div.metadata-action-bar.style-scope.ytd-playlist-header-renderer > div.metadata-text-wrapper.style-scope.ytd-playlist-header-renderer > ytd-playlist-byline-renderer > div > yt-formatted-string:nth-child(4)",
//     (element) => element.textContent
//   );

//   // Print the text content
//   console.log(elementText);

//   // Close the browser
//   await browser.close();
//   return elementText;
// }

async function generate(playlistId) {
  const apiKey = "AIzaSyCn2UfhhnTJbBRcACQ0g6bh1hpZfmRgqhM";

  const playlistFetcher = new YouTubePlaylistFetcher(apiKey);
  const value = await playlistFetcher.fetchPlaylistData(
    playlistId
  );
  // const [fullData, thirdData] = value
  const chatgpt= await subCatogrise(JSON.stringify(value.thirdData))
  
  const result = dataProcessor(value.fullData, chatgpt);
  console.log("**************************************************************************************");
  console.log(result)
  return result
}

export const  generateSimple= async (playlistId) => {
  const apiKey=process.env.GOOGLE_API
  const playlistFetcher = new YouTubePlaylistFetcher(apiKey);
  const value = await playlistFetcher.fetchPlaylistData(
    playlistId
  );
  // const [fullData, thirdData] = value
  // const chatgpt= await subCatogrise(JSON.stringify(value.thirdData))
  const order = [{"subtopic": value.fullData.title,
  "data":value.thirdData}]
  
  const result = dataProcessor(value.fullData, order);
  console.log("**************************************************************************************");
  console.log(result)
  return result
}

export default generate 
