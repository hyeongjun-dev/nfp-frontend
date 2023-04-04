const wait = (ms) => new Promise((res) => setTimeout(res, ms));

const callWithRetry = async (fn, depth = 0) => {
    try {
        return await fn();
    }catch(e) {
        if (depth > 3) {
            throw e;
        }
        await wait(2 ** depth * 10);
        return callWithRetry(fn, depth + 1);
    }
}

export {callWithRetry};