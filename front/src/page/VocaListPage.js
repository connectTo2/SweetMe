/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import Component from '../core/Component';
import User from '../component/User';
import { VocaList } from '../component/VocaList';
import { PopupModal } from '../component/PopupModal';
import { vocaTitle } from '../component/VocaItem';

// removeKeyword를 상태로 관리한다.
// TODO: 네이밍리팩토링필요
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
        const { data: userInfo } = await axios.get('/');
        const { name, voca } = userInfo;
        this.state = { name, voca, removeKeyword, removeVocaId };

        return this;
      } catch (e) {
        console.error(e);
      }
    })();
  }

  render() {
    // user Component
    const user = new User({ ...this.state }).render();

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
      ${user}
      ${vocaList}
      ${popupModal}
     `;
  }

  // +버튼을 누르면 wordlist 페이지로 이동해야한다.
  routeWordlistPage(e) {}

  // 단어장을 누르면 해당 단어장의 wordlist 페이지로 이동해야한다.
  routeDetailPage(e) {}

  // x 버튼을 누르면 삭제할 것인지에 한 번 더 확인하는 모달 컴포넌트가 생성되어야 한다.
  // TODO: Refactoring Naming
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
  // TODO: removeKeyword, removeVocaId 로직 리팩토링 필요
  async removeVocaItem() {
    const { data: userInfo } = await axios.delete(`/api/${removeVocaId}`);
    const { name, voca } = userInfo;

    removeKeyword = '';
    removeVocaId = '';

    this.setState({ name, voca, removeKeyword, removeVocaId });
  }
}

export default VocaListPage;
