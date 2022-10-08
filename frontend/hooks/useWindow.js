export const safeWindow = (cb) => {
  if (typeof window !== 'undefined') {
    return cb();
  }
};
