/* ============================================================
   UCAP EHS POCKET GUIDE — CONTENT DATA
   ------------------------------------------------------------
   Edit THIS file to change/add content. No HTML/JS knowledge
   needed for most edits — just edit the text between quotes.

   Bilingual fields use { en: "...", zh: "..." }. Fields that are
   plain strings (ids, emojis, phone numbers, names, urls) are not
   translated.
   ============================================================ */

const SITE = {
  name: { en: "UCAP EHS Pocket Guide", zh: "UCAP EHS 口袋指南" },
  tagline: { en: "Pocket Guide", zh: "口袋指南" },
  companyShort: "UCAP",
  reportingSystemName: "Incident Management System",
  reportingSystemUrl: "https://apps.powerapps.com/play/e/default-64e853b0-8f4d-40ab-88be-0063a2c05bfb/a/6b2664d1-ff01-4118-b325-c2f49d3f8903?tenantId=64e853b0-8f4d-40ab-88be-0063a2c05bfb&hint=f0a06895-02ad-4ea8-b927-6539fbe21123&source=sharebutton&sourcetime=1787664433224",
  sdsSystemUrl: "./sds/IPA_SDS.pdf", // Site uses only one chemical (Isopropyl Alcohol)
  procedureSystemUrl: "https://apps.powerapps.com/play/e/default-64e853b0-8f4d-40ab-88be-0063a2c05bfb/a/feed388a-b019-4eb6-83fc-cb881cde347f?tenantId=64e853b0-8f4d-40ab-88be-0063a2c05bfb&source=sharebutton&sourcetime=1787664583349",
  lastUpdated: "2026-08-25"
};

/* ---------- EMERGENCY CONTACTS ----------
   Grouped list shown on the Emergency Contacts screen.
   Each group: { group, items: [{ label, phone, emoji }] }
-------------------------------------- */
const CONTACTS = [
  {
    group: { en: "Emergency Services", zh: "紧急服务" },
    items: [
      { label: { en: "Ambulance & Fire", zh: "救护车与消防" }, phone: "995", emoji: "🚑" },
      { label: { en: "Police", zh: "警察" }, phone: "999", emoji: "🚓" },
      { label: { en: "Fire Command Centre", zh: "消防指挥中心" }, phone: "6250 9012", emoji: "🔥" }
    ]
  },
  {
    group: { en: "Site Contacts", zh: "现场联系人" },
    items: [
      { label: { en: "Management — Vincent Lim", zh: "管理层 — Vincent Lim" }, phone: "9623 8918", emoji: "👔" },
      { label: { en: "Management — TS Sum", zh: "管理层 — TS Sum" }, phone: "8112 3798", emoji: "👔" },
      { label: { en: "SIC — Chiang Sun Chen", zh: "现场主管 (SIC) — Chiang Sun Chen" }, phone: "9852 8011", emoji: "🧑‍💼" },
      { label: { en: "SIC — Ee Jern Liang", zh: "现场主管 (SIC) — Ee Jern Liang" }, phone: "8137 2836", emoji: "🧑‍💼" },
      { label: { en: "EHS — Toh Ee Meng", zh: "环境健康安全部 (EHS) — Toh Ee Meng" }, phone: "9678 5585", emoji: "🧑‍⚕️" },
      { label: { en: "Facility — Wu Wenjian", zh: "设施部 — Wu Wenjian" }, phone: "8822 1930", emoji: "🏭" },
      { label: { en: "IT — Robin Johan", zh: "IT — Robin Johan" }, phone: "9125 9883", emoji: "💻" }
    ]
  }
];

/* ---------- HOME CATEGORIES ---------- */
const CATEGORIES = [
  { id: "emergency",   emoji: "🔴", label: { en: "Emergency", zh: "紧急情况" } },
  { id: "chemical",    emoji: "🧪", label: { en: "Chemical & Spill", zh: "化学品与泄漏" } },
  { id: "ppe",         emoji: "🥽", label: { en: "PPE", zh: "个人防护装备" } },
  { id: "fire",        emoji: "🔥", label: { en: "Fire Safety", zh: "消防安全" } },
  { id: "height",      emoji: "🪜", label: { en: "Working at Height", zh: "高空作业" } },
  { id: "barricade",   emoji: "🚧", label: { en: "Barricade & Restricted Area", zh: "围栏与限制区域" } },
  { id: "material",    emoji: "🚜", label: { en: "Forklift / Material Movement", zh: "叉车/物料搬运" } },
  { id: "waste",       emoji: "♻️", label: { en: "Waste Disposal", zh: "废物处理" } },
  { id: "electrical",  emoji: "⚡", label: { en: "Electrical Safety", zh: "电气安全" } },
  { id: "contractor",  emoji: "👷", label: { en: "Contractor Work", zh: "承包商作业" } },
  { id: "injury",      emoji: "🩹", label: { en: "Injury / First Aid", zh: "受伤/急救" } },
  { id: "environment", emoji: "🌱", label: { en: "Environmental & Sustainability", zh: "环境与可持续发展" } },
  { id: "siterules", emoji: "🚭", label: { en: "Site Rules", zh: "场地规定" } }
];

/* ---------- TOPIC GUIDES ----------
   Each topic: id, category, emoji, title, badge (label shown top),
   steps: [{title, text}], danger (optional red box),
   note (optional green box), links: [{emoji,label,action}]
   action can be: "sds" | "contacts" | "report" | "procedure" | "custom:<url>"
   title/badge/steps[].title/steps[].text/danger/note/links[].label
   are bilingual { en, zh } objects.
-------------------------------------- */
const TOPICS = [
  // ===== EMERGENCY =====
  {
    id: "fire-alarm", category: "emergency", emoji: "🔥",
    badge: { en: "Emergency", zh: "紧急情况" },
    title: { en: "Fire Alarm", zh: "火警警报" },
    steps: [
      { title: { en: "STOP", zh: "停止" }, text: { en: "Stop what you are doing immediately. Do not collect belongings.", zh: "立即停止手头工作，不要收拾个人物品。" } },
      { title: { en: "MOVE", zh: "前往" }, text: { en: "Walk (do not run) to the nearest fire exit and assembly point.", zh: "步行（不要奔跑）前往最近的消防出口和集合点。" } },
      { title: { en: "ASSEMBLE", zh: "集合" }, text: { en: "Report to your area's designated assembly point for headcount.", zh: "前往所属区域指定的集合点进行点名。" } },
      { title: { en: "WAIT", zh: "等待" }, text: { en: "Do not re-enter the building until told it is safe by EHS/Fire Warden.", zh: "在EHS/消防安全员确认安全之前，不要重新进入建筑物。" } }
    ],
    danger: { en: "If you see fire or smoke and it is safe to raise the alarm, activate the nearest fire alarm call point and shout to alert others.", zh: "如果看到火情或烟雾，且在安全的情况下，请启动最近的火警报警点并大声提醒他人。" },
    links: [
      { emoji: "📞", label: { en: "Emergency Contacts", zh: "紧急联系方式" }, action: "contacts" },
      { emoji: "📍", label: { en: "Assembly Points", zh: "集合点" }, action: "procedure" },
      { emoji: "📋", label: { en: "Full Emergency Procedure", zh: "完整应急程序" }, action: "procedure" }
    ]
  },
  {
    id: "injury-emergency", category: "emergency", emoji: "🩹",
    badge: { en: "Emergency", zh: "紧急情况" },
    title: { en: "Injury / Medical Emergency", zh: "受伤/医疗紧急情况" },
    steps: [
      { title: { en: "STOP", zh: "停止" }, text: { en: "Stop work. Do not move a seriously injured person unless in immediate danger.", zh: "停止工作。除非有直接危险，否则不要移动重伤者。" } },
      { title: { en: "CALL", zh: "呼叫" }, text: { en: "Call the site emergency number or shout for the nearest first aider immediately.", zh: "立即拨打现场紧急电话或呼喊寻找最近的急救员。" } },
      { title: { en: "PROTECT", zh: "保护" }, text: { en: "Keep the area clear. Do not remove PPE from the injured person unless necessary.", zh: "保持该区域畅通。除非必要，不要为伤者摘除个人防护装备。" } },
      { title: { en: "SUPPORT", zh: "陪伴" }, text: { en: "Stay with the person until help arrives. Follow first aider / paramedic instructions.", zh: "在救援到达前留在伤者身边。遵循急救员/医护人员的指示。" } }
    ],
    danger: { en: "For life-threatening emergencies, call the site emergency number first before anything else.", zh: "如遇危及生命的紧急情况，请首先拨打现场紧急电话。" },
    links: [
      { emoji: "📞", label: { en: "Emergency Contacts", zh: "紧急联系方式" }, action: "contacts" },
      { emoji: "🩹", label: { en: "First Aider Locations", zh: "急救员位置" }, action: "procedure" },
      { emoji: "📝", label: { en: "Report Incident", zh: "报告事故" }, action: "report" }
    ]
  },
  {
    id: "unusual-smell-smoke", category: "emergency", emoji: "💨",
    badge: { en: "Emergency", zh: "紧急情况" },
    title: { en: "Unusual Smell / Smoke", zh: "异常气味/烟雾" },
    steps: [
      { title: { en: "STOP", zh: "停止" }, text: { en: "Stop work in the affected area.", zh: "停止在受影响区域的工作。" } },
      { title: { en: "ALERT", zh: "提醒" }, text: { en: "Warn others nearby. Do not investigate the source yourself.", zh: "提醒附近的人员。不要自行调查来源。" } },
      { title: { en: "REPORT", zh: "报告" }, text: { en: "Contact EHS or Security immediately with the location and description.", zh: "立即联系EHS或保安，说明地点和情况描述。" } },
      { title: { en: "EVACUATE", zh: "疏散" }, text: { en: "If instructed, or if you feel unwell, evacuate to the assembly point.", zh: "如被要求，或感到身体不适，请撤离至集合点。" } }
    ],
    danger: { en: "If the smell is strong, causes dizziness/breathing difficulty, or smoke is visible, evacuate the area immediately and activate the fire alarm.", zh: "如果气味强烈、引起头晕/呼吸困难，或看到烟雾，请立即撤离该区域并启动火警警报。" },
    links: [
      { emoji: "📞", label: { en: "Emergency Contacts", zh: "紧急联系方式" }, action: "contacts" },
      { emoji: "📝", label: { en: "Report Incident", zh: "报告事故" }, action: "report" }
    ]
  },

  // ===== CHEMICAL =====
  {
    id: "chemical-spill", category: "chemical", emoji: "🧪",
    badge: { en: "Chemical & Spill", zh: "化学品与泄漏" },
    title: { en: "Chemical Spill", zh: "化学品泄漏" },
    steps: [
      { title: { en: "STOP", zh: "停止" }, text: { en: "Do not touch or walk through the spill.", zh: "不要触碰或踏入泄漏区域。" } },
      { title: { en: "CHECK", zh: "检查" }, text: { en: "What chemical is involved? Check the label/SDS if safe to do so.", zh: "确认涉及何种化学品？在安全的情况下查看标签/安全数据表(SDS)。" } },
      { title: { en: "PROTECT", zh: "防护" }, text: { en: "Keep others away. Use appropriate PPE.", zh: "让他人远离该区域。使用适当的个人防护装备。" } },
      { title: { en: "RESPOND", zh: "处理" }, text: { en: "Only clean the spill if you are trained, equipped and it is safe to do so.", zh: "只有在受过培训、配备齐全且安全的情况下才可清理泄漏物。" } }
    ],
    danger: { en: "Large / unknown / dangerous spill: evacuate the immediate area and activate the site's emergency response process.", zh: "大量/不明/危险泄漏：立即撤离周边区域并启动现场应急响应程序。" },
    links: [
      { emoji: "📄", label: { en: "SDS", zh: "安全数据表(SDS)" }, action: "sds" },
      { emoji: "📞", label: { en: "Emergency Contacts", zh: "紧急联系方式" }, action: "contacts" },
      { emoji: "📍", label: { en: "Nearest Spill Kit", zh: "最近的泄漏应急包" }, action: "procedure" },
      { emoji: "📋", label: { en: "Company Procedure", zh: "公司程序" }, action: "procedure" }
    ]
  },
  {
    id: "sds-lookup", category: "chemical", emoji: "📄",
    badge: { en: "Chemical", zh: "化学品" },
    title: { en: "Finding an SDS", zh: "查找安全数据表(SDS)" },
    steps: [
      { title: { en: "IDENTIFY", zh: "确认" }, text: { en: "Note the exact product name and manufacturer from the container label.", zh: "从容器标签上记录准确的产品名称和制造商。" } },
      { title: { en: "SEARCH", zh: "查找" }, text: { en: "Look up the product in the SDS system using the product name.", zh: "使用产品名称在SDS系统中查询该产品。" } },
      { title: { en: "CHECK DATE", zh: "核对日期" }, text: { en: "Confirm the SDS is the current version (check revision date).", zh: "确认该SDS为最新版本（查看修订日期）。" } },
      { title: { en: "ASK", zh: "询问" }, text: { en: "If not found, do not use the chemical — contact EHS before proceeding.", zh: "如果找不到，请勿使用该化学品——在继续前联系EHS。" } }
    ],
    links: [
      { emoji: "📄", label: { en: "Open SDS System", zh: "打开SDS系统" }, action: "sds" },
      { emoji: "📞", label: { en: "Contact EHS", zh: "联系EHS" }, action: "contacts" }
    ]
  },
  {
    id: "chemical-transfer", category: "chemical", emoji: "🧴",
    badge: { en: "Chemical", zh: "化学品" },
    title: { en: "Transferring / Decanting Chemicals", zh: "化学品转移/分装" },
    steps: [
      { title: { en: "CHECK", zh: "检查" }, text: { en: "Confirm the chemical is approved and you have the current SDS.", zh: "确认该化学品已获批准，并已获取最新的SDS。" } },
      { title: { en: "PPE", zh: "防护装备" }, text: { en: "Wear the PPE specified in the SDS/RA before transferring.", zh: "转移前穿戴SDS/风险评估(RA)中规定的个人防护装备。" } },
      { title: { en: "LABEL", zh: "贴标签" }, text: { en: "Label the receiving container immediately — product name, hazard, date.", zh: "立即为接收容器贴上标签——产品名称、危害信息、日期。" } },
      { title: { en: "CONTAIN", zh: "防泄漏" }, text: { en: "Transfer over secondary containment where required. Clean up drips immediately.", zh: "如有要求，请在二次防泄漏装置上进行转移。立即清理滴漏。" } }
    ],
    danger: { en: "Never transfer a chemical into an unlabelled or food/drink container.", zh: "切勿将化学品转移至无标签容器或食品/饮料容器中。" },
    links: [
      { emoji: "📄", label: { en: "SDS", zh: "安全数据表(SDS)" }, action: "sds" },
      { emoji: "📋", label: { en: "Company Procedure", zh: "公司程序" }, action: "procedure" }
    ]
  },
  {
    id: "unknown-container", category: "chemical", emoji: "❓",
    badge: { en: "Chemical", zh: "化学品" },
    title: { en: "Unknown / Unlabelled Container", zh: "不明/无标签容器" },
    steps: [
      { title: { en: "DO NOT USE", zh: "请勿使用" }, text: { en: "Do not open, smell, taste or use the contents.", zh: "不要打开、闻、品尝或使用容器内物质。" } },
      { title: { en: "DO NOT MOVE", zh: "请勿移动" }, text: { en: "Leave it where it is unless it poses an immediate risk.", zh: "除非存在直接风险，否则将其留在原地。" } },
      { title: { en: "ISOLATE", zh: "隔离" }, text: { en: "Keep others away from the container.", zh: "让他人远离该容器。" } },
      { title: { en: "REPORT", zh: "报告" }, text: { en: "Notify EHS immediately for identification and safe disposal.", zh: "立即通知EHS进行鉴定和安全处置。" } }
    ],
    links: [
      { emoji: "📞", label: { en: "Contact EHS", zh: "联系EHS" }, action: "contacts" },
      { emoji: "📝", label: { en: "Report Incident", zh: "报告事故" }, action: "report" }
    ]
  },

  // ===== PPE =====
  {
    id: "ppe-eye", category: "ppe", emoji: "🥽",
    badge: { en: "PPE", zh: "个人防护装备" },
    title: { en: "Eye Protection", zh: "眼部防护" },
    steps: [
      { title: { en: "CHECK", zh: "检查" }, text: { en: "Inspect lenses for scratches, cracks or fogging before use.", zh: "使用前检查镜片是否有划痕、裂纹或起雾。" } },
      { title: { en: "SELECT", zh: "选择" }, text: { en: "Use the eye protection specified for your task (safety glasses vs goggles vs face shield).", zh: "使用适合任务要求的眼部防护装备（安全眼镜、护目镜或面罩）。" } },
      { title: { en: "WEAR", zh: "佩戴" }, text: { en: "Fit snugly with no gaps. Wear over prescription glasses only if rated for it.", zh: "佩戴时应贴合无缝隙。只有经认证可套戴于处方眼镜外的产品才能这样使用。" } },
      { title: { en: "REPLACE", zh: "更换" }, text: { en: "Report damaged or scratched eyewear for replacement — do not keep using it.", zh: "如护目装备损坏或有划痕，请报告更换——不要继续使用。" } }
    ],
    links: [
      { emoji: "📋", label: { en: "Task-Based PPE Guide", zh: "任务防护装备指南" }, action: "procedure" },
      { emoji: "📞", label: { en: "Contact EHS", zh: "联系EHS" }, action: "contacts" }
    ]
  },
  {
    id: "ppe-hand", category: "ppe", emoji: "🧤",
    badge: { en: "PPE", zh: "个人防护装备" },
    title: { en: "Hand Protection", zh: "手部防护" },
    steps: [
      { title: { en: "CHECK", zh: "检查" }, text: { en: "Confirm the glove type matches the chemical/task (check SDS glove recommendation).", zh: "确认手套类型符合化学品/任务要求（查看SDS中的手套建议）。" } },
      { title: { en: "INSPECT", zh: "检验" }, text: { en: "Check gloves for holes, tears or degradation before each use.", zh: "每次使用前检查手套是否有破洞、撕裂或老化。" } },
      { title: { en: "WEAR", zh: "佩戴" }, text: { en: "Ensure a proper fit — too loose reduces dexterity and protection.", zh: "确保手套合身——过松会降低灵活性和防护效果。" } },
      { title: { en: "DISPOSE", zh: "丢弃" }, text: { en: "Remove and dispose of single-use gloves correctly; do not reuse contaminated gloves.", zh: "正确摘除并丢弃一次性手套；不要重复使用受污染的手套。" } }
    ],
    links: [
      { emoji: "📄", label: { en: "SDS", zh: "安全数据表(SDS)" }, action: "sds" },
      { emoji: "📋", label: { en: "Task-Based PPE Guide", zh: "任务防护装备指南" }, action: "procedure" }
    ]
  },
  {
    id: "ppe-foot", category: "ppe", emoji: "🥾",
    badge: { en: "PPE", zh: "个人防护装备" },
    title: { en: "Foot Protection", zh: "足部防护" },
    steps: [
      { title: { en: "CHECK", zh: "检查" }, text: { en: "Safety footwear must be worn in all designated PPE zones.", zh: "在所有指定的PPE区域必须穿戴安全鞋。" } },
      { title: { en: "INSPECT", zh: "检验" }, text: { en: "Check for worn soles, exposed steel/composite cap, or damage.", zh: "检查鞋底磨损、钢头/复合头外露或其他损坏情况。" } },
      { title: { en: "SELECT", zh: "选择" }, text: { en: "Use chemical/electrical-rated footwear if required for your task.", zh: "如任务需要，请使用防化学/防电击等级的安全鞋。" } },
      { title: { en: "REPLACE", zh: "更换" }, text: { en: "Report damaged safety footwear for replacement.", zh: "如安全鞋损坏，请报告更换。" } }
    ],
    links: [ { emoji: "📋", label: { en: "PPE Zones Map", zh: "PPE区域地图" }, action: "procedure" } ]
  },
  {
    id: "ppe-hearing", category: "ppe", emoji: "🎧",
    badge: { en: "PPE", zh: "个人防护装备" },
    title: { en: "Hearing Protection", zh: "听力防护" },
    steps: [
      { title: { en: "CHECK", zh: "检查" }, text: { en: "Hearing protection is required in marked high-noise zones.", zh: "在标记的高噪音区域必须佩戴听力防护装备。" } },
      { title: { en: "SELECT", zh: "选择" }, text: { en: "Use earplugs or earmuffs as specified for the area/task.", zh: "根据区域/任务要求使用耳塞或耳罩。" } },
      { title: { en: "FIT", zh: "佩戴" }, text: { en: "Insert earplugs correctly (roll, insert, hold) for a proper seal.", zh: "正确插入耳塞（搓卷、插入、按住）以确保密封。" } },
      { title: { en: "WEAR FULL TIME", zh: "全程佩戴" }, text: { en: "Keep protection on for the entire time you are in the noise zone.", zh: "在噪音区域内应全程佩戴防护装备。" } }
    ],
    links: [ { emoji: "📋", label: { en: "Noise Zone Map", zh: "噪音区域地图" }, action: "procedure" } ]
  },

  // ===== FIRE =====
  {
    id: "fire-extinguisher", category: "fire", emoji: "🧯",
    badge: { en: "Fire Safety", zh: "消防安全" },
    title: { en: "Using a Fire Extinguisher", zh: "使用灭火器" },
    steps: [
      { title: { en: "ASSESS", zh: "评估" }, text: { en: "Only attempt if the fire is small, contained, and you are trained.", zh: "只有在火势小、可控且您受过培训的情况下才可尝试灭火。" } },
      { title: { en: "ALERT", zh: "警报" }, text: { en: "Raise the alarm first and ensure others are evacuating.", zh: "先启动警报，确保他人正在疏散。" } },
      { title: { en: "SELECT", zh: "选择" }, text: { en: "Confirm the extinguisher type matches the fire (e.g. do not use water on electrical/oil fires).", zh: "确认灭火器类型与火情匹配（例如不要用水扑灭电气/油类火灾）。" } },
      { title: { en: "RETREAT", zh: "撤离" }, text: { en: "If the fire grows or you're unsure, leave immediately and close doors behind you.", zh: "如果火势扩大或您不确定，请立即离开并随手关门。" } }
    ],
    danger: { en: "Never fight a fire that is spreading, filling the room with smoke, or blocking your exit route. Evacuate instead.", zh: "切勿扑救正在蔓延、导致房间充满烟雾或阻挡逃生路线的火灾，应立即撤离。" },
    links: [
      { emoji: "📞", label: { en: "Emergency Contacts", zh: "紧急联系方式" }, action: "contacts" },
      { emoji: "📋", label: { en: "Fire Procedure", zh: "消防程序" }, action: "procedure" }
    ]
  },
  {
    id: "hot-work", category: "fire", emoji: "🔧",
    badge: { en: "Fire Safety", zh: "消防安全" },
    title: { en: "Hot Work (Welding / Cutting / Grinding)", zh: "动火作业（焊接/切割/打磨）" },
    steps: [
      { title: { en: "PERMIT", zh: "许可证" }, text: { en: "Obtain a Hot Work Permit before starting — no permit, no work.", zh: "开始前取得动火许可证——无许可证不得作业。" } },
      { title: { en: "CLEAR", zh: "清场" }, text: { en: "Remove combustible materials from the area; cover what can't be moved.", zh: "清除该区域的可燃物；无法移走的物品应予以覆盖。" } },
      { title: { en: "WATCH", zh: "监视" }, text: { en: "Post a fire watch with an extinguisher during and after work.", zh: "在作业期间及作业后安排配备灭火器的监火人员。" } },
      { title: { en: "MONITOR", zh: "复查" }, text: { en: "Check the area again 30–60 minutes after work finishes for smouldering material.", zh: "作业结束后30-60分钟再次检查该区域是否有阴燃物。" } }
    ],
    links: [
      { emoji: "📋", label: { en: "Hot Work Permit", zh: "动火许可证" }, action: "procedure" },
      { emoji: "📞", label: { en: "Contact EHS", zh: "联系EHS" }, action: "contacts" }
    ]
  },

  // ===== WORKING AT HEIGHT =====
  {
    id: "ladder-use", category: "height", emoji: "🪜",
    badge: { en: "Working at Height", zh: "高空作业" },
    title: { en: "Using a Ladder", zh: "使用梯子" },
    steps: [
      { title: { en: "INSPECT", zh: "检查" }, text: { en: "Check the ladder for damage before use — do not use a damaged ladder.", zh: "使用前检查梯子是否损坏——不要使用受损的梯子。" } },
      { title: { en: "POSITION", zh: "摆放" }, text: { en: "Set on firm, level ground at the correct angle (1:4 rule). Secure or foot it.", zh: "将梯子放置在坚实、平坦的地面上，并保持正确角度（1:4法则），固定或有人扶稳。" } },
      { title: { en: "3 POINTS", zh: "三点支撑" }, text: { en: "Maintain 3 points of contact at all times. Do not overreach.", zh: "始终保持三点支撑。不要过度伸展身体。" } },
      { title: { en: "LIMIT", zh: "限制" }, text: { en: "Do not stand on the top two rungs. Do not carry heavy items while climbing.", zh: "不要站在最上面两级踏板上。攀爬时不要携带重物。" } }
    ],
    danger: { en: "For work above 2 metres, a ladder may not be the appropriate access method — see Work at Height guidance.", zh: "对于2米以上的高空作业，梯子可能不是合适的登高方式——请参阅高空作业指南。" },
    links: [ { emoji: "📋", label: { en: "Full Procedure", zh: "完整程序" }, action: "procedure" } ]
  },
  {
    id: "work-above-2m", category: "height", emoji: "🏗️",
    badge: { en: "Working at Height", zh: "高空作业" },
    title: { en: "Working Above 2 Metres", zh: "2米以上高空作业" },
    steps: [
      { title: { en: "AVOID", zh: "避免" }, text: { en: "First consider whether the work can be done from ground level instead.", zh: "首先考虑该项工作是否可以在地面完成。" } },
      { title: { en: "PLAN", zh: "计划" }, text: { en: "Select the right equipment (scaffold, MEWP, platform) — a ladder is not for extended work.", zh: "选择合适的设备（脚手架、高空作业平台、平台）——梯子不适用于长时间作业。" } },
      { title: { en: "PROTECT", zh: "防护" }, text: { en: "Use fall protection (guardrails, harness + anchor point) as required by the RA.", zh: "根据风险评估(RA)要求使用坠落防护装备（护栏、安全带+锚固点）。" } },
      { title: { en: "PERMIT", zh: "许可证" }, text: { en: "Confirm whether a Working at Height Permit is required before starting.", zh: "开始前确认是否需要高空作业许可证。" } }
    ],
    danger: { en: "Do not improvise access equipment (e.g. stacked pallets, chairs). Stop and get proper equipment.", zh: "不要使用临时拼凑的登高设备（如堆叠的栈板、椅子）。请停止并使用正规设备。" },
    links: [
      { emoji: "📋", label: { en: "Working at Height Permit", zh: "高空作业许可证" }, action: "procedure" },
      { emoji: "📞", label: { en: "Contact EHS", zh: "联系EHS" }, action: "contacts" }
    ]
  },

  // ===== BARRICADE / RESTRICTED AREA =====
  {
    id: "barricade-area", category: "barricade", emoji: "🚧",
    badge: { en: "Barricade & Restricted Area", zh: "围栏与限制区域" },
    title: { en: "Barricading a Work Area", zh: "设置作业区域围栏" },
    steps: [
      { title: { en: "IDENTIFY", zh: "确认" }, text: { en: "Determine the hazard and the area that needs to be kept clear.", zh: "确定危害及需要保持畅通的区域。" } },
      { title: { en: "BARRICADE", zh: "围栏" }, text: { en: "Use approved barricade tape/stands with correct signage — do not use makeshift barriers.", zh: "使用经批准的围栏带/支架及正确的标识——不要使用临时拼凑的屏障。" } },
      { title: { en: "SIGNAGE", zh: "标识" }, text: { en: "Post signage explaining the hazard and who to contact.", zh: "张贴标识说明危害情况及联系人。" } },
      { title: { en: "REMOVE", zh: "拆除" }, text: { en: "Remove the barricade promptly once the hazard/work is complete.", zh: "危害排除/作业完成后应及时拆除围栏。" } }
    ],
    links: [ { emoji: "📋", label: { en: "Barricading Standard", zh: "围栏标准" }, action: "procedure" } ]
  },
  {
    id: "restricted-entry", category: "barricade", emoji: "⛔",
    badge: { en: "Barricade & Restricted Area", zh: "围栏与限制区域" },
    title: { en: "Entering a Restricted Area", zh: "进入限制区域" },
    steps: [
      { title: { en: "CHECK AUTHORISATION", zh: "核实授权" }, text: { en: "Confirm you are authorised to enter — check signage for requirements.", zh: "确认您已获授权进入——查看标识了解要求。" } },
      { title: { en: "PPE", zh: "防护装备" }, text: { en: "Wear the PPE specified for the area.", zh: "穿戴该区域规定的个人防护装备。" } },
      { title: { en: "SIGN IN", zh: "登记" }, text: { en: "Follow the area's entry/log-in requirement if one applies.", zh: "如适用，请遵守该区域的进入/登记要求。" } },
      { title: { en: "FOLLOW ESCORT RULES", zh: "遵守陪同规定" }, text: { en: "If escort-only, do not enter without an authorised escort.", zh: "若该区域仅限陪同进入，未经授权陪同人员不得进入。" } }
    ],
    danger: { en: "Never cross barricade tape or enter a restricted/red-tagged area without explicit authorisation.", zh: "未经明确授权，切勿跨越围栏带或进入限制/红标区域。" },
    links: [ { emoji: "📞", label: { en: "Contact EHS", zh: "联系EHS" }, action: "contacts" } ]
  },

  // ===== MATERIAL MOVEMENT =====
  {
    id: "forklift-pedestrian", category: "material", emoji: "🚜",
    badge: { en: "Material Movement", zh: "物料搬运" },
    title: { en: "Forklift & Pedestrian Interaction", zh: "叉车与行人互动" },
    steps: [
      { title: { en: "EYE CONTACT", zh: "眼神交流" }, text: { en: "Make eye contact with the forklift operator before crossing its path.", zh: "在穿越叉车路径前，与叉车操作员进行眼神交流确认。" } },
      { title: { en: "WALKWAYS", zh: "行人通道" }, text: { en: "Use designated pedestrian walkways at all times.", zh: "始终使用指定的行人通道。" } },
      { title: { en: "STAY CLEAR", zh: "保持远离" }, text: { en: "Never walk under a raised load or between a forklift and a wall/rack.", zh: "切勿在举升的货物下方行走，或站在叉车与墙壁/货架之间。" } },
      { title: { en: "WAIT", zh: "等待" }, text: { en: "At blind corners/intersections, stop and wait — do not assume the operator sees you.", zh: "在视线盲区拐角/交叉口处停下等待——不要假设操作员已看到您。" } }
    ],
    links: [ { emoji: "📋", label: { en: "Traffic Management Plan", zh: "交通管理计划" }, action: "procedure" } ]
  },
  {
    id: "manual-lifting", category: "material", emoji: "📦",
    badge: { en: "Material Movement", zh: "物料搬运" },
    title: { en: "Manual Lifting / Moving Heavy Items", zh: "人工搬运/移动重物" },
    steps: [
      { title: { en: "ASSESS", zh: "评估" }, text: { en: "Check the weight and shape. If in doubt, get help or use equipment.", zh: "检查重量和形状。如有疑问，请寻求帮助或使用设备。" } },
      { title: { en: "PLAN PATH", zh: "规划路线" }, text: { en: "Clear the route of obstacles before you start lifting.", zh: "搬运前清除路线上的障碍物。" } },
      { title: { en: "LIFT", zh: "提举" }, text: { en: "Bend knees, keep back straight, hold the load close to your body.", zh: "弯曲膝盖，保持背部挺直，将重物贴近身体。" } },
      { title: { en: "TEAM LIFT", zh: "团队搬运" }, text: { en: "For heavy/awkward loads, use a trolley, lifting aid, or a team lift.", zh: "对于沉重/不规则的物品，请使用推车、辅助搬运工具或团队协作搬运。" } }
    ],
    links: [ { emoji: "📋", label: { en: "Manual Handling Guide", zh: "人工搬运指南" }, action: "procedure" } ]
  },

  // ===== WASTE =====
  {
    id: "general-waste", category: "waste", emoji: "🗑️",
    badge: { en: "Waste Disposal", zh: "废物处理" },
    title: { en: "General Waste", zh: "一般废物" },
    steps: [
      { title: { en: "CHECK", zh: "检查" }, text: { en: "Confirm the item is genuinely non-hazardous, non-recyclable waste.", zh: "确认该物品确实为非危险、不可回收的废物。" } },
      { title: { en: "BIN", zh: "投放" }, text: { en: "Place in the general waste bin — never mix with chemical or recyclable waste.", zh: "投入一般废物箱——切勿与化学废物或可回收废物混合。" } },
      { title: { en: "REPORT FULL BINS", zh: "报告满溢" }, text: { en: "Report overflowing bins to facilities/EHS rather than leaving waste on the floor.", zh: "如废物箱已满溢，请报告设施部/EHS，而不是将废物留在地面上。" } }
    ],
    links: [ { emoji: "📋", label: { en: "Waste Segregation Guide", zh: "废物分类指南" }, action: "procedure" } ]
  },
  {
    id: "recyclable-waste", category: "waste", emoji: "♻️",
    badge: { en: "Waste Disposal", zh: "废物处理" },
    title: { en: "Recyclable Waste", zh: "可回收废物" },
    steps: [
      { title: { en: "CHECK", zh: "检查" }, text: { en: "Confirm the material type against the recycling signage (paper, plastic, metal, etc.).", zh: "对照回收标识确认材质类型（纸张、塑料、金属等）。" } },
      { title: { en: "CLEAN", zh: "清洁" }, text: { en: "Ensure containers are empty and reasonably clean before recycling.", zh: "回收前确保容器已清空并保持基本清洁。" } },
      { title: { en: "SORT", zh: "分类" }, text: { en: "Place in the correctly labelled recycling stream — do not mix streams.", zh: "投入正确标示的回收类别——不要混合不同类别。" } }
    ],
    links: [ { emoji: "📋", label: { en: "Waste Segregation Guide", zh: "废物分类指南" }, action: "procedure" } ]
  },
  {
    id: "chemical-waste", category: "waste", emoji: "☣️",
    badge: { en: "Waste Disposal", zh: "废物处理" },
    title: { en: "Chemical / Hazardous Waste", zh: "化学/危险废物" },
    steps: [
      { title: { en: "IDENTIFY", zh: "确认" }, text: { en: "Confirm the exact chemical waste type using the SDS.", zh: "使用SDS确认化学废物的确切类型。" } },
      { title: { en: "CONTAIN", zh: "盛装" }, text: { en: "Use the correct labelled hazardous waste container — never mix chemical waste types.", zh: "使用正确标示的危险废物容器——切勿混合不同类型的化学废物。" } },
      { title: { en: "LABEL", zh: "标签" }, text: { en: "Label with contents, hazard class and date generated.", zh: "标注内容物、危害类别及产生日期。" } },
      { title: { en: "ROUTE", zh: "存放" }, text: { en: "Place in the designated hazardous waste storage area — never in general waste or drains.", zh: "存放于指定的危险废物存储区——切勿倒入一般废物或排水沟。" } }
    ],
    danger: { en: "Never pour chemical waste down a drain or into general/recyclable waste.", zh: "切勿将化学废物倒入排水沟或混入一般/可回收废物中。" },
    links: [
      { emoji: "📄", label: { en: "SDS", zh: "安全数据表(SDS)" }, action: "sds" },
      { emoji: "📋", label: { en: "Hazardous Waste Procedure", zh: "危险废物处理程序" }, action: "procedure" },
      { emoji: "📞", label: { en: "Contact EHS", zh: "联系EHS" }, action: "contacts" }
    ]
  },

  // ===== ELECTRICAL =====
  {
    id: "electrical-work", category: "electrical", emoji: "⚡",
    badge: { en: "Electrical Safety", zh: "电气安全" },
    title: { en: "Performing Electrical Work", zh: "进行电气作业" },
    steps: [
      { title: { en: "AUTHORISE", zh: "授权" }, text: { en: "Only authorised/qualified persons may perform electrical work.", zh: "仅限获授权/具备资质的人员进行电气作业。" } },
      { title: { en: "ISOLATE", zh: "隔离" }, text: { en: "Isolate and lock out the circuit before starting. Verify zero energy.", zh: "开始前隔离并锁定电路，确认零能量状态。" } },
      { title: { en: "PERMIT", zh: "许可证" }, text: { en: "Confirm whether a permit (LOTO / electrical work permit) is required.", zh: "确认是否需要许可证（LOTO/电气作业许可证）。" } },
      { title: { en: "TEST", zh: "测试" }, text: { en: "Test the circuit is de-energised with a rated tester before touching conductors.", zh: "在触碰导体前，使用额定测试仪确认电路已断电。" } }
    ],
    danger: { en: "If you are not authorised/trained for electrical work, do not attempt it — report the issue instead.", zh: "如果您未获授权/未接受电气作业培训，请勿尝试操作——应报告相关问题。" },
    links: [
      { emoji: "📋", label: { en: "LOTO Procedure", zh: "LOTO程序" }, action: "procedure" },
      { emoji: "📞", label: { en: "Contact EHS", zh: "联系EHS" }, action: "contacts" }
    ]
  },
  {
    id: "damaged-electrical", category: "electrical", emoji: "🔌",
    badge: { en: "Electrical Safety", zh: "电气安全" },
    title: { en: "Damaged Cord / Equipment", zh: "损坏的电线/设备" },
    steps: [
      { title: { en: "STOP USE", zh: "停止使用" }, text: { en: "Stop using the equipment immediately.", zh: "立即停止使用该设备。" } },
      { title: { en: "ISOLATE", zh: "断开电源" }, text: { en: "Unplug it if it is safe to do so. Do not touch damaged cords with wet hands.", zh: "如安全，请拔掉插头。切勿用湿手触碰损坏的电线。" } },
      { title: { en: "TAG OUT", zh: "停用标记" }, text: { en: "Tag it 'Do Not Use' and remove it from service.", zh: "贴上「禁止使用」标签并停止使用该设备。" } },
      { title: { en: "REPORT", zh: "报告" }, text: { en: "Report to facilities/EHS for inspection or repair.", zh: "报告给设施部/EHS进行检查或维修。" } }
    ],
    links: [ { emoji: "📞", label: { en: "Contact EHS", zh: "联系EHS" }, action: "contacts" } ]
  },

  // ===== CONTRACTOR =====
  {
    id: "before-contractor-work", category: "contractor", emoji: "👷",
    badge: { en: "Contractor Work", zh: "承包商作业" },
    title: { en: "Before Contractor Work Starts", zh: "承包商作业开始前" },
    steps: [
      { title: { en: "VERIFY", zh: "核实" }, text: { en: "Confirm the contractor is registered/inducted and has valid site access.", zh: "确认承包商已完成登记/入场培训，并拥有有效的现场通行权限。" } },
      { title: { en: "PERMIT", zh: "许可证" }, text: { en: "Confirm required permits (hot work, height, confined space, electrical) are in place.", zh: "确认已取得所需许可证（动火、高空、密闭空间、电气作业）。" } },
      { title: { en: "BRIEF", zh: "简报" }, text: { en: "Ensure the contractor has been briefed on site hazards relevant to their task.", zh: "确保承包商已就与其任务相关的现场危害接受简报。" } },
      { title: { en: "SUPERVISE", zh: "监督" }, text: { en: "Confirm a responsible person is assigned to oversee the work.", zh: "确认已指派责任人监督该项作业。" } }
    ],
    links: [
      { emoji: "📋", label: { en: "Contractor Management Procedure", zh: "承包商管理程序" }, action: "procedure" },
      { emoji: "📞", label: { en: "Contact EHS", zh: "联系EHS" }, action: "contacts" }
    ]
  },

  // ===== INJURY / FIRST AID =====
  {
    id: "minor-injury", category: "injury", emoji: "🩹",
    badge: { en: "Injury / First Aid", zh: "受伤/急救" },
    title: { en: "Minor Injury (Cut / Bruise)", zh: "轻微受伤（割伤/瘀伤）" },
    steps: [
      { title: { en: "STOP", zh: "停止" }, text: { en: "Stop work and move to a safe, clean area.", zh: "停止工作，前往安全、清洁的区域。" } },
      { title: { en: "TREAT", zh: "处理" }, text: { en: "Clean the wound and apply first aid from the nearest first aid kit.", zh: "清洁伤口，使用最近的急救箱进行急救处理。" } },
      { title: { en: "ESCALATE", zh: "升级处理" }, text: { en: "See a first aider if bleeding doesn't stop or you're unsure of severity.", zh: "如出血不止或不确定伤情严重程度，请寻求急救员帮助。" } },
      { title: { en: "REPORT", zh: "报告" }, text: { en: "Report the injury through the company reporting system, even if minor.", zh: "即使是轻微受伤，也应通过公司报告系统上报。" } }
    ],
    links: [
      { emoji: "🩹", label: { en: "First Aid Kit / First Aider Locations", zh: "急救箱/急救员位置" }, action: "procedure" },
      { emoji: "📝", label: { en: "Report Incident", zh: "报告事故" }, action: "report" }
    ]
  },
  {
    id: "chemical-exposure", category: "injury", emoji: "🚿",
    badge: { en: "Injury / First Aid", zh: "受伤/急救" },
    title: { en: "Chemical Exposure (Skin / Eyes)", zh: "化学品接触（皮肤/眼睛）" },
    steps: [
      { title: { en: "STOP", zh: "停止" }, text: { en: "Stop work immediately.", zh: "立即停止工作。" } },
      { title: { en: "FLUSH", zh: "冲洗" }, text: { en: "Go to the nearest eyewash/safety shower and flush the area for at least 15 minutes.", zh: "前往最近的洗眼器/紧急淋浴装置，冲洗该部位至少15分钟。" } },
      { title: { en: "REMOVE", zh: "脱除" }, text: { en: "Remove contaminated clothing/PPE while flushing, if safe to do so.", zh: "在冲洗的同时，如安全，请脱除受污染的衣物/个人防护装备。" } },
      { title: { en: "SEEK HELP", zh: "就医" }, text: { en: "Get first aid / medical attention. Bring the SDS with you if possible.", zh: "寻求急救/医疗救治。如可能，请携带SDS。" } }
    ],
    danger: { en: "For eye or significant skin exposure, go to the eyewash station immediately — do not delay to find an SDS first.", zh: "如眼睛或皮肤大面积接触化学品，请立即前往洗眼站——不要为寻找SDS而延误。" },
    links: [
      { emoji: "📍", label: { en: "Nearest Eyewash / Shower", zh: "最近的洗眼器/淋浴装置" }, action: "procedure" },
      { emoji: "📄", label: { en: "SDS", zh: "安全数据表(SDS)" }, action: "sds" },
      { emoji: "📝", label: { en: "Report Incident", zh: "报告事故" }, action: "report" }
    ]
  },

  // ===== ENVIRONMENT =====
  {
    id: "spill-to-drain", category: "environment", emoji: "🌊",
    badge: { en: "Environmental", zh: "环境" },
    title: { en: "Preventing Spills to Drains", zh: "防止泄漏物流入排水沟" },
    steps: [
      { title: { en: "IDENTIFY", zh: "识别" }, text: { en: "Know which drains on site connect to stormwater vs. treatment systems.", zh: "了解现场哪些排水沟通向雨水系统，哪些通向处理系统。" } },
      { title: { en: "CONTAIN", zh: "防护" }, text: { en: "Use drain covers/booms when working near drains with chemicals.", zh: "在排水沟附近使用化学品作业时，使用排水沟盖/围油栏。" } },
      { title: { en: "RESPOND", zh: "应对" }, text: { en: "If a spill reaches a drain, stop the source and contact EHS immediately.", zh: "如泄漏物进入排水沟，请立即切断源头并联系EHS。" } },
      { title: { en: "NEVER", zh: "严禁" }, text: { en: "Never intentionally discharge chemicals, oils or wastewater to a drain.", zh: "严禁故意将化学品、油类或废水排入排水沟。" } }
    ],
    danger: { en: "A spill entering a stormwater drain can be a reportable environmental incident. Contact EHS immediately.", zh: "泄漏物进入雨水排水沟可能构成需上报的环境事故。请立即联系EHS。" },
    links: [
      { emoji: "📞", label: { en: "Contact EHS", zh: "联系EHS" }, action: "contacts" },
      { emoji: "📝", label: { en: "Report Incident", zh: "报告事故" }, action: "report" }
    ]
  },
  {
    id: "energy-water-saving", category: "environment", emoji: "💡",
    badge: { en: "Sustainability", zh: "可持续发展" },
    title: { en: "Everyday Energy & Water Saving", zh: "日常节能节水" },
    steps: [
      { title: { en: "SWITCH OFF", zh: "关闭" }, text: { en: "Turn off lights, equipment and compressed air at end of shift/task.", zh: "班次/任务结束后关闭灯光、设备和压缩空气。" } },
      { title: { en: "REPORT LEAKS", zh: "报告泄漏" }, text: { en: "Report dripping taps, leaking pipes or air leaks — don't assume someone else has.", zh: "报告滴水的水龙头、漏水管道或漏气情况——不要以为别人已经报告过。" } },
      { title: { en: "SEGREGATE", zh: "分类" }, text: { en: "Sort waste correctly so recyclables don't end up in landfill.", zh: "正确分类废物，避免可回收物被填埋。" } }
    ],
    links: [ { emoji: "📞", label: { en: "Contact EHS", zh: "联系EHS" }, action: "contacts" } ]
  },

  // ===== SITE RULES =====
  {
    id: "smoking-policy", category: "siterules", emoji: "🚭",
    badge: { en: "Site Rules", zh: "场地规定" },
    title: { en: "Smoking & Vaping Policy", zh: "吸烟与电子烟政策" },
    steps: [
      { title: { en: "DESIGNATED AREAS ONLY", zh: "仅限指定区域" }, text: { en: "Smoking and vaping (including e-cigarettes) are only allowed at the designated smoking areas shown on the site map — never inside any building or work area.", zh: "吸烟和使用电子烟仅限于场地地图上标示的指定吸烟区——严禁在任何建筑物或工作区域内进行。" } },
      { title: { en: "STAY 5 METRES CLEAR", zh: "远离入口5米" }, text: { en: "Stay at least 5 metres away from any building entrance while smoking, and do not stand adjacent to entrances.", zh: "吸烟时须至少远离建筑物入口5米，不得在入口附近逗留。" } },
      { title: { en: "KEEP SMOKE OUT", zh: "防止烟雾进入建筑物" }, text: { en: "You're responsible for making sure smoke does not drift into UCAP buildings.", zh: "您有责任确保烟雾不会飘入UCAP建筑物内。" } }
    ],
    danger: { en: "Smoking within 5m of a building entrance is a Level 2 disciplinary offence (written warning, suspension or termination). Smoking anywhere else on company premises, or vaping in/out of company premises, is a Level 3 offence — grounds for immediate termination.", zh: "在建筑物入口5米范围内吸烟属于二级违规行为（书面警告、停职或解雇）。在公司范围内其他区域吸烟，或在公司内外使用电子烟，均属于三级违规行为——可导致立即解雇。" },
    links: [
      { emoji: "🗺️", label: { en: "Smoking Area Map", zh: "吸烟区地图" }, action: "custom:./docs/smoking-area-map.jpg" },
      { emoji: "📖", label: { en: "Code of Conduct Excerpt", zh: "行为准则节录" }, action: "custom:./docs/Smoking_Policy_and_Disciplinary_Action_Excerpt.pdf" },
      { emoji: "📞", label: { en: "Contact EHS", zh: "联系EHS" }, action: "contacts" }
    ]
  }
];

/* ---------- "I WANT TO..." DECISION GUIDES ----------
   Same shape as TOPICS but framed as an action a person wants to take,
   shown before they start rather than during an incident.
-------------------------------------------------------- */
const I_WANT_TO = [
  {
    id: "bring-new-chemical", emoji: "🧪",
    label: { en: "Bring in a new chemical", zh: "引入新化学品" },
    intro: { en: "Before purchasing or bringing the chemical onsite:", zh: "在采购或将化学品带入现场之前：" },
    checklist: [
      { en: "Check whether it is already approved", zh: "检查该化学品是否已获批准" },
      { en: "Obtain the latest SDS", zh: "获取最新的SDS" },
      { en: "Check storage requirements", zh: "检查存储要求" },
      { en: "Determine required PPE", zh: "确定所需的个人防护装备" },
      { en: "Confirm waste disposal method", zh: "确认废物处理方法" },
      { en: "Complete applicable EHS approval", zh: "完成相应的EHS审批" }
    ],
    note: { en: "Do not purchase or use the chemical first and seek approval afterward.", zh: "不要先采购或使用化学品，之后再申请批准。" },
    links: [
      { emoji: "📄", label: { en: "SDS System", zh: "SDS系统" }, action: "sds" },
      { emoji: "📞", label: { en: "Contact EHS", zh: "联系EHS" }, action: "contacts" }
    ]
  },
  {
    id: "use-ladder", emoji: "🪜",
    label: { en: "Use a ladder", zh: "使用梯子" },
    intro: { en: "Before using a ladder:", zh: "在使用梯子之前：" },
    checklist: [
      { en: "Confirm a ladder is the right equipment for the task (not extended/repetitive work)", zh: "确认梯子适合该项任务（不适用于长时间/重复性工作）" },
      { en: "Inspect the ladder for damage", zh: "检查梯子是否损坏" },
      { en: "Confirm firm, level ground for setup", zh: "确认摆放位置地面坚实平坦" },
      { en: "Check the task doesn't require reaching or working above shoulder height for long periods", zh: "检查任务是否不需要长时间伸展手臂或在肩部以上高度作业" },
      { en: "Have someone available to foot/steady the ladder if needed", zh: "如有需要，安排专人扶稳梯子" }
    ],
    links: [ { emoji: "📋", label: { en: "Working at Height Procedure", zh: "高空作业程序" }, action: "procedure" } ]
  },
  {
    id: "work-above-height-checklist", emoji: "🏗️",
    label: { en: "Work above 2 metres", zh: "2米以上高空作业" },
    intro: { en: "Before working above 2 metres:", zh: "在进行2米以上高空作业之前：" },
    checklist: [
      { en: "Confirm whether a Working at Height Permit is required", zh: "确认是否需要高空作业许可证" },
      { en: "Select proper access equipment (scaffold, MEWP, platform — not a ladder for extended work)", zh: "选择合适的登高设备（脚手架、高空作业平台——长时间作业不应使用梯子）" },
      { en: "Confirm fall protection is available and in good condition", zh: "确认坠落防护装备齐备且状态良好" },
      { en: "Check weather conditions if outdoors", zh: "如在户外作业，检查天气状况" },
      { en: "Confirm the area below is barricaded", zh: "确认下方区域已设置围栏" }
    ],
    links: [ { emoji: "📋", label: { en: "Working at Height Permit", zh: "高空作业许可证" }, action: "procedure" } ]
  },
  {
    id: "engage-contractor", emoji: "👷",
    label: { en: "Engage a contractor", zh: "聘用承包商" },
    intro: { en: "Before a contractor starts work onsite:", zh: "在承包商开始现场作业之前：" },
    checklist: [
      { en: "Confirm contractor registration/induction status", zh: "确认承包商已完成登记/入场培训" },
      { en: "Confirm required permits are identified and will be obtained", zh: "确认已识别所需许可证并将予以取得" },
      { en: "Confirm insurance/competency documentation is on file", zh: "确认保险/资质文件已存档" },
      { en: "Brief the contractor on relevant site hazards", zh: "向承包商简报相关现场危害" },
      { en: "Assign a responsible person to supervise the work", zh: "指派责任人监督该项作业" }
    ],
    links: [ { emoji: "📋", label: { en: "Contractor Management Procedure", zh: "承包商管理程序" }, action: "procedure" } ]
  },
  {
    id: "perform-hot-work", emoji: "🔧",
    label: { en: "Perform hot work", zh: "进行动火作业" },
    intro: { en: "Before welding, cutting or grinding:", zh: "在焊接、切割或打磨之前：" },
    checklist: [
      { en: "Obtain a Hot Work Permit", zh: "取得动火许可证" },
      { en: "Clear combustible materials from the area", zh: "清除该区域的可燃物" },
      { en: "Confirm a fire extinguisher and fire watch are in place", zh: "确认灭火器和监火人员已就位" },
      { en: "Check for gas/vapour hazards nearby", zh: "检查附近是否存在气体/蒸气危害" },
      { en: "Plan a post-work monitoring check (30–60 minutes after)", zh: "计划作业后的复查（30-60分钟后）" }
    ],
    links: [ { emoji: "📋", label: { en: "Hot Work Permit", zh: "动火许可证" }, action: "procedure" } ]
  },
  {
    id: "block-walkway", emoji: "🚧",
    label: { en: "Block a walkway", zh: "封闭通道" },
    intro: { en: "Before blocking or restricting a walkway:", zh: "在封闭或限制通道之前：" },
    checklist: [
      { en: "Confirm an alternative safe route is available", zh: "确认有替代安全通道可用" },
      { en: "Use approved barricade/signage — not improvised barriers", zh: "使用经批准的围栏/标识——不要使用临时拼凑的屏障" },
      { en: "Notify affected departments/areas in advance if possible", zh: "如可能，请提前通知受影响的部门/区域" },
      { en: "Set a plan to remove the barricade once work is complete", zh: "制定作业完成后拆除围栏的计划" }
    ],
    links: [ { emoji: "📋", label: { en: "Barricading Standard", zh: "围栏标准" }, action: "procedure" } ]
  },
  {
    id: "move-heavy-item", emoji: "📦",
    label: { en: "Move a heavy item", zh: "搬运重物" },
    intro: { en: "Before moving a heavy or awkward item:", zh: "在搬运重物或不规则物品之前：" },
    checklist: [
      { en: "Check the weight — use lifting equipment/trolley where possible", zh: "检查重量——尽可能使用搬运设备/推车" },
      { en: "Plan and clear the travel path", zh: "规划并清理搬运路线" },
      { en: "Get a second person for a team lift if needed", zh: "如有需要，请第二人协助团队搬运" },
      { en: "Confirm pedestrian routes stay clear during the move", zh: "确认搬运期间行人通道保持畅通" }
    ],
    links: [ { emoji: "📋", label: { en: "Manual Handling Guide", zh: "人工搬运指南" }, action: "procedure" } ]
  },
  {
    id: "dispose-chemical-waste", emoji: "☣️",
    label: { en: "Dispose of chemical waste", zh: "处理化学废物" },
    intro: { en: "Before disposing of chemical waste:", zh: "在处理化学废物之前：" },
    checklist: [
      { en: "Identify the exact waste type using the SDS", zh: "使用SDS确认废物的确切类型" },
      { en: "Use the correct labelled hazardous waste container", zh: "使用正确标示的危险废物容器" },
      { en: "Never mix different chemical waste types", zh: "切勿混合不同类型的化学废物" },
      { en: "Route to the designated hazardous waste storage area", zh: "运送至指定的危险废物存储区" },
      { en: "Never pour into drains or general waste", zh: "切勿倒入排水沟或一般废物" }
    ],
    links: [
      { emoji: "📄", label: { en: "SDS System", zh: "SDS系统" }, action: "sds" },
      { emoji: "📋", label: { en: "Hazardous Waste Procedure", zh: "危险废物处理程序" }, action: "procedure" }
    ]
  },
  {
    id: "introduce-new-equipment", emoji: "🛠️",
    label: { en: "Introduce new equipment", zh: "引入新设备" },
    intro: { en: "Before bringing new equipment into use:", zh: "在启用新设备之前：" },
    checklist: [
      { en: "Confirm the equipment has a risk assessment / safety review", zh: "确认该设备已完成风险评估/安全审查" },
      { en: "Confirm required guarding/safety features are in place", zh: "确认所需的防护装置/安全功能已到位" },
      { en: "Identify training needs for users", zh: "确定使用人员的培训需求" },
      { en: "Confirm maintenance and inspection requirements are defined", zh: "确认已明确维护和检查要求" },
      { en: "Complete applicable EHS approval before use", zh: "使用前完成相应的EHS审批" }
    ],
    links: [ { emoji: "📞", label: { en: "Contact EHS", zh: "联系EHS" }, action: "contacts" } ]
  },
  {
    id: "modify-equipment", emoji: "🔩",
    label: { en: "Modify equipment", zh: "改装设备" },
    intro: { en: "Before modifying existing equipment:", zh: "在改装现有设备之前：" },
    checklist: [
      { en: "Confirm the modification is approved through change management/EHS", zh: "确认该改装已通过变更管理/EHS审批" },
      { en: "Assess impact on existing guarding and safety features", zh: "评估对现有防护装置和安全功能的影响" },
      { en: "Update the risk assessment if the hazard profile changes", zh: "如危害情况发生变化，更新风险评估" },
      { en: "Update operating instructions and retrain users if needed", zh: "如有需要，更新操作说明并对使用人员重新培训" }
    ],
    danger: { en: "Never modify safety-critical equipment (guards, interlocks, relief devices) without formal approval.", zh: "未经正式批准，切勿改装安全关键设备（防护装置、联锁装置、泄压装置）。" },
    links: [ { emoji: "📞", label: { en: "Contact EHS", zh: "联系EHS" }, action: "contacts" } ]
  },
  {
    id: "perform-electrical-work-checklist", emoji: "⚡",
    label: { en: "Perform electrical work", zh: "进行电气作业" },
    intro: { en: "Before performing electrical work:", zh: "在进行电气作业之前：" },
    checklist: [
      { en: "Confirm you are authorised/qualified to perform the work", zh: "确认您已获授权/具备资质进行该项作业" },
      { en: "Confirm whether a permit (LOTO / electrical permit) is required", zh: "确认是否需要许可证（LOTO/电气许可证）" },
      { en: "Plan isolation and lockout of the circuit", zh: "规划电路的隔离与锁定" },
      { en: "Have a rated tester available to verify zero energy", zh: "准备额定测试仪以确认零能量状态" },
      { en: "Confirm PPE (insulated tools, rated gloves) is available", zh: "确认个人防护装备（绝缘工具、额定手套）齐备" }
    ],
    links: [ { emoji: "📋", label: { en: "LOTO Procedure", zh: "LOTO程序" }, action: "procedure" } ]
  },
  {
    id: "enter-restricted-area", emoji: "⛔",
    label: { en: "Enter a restricted area", zh: "进入限制区域" },
    intro: { en: "Before entering a restricted area:", zh: "在进入限制区域之前：" },
    checklist: [
      { en: "Confirm you are authorised to enter", zh: "确认您已获授权进入" },
      { en: "Check signage for specific entry requirements (PPE, escort, sign-in)", zh: "查看标识了解具体的进入要求（个人防护装备、陪同、登记）" },
      { en: "Confirm whether an escort is required", zh: "确认是否需要陪同人员" },
      { en: "Follow any log-in/log-out requirement for the area", zh: "遵守该区域的登记/签退要求" }
    ],
    links: [ { emoji: "📞", label: { en: "Contact EHS", zh: "联系EHS" }, action: "contacts" } ]
  }
];
