import Router from 'driven/router';

const router = new Router((router) => {
  router.post('register');
  router.resource('courses', (router) => {
    router.get('/', 'courses/index');
    router.post('/', 'courses/store');
  });
});

export default router;
