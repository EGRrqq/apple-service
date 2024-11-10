import { ReviewService } from "@/service/AppReviewService/ReviewService";
import { Test } from "../_framework";
import type { IReviewData } from "@/model/IReviewData";

const { getReviewData } = new ReviewService();

const instAppId = 389801252;

(async () => {
  const data = await getReviewData({ appId: instAppId });
  const reviews = data.feed.entry;
  new Test<IReviewData["feed"]["entry"]>(
    "get reviews from instagram appStore"
  ).isDefined(reviews);
})();

