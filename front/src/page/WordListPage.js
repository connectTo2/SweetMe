// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import _ from 'lodash';
import Component from '../core/Component';
import WordList from '../component/WordList';

class WordListPage extends Component {
  state = {};

  vocaItem = {};

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
    const wordList = new WordList({
      ...this.state,
      patchWordList: _.debounce(this.patchWordList.bind(this), 200),
      addWordList: this.addWordList.bind(this),
      removeWordList: this.removeWordList.bind(this),
    }).render();
    console.log('[render]', this.state);

    return `${wordList}`;
  }

  #changeWords(name, value, wordId) {
    return this.state.words.map(word =>
      word.wordId === wordId ? (value ? { ...word, [name]: value } : { ...word, [name]: '' }) : { ...word }
    );
  }

  // eslint-disable-next-line class-methods-use-this
  async patchWordList(e) {
    const { name, value } = e.target;
    const wordId = e.target.closest('li')?.dataset.id;

    // wordId가 있을 경우 title, description의 Input이 아니라 단어 각각의 input이다.
    const newVocaItem = wordId
      ? { ...this.state, words: this.#changeWords(name, value, wordId) }
      : value
      ? { ...this.state, [name]: value }
      : { ...this.state, [name]: '' };

    const { data: userVocaItem } = await axios.patch(`/api/wordlist/${this.state.vocaId}`, newVocaItem);
    this.setState(userVocaItem);
  }

  // WordList의 + 버튼 클릭 이벤트 발생시 서버에 words 배열에 새로운 word 추가: {wordId: string(날짜), word: '', wordDescription: ''}
  async addWordList() {
    // eslint-disable-next-line no-undef
    const wordId = `${Date.now()}`;
    const newVocaItem = { ...this.state, words: [...this.state.words, { wordId, word: '', wordDescription: '' }] };

    const { data: userVocaItem } = await axios.patch(`/api/wordlist/${this.state.vocaId}`, newVocaItem);
    this.setState(userVocaItem);
  }

  // WordItem의 x 버튼 클릭시 서버에서 삭제
  async removeWordList(e) {
    // eslint-disable-next-line no-undef
    const wordId = e.target.closest('li').dataset.id;

    const { data: newVocaItem } = await axios.delete(`/api/wordlist/${this.state.vocaId}?wordId=${wordId}`);
    this.setState(newVocaItem);
  }
}

export default WordListPage;
