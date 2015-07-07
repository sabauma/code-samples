
function Y(f) {
    return (x => f(v => x(x)(v)))(x => f(v => x(x)(v)));
}

function fib_(rec) {
    return function(n) {
        if (n === 0 || n === 1)
            return 1;
        return rec(n - 1) + rec(n - 2);
    };
}

fib = Y(fib_);

console.log(fib(37));

