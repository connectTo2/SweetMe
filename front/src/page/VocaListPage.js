/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import Component from '../core/Component';
import User from '../component/User';
import VocaList from '../component/VocaList';
import { vocaTitle } from '../component/VocaItem';

// vocaItemToRemove를 상태로 관리한다.
const vocaItemToRemove = {
  title: '',
  vocaId: '',
};

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
        this.state = { name, voca, ...vocaItemToRemove };

        return this;
      } catch (e) {
        console.error(e);
      }
    })();
  }

  /* --------------------------------- render --------------------------------- */

  render() {
    const user = new User({ ...this.state }).render();

    const vocaList = new VocaList({
      ...this.state,
      changePath: this.changePath,
      checkToRemove: this.checkToRemove.bind(this),
      addVocaItem: this.addVocaItem.bind(this),
      closeModal: this.closeModal.bind(this),
      removeVocaItem: this.removeVocaItem.bind(this),
    }).render();

    return `
      ${user}
      ${vocaList}
    `;
  }

  /* ----------------------------- vocaItem event ----------------------------- */

  async addVocaItem() {
    const newVocaItem = {
      vocaId: `${Date.now()}`,
      title: '',
      vocaDescription: '',
      words: [],
    };

    await axios.post('/api', newVocaItem);
    this.changePath(`/wordlist/${newVocaItem.vocaId}`);
  }

  // 모달 컴포넌트의 '예'를 클릭하면 removeVocaId를 가지고 DELETE 메서드를 요청한다.
  async removeVocaItem() {
    const { data: userInfo } = await axios.delete(`/api/${vocaItemToRemove.vocaId}`);
    const { name, voca } = userInfo;

    vocaItemToRemove.title = '';
    vocaItemToRemove.vocaId = '';

    this.setState({ name, voca, ...vocaItemToRemove });
  }

  /* ------------------------------- modal Event ------------------------------ */

  // x 버튼을 누르면 삭제할 것인지에 한 번 더 확인하는 모달 컴포넌트가 생성되어야 한다.
  checkToRemove(e) {
    vocaItemToRemove.title = e.target.closest('li').querySelector(`.${vocaTitle}`).textContent;
    vocaItemToRemove.vocaId = e.target.closest('li').dataset.id;

    this.setState({ ...this.state, ...vocaItemToRemove });
  }

  // 모달 컴포넌트의 '아니오'를 클릭하면 모달 컴포넌트가 사라져야한다.
  closeModal() {
    vocaItemToRemove.title = '';
    this.setState({ ...this.state });
  }
}

export default VocaListPage;
