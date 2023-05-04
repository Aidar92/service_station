declare module '*.json' {
  const content: any;
  export default content;
}

declare module '*.yml' {
  const content: any;
  export default content;
}

declare module '*.yaml' {
  const content: any;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.txt' {
  const content: string;
  export default content;
}

declare module '*.css' {
  const style: any;
  export default style;
}

declare module '*.scss' {
  const style: any;
  export default style;
}

type FIXME_any = any;

type PaginationParams = {
  page: number;
  size: number;
  sort: string[][];
  filter: string[][];
};

type PaginatedResponse<C> = {
  content: C[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
  };
  size: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  totalElements: number;
  totalPages: number;
};
