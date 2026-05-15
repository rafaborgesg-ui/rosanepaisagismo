# 🧪 GUIA DE TESTE RÁPIDO (30 MINUTOS)

## ✅ PRÉ-REQUISITOS
- [ ] Node.js instalado
- [ ] Projeto rodando em `npm run dev`
- [ ] Supabase conectado
- [ ] Navegador aberto em `http://localhost:5173`

---

## 🧪 TESTE 1: LANDING PAGE DO GUIA

### Passos:
1. Navegar para: `http://localhost:5173/guia-paisagismo`
2. Verificar:
   - [ ] Página carrega sem erros (console F12)
   - [ ] Layout responsivo (testar em mobile)
   - [ ] Imagens carregam
   - [ ] Botões funcionam

### Teste de Formulário:
1. Preencher:
   ```
   Nome: Test User
   Email: test@example.com
   WhatsApp: (11) 99999-9999
   ```
2. Clicar "✨ Receber Guia Agora"
3. Verificar:
   - [ ] Loading state aparece
   - [ ] Sucesso mensagem exibe
   - [ ] Consola não mostra erros
   - [ ] Dados salvo em `leads` (verificar Supabase)

**Resultado esperado:** ✅ Sem erros, com sucesso visual

---

## 🧪 TESTE 2: POPUP NA HOMEPAGE

### Passos:
1. Navegar para: `http://localhost:5173/`
2. **Aguardar 20 segundos** (não recarregar!)
3. Verificar:
   - [ ] Popup aparece após 20s
   - [ ] Tem overlay blur ao fundo
   - [ ] Pode fechar com X
   - [ ] Tem formulário

### Teste de Fechamento:
1. Clicar X
2. Recarregar página (F5)
3. Verificar:
   - [ ] Popup NÃO aparece novamente (localStorage)

### Teste de Formulário:
1. Reabrir DevTools > Application > localStorage
2. Deletar entrada `emailPopupSeen`
3. Recarregar página
4. Aguardar 20s
5. Popup aparece novamente
6. Preencher formulário com dados teste
7. Verificar:
   - [ ] Email enviado sucesso
   - [ ] Mensagem "Guia enviado! 🎉" aparece
   - [ ] Fechar automático em 3s

**Resultado esperado:** ✅ Popup funciona, localStorage OK

---

## 🧪 TESTE 3: MELHORIAS NA HOMEPAGE

### Homepage - Link Guia Grátis:
1. Abrir home `http://localhost:5173/`
2. Ver navegação superior
3. Verificar:
   - [ ] Link "📖 Guia Grátis" visível (desktop)
   - [ ] Clica e leva para `/guia-paisagismo`
   - [ ] Funciona em mobile também

### Homepage - Social Proof:
1. Scroll até hero section
2. Abaixo dos buttons de CTA
3. Verificar:
   - [ ] "⭐⭐⭐⭐⭐ 99% Clientes Satisfeitos" visível
   - [ ] "✓ 3 vagas disponíveis" visível
   - [ ] "📖 Baixar Guia Grátis" é link funcional
   - [ ] Design alinhado com resto da página

**Resultado esperado:** ✅ Tudo visível e responsivo

---

## 🧪 TESTE 4: BANCO DE DADOS

### Verificar tabela `leads`:
1. Abrir Supabase console
2. Navegar para `Table Editor`
3. Selecionar table `leads` (se criada)
4. Verificar:
   - [ ] Tabela existe
   - [ ] Colunas: id, nome, email, whatsapp, fonte, status, data_captura
   - [ ] Leads anteriores aparecem ali

**Resultado esperado:** ✅ Tabela criada e com dados

---

## 🧪 TESTE 5: CÓDIGO CORRETO

### Verificar imports:
```bash
# No arquivo: src/pages/Landing.jsx
# Procure por estas linhas:
```

**Comando:**
```bash
grep -n "EmailCapturePopup" src/pages/Landing.jsx
```

**Esperado:** 
```
7: import EmailCapturePopup from "@/components/landing/EmailCapturePopup";
366: <EmailCapturePopup />
```

### Verificar rota:
```bash
# No arquivo: src/App.jsx
grep -n "GuiaPaisagismo\|guia-paisagismo" src/App.jsx
```

**Esperado:**
```
16: import GuiaPaisagismo from './pages/GuiaPaisagismo';
64: <Route path="/guia-paisagismo" element={<GuiaPaisagismo />} />
```

**Resultado esperado:** ✅ Imports e rotas corretos

---

## 🚨 TROUBLESHOOTING

### Popup não aparece após 20s
```bash
# Solução 1: Verificar localStorage
# Console > localStorage > buscar "emailPopupSeen"
# Se existir, deletar e recarregar

# Solução 2: Verificar erro no console (F12)
# Procurar por erros em vermelho

# Solução 3: Testar em navegador incógnito
# (garante localStorage limpo)
```

### Landing page do guia mostra 404
```bash
# Solução 1: Verificar rota em App.jsx
# Deve estar: <Route path="/guia-paisagismo" ...>

# Solução 2: Recarregar página (F5)
# Às vezes o router precisa recarregar

# Solução 3: Verificar console por erros de import
# Arquivo pode estar com erro de sintaxe
```

### Formulário não submete
```bash
# Solução 1: Abrir DevTools (F12) > Console
# Procurar por erros vermelho

# Solução 2: Verificar Supabase está conectado
# Teste: firebase.js carrega sem erro

# Solução 3: Verificar campos obrigatórios
# Nome, email são obrigatórios
```

### Emails não aparecem em Supabase
```bash
# Solução 1: Verificar tabela `leads` foi criada
# SELECT * FROM leads; (via SQL Editor)

# Solução 2: Verificar Edge Function foi publicada
# Supabase > Functions > sendGuiaPaisagismoEmail

# Solução 3: Verificar variáveis de ambiente
# KIWIFY_API_KEY e KIWIFY_EMAIL_ENDPOINT configurados?
```

---

## ✅ CHECKLIST FINAL DE TESTE

```
LANDING PAGE
- [ ] Carrega sem erros
- [ ] Layout responsivo
- [ ] Formulário funciona
- [ ] Sucesso mensagem aparece
- [ ] Dados salvos em Supabase

POPUP
- [ ] Aparece após 20s
- [ ] Pode fechar
- [ ] Formulário funciona
- [ ] localStorage funciona (não repetir)
- [ ] Responsivo mobile

HOMEPAGE UPDATES
- [ ] Link "Guia Grátis" na nav
- [ ] Social proof visível na hero
- [ ] Popup funciona na home também
- [ ] Mobile responsivo

CÓDIGO
- [ ] Imports corretos
- [ ] Rotas corretas
- [ ] Sem erros de console
- [ ] Arquivos criados

DATABASE
- [ ] Tabela `leads` criada
- [ ] Dados inserindo corretamente
- [ ] Campos corretos
```

---

## 🎯 QUANDO TUDO PASSAR

Se todos os testes passarem:

1. ✅ **Seu sistema está pronto para usar**
2. ✅ **Você pode ir para próxima fase** (Supabase + Email)
3. ✅ **Começar a capturar leads de verdade**

---

## 📊 RESULTADOS ESPERADOS

Quando tudo estiver rodando:

**Por hora:**
- 100 visitantes = 8-10 leads

**Por dia:**
- 800 visitantes = 64-80 leads

**Por mês:**
- 24.000 visitantes = 1.920-2.400 leads

Com 5-8% conversão de leads → consultoria = **100-200 consultorias/mês**

Com 70% conversão de consultoria → projeto = **70-140 projetos/mês**

Com R$ 50k ticket médio = **R$ 3.5M-7M faturamento potencial**

Escala 5-10% de sucesso = **R$ 175k-700k reais**

---

**Pronto para começar os testes? 🚀**
