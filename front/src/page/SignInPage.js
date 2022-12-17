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
      valid: _.debounce(this.valid.bind(this)),
      checkUser: this.checkUser.bind(this),
      routeSignUpPage: this.changePath.bind(this),
    }).render()}`;
  }

  /** input 이벤트 발생시 유효성 검사를 진행할 함수 구현 */
  // eslint-disable-next-line class-methods-use-this
  valid(e) {
    signinSchema[e.target.name].value = e.target.value;
    signinSchema[e.target.name].valid
      ? e.target.nextElementSibling.classList.add(hide)
      : e.target.nextElementSibling.classList.remove(hide);

    document.querySelector(`.${submitButton}`).disabled = !signinSchema.valid;
  }

  /**
   * - submit 이벤트 발생시 서버에 user인지 확인 요청 보내고
   * - user면 VocaListPage('/')로 라우팅
   * - user가 아니면 toaster 메세지 띄우기
   * TODO: checkUser라는 네이밍이 괜찮은지 코드 리뷰
   */
  async checkUser(e) {
    e.preventDefault();
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;

    const isUser = await axios.post(`/api${this.props.path}`, { email, password });
    // TODO: 회원이 아니면 회원이 아니라고 toaster 띄우기
    // isUser ? this.changePath('/') : console.log('[Toaster] 가입된 정보가 없습니다');
    isUser ? console.log('[Toaster] 로그인 성공') : console.log('[Toaster] 가입된 정보가 없습니다');
  }

  /** changeSignPage 클릭 이벤트시 회원가입으로 라우팅 */
  // TODO: 라우트 구현시, a태그 클릭하면 href값을 인수로 전달하도록 만들기. -> changePath 함수에서 처음부터 공통으로 만드는게 좋을듯
  // TODO: changePath에서 pushState 메서드 호출
  routeSignUpPage(e) {
    e.preventDefault();
    this.changePath('/signup');
  }
}

export default SignInPage;
