'use strict'


function EmptyStack(length) {
    let empty = []
    for (let i = 0; i < length; i++) {
        empty.push(STACK_EMPTY)
    }
    return empty
}

function RandomStacks(length, mtype_range) {
    /*  length:         stack length
        mtype_range:    range of differents marbles type
    */
    let marbles_pool = []
    for (let i = 0; i < length * mtype_range; i++) {
        marbles_pool[i] = i % mtype_range
    }
    marbles_pool.sort(() => { return Math.random() - 0.5 })

    let stack = []
    for (let i = 0; i < mtype_range; i++) {
        stack.push(marbles_pool.slice(i * length, (i + 1) * length))
    }
    stack.push(EmptyStack(length))
    stack.push(EmptyStack(length))
    return stack
}


function ExtremeModeStacks() {
    const length = 6
    const mtype_range = 11
    let marbles_pool = []
    for (let i = 0; i < length * mtype_range; i++) {
        marbles_pool[i] = i % mtype_range
    }
    marbles_pool.sort(() => { return Math.random() - 0.5 })

    let stack = []
    for (let i = 0; i < mtype_range; i++) {
        stack.push(marbles_pool.slice(i * length, (i + 1) * length))
    }
    stack.push(EmptyStack(length))
    stack.push(EmptyStack(length))
    stack.push(EmptyStack(length))
    return stack
}