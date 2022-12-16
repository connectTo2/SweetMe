// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import Component from '../core/Component';
import SignIn from '../component/SignIn';

/**
 * - SignIn component에서 domString을 받아와서 반환하는 render 메서드 구현
- SignIn component 호출시 props로 이벤트 핸들러 함수 전달
- SignIn component에서 사용될 input 이벤트 핸들러 구현
- SignIn component에서 사용될 submit 이벤트 핸들러 구현
- 로그인시 유효성 검사를 진행할 함수 구현
 */

class SignInPage extends Component {
  state = {};

  constructor(props) {
    super(props);

    // eslint-disable-next-line no-constructor-return
    return (async () => {
      const { data: userInfo } = await axios.get('/api');
      console.log(userInfo);
      this.state = { userInfo };
      return this;
    })();
  }

  render() {
    return `${new SignIn({ test: this.test.bind(this) }).render()}`;
  }

  // 하위 컴포넌트의 state를 변경하는 메서드들 등록
  test(e) {
    console.log(e);
  }
}

export default SignInPage;
