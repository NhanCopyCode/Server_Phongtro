import * as authService from "../services/authService";

const register = async (req, res) => {
	const { name, password, phone } = req.body;

	try {
		if (!name || !password || !phone) {
			console.log("Register::", req.body);
			return res.status(500).json({
				errorCode: -1,
				message: "Missing field input!",
			});
		}
		const response = await authService.registerService(req.body);

		return res.status(201).json(response);
	} catch (error) {
		return res.status(500).json({
			errorCode: -1,
			message: "Fail at authController!" + error,
		});
	}
};

const login = async (req, res) => {
	try {
		const { phone, password } = req.body;
		if (!phone || !password) {
			return res.status(500).json({
				errorCode: -1,
				message: "Missing field input!!",
			});
		}

		console.log(`authController login::${JSON.stringify(req.body)}`);
		const response = await authService.loginService(req.body);
		return res.status(200).json(response);
	} catch (error) {
		return res.status(500).json({
			errorCode: -1,
			message: "Fail at authController" + error,
		});
	}
};

export { register, login };
