const bcrypt = require('bcrypt');

async function generateHash(inputString) {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(inputString, salt);
    } catch (err) {
        return null;
    };
};

async function checkHash(inputString, hash) {
    return await bcrypt.compare(inputString, hash);
};

;(async () => {
    let hash = await generateHash('admin')

    console.log(await checkHash('admin', hash))

})();

