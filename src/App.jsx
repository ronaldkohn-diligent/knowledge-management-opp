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
          <div className="cta-t">The thesis</div>
          <p className="cta-b">SurveySync is the product clients buy. Knowledge Management is the Connected Compliance capability that makes it — and every other module — intelligent. Together, they mean a client never types out an answer to a compliance question that the platform already has the data to answer.</p>
        </div>
        <div className="sg">
          {[{v:"5",l:"Tier 1 disclosure frameworks"},{v:"50k–90k+",l:"Addressable entities"},{v:"6+",l:"Tier 2 operational frameworks"},{v:"30+",l:"Jurisdictions with live or imminent mandates"}].map((d,i)=>(
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
    sub: "30+ jurisdictions, one knowledge base architecture",
    content: () => (
      <div>
        <p className="b">The ISSB's IFRS S1 and S2 standards have become the global baseline for sustainability disclosure. As of early 2026, 36 jurisdictions have adopted or are finalising steps toward ISSB-aligned standards — collectively representing over 60% of global GDP. Each jurisdiction creates a local variant (AASB in Australia, SSBJ in Japan, HKFRS in Hong Kong, etc.) but the underlying four-pillar structure is identical everywhere: governance, strategy, risk management, metrics & targets.</p>
        <p className="b">This is the single strongest argument for SurveySync's knowledge base architecture. A client builds their climate disclosure knowledge base once — transition plans, scenario analysis, emissions data, governance structures — and SurveySync produces jurisdiction-specific outputs on top. The same inputs serve Australia, Japan, Hong Kong, Singapore, Malaysia, Brazil, the UK, and every future ISSB-adopting jurisdiction with local template modifications.</p>

        <div className="cta" style={{marginBottom:16}}>
          <div className="cta-t">The commercial insight</div>
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
          <div className="cta-t">Combined ISSB addressable surface</div>
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
          <div className="cta-t">Status: Active conversations — not yet signed. Everything below is contingent on partnership terms being agreed. Target: 2026 application cycle (tight timeline — applications open Jul 30, close Oct 30).</div>
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
                ["CSRD / ESRS","EU + non-EU","~10k–12k","DE ~2k, FR ~1.5k, US ~1k","FY2027 → 2028"],
                ["ISSB-aligned (7 profiled)","Global (30+ jurisdictions)","~12k–14k+ (profiled); 20k+ total","AU, JP, HK, SG, MY, BR, UK","Rolling 2025–29"],
                ["EU AI Act","EU + deployers","~20k–50k+","Deployers ~15–40k+","Aug 2026"],
                ["CA SB 253/261","US (CA)","~10k–12k","253: ~5.3k, 261: ~10k+","Aug 2026 / TBD"],
              ].map((r,i)=><tr key={i}>{r.map((c,j)=><td key={j} style={{fontWeight:j===0||j===2?600:400}}>{c}</td>)}</tr>)}
            </tbody>
          </table>
        </div>

        <div className="cta" style={{marginTop:14,marginBottom:20}}>
          <div className="cta-t">Tier 1 TAM estimate</div>
          <p className="cta-b">~52,000–88,000+ in-scope entities across all Tier 1 frameworks. Assuming a blended SurveySync ACV of $15k–$40k for disclosure-heavy use cases (replacing $50k–$150k in consulting spend), the addressable revenue range is approximately <b>$800M–$3.5B</b>. This is a ceiling, not a forecast — penetration rates, competitive dynamics, and framework overlap will compress the serviceable market. But even at 5–10% penetration, this represents $40M–$350M in annual recurring revenue from Tier 1 alone. The ISSB wave is the fastest-growing component: every new jurisdiction that adopts expands TAM without requiring changes to the knowledge base architecture.</p>
        </div>

        <h3 className="h3">Tier 2: Operational frameworks</h3>
        <div style={{overflowX:"auto"}}>
          <table className="tbl">
            <thead><tr>{["Framework","Region","Entities","Trigger","SurveySync fit"].map((h,i)=><th key={i}>{h}</th>)}</tr></thead>
            <tbody>
              {[
                ["Data privacy (GDPR+)","Global","Every data processor","20+ US states, GDPR 27+3, UK, BR, CA, AU, JP","Strongest Tier 2"],
                ["Anti-corruption / ABC","Global","~50k+ multinationals","Ongoing programme req.","Core E&C fit"],
                ["DORA","EU","~22k financial entities","Live since Jan 2025","Strong"],
                ["Regulatory RFIs","Global regulated","Every regulated entity","Dozens per year per entity","Core use case"],
                ["Third-party due diligence","Global","Every co. w/ supply chain","CSDDD 2028–29","Strong w/ TPM"],
              ].map((r,i)=><tr key={i}>{r.map((c,j)=><td key={j} style={{fontWeight:j===0||j===2?600:400}}>{c}</td>)}</tr>)}
            </tbody>
          </table>
        </div>

        <div className="cta" style={{marginTop:14,marginBottom:20}}>
          <div className="cta-t">Tier 2 TAM estimate</div>
          <p className="cta-b">Tier 2 is harder to size as a discrete market because it overlaps heavily with the existing E&C customer base. The addressable population is effectively every multinational company with compliance obligations — conservatively 100,000+ entities globally. At a blended ACV of $10k–$25k (lower than Tier 1 because these are often add-on modules rather than standalone purchases), the theoretical TAM is <b>$1B–$2.5B+</b>. More practically, the near-term opportunity is upselling existing Diligent E&C customers: if 20–30% of the installed base adopts Knowledge Management-powered questionnaire response capabilities at $10k–$20k ACV, that's a significant expansion of per-customer revenue with minimal new acquisition cost.</p>
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
          <div className="cta-t">Ethisphere TAM estimate</div>
          <p className="cta-b">The direct revenue from the co-branded Ethisphere tool itself depends on partnership terms (pricing TBD). The primary commercial value is converting Ethisphere users into SurveySync standalone subscribers. These users will have already experienced the core workflow — loading a knowledge base, receiving AI-drafted responses, reviewing and approving — on a constrained use case (EQ only). Converting them to full SurveySync unlocks their ability to answer any incoming questionnaire. At an estimated SurveySync ACV of $15k–$30k and a funnel of hundreds of applicants per year, even a 15–25% conversion rate represents <b>meaningful net-new ARR from a self-selecting, high-quality ICP</b> ($250M+ revenue, mature E&C programmes). Beyond SurveySync conversion, there is a further upsell opportunity into broader Diligent products (Vault, PM2, Compliance Education) for users who see value in connecting their compliance data — but that downstream value is not modelled here.</p>
        </div>

        <div className="note" style={{marginTop:18}}>
          <div className="note-t">Combined addressable surface</div>
          <p className="note-b">Tier 1 disclosure frameworks: ~50,000–90,000+ entities with live or imminent mandates — now including the full ISSB global wave across 30+ jurisdictions. Tier 2 operational frameworks: adds the entire existing E&C customer base as immediate upsell targets — privacy, ABC, DORA, and regulatory RFIs affect virtually every Diligent client. Ethisphere: adds a PLG funnel of $250M+ revenue companies with mature E&C programmes applying annually. Significant overlap across tiers compounds the per-customer revenue opportunity — a single client may need SurveySync for CSRD, ISSB-aligned climate disclosures across multiple jurisdictions, GDPR DPIAs, ABC risk assessments, and their Ethisphere application.</p>
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
          {s:"Stage 1",t:"Narrative disclosures",ex:"CSRD topical standards, SB 261 climate risk, ISSB-aligned climate disclosures, DPIAs, ABC risk assessments"},
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
          {p:"Phase 1: SurveySync standalone value",items:["Sell SurveySync as the answer to 'I got a spreadsheet and I need to respond' — regulatory RFIs, customer assessments, industry surveys, framework disclosures","Toolkit migration: audit current Toolkit usage across CSRD, IFRS, GRI and other frameworks. Work with Commercial to understand (a) which Toolkits have strongest adoption and revenue, (b) which frameworks we've wanted to support but couldn't justify building a Toolkit for, and (c) which use cases don't fit the Projects workflow at all. Prioritise migration based on this demand mapping — not just what exists today, but what we've been leaving on the table","ISSB-aligned climate disclosures: build the four-pillar TCFD/ISSB knowledge base template once. Serve Australia, Japan, Hong Kong, Singapore, Malaysia, Brazil, UK and future adopters with jurisdiction-specific output templates on top. Highest-leverage single investment across Tier 1","Privacy compliance: DPIAs, privacy policy drafting, multi-jurisdictional questionnaire responses","ABC programme documentation: programme effectiveness narratives and related questionnaire responses. Note: Diligent has a dedicated Risk BU with existing risk assessment products — discovery should map the boundary carefully to ensure we complement rather than replicate. The opportunity here may be in the narrative and questionnaire response layer that sits alongside, not instead of, formal risk assessment tooling","Ethisphere partnership (if finalised): launch co-branded WMEC application tool as dedicated SurveySync environment. Target is the 2026 cycle (applications open July 30) — timeline is tight and will require rapid MVP scoping if partnership terms are agreed"],why:"Revenue-generating immediately. No platform integration dependencies. ISSB template built once scales across 30+ jurisdictions. Toolkit demand mapping with Commercial ensures we migrate the right things first and unlock previously unserviceable frameworks."},
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
          {a:"Regulatory tracking",qs:["EU AI Act Digital Omnibus — will August 2026 deadline hold?","California Ninth Circuit ruling on SB 261 — expected 2026. If upheld, urgent US opportunity.","EFRAG revised ESRS adoption — delegated act by September 2026. Sets CSRD Toolkit migration priority.","UK FCA consultation CP26/5 closes 20 March 2026 — final rules expected autumn 2026. Monitor for scope changes.","Japan SSBJ: FY Mar 2027 first mandatory year for ¥3T+ companies. Tier 1 companies already inside their first reporting period as of Apr 2026."]}
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

const t1=[
  {name:"CSRD / ESRS",region:"EU + non-EU with EU presence",entities:"~10,000–12,000 post-Omnibus",deadline:"Wave 1 now; Wave 2 FY2027 (reports 2028)",fit:"Near-perfect · Toolkit exists",detail:"12 standards. Per material topic: policies, actions, targets, metrics, financial effects — all narrative. Double materiality assessment is a structured Q&A exercise. Post-Omnibus raised quality bar ('fair presentation' over checklist). Datapoints cut 61% but narrative judgement increased. Existing CSRD Toolkit on Projects is the first migration candidate.",markets:"Germany ~2,000 · France ~1,500 · Netherlands ~500 · Italy ~600 · US multinationals ~1,000",connection:"ESRS S1 (workforce) → Compliance Education data. ESRS G1 (business conduct) → Vault + PM2. Existing Toolkit revenue provides migration baseline."},
  {name:"ISSB-Aligned Frameworks",region:"Global — 30+ jurisdictions",entities:"~12,000–14,000+ (profiled); 20,000+ (all adopters)",deadline:"Rolling 2025–2029 across jurisdictions",fit:"Strongest cross-jurisdiction play",detail:"IFRS S1 and S2 adopted as local standards across 36+ jurisdictions representing >60% of global GDP. Four-pillar TCFD structure identical everywhere: governance, strategy, risk management, metrics & targets. Key jurisdictions: Australia (AASB S2, ~6k–7k entities), Japan (SSBJ, ~294+ phased by market cap), Hong Kong (HKFRS S2, ~2,600 Main Board), Singapore (SGX, ~613 listed), Malaysia (Bursa/MFRS, ~930+), Brazil (CVM, ~1,100 all listed), UK (UK SRS, ~515 listed initially). Build the knowledge base once, produce jurisdiction-specific outputs on top.",markets:"AU ~6k–7k · JP ~294+ (expanding) · HK ~2,600 · SG ~613 · MY ~930+ · BR ~1,100 · UK ~515 · Plus: CA, KR, CN, NZ, CL, MX, QA, TR, NG, KE, PK, and more",connection:"Same TCFD/ISSB knowledge base serves every jurisdiction. SB 261 (CA) also uses TCFD four pillars. Build once, sell globally. Each new adopting jurisdiction expands TAM with zero architecture change. See dedicated 'ISSB global wave' section for full jurisdiction detail."},
  {name:"EU AI Act (Annex IV)",region:"EU + any deployer into EU",entities:"~20,000–50,000+ deployers",deadline:"August 2, 2026",fit:"Strong (narrative + evidence)",detail:"9 mandatory sections per high-risk AI system. 6 of 9 are substantial narrative. 40–80 hours per system; enterprise with 5–20 systems = 200–1,600 hours. Retained 10 years. Clients receiving AI vendor documentation could use SurveySync to assess and respond.",markets:"Deployers: ~15,000–40,000+ · Providers: ~2,000–5,000 · US into EU: ~1,000–3,000",connection:"Diligent deploys AI itself — own documentation becomes template. AI in employment, whistleblower triage, case management are explicitly high-risk under Annex III."},
  {name:"California SB 253 + SB 261",region:"US (doing business in CA)",entities:"SB 253: ~5,300 · SB 261: ~10,000+",deadline:"SB 253: Aug 10, 2026. SB 261: TBD (injuncted).",fit:"SB 261 strong / SB 253 moderate",detail:"SB 261: bespoke climate risk narrative per entity (TCFD four pillars). SB 253: primarily quantitative (GHG Protocol). Contagion: similar bills in NY, CO, NJ, IL — one knowledge base serves 5+ states.",markets:"SB 253 ($1B+): ~5,300 · SB 261 ($500M+): ~10,000+ · Both public and private",connection:"Same TCFD knowledge base as ISSB-aligned frameworks. Clients already receiving climate-related questionnaires from customers and investors."}
];

const t2=[
  {name:"Data privacy compliance",region:"GDPR + 20 US states + global",entities:"Every company processing personal data",deadline:"Ongoing — event-driven",fit:"Strongest Tier 2 fit",detail:"Five document types, all recurring, all multi-jurisdictional: DPIAs, RoPAs, privacy policies, DPAs, Transfer Impact Assessments. A DPIA is structurally identical to a SurveySync workflow. Multi-jurisdictional multiplier: same inputs, different outputs per jurisdiction. Event-driven triggers create continuous engagement.",markets:"~20 US states active by 2026 · GDPR (27+3) · UK · Brazil · Canada · Australia · Japan",connection:"Vault: privacy complaints feed DPIA risk sections. Compliance Education: privacy training feeds 'organisational measures'. PM2: policy storage. TPM: vendor DPAs — third parties use SurveySync to complete privacy questionnaires."},
  {name:"Anti-corruption / Anti-bribery",region:"DOJ, UK Bribery Act, Sapin II",entities:"Every multinational (~50,000+)",deadline:"Ongoing — programme requirement",fit:"Core E&C — already your world",detail:"DOJ criteria require: written risk assessment, tailored policies, training evidence, programme effectiveness report. Clients regularly receive ABC-related questionnaires from partners, customers, and regulators — SurveySync serves this directly.",markets:"Every company with cross-border operations",connection:"PM2: ABC policy. Vault: reports. Compliance Education: ABC modules. Knowledge Management connects all three."},
  {name:"DORA (EU financial sector)",region:"EU",entities:"~22,000 financial entities + ICT vendors",deadline:"Live since January 2025",fit:"Strong (documentation-heavy)",detail:"Five pillars of ICT risk management, each requiring extensive policy and procedure documentation. Financial institutions receive frequent regulatory questionnaires — SurveySync directly applicable.",markets:"Banks, insurers, investment firms, payment processors — all 27 EU member states",connection:"PM2: ICT risk policies. TPM: vendor oversight surveys — third parties complete via SurveySync. Stage 2: testing docs and audit trails."},
  {name:"Regulatory questionnaires and RFIs",region:"Global — regulated industries",entities:"Every regulated entity",deadline:"Ongoing — dozens per year",fit:"SurveySync's core use case",detail:"Banks, insurers, utilities receive dozens of regulatory questionnaires annually. Each needs responses drawn from the same underlying data, formatted per regulator. This is literally what SurveySync was built for.",markets:"Every regulated financial institution, utility, healthcare organisation",connection:"Stage 3: prior responses feed Knowledge Management. New questionnaire → system identifies what it can already answer."},
  {name:"Third-party due diligence",region:"Global",entities:"Every company with supply chain",deadline:"CSDDD: 2028–29",fit:"Strong with TPM integration",detail:"Vendor risk assessments, modern slavery statements, supply chain due diligence. Third parties receiving these surveys via Diligent TPM use SurveySync to complete them. The TPM receiver-side play.",markets:"Growing regulatory pressure: EU (CSDDD), UK, Australia",connection:"TPM sends the survey. SurveySync helps the third party complete it. Knowledge Management learns from every completed survey."}
];

function ISSBCard({j}){
  const [open,setOpen]=useState(false);
  return(
    <div className="card" style={{marginBottom:8,padding:0,overflow:"hidden"}}>
      <div onClick={()=>setOpen(!open)} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px",cursor:"pointer",gap:8}}>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:16,fontWeight:600,color:"#1A1A1A"}}>{j.name}</div>
          <div style={{fontSize:13,color:"#666",marginTop:2}}>{j.region} · {j.entities}</div>
        </div>
        <span style={{fontSize:18,color:"#666",width:20,textAlign:"center",lineHeight:1,userSelect:"none"}}>{open?"−":"+"}</span>
      </div>
      {open&&(
        <div style={{padding:"0 16px 16px",fontSize:15,color:"#666",lineHeight:1.7,borderTop:"1px solid #E2E8F0"}}>
          <div style={{paddingTop:12}}>
            <div className="fw-row"><span className="fw-label">Threshold</span><span>{j.threshold}</span></div>
            <div className="fw-row"><span className="fw-label">Deadline</span><span>{j.deadline}</span></div>
            <div className="fw-row"><span className="fw-label">Penalties</span><span>{j.penalties}</span></div>
            <p style={{marginTop:10}}>{j.detail}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function FW({fw}){
  const [open,setOpen]=useState(false);
  return(
    <div className="card" style={{marginBottom:8,padding:0,overflow:"hidden"}}>
      <div onClick={()=>setOpen(!open)} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px",cursor:"pointer",gap:8}}>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:16,fontWeight:600,color:"#1A1A1A"}}>{fw.name}</div>
          <div style={{fontSize:13,color:"#666",marginTop:2}}>{fw.region} · {fw.entities}</div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
          <span className="pill-outline">{fw.fit}</span>
          <span style={{fontSize:18,color:"#666",width:20,textAlign:"center",lineHeight:1,userSelect:"none"}}>{open?"−":"+"}</span>
        </div>
      </div>
      {open&&(
        <div style={{padding:"0 16px 16px",fontSize:15,color:"#666",lineHeight:1.7,borderTop:"1px solid #E2E8F0"}}>
          <div style={{paddingTop:12}}>
            <div className="fw-row"><span className="fw-label">Deadline</span><span>{fw.deadline}</span></div>
            <div className="fw-row"><span className="fw-label">Key markets</span><span>{fw.markets}</span></div>
            <p style={{marginTop:10}}>{fw.detail}</p>
            <div className="int-box">
              <div style={{fontWeight:600,color:"#1A1A1A",marginBottom:4,fontSize:14}}>Platform integration</div>
              <div style={{fontSize:14}}>{fw.connection}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App(){
  const [active,setActive]=useState("exec");
  const cur=sections.find(s=>s.id===active);
  const navGroups=[
    {label:"Overview",ids:["exec","vision"]},
    {label:"Opportunities",ids:["t1","issb","t2","ethisphere","size"]},
    {label:"Strategy",ids:["arch","seq","disc"]},
  ];
  return(
    <>
      <style>{`
        *{box-sizing:border-box;margin:0}
        body{background:#F5F6F8;font-family:'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,sans-serif;color:#1A1A1A}
        .wrap{max-width:1100px;margin:0 auto;padding:24px 32px 36px}
        .nav{background:#fff;border:1px solid #E2E8F0;border-radius:8px;padding:14px 16px;margin-bottom:24px}
        .nav-group{display:flex;gap:6px;flex-wrap:wrap;align-items:center}
        .nav-group+.nav-group{margin-top:10px;padding-top:10px;border-top:1px solid #E2E8F0}
        .nav-label{font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.6px;color:#666;width:100%;margin-bottom:4px}
        .tab{padding:7px 14px;border-radius:20px;border:1px solid #E2E8F0;background:#fff;color:#666;font-size:14px;cursor:pointer;font-family:inherit;font-weight:500;line-height:1.3;transition:all .15s}
        .tab:hover{background:#F5F6F8;border-color:#ccc}
        .tab.on{background:#D32D2D;color:#fff;font-weight:600;border-color:#D32D2D}
        .page-card{background:#fff;border:1px solid #E2E8F0;border-radius:8px;padding:28px 32px}
        .title{font-size:22px;font-weight:700;color:#1A1A1A;margin-bottom:2px;line-height:1.3}
        .title-accent{color:#D32D2D}
        .sub{font-size:15px;color:#666;margin-bottom:18px;font-weight:500}
        .b{font-size:16px;line-height:1.8;color:#1A1A1A;margin-bottom:12px}
        .h3{font-size:16px;font-weight:700;color:#1A1A1A;margin:20px 0 10px}
        .cta{background:#FFF5F5;border:1px solid #F5C6C6;border-radius:8px;padding:16px 18px;margin:16px 0}
        .cta-t{font-size:15px;font-weight:700;color:#D32D2D;margin-bottom:6px}
        .cta-b{font-size:16px;color:#1A1A1A;line-height:1.7}
        .sg{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:18px}
        .sc{background:#fff;border:1px solid #E2E8F0;border-radius:8px;padding:16px 18px}
        .sv{font-size:26px;font-weight:700;color:#D32D2D}
        .sl{font-size:13px;color:#666;margin-top:3px;font-weight:500}
        .card{border:1px solid #E2E8F0;border-radius:8px;padding:14px 16px;background:#fff}
        .card-t{font-size:15px;font-weight:600;color:#1A1A1A}
        .card-d{font-size:15px;color:#666;line-height:1.65}
        .note{background:#F5F6F8;border:1px solid #E2E8F0;border-radius:8px;padding:16px 18px}
        .note-t{font-size:15px;font-weight:700;color:#1A1A1A;margin-bottom:6px}
        .note-b{font-size:15px;color:#666;line-height:1.7}
        .pill{font-size:12px;color:#fff;padding:3px 10px;border-radius:20px;font-weight:600;white-space:nowrap}
        .pill-outline{font-size:12px;background:#FFF5F5;color:#D32D2D;padding:3px 10px;border-radius:20px;font-weight:600;white-space:nowrap;border:1px solid #F5C6C6}
        .fw-row{display:flex;gap:8px;margin-bottom:4px}
        .fw-label{font-weight:600;color:#1A1A1A;flex-shrink:0;min-width:90px}
        .int-box{background:#F5F6F8;border-radius:6px;padding:10px 12px;margin-top:12px;font-size:14px}
        .tbl{width:100%;border-collapse:collapse;font-size:14px}
        .tbl th{text-align:left;padding:10px;font-weight:600;font-size:13px;color:#1A1A1A;border-bottom:2px solid #E2E8F0;text-transform:uppercase;letter-spacing:.3px}
        .tbl td{padding:10px;color:#666;border-bottom:1px solid #E2E8F0}
        .orow{display:flex;gap:10px;align-items:baseline;padding:8px 0;border-bottom:1px solid #E2E8F0;font-size:15px;color:#666}
        .otag{font-size:12px;color:#666;flex-shrink:0;width:52px;font-weight:600}
        .dq{background:#F5F6F8;border:1px solid #E2E8F0;border-radius:6px;padding:10px 14px;margin-bottom:6px;font-size:15px;color:#666;line-height:1.6}
        .foot{font-size:12px;color:#666;margin-top:24px;text-align:center;font-weight:500}
      `}</style>
      <div className="wrap">
        <nav className="nav">
          {navGroups.map((g,gi)=>(
            <div key={gi} className="nav-group">
              <div className="nav-label">{g.label}</div>
              {g.ids.map(id=>{const s=sections.find(x=>x.id===id);return <button key={id} className={`tab ${active===id?"on":""}`} onClick={()=>setActive(id)}>{s.title}</button>})}
            </div>
          ))}
        </nav>
        <div className="page-card">
          <div className="title">{cur.title.includes(":")?<>{cur.title.split(":")[0]}:<span className="title-accent">{cur.title.split(":").slice(1).join(":")}</span></>:cur.title}</div>
          {cur.sub&&<div className="sub">{cur.sub}</div>}
          {cur.content()}
        </div>
        <div className="foot">Prepared March 2026 · Regulatory research current as of this date · Estimates are rough order-of-magnitude</div>
      </div>
    </>
  );
}
