// Import stylesheets
import './style.css';
import { faker } from 'faker';
import { sample } from 'lodash-es';
import { makeFactory, each } from './mocking';
import { Column } from './models';

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;





export const columnFactory = makeFactory<Column>({
  id: each(i => faker.random.uuid()),
  name: each(i => faker.name.findName()),
  prop: each(i => faker.name.findName()),
  canAutoResize: true,
  toggleable: true,
  ordinal: each(i => i),
  isHidden: each(i => faker.random.boolean()),
  sortBy: false,
  sortDirection: each(i => sample([0, 1])),
  align: 'start',
  textWrap: false,
  groupBy: false,
  groupOrder: null
});
columnFactory.one({ sortBy: true });
columnFactory.list(20);