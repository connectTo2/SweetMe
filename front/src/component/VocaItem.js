import Component from '../core/Component';
import { vocaItem, link, vocaTitle, description, remove } from '../css/VocaItem.module.css';

class VocaItem extends Component {
  render() {
    const { title, vocaDescription, vocaId } = this.props.vocaInfo;
    // prettier-ignore

    return `
      <li data-id="${vocaId}" class="${vocaItem}">
        <a href="/wordlist" class="${link}"> 
          <h3 class="${vocaTitle}">${title || 'untitle'} </h3>
          <p class="${description}">${vocaDescription || 'untitle'}</p>
        </a>
        <button class="${remove}" >
          <i class='bx bx-x'></i> 
        </button>
      </li>
      `;
  }

  addEventListener() {
    const { changePath } = this.props;

    return [
      {
        type: 'click',
        selector: `.${link}`,
        handler: e => {
          const vocaItemId = e.target.closest('li').dataset.id;
          changePath(`/wordlist/${vocaItemId}`);
        },
      },
    ];
  }
}

export { VocaItem, vocaTitle, remove };
