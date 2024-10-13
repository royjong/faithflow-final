"use client"

import { Button } from "@/components/ui/button"
import { TrashIcon } from "lucide-react"

export function PrayersTable({ prayers }) {
  const deletePrayer = async (id: number) => {
    const response = await fetch(`/api/admin/prayers/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      window.location.reload();
    } else {
      console.error('Failed to delete prayer');
    }
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-x-auto">
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Titel
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Categorie
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Duur
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Acties
            </th>
          </tr>
        </thead>
        <tbody>
          {prayers.map((prayer) => (
            <tr key={prayer.id}>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                  {prayer.title}
                </p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                  {prayer.category.name}
                </p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                  {prayer.duration}
                </p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deletePrayer(prayer.id)}
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}