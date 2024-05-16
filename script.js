// Counting Partitions Function
function countPartitions(n) {
    let dp = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));

    // Base case: Only one way to partition 0
    dp[0][0] = 1;

    // Calculate the partitions iteratively
    for (let i = 1; i <= n; ++i) {
        for (let k = 0; k <= n; ++k) {
            if (i <= k) {
                dp[i][k] = dp[i - 1][k - i] + dp[i - 1][k];
            } else {
                dp[i][k] = dp[i - 1][k];
            }
        }
    }

    // The answer is stored in dp[n][n]
    return dp[n][n];
}

function displayPartitions() {
    const numberInput = document.getElementById('numberInput').value;
    const result = countPartitions(Number(numberInput));
    document.getElementById('result').innerText = `Number of partitions with the Euler's rule: ${result}`;
}

// Generating Partitions Function
function printArray(p, n) {
    let result = '';
    for (let i = 0; i < n; i++) {
        result += p[i];
        if (i < n - 1) {
            result += ' + ';
        }
    }
    return result;
}

function isValidPartition(p, n) {
    for (let i = 1; i < n; i++) {
        if (p[i - 1] - p[i] < 1) {
            return false;
        }
    }
    return true;
}

function printAllUniqueParts(n) {
    let p = Array(n).fill(0); // A vector to store a partition 
    let k = 0; // Index of last element in a partition 
    p[k] = n; // Initialize first partition as number itself 
    let result = [];

    // This loop first prints current partition then generates next 
    // partition. The loop stops when the current partition has all 1s 
    while (true) {
        // Check if the current partition meets the condition
        if (isValidPartition(p, k + 1)) {
            // Add current partition to result
            result.push(printArray(p, k + 1));
        }

        // Generate next partition 
        let rem_val = 0;
        while (k >= 0 && p[k] == 1) {
            rem_val += p[k];
            k--;
        }

        // if k < 0, all the values are 1 so there are no more partitions 
        if (k < 0) return result;

        // Decrease the p[k] found above and adjust the rem_val 
        p[k]--;
        rem_val++;

        // If rem_val is more, then the sorted order is violated. Divide 
        // rem_val in different values of size p[k] and copy these values at 
        // different positions after p[k] 
        while (rem_val > p[k]) {
            p[k + 1] = p[k];
            rem_val = rem_val - p[k];
            k++;
        }

        // Copy rem_val to next position and increment position 
        p[k + 1] = rem_val;
        k++;
    }
}

function displayGenerating() {
    const numberInput = document.getElementById('numberInputGen').value;
    const partitions = printAllUniqueParts(Number(numberInput));
    document.getElementById('resultGen').innerText = `All Unique Partitions of ${numberInput}:\n${partitions.join('\n')}`;
}

// Functions to toggle between content
function showGenerating() {
    document.getElementById('generatingContent').style.display = 'block';
    document.getElementById('countingContent').style.display = 'none';
}

function showCounting() {
    document.getElementById('generatingContent').style.display = 'none';
    document.getElementById('countingContent').style.display = 'block';
}

// Show the generating content by default
showGenerating();
