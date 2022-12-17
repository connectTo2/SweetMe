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

class SignIn extends Component {
  // TODO: js 적용 렌더링
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
            <p class="${error} ${hide}">올바른 이메일 형식이 아닙니다.</p>
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
            <p class="${error} ${hide}">6자리 이상의 문자를 입력해주세요.</p>
          </li>
        </ul>
        <button type="submit" class="${submitButton} ${fillButton}" disabled>ENTER</button>
      </form>
      <a href="/signup" class="${changeSignPage} signin ${outlineButton}">회원가입</a>
    `;
  }

  addEventListener() {
    const { valid, checkUser, routeSignUpPage } = this.props;
    return [
      { type: 'input', selector: `.${input}`, handler: valid },
      { type: 'click', selector: `.${changeSignPage}`, handler: routeSignUpPage },
      { type: 'click', selector: `.${submitButton}`, handler: checkUser },
    ];
  }
}

export { SignIn, hide, submitButton, changeSignPage };
