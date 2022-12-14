import Component from '../core/Component';
import { vocaItem, title, description, remove } from '../css/VocaItem.module.css';

class VocaItem extends Component {
  render() {
    // prettier-ignore
    // TODO: a 태그 내의 url은 이후 수정 필요
    return `
      <li class="${vocaItem}">
        <a href="/wordlist"> 
          <h3 class="${title}">개발용어</h3>
          <p class="${description}">개발 용어만 모아둔 단어장. 세계 최고의 개발자가 될거야</p>
        </a>
        <button class="${remove}">
          <box-icon type='solid' name='trash'></box-icon>
        </button>
      </li>`;
  }
}

export default VocaItem;
