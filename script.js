function eulerPartitions(n) {
    let partitions = [];
    let p = Array(n).fill(0);
    let k = 0;
    p[k] = n;

    while (true) {
        if (isValidPartition(p, k + 1, 1)) {
            partitions.push(p.slice(0, k + 1));
        }

        let rem_val = 0;
        while (k >= 0 && p[k] == 1) {
            rem_val += p[k];
            k--;
        }

        if (k < 0) return partitions;

        p[k]--;
        rem_val++;

        while (rem_val > p[k]) {
            p[k + 1] = p[k];
            rem_val -= p[k];
            k++;
        }

        p[k + 1] = rem_val;
        k++;
    }
}

function rogersRamanujanPartitions(n) {
    let partitions = [];
    let p = Array(n).fill(0);
    let k = 0;
    p[k] = n;

    while (true) {
        if (isValidPartition(p, k + 1, 2)) {
            partitions.push(p.slice(0, k + 1));
        }

        let rem_val = 0;
        while (k >= 0 && p[k] == 1) {
            rem_val += p[k];
            k--;
        }

        if (k < 0) return partitions;

        p[k]--;
        rem_val++;

        while (rem_val > p[k]) {
            p[k + 1] = p[k];
            rem_val -= p[k];
            k++;
        }

        p[k + 1] = rem_val;
        k++;
    }
}

function schurPartitions(n) {
    let partitions = [];
    let p = Array(n).fill(0);
    let k = 0;
    p[k] = n;

    while (true) {
        if (isValidPartitionSchur(p, k + 1)) {
            partitions.push(p.slice(0, k + 1));
        }

        let rem_val = 0;
        while (k >= 0 && p[k] == 1) {
            rem_val += p[k];
            k--;
        }

        if (k < 0) return partitions;

        p[k]--;
        rem_val++;

        while (rem_val > p[k]) {
            p[k + 1] = p[k];
            rem_val -= p[k];
            k++;
        }

        p[k + 1] = rem_val;
        k++;
    }
}

function goellnitzGordonPartitions(n) {
    let partitions = [];
    let p = Array(n).fill(0);
    let k = 0;
    p[k] = n;

    while (true) {
        if (isValidPartitionGoellnitzGordon(p, k + 1)) {
            partitions.push(p.slice(0, k + 1));
        }

        let rem_val = 0;
        while (k >= 0 && p[k] == 1) {
            rem_val += p[k];
            k--;
        }

        if (k < 0) return partitions;

        p[k]--;
        rem_val++;

        while (rem_val > p[k]) {
            p[k + 1] = p[k];
            rem_val -= p[k];
            k++;
        }

        p[k + 1] = rem_val;
        k++;
    }
}

function isValidPartition(p, n, diff) {
    for (let i = 1; i < n; i++) {
        if (p[i - 1] - p[i] < diff) {
            return false;
        }
    }
    return true;
}

function isValidPartitionSchur(p, n) {
    for (let i = 1; i < n; i++) {
        if ((p[i - 1] - p[i] < 3) || (p[i - 1] % 3 == 0 && p[i] % 3 == 0 && p[i - 1] - p[i] == 3)) {
            return false;
        }
    }
    return true;
}

function isValidPartitionGoellnitzGordon(p, n) {
    for (let i = 0; i < n; i++) {
        if (p[i] < 3) {
            return false;
        }
        if ((i > 0 && p[i - 1] - p[i] < 2) || ((i > 0 && p[i] % 2 == 0 && p[i - 1] % 2 == 0) && p[i - 1] - p[i] == 2 )) {
            return false;
        }
    }
    return true;
}

function displayGenerating() {
    const numberInput = document.getElementById('numberInputGen').value;
    let partitions;
    const generatingTitle = document.getElementById('generatingTitle').innerText;

    if (generatingTitle.includes("Euler Identity")) {
        partitions = eulerPartitions(Number(numberInput));
    } else if (generatingTitle.includes("Rogers-Ramanujan Identity")) {
        partitions = rogersRamanujanPartitions(Number(numberInput));
    } else if (generatingTitle.includes("Schur Identity")) {
        partitions = schurPartitions(Number(numberInput));
    } else if (generatingTitle.includes("2nd Göllnitz-Gordon Identity")) {
        partitions = goellnitzGordonPartitions(Number(numberInput));
    }

    document.getElementById('resultGen').innerText = `Integer Partitions:\n${partitions.map(partition => partition.join(' + ')).join('\n')}`;
}

function eulerCountingPartitions(n) {
    let dp = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));
    dp[0][0] = 1;

    for (let i = 1; i <= n; ++i) {
        for (let k = 0; k <= n; ++k) {
            if (i <= k) {
                dp[i][k] = dp[i - 1][k - i] + dp[i - 1][k];
            } else {
                dp[i][k] = dp[i - 1][k];
            }
        }
    }

    return dp[n][n];
}

function rogersRamanujanCountingPartitions(n) {
    let dp = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));
    dp[0][0] = 1;

    for (let i = 1; i <= n; ++i) {
        for (let k = 0; k <= n; ++k) {
            if (i <= k && (i - 2 >= 0)) {
                dp[i][k] = dp[i - 2][k - i] + dp[i - 1][k];
            } else if (i - 2 < 0 && i <= k) {
                dp[i][k] = dp[0][k - i] + dp[i - 1][k];
            } else {
                dp[i][k] = dp[i - 1][k];
            }
        }
    }

    return dp[n][n];
}

function schurCountingPartitions(n) {
    let dp = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));
    dp[0][0] = 1;

    for (let i = 1; i <= n; ++i) {
        let a = (i % 3 === 0) ? 4 : 3;

        for (let k = 0; k <= n; ++k) {
            if (i <= k && (i - a >= 0)) {
                dp[i][k] = dp[i - a][k - i] + dp[i - 1][k];
            } else if (i - a < 0 && i <= k) {
                dp[i][k] = dp[0][k - i] + dp[i - 1][k];
            } else {
                dp[i][k] = dp[i - 1][k];
            }
        }
    }

    return dp[n][n];
}

function goellnitzGordonCountingPartitions(n) {
    let dp = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));
    for (let c = 0; c <= 2; c++) {
        dp[c][0] = 1;
    }

    for (let i = 3; i <= n; ++i) {
        let a = (i % 2 === 0) ? 3 : 2;

        for (let k = 0; k <= n; ++k) {
            if (i <= k && (i - a >= 0)) {
                dp[i][k] = dp[i - a][k - i] + dp[i - 1][k];
            } else if (i - a < 0 && i <= k) {
                dp[i][k] = dp[0][k - i] + dp[i - 1][k];
            } else {
                dp[i][k] = dp[i - 1][k];
            }
        }
    }

    return dp[n][n];
}

function displayCounting() {
    const numberInput = document.getElementById('numberInputCount').value;
    let result;
    const countingTitle = document.getElementById('countingTitle').innerText;

    if (countingTitle.includes("Euler Identity")) {
        result = eulerCountingPartitions(Number(numberInput));
    } else if (countingTitle.includes("Rogers-Ramanujan Identity")) {
        result = rogersRamanujanCountingPartitions(Number(numberInput));
    } else if (countingTitle.includes("Schur Identity")) {
        result = schurCountingPartitions(Number(numberInput));
    } else if (countingTitle.includes("2nd Göllnitz-Gordon Identity")) {
        result = goellnitzGordonCountingPartitions(Number(numberInput));
    }

    document.getElementById('resultCount').innerText = `Number of partitions:\n${result}`;
}

function showGenerating(type) {
    clearInputsAndResults();
    document.getElementById('generatingContent').style.display = 'block';
    document.getElementById('countingContent').style.display = 'none';

    if (type === 'Euler') {
        document.getElementById('generatingTitle').innerText = 'Generating Partitions - Euler Identity';
    } else if (type === 'RogersRamanujan') {
        document.getElementById('generatingTitle').innerText = 'Generating Partitions - Rogers-Ramanujan Identity';
    } else if (type === 'Schur') {
        document.getElementById('generatingTitle').innerText = 'Generating Partitions - Schur Identity';
    } else if (type === 'GoellnitzGordon') {
        document.getElementById('generatingTitle').innerText = 'Generating Partitions - 2nd Göllnitz-Gordon Identity';
    }
}

function showCounting(type) {
    clearInputsAndResults();
    document.getElementById('generatingContent').style.display = 'none';
    document.getElementById('countingContent').style.display = 'block';

    if (type === 'Euler') {
        document.getElementById('countingTitle').innerText = 'Counting Integer Partitions - Euler Identity';
    } else if (type === 'RogersRamanujan') {
        document.getElementById('countingTitle').innerText = 'Counting Integer Partitions - Rogers-Ramanujan Identity';
    } else if (type === 'Schur') {
        document.getElementById('countingTitle').innerText = 'Counting Integer Partitions - Schur Identity';
    } else if (type === 'GoellnitzGordon') {
        document.getElementById('countingTitle').innerText = 'Counting Integer Partitions - 2nd Göllnitz-Gordon Identity';
    }
}

function clearInputsAndResults() {
    document.getElementById('numberInputGen').value = '';
    document.getElementById('resultGen').innerText = '';
    document.getElementById('numberInputCount').value = '';
    document.getElementById('resultCount').innerText = '';
}

// Show the generating content by default
showGenerating('Euler');
