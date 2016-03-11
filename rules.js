// runCount = 63; start on col 6 or 7?

rule30 = {
    resurrect: {},
    kill: {}
};

rule30.resurrect.alive = [
    {}, 
    {right: true}
];

rule30.resurrect.dead = [{left: true}, {right: true, left: true}];
rule30.kill.alive = [{right: true}, {left: true}];
rule30.kill.dead = [{}, {right: true, left: true}];

function isNeighborConditionsMet (innerConditions, rightStatus, leftStatus) {
    var leftConditionMet = (innerConditions.left == (leftStatus === 'alive');
    var rightConditionMet = (innerConditions.right == (rightStatus === 'alive'));

    return leftConditionMet && rightConditionMet;
}

function isSelfConditionMet (shouldSelfAlive, selfStatus) {
   return shouldSelfAlive == (selfStatus === 'alive')
}

function isANeighborConditionMet (arrNeighborCond, rightStatus, leftStatus) {
    for (var i = 0; i < arrNeighborCond.length; i++) {
        var isConditionMet = isNeighborConditionsMet(arrNeighborCond[i], rightStatus, leftStatus);

        if (isConditionMet) return true;
    }
    return false;
}

function evaluateRuleSet (ruleObj, cell) {
    var cellStatus = gameUtilities.getStatus(cell);
    var neighbors = gameUtilities.getNeighbors(cell);
    var leftStatus = gameUtilities.getStatus(neighbors[0]);
    var rightStatus = gameUtilities.getStatus(neighbors[1]);
    var nextRow = gameUtilities.getNextRow(cell);
    var nextCell = nextRow[1];

    var isAliveConditionMet = isSelfConditionMet(true, cellStatus) && isANeighborConditionMet(ruleObj.resurrect.alive, rightStatus, leftStatus);

    var isDeadConditionMet = isSelfConditionMet(false, cellStatus) && isANeighborConditionMet(ruleObj.resurrect.dead, rightStatus, leftStatus)


    if (isAliveConditionMet || isDeadConditionMet) gameUtilities.resurrectCell(cell);

    isAliveConditionMet = isSelfConditionMet(true, cellStatus) && isANeighborConditionMet(ruleObj.kill.alive, rightStatus, leftStatus);

    isDeadConditionMet = isSelfConditionMet(false, cellStatus) && isANeighborConditionMet(ruleObj.kill.dead, rightStatus, leftStatus)

    
    if (isAliveConditionMet || isDeadConditionMet) gameUtilities.killCell(cell);
}



    var rules = {},

    rules.rule30 = function (neighbors, nextRow) {
        var leftNeighbor = neighbors[0];
        var rightNeighbor = neighbors[1];
        
        var aboveNextRow = nextRow[0]; // Next row, prev col
        var acrossNextRow = nextRow[1]; // Next row, same col
        var bottomNextRow = nextRow[2]; // Next row, next col

        // ********** RULE 30 **********
        if (gameUtilities.getStatus(cell) === 'alive') {
            // 3
            if (gameUtilities.getStatus(leftNeighbor) !== 'alive' && gameUtilities.getStatus(rightNeighbor) !== 'alive') {
                resurrect.push(acrossNextRow);
            }
            // 4
            if (gameUtilities.getStatus(leftNeighbor) !== 'alive' && gameUtilities.getStatus(rightNeighbor) === 'alive') {
                resurrect.push(acrossNextRow);
            }
            // 7
            if (gameUtilities.getStatus(leftNeighbor) === 'alive' && gameUtilities.getStatus(rightNeighbor) !== 'alive') {
                kill.push(acrossNextRow);
            }
            // 8
            if (gameUtilities.getStatus(leftNeighbor) === 'alive' && gameUtilities.getStatus(rightNeighbor) === 'alive') {
                kill.push(acrossNextRow);
            }
        }

        if (gameUtilities.getStatus(cell) !== 'alive') {
            // 1
            if (gameUtilities.getStatus(leftNeighbor) !== 'alive' && gameUtilities.getStatus(rightNeighbor) !== 'alive') {
                kill.push(acrossNextRow);
            }
            // 2
            if (gameUtilities.getStatus(leftNeighbor) !== 'alive' && gameUtilities.getStatus(rightNeighbor) === 'alive') {
                resurrect.push(acrossNextRow);
            }
            // 5
            if (gameUtilities.getStatus(leftNeighbor) === 'alive' && gameUtilities.getStatus(rightNeighbor) !== 'alive') {
                resurrect.push(acrossNextRow);
            }
            // 6
            if (gameUtilities.getStatus(leftNeighbor) === 'alive' && gameUtilities.getStatus(rightNeighbor) === 'alive') {
                kill.push(acrossNextRow);
            }
        }

        kill.forEach(gameUtilities.killCell);
        resurrect.forEach(gameUtilities.resurrectCell);        
    }


};

// // ********** RULE 54 **********
// if (gameUtilities.getStatus(cell) === 'alive') {
//     if (gameUtilities.getStatus(leftNeighbor) !== 'alive' && gameUtilities.getStatus(rightNeighbor) !== 'alive') {
//         resurrect.push(acrossNextRow);
//     }
// }

// if (gameUtilities.getStatus(cell) !== 'alive') {
//     if (gameUtilities.getStatus(leftNeighbor) !== 'alive' && gameUtilities.getStatus(rightNeighbor) === 'alive') {
//         resurrect.push(acrossNextRow);
//     }
//     if (gameUtilities.getStatus(leftNeighbor) === 'alive' && gameUtilities.getStatus(rightNeighbor) !== 'alive') {
//         resurrect.push(acrossNextRow);
//     }
//     if (gameUtilities.getStatus(leftNeighbor) === 'alive' && gameUtilities.getStatus(rightNeighbor) === 'alive') {
//         resurrect.push(acrossNextRow);
//     }
// }

// // ********** RULE 50 **********
// if (gameUtilities.getStatus(cell) !== 'alive') {
//     if (gameUtilities.getStatus(leftNeighbor) !== 'alive' && gameUtilities.getStatus(rightNeighbor) === 'alive') {
//         resurrect.push(acrossNextRow);
//     }
//     if (gameUtilities.getStatus(leftNeighbor) === 'alive' && gameUtilities.getStatus(rightNeighbor) !== 'alive') {
//         resurrect.push(acrossNextRow);
//     }
//     if (gameUtilities.getStatus(leftNeighbor) === 'alive' && gameUtilities.getStatus(rightNeighbor) === 'alive') {
//         resurrect.push(acrossNextRow);
//     }
// }

// // ********** RULE 90 **********
// if (gameUtilities.getStatus(cell) === 'alive') {
//     if (gameUtilities.getStatus(leftNeighbor) !== 'alive' && gameUtilities.getStatus(rightNeighbor) === 'alive') {
//         resurrect.push(acrossNextRow);
//     }
//     if (gameUtilities.getStatus(leftNeighbor) === 'alive' && gameUtilities.getStatus(rightNeighbor) !== 'alive') {
//         resurrect.push(acrossNextRow);
//     }
// }

// if (gameUtilities.getStatus(cell) !== 'alive') {
//     if (gameUtilities.getStatus(leftNeighbor) !== 'alive' && gameUtilities.getStatus(rightNeighbor) === 'alive') {
//         resurrect.push(acrossNextRow);
//     }
//     if (gameUtilities.getStatus(leftNeighbor) === 'alive' && gameUtilities.getStatus(rightNeighbor) !== 'alive') {
//         resurrect.push(acrossNextRow);
//     }
// }

// // ********** RULE 126 **********
// if (gameUtilities.getStatus(cell) === 'alive') {
//     if (gameUtilities.getStatus(leftNeighbor) !== 'alive' && gameUtilities.getStatus(rightNeighbor) !== 'alive') {
//         resurrect.push(acrossNextRow);
//     }
//     if (gameUtilities.getStatus(leftNeighbor) !== 'alive' && gameUtilities.getStatus(rightNeighbor) === 'alive') {
//         resurrect.push(acrossNextRow);
//     }
//     if (gameUtilities.getStatus(leftNeighbor) === 'alive' && gameUtilities.getStatus(rightNeighbor) !== 'alive') {
//         resurrect.push(acrossNextRow);
//     }
// }

// if (gameUtilities.getStatus(cell) !== 'alive') {
//     if (gameUtilities.getStatus(leftNeighbor) !== 'alive' && gameUtilities.getStatus(rightNeighbor) === 'alive') {
//         resurrect.push(acrossNextRow);
//     }
//     if (gameUtilities.getStatus(leftNeighbor) === 'alive' && gameUtilities.getStatus(rightNeighbor) !== 'alive') {
//         resurrect.push(acrossNextRow);
//     }
//     if (gameUtilities.getStatus(leftNeighbor) === 'alive' && gameUtilities.getStatus(rightNeighbor) === 'alive') {
//         resurrect.push(acrossNextRow);
//     }
// }

// // ********** RULE 150 **********
// if (gameUtilities.getStatus(cell) === 'alive') {
//     // 3
//     if (gameUtilities.getStatus(leftNeighbor) !== 'alive' && gameUtilities.getStatus(rightNeighbor) !== 'alive') {
//         resurrect.push(acrossNextRow);
//     }
//     // 4
//     if (gameUtilities.getStatus(leftNeighbor) !== 'alive' && gameUtilities.getStatus(rightNeighbor) === 'alive') {
//         kill.push(acrossNextRow);
//     }
//     // 7
//     if (gameUtilities.getStatus(leftNeighbor) === 'alive' && gameUtilities.getStatus(rightNeighbor) !== 'alive') {
//         kill.push(acrossNextRow);
//     }
//     // 8
//     if (gameUtilities.getStatus(leftNeighbor) === 'alive' && gameUtilities.getStatus(rightNeighbor) === 'alive') {
//         resurrect.push(acrossNextRow);
//     }
// }

// if (gameUtilities.getStatus(cell) !== 'alive') {
//     // 1
//     if (gameUtilities.getStatus(leftNeighbor) !== 'alive' && gameUtilities.getStatus(rightNeighbor) !== 'alive') {
//         kill.push(acrossNextRow);
//     }
//     // 2
//     if (gameUtilities.getStatus(leftNeighbor) !== 'alive' && gameUtilities.getStatus(rightNeighbor) === 'alive') {
//         resurrect.push(acrossNextRow);
//     }
//     // 5
//     if (gameUtilities.getStatus(leftNeighbor) === 'alive' && gameUtilities.getStatus(rightNeighbor) !== 'alive') {
//         resurrect.push(acrossNextRow);
//     }
//     // 6
//     if (gameUtilities.getStatus(leftNeighbor) === 'alive' && gameUtilities.getStatus(rightNeighbor) === 'alive') {
//         kill.push(acrossNextRow);
//     }
// }

// // ********** RULE 158 **********
// if (gameUtilities.getStatus(cell) === 'alive') {
//     // 3
//     if (gameUtilities.getStatus(leftNeighbor) !== 'alive' && gameUtilities.getStatus(rightNeighbor) !== 'alive') {
//         resurrect.push(acrossNextRow);
//     }
//     // 4
//     if (gameUtilities.getStatus(leftNeighbor) !== 'alive' && gameUtilities.getStatus(rightNeighbor) === 'alive') {
//         resurrect.push(acrossNextRow);
//     }
//     // 7
//     if (gameUtilities.getStatus(leftNeighbor) === 'alive' && gameUtilities.getStatus(rightNeighbor) !== 'alive') {
//         kill.push(acrossNextRow);
//     }
//     // 8
//     if (gameUtilities.getStatus(leftNeighbor) === 'alive' && gameUtilities.getStatus(rightNeighbor) === 'alive') {
//         resurrect.push(acrossNextRow);
//     }
// }

// if (gameUtilities.getStatus(cell) !== 'alive') {
//     // 1
//     if (gameUtilities.getStatus(leftNeighbor) !== 'alive' && gameUtilities.getStatus(rightNeighbor) !== 'alive') {
//         kill.push(acrossNextRow);
//     }
//     // 2
//     if (gameUtilities.getStatus(leftNeighbor) !== 'alive' && gameUtilities.getStatus(rightNeighbor) === 'alive') {
//         resurrect.push(acrossNextRow);
//     }
//     // 5
//     if (gameUtilities.getStatus(leftNeighbor) === 'alive' && gameUtilities.getStatus(rightNeighbor) !== 'alive') {
//         resurrect.push(acrossNextRow);
//     }
//     // 6
//     if (gameUtilities.getStatus(leftNeighbor) === 'alive' && gameUtilities.getStatus(rightNeighbor) === 'alive') {
//         kill.push(acrossNextRow);
//     }
// }

// // ********** RULE 190 **********
// if (gameUtilities.getStatus(cell) === 'alive') {
//     // 3
//     if (gameUtilities.getStatus(leftNeighbor) !== 'alive' && gameUtilities.getStatus(rightNeighbor) !== 'alive') {
//         resurrect.push(acrossNextRow);
//     }
//     // 4
//     if (gameUtilities.getStatus(leftNeighbor) !== 'alive' && gameUtilities.getStatus(rightNeighbor) === 'alive') {
//         resurrect.push(acrossNextRow);
//     }
//     // 7
//     if (gameUtilities.getStatus(leftNeighbor) === 'alive' && gameUtilities.getStatus(rightNeighbor) !== 'alive') {
//         kill.push(acrossNextRow);
//     }
//     // 8
//     if (gameUtilities.getStatus(leftNeighbor) === 'alive' && gameUtilities.getStatus(rightNeighbor) === 'alive') {
//         resurrect.push(acrossNextRow);
//     }
// }

// if (gameUtilities.getStatus(cell) !== 'alive') {
//     // 1
//     if (gameUtilities.getStatus(leftNeighbor) !== 'alive' && gameUtilities.getStatus(rightNeighbor) !== 'alive') {
//         kill.push(acrossNextRow);
//     }
//     // 2
//     if (gameUtilities.getStatus(leftNeighbor) !== 'alive' && gameUtilities.getStatus(rightNeighbor) === 'alive') {
//         resurrect.push(acrossNextRow);
//     }
//     // 5
//     if (gameUtilities.getStatus(leftNeighbor) === 'alive' && gameUtilities.getStatus(rightNeighbor) !== 'alive') {
//         resurrect.push(acrossNextRow);
//     }
//     // 6
//     if (gameUtilities.getStatus(leftNeighbor) === 'alive' && gameUtilities.getStatus(rightNeighbor) === 'alive') {
//         resurrect.push(acrossNextRow);
//     }
// }

// // ********** RULE 250 **********
// if (gameUtilities.getStatus(cell) === 'alive') {
//     // 3
//     if (gameUtilities.getStatus(leftNeighbor) !== 'alive' && gameUtilities.getStatus(rightNeighbor) !== 'alive') {
//         kill.push(acrossNextRow);
//     }
//     // 4
//     if (gameUtilities.getStatus(leftNeighbor) !== 'alive' && gameUtilities.getStatus(rightNeighbor) === 'alive') {
//         resurrect.push(acrossNextRow);
//     }
//     // 7
//     if (gameUtilities.getStatus(leftNeighbor) === 'alive' && gameUtilities.getStatus(rightNeighbor) !== 'alive') {
//         resurrect.push(acrossNextRow);
//     }
//     // 8
//     if (gameUtilities.getStatus(leftNeighbor) === 'alive' && gameUtilities.getStatus(rightNeighbor) === 'alive') {
//         resurrect.push(acrossNextRow);
//     }
// }

// if (gameUtilities.getStatus(cell) !== 'alive') {
//     // 1
//     if (gameUtilities.getStatus(leftNeighbor) !== 'alive' && gameUtilities.getStatus(rightNeighbor) !== 'alive') {
//         kill.push(acrossNextRow);
//     }
//     // 2
//     if (gameUtilities.getStatus(leftNeighbor) !== 'alive' && gameUtilities.getStatus(rightNeighbor) === 'alive') {
//         resurrect.push(acrossNextRow);
//     }
//     // 5
//     if (gameUtilities.getStatus(leftNeighbor) === 'alive' && gameUtilities.getStatus(rightNeighbor) !== 'alive') {
//         resurrect.push(acrossNextRow);
//     }
//     // 6
//     if (gameUtilities.getStatus(leftNeighbor) === 'alive' && gameUtilities.getStatus(rightNeighbor) === 'alive') {
//         resurrect.push(acrossNextRow);
//     }
// }