import './index.css';
import { formatter } from '@common/date';

let div = document.createElement('div');
div.innerHTML = 'hello world pages/home yaya';

document.body.append(div);

import('@components/Button').then(({ default: Button }) => {
  div.appendChild(Button);
});
