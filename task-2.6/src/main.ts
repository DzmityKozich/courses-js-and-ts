import { TodoWidget } from './components/TodoWidget';

import '../scss/styles.scss';

const widgetElement = document.querySelector<HTMLDivElement>('.todo-widget')!;

new TodoWidget(widgetElement);
