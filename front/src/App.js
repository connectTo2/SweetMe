import render from './dom/render';
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
      { path: /^\/signin$/, page: SignInPage },
      { path: /^\/signup$/, page: SignUpPage },
      { path: /^\/wordlist$/, page: WordListPage },
      { path: /^\/wordlist\/[0-9]+/, page: WordListPage },
      { path: /^\/game$/, page: GamePage },
    ];
    this.path = '/signin';
  }

  /**
   * @type { (newPath: string) => void }
   * 현재 path를 상태로 관리하여, 하위 컴포넌트들이 path를 변경할 수 있도록 path와 changePath를 props로 전달한다.
   * changePath가 호출되며 새로운 path를 인수로 전달 받으면, App이 가지고 있는 path 프로퍼티 값이 변경되고 주소창의 url이 변경된 후 리렌더링이 일어난다.
   * TODO: 상태로 관리되는 것은 state라고 명시해주는 것이 좋다고 했다. this.path 또한 state로 명시해주는게 좋지 않을까?
   */
  changePath(newPath) {
    this.path = newPath;
    window.history.pushState(null, null, this.path);
    render();
  }

  /** 현재 path를 확인해서 routes 객체에 담긴 컴포넌트의 render 메서드를 호출하고, 반환받은 domString을 모아서 반환하는 함수 */
  render() {
    console.log('[path]', this.path);
    const { page } = this.routes.find(({ path }) => path.test(this.path));
    console.log('[page]', page);

    /**
     * 서버에 저장되어 있는 단어장(Wordlist)의 경우, vocaId를 사용하기 때문에 /WordList url에 path에 vocaId가 path에 추가되어 들어오게 된다.
     * vocaId만 숫자형태의 문자열로 이뤄져있기 때문에 정규표현식으로 숫자를 검색해서 vocaId를 분리하여 페이지를 호출할 때 props에 추가하여 전달한다.
     */
    const vocaId = this.path.match(/^[0-9]+$/);
    const url = vocaId
      ? { path: this.path, vocaId, changePath: this.changePath.bind(this) }
      : { path: this.path, changePath: this.changePath.bind(this) };

    /**
     * new page()는 promise를 반환한다. 따라서 promise가 successful된 결과인 pageInstance의 render 메서드를 호출하기 위해서는 두 가지 방법이 있다.
     * 1. App의 render 메서드를 async 함수로 만들고, App의 render 메서드를 호출하는 dom 폴더의 render 함수 또한 async 함수로 만들어 실행 순서를 동기적으로 보장해준다.
     * 2. App에서 렌더링이 이뤄질 root 요소를 지정하여, then 체이닝을 통해 실행 순서를 보장하는 방법을 이용한다.
     * 우리는 dom 폴더의 render 함수에 의해 App의 render 메서드가 호출되었을 때 promise가 아닌 domString을 반환해야 하기 때문에 2번의 then 체이닝을 사용할 수 없다.
     * 따라서 1번 방법을 사용하여, dom 폴더의 render 함수와 App의 render 메서드를 모두 async 함수로 만든다.
     */
    return (async () => {
      // eslint-disable-next-line new-cap
      const pageInstance = await new page(url);
      return pageInstance.render();
    })();
  }
}

export default App;
