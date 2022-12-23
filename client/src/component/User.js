import { title, description } from '../css/common.module.css';
import { RegisteredWord } from '../css/User.module.css';
import Component from '../core/Component';

class User extends Component {
  render() {
    return `
      <h1 class="${title}">${this.props.name}</h1>
      <p class="${RegisteredWord} ${description}">등록한 단어: ${this.countWords()}개</p>
    `;
  }

  countWords() {
    return this.props.voca.map(item => item.words.length).reduce((acc, cur) => acc + cur, 0);
  }
}

export default User;
