import Component from '../core/Component';
import { toaster, signinText } from '../css/Toaster.module.css';

class Toaster extends Component {
  render() {
    const { type, message } = this.props;

    return `
      <div class="${toaster} ${type}">
        <p class="${signinText}">${message}</p>
      </div>
    `;
  }
}

export default Toaster;
