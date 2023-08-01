class PaginationService {
    public static generatePaginationQuery(size, index, searchKey) {
      const pageSize = parseInt(size as string);
      const pageIndex = parseInt(index as string);
      let paginate;
      if (pageIndex && pageSize) {
        paginate = !searchKey
          ? {
              offset: (pageIndex - 1) * pageSize,
              limit: pageSize,
            }
          : {};
      }
      return { paginate, pageSize, pageIndex };
    }
    public static generatePaginationData(searchKey, dataByQuery, pageSize, pageIndex) {
      return searchKey
        ? {}
        : {
            totalCount: dataByQuery.count,
            totalPages: Math.ceil(dataByQuery.count / pageSize),
            pageSize,
            pageIndex,
          };
    }
  }
  
  export default PaginationService;
  