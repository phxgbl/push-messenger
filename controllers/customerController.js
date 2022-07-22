const CustomerModel = require('../models/customer');
const reader = require('xlsx');
const config = require('config')
const settings = config.get('settings');

const getAllCustomers = async () => {
    try {
        const customerData = await CustomerModel.find();
        return customerData
    } catch (err) {
        console.log(err);
        return {};
    }
}

const uploadUserData = async (excelFilePath) => {
    try {
        const excelFile = reader.readFile(excelFilePath)
        let data = []
        const sheets = excelFile.SheetNames
        for (let i = 0; i < sheets.length; i++) {
            const temp = reader.utils.sheet_to_json(
                excelFile.Sheets[excelFile.SheetNames[i]])
            temp.forEach((res) => {
                data.push(res)
            })
        }
        const tranformedExcel = _transformExcelDataToOnlyRequiredFields(data, settings.excel.fields);
        const cleanedData = await _cleanTransformedData(tranformedExcel);
        if(!IsEmptyArray(cleanedData)){
            await CustomerModel.insertMany(cleanedData);
        }
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }

}

const _transformExcelDataToOnlyRequiredFields = (data, fields) => {
    return data.map(doc => {
        const newDoc = {};
        fields.forEach(field => newDoc[field] = doc[field])
        return newDoc;
    });
}

const _cleanTransformedData = async (data) => {
    const cleanedData = [];
    for (doc of data) {
        if(
            !doc.hasOwnProperty('fullname')
            ||!doc.hasOwnProperty('mobile')
            ||!doc.hasOwnProperty('email')
        ){continue;}
        if(doc.fullname===undefined||doc.mobile===undefined||doc.email===undefined){continue;}
        const dbDoc = await CustomerModel.findOne({ mobile: doc.mobile })
        console.log(IsEmptyObject(dbDoc))
        console.log(IsValidString(doc.fullname))
        if (IsEmptyObject(dbDoc)){ cleanedData.push(doc); }
    }
    return cleanedData;
}

//Move to helper
const IsEmptyObject = obj => !(typeof (obj) === 'object' && !(obj instanceof Array) && obj !== null && Object.keys(obj).length > 0);
const IsEmptyArray = arr => !(IsArray(arr) && arr.length > 0);
const IsValidString = str => (typeof (str) === 'string' && str.trim().length > 0);

const customerController = {
    getAllCustomers,
    uploadUserData
}

module.exports = customerController;