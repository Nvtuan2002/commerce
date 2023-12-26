import axios from "axios";

export const getBanner = async () => {
    const data = await axios.get("https://backoffice.nodemy.vn/api/homepage?populate=*");
    const response = data.data.data.attributes;
    return { response };
}