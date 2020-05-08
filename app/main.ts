import { Designer } from '../src';

const container = document.getElementById('container');
const designer = new Designer(container!);
designer.start();

(window as any).DESIGNER = designer;