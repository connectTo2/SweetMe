import { toaster, signinText, closeToaster } from '../css/Toaster.module.css';
import Component from '../core/Component';

class Toaster extends Component {
  render() {
    const { type, message } = this.props;

    return `
      <div class="${toaster} ${type}">
        <p class="${signinText}">${message}</p>
        <button class="${closeToaster}">
          <i class='bx bx-x'></i>
        </button>
      </div>
    `;
  }

  addEventListener() {
    const { changePath, changeIsToasterShowing, pageUrl } = this.props;

    return [
      {
        type: 'click',
        selector: `.${closeToaster}`,
        handler: () => (pageUrl ? changePath(pageUrl) : changeIsToasterShowing()),
      },
    ];
  }
}

export default Toaster;
