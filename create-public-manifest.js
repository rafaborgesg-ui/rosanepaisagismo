#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dir = path.join(__dirname, 'public');

try {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log('✅ Pasta public/ criada com sucesso!');
  } else {
    console.log('✅ Pasta public/ já existe.');
  }

  // Create manifest.json
  const manifestContent = {
    name: "Rosane Paisagismo",
    short_name: "Rosane",
    description: "Plataforma de Gestão de Projetos em Paisagismo",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#ffffff",
    theme_color: "#276a4d",
    icons: [
      {
        src: "https://base44.com/logo_v2.svg",
        sizes: "192x192",
        type: "image/svg+xml",
        purpose: "any"
      },
      {
        src: "https://base44.com/logo_v2.svg",
        sizes: "512x512",
        type: "image/svg+xml",
        purpose: "any"
      }
    ],
    categories: ["business", "productivity"]
  };

  const manifestPath = path.join(dir, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifestContent, null, 2));
  console.log('✅ Arquivo public/manifest.json criado com sucesso!');

} catch (error) {
  console.error('❌ Erro:', error.message);
  process.exit(1);
}
