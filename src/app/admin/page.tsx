"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  MessageSquare,
  Lock,
  LogOut,
  RefreshCw,
  Search,
  Home,
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

interface Booking {
  id: string;
  customerName: string;
  phoneNumber: string;
  serviceType: string;
  preferredTime?: string | null;
  address?: string | null;
  sourceForm: string;
  status: "PENDING" | "CONTACTED" | "ASSIGNED" | "COMPLETED" | "CANCELLED" | string;
  adminNotes?: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [notesDraft, setNotesDraft] = useState("");
  const [savingNote, setSavingNote] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const res = await fetch("/api/auth");
      const data = await res.json();
      setIsAuthenticated(data.authenticated);
      if (data.authenticated) {
        fetchBookings();
      }
    } catch {
      setIsAuthenticated(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passwordInput }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "ખોટો પાસવર્ડ (Invalid Password)");
      }

      setIsAuthenticated(true);
      setPasswordInput("");
      fetchBookings();
    } catch (err: unknown) {
      setLoginError(err instanceof Error ? err.message : "લોગઇન નિષ્ફળ ગયું");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    setIsAuthenticated(false);
    setBookings([]);
  };

  const fetchBookings = async () => {
    setLoadingBookings(true);
    try {
      const res = await fetch(`/api/bookings?status=${statusFilter}`);
      const data = await res.json();
      if (data.success && data.bookings) {
        setBookings(data.bookings);
      }
    } catch (error) {
      console.error("Failed to load leads:", error);
    } finally {
      setLoadingBookings(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchBookings();
    }
  }, [statusFilter]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success && data.booking) {
        setBookings((prev) =>
          prev.map((b) => (b.id === id ? { ...b, status: data.booking.status } : b))
        );
      }
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  const handleSaveNotes = async (id: string) => {
    setSavingNote(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, adminNotes: notesDraft }),
      });
      const data = await res.json();
      if (data.success && data.booking) {
        setBookings((prev) =>
          prev.map((b) => (b.id === id ? { ...b, adminNotes: data.booking.adminNotes } : b))
        );
        setEditingNotesId(null);
      }
    } catch (err) {
      console.error("Notes update failed:", err);
    } finally {
      setSavingNote(false);
    }
  };

  const filteredBookings = bookings.filter((b) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      b.customerName.toLowerCase().includes(q) ||
      b.phoneNumber.includes(q) ||
      (b.address && b.address.toLowerCase().includes(q)) ||
      b.serviceType.toLowerCase().includes(q)
    );
  });

  const totalCount = bookings.length;
  const pendingCount = bookings.filter((b) => b.status === "PENDING").length;
  const contactedCount = bookings.filter((b) => b.status === "CONTACTED" || b.status === "ASSIGNED").length;
  const completedCount = bookings.filter((b) => b.status === "COMPLETED").length;
  const amcCount = bookings.filter((b) => b.serviceType.toLowerCase().includes("amc")).length;

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-neutral-600 dark:bg-black dark:text-neutral-400 text-sm">
        એડમિન પોર્ટલ લોડ થઈ રહ્યું છે...
      </div>
    );
  }

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-black flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-black dark:text-white transition-colors">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center">
            <div className="inline-flex items-center justify-center bg-white border border-neutral-200 dark:border-neutral-800 rounded-xl p-2.5 mb-3 shadow-sm">
              <Image
                src="/logo.png"
                alt="Aqua Solutions — Pure Water Solutions"
                width={160}
                height={44}
                priority
                className="h-10 w-auto object-contain"
              />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-black dark:text-white">
              Aqua Solutions Owner Portal
            </h2>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
              સર્વિસ લીડ્સ અને AMC ટિકિટ મેનેજમેન્ટ ડેશબોર્ડ
            </p>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white dark:bg-[#0a0a0a] py-8 px-6 shadow-sm dark:shadow-2xl border border-neutral-200 dark:border-neutral-800 rounded-xl sm:px-10">
              {loginError && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-[#1a0505] border border-red-200 dark:border-red-900 rounded-lg text-xs text-red-700 dark:text-red-300">
                  {loginError}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    એડમિન પાસવર્ડ (Admin Password)
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Enter owner password..."
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-black text-black dark:text-white text-sm focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white placeholder-neutral-400 dark:placeholder-neutral-600"
                  />
                  <span className="text-[11px] text-neutral-500 mt-1 block">
                    ડિફોલ્ટ પાસવર્ડ PRD અનુસાર .env માંથી લોડ થાય છે.
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full h-10 bg-black hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-black text-sm font-semibold rounded-lg transition-colors shadow-sm"
                >
                  ડેશબોર્ડમાં પ્રવેશ કરો (Login)
                </button>
              </form>

              <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800 text-center">
                <Link href="/" className="text-xs text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:underline">
                  ← મુખ્ય વેબસાઇટ પર પાછા જાઓ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Owner Dashboard
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black text-black dark:text-white flex flex-col transition-colors">
      {/* Admin Header */}
      <header className="bg-white dark:bg-black text-black dark:text-white border-b border-neutral-200 dark:border-neutral-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white rounded-lg p-1 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center shadow-sm">
              <Image
                src="/logo.png"
                alt="Aqua Solutions"
                width={120}
                height={32}
                className="h-7 w-auto object-contain"
              />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight text-black dark:text-white">
                Admin Dashboard
              </h1>
              <span className="text-[11px] text-neutral-500 dark:text-neutral-400 block -mt-0.5">
                અમદાવાદ અને ગુજરાત લીડ મેનેજર
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-xs">
            <ThemeToggle />
            <Link
              href="/"
              target="_blank"
              className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">વેબસાઇટ જુઓ</span>
            </Link>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 dark:bg-[#141414] dark:hover:bg-[#202020] dark:text-neutral-200 rounded-md flex items-center gap-1.5 transition-colors border border-neutral-300 dark:border-neutral-800"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>લૉગ આઉટ</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          <div className="bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-sm">
            <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 block">કુલ ઇન્ક્વાયરીઝ</span>
            <span className="text-2xl font-bold font-mono text-black dark:text-white tabular-nums">
              {totalCount}
            </span>
            <span className="text-[10px] text-neutral-500 block mt-1">All Recorded</span>
          </div>

          <div className="bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-sm">
            <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300 block">નવી પેન્ડિંગ લીડ્સ</span>
            <span className="text-2xl font-bold font-mono text-black dark:text-white tabular-nums">
              {pendingCount}
            </span>
            <span className="text-[10px] text-neutral-500 dark:text-neutral-400 block mt-1">Requires Attention</span>
          </div>

          <div className="bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-sm">
            <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300 block">સંપર્ક / એસાઈન્ડ</span>
            <span className="text-2xl font-bold font-mono text-black dark:text-white tabular-nums">
              {contactedCount}
            </span>
            <span className="text-[10px] text-neutral-500 dark:text-neutral-400 block mt-1">In Progress</span>
          </div>

          <div className="bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-sm">
            <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300 block">પૂર્ણ થયેલ સર્વિસ</span>
            <span className="text-2xl font-bold font-mono text-black dark:text-white tabular-nums">
              {completedCount}
            </span>
            <span className="text-[10px] text-neutral-500 dark:text-neutral-400 block mt-1">Completed</span>
          </div>

          <div className="col-span-2 sm:col-span-1 bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-sm">
            <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 block">AMC વાર્ષિક પ્લાન્સ</span>
            <span className="text-2xl font-bold font-mono text-black dark:text-white tabular-nums">
              {amcCount}
            </span>
            <span className="text-[10px] text-neutral-500 block mt-1">AMC Contracts</span>
          </div>
        </div>

        {/* Action Controls & Filters */}
        <div className="bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
          {/* Status Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-medium">
            {["ALL", "PENDING", "CONTACTED", "ASSIGNED", "COMPLETED", "CANCELLED"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  statusFilter === status
                    ? "bg-black text-white dark:bg-white dark:text-black shadow-sm font-bold"
                    : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border border-neutral-300 dark:bg-black dark:hover:bg-[#141414] dark:text-neutral-400 dark:hover:text-white dark:border-neutral-800"
                }`}
              >
                {status === "ALL" && "બધા (All)"}
                {status === "PENDING" && "પેન્ડિંગ (Pending)"}
                {status === "CONTACTED" && "સંપર્ક કર્યો (Contacted)"}
                {status === "ASSIGNED" && "ટેકનિશિયન એસાઈન"}
                {status === "COMPLETED" && "પૂર્ણ (Done)"}
                {status === "CANCELLED" && "કેન્સલ"}
              </button>
            ))}
          </div>

          {/* Search Bar & Refresh */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-neutral-400 dark:text-neutral-500" />
              <input
                type="text"
                placeholder="નામ, ફોન કે વિસ્તાર શોધો..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-9 pl-9 pr-3 rounded-lg border border-neutral-300 dark:border-neutral-800 text-xs focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white bg-white dark:bg-black text-black dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500"
              />
            </div>
            <button
              onClick={fetchBookings}
              disabled={loadingBookings}
              className="h-9 px-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 dark:bg-[#141414] dark:hover:bg-[#202020] dark:text-neutral-200 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors border border-neutral-300 dark:border-neutral-800"
              title="રીફ્રેશ કરો"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingBookings ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">રીફ્રેશ</span>
            </button>
          </div>
        </div>

        {/* Leads Table / Card List */}
        <div className="bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden shadow-sm">
          {loadingBookings ? (
            <div className="p-12 text-center text-xs text-neutral-500 dark:text-neutral-400">
              સર્વિસ ડેટા લોડ થઈ રહ્યો છે...
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="p-12 text-center text-xs text-neutral-500 dark:text-neutral-400">
              કોઈપણ સર્વિસ ટિકિટ મળી નથી. (No bookings found for selected filter).
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-50 dark:bg-black border-b border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 font-semibold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3.5 px-4">ગ્રાહક અને ફોન</th>
                    <th className="py-3.5 px-4">સર્વિસ પ્રકાર</th>
                    <th className="py-3.5 px-4">સમય / વિસ્તાર</th>
                    <th className="py-3.5 px-4">સ્ટેટસ</th>
                    <th className="py-3.5 px-4">ઝડપી એક્શન</th>
                    <th className="py-3.5 px-4">ટેકનિશિયન નોટ્સ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                  {filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-neutral-50/80 dark:hover:bg-black/60 transition-colors">
                      {/* Customer Name & Phone */}
                      <td className="py-3.5 px-4 align-top">
                        <div className="font-bold text-black dark:text-white text-sm">
                          {b.customerName}
                        </div>
                        <div className="font-mono text-neutral-700 dark:text-neutral-300 font-medium mt-0.5">
                          +91 {b.phoneNumber}
                        </div>
                        <div className="text-[10px] text-neutral-500 mt-1">
                          {new Date(b.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </td>

                      {/* Service Category */}
                      <td className="py-3.5 px-4 align-top">
                        <span className="font-semibold text-black dark:text-white block">
                          {b.serviceType}
                        </span>
                        <span className="inline-block mt-1 text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-black text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800">
                          {b.sourceForm}
                        </span>
                      </td>

                      {/* Time Slot & Address */}
                      <td className="py-3.5 px-4 align-top max-w-xs">
                        <div className="text-neutral-800 dark:text-neutral-200 font-medium">
                          {b.preferredTime || "સમય નોંધાયેલ નથી"}
                        </div>
                        <div className="text-neutral-600 dark:text-neutral-400 text-[11px] mt-0.5 leading-snug">
                          {b.address || "વિસ્તાર દર્શાવેલ નથી"}
                        </div>
                      </td>

                      {/* Status Selector */}
                      <td className="py-3.5 px-4 align-top">
                        <select
                          value={b.status}
                          onChange={(e) => handleStatusChange(b.id, e.target.value)}
                          className={`text-xs font-semibold rounded-md px-2 py-1 border transition-colors ${
                            b.status === "PENDING"
                              ? "bg-amber-50 text-amber-800 border-amber-300 dark:bg-black dark:text-amber-300 dark:border-amber-900"
                              : b.status === "CONTACTED"
                              ? "bg-neutral-100 text-neutral-800 border-neutral-300 dark:bg-black dark:text-white dark:border-neutral-600"
                              : b.status === "ASSIGNED"
                              ? "bg-neutral-100 text-neutral-800 border-neutral-300 dark:bg-black dark:text-white dark:border-neutral-500"
                              : b.status === "COMPLETED"
                              ? "bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-black dark:text-emerald-400 dark:border-emerald-900"
                              : "bg-red-50 text-red-800 border-red-300 dark:bg-black dark:text-red-400 dark:border-red-900"
                          }`}
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="CONTACTED">CONTACTED</option>
                          <option value="ASSIGNED">ASSIGNED</option>
                          <option value="COMPLETED">COMPLETED</option>
                          <option value="CANCELLED">CANCELLED</option>
                        </select>
                      </td>

                      {/* 1-Click Call & WhatsApp Actions */}
                      <td className="py-3.5 px-4 align-top">
                        <div className="flex items-center gap-1.5">
                          <a
                            href={`tel:+91${b.phoneNumber}`}
                            className="p-1.5 rounded-md bg-neutral-100 text-neutral-800 hover:bg-neutral-200 border border-neutral-300 dark:bg-[#141414] dark:text-white dark:hover:bg-[#222222] dark:border-neutral-700 transition-colors"
                            title="Call Customer"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>

                          <a
                            href={`https://wa.me/91${b.phoneNumber}?text=${encodeURIComponent(
                              `Hi ${b.customerName}, this is Aqua Solutions regarding your ${b.serviceType} request.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-md bg-neutral-100 text-emerald-600 hover:bg-neutral-200 border border-neutral-300 dark:bg-[#141414] dark:text-emerald-400 dark:hover:bg-[#222222] dark:border-neutral-700 transition-colors"
                            title="WhatsApp Customer"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </td>

                      {/* Admin Notes */}
                      <td className="py-3.5 px-4 align-top max-w-xs">
                        {editingNotesId === b.id ? (
                          <div className="space-y-1.5">
                            <textarea
                              rows={2}
                              value={notesDraft}
                              onChange={(e) => setNotesDraft(e.target.value)}
                              className="w-full p-1.5 border border-neutral-300 dark:border-neutral-700 rounded text-xs bg-white dark:bg-black text-black dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600"
                              placeholder="Add technician or follow-up note..."
                            />
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleSaveNotes(b.id)}
                                disabled={savingNote}
                                className="px-2 py-0.5 bg-black hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-black font-semibold rounded text-[10px]"
                              >
                                {savingNote ? "Saving..." : "Save"}
                              </button>
                              <button
                                onClick={() => setEditingNotesId(null)}
                                className="px-2 py-0.5 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 dark:bg-[#171717] dark:hover:bg-[#252525] dark:text-neutral-300 rounded text-[10px]"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div
                            onClick={() => {
                              setEditingNotesId(b.id);
                              setNotesDraft(b.adminNotes || "");
                            }}
                            className="cursor-pointer group"
                            title="Click to edit notes"
                          >
                            <p className="text-neutral-600 dark:text-neutral-400 text-[11px] italic leading-tight">
                              {b.adminNotes || "નોંધ લખવા અહીં ક્લિક કરો..."}
                            </p>
                            <span className="text-[10px] text-black dark:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                              Edit Note
                            </span>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
