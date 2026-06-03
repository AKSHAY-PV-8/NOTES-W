🔹 1. Two Sum (Array + Hashing)

Problem:
Given an array and a target, return indices of two numbers that add up to the target.

function twoSum(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    if (map.has(diff)) {
      return [map.get(diff), i];
    }
    map.set(nums[i], i);
  }
}


🧠 Time: O(n), Space: O(n)

🔹 2. Reverse a String
function reverseString(str) {
  return str.split("").reverse().join("");
}

🔹 3. Palindrome Number
function isPalindrome(x) {
  const s = x.toString();
  return s === s.split("").reverse().join("");
}

🔹 4. Valid Anagram (You practiced this earlier!)
function isAnagram(s, t) {
  if (s.length !== t.length) return false;

  const count = {};
  for (let char of s) count[char] = (count[char] || 0) + 1;
  for (let char of t) {
    if (!count[char]) return false;
    count[char]--;
  }
  return true;
}

🔹 5. Maximum Subarray (Kadane’s Algorithm)
function maxSubArray(nums) {
  let maxSum = nums[0];
  let currentSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}

🔹 6. Merge Two Sorted Arrays
function merge(nums1, m, nums2, n) {
  let i = m - 1, j = n - 1, k = m + n - 1;

  while (j >= 0) {
    if (i >= 0 && nums1[i] > nums2[j]) {
      nums1[k--] = nums1[i--];
    } else {
      nums1[k--] = nums2[j--];
    }
  }
}

🔹 7. FizzBuzz
function fizzBuzz(n) {
  const result = [];
  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) result.push("FizzBuzz");
    else if (i % 3 === 0) result.push("Fizz");
    else if (i % 5 === 0) result.push("Buzz");
    else result.push(i.toString());
  }
  return result;
}

🔹 8. Find First Non-Repeating Character
function firstUniqChar(s) {
  const count = {};
  for (let char of s) count[char] = (count[char] || 0) + 1;

  for (let i = 0; i < s.length; i++) {
    if (count[s[i]] === 1) return i;
  }
  return -1;
}

🔹 9. Remove Duplicates from Sorted Array
function removeDuplicates(nums) {
  if (nums.length === 0) return 0;
  let i = 0;

  for (let j = 1; j < nums.length; j++) {
    if (nums[j] !== nums[i]) {
      i++;
      nums[i] = nums[j];
    }
  }
  return i + 1;
}

🔹 10. Valid Parentheses
function isValid(s) {
  const stack = [];
  const map = { ")": "(", "]": "[", "}": "{" };

  for (let char of s) {
    if (char === "(" || char === "[" || char === "{") {
      stack.push(char);
    } else {
      if (stack.pop() !== map[char]) return false;
    }
  }
  return stack.length === 0;
}