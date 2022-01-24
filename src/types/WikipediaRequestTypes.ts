export type WikipediaPageExtractResponseData = {
  query: {
    pages: {
      [id: string]: {
        pageId: number;
        title: string;
        extract: string;
        ns: number;
      };
    };
  };
};
