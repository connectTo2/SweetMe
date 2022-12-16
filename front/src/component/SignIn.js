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

class SignIn extends Component {
  // TODO: js 적용 렌더링
  render() {
    return `
      <h2 class="title">로그인</h2>
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
        <button type="submit" class="${submitButton} ${fillButton}">ENTER</button>
      </form> 
      <a href="/signup" class="${changeSignPage} signin ${outlineButton}">회원가입</a>
    `;
  }

  // TODO: addEventHandler() {}
}

export default SignIn;
