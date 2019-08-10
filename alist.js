function AList () {
    this._array = [];
    this._length = 0;
}

AList.prototype = Object.create(List.prototype);
AList.prototype.constructor = AList;

AList.prototype.init = function (elements)  {

    if (elements) {

        for (let i = 0; i < elements.length; i++) {
            this._array[i] = elements[i];
            this._length++;
        }

    }

    return this._array;
};

AList.prototype.getArray = function () {
    return this._array;
};

AList.prototype.getSize = function () {
    return this._length;
};

AList.prototype.toString = function () {
    let string = '"[';

    for (let i = 0; i < this._length; i++) {
        string += `${this._array[i]}`;
        if (i !== this._length - 1) {
            string += ', ';
        }
    }

    string += ']"';

    return string;
};

AList.prototype.push = function (element) {

    if (element || element === 0) {
        this._array[this._length] = element;
        this._length++;
    }

    return this._length;
};

AList.prototype.pop = function () {
    let lastElem;

    if (this._length !== 0) {
        lastElem = this._array[this._length - 1];
        this._array.length--;
        this._length--;
    }

    return lastElem;
};

AList.prototype.shift = function () {
    let firstElem = this._array[0];

    if (this._length !== 0) {

        for (let i = 0; i < this._length - 1; i++) {
            this._array[i] = this._array[i + 1];
        }

        this._length--;
        this._array.length--;
    }

    return firstElem;
};

AList.prototype.unshift = function (element) {
    if (element !== void 0) {

        for (let i = this._length; i > 0; i--) {
            this._array[i] = this._array[i - 1];
        }

        this._array[0] = element;
        this._length++;
    }

    return this._length;
};

AList.prototype.slice = function (startIndex, finishIndex) {
    let newArray = [];

    if(!startIndex && startIndex !== 0) {
        return this._array;
    }

    if (!finishIndex && finishIndex !== 0) {

        for (let i = 0; i < this._length - startIndex; i++) {
            newArray[i] = this._array[i + startIndex];
        }

    } else if (startIndex > finishIndex){
        return [];
    } else {

        if (finishIndex > this._length) {
            finishIndex = this._length;
        }

        for (let i = 0, j = startIndex; i < this._length, j < finishIndex; i++, j++) {
            newArray[i] = this._array[j];
        }

    }

    return newArray;
};

AList.prototype.splice = function (startIndex, amountDelete, ...insertElement) {
    let definedStartIndex = 0;
    let definedAmountDelete = 0;
    let definedInsertElem = [];
    let spliceArray = [];

    if (!startIndex) {
        definedStartIndex = 0;
    } else if (!!Number(startIndex)) {

        if (startIndex > this._length) {
            definedStartIndex = this._length;
        } else if (startIndex < -this._length) {
            definedStartIndex = 0;
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

    let leftPart = this.slice(0, definedStartIndex);

    let rightPart = this.slice(definedStartIndex + definedAmountDelete);

    this._array = [...leftPart, ...definedInsertElem, ...rightPart];

    return spliceArray;
};

AList.prototype.sort = function (comparator = sortFunc0) {

    for (let i = 0; i < this._length; i++) {
        for (let j = 0; j < this._length - i - 1; j++){
            if (comparator(this._array[j], this._array[j + 1]) > 0) { //ascending
                let temp = this._array[j];
                this._array[j] = this._array[j + 1];
                this._array[j + 1] = temp;
            }
        }
    }

    return this._array;
};

AList.prototype.get = function (index) {
    return this._array[index];
};

AList.prototype.set = function (index, value) {

    if (index >= 0 && index < this._length && this._length !==0) {
        this._array[index] = value;
    }

};