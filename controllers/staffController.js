const StaffModel = require('../models/staff');
const reader = require('xlsx');
const config = require('config')
const settings = config.get('settings');
const helpers = require('./common/helpers')
const getAllstaffs = async () => {
    try {
        const staffData = await StaffModel.find();
        return staffData;
    } catch (err) {
        console.log(err);
        return {};
    }
}

const uploadStaffData = async (excelFilePath) => {
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
        const tranformedExcel = helpers.transformExcelDataToOnlyRequiredFields(data, settings.excel.staffFields);
        const cleanedData = await helpers.cleanTransformedData(tranformedExcel, StaffModel);
        if (!helpers.IsEmptyArray(cleanedData)) {
            await StaffModel.insertMany(cleanedData);
        }
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }

}



const getStaffById = async (userId) => {
    try {
        return await StaffModel.findById(userId)
    } catch (err) {
        console.log(err)
        return false;
    }
}

const getStaffByEmail = async (email) => {
    try {
        return await StaffModel.findOne({ email: email })
    } catch (err) {
        console.log(err)
        return false;
    }
}


const incrementContact = async (userId) => {
    try {
        const dbDoc = await StaffModel.findById(userId)
        let contacted = dbDoc.contacted;
        await StaffModel.findByIdAndUpdate(userId, { contacted: contacted + 1 });
        return true;
    } catch (err) {
        console.log(err)
        return false;
    }


}

const customerController = {
    getAllstaffs,
    uploadStaffData,
    incrementContact,
    getStaffById,
    getStaffByEmail
}

module.exports = customerController;