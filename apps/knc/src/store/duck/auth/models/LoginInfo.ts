import { Record } from 'immutable';

const LoginInfoSchema = Record({
  name: '',
  age: 0
});

export class LoginInfo extends LoginInfoSchema {
  getName() {
    return this.name;
  }
}
