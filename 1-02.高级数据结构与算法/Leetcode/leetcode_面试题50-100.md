

## [面试题64. 求1+2+…+n](https://leetcode-cn.com/problems/qiu-12n-lcof/)

#### 题目描述：

求 `1+2+...+n` ，要求不能使用乘除法、for、while、if、else、switch、case等关键字及条件判断语句（A?B:C）。

**示例 1：**

```
输入: n = 3
输出: 6
```

**示例 2：**

```
输入: n = 9
输出: 45
```

#### 我的解答：

**javascript：**

我们可以使用 && 来代替条件判断：

```js
/**
 * @param {number} n
 * @return {number}
 */
var sumNums = function(n) {
    return dfs(n)
};

function dfs(n) {
    n>0 && (n+=dfs(n-1))
    return n
}
```

**golang：**

由等差数列求和公式我们可以知道 (1+....+n == n*(n+1)/2)，对于除以 2 我们可以用右移操作符来模拟，那么等式变成了 n(n+1)>>1，根据上文提及的快速乘，我们可以将两个数(n, n+1)相乘用加法和位运算来模拟。

```go
func sumNums(n int) int {
	ans := 0
	qm(n, n+1, &ans)
	return ans >> 1
}

func qm(a, b int, ans *int) bool {
	cond := b&1 > 0

	addGreatZero := func() bool {
		*ans += a
		return *ans > 0
	}

	_ = cond && addGreatZero()
	a <<= 1
	b >>= 1

	_ = (b != 0) && qm(a, b, ans)
	return true
}
```

#### 我的题解：

![image-20200602133851359](assets/image-20200602133851359.png)