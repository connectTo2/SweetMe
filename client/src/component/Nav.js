import axios from 'axios';
import Component from '../core/Component';
import { outlineButton } from '../css/common.module.css';
import { nav, navList, navLink } from '../css/Nav.module.css';

class Nav extends Component {
  render() {
    // prettier-ignore
    return `
      <nav class="${nav}">
        <ul class="${navList}">
          <li>
            <a href="/" class="list ${navLink} ${outlineButton}">단어장 목록</a>
          </li>
          <li>
           <a href="/signin" class="logout ${navLink} ${outlineButton}">로그아웃</a>
          </li>
        </ul>
      </nav>
    `
  }

  addEventListener() {
    const { changePath } = this.props;
    return [
      {
        type: 'click',
        selector: '.list',
        handler: e => {
          changePath(e.target.pathname);
        },
      },
      {
        type: 'click',
        selector: '.logout',
        handler: async e => {
          await axios.get('/api/signout');
          changePath(e.target.pathname);
        },
      },
    ];
  }
}

export default Nav;
