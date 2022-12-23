import axios from 'axios';
import Component from '../core/Component';

class Nav extends Component {
  render() {
    // prettier-ignore
    return `
      <nav>
        <ul>
          <li>
            <a href="/" class="link">단어장 목록</a>
          </li>
          <li >
           <a href="/signin" class="logout">로그아웃</a>
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
        selector: '.link',
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
