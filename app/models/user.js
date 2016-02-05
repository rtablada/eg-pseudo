import { Model, attr } from 'driven-relational-data';

export default class User extends Model {
  properties = {
    email: attr(),
    password: attr(),
    firstName: attr(),
    lastName: attr(),
  };

  hidden = [
    'password',
  ];

  set password(value) {
    const hash = this.service('hash');

    this.setProperty('password', hash.syncMake(value));
  }
};
