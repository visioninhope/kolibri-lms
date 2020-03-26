import store from 'kolibri.coreVue.vuex.store';
import { FacilityResource } from 'kolibri.resources';
import ClassEditPage from './views/ClassEditPage';
import CoachClassAssignmentPage from './views/CoachClassAssignmentPage';
import LearnerClassEnrollmentPage from './views/LearnerClassEnrollmentPage';
import DataPage from './views/DataPage';
import FacilitiesConfigPage from './views/FacilityConfigPage';
import ManageClassPage from './views/ManageClassPage';
import UserPage from './views/UserPage';
import UserCreatePage from './views/UserCreatePage';
import UserEditPage from './views/UserEditPage';
import AllFacilitiesPage from './views/AllFacilitiesPage';
import { showClassesPage } from './modules/classManagement/handlers';
import { showClassEditPage } from './modules/classEditManagement/handlers';
import { showUserPage } from './modules/userManagement/handlers';
import { showFacilityConfigPage } from './modules/facilityConfig/handlers';
import {
  showLearnerClassEnrollmentPage,
  showCoachClassAssignmentPage,
} from './modules/classAssignMembers/handlers';
import { PageNames } from './constants';

export default [
  // Routes for multi-facility case
  {
    name: 'AllFacilitiesPage',
    path: '/facilities',
    component: AllFacilitiesPage,
    handler() {
      store.dispatch('preparePage', { isAsync: false });
    },
    beforeEnter(to, from, next) {
      console.log('yoyyoo');
      next();
    },
  },
  // A catch-all AuthMessage page that non-SuperAdmins will see.
  // The global beforeEnter guard should redirect here if trying to access multi-facility
  // functionality as a non-superuser
  {
    name: 'NoSuperUserPermissions',
    path: '/not_superadmin',
  },
  // In the multi-facility case, the optional facility_id needs to be provided.
  // If it's missing, then we are likely in single-facility situation and we use
  // the facility ID set during login as the default.
  {
    name: PageNames.CLASS_MGMT_PAGE,
    path: '/:facility_id?/classes',
    component: ManageClassPage,
    handler: toRoute => {
      showClassesPage(store, toRoute);
    },
  },
  {
    name: PageNames.CLASS_EDIT_MGMT_PAGE,
    path: '/:facility_id?/classes/:id',
    component: ClassEditPage,
    handler: toRoute => {
      showClassEditPage(store, toRoute.params.id);
    },
  },
  {
    name: PageNames.CLASS_ENROLL_LEARNER,
    component: LearnerClassEnrollmentPage,
    path: '/:facility_id?/classes/:id/learner-enrollment/',
    handler: toRoute => {
      showLearnerClassEnrollmentPage(store, toRoute);
    },
  },
  {
    name: PageNames.CLASS_ASSIGN_COACH,
    component: CoachClassAssignmentPage,
    path: '/:facility_id?/classes/:id/coach-assignment/',
    handler: toRoute => {
      showCoachClassAssignmentPage(store, toRoute);
    },
  },
  {
    name: PageNames.USER_MGMT_PAGE,
    component: UserPage,
    path: '/:facility_id?/users',
    handler: toRoute => {
      showUserPage(store, toRoute);
    },
  },
  {
    name: PageNames.USER_CREATE_PAGE,
    component: UserCreatePage,
    path: '/:facility_id?/users/new',
    handler: () => {
      store.dispatch('preparePage', { isAsync: false });
    },
  },
  {
    name: PageNames.USER_EDIT_PAGE,
    component: UserEditPage,
    path: '/:facility_id?/users/:id',
    handler: () => {
      store.dispatch('preparePage', { isAsync: false });
    },
  },
  {
    name: PageNames.DATA_EXPORT_PAGE,
    component: DataPage,
    path: '/:facility_id?/data',
    handler: () => {
      store.dispatch('preparePage', { isAsync: false });
      store.commit('manageSync/RESET_STATE');
    },
  },
  {
    name: PageNames.FACILITY_CONFIG_PAGE,
    component: FacilitiesConfigPage,
    path: '/:facility_id?/settings',
    handler: toRoute => {
      showFacilityConfigPage(store, toRoute);
    },
  },
  {
    path: '/',
    // Redirect to AllFacilitiesPage if a superuser and device has > 1 facility
    beforeEnter(to, from, next) {
      const goToClasses = () => next({ name: PageNames.CLASS_MGMT_PAGE });
      if (store.getters.isSuperuser) {
        FacilityResource.fetchCollection()
          .then(facilities => {
            if (facilities.length > 1) {
              next({ name: 'AllFacilitiesPage' });
            } else {
              goToClasses();
            }
          })
          .catch(goToClasses);
      } else {
        goToClasses();
      }
    },
  },
];
