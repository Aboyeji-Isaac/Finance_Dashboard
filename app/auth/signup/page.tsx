"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "../../lib/useAuth";
import BusinessDetailsModal from "../../components/BusinessDetailsModal";

export default function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [showBusinessModal, setShowBusinessModal] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(email, password, name);

      // Instead of redirecting → open business modal
      setShowBusinessModal(true);

    } catch (err: any) {
      setError(err.message || "Signup failed");
    }
  };

  return (
    <>
      {/* Existing signup layout exactly as-is */}
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">

        {/* Left section */}
        <div className="flex flex-col justify-center items-center px-8 md:px-16 bg-white">
          <div className="absolute top-10 left-60">
            <img src="/assets/images/Logo.svg" alt="Logo" />
          </div>

          <div className="w-full max-w-md space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Create New Account</h1>
            <p className="text-gray-500">Welcome! Please enter your details.</p>

            <form onSubmit={handleSignup} className="space-y-4">
              {error && <p className="text-red-600 text-sm">{error}</p>}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg p-3"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-lg p-3"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded-lg p-3"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button className="w-full bg-lime-400 py-3 rounded-lg font-semibold">
                Create Account
              </button>
            </form>
          </div>
        </div>

        {/* Right section image */}
        <div className="hidden md:flex items-center justify-center bg-white">
          <img src="/assets/images/signup_illustration.png" alt="Signup Illustration" />
        </div>
      </div>

      {/* Business Modal */}
      <BusinessDetailsModal
        open={showBusinessModal}
        onClose={() => router.push("/")} // Go to dashboard after closing modal
      />
    </>
  );
}







// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import useAuth from "../../lib/useAuth";
// import BusinessDetailsModal from "../../components/BusinessDetailsModal";

// export default function SignupPage() {
//   const { signup } = useAuth();
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const [showBusinessModal, setShowBusinessModal] = useState(false);

//   const handleSignup = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await signup(email, password, name);

//       // Open the business modal instead of redirecting
//       setShowBusinessModal(true);
//     } catch (err: any) {
//       setError(err.message || "Signup failed");
//     }
//   };

//   return (
//     <>
//       {/* ---------------- SIGNUP UI (Your original layout) ---------------- */}
//       <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">

//         {/* Left section */}
//         <div className="flex flex-col justify-center items-center px-8 md:px-16 bg-white">
//           <div className="absolute top-10 left-60">
//             <img src="/assets/images/Logo.svg" alt="Logo" />
//           </div>

//           <div className="w-full max-w-md space-y-6">
//             <h1 className="text-3xl font-bold text-gray-900">Create New Account</h1>
//             <p className="text-gray-500">Welcome! Please enter your details.</p>

//             <form onSubmit={handleSignup} className="space-y-4">
//               {error && <p className="text-red-600 text-sm">{error}</p>}

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//                 <input
//                   type="text"
//                   className="w-full border border-gray-300 rounded-lg p-3"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                 <input
//                   type="email"
//                   className="w-full border border-gray-300 rounded-lg p-3"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//                 <input
//                   type="password"
//                   className="w-full border border-gray-300 rounded-lg p-3"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </div>

//               <button className="w-full bg-lime-400 py-3 rounded-lg font-semibold">
//                 Create Account
//               </button>
//             </form>
//           </div>
//         </div>

//         {/* Right image */}
//         <div className="hidden md:flex items-center justify-center bg-white">
//           <img src="/assets/images/signup_illustration.png" alt="Signup Illustration" />
//         </div>
//       </div>

//       {/* ---------------- BUSINESS MODAL ---------------- */}
//       <BusinessDetailsModal
//         open={showBusinessModal}
//         onClose={() => router.push("/")}
//       />
//     </>
//   );
// }
