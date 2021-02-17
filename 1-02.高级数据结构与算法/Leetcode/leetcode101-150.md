## [102. 二叉树的层次遍历](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/)

给定一个二叉树，返回其按层次遍历的节点值。 （即逐层地，从左到右访问所有节点）。

**例如:**

```go
// 给定二叉树: [3,9,20,null,null,15,7]
		3
   / \
  9  20
    /  \
   15   7
// 返回其层次遍历结果：
[
  [3],
  [9,20],
  [15,7]
]
```

#### 我的解法：

层级BFS，做题的时候忘了queue能看容量了，写的有点傻。

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */

func levelOrder(root *TreeNode) [][]int {
	res := make([][]int, 0)
    if root == nil {
        return res
    }
	queue := NewLinkedQueue()
	queue.Add(root)

	for !queue.IsEmpty() {
		store := make([]int, 0)
		preNodes := make([]*TreeNode, 0)
		for !queue.IsEmpty() {
			cur := queue.Poll().(*TreeNode)
			store = append(store, cur.Val)

			if cur.Left != nil {
				preNodes = append(preNodes, cur.Left)
			}

			if cur.Right != nil {
				preNodes = append(preNodes, cur.Right)
			}
		}
		for _, v := range preNodes {
			queue.Add(v)
		}
		res = append(res, store)
	}

	return res
}
```

## [120. 三角形最小路径和](https://leetcode-cn.com/problems/triangle/)

#### 题目描述：

给定一个三角形，找出自顶向下的最小路径和。每一步只能移动到下一行中相邻的结点上。

> **相邻的结点** 在这里指的是 `下标` 与 `上一层结点下标` 相同或者等于 `上一层结点下标 + 1` 的两个结点。

例如，给定三角形：

```
[
  [2],
	[3,4],
  [6,5,7],
  [4,1,8,3]
]
```

自顶向下的最小路径和为 `11`（即，**2** + **3** + **5** + **1** = 11）。 

**说明：**

如果你可以只使用 *O*(*n*) 的额外空间（*n* 为三角形的总行数）来解决这个问题，那么你的算法会很加分。

#### 我的解法：

动态转移方程：`dp[i][j] = max(dp[i+1][j] ,dp[i+1][j+1]) `

```js

func minimumTotalTopDown(triangle [][]int) int {
	n := len(triangle)
	dp := make([][]int, n)
	for idx := range triangle {
		dp[idx] = make([]int, len(triangle[idx]))
	}

	res := dfs2(triangle, dp, 0, 0)
	return res
}

func dfs2(triangle [][]int, dp [][]int, n, i int) int {
	if n == len(triangle)-1 {
		return triangle[n][i]
	}
	if dp[n][i] != 0 {
		return dp[n][i]
	}
	bestChoice := math.MaxInt64
	bestChoice = min(bestChoice, dfs2(triangle, dp, n+1, i)+triangle[n][i])
	bestChoice = min(bestChoice, dfs2(triangle, dp, n+1, i+1)+triangle[n][i])
	dp[n][i] = bestChoice
	return bestChoice
}
```

分析dp数组之后可以写出动态规划解法：

```go
func minimumTotal(triangle [][]int) int {
	n := len(triangle)
	if n == 0 {
		return 0
	}
	for i := n - 2; i >= 0; i-- {
		for j := len(triangle[i]) - 1; j >= 0; j-- {
			triangle[i][j] = min(triangle[i+1][j], triangle[i+1][j+1]) + triangle[i][j]
		}
	}
	return triangle[0][0]
}
```

## [121. 买卖股票的最佳时机](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/)

#### 题目描述：

给定一个数组，它的第 *i* 个元素是一支给定股票第 *i* 天的价格。

如果你最多只允许完成一笔交易（即买入和卖出一支股票一次），设计一个算法来计算你所能获取的最大利润。

> 注意：你不能在买入股票前卖出股票。

**示例 1:**

```
输入: [7,1,5,3,6,4]
输出: 5
解释: 在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
     注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。
```

**示例 2:**

```
输入: [7,6,4,3,1]
输出: 0
解释: 在这种情况下, 没有交易完成, 所以最大利润为 0。
```

#### 我的解法：

一次遍历，每轮记录当前的最最小值，并且计算当前的股票价格与最小价格的差值，取最大值并记录。

```go
func maxProfit(prices []int) int {
    minPrice, maxProfit := math.MaxInt32, 0
    for i := range prices {
        curProfit := 0
        if minPrice > prices[i] {
            minPrice = prices[i]
        } else {
            curProfit = prices[i] - minPrice
        }
        maxProfit = max(maxProfit, curProfit)
    }
    return maxProfit
}
```

## [123. 买卖股票的最佳时机 III](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iii/)

#### 题目描述：

给定一个数组，它的第 *i* 个元素是一支给定的股票在第 *i* 天的价格。

设计一个算法来计算你所能获取的最大利润。你最多可以完成 *两笔* 交易。

> **注意:** 你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。

**示例 1:**

```
输入: [3,3,5,0,0,3,1,4]
输出: 6
解释: 在第 4 天（股票价格 = 0）的时候买入，在第 6 天（股票价格 = 3）的时候卖出，这笔交易所能获得利润 = 3-0 = 3 。
     随后，在第 7 天（股票价格 = 1）的时候买入，在第 8 天 （股票价格 = 4）的时候卖出，这笔交易所能获得利润 = 4-1 = 3 。
```

**示例 2:**

```
输入: [1,2,3,4,5]
输出: 4
解释: 在第 1 天（股票价格 = 1）的时候买入，在第 5 天 （股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。   
     注意你不能在第 1 天和第 2 天接连购买股票，之后再将它们卖出。   
     因为这样属于同时参与了多笔交易，你必须在再次购买前出售掉之前的股票。
```

**示例 3:**

```
输入: [7,6,4,3,1] 
输出: 0 
解释: 在这个情况下, 没有交易完成, 所以最大利润为 0。
```

#### 我的题解：

https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iii/solution/yi-ge-tong-yong-fang-fa-tuan-mie-6-dao-gu-piao-wen/

```go
func maxProfit(prices []int) int {
	n := len(prices)
    if n == 0 {
        return 0
    }
	max_k := 2
	dp := make([][][]int, n)
	for idx := range dp {
		dp[idx] = make([][]int, max_k+1)
		for iidx := range dp[idx] {
			dp[idx][iidx] = make([]int, 2)
		}
	}
	for i := 0; i < n; i++ {
		for k := max_k; k >= 1; k-- {
			if i-1 == -1 {
				dp[i][k][0] = 0
				dp[i][k][1] = -prices[i]
                continue;
			}
			dp[i][k][0] = max(dp[i-1][k][0], dp[i-1][k][1]+prices[i])
			dp[i][k][1] = max(dp[i-1][k][1], dp[i-1][k-1][0]-prices[i])
		}
	}
	return dp[n-1][max_k][0]
}
```

## 125. 验证回文串

[力扣（LeetCode）链接](https://leetcode-cn.com/problems/valid-palindrome/submissions/)

#### 题目描述：

给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。

**说明：**

本题中，我们将空字符串定义为有效的回文串。

#### **示例:**

```go
输入: "A man, a plan, a canal: Panama"
输出: true

输入: "race a car"
输出: false
```

#### 我的解法：

双指针，前后比对，过滤非字母。

```go
func isPalindrome(s string) bool {
	start := 0
	end := len(s) - 1

	for start < end {
		if !((s[start] >= 97 && s[start] <= 122) || (s[start] >= 65 && s[start] <= 90) || (s[start] >= 48 && s[start] <= 57)) {
			start++
			continue
		}
		if !((s[end] >= 97 && s[end] <= 122) || (s[end] >= 65 && s[end] <= 90) || (s[end] >= 48 && s[end] <= 57)) {
			end--
			continue
		}
		if s[start] != s[end] {
			if s[start] >= 65 && s[end] >= 65 {
				if (s[start]+32) != s[end] && (s[start]-32) != s[end] {
					return false
				}
			} else {
				return false
			}
		}
		start++
		end--
	}
	return true
}
```

## 127. 单词接龙

[力扣（LeetCode）链接](https://leetcode-cn.com/problems/word-ladder/)

#### 题目描述：

给定两单词（beginWord 和 endWord）和一个字典，找到从 beginWord 到 endWord 的最短转换序列的长度。转换遵循如下规则：

- 每次转换只能改变一个字母。
- 转换过程中的中间单词必须是字典中的单词。

**说明：**

- 如果不存在这样的转换序列，返回 0。
- 所有单词具有相同的长度。
- 所有单词只由小写字母组成。
- 字典中不存在重复的单词。
- 你可以假设 beginWord 和 endWord 是非空的，且二者不相同。

#### **示例:**

```go
输入:
beginWord = "hit",
endWord = "cog",
wordList = ["hot","dot","dog","lot","log","cog"]

输出: 5
解释: 一个最短转换序列是 "hit" -> "hot" -> "dot" -> "dog" -> "cog", 返回它的长度 5。

输入:
beginWord = "hit"
endWord = "cog"
wordList = ["hot","dot","dog","lot","log"]

输出: 0
解释: endWord "cog" 不在字典中，所以无法进行转换。
```

#### 我的解法：

双向广度优先遍历，详解见笔记广度优先遍历。

```go
func ladderLength(beginWord string, endWord string, wordList []string) int {
	hasBeg := false
	idx1 := -1
	idx2 := -1
	count := 0
	for i, v := range wordList {
		if beginWord == v {
			hasBeg = true
			idx1 = i
		}

		if endWord == v {
			idx2 = i
		}
	}

	if idx2 == -1 {
		return 0
	}

	if !hasBeg {
		wordList = append(wordList, beginWord)
		idx1 = len(wordList) - 1
	}

	queue1 := NewLinkedQueue()
	queue2 := NewLinkedQueue()
	visited1 := make([]bool, len(wordList))
	visited2 := make([]bool, len(wordList))

	queue1.Add(beginWord)
	queue2.Add(endWord)
	visited1[idx1] = true
	visited2[idx2] = true
	for !queue1.IsEmpty() && !queue2.IsEmpty() {
		count++

		if queue1.Size() > queue2.Size() {
			queue1, queue2 = queue2, queue1
			visited1, visited2 = visited2, visited1
		}

		size := queue1.Size()

		for size > 0 {
			size--
			curEle := queue1.Poll()
			for i, v := range wordList {
				if visited1[i] {
					continue
				}

				if !conversable(curEle.(string), v) {
					continue
				}
				if visited2[i] {
					return count + 1
				}

				queue1.Add(wordList[i])
				visited1[i] = true
			}
		}
	}
	return 0
}

func conversable(originWord string, toWord string) bool {
	count := 0
	for i, v := range originWord {
		if toWord[i] == byte(v) {
			count++
		}
	}
	if count == len(originWord)-1 {
		return true
	}
	return false
}
```

## [128. 最长连续序列](https://leetcode-cn.com/problems/longest-consecutive-sequence/)

#### 题目描述：

给定一个未排序的整数数组，找出最长连续序列的长度。

要求算法的时间复杂度为 *O(n)*。

**示例:**

```
输入: [100, 4, 200, 1, 3, 2]
输出: 4
解释: 最长连续序列是 [1, 2, 3, 4]。它的长度为 4。
```

#### 我的解法：

数组用hashset去重，一次循环遍历，找到每个连续区段的起始值，递增直到在set中找不到对应的值。

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function(nums) {
    let numSet = new Set(nums)
    let maxLen = 0
    for (let item of numSet) {
        if (numSet.has(item-1)) {
            continue
        }
        let cur = 1
        let curNum = item
        while (numSet.has(curNum+1)) {
            cur++
            curNum++
           
        }
         maxLen = Math.max(cur, maxLen)
    }
    return maxLen
};
```

## [129. 求根到叶子节点数字之和](https://leetcode-cn.com/problems/sum-root-to-leaf-numbers/)

给定一个二叉树，它的每个结点都存放一个 `0-9` 的数字，每条从根到叶子节点的路径都代表一个数字。例如，从根到叶子节点路径 `1->2->3` 代表数字 `123`。计算从根到叶子节点生成的所有数字之和。

**示例 1:**

```go
输入: [1,2,3]
    1
   / \
  2   3
输出: 25
解释:
从根到叶子节点路径 1->2 代表数字 12.
从根到叶子节点路径 1->3 代表数字 13.
因此，数字总和 = 12 + 13 = 25.
```

**示例 2:**

```go
输入: [4,9,0,5,1]
    4
   / \
  9   0
 / \
5   1
输出: 1026
解释:
从根到叶子节点路径 4->9->5 代表数字 495.
从根到叶子节点路径 4->9->1 代表数字 491.
从根到叶子节点路径 4->0 代表数字 40.
因此，数字总和 = 495 + 491 + 40 = 1026.
```

#### 我的解法：

深度优先遍历

```go
func sumNumbers(root *TreeNode) int {
	if root == nil {
		return 0
	}
	return helper(root, 0)
}

func helper(root *TreeNode, i int) int {
	if root == nil {
		return 0
	}
	tmp := i*10 + root.Val
	if root.Left == nil && root.Right == nil {
		return tmp
	}
	return helper(root.Left, tmp) + helper(root.Right, tmp)
}
```

## [131. 分割回文串](https://leetcode-cn.com/problems/palindrome-partitioning/)

给定一个字符串 *s*，将 *s* 分割成一些子串，使每个子串都是回文串，返回 *s* 所有可能的分割方案。

**示例:**

```go
输入: "aab"
输出:
[
  ["aa","b"],
  ["a","a","b"]
]
```

#### 我的解法：

又是一道回溯题，画出递归树，这里我用一个数组储存每一个分割的结果集。

![image-20200320102819067](http://image.innoweb.cn/2020-06-25-141442.png)

```go
func partition(s string) [][]string {
	res := make([][]string, 0)
	segs := make([]int, 1)
	handler(s, segs, &res)
	return res
}

func handler(s string, segs []int, res *[][]string) {
	lastSeg := segs[len(segs)-1]
	if lastSeg == len(s) {
		tmp := make([]string, 0)
		for i := 1; i < len(segs); i++ {
			start := segs[i-1]
			end := segs[i]
			tmp = append(tmp, s[start:end])
		}
		*res = append(*res, tmp)
	}

	for i := lastSeg + 1; i <= len(s); i++ {
		if isPalindromePro(s[lastSeg:i]) {
			tmp := append(segs, i)
			handler(s, tmp, res)
		}
	}
}

func isPalindromePro(s string) bool {}
```

## [136. 只出现一次的数字](https://leetcode-cn.com/problems/single-number/)

给定一个**非空**整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。

**说明：**

你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？

**示例 1:**

```
输入: [2,2,1]
输出: 1
```

**示例 2:**

```
输入: [4,1,2,1,2]
输出: 4
```

#### 我的解法：

对于这道题我们知道`a ^ b ^ b = a` 所以只要将所有的数异或起来，就可以得到唯一的那个数，因为相同的数出现的两次，异或两次等价于没有任何操作。

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    let num = 0
    nums.forEach(item => {
        num = num ^ item
    })
    return num
};
```

## [144. 二叉树的前序遍历](https://leetcode-cn.com/problems/binary-tree-preorder-traversal/)

给定一个二叉树，返回它的 *前序* 遍历。

 **示例:**

```
输入: [1,null,2,3]  
   1
    \
     2
    /
   3 

输出: [1,2,3]
```

**进阶:** 递归算法很简单，你可以通过迭代算法完成吗？

#### 我的解法：

```js
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function (root) {
    const stk = new Stack()
    const ans = []
    let cur = root
    while (cur != null || !stk.isEmpty()) {
        while (cur != null) {
            stk.push(cur)
            cur = cur.left
        }
        cur = stk.pop()
        ans.push(cur.val)
        cur = cur.right
    }
    return ans
};
```

