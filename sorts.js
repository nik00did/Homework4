const sortFunc0 = (first, second) => {

    first = first.toString();
    second = second.toString();

    if(first > second) {
        return 1;
    } else if (first === second) {
        return 0;
    } else {
        return -1;
    }

};

const sortFunc1 = (first, second) => {

    if(first > second) {
        return 1;
    } else if (first === second) {
        return 0;
    } else {
        return -1;
    }

};

const sortFunc2 = (first, second) => first - second;