import { getCategoriesService } from "../services/categoryService";

const getCategories = async (req, res) => {
	try {
		const response = await getCategoriesService();
		console.log("response", response);

		return res.status(200).json(response);
	} catch (error) {
		return res.status(500).json({
			message: "Error at file navigate controller: " + error,
		});
	}
};

export { getCategories };
