import { title, description, outlineButton } from '../css/common.module.css';
import { input, buttonWrapper, addWord, addIcon } from '../css/WordList.module.css';
import WordItem from './WordItem';

class WordList {
  render() {
    return `
      <header>
        <h2>
          <input
            type="text"
            name="title"
            class="${input} ${title}"
            placeholder="단어장 제목 입력"
          />
        </h2>
        <input
          type="text"
          name="description"
          class="${input} ${description}"
          placeholder="단어장에 대한 설명 입력"
        />
      </header>

      <div class="content">
        <div class="${buttonWrapper}">
          <button type="button" class="${outlineButton} active full">전체</button>
          <button type="button" class="${outlineButton} wordOnly">단어만</button>
          <button type="button" class="${outlineButton} descriptionOnly">
            뜻만
          </button>
        </div>

        <ul class="wordList">
          ${new WordItem().render()}
        </ul>

        <button class="${addWord}">
          <i class='bx bx-plus ${addIcon}'></i>
        </button>
      </div>
    `;
  }
}

export default WordList;
