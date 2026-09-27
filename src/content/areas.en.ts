import type { Area } from "./areas";

// English version of the practice areas. Same slugs and icons as the Spanish file.
export const areasEn: Area[] = [
  {
    slug: "corporativo-y-mercantil",
    nombre: "Corporate & Commercial",
    icono: "corporativo",
    resumen: "A solid legal structure so your company can grow without surprises.",
    tarjeta: "Company formation, commercial contracts, shareholder agreements, mergers and acquisitions.",
    intro:
      "We advise Mexican and foreign companies at every stage of their corporate life: from incorporation and corporate governance to new investors, company acquisitions and the contracts behind day-to-day operations.",
    servicios: [
      "Company formation (S.A. de C.V., S.A.P.I., S. de R.L., S.A.S.)",
      "Shareholder meetings, minutes and corporate books",
      "Commercial and distribution contracts",
      "Shareholder and partnership agreements",
      "Mergers, spin-offs and acquisitions",
      "Legal due diligence",
      "Corporate governance",
      "Franchising",
    ],
    escenarios: [
      { titulo: "You are starting a business with partners", texto: "Agreeing on contributions, control and exit from day one prevents the most expensive disputes." },
      { titulo: "An investor is coming in", texto: "We negotiate the round and protect your voting rights, dilution and exit." },
      { titulo: "You are buying or selling a company", texto: "We review contingencies before signing and structure the transaction." },
    ],
    faqs: [
      { pregunta: "Which type of company suits me?", respuesta: "It depends on the number of partners, the investment plan and how decisions will be made. An S.A.S. is agile for small businesses; an S.A. de C.V. or S.A.P.I. gives more room to grow and raise capital. We define it with you in the first consultation." },
      { pregunta: "How long does it take to incorporate a company?", respuesta: "An S.A.S. can be set up online in a few days. An S.A. de C.V. before a notary or commercial broker usually takes one to three weeks, depending on the documents available." },
      { pregunta: "Can you keep my company's corporate books?", respuesta: "Yes. We handle annual meetings, share registries and minutes, so the company is always in order for banks, auditors and investors." },
    ],
  },
  {
    slug: "litigio-civil-y-mercantil",
    nombre: "Civil & Commercial Litigation",
    icono: "litigio",
    resumen: "Procedural strategy to defend your interests in court.",
    tarjeta: "Ordinary and executive proceedings, collections, breach of contract, leases and arbitration.",
    intro:
      "We design every lawsuit as a strategy, not a formality. First we assess whether it makes sense to negotiate, mediate or litigate, and when we go to court we do it with rigorous preparation before local and federal courts.",
    servicios: [
      "Ordinary and executive commercial proceedings",
      "Oral commercial proceedings",
      "Judicial and out-of-court collections",
      "Breach of contract",
      "Lease disputes",
      "Alternative dispute resolution",
      "Commercial arbitration",
    ],
    escenarios: [
      { titulo: "A client is not paying you", texto: "We review your instruments and contracts to choose the fastest collection route." },
      { titulo: "You have been sued", texto: "Deadlines to respond are short; acting on day one changes the outcome." },
      { titulo: "A contract was breached", texto: "We assess whether to demand performance, terminate or negotiate." },
    ],
    faqs: [
      { pregunta: "How long does a commercial lawsuit take?", respuesta: "It varies widely depending on the procedure, the court and the other party. An oral commercial proceeding can be resolved in months; an ordinary one with appeal and amparo can take more than a year. We give you a realistic estimate in the assessment." },
      { pregunta: "Is going to court always necessary?", respuesta: "No. Many matters are solved through a well-planned negotiation or mediation. We recommend litigation when it is the best tool, not by default." },
      { pregunta: "How do you charge for lawsuits?", respuesta: "It depends on the matter: by procedural stage, on a retainer or with a success component. We always give you the proposal in writing before starting." },
    ],
  },
  {
    slug: "amparo-y-constitucional",
    nombre: "Amparo & Constitutional Law",
    icono: "amparo",
    resumen: "Defending your rights against government actions.",
    tarjeta: "Direct and indirect amparo, amparo against laws, urgent injunctions and appeals before the Supreme Court.",
    intro:
      "The amparo lawsuit is the most powerful tool to defend yourself against a government action that violates your rights. We file it in administrative, tax, criminal and civil matters, with special attention to urgent injunctions.",
    servicios: [
      "Indirect and direct amparo",
      "Amparo against laws",
      "Tax and administrative amparo",
      "Criminal amparo",
      "Urgent injunctions (suspensión)",
      "Appeals before Collegiate Courts and the Supreme Court",
    ],
    escenarios: [
      { titulo: "An authority shut down your business", texto: "A timely injunction may let you keep operating while the case is decided." },
      { titulo: "A new law affects you", texto: "Amparo against laws has specific deadlines from the date the law takes effect." },
      { titulo: "You lost a case and believe there were violations", texto: "Direct amparo allows the final judgment to be reviewed." },
    ],
    faqs: [
      { pregunta: "How much time do I have to file an amparo?", respuesta: "The general deadline is 15 business days, although there are exceptions and different deadlines depending on the act being challenged. That is why it is best to consult right away." },
      { pregunta: "What is the suspension?", respuesta: "It is a measure that temporarily stops the effects of the government action while the amparo is decided, to avoid damage that is hard to repair." },
    ],
  },
  {
    slug: "laboral",
    nombre: "Employment",
    icono: "laboral",
    resumen: "Orderly labor relations and strategic employer defense.",
    tarjeta: "Preventive advice, contracts, terminations, conciliation and trials before Labor Courts.",
    intro:
      "We advise manufacturing, technology and service companies throughout the employment relationship. Our approach is preventive: clear contracts, rules and processes reduce disputes, and when they arise, we face them strategically.",
    servicios: [
      "Preventive employment advice",
      "Individual and collective agreements",
      "Internal work regulations",
      "Terminations and workforce restructuring",
      "Conciliation before Conciliation Centers",
      "Trials before Labor Courts",
      "NOM-035 and compliance",
      "REPSE and specialized services",
    ],
    escenarios: [
      { titulo: "You need to end an employment relationship", texto: "We help you do it correctly and document every step." },
      { titulo: "You received a conciliation summons", texto: "The conciliation stage is the best chance to close the matter." },
      { titulo: "You are restructuring your workforce", texto: "We plan the process in stages to reduce risks and costs." },
    ],
    faqs: [
      { pregunta: "Is conciliation mandatory?", respuesta: "As a general rule, yes: before going to the Labor Court, the parties must go through pre-trial conciliation at the relevant Conciliation Center, except for the cases provided by law." },
      { pregunta: "Do you represent employees?", respuesta: "Our employment practice focuses on companies (the employer side). If you are an employee, we are happy to point you to the right place." },
    ],
  },
  {
    slug: "fiscal-y-administrativo",
    nombre: "Tax & Administrative",
    icono: "fiscal",
    resumen: "Defense before the SAT and other authorities, with an accounting and legal view.",
    tarjeta: "SAT audits, appeals, Federal Administrative Court trials, refunds and tax planning.",
    intro:
      "We combine accounting and legal expertise to defend companies and individuals before the SAT and state and municipal authorities, and to plan ahead to avoid contingencies.",
    servicios: [
      "Defense in SAT audits and reviews",
      "Administrative appeals (recurso de revocación)",
      "Federal Administrative Court (TFJA) trials",
      "VAT refunds",
      "Tax planning",
      "Tax assessments",
      "Municipal and state licenses, closures and fines",
    ],
    escenarios: [
      { titulo: "The SAT sent you an invitation letter", texto: "Responding properly and on time can prevent a formal audit." },
      { titulo: "A tax assessment was issued against you", texto: "Deadlines to challenge it are short; we review every legal ground." },
      { titulo: "Your refund was denied", texto: "We analyze the ruling and the route to recover your balance." },
    ],
    faqs: [
      { pregunta: "What should I do if I get an SAT invitation letter?", respuesta: "Do not ignore it. It is not an audit, but it signals that the SAT detected a possible difference. We review your information and help you clarify or correct it." },
      { pregunta: "How long do I have to challenge an SAT ruling?", respuesta: "It depends on the remedy; deadlines generally range from 30 business days for the annulment trial to those set for the administrative appeal. Consult as soon as possible." },
    ],
  },
  {
    slug: "familiar-y-sucesiones",
    nombre: "Family & Estates",
    icono: "familiar",
    resumen: "Sensitive and firm support in the most personal moments.",
    tarjeta: "Divorce, child support, custody, wills and probate proceedings.",
    intro:
      "Family matters require technical knowledge and sensitivity. We look for agreements that protect the family, especially the children, and when that is not possible, we defend your rights firmly.",
    servicios: [
      "No-fault and mutual-consent divorce",
      "Child and spousal support",
      "Custody and visitation",
      "Wills",
      "Probate proceedings (testate and intestate)",
      "Family wealth protection",
    ],
    escenarios: [
      { titulo: "You are considering a divorce", texto: "We explain your options, timelines and how to protect your children and assets." },
      { titulo: "A relative died without a will", texto: "We guide you through the probate proceeding to put the assets in order." },
      { titulo: "You want to organize your estate", texto: "A well-drafted will prevents disputes among your heirs." },
    ],
    faqs: [
      { pregunta: "Do I need my spouse's consent to divorce?", respuesta: "No. The will of one spouse is enough to request a divorce. What is discussed in court are the consequences: custody, support and property." },
      { pregunta: "What happens if someone dies without a will?", respuesta: "An intestate probate proceeding is filed, in which the law defines who inherits. It can be handled before a judge or, in some cases, before a notary." },
    ],
  },
  {
    slug: "penal",
    nombre: "Criminal Law",
    icono: "penal",
    resumen: "Criminal defense and victim representation in the accusatory system.",
    tarjeta: "Criminal defense, victim representation, property and tax crimes, and criminal compliance.",
    intro:
      "We provide technical defense and victim representation in the accusatory criminal system, with particular experience in property and tax crimes and those involving companies. We also design corporate criminal compliance programs.",
    servicios: [
      "Criminal defense in the accusatory system",
      "Legal representation for victims",
      "Property crimes",
      "Tax crimes",
      "Criminal liability of legal entities",
      "Corporate criminal compliance",
    ],
    escenarios: [
      { titulo: "You received a summons from the Public Prosecutor", texto: "Do not attend without counsel; what you say can be used in the proceeding." },
      { titulo: "You were the victim of fraud", texto: "We file the complaint and follow up to seek compensation." },
      { titulo: "Your company wants to prevent criminal risks", texto: "We implement controls that reduce corporate criminal liability." },
    ],
    faqs: [
      { pregunta: "Do you handle emergencies?", respuesta: "Yes, we attend urgent criminal matters. Call us directly so a lawyer from the area can assist you." },
      { pregunta: "What is criminal compliance?", respuesta: "It is a set of internal controls that help prevent crimes within the company and can mitigate its criminal liability." },
    ],
  },
  {
    slug: "inmobiliario",
    nombre: "Real Estate",
    icono: "inmobiliario",
    resumen: "Legal certainty in every real estate transaction.",
    tarjeta: "Property purchases, title review, land regularization, condominiums and trusts.",
    intro:
      "We review every property before you sign. We advise individuals, developers and investors on purchases, developments, condominiums and land-use procedures in Guadalajara, Zapopan and the whole metropolitan area.",
    servicios: [
      "Property purchase and sale",
      "Title and lien review",
      "Land regularization",
      "Condominium regime",
      "Construction contracts",
      "Real estate trusts",
      "Land use and permits",
    ],
    escenarios: [
      { titulo: "You are buying a house or land", texto: "We review the deed, liens and debts before you pay." },
      { titulo: "You are developing a project", texto: "We support you with permits, condominium regime and sales." },
      { titulo: "Your property is not regularized", texto: "We find the route to give you legal certainty over your assets." },
    ],
    faqs: [
      { pregunta: "Which documents should I review before buying?", respuesta: "At a minimum: the deed, a certificate of no liens, property tax and water payments, and the seller's identity and capacity. In condominiums, also the bylaws and fees." },
    ],
  },
  {
    slug: "propiedad-intelectual",
    nombre: "Intellectual Property",
    icono: "pi",
    resumen: "Protect your brand, your software and your ideas.",
    tarjeta: "Trademark registration before IMPI, copyright, software contracts and data protection.",
    intro:
      "We help companies and creators protect their intangible assets: trademarks, works, software and data. We also draft the contracts and legal documents a digital business needs.",
    servicios: [
      "Trademark registration before IMPI",
      "Trademark oppositions and enforcement",
      "Copyright (INDAUTOR)",
      "Software licensing and development contracts",
      "Privacy notices and data protection",
      "Terms and conditions for digital platforms",
    ],
    escenarios: [
      { titulo: "You are launching a brand", texto: "We check it is available before you invest in it." },
      { titulo: "Someone is using your brand without permission", texto: "We assess the actions before IMPI to stop the use." },
      { titulo: "You are hiring software development", texto: "We make sure the code and rights end up in your name." },
    ],
    faqs: [
      { pregunta: "How long does a trademark registration last?", respuesta: "The registration lasts 10 years and can be renewed for equal periods, as long as the use requirements are met." },
    ],
  },
];
