import { expect } from 'chai';
import IntegrationTest from 'driven-testing/integration';
import sinon from 'sinon';

const oAuthGrantSpy = sinon.stub();

const options = {
  name: 'Integration - Resources - Register',
  module: 'resource:register',
  with: {
    'service:store': true,
    'service:oauth': { grant: oAuthGrantSpy },
  },
};

export default IntegrationTest.create(options, (resource, app) => {
  it('creates a new user', (done) => {
    const tokenInfo = {
      // jscs: disable
      token_type: 'bearer',
      access_token: 'f1c5cb890586fea033c22b2ceff75f3fb6d37321',
      expires_in: 3600,
      refresh_token: '62fdd7267cba4e3a5784989acbd3a51f18ad0a05',
      // jscs: enable
    };

    oAuthGrantSpy.returns(tokenInfo);

    resource.run({
      // jscs: disable
      username: 'ryan@example.com',
      password: 'Password@123',
      user_data: '{"first_name": "Ryan", "last_name": "Tablada"}',
      // jscs: enable
    }).then((result) => {
      expect(oAuthGrantSpy).to.have.been.callCount(1);
      expect(JSON.parse(result)).to.deep.equal(tokenInfo);

      return app.make('service:store').user.first({ username: 'ryan@example.com' });
    }).then((user) => {
      expect(user).to.be.ok();
      expect(user.username).to.equal('ryan@example.com');
      expect(user.password).to.equal('Password@123');
      expect(user.firstName).to.equal('Ryan');
      expect(user.lastName).to.equal('Tablada');

      done();
    });
  });
});
