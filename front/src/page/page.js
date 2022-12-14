import Component from '../core/Component';
import fetchData from '../api/fetchData';

// state와 fetchData 함수 등 구조 참고하시면 됩니다.
class Page extends Component {
  state = {};

  constructor() {
    super();

    fetchData().bind(this);
  }

  render() {
    return ``;
  }

  // 하위 컴포넌트의 state를 변경하는 메서드들 등록
}
