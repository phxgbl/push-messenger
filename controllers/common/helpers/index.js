//Move to helper
const IsEmptyObject = obj => !(typeof (obj) === 'object' && !(obj instanceof Array) && obj !== null && Object.keys(obj).length > 0);
const IsEmptyArray = arr => !(IsArray(arr) && arr.length > 0);
const IsValidString = str => (typeof (str) === 'string' && str.trim().length > 0);
const IsArray = arr => (typeof (arr) === 'object' && arr instanceof Array);

const transformExcelDataToOnlyRequiredFields = (data, fields) => {
    return data.map(doc => {
        const newDoc = {};
        fields.forEach(field => newDoc[field] = doc[field])
        return newDoc;
    });
}

const cleanTransformedData = async (data,model) => {
    const cleanedData = [];
    for (doc of data) {
        if(
            !doc.hasOwnProperty('fullname')
            ||!doc.hasOwnProperty('mobile')
            ||!doc.hasOwnProperty('email')
        ){continue;}
        if(doc.fullname===undefined||doc.mobile===undefined||doc.email===undefined){continue;}
        if(doc.hasOwnProperty('login_enabled')){
            if(doc.login_enabled === undefined){
                continue;
            }
            if(doc.login_enabled===true||doc.login_enabled==='true'){
                if(!doc.hasOwnProperty('password')||doc.password===undefined){
                    continue;
                }
            }
            if(!doc.hasOwnProperty('role')||doc.role===undefined){
                continue;
            }
        }
        const dbDoc = await model.findOne({ mobile: doc.mobile })
        if (IsEmptyObject(dbDoc)){
            doc['contacted']=0
            cleanedData.push(doc);
        }
    }
    return cleanedData;
}

const helpers = {
    IsArray,
    IsEmptyArray,
    IsEmptyObject,
    IsValidString,
    transformExcelDataToOnlyRequiredFields,
    cleanTransformedData
}

module.exports = helpers;