// src/utils/rateLimit.ts
const LRU = require("lru-cache");

const tokenCache = new LRU({
  max: 500,
  ttl: 60 * 1000, // 1 minute
});

export const rateLimit = {
  check: (res: any, limit: number, token: string) =>
    new Promise<void>((resolve, reject) => {
      const tokenCount = (tokenCache.get(token) as number[]) || [0];
      if (tokenCount[0] === 0) {
        tokenCache.set(token, [1]);
      } else {
        tokenCount[0] += 1;
        tokenCache.set(token, tokenCount);
      }
      const currentUsage = tokenCount[0];
      const isRateLimited = currentUsage >= limit;
      res.setHeader("X-RateLimit-Limit", limit);
      res.setHeader(
        "X-RateLimit-Remaining",
        isRateLimited ? 0 : limit - currentUsage
      );

      return isRateLimited ? reject() : resolve();
    }),
};
