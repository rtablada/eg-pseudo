import GetResource from 'driven/resources/get';
import { jsonApiSupport } from 'driven-json-api/resources';

// GET /courses

@jsonApiSupport('course', {collection: true})
export default class Register extends PostResource {
  resourceName = 'course';

  handle() {
    return this.services('store').course.paginate();
  }
}
