
function benchmark(n, iters, f) {
    var outer = [];
    for (var i = 0; i < n; i++) {
        var inner = [];
        for (var j = 0; j < n; j++)
            inner.push(Math.random() * 100);
        outer.push(inner);
    }
    var start = Date.now();
    for (var i = 0; i < iters; i++)
        f(outer);
    return Date.now() - start;
}

function forLoop(outer) {
    var max = -Infinity;
    for (var i = 0; i < outer.length; i++) {
        var inner = outer[i];
        for (var j = 0; j < inner.length; j++) {
            var v = inner[j];
            if (v > max)
                max = v;
        }
    }
}

console.log(benchmark(50, 50000, forLoop));

