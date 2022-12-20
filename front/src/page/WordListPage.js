// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import Component from '../core/Component';
import WordList from '../component/WordList';

class WordListPage extends Component {
  state = {};

  constructor(props) {
    super(props);

    /**
     * 페이지가 호출되면 서버에서 usersInfo 데이터를 요청한다.
     * state에 전달받은 데이터를 저장한 뒤 Promise 객체에 this를 담아 반환한다.
     */
    // eslint-disable-next-line no-constructor-return
    return (async () => {
      try {
        const { data: vocaItemInfo } = await axios.get(`/api/wordlist/${this.props.vocaId}`);
        this.state = { ...vocaItemInfo };
        console.log(this.state);
        return this;
      } catch (e) {
        console.error(e);
      }
    })();
  }

  render() {
    const wordList = new WordList({
      ...this.state,
    }).render();

    return `${wordList}`;
  }

  // 하위 컴포넌트의 state를 변경하는 메서드들 등록
}

export default WordListPage;
