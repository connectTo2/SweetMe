// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import _ from 'lodash';
import Component from '../core/Component';
import WordList from '../component/WordList';
import Nav from '../component/Nav';

class WordListPage extends Component {
  state = {};

  constructor(props) {
    super(props);
    // eslint-disable-next-line no-constructor-return
    return (async () => {
      try {
        /** @type {data: {title: String, vocaDescription: String, vocaId: String, words: Array<{wordId: String, word: String, wordDescription: String}>}}  */
        const { data: vocaItem } = await axios.get(`/api/wordlist/${this.props.vocaId}`);
        vocaItem ? (this.state = { ...vocaItem }) : console.log('[404 Not Found]');
        return this;
      } catch (e) {
        console.error(e);
      }
    })();
  }

  render() {
    const nav = new Nav({ changePath: this.props.changePath }).render();
    const wordList = new WordList({
      ...this.state,
      addWordList: this.addWordList.bind(this),
      patchWordList: _.debounce(this.patchWordList.bind(this), 200),
      removeWordList: this.removeWordList.bind(this),
    }).render();

    return `
      ${nav}
      ${wordList}
    `;
  }

  // input 이벤트 발생시 단어장 정보 변경
  async patchWordList(e) {
    const { name, value } = e.target;

    // closest('li')가 있다면 단어장 페이지에서 title, description이 아닌 word를 변경하는 input 이벤트이다.
    const wordId = e.target.closest('li')?.dataset.id;

    const { data: vocaItem } = await axios.patch(`/api/wordlist/${this.state.vocaId}`, { name, value, wordId });
    this.setState(vocaItem);
  }

  // WordList의 + 버튼 클릭 이벤트 발생시 새로운 단어 추가
  async addWordList() {
    const wordId = `${Date.now()}`;
    const newWord = { wordId, word: '', wordDescription: '' };

    const { data: vocaItem } = await axios.post(`/api/wordlist/${this.state.vocaId}`, newWord);
    this.setState(vocaItem);
  }

  // WordItem의 x 버튼 클릭시 서버에서 wordItem 삭제
  async removeWordList(e) {
    const wordId = e.target.closest('li').dataset.id;

    const { data: vocaItem } = await axios.delete(`/api/wordlist/${this.state.vocaId}?wordId=${wordId}`);
    this.setState(vocaItem);
  }
}

export default WordListPage;
