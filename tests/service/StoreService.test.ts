import type { IAppStoreLink } from "@/model/ILinks";
import type { ITestCallback } from "../_framework/model/ITestEntity";

import { StoreService } from "@/service/AppStoreService";
import { test } from "../_framework/testRunner";

const { getAppStoreLink } = new StoreService();

const linkData: IAppStoreLink = {
  data: { appId: 123, countryCode: "fi" },
  option: "see-all=reviews",
};

const linkEntity: ITestCallback["testEntity"] = {
  name: "get app store reviews link",
  entry: getAppStoreLink(linkData),
  expect: `https://apps.apple.com/${linkData.data.countryCode}/app/id${linkData.data.appId}?${linkData.option}`,
};

test(async () => linkEntity);
