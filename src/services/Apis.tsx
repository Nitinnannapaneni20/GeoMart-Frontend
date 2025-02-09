const API_BASE_URL = "http://localhost:8080/api";

// Fetch product data by location_id
export const fetchProductsDataByLocation = async (locationId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products-data?location_id=${locationId}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch products data:", error);
    return null;
  }
};

export const fetchPromotionProductsByLocation = async (locationId) => {
    try{
        const response = await fetch(`${API_BASE_URL}/special-products-data?location_id=${locationId}`);
        if(!response.ok){
            throw new Error(`Error: ${response.status}`);
        }
        return await response.json();
    }
    catch (error) {
         console.error("Failed to fetch products data:", error);
         return null;
    }
}