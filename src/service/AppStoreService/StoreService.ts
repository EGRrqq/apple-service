import type { IAppStoreLink } from "@/model/ILinks";

// compose types into single interface
interface IStoreService {
  getAppStoreLink: ({ data, option }: IAppStoreLink) => string;
}

export class StoreService implements IStoreService {
  // get appStore link
  getAppStoreLink = ({ data, option }: IAppStoreLink) =>
    `https://apps.apple.com/${data.countryCode || "us"}/app/id${data.appId}${
      option && `?${option}`
    }`;
}
