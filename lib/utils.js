"use strict";

exports.__esModule = true;
exports.arePointsEqual = arePointsEqual;

function arePointsEqual(p1, p2) {
  if (p1 && p2) {
    // both points are array
    if (Array.isArray(p1) && Array.isArray(p2)) {
      return p1[0] === p2[0] && p1[1] === p2[1];
    } // both points are object


    if (!Array.isArray(p1) && !Array.isArray(p2)) {
      return p1.x === p2.x && p1.y === p2.y;
    } // point 1 is object, point 2 is array


    if (!Array.isArray(p1) && Array.isArray(p2)) {
      return p1.x === p2[0] && p1.y === p2[1];
    } // point 1 is array, point 2 is object


    if (Array.isArray(p1) && !Array.isArray(p2)) {
      return p1[0] === p2.x && p1[1] === p2.y;
    }
  } else if (!p1 && !p2) {
    // both points are null
    return true;
  } else {
    // some point is null
    return false;
  }
}