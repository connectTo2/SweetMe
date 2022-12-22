import { toaster, signinText, closeToaster } from '../css/Toaster.module.css';
import Component from '../core/Component';

class Toaster extends Component {
  render() {
    console.log(this.props);
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
    // const pathToMove = this.props.pageUrl;
    const { changePath, changeIsToasterShowing, pageUrl } = this.props;

    return [
      {
        type: 'click',
        selector: `.${closeToaster}`,
        handler: () => {
          console.log('click x', pageUrl, typeof pageUrl);
          pageUrl ? changePath(pageUrl) : changeIsToasterShowing();
        },
      },
    ];
  }
}

export default Toaster;
