/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    const Promise = this.constructor;

    return this.then(
      (value) => {
        Promise.resolve(callback()).then(() => {
          return value;
        });
      },
      (reason) => {
        Promise.resolve(callback()).then(() => {
          throw reason;
        });
      }
    );
  };
}
