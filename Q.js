const stringReverse = (string) => {

    let result = ""
   
    for(let i = string.length-1; i >= 0 ; i--){
        result += string[i];
    }
    return result;
}

const arrayFlattening = (array) => {
   let result = []
   for(let i of array){
    if(Array.isArray(i)){
        result = result.concat(arrayFlattening(i))
    }else{
        result.push(i)
    }
   }
   return result
}

const removeDuplicates = (array) => {
   let result = new Set();

   for(let i of array){
        result.add(i)
    }
    return [...result]
}

const arrayRotation = (array, k) => {
    const length = array.length;
    const numberRotate = k % length;
    const reverse =(start, end) => {
        while(start < end){
            [array[start], array[end]] = [array[end], array[start]]
            start++;
            end--;
        }
    }

    reverse(0, length-1)
    reverse(0, numberRotate-1)
    reverse(numberRotate, length-1)
    return array
}

const findMissingNUmber = (array) => {
    let length = array.length;
    let sum = 0
    let expectedSum = (length * (length+1))/2

    for(let i of array){
        sum += i
    }
    return expectedSum - sum
}

const firstNonRepeatingletter = (String) => {
    const countMap = {};

    for (let char of String){
        countMap[char] = (countMap[char] || 0) + 1;
    }

    for(let char of String){
        if (countMap[char] === 1) return  char;
    }
    return null
}

const twoSum = (array, k) => {
    const seen = new Set();

    for(let i of array){
        const check = k - i;
        
        if(seen.has(check)){
            return [check, i]
        }
        seen.add(i)
    }
}

const sortByFrequency = (array) => {
    let checkMap = {}

    for(let number of array){
        checkMap[number] = (checkMap[number] || 0) + 1
    }
    
    array.sort((a,b) => {
        if(checkMap[b] !== checkMap[a]){
            return checkMap[b] - checkMap[a]
        }
        return a-b
    })

    return array
}

const sortByFrequencyWithoutInbulitfunction = (array) => {
    let checkMap = {}

    for(let number of array){
        checkMap[number] = (checkMap[number] || 0) + 1;
    }

    for(let key in checkMap){
        console.log(checkMap[key])
    }
    return checkMap
}
                                                                                                                
                   




const string = "abcd";
const array = [1,[2,3,[3]]];
const array1 = [1,2,3,4,5]
const array2 = [1,2,3,4,6];
const string1 = "swiss";
const array3 = [1,1,4,3,3,3,3]

// console.log(stringReverse(string))
// console.log(arrayFlattening(array))
// console.log(removeDuplicates(array1))
// console.log(arrayRotation(array1))
// console.log(findMissingNUmber(array2));
// console.log(firstNonRepeatingletter(string1))
// console.log(twoSum(array1, 5))
console.log(sortByFrequencyWithoutInbulitfunction(array3))