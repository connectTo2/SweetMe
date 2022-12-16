import { title } from '../css/common.module.css';
import {
  signform,
  signList,
  signItem,
  label,
  input,
  error,
  hide,
  submitButton,
  fillButton,
  changeSignPage,
  outlineButton,
} from '../css/Sign.module.css';
import Component from '../core/Component';

class SignUp extends Component {
  // TODO: js 적용 렌더링
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
            <p class="${error} ${hide}">올바른 이메일 형식이 아닙니다.</p>
          </li>
          <li class="${signItem}">
            <label for="username" class="${label}">User name</label>
            <input
              type="text"
              id="username"
              name="username"
              class="${input}"
              required
            />
            <p class="${error} ${hide}">1자리 이상의 문자를 입력해주세요.</p>
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
          <li class="${signItem}">
            <label for="confirmPassword" class="${label}">Confirm pssword</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              class="${input}"
              required
            />
            <p class="${error} ${hide}">비밀번호가 일치하지 않습니다.</p>
          </li>
        </ul>
        <button type="submit" class="${submitButton} ${fillButton}">ENTER</button>
      </form> 
      <a href="/signin" class="${changeSignPage} signup ${outlineButton}">로그인</a>
    `;
  }

  // TODO: addEventHandler() {}
}

export default SignUp;
