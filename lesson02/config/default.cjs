require ("dotenv").config();

module.exports =  {
  my_var: 'my simple value from default.cjs',
  root: {
    level1: {
      level2: 'tree item value'
    }
  },
  my_array: process.env.MY_ARRAY.split(','),
}
