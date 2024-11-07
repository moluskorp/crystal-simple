// routes
import { PATH_DASHBOARD } from '../../../../routes/paths'
// components
import SvgIconStyle from '../../../../components/SvgIconStyle'

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
)

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  booking: getIcon('ic_booking'),
  invoice: getIcon('ic_invoice'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  menuItem: getIcon('ic_menu_item'),
}

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'cadastros',
    items: [
      { title: 'Loja', path: PATH_DASHBOARD.store.root, icon: ICONS.kanban },
      {
        title: 'produtos',
        path: PATH_DASHBOARD.product.root,
        icon: ICONS.ecommerce,
      },
      {
        title: 'grupos',
        path: PATH_DASHBOARD.group.root,
        icon: ICONS.menuItem,
      },
      {
        title: 'tributação',
        path: PATH_DASHBOARD.taxes.root,
        icon: ICONS.analytics,
      },
      {
        title: 'Finalizadora',
        path: PATH_DASHBOARD.finisher.root,
        icon: ICONS.banking,
      },
      {
        title: 'usuários',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
      },
      {
        title: 'pdv',
        path: PATH_DASHBOARD.pdv.root,
        icon: ICONS.booking,
      },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'management',
  //   items: [
  // BLOG
  // {
  //   title: 'blog',
  //   path: PATH_DASHBOARD.blog.root,
  //   icon: ICONS.blog,
  //   children: [
  //     { title: 'posts', path: PATH_DASHBOARD.blog.posts },
  //     { title: 'post', path: PATH_DASHBOARD.blog.demoView },
  //     { title: 'create', path: PATH_DASHBOARD.blog.new },
  //   ],
  // },
  //   ],
  // },
]

export default navConfig
