import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  Edit3,
  FileText,
  GripVertical,
  ImagePlus,
  LayoutDashboard,
  Layers3,
  LogIn,
  Plus,
  Save,
  Settings2,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import SiteFooter from "@/components/landing/SiteFooter";
import SiteNav from "@/components/landing/SiteNav";
import { portfolioCategories } from "@/data/premiumProjects";
import { useAuth } from "@/lib/AuthContext";
import {
  defaultHomeTexts,
  defaultLandingContent,
  getLandingContentRecord,
  saveLandingContentRecord,
} from "@/lib/landingContentStorage";
import {
  createPortfolioProject,
  deletePortfolioProject,
  slugifyProjectTitle,
  updatePortfolioProject,
  usePortfolioProjects,
} from "@/lib/portfolioStorage";
import { uploadPublicAsset, uploadSiteImage } from "@/lib/siteAssetsStorage";

const modules = [
  { id: "overview", label: "Visão geral", icon: LayoutDashboard },
  { id: "hero", label: "Fotos do Hero", icon: ImagePlus },
  { id: "projects", label: "Projetos", icon: Layers3 },
  { id: "texts", label: "Textos", icon: FileText },
  { id: "settings", label: "Configurações", icon: Settings2 },
];

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
  beforeAfter: {
    enabled: false,
    before: "",
    after: "",
    labelBefore: "Antes",
    labelAfter: "Depois",
  },
  sortOrder: 0,
  isPublished: true,
  isFeaturedHome: false,
};

const inputClass =
  "w-full rounded-sm border border-[#d8cfbd] bg-white px-4 py-3 text-sm text-stone-800 outline-none transition focus:border-[#1a3d2b] focus:ring-4 focus:ring-[#1a3d2b]/10 disabled:bg-stone-100 disabled:text-stone-400";
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

function toLandingPayload(landingForm) {
  return {
    logo_topo_url: landingForm.logo_topo_url || null,
    logo_topo_size: Number(landingForm.logo_topo_size) || 100,
    logo_rodape_url: landingForm.logo_rodape_url || null,
    logo_rodape_size: Number(landingForm.logo_rodape_size) || 100,
    slides: Array.isArray(landingForm.slides) ? landingForm.slides.filter((slide) => slide.imagem_url) : [],
    sobre_titulo: landingForm.sobre_titulo || null,
    sobre_cargo: landingForm.sobre_cargo || null,
    sobre_frase: landingForm.sobre_frase || null,
    sobre_texto: landingForm.sobre_texto || null,
    sobre_imagem_url: landingForm.sobre_imagem_url || null,
    servico1_titulo: landingForm.servico1_titulo || null,
    servico1_desc: landingForm.servico1_desc || null,
    servico2_titulo: landingForm.servico2_titulo || null,
    servico2_desc: landingForm.servico2_desc || null,
    servico3_titulo: landingForm.servico3_titulo || null,
    servico3_desc: landingForm.servico3_desc || null,
    whatsapp_numero: landingForm.whatsapp_numero || null,
    email_contato: landingForm.email_contato || null,
    home_texts: { ...defaultHomeTexts, ...(landingForm.home_texts || {}) },
  };
}

function normalizeProject(project, existingProjects) {
  const baseSlug = slugifyProjectTitle(project.slug || project.title) || `projeto-${Date.now()}`;
  let slug = baseSlug;
  let count = 2;

  while (existingProjects.some((item) => item.slug === slug && item.slug !== project.originalSlug)) {
    slug = `${baseSlug}-${count}`;
    count += 1;
  }

  const beforeAfter = {
    enabled: project.beforeAfter?.enabled === true,
    before: project.beforeAfter?.before || "",
    after: project.beforeAfter?.after || "",
    labelBefore: "Antes",
    labelAfter: "Depois",
  };

  return {
    id: project.id,
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
    beforeAfter: beforeAfter.enabled || beforeAfter.before || beforeAfter.after ? beforeAfter : null,
    sortOrder: Number(project.sortOrder) || 0,
    isPublished: project.isPublished !== false,
    isFeaturedHome: project.isFeaturedHome === true,
  };
}

export default function Admin() {
  const { user, isAuthenticated, isLoadingAuth } = useAuth();
  const {
    projects: storedProjects,
    setProjects,
    isLoading,
    error,
  } = usePortfolioProjects({ includeDrafts: true });

  const [activeModule, setActiveModule] = useState("overview");
  const [projects, setLocalProjects] = useState(storedProjects);
  const [editingSlug, setEditingSlug] = useState(null);
  const [projectForm, setProjectForm] = useState({
    ...emptyProject,
    galleryText: "",
    plantsText: "",
    originalSlug: "",
  });
  const [landingForm, setLandingForm] = useState(defaultLandingContent);
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isLandingLoading, setIsLandingLoading] = useState(true);
  const [isMigratingHero, setIsMigratingHero] = useState(false);
  const heroMigrationAttempted = useRef(false);

  const categories = useMemo(() => portfolioCategories.filter((item) => item !== "Todos"), []);
  const publishedCount = projects.filter((project) => project.isPublished !== false).length;

  useEffect(() => {
    setLocalProjects(storedProjects);
  }, [storedProjects]);

  useEffect(() => {
    let active = true;

    const loadLandingContent = async () => {
      setIsLandingLoading(true);
      try {
        const record = await getLandingContentRecord();
        if (!active) return;
        setLandingForm({
          ...defaultLandingContent,
          ...(record || {}),
          home_texts: { ...defaultHomeTexts, ...(record?.home_texts || {}) },
        });
      } catch (currentError) {
        if (active) setMessage(currentError.message || "Não foi possível carregar conteúdo do site.");
      } finally {
        if (active) setIsLandingLoading(false);
      }
    };

    loadLandingContent();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!isAuthenticated || isLandingLoading || heroMigrationAttempted.current) return;

    const slides = Array.isArray(landingForm.slides) ? landingForm.slides : [];
    const shouldMigrate = slides.length > 0 && slides.some((slide) => (slide.imagem_url || "").startsWith("/brand/"));
    if (!shouldMigrate) return;

    heroMigrationAttempted.current = true;
    setIsMigratingHero(true);

    Promise.all(
      slides.map(async (slide) => {
        const source = slide.imagem_url || "";
        if (!source.startsWith("/brand/")) return slide;
        const publicUrl = await uploadPublicAsset(source, {
          title: slide.titulo || "hero",
          folder: "hero",
        });
        return { ...slide, imagem_url: publicUrl };
      })
    )
      .then(async (migratedSlides) => {
        const nextContent = { ...landingForm, slides: migratedSlides };
        setLandingForm(nextContent);
        await saveLandingContentRecord(toLandingPayload(nextContent));
        setMessage("Fotos atuais do Hero foram enviadas ao Supabase e carregadas no painel.");
      })
      .catch((currentError) => {
        setMessage(currentError.message || "Não foi possível migrar as fotos atuais do Hero.");
      })
      .finally(() => setIsMigratingHero(false));
  }, [isAuthenticated, isLandingLoading, landingForm]);

  const requireLogin = (action = "salvar alterações") => {
    if (isAuthenticated) return true;
    setMessage(`Faça login para ${action} no Supabase.`);
    return false;
  };

  const persistProjects = (nextProjects, successMessage) => {
    setLocalProjects(nextProjects);
    setProjects(nextProjects);
    setMessage(successMessage);
  };

  const updateLandingField = (field, value) => {
    setLandingForm((current) => ({ ...current, [field]: value }));
  };

  const updateHomeTextField = (field, value) => {
    setLandingForm((current) => ({
      ...current,
      home_texts: {
        ...defaultHomeTexts,
        ...(current.home_texts || {}),
        [field]: value,
      },
    }));
  };

  const updateHeroSlide = (index, field, value) => {
    setLandingForm((current) => ({
      ...current,
      slides: (Array.isArray(current.slides) ? current.slides : []).map((slide, slideIndex) =>
        slideIndex === index ? { ...slide, [field]: value } : slide
      ),
    }));
  };

  const addHeroSlide = () => {
    setLandingForm((current) => ({
      ...current,
      slides: [...(Array.isArray(current.slides) ? current.slides : []), { titulo: "Novo slide", imagem_url: "" }],
    }));
  };

  const removeHeroSlide = (index) => {
    setLandingForm((current) => ({
      ...current,
      slides: (Array.isArray(current.slides) ? current.slides : []).filter((_, slideIndex) => slideIndex !== index),
    }));
  };

  const reorderHeroSlide = (fromIndex, toIndex) => {
    setLandingForm((current) => {
      const slides = Array.isArray(current.slides) ? [...current.slides] : [];
      if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0 || fromIndex >= slides.length || toIndex >= slides.length) {
        return current;
      }

      const [movedSlide] = slides.splice(fromIndex, 1);
      slides.splice(toIndex, 0, movedSlide);
      return { ...current, slides };
    });
  };

  const uploadHeroSlide = async (index, file) => {
    if (!requireLogin("enviar fotos do Hero")) return;
    setIsSaving(true);
    try {
      const url = await uploadSiteImage(file, { folder: "hero" });
      updateHeroSlide(index, "imagem_url", url);
      setMessage("Foto enviada. Clique em Salvar Hero para publicar a alteração.");
    } catch (currentError) {
      setMessage(currentError.message || "Não foi possível enviar a foto.");
    } finally {
      setIsSaving(false);
    }
  };

  const uploadLandingImage = async (field, file, folder = "site") => {
    if (!requireLogin("enviar imagem")) return;
    setIsSaving(true);
    try {
      const url = await uploadSiteImage(file, { folder });
      updateLandingField(field, url);
      setMessage("Imagem enviada. Clique em Salvar para publicar a alteração.");
    } catch (currentError) {
      setMessage(currentError.message || "Não foi possível enviar a imagem.");
    } finally {
      setIsSaving(false);
    }
  };

  const uploadHomeTextImage = async (field, file, folder = "site") => {
    if (!requireLogin("enviar imagem")) return;
    setIsSaving(true);
    try {
      const url = await uploadSiteImage(file, { folder });
      updateHomeTextField(field, url);
      setMessage("Imagem enviada. Clique em Salvar textos para publicar a alteração.");
    } catch (currentError) {
      setMessage(currentError.message || "Não foi possível enviar a imagem.");
    } finally {
      setIsSaving(false);
    }
  };

  const startCreate = () => {
    setActiveModule("projects");
    setEditingSlug("new");
    setMessage("");
    setProjectForm({
      ...emptyProject,
      galleryText: "",
      plantsText: "",
      originalSlug: "",
      sortOrder: (projects.length + 1) * 10,
    });
  };

  const startEdit = (project) => {
    setActiveModule("projects");
    setEditingSlug(project.slug);
    setMessage("");
    setProjectForm({
      ...project,
      beforeAfter: {
        enabled: project.beforeAfter ? project.beforeAfter.enabled !== false : false,
        before: project.beforeAfter?.before || "",
        after: project.beforeAfter?.after || "",
        labelBefore: "Antes",
        labelAfter: "Depois",
      },
      isFeaturedHome: project.isFeaturedHome === true,
      originalSlug: project.slug,
      galleryText: listToText(project.gallery),
      plantsText: listToText(project.plants),
    });
  };

  const cancelEdit = () => {
    setEditingSlug(null);
    setMessage("");
  };

  const updateProjectField = (field, value) => {
    setProjectForm((current) => ({ ...current, [field]: value }));
  };

  const uploadProjectImage = async (field, file, galleryIndex = null) => {
    if (!requireLogin("enviar fotos do projeto")) return;
    setIsSaving(true);
    try {
      const url = await uploadSiteImage(file, { folder: "projects" });
      if (field === "cover") {
        updateProjectField("cover", url);
      } else if (field === "before" || field === "after") {
        updateProjectField("beforeAfter", {
          ...(projectForm.beforeAfter || {}),
          [field]: url,
          enabled: projectForm.beforeAfter?.enabled === true,
          labelBefore: "Antes",
          labelAfter: "Depois",
        });
      } else {
        const gallery = textToList(projectForm.galleryText);
        const nextGallery =
          galleryIndex === null ? [...gallery, url] : gallery.map((item, index) => (index === galleryIndex ? url : item));
        updateProjectField("galleryText", listToText(nextGallery));
      }
      setMessage("Foto enviada. Clique em Salvar projeto para publicar a alteração.");
    } catch (currentError) {
      setMessage(currentError.message || "Não foi possível enviar a foto.");
    } finally {
      setIsSaving(false);
    }
  };

  const removeProjectGalleryImage = (index) => {
    const gallery = textToList(projectForm.galleryText).filter((_, itemIndex) => itemIndex !== index);
    updateProjectField("galleryText", listToText(gallery));
  };

  const submitProject = async (event) => {
    event.preventDefault();
    if (!requireLogin("salvar projetos")) return;

    if (!projectForm.title.trim()) {
      setMessage("Informe o nome do projeto antes de salvar.");
      return;
    }

    if (!projectForm.cover.trim()) {
      setMessage("Envie a imagem de capa antes de salvar.");
      return;
    }

    setIsSaving(true);
    try {
      const normalized = normalizeProject(projectForm, projects);
      const savedProject =
        editingSlug === "new"
          ? await createPortfolioProject(normalized, projects.length)
          : await updatePortfolioProject(
              projectForm.id,
              normalized,
              projects.findIndex((project) => project.slug === projectForm.originalSlug)
            );
      const nextProjects =
        editingSlug === "new"
          ? [savedProject, ...projects]
          : projects.map((project) => (project.id === savedProject.id ? savedProject : project));

      persistProjects(nextProjects, editingSlug === "new" ? "Projeto criado no Supabase." : "Projeto atualizado no Supabase.");
      setEditingSlug(null);
    } catch (currentError) {
      setMessage(currentError.message || "Não foi possível salvar no Supabase.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteProject = async (project) => {
    if (!requireLogin("excluir projetos")) return;
    if (!window.confirm(`Excluir o projeto "${project.title}"?`)) return;

    setIsSaving(true);
    try {
      await deletePortfolioProject(project.id);
      persistProjects(
        projects.filter((item) => item.id !== project.id),
        "Projeto excluído do Supabase."
      );
      if (editingSlug === project.slug) setEditingSlug(null);
    } catch (currentError) {
      setMessage(currentError.message || "Não foi possível excluir no Supabase.");
    } finally {
      setIsSaving(false);
    }
  };

  const saveLandingContent = async (event) => {
    event.preventDefault();
    if (!requireLogin("salvar conteúdo")) return;

    setIsSaving(true);
    try {
      await saveLandingContentRecord(toLandingPayload(landingForm));
      setMessage("Conteúdo salvo no Supabase.");
    } catch (currentError) {
      setMessage(currentError.message || "Não foi possível salvar o conteúdo.");
    } finally {
      setIsSaving(false);
    }
  };

  const statusText = isAuthenticated ? `Conectado como ${user?.email}` : "Modo leitura";

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f5f2eb]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,600;0,700;1,400;1,700&family=Work+Sans:wght@300;400;600&display=swap');
        .font-serif-custom { font-family: 'Noto Serif', serif; }
        .font-sans-custom { font-family: 'Work Sans', sans-serif; }
      `}</style>
      <SiteNav />

      <main className="mx-auto grid max-w-[1500px] gap-6 px-4 pb-20 pt-28 font-sans-custom md:px-6 lg:grid-cols-[280px_1fr]">
        <aside className="lg:sticky lg:top-28 lg:h-[calc(100vh-8rem)]">
          <div className="border border-[#ded7c8] bg-[#10120e] p-5 text-white shadow-[0_24px_70px_rgba(24,26,19,0.15)]">
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-[#d3b473]">Admin</p>
            <h1 className="mt-3 font-serif-custom text-3xl leading-tight">Gestão do site</h1>
            <p className="mt-4 text-sm leading-6 text-white/62">{statusText}</p>
            {!isAuthenticated && !isLoadingAuth && (
              <Link
                to="/login?from_url=/admin"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-3 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-[#10120e]"
              >
                <LogIn className="h-4 w-4" aria-hidden="true" />
                Entrar
              </Link>
            )}

            <nav className="mt-8 grid gap-2">
              {modules.map((module) => {
                const Icon = module.icon;
                const active = activeModule === module.id;
                return (
                  <button
                    key={module.id}
                    type="button"
                    onClick={() => setActiveModule(module.id)}
                    className={`flex items-center gap-3 border px-4 py-3 text-left text-sm transition ${
                      active
                        ? "border-[#d3b473] bg-[#d3b473] text-[#10120e]"
                        : "border-white/10 bg-white/[0.03] text-white/74 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {module.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        <section className="min-w-0">
          <div className="mb-6 flex flex-col gap-4 border border-[#ded7c8] bg-white px-5 py-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-[#9b7b2f]">Rosane Paisagismo</p>
              <h2 className="mt-2 font-serif-custom text-3xl text-[#1a3d2b] md:text-4xl">
                Painel editorial e operacional
              </h2>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.12em]">
              <span className="border border-[#ded7c8] px-3 py-2 text-stone-600">{projects.length} projetos</span>
              <span className="border border-[#ded7c8] px-3 py-2 text-stone-600">{publishedCount} publicados</span>
              <span className="border border-[#ded7c8] px-3 py-2 text-stone-600">{isLandingLoading ? "Conteúdo carregando" : "Conteúdo pronto"}</span>
            </div>
          </div>

          {message && (
            <div className="mb-6 flex items-center gap-3 border border-[#d8cfbd] bg-white px-5 py-4 text-sm text-[#1a3d2b]">
              <CheckCircle2 className="h-5 w-5 text-[#1a3d2b]" aria-hidden="true" />
              {message}
            </div>
          )}

          {(isLoading || error) && (
            <div className="mb-6 border border-[#ded7c8] bg-[#fffaf0] px-5 py-4 text-sm text-stone-700">
              {isLoading ? "Carregando projetos do Supabase..." : `Falha ao carregar Supabase: ${error?.message}`}
            </div>
          )}

          {activeModule === "overview" && (
            <OverviewPanel
              projects={projects}
              publishedCount={publishedCount}
              isAuthenticated={isAuthenticated}
              setActiveModule={setActiveModule}
              startCreate={startCreate}
            />
          )}

          {activeModule === "hero" && (
            <HeroPanel
              landingForm={landingForm}
              updateHeroSlide={updateHeroSlide}
              addHeroSlide={addHeroSlide}
              removeHeroSlide={removeHeroSlide}
              reorderHeroSlide={reorderHeroSlide}
              uploadHeroSlide={uploadHeroSlide}
              saveLandingContent={saveLandingContent}
              isSaving={isSaving}
              isMigratingHero={isMigratingHero}
              isAuthenticated={isAuthenticated}
            />
          )}

          {activeModule === "projects" && (
            <ProjectsPanel
              projects={projects}
              categories={categories}
              editingSlug={editingSlug}
              projectForm={projectForm}
              startCreate={startCreate}
              startEdit={startEdit}
              cancelEdit={cancelEdit}
              updateProjectField={updateProjectField}
              uploadProjectImage={uploadProjectImage}
              removeProjectGalleryImage={removeProjectGalleryImage}
              submitProject={submitProject}
              deleteProject={handleDeleteProject}
              isSaving={isSaving}
              isAuthenticated={isAuthenticated}
            />
          )}

          {activeModule === "texts" && (
            <TextsPanel
              landingForm={landingForm}
              updateLandingField={updateLandingField}
              updateHomeTextField={updateHomeTextField}
              uploadLandingImage={uploadLandingImage}
              uploadHomeTextImage={uploadHomeTextImage}
              saveLandingContent={saveLandingContent}
              isSaving={isSaving}
              isAuthenticated={isAuthenticated}
            />
          )}

          {activeModule === "settings" && (
            <SettingsPanel
              landingForm={landingForm}
              updateLandingField={updateLandingField}
              uploadLandingImage={uploadLandingImage}
              saveLandingContent={saveLandingContent}
              isSaving={isSaving}
              isAuthenticated={isAuthenticated}
            />
          )}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function OverviewPanel({ projects, publishedCount, isAuthenticated, setActiveModule, startCreate }) {
  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["Projetos no acervo", projects.length],
          ["Projetos publicados", publishedCount],
          ["Acesso", isAuthenticated ? "Edição" : "Leitura"],
        ].map(([label, value]) => (
          <article key={label} className="border border-[#ded7c8] bg-white p-6">
            <p className={labelClass}>{label}</p>
            <strong className="font-serif-custom text-4xl text-[#1a3d2b]">{value}</strong>
          </article>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {[
          ["Fotos do Hero", "Gerencie as imagens da primeira dobra com upload e prévia.", "hero"],
          ["Projetos", "Cadastre, publique, edite e remova cases diretamente no Supabase.", "projects"],
          ["Textos", "Ajuste conteúdo institucional, serviços e chamadas principais.", "texts"],
        ].map(([title, description, target]) => (
          <article key={title} className="border border-[#ded7c8] bg-[#fbfaf7] p-6">
            <h3 className="font-serif-custom text-2xl text-[#1a3d2b]">{title}</h3>
            <p className="mt-3 min-h-20 text-sm leading-7 text-stone-600">{description}</p>
            <button
              type="button"
              onClick={() => (target === "projects" ? startCreate() : setActiveModule(target))}
              className="mt-5 rounded-full border border-[#1a3d2b] px-5 py-3 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-[#1a3d2b]"
            >
              Abrir módulo
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}

function HeroPanel({
  landingForm,
  updateHeroSlide,
  addHeroSlide,
  removeHeroSlide,
  reorderHeroSlide,
  uploadHeroSlide,
  saveLandingContent,
  isSaving,
  isMigratingHero,
  isAuthenticated,
}) {
  const slides = Array.isArray(landingForm.slides) ? landingForm.slides : [];
  const [draggedSlideIndex, setDraggedSlideIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const finishDragging = () => {
    setDraggedSlideIndex(null);
    setDragOverIndex(null);
  };

  return (
    <form onSubmit={saveLandingContent} className="grid gap-6">
      <PanelHeader title="Fotos do Hero" description="Organize as imagens do carrossel inicial com upload, prévia e ordem visual." />
      <div className="border border-[#ded7c8] bg-white p-6">
        {isMigratingHero && (
          <div className="mb-5 border border-[#d8cfbd] bg-[#fbfaf7] px-4 py-3 text-sm text-stone-600">
            Enviando as fotos atuais do Hero para o Supabase...
          </div>
        )}
        <div className="grid gap-4">
          {slides.map((slide, index) => (
            <article
              key={`${slide.imagem_url}-${index}`}
              onDragOver={(event) => {
                event.preventDefault();
                event.dataTransfer.dropEffect = "move";
                setDragOverIndex(index);
              }}
              onDragLeave={() => setDragOverIndex((current) => (current === index ? null : current))}
              onDrop={(event) => {
                event.preventDefault();
                const sourceIndex = draggedSlideIndex ?? Number(event.dataTransfer.getData("text/plain"));
                if (Number.isInteger(sourceIndex)) reorderHeroSlide(sourceIndex, index);
                finishDragging();
              }}
              className={`grid gap-4 border bg-[#fbfaf7] p-4 transition md:grid-cols-[auto_220px_1fr_auto] ${
                dragOverIndex === index
                  ? "border-[#1a3d2b] shadow-[0_14px_40px_rgba(26,61,43,0.14)]"
                  : "border-[#eee7da]"
              } ${draggedSlideIndex === index ? "opacity-55" : ""}`}
            >
              <button
                type="button"
                draggable={slides.length > 1 && !isSaving}
                onDragStart={(event) => {
                  setDraggedSlideIndex(index);
                  event.dataTransfer.effectAllowed = "move";
                  event.dataTransfer.setData("text/plain", String(index));
                }}
                onDragEnd={finishDragging}
                disabled={slides.length <= 1 || isSaving}
                className="flex h-full min-h-12 cursor-grab items-center justify-center rounded-sm border border-[#d8cfbd] bg-white px-3 text-[#1a3d2b] transition hover:bg-[#1a3d2b] hover:text-white active:cursor-grabbing disabled:cursor-not-allowed disabled:opacity-35 md:min-h-36"
                aria-label={`Arrastar slide ${index + 1} para reordenar`}
                title="Arraste para mudar a ordem"
              >
                <GripVertical className="h-5 w-5" aria-hidden="true" />
              </button>
              <ImagePreview src={slide.imagem_url} alt={slide.titulo || `Slide ${index + 1}`} className="h-36" />
              <div className="grid gap-3">
                <TextInput label={`Título do slide ${index + 1}`} value={slide.titulo} onChange={(value) => updateHeroSlide(index, "titulo", value)} />
                <ImageUploadButton
                  label={slide.imagem_url ? "Trocar foto" : "Enviar foto"}
                  disabled={!isAuthenticated || isSaving}
                  onUpload={(file) => uploadHeroSlide(index, file)}
                />
              </div>
              <button
                type="button"
                onClick={() => removeHeroSlide(index)}
                disabled={slides.length <= 1 || isSaving}
                className="self-start rounded-full border border-red-200 p-3 text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-35"
                aria-label="Remover foto do Hero"
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
              </button>
            </article>
          ))}
        </div>
        <button
          type="button"
          onClick={addHeroSlide}
          className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#1a3d2b] px-5 py-3 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-[#1a3d2b]"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Adicionar foto
        </button>
        <SaveButton isSaving={isSaving} isAuthenticated={isAuthenticated} label="Salvar Hero" />
      </div>
    </form>
  );
}


function TextsPanel({
  landingForm,
  updateLandingField,
  updateHomeTextField,
  uploadLandingImage,
  uploadHomeTextImage,
  saveLandingContent,
  isSaving,
  isAuthenticated,
}) {
  const homeTexts = { ...defaultHomeTexts, ...(landingForm.home_texts || {}) };

  return (
    <form onSubmit={saveLandingContent} className="grid gap-6">
      <PanelHeader title="Textos da página" description="Edite todas as seções principais da home salvas no Supabase." />
      <div className="grid gap-5 border border-[#ded7c8] bg-white p-6">
        <AdminSectionTitle title="Sobre" description="Texto institucional, assinatura e foto da Rosane." />
        <div className="grid gap-5 md:grid-cols-2">
          <TextInput label="Título sobre" value={landingForm.sobre_titulo} onChange={(value) => updateLandingField("sobre_titulo", value)} />
          <TextInput label="Cargo / assinatura" value={landingForm.sobre_cargo} onChange={(value) => updateLandingField("sobre_cargo", value)} />
        </div>
        <TextArea label="Frase sobre" value={landingForm.sobre_frase} onChange={(value) => updateLandingField("sobre_frase", value)} />
        <TextArea label="Texto sobre" value={landingForm.sobre_texto} onChange={(value) => updateLandingField("sobre_texto", value)} />
        <div>
          <span className={labelClass}>Foto da seção Sobre</span>
          <div className="grid gap-4 rounded-sm border border-[#d8cfbd] bg-[#fbfaf7] p-4 md:grid-cols-[220px_1fr]">
            <ImagePreview src={landingForm.sobre_imagem_url} alt="Foto da seção Sobre" className="h-36" />
            <ImageUploadButton
              label={landingForm.sobre_imagem_url ? "Trocar foto" : "Enviar foto"}
              disabled={!isAuthenticated || isSaving}
              onUpload={(file) => uploadLandingImage("sobre_imagem_url", file, "about")}
            />
          </div>
        </div>

        <AdminSectionTitle title="Projetos selecionados" description="Chamada da seção de destaques da página inicial." />
        <div className="grid gap-5 md:grid-cols-3">
          <TextInput label="Etiqueta" value={homeTexts.selected_label} onChange={(value) => updateHomeTextField("selected_label", value)} />
          <TextInput label="Botão" value={homeTexts.selected_cta} onChange={(value) => updateHomeTextField("selected_cta", value)} />
          <div className="md:col-span-3">
            <TextArea label="Título da seção" value={homeTexts.selected_title} onChange={(value) => updateHomeTextField("selected_title", value)} />
          </div>
        </div>

        <AdminSectionTitle title="Nossos Serviços" description="Título geral e três serviços principais." />
        <div className="grid gap-5 md:grid-cols-2">
          <TextInput label="Etiqueta serviços" value={homeTexts.services_label} onChange={(value) => updateHomeTextField("services_label", value)} />
          <TextArea label="Título serviços" value={homeTexts.services_title} onChange={(value) => updateHomeTextField("services_title", value)} />
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          <TextInput label="Serviço 1" value={landingForm.servico1_titulo} onChange={(value) => updateLandingField("servico1_titulo", value)} />
          <TextInput label="Serviço 2" value={landingForm.servico2_titulo} onChange={(value) => updateLandingField("servico2_titulo", value)} />
          <TextInput label="Serviço 3" value={landingForm.servico3_titulo} onChange={(value) => updateLandingField("servico3_titulo", value)} />
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          <TextArea label="Descrição serviço 1" value={landingForm.servico1_desc} onChange={(value) => updateLandingField("servico1_desc", value)} />
          <TextArea label="Descrição serviço 2" value={landingForm.servico2_desc} onChange={(value) => updateLandingField("servico2_desc", value)} />
          <TextArea label="Descrição serviço 3" value={landingForm.servico3_desc} onChange={(value) => updateLandingField("servico3_desc", value)} />
        </div>

        <AdminSectionTitle title="Método" description="Chamada e texto da seção de processo." />
        <div className="grid gap-5 md:grid-cols-2">
          <TextInput label="Etiqueta método" value={homeTexts.method_label} onChange={(value) => updateHomeTextField("method_label", value)} />
          <TextArea label="Título método" value={homeTexts.method_title} onChange={(value) => updateHomeTextField("method_title", value)} />
        </div>
        <TextArea label="Texto método" value={homeTexts.method_text} onChange={(value) => updateHomeTextField("method_text", value)} />

        <AdminSectionTitle title="Entregáveis" description="Conteúdo da seção de valor entregue na obra." />
        <div className="grid gap-5 md:grid-cols-2">
          <TextInput label="Etiqueta entregáveis" value={homeTexts.deliverables_label} onChange={(value) => updateHomeTextField("deliverables_label", value)} />
          <TextArea label="Título entregáveis" value={homeTexts.deliverables_title} onChange={(value) => updateHomeTextField("deliverables_title", value)} />
        </div>
        <TextArea label="Texto entregáveis" value={homeTexts.deliverables_text} onChange={(value) => updateHomeTextField("deliverables_text", value)} />
        <TextArea
          label="Lista de entregáveis, um por linha"
          value={listToText(homeTexts.deliverables_items)}
          onChange={(value) => updateHomeTextField("deliverables_items", textToList(value))}
        />

        <AdminSectionTitle title="Depoimentos" description="Provas sociais exibidas na página inicial." />
        {[1, 2, 3].map((index) => (
          <div key={index} className="grid gap-5 border border-[#eee7da] bg-[#fbfaf7] p-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <TextArea
                label={`Depoimento ${index}`}
                value={homeTexts[`testimonial_${index}_quote`]}
                onChange={(value) => updateHomeTextField(`testimonial_${index}_quote`, value)}
              />
            </div>
            <TextInput
              label={`Nome depoimento ${index}`}
              value={homeTexts[`testimonial_${index}_name`]}
              onChange={(value) => updateHomeTextField(`testimonial_${index}_name`, value)}
            />
            <TextInput
              label={`Descrição depoimento ${index}`}
              value={homeTexts[`testimonial_${index}_role`]}
              onChange={(value) => updateHomeTextField(`testimonial_${index}_role`, value)}
            />
          </div>
        ))}

        <AdminSectionTitle title="CTA final" description="Bloco de atendimento antes do rodapé." />
        <div className="grid gap-5 md:grid-cols-2">
          <TextInput label="Etiqueta CTA" value={homeTexts.concierge_label} onChange={(value) => updateHomeTextField("concierge_label", value)} />
          <TextInput label="Botão CTA" value={homeTexts.concierge_button} onChange={(value) => updateHomeTextField("concierge_button", value)} />
        </div>
        <TextArea label="Título CTA" value={homeTexts.concierge_title} onChange={(value) => updateHomeTextField("concierge_title", value)} />
        <TextArea label="Texto CTA" value={homeTexts.concierge_text} onChange={(value) => updateHomeTextField("concierge_text", value)} />
        <div>
          <span className={labelClass}>Imagem do CTA final</span>
          <div className="grid gap-4 rounded-sm border border-[#d8cfbd] bg-[#fbfaf7] p-4 md:grid-cols-[220px_1fr]">
            <ImagePreview src={homeTexts.concierge_image_url} alt="Imagem do CTA final" className="h-36" />
            <ImageUploadButton
              label={homeTexts.concierge_image_url ? "Trocar foto" : "Enviar foto"}
              disabled={!isAuthenticated || isSaving}
              onUpload={(file) => uploadHomeTextImage("concierge_image_url", file, "home")}
            />
          </div>
        </div>
        <SaveButton isSaving={isSaving} isAuthenticated={isAuthenticated} label="Salvar textos" />
      </div>
    </form>
  );
}

function AdminSectionTitle({ title, description }) {
  return (
    <div className="border-t border-[#eee7da] pt-6 first:border-t-0 first:pt-0">
      <p className={labelClass}>{title}</p>
      <p className="mt-2 text-sm leading-6 text-stone-600">{description}</p>
    </div>
  );
}

function SettingsPanel({ landingForm, updateLandingField, uploadLandingImage, saveLandingContent, isSaving, isAuthenticated }) {
  return (
    <form onSubmit={saveLandingContent} className="grid gap-6">
      <PanelHeader title="Configurações" description="Dados de marca, contato, CTAs, footer e WhatsApp." />
      <div className="grid gap-5 border border-[#ded7c8] bg-white p-6 md:grid-cols-2">
        <div>
          <span className={labelClass}>Logo do topo</span>
          <div className="grid gap-4 rounded-sm border border-[#d8cfbd] bg-[#fbfaf7] p-4">
            <ImagePreview src={landingForm.logo_topo_url} alt="Logo do topo" className="h-20" />
            <AssetPath value={landingForm.logo_topo_url} />
            <ImageUploadButton
              label={landingForm.logo_topo_url ? "Trocar logo" : "Enviar logo"}
              disabled={!isAuthenticated || isSaving}
              onUpload={(file) => uploadLandingImage("logo_topo_url", file, "brand")}
            />
          </div>
        </div>
        <TextInput label="Tamanho logo topo" value={landingForm.logo_topo_size} onChange={(value) => updateLandingField("logo_topo_size", value)} />
        <div>
          <span className={labelClass}>Logo do rodapé</span>
          <div className="grid gap-4 rounded-sm border border-[#d8cfbd] bg-[#fbfaf7] p-4">
            <ImagePreview src={landingForm.logo_rodape_url} alt="Logo do rodapé" className="h-20" />
            <AssetPath value={landingForm.logo_rodape_url} />
            <ImageUploadButton
              label={landingForm.logo_rodape_url ? "Trocar logo" : "Enviar logo"}
              disabled={!isAuthenticated || isSaving}
              onUpload={(file) => uploadLandingImage("logo_rodape_url", file, "brand")}
            />
          </div>
        </div>
        <TextInput label="Tamanho logo rodapé" value={landingForm.logo_rodape_size} onChange={(value) => updateLandingField("logo_rodape_size", value)} />
        <TextInput label="WhatsApp" value={landingForm.whatsapp_numero} onChange={(value) => updateLandingField("whatsapp_numero", value)} />
        <TextInput label="E-mail de contato" value={landingForm.email_contato} onChange={(value) => updateLandingField("email_contato", value)} />
        <div className="md:col-span-2">
          <SaveButton isSaving={isSaving} isAuthenticated={isAuthenticated} label="Salvar configurações" />
        </div>
      </div>
    </form>
  );
}

function ProjectsPanel(props) {
  const {
    projects,
    categories,
    editingSlug,
    projectForm,
    startCreate,
    startEdit,
    cancelEdit,
    updateProjectField,
    uploadProjectImage,
    removeProjectGalleryImage,
    submitProject,
    deleteProject,
    isSaving,
    isAuthenticated,
  } = props;
  const gallery = textToList(projectForm.galleryText);

  return (
    <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <div className="border border-[#ded7c8] bg-white p-5 md:p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className={labelClass}>Projetos</p>
            <h2 className="font-serif-custom text-3xl text-[#1a3d2b]">Acervo publicado</h2>
          </div>
          <button
            type="button"
            onClick={startCreate}
            disabled={!isAuthenticated || isSaving}
            className="inline-flex items-center gap-2 rounded-full bg-[#1a3d2b] px-5 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#2e5d43] disabled:opacity-45"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            Novo
          </button>
        </div>

        <div className="space-y-3">
          {projects.map((project) => (
            <article key={project.slug} className="grid grid-cols-[86px_1fr] gap-4 border border-[#eee7da] bg-[#fbfaf7] p-3">
              <img src={project.cover} alt={project.title} className="h-24 w-[86px] rounded-sm object-cover" />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-[#9b7b2f]">{project.category}</p>
                  {project.isPublished === false && <span className="text-[0.6rem] uppercase tracking-[0.12em] text-stone-400">Rascunho</span>}
                  {project.isFeaturedHome && <span className="text-[0.6rem] uppercase tracking-[0.12em] text-[#1a3d2b]">Destaque home</span>}
                </div>
                <h3 className="mt-1 truncate font-serif-custom text-xl text-[#1a3d2b]">{project.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm leading-6 text-stone-600">{project.summary}</p>
                <div className="mt-4 flex gap-2">
                  <button type="button" onClick={() => startEdit(project)} className="inline-flex items-center gap-2 rounded-full border border-[#d8cfbd] px-3 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.13em] text-[#1f241c] hover:bg-white">
                    <Edit3 className="h-3.5 w-3.5" aria-hidden="true" />
                    Editar
                  </button>
                  <button type="button" onClick={() => deleteProject(project)} disabled={isSaving} className="inline-flex items-center gap-2 rounded-full border border-red-200 px-3 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.13em] text-red-600 hover:bg-red-50 disabled:opacity-45">
                    <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                    Excluir
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
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
              <TextInput label="Nome do projeto" value={projectForm.title} onChange={(value) => updateProjectField("title", value)} />
              <TextInput label="Slug" value={projectForm.slug} onChange={(value) => updateProjectField("slug", value)} placeholder="gerado automaticamente se vazio" />
              <label>
                <span className={labelClass}>Categoria</span>
                <select className={inputClass} value={projectForm.category} onChange={(event) => updateProjectField("category", event.target.value)}>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </label>
              <TextInput label="Ordem" value={projectForm.sortOrder} onChange={(value) => updateProjectField("sortOrder", value)} />
              <TextInput label="Local" value={projectForm.location} onChange={(value) => updateProjectField("location", value)} />
              <TextInput label="Área" value={projectForm.area} onChange={(value) => updateProjectField("area", value)} />
              <TextInput label="Escopo" value={projectForm.scope} onChange={(value) => updateProjectField("scope", value)} />
              <div className="grid gap-3 pt-7">
                <label className="flex items-center gap-3 text-sm text-stone-700">
                  <input type="checkbox" checked={projectForm.isPublished !== false} onChange={(event) => updateProjectField("isPublished", event.target.checked)} />
                  Publicado no site
                </label>
                <label className="flex items-center gap-3 text-sm text-stone-700">
                  <input type="checkbox" checked={projectForm.isFeaturedHome === true} onChange={(event) => updateProjectField("isFeaturedHome", event.target.checked)} />
                  Destaque página inicial
                </label>
              </div>
            </div>

            <div>
              <span className={labelClass}>Imagem de capa</span>
              <div className="grid gap-4 rounded-sm border border-[#d8cfbd] bg-white p-4 md:grid-cols-[220px_1fr]">
                <ImagePreview src={projectForm.cover} alt="Imagem de capa do projeto" className="h-36" />
                <ImageUploadButton
                  label={projectForm.cover ? "Trocar capa" : "Enviar capa"}
                  disabled={!isAuthenticated || isSaving}
                  onUpload={(file) => uploadProjectImage("cover", file)}
                />
              </div>
            </div>

            <div>
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <span className={labelClass}>Antes e depois</span>
                <label className="mb-2 flex items-center gap-2 text-sm text-stone-700">
                  <input
                    type="checkbox"
                    checked={projectForm.beforeAfter?.enabled === true}
                    onChange={(event) =>
                      updateProjectField("beforeAfter", {
                        ...(projectForm.beforeAfter || {}),
                        enabled: event.target.checked,
                        labelBefore: "Antes",
                        labelAfter: "Depois",
                      })
                    }
                  />
                  Ativar seção antes e depois
                </label>
              </div>
              <div className="grid gap-4 rounded-sm border border-[#d8cfbd] bg-white p-4 md:grid-cols-2">
                <div className="grid gap-3">
                  <ImagePreview src={projectForm.beforeAfter?.before} alt="Foto antes do projeto" className="h-40" />
                  <ImageUploadButton
                    label={projectForm.beforeAfter?.before ? "Trocar foto antes" : "Enviar foto antes"}
                    disabled={!isAuthenticated || isSaving}
                    onUpload={(file) => uploadProjectImage("before", file)}
                  />
                </div>
                <div className="grid gap-3">
                  <ImagePreview src={projectForm.beforeAfter?.after} alt="Foto depois do projeto" className="h-40" />
                  <ImageUploadButton
                    label={projectForm.beforeAfter?.after ? "Trocar foto depois" : "Enviar foto depois"}
                    disabled={!isAuthenticated || isSaving}
                    onUpload={(file) => uploadProjectImage("after", file)}
                  />
                </div>
              </div>
              <p className="mt-2 text-xs leading-5 text-stone-500">
                A comparação aparece na página individual somente quando a seção estiver ativa e as duas fotos estiverem preenchidas.
              </p>
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className={labelClass}>Galeria do projeto</span>
                <ImageUploadButton
                  label="Adicionar foto"
                  disabled={!isAuthenticated || isSaving}
                  onUpload={(file) => uploadProjectImage("gallery", file)}
                />
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                {gallery.length === 0 && (
                  <div className="border border-dashed border-[#cfc4af] bg-white/50 p-6 text-sm text-stone-500 md:col-span-3">
                    Nenhuma foto na galeria. Use o botão Adicionar foto.
                  </div>
                )}
                {gallery.map((src, index) => (
                  <article key={`${src}-${index}`} className="border border-[#d8cfbd] bg-white p-3">
                    <ImagePreview src={src} alt={`Foto ${index + 1} da galeria`} className="h-32" />
                    <div className="mt-3 flex gap-2">
                      <ImageUploadButton
                        label="Trocar"
                        compact
                        disabled={!isAuthenticated || isSaving}
                        onUpload={(file) => uploadProjectImage("gallery", file, index)}
                      />
                      <button
                        type="button"
                        onClick={() => removeProjectGalleryImage(index)}
                        className="rounded-full border border-red-200 px-3 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.13em] text-red-600 hover:bg-red-50"
                      >
                        Remover
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <TextArea label="Resumo" value={projectForm.summary} onChange={(value) => updateProjectField("summary", value)} />
            <TextArea label="Desafio" value={projectForm.challenge} onChange={(value) => updateProjectField("challenge", value)} />
            <TextArea label="Solução" value={projectForm.solution} onChange={(value) => updateProjectField("solution", value)} />
            <TextArea label="Plantas utilizadas, uma por linha" value={projectForm.plantsText} onChange={(value) => updateProjectField("plantsText", value)} />
            <SaveButton isSaving={isSaving} isAuthenticated={isAuthenticated} label="Salvar projeto" />
          </div>
        )}
      </form>
    </section>
  );
}

function PanelHeader({ title, description }) {
  return (
    <div className="border border-[#ded7c8] bg-white p-6">
      <p className={labelClass}>Módulo</p>
      <h2 className="font-serif-custom text-3xl text-[#1a3d2b] md:text-4xl">{title}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-600">{description}</p>
    </div>
  );
}

function TextInput({ label, value, onChange, placeholder = "" }) {
  return (
    <label>
      <span className={labelClass}>{label}</span>
      <input className={inputClass} value={value || ""} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />
    </label>
  );
}

function TextArea({ label, value, onChange }) {
  return (
    <label>
      <span className={labelClass}>{label}</span>
      <textarea className={`${inputClass} min-h-28`} value={value || ""} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function ImagePreview({ src, alt, className = "h-32" }) {
  return (
    <div className={`overflow-hidden rounded-sm bg-stone-200 ${className}`}>
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full items-center justify-center text-xs uppercase tracking-[0.14em] text-stone-400">
          Sem foto
        </div>
      )}
    </div>
  );
}

function AssetPath({ value }) {
  return (
    <div className="rounded-sm border border-[#e4dccd] bg-white px-3 py-2">
      <p className="text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-[#8d753f]">Caminho atual</p>
      <p className="mt-1 break-all font-mono text-[0.68rem] leading-5 text-stone-500">
        {value || "Nenhuma imagem definida"}
      </p>
    </div>
  );
}

function ImageUploadButton({ label, onUpload, disabled, compact = false }) {
  const inputId = useMemo(() => `upload-${Math.random().toString(36).slice(2)}`, []);

  return (
    <label
      htmlFor={inputId}
      className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-[#1a3d2b] text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-[#1a3d2b] transition hover:bg-[#1a3d2b] hover:text-white ${
        compact ? "px-3 py-2" : "px-5 py-3"
      } ${disabled ? "pointer-events-none opacity-45" : ""}`}
    >
      <Upload className="h-4 w-4" aria-hidden="true" />
      {label}
      <input
        id={inputId}
        type="file"
        accept="image/*"
        className="hidden"
        disabled={disabled}
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) onUpload(file);
          event.target.value = "";
        }}
      />
    </label>
  );
}

function SaveButton({ isSaving, isAuthenticated, label }) {
  return (
    <button
      type="submit"
      disabled={isSaving || !isAuthenticated}
      className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-[#1a3d2b] px-7 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#2e5d43] disabled:cursor-not-allowed disabled:opacity-45"
    >
      <Save className="h-4 w-4" aria-hidden="true" />
      {isSaving ? "Salvando..." : label}
    </button>
  );
}
