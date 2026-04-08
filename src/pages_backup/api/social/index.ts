import type { NextApiRequest, NextApiResponse } from "next";
import { SocialBlog } from "@/types/socialblog";

// Fetch LinkedIn posts
async function fetchLinkedIn(): Promise<SocialBlog[]> {
  try {
    const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
    const personId = process.env.LINKEDIN_PERSON_ID;

    if (!accessToken || !personId) return [];

    const response = await fetch(
      `https://api.linkedin.com/v2/ugcPosts?q=authors&authors=List(urn:li:person:${personId})&count=5`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "X-Restli-Protocol-Version": "2.0.0",
        },
      }
    );

    const data = await response.json();

    if (!Array.isArray(data.elements)) return [];

    return data.elements.map((el:any) => {
      const message =
        el.specificContent?.["com.linkedin.ugc.ShareContent"]?.shareCommentary
          ?.text || "";
      return {
        id: el.id,
        title: message.substring(0, 50) || "LinkedIn Post",
        content: message,
        author: el.author || "LinkedIn",
        createdAt: el.created?.time
          ? new Date(el.created.time).toISOString()
          : new Date().toISOString(),
        updatedAt: el.lastModified?.time
          ? new Date(el.lastModified.time).toISOString()
          : undefined,
        tags: ["LinkedIn"],
        slug: el.id,
        source: "LinkedIn",
        url: el.id
          ? `https://www.linkedin.com/feed/update/${el.id}`
          : "https://www.linkedin.com",
      };
    });
  } catch (err) {
    console.error("LinkedIn error:", err);
    return [];
  }
}

// Fetch Twitter (X) posts
async function fetchTwitter(): Promise<SocialBlog[]> {
  try {
    const token = process.env.TWITTER_BEARER_TOKEN;
    const username = process.env.TWITTER_USERNAME;

    if (!token || !username) return [];

    // Step 1: Get user ID
    const userResp = await fetch(
      `https://api.twitter.com/2/users/by/username/${username}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const userData = await userResp.json();
    const userId = userData?.data?.id;
    if (!userId) return [];

    // Step 2: Fetch tweets
    const tweetResp = await fetch(
      `https://api.twitter.com/2/users/${userId}/tweets?max_results=5&tweet.fields=created_at`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const tweetData = await tweetResp.json();

    if (!Array.isArray(tweetData.data)) return [];

    return tweetData.data.map((tweet: any) => ({
      id: tweet.id,
      title: tweet.text.substring(0, 50) || "Tweet",
      content: tweet.text,
      author: username,
      createdAt: tweet.created_at,
      tags: ["Twitter"],
      slug: tweet.id,
      source: "Twitter",
      url: `https://twitter.com/${username}/status/${tweet.id}`,
    }));
  } catch (err) {
    console.error("Twitter error:", err);
    return [];
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const [linkedin, twitter] = await Promise.all([
    fetchLinkedIn(),
    fetchTwitter(),
  ]);

  // Merge + sort (newest first)
  const posts = [...linkedin, ...twitter].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  res.status(200).json(posts);
}
