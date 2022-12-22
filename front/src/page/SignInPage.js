/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import _ from 'lodash';
import Component from '../core/Component';
import { SignIn, hide, submitButton } from '../component/SignIn';
import { signinSchema } from '../validation/schema';
import Toaster from '../component/Toaster';

let isToastShowing = false;

class SignInPage extends Component {
  constructor(props) {
    super(props);

    this.changePath = this.props.changePath;
    this.state = { isToastShowing };
  }

  render() {
    const singIn = new SignIn({
      valid: _.debounce(this.valid.bind(this), 200),
      postSignIn: this.postSignIn.bind(this),
      changePath: this.changePath.bind(this),
    }).render();

    const toaster = new Toaster({
      ...this.state,
      type: 'failed',
      message: '로그인에 실패했습니다',
      changePath: this.changePath,
      changeIsToasterShowing: this.changeIsToasterShowing.bind(this),
    }).render();

    return `
      ${singIn}
      ${this.state.isToastShowing ? toaster : ''}
    `;
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

  changeIsToasterShowing() {
    isToastShowing = !isToastShowing;
    this.setState({ isToastShowing });
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
      await axios.post(`api${this.props.path}`, { email, password });
      console.log('[Toaster] 로그인 성공');
      this.changePath('/');
    } catch (error) {
      this.changeIsToasterShowing();
      console.log('[Toaster] 가입된 정보가 없습니다');
    }
  }
}

export default SignInPage;
