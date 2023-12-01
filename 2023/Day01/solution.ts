import { readData } from '../utils'

const sample: string[] = `
two1nine
eight2three
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
`.trim().split('\n')

function part1(input: string[]): number {
    let sum = 0
    input.forEach((string)=>{
        let firstNumber
        let lastNumber
        for (const char of string){
            const isNum = !isNaN(Number(char))
            if(!isNum) continue
            if(isNum && firstNumber === undefined) firstNumber = char
            lastNumber = char
        }
        sum += Number(`${firstNumber}${lastNumber}`)
    })
    return sum
}
const stringValMap = {
    'one': '1',
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9'
}

const initialNumbers: INumberRecord = {
    first : {
        index: Number.MAX_SAFE_INTEGER,
        value: '0'
    }, 
    last: {
        index: -1,
        value: '0'
    }
}

type INumberRecord = Record<'first' | 'last', NumberData>
type NumberData = {
    index: number
    value: string
}

function part2(input: string[]): number {
    let sum = 0
    input.forEach((string)=>{
        let numbers = Object.assign({}, initialNumbers)
        for(const numStr of Object.keys(stringValMap)) {
            const firstIndex = string.indexOf(numStr)
            const lastIndex = string.lastIndexOf(numStr)
            if (firstIndex > -1 && firstIndex < numbers.first.index) {
                numbers = helper(firstIndex, stringValMap[numStr], numbers)
            }
            if (lastIndex > numbers.last.index) {
                numbers = helper(lastIndex, stringValMap[numStr], numbers)
            }
        }
        for (let index = 0; index <= string.length; index++) {
            const char = string[index]
            const isNum = !isNaN(Number(char))
            if(!isNum) continue
            numbers = helper(index, char, numbers)    
        }
        sum += Number(`${numbers.first.value}${numbers.last.value}`)
    })
    return sum
}

const helper = (index, value, numbers: INumberRecord)=> {
    if (index < numbers.first.index){
        numbers.first = {index, value}
    } 
    if(index > numbers.last.index){
        numbers.last = {index, value}
    }
    return numbers
}

describe('Day 1', () => {
    const input = readData(__dirname)

    it('part 1', () => {
        expect(part1(sample)).toBe(231)
        expect(part1(input)).toBe(54940)
    })
    it('part 2', () => {
        expect(part2(sample)).toBe(281)
        expect(part2(input)).toBe(54208)
    })
})
