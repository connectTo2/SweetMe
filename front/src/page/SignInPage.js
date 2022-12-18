/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import _ from 'lodash';
import Component from '../core/Component';
import { SignIn, hide, submitButton } from '../component/SignIn';
import { signinSchema } from '../validation/schema';

class SignInPage extends Component {
  constructor(props) {
    super(props);

    this.changePath = this.props.changePath;
  }

  render() {
    return `${new SignIn({
      valid: _.debounce(this.valid.bind(this), 200),
      postSignIn: this.postSignIn.bind(this),
      changePath: () => this.changePath('/signup'),
    }).render()}`;
  }

  // eslint-disable-next-line class-methods-use-this
  toggleSubmitButton() {
    document.querySelector(`.${submitButton}`).disabled = !signinSchema.valid;
  }

  /* ------------------------------ Event Handler ----------------------------- */

  /** input 이벤트 발생시 유효성 검사를 진행 */
  // eslint-disable-next-line class-methods-use-this
  valid(e) {
    signinSchema[e.target.name].value = e.target.value;
    signinSchema[e.target.name].valid
      ? e.target.nextElementSibling.classList.add(hide)
      : e.target.nextElementSibling.classList.remove(hide);

    this.toggleSubmitButton();
  }

  /**
   * - submit 이벤트 발생시 서버에 user인지 확인 요청 보내고
   * - user면 VocaListPage('/')로 라우팅
   * - user가 아니면 toaster 메세지 띄우기
   * TODO: postSignIn라는 네이밍이 괜찮은지 코드 리뷰
   */
  async postSignIn() {
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;

    try {
      await axios.post(`/api${this.props.path}`, { email, password });
      console.log('[Toaster] 로그인 성공');
      // TODO: this.changePath('/');
    } catch (error) {
      console.log('[Toaster] 가입된 정보가 없습니다');
    }
  }
}

export default SignInPage;
