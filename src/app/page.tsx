"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import {
  fetchProductsDataByLocation,
  fetchPromotionProductsByLocation,
} from "@/services/Apis";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Trash2,  // <-- new icons
} from "lucide-react";
import { useCart } from "./CartContext"; // Adjust path if needed
import useUser from "../hooks/useUser"; // Make sure this is imported if not already

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

interface Auth0User {
  given_name?: string;
  family_name?: string;
  email?: string;
  picture?: string;
}

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 2 ? 0 : prevIndex + 1));
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? 2 : prevIndex - 1));
  };

  return (
    <div className="relative w-full h-96 overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {/* Slide 1 */}
        <div className="w-full h-full flex-shrink-0 relative">
          <Image
            src="/banners/banner1.jpg"
            alt="Special Offer 1"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-5xl font-bold text-white mb-4">Special Offer 1</h1>
              <p className="text-2xl text-white/90">Fresh Discounts on Top Picks!</p>
            </div>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="w-full h-full flex-shrink-0 relative">
          <Image
            src="/banners/banner2.jpg"
            alt="Special Offer 2"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-5xl font-bold text-white mb-4">Special Offer 2</h1>
              <p className="text-2xl text-white/90">Daily Deals You Can`&apost Miss!</p>
            </div>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="w-full h-full flex-shrink-0 relative">
          <Image
            src="/banners/banner3.jpg"
            alt="Special Offer 3"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-5xl font-bold text-white mb-4">Special Offer 3</h1>
              <p className="text-2xl text-white/90">Your Essentials, On Sale Now!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {[0, 1, 2].map((index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              currentIndex === index ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default function HomePage() {
  const {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
  } = useCart();

  const [data, setData] = useState<DataState>({
    categories: [],
    productTypes: [],
    products: [],
  });
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [filteredTypes, setFilteredTypes] = useState<ProductType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [promotionProducts, setPromotionProducts] = useState<Product[]>([]);
  const [isFiltering, setIsFiltering] = useState<boolean>(false);
  const { user, isAuthenticated } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      const locationId = 1;
      try {
        const result = await fetchProductsDataByLocation(locationId);
        const promotedProducts = (await fetchPromotionProductsByLocation(
          locationId
        )) as PromotionResponse;

        if (promotedProducts) {
          setPromotionProducts(
            promotedProducts.specials.map((special) => special.Product)
          );
        }
        if (result) {
          setData(result as DataState);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
      const syncUser = async () => {
        if (!isAuthenticated || !user) return;

        try {
          const res = await fetch("/api/get-token");
          if (!res.ok) throw new Error("Failed to get token");

          const { idToken } = await res.json();

          const userData = {
            given_name: user.given_name,
            family_name: user.family_name,
            email: user.email,
            picture: user.picture,
          };

          const apiRes = await fetch("https://api.geomart.co.uk/api/profile/create-if-not-exist", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${idToken}`,
            },
            body: JSON.stringify(userData),
            credentials: "include",
          });

          if (!apiRes.ok) throw new Error(`Sync failed: ${apiRes.status}`);
          console.log("✅ User sync success");
        } catch (err) {
          console.error("❌ User sync failed:", err);
        }
      };

      syncUser();
    }, [isAuthenticated, user]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = parseInt(e.target.value);
    setSelectedCategory(categoryId.toString());
    setFilteredTypes(
      data.productTypes.filter((type) => type.CategoryID === categoryId)
    );
    setFilteredProducts([]);
    setSelectedType("");
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const typeId = parseInt(e.target.value);
    setSelectedType(typeId.toString());
    setFilteredProducts(
      data.products.filter((product) => product.TypeID === typeId)
    );
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
      const promotedProducts = (await fetchPromotionProductsByLocation(
        1
      )) as PromotionResponse;
      if (promotedProducts) {
        setPromotionProducts(
          promotedProducts.specials.map((special) => special.Product)
        );
      }
    } catch (error) {
      console.error("Error fetching promotion products:", error);
    }
  };

  // Helper to see if a product is already in cart
  const findCartItem = (id: number) =>
    cartItems.find((item) => item.id === id);

  const handleAddToCart = (prod: Product) => {
    addToCart({
      id: prod.ID,
      name: prod.Name,
      brand: prod.Brand,
      price: prod.Cost,
      imageUrl: prod.ImageURL,
    });
  };

  // Renders a single product card
  const renderProductCard = (prod: Product) => {
    const cartItem = findCartItem(prod.ID);

    return (
      <div
        key={prod.ID}
        className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
      >
        <div className="relative pb-[56.25%]">
          <Image
            src={prod.ImageURL}
            alt={prod.Name}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6">
          <h4 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
            {prod.Name}
          </h4>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">
            {prod.Brand}
          </p>
          <p className="text-2xl font-bold text-indigo-600">
            ₹{prod.Cost}
          </p>

          {/* If product is already in the cart, show +/-/remove; else show Add to cart */}
          {cartItem ? (
            <div className="flex items-center space-x-2 mt-4">
              <button
                onClick={() => updateQuantity(cartItem.id, -1)}
                className="p-2 bg-gray-200 dark:bg-gray-600 rounded"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-gray-900 dark:text-white font-semibold">
                {cartItem.quantity}
              </span>
              <button
                onClick={() => updateQuantity(cartItem.id, 1)}
                className="p-2 bg-gray-200 dark:bg-gray-600 rounded"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                onClick={() => removeFromCart(cartItem.id)}
                className="p-2 bg-red-500 dark:bg-red-600 text-white rounded"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleAddToCart(prod)}
              className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-100 dark:bg-gray-900 pt-16">
        <ImageCarousel />

        {/* Search Section */}
        <div className="max-w-5xl mx-auto mt-16 px-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Find Your Product
            </h2>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <select
                className="p-4 text-lg border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="">Select Category</option>
                {data.categories.map((cat) => (
                  <option key={cat.ID} value={cat.ID}>
                    {cat.Name}
                  </option>
                ))}
              </select>

              <select
                className="p-4 text-lg border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                value={selectedType}
                onChange={handleTypeChange}
                disabled={!selectedCategory}
              >
                <option value="">Select Product Type</option>
                {filteredTypes.map((type) => (
                  <option key={type.ID} value={type.ID}>
                    {type.Name}
                  </option>
                ))}
              </select>

              <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg transition-colors duration-200"
                onClick={handleSearch}
              >
                Search
              </button>
              <button
                className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg transition-colors duration-200"
                onClick={handleClearFilters}
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid Section */}
        <div className="max-w-7xl mx-auto mt-16 px-4 mb-16">
          {isFiltering ? (
            searchResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {searchResults.map((prod) => renderProductCard(prod))}
              </div>
            ) : (
              <p className="text-center text-xl text-gray-600 dark:text-gray-400 mt-8">
                No products found for the selected filters.
              </p>
            )
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {promotionProducts.map((prod) => renderProductCard(prod))}
            </div>
          )}
        </div>
      </main>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <div className="space-y-2">
                {/* Address */}
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <a
                    href="https://www.google.com/maps?q=123+Grocery+Street,+Market+City"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-indigo-400 transition-colors"
                  >
                    123 Grocery Street, Market City
                  </a>
                </div>
                {/* Phone */}
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  <a
                    href="tel:+12345678900"
                    className="hover:text-indigo-400 transition-colors"
                  >
                    +1 234 567 8900
                  </a>
                </div>
                {/* Email */}
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  <a
                    href="mailto:support@geomart.com"
                    className="hover:text-indigo-400 transition-colors"
                  >
                    support@geomart.com
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-indigo-400 transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-400 transition-colors">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-400 transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-400 transition-colors">
                    FAQs
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-indigo-400 transition-colors">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="hover:text-indigo-400 transition-colors">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="hover:text-indigo-400 transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p>&copy; 2025 GeoMart - Your trusted grocery partner. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}