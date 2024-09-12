function Mission1(arr){
    return arr.filter(n => n % 2 === 0);
}



function Mission2(str) {
    const words = str.split(' ');
    let count = 0;
    for (const word of words) {
        if (word.length === 4) {
            count++;
        }
    }
    return count;
}



function Mission3(matrix){
    return matrix.flat()
}



function Mission5(keys, values) {
    let obj = {};
    let minLength = Math.min(keys.length, values.length);

    for (let i = 0; i < minLength; i++) {
        obj[keys[i]] = values[i];
    }
    return obj;
}



module.exports = {
    Mission1,
    Mission2,
    Mission3,
    Mission5
}