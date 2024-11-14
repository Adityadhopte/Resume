export const catchAsyncErrors = (theFunction) => {
  return (reg, res, next) => {
    Promise.resolve(theFunction(reg, res, next)).catch(next);
  };
};
