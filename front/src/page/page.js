// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import Component from '../core/Component';

// state와 fetchData 함수 등 구조 참고하시면 됩니다.
class Page extends Component {
  // Component에 props 넘어옵니다. 각 페이지마다 필요한 props 확인해서 사용하기!
  state = {};

  constructor() {
    super();

    /**
     * 페이지가 호출되면 서버에서 usersInfo 데이터를 요청한다.
     * state에 전달받은 데이터를 저장한 뒤 Promise 객체에 this를 담아 반환한다.
     */
    // eslint-disable-next-line no-constructor-return
    return (async () => {
      try {
        const { data: usersInfo } = await axios.get('/user');
        this.state = { usersInfo };
        return this;
      } catch (e) {
        console.error(e);
      }
    })();
  }

  render() {
    return ``;
  }

  // 하위 컴포넌트의 state를 변경하는 메서드들 등록
}

export default Page;
