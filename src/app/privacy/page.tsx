"use client"

import * as React from "react"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

// Utility function
function cn(...inputs: (string | undefined)[]) {
  return twMerge(clsx(inputs))
}

// Card components
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props} />
))
Card.displayName = "Card"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />,
)
CardContent.displayName = "CardContent"

// Types
interface Section {
  id: string
  title: string
  content: React.ReactNode
}

// Main component
export default function PrivacyPage() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const sections: Section[] = [
    {
      id: "raccolta",
      title: "Raccolta dei Dati",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">Raccogliamo i seguenti tipi di informazioni:</p>
          <ul className="space-y-3">
            {[
              "Informazioni di contatto (nome, email, telefono)",
              "Dati di utilizzo della piattaforma",
              "Informazioni sul dispositivo e sul browser",
              "Cookie e tecnologie simili",
              "Dati di geolocalizzazione (se consentito)",
              "Informazioni fornite volontariamente attraverso moduli o sondaggi",
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <span className="text-gray-700 mt-1">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-gray-700 leading-relaxed">
            La raccolta di questi dati avviene nel rispetto del Regolamento Generale sulla Protezione dei Dati (GDPR) e
            altre leggi applicabili sulla privacy. Raccogliamo solo i dati necessari per fornire e migliorare i nostri
            servizi.
          </p>
        </div>
      ),
    },
    {
      id: "utilizzo",
      title: "Utilizzo dei Dati",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">Utilizziamo i tuoi dati personali per:</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Fornitura dei Servizi",
                desc: "Gestire il tuo account e fornire i servizi richiesti",
              },
              {
                title: "Miglioramento Servizi",
                desc: "Analizzare e ottimizzare le prestazioni della piattaforma",
              },
              {
                title: "Personalizzazione",
                desc: "Adattare l'esperienza alle tue preferenze",
              },
              {
                title: "Comunicazioni",
                desc: "Inviarti aggiornamenti importanti sul tuo account e sui servizi",
              },
              {
                title: "Marketing",
                desc: "Promozioni personalizzate (solo con il tuo esplicito consenso)",
              },
              {
                title: "Obblighi Legali",
                desc: "Adempiere a obblighi legali e normativi",
              },
            ].map((item, index) => (
              <div key={index} className="p-4 rounded-lg bg-gray-50 space-y-2">
                <h4 className="font-medium text-gray-900">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-700 leading-relaxed">
            Il trattamento dei dati avviene sulla base del consenso dell'utente, per l'esecuzione di un contratto di cui
            l'utente è parte, o per il perseguimento del legittimo interesse del titolare del trattamento, nel rispetto
            dell'art. 6 del GDPR.
          </p>
        </div>
      ),
    },
    {
      id: "protezione",
      title: "Protezione dei Dati",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            La tua privacy è la nostra priorità. Implementiamo rigorose misure di sicurezza in conformità con l'art. 32
            del GDPR:
          </p>
          <div className="grid gap-4">
            {[
              {
                title: "Crittografia Avanzata",
                desc: "Tutti i dati sono crittografati sia in transito che a riposo",
              },
              {
                title: "Monitoraggio 24/7",
                desc: "Sistemi di sicurezza attivi costantemente per prevenire e rilevare violazioni",
              },
              {
                title: "Accesso Controllato",
                desc: "Rigorosi protocolli di autenticazione e autorizzazione per l'accesso ai dati",
              },
              {
                title: "Formazione del Personale",
                desc: "Regolare formazione sulla protezione dei dati per tutto il personale",
              },
              {
                title: "Backup Regolari",
                desc: "Backup periodici dei dati per garantire la continuità del servizio",
              },
            ].map((item, index) => (
              <Card key={index}>
                <CardContent className="p-4 flex gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <div className="h-4 w-4 rounded-full bg-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{item.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-gray-700 leading-relaxed">
            In caso di violazione dei dati, seguiremo le procedure di notifica previste dall'art. 33 e 34 del GDPR.
          </p>
        </div>
      ),
    },
    {
      id: "diritti",
      title: "I Tuoi Diritti",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            In conformità con gli articoli 15-22 del GDPR, hai i seguenti diritti:
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Diritto di accesso ai dati personali (Art. 15)",
              "Diritto di rettifica dei dati inaccurati (Art. 16)",
              "Diritto alla cancellazione dei dati ('diritto all'oblio') (Art. 17)",
              "Diritto di limitazione del trattamento (Art. 18)",
              "Diritto alla portabilità dei dati (Art. 20)",
              "Diritto di opposizione al trattamento (Art. 21)",
              "Diritto di non essere sottoposto a decisioni automatizzate (Art. 22)",
              "Diritto di revocare il consenso in qualsiasi momento",
            ].map((right, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <span className="text-gray-700">{right}</span>
              </div>
            ))}
          </div>
          <p className="text-gray-700 leading-relaxed">
            Per esercitare questi diritti o per qualsiasi domanda sulla nostra politica sulla privacy, contattaci
            utilizzando le informazioni fornite di seguito. Risponderemo alla tua richiesta entro 30 giorni.
          </p>
        </div>
      ),
    },
    {
      id: "contatti",
      title: "Contattaci",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Per qualsiasi domanda sulla privacy dei tuoi dati o per esercitare i tuoi diritti, contattaci:
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                label: "Email del Responsabile Protezione Dati",
                value: "dpo@climawell.net",
                bg: "bg-blue-50",
                text: "text-blue-600",
              },
              {
                label: "Telefono",
                value: "+39 353 420 7394",
                bg: "bg-green-50",
                text: "text-green-600",
              },
              {
                label: "Indirizzo",
                value: "Via delle Tre Pietre, 2/c 50127, Firenze",
                bg: "bg-purple-50",
                text: "text-purple-600",
              },
              {
                label: "Orari",
                value: "Lun-Ven, 9:00-18:00",
                bg: "bg-orange-50",
                text: "text-orange-600",
              },
            ].map((contact, index) => (
              <div key={index} className={`p-4 rounded-lg ${contact.bg}`}>
                <div className="text-sm text-gray-600">{contact.label}</div>
                <div className={`font-medium ${contact.text}`}>{contact.value}</div>
              </div>
            ))}
          </div>
          <p className="text-gray-700 leading-relaxed">
            Hai il diritto di presentare un reclamo all'autorità di controllo competente se ritieni che il trattamento
            dei tuoi dati personali violi il GDPR o altre leggi sulla protezione dei dati.
          </p>
        </div>
      ),
    },
    {
      id: "modifiche",
      title: "Modifiche alla Privacy Policy",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Ci riserviamo il diritto di modificare questa politica sulla privacy in qualsiasi momento. Ogni modifica
            sarà pubblicata su questa pagina con la data di ultima modifica aggiornata.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Ti invitiamo a rivedere periodicamente questa politica per essere informato su come proteggiamo le tue
            informazioni.
          </p>
        </div>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Informativa sulla Privacy</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              La tua privacy è importante per noi. Questa informativa spiega come raccogliamo, utilizziamo e proteggiamo
              i tuoi dati personali in conformità con il Regolamento Generale sulla Protezione dei Dati (GDPR) e altre
              leggi applicabili sulla privacy.
            </p>
          </div>

          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  Ultimo aggiornamento:{" "}
                  {new Date().toLocaleDateString("it-IT", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {sections.map((section) => (
              <Card key={section.id} className="overflow-hidden">
                <button
                  onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                  className="w-full p-6 flex items-center justify-between hover:bg-gray-50/50 transition-colors"
                >
                  <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-500 transition-transform ${
                      expandedSection === section.id ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {expandedSection === section.id && <div className="px-6 pb-6">{section.content}</div>}
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Cliamwell S.R.L. Tutti i diritti riservati.</p>
            <p className="mt-2">
              Per ulteriori informazioni sui tuoi diritti o su come trattiamo i tuoi dati, consulta la nostra{" "}
              <a href="#" className="text-primary hover:underline">
                Politica sulla Privacy completa
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

