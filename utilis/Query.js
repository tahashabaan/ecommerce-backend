class Query {
  constructor(mongoseQuery, query) {
    this.mongoseQuery = mongoseQuery;
    this.query = query;
  }

  filter() {
    let queryObj = { ...this.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((item) => delete queryObj[item]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    queryObj = JSON.parse(queryStr);

    this.mongoseQuery = this.mongoseQuery.find(queryObj);

    return this;
  }

  paginate(countDoc) {
    const page = this.query.page * 1 || 1;
    const limit = this.query.limit * 1 || 20;
    const skip = (page - 1) * limit;
    const endIndex = page * limit;

    const pagination = {};
    pagination.currentPage = page;
    pagination.limit = limit;
    pagination.totalPage = Math.ceil(countDoc / limit);
    pagination.prePage = page > 1 ? page - 1 : 1;
    pagination.nextPage =
      page < pagination.totalPage ? page + 1 : pagination.totalPage;

    this.mongoseQuery = this.mongoseQuery.find().skip(skip).limit(limit);

    this.paginateResults = pagination;

    return this;
  }

  sort() {
    if (this.query.sort) {
      const sortBy = this.query.sort.split(",").join(" ");
      this.mongoseQuery = this.mongoseQuery.sort(sortBy);
    } else this.mongoseQuery = this.mongoseQuery.sort({ createdAt: -1 });

    return this;
  }

  search() {
    if (this.query.search) {
      const searchBy = this.query.search.split(",").join(" ");
      this.mongoseQuery = this.mongoseQuery.find(searchBy);
    }
    return this;
  }
}

module.exports = Query;
