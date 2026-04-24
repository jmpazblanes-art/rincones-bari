"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { GALERIA_CATEGORIAS } from "./constants";

const COOKIE_NAME = "admin_session";
const COOKIE_VALUE = "logged_in";
const REPO_OWNER = "jmpazblanes-art";
const REPO_NAME = "rincones-bari";
const BRANCH = "master";

async function isAuthed() {
  const jar = await cookies();
  return jar.get(COOKIE_NAME)?.value === COOKIE_VALUE;
}

export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected) {
    return { error: "El servidor no tiene ADMIN_PASSWORD configurado." };
  }

  if (password !== expected) {
    return { error: "Contraseña incorrecta." };
  }

  const jar = await cookies();
  jar.set(COOKIE_NAME, COOKIE_VALUE, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  redirect("/admin");
}

export async function logoutAction() {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
  redirect("/admin/login");
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

async function commitFile(params: {
  path: string;
  content: string;
  message: string;
}) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("Falta GITHUB_TOKEN en el servidor.");

  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${params.path}`;

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: params.message,
      content: params.content,
      branch: BRANCH,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub API falló: ${res.status} ${text}`);
  }
}

export async function uploadPhotoAction(formData: FormData) {
  if (!(await isAuthed())) return { error: "No autenticado." };

  const categoria = String(formData.get("categoria") ?? "");
  const titulo = String(formData.get("titulo") ?? "").trim();
  const alt = String(formData.get("alt") ?? "").trim();
  const descripcion = String(formData.get("descripcion") ?? "").trim();
  const amazon = String(formData.get("amazon") ?? "").trim();
  const file = formData.get("foto") as File | null;

  if (!categoria || !GALERIA_CATEGORIAS.find((c) => c.value === categoria)) {
    return { error: "Categoría no válida." };
  }
  if (!titulo) return { error: "Falta el título." };
  if (!alt) return { error: "Falta el texto alternativo." };
  if (!file || file.size === 0) return { error: "Falta la foto." };

  const slug = slugify(titulo);
  if (!slug) return { error: "El título no es válido." };

  const extMatch = file.name.match(/\.([a-zA-Z0-9]+)$/);
  const ext = (extMatch ? extMatch[1] : "jpg").toLowerCase();

  const imagePath = `public/images/uploads/${categoria}-${slug}.${ext}`;
  const mdPath = `content/galeria/${categoria}/${slug}.md`;

  const buf = Buffer.from(await file.arrayBuffer());
  const imageBase64 = buf.toString("base64");

  const frontmatter = [
    "---",
    `title: "${titulo.replace(/"/g, '\\"')}"`,
    `alt: "${alt.replace(/"/g, '\\"')}"`,
    `image: /images/uploads/${categoria}-${slug}.${ext}`,
    descripcion ? `description: "${descripcion.replace(/"/g, '\\"')}"` : null,
    amazon ? `affiliate_query: "${amazon.replace(/"/g, '\\"')}"` : null,
    "---",
    "",
  ]
    .filter(Boolean)
    .join("\n");

  const mdBase64 = Buffer.from(frontmatter, "utf8").toString("base64");

  try {
    await commitFile({
      path: imagePath,
      content: imageBase64,
      message: `admin: subir foto ${categoria}/${slug}`,
    });
    await commitFile({
      path: mdPath,
      content: mdBase64,
      message: `admin: añadir ficha ${categoria}/${slug}`,
    });
    return { ok: true, slug };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Error al subir." };
  }
}

export async function createPostAction(formData: FormData) {
  if (!(await isAuthed())) return { error: "No autenticado." };

  const titulo = String(formData.get("titulo") ?? "").trim();
  const resumen = String(formData.get("resumen") ?? "").trim();
  const categoria = String(formData.get("categoria") ?? "Decoración");
  const tiempo = String(formData.get("tiempo") ?? "5");
  const contenido = String(formData.get("contenido") ?? "").trim();
  const cover = formData.get("cover") as File | null;

  if (!titulo) return { error: "Falta el título." };
  if (!resumen) return { error: "Falta el resumen." };
  if (!contenido) return { error: "Falta el contenido." };
  if (!cover || cover.size === 0) return { error: "Falta la imagen de portada." };

  const slug = slugify(titulo);
  if (!slug) return { error: "El título no genera un slug válido." };

  const extMatch = cover.name.match(/\.([a-zA-Z0-9]+)$/);
  const ext = (extMatch ? extMatch[1] : "jpg").toLowerCase();

  const coverPath = `public/images/uploads/blog-${slug}.${ext}`;
  const mdPath = `content/blog/${slug}.md`;

  const buf = Buffer.from(await cover.arrayBuffer());
  const coverBase64 = buf.toString("base64");

  const today = new Date().toISOString().slice(0, 10);

  const frontmatter = [
    "---",
    `title: "${titulo.replace(/"/g, '\\"')}"`,
    `slug: ${slug}`,
    `date: ${today}`,
    `cover_image: /images/uploads/blog-${slug}.${ext}`,
    `excerpt: "${resumen.replace(/"/g, '\\"')}"`,
    `category: ${categoria}`,
    `read_time: ${parseInt(tiempo, 10) || 5}`,
    `published: true`,
    "---",
    "",
    contenido,
    "",
  ].join("\n");

  const mdBase64 = Buffer.from(frontmatter, "utf8").toString("base64");

  try {
    await commitFile({
      path: coverPath,
      content: coverBase64,
      message: `admin: portada del post ${slug}`,
    });
    await commitFile({
      path: mdPath,
      content: mdBase64,
      message: `admin: publicar post ${slug}`,
    });
    return { ok: true, slug };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Error al publicar." };
  }
}
