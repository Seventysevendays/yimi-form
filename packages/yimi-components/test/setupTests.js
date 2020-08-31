const configure = require('enzyme').configure;
const Adapter = require('enzyme-adapter-react-16')

configure({ adapter: new Adapter() });


Object.defineProperty(window, 'matchMedia', {
  value: () => ({
    matches: false,
    addListener: () => { },
    removeListener: () => { }
  })
});
