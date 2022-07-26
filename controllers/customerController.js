const CustomerModel = require('../models/customer');
const reader = require('xlsx');
const config = require('config')
const settings = config.get('settings');
const helpers=require('./common/helpers')
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
        const tranformedExcel = helpers.transformExcelDataToOnlyRequiredFields(data, settings.excel.customerFields);
        const cleanedData = await helpers.cleanTransformedData(tranformedExcel,CustomerModel);
        if(!IsEmptyArray(cleanedData)){
            await CustomerModel.insertMany(cleanedData);
        }
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }

}

const incrementContact = async (userId)=>{
    try{
        const dbDoc = await CustomerModel.findById(userId)
        let contacted = dbDoc.contacted;
        await CustomerModel.findByIdAndUpdate(userId,{contacted:contacted+1});
        return true;
    }catch(err){
        console.log(err)
        return false;
    }
     

}

const customerController = {
    getAllCustomers,
    uploadUserData,
    incrementContact
}

module.exports = customerController;