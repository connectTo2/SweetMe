/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import Component from '../core/Component';
import { VocaList } from '../component/VocaList';
import { PopupModal } from '../component/PopupModal';
import { vocaTitle } from '../component/VocaItem';

// removeKeyword를 상태로 관리한다.
let removeKeyword = '';
let removeVocaId = '';
class VocaListPage extends Component {
  state = {};

  constructor() {
    super();
    // eslint-disable-next-line no-constructor-return
    return (async () => {
      try {
        // voca 데이터를 받아온 후 state에 저장한다.
        const { name, voca, wordsCount } = await (await axios.get('/api')).data; // 서버데이터 -> state
        this.state = { name, voca, wordsCount, removeKeyword, removeVocaId };
        return this;
      } catch (e) {
        console.error(e);
      }
    })();
  }

  render() {
    // VocaList Component
    const vocaList = new VocaList({
      ...this.state,
      routeWordlistPage: this.routeWordlistPage.bind(this),
      routeDetailPage: this.routeDetailPage.bind(this),
      confirmModal: this.confirmModal.bind(this),
    }).render();

    // modal Component
    const popupModal = new PopupModal({
      ...this.state,
      closeModal: this.closeModal.bind(this),
      removeVocaItem: this.removeVocaItem.bind(this),
    }).render();

    return `
    ${vocaList}
    ${popupModal}
    `;
  }

  // +버튼을 누르면 wordlist 페이지로 이동해야한다.
  routeWordlistPage(e) {
    e.preventDefault();
    // console.log(e.target);
  }

  // 단어장을 누르면 해당 단어장의 wordlist 페이지로 이동해야한다.
  routeDetailPage(e) {
    e.preventDefault();
    // console.log(e.target);
  }

  // x 버튼을 누르면 삭제할 것인지에 한 번 더 확인하는 모달 컴포넌트가 생성되어야 한다.
  confirmModal(e) {
    removeKeyword = e.target.closest('li').querySelector(`.${vocaTitle}`).textContent;
    removeVocaId = e.target.closest('li').dataset.id;

    this.setState({ ...this.state, removeKeyword, removeVocaId });
  }

  // 모달 컴포넌트의 '아니오'를 클릭하면 모달 컴포넌트가 사라져야한다.
  closeModal() {
    removeKeyword = '';
    this.setState({ ...this.state });
  }

  // 모달 컴포넌트의 '예'를 클릭하면 removeVocaId를 가지고 DELETE 메서드를 요청한다.
  async removeVocaItem(e) {
    const { name, voca, wordsCount } = await (await axios.delete(`/api/${removeVocaId}`)).data;
    removeKeyword = '';
    removeVocaId = '';
    this.setState({ name, voca, wordsCount, removeKeyword, removeVocaId });
  }
}

export default VocaListPage;
