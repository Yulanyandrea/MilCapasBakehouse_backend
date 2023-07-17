import { Application } from 'express';
import milhoja from './api/milhojas';
import user from './api/users';
import customer from './api/customers';
import auth  from './auth/local'

function routes(app:Application) {
  app.use('/api/customer', customer);
  app.use('/api/milhojas',milhoja);
  app.use('/api/user', user);

  app.use('/auth/local',auth)

}

export default routes;
