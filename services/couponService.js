const cuponModal = require('../modlas/cuponModal');

const {
    getDocuments,
    createDocument,
    getDocumentById,
    updataDocumentById,
    deleteDocumentById} =require('./handle/handlersFactory')
// @desc       create brand modal  from database
// @route      post api/v1/brand
// @access     private

exports.createCuponModal =createDocument(cuponModal);

// @desc       gete data od brand modal from database
// @route      get api/v1/brand
// @access     public
exports.getCuponModal = getDocuments(cuponModal);

// @desc  get data from database by id cuponModal
// @route get api/v1/brand
// @acess public
exports.getCuponModalById = getDocumentById(cuponModal);


// @desc  updata brand in database by id 
// @route put api/v1/brand
// @acess public
exports.updataCuponModalById = updataDocumentById(cuponModal);

// @desc  delete brand from database by id 
// @route delete api/v1/brand
// @acess public
exports.delCuponModalById = deleteDocumentById(cuponModal);