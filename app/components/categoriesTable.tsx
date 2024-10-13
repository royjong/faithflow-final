"use client";

import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { FC } from "react";

// Define the type for a single category
interface Category {
  id: number;
  name: string;
  description: string | null; // Allow description to be null
  iconName?: string; // Optional, since not used in the table currently
  imageUrl?: string; // Optional, since not used in the table currently
}

// Define the props for the CategoriesTable component
interface CategoriesTableProps {
  categories: Category[];
}

export const CategoriesTable: FC<CategoriesTableProps> = ({ categories }) => {
  const deleteCategory = async (id: number): Promise<void> => {
    try {
      const response = await fetch(`/api/admin/categories/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        window.location.reload();
      } else {
        console.error("Failed to delete category");
      }
    } catch (error) {
      console.error("Error deleting category", error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-x-auto">
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Naam
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Beschrijving
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Acties
            </th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                  {category.name}
                </p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                  {category.description}
                </p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteCategory(category.id)}
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
