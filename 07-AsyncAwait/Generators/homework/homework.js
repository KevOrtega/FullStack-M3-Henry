function* fizzBuzzGenerator(max = Number.POSITIVE_INFINITY) { //50
  // Tu código acá:
  let num = 0

  while(num < max) {
    num++

    if(num % 3 === 0 && num % 5 === 0) yield "Fizz Buzz"
    else if(num % 3 === 0) yield "Fizz"
    else if(num % 5 === 0) yield "Buzz"
    else yield num
  }
}

module.exports = fizzBuzzGenerator;
