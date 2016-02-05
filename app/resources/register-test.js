import PostResource from 'driven/resources/post';

// GET register
// x-www-form-urlencoded
// username=ryan@example.com
// password=***
// user_data={"firstName": "Ryan", "lastName": "Tablada"}

export default class Register extends PostResource {
  handle() {
    const email = this.request.get('username');
    const password = this.request.get('password');
    const userData = JSON.parse(this.request.get('user_data')) || {};

    this.request.set('grant_type', 'password');

    return this.services('store').user.create({
      ...userData,
      email,
      password,
    });
  }

  after() {
    return this.services('oauth').grant();
  }
}
