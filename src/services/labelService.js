const db = require("../models");

const insertLabelService = async (data) => {
    const { id, code, value} = data;
    try {
        const response = await db.Label.create({
            id, 
            code,
            value
        })

        return {
            message: "Successfully create label",
            data: response,
        }
    } catch (error) {
        return {
            message: "Error at label service file: " + error,
        }
    }
}


export {
    insertLabelService
}

