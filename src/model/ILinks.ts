import type { TCountryCode } from "./TCodes";

export interface IAppStoreLink {
  data: Pick<IReviewLink, "appId" | "countryCode">;
  option?: "see-all=reviews" | "action=write-review";
}

export interface IReviewLink {
  appId: number;
  countryCode?: TCountryCode;
  page?: number;
  dataType?: "xml" | "json";
}
