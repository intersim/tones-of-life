// runCount = 63; start on col 6 or 7?

step: function () {
        this.forEachCell(function (cell) {
            rule30 = {
                resurrect: {},
                kill: {}
            };

            rule30.resurrect.alive = [{left: false, right: false}, {left: false, right: true}];
            rule30.resurrect.dead = [{left: true, right: false}, {left: false, right: true}];
            rule30.kill.alive = [{left: true, right: false}, {left: true, right: true}];
            rule30.kill.dead = [{left: false, right: false}, {right: true, left: true}];

            // should the cell be alive, or dead?
            function isSelfConditionMet (shouldSelfAlive, selfStatus) {
               return shouldSelfAlive == (selfStatus === 'alive')
            }

            // are the neighbors' statuses meeting the given condition?
            function isNeighborConditionsMet (innerConditions, rightStatus, leftStatus) {
                var leftConditionMet = (innerConditions.left == (leftStatus === 'alive'));
                var rightConditionMet = (innerConditions.right == (rightStatus === 'alive'));
                return leftConditionMet && rightConditionMet;
            }

            // is one of the conditions in the array being met?
            function isANeighborConditionMet (arrNeighborCond, rightStatus, leftStatus) {
                for (var i = 0; i < arrNeighborCond.length; i++) {
                    var isConditionMet = isNeighborConditionsMet(arrNeighborCond[i], rightStatus, leftStatus);
                    if (isConditionMet) return true;
                }
                return false;
            }

            // is the cell status right, and is the condition in the array being met? if yes, kill or resurrect the cell
            function evaluateRuleSet (ruleObj, cell) {
                var cellCoords = gameUtilities.getCellCoords(cell);
                var cellX = cellCoords.x;
                var cellY = cellCoords.y;

                var cellStatus = gameUtilities.getStatus(cell);
                var neighbors = gameUtilities.getNeighbors(cell);
                var leftStatus = gameUtilities.getStatus(neighbors[1])/* || 'dead'*/;
                var rightStatus = gameUtilities.getStatus(neighbors[0])/* || 'dead'*/;
                var nextRow = gameUtilities.getNextRow(cell);
                var nextCell = nextRow[1];

                var isAliveConditionMet = isSelfConditionMet(true, cellStatus) && isANeighborConditionMet(ruleObj.resurrect.alive, rightStatus, leftStatus);

                var isDeadConditionMet = isSelfConditionMet(false, cellStatus) && isANeighborConditionMet(ruleObj.resurrect.dead, rightStatus, leftStatus)


                if (isAliveConditionMet || isDeadConditionMet) gameUtilities.resurrectCell(nextCell);

                isAliveConditionMet = isSelfConditionMet(true, cellStatus) && isANeighborConditionMet(ruleObj.kill.alive, rightStatus, leftStatus);

                isDeadConditionMet = isSelfConditionMet(false, cellStatus) && isANeighborConditionMet(ruleObj.kill.dead, rightStatus, leftStatus)

                
                if (isAliveConditionMet || isDeadConditionMet) gameUtilities.killCell(nextCell);
            }

            evaluateRuleSet (rule30, cell);
        });
    }
    

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