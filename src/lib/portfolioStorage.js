import { useEffect, useState } from "react";
import { premiumProjects } from "@/data/premiumProjects";
import { supabase } from "@/lib/supabaseClient";

const TABLE = "portfolio_projects";

export function slugifyProjectTitle(value = "") {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function fromRow(row) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: row.category,
    location: row.location || "",
    area: row.area || "",
    scope: row.scope || "",
    cover: row.cover,
    gallery: Array.isArray(row.gallery) ? row.gallery : [],
    summary: row.summary || "",
    challenge: row.challenge || "",
    solution: row.solution || "",
    plants: Array.isArray(row.plants) ? row.plants : [],
    beforeAfter: row.before_after || undefined,
    sortOrder: row.sort_order || 0,
    isPublished: row.is_published !== false,
    isFeaturedHome: row.is_featured_home === true,
  };
}

function toRow(project, index = 0) {
  const sortOrder = Number(project.sortOrder);

  return {
    slug: project.slug,
    title: project.title,
    category: project.category,
    location: project.location || null,
    area: project.area || null,
    scope: project.scope || null,
    cover: project.cover,
    gallery: project.gallery || [],
    summary: project.summary || null,
    challenge: project.challenge || null,
    solution: project.solution || null,
    plants: project.plants || [],
    before_after: project.beforeAfter || null,
    sort_order: Number.isFinite(sortOrder) ? sortOrder : (index + 1) * 10,
    is_published: project.isPublished !== false,
    is_featured_home: project.isFeaturedHome === true,
  };
}

export async function listPortfolioProjects({ includeDrafts = false } = {}) {
  if (!supabase) return premiumProjects;

  let query = supabase.from(TABLE).select("*").order("sort_order", { ascending: true }).order("created_at", { ascending: true });
  if (!includeDrafts) query = query.eq("is_published", true);

  const { data, error } = await query;
  if (error) throw error;
  return data?.length ? data.map(fromRow) : premiumProjects;
}

export async function createPortfolioProject(project, index = 0) {
  if (!supabase) throw new Error("Supabase não configurado.");
  const { data, error } = await supabase.from(TABLE).insert(toRow(project, index)).select("*").single();
  if (error) throw error;
  return fromRow(data);
}

export async function updatePortfolioProject(id, project, index = 0) {
  if (!supabase) throw new Error("Supabase não configurado.");
  const { data, error } = await supabase.from(TABLE).update(toRow(project, index)).eq("id", id).select("*").single();
  if (error) throw error;
  return fromRow(data);
}

export async function deletePortfolioProject(id) {
  if (!supabase) throw new Error("Supabase não configurado.");
  const { error } = await supabase.from(TABLE).delete().eq("id", id);
  if (error) throw error;
}

export async function resetPortfolioProjects() {
  if (!supabase) throw new Error("Supabase não configurado.");

  const { error: deleteError } = await supabase.from(TABLE).delete().neq("slug", "__never__");
  if (deleteError) throw deleteError;

  const rows = premiumProjects.map((project, index) => toRow(project, index));
  const { data, error } = await supabase.from(TABLE).insert(rows).select("*").order("sort_order", { ascending: true });
  if (error) throw error;
  return data.map(fromRow);
}

export function usePortfolioProjects({ includeDrafts = false } = {}) {
  const [projects, setProjects] = useState(premiumProjects);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      setIsLoading(true);
      try {
        const nextProjects = await listPortfolioProjects({ includeDrafts });
        if (active) {
          setProjects(nextProjects);
          setError(null);
        }
      } catch (currentError) {
        if (active) {
          setProjects(premiumProjects);
          setError(currentError);
        }
      } finally {
        if (active) setIsLoading(false);
      }
    };

    load();

    return () => {
      active = false;
    };
  }, [includeDrafts]);

  return { projects, setProjects, isLoading, error };
}
