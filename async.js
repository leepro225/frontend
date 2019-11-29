const f1 = () => {
    return new Promise(resolve => {
        setTimeout(function() {
            resolve(1);
        }, 1000);
    });
}
const f2 = () => {
    return new Promise(resolve => {
        setTimeout(function() {
            resolve(2);
        }, 1000);
    });
}
const f3 = (param1) => {
    return new Promise(resolve => {
        setTimeout(function() {
            resolve(param1);
        }, 1000);
    });
}
const f4 = (param1, param2) => {
    return new Promise(resolve => {
        setTimeout(function() {
            resolve(param1 + param2);
        }, 1000);
    });
}

const main = async () => {
    const result = await Promise.all([f1(), sub()]);
    const d = await f4(result[0], result[1]);
    return d;
}
const sub = async () => {
    const b = await f2();
    const c = await f3(b);
    return c;
}

main().then(result => { console.log(result) });