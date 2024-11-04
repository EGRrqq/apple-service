import type { IAppStoreLink } from "@/model/ILinks";

import { StoreService } from "@/service/AppStoreService";
import { Test } from "../_framework/";

const { getAppStoreLink } = new StoreService();

const linkData: IAppStoreLink = {
  data: { appId: 123, countryCode: "fi" },
  option: "see-all=reviews",
};

const expect = `https://apps.apple.com/${linkData.data.countryCode}/app/id${linkData.data.appId}?${linkData.option}`;

new Test<string>("get app store reviews link")
  .expect(getAppStoreLink(linkData))
  .toBe(expect);
