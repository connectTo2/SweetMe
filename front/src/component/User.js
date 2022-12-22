import { title, description } from '../css/common.module.css';
import { RegisteredWord } from '../css/User.module.css';
import Component from '../core/Component';

class User extends Component {
  render() {
    const { name } = this.props;

    return `
      <h1 class="${title}">${name}</h1>
      <p class="${RegisteredWord} ${description}">등록한 단어: ${this.countWords()}개</p>
    `;
  }

  countWords() {
    const { voca } = this.props;

    return voca.map(item => item.words.length).reduce((acc, cur) => acc + cur, 0);
  }
}

export default User;
