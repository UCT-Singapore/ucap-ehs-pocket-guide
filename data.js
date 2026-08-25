/* ============================================================
   UCAP EHS POCKET GUIDE — CONTENT DATA
   ------------------------------------------------------------
   Edit THIS file to change/add content. No HTML/JS knowledge
   needed for most edits — just edit the text between quotes.

   Anything written as [PLACEHOLDER: ...] must be replaced with
   real UCAP-specific information (contacts, links, locations)
   before this goes live.
   ============================================================ */

const SITE = {
  name: "UCAP EHS Pocket Guide",
  companyShort: "UCAP",
  reportingSystemName: "[PLACEHOLDER: Company Incident Reporting Platform Name]",
  reportingSystemUrl: "#", // [PLACEHOLDER: link to reporting system]
  sdsSystemUrl: "#",       // [PLACEHOLDER: link to SDS database]
  procedureSystemUrl: "#", // [PLACEHOLDER: link to controlled document system]
  lastUpdated: "2026-08-25"
};

/* ---------- EMERGENCY CONTACTS ----------
   Grouped list shown on the Emergency Contacts screen.
   Each group: { group, items: [{ label, phone, emoji }] }
-------------------------------------- */
const CONTACTS = [
  {
    group: "Emergency Services",
    items: [
      { label: "Ambulance & Fire", phone: "995", emoji: "🚑" },
      { label: "Police", phone: "999", emoji: "🚓" },
      { label: "Fire Command Centre", phone: "6250 9012", emoji: "🔥" }
    ]
  },
  {
    group: "Site Contacts",
    items: [
      { label: "Management — Vincent Lim", phone: "9623 8918", emoji: "👔" },
      { label: "Management — TS Sum", phone: "8112 3798", emoji: "👔" },
      { label: "SIC — Chiang Sun Chen", phone: "9852 8011", emoji: "🧑‍💼" },
      { label: "SIC — Ee Jern Liang", phone: "8137 2836", emoji: "🧑‍💼" },
      { label: "EHS — Toh Ee Meng", phone: "9678 5585", emoji: "🧑‍⚕️" },
      { label: "Facility — Wu Wenjian", phone: "8822 1930", emoji: "🏭" },
      { label: "IT — Robin Johan", phone: "9125 9883", emoji: "💻" }
    ]
  }
];

/* ---------- HOME CATEGORIES ---------- */
const CATEGORIES = [
  { id: "emergency",   emoji: "🔴", label: "Emergency" },
  { id: "chemical",    emoji: "🧪", label: "Chemical & Spill" },
  { id: "ppe",         emoji: "🥽", label: "PPE" },
  { id: "fire",        emoji: "🔥", label: "Fire Safety" },
  { id: "height",      emoji: "🪜", label: "Working at Height" },
  { id: "barricade",   emoji: "🚧", label: "Barricade & Restricted Area" },
  { id: "material",    emoji: "🚜", label: "Forklift / Material Movement" },
  { id: "waste",       emoji: "♻️", label: "Waste Disposal" },
  { id: "electrical",  emoji: "⚡", label: "Electrical Safety" },
  { id: "contractor",  emoji: "👷", label: "Contractor Work" },
  { id: "injury",      emoji: "🩹", label: "Injury / First Aid" },
  { id: "environment", emoji: "🌱", label: "Environmental & Sustainability" }
];

/* ---------- TOPIC GUIDES ----------
   Each topic: id, category, emoji, title, badge (label shown top),
   steps: [{title, text}], danger (optional red box),
   note (optional green box), links: [{emoji,label,action}]
   action can be: "sds" | "contacts" | "report" | "procedure" | "custom:<url>"
-------------------------------------- */
const TOPICS = [
  // ===== EMERGENCY =====
  {
    id: "fire-alarm", category: "emergency", emoji: "🔥", badge: "Emergency",
    title: "Fire Alarm",
    steps: [
      { title: "STOP", text: "Stop what you are doing immediately. Do not collect belongings." },
      { title: "MOVE", text: "Walk (do not run) to the nearest fire exit and assembly point." },
      { title: "ASSEMBLE", text: "Report to your area's designated assembly point for headcount." },
      { title: "WAIT", text: "Do not re-enter the building until told it is safe by EHS/Fire Warden." }
    ],
    danger: "If you see fire or smoke and it is safe to raise the alarm, activate the nearest fire alarm call point and shout to alert others.",
    links: [
      { emoji: "📞", label: "Emergency Contacts", action: "contacts" },
      { emoji: "📍", label: "Assembly Points", action: "procedure" },
      { emoji: "📋", label: "Full Emergency Procedure", action: "procedure" }
    ]
  },
  {
    id: "injury-emergency", category: "emergency", emoji: "🩹", badge: "Emergency",
    title: "Injury / Medical Emergency",
    steps: [
      { title: "STOP", text: "Stop work. Do not move a seriously injured person unless in immediate danger." },
      { title: "CALL", text: "Call the site emergency number or shout for the nearest first aider immediately." },
      { title: "PROTECT", text: "Keep the area clear. Do not remove PPE from the injured person unless necessary." },
      { title: "SUPPORT", text: "Stay with the person until help arrives. Follow first aider / paramedic instructions." }
    ],
    danger: "For life-threatening emergencies, call the site emergency number first before anything else.",
    links: [
      { emoji: "📞", label: "Emergency Contacts", action: "contacts" },
      { emoji: "🩹", label: "First Aider Locations", action: "procedure" },
      { emoji: "📝", label: "Report Incident", action: "report" }
    ]
  },
  {
    id: "unusual-smell-smoke", category: "emergency", emoji: "💨", badge: "Emergency",
    title: "Unusual Smell / Smoke",
    steps: [
      { title: "STOP", text: "Stop work in the affected area." },
      { title: "ALERT", text: "Warn others nearby. Do not investigate the source yourself." },
      { title: "REPORT", text: "Contact EHS or Security immediately with the location and description." },
      { title: "EVACUATE", text: "If instructed, or if you feel unwell, evacuate to the assembly point." }
    ],
    danger: "If the smell is strong, causes dizziness/breathing difficulty, or smoke is visible, evacuate the area immediately and activate the fire alarm.",
    links: [
      { emoji: "📞", label: "Emergency Contacts", action: "contacts" },
      { emoji: "📝", label: "Report Incident", action: "report" }
    ]
  },

  // ===== CHEMICAL =====
  {
    id: "chemical-spill", category: "chemical", emoji: "🧪", badge: "Chemical & Spill",
    title: "Chemical Spill",
    steps: [
      { title: "STOP", text: "Do not touch or walk through the spill." },
      { title: "CHECK", text: "What chemical is involved? Check the label/SDS if safe to do so." },
      { title: "PROTECT", text: "Keep others away. Use appropriate PPE." },
      { title: "RESPOND", text: "Only clean the spill if you are trained, equipped and it is safe to do so." }
    ],
    danger: "Large / unknown / dangerous spill: evacuate the immediate area and activate the site's emergency response process.",
    links: [
      { emoji: "📄", label: "SDS", action: "sds" },
      { emoji: "📞", label: "Emergency Contacts", action: "contacts" },
      { emoji: "📍", label: "Nearest Spill Kit", action: "procedure" },
      { emoji: "📋", label: "Company Procedure", action: "procedure" }
    ]
  },
  {
    id: "sds-lookup", category: "chemical", emoji: "📄", badge: "Chemical",
    title: "Finding an SDS",
    steps: [
      { title: "IDENTIFY", text: "Note the exact product name and manufacturer from the container label." },
      { title: "SEARCH", text: "Look up the product in the SDS system using the product name." },
      { title: "CHECK DATE", text: "Confirm the SDS is the current version (check revision date)." },
      { title: "ASK", text: "If not found, do not use the chemical — contact EHS before proceeding." }
    ],
    links: [
      { emoji: "📄", label: "Open SDS System", action: "sds" },
      { emoji: "📞", label: "Contact EHS", action: "contacts" }
    ]
  },
  {
    id: "chemical-transfer", category: "chemical", emoji: "🧴", badge: "Chemical",
    title: "Transferring / Decanting Chemicals",
    steps: [
      { title: "CHECK", text: "Confirm the chemical is approved and you have the current SDS." },
      { title: "PPE", text: "Wear the PPE specified in the SDS/RA before transferring." },
      { title: "LABEL", text: "Label the receiving container immediately — product name, hazard, date." },
      { title: "CONTAIN", text: "Transfer over secondary containment where required. Clean up drips immediately." }
    ],
    danger: "Never transfer a chemical into an unlabelled or food/drink container.",
    links: [
      { emoji: "📄", label: "SDS", action: "sds" },
      { emoji: "📋", label: "Company Procedure", action: "procedure" }
    ]
  },
  {
    id: "unknown-container", category: "chemical", emoji: "❓", badge: "Chemical",
    title: "Unknown / Unlabelled Container",
    steps: [
      { title: "DO NOT USE", text: "Do not open, smell, taste or use the contents." },
      { title: "DO NOT MOVE", text: "Leave it where it is unless it poses an immediate risk." },
      { title: "ISOLATE", text: "Keep others away from the container." },
      { title: "REPORT", text: "Notify EHS immediately for identification and safe disposal." }
    ],
    links: [
      { emoji: "📞", label: "Contact EHS", action: "contacts" },
      { emoji: "📝", label: "Report Incident", action: "report" }
    ]
  },

  // ===== PPE =====
  {
    id: "ppe-eye", category: "ppe", emoji: "🥽", badge: "PPE",
    title: "Eye Protection",
    steps: [
      { title: "CHECK", text: "Inspect lenses for scratches, cracks or fogging before use." },
      { title: "SELECT", text: "Use the eye protection specified for your task (safety glasses vs goggles vs face shield)." },
      { title: "WEAR", text: "Fit snugly with no gaps. Wear over prescription glasses only if rated for it." },
      { title: "REPLACE", text: "Report damaged or scratched eyewear for replacement — do not keep using it." }
    ],
    links: [
      { emoji: "📋", label: "Task-Based PPE Guide", action: "procedure" },
      { emoji: "📞", label: "Contact EHS", action: "contacts" }
    ]
  },
  {
    id: "ppe-hand", category: "ppe", emoji: "🧤", badge: "PPE",
    title: "Hand Protection",
    steps: [
      { title: "CHECK", text: "Confirm the glove type matches the chemical/task (check SDS glove recommendation)." },
      { title: "INSPECT", text: "Check gloves for holes, tears or degradation before each use." },
      { title: "WEAR", text: "Ensure a proper fit — too loose reduces dexterity and protection." },
      { title: "DISPOSE", text: "Remove and dispose of single-use gloves correctly; do not reuse contaminated gloves." }
    ],
    links: [
      { emoji: "📄", label: "SDS", action: "sds" },
      { emoji: "📋", label: "Task-Based PPE Guide", action: "procedure" }
    ]
  },
  {
    id: "ppe-foot", category: "ppe", emoji: "🥾", badge: "PPE",
    title: "Foot Protection",
    steps: [
      { title: "CHECK", text: "Safety footwear must be worn in all designated PPE zones." },
      { title: "INSPECT", text: "Check for worn soles, exposed steel/composite cap, or damage." },
      { title: "SELECT", text: "Use chemical/electrical-rated footwear if required for your task." },
      { title: "REPLACE", text: "Report damaged safety footwear for replacement." }
    ],
    links: [ { emoji: "📋", label: "PPE Zones Map", action: "procedure" } ]
  },
  {
    id: "ppe-hearing", category: "ppe", emoji: "🎧", badge: "PPE",
    title: "Hearing Protection",
    steps: [
      { title: "CHECK", text: "Hearing protection is required in marked high-noise zones." },
      { title: "SELECT", text: "Use earplugs or earmuffs as specified for the area/task." },
      { title: "FIT", text: "Insert earplugs correctly (roll, insert, hold) for a proper seal." },
      { title: "WEAR FULL TIME", text: "Keep protection on for the entire time you are in the noise zone." }
    ],
    links: [ { emoji: "📋", label: "Noise Zone Map", action: "procedure" } ]
  },

  // ===== FIRE =====
  {
    id: "fire-extinguisher", category: "fire", emoji: "🧯", badge: "Fire Safety",
    title: "Using a Fire Extinguisher",
    steps: [
      { title: "ASSESS", text: "Only attempt if the fire is small, contained, and you are trained." },
      { title: "ALERT", text: "Raise the alarm first and ensure others are evacuating." },
      { title: "SELECT", text: "Confirm the extinguisher type matches the fire (e.g. do not use water on electrical/oil fires)." },
      { title: "RETREAT", text: "If the fire grows or you're unsure, leave immediately and close doors behind you." }
    ],
    danger: "Never fight a fire that is spreading, filling the room with smoke, or blocking your exit route. Evacuate instead.",
    links: [
      { emoji: "📞", label: "Emergency Contacts", action: "contacts" },
      { emoji: "📋", label: "Fire Procedure", action: "procedure" }
    ]
  },
  {
    id: "hot-work", category: "fire", emoji: "🔧", badge: "Fire Safety",
    title: "Hot Work (Welding / Cutting / Grinding)",
    steps: [
      { title: "PERMIT", text: "Obtain a Hot Work Permit before starting — no permit, no work." },
      { title: "CLEAR", text: "Remove combustible materials from the area; cover what can't be moved." },
      { title: "WATCH", text: "Post a fire watch with an extinguisher during and after work." },
      { title: "MONITOR", text: "Check the area again 30–60 minutes after work finishes for smouldering material." }
    ],
    links: [
      { emoji: "📋", label: "Hot Work Permit", action: "procedure" },
      { emoji: "📞", label: "Contact EHS", action: "contacts" }
    ]
  },

  // ===== WORKING AT HEIGHT =====
  {
    id: "ladder-use", category: "height", emoji: "🪜", badge: "Working at Height",
    title: "Using a Ladder",
    steps: [
      { title: "INSPECT", text: "Check the ladder for damage before use — do not use a damaged ladder." },
      { title: "POSITION", text: "Set on firm, level ground at the correct angle (1:4 rule). Secure or foot it." },
      { title: "3 POINTS", text: "Maintain 3 points of contact at all times. Do not overreach." },
      { title: "LIMIT", text: "Do not stand on the top two rungs. Do not carry heavy items while climbing." }
    ],
    danger: "For work above 2 metres, a ladder may not be the appropriate access method — see Work at Height guidance.",
    links: [ { emoji: "📋", label: "Full Procedure", action: "procedure" } ]
  },
  {
    id: "work-above-2m", category: "height", emoji: "🏗️", badge: "Working at Height",
    title: "Working Above 2 Metres",
    steps: [
      { title: "AVOID", text: "First consider whether the work can be done from ground level instead." },
      { title: "PLAN", text: "Select the right equipment (scaffold, MEWP, platform) — a ladder is not for extended work." },
      { title: "PROTECT", text: "Use fall protection (guardrails, harness + anchor point) as required by the RA." },
      { title: "PERMIT", text: "Confirm whether a Working at Height Permit is required before starting." }
    ],
    danger: "Do not improvise access equipment (e.g. stacked pallets, chairs). Stop and get proper equipment.",
    links: [
      { emoji: "📋", label: "Working at Height Permit", action: "procedure" },
      { emoji: "📞", label: "Contact EHS", action: "contacts" }
    ]
  },

  // ===== BARRICADE / RESTRICTED AREA =====
  {
    id: "barricade-area", category: "barricade", emoji: "🚧", badge: "Barricade & Restricted Area",
    title: "Barricading a Work Area",
    steps: [
      { title: "IDENTIFY", text: "Determine the hazard and the area that needs to be kept clear." },
      { title: "BARRICADE", text: "Use approved barricade tape/stands with correct signage — do not use makeshift barriers." },
      { title: "SIGNAGE", text: "Post signage explaining the hazard and who to contact." },
      { title: "REMOVE", text: "Remove the barricade promptly once the hazard/work is complete." }
    ],
    links: [ { emoji: "📋", label: "Barricading Standard", action: "procedure" } ]
  },
  {
    id: "restricted-entry", category: "barricade", emoji: "⛔", badge: "Barricade & Restricted Area",
    title: "Entering a Restricted Area",
    steps: [
      { title: "CHECK AUTHORISATION", text: "Confirm you are authorised to enter — check signage for requirements." },
      { title: "PPE", text: "Wear the PPE specified for the area." },
      { title: "SIGN IN", text: "Follow the area's entry/log-in requirement if one applies." },
      { title: "FOLLOW ESCORT RULES", text: "If escort-only, do not enter without an authorised escort." }
    ],
    danger: "Never cross barricade tape or enter a restricted/red-tagged area without explicit authorisation.",
    links: [ { emoji: "📞", label: "Contact EHS", action: "contacts" } ]
  },

  // ===== MATERIAL MOVEMENT =====
  {
    id: "forklift-pedestrian", category: "material", emoji: "🚜", badge: "Material Movement",
    title: "Forklift & Pedestrian Interaction",
    steps: [
      { title: "EYE CONTACT", text: "Make eye contact with the forklift operator before crossing its path." },
      { title: "WALKWAYS", text: "Use designated pedestrian walkways at all times." },
      { title: "STAY CLEAR", text: "Never walk under a raised load or between a forklift and a wall/rack." },
      { title: "WAIT", text: "At blind corners/intersections, stop and wait — do not assume the operator sees you." }
    ],
    links: [ { emoji: "📋", label: "Traffic Management Plan", action: "procedure" } ]
  },
  {
    id: "manual-lifting", category: "material", emoji: "📦", badge: "Material Movement",
    title: "Manual Lifting / Moving Heavy Items",
    steps: [
      { title: "ASSESS", text: "Check the weight and shape. If in doubt, get help or use equipment." },
      { title: "PLAN PATH", text: "Clear the route of obstacles before you start lifting." },
      { title: "LIFT", text: "Bend knees, keep back straight, hold the load close to your body." },
      { title: "TEAM LIFT", text: "For heavy/awkward loads, use a trolley, lifting aid, or a team lift." }
    ],
    links: [ { emoji: "📋", label: "Manual Handling Guide", action: "procedure" } ]
  },

  // ===== WASTE =====
  {
    id: "general-waste", category: "waste", emoji: "🗑️", badge: "Waste Disposal",
    title: "General Waste",
    steps: [
      { title: "CHECK", text: "Confirm the item is genuinely non-hazardous, non-recyclable waste." },
      { title: "BIN", text: "Place in the general waste bin — never mix with chemical or recyclable waste." },
      { title: "REPORT FULL BINS", text: "Report overflowing bins to facilities/EHS rather than leaving waste on the floor." }
    ],
    links: [ { emoji: "📋", label: "Waste Segregation Guide", action: "procedure" } ]
  },
  {
    id: "recyclable-waste", category: "waste", emoji: "♻️", badge: "Waste Disposal",
    title: "Recyclable Waste",
    steps: [
      { title: "CHECK", text: "Confirm the material type against the recycling signage (paper, plastic, metal, etc.)." },
      { title: "CLEAN", text: "Ensure containers are empty and reasonably clean before recycling." },
      { title: "SORT", text: "Place in the correctly labelled recycling stream — do not mix streams." }
    ],
    links: [ { emoji: "📋", label: "Waste Segregation Guide", action: "procedure" } ]
  },
  {
    id: "chemical-waste", category: "waste", emoji: "☣️", badge: "Waste Disposal",
    title: "Chemical / Hazardous Waste",
    steps: [
      { title: "IDENTIFY", text: "Confirm the exact chemical waste type using the SDS." },
      { title: "CONTAIN", text: "Use the correct labelled hazardous waste container — never mix chemical waste types." },
      { title: "LABEL", text: "Label with contents, hazard class and date generated." },
      { title: "ROUTE", text: "Place in the designated hazardous waste storage area — never in general waste or drains." }
    ],
    danger: "Never pour chemical waste down a drain or into general/recyclable waste.",
    links: [
      { emoji: "📄", label: "SDS", action: "sds" },
      { emoji: "📋", label: "Hazardous Waste Procedure", action: "procedure" },
      { emoji: "📞", label: "Contact EHS", action: "contacts" }
    ]
  },

  // ===== ELECTRICAL =====
  {
    id: "electrical-work", category: "electrical", emoji: "⚡", badge: "Electrical Safety",
    title: "Performing Electrical Work",
    steps: [
      { title: "AUTHORISE", text: "Only authorised/qualified persons may perform electrical work." },
      { title: "ISOLATE", text: "Isolate and lock out the circuit before starting. Verify zero energy." },
      { title: "PERMIT", text: "Confirm whether a permit (LOTO / electrical work permit) is required." },
      { title: "TEST", text: "Test the circuit is de-energised with a rated tester before touching conductors." }
    ],
    danger: "If you are not authorised/trained for electrical work, do not attempt it — report the issue instead.",
    links: [
      { emoji: "📋", label: "LOTO Procedure", action: "procedure" },
      { emoji: "📞", label: "Contact EHS", action: "contacts" }
    ]
  },
  {
    id: "damaged-electrical", category: "electrical", emoji: "🔌", badge: "Electrical Safety",
    title: "Damaged Cord / Equipment",
    steps: [
      { title: "STOP USE", text: "Stop using the equipment immediately." },
      { title: "ISOLATE", text: "Unplug it if it is safe to do so. Do not touch damaged cords with wet hands." },
      { title: "TAG OUT", text: "Tag it 'Do Not Use' and remove it from service." },
      { title: "REPORT", text: "Report to facilities/EHS for inspection or repair." }
    ],
    links: [ { emoji: "📞", label: "Contact EHS", action: "contacts" } ]
  },

  // ===== CONTRACTOR =====
  {
    id: "before-contractor-work", category: "contractor", emoji: "👷", badge: "Contractor Work",
    title: "Before Contractor Work Starts",
    steps: [
      { title: "VERIFY", text: "Confirm the contractor is registered/inducted and has valid site access." },
      { title: "PERMIT", text: "Confirm required permits (hot work, height, confined space, electrical) are in place." },
      { title: "BRIEF", text: "Ensure the contractor has been briefed on site hazards relevant to their task." },
      { title: "SUPERVISE", text: "Confirm a responsible person is assigned to oversee the work." }
    ],
    links: [
      { emoji: "📋", label: "Contractor Management Procedure", action: "procedure" },
      { emoji: "📞", label: "Contact EHS", action: "contacts" }
    ]
  },

  // ===== INJURY / FIRST AID =====
  {
    id: "minor-injury", category: "injury", emoji: "🩹", badge: "Injury / First Aid",
    title: "Minor Injury (Cut / Bruise)",
    steps: [
      { title: "STOP", text: "Stop work and move to a safe, clean area." },
      { title: "TREAT", text: "Clean the wound and apply first aid from the nearest first aid kit." },
      { title: "ESCALATE", text: "See a first aider if bleeding doesn't stop or you're unsure of severity." },
      { title: "REPORT", text: "Report the injury through the company reporting system, even if minor." }
    ],
    links: [
      { emoji: "🩹", label: "First Aid Kit / First Aider Locations", action: "procedure" },
      { emoji: "📝", label: "Report Incident", action: "report" }
    ]
  },
  {
    id: "chemical-exposure", category: "injury", emoji: "🚿", badge: "Injury / First Aid",
    title: "Chemical Exposure (Skin / Eyes)",
    steps: [
      { title: "STOP", text: "Stop work immediately." },
      { title: "FLUSH", text: "Go to the nearest eyewash/safety shower and flush the area for at least 15 minutes." },
      { title: "REMOVE", text: "Remove contaminated clothing/PPE while flushing, if safe to do so." },
      { title: "SEEK HELP", text: "Get first aid / medical attention. Bring the SDS with you if possible." }
    ],
    danger: "For eye or significant skin exposure, go to the eyewash station immediately — do not delay to find an SDS first.",
    links: [
      { emoji: "📍", label: "Nearest Eyewash / Shower", action: "procedure" },
      { emoji: "📄", label: "SDS", action: "sds" },
      { emoji: "📝", label: "Report Incident", action: "report" }
    ]
  },

  // ===== ENVIRONMENT =====
  {
    id: "spill-to-drain", category: "environment", emoji: "🌊", badge: "Environmental",
    title: "Preventing Spills to Drains",
    steps: [
      { title: "IDENTIFY", text: "Know which drains on site connect to stormwater vs. treatment systems." },
      { title: "CONTAIN", text: "Use drain covers/booms when working near drains with chemicals." },
      { title: "RESPOND", text: "If a spill reaches a drain, stop the source and contact EHS immediately." },
      { title: "NEVER", text: "Never intentionally discharge chemicals, oils or wastewater to a drain." }
    ],
    danger: "A spill entering a stormwater drain can be a reportable environmental incident. Contact EHS immediately.",
    links: [
      { emoji: "📞", label: "Contact EHS", action: "contacts" },
      { emoji: "📝", label: "Report Incident", action: "report" }
    ]
  },
  {
    id: "energy-water-saving", category: "environment", emoji: "💡", badge: "Sustainability",
    title: "Everyday Energy & Water Saving",
    steps: [
      { title: "SWITCH OFF", text: "Turn off lights, equipment and compressed air at end of shift/task." },
      { title: "REPORT LEAKS", text: "Report dripping taps, leaking pipes or air leaks — don't assume someone else has." },
      { title: "SEGREGATE", text: "Sort waste correctly so recyclables don't end up in landfill." }
    ],
    links: [ { emoji: "📞", label: "Contact EHS", action: "contacts" } ]
  }
];

/* ---------- "I WANT TO..." DECISION GUIDES ----------
   Same shape as TOPICS but framed as an action a person wants to take,
   shown before they start rather than during an incident.
-------------------------------------------------------- */
const I_WANT_TO = [
  {
    id: "bring-new-chemical", emoji: "🧪", label: "Bring in a new chemical",
    intro: "Before purchasing or bringing the chemical onsite:",
    checklist: [
      "Check whether it is already approved",
      "Obtain the latest SDS",
      "Check storage requirements",
      "Determine required PPE",
      "Confirm waste disposal method",
      "Complete applicable EHS approval"
    ],
    note: "Do not purchase or use the chemical first and seek approval afterward.",
    links: [
      { emoji: "📄", label: "SDS System", action: "sds" },
      { emoji: "📞", label: "Contact EHS", action: "contacts" }
    ]
  },
  {
    id: "use-ladder", emoji: "🪜", label: "Use a ladder",
    intro: "Before using a ladder:",
    checklist: [
      "Confirm a ladder is the right equipment for the task (not extended/repetitive work)",
      "Inspect the ladder for damage",
      "Confirm firm, level ground for setup",
      "Check the task doesn't require reaching or working above shoulder height for long periods",
      "Have someone available to foot/steady the ladder if needed"
    ],
    links: [ { emoji: "📋", label: "Working at Height Procedure", action: "procedure" } ]
  },
  {
    id: "work-above-height-checklist", emoji: "🏗️", label: "Work above 2 metres",
    intro: "Before working above 2 metres:",
    checklist: [
      "Confirm whether a Working at Height Permit is required",
      "Select proper access equipment (scaffold, MEWP, platform — not a ladder for extended work)",
      "Confirm fall protection is available and in good condition",
      "Check weather conditions if outdoors",
      "Confirm the area below is barricaded"
    ],
    links: [ { emoji: "📋", label: "Working at Height Permit", action: "procedure" } ]
  },
  {
    id: "engage-contractor", emoji: "👷", label: "Engage a contractor",
    intro: "Before a contractor starts work onsite:",
    checklist: [
      "Confirm contractor registration/induction status",
      "Confirm required permits are identified and will be obtained",
      "Confirm insurance/competency documentation is on file",
      "Brief the contractor on relevant site hazards",
      "Assign a responsible person to supervise the work"
    ],
    links: [ { emoji: "📋", label: "Contractor Management Procedure", action: "procedure" } ]
  },
  {
    id: "perform-hot-work", emoji: "🔧", label: "Perform hot work",
    intro: "Before welding, cutting or grinding:",
    checklist: [
      "Obtain a Hot Work Permit",
      "Clear combustible materials from the area",
      "Confirm a fire extinguisher and fire watch are in place",
      "Check for gas/vapour hazards nearby",
      "Plan a post-work monitoring check (30–60 minutes after)"
    ],
    links: [ { emoji: "📋", label: "Hot Work Permit", action: "procedure" } ]
  },
  {
    id: "block-walkway", emoji: "🚧", label: "Block a walkway",
    intro: "Before blocking or restricting a walkway:",
    checklist: [
      "Confirm an alternative safe route is available",
      "Use approved barricade/signage — not improvised barriers",
      "Notify affected departments/areas in advance if possible",
      "Set a plan to remove the barricade once work is complete"
    ],
    links: [ { emoji: "📋", label: "Barricading Standard", action: "procedure" } ]
  },
  {
    id: "move-heavy-item", emoji: "📦", label: "Move a heavy item",
    intro: "Before moving a heavy or awkward item:",
    checklist: [
      "Check the weight — use lifting equipment/trolley where possible",
      "Plan and clear the travel path",
      "Get a second person for a team lift if needed",
      "Confirm pedestrian routes stay clear during the move"
    ],
    links: [ { emoji: "📋", label: "Manual Handling Guide", action: "procedure" } ]
  },
  {
    id: "dispose-chemical-waste", emoji: "☣️", label: "Dispose of chemical waste",
    intro: "Before disposing of chemical waste:",
    checklist: [
      "Identify the exact waste type using the SDS",
      "Use the correct labelled hazardous waste container",
      "Never mix different chemical waste types",
      "Route to the designated hazardous waste storage area",
      "Never pour into drains or general waste"
    ],
    links: [
      { emoji: "📄", label: "SDS System", action: "sds" },
      { emoji: "📋", label: "Hazardous Waste Procedure", action: "procedure" }
    ]
  },
  {
    id: "introduce-new-equipment", emoji: "🛠️", label: "Introduce new equipment",
    intro: "Before bringing new equipment into use:",
    checklist: [
      "Confirm the equipment has a risk assessment / safety review",
      "Confirm required guarding/safety features are in place",
      "Identify training needs for users",
      "Confirm maintenance and inspection requirements are defined",
      "Complete applicable EHS approval before use"
    ],
    links: [ { emoji: "📞", label: "Contact EHS", action: "contacts" } ]
  },
  {
    id: "modify-equipment", emoji: "🔩", label: "Modify equipment",
    intro: "Before modifying existing equipment:",
    checklist: [
      "Confirm the modification is approved through change management/EHS",
      "Assess impact on existing guarding and safety features",
      "Update the risk assessment if the hazard profile changes",
      "Update operating instructions and retrain users if needed"
    ],
    danger: "Never modify safety-critical equipment (guards, interlocks, relief devices) without formal approval.",
    links: [ { emoji: "📞", label: "Contact EHS", action: "contacts" } ]
  },
  {
    id: "perform-electrical-work-checklist", emoji: "⚡", label: "Perform electrical work",
    intro: "Before performing electrical work:",
    checklist: [
      "Confirm you are authorised/qualified to perform the work",
      "Confirm whether a permit (LOTO / electrical permit) is required",
      "Plan isolation and lockout of the circuit",
      "Have a rated tester available to verify zero energy",
      "Confirm PPE (insulated tools, rated gloves) is available"
    ],
    links: [ { emoji: "📋", label: "LOTO Procedure", action: "procedure" } ]
  },
  {
    id: "enter-restricted-area", emoji: "⛔", label: "Enter a restricted area",
    intro: "Before entering a restricted area:",
    checklist: [
      "Confirm you are authorised to enter",
      "Check signage for specific entry requirements (PPE, escort, sign-in)",
      "Confirm whether an escort is required",
      "Follow any log-in/log-out requirement for the area"
    ],
    links: [ { emoji: "📞", label: "Contact EHS", action: "contacts" } ]
  }
];
