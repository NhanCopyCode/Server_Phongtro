import * as acreagesService from '../services/acreageService';

const getAllAcreages = async (req, res) => {
    try {
        const response = await acreagesService.getAllAcreagesService();

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            errorCode: -1,
            message: "Error at acreage controller file: " + error,
        })
    }
}

export {
    getAllAcreages
}