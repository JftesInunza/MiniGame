'use strict'


function EmptyStack(length) {
    let marbles = []
    for (let i = 0; i < length; i++) {
        let marble = EmptyMarble()
        marbles.push(marble)
    }
    return new Stack(marbles)
}

function RandomStacks({
    length,
    mtype_range,
    n_empty,
    duplicates,
}) {
    /*  length          :number of marbles on every stack
        mtype_range     :range of differents marbles types
        n_empty         :number of empty stack to push
    */
    let marbles_pool = []
    for (let i = 0; i < length * mtype_range; i++) {
        let marble = new Marble(i % mtype_range)
        marbles_pool.push(marble)
    }

    for (let i = 0; i < length * duplicates; i++) {
        let marble = new Marble(i % duplicates)
        marbles_pool.push(marble)
    }
    // Shuffle marbles
    marbles_pool.sort(() => { return Math.random() - 0.5 })

    let stacks = []
    for (let i = 0; i < mtype_range + duplicates; i++) {
        const from = i * length
        const to = (i + 1) * length
        let marbles = marbles_pool.slice(from, to)
        stacks.push(new Stack(marbles))
    }

    for (let i = 0; i < n_empty; i++) {
        stacks.push(EmptyStack(length))
    }

    return {
        stacks: stacks,
        numberStacks: mtype_range + n_empty + duplicates,
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
    return RandomStacks({
        length: 4,
        mtype_range: 3,
        n_empty: 2,
        duplicates: 3,
    })
}

function NormalMode() {
    return RandomStacks({
        length: 5,
        mtype_range: 6,
        n_empty: 2,
        duplicates: 2,
    })
}

function HardMode() {
    return RandomStacks({
        length: 6,
        mtype_range: 8,
        n_empty: 2,
        duplicates: 4,
    })
}