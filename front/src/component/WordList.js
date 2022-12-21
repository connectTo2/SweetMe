import { title, description, outlineButton } from '../css/common.module.css';
import { input, wordList, buttonWrapper, addWord, addIcon } from '../css/WordList.module.css';
import Component from '../core/Component';
import WordItem from './WordItem';

class WordList extends Component {
  render() {
    const vocaTitle = this.props.title;
    const { vocaDescription, words, removeWordList } = this.props;

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
          name="description"
          class="${input} ${description}"
          placeholder="단어장 설명 입력"
          value="${vocaDescription ?? ''}"
        />
      </header>

      <div class="content">
        <div class="${buttonWrapper}">
          <button type="button" class="${outlineButton} full active">전체</button>
          <button type="button" class="${outlineButton} wordOnly">단어만</button>
          <button type="button" class="${outlineButton} descriptionOnly">
            뜻만
          </button>
        </div>

        <ul class="${wordList}">
          ${words.map(word => new WordItem({
              ...word, 
              removeWordList
            }).render()).join('')}
        </ul>

        <button class="${addWord}">
          <i class='bx bx-plus ${addIcon}'></i>
        </button>
      </div>
    `;
  }

  addEventListener() {
    const { patchWordList, addWordList } = this.props;
    return [
      { type: 'input', selector: `.${input}`, handler: patchWordList },
      { type: 'click', selector: `.${addWord}`, handler: addWordList },
    ];
  }
}

export default WordList;
