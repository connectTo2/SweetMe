/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import Component from '../core/Component';
import VocaList from '../component/VocaList';

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
    const vocaList = new VocaList({
      ...this.state,
      routeWordlistPage: this.routeWordlistPage.bind(this),
      routeDetailPage: this.routeDetailPage.bind(this),
    }).render();
    return `${vocaList} `;
  }

  // +버튼을 누르면 wordlist 페이지로 이동해야한다.
  routeWordlistPage(e) {
    e.preventDefault();
    console.log(e.target);
  }

  // 단어장을 누르면 해당 단어장의 wordlist 페이지로 이동해야한다.
  routeDetailPage(e) {
    e.preventDefault();
    console.log(e.target);
  }
}

export default VocaListPage;
