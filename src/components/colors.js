// import Publisher from '../Publisher.js';
import { getEvents } from './api.js';

function createEventParagraphs() {
  getEvents ("sports")
}

export { createEventParagraphs };