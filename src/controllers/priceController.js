import * as priceService from '../services/priceService';

const getAllPrices = async (req, res) => {
	try {
        const response = await priceService.getAllPricesService();

        return res.status(200).json(response);
	} catch (error) {
        return {
            message: "Error at priceController file: " + error,
        }
    }
};

export { getAllPrices };
