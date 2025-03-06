import * as insertService from "../services/insertService";

const insertData = async (req, res) => {

	try {
		const response = await insertService.insertDataService();
		console.log("response", response);
		return res.status(201).json(response);
	} catch (error) {
		return res.status(500).json({
			errorCode: -1,
			message: "Fail at authController!" + error,
		});
	}
};

export { insertData };
