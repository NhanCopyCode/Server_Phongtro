import * as provinceService from '../services/provinceService';

const getAllProvince = async (req, res) => {
    try {
        const response = await provinceService.getAllProvinceService();

        return res.status(200).json(response);
    } catch (error) {
        return {
            message: "Error at file province controller: " + error
        }
    }
}

export { getAllProvince };