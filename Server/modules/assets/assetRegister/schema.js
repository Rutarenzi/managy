const Joi = require('joi')


/**
 *Fields
  [Department, 
  FunctionalLocation,
  AssetCategory, 
  AssetItem, 
  AssetCode, 
  Description, 
  ServiceStatus, 
  AssetCondition, 
  SerialNo, 
  Note, 
  Manufacturer, 
  Brand, 
  Model, 
  Vendor, 
  AcquisitionDate, 
  AcquisitionValue, 
  DepreciationRate, 
  ResidualValue, 
  Re-evaluationValue, 
  Re-evaluationDate, 
  AssetPhoto!]
 */

const assetSchema = Joi.object({
    department: Joi.string().required(),    
    functionalLocation: Joi.string().required(),
    assetCategory: Joi.string().required(),
    assetItem:Joi.string().required(),
    assetCode:Joi.string().required(),
    description:Joi.string().required(),
    serviceStatus:Joi.string().required(),
    assetCondition:Joi.string().required(),
    serialNo:Joi.string().required(),
    note:Joi.string().required(),
    manufacturer:Joi.string().required(),
    brand:Joi.string().required(),
    model:Joi.string().required(),
    vendor:Joi.string().required(),
    acquisitionDate:Joi.date().required(),
    acquisitionValue:Joi.number().required(),  
    depreciationRate: Joi.number().required(),
    residualValue: Joi.number().required() ,
    reEvaluationValue: Joi.number().required(),
    reEvaluationDate: Joi.date().required(), 
})


module.exports.assetSchema = assetSchema 