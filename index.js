/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-use-before-define */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-restricted-syntax */

class Node {
    constructor(xValue, yValue) {
        this.xValue = xValue;
        this.yValue = yValue;
    }
}

class Graph {
    constructor(noOfVertices) {
        this.noOfVertices = noOfVertices;
        this.AdjList = new Map();
    }

    addVertex(v)
    {
        this.AdjList.set(v, []);
    }

    findVertex(xValue, yValue) {
        const getKeys = this.AdjList.keys();
        for (const vertex of getKeys) {
            if (vertex.xValue === xValue && vertex.yValue === yValue) {
                return vertex;
            }
        }
        return null;
    }

    addEdge(v, w) {
        if (!this.AdjList.get(v).includes(w)) {
            this.AdjList.get(v).push(w);
            this.AdjList.get(w).push(v);
        }
    }

    printGraph() {
        // get all the vertices
        const getKeys = this.AdjList.keys();
    
        // iterate over the vertices
        for (const i of getKeys) {
            const getValues = this.AdjList.get(i);
            let conc = "";
    
            // iterate over the adjacency list
            // concatenate the values into a string
            for (const j of getValues)
                conc += `${j.xValue },${ j.yValue } `;

            console.log(`${i.xValue } , ${ i.yValue }  -> ${  conc} `);
        }
    }

    bfs(start, end) {

        let count = 0;

        const queue = [];
        queue.push(start);

        const visited = [];

        const appointed = []; // [[this node, appointed by this node]]

        while (queue.length !== 0) {
            const vert = queue.shift();

            if (vert === end) {
                console.log("Found it!");
                let currentSquare = end;
                let pathCount = 0;
                const path = [];
                for (const arr of appointed) {
                    if (arr[0] === end) {
                        path.push(end);
                        currentSquare = arr[1];
                        pathCount += 1;
                        while (currentSquare !== start) {
                            for (const arr2 of appointed) {
                                if (arr2[0] === currentSquare) {
                                    path.push(currentSquare);
                                    pathCount += 1;
                                    currentSquare = arr2[1];
                                }
                            }
                        }
                        path.push(currentSquare);
                    }
                }
                return path.reverse();
            }

            const adjacencyList = this.AdjList.get(vert);

            for (const square of adjacencyList) {
                if (!visited.includes(square) && !queue.includes(square)) {
                    queue.push(square);
                    const array = [square, vert];
                    appointed.push(array);
                }
            }
            visited.push(vert);
        }
    }
}

function createBoard() {
    const board = new Graph(64);
    for (let i = 0; i < 8; i += 1) {
        for (let j = 0; j < 8; j += 1) {
            const node = new Node(i, j);
            board.addVertex(node);
        }
    }
    return board;
}

function connectSquares(board) {
    for (let i = 0; i < 8; i += 1) {
        for (let j = 0; j < 8; j += 1) {
            const vertex = board.findVertex(i, j);

            const node1 = board.findVertex(i + 1, j + 2);
            const node2 = board.findVertex(i + 1, j - 2);
            const node3 = board.findVertex(i - 1, j + 2);
            const node4 = board.findVertex(i - 1, j - 2);

            const node5 = board.findVertex(i + 2, j - 1);
            const node6 = board.findVertex(i + 2, j + 1);
            const node7 = board.findVertex(i - 2, j + 1);
            const node8 = board.findVertex(i - 2, j - 1);
            if (node1) { board.addEdge(vertex, node1) }
            if (node2) { board.addEdge(vertex, node2) }
            if (node3) { board.addEdge(vertex, node3) }
            if (node4) { board.addEdge(vertex, node4) }
            if (node5) { board.addEdge(vertex, node5) }
            if (node6) { board.addEdge(vertex, node6) }
            if (node7) { board.addEdge(vertex, node7) }
            if (node8) { board.addEdge(vertex, node8) }
        }
    }
}

function knightMoves(startSquare, endSquare) {
    const board = createBoard();
    connectSquares(board);

    const start = board.findVertex(startSquare[0], startSquare[1]);
    const end = board.findVertex(endSquare[0], endSquare[1]);

    const path = board.bfs(start, end);

    let str = `You've made it in ${ path.length - 1 } moves! Here's the path: ` ;

    path.forEach(vertex => {str += `\n ( ${vertex.xValue}, ${vertex.yValue} )` });

    console.log(str);
}

knightMoves([0,0], [7, 7]);