// // Updated ProfilePage.tsx
// "use client";
// import { useEffect, useState } from "react";
// import Header from "@/components/Header";
// import { User } from "lucide-react";
// import toast, { Toaster } from "react-hot-toast";
//
// interface ProfileFormData {
//   name: string;
//   email: string;
//   phone: string;
//   addressLine1: string;
//   addressLine2: string;
//   city: string;
//   state: string;
//   zip: string;
// }
//
// export default function ProfilePage() {
//   const [formData, setFormData] = useState<ProfileFormData>({
//     name: "",
//     email: "",
//     phone: "",
//     addressLine1: "",
//     addressLine2: "",
//     city: "",
//     state: "",
//     zip: "",
//   });
//
//   useEffect(() => {
//     fetch("https://api.geomart.co.uk/api/profile/get", {
//       method: "GET",
//       credentials: "include",
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("User not found");
//         return res.json();
//       })
//       .then((data) => {
//         setFormData({
//           name: data.name,
//           email: data.email,
//           phone: data.phone,
//           addressLine1: data.addressLine1 || "",
//           addressLine2: data.addressLine2 || "",
//           city: data.city || "",
//           state: data.state || "",
//           zip: data.zip || "",
//         });
//       })
//       .catch((err) => {
//         console.error("Profile fetch error:", err);
//         toast.error("Failed to load profile. You may need to log in again.");
//       });
//   }, []);
//
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };
//
//   const handleSave = async () => {
//     const res = await fetch("https://api.geomart.co.uk/api/profile/update", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(formData),
//       credentials: "include",
//     });
//
//     if (res.ok) {
//       toast.success("Profile updated successfully!");
//     } else {
//       toast.error("Failed to update profile.");
//     }
//   };
//
//   return (
//     <>
//       <Header />
//       <Toaster position="bottom-right" reverseOrder={false} />
//       <main className="min-h-screen bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:via-black dark:to-gray-900 pt-20 pb-12">
//         <div className="max-w-4xl mx-auto px-4 sm:px-8">
//           {/* Profile Header */}
//           <div className="flex flex-col sm:flex-row items-center sm:items-end sm:justify-between mt-6 mb-8">
//             <div className="flex items-center">
//               <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-indigo-600 shadow-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
//                 <User className="w-16 h-16 text-gray-600 dark:text-gray-300" />
//               </div>
//               <div className="ml-6">
//                 <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
//                   Your Profile
//                 </h1>
//                 <p className="text-gray-600 dark:text-gray-300 mt-1">
//                   Manage your personal details here
//                 </p>
//               </div>
//             </div>
//           </div>
//
//           {/* Form */}
//           <div className="bg-white dark:bg-gray-800 dark:bg-opacity-80 rounded-xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//               {["name", "email", "phone", "addressLine1", "addressLine2", "city", "state", "zip"].map((field) => (
//                 <div
//                   key={field}
//                   className={["addressLine1", "addressLine2"].includes(field) ? "sm:col-span-2" : ""}
//                 >
//                   <label
//                     htmlFor={field}
//                     className="block text-gray-700 dark:text-gray-300 font-semibold mb-2"
//                   >
//                     {field === "addressLine2" ? "Address Line 2 (optional)" : field.charAt(0).toUpperCase() + field.slice(1)}
//                   </label>
//                   <input
//                     type="text"
//                     name={field}
//                     id={field}
//                     value={(formData as any)[field] || ""}
//                     onChange={handleChange}
//                     className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white
//                                focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
//                   />
//                 </div>
//               ))}
//             </div>
//
//             <button
//               onClick={handleSave}
//               className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg text-lg font-semibold transition
//                          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900
//                          shadow-md hover:shadow-xl"
//             >
//               Save Profile
//             </button>
//           </div>
//         </div>
//       </main>
//     </>
//   );
// }
import Header from '@/components/Header';

export default function Profile() {
  return (
    <>
      <Header />
      <main className="bg-white min-h-screen flex items-center justify-center">
        <h2 className="text-2xl">Profile page test</h2>
      </main>
    </>
  );
}