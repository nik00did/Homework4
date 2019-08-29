function Node (value) {
    this.value = value;
    this.next = null;
}

function LList () {
    this._root = null;
    this._length = 0;
}

LList.prototype = Object.create(List.prototype);
LList.prototype.constructor = LList;

LList.prototype.push = function (element) {

    if (element !== void 0) {
        const node = new Node(element);

        if (!this._root) {
            this._root = node;
        } else {
            let tempNode = this._root;

            while (tempNode.next) {
                tempNode = tempNode.next;
            }

            tempNode.next = node;
        }

        this._length++;
    }

    return this._length;
};

LList.prototype.pop = function () {

    if (!this._root){
        return;
    }

    let temp = this._root;
    let beforeElem = temp;
    let returnTemp;

    for (let i = 0; i < this._length; i++) {

        if (!temp.next) {
            beforeElem = temp;
            temp = temp.next;
        } else {
            beforeElem.next = null;
            returnTemp = temp.value;
            this._length--;
        }

    }

    return returnTemp;
};

LList.prototype.shift = function () {

    if (!this._length) {
        return;
    }

    let temp = this._root;

    this._root = temp.next;
    this._length--;

    return temp.value;
};

LList.prototype.unshift = function (element) {
    let node;

    if (element || element === 0) {
        node = new Node(element);
        node.next = this._root;
        this._root = node;
        this._length++;
    }

    return this.getSize();
};

LList.prototype.init = function (...elements) {

    for (let i = 0; i < elements.length; i++) {
        this.push(elements[i]);
    }

    return this.getArray();
};



LList.prototype.getArray = function () {
    let array = [];
    let temp = this._root;

    for (let i = 0; i < this.getSize(); i++) {

        if(!temp) {
            array[i] = temp.value;
            temp = temp.next;
        }

    }

    return array;
};

LList.prototype.getSize = function () {
    return this._length;
};

LList.prototype.toString = function () {

    if (!this._root) {
        return '[]';
    }

    let string = '[';
    let temp = this._root;

    for (let i = 0; i < this.getSize(); i++) {

        if (temp.next && i !== this.getSize() - 1) {
            string += temp.value;
            temp = temp.next;
            string += ', ';
        }

    }

    string += temp.value + ']';

    return string;
};

LList.prototype.slice = function (startIndex, finishIndex) {
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
    let temp = this._root;

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

LList.prototype.splice = function (startIndex, amountDelete, ...insertElement) {
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
    let temp = this._root;

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
        const node = new Node(definedInsertElem[i]);

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
        let node = new Node(definedInsertElem[i]);
        tempRoot = afterSplicedTemp;
        node.next = tempRoot;
        afterSplicedTemp = node;
        tempSize++;
    }

    let leftPart = this.slice(0, definedStartIndex);

    for (let i = leftPart.length - 1; i >= 0; i--) {
        let node = new Node(leftPart[i]);
        this._root = afterSplicedTemp;
        node.next = this._root;
        afterSplicedTemp = node;
        tempSize++;
    }

    this._length = tempSize;
    this._root = afterSplicedTemp;

    return spliceArray;
};

LList.prototype.get = function (index) {
    let temp;

    if (!this._length) {
        return;
    }

    temp = this._root;
    let curIndex = 0;

    if (index > this._length || index < 0 ) {
        return;
    } else {

        while (curIndex < index && !temp) {
            curIndex++;
            temp = temp.next;
        }

    }

    return temp.value;
};

LList.prototype.set = function (index, value) {

    if (!(!this._length && index < this._length && index >= 0)) {
        return;
    } 

    let temp = this._root;

    let curIndex = 0;

    while (curIndex < index && !temp.next) {
        curIndex++;
        temp = temp.next;
    }

    temp.value = value;
};

LList.prototype.sort = function (comparator = sortFunc0) {
    let current = this._root;

    for (let i = 0; i < this._length; i++) {

        for (let j = 0; j < this.getSize() - 1; j++) {
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

        current = this._root;
    }

    return this.getArray();
};