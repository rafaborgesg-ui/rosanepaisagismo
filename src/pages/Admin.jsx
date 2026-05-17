import { useMemo, useState } from "react";
import { Edit3, FileText, ImagePlus, Layers3, Plus, RotateCcw, Save, Trash2, X } from "lucide-react";
import SiteFooter from "@/components/landing/SiteFooter";
import SiteNav from "@/components/landing/SiteNav";
import { portfolioCategories, premiumProjects } from "@/data/premiumProjects";
import { savePortfolioProjects, slugifyProjectTitle, usePortfolioProjects } from "@/lib/portfolioStorage";

const emptyProject = {
  slug: "",
  title: "",
  category: "Residencial",
  location: "",
  area: "",
  scope: "",
  cover: "",
  gallery: [],
  summary: "",
  challenge: "",
  solution: "",
  plants: [],
};

const inputClass =
  "w-full rounded-sm border border-[#d8cfbd] bg-white px-4 py-3 text-sm text-stone-800 outline-none transition focus:border-[#1a3d2b] focus:ring-4 focus:ring-[#1a3d2b]/10";
const labelClass = "mb-2 block text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-[#8d753f]";

function listToText(value = []) {
  return Array.isArray(value) ? value.join("\n") : "";
}

function textToList(value = "") {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeProject(project, existingProjects) {
  const baseSlug = slugifyProjectTitle(project.slug || project.title) || `projeto-${Date.now()}`;
  let slug = baseSlug;
  let count = 2;

  while (existingProjects.some((item) => item.slug === slug && item.slug !== project.originalSlug)) {
    slug = `${baseSlug}-${count}`;
    count += 1;
  }

  return {
    slug,
    title: project.title.trim(),
    category: project.category,
    location: project.location.trim(),
    area: project.area.trim(),
    scope: project.scope.trim(),
    cover: project.cover.trim(),
    gallery: textToList(project.galleryText),
    summary: project.summary.trim(),
    challenge: project.challenge.trim(),
    solution: project.solution.trim(),
    plants: textToList(project.plantsText),
  };
}

export default function Admin() {
  const storedProjects = usePortfolioProjects();
  const [projects, setProjects] = useState(storedProjects);
  const [editingSlug, setEditingSlug] = useState(null);
  const [form, setForm] = useState({
    ...emptyProject,
    galleryText: "",
    plantsText: "",
    originalSlug: "",
  });
  const [message, setMessage] = useState("");

  const projectCount = projects.length;
  const categories = useMemo(() => portfolioCategories.filter((item) => item !== "Todos"), []);

  const persist = (nextProjects, successMessage) => {
    setProjects(nextProjects);
    savePortfolioProjects(nextProjects);
    setMessage(successMessage);
  };

  const startCreate = () => {
    setEditingSlug("new");
    setMessage("");
    setForm({
      ...emptyProject,
      galleryText: "",
      plantsText: "",
      originalSlug: "",
    });
  };

  const startEdit = (project) => {
    setEditingSlug(project.slug);
    setMessage("");
    setForm({
      ...project,
      originalSlug: project.slug,
      galleryText: listToText(project.gallery),
      plantsText: listToText(project.plants),
    });
  };

  const cancelEdit = () => {
    setEditingSlug(null);
    setMessage("");
  };

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submitProject = (event) => {
    event.preventDefault();

    if (!form.title.trim()) {
      setMessage("Informe o nome do projeto antes de salvar.");
      return;
    }

    if (!form.cover.trim()) {
      setMessage("Informe a imagem de capa antes de salvar.");
      return;
    }

    const normalized = normalizeProject(form, projects);
    const nextProjects =
      editingSlug === "new"
        ? [normalized, ...projects]
        : projects.map((project) => (project.slug === form.originalSlug ? normalized : project));

    persist(nextProjects, editingSlug === "new" ? "Projeto criado com sucesso." : "Projeto atualizado com sucesso.");
    setEditingSlug(null);
  };

  const deleteProject = (project) => {
    const confirmed = window.confirm(`Excluir o projeto "${project.title}"?`);
    if (!confirmed) return;

    persist(
      projects.filter((item) => item.slug !== project.slug),
      "Projeto excluido com sucesso."
    );
    if (editingSlug === project.slug) setEditingSlug(null);
  };

  const resetProjects = () => {
    const confirmed = window.confirm("Restaurar a lista original de projetos?");
    if (!confirmed) return;

    persist(premiumProjects, "Projetos originais restaurados.");
    setEditingSlug(null);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f9f9f9]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,600;0,700;1,400;1,700&family=Work+Sans:wght@300;400;600&display=swap');
        .font-serif-custom { font-family: 'Noto Serif', serif; }
        .font-sans-custom { font-family: 'Work Sans', sans-serif; }
      `}</style>
      <SiteNav />

      <main className="mx-auto max-w-6xl px-6 pb-20 pt-32 font-sans-custom">
        <div className="mb-12 max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[#9b7b2f]">Administração do site</p>
          <h1 className="font-serif-custom text-4xl leading-tight text-[#1a3d2b] md:text-6xl">
            Painel de edição Rosane Paisagismo
          </h1>
          <p className="mt-5 text-lg leading-8 text-stone-600">
            Gerencie o acervo de projetos publicado no portfólio. As alterações ficam salvas neste navegador e já refletem nas páginas de projeto.
          </p>
        </div>

        <section className="mb-10 grid gap-5 md:grid-cols-3">
          <article className="border border-[#ded7c8] bg-white p-6">
            <ImagePlus className="mb-5 h-6 w-6 text-[#1a3d2b]" aria-hidden="true" />
            <h2 className="font-serif-custom text-2xl text-[#1a3d2b]">Fotos do Hero</h2>
            <p className="mt-3 text-sm leading-7 text-stone-600">A próxima etapa será conectar edição do carrossel principal.</p>
          </article>
          <article className="border border-[#1a3d2b] bg-[#f4f0e8] p-6 shadow-[0_18px_55px_rgba(31,34,26,0.08)]">
            <Layers3 className="mb-5 h-6 w-6 text-[#1a3d2b]" aria-hidden="true" />
            <h2 className="font-serif-custom text-2xl text-[#1a3d2b]">Projetos funcional</h2>
            <p className="mt-3 text-sm leading-7 text-stone-600">{projectCount} projetos cadastrados para o portfólio.</p>
          </article>
          <article className="border border-[#ded7c8] bg-white p-6">
            <FileText className="mb-5 h-6 w-6 text-[#1a3d2b]" aria-hidden="true" />
            <h2 className="font-serif-custom text-2xl text-[#1a3d2b]">Textos da página</h2>
            <p className="mt-3 text-sm leading-7 text-stone-600">A próxima etapa será conectar textos editáveis da home.</p>
          </article>
        </section>

        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="border border-[#ded7c8] bg-white p-5 md:p-6">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className={labelClass}>Projetos</p>
                <h2 className="font-serif-custom text-3xl text-[#1a3d2b]">Acervo publicado</h2>
              </div>
              <button
                type="button"
                onClick={startCreate}
                className="inline-flex items-center gap-2 rounded-full bg-[#1a3d2b] px-5 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#2e5d43]"
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
                Novo
              </button>
            </div>

            <div className="space-y-3">
              {projects.map((project) => (
                <article key={project.slug} className="grid grid-cols-[80px_1fr] gap-4 border border-[#eee7da] bg-[#fbfaf7] p-3">
                  <img src={project.cover} alt={project.title} className="h-24 w-20 rounded-sm object-cover" />
                  <div className="min-w-0">
                    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-[#9b7b2f]">{project.category}</p>
                    <h3 className="mt-1 truncate font-serif-custom text-xl text-[#1a3d2b]">{project.title}</h3>
                    <p className="mt-1 line-clamp-2 text-sm leading-6 text-stone-600">{project.summary}</p>
                    <div className="mt-4 flex gap-2">
                      <button
                        type="button"
                        onClick={() => startEdit(project)}
                        className="inline-flex items-center gap-2 rounded-full border border-[#d8cfbd] px-3 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.13em] text-[#1f241c] hover:bg-white"
                      >
                        <Edit3 className="h-3.5 w-3.5" aria-hidden="true" />
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteProject(project)}
                        className="inline-flex items-center gap-2 rounded-full border border-red-200 px-3 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.13em] text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                        Excluir
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <button
              type="button"
              onClick={resetProjects}
              className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-stone-500 transition hover:text-[#1a3d2b]"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Restaurar projetos originais
            </button>
          </div>

          <form onSubmit={submitProject} className="border border-[#ded7c8] bg-[#f4f0e8] p-5 md:p-7">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className={labelClass}>Editor</p>
                <h2 className="font-serif-custom text-3xl text-[#1a3d2b]">
                  {editingSlug ? (editingSlug === "new" ? "Criar projeto" : "Editar projeto") : "Selecione um projeto"}
                </h2>
              </div>
              {editingSlug && (
                <button type="button" onClick={cancelEdit} className="rounded-full border border-[#d8cfbd] p-2 text-stone-500 hover:bg-white">
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              )}
            </div>

            {!editingSlug ? (
              <div className="border border-dashed border-[#cfc4af] bg-white/50 p-8 text-stone-600">
                Clique em <strong>Editar</strong> em um projeto existente ou em <strong>Novo</strong> para cadastrar outro projeto.
              </div>
            ) : (
              <div className="grid gap-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <label>
                    <span className={labelClass}>Nome do projeto</span>
                    <input className={inputClass} value={form.title} onChange={(event) => updateField("title", event.target.value)} />
                  </label>
                  <label>
                    <span className={labelClass}>Slug</span>
                    <input className={inputClass} value={form.slug} onChange={(event) => updateField("slug", event.target.value)} placeholder="gerado automaticamente se vazio" />
                  </label>
                  <label>
                    <span className={labelClass}>Categoria</span>
                    <select className={inputClass} value={form.category} onChange={(event) => updateField("category", event.target.value)}>
                      {categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <span className={labelClass}>Local</span>
                    <input className={inputClass} value={form.location} onChange={(event) => updateField("location", event.target.value)} />
                  </label>
                  <label>
                    <span className={labelClass}>Área</span>
                    <input className={inputClass} value={form.area} onChange={(event) => updateField("area", event.target.value)} />
                  </label>
                  <label>
                    <span className={labelClass}>Escopo</span>
                    <input className={inputClass} value={form.scope} onChange={(event) => updateField("scope", event.target.value)} />
                  </label>
                </div>

                <label>
                  <span className={labelClass}>Imagem de capa</span>
                  <input className={inputClass} value={form.cover} onChange={(event) => updateField("cover", event.target.value)} placeholder="/brand/imagem.jpg ou URL" />
                </label>

                <label>
                  <span className={labelClass}>Galeria, uma imagem por linha</span>
                  <textarea className={`${inputClass} min-h-28`} value={form.galleryText} onChange={(event) => updateField("galleryText", event.target.value)} />
                </label>

                <label>
                  <span className={labelClass}>Resumo</span>
                  <textarea className={`${inputClass} min-h-24`} value={form.summary} onChange={(event) => updateField("summary", event.target.value)} />
                </label>

                <label>
                  <span className={labelClass}>Desafio</span>
                  <textarea className={`${inputClass} min-h-24`} value={form.challenge} onChange={(event) => updateField("challenge", event.target.value)} />
                </label>

                <label>
                  <span className={labelClass}>Solução</span>
                  <textarea className={`${inputClass} min-h-24`} value={form.solution} onChange={(event) => updateField("solution", event.target.value)} />
                </label>

                <label>
                  <span className={labelClass}>Plantas utilizadas, uma por linha</span>
                  <textarea className={`${inputClass} min-h-24`} value={form.plantsText} onChange={(event) => updateField("plantsText", event.target.value)} />
                </label>

                {message && <p className="rounded-sm border border-[#d8cfbd] bg-white px-4 py-3 text-sm text-[#1a3d2b]">{message}</p>}

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1a3d2b] px-7 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#2e5d43]"
                >
                  <Save className="h-4 w-4" aria-hidden="true" />
                  Salvar projeto
                </button>
              </div>
            )}
          </form>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
