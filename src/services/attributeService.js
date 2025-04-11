import db from "../models"

const insertAttributeService = async (data) => {
    const { id, price, acreage, published } = data;
    try {
        const response = await db.Attribute.create({
            id,
            price,
            acreage,
            published,
        })

        return {
            message: "Successfully insert attributes",
            data: response,
        }
    } catch (error) {
        return {
            message: "Error at attribute service file: " + error,
        }
    }
}


export {
    insertAttributeService
}