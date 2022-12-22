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
    /**
     * 페이지가 호출되면 서버에서 usersInfo 데이터를 요청한다.
     * state에 전달받은 데이터를 저장한 뒤 Promise 객체에 this를 담아 반환한다.
     */
    // eslint-disable-next-line no-constructor-return
    return (async () => {
      try {
        /** @type {data: {title: String, vocaDescription: String, vocaId: String, words: Array<{wordId: String, word: String, wordDescription: String}>}}  */
        const { data } = await axios.get(`/api/wordlist/${this.props.vocaId}`);
        this.vocaItem = data;

        // TODO: vocaItem이 아무것도 안들어오면 changePath(Not Found)
        this.vocaItem ? (this.state = { ...this.vocaItem }) : console.log('[404 Not Found]');

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

    return `${wordList}`;
  }

  #changeWords(name, value, wordId) {
    return this.state.words.map(word =>
      word.wordId === wordId ? (value ? { ...word, [name]: value } : { ...word, [name]: '' }) : { ...word }
    );
  }

  // TODO: wordList랑 wordItem이 따로 놈...
  // eslint-disable-next-line class-methods-use-this
  // input 바꾸면 수정하는 놈
  async patchWordList(e) {
    const { name, value } = e.target;
    const wordId = e.target.closest('li')?.dataset.id;

    console.log('e.target', e.target);
    console.log('wordId', wordId);

    const newVocaItem = wordId
      ? { ...this.state, words: this.#changeWords(name, value, wordId) }
      : value
      ? { ...this.state, [name]: value }
      : { ...this.state, [name]: '' };

    console.log('newVocaItem', newVocaItem);

    await axios.patch(`/api/wordlist/${this.state.vocaId}`, newVocaItem);
    this.setState(newVocaItem);
  }

  // WordList의 + 버튼 클릭 이벤트 발생시 서버에 words 배열에 새로운 word 추가: {wordId: string(날짜), word: '', wordDescription: ''}
  // 단어리스트 생성하는 놈
  async addWordList() {
    // eslint-disable-next-line no-undef

    const wordId = `${Date.now()}`;
    const newVocaItem = { ...this.state, words: [...this.state.words, { wordId, word: '', wordDescription: '' }] };

    await axios.patch(`/api/wordlist/${this.state.vocaId}`, newVocaItem);

    this.setState(newVocaItem);
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
