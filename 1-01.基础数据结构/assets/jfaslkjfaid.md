# 堆

堆是一棵树，其每个节点都有一个键值，且每个节点的键值都大于等于/小于等于其父亲的键值。每个节点的键值都大于等于其父亲键值的堆叫做小根堆，否则叫做大根堆：

![](assets/687474703a2f2f7265736f757263652e6d757969792e636e2f696d6167652f32303230303332313137313035372e706e67.png)

堆主要支持的操作有：插入一个数、查询最小/大值、删除最小/大值、合并两个堆、减小一个元素的值。

优先队列的实现一般就是一个大根堆(优先级较高的在上面)。

## 堆结构

二叉堆的结构是一棵二叉树，并且是完全二叉树，每个结点中存有一个元素(或者说，有个权值)。

既然是一个完全二叉树，那存储方式肯定是树状数组，用一个序列 `h` 来表示堆。 `hi` 的两个儿子分别是 `h_2i` 和 `h_2i+1`，`1` 是根结点：![h 的堆结构](assets/binary-heap1.png)

对应的代码如下，``tree`` 储存树状数组，``size`` 储存堆大小，``isMaxium``是否为大根堆：

```go
// Heap is a binary tree implemented with an array
type Heap struct {
	tree []int
	size int
	// isMaxium determines whether the heap is a maximum heap or a minimum heap
	isMaximum bool
}
```

## 堆化

### 向下堆化

首先我们做一个函数`heapifydown`，他的功能就是从一个二叉树的节点开始向下堆化这个这个二叉树的一部分，这个一部分是由这个节点可达的最大值路径决定的，也就是说只用这一个函数不能完全堆化一个完全二叉树。

```go
func (h *Heap) heapifyDown(i, n int) {
	// get left and right node
	l := 2*i + 1
	r := 2*i + 2
	max := i

	// get the should swap one among l, r and i
	if l < n && ((h.tree[l] < h.tree[max]) && true) != h.isMaximum {
		max = l
	}
	if r < n && ((h.tree[r] < h.tree[max]) && true) != h.isMaximum {
		max = r
	}

	if max != i {
		h.tree[max], h.tree[i] = h.tree[i], h.tree[max]
		// heapify down
		h.heapifyDown(max, n)
	}
}
```

### 向上堆化

之后我们以同样的道理实现一个向上堆化 `heapifyUp` 的代码，向上堆化的代码要比向下的简单很多，因为之后当前节点和父级节点的比较：

```go
func (h *Heap) heapifyUp(i int) {
	// get parent
	p := (i - 1) / 2
	if p > 0 && ((h.tree[i] < h.tree[p]) && true) != h.isMaximum {
		h.tree[p], h.tree[i] = h.tree[i], h.tree[p]
		// heapify up
		h.heapifyUp(p)
	}
}
```

## 建堆

想要完全堆化一个二叉树，你就需要从最后一个结点的父级结点开始向下堆化（`heapify`）其子级结点，保证经过`(n-2)/2`次之后我们能够完全堆化这个二叉树，注意堆化的范围每次都是 `i` 到 `h.size`。

```go
func (h *Heap) buildHeap() {
	// get the parent of the last leaf node
	lst := h.size - 1
	plst := (lst - 1) / 2
	// heapify down each node
	for i := plst; i >= 0; i-- {
		h.heapifyDown(i, h.size)
	}
}
```

最后我们就可以写出创建堆数据结构的代码了，时间复杂度为 `O(nlogn)`：

```go
// New is the heap constructor
// isMaximum determines the heap direction.
// true for maximum, false for minimum.
func New(tree []int, isMaximum bool) *Heap {
	h := &Heap{
		tree:      tree,
		size:      len(tree),
		isMaximum: isMaximum,
	}
	h.buildHeap()
	return h
}
```

## 插入

首先我们将要插入的元素放入末尾，之后我们试探性的向上堆化：

```go
// Insert add node to heap and keep the heap heapified
func (h *Heap) Insert(node int) {
	h.tree = append(h.tree, node)
	h.size++
	h.heapifyUp(h.size - 1)
}
```

注意这里堆化的过程不会影响到其他子树的堆顺序，因为堆化过程中换上去的节点一定是比之前节点更大/更小(取决于对结构)的节点，这样不会破坏堆结构。

## 堆排序

堆排序的思想很简单，首先我们创造一个堆，这个堆的堆顶元素就是最大元素，我们将他和堆的末尾元素交换，之后堆的结构会被破坏，我们只需要从新堆堆顶元素进行堆化，同时堆化的范围`-1`，我们就能一次拿到其余的最大元素，到最后堆化范围只剩堆顶元素，排序就完成了。

<img src="F:\我的笔记\35.数据结构\assets\堆排序__1.png" alt="堆排序__1" style="zoom:60%;" />

```go
func (s *SeqHeap) HeapSort() []int {
	for i := s.size-1; i > 0; i--  {
		s.heapifydown(s.tree, i,0)
		swap(s.tree,i,0)
	}
	defer s.buildHeap(s.tree,s.size)		//这里堆的结构其实破坏了，变成了一个最小堆，所以我们重新建堆。
	arr := make([]int,s.size)				//返回排序好的数组。
	copy(arr,s.tree)		
	return arr
}
```
