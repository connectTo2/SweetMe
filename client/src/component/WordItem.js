import { wordItem, input, wordInput, removeIcon, covered } from '../css/WordList.module.css';
import Component from '../core/Component';

class WordItem extends Component {
  render() {
    const { wordId, word, wordDescription, currentFilter } = this.props;

    return `
      <li class="${wordItem}" data-id="${wordId}">
        <input
          type="text"
          name="word"
          class="${input} ${wordInput} ${currentFilter === 'descriptionOnly' ? covered : ''}"
          placeholder="단어 입력"
          value="${word ?? ''}"
        />
        <input
          type="text"
          name="wordDescription"
          class="${input} wordDescriptionInput ${currentFilter === 'wordOnly' ? covered : ''}"
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
