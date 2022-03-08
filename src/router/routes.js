import { ifAuthenticated, ifNotAuthenticated } from '@/router/interceptors';
import ConvertDocuments from '@/views/ConvertDocuments.vue';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import MyFiles from '@/views/MyFiles.vue';
import Profile from '@/views/Profile.vue';
import Register from '@/views/Register.vue';
import SplitDocument from '@/views/SplitDocument.vue';
import Subscriptions from '@/views/Subscriptions.vue';
import TermsAndConditions from '@/views/TermsAndConditions.vue';

export default [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/my-files',
    name: 'MyFiles',
    component: MyFiles,
  },
  {
    path: '/subscriptions',
    name: 'Subscriptions',
    component: Subscriptions,
  },
  {
    path: '/terms-and-conditions',
    name: 'TermsAndConditions',
    component: TermsAndConditions,
  },
  {
    path: '/split-document/:fileId',
    name: 'SplitDocument',
    component: SplitDocument,
    props: true,
  },
  {
    path: '/convert-documents',
    name: 'ConvertDocuments',
    component: ConvertDocuments,
  },
];
