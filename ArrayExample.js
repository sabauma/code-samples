
function benchmark(n, iters, f) {
    var outer = [];
    for (var i = 0; i < n; i++) {
        var inner = [];
        for (var j = 0; j < n; j++) {
            inner.push(Math.random() * 100);
        }
        outer.push(inner);
    }
    var start = Date.now();
    for (var i = 0; i < iters; i++)
        f(outer);
    return Date.now() - start;
}

function arrayForEach(outer) {
    var max = -Infinity;
    outer.forEach(function (inner) {
        inner.forEach(function (v) {
            if (v > max)
                max = v;
        });
    });
}

console.log(benchmark(50, 50000, arrayForEach));

