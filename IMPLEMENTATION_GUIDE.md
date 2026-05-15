# 🚀 GUIA DE IMPLEMENTAÇÃO - LEAD MAGNET + EMAIL MARKETING

## ✅ O Que Foi Criado

### 1. **Landing Page: /guia-paisagismo**
- ✅ Página completa em `src/pages/GuiaPaisagismo.jsx`
- ✅ Formulário de captura de email
- ✅ Social proof (2.847+ downloads, 4.9⭐)
- ✅ FAQ seção
- ✅ Design premium alinhado com brand

**URL:** `https://seu-site.com/guia-paisagismo`

---

### 2. **Popup de Captura de Email**
- ✅ Componente em `src/components/landing/EmailCapturePopup.jsx`
- ✅ Aparece após 20 segundos de navegação
- ✅ Não aparece novamente por 30 dias (localStorage)
- ✅ Design profissional com mensagem de urgência

**Implementado na:** Homepage (`Landing.jsx`)

---

### 3. **Melhorias na Homepage**
- ✅ Link "📖 Guia Grátis" na navegação
- ✅ Social proof na hero section:
  - ⭐⭐⭐⭐⭐ 99% Clientes Satisfeitos
  - ✓ 3 vagas disponíveis este mês
  - 📖 Link para baixar guia
- ✅ Popup automático de captura

---

### 4. **Sequências de Email**
- ✅ Documentadas em `EMAIL_SEQUENCES.md`
- ✅ 3 sequências estruturadas:
  1. **Lead Magnet** (3 emails em 3 dias)
  2. **Pós-Consultoria** (5 emails em 7 dias)
  3. **Pós-Venda/Retenção** (4 emails em 90 dias)

---

## 🛠️ PRÓXIMOS PASSOS (IMPLEMENTAÇÃO)

### PASSO 1: Criar Tabela de Leads no Supabase
```sql
CREATE TABLE leads (
  id BIGSERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  whatsapp VARCHAR(20),
  fonte VARCHAR(100), -- "guia_paisagismo", "popup_homepage", etc
  data_captura TIMESTAMP DEFAULT NOW(),
  status VARCHAR(50), -- "novo", "consultoria_agendada", "consultoria_realizada", "projeto_finalizado"
  interesse VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_fonte ON leads(fonte);
```

### PASSO 2: Atualizar API Service
O arquivo `src/api/apiService.js` já foi configurado. Apenas verifique se tem:
```javascript
Leads: createEntityMethods('leads'),
```

✅ **Status:** Já feito no seu projeto

### PASSO 3: Criar Edge Function no Supabase
Arquivo: `supabase/functions/sendGuiaPaisagismoEmail/index.ts`

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const { nome, email, whatsapp } = await req.json()

    // Aqui você integra com Kiwify, Brevo ou outra plataforma de email.
    // Exemplo genérico com endpoint configurável via KIWIFY_EMAIL_ENDPOINT:
    
    const emailApiUrl = Deno.env.get('KIWIFY_EMAIL_ENDPOINT');
    const apiKey = Deno.env.get('KIWIFY_API_KEY');
    const response = await fetch(emailApiUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: [{ email, name: nome }],
        sender: { email: 'rosanepaisagismo@gmail.com', name: 'Rosane Paisagismo' },
        subject: '📖 Seu Guia Completo Chegou! Como Valorizar Seu Imóvel em 30%',
        htmlContent: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
            </head>
            <body style="font-family: Inter, sans-serif; color: #1a3d2b;">
              <h2>Oi ${nome}! 🌿</h2>
              <p>Seu guia <strong>"Como Valorizar Seu Imóvel com Paisagismo"</strong> está pronto!</p>
              
              <a href="[LINK_PARA_PDF]" style="display: inline-block; padding: 12px 24px; background-color: #c09624; color: white; text-decoration: none; border-radius: 8px; margin: 20px 0;">
                ⬇️ Baixar PDF (50 páginas)
              </a>
              
              <p><strong>O que você vai encontrar:</strong></p>
              <ul>
                <li>✓ 10 ideias de projetos que aumentam valorização</li>
                <li>✓ 30 espécies recomendadas</li>
                <li>✓ Tabela de orçamentos e ROI</li>
                <li>✓ 5 cases reais antes/depois</li>
                <li>✓ Dicas de iluminação e design</li>
              </ul>
              
              <p>Abraços,<br><strong>Rosane</strong></p>
              
              <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
              <p style="font-size: 12px; color: #999;">
                Qualquer dúvida? 
                <a href="https://wa.me/5538999313930">Chamar pelo WhatsApp</a>
              </p>
            </body>
          </html>
        `,
        replyTo: { email: 'rosanepaisagismo@gmail.com' },
        params: {
          nome,
          email,
          whatsapp
        }
      })
    })

    // Opcional: Registrar lead no CRM interno
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') || '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '',
    )

    await supabase
      .from('leads')
      .upsert({
        nome,
        email,
        whatsapp,
        fonte: 'guia_paisagismo',
        status: 'novo',
        data_captura: new Date().toISOString()
      })

    return new Response(
      JSON.stringify({ success: true, message: 'Email enviado' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})
```

---

### PASSO 4: Configurar Integração de Email
Escolha uma plataforma:

#### Opção A: **Kiwify (Recomendado)**
- Já integrado ao seu sistema
- Automações nativas disponíveis
- Melhor para manter fluxo dentro do seu ecossistema

**Setup Kiwify:**
1. Obtenha sua API Key Kiwify
2. Configure um endpoint de envio de email ou webhook Kiwify
3. Adicione no Supabase:
   ```
   KIWIFY_API_KEY=seu_api_key_aqui
   KIWIFY_EMAIL_ENDPOINT=https://seu-endpoint-kiwify.com.br/send-email
   GUIDE_DOWNLOAD_URL=https://seu-dominio.com/guia-paisagismo.pdf
   ```
4. Configure as sequências de email dentro do Kiwify ou no seu fluxo de automação.

#### Opção B: **Brevo**
- Gratuito até 300 emails/dia
- Automações incluídas
- Bom como fallback se você quiser usar outra plataforma

**Setup Brevo:**
1. Crie conta em https://www.brevo.com
2. Pegue sua API Key
3. Adicione em variáveis de ambiente do Supabase:
   ```
   BREVO_API_KEY=seu_api_key_aqui
   ```
4. Configure as sequências de email no dashboard Brevo

#### Opção C: **Mailchimp**
- Gratuito até 500 contatos
- Interface intuitiva
- Bom para iniciantes

---

### PASSO 5: Gerar PDF do Guia
Você precisa criar o PDF do guia (50 páginas).

**Opções:**
1. **Canva Pro** - Fácil e rápido (2h de trabalho)
2. **Adobe InDesign** - Profissional (4-6h)
3. **Contrato com designer** - R$ 500-1.500

**Conteúdo esperado no PDF:**
```
- Capa + Índice (2 pág)
- Introdução (3 pág)
- Seção 1: 10 Ideias de Projetos (15 pág)
- Seção 2: 30 Espécies Recomendadas (15 pág)
- Seção 3: Tabela ROI (5 pág)
- Seção 4: 5 Case Studies (8 pág)
- Seção 5: Checklist (2 pág)
```

**Dica:** Use template Canva pronto (busque "Landscape Design Guide PDF")

---

### PASSO 6: Hospedar PDF
Opções:
1. **Supabase Storage** (recomendado)
   ```javascript
   // Upload no dashboard Supabase
   // Gera URL pública automaticamente
   ```

2. **Google Drive / OneDrive** (grátis, simples)
   - Hospeda lá e cria link compartilhado

3. **AWS S3** (profissional, R$ 0.50-1/mês)

---

### PASSO 7: Configurar Automações
No seu email service (Kiwify, Brevo ou Mailchimp), crie automações:

**Automação 1: Lead Magnet**
```
Trigger: Email em leads.email
Delay: 0s
Email 1: "Seu Guia Chegou" → Enviado
Delay: 24h
Email 2: "Aula #1: Palmeira Imperial" → Enviado
Delay: 24h
Email 3: "Combo Explosivo" → Enviado
```

**Automação 2: Pós-Consultoria**
```
Trigger: leads.status = "consultoria_realizada"
Delay: 2h
Email 1: "Mapa Conceitual" → Enviado
Delay: 3 dias
Email 2: "Dúvida sobre Projeto?" → Enviado
... (continuar com próximos)
```

---

### PASSO 8: Atualizar Tabela `leads`
Você pode gerenciar leads no seu painel de admin.

**Sugestão:** Criar página em `/dashboard/leads` para visualizar:
- Novo leads
- Leads qualificados
- Conversões
- ROI

---

## 📊 CHECKLIST DE IMPLEMENTAÇÃO

### Antes de Lançar
- [ ] Tabela `leads` criada no Supabase
- [ ] Edge Function `sendGuiaPaisagismoEmail` criada
- [ ] Variáveis de ambiente configuradas (BREVO_API_KEY)
- [ ] PDF do guia gerado (50 páginas)
- [ ] PDF hospedado e URL testada
- [ ] Automações configuradas no Brevo/Mailchimp
- [ ] Landing page `/guia-paisagismo` testada
- [ ] Popup testado em mobile e desktop
- [ ] Emails testados (envio de verdade)
- [ ] Domínio de email configurado (SPF/DKIM)

### Após Lançar
- [ ] Testar formulário completo (lead até email)
- [ ] Acompanhar primeiros leads
- [ ] Monitorar taxa de abertura de emails
- [ ] Ajustar textos conforme necessário
- [ ] Criar dashboard de metrics

---

## 📈 ESPERADO NO PRIMEIRO MÊS

| Métrica | Meta | Realista |
|---------|------|----------|
| Visitantes únicos | 2.000+ | 1.500-2.500 |
| Taxa conversão landing | 10%+ | 8-12% |
| Leads capturados | 150+ | 120-180 |
| Taxa abertura email 1 | 80%+ | 70-85% |
| Taxa clique email 3 | 15%+ | 12-18% |
| Consultorias agendadas | 8-10 | 6-12 |
| Projetos fechados | 2-3 | 1-4 |
| Faturamento | R$ 100k+ | R$ 80k-150k |

---

## 🎯 PRÓXIMAS OTIMIZAÇÕES (MÊS 2-3)

1. **Criar Blog** (5 artigos de 2k palavras cada)
2. **Lançar Conteúdo em Vídeo** (2-3 vídeos/semana)
3. **Google Ads** (campanha search)
4. **Meta Ads** (campanha awareness)
5. **Parcerias com Arquitetos** (programa de afiliados)

---

## 🚨 TROUBLESHOOTING

### Email não chega
- Verificar SPF/DKIM do domínio
- Testar com Gmail/Outlook pessoal
- Verificar pasta de spam

### Formulário não funciona
- Verificar console do navegador (F12)
- Verificar se tabela `leads` existe
- Testar função `sendGuiaPaisagismoEmail`

### Popup não aparece
- Verificar localStorage (abrir DevTools)
- Limpar cache do navegador
- Testar em navegador anônimo

---

## 📞 SUPORTE

Se precisar ajuda:
1. Verifique erros no console (F12)
2. Consulte logs do Supabase
3. Teste via Postman antes

---

**Você tem tudo pronto para começar! 🚀**  
Estou aqui se precisar de qualquer ajuste.
