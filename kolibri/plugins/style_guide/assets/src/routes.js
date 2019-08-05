import Home from './views/Home';
import Inclusive from './views/patterns/Inclusive';
import Writing from './views/patterns/Writing';
import Colors from './views/patterns/Colors';
import Buttons from './views/patterns/Buttons';

// import Breadcrumbs from './views/components/KBreadcrumb';
// import Navbar from './views/components/KNavba';
import Checkboxes from './views/components/KCheckbox';
// import RadioButtons from './views/components/KRadioButton';
// import TextFields from './views/components/KTextField';
// import Filters from './views/components/KFilter';
// import DropdownMenus from './views/components/KDropdownMenu';
// import Loaders from './views/components/KLoader';
// import Modals from './views/components/KModal';
// import Grids from './views/components/KGrid';
// import Tooltips from './views/components/KTooltip';

import ComponentDocs from './views/common/ComponentDocs';

import KBreadcrumbs from '!vue-doc!kolibri.coreVue.components.KBreadcrumbs';

const homeRoute = [
  {
    path: `/`,
    component: Home,
    meta: { title: 'Home' },
  },
];

const patternRoutes = [
  {
    path: `/patterns/inclusive`,
    component: Inclusive,
    meta: { title: 'Inclusive design' },
  },
  {
    path: `/patterns/writing`,
    component: Writing,
    meta: { title: 'Writing style' },
  },
  {
    path: `/patterns/colors`,
    component: Colors,
    meta: { title: 'Colors' },
  },
  {
    path: `/patterns/buttons`,
    component: Buttons,
    meta: { title: 'Buttons and links' },
  },
  {
    path: `/patterns/checkboxes`,
    component: Checkboxes,
    meta: { title: 'Checkboxes and radio buttons' },
  },
];

const componentRoutes = [
  {
    path: `/api/KBreadcrumbs`,
    component: ComponentDocs,
    meta: { componentAPI: KBreadcrumbs },
  },
  // {
  //   path: `/components/navbar`,
  //   component: Navbar,
  //   meta: { title: 'Horizontal navbar' },
  // },
  // {
  //   path: `/components/radio-buttons`,
  //   component: RadioButtons,
  //   meta: { title: 'Radio Buttons' },
  // },
  // {
  //   path: `/components/text-fields`,
  //   component: TextFields,
  //   meta: { title: 'Text Fields' },
  // },
  // {
  //   path: `/components/filters`,
  //   component: Filters,
  //   meta: { title: 'Filters' },
  // },
  // {
  //   path: `/components/dropdown-menus`,
  //   component: DropdownMenus,
  //   meta: { title: 'Dropdown menus' },
  // },
  // {
  //   path: `/components/loaders`,
  //   component: Loaders,
  //   meta: { title: 'Loaders' },
  // },
  // {
  //   path: `/components/modals`,
  //   component: Modals,
  //   meta: { title: 'Modals' },
  // },
  // {
  //   path: `/components/grids`,
  //   component: Grids,
  //   meta: { title: 'Grids' },
  // },
  // {
  //   path: `/components/tooltips`,
  //   component: Tooltips,
  //   meta: { title: 'Tooltips' },
  // },
];

const allRoutes = homeRoute.concat(patternRoutes).concat(componentRoutes);
export { allRoutes, patternRoutes, componentRoutes };
