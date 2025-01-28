import { sleep } from "@/utils";
import fixtures from "./hnPostsFixtures";

export default async () => {
  try {
    const URL = "https://api.hackerwebapp.com/news";

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    
    const response: Response = await fetch(URL, options);
    console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const posts: Hackernews[] = await response.json();
    console.log(posts);
    return posts;
    
  } catch (error) {
    console.error(error);
    return [];
  }
};
