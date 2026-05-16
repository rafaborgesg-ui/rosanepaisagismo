import { Link } from "react-router-dom";
import SiteNav from "@/components/landing/SiteNav";
import SiteFooter from "@/components/landing/SiteFooter";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#f9f9f9] overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,600;0,700;1,400;1,700&family=Work+Sans:wght@300;400;600&display=swap');
        .font-serif-custom { font-family: 'Noto Serif', serif; }
        .font-sans-custom { font-family: 'Work Sans', sans-serif; }
      `}</style>
      <SiteNav />

      <main className="max-w-4xl mx-auto px-6 pb-16 pt-32 font-sans-custom">
        <h1 className="font-serif-custom text-4xl text-[#1a3d2b] mb-4">Política de Privacidade</h1>
        <p className="text-stone-400 text-sm mb-12">Última atualização: maio de 2026</p>

        <div className="prose prose-stone max-w-none space-y-10 text-stone-600 leading-relaxed">

          <section>
            <h2 className="font-serif-custom text-2xl text-[#1a3d2b] mb-3">1. Introdução</h2>
            <p>
              A <strong>Rosane Paisagismo</strong> ("nós", "nosso") respeita a sua privacidade e está comprometida em proteger os dados pessoais que você nos fornece. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos as suas informações ao utilizar nosso site e plataforma de gestão.
            </p>
          </section>

          <section>
            <h2 className="font-serif-custom text-2xl text-[#1a3d2b] mb-3">2. Dados que coletamos</h2>
            <p>Podemos coletar os seguintes tipos de informações:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><strong>Dados de identificação:</strong> nome, endereço de e-mail e telefone fornecidos ao criar uma conta ou preencher formulários de contato.</li>
              <li><strong>Dados de uso:</strong> informações sobre como você interage com a plataforma, como páginas visitadas e ações realizadas.</li>
              <li><strong>Dados financeiros:</strong> informações de pagamento processadas por plataformas seguras de terceiros (Kiwify). Não armazenamos dados de cartão de crédito diretamente.</li>
              <li><strong>Dados técnicos:</strong> endereço IP, tipo de navegador e dispositivo, para fins de segurança e melhoria do serviço.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif-custom text-2xl text-[#1a3d2b] mb-3">3. Como usamos seus dados</h2>
            <p>Utilizamos suas informações para:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Fornecer e manter os serviços da plataforma;</li>
              <li>Processar pagamentos e gerenciar assinaturas;</li>
              <li>Enviar comunicações relacionadas ao serviço (confirmações, suporte);</li>
              <li>Melhorar a experiência do usuário e desenvolver novos recursos;</li>
              <li>Cumprir obrigações legais e regulatórias.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif-custom text-2xl text-[#1a3d2b] mb-3">4. Compartilhamento de dados</h2>
            <p>
              Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, exceto nas seguintes situações:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><strong>Provedores de serviço:</strong> parceiros como plataformas de pagamento (Kiwify) que nos auxiliam na operação do serviço, sujeitos a acordos de confidencialidade.</li>
              <li><strong>Obrigação legal:</strong> quando exigido por lei, ordem judicial ou autoridade competente.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif-custom text-2xl text-[#1a3d2b] mb-3">5. Armazenamento e segurança</h2>
            <p>
              Seus dados são armazenados em servidores seguros com criptografia. Adotamos medidas técnicas e organizacionais adequadas para proteger suas informações contra acesso não autorizado, perda ou destruição. Ainda assim, nenhum método de transmissão pela internet é 100% seguro.
            </p>
          </section>

          <section>
            <h2 className="font-serif-custom text-2xl text-[#1a3d2b] mb-3">6. Cookies</h2>
            <p>
              Utilizamos cookies para melhorar a experiência de navegação, manter sessões de usuário e analisar o uso da plataforma. Você pode configurar seu navegador para recusar cookies, mas isso pode afetar algumas funcionalidades do site.
            </p>
          </section>

          <section>
            <h2 className="font-serif-custom text-2xl text-[#1a3d2b] mb-3">7. Seus direitos (LGPD)</h2>
            <p>Em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você tem o direito de:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Confirmar a existência de tratamento dos seus dados;</li>
              <li>Acessar, corrigir ou atualizar seus dados;</li>
              <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários;</li>
              <li>Revogar o consentimento a qualquer momento;</li>
              <li>Solicitar a portabilidade dos seus dados.</li>
            </ul>
            <p className="mt-3">Para exercer esses direitos, entre em contato pelo e-mail: <a href="mailto:contato@rosanepaisagismo.com" className="text-[#276a4d] underline">contato@rosanepaisagismo.com</a></p>
          </section>

          <section>
            <h2 className="font-serif-custom text-2xl text-[#1a3d2b] mb-3">8. Retenção de dados</h2>
            <p>
              Mantemos seus dados pelo tempo necessário para a prestação dos serviços ou conforme exigido por lei. Após o encerramento da conta, seus dados poderão ser removidos dentro de 90 dias, salvo obrigação legal de retenção.
            </p>
          </section>

          <section>
            <h2 className="font-serif-custom text-2xl text-[#1a3d2b] mb-3">9. Alterações nesta política</h2>
            <p>
              Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos sobre mudanças significativas por e-mail ou por aviso destacado na plataforma. Recomendamos que você revise esta página regularmente.
            </p>
          </section>

          <section>
            <h2 className="font-serif-custom text-2xl text-[#1a3d2b] mb-3">10. Contato</h2>
            <p>
              Em caso de dúvidas sobre esta Política de Privacidade, entre em contato:
            </p>
            <ul className="list-none mt-3 space-y-1">
              <li><strong>E-mail:</strong> <a href="mailto:contato@rosanepaisagismo.com" className="text-[#276a4d] underline">contato@rosanepaisagismo.com</a></li>
              <li><strong>Site:</strong> <Link to="/" className="text-[#276a4d] underline">rosanepaisagismo.com</Link></li>
            </ul>
          </section>

        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
