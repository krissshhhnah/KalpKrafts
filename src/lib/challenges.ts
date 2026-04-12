/**
 * src/lib/challenges.ts
 * Central challenge registry — contains all problems, their metadata,
 * hidden test cases, track assignment, and credit values.
 * This is the "source of truth" for the Coding Arena MVP.
 */

export interface TestCase {
  input: string;
  expected: string;
}

export interface Challenge {
  id: string;
  trackId: string;
  moduleIndex: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topicConcept: string;
  problemStatement: string;
  boilerplate: Record<string, string>; // language → starter code
  solutionCode: Record<string, string>; // language → optimized solution
  testCases: TestCase[];
  hiddenTestCases: TestCase[]; // Used by backend for grading
  nextModuleId?: string;
  credits: number;
  tags: string[];
}

export const CHALLENGES: Challenge[] = [
  // ================================================
  // TRACK A: Data Structures & Algorithms
  // ================================================
  {
    id: 'track-a-1',
    trackId: 'track-a-dsa',
    moduleIndex: 1,
    title: 'Two Sum',
    difficulty: 'Easy',
    topicConcept: 'arrays-and-hashing',
    problemStatement: `Given an array of integers 'nums' and an integer 'target', return the indices of the two numbers such that they add up to target. Assume exactly one solution exists. Output the two indices separated by a space.`,
    boilerplate: {
      python: `def two_sum(nums, target):\n    # Your solution here\n    pass\n\nimport sys\ndata = sys.stdin.read().split()\nidx = data.index('target')\nnums = list(map(int, data[:idx]))\ntarget = int(data[idx+1])\nprint(*two_sum(nums, target))`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');\nconst nums = lines[0].split(' ').map(Number);\nconst target = Number(lines[1]);\nfunction twoSum(nums, target) {\n  // Your solution here\n}\nconsole.log(twoSum(nums, target).join(' '));`,
    },
    solutionCode: {
      python: `def two_sum(nums, target):\n    hashmap = {}\n    for i, num in enumerate(nums):\n        diff = target - num\n        if diff in hashmap:\n            return [hashmap[diff], i]\n        hashmap[num] = i\n\nimport sys\ndata = sys.stdin.read().split()\nidx = data.index('target')\nnums = list(map(int, data[:idx]))\ntarget = int(data[idx+1])\nprint(*two_sum(nums, target))`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');\nconst nums = lines[0].split(' ').map(Number);\nconst target = Number(lines[1]);\nfunction twoSum(nums, target) {\n    const hashmap = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const diff = target - nums[i];\n        if (hashmap.has(diff)) return [hashmap.get(diff), i];\n        hashmap.set(nums[i], i);\n    }\n}\nconsole.log(twoSum(nums, target).join(' '));`,
    },
    testCases: [
      { input: '2 7 11 15\ntarget\n9', expected: '0 1' },
      { input: '3 2 4\ntarget\n6', expected: '1 2' },
    ],
    hiddenTestCases: [
      { input: '3 3\ntarget\n6', expected: '0 1' },
      { input: '-1 -2 -3 -4 -5\ntarget\n-8', expected: '2 4' }
    ],
    nextModuleId: 'track-a-2',
    credits: 10,
    tags: ['arrays', 'hashmap'],
  },
  {
    id: 'track-a-2',
    trackId: 'track-a-dsa',
    moduleIndex: 2,
    title: 'Valid Palindrome',
    difficulty: 'Easy',
    topicConcept: 'two-pointers',
    problemStatement: `A phrase is a palindrome if it reads the same forward and backward (after removing all non-alphanumeric characters and converting to lowercase). Given a string 's', return 'true' if it is a palindrome, or 'false' otherwise.`,
    boilerplate: {
      python: `import sys\ns = sys.stdin.read().strip()\n\ndef is_palindrome(s):\n    # Your solution here\n    pass\n\nprint("true" if is_palindrome(s) else "false")`,
      javascript: `const s = require('fs').readFileSync('/dev/stdin','utf8').trim();\nfunction isPalindrome(s) {\n  // Your solution here\n}\nconsole.log(isPalindrome(s) ? "true" : "false");`,
    },
    solutionCode: {
      python: `import sys\ns = sys.stdin.read().strip()\n\ndef is_palindrome(s):\n    s = "".join(filter(str.isalnum, s)).lower()\n    return s == s[::-1]\n\nprint("true" if is_palindrome(s) else "false")`,
      javascript: `const s = require('fs').readFileSync('/dev/stdin','utf8').trim();\nfunction isPalindrome(s) {\n    const cleaned = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();\n    return cleaned === cleaned.split('').reverse().join('');\n}\nconsole.log(isPalindrome(s) ? "true" : "false");`,
    },
    testCases: [
      { input: 'A man, a plan, a canal: Panama', expected: 'true' },
      { input: 'race a car', expected: 'false' },
    ],
    hiddenTestCases: [
      { input: ' ', expected: 'true' },
      { input: '0P', expected: 'false' },
      { input: 'AbcbA', expected: 'true' }
    ],
    nextModuleId: 'track-a-3',
    credits: 10,
    tags: ['strings', 'two-pointers'],
  },
  {
    id: 'track-a-3',
    trackId: 'track-a-dsa',
    moduleIndex: 3,
    title: 'Contains Duplicate',
    difficulty: 'Easy',
    topicConcept: 'arrays-and-hashing',
    problemStatement: `Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct. Input is space separated integers.`,
    boilerplate: {
        python: `import sys\nnums = list(map(int, sys.stdin.read().split()))\n\ndef contains_duplicate(nums):\n    # Your solution here\n    pass\n\nprint("true" if contains_duplicate(nums) else "false")`,
        javascript: `const nums = require('fs').readFileSync('/dev/stdin','utf8').trim().split(' ').map(Number);\nfunction containsDuplicate(nums) {\n  // Your solution here\n}\nconsole.log(containsDuplicate(nums) ? "true" : "false");`
    },
    solutionCode: {
        python: `import sys\nnums = list(map(int, sys.stdin.read().split()))\n\ndef contains_duplicate(nums):\n    return len(set(nums)) != len(nums)\n\nprint("true" if contains_duplicate(nums) else "false")`,
        javascript: `const nums = require('fs').readFileSync('/dev/stdin','utf8').trim().split(' ').map(Number);\nfunction containsDuplicate(nums) {\n    const set = new Set(nums);\n    return set.size !== nums.length;\n}\nconsole.log(containsDuplicate(nums) ? "true" : "false");`
    },
    testCases: [
        { input: '1 2 3 1', expected: 'true' },
        { input: '1 2 3 4', expected: 'false' }
    ],
    hiddenTestCases: [
        { input: '1 1 1 3 3 4 3 2 4 2', expected: 'true' },
        { input: '1000', expected: 'false' }
    ],
    nextModuleId: 'track-a-4',
    credits: 10,
    tags: ['arrays', 'hashmap']
  },
  {
    id: 'track-a-4',
    trackId: 'track-a-dsa',
    moduleIndex: 4,
    title: 'Valid Parentheses',
    difficulty: 'Medium',
    topicConcept: 'stacks',
    problemStatement: `Given a string 's' containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. Open brackets must be closed by the same type of brackets in the correct order.`,
    boilerplate: {
      python: `import sys\ns = sys.stdin.read().strip()\n\ndef is_valid(s):\n    # Your solution here\n    pass\n\nprint("true" if is_valid(s) else "false")`,
      javascript: `const s = require('fs').readFileSync('/dev/stdin','utf8').trim();\nfunction isValid(s) {\n  // Your solution here\n}\nconsole.log(isValid(s) ? "true" : "false");`,
    },
    solutionCode: {
       python: `import sys\ns = sys.stdin.read().strip()\n\ndef is_valid(s):\n    stack = []\n    mapping = {")": "(", "}": "{", "]": "["}\n    for char in s:\n        if char in mapping:\n            top_element = stack.pop() if stack else '#'\n            if mapping[char] != top_element:\n                return False\n        else:\n            stack.append(char)\n    return not stack\n\nprint("true" if is_valid(s) else "false")`,
       javascript: `const s = require('fs').readFileSync('/dev/stdin','utf8').trim();\nfunction isValid(s) {\n    const stack = [];\n    const map = { ')': '(', '}': '{', ']': '[' };\n    for (let char of s) {\n        if (map[char]) {\n            if (stack.pop() !== map[char]) return false;\n        } else {\n            stack.push(char);\n        }\n    }\n    return stack.length === 0;\n}\nconsole.log(isValid(s) ? "true" : "false");`
    },
    testCases: [
      { input: '()', expected: 'true' },
      { input: '()[]{}', expected: 'true' },
      { input: '(]', expected: 'false' }
    ],
    hiddenTestCases: [
      { input: '([{}])', expected: 'true' },
      { input: '(', expected: 'false' },
      { input: ']', expected: 'false' },
      { input: '((()(())))', expected: 'true' }
    ],
    nextModuleId: 'track-a-5',
    credits: 20,
    tags: ['stacks', 'strings'],
  },
  {
    id: 'track-a-5',
    trackId: 'track-a-dsa',
    moduleIndex: 5,
    title: 'Binary Search',
    difficulty: 'Easy',
    topicConcept: 'binary-search',
    problemStatement: `Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.\n\nYou must write an algorithm with O(log n) runtime complexity.\nInput: first line has space separated array. Second line has target.`,
    boilerplate: {
        python: `import sys\ndata = sys.stdin.read().split('\\n')\nnums = list(map(int, data[0].split()))\ntarget = int(data[1])\n\ndef search(nums, target):\n    # Your solution here\n    pass\n\nprint(search(nums, target))`,
        javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');\nconst nums = lines[0].split(' ').map(Number);\nconst target = Number(lines[1]);\nfunction search(nums, target) {\n  // Your solution here\n}\nconsole.log(search(nums, target));`
    },
    solutionCode: {
        python: `import sys\ndata = sys.stdin.read().split('\\n')\nnums = list(map(int, data[0].split()))\ntarget = int(data[1])\n\ndef search(nums, target):\n    left, right = 0, len(nums) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if nums[mid] == target:\n            return mid\n        elif nums[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1\n\nprint(search(nums, target))`,
        javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');\nconst nums = lines[0].split(' ').map(Number);\nconst target = Number(lines[1]);\nfunction search(nums, target) {\n    let left = 0, right = nums.length - 1;\n    while(left <= right) {\n        let mid = Math.floor((left + right) / 2);\n        if(nums[mid] === target) return mid;\n        else if(nums[mid] < target) left = mid + 1;\n        else right = mid - 1;\n    }\n    return -1;\n}\nconsole.log(search(nums, target));`
    },
    testCases: [
        { input: '-1 0 3 5 9 12\n9', expected: '4' },
        { input: '-1 0 3 5 9 12\n2', expected: '-1' }
    ],
    hiddenTestCases: [
        { input: '5\n5', expected: '0' },
        { input: '2 5\n0', expected: '-1' }
    ],
    nextModuleId: 'track-a-6',
    credits: 10,
    tags: ['binary-search', 'arrays']
  },
  {
    id: 'track-a-6',
    trackId: 'track-a-dsa',
    moduleIndex: 6,
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    topicConcept: 'sliding-window',
    problemStatement: `You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit. Map output to 0 if no profit can be made. Input is space-separated integers.`,
    boilerplate: {
        python: `import sys\nprices = list(map(int, sys.stdin.read().split()))\n\ndef max_profit(prices):\n    # Your solution here\n    pass\n\nprint(max_profit(prices))`,
        javascript: `const prices = require('fs').readFileSync('/dev/stdin','utf8').trim().split(' ').map(Number);\nfunction maxProfit(prices) {\n  // Your solution here\n}\nconsole.log(maxProfit(prices));`
    },
    solutionCode: {
        python: `import sys\nprices = list(map(int, sys.stdin.read().split()))\n\ndef max_profit(prices):\n    min_price = float('inf')\n    max_prof = 0\n    for price in prices:\n        if price < min_price:\n            min_price = price\n        elif price - min_price > max_prof:\n            max_prof = price - min_price\n    return max_prof\n\nprint(max_profit(prices))`,
        javascript: `const prices = require('fs').readFileSync('/dev/stdin','utf8').trim().split(' ').map(Number);\nfunction maxProfit(prices) {\n    let minPrice = Infinity;\n    let maxProf = 0;\n    for(let i=0; i<prices.length; i++) {\n        if(prices[i] < minPrice) minPrice = prices[i];\n        else if(prices[i] - minPrice > maxProf) maxProf = prices[i] - minPrice;\n    }\n    return maxProf;\n}\nconsole.log(maxProfit(prices));`
    },
    testCases: [
        { input: '7 1 5 3 6 4', expected: '5' },
        { input: '7 6 4 3 1', expected: '0' }
    ],
    hiddenTestCases: [
        { input: '2 4 1', expected: '2' },
        { input: '3 2 6 5 0 3', expected: '4' }
    ],
    nextModuleId: 'track-a-7',
    credits: 10,
    tags: ['arrays', 'sliding-window']
  },
  {
    id: 'track-a-7',
    trackId: 'track-a-dsa',
    moduleIndex: 7,
    title: 'Product of Array Except Self',
    difficulty: 'Medium',
    topicConcept: 'arrays-and-hashing',
    problemStatement: `Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer. You must write an algorithm that runs in O(n) time and without using the division operation. Output is space-separated integers.`,
    boilerplate: {
        python: `import sys\nnums = list(map(int, sys.stdin.read().split()))\n\ndef product_except_self(nums):\n    # Your solution here\n    pass\n\nprint(" ".join(map(str, product_except_self(nums))))`,
        javascript: `const nums = require('fs').readFileSync('/dev/stdin','utf8').trim().split(' ').map(Number);\nfunction productExceptSelf(nums) {\n  // Your solution here\n}\nconsole.log(productExceptSelf(nums).join(' '));`
    },
    solutionCode: {
        python: `import sys\nnums = list(map(int, sys.stdin.read().split()))\n\ndef product_except_self(nums):\n    res = [1] * len(nums)\n    prefix = 1\n    for i in range(len(nums)):\n        res[i] = prefix\n        prefix *= nums[i]\n    postfix = 1\n    for i in range(len(nums) - 1, -1, -1):\n        res[i] *= postfix\n        postfix *= nums[i]\n    return res\n\nprint(" ".join(map(str, product_except_self(nums))))`,
        javascript: `const nums = require('fs').readFileSync('/dev/stdin','utf8').trim().split(' ').map(Number);\nfunction productExceptSelf(nums) {\n    const res = Array(nums.length).fill(1);\n    let prefix = 1;\n    for(let i=0; i<nums.length; i++) {\n        res[i] = prefix;\n        prefix *= nums[i];\n    }\n    let postfix = 1;\n    for(let i=nums.length-1; i>=0; i--) {\n        res[i] *= postfix;\n        postfix *= nums[i];\n    }\n    return res;\n}\nconsole.log(productExceptSelf(nums).join(' '));`
    },
    testCases: [
        { input: '1 2 3 4', expected: '24 12 8 6' },
        { input: '-1 1 0 -3 3', expected: '0 0 9 0 0' }
    ],
    hiddenTestCases: [
        { input: '0 0', expected: '0 0' },
        { input: '1 2', expected: '2 1' }
    ],
    nextModuleId: 'track-a-capstone',
    credits: 20,
    tags: ['arrays', 'prefix-sum']
  },

  // ================================================
  // TRACK B: DevOps & CI/CD
  // ================================================
  {
    id: 'track-b-1',
    trackId: 'track-b-devops',
    moduleIndex: 1,
    title: 'Count Lines in File',
    difficulty: 'Easy',
    topicConcept: 'shell-basics',
    problemStatement: `Write a script that reads lines from stdin and outputs the total number of lines.`,
    boilerplate: {
      python: `import sys\nlines = sys.stdin.read().strip().split('\\n')\n\nprint(len(lines))`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin', 'utf8').trim().split('\\n');\nconsole.log(lines.length);`
    },
    solutionCode: {
       python: `import sys\n# Real solution would just print the length\nlines = sys.stdin.read().strip().split('\\n')\nprint(len(lines) if lines[0] else 0)`,
       javascript: `const lines = require('fs').readFileSync('/dev/stdin', 'utf8').trim().split('\\n');\nconsole.log(lines[0] ? lines.length : 0);`
    },
    testCases: [
      { input: 'line one\nline two\nline three', expected: '3' },
    ],
    hiddenTestCases: [
      { input: 'only one line', expected: '1' },
      { input: 'l1\nl2\nl3\nl4\nl5', expected: '5' }
    ],
    nextModuleId: 'track-b-2',
    credits: 10,
    tags: ['shell', 'linux', 'devops-basics'],
  },
  {
    id: 'track-b-2',
    trackId: 'track-b-devops',
    moduleIndex: 2,
    title: 'Extract IP Addresses',
    difficulty: 'Medium',
    topicConcept: 'regex',
    problemStatement: `You are analyzing a server log. Given a string of text from stdin, extract all valid IPv4 addresses and print them, each on a new line. (For simplicity, just match the pattern digit.digit.digit.digit where digits are 1-3 characters).`,
    boilerplate: {
        python: `import sys\nimport re\nlog = sys.stdin.read()\n\n# Your solution here\n`,
        javascript: `const log = require('fs').readFileSync('/dev/stdin', 'utf8');\n// Your solution here\n`
    },
    solutionCode: {
        python: `import sys\nimport re\nlog = sys.stdin.read()\nips = re.findall(r'\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\b', log)\nfor ip in ips:\n    print(ip)`,
        javascript: `const log = require('fs').readFileSync('/dev/stdin', 'utf8');\nconst matches = log.match(/\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\b/g);\nif(matches) { matches.forEach(ip => console.log(ip)); }`
    },
    testCases: [
        { input: 'Connection from 192.168.1.1 on port 80\nFailed login 10.0.0.5 invalid user', expected: '192.168.1.1\n10.0.0.5' }
    ],
    hiddenTestCases: [
        { input: 'Proxy 127.0.0.1 routed to 8.8.8.8 cleanly.', expected: '127.0.0.1\n8.8.8.8' },
        { input: 'No IPs here, just 123.45 and strings.', expected: '' }
    ],
    credits: 20,
    tags: ['regex', 'networking', 'devops-basics'],
  }
];
