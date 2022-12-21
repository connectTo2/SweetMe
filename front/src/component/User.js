import Component from '../core/Component';
import { userName, RegisteredWord } from '../css/User.module.css';

class User extends Component {
  render() {
    const { name } = this.props;

    return `
     <h1 class="${userName}">${name}</h1>
     <span class="${RegisteredWord}">등록한 단어: ${this.countRegistredWord()}개</span>
    `;
  }

  countRegistredWord() {
    // const { voca } = this.props; // [{…}, {…}]
    // TODO: refactoring 필요
    // voca는 배열이다. map 함수를 이용해 words.length를 확인한 후 reduce 고차함수를 이용해 합을 계산한다.
    // const counting = voca.map(item => item.words.length).reduce((acc, cur) => acc + cur, 0);
    // return counting;
  }
}

export default User;
