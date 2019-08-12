function DoubleNode (value) {
    this.value = value;
    this.next = null;
    this.previous = null;
}

function DoubleLList () {
    this._head = null;
    this._tail = null;
    this._length = 0;
}

DoubleLList.prototype = Object.create(List.prototype);
DoubleLList.prototype.constructor = DoubleLList;

DoubleLList.prototype.push = function (element) {

    if (element !== void 0) {
        const node = new DoubleNode(element);

        if (this._head) {
            this._head = this._tail =  node;
        } else {
            this._tail.next = node;
            node.previous = this._tail;
            this._tail = node;
        }

        this._length++;
    }

    return this._length;
};

DoubleLList.prototype.init = function (...elements) {
    let array = [];

    if (elements) {

        for (let i = 0; i < elements.length; i++) {
            this.push(elements[i]);
            array[i] = elements[i];
        }

    }

    return array;
};

DoubleLList.prototype.pop = function () {
    let lastElement;

    if (this._length) {
        lastElement = this._tail.value;
        this._tail.next = null;
        this._tail = this._tail.previous;
        this._length--;
    }

    return lastElement;
};

DoubleLList.prototype.shift = function () {
    let firstElement;

    if (this._length !== 0) {
        firstElement = this._head.value;
        this._head = this._head.next;
        this._head.previous = null;
        this._length--;
    }

    return firstElement;
};

DoubleLList.prototype.unshift = function (element) {
    let node;

    if (element) {
        node = new DoubleNode(element);
        node.next = this._head;
        this._head = node;
        this._head.previous = node;
        this._length++;
    }

    return this._length;
};

DoubleLList.prototype.getSize = function () {
    return this._length;
};

DoubleLList.prototype.getArray = function () {
    let array = [];
    let temp = this._head;

    for (let i = 0; i < this._length; i++) {

        if(temp) {
            array[i] = temp.value;
            temp = temp.next;
        }

    }

    return array;
};

DoubleLList.prototype.toString = function () {
    let string = '"[';
    let temp;

    if (this._root) {
        temp = this._head;
    } else {
        return '"[]"';
    }

    for (let i = 0; i < this._length; i++) {

        if (temp.next && i !== this._length - 1) {
            string += temp.value;
            temp = temp.next;
            string += ', ';
        }

    }

    string += temp.value + ']"';

    return string;
};

DoubleLList.prototype.slice = function (startIndex, finishIndex) {
    if (this._length === 0 || startIndex < 0 ) {
        return this.getArray();
    }

    if (startIndex > this._length) {
        return [];
    }

    if (finishIndex < startIndex) {
        return [];
    }

    let start = startIndex;
    let finish = finishIndex;
    let array = [];
    let count = 0;
    let temp = this._head;

    if(!startIndex && startIndex !== 0) {
        start = 0;
    }

    if ((!finishIndex && finishIndex !== 0) || finishIndex > this._length) {
        finish = this._length;
    }

    for (let i = 0; i < finish; i++) {

        if (i === start) {
            array[count] = temp.value;
            count++;
            start++;
        }
        temp = temp.next;
    }

    return array;
};

DoubleLList.prototype.splice = function (startIndex, amountDelete, ...insertElement) {
    let definedStartIndex = 0;
    let definedAmountDelete = 0;
    let definedInsertElem = [];
    let spliceArray = [];
    let tempSize = 0;

    if (!startIndex) {
        definedStartIndex = 0;
    } else if (!!Number(startIndex)) {

        if (startIndex > this._length) {
            definedStartIndex = this._length;
        } else {
            definedStartIndex = parseInt(startIndex);
        }

    } else {
        return spliceArray;
    }

    if (!amountDelete || amountDelete <= 0) {
        definedAmountDelete = 0;
    } else if (!!Number(amountDelete)) {
        definedAmountDelete = parseInt(amountDelete);
    } else {
        definedAmountDelete = 0;
    }

    if (!insertElement) {
        definedInsertElem = null;
    } else {

        for (let i = 0; i < insertElement.length; i++) {
            definedInsertElem[i] = insertElement[i];
        }

    }

    spliceArray = this.slice(definedStartIndex,definedStartIndex + definedAmountDelete);

    let curIndex = 0;
    let temp = this._head;

    while (curIndex < definedStartIndex) {
        curIndex++;
        temp = temp.next;
    }

    let afterSplicedTemp = temp;

    while (curIndex < definedStartIndex + definedAmountDelete && afterSplicedTemp) {
        curIndex++;
        afterSplicedTemp = afterSplicedTemp.next;
    }

    let tempAfterSplicedTemp = afterSplicedTemp;

    while (tempAfterSplicedTemp) {
        tempAfterSplicedTemp = tempAfterSplicedTemp.next;
        tempSize++;
    }

    let tempRoot = null;

    for (let i = 0; i < definedInsertElem.length; i++ ) {
        const node = new DoubleNode(definedInsertElem[i]);

        if (!tempRoot) {
            tempRoot = node;
        } else {
            let tempNode = tempRoot;

            while (tempNode.next) {
                tempNode = tempNode.next;
            }

            tempNode.next = node;
        }

        tempSize++;
    }

    for (let i = definedInsertElem.length - 1; i >= 0; i--) {
        let node = new DoubleNode(definedInsertElem[i]);
        tempRoot = afterSplicedTemp;
        node.next = tempRoot;
        afterSplicedTemp = node;
        tempSize++;
    }

    let leftPart = this.slice(0, definedStartIndex);

    for (let i = leftPart.length - 1; i >= 0; i--) {
        let node = new DoubleNode(leftPart[i]);
        this._root = afterSplicedTemp;
        node.next = this._root;
        afterSplicedTemp = node;
        tempSize++;
    }

    this._length = tempSize;
    this._head = afterSplicedTemp;

    return spliceArray;
};

DoubleLList.prototype.get = function (index) {
    let temp;

    if (this._length) {
        temp = this._head;
    } else {
        return;
    }

    let curIndex = 0;

    if (index > this._length || index < 0 ) {
        return;
    } else {

        while (curIndex < index && temp) {
            curIndex++;
            temp = temp.next;
        }

    }

    return temp.value;
};

DoubleLList.prototype.set = function (index, value) {
    let temp;

    if (this._length && index < this._length && index >= 0) {
        temp = this._head;
    } else {
        return;
    }

    let curIndex = 0;

    while (curIndex < index && temp.next) {
        curIndex++;
        temp = temp.next;
    }

    temp.value = value;
};

DoubleLList.prototype.sort = function (comparator = sortFunc0) {
    let current = this._head;

    for (let i = 0; i < this._length; i++) {

        for (let j = 0; j < this._length - 1; j++) {
            let result = comparator(current.value, current.next.value);
            let temp = 0;

            if (result > 0) {
                temp = current.next.value;
                current.next.value = current.value;
                current.value = temp;
            }

            if (current.next) {
                current = current.next;
            } else {
                break;
            }

        }

        current = this._head;
    }

    return this.getArray();
};