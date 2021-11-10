const notFoundError = (res) => {
    return res.status(404).json({ error: "Este dado não foi encontrado" });
};

const objectIdError = (res) => {
    return res.status(500).json({
        error: "Ocorreu um erro ao recuperar um dado no banco de dados",
    });
};

module.exports = {
    notFoundError,
    objectIdError,
};
