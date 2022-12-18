/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import Component from '../core/Component';
import { VocaList, vocaList } from '../component/VocaList';
import { PopupModal, hide, popup } from '../component/PopupModal';
import { vocaTitle } from '../component/VocaItem';

class VocaListPage extends Component {
  state = {};

  constructor() {
    super();
    // eslint-disable-next-line no-constructor-return
    return (async () => {
      try {
        // voca 데이터를 받아온 후 state에 저장한다.
        const vocaInfo = await (await axios.get('/api')).data; // voca에 대한 정보
        this.state = { vocaInfo };
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

    // // PopupModal Component
    // const popUpModal = new PopupModal({
    //   ...this.state,
    //   closeModal: this.closeModal.bind(this),
    //   // removeVocaItem: this.removeVocaItem.bind(this),
    // }).render();

    return `
    ${vocaList}
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
    const removeKeyword = e.target.closest('li').querySelector(`.${vocaTitle}`).textContent;
    // document.querySelector('.modalKeyword').textContent = removeKeyword;
    // document.querySelector(`.${popup}`).classList.remove(`${hide}`);
    console.log(e.target);
    const modalDomString = new PopupModal({ removeKeyword }).render();
    document.querySelector(`.${vocaList}`).innerHTML += modalDomString;
  }

  // 모달 컴포넌트의 '아니오'를 클릭하면 모달 컴포넌트가 사라져야한다.
  closeModal(e) {}

  // // 모달 컴포넌트의 '예'를 클릭하면
  // // 1. 클릭한 x버튼을 포함한 li의 dataset.id를 찾는다.
  // // (여기서 고려해야할 것: cofirmRemoveModal 이벤트는 VocaList 컴포넌트가 가지고 있다.
  // // 모달 컴포넌트가 yes를 누를 때 그 아이템의 id를 어떻게 전달 받을 것인가? )
  // // 2. 서버에 DELETE/:vocaId 메서드를 요청한다.
  // // 3. vocaListPage를 리렌더링한다.
  // async removeVocaItem(e) {
  //   const data = await axios.delete(`/${removeId}`);
  //   this.setState({ data });
  // }
}

export default VocaListPage;
