const { getAllUser, createUserService,createRoleService,getAllRole } = require('../services/user-service')
const getUser = async (req, res) => {
    try {
        const response = await getAllUser();
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json(error.message)
    }

}

const getRol = async (req, res) => {
    try {
        const response = await getAllRole();
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json(error.message)
    }

}

const createUser = async (req, res) => {
    try {
        const response = await createUserService(req.body);
        res.status(200).json({ status: true })
    } catch (error) {
        const status = error?.status ? error.status : 500;
        res.status(status).json({
            message: error.message
        })
    }
}

const createRoleUser = async (req, res) => {
    try {
        const response = await createRoleService(req.body);
        res.status(200).json({ status: true })
    } catch (error) {
        const status = error?.status ? error.status : 500;
        res.status(status).json({
            message: error.message
        })
    }
}




module.exports = {
    getUser,
    // getUserbyId,
    createUser,
    // deleteUserbyId,
    createRoleUser,
    getRol
}