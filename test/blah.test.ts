import { PromiseQueue } from '../src';

const sleep = (seconds: number) => new Promise((resolve) => setTimeout(resolve, seconds * 1000))

describe('promise queue', () => {
  it('add item in queue', () => {
    const queue = new PromiseQueue()
    queue.add(async () => {
      await sleep(3)
    })

    expect(queue.promises.length).toEqual(1)
  })

  it('check promise is running', () => {
    const queue = new PromiseQueue()
    queue.add(async () => {
      await sleep(3)
    })
    queue.add(async () => {
      await sleep(3)
    })

    const { isRunning } = queue.promises[0]

    expect(isRunning).toBe(true)
  })

  it('check promise is not not waiting', () => {
    const queue = new PromiseQueue()
    queue.add(async () => {
      await sleep(3)
    })
    queue.add(async () => {
      await sleep(3)
    })

    const { isWaiting } = queue.promises[0]

    expect(isWaiting).toBe(false)
  })

  it('check promise is waiting', () => {
    const queue = new PromiseQueue()
    queue.add(async () => {
      await sleep(3)
    })
    queue.add(async () => {
      await sleep(3)
    })

    const {isWaiting} = queue.promises[1]

    expect(isWaiting).toBe(true)
  })
})
