import EventEmitter from 'events';

const emitter = new EventEmitter();

emitter.on('hello', (...args)=>{
  console.log('on hello event', ...args);
})

emitter.on('hi', (...args)=>{
  console.log('on hi event', ...args);
})

emitter.on('buy', (...args)=>{
  console.log('on buy event', ...args);
})

export default emitter;