export function isNumber({ min, max, gt, lt }: { min?: number, max?: number, gt?: number, lt?: number }) {
  return (value: any) => {
    if (typeof value != 'number') return false;
    if (min != undefined && !(value >= min)) return false;
    if (max != undefined && !(value <= max)) return false;
    if (gt != undefined && !(value > gt)) return false;
    if (lt != undefined && !(value < lt)) return false;
    return true;
  }
};

export function isInteger({ min, max, gt, lt }: { min?: number, max?: number, gt?: number, lt?: number }) {
  return (value: any) => {
    if (! /^\+?(0|[1-9]\d*)$/.test(value)) return false;
    if (min != undefined && !(value >= min)) return false;
    if (max != undefined && !(value <= max)) return false;
    if (gt != undefined && !(value > gt)) return false;
    if (lt != undefined && !(value < lt)) return false;
    return true;
  }
};