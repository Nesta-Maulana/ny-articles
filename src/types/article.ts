export interface NYTArticle {
  abstract?: string;
  web_url: string;
  snippet: string;
  source: string;
  multimedia?: NYTMultimedia;
  headline: {
    main: string;
    kicker?: string | null;
    print_headline?: string | null;
  };
  keywords: NYTKeyword[];
  pub_date: string;
  document_type: string;
  news_desk: string;
  section_name: string;
  print_section?: string;
  print_page?: string;
  byline: {
    original: string;
  };
  type_of_material: string;
  _id: string;
  word_count: number;
  uri: string;
  subsection_name?: string;
}

export interface NYTMultimedia {
  caption?: string | null;
  credit?: string | null;
  default?: {
    url: string;
    height: number;
    width: number;
  };
  thumbnail?: {
    url: string;
    height: number;
    width: number;
  };
}

export interface NYTKeyword {
  name: string;
  value: string;
  rank: number;
  major: string;
}

export interface NYTPerson {
  firstname: string;
  middlename?: string | null;
  lastname: string;
  qualifier?: string | null;
  title?: string | null;
  role: string;
  organization: string;
  rank: number;
}

export interface NYTSearchResponse {
  status: string;
  copyright: string;
  response: {
    docs: NYTArticle[];
    meta: {
      hits: number;
      offset: number;
      time: number;
    };
  };
}

export interface SearchParams {
  q: string;
  page?: number;
  sort?: 'newest' | 'oldest' | 'relevance';
  beginDate?: string;
  endDate?: string;
}