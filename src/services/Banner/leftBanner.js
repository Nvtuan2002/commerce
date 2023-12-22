import axios from "axios";

export const getLeftBanner = async () => {
    const data = await axios.get("https://backoffice.nodemy.vn/api/homepage?populate=*");
    const response = data.data.data.attributes.leftBanner.data;
    return { response };
}