'use strict'


function EmptyStack(length) {
    let empty = []
    for (let i = 0; i < length; i++) {
        empty.push(STACK_EMPTY)
    }
    return empty
}

function RandomStacks(length, mtype_range, n_empty) {
    /*  length          :number of marbles on every stack
        mtype_range     :range of differents marbles types
        n_empty         :number of empty stack to push
    */
    let marbles_pool = []
    for (let i = 0; i < length * mtype_range; i++) {
        marbles_pool[i] = i % mtype_range
    }
    marbles_pool.sort(() => { return Math.random() - 0.5 })

    let stacks = []
    for (let i = 0; i < mtype_range; i++) {
        stacks.push(marbles_pool.slice(i * length, (i + 1) * length))
    }

    for (let i = 0; i < n_empty; i++) {
        stacks.push(EmptyStack(length))
    }

    return {
        stacks: stacks,
        numberStacks: mtype_range + n_empty,
        stackLength: length,
    }
}

function GenerateStacks(mode) {
    switch (mode) {
        case 'easy':
            return EasyMode()
        case 'normal':
            return NormalMode()
        case 'hard':
            return HardMode()
        default:
            return []
    }
}

function EasyMode() {
    const length = 4
    const mtype_range = 5
    const n_empty = 1
    return RandomStacks(length, mtype_range, n_empty)
}

function NormalMode() {
    const length = 5
    const mtype_range = 8
    const n_empty = 2
    return RandomStacks(length, mtype_range, n_empty)
}

function HardMode() {
    const length = 6
    const mtype_range = 11
    const n_empty = 3
    return RandomStacks(length, mtype_range, n_empty)
}