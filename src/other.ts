import { getData } from './dataStore';
/**
 * Reset the state of the application back to start
 * - no enter
 *
 * @returns {} - when the function is successfully called,
 * empty object is being returned
 */
function clear() {
  const data = getData();
  data.users = [];
  data.quizzes = [];
  return {};
}
export { clear };
