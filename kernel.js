
const rgbMatrix = [
    [[178, 178, 178], [153, 153, 153], [127, 127, 127], [127, 127, 127], [153, 153, 153], [178, 178, 178]],
    [[178, 178, 178], [153, 153, 153], [127, 127, 127], [127, 127, 127], [153, 153, 153], [178, 178, 178]],
    [[153, 153, 153], [102, 102, 102], [76, 76, 76], [76, 76, 76], [102, 102, 102], [153, 153, 153]],
    [[127, 127, 127], [76, 76, 76], [51, 51, 51], [51, 51, 51], [76, 76, 76], [127, 127, 127]],
    [[127, 127, 127], [76, 76, 76], [51, 51, 51], [51, 51, 51], [76, 76, 76], [127, 127, 127]],
    [[153, 153, 153], [102, 102, 102], [76, 76, 76], [76, 76, 76], [102, 102, 102], [153, 153, 153]],
    [[178, 178, 178], [153, 153, 153], [127, 127, 127], [127, 127, 127], [153, 153, 153], [178, 178, 178]],
    [[178, 178, 178], [153, 153, 153], [127, 127, 127], [127, 127, 127], [153, 153, 153], [178, 178, 178]]
];


// function generateRandomRGBMatrix(rows, cols) {
//     const rgbMatrix_2 = [];
//     for (let i = 0; i < rows; i++) {
//         const row = [];
//         for (let j = 0; j < cols; j++) {
//             const rgb = [
//                 Math.floor(Math.random() * 256), // Red
//                 Math.floor(Math.random() * 256), // Green
//                 Math.floor(Math.random() * 256)  // Blue
//             ];
//             row.push(rgb);
//         }
//         rgbMatrix_2.push(row);
//     }
//     return rgbMatrix_2;
// }

// const randomRGBMatrix = generateRandomRGBMatrix(32, 32);

// Edge 
const kanten = [
    [0, -1, 0],
    [-1, 4, -1],
    [0, -1, 0],
]

// sharpen
const schaerfung = [
    [0, -1, 0],
    [-1, 5, -1],
    [0, -1, 0],
]

const blurring =
    [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
    ]

const guassian_blur = [
    [
        1, 2, 1
    ],
    [2, 4, 2],
    [1, 2, 1]
]

const relief = [
    [-2, -1, 0],
    [-1, 1, 1],
    [0, 1, 2],
]

const kernel_factor = 1 // 16;

const add_rows_columns = (array) => {
    for (let i = 0; i < array.length; i++) {
        array[i] = [array[i][0], ...array[i], array[i][array[i].length - 1]]
    };

    array =
        [
            array[0],
            ...array,
            array[array.length - 1]
        ];

    return array;
}

const apply_gaussian_filter = (array, kernel) => {
    const processed_array = add_rows_columns(array);
    let new_array = [];
    for (let i = 1; i < processed_array?.length - 1; i++) {

        new_array = [...new_array, []];
        for (let j = 1; j < processed_array[i]?.length - 1; j++) {

            let transformed = [[], [], []];

            for (k = 0; k < processed_array[i - 1][j - 1]?.length; k++) {

                const sum = processed_array[i - 1][j - 1][k] * kernel[0][0] +
                    processed_array[i - 1][j][k] * kernel[0][1] +
                    processed_array[i - 1][j + 1][k] * kernel[0][2] +
                    processed_array[i][j - 1][k] * kernel[1][0] +
                    processed_array[i][j][k] * kernel[1][1] +
                    processed_array[i][j + 1][k] * kernel[1][2] +
                    processed_array[i + 1][j - 1][k] * kernel[2][0] +
                    processed_array[i + 1][j][k] * kernel[2][1] +
                    processed_array[i + 1][j + 1][k] * kernel[2][2];

                transformed[k] = sum * kernel_factor;
            }

            new_array[i - 1] = [...new_array[i - 1], transformed];
        }

    }
    return new_array;

}
