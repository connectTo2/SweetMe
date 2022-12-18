import Component from '../core/Component';
import { vocaItem, link, vocaTitle, description, remove } from '../css/VocaItem.module.css';

class VocaItem extends Component {
  render() {
    const { title, vocaDescription, vocaId } = this.props.vocaInfo;

    // prettier-ignore
    return `
      <li data-id="${vocaId}" class="${vocaItem}">
        <a href="/wordlist" class="${link}"> 
          <h3 class="${vocaTitle}">${title}</h3>
          <p class="${description}">${vocaDescription}</p>
        </a>
        <button class="${remove}" >
          <i class='bx bx-x'></i> 
        </button>
      </li>
      `;
  }

  addEventListener() {
    const { routeDetailPage } = this.props;

    return [{ type: 'click', selector: `.${vocaItem}`, handler: routeDetailPage }];
  }
}

export { VocaItem, vocaTitle, remove };
