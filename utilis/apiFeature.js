/* eslint-disable no-unused-expressions */
/* eslint-disable no-plusplus */

class ApiFeature {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }

  filter() {
    let queryObject = { ...this.queryString };

    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((item) => delete queryObject[item]);

    let queryStr = JSON.stringify(queryObject);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    queryObject = JSON.parse(queryStr);
    console.log(queryObject, queryStr);

    this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr));

    return this;
  }

  paginate(countDocumment) {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 20;
    const skip = (page - 1) * limit;
    const endIndex = page * limit;

    // const countDocumment =  this.mongooseQuery.countDocuments();
    // pagination.prePage = page>1? --page: 1;
    // pagination.nextPage =page<=pagination.totalPage? ++page: pagination.totalPage;

    const pagination = {};
    pagination.currentPage = page;
    pagination.limit = limit;
    pagination.totalPage = Math.ceil(countDocumment / limit);
    pagination.prePage = page > 1 ? page - 1 : 1;
    pagination.nextPage =
      page < pagination.totalPage ? page + 1 : pagination.totalPage;

    // if (endIndex < countDocumment) pagination.nextPage += 1;
    // if (skip > 0) pagination.prePage -= 1;

    this.mongooseQuery = this.mongooseQuery.find().skip(skip).limit(limit);
    // .populate('catagory');

    this.paginateResults = pagination;

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.sort(sortBy);
    } else this.mongooseQuery = this.mongooseQuery.sort({ createdAt: -1 });

    return this;
  }

  search() {
    if (this.queryString.title || this.queryString.description) {
      this.queryString.title = new RegExp(this.queryString.title, "i");
      this.queryString.description = new RegExp(
        this.queryString.description,
        "i"
      );

      this.mongooseQuery = this.mongooseQuery.find({ ...this.queryString });
    }
    return this;
  }

  fileds() {
    if (this.queryString.fields) {
      const fileds = this.queryString.fields.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.select(fileds);
    }
    return this;
  }
}

module.exports = ApiFeature;
