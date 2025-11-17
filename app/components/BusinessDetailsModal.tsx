"use client";

import { useState } from "react";
import { databases, account } from "../lib/appwrite";
import { ID } from "appwrite";
import { toast } from "sonner";

export default function BusinessDetailsModal({ open, onClose }: any) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    businessName: "",
    businessEmail: "",
    street: "",
    lga: "",
    city: "",
    state: "",
    country: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  if (!open) return null;

  const handleSave = async () => {
    if (!form.businessName || !form.businessEmail) {
      toast.error("Business Name & Email are required.");
      return;
    }

    try {
      setLoading(true);

      // Get the currently logged-in user
      const user = await account.get();

      await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        "business_profiles", // collection ID
        ID.unique(),
        {
          userId: user.$id,
          ...form,
        }
      );

      toast.success("Business profile saved successfully!");
      onClose(); // Redirect or close modal
    } catch (error: any) {
      toast.error(error.message || "Failed to save business info.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 relative">

        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-1">Business Information</h2>
        <p className="text-gray-500 mb-6">
          Please complete your business profile to continue
        </p>

        <div className="space-y-4 max-h-[75vh] overflow-y-auto pr-2">

          <Input label="Business Name" name="businessName" value={form.businessName} onChange={handleChange} />
          <Input label="Business Email" name="businessEmail" value={form.businessEmail} onChange={handleChange} />
          <Input label="Street Address" name="street" value={form.street} onChange={handleChange} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Local Government" name="lga" value={form.lga} onChange={handleChange} />
            <Input label="City" name="city" value={form.city} onChange={handleChange} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="State" name="state" value={form.state} onChange={handleChange} />
            <Input label="Country" name="country" value={form.country} onChange={handleChange} />
          </div>

          <button
            onClick={handleSave}
            disabled={loading}
            className="w-full bg-lime-400 py-3 rounded-lg font-semibold disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Business Info"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Input({ label, ...props }: any) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        {...props}
        className="w-full border rounded-lg p-3"
      />
    </div>
  );
}
