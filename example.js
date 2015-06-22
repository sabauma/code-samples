
function benchmark(n, iters, f) {
    var a = [];
    var b = []
    for (var i = 0; i < n; i++) {
        var v = Math.random() * 100;
        a.push(v);
        b.push(new Box(v));
    }
    var start = Date.now();
    for (var i = 0; i < iters; i++)
        f(a, b);
    return Date.now() - start;
}

function Box(v) {
    this.value = v;
}

Array.prototype.myForEach = function (f) {
    for (var i = 0; i < this.length; i++) {
        f(this[i]);
    }
}

function doForEach(a, b) {
    var max = -Infinity;
    a.myForEach(function (val) {
        if (val > max)
            max = val;
    });

    var max2 = -Infinity;
    b.myForEach(function (val) {
        if (b.value > max2)
            max2 = b.value;
    });
}

console.log(benchmark(500, 50000, doForEach));

