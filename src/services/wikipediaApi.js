/**
 * Wikipedia API Service
 * Fetches search results from Wikipedia's public API
 */

const WIKI_API_BASE = "https://en.wikipedia.org/w/api.php";

export async function searchWikipedia(query, limit = 10) {
  if (!query.trim()) return [];

  const params = new URLSearchParams({
    action: "query",
    list: "search",
    srsearch: query,
    srlimit: limit,
    format: "json",
    origin: "*",
    utf8: 1,
    srprop: "snippet|titlesnippet",
  });

  try {
    const response = await fetch(`${WIKI_API_BASE}?${params}`);
    const data = await response.json();

    if (!data.query?.search) return [];

    // Fetch thumbnails for the results
    const titles = data.query.search.map((r) => r.title).join("|");
    const imageParams = new URLSearchParams({
      action: "query",
      titles: titles,
      prop: "pageimages|info",
      pithumbsize: 200,
      inprop: "url",
      format: "json",
      origin: "*",
    });

    const imageResponse = await fetch(`${WIKI_API_BASE}?${imageParams}`);
    const imageData = await imageResponse.json();
    const pages = imageData.query?.pages || {};

    // Create a map of title to page info
    const pageMap = {};
    Object.values(pages).forEach((page) => {
      pageMap[page.title] = {
        thumbnail: page.thumbnail?.source || null,
        url:
          page.fullurl ||
          `https://en.wikipedia.org/wiki/${encodeURIComponent(page.title)}`,
      };
    });

    // Combine search results with image data
    return data.query.search.map((result) => ({
      id: result.pageid,
      title: result.title,
      snippet: result.snippet.replace(/<\/?span[^>]*>/g, ""), // Remove highlight spans
      thumbnail: pageMap[result.title]?.thumbnail,
      url:
        pageMap[result.title]?.url ||
        `https://en.wikipedia.org/wiki/${encodeURIComponent(result.title)}`,
    }));
  } catch (error) {
    console.error("Wikipedia API error:", error);
    throw error;
  }
}

export default { searchWikipedia };
