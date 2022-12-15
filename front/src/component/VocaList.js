import Component from '../core/Component';
import VocaItem from './VocaItem';
import { vocaList, link, plusItem, plusButton } from '../css/VocaList.module.css';

class VocaList extends Component {
  render() {
    // prettier-ignore
    // TODO: 받은 데이터를 통해 VocaItem 컴포넌트에게 전달해주어야한다. (voca.title, voca.vocaDescription)
    return `
      <ul class="${vocaList}">
        <!-- vocaItem component rendering -->

        <li class="${plusItem}">
          <a class="${link}" href="#">
            <button class="${plusButton}">
              <i class="bx bx-plus"></i>
            </button>
          </a>
        </li>
      </ul>`
  }
}
