const TODAY = new Date()
const TODAY_KEY = TODAY.toISOString().slice(0, 10)
const REQUEST_TIMEOUT_MS = 9000
const TWO_WEEKS_AGO = new Date(TODAY.getTime() - 14 * 24 * 60 * 60 * 1000)
  .toISOString()
  .slice(0, 10)

const releaseRepos = [
  'vercel/next.js',
  'vitejs/vite',
  'facebook/react',
  'microsoft/typescript',
  'openai/openai-node',
  'langchain-ai/langchainjs',
  'ollama/ollama',
  'modelcontextprotocol/typescript-sdk',
  'anthropics/anthropic-sdk-typescript',
  'supabase/supabase',
  'prisma/prisma',
  'tailwindlabs/tailwindcss',
]

const companyFeeds = [
  ['GitHub Blog', 'https://github.blog/feed/'],
  ['Google Developers', 'https://developers.googleblog.com/en/rss/'],
  ['Microsoft DevBlogs', 'https://devblogs.microsoft.com/feed/'],
  ['AWS News Blog', 'https://aws.amazon.com/blogs/aws/feed/'],
  ['Meta Engineering', 'https://engineering.fb.com/feed/'],
  ['Netflix TechBlog', 'https://netflixtechblog.com/feed/'],
  ['Cloudflare Blog', 'https://blog.cloudflare.com/rss/'],
  ['Docker Blog', 'https://www.docker.com/blog/feed/'],
  ['Vercel Blog', 'https://vercel.com/rss'],
  ['Supabase Blog', 'https://supabase.com/blog/rss.xml'],
]

const opportunitySources = [
  {
    source: 'Remotive',
    url: 'https://remotive.com/api/remote-jobs?category=software-dev&limit=18',
  },
  {
    source: 'Arbeitnow',
    url: 'https://www.arbeitnow.com/api/job-board-api',
  },
]

const fallbackUpdates = [
  {
    id: 'fallback-release-next',
    title: 'Framework release streams are worth checking for developer workflow changes',
    summary:
      'Daily release tracking helps catch routing, build, server rendering, and developer-experience changes before they affect your projects.',
    url: 'https://github.com/vercel/next.js/releases',
    source: 'GitHub Releases',
    category: 'Feature Releases',
    impact: 'High',
    section: 'Important Announcements',
    whyMatters: 'Framework updates often change how student projects, production apps, and interviews are built.',
    publishedAt: TODAY_KEY,
    readTime: 3,
  },
  {
    id: 'fallback-ai-tools',
    title: 'AI coding products are shifting toward repo-aware agents and local model workflows',
    summary:
      'New tools increasingly combine codebase search, command execution, pull request review, and model routing into one workflow.',
    url: 'https://github.com/topics/ai-tools',
    source: 'GitHub Topics',
    category: 'AI & Agents',
    impact: 'High',
    section: 'Today in Tech',
    whyMatters: 'AI tooling is becoming a core productivity layer for developers and product teams.',
    publishedAt: TODAY_KEY,
    readTime: 4,
  },
  {
    id: 'fallback-npm-tools',
    title: 'npm package launches are a strong signal for new developer utilities',
    summary:
      'Fresh packages around CLIs, test runners, SDKs, schema tools, and UI utilities often show up before they hit larger news feeds.',
    url: 'https://www.npmjs.com/search?q=developer%20tools',
    source: 'npm Registry',
    category: 'Developer Ecosystem',
    impact: 'Medium',
    section: 'Trending',
    whyMatters: 'Early package trends can reveal useful tools before they become mainstream.',
    publishedAt: TODAY_KEY,
    readTime: 2,
  },
  {
    id: 'fallback-career',
    title: 'Remote software roles and student-friendly openings are worth checking daily',
    summary:
      'Internships, fresher roles, hackathons, and remote openings move quickly, so a focused daily check can help you apply early.',
    url: 'https://remotive.com/remote-jobs/software-dev',
    source: 'Career Feed',
    category: 'Career & Opportunities',
    impact: 'Medium',
    section: 'Career Opportunities',
    whyMatters: 'Applying early usually improves visibility for internships, graduate programs, and fresher hiring.',
    career: {
      company: 'Multiple companies',
      roleType: 'Remote / Internship / Fresher',
      eligibility: 'Students, freshers, and early-career developers',
      deadline: 'Varies by company',
      applyLabel: 'Apply',
    },
    publishedAt: TODAY_KEY,
    readTime: 3,
  },
]

const categoryRules = [
  [
    'AI & Agents',
    [
      'ai',
      'openai',
      'anthropic',
      'claude',
      'llm',
      'agent',
      'rag',
      'model',
      'ollama',
      'langchain',
      'copilot',
    ],
  ],
  [
    'Feature Releases',
    ['release', 'version', 'changelog', 'stable', 'beta', 'rc', 'sdk', 'framework', 'runtime'],
  ],
  [
    'Developer Ecosystem',
    ['cli', 'developer', 'tool', 'typescript', 'testing', 'debug', 'lint', 'build', 'api', 'sdk'],
  ],
  [
    'Career & Opportunities',
    [
      'internship',
      'intern',
      'fresher',
      'graduate',
      'off-campus',
      'off campus',
      'hiring',
      'job',
      'career',
      'remote',
      'hackathon',
      'student',
      'entry level',
      'junior',
    ],
  ],
  [
    'Company News',
    [
      'github',
      'google',
      'microsoft',
      'aws',
      'amazon',
      'meta',
      'netflix',
      'cloudflare',
      'docker',
      'vercel',
      'supabase',
      'company',
      'platform',
      'announces',
      'announcement',
    ],
  ],
  [
    'Product Launches',
    ['launch', 'launched', 'new app', 'product', 'saas', 'hardware', 'productivity'],
  ],
  [
    'Startup & Innovation',
    ['startup', 'funding', 'seed', 'series a', 'viral', 'innovation', 'emerging technology'],
  ],
  ['Security', ['security', 'vulnerability', 'cve', 'auth', 'privacy']],
]

const imageThemes = {
  'AI & Agents': ['#111827', '#8b5cf6', '#22d3ee', 'AI'],
  'Product Launches': ['#111827', '#2dd4bf', '#f59e0b', 'NEW'],
  'Company News': ['#162033', '#f59e0b', '#67e8f9', 'CO'],
  'Feature Releases': ['#10261f', '#18c7a1', '#f5b041', 'REL'],
  'Career & Opportunities': ['#121826', '#84cc16', '#38bdf8', 'JOB'],
  'Startup & Innovation': ['#161726', '#fb7185', '#facc15', 'ST'],
  'Developer Ecosystem': ['#111827', '#38bdf8', '#a7f3d0', 'DEV'],
  Security: ['#271417', '#fb7185', '#facc15', 'SEC'],
}

const sourceThemes = {
  'GitHub Blog': ['#0d1117', '#f0f6fc', '#58a6ff', 'GH'],
  'GitHub Releases': ['#0d1117', '#f0f6fc', '#58a6ff', 'GH'],
  'GitHub New Repos': ['#0d1117', '#f0f6fc', '#58a6ff', 'GH'],
  'Google Developers': ['#102a43', '#4285f4', '#fbbc04', 'G'],
  'Microsoft DevBlogs': ['#10233f', '#7fba00', '#00a4ef', 'MS'],
  'AWS News Blog': ['#161e2d', '#ff9900', '#8cc4ff', 'AWS'],
  'Meta Engineering': ['#101a33', '#1877f2', '#9ad4ff', 'M'],
  'Netflix TechBlog': ['#210f12', '#e50914', '#f5f5f1', 'N'],
  'Cloudflare Blog': ['#261405', '#f38020', '#faae40', 'CF'],
  'Docker Blog': ['#0b214a', '#2496ed', '#bde7ff', 'DO'],
  'Vercel Blog': ['#080808', '#ffffff', '#8a8f98', 'V'],
  'Supabase Blog': ['#0b1f19', '#3ecf8e', '#c8f6df', 'SB'],
  'DEV Community': ['#0a0a0a', '#ffffff', '#a3e635', 'DEV'],
  'Hacker News': ['#2c1700', '#ff6600', '#ffd8a8', 'HN'],
  'npm Registry': ['#2d1012', '#cb3837', '#f2d4d4', 'npm'],
}

function getCategory(text = '') {
  const lowerText = text.toLowerCase()
  return (
    categoryRules.find(([, keywords]) => keywords.some((word) => lowerText.includes(word)))?.[0] ??
    'Startup & Innovation'
  )
}

function getImpact({ score = 0, stars = 0, downloads = 0, isRelease = false, isCareer = false }) {
  if (isRelease || isCareer || score > 350 || stars > 2500 || downloads > 250000) return 'High'
  if (score > 100 || stars > 500 || downloads > 50000) return 'Medium'
  return 'Emerging'
}

function scoreUpdate(update) {
  const impactScore = { High: 42, Medium: 24, Emerging: 12 }[update.impact] || 10
  const categoryScore =
    {
      'AI & Agents': 15,
      'Career & Opportunities': 15,
      'Company News': 12,
      'Feature Releases': 12,
      'Product Launches': 11,
      'Developer Ecosystem': 9,
      'Startup & Innovation': 8,
    }[update.category] || 5
  const ageHours = Math.max(
    0,
    (Date.now() - new Date(update.publishedAt || TODAY).getTime()) / (60 * 60 * 1000),
  )
  const freshnessScore = Math.max(0, 20 - ageHours / 8)

  return Math.round(impactScore + categoryScore + freshnessScore)
}

function getSection(update) {
  if (update.category === 'Career & Opportunities') return 'Career Opportunities'
  if (update.impact === 'High' || update.category === 'Company News') return 'Important Announcements'
  if (update.category === 'Startup & Innovation' || update.category === 'Product Launches') {
    return 'Trending'
  }
  return 'Today in Tech'
}

function whyMattersFor({ category, title = '', source = '' }) {
  const text = `${title} ${source}`.toLowerCase()

  if (category === 'Career & Opportunities') {
    return 'Useful for students, freshers, and developers who want to apply before roles get crowded.'
  }

  if (category === 'AI & Agents') {
    return 'AI tools and agents can quickly change how developers build, learn, and automate work.'
  }

  if (category === 'Product Launches') {
    return 'New products can signal where user demand, startup ideas, and developer workflows are moving.'
  }

  if (category === 'Company News') {
    return 'Company announcements often point to platform changes, strategy shifts, and upcoming opportunities.'
  }

  if (category === 'Feature Releases' || /release|version|preview|stable/.test(text)) {
    return 'Feature releases can unlock new project ideas and affect the tools teams use every day.'
  }

  if (category === 'Developer Ecosystem') {
    return 'Developer ecosystem changes help you spot useful libraries, APIs, and skills to learn next.'
  }

  return 'This is an early signal worth tracking before it becomes mainstream.'
}

function readTimeFromText(text = '') {
  return Math.max(2, Math.min(7, Math.ceil(text.split(/\s+/).length / 45)))
}

function stripHtml(text = '') {
  return text
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

function shortText(text = '', fallback) {
  const clean = stripHtml(text)
  return clean ? `${clean.slice(0, 180)}${clean.length > 180 ? '...' : ''}` : fallback
}

function escapeSvgText(text = '') {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function compactTitle(title = '') {
  const words = title
    .replace(/[^\w\s./-]/g, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 5)

  return words.join(' ') || 'Tech update'
}

function humanizeName(name = '') {
  return name
    .replace(/^@/, '')
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function readableRepoName(repo = '') {
  const project = repo.split('/').pop() || repo
  return humanizeName(project)
}

function releaseTitle(repo, releaseName = '') {
  const project = readableRepoName(repo)
  const version = releaseName.match(/v?\d+(?:\.\d+){1,3}(?:[-\w.]*)?/i)?.[0]
  const versionText = version ? ` ${version}` : ''

  if (/openai|anthropic|langchain|ollama|modelcontextprotocol/i.test(repo)) {
    return `${project} ships an AI tooling update${versionText}`
  }

  if (/next|react|vite|typescript|tailwind/i.test(repo)) {
    return `${project} releases a developer workflow update${versionText}`
  }

  if (/supabase|prisma/i.test(repo)) {
    return `${project} releases a data platform update${versionText}`
  }

  return `${project} releases a new software update${versionText}`
}

function repoTitle(repo) {
  const name = humanizeName(repo.name)
  const description = (repo.description || '').toLowerCase()

  if (description.includes('agent') || description.includes('llm') || description.includes('ai')) {
    return `${name} is a new AI tool gaining developer attention`
  }

  if (description.includes('cli') || description.includes('terminal')) {
    return `${name} is a new command-line tool for developers`
  }

  if (description.includes('sdk') || description.includes('api')) {
    return `${name} is a new SDK or API tool for builders`
  }

  return `${name} is a new developer tool gaining traction`
}

function packageTitle(pkg) {
  const name = humanizeName(pkg.name)
  const text = `${pkg.name} ${pkg.description || ''} ${(pkg.keywords || []).join(' ')}`.toLowerCase()

  if (text.includes('ai') || text.includes('llm') || text.includes('agent')) {
    return `${name} is an AI-focused npm package to watch`
  }

  if (text.includes('cli')) {
    return `${name} is a command-line package for developer workflows`
  }

  if (text.includes('sdk') || text.includes('api')) {
    return `${name} is an SDK package for software teams`
  }

  return `${name} is a developer package trending on npm`
}

function isUsableImageUrl(url = '') {
  return /^https?:\/\//i.test(url)
}

function firstUsableImage(...urls) {
  return urls.flat().find(isUsableImageUrl)
}

function extractFirstImage(html = '') {
  return html.match(/<img[^>]+src=["']([^"']+)["']/i)?.[1]
}

function getCompanyMark(source = '') {
  return (
    sourceThemes[source]?.[3] ||
    source
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0])
      .join('')
      .toUpperCase() ||
    'TP'
  )
}

function buildImageUrl({ title, category, source }) {
  const [bg, primary, accent, mark] = sourceThemes[source] || [
    ...(imageThemes[category] || imageThemes['Startup & Innovation']).slice(0, 3),
    getCompanyMark(source),
  ]
  const headline = escapeSvgText(compactTitle(title))
  const sourceText = escapeSvgText(source)
  const categoryText = escapeSvgText(category)

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="960" height="540" viewBox="0 0 960 540">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${bg}"/>
          <stop offset="0.58" stop-color="#071017"/>
          <stop offset="1" stop-color="${primary}"/>
        </linearGradient>
        <linearGradient id="panel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#ffffff" stop-opacity="0.18"/>
          <stop offset="1" stop-color="#ffffff" stop-opacity="0.04"/>
        </linearGradient>
      </defs>
      <rect width="960" height="540" fill="url(#bg)"/>
      <circle cx="766" cy="110" r="134" fill="${accent}" opacity="0.2"/>
      <circle cx="170" cy="448" r="190" fill="${primary}" opacity="0.22"/>
      <path d="M96 378 C220 310 292 418 402 338 S588 262 720 318 S846 312 900 248" fill="none" stroke="${accent}" stroke-width="12" stroke-linecap="round" opacity="0.9"/>
      <g transform="translate(92 74)">
        <rect width="776" height="392" rx="34" fill="url(#panel)" stroke="#ffffff" stroke-opacity="0.18"/>
        <text x="42" y="72" fill="${accent}" font-family="Outfit, Arial, sans-serif" font-size="28" font-weight="800" letter-spacing="2">${categoryText}</text>
        <text x="42" y="184" fill="#f8fbfa" font-family="Outfit, Arial, sans-serif" font-size="56" font-weight="800">${headline}</text>
        <text x="42" y="248" fill="#b8c5d1" font-family="Outfit, Arial, sans-serif" font-size="28" font-weight="600">${sourceText}</text>
        <g transform="translate(584 92)">
          <rect width="130" height="130" rx="30" fill="${primary}"/>
          <text x="65" y="83" text-anchor="middle" fill="${bg}" font-family="Outfit, Arial, sans-serif" font-size="42" font-weight="900">${escapeSvgText(mark)}</text>
        </g>
        <g transform="translate(42 310)" opacity="0.92">
          <rect width="118" height="18" rx="9" fill="${accent}"/>
          <rect x="142" width="210" height="18" rx="9" fill="#ffffff" opacity="0.34"/>
          <rect x="376" width="94" height="18" rx="9" fill="#ffffff" opacity="0.22"/>
        </g>
      </g>
    </svg>
  `

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

function withImage(update) {
  return {
    ...update,
    imageUrl: firstUsableImage(update.imageUrl) || buildImageUrl(update),
  }
}

function normalizeHackerNews(hit) {
  const title = hit.title || hit.story_title
  const url = hit.url || hit.story_url || `https://news.ycombinator.com/item?id=${hit.objectID}`
  const category = getCategory(title)
  const update = {
    id: `hn-${hit.objectID}`,
    title,
    summary: shortText(
      hit.story_text,
      'A launch or product discussion with useful early adoption signals from the tech community.',
    ),
    url,
    source: 'Hacker News',
    category,
    impact: getImpact({ score: hit.points }),
    publishedAt: hit.created_at,
    readTime: readTimeFromText(title),
  }

  return withImage(enrichUpdate(update))
}

function normalizeDevTo(article) {
  const text = `${article.title} ${article.description || ''} ${(article.tag_list || []).join(' ')}`
  const category = getCategory(text)
  const update = {
    id: `devto-${article.id}`,
    title: article.title,
    summary: article.description || 'A practical software, AI, or developer-tools article from DEV.',
    url: article.url,
    imageUrl: firstUsableImage(article.cover_image, article.social_image),
    source: 'DEV Community',
    category,
    impact: getImpact({ score: article.public_reactions_count }),
    publishedAt: article.published_at,
    readTime: article.reading_time_minutes || readTimeFromText(article.description),
  }

  return withImage(enrichUpdate(update))
}

function normalizeGitHubRepo(repo) {
  const text = `${repo.name} ${repo.description || ''} ${(repo.topics || []).join(' ')}`
  const category = getCategory(text)
  const update = {
    id: `github-repo-${repo.id}`,
    title: repoTitle(repo),
    summary:
      repo.description ||
      `${repo.full_name} is a recently created open-source repository gaining early attention from developers.`,
    url: repo.html_url,
    imageUrl: firstUsableImage(
      `https://opengraph.githubassets.com/${repo.id}/${repo.full_name}`,
      repo.owner?.avatar_url,
    ),
    source: 'GitHub New Repos',
    category,
    impact: getImpact({ stars: repo.stargazers_count }),
    publishedAt: repo.created_at,
    readTime: 2,
  }

  return withImage(enrichUpdate(update))
}

function normalizeGitHubRelease(release, repo) {
  const title = release.name || release.tag_name
  const category = getCategory(`${repo} ${title} ${release.body || ''} release`)
  const update = {
    id: `github-release-${repo}-${release.id}`,
    title: releaseTitle(repo, title),
    summary: shortText(
      release.body,
      `${repo} shipped a new release for its developer tool, SDK, framework, or AI project.`,
    ),
    url: release.html_url,
    imageUrl: firstUsableImage(
      `https://opengraph.githubassets.com/${release.id}/${repo}/releases/tag/${encodeURIComponent(release.tag_name)}`,
      release.author?.avatar_url,
    ),
    source: 'GitHub Releases',
    category,
    impact: getImpact({ isRelease: true }),
    publishedAt: release.published_at,
    readTime: readTimeFromText(release.body || title),
  }

  return withImage(enrichUpdate(update))
}

function normalizeNpmPackage(item) {
  const pkg = item.package
  const score = item.score?.detail?.popularity || 0
  const downloads = Math.round(score * 300000)
  const text = `${pkg.name} ${pkg.description || ''} ${(pkg.keywords || []).join(' ')}`
  const category = getCategory(text)
  const update = {
    id: `npm-${pkg.name}`,
    title: packageTitle(pkg),
    summary: pkg.description || 'A package from npm that may be useful for software development.',
    url: pkg.links?.npm || `https://www.npmjs.com/package/${pkg.name}`,
    source: 'npm Registry',
    category,
    impact: getImpact({ downloads }),
    publishedAt: pkg.date,
    readTime: 2,
  }

  return withImage(enrichUpdate(update))
}

function normalizeCompanyNews(item, source) {
  const text = `${source} ${item.title} ${item.summary}`
  const category = getCategory(text)
  const update = {
    id: `company-${source}-${item.url || item.title}`.toLowerCase().replace(/\W+/g, '-'),
    title: item.title,
    summary: shortText(
      item.summary,
      `${source} published a new software company update for developers and product teams.`,
    ),
    url: item.url,
    imageUrl: firstUsableImage(item.imageUrl),
    source,
    category,
    impact: getImpact({ isRelease: /launch|release|announce|preview|ga|stable/i.test(text) }),
    publishedAt: item.publishedAt || TODAY.toISOString(),
    readTime: readTimeFromText(item.summary || item.title),
  }

  return withImage(enrichUpdate(update))
}

function inferRoleType(text = '') {
  const lowerText = text.toLowerCase()

  if (lowerText.includes('intern')) return 'Internship'
  if (lowerText.includes('graduate') || lowerText.includes('fresher') || lowerText.includes('entry')) {
    return 'Fresher / Graduate'
  }
  if (lowerText.includes('remote')) return 'Remote full-time'
  if (lowerText.includes('contract')) return 'Contract'
  return 'Full-time'
}

function inferEligibility(text = '') {
  const lowerText = text.toLowerCase()

  if (lowerText.includes('student')) return 'Students can apply'
  if (lowerText.includes('graduate') || lowerText.includes('fresher') || lowerText.includes('entry')) {
    return 'Freshers and recent graduates'
  }
  if (lowerText.includes('junior')) return 'Junior developers'
  if (lowerText.includes('intern')) return 'Students and early-career candidates'
  return 'Check role description'
}

function normalizeCareerOpportunity(job, source) {
  const company = job.company_name || job.company || job.company_name_plain || 'Tech company'
  const role = job.title || job.slug || 'Software opportunity'
  const description = job.description || job.text || ''
  const location = job.candidate_required_location || job.location || 'Remote / varies'
  const tags = [...(job.tags || []), ...(job.job_types || [])].join(' ')
  const text = `${role} ${company} ${location} ${tags} ${description}`
  const update = {
    id: `career-${source}-${job.id || job.slug || job.url || role}`.toLowerCase().replace(/\W+/g, '-'),
    title: `${company}: ${role}`,
    summary: shortText(
      description,
      `${company} has a software, internship, fresher, or remote career opportunity available.`,
    ),
    url: job.url || job.apply_url || job.redirect_url,
    source,
    category: 'Career & Opportunities',
    impact: getImpact({ isCareer: true }),
    section: 'Career Opportunities',
    whyMatters: whyMattersFor({ category: 'Career & Opportunities' }),
    publishedAt: job.publication_date || job.created_at || job.created || TODAY.toISOString(),
    readTime: 2,
    career: {
      company,
      roleType: inferRoleType(text),
      eligibility: inferEligibility(text),
      deadline: job.deadline || job.expires_at || 'Not listed',
      applyLabel: 'Apply',
    },
  }

  return withImage(enrichUpdate(update))
}

function enrichUpdate(update) {
  const qualityScore = scoreUpdate(update)

  return {
    ...update,
    qualityScore,
    section: update.section || getSection(update),
    whyMatters: update.whyMatters || whyMattersFor(update),
  }
}

async function fetchJson(url) {
  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)
  const response = await fetch(url, {
    signal: controller.signal,
    headers: {
      Accept: 'application/json',
    },
  }).finally(() => window.clearTimeout(timeout))

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`)
  }

  return response.json()
}

async function fetchText(url) {
  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)
  const response = await fetch(url, {
    signal: controller.signal,
    headers: {
      Accept: 'application/rss+xml, application/xml, text/xml, text/plain',
    },
  }).finally(() => window.clearTimeout(timeout))

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`)
  }

  return response.text()
}

function proxiedFeedUrl(feedUrl) {
  return `https://api.allorigins.win/raw?url=${encodeURIComponent(feedUrl)}`
}

function parseFeed(xmlText, source) {
  const document = new DOMParser().parseFromString(xmlText, 'text/xml')
  const entries = [...document.querySelectorAll('item, entry')]

  return entries.slice(0, 4).map((entry) => {
    const linkNode = entry.querySelector('link')
    const link =
      linkNode?.getAttribute('href') ||
      linkNode?.textContent?.trim() ||
      entry.querySelector('guid')?.textContent?.trim()
    const mediaContent = entry.getElementsByTagName('media:content')[0]
    const mediaThumbnail = entry.getElementsByTagName('media:thumbnail')[0]
    const enclosure = entry.querySelector('enclosure[type^="image"]')
    const summary =
      entry.querySelector('description')?.textContent ||
      entry.querySelector('summary')?.textContent ||
      entry.querySelector('content')?.textContent ||
      entry.getElementsByTagName('content:encoded')[0]?.textContent ||
      ''

    return normalizeCompanyNews(
      {
        title: entry.querySelector('title')?.textContent?.trim() || `${source} update`,
        summary,
        url: link,
        imageUrl: firstUsableImage(
          mediaContent?.getAttribute('url'),
          mediaThumbnail?.getAttribute('url'),
          enclosure?.getAttribute('url'),
          extractFirstImage(summary),
        ),
        publishedAt:
          entry.querySelector('pubDate')?.textContent ||
          entry.querySelector('published')?.textContent ||
          entry.querySelector('updated')?.textContent,
      },
      source,
    )
  })
}

async function fetchHackerNews() {
  const data = await fetchJson(
    'https://hn.algolia.com/api/v1/search_by_date?query=%22Show%20HN%22%20OR%20launch%20OR%20AI%20tool%20OR%20developer%20tool&tags=story&hitsPerPage=14',
  )
  return (data.hits || []).filter((hit) => hit.title || hit.story_title).map(normalizeHackerNews)
}

async function fetchCompanyNews() {
  const feedRequests = companyFeeds.map(async ([source, feedUrl]) => {
    const xmlText = await fetchText(proxiedFeedUrl(feedUrl))
    return parseFeed(xmlText, source)
  })

  const responses = await Promise.allSettled(feedRequests)
  return responses
    .filter((result) => result.status === 'fulfilled')
    .flatMap((result) => result.value)
    .filter((update) => update.url)
}

async function fetchCareerOpportunities() {
  const requests = opportunitySources.map(async ({ source, url }) => {
    const data = await fetchJson(url)
    const jobs = data.jobs || data.data || []
    return jobs
      .filter((job) => {
        const text = `${job.title || ''} ${job.description || ''} ${job.tags || ''}`.toLowerCase()
        return /intern|graduate|fresher|entry|junior|software|developer|frontend|backend|full stack|remote/.test(
          text,
        )
      })
      .slice(0, 8)
      .map((job) => normalizeCareerOpportunity(job, source))
  })

  const responses = await Promise.allSettled(requests)
  return responses
    .filter((result) => result.status === 'fulfilled')
    .flatMap((result) => result.value)
    .filter((update) => update.url)
}

async function fetchDevTo() {
  const tagRequests = ['ai', 'tools', 'programming'].map((tag) =>
    fetchJson(`https://dev.to/api/articles?tag=${tag}&top=1&per_page=6`),
  )
  const responses = await Promise.all(tagRequests)
  return responses.flat().map(normalizeDevTo)
}

async function fetchGitHubNewRepos() {
  const query = encodeURIComponent(
    `created:>${TWO_WEEKS_AGO} (ai OR agent OR developer-tools OR cli OR sdk OR llm)`,
  )
  const data = await fetchJson(
    `https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc&per_page=12`,
  )
  return (data.items || []).map(normalizeGitHubRepo)
}

async function fetchGitHubReleases() {
  const releaseRequests = releaseRepos.map(async (repo) => {
    const releases = await fetchJson(`https://api.github.com/repos/${repo}/releases?per_page=2`)
    return releases.map((release) => normalizeGitHubRelease(release, repo))
  })

  const responses = await Promise.allSettled(releaseRequests)
  return responses
    .filter((result) => result.status === 'fulfilled')
    .flatMap((result) => result.value)
}

async function fetchNpmPackages() {
  const query = encodeURIComponent('keywords:ai keywords:developer-tools keywords:cli')
  const data = await fetchJson(
    `https://registry.npmjs.org/-/v1/search?text=${query}&size=12&popularity=0.35&quality=0.25&maintenance=0.4`,
  )
  return (data.objects || []).map(normalizeNpmPackage)
}

export async function fetchDailyUpdates() {
  const sources = await Promise.allSettled([
    fetchGitHubReleases(),
    fetchGitHubNewRepos(),
    fetchNpmPackages(),
    fetchCompanyNews(),
    fetchCareerOpportunities(),
    fetchHackerNews(),
    fetchDevTo(),
  ])

  const updates = sources
    .filter((result) => result.status === 'fulfilled')
    .flatMap((result) => result.value)

  if (!updates.length) {
    return fallbackUpdates.map((update) => withImage(enrichUpdate(update)))
  }

  return dedupeUpdates(updates)
    .sort((a, b) => {
      const impactOrder = { High: 3, Medium: 2, Emerging: 1 }
      return (
        b.qualityScore - a.qualityScore ||
        impactOrder[b.impact] - impactOrder[a.impact] ||
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      )
    })
    .slice(0, 36)
}

export function getDigestMeta() {
  return {
    date: TODAY_KEY,
    label: new Intl.DateTimeFormat('en-IN', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    }).format(new Date()),
  }
}

function dedupeUpdates(updates) {
  const seen = new Set()
  return updates.filter((update) => {
    const key = (update.url || update.title).toLowerCase()
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}
