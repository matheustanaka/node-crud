const notAllowedFieldsToUpdateError = (res) => {
    return res
        .status(500)
        .json({ error: "Um ou mais campos não são editáveis" });
};

module.exports = {
    notAllowedFieldsToUpdateError,
};
