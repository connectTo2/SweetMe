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
import { signinSchema } from '../validation/schema';

class SignIn extends Component {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return `
      <h2 class="${title}">로그인</h2>
      <form class="${signform} signin">
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
            <p class="${error} ${hide}">${signinSchema.email.error}</p>
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
            <p class="${error} ${hide}">${signinSchema.password.error}</p>
          </li>
        </ul>
        <button type="submit" class="${submitButton} ${fillButton}" disabled>ENTER</button>
      </form>
      <a href="/signup" class="goToSignUp ${changeSignPage} ${outlineButton}">회원가입</a>
    `;
  }

  addEventListener() {
    const { valid, postSignIn, changePath } = this.props;
    return [
      { type: 'input', selector: `.signin .${input}`, handler: valid },
      { type: 'click', selector: `.${changeSignPage}`, handler: e => changePath(e.target.pathname) },
      { type: 'click', selector: `.signin .${submitButton}`, handler: postSignIn },
    ];
  }
}

export { SignIn, hide, submitButton, changeSignPage };
