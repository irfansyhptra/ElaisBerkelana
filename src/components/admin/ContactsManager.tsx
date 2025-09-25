// src/components/admin/ContactsManager.tsx
"use client";
import { useState, useEffect } from "react";
import { getContacts } from "@/lib/api";

interface Contact {
  _id: string;
  name: string;
  email: string;
  message: string;
  status: string;
  createdAt: string;
}

const ContactsManager = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const data = await getContacts({ status: filter || undefined });
        setContacts(data.contacts);
      } catch (error: unknown) {
        setError((error as Error).message || "Gagal memuat data kontak");
      } finally {
        setLoading(false);
      }
    };

    loadContacts();
  }, [filter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-red-100 text-red-800";
      case "read":
        return "bg-yellow-100 text-yellow-800";
      case "replied":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return <div className="text-center py-8">Memuat data kontak...</div>;
  }

  if (error) {
    return <div className="bg-red-100 text-red-700 p-4 rounded">{error}</div>;
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Kelola Kontak</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border rounded-md"
        >
          <option value="">Semua Status</option>
          <option value="new">Baru</option>
          <option value="read">Sudah Dibaca</option>
          <option value="replied">Sudah Dibalas</option>
        </select>
      </div>

      {contacts.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          Belum ada pesan kontak.
        </p>
      ) : (
        <div className="space-y-4">
          {contacts.map((contact) => (
            <div
              key={contact._id}
              className="border rounded-lg p-4 hover:bg-gray-50"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {contact.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{contact.email}</p>
                </div>
                <div className="text-right">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      contact.status
                    )}`}
                  >
                    {contact.status === "new"
                      ? "Baru"
                      : contact.status === "read"
                      ? "Dibaca"
                      : "Dibalas"}
                  </span>
                  <p className="text-gray-500 text-xs mt-1">
                    {formatDate(contact.createdAt)}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 text-sm">{contact.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactsManager;
