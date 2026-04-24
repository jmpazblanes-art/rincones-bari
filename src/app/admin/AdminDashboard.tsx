"use client";

import { useState } from "react";
import { GALERIA_CATEGORIAS } from "./constants";
import {
  createPostAction,
  logoutAction,
  uploadPhotoAction,
} from "./actions";

type Tab = "foto" | "blog";

const BLOG_CATEGORIAS = [
  "Salones",
  "Cocinas",
  "Baños",
  "Habitaciones",
  "Patios",
  "Vestidores",
  "Despachos",
  "Recibidores",
  "Decoración",
  "Estilo de vida",
];

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("foto");
  const [status, setStatus] = useState<
    | { type: "idle" }
    | { type: "loading" }
    | { type: "ok"; message: string }
    | { type: "error"; message: string }
  >({ type: "idle" });

  async function onPhoto(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ type: "loading" });
    const fd = new FormData(e.currentTarget);
    const res = await uploadPhotoAction(fd);
    if (res?.error) {
      setStatus({ type: "error", message: res.error });
    } else {
      setStatus({
        type: "ok",
        message: `Foto publicada. En 1 minuto aparecerá en la web.`,
      });
      e.currentTarget.reset();
    }
  }

  async function onPost(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ type: "loading" });
    const fd = new FormData(e.currentTarget);
    const res = await createPostAction(fd);
    if (res?.error) {
      setStatus({ type: "error", message: res.error });
    } else {
      setStatus({
        type: "ok",
        message: `Post publicado. En 1 minuto aparecerá en la web.`,
      });
      e.currentTarget.reset();
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif">Rincones Bari</h1>
          <p className="text-sm text-stone-500">Panel de administración</p>
        </div>
        <form action={logoutAction}>
          <button
            type="submit"
            className="text-sm text-stone-600 hover:text-stone-900 underline"
          >
            Salir
          </button>
        </form>
      </header>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => {
            setTab("foto");
            setStatus({ type: "idle" });
          }}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            tab === "foto"
              ? "bg-stone-900 text-white"
              : "bg-white border border-stone-200 text-stone-700"
          }`}
        >
          Subir foto a la galería
        </button>
        <button
          onClick={() => {
            setTab("blog");
            setStatus({ type: "idle" });
          }}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            tab === "blog"
              ? "bg-stone-900 text-white"
              : "bg-white border border-stone-200 text-stone-700"
          }`}
        >
          Escribir post del blog
        </button>
      </div>

      {status.type === "ok" && (
        <div className="mb-4 rounded-lg bg-green-50 border border-green-200 text-green-800 px-4 py-3 text-sm">
          {status.message}
        </div>
      )}
      {status.type === "error" && (
        <div className="mb-4 rounded-lg bg-red-50 border border-red-200 text-red-800 px-4 py-3 text-sm">
          {status.message}
        </div>
      )}

      {tab === "foto" ? (
        <form
          onSubmit={onPhoto}
          className="bg-white border border-stone-200 rounded-2xl p-6 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Categoría</label>
            <select
              name="categoria"
              required
              className="w-full rounded-lg border border-stone-300 px-3 py-2"
              defaultValue=""
            >
              <option value="" disabled>
                Elige una categoría
              </option>
              {GALERIA_CATEGORIAS.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Título SEO
            </label>
            <input
              type="text"
              name="titulo"
              required
              placeholder="Salón moderno con sofá de lino y tonos neutros"
              className="w-full rounded-lg border border-stone-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Texto alternativo
            </label>
            <input
              type="text"
              name="alt"
              required
              placeholder="Salón contemporáneo de estilo mediterráneo"
              className="w-full rounded-lg border border-stone-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Descripción (opcional)
            </label>
            <textarea
              name="descripcion"
              rows={3}
              className="w-full rounded-lg border border-stone-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Búsqueda Amazon (opcional)
            </label>
            <input
              type="text"
              name="amazon"
              placeholder="sofá lino beige"
              className="w-full rounded-lg border border-stone-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Foto</label>
            <input
              type="file"
              name="foto"
              accept="image/*"
              required
              className="w-full text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={status.type === "loading"}
            className="w-full rounded-lg bg-stone-900 text-white py-2.5 font-medium hover:bg-stone-700 disabled:opacity-50"
          >
            {status.type === "loading" ? "Subiendo..." : "Publicar foto"}
          </button>
        </form>
      ) : (
        <form
          onSubmit={onPost}
          className="bg-white border border-stone-200 rounded-2xl p-6 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium mb-1">
              Título del artículo
            </label>
            <input
              type="text"
              name="titulo"
              required
              className="w-full rounded-lg border border-stone-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Imagen de portada
            </label>
            <input
              type="file"
              name="cover"
              accept="image/*"
              required
              className="w-full text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Resumen (2-3 frases)
            </label>
            <textarea
              name="resumen"
              rows={2}
              required
              className="w-full rounded-lg border border-stone-300 px-3 py-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">
                Categoría
              </label>
              <select
                name="categoria"
                required
                className="w-full rounded-lg border border-stone-300 px-3 py-2"
                defaultValue="Decoración"
              >
                {BLOG_CATEGORIAS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Tiempo de lectura (min)
              </label>
              <input
                type="number"
                name="tiempo"
                defaultValue={5}
                min={1}
                max={60}
                className="w-full rounded-lg border border-stone-300 px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Contenido (puedes usar formato Markdown)
            </label>
            <textarea
              name="contenido"
              rows={12}
              required
              className="w-full rounded-lg border border-stone-300 px-3 py-2 font-mono text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={status.type === "loading"}
            className="w-full rounded-lg bg-stone-900 text-white py-2.5 font-medium hover:bg-stone-700 disabled:opacity-50"
          >
            {status.type === "loading" ? "Publicando..." : "Publicar post"}
          </button>
        </form>
      )}
    </div>
  );
}
