// Define interfaces for API responses
interface Product {
  ID: number;
  Name: string;
  Brand: string;
  Cost: number;
  ImageURL: string;
  TypeID: number;
}

interface Category {
  ID: number;
  Name: string;
}

interface ProductType {
  ID: number;
  Name: string;
  CategoryID: number;
}

interface ProductsData {
  categories: Category[];
  productTypes: ProductType[];
  products: Product[];
}

interface PromotionProduct {
  Product: Product;
}

interface PromotionResponse {
  specials: PromotionProduct[];
}

const API_BASE_URL = "http://localhost:8080/api";

// Fetch product data by location_id
export const fetchProductsDataByLocation = async (locationId: number): Promise<ProductsData | null> => {
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

export const fetchPromotionProductsByLocation = async (locationId: number): Promise<PromotionResponse | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/special-products-data?location_id=${locationId}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch products data:", error);
    return null;
  }
};