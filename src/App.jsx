import React, { useState } from "react";

/* ── ISSB jurisdiction data ── */
const issbJurisdictions = [
  {name:"Australia (AASB S2)",region:"Australia",entities:"~6,000–7,000 across 3 groups",threshold:"Group 1: large listed (revenue ≥A$500M). Group 2: mid listed. Group 3: remaining.",deadline:"Group 1: Jan 2025 (live). Group 2: Jul 2026. Group 3: Jul 2027.",penalties:"Up to A$15M or 10% turnover.",detail:"Four-pillar TCFD/IFRS S2 structure. Climate scenario analysis, transition plans, Scope 1/2/3 with narrative context. Phased rollout creates natural adoption wave. Most concrete APAC mandate with the strongest penalty regime."},
  {name:"Japan (SSBJ)",region:"Japan",entities:"~294+ TSE Prime Market companies (phased by cap)",threshold:"¥3T+ market cap (69 cos) → ¥1T+ (179 cos) → ¥500B+ (294 cos). Full Prime Market TBD (~2030s).",deadline:"FY Mar 2027 (¥3T+). FY Mar 2028 (¥1T+). FY Mar 2029 (¥500B+).",penalties:"Securities law non-compliance. Mandatory assurance 1 year after disclosure mandate.",detail:"SSBJ Standards enacted into law Feb 2026. Three standards functionally equivalent to IFRS S1 + S2. Disaggregated Scope 3 by GHG Protocol category. Foreign companies listed on TSE Prime carry same obligations. Tier 1 companies (¥3T+) represent 55% of exchange market cap."},
  {name:"Hong Kong (HKFRS S2)",region:"Hong Kong SAR",entities:"~2,600 Main Board issuers",threshold:"All Main Board: comply-or-explain. Hang Seng LargeCap Index: mandatory. Large PAEs inc. non-listed financial institutions by 2028.",deadline:"Jan 2025: comply-or-explain (all Main Board). Jan 2026: mandatory (LargeCap). Jan 2028: full mandatory (all large PAEs).",penalties:"HKEX regulatory actions — public warnings, reprimands. Reputational and investor confidence impact.",detail:"HKFRS S1 and S2 published Dec 2024 by HKICPA, fully aligned with ISSB. LargeCap constituents account for ~75% of combined market cap. HKEX New Climate Requirements are interim step; full HKFRS adoption targeted 2028. Among first APAC jurisdictions to fully align with ISSB."},
  {name:"Singapore (SGX/ISSB)",region:"Singapore",entities:"~613 SGX-listed companies + large non-listed",threshold:"All listed: Scope 1+2. STI constituents (top 30): also Scope 3. Large NLCos (≥S$1B revenue + S$500M assets): from FY2030.",deadline:"FY2025: Scope 1+2 (all listed). FY2026: Scope 3 (STI only). FY2027: large NLCos. FY2029: assurance.",penalties:"SGX RegCo regulatory actions. Reputational risk and capital access impact.",detail:"ISSB-informed, climate-first approach embedded in SGX Listing Rules. Aug 2025 update extended some timelines. Sustainability Reporting Grant co-funds up to 30% of first-report costs (cap S$150k). 59% of surveyed issuers already disclosed Scope 3 in 2024."},
  {name:"Malaysia (Bursa/MFRS)",region:"Malaysia",entities:"~930+ listed companies + large NLCos",threshold:"Group 1: RM2B+ market cap (~130 cos). Group 2: other Main Market. Group 3: ACE Market + large NLCos (≥RM2B revenue).",deadline:"Jan 2025: Group 1 (live). Jan 2026: Group 2. Jan 2027: Group 3.",penalties:"Bursa Malaysia listing rule enforcement. Regulatory scrutiny.",detail:"National Sustainability Reporting Framework (NSRF) launched Sep 2024. IFRS S1 and S2 adopted directly into listing requirements. Climate-first approach — first two reporting periods focus on climate only. Group 1 companies represent >80% of Bursa market cap."},
  {name:"Brazil (CBPS/CVM)",region:"Brazil",entities:"All listed companies (~1,100 representing 86% of market cap)",threshold:"All publicly-held companies, investment funds, and securitisation companies. No size threshold — all categories A and B.",deadline:"Jan 2024: voluntary. Jan 2026: mandatory (all listed). Reasonable assurance from 2026.",penalties:"CVM regulatory enforcement. First country to embed ISSB baseline in capital-markets law.",detail:"CVM Resolution 193 (Oct 2023) made Brazil first to formally adopt ISSB standards. Local standards CBPS 01 and CBPS 02 are Portuguese translations of IFRS S1 and S2. CDP partnership provides data from ~1,100 companies to CVM for supervisory monitoring. Reports submitted via Empresas.Net system."},
  {name:"United Kingdom (UK SRS)",region:"United Kingdom",entities:"~515 primary-listed issuers initially; broader scope expected",threshold:"Listed companies on UK Listing Rules (commercial, non-equity, transition categories). Private companies TBD — 'economically significant' consultation expected.",deadline:"Feb 2026: UK SRS published for voluntary use. Jan 2027: mandatory UK SRS S2 (climate). 2028: Scope 3 comply-or-explain. 2029: UK SRS S1 comply-or-explain.",penalties:"FCA listing rule enforcement. Replaces existing TCFD-aligned requirements.",detail:"UK SRS S1 and S2 published 25 Feb 2026, endorsed by Dept for Business and Trade. Minor amendments from ISSB text. FCA consultation CP26/5 (closes 20 Mar 2026) proposes mandatory climate reporting from Jan 2027. SASB standards 'may' rather than 'shall' be considered. Scope extended to private companies expected via Companies Act consultation."},
];

/* ── Nav config ── */
const navGroups = [
  { label: "Overview", desc: "The opportunity, the product vision, and how the two capabilities connect", ids: ["exec", "vision"] },
  { label: "Opportunities", desc: "Disclosure frameworks, the ISSB global wave, operational frameworks, partnerships, and market sizing", ids: ["t1", "issb", "t2", "ethisphere", "size"] },
  { label: "Strategy", desc: "Architecture, sequencing, and open discovery questions", ids: ["arch", "seq", "disc"] },
];

const sectionMeta = {
  exec: { icon: "📋", title: "Executive summary" },
  vision: { icon: "💡", title: "Product vision" },
  t1: { icon: "📄", title: "Tier 1: Disclosure frameworks" },
  issb: { icon: "🌍", title: "ISSB global wave" },
  t2: { icon: "🔧", title: "Tier 2: Operational frameworks" },
  ethisphere: { icon: "🤝", title: "Ethisphere WMEC" },
  size: { icon: "📊", title: "Market sizing" },
  arch: { icon: "🏗️", title: "How it fits" },
  seq: { icon: "📅", title: "Sequencing" },
  disc: { icon: "🔍", title: "Discovery next steps" },
};

/* ── Framework data ── */
const t1=[
  {name:"CSRD / ESRS",region:"EU + non-EU with EU presence",entities:"~5,000–6,000 post-Omnibus I",deadline:"Wave 1 now; Wave 2 FY2027 (reports 2028)",fit:"Near-perfect · Toolkit exists",detail:"12 standards. Per material topic: policies, actions, targets, metrics, financial effects — all narrative. Double materiality assessment is a structured Q&A exercise. Omnibus I raised thresholds to >1,000 FTE and >€450M turnover, cutting scope by ~90% but raising the quality bar ('fair presentation' over checklist). Datapoints cut 61% but narrative judgement increased. Existing CSRD Toolkit on Projects is the first migration candidate. Trickle-down effect: mega-cap Wave 1 companies are already cascading data demands to supply chain partners via procurement contracts — mid-market entities need to respond even without a direct statutory mandate.",markets:"Germany ~2,000 · France ~1,500 · Netherlands ~500 · Italy ~600 · US multinationals ~1,000",connection:"ESRS S1 (workforce) → Compliance Education data. ESRS G1 (business conduct) → Vault + PM2. Existing Toolkit revenue provides migration baseline."},
  {name:"ISSB-Aligned Frameworks",region:"Global — 30+ jurisdictions",entities:"~12,000–14,000+ (profiled); 20,000+ (all adopters)",deadline:"Rolling 2025–2029 across jurisdictions",fit:"Strongest cross-jurisdiction play",detail:"IFRS S1 and S2 adopted as local standards across 36+ jurisdictions representing >60% of global GDP. Four-pillar TCFD structure identical everywhere: governance, strategy, risk management, metrics & targets. Key jurisdictions: Australia (AASB S2, ~6k–7k entities, firm and unyielding deadlines), Japan (SSBJ, ~294+ phased by market cap, enacted into law Feb 2026), Hong Kong (HKFRS S2, ~2,600 Main Board), Singapore (SGX, ~613 listed), Malaysia (Bursa/MFRS, ~930+), Brazil (CVM, ~1,100 all listed, mandatory Jan 2026), UK (UK SRS, ~515 listed initially, mandatory from Jan 2027). Build the knowledge base once, produce jurisdiction-specific outputs on top.",markets:"AU ~6k–7k · JP ~294+ (expanding) · HK ~2,600 · SG ~613 · MY ~930+ · BR ~1,100 · UK ~515 · Plus: CA, KR, CN, NZ, CL, MX, QA, TR, NG, KE, PK, and more",connection:"Same TCFD/ISSB knowledge base serves every jurisdiction. SB 261 (CA) also uses TCFD four pillars. Build once, sell globally. Each new adopting jurisdiction expands TAM with zero architecture change. See dedicated 'ISSB global wave' section for full jurisdiction detail."},
  {name:"EU AI Act (Annex IV)",region:"EU + any deployer into EU",entities:"~65,000+ high-risk systems",deadline:"Annex III: Dec 2, 2027. Annex I: Aug 2, 2028.",fit:"Strong (narrative + evidence)",detail:"9 mandatory sections per high-risk AI system. 6 of 9 are substantial narrative. 40–80 hours per system; enterprise with 5–20 systems = 200–1,600 hours. Retained 10 years. Original Aug 2026 deadline aborted by Digital Omnibus on AI due to catastrophic lack of technical standards and enforcement infrastructure. New firm deadlines: Dec 2027 for Annex III (biometrics, HR, critical infrastructure), Aug 2028 for Annex I (AI in regulated products). Prohibited AI systems already banned since Feb 2025. Timeline is delayed but the compliance burden is enormous — and preparation should start now.",markets:"Deployers: ~15,000–40,000+ · Providers: ~2,000–5,000 · US into EU: ~1,000–3,000",connection:"Diligent deploys AI itself — own documentation becomes template. AI in employment, whistleblower triage, case management are explicitly high-risk under Annex III."},
  {name:"California SB 253 + SB 261",region:"US (doing business in CA)",entities:"SB 253: ~5,400 · SB 261: ~4,000+ (paused)",deadline:"SB 253: Aug 10, 2026 (confirmed). SB 261: TBD (enjoined by Ninth Circuit).",fit:"SB 253 confirmed / SB 261 paused",detail:"SB 253: Scope 1 and 2 emissions data, mandatory Aug 10 2026. CARB finalized regulations Feb 2026; deadline is live despite ongoing litigation — Ninth Circuit explicitly declined to enjoin. CARB offering enforcement discretion for entities not already collecting data as of Dec 2024. SB 261: climate risk narratives, fully enjoined pending First Amendment appeal. The Ninth Circuit panel questioned whether compelling qualitative climate risk narratives constitutes compelled speech. Scope 3 reporting under SB 253 faces high probability of being severed or delayed. Contagion: similar bills in NY, CO, NJ, IL — one knowledge base serves 5+ states.",markets:"SB 253 ($1B+): ~5,400 · SB 261 ($500M+): ~4,000+ · Both public and private",connection:"Same TCFD knowledge base as ISSB-aligned frameworks. Clients already receiving climate-related questionnaires from customers and investors."}
];

const t2=[
  {name:"Data privacy compliance",region:"GDPR + 20 US states + global",entities:"Every company processing personal data",deadline:"Ongoing — event-driven",fit:"Strongest Tier 2 fit",detail:"Five document types, all recurring, all multi-jurisdictional: DPIAs, RoPAs, privacy policies, DPAs, Transfer Impact Assessments. A DPIA is structurally identical to a SurveySync workflow. Multi-jurisdictional multiplier: same inputs, different outputs per jurisdiction. Event-driven triggers create continuous engagement.",markets:"~20 US states active by 2026 · GDPR (27+3) · UK · Brazil · Canada · Australia · Japan",connection:"Vault: privacy complaints feed DPIA risk sections. Compliance Education: privacy training feeds 'organisational measures'. PM2: policy storage. TPM: vendor DPAs — third parties use SurveySync to complete privacy questionnaires."},
  {name:"Anti-corruption / Anti-bribery",region:"DOJ, UK Bribery Act, Sapin II",entities:"Every multinational (~50,000+)",deadline:"Ongoing — programme requirement",fit:"Core E&C — already your world",detail:"DOJ criteria require: written risk assessment, tailored policies, training evidence, programme effectiveness report. Clients regularly receive ABC-related questionnaires from partners, customers, and regulators — SurveySync serves this directly.",markets:"Every company with cross-border operations",connection:"PM2: ABC policy. Vault: reports. Compliance Education: ABC modules. Knowledge Management connects all three."},
  {name:"DORA (EU financial sector)",region:"EU",entities:"~22,000 financial entities + ICT vendors",deadline:"Live since January 2025. Q1 2026: Register of Information submissions due.",fit:"Strong (documentation-heavy, actively enforcing)",detail:"Five pillars of ICT risk management, each requiring extensive policy and procedure documentation. Directly applicable EU Regulation — no member state transposition delays. 19 designated Critical ICT Third-Party Providers (AWS, Google Cloud, Microsoft, etc.) under direct ESA oversight. Financial entities must submit detailed Registers of Information mapping all ICT dependencies to national authorities by Q1 2026. No delays, no omnibus rollbacks. Financial institutions receive frequent regulatory questionnaires — SurveySync directly applicable.",markets:"Banks, insurers, investment firms, payment processors — all 27 EU member states",connection:"PM2: ICT risk policies. TPM: vendor oversight surveys — third parties complete via SurveySync. Stage 2: testing docs and audit trails."},
  {name:"Regulatory questionnaires and RFIs",region:"Global — regulated industries",entities:"Every regulated entity",deadline:"Ongoing — dozens per year",fit:"SurveySync's core use case",detail:"Banks, insurers, utilities receive dozens of regulatory questionnaires annually. Each needs responses drawn from the same underlying data, formatted per regulator. This is literally what SurveySync was built for.",markets:"Every regulated financial institution, utility, healthcare organisation",connection:"Stage 3: prior responses feed Knowledge Management. New questionnaire → system identifies what it can already answer."},
  {name:"Third-party due diligence",region:"Global",entities:"Every company with supply chain",deadline:"CSDDD: 2028–29 (delayed by Omnibus I)",fit:"Strong with TPM integration",detail:"Vendor risk assessments, modern slavery statements, supply chain due diligence. Third parties receiving these surveys via Diligent TPM use SurveySync to complete them. The TPM receiver-side play. CSDDD thresholds aligned with CSRD Omnibus I (>1,000 FTE, >€450M turnover) — scope narrowed but commercial pressure from mega-cap companies cascades down supply chains regardless.",markets:"Growing regulatory pressure: EU (CSDDD), UK, Australia",connection:"TPM sends the survey. SurveySync helps the third party complete it. Knowledge Management learns from every completed survey."}
];

/* ── Sections ── */
const sections = [
  {
    id: "exec",
    title: "Executive summary",
    content: () => (
      <div>
        <p className="b">Diligent sells framework Toolkits today — CSRD, IFRS, GRI and others — built on the legacy Diligent One "Projects" module. They work, but they're essentially complex forms with a progress bar. They don't reason about data, don't learn from prior answers, and don't connect to anything else on the platform.</p>
        <p className="b">The opportunity is to replace that static approach with two connected capabilities: <b>SurveySync</b> as a standalone, sellable product that lets clients answer any compliance questionnaire against their own knowledge base, and <b>Knowledge Management</b> as the Connected Compliance capability that powers SurveySync, plugs into other modules, and pulls intelligence from every activity Diligent has visibility on.</p>
        <p className="b">This report maps the compliance frameworks where these capabilities have the highest ROI, sizes the addressable markets, and proposes a sequencing strategy that proves value on existing customers before expanding into new markets.</p>
        <div className="cta">
          <div className="cta-label">THE THESIS</div>
          <p className="cta-b">SurveySync is the product clients buy. Knowledge Management is the Connected Compliance capability that makes it — and every other module — intelligent. Together, they mean a client never types out an answer to a compliance question that the platform already has the data to answer.</p>
        </div>
        <div className="sg">
          {[{v:"5",l:"Tier 1 disclosure frameworks"},{v:"50k–90k+",l:"Addressable entities"},{v:"6+",l:"Tier 2 operational frameworks"},{v:"36+",l:"ISSB-adopting jurisdictions"}].map((d,i)=>(
            <div key={i} className="sc"><div className="sv">{d.v}</div><div className="sl">{d.l}</div></div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: "vision",
    title: "Product vision",
    sub: "SurveySync + Knowledge Management",
    content: () => (
      <div>
        <h3 className="h3">Two capabilities, one architecture</h3>
        <div className="card" style={{marginBottom:10,borderLeft:"3px solid #D32D2D"}}>
          <div className="card-t">SurveySync — the product</div>
          <p className="card-d" style={{marginTop:6}}>A standalone solution sold to clients. The typical workflow: a client receives a compliance questionnaire — a spreadsheet attachment in an email, a regulator's RFI, a customer's vendor assessment, an industry survey — and loads it into SurveySync. They also load documents, policies, prior responses, and data into their knowledge base. SurveySync then drafts responses by reasoning across that knowledge base, producing compliant answers for human review and approval.</p>
          <p className="card-d" style={{marginTop:6}}>This replaces the manual process of a compliance officer opening a spreadsheet, hunting through folders and emails for the right data, and typing out answers one by one. SurveySync does the hunting and the drafting; the human does the reviewing.</p>
        </div>
        <div className="card" style={{marginBottom:10,borderLeft:"3px solid #252D38"}}>
          <div className="card-t">Knowledge Management — the Connected Compliance capability</div>
          <p className="card-d" style={{marginTop:6}}>The connective tissue that powers SurveySync and plugs into Connected Compliance modules. Knowledge Management is what pulls data from activities Diligent has visibility on — policies managed in PM2, cases in Vault, training in Compliance Education, vendor assessments in Third Party Management — and makes that data available as a reasoning source.</p>
          <p className="card-d" style={{marginTop:6}}>Knowledge Management also connects to Third Party Management so that when a client uses TPM to send surveys to their third parties, it can help those <b>third parties complete the surveys</b> — drawing on their own loaded knowledge base to draft responses. This turns TPM from a survey-sending tool into an intelligent completion assistant for the supply chain.</p>
        </div>
        <h3 className="h3">Replacing the Toolkits</h3>
        <p className="b">Today's Toolkits (CSRD, IFRS, GRI, etc.) are built on the legacy Diligent One Projects module — forms and progress tracking, nothing more. Over time, Knowledge Management-powered SurveySync replaces these with something fundamentally better: instead of a static form that asks questions and stores answers, the client gets an intelligent system that already knows most of the answers from their knowledge base and connected platform data. The Toolkit becomes a template that triggers the Knowledge Management engine, not a standalone product.</p>
        <h3 className="h3">The evolution in three stages</h3>
        {[
          {s:"Stage 1: Narrative + Q&A responses",tag:"Current",tc:"#D32D2D",desc:"SurveySync drafts narrative and questionnaire responses from knowledge base inputs. Clients load documents and receive drafted answers for review. Toolkits begin migration from Projects to Knowledge Management-powered templates.",ex:"CSRD disclosures, ISSB-aligned climate reports, DPIA narratives, regulatory RFIs, vendor questionnaires, Ethisphere EQ applications."},
          {s:"Stage 2: Structured data + evidence",tag:"Next",tc:"#252D38",desc:"Knowledge Management ingests tabular data, files, and evidence packages — including output from the platform's AI-powered evidence collection pipeline. Output expands beyond narrative to include populated tables, attached evidence, and cross-referenced data. TPM integration enables third-party completion assistance.",ex:"SOC 2, ISO 27001, DORA, and other control-based frameworks."},
          {s:"Stage 3: Framework coverage engine",tag:"Target",tc:"#666666",desc:"The platform hosts a menu of compliance frameworks and exercises. Users see at a glance what coverage they already have in their knowledge base — which questions can be auto-answered, which have partial data, and where gaps remain. Knowledge Management actively guides users on further population to minimise or eradicate manual work for any deltas. Every completed survey, every collected evidence artefact, every approved disclosure feeds back, making each subsequent framework exercise faster. New compliance exercises start pre-populated. Connected Compliance modules consume Knowledge Management intelligence natively.",ex:"Pre-drafted compliance packages across any framework. Cross-domain risk detection. Framework coverage dashboards showing readiness state per exercise."}
        ].map((st,i)=>(
          <div key={i} className="card" style={{marginBottom:8}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
              <span className="card-t">{st.s}</span>
              <span className="pill" style={{background:st.tc}}>{st.tag}</span>
            </div>
            <p className="card-d">{st.desc}</p>
            <p style={{fontSize:13,color:"#666",marginTop:4}}>Frameworks: {st.ex}</p>
          </div>
        ))}
        <div className="note" style={{marginTop:14}}>
          <div className="note-t">Evidence collection integration</div>
          <p className="note-b">The platform's AI-powered evidence collection already creates immutable records of collected artefacts. Today, that's where it stops — the record exists but the knowledge doesn't compound. By feeding evidence collection outputs into the Knowledge Management layer, every collected artefact becomes a reusable answer. A SOC 2 evidence package collected this quarter pre-populates next quarter's ISO 27001 response. A DPIA completed for one processing activity informs the next similar assessment. The evidence pipeline becomes an <i>input</i> to the knowledge base, not just an output archive.</p>
        </div>
      </div>
    )
  },
  {
    id: "t1",
    title: "Tier 1: Disclosure frameworks",
    sub: "Narrative-heavy, externally mandated, live deadlines",
    content: () => (
      <div>
        <p className="b">These frameworks demand substantial narrative drafting, have imminent or live compliance deadlines, and represent SurveySync's most natural current fit. They are disclosure-based — the primary output is a written document, not evidence of a control. These are also where existing Toolkits already generate revenue, meaning Knowledge Management-powered replacements have a direct migration path.</p>
        {t1.map((fw,i)=><FW key={i} fw={fw}/>)}
      </div>
    )
  },
  {
    id: "issb",
    title: "Tier 1: ISSB global wave",
    sub: "36+ jurisdictions, one knowledge base architecture",
    content: () => (
      <div>
        <p className="b">The ISSB's IFRS S1 and S2 standards have become the global baseline for sustainability disclosure. As of early 2026, 36 jurisdictions have adopted or are finalising steps toward ISSB-aligned standards — collectively representing over 60% of global GDP. Each jurisdiction creates a local variant (AASB in Australia, SSBJ in Japan, HKFRS in Hong Kong, etc.) but the underlying four-pillar structure is identical everywhere: governance, strategy, risk management, metrics & targets.</p>
        <p className="b">This is the single strongest argument for SurveySync's knowledge base architecture. A client builds their climate disclosure knowledge base once — transition plans, scenario analysis, emissions data, governance structures — and SurveySync produces jurisdiction-specific outputs on top. The same inputs serve Australia, Japan, Hong Kong, Singapore, Malaysia, Brazil, the UK, and every future ISSB-adopting jurisdiction with local template modifications.</p>
        <div className="cta" style={{marginBottom:16}}>
          <div className="cta-label">THE COMMERCIAL INSIGHT</div>
          <p className="cta-b">Every other Tier 1 framework (CSRD, EU AI Act, SB 253/261) is jurisdiction-specific. ISSB is the only framework where one knowledge base architecture scales across 30+ countries simultaneously. A multinational listed in Tokyo, Hong Kong, and London needs SSBJ, HKFRS, and UK SRS disclosures — all from the same underlying data, adapted per jurisdiction. This is SurveySync's highest-leverage play.</p>
        </div>
        <h3 className="h3">Jurisdiction summary</h3>
        <div style={{overflowX:"auto",marginBottom:16}}>
          <table className="tbl">
            <thead><tr>{["Jurisdiction","Entities in scope","First mandatory deadline","Scope"].map((h,i)=><th key={i}>{h}</th>)}</tr></thead>
            <tbody>
              {[
                ["Australia (AASB S2)","~6,000–7,000","Jan 2025 (G1 live)","All three groups phased through Jul 2027"],
                ["Japan (SSBJ)","~294+ (phased by cap)","FY Mar 2027","¥3T+ first, expanding to ¥500B+ by 2029"],
                ["Hong Kong (HKFRS S2)","~2,600 Main Board","Jan 2026 (LargeCap)","Full mandatory for all large PAEs by 2028"],
                ["Singapore (SGX)","~613 listed + NLCos","FY2025 (Scope 1+2)","STI Scope 3 from 2026; NLCos from 2030"],
                ["Malaysia (Bursa/MFRS)","~930+ listed + NLCos","Jan 2025 (G1 live)","RM2B+ first, expanding through 2027"],
                ["Brazil (CBPS/CVM)","~1,100 listed","Jan 2026","All listed — no size threshold"],
                ["United Kingdom (UK SRS)","~515 listed initially","Jan 2027 (proposed)","Climate first; Scope 3 + S1 phased 2028–29"],
              ].map((r,i)=><tr key={i}>{r.map((c,j)=><td key={j} style={{fontWeight:j===0||j===1?600:400}}>{c}</td>)}</tr>)}
            </tbody>
          </table>
        </div>
        <h3 className="h3">Additional jurisdictions in progress</h3>
        <div className="note" style={{marginBottom:16}}>
          <p className="note-b">Beyond the seven profiled jurisdictions, the ISSB adoption wave includes: <b>Canada</b> (CSDS 1 and 2 issued for voluntary use; mandatory TBD), <b>South Korea</b> (draft standards consulted), <b>China</b> (Ministry of Finance climate standard issued Dec 2025, national framework targeted by 2030), <b>New Zealand</b> (TCFD-based mandatory since 2023, consulting on ISSB alignment), <b>Chile</b> (mandatory from Jan 2026), <b>Mexico</b> (mandatory from Jan 2026), <b>Qatar</b> (adopted Jan 2026), <b>Turkey, Nigeria, Kenya, Pakistan, Sri Lanka, Taiwan, Costa Rica</b> and others at various stages. Each new adopter expands the addressable market for the same knowledge base architecture.</p>
        </div>
        <h3 className="h3">Jurisdiction detail</h3>
        {issbJurisdictions.map((j,i)=><ISSBCard key={i} j={j}/>)}
        <div className="cta" style={{marginTop:16}}>
          <div className="cta-label">ISSB ADDRESSABLE SURFACE</div>
          <p className="cta-b">Across the seven profiled jurisdictions alone, the mandatory in-scope population is approximately <b>12,000–14,000+ entities</b> by 2029. Including additional adopting jurisdictions (Canada, Korea, China, Chile, Mexico, Qatar, etc.), the global ISSB-mandated population likely exceeds <b>20,000+ entities</b> within the next 3–4 years. At a blended SurveySync ACV of $15k–$35k for climate disclosure use cases, this represents an addressable revenue range of <b>$300M–$700M+</b> from ISSB-aligned frameworks alone — and every new jurisdiction that adopts expands the TAM without requiring any change to the underlying knowledge base architecture.</p>
        </div>
      </div>
    )
  },
  {
    id: "t2",
    title: "Tier 2: Operational frameworks",
    sub: "Programme documentation, recurring assessments, portfolio fit",
    content: () => (
      <div>
        <p className="b">These opportunities don't require new markets — they deepen revenue from existing E&C customers. The data already lives in Diligent's product portfolio. Many of these are areas where clients are already receiving questionnaires and surveys that SurveySync could serve directly.</p>
        {t2.map((fw,i)=><FW key={i} fw={fw}/>)}
      </div>
    )
  },
  {
    id: "ethisphere",
    title: "Partnership: Ethisphere WMEC",
    sub: "PLG opportunity — co-branded product",
    content: () => (
      <div>
        <div className="cta" style={{marginBottom:16}}>
          <div className="cta-label">STATUS</div>
          <p className="cta-b">Active conversations — not yet signed. Everything below is contingent on partnership terms being agreed. Target: 2026 application cycle (tight timeline — applications open Jul 30, close Oct 30).</p>
        </div>
        <p className="b">Ethisphere's <b>World's Most Ethical Companies</b> (WMEC) designation is one of the most recognised benchmarks in corporate ethics. The application process centres on the proprietary <b>Ethics Quotient (EQ)</b> — a comprehensive questionnaire requiring 240+ documented proof points across 8 pillars including programme structure, ethical culture, governance, risk assessment, and third-party management.</p>
        <p className="b">The opportunity is to become the <b>official Ethisphere tool</b> for the WMEC application process, creating an Ethisphere × Diligent co-branded product powered by SurveySync.</p>
        <h3 className="h3">How it works</h3>
        <div className="card" style={{marginBottom:8}}>
          <div className="card-t">A dedicated environment</div>
          <p className="card-d" style={{marginTop:6}}>A separate SurveySync implementation where users can <b>only</b> complete the Ethisphere EQ application — no ability to upload arbitrary surveys. The environment is purpose-built for the WMEC process: the EQ questionnaire structure is pre-loaded, the 8 pillars are mapped, and the evidence attachment requirements are baked in.</p>
        </div>
        <div className="card" style={{marginBottom:8}}>
          <div className="card-t">The PLG funnel</div>
          <p className="card-d" style={{marginTop:6}}>Companies engage with the Ethisphere × Diligent tool to complete their WMEC application. In doing so, they experience the SurveySync capability firsthand — knowledge base loading, AI-assisted response drafting, evidence attachment, human review workflow. This creates a natural upsell path: "You just used this to answer 240+ ethics questions. You receive dozens of other compliance questionnaires a year. SurveySync can answer those too." The Ethisphere tool becomes the top of the funnel into SurveySync and broader Diligent products.</p>
        </div>
        <h3 className="h3">Why it fits</h3>
        {[
          {l:"EQ structure",d:"240+ proof points across 8 pillars — compliance programme structure, governance, culture, risk assessment, training, third-party management, investigations, environmental/social impact. This maps directly to the Connected Compliance data model."},
          {l:"Evidence requirements",d:"The application requires documented evidence (policies, training programmes, reports, governance records) alongside narrative responses. This exercises both the Stage 1 (narrative) and Stage 2 (evidence) Knowledge Management capabilities."},
          {l:"Recurring annual cycle",d:"WMEC is an annual application. Companies return each year, and their knowledge base from the prior year pre-populates the next application — demonstrating the compounding intelligence value from Stage 3. The 2026 cycle (applications Jul 30 – Oct 30) is the target launch window, which creates urgency on partnership terms and MVP scoping."},
          {l:"ICP alignment",d:"The WMEC applicant pool ($250M+ revenue companies with mature E&C programmes) is Diligent's exact target customer. 138 honorees in 2026 across 17 countries and 40 industries, with hundreds more applicants."},
          {l:"Brand halo",d:"Being the official tool of the World's Most Ethical Companies programme gives Diligent credibility in the ethics and compliance space that no amount of marketing can buy."},
        ].map((p,i)=>(
          <div key={i} className="card" style={{marginBottom:6}}>
            <div style={{display:"flex",gap:10,alignItems:"baseline"}}>
              <span className="card-t" style={{flexShrink:0,minWidth:130}}>{p.l}</span>
              <span className="card-d">{p.d}</span>
            </div>
          </div>
        ))}
        <div className="note" style={{marginTop:14}}>
          <div className="note-t">Discovery questions specific to Ethisphere</div>
          <p className="note-b">What is the current EQ application format (portal, spreadsheet, PDF)? How much of the EQ could be pre-populated from a company's existing Diligent data (Vault cases, PM2 policies, Compliance Education completion)? The 2026 application cycle opens July 30 and closes October 30 — what is the minimum viable product to hit that window? What does the co-branding and revenue share model look like? How many companies apply annually vs. how many are honoured (funnel size)?</p>
        </div>
      </div>
    )
  },
  {
    id: "size",
    title: "Market sizing",
    sub: "All tiers + Ethisphere",
    content: () => (
      <div>
        <p className="b">Rough order-of-magnitude estimates. Significant overlap exists across tiers — a German bank may be caught by CSRD, EU AI Act, DORA, GDPR, and ABC obligations simultaneously. A Japanese multinational listed in Tokyo and Hong Kong needs SSBJ and HKFRS disclosures from the same underlying data.</p>
        <h3 className="h3">Tier 1: Disclosure frameworks</h3>
        <div style={{overflowX:"auto"}}>
          <table className="tbl">
            <thead><tr>{["Framework","Region","Entities","Key markets","Deadline"].map((h,i)=><th key={i}>{h}</th>)}</tr></thead>
            <tbody>
              {[
                ["CSRD / ESRS (post-Omnibus)","EU + non-EU","~5k–6k","DE, FR, NL, IT, US multinationals","Wave 2: 2028"],
                ["ISSB-aligned (7 profiled)","Global (36+ jurisdictions)","~12k–14k+ (profiled); 20k+ total","AU, JP, HK, SG, MY, BR, UK","Rolling 2025–29"],
                ["EU AI Act","EU + deployers","~65k+ high-risk systems","Deployers ~15–40k+","Dec 2027 / Aug 2028"],
                ["CA SB 253","US (CA)","~5,400","$1B+ revenue, doing business in CA","Aug 10, 2026"],
              ].map((r,i)=><tr key={i}>{r.map((c,j)=><td key={j} style={{fontWeight:j===0||j===2?600:400}}>{c}</td>)}</tr>)}
            </tbody>
          </table>
        </div>
        <div className="cta" style={{marginTop:14,marginBottom:20}}>
          <div className="cta-label">TIER 1 TAM ESTIMATE</div>
          <p className="cta-b">~50,000–90,000+ in-scope entities across all Tier 1 frameworks. Assuming a blended SurveySync ACV of $15k–$40k for disclosure-heavy use cases (replacing $50k–$150k in consulting spend), the addressable revenue range is approximately <b>$800M–$3.5B</b>. Even at 5–10% penetration, this represents $40M–$350M in annual recurring revenue from Tier 1 alone. The ISSB wave is the fastest-growing component: every new jurisdiction that adopts expands TAM without requiring changes to the knowledge base architecture.</p>
        </div>
        <h3 className="h3">Tier 2: Operational frameworks</h3>
        <div style={{overflowX:"auto"}}>
          <table className="tbl">
            <thead><tr>{["Framework","Region","Entities","Trigger","SurveySync fit"].map((h,i)=><th key={i}>{h}</th>)}</tr></thead>
            <tbody>
              {[
                ["Data privacy (GDPR+)","Global","Every data processor","20+ US states, GDPR 27+3, UK, BR, CA, AU, JP","Strongest Tier 2"],
                ["Anti-corruption / ABC","Global","~50k+ multinationals","Ongoing programme req.","Core E&C fit"],
                ["DORA","EU","~22k financial entities","Live — Q1 2026 RoI due","Strong, actively enforcing"],
                ["Regulatory RFIs","Global regulated","Every regulated entity","Dozens per year per entity","Core use case"],
                ["Third-party due diligence","Global","Every co. w/ supply chain","CSDDD 2028–29","Strong w/ TPM"],
              ].map((r,i)=><tr key={i}>{r.map((c,j)=><td key={j} style={{fontWeight:j===0||j===2?600:400}}>{c}</td>)}</tr>)}
            </tbody>
          </table>
        </div>
        <div className="cta" style={{marginTop:14,marginBottom:20}}>
          <div className="cta-label">TIER 2 TAM ESTIMATE</div>
          <p className="cta-b">Tier 2 is harder to size as a discrete market because it overlaps heavily with the existing E&C customer base. The addressable population is effectively every multinational company with compliance obligations — conservatively 100,000+ entities globally. At a blended ACV of $10k–$25k, the theoretical TAM is <b>$1B–$2.5B+</b>. More practically, the near-term opportunity is upselling existing Diligent E&C customers: if 20–30% of the installed base adopts Knowledge Management-powered questionnaire response capabilities at $10k–$20k ACV, that's a significant expansion of per-customer revenue with minimal new acquisition cost.</p>
        </div>
        <h3 className="h3">Partnership: Ethisphere WMEC</h3>
        <div style={{overflowX:"auto"}}>
          <table className="tbl">
            <thead><tr>{["Metric","Estimate","Notes"].map((h,i)=><th key={i}>{h}</th>)}</tr></thead>
            <tbody>
              {[
                ["2026 honourees","138","17 countries, 40 industries"],
                ["Annual applicants","Hundreds","Exact number not public; all receive benchmarking scorecard"],
                ["Eligible companies","$250M+ revenue","Public/private, for-profit, global"],
                ["Application requirements","240+ proof points","8 pillars, narrative + evidence"],
                ["Application fee","$3,600–$4,900","Per application cycle, paid by applicant"],
                ["PLG conversion target","TBD","Ethisphere tool → SurveySync standalone"],
              ].map((r,i)=><tr key={i}>{r.map((c,j)=><td key={j} style={{fontWeight:j===0?600:400}}>{c}</td>)}</tr>)}
            </tbody>
          </table>
        </div>
        <div className="cta" style={{marginTop:14,marginBottom:20}}>
          <div className="cta-label">ETHISPHERE TAM ESTIMATE</div>
          <p className="cta-b">The direct revenue from the co-branded Ethisphere tool itself depends on partnership terms (pricing TBD). The primary commercial value is converting Ethisphere users into SurveySync standalone subscribers. At an estimated SurveySync ACV of $15k–$30k and a funnel of hundreds of applicants per year, even a 15–25% conversion rate represents <b>meaningful net-new ARR from a self-selecting, high-quality ICP</b> ($250M+ revenue, mature E&C programmes).</p>
        </div>
        <div className="note" style={{marginTop:18}}>
          <div className="note-t">Combined addressable surface</div>
          <p className="note-b">Tier 1 disclosure frameworks: ~50,000–90,000+ entities with live or imminent mandates — including the full ISSB global wave across 36+ jurisdictions. Tier 2 operational frameworks: adds the entire existing E&C customer base as immediate upsell targets. Ethisphere: adds a PLG funnel of $250M+ revenue companies with mature E&C programmes applying annually. Significant overlap across tiers compounds the per-customer revenue opportunity — a single client may need SurveySync for CSRD, ISSB-aligned climate disclosures across multiple jurisdictions, GDPR DPIAs, ABC risk assessments, and their Ethisphere application.</p>
        </div>
      </div>
    )
  },
  {
    id: "arch",
    title: "How it fits",
    sub: "The Connected Compliance architecture",
    content: () => (
      <div>
        <p className="b">SurveySync is the sellable product. Knowledge Management is the Connected Compliance capability. Together they sit across Connected Compliance and turn raw platform data into compliance-ready output — whether that's a narrative disclosure, a populated questionnaire, an evidence package, or a completed third-party survey.</p>
        <h3 className="h3">What Knowledge Management connects to</h3>
        {[
          {l:"Policy Manager (PM2)",r:"What should be happening",d:"Policies, procedures, templates, regulatory requirements. Knowledge Management uses these as authoritative source material when drafting responses or disclosures."},
          {l:"Vault / Speak Up",r:"What is happening",d:"Case data, complaint volumes, regional patterns. Knowledge Management uses these as evidence and signal data — what risks have materialised, what trends are emerging."},
          {l:"Compliance Education",r:"Who knows what",d:"Completion rates, overdue training, content consumption. Knowledge Management uses these to populate training-related disclosures and demonstrate programme coverage."},
          {l:"Third Party Management",r:"Supply chain intelligence",d:"Vendor assessments, due diligence records. Knowledge Management assists third parties in completing surveys sent via TPM — the receiver gets an intelligent completion assistant."},
          {l:"Evidence collection",r:"The compounding input",d:"Immutable records, collected artefacts, audit trails. When fed into Knowledge Management, every evidence event makes the next compliance exercise faster."},
          {l:"Framework menu",r:"Coverage engine (Stage 3)",d:"A hosted menu of compliance frameworks and exercises. Users see what coverage their knowledge base already provides per framework — what's auto-answerable, what has partial data, where gaps remain. Knowledge Management guides further population to close deltas."},
          {l:"Legacy Toolkits",r:"Migration path",d:"Existing CSRD, IFRS, GRI toolkits on Projects migrate to Knowledge Management-powered templates that pre-populate from the knowledge base."},
        ].map((s,i)=>(
          <div key={i} className="card" style={{marginBottom:6}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline"}}>
              <span className="card-t">{s.l}</span>
              <span style={{fontSize:13,color:"#666"}}>{s.r}</span>
            </div>
            <p className="card-d" style={{marginTop:4}}>{s.d}</p>
          </div>
        ))}
        <h3 className="h3">Output types by stage</h3>
        {[
          {s:"Stage 1",t:"Questionnaire responses",ex:"Regulatory RFIs, vendor assessments, industry surveys, framework disclosures, Ethisphere EQ"},
          {s:"Stage 1",t:"Narrative disclosures",ex:"CSRD topical standards, ISSB-aligned climate disclosures, DPIAs, ABC risk assessments"},
          {s:"Stage 2",t:"Populated tables + evidence",ex:"RoPAs, emissions data, training matrices, control evidence packages"},
          {s:"Stage 2",t:"Third-party completion assistance",ex:"Vendor surveys via TPM — receiver-side drafting from their knowledge base"},
          {s:"Stage 3",t:"Coverage dashboards + gap guidance",ex:"Per-framework readiness state, auto-populated fields, delta identification, population guidance"},
          {s:"Stage 3",t:"Cross-module intelligence",ex:"Knowledge Management feeds Connected Compliance modules natively — disclosures, risk detection, programme reporting"},
        ].map((o,i)=>(
          <div key={i} className="orow">
            <span className="otag">{o.s}</span>
            <div><b>{o.t}</b> — <span style={{color:"#666"}}>{o.ex}</span></div>
          </div>
        ))}
      </div>
    )
  },
  {
    id: "seq",
    title: "Sequencing",
    sub: "Standalone first, then platform integration",
    content: () => (
      <div>
        <p className="b">SurveySync can generate revenue <b>now</b> as a standalone product — clients receive questionnaires, load their knowledge base, get drafted responses. It doesn't need to wait for full Knowledge Management platform integration. But the long-term value is in Knowledge Management connecting to everything on the platform, making every compliance exercise faster.</p>
        {[
          {p:"Phase 1: SurveySync standalone value",items:["Sell SurveySync as the answer to 'I got a spreadsheet and I need to respond' — regulatory RFIs, customer assessments, industry surveys, framework disclosures","Toolkit migration: audit current Toolkit usage across CSRD, IFRS, GRI and other frameworks. Work with Commercial to understand (a) which Toolkits have strongest adoption and revenue, (b) which frameworks we've wanted to support but couldn't justify building a Toolkit for, and (c) which use cases don't fit the Projects workflow at all. Prioritise migration based on this demand mapping — not just what exists today, but what we've been leaving on the table","ISSB-aligned climate disclosures: build the four-pillar TCFD/ISSB knowledge base template once. Serve Australia, Japan, Hong Kong, Singapore, Malaysia, Brazil, UK and future adopters with jurisdiction-specific output templates on top. Highest-leverage single investment across Tier 1","Privacy compliance: DPIAs, privacy policy drafting, multi-jurisdictional questionnaire responses","ABC programme documentation: programme effectiveness narratives and related questionnaire responses. Note: Diligent has a dedicated Risk BU with existing risk assessment products — discovery should map the boundary carefully to ensure we complement rather than replicate","Ethisphere partnership (if finalised): launch co-branded WMEC application tool as dedicated SurveySync environment. Target is the 2026 cycle (applications open July 30) — timeline is tight and will require rapid MVP scoping if partnership terms are agreed"],why:"Revenue-generating immediately. No platform integration dependencies. ISSB template built once scales across 36+ jurisdictions. Toolkit demand mapping with Commercial ensures we migrate the right things first and unlock previously unserviceable frameworks."},
          {p:"Phase 2: Knowledge Management as Connected Compliance capability",items:["Connect Knowledge Management to PM2, Vault, Compliance Education — platform data becomes knowledge base source material","Integrate evidence collection pipeline — collected artefacts feed the knowledge base","TPM integration: third parties receiving surveys get completion assistance from their own knowledge base","Expand output types: populated tables, attached evidence, cross-referenced data"],why:"Unlocks the compounding flywheel. Every platform activity feeds Knowledge Management. Control-based frameworks become addressable."},
          {p:"Phase 3: Framework coverage engine",items:["Host a menu of compliance frameworks and exercises with per-framework coverage dashboards","Users see at a glance what their knowledge base already covers — auto-answerable, partial, gaps","Knowledge Management actively guides users on further population to minimise or eradicate manual work for deltas","Cross-domain reasoning: Knowledge Management connects signals from Vault + policies from PM2 + training from Compliance Education","New compliance exercises start pre-populated from accumulated knowledge across all prior exercises"],why:"Knowledge Management becomes the thing that makes Connected Compliance 'connected'. The platform doesn't just store compliance data — it understands what you've already answered and tells you what you still need."}
        ].map((ph,i)=>(
          <div key={i} className="card" style={{marginBottom:10}}>
            <div className="card-t" style={{marginBottom:8,fontSize:16}}>{ph.p}</div>
            {ph.items.map((it,j)=><div key={j} style={{fontSize:15,color:"#666",lineHeight:1.65,marginBottom:4,paddingLeft:4}}>• {it}</div>)}
            <div style={{fontSize:14,color:"#666",fontStyle:"italic",marginTop:10,paddingTop:10,borderTop:"1px solid #E2E8F0"}}>{ph.why}</div>
          </div>
        ))}
      </div>
    )
  },
  {
    id: "disc",
    title: "Discovery next steps",
    sub: "For the PM",
    content: () => (
      <div>
        <p className="b">This report establishes the strategic case. The following discovery areas will validate demand, technical feasibility, and sequencing.</p>
        {[
          {a:"Customer validation",qs:["Which existing clients are receiving the most external questionnaires/surveys? Interview 5–10 on their current process.","What Toolkit customers (CSRD, IFRS, GRI) would be candidates for early migration to Knowledge Management-powered SurveySync?","What do clients currently spend on consultants for narrative compliance deliverables? This is the pricing anchor.","For TPM customers: how do their third parties currently complete surveys? What's the receiver-side pain?","Which clients have ISSB-aligned reporting obligations across multiple jurisdictions? These are the highest-value early targets for the 'build once, serve everywhere' value proposition."]},
          {a:"Technical feasibility",qs:["What API surfaces exist between PM2, Vault, Compliance Education, and TPM that Knowledge Management could consume?","How does the evidence collection pipeline currently store and index artefacts? What would 'feeding Knowledge Management' require?","What is the Toolkit migration path from Projects to Knowledge Management-powered templates? Effort per framework?","What RAG pipeline infrastructure from the Compliance Agent work could be reused for Knowledge Management?"]},
          {a:"Ethisphere partnership",qs:["Timeline is tight: 2026 applications open July 30 and close October 30. What is the minimum viable co-branded experience we could deliver by July?","What is the current EQ application format (portal, spreadsheet, PDF)? How much re-engineering vs. wrapping is needed?","How much of the EQ could be pre-populated from a company's existing Diligent data (Vault cases, PM2 policies, Compliance Education completion)?","How many companies apply annually? What's the funnel conversion assumption for PLG into SurveySync standalone?","What does the co-branding and revenue share model look like? Who owns the applicant relationship?","If 2026 cycle is not achievable, what's the fallback plan for 2027 — and does that change the partnership value proposition?"]},
          {a:"Competitive positioning",qs:["Who else helps clients answer incoming questionnaires? (OneTrust, Whistic, Prevalent, manual processes)","What are clients paying for Toolkits today? Willingness-to-pay delta for Knowledge Management-powered versions?","Is there a partner ecosystem that could co-sell or white-label SurveySync?"]},
          {a:"Regulatory tracking",qs:["EU AI Act Digital Omnibus confirmed — high-risk deadlines shifted to Dec 2027 / Aug 2028. Monitor for final trilogue text.","California SB 253: Aug 10, 2026 deadline confirmed and live. Monitor CARB enforcement guidance.","California SB 261: Ninth Circuit ruling expected 2026. If upheld, CARB will set new reporting date.","CSRD Omnibus I: Member States must transpose new thresholds by Mar 19, 2027. Monitor for gold-plating and fragmentation.","UK FCA consultation CP26/5 closes 20 March 2026 — final rules expected autumn 2026. Monitor for scope changes.","Japan SSBJ: FY Mar 2027 first mandatory year for ¥3T+ companies. Tier 1 companies already inside their first reporting period as of Apr 2026.","EFRAG revised ESRS adoption — delegated act expected June 2026. Sets CSRD Toolkit migration priority."]}
        ].map((d,i)=>(
          <div key={i} style={{marginBottom:20}}>
            <h3 className="h3">{d.a}</h3>
            {d.qs.map((q,j)=><div key={j} className="dq">{q}</div>)}
          </div>
        ))}
      </div>
    )
  }
];

/* ── Components ── */
function ISSBCard({j}){
  const [open,setOpen]=useState(false);
  return(
    <div className="fw-card">
      <div onClick={()=>setOpen(!open)} className="fw-header">
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:16,fontWeight:600,color:"#1A1A1A"}}>{j.name}</div>
          <div style={{fontSize:13,color:"#666",marginTop:2}}>{j.region} · {j.entities}</div>
        </div>
        <span className="fw-toggle">{open?"−":"+"}</span>
      </div>
      {open&&(
        <div className="fw-body">
          <div className="fw-row"><span className="fw-label">Threshold</span><span>{j.threshold}</span></div>
          <div className="fw-row"><span className="fw-label">Deadline</span><span>{j.deadline}</span></div>
          <div className="fw-row"><span className="fw-label">Penalties</span><span>{j.penalties}</span></div>
          <p style={{marginTop:10}}>{j.detail}</p>
        </div>
      )}
    </div>
  );
}

function FW({fw}){
  const [open,setOpen]=useState(false);
  return(
    <div className="fw-card">
      <div onClick={()=>setOpen(!open)} className="fw-header">
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:16,fontWeight:600,color:"#1A1A1A"}}>{fw.name}</div>
          <div style={{fontSize:13,color:"#666",marginTop:2}}>{fw.region} · {fw.entities}</div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
          <span className="pill-outline">{fw.fit}</span>
          <span className="fw-toggle">{open?"−":"+"}</span>
        </div>
      </div>
      {open&&(
        <div className="fw-body">
          <div className="fw-row"><span className="fw-label">Deadline</span><span>{fw.deadline}</span></div>
          <div className="fw-row"><span className="fw-label">Key markets</span><span>{fw.markets}</span></div>
          <p style={{marginTop:10}}>{fw.detail}</p>
          <div className="int-box">
            <div style={{fontWeight:600,color:"#1A1A1A",marginBottom:4,fontSize:14}}>Platform integration</div>
            <div style={{fontSize:14}}>{fw.connection}</div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── App ── */
export default function App(){
  const [active,setActive]=useState("exec");
  const cur=sections.find(s=>s.id===active);
  const activeGroup=navGroups.find(g=>g.ids.includes(active));
  const otherGroups=navGroups.filter(g=>g!==activeGroup);

  return(
    <>
      <style>{`
        *{box-sizing:border-box;margin:0}
        body{background:#F5F6F8;font-family:'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,sans-serif;color:#1A1A1A}

        /* Header */
        .header{background:#252D38;padding:32px 32px 0;max-width:100%}
        .header-inner{max-width:1100px;margin:0 auto}
        .header-logo{height:28px;margin-bottom:20px;display:block}
        .header-title{font-size:32px;font-weight:700;color:#fff;line-height:1.2;margin-bottom:6px}
        .header-sub{font-size:15px;color:rgba(255,255,255,.6);font-weight:500;margin-bottom:24px}
        .header-tabs{display:flex;gap:0}
        .header-tab{padding:10px 20px;font-size:14px;font-weight:600;color:rgba(255,255,255,.5);cursor:pointer;border:none;background:transparent;font-family:inherit;border-radius:8px 8px 0 0;transition:all .15s}
        .header-tab:hover{color:rgba(255,255,255,.8)}
        .header-tab.on{background:#F5F6F8;color:#1A1A1A}

        /* Wrap */
        .wrap{max-width:1100px;margin:0 auto;padding:0 32px 36px}

        /* Nav bar under header */
        .nav-bar{background:#fff;border:1px solid #E2E8F0;border-top:none;border-radius:0 0 8px 8px;padding:16px 20px;margin-bottom:24px}
        .nav-desc{font-size:14px;color:#666;margin-bottom:12px;font-weight:500}
        .nav-pills{display:flex;gap:6px;flex-wrap:wrap}
        .tab{padding:7px 14px;border-radius:20px;border:1px solid #E2E8F0;background:#fff;color:#666;font-size:14px;cursor:pointer;font-family:inherit;font-weight:500;line-height:1.3;transition:all .15s}
        .tab:hover{background:#F5F6F8;border-color:#ccc}
        .tab.on{background:#D32D2D;color:#fff;font-weight:600;border-color:#D32D2D}

        /* Page card */
        .page-card{background:#fff;border:1px solid #E2E8F0;border-radius:8px;padding:28px 32px}
        .title{font-size:24px;font-weight:700;color:#1A1A1A;margin-bottom:2px;line-height:1.3}
        .title-accent{color:#D32D2D}
        .sub{font-size:15px;color:#666;margin-bottom:18px;font-weight:500}

        /* Body text */
        .b{font-size:16px;line-height:1.8;color:#1A1A1A;margin-bottom:12px}
        .h3{font-size:16px;font-weight:700;color:#1A1A1A;margin:20px 0 10px}

        /* Callout */
        .cta{background:#FFF5F5;border:1px solid #F5C6C6;border-radius:8px;padding:16px 18px;margin:16px 0}
        .cta-label{font-size:11px;font-weight:700;color:#D32D2D;letter-spacing:.8px;text-transform:uppercase;margin-bottom:8px}
        .cta-b{font-size:16px;color:#1A1A1A;line-height:1.7}

        /* Stats */
        .sg{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:18px}
        .sc{background:#fff;border:1px solid #E2E8F0;border-radius:8px;padding:16px 18px}
        .sv{font-size:28px;font-weight:700;color:#D32D2D}
        .sl{font-size:13px;color:#666;margin-top:3px;font-weight:500}

        /* Cards */
        .card{border:1px solid #E2E8F0;border-radius:8px;padding:14px 16px;background:#fff}
        .card-t{font-size:15px;font-weight:600;color:#1A1A1A}
        .card-d{font-size:15px;color:#666;line-height:1.65}

        /* Note */
        .note{background:#F5F6F8;border:1px solid #E2E8F0;border-radius:8px;padding:16px 18px}
        .note-t{font-size:15px;font-weight:700;color:#1A1A1A;margin-bottom:6px}
        .note-b{font-size:15px;color:#666;line-height:1.7}

        /* Pills */
        .pill{font-size:12px;color:#fff;padding:3px 10px;border-radius:20px;font-weight:600;white-space:nowrap}
        .pill-outline{font-size:12px;background:#FFF5F5;color:#D32D2D;padding:3px 10px;border-radius:20px;font-weight:600;white-space:nowrap;border:1px solid #F5C6C6}

        /* Framework expandable cards */
        .fw-card{border:1px solid #E2E8F0;border-radius:8px;background:#fff;margin-bottom:8px;overflow:hidden}
        .fw-header{display:flex;justify-content:space-between;align-items:center;padding:12px 16px;cursor:pointer;gap:8;transition:background .15s}
        .fw-header:hover{background:#FAFBFC}
        .fw-toggle{font-size:18px;color:#666;width:20px;text-align:center;line-height:1;user-select:none;flex-shrink:0}
        .fw-body{padding:0 16px 16px;font-size:15px;color:#666;line-height:1.7;border-top:1px solid #E2E8F0}
        .fw-body>div:first-child,.fw-body>p:first-child{padding-top:12px}
        .fw-row{display:flex;gap:8px;margin-bottom:4px}
        .fw-label{font-weight:600;color:#1A1A1A;flex-shrink:0;min-width:90px}
        .int-box{background:#F5F6F8;border-radius:6px;padding:10px 12px;margin-top:12px;font-size:14px}

        /* Tables */
        .tbl{width:100%;border-collapse:collapse;font-size:14px}
        .tbl th{text-align:left;padding:10px;font-weight:600;font-size:13px;color:#1A1A1A;border-bottom:2px solid #E2E8F0;text-transform:uppercase;letter-spacing:.3px}
        .tbl td{padding:10px;color:#666;border-bottom:1px solid #E2E8F0}

        /* Output rows */
        .orow{display:flex;gap:10px;align-items:baseline;padding:8px 0;border-bottom:1px solid #E2E8F0;font-size:15px;color:#666}
        .otag{font-size:12px;color:#666;flex-shrink:0;width:52px;font-weight:600}

        /* Discovery questions */
        .dq{background:#F5F6F8;border:1px solid #E2E8F0;border-radius:6px;padding:10px 14px;margin-bottom:6px;font-size:15px;color:#666;line-height:1.6}

        /* Quick jump */
        .jump-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:24px}
        .jump-card{background:#fff;border:1px solid #E2E8F0;border-radius:8px;padding:18px 20px;cursor:pointer;transition:all .15s}
        .jump-card:hover{border-color:#D32D2D;box-shadow:0 2px 8px rgba(211,45,45,.08)}
        .jump-label{font-size:15px;font-weight:700;color:#D32D2D;margin-bottom:4px}
        .jump-desc{font-size:14px;color:#666;line-height:1.5}

        /* Footer */
        .foot{font-size:12px;color:#666;margin-top:24px;text-align:center;font-weight:500;padding:0 32px}
      `}</style>

      {/* Header */}
      <div className="header">
        <div className="header-inner">
          <svg className="header-logo" viewBox="0 0 800 222" xmlns="http://www.w3.org/2000/svg"><g fill="#fff"><rect x="362.89" y="85.89" width="18.73" height="84.72"/><rect x="362.89" y="54.16" width="18.73" height="21.1"/><rect x="399.43" y="52.29" width="18.73" height="118.33"/><rect x="439.04" y="85.89" width="18.73" height="84.72"/><rect x="439.04" y="54.16" width="18.73" height="21.1"/><path d="M538.68,96.12c-2.68-3.34-5.83-6.02-9.44-8.04c-4.86-2.71-10.47-4.06-16.81-4.06c-7.68,0-14.54,1.8-20.57,5.39c-6.04,3.6-10.82,8.52-14.36,14.77c-3.53,6.25-5.3,13.39-5.3,21.42c0,7.92,1.76,15.06,5.3,21.42c3.53,6.35,8.37,11.36,14.51,15c6.14,3.65,13.05,5.47,20.73,5.47c6.24,0,11.85-1.35,16.81-4.07c3.17-1.73,5.9-3.97,8.21-6.72v9.84c0,4.37-.95,8.13-2.84,11.25c-1.89,3.13-4.48,5.5-7.75,7.11c-3.28,1.61-7.06,2.42-11.36,2.42c-5.43,0-10.01-1.25-13.74-3.75c-3.74-2.5-6.27-5.73-7.6-9.69l-17.35,6.88c1.74,4.9,4.5,9.15,8.29,12.74c3.78,3.6,8.29,6.41,13.51,8.44c5.22,2.03,10.9,3.05,17.04,3.05c7.88,0,14.87-1.67,20.96-5c6.09-3.34,10.87-7.89,14.36-13.68c3.48-5.79,5.22-12.38,5.22-19.77V85.89h-17.81V96.12z M534.85,138.11c-1.95,3.65-4.63,6.51-8.06,8.6c-3.43,2.08-7.35,3.13-11.75,3.13c-4.51,0-8.52-1.07-12.05-3.21c-3.53-2.13-6.29-5-8.29-8.6c-2-3.6-2.99-7.68-2.99-12.27c0-4.59,1-8.7,2.99-12.35c2-3.65,4.76-6.54,8.29-8.68c3.53-2.13,7.55-3.21,12.05-3.21c4.3,0,8.16,1.07,11.59,3.21c3.43,2.14,6.14,5.03,8.14,8.68c2,3.65,2.99,7.76,2.99,12.35C537.76,130.34,536.79,134.46,534.85,138.11z"/><path d="M638.71,96.21c-3.43-3.86-7.63-6.85-12.59-8.99c-4.97-2.13-10.62-3.21-16.97-3.21c-7.78,0-14.79,1.9-21.04,5.7c-6.24,3.81-11.18,9.02-14.82,15.63c-3.63,6.62-5.45,14.15-5.45,22.59c0,8.34,1.79,15.87,5.37,22.59c3.58,6.72,8.6,12.06,15.05,16.02s13.87,5.94,22.26,5.94c5.73,0,10.98-.89,15.74-2.66c4.76-1.77,8.88-4.24,12.36-7.42c3.48-3.18,6.04-6.75,7.68-10.71l-15.35-7.66c-1.95,3.44-4.61,6.23-7.98,8.36c-3.38,2.14-7.47,3.21-12.28,3.21c-4.71,0-8.91-1.12-12.59-3.36c-3.69-2.24-6.5-5.44-8.44-9.61c-1.25-2.69-2.01-5.66-2.29-8.91h60.94c.41-1.25.67-2.63.77-4.14c.1-1.51.15-2.94.15-4.3c0-5.63-.9-10.92-2.69-15.87C644.75,104.47,642.14,100.07,638.71,96.21z M589.5,112.86c1.84-4.22,4.48-7.45,7.91-9.69c3.43-2.24,7.34-3.36,11.75-3.36c4.5,0,8.39,1.15,11.67,3.44c3.28,2.29,5.68,5.37,7.22,9.22c.79,2,1.24,4.13,1.35,6.41h-41.64C588.13,116.71,588.7,114.7,589.5,112.86z"/><path d="M721.31,88.08c-4.76-2.71-10.21-4.06-16.35-4.06c-5.94,0-11.13,1.36-15.58,4.06c-3.34,2.03-5.98,4.77-7.91,8.22V85.89h-17.81v84.72h18.73v-49.87c0-3.96.74-7.37,2.23-10.24c1.48-2.87,3.58-5.08,6.3-6.64c2.71-1.56,5.81-2.35,9.29-2.35c3.38,0,6.4.78,9.06,2.35c2.66,1.56,4.73,3.78,6.22,6.64c1.48,2.87,2.23,6.28,2.23,10.24v49.87h18.73v-54.71c0-6.25-1.33-11.77-3.99-16.57C729.78,94.55,726.08,90.79,721.31,88.08z"/><path d="M797.16,154.52c-.97.1-1.87.16-2.69.16c-3.17,0-5.81-.52-7.91-1.56c-2.1-1.04-3.63-2.55-4.61-4.53c-.97-1.98-1.46-4.43-1.46-7.35v-38.3h19.04V85.89H780.5V66.51h-18.73v6.56c0,4.06-1.1,7.22-3.3,9.46c-2.2,2.24-5.3,3.36-9.29,3.36h-1.84v17.04h14.43v39.23c0,9.38,2.51,16.62,7.52,21.73c5.01,5.11,12.08,7.66,21.19,7.66c1.43,0,3.04-.1,4.84-.31c1.79-.21,3.35-.42,4.68-.63V154.2C799.08,154.31,798.13,154.42,797.16,154.52z"/><path d="M318.14,61.51c-8.85-4.9-19.27-7.34-31.24-7.34h-41.94v116.46h41.94c11.98,0,22.39-2.48,31.24-7.43c8.85-4.95,15.71-11.8,20.57-20.56c4.86-8.75,7.29-18.86,7.29-30.33c0-11.46-2.43-21.57-7.29-30.33C333.85,73.23,327,66.41,318.14,61.51z M321.52,133.81c-3.22,6.1-7.75,10.81-13.59,14.15c-5.83,3.34-12.74,5-20.73,5h-22.75V71.83h22.75c7.98,0,14.89,1.64,20.73,4.92c5.83,3.28,10.36,7.95,13.59,13.99c3.22,6.05,4.84,13.18,4.84,21.42C326.36,120.49,324.75,127.71,321.52,133.81z"/></g><g><path fill="#EE312E" d="M200.87,110.85c0,33.96-12.19,61.94-33.03,81.28c-.24.21-.42.43-.66.64c-15.5,14.13-35.71,23.52-59.24,27.11l-1.59-1.62l35.07-201.75l1.32-3.69C178.64,30.36,200.87,65.37,200.87,110.85z"/><path fill="#AF292E" d="M142.75,12.83l-.99,1.47L.74,119.34L0,118.65c0,0,0-.03,0-.06V.45h85.63c5.91,0,11.64.34,17.19,1.01h.21c14.02,1.66,26.93,5.31,38.48,10.78C141.97,12.46,142.75,12.83,142.75,12.83z"/><path fill="#D3222A" d="M142.75,12.83L0,118.65v99.27v3.62h85.96c7.61,0,14.94-.58,21.99-1.66C107.95,219.89,142.75,12.83,142.75,12.83z"/></g></svg>
          <div className="header-title">Knowledge Management</div>
          <div className="header-sub">Strategic Opportunity Assessment — SurveySync + Knowledge Management</div>
          <div className="header-tabs">
            {navGroups.map((g,i)=>(
              <button key={i} className={`header-tab ${activeGroup===g?"on":""}`} onClick={()=>setActive(g.ids[0])}>{g.label}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="wrap">
        {/* Nav bar */}
        <div className="nav-bar">
          <div className="nav-desc">{activeGroup.desc}</div>
          <div className="nav-pills">
            {activeGroup.ids.map(id=>{
              const m=sectionMeta[id];
              return <button key={id} className={`tab ${active===id?"on":""}`} onClick={()=>setActive(id)}>{m.icon} {m.title}</button>
            })}
          </div>
        </div>

        {/* Content */}
        <div className="page-card">
          <div className="title">{cur.title.includes(":")?<>{cur.title.split(":")[0]}:<span className="title-accent">{cur.title.split(":").slice(1).join(":")}</span></>:cur.title}</div>
          {cur.sub&&<div className="sub">{cur.sub}</div>}
          {cur.content()}
        </div>

        {/* Quick jump cards */}
        <div className="jump-grid">
          {otherGroups.map((g,i)=>(
            <div key={i} className="jump-card" onClick={()=>setActive(g.ids[0])}>
              <div className="jump-label">{g.label} →</div>
              <div className="jump-desc">{g.desc}</div>
            </div>
          ))}
        </div>

        <div className="foot">Prepared March 2026 · Regulatory research current as of this date · Estimates are rough order-of-magnitude</div>
      </div>
    </>
  );
}
