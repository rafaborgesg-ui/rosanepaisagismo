import { supabase } from "@/lib/supabaseClient";

const BUCKET = "site-assets";

function cleanFileName(name = "imagem") {
  const [baseName = "imagem", extension = "jpg"] = name.split(/\.(?=[^.]+$)/);
  const safeBase = baseName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `${safeBase || "imagem"}.${extension.toLowerCase()}`;
}

export async function uploadSiteImage(file, { folder = "admin" } = {}) {
  if (!supabase) throw new Error("Supabase não configurado.");
  if (!file) throw new Error("Selecione uma imagem para enviar.");

  const path = `${folder}/${Date.now()}-${cleanFileName(file.name)}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: "31536000",
    upsert: true,
  });

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET).getPublicUrl(path);

  return publicUrl;
}

export async function uploadPublicAsset(assetPath, { title = "Imagem", folder = "hero" } = {}) {
  const response = await fetch(assetPath);
  if (!response.ok) throw new Error(`Não foi possível carregar ${assetPath}.`);

  const blob = await response.blob();
  const extension = assetPath.split(".").pop() || "jpg";
  const file = new File([blob], `${title}.${extension}`, { type: blob.type || `image/${extension}` });

  return uploadSiteImage(file, { folder });
}
