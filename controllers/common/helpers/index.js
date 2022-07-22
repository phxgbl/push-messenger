//Move to helper
const IsEmptyObject = obj => !(typeof (obj) === 'object' && !(obj instanceof Array) && obj !== null && Object.keys(obj).length > 0);
const IsEmptyArray = arr => !(IsArray(arr) && arr.length > 0);
const IsValidString = str => (typeof (str) === 'string' && str.trim().length > 0);
const IsArray = arr => (typeof (arr) === 'object' && arr instanceof Array);

const helpers = {
    IsArray,
    IsEmptyArray,
    IsEmptyObject,
    IsValidString
}

module.exports = helpers;