## [739. 每日温度](https://leetcode-cn.com/problems/daily-temperatures/)

根据每日 `气温` 列表，请重新生成一个列表，对应位置的输出是需要再等待多久温度才会升高超过该日的天数。如果之后都不会升高，请在该位置用 `0` 来代替。

例如，给定一个列表 `temperatures = [73, 74, 75, 71, 69, 72, 76, 73]`，你的输出应该是 `[1, 1, 4, 2, 1, 1, 0, 0]`。

**提示：**`气温` 列表长度的范围是 `[1, 30000]`。每个气温的值的均为华氏度，都是在 `[30, 100]` 范围内的整数。

#### 我的解法：

先把每一日温度存进去，一旦后面有一天比前一天高，就不断把栈中数据弹出并记录。

**javascript：**

```js
import Stack from '../../stack/seqstack.js'
/**
 * @param {number[]} T
 * @return {number[]}
 */
var dailyTemperatures = function (T) {
    let n = T.length;
    let ans = new Array(n).fill(0);
    let stk = new Stack();
    for (let i = 0; i < n - 1; i++) {
        while (!stk.isEmpty() && T[stk.peek()] < T[i]) {
            let currentIdx = stk.pop()
            ans[currentIdx] = i - currentIdx
        }
        stk.push(i);
    }
    return ans
};

```

**Golang：**

```go
func dailyTemperatures(T []int) []int {
	n := len(T)
	stk := STACK.NewSeqStack(n)
	ans := make([]int, n)
	for i := range T {
		for !stk.IsEmpty() && T[stk.Peek().(int)] < T[i] {
			currentIdx := stk.Pop().(int)
			ans[currentIdx] = i - currentIdx
		}
		stk.Push(i)
	}
	return ans
}

```

