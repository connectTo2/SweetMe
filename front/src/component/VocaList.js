import Component from '../core/Component';
import { hide } from '../css/common.module.css';
import { vocaList, plusVocaItem, plusItem, plusIcon } from '../css/VocaList.module.css';
import { popup, modalTitle, button, outlineButtonDark } from '../css/PopupModal.module.css';

/* -------------------------------- component ------------------------------- */
import { VocaItem, remove } from './VocaItem';

class VocaList extends Component {
  render() {
    const { voca, removeKeyword } = this.props;

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
      <div class="${popup} ${removeKeyword ?  '' : `${hide}`}">
          <p class="${modalTitle}">"<strong class ="modalKeyword">${removeKeyword}</strong>"를 정말 삭제하시겠습니까?</p>
        <div class="${button}">
          <button class="${outlineButtonDark} no">아니오</button>
          <button class="${outlineButtonDark} yes">예</button>
      </div>
      `
  }

  // <li class="${plusItem}">
  //         <a href="/" class="${link}">
  //           <i class="bx bx-plus ${plusIcon}"></i>
  //         </a>
  //       </li>

  addEventListener() {
    const { addVocaItem, confirmModal, closeModal, removeVocaItem } = this.props;

    return [
      { type: 'click', selector: `.${plusItem}`, handler: addVocaItem },
      { type: 'click', selector: `.${remove}`, handler: confirmModal },
      { type: 'click', selector: `.no`, handler: closeModal },
      { type: 'click', selector: `.yes`, handler: removeVocaItem },
    ];
  }
}

export { VocaList, vocaList, plusItem, remove };
