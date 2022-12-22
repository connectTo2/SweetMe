/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import Component from '../core/Component';
import User from '../component/User';
import { VocaList } from '../component/VocaList';
import { vocaTitle } from '../component/VocaItem';

// removeKeyword를 상태로 관리한다.
// TODO: 네이밍리팩토링필요
let removeKeyword = '';
let removeVocaId = '';
class VocaListPage extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.changePath = this.props.changePath;
    // eslint-disable-next-line no-constructor-return
    return (async () => {
      try {
        // voca 데이터를 받아온 후 state에 저장한다.
        const { data: userInfo } = await axios.get('/api');
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
      changePath: this.changePath,
      confirmModal: this.confirmModal.bind(this),
      addVocaItem: this.addVocaItem.bind(this),
      removeVocaItem: this.removeVocaItem.bind(this), // 모달 삭제를 위한 이벤트는 vocaList가 가지고 있어야한다.
      closeModal: this.closeModal.bind(this),
    }).render();

    return `
      ${user}
      ${vocaList}
     `;
  }

  /* ------------------------------- modal Event ------------------------------ */
  async addVocaItem() {
    const newVocaItem = {
      vocaId: `${Date.now()}`,
      title: '',
      vocaDescription: '',
      words: [],
    };

    const vocaItemId = newVocaItem.vocaId;
    await axios.post('/api', newVocaItem);

    this.changePath(`/wordlist/${vocaItemId}`);
  }

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
