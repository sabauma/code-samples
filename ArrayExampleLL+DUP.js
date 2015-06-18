
function benchmark(n, iters, f) {
    var outer = [];
    for (var i = 0; i < n; i++) {
        var inner = [];
        for (var j = 0; j < n; j++) {
            inner.push(Math.random() * 100)
        }
        outer.push(inner);
    }
    var start = Date.now();
    for (var i = 0; i < iters; i++)
        f(outer);
    return Date.now() - start;
}

Array.prototype.liftedForEach1 = function (f, st) {
    for (var i = 0; i < this.length; i++)
        f(this[i], st);
}

Array.prototype.liftedForEach2 = function (f, st) {
    for (var i = 0; i < this.length; i++)
        f(this[i], st);
}

function liftedInnerKernel(v, st) {
    if (v > st.max)
        st.max = v;
}

function liftedAndClonedOuterKernel(inner, st) {
    inner.liftedForEach2(liftedInnerKernel, st);
}

function liftedAndClonedForEach(outer) {
    var st = { max: -Infinity };
    outer.liftedForEach1(liftedAndClonedOuterKernel, st);
}

console.log(benchmark(50, 50000, liftedAndClonedForEach));

