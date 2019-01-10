// The configuration of jest and babel is a little rusty
// This delay seems to resolve _some_ timing issues related to loading babel-polyfill
// As far as I can tell
module.exports = async () => {
  await new Promise(resolve => setTimeout(resolve, 2500));
};
