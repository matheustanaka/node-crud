const notFoundError = (res) => {
    return res.status(404).json({ error: "Este dado não foi encontrado" });
};

module.exports = {
    notFoundError,
};
