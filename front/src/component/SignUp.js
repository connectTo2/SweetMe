import { title, hide, fillButton, outlineButton } from '../css/common.module.css';
import {
  signform,
  signList,
  signItem,
  label,
  input,
  error,
  submitButton,
  changeSignPage,
} from '../css/Sign.module.css';
import Component from '../core/Component';
import { signupSchema } from '../validation/schema';

class SignUp extends Component {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return `
      <h2 class="${title}">회원가입</h2>
      <form class="${signform} signup">
        <ul class="${signList}">
          <li class="${signItem}">
            <label for="email" class="${label}">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              class="${input}" 
              autofocus 
              required 
            />
            <p class="${error} ${hide}">${signupSchema.email.error}</p>
          </li>
          <li class="${signItem}">
            <label for="userName" class="${label}">User name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              class="${input}"
              required
            />
            <p class="${error} ${hide}">${signupSchema.userName.error}</p>
          </li>
          <li class="${signItem}">
            <label for="password" class="${label}">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              class="${input}" 
              required 
            />
            <p class="${error} ${hide}">${signupSchema.password.error}</p>
          </li>
          <li class="${signItem}">
            <label for="confirmPassword" class="${label}">Confirm pssword</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              class="${input}"
              required
            />
            <p class="${error} ${hide}">${signupSchema.confirmPassword.error}</p>
          </li>
        </ul>
        <button type="submit" class="${submitButton} ${fillButton}" disabled>ENTER</button>
      </form> 
      <a href="/signin" class="${changeSignPage} signup ${outlineButton}">로그인</a>
    `;
  }

  addEventListener() {
    const { valid, postSignUp, changePath } = this.props;
    return [
      { type: 'input', selector: `.${input}`, handler: valid },
      { type: 'click', selector: `.${changeSignPage}`, handler: changePath },
      { type: 'click', selector: `.${submitButton}`, handler: postSignUp },
    ];
  }
}

export { SignUp, hide, submitButton };
