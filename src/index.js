module.exports = function solveSudoku(matrix) {
    function getNum() {
        for (var row = 0; row < 9; row++) {
            for (var col = 0; col < 9; col++) {
                if (matrix[row][col] === 0) {
                    return { row, col };
                }
            }
        }
    }

    function setNum(num, value) {
        matrix[num.row][num.col] = value;
    }

    function clearNum(num) {
        setNum(num, 0);
    }

    function Valid(num, value) {
        if (matrix[num.row].indexOf(value) > -1) {
            return false;
        }

        if (matrix.some(row => row[num.col] === value)) {
            return false;
        }

        var BRow = Math.floor(num.row / 3) * 3;
        var BCol = Math.floor(num.col / 3) * 3;

        for (var row = 0; row < 3; row++) {
            for (var col = 0; col < 3; col++) {
                if (matrix[BRow + row][BCol + col] === value) {
                    return false;
                }
            }
        }

        return true;
    }

    (function solve() {
        var num = getNum();

        if (!num) {
            return true;
        }

        for (var value = 1; value <= 9; value++) {
            if (!Valid(num, value)) {
                continue;
            }

            setNum(num, value);

            if (solve()) {
                return true;
            }
        }

        clearNum(num);
        return false;
    }());

    return matrix;
}