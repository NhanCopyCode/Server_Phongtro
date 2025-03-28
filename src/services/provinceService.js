import db from "../models"
const getAllProvinceService = async() => {
    try {
        const response = await db.Province.findAll();

        return response;
    } catch (error) {
        return {
            errorCode: -1,
            message: "Error at province service file: " + error,
        }
    }
}


export {
    getAllProvinceService
}