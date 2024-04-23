const { createCat, getAllCategories } = require('../services/category-service')

const getCategories = async (req, res) => {
    try {
        const response = await getAllCategories();
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const createCategory = async (req, res) => {
    try {
        const response = await createCat(req.body);
        res.status(200).json({ status: true })
    } catch (error) {
        const status = error?.status ? error.status : 500;
        res.status(status).json({
            message: error.message
        })
    }
}

module.exports={
    createCategory,
    getCategories
}