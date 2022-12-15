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
     * @type { {path: RegExp, page: class } }
     * path가 'wordlist:vocaId'인 경우 WordListPage를 호출하면서 vocaId를 넘겨줘야 한다. -> WordListPage는 vocaId를 검색해서 뿌려주는 작업이 필요하다.
     */
    this.routes = [
      { path: /^\/$/, page: VocaListPage },
      { path: /^\signin/, page: SignInPage },
      { path: /^\/signup/, page: SignUpPage },
      { path: /^\/wordlist/, page: WordListPage },
      { path: /^\/wordlist\/[0-9]+/, page: WordListPage },
      { path: /^\/game/, page: GamePage },
    ];
    this.path = '/signin';
  }

  changePath(newPath) {
    this.path = newPath;
  }

  /** 현재 path를 확인해서 routes 객체에 담긴 컴포넌트의 render 메서드를 호출하고, 반환받은 domString을 모아서 반환하는 함수 */
  render() {
    const { page } = this.routes.find(({ path }) => path.test(this.path));

    /**
     * 서버에 저장되어 있는 단어장(Wordlist)의 경우, vocaId를 사용하기 때문에 /WordList url에 path에 vocaId가 path에 추가되어 들어오는게 된다.
     * vocaId만 숫자형태의 문자열로 이뤄져있기 때문에 정규표현식으로 숫자를 검색해서 vocaId를 분리하여 페이지를 호출할 때 props에 추가하여 전달한다.
     */
    const vocaId = /^[0-9]+$/.match(this.path);
    const url =
      this.path === '/signin' || this.path === '/signup'
        ? { path: this.path }
        : vocaId
        ? { path: this.path, vocaId, changePath: this.changePath }
        : { path: this.path, changePath: this.changePath };

    /**
     * new page()는 promise를 반환한다. 따라서 promise가 successful된 결과인 pageInstance의 render 메서드를 호출하기 위해서는 두 가지 방법이 있다.
     * 1. App의 render 메서드를 async 함수로 만들고, App의 render 메서드를 호출하는 dom 폴더의 render 함수 또한 async 함수로 만들어 실행 순서를 동기적으로 보장해준다.
     * 2. App에서 렌더링이 이뤄질 root 요소를 지정하여, then 체이닝을 통해 실행 순서를 보장하는 방법을 이용한다.
     * 우리는 SPA을 만들고 있기 때문에 페이지들의 진입점인 App이 렌더링이 이뤄질 root 요소를 알아도 된다고 판단했다.
     * 따라서 2번째 방법을 사용하여, 렌더링될 root 요소를 App에서 지정하고 then 체이닝을 사용한다. (document.getElementById('root'))
     */
    // eslint-disable-next-line new-cap
    return new page(url).then(pageInstance => {
      document.getElementById('root').innerHTML = pageInstance.render();
    });
  }
}

export default App;
