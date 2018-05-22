'use strict';

class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
    //if the tree is empty then this key being inserted is the root node of the tree
    if (this.key == null) {
      this.key = key;
      this.value = value;
    }

    //If the tree already exist, then start at the root, 
    //and compare it to the key you want to insert
    // If the new key is less than the node's key 
    //then the new node needs to live in the left-hand branch.
    else if (key < this.key) {
      //if the existing node does not have any left child, 
      //meaning that if the `left` pointer is empty 
      //then we can just instantiate and insert the new node 
      //as the left child of that node, passing `this` as the parent.  
      if (this.left == null) {
        this.left = new BinarySearchTree(key, value, this);
      }
      //if the node has an existing left child, 
      //then we recursively call the `insert` method 
      //so the node is added further down the tree.
      else {
        this.left.insert(key, value);
      }
    }
    //Similarly, if the new key is greater than the node's key 
    //then you do the same thing, but on the right-hand side.
    else {
      if (this.right == null) {
        this.right = new BinarySearchTree(key, value, this);
      }
      else {
        this.right.insert(key, value);
      }
    }
  }

  find(key) {
    //if the item is found at the root then return that value
    if (this.key == key) {
      return this.value;
    }
    //if the item you are looking for is less than the root 
    //then follow the left child
    //if there is an existing left child, 
    //then recursively check its left and/or right child
    //until you find the item.
    else if (key < this.key && this.left) {
      return this.left.find(key);
    }
    //if the item you are looking for is greater than the root 
    //then follow the right child
    //if there is an existing right child, 
    //then recursively check its left and/or right child
    //until you find the item.
    else if (key > this.key && this.right) {
      return this.right.find(key);
    }
    //You have search the treen and the item is not in the tree
    else {
      throw new Error('Key Error');
    }
  }

  count(key, count = 0) {
    if (this.key === key) {                
      return count;
    }
    else if (key < this.key && this.left) {
      count++;
      return this.left.count(key, count)
    } else if (key > this.key && this.right) {
      count++;
      return this.right.count(key, count);
    }
  }

  remove(key) {
    if (this.key == key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      }
      //If the node only has a left child, 
      //then you replace the node with its left child.  
      else if (this.left) {
        this._replaceWith(this.left);
      }
      //And similarly if the node only has a right child 
      //then you replace it with its right child.
      else if (this.right) {
        this._replaceWith(this.right);
      }
      //If the node has no children then
      //simply remove it and any references to it 
      //by calling "this._replaceWith(null)".
      else {
        this._replaceWith(null);
      }
    }
    else if (key < this.key && this.left) {
      this.left.remove(key);
    }
    else if (key > this.key && this.right) {
      this.right.remove(key);
    }
    else {
      throw new Error('Key Error');
    }
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this == this.parent.left) {
        this.parent.left = node;
      }
      else if (this == this.parent.right) {
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent;
      }
    }
    else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      }
      else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }
}

function findHeight(tree) {
  let currNode = tree;
  let smallest = tree.key;
  let largest = tree.key;
  while (currNode.right !== null) {
    currNode = currNode.right;
    if (currNode.key > largest) {
      largest = currNode.key;   
    }
  }
  currNode = tree;
  while (currNode.left !== null) {
    currNode = currNode.left;
    if (currNode.key < smallest) {
      smallest = currNode.key;
    }
  }
  let highest = 0;
  for (let i=smallest; i <= largest; i++) {
    let count = tree.count(i);
    if (count > highest) {
      highest = count;
    }
  }
  return highest;
}

/*
Sarah's solution
 math.max using the 
*/

function isBST(tree) {
  if (tree.left !== null && tree.right !== null) {
    if (tree.key < tree.left.key) {
      return false;
    } else if (tree.key > tree.right.key) {
      return false;
    } else {
      if (isBST(tree.left) === false) {
        return false;
      }
      if (isBST(tree.right) === false) {
        return false;
      }
    }
  }
  else if (tree.left !== null) {
    if (tree.key < tree.left.key) {
      return false;
    }
    if (isBST(tree.left) === false) {
      return false;
    }
  }
  //tree.key > tree.right.key
  else if (tree.right !== null) {
    if (tree.key > tree.right.key) {
      return false;
    }
    if (isBST(tree.right) === false) {
      return false;
    }
  }
  return true;
}

// function thirdLargestNode(tree, max=1) {
// //   let currNode = tree;
// //   let smallest = tree.key;
// //   let largest = tree.key;
// //   while (currNode.right !== null) {
// //     currNode = currNode.right;
// //     if (currNode.key > largest) {
// //       largest = currNode.key;   
// //     }
// //   }
// //   currNode = tree;
// //   while (currNode.left !== null) {
// //     currNode = currNode.left;
// //     if (currNode.key < smallest) {
// //       smallest = currNode.key;
// //     }
// //   }
// //   let highest = 0;
// //   for (let i=smallest; i <= largest; i++) {
// //     let count = tree.count(i);
// //     if (count > highest) {
// //       highest = count;
// //     }
// //   }
// //   return highest;
//   if (max === 2) {
//     if (tree.right) {
//       thirdLargestNode(tree.right);
//     }
//     else {
//       return tree.key;
//     }
//   }
//   if (tree.right.right.right) {
//     thirdLargestNode(tree.right);
//   }
//   if (tree.right.left) {
//     thirdLargestNode(tree.right.left, max++);
//   }
//   return tree.key; 
// }



function isBalanced(tree) {
    let lowestCount = null;
    let highestCount = 0;
    let currNode = tree;
    let smallest = tree.key;
    let largest = tree.key;
    while (currNode.right !== null) {
        currNode = currNode.right;
        if (currNode.key > largest) {
            largest = currNode.key   
        }
    }
    currNode = tree
    while (currNode.left !== null) {
        currNode = currNode.left;
        if (currNode.key < smallest) {
            smallest = currNode.key
        }
    }
    for (let i=smallest; i <= largest; i++) {
        let count;
        try {
            let find = tree.findNode(i)
            if (find.left === null && find.right === null) {
                count = tree.count(i)
            }
        } catch (err) {}
        if (!lowestCount) {
            lowestCount = count
        }
        if (count > highestCount) {
            highestCount = count;
        } else if (count < lowestCount) {
            lowestCount = count;
        }
    }
    
    if (lowestCount < highestCount -1) {
        return false;
    }
    return true;
}
// isBalanced(bst);
console.log(isBalanced(bst))

function isBalanced(tree) {
    let lowestCount = -1;
    let highestCount = 0;

  let currNode = tree;
  let smallest = tree.key;
  let largest = tree.key;
  while (currNode.right !== null) {
    currNode = currNode.right;
    if (currNode.key > largest) {
      largest = currNode.key;   
    }
  }
  currNode = tree;
  while (currNode.left !== null) {
    currNode = currNode.left;
    if (currNode.key < smallest) {
      smallest = currNode.key;
    }
  }

  for (let i=smallest; i <= largest; i++) {
    let count = tree.count(i);
    if (lowestCount === null) {
        lowestCount = count;
    }
    else if (lowestCount > count) {
        lowestCount = count;
    }
    if (highest)
  }
}

function thirdLargestNode(tree, first = 0, second = 0, third = 0) {

  let currNode = tree;
  let smallest = tree.key;
  let largest = tree.key;
  while (currNode.right !== null) {
    currNode = currNode.right;
    if (currNode.key > largest) {
      largest = currNode.key;   
    }
  }
  currNode = tree;
  while (currNode.left !== null) {
    currNode = currNode.left;
    if (currNode.key < smallest) {
      smallest = currNode.key;
    }
  }

  for (let i=smallest; i <= largest; i++) {
    try {
      if (tree.find(i) > third) {
        third = tree.find(i);
      }
      while (third > second) {
        let placeholder = second;
        second = third;
        third = placeholder;
      }
      while (second > first) {
        let placeholder = first;
        first = second;
        second = placeholder;
      }
    }
    catch (err) {}
  }

  return third;

}

const main = () => {
  let bst = new BinarySearchTree();
  bst.insert(3, 3);
  bst.insert(1, 1);
  bst.insert(4, 4);
  bst.insert(6, 6);
  bst.insert(9, 9);
  bst.insert(10, 10);
  bst.insert(2, 2);
  bst.insert(5, 5);
  bst.insert(7, 7);
  let fake = new BinarySearchTree();
  fake.insert(3, 3);
  fake.insert(1, 1);
  fake.insert(4, 4);
  fake.insert(6, 6);
  fake.insert(9, 9);
  fake.insert(10, 10);
  fake.insert(2, 2);
  fake.insert(5, 5);
  fake.insert(7, 7);
  fake.right.right.value = 2;
  console.log(thirdLargestNode(bst));
};

main();