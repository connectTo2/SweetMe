import { wordItem, input, wordInput, removeIcon } from '../css/WordList.module.css';
import Component from '../core/Component';

class WordItem extends Component {
  render() {
    const { wordId, word, wordDescription } = this.props;

    return `
      <li class="${wordItem}" data-id="${wordId}">
        <input
          type="text"
          name="word"
          class="${input} ${wordInput}"
          placeholder="단어 입력"
          value="${word ?? ''}"
        />
        <input
          type="text"
          name="wordDescription"
          class="${input} wordDescriptionInput"
          placeholder="뜻 입력"
          value="${wordDescription ?? ''}"
        />
        <button type="button" class="removeWord">
          <i class="bx bx-x ${removeIcon}"></i>
        </button>
      </li>
    `;
  }

  addEventListener() {
    const { removeWordList } = this.props;
    return [{ type: 'click', selector: `.removeWord`, handler: removeWordList }];
  }
}

export default WordItem;
