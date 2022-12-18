import Component from '../core/Component';

// css module import
import { hide } from '../css/common.module.css';
import { popup, modalTitle, button, outlineButtonDark } from '../css/PopupModal.module.css';

// TODO: PopupModal.module.css 수정 필요

class PopupModal extends Component {
  render() {
    console.log(this.props);
    const { removeKeyword } = this.props;
    // prettier-ignore
    return `
      <div class="${popup}">
      <!-- "개발 용어"를 prop으로 받아서 보여줘야 합니다. -->
      <p class="${modalTitle}">"<strong class ="modalKeyword">${removeKeyword}</strong>"를 정말 삭제하시겠습니까?</p>
      <div class="${button}">
      <button class="${outlineButtonDark} no" >아니오</button>
      <button class="${outlineButtonDark} yes" >예</button>
      </div>`
  }

  addEventListener() {
    const { closeModal, removeVocaItem } = this.props;

    return [
      { type: 'click', selector: '.no', handler: closeModal },
      { type: 'click', selector: '.yes', handler: removeVocaItem },
    ];
  }
}

export { PopupModal, hide, popup, modalTitle };
