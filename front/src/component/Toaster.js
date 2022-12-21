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
    const pathToMove = this.props.pageUrl;

    return [
      {
        type: 'click',
        selector: 'closeToast',
        handler: () => {
          pathToMove ? this.props.changePath(pathToMove) : this.props.setState({ isToastShowing: false });
        },
      },
    ];
  }
}

export default Toaster;
