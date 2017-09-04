// @flow

import Unique from '../unique'
import * as ouro from '../../'

let fn
let subj

beforeEach(() => {
  const { producer } = ouro.of(1, 2, 1, 3, 2, 3)

  fn = jest.fn(item => item)
  subj = new Unique(producer, fn)
  // $FlowIgnore
  subj.producer.drop = jest.fn()
})

afterEach(() => {
  fn.mockClear()
})

test('#drop()', () => {
  expect(subj.drop()).toBeUndefined()
  expect(subj.history.size).toBe(0)
  expect(subj.producer.drop).toHaveBeenCalled()
})

test('#next()', () => {
  {
    const next = subj.next()

    expect(next).toMatchSnapshot()
    expect(fn).toHaveBeenLastCalledWith(next.value)
  }

  {
    const next = subj.next()

    expect(next).toMatchSnapshot()
    expect(fn).toHaveBeenLastCalledWith(next.value)
  }

  {
    const next = subj.next()

    expect(next).toMatchSnapshot()
    expect(fn).toHaveBeenLastCalledWith(next.value)
  }

  expect(subj.next()).toMatchSnapshot()
})