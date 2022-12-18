import Component from '../core/Component';
import { vocaList, link, plusItem, plusIcon } from '../css/VocaList.module.css';

/* -------------------------------- component ------------------------------- */
import { VocaItem, remove } from './VocaItem';

class VocaList extends Component {
  render() {
    console.log('[LIST]', this.props);
    const { routeDetailPage, voca } = this.props;

    // prettier-ignore
    return `
      <ul class="${vocaList}">
        ${voca.map(vocaInfo => new VocaItem({...this.props, routeDetailPage,vocaInfo}).render()).join('')}
        <li class="${plusItem}">
          <a href="/" class="${link}">
            <i class="bx bx-plus ${plusIcon}"></i>
          </a>
        </li>
      </ul>`
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
