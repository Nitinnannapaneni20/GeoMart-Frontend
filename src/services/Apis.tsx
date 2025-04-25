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

interface Order {
  items: any[];
  total_amount: number;
  currency: string;
  payment_status: string;
  transaction_id: string;
  user_id?: string;
}

const API_BASE_URL = 'https://api.geomart.co.uk/api';

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
    console.error("Failed to fetch promotion products:", error);
    return null;
  }
};


// POST /api/order/save
export const saveOrder = async (order: Order): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/order/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(order),
    });

    if (!response.ok) throw new Error("Failed to save order");

    const data = await response.json();
    console.log("✅ Order saved:", data);
    return true;
  } catch (error) {
    console.error("❌ Error saving order:", error);
    return false;
  }
};

// GET /api/orders/user
export const fetchUserOrders = async (): Promise<Order[] | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/user`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    if (!response.ok) throw new Error("Failed to fetch orders");

    const orders = await response.json();
    return orders;
  } catch (error) {
    console.error("❌ Error fetching order history:", error);
    return null;
  }
};
