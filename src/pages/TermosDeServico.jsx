import { Link } from "react-router-dom";
import SiteFooter from "@/components/landing/SiteFooter";

export default function TermosDeServico() {
  return (
    <div className="min-h-screen bg-[#f9f9f9] overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,600;0,700;1,400;1,700&family=Work+Sans:wght@300;400;600&display=swap');
        .font-serif-custom { font-family: 'Noto Serif', serif; }
        .font-sans-custom { font-family: 'Work Sans', sans-serif; }
      `}</style>

      {/* Navbar simples */}
      <nav className="bg-white border-b border-stone-100 px-6 h-16 flex items-center">
        <div className="max-w-4xl mx-auto w-full flex items-center justify-between">
          <Link to="/" className="font-serif-custom text-lg font-bold text-[#1a3d2b]">
            Rosane Paisagismo
          </Link>
          <Link to="/" className="text-sm text-stone-500 hover:text-[#276a4d] transition-colors font-sans-custom">
            ← Voltar ao site
          </Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-16 font-sans-custom">
        <h1 className="font-serif-custom text-4xl text-[#1a3d2b] mb-4">Termos de Serviço</h1>
        <p className="text-stone-400 text-sm mb-12">Última atualização: maio de 2026</p>

        <div className="space-y-10 text-stone-600 leading-relaxed">

          <section>
            <h2 className="font-serif-custom text-2xl text-[#1a3d2b] mb-3">1. Aceitação dos Termos</h2>
            <p>
              Ao acessar ou utilizar a plataforma <strong>Rosane Paisagismo</strong> ("Serviço"), você concorda com estes Termos de Serviço. Se não concordar com qualquer parte destes termos, não utilize o Serviço.
            </p>
          </section>

          <section>
            <h2 className="font-serif-custom text-2xl text-[#1a3d2b] mb-3">2. Descrição do Serviço</h2>
            <p>
              A plataforma Rosane Paisagismo oferece ferramentas de gestão financeira e operacional voltadas para profissionais de paisagismo, arquitetura e design, incluindo controle de receitas, despesas, projetos, pipeline comercial e relatórios.
            </p>
          </section>

          <section>
            <h2 className="font-serif-custom text-2xl text-[#1a3d2b] mb-3">3. Cadastro e Conta</h2>
            <p>Para utilizar o Serviço, você deve:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Fornecer informações verdadeiras, precisas e completas no cadastro;</li>
              <li>Manter a confidencialidade de suas credenciais de acesso;</li>
              <li>Ser responsável por todas as atividades realizadas em sua conta;</li>
              <li>Notificar imediatamente qualquer uso não autorizado da sua conta.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif-custom text-2xl text-[#1a3d2b] mb-3">4. Planos e Pagamentos</h2>
            <p>
              O Serviço é oferecido em diferentes planos de assinatura. Os pagamentos são processados por plataformas seguras de terceiros. Ao assinar um plano:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Você autoriza a cobrança recorrente conforme o período escolhido (mensal, semestral ou anual);</li>
              <li>Os valores são os vigentes no momento da contratação;</li>
              <li>O acesso é concedido imediatamente após a confirmação do pagamento;</li>
              <li>Cancelamentos não geram reembolso proporcional, salvo disposição legal em contrário.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif-custom text-2xl text-[#1a3d2b] mb-3">5. Uso Aceitável</h2>
            <p>Você concorda em não utilizar o Serviço para:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Atividades ilegais ou fraudulentas;</li>
              <li>Compartilhar sua conta com terceiros não autorizados;</li>
              <li>Tentar acessar sistemas ou dados de outros usuários;</li>
              <li>Transmitir vírus, malware ou qualquer código malicioso;</li>
              <li>Reproduzir, copiar ou redistribuir o Serviço sem autorização prévia.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif-custom text-2xl text-[#1a3d2b] mb-3">6. Propriedade Intelectual</h2>
            <p>
              Todo o conteúdo da plataforma — incluindo textos, layouts, funcionalidades, logotipos e materiais educativos — é de propriedade exclusiva da Rosane Paisagismo e protegido por leis de propriedade intelectual. É proibida qualquer reprodução sem autorização expressa.
            </p>
          </section>

          <section>
            <h2 className="font-serif-custom text-2xl text-[#1a3d2b] mb-3">7. Seus Dados</h2>
            <p>
              Os dados inseridos por você na plataforma permanecem de sua propriedade. Ao utilizar o Serviço, você nos concede permissão para armazenar e processar esses dados exclusivamente para a prestação do serviço contratado. Consulte nossa{" "}
              <Link to="/privacidade" className="text-[#276a4d] underline">Política de Privacidade</Link>{" "}
              para mais detalhes.
            </p>
          </section>

          <section>
            <h2 className="font-serif-custom text-2xl text-[#1a3d2b] mb-3">8. Disponibilidade do Serviço</h2>
            <p>
              Nos esforçamos para manter o Serviço disponível 24 horas por dia, 7 dias por semana. No entanto, não garantimos disponibilidade ininterrupta e não nos responsabilizamos por indisponibilidades decorrentes de manutenção, falhas técnicas ou fatores externos.
            </p>
          </section>

          <section>
            <h2 className="font-serif-custom text-2xl text-[#1a3d2b] mb-3">9. Limitação de Responsabilidade</h2>
            <p>
              O Serviço é fornecido "como está". Não nos responsabilizamos por danos indiretos, incidentais ou consequentes decorrentes do uso ou da impossibilidade de uso da plataforma, incluindo perda de dados ou lucros cessantes.
            </p>
          </section>

          <section>
            <h2 className="font-serif-custom text-2xl text-[#1a3d2b] mb-3">10. Rescisão</h2>
            <p>
              Podemos suspender ou encerrar sua conta a qualquer momento em caso de violação destes Termos. Você pode cancelar sua assinatura a qualquer momento pelas configurações da plataforma ou entrando em contato com nosso suporte.
            </p>
          </section>

          <section>
            <h2 className="font-serif-custom text-2xl text-[#1a3d2b] mb-3">11. Alterações nos Termos</h2>
            <p>
              Reservamo-nos o direito de modificar estes Termos a qualquer momento. Notificaremos sobre alterações relevantes por e-mail ou aviso na plataforma. O uso continuado do Serviço após as alterações implica aceitação dos novos termos.
            </p>
          </section>

          <section>
            <h2 className="font-serif-custom text-2xl text-[#1a3d2b] mb-3">12. Lei Aplicável</h2>
            <p>
              Estes Termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da comarca de domicílio do usuário para resolução de quaisquer disputas.
            </p>
          </section>

          <section>
            <h2 className="font-serif-custom text-2xl text-[#1a3d2b] mb-3">13. Contato</h2>
            <p>Em caso de dúvidas sobre estes Termos, entre em contato:</p>
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
