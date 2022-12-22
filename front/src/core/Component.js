import { render, eventHolder } from '../dom/index';

class Component {
  constructor(props) {
    this.props = props;
    this.#holdEvents();
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    render();
  }

  /**
   * @private
   * Component의 constructor가 호출될 때만 holdEvents 메서드가 호출되면 되므로, 자식 class에게 상속하지 않는다.
   */
  #holdEvents() {
    // 이벤트가 중복 등록되지 않도록 체크하는 holdEvents 메서드 생성
    const events = this.addEventListener?.();
    if (!events) return;

    for (const event of events) {
      const { selector, handler } = event;

      if (selector === 'window' || selector === null) {
        eventHolder.push(event);
        // eslint-disable-next-line no-continue
        continue;
      }

      const duplication = eventHolder.find(({ type, selector }) => type === event.type && selector === event.selector);

      if (!duplication) {
        event.handler = e => {
          e.preventDefault();
          if (e.target.closest(selector)) handler(e);
        };

        eventHolder.push(event);
      }
    }
  }

  /**
   * @abstract
   * 자식 컴포넌트가 render 메서드를 가지고 있지 않다는 에러를 띄우기 위한 목적으로 사용된다.
   * 컴포넌트들을 props 방식으로 만들고 있기 때문에, 자식 컴포넌트들은 모두 render 메서드를 가져야 한다.
   */
  // eslint-disable-next-line class-methods-use-this
  render() {
    throw new Error('컴포넌트가 render 메서드를 가지고 있지 않습니다. 생성해주세요.');
  }
}

export default Component;
