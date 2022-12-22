import { title, description, outlineButton, active } from '../css/common.module.css';
import { input, wordList, buttonWrapper, addWord, addIcon } from '../css/WordList.module.css';
import Component from '../core/Component';
import WordItem from './WordItem';

let currentFilter = 'all';

class WordList extends Component {
  constructor(props) {
    super(props);

    this.filters = {
      all: '전체',
      wordOnly: '단어만',
      descriptionOnly: '뜻만',
    };
    this.state = { currentFilter };
  }

  render() {
    const vocaTitle = this.props.title;
    const { vocaDescription, words, removeWordList } = this.props;
    const { currentFilter } = this.state;

    // prettier-ignore
    return `
      <header>
        <h2>
          <input
            type="text"
            name="title"
            class="${input} ${title}"
            placeholder="단어장 제목 입력"
            value="${vocaTitle ?? ''}"
          />
        </h2>
        <input
          type="text"
          name="vocaDescription"
          class="${input} ${description}"
          placeholder="단어장 설명 입력"
          value="${vocaDescription ?? ''}"
        />
      </header>

      <div class="content">
        <div class="${buttonWrapper}">
          ${Object.keys(this.filters).map(key => `
            <button 
              type="button" 
              class="filterButton ${outlineButton} ${this.state.currentFilter === key ? active : ''}"
              data-filter="${key}"
            >${this.filters[key]}</button>
          `).join('')}
        </div>

        <ul class="${wordList}">
          ${words.map(word => new WordItem({
              ...word,
              removeWordList,
              currentFilter,
            }).render()).join('')}
        </ul>

        <button class="${addWord}">
          <i class='bx bx-plus ${addIcon}'></i>
        </button>
      </div>
    `;
  }

  filterWordList(e) {
    currentFilter = e.target.dataset.filter;
    this.setState({ currentFilter });
  }

  addEventListener() {
    const { patchWordList, addWordList } = this.props;
    return [
      { type: 'input', selector: `.${input}`, handler: patchWordList },
      { type: 'click', selector: `.${addWord}`, handler: addWordList },
      { type: 'click', selector: '.filterButton', handler: this.filterWordList.bind(this) },
    ];
  }
}

export default WordList;
