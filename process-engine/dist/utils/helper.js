class Helper {
    buildOneSearchString(input) {
        const delimiter = ',';
        let out = '';
        for (let [i, value] of input.entries()) {
            if (i === input.length - 1) {
                out = out + value;
            }
            else {
                out = out + value + delimiter;
            }
        }
        return out;
    }
}
export { Helper };
