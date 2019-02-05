function shouldThrow(func, errorMessage) {
    var errorThrown = false;
    var error = null;
    try {
        func();
    } catch (e) {
        errorThrown = true;
        error = e;
    }
    if (!errorThrown)
        throw new Error('not thrown');
    if (String(error) !== errorMessage)
        throw new Error(`bad error: ${String(error)}`);
}
noInline(shouldThrow);

function shouldBe(actual, expected) {
    if (actual !== expected)
        throw new Error(`bad value: ${String(actual)}`);
}
noInline(shouldBe);

function foo() {
    bar = 4;
}
function get() {
    return bar;
}
foo();
shouldBe(get(), 4);

shouldBe(bar, 4);
shouldThrow(() => {
    $.evalScript('get(); const bar = 3;');
}, `ReferenceError: Cannot access uninitialized variable.`);
shouldThrow(() => {
    shouldBe(bar, 3);
}, `ReferenceError: Cannot access uninitialized variable.`);
shouldThrow(() => {
    shouldBe(get(), 3);
}, `ReferenceError: Cannot access uninitialized variable.`);
shouldThrow(() => {
    $.evalScript('bar;');
}, `ReferenceError: Cannot access uninitialized variable.`);