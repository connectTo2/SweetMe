import { hide } from '../css/common.module.css';
import { vocaList, plusVocaItem, plusItem, plusIcon } from '../css/VocaList.module.css';
import { popup, modalTitle, button, outlineButtonDark } from '../css/PopupModal.module.css';
import Component from '../core/Component';

/* -------------------------------- component ------------------------------- */
import { VocaItem } from './VocaItem';

class VocaList extends Component {
  render() {
    const { voca, title } = this.props;

    // prettier-ignore
    return `
      <ul class="${vocaList}">
        ${voca.map(vocaInfo => new VocaItem({...this.props, vocaInfo}).render()).join('')}
        <li class="${plusItem}">
          <button class="${plusVocaItem}">
              <i class="bx bx-plus ${plusIcon}"></i>
          <button>
        </li>
      </ul>

      <!-- Modal Component -->
      <div class="${popup} ${title ? '' : hide}">
          <p class="${modalTitle}">"<strong class ="modalKeyword">${title}</strong>"를 정말 삭제하시겠습니까?</p>
        <div class="${button}">
          <button class="${outlineButtonDark} no">아니오</button>
          <button class="${outlineButtonDark} yes">예</button>
      </div>
    `;
  }

  addEventListener() {
    const { addVocaItem, closeModal, removeVocaItem } = this.props;

    return [
      { type: 'click', selector: `.${plusVocaItem}`, handler: addVocaItem },
      { type: 'click', selector: `.no`, handler: closeModal },
      { type: 'click', selector: `.yes`, handler: removeVocaItem },
    ];
  }
}

export default VocaList;
