import { expect, test } from 'vitest';
import * as M from '@materializecss/materialize';
import reducer from './reducers/logReducer';
import { ADD_LOG, UPDATE_LOG, DELETE_LOG } from './actions/types';

test('Materialize notifications treat technician names as text', () => {
  const text = '<img src=x onerror=alert(1)>';
  const toast = new M.Toast({ text });
  expect(toast.el.innerText).toBe(text);
  expect(toast.el.querySelector('img')).toBeNull();
  toast.dismiss();
});

test('log create, edit and delete behavior survives the tooling migration', () => {
  let state = reducer({ logs: [] }, { type: ADD_LOG, payload: { id: 1, message: 'Before' } });
  state = reducer(state, { type: UPDATE_LOG, payload: { id: 1, message: 'After' } });
  expect(state.logs).toEqual([{ id: 1, message: 'After' }]);
  state = reducer(state, { type: DELETE_LOG, payload: 1 });
  expect(state.logs).toEqual([]);
});
