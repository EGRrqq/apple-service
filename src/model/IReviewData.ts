// compose blocks
export interface IReviewData {
  feed: {
    author: IReviewAuthor;
    entry: IReview[] | IReview | undefined;
    updated: IReviewLabel;
    rights: IReviewLabel;
    title: IReviewLabel;
    icon: IReviewLabel;
    link: IReviewLink[];
    id: IReviewLabel;
  };
}

// blocks
interface IReview {
  author: IReviewAuthor;
  updated: IReviewLabel;
  "im:rating": IReviewLabel;
  "im:version": IReviewLabel;
  id: IReviewLabel;
  title: IReviewLabel;
  content: {
    label: IReviewLabel["label"];
    attributes: {
      type: "text";
    };
  };
  link: IReviewLink;
  "im:voteSum": IReviewLabel;
  "im:contentType": {
    attributes: {
      term: "Application";
      label: "Application";
    };
  };
  "im:voteCount": IReviewLabel;
}

interface IReviewLink {
  attributes: {
    rel:
      | "related"
      | "alternate"
      | "self"
      | "first"
      | "last"
      | "previous"
      | "next";
    type?: "text/html";
    href: string;
  };
}

interface IReviewAuthor {
  name: IReviewLabel;
  uri: IReviewLabel;
  label?: IReviewLabel["label"];
}

interface IReviewLabel {
  label: string;
}

