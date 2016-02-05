import PostResource from 'driven/resources/post';
import { jsonApiSupport } from 'driven-json-api/resources';
import { authenticated, hasRole } from 'driven-acl';

// POST /courses
// application/json
/**
 * Method: POST
 * Accepts: application/json
 * Content-Type: application/json
 *
 * Payload: {
 *   "data": {
 *     "type": "course",
 *     "attributes": {
 *       "active": true,
 *       "coming-soon": true,
 *       "description": "Lorem ipsum dolor.",
 *       "name": "Zero to Prototype",
 *       "price": 1500
 *     }
 *   }
 * }
 */

@jsonApiSupport('course')
@authenticated()
@hasRole('admin')
export default class Register extends PostResource {
  validate(data) {
    return this.service('validator').course.validate('create', data);
  }

  handle() {
    const data = this.jsonAPIInput();

    return this.validate(data).then(() => {
      return this.services('store').course.create(data);
    });
  }
}
