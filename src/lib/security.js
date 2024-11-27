const bcrypt = require('bcrypt');

exports.checkHash = async function (inputString, hash) {
    return await bcrypt.compare(inputString, hash);
};

exports.generateHash = async function (inputString) {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(inputString, salt);
    } catch (err) {
        return null;
    };
};