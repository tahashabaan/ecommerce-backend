const asyncHandler = require("express-async-handler");
const ApiError = require("../../utilis/apiError");
const ApiFeature = require("../../utilis/apiFeature");

// @desc   read a  documents from database
// @route  get api/v1/documents
// @acess  public
exports.getDocuments = (Model) =>
  asyncHandler(async (req, res, next) => {
    const countDoc = await Model.countDocuments();
    const apiFeature = new ApiFeature(Model.find(req.filterObj), req.query)
      .paginate(countDoc)
      .filter()
      .fileds()
      .sort()
      .search();
    const { mongooseQuery, paginateResults } = apiFeature;
    //execute
    const document = await mongooseQuery;
    res.status(201).json({
      result: document.length,
      paginate: paginateResults,
      data: document,
    });
  });

// @desc   create a new document in database
// @route  post api/v1/document
// @acess  private
exports.createDocument = (Model) =>
  asyncHandler(async (req, res, next) => {
    await Model.create(req.body);
    res.status(201).json({ message: "document added successfully" });
    next();
  });

// @desc   updata a  document from database
// @route  get api/v1/documents
// @acess  private
exports.updataDocumentById = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndUpdate(id, req.body);
    if (!document) return next(new ApiError("document not found", 404));

    document.save();
    res.status(201).json({ data: "document updated successfully" });
  });

exports.getDocumentById = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findById(id);
    console.log(document);
    res.status(201).json({ data: document });

    // .populate({path:"catagory", select:"name -_id" }); ;
  });
// @desc       del data from database
// @route      del api/v1/feature
// @access     private
exports.deleteDocumentById = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id);
    if (!document)
      return next(new ApiError("No document found with that ID", 404));

    // document.remove();
    res.status(200).json({ message: `the document is removed  ` });
  });
