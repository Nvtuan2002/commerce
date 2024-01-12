export const get64City = async () => {
    const response = await fetch("https://provinces.open-api.vn/api/?depth=3");
    const data = await response.json();
    return { data };
}

