import Component from '../core/Component';
import { toaster, signinText } from '../css/Toaster.module.css';

class Toaster extends Component {
  render() {
    const { type, message } = this.props;

    return `
      <article class="${toaster} ${type}">
        <p class="${signinText}">${message}</p>
      </article>
    `;
  }
}

export default Toaster;
