import Component from './core/Component';
import SignInPage from './page/SignInPage';
import SignUpPage from './page/SignUpPage';
import VocaListPage from './page/VocaListPage';
import WordListPage from './page/WordListPage';
import GamePage from './page/GamePage';

class App extends Component {
  constructor() {
    super();

    /**
     * 페이지별로 state를 변경하는 함수가 다르다. 따라서 page를 검색할 때 page에 해당하는 함수를 props로 함께 넘겨줘야 한다.
     * @type { {path: string, page: class, func: Array } }
     */
    this.routes = [
      { path: '/', page: VocaListPage },
      { path: '/signin', page: SignInPage },
      { path: '/signup', page: SignUpPage },
      { path: '/wordlist', page: WordListPage },
      { path: '/game', page: GamePage },
    ];
    this.state = { path: '/' };
  }

  /** 현재 path를 확인해서 routes 객체에 담긴 컴포넌트의 render 메서드를 호출하고, 반환받은 domString을 모아서 반환하는 함수 */
  render() {
    const curretPath = this.path ?? window.location.pathname;
    const { page } = this.routes.find(({ path }) => path === curretPath);

    // eslint-disable-next-line new-cap
    return new page().render();
  }
}

export default App;
