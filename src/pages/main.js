import './index.css';
import { formatter } from '@common/date';

console.log('hahaha', formatter(new Date()));

let div = document.createElement('div');
div.innerHTML = 'hello world';

document.body.append(div);