import Component from '../core/Component';
import Toaster from '../component/Toaster';

// Toaster가 띄워져 있는지를 상태로 관리
let isToastShowing = false;
// Toaster를 사용할 페이지
class Page extends Component {
  constructor() {
    super();

    this.state = { isToastShowing };
  }

  render() {
    // const singin = new SignIn({
    //   ...this.state,
    //   showToaster: this.showToaster.bind(this),
    // }).render();

    // Toaster 호출
    return `
      ${isToastShowing ? new Toaster({ type: 'success', message: '회원가입에 성공했습니다!' }).render() : ''}}
    `;
  }

  // 사용방법 두가지
  // 1. showToaster 함수를 만들고 props로 넘겨질 함수에서 호출
  // 2. showToaster 함수를 props로 직접 전달하고 이벤트에 바인딩하여 이벤트 발생시 호출되도록 함.

  // 토스터를 생성하고, 일정시간 뒤 삭제해주는 함수
  showToaster(duration) {
    isToastShowing = true;
    this.setState({ ...this.state });

    setTimeout(() => {
      isToastShowing = false;
      this.setState({ ...this.state });
    }, duration);
  }
}

export default Page;
