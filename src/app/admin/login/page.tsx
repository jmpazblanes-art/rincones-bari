"use client";

import { useState } from "react";
import { loginAction } from "../actions";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const res = await loginAction(fd);
    if (res?.error) {
      setError(res.error);
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm bg-white border border-stone-200 rounded-2xl p-8 shadow-sm"
      >
        <h1 className="text-2xl font-serif text-stone-900 mb-1">
          Rincones Bari
        </h1>
        <p className="text-sm text-stone-500 mb-6">
          Panel de administración
        </p>

        <label className="block text-sm font-medium text-stone-700 mb-2">
          Contraseña
        </label>
        <input
          type="password"
          name="password"
          autoFocus
          required
          className="w-full rounded-lg border border-stone-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-stone-400"
        />

        {error && (
          <p className="mt-3 text-sm text-red-600">{error}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="mt-6 w-full rounded-lg bg-stone-900 text-white py-2.5 font-medium hover:bg-stone-700 disabled:opacity-50"
        >
          {submitting ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
