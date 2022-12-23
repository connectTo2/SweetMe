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

  // TODO: postSignIn이라는 네이밍이 괜찮은지 코드 리뷰
  async postSignIn() {
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;

    try {
      await axios.post(`api${this.props.path}`, { email, password });
      this.changePath('/');
    } catch (error) {
      this.changeIsToasterShowing();
    }
  }
}

export default SignInPage;
