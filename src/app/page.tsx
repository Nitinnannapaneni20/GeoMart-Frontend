"use client";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { fetchProductsDataByLocation, fetchPromotionProductsByLocation } from "@/services/Apis";

// Define interfaces for our data structures
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

interface DataState {
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

export default function HomePage() {
  const [data, setData] = useState<DataState>({ categories: [], productTypes: [], products: [] });
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [filteredTypes, setFilteredTypes] = useState<ProductType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [promotionProducts, setPromotionProducts] = useState<Product[]>([]);
  const [isFiltering, setIsFiltering] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const locationId = 1;
      try {
        const result = await fetchProductsDataByLocation(locationId);
        const promotedProducts = await fetchPromotionProductsByLocation(locationId) as PromotionResponse;

        if (promotedProducts) {
          setPromotionProducts(promotedProducts.specials.map(special => special.Product));
        }
        if (result) {
          setData(result as DataState);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = parseInt(e.target.value);
    setSelectedCategory(categoryId.toString());
    setFilteredTypes(data.productTypes.filter((type) => type.CategoryID === categoryId));
    setFilteredProducts([]);
    setSelectedType("");
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const typeId = parseInt(e.target.value);
    setSelectedType(typeId.toString());
    setFilteredProducts(data.products.filter((product) => product.TypeID === typeId));
  };

  const handleSearch = () => {
    setSearchResults(filteredProducts);
    setIsFiltering(true);
  };

  const handleClearFilters = async () => {
    setSelectedCategory("");
    setSelectedType("");
    setFilteredTypes([]);
    setFilteredProducts([]);
    setSearchResults([]);
    setIsFiltering(false);
    try {
      const promotedProducts = await fetchPromotionProductsByLocation(1) as PromotionResponse;
      if (promotedProducts) {
        setPromotionProducts(promotedProducts.specials.map(special => special.Product));
      }
    } catch (error) {
      console.error('Error fetching promotion products:', error);
    }
  };

  return (
    <>
      <Header />
      <main className="bg-gray-300 dark:bg-gray-900 min-h-screen pt-20">
        {/* Banner Section */}
        <div className="relative w-full h-80 bg-cover bg-center bg-[url('/your-banner-image.jpg')] flex items-center justify-center text-white text-2xl font-bold">
          <div className="bg-black/50 w-full h-full flex items-center justify-center">
            <p>🚀 Special Offers & Discounts Available!</p>
          </div>
        </div>

        {/* Search Section */}
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-100 dark:bg-gray-800 shadow-lg rounded-xl border border-gray-200 dark:border-none">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 text-center">Find Your Product</h2>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <select className="p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500" value={selectedCategory} onChange={handleCategoryChange}>
              <option value="">Select Category</option>
              {data.categories.map((cat) => (
                <option key={cat.ID} value={cat.ID}>{cat.Name}</option>
              ))}
            </select>

            <select className="p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500" value={selectedType} onChange={handleTypeChange} disabled={!selectedCategory}>
              <option value="">Select Product Type</option>
              {filteredTypes.map((type) => (
                <option key={type.ID} value={type.ID}>{type.Name}</option>
              ))}
            </select>

            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow-md" onClick={handleSearch}>Search</button>
            <button className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg shadow-md" onClick={handleClearFilters}>Clear Filters</button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="max-w-6xl mx-auto mt-10">
          {isFiltering ? (
            searchResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {searchResults.map((prod) => (
                  <div key={prod.ID} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
                    <img src={prod.ImageURL} alt={prod.Name} className="w-full h-40 object-cover rounded-lg" />
                    <h4 className="mt-2 font-semibold">{prod.Name}</h4>
                    <p className="text-gray-600">{prod.Brand}</p>
                    <p className="text-indigo-600 font-bold">₹{prod.Cost}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center mt-6">No products found for the selected filters.</p>
            )
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {promotionProducts.map((prod) => (
                <div key={prod.ID} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
                  <img src={prod.ImageURL} alt={prod.Name} className="w-full h-40 object-cover rounded-lg" />
                  <h4 className="mt-2 font-semibold">{prod.Name}</h4>
                  <p className="text-gray-600">{prod.Brand}</p>
                  <p className="text-indigo-600 font-bold">₹{prod.Cost}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <footer className="bg-gray-800 text-white text-center py-4">
        &copy; 2027 GeoMart - Your trusted grocery partner.
      </footer>
    </>
  );
}