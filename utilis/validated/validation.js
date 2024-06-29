const {validationResult} = require('express-validator');

module.exports = validationMidllware( validations =>  // array of validad[check('name).notEmpty, check]
 async (req, res, next) => {
  for(const validation of validations){
    const result = await validation.run(req);
    if(result.errors.length) break;
  }

 const errors = validationResult(req);

 if(!errors.isEmpty()){
   return res.status(400).json({errors:errors.array()});
 }
  next();
}
) 