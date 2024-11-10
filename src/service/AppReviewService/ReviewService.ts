import type { IReviewLink } from "@/model/ILinks";
import type { IReviewData } from "@/model/IReviewData";

// types for service methods
type TGetReviewData = (props: IReviewLink) => Promise<IReviewData>;

// compose types into single interface
interface IReviewService {
  getReviewData: TGetReviewData;
}

export class ReviewService implements IReviewService {
  // get app reviews
  getReviewData: TGetReviewData = async (linkData) => {
    const res = await fetch(this.#getFetchReviewsLink(linkData));
    const data: IReviewData = await res.json();

    return data;
  };

  // get link to fetching reviews
  #getFetchReviewsLink = ({
    appId,
    dataType = "json",
    countryCode = "us",
    page = 1,
  }: IReviewLink) =>
    `https://itunes.apple.com/${countryCode}/rss/customerreviews/page=${page}/id=${appId}/sortBy=mostRecent/${dataType}?l=en&cc=gb`;
}
