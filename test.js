
function f(x) {
    var acc = 0;
    for (var i = 0; i < 1e6; ++i) {
        if (x < 256) { acc +=1; } else { acc -=1; }
    }
    return acc
}

console.log(f(0));
console.log(f(256));
console.log(f(1024));

