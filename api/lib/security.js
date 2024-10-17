const bcrypt = require('bcrypt');

exports.generateHash = async function (inputString) {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(inputString, salt);
    } catch (err) {
        return null;
    };
};

exports.checkHash = async function (inputString, hash) {
    return await bcrypt.compare(inputString, hash);
};