import Component from '../core/Component';
import VocaItem from './VocaItem';
import { vocaList, link, plusItem, plusIcon } from '../css/VocaList.module.css';

class VocaList extends Component {
  render() {
    const { routeDetailPage, vocaInfo } = this.props;

    // 받은 데이터를 통해 VocaItem 컴포넌트에게 전달해주어야한다. (voca.title, voca.vocaDescription)

    // prettier-ignore
    return `
      <ul class="${vocaList}">
        ${vocaInfo.map(vocaInfo => new VocaItem({...this.state, routeDetailPage, vocaInfo}).render()).join('')}
        <li class="${plusItem}">
          <a href="/" class="${link}">
            <i class="bx bx-plus ${plusIcon}"></i>
          </a>
        </li>
      </ul>`
  }

  addEventListener() {
    const { routeWordlistPage } = this.props;

    return [
      {
        type: 'click',
        selector: `.${plusItem}`,
        handler: routeWordlistPage,
      },
    ];
  }
}

export default VocaList;
