const regEx = /(<|>|!=|>=|=|<|<=)\b/g

const inpt = ">=90000"

const res = inpt.replace(regEx, (match) => `n`)

const dMatch = inpt.match(regEx)

console.log(res)

console.log(dMatch)
