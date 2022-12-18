import Component from '../core/Component';
import { vocaList, link, plusItem, plusIcon } from '../css/VocaList.module.css';
import { VocaItem, remove } from './VocaItem';

class VocaList extends Component {
  render() {
    console.log(this.props);
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
      </ul>
      `
  }

  addEventListener() {
    const { routeWordlistPage, confirmModal } = this.props;

    return [
      { type: 'click', selector: `.${plusItem}`, handler: routeWordlistPage },
      { type: 'click', selector: `.${remove}`, handler: confirmModal },
    ];
  }
}

export { VocaList, vocaList, plusItem, remove };
