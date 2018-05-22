'use strict';

/*
    4
  3   6
1   5   7
          9
*/

class BST {
    constructor(key=null, value=null, parent=null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }
}