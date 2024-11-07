// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`
}

const ROOTS_AUTH = '/auth'
const ROOTS_DASHBOARD = '/dashboard'

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  login: '/',
  register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  newPassword: path(ROOTS_AUTH, '/new-password'),
}

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
}

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
    analytics: path(ROOTS_DASHBOARD, '/analytics'),
    banking: path(ROOTS_DASHBOARD, '/banking'),
    booking: path(ROOTS_DASHBOARD, '/booking'),
  },
  mail: {
    root: path(ROOTS_DASHBOARD, '/mail'),
    all: path(ROOTS_DASHBOARD, '/mail/all'),
  },
  chat: {
    root: path(ROOTS_DASHBOARD, '/chat'),
    new: path(ROOTS_DASHBOARD, '/chat/new'),
    view: (name: string) => path(ROOTS_DASHBOARD, `/chat/${name}`),
  },
  calendar: path(ROOTS_DASHBOARD, '/calendar'),
  kanban: path(ROOTS_DASHBOARD, '/kanban'),
  permissionDenied: path(ROOTS_DASHBOARD, '/permission-denied'),
  pdv: {
    root: path(ROOTS_DASHBOARD, '/pdvs'),
    new: path(ROOTS_DASHBOARD, '/pdvs/new'),
  },
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    new: path(ROOTS_DASHBOARD, '/user/new'),
  },
  client: {
    root: path(ROOTS_DASHBOARD, '/clients'),
    new: path(ROOTS_DASHBOARD, '/client'),
  },
  finisher: {
    root: path(ROOTS_DASHBOARD, '/finishers'),
    new: path(ROOTS_DASHBOARD, '/finishers/new'),
  },
  group: {
    root: path(ROOTS_DASHBOARD, '/groups'),
    new: path(ROOTS_DASHBOARD, '/groups/new'),
  },
  subgroups: {
    root: path(ROOTS_DASHBOARD, '/subgroups'),
    new: path(ROOTS_DASHBOARD, '/subgroups/new'),
  },
  ncm: {
    root: path(ROOTS_DASHBOARD, '/ncms'),
    new: path(ROOTS_DASHBOARD, '/ncms/new'),
  },
  product: {
    root: path(ROOTS_DASHBOARD, '/products'),
    new: path(ROOTS_DASHBOARD, '/products/new'),
  },
  store: {
    root: path(ROOTS_DASHBOARD, '/store'),
    settings: path(ROOTS_DASHBOARD, '/store/settings'),
  },
  taxes: {
    root: path(ROOTS_DASHBOARD, '/taxes'),
    addByNcm: path(ROOTS_DASHBOARD, '/taxes/:ncm'),
  },
  eCommerce: {
    root: path(ROOTS_DASHBOARD, '/e-commerce'),
    shop: path(ROOTS_DASHBOARD, '/e-commerce/shop'),
    list: path(ROOTS_DASHBOARD, '/e-commerce/list'),
    checkout: path(ROOTS_DASHBOARD, '/e-commerce/checkout'),
    new: path(ROOTS_DASHBOARD, '/e-commerce/product/new'),
    view: (name: string) =>
      path(ROOTS_DASHBOARD, `/e-commerce/product/${name}`),
    edit: (name: string) =>
      path(ROOTS_DASHBOARD, `/e-commerce/product/${name}/edit`),
    demoEdit: path(
      ROOTS_DASHBOARD,
      '/e-commerce/product/nike-blazer-low-77-vintage/edit',
    ),
    demoView: path(
      ROOTS_DASHBOARD,
      '/e-commerce/product/nike-air-force-1-ndestrukt',
    ),
  },
  invoice: {
    root: path(ROOTS_DASHBOARD, '/invoice'),
    list: path(ROOTS_DASHBOARD, '/invoice/list'),
    new: path(ROOTS_DASHBOARD, '/invoice/new'),
    view: (id: string) => path(ROOTS_DASHBOARD, `/invoice/${id}`),
    edit: (id: string) => path(ROOTS_DASHBOARD, `/invoice/${id}/edit`),
    demoEdit: path(
      ROOTS_DASHBOARD,
      '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1/edit',
    ),
    demoView: path(
      ROOTS_DASHBOARD,
      '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5',
    ),
  },
  blog: {
    root: path(ROOTS_DASHBOARD, '/blog'),
    posts: path(ROOTS_DASHBOARD, '/blog/posts'),
    new: path(ROOTS_DASHBOARD, '/blog/new'),
    view: (title: string) => path(ROOTS_DASHBOARD, `/blog/post/${title}`),
    demoView: path(
      ROOTS_DASHBOARD,
      '/blog/post/apply-these-7-secret-techniques-to-improve-event',
    ),
  },
}

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction'
