import { parseParamsFromQuery } from './request'
import type { NextApiRequest } from 'next';
import test from 'ava';

test('1 parse params from query ',t=>{
  let input = {
    limit:'10',
    offset:'5'
  }
  const output = parseParamsFromQuery(input.limit,input.offset);
  let outputParse = {
    limit:parseInt(input.limit),
    offset:parseInt(input.offset)
  }
  t.deepEqual(output,outputParse);
})
test('2 parse params from query ',t=>{
  const MaxLimit = 10;
  let input = {
    limit:'20',
    offset:'5'
  }
  const output = parseParamsFromQuery(input.limit,input.offset);
  let outputParse = {
    limit:MaxLimit,
    offset:parseInt(input.offset)
  }
  t.deepEqual(output,outputParse);
})
test('3 parse params from query ',t=>{
  const MaxLimit = 10;
  let input = {
    limit:'-1',
    offset:'3'
  }
  const output = parseParamsFromQuery(input.limit,input.offset);
  let outputParse = {
    limit:MaxLimit,
    offset:parseInt(input.offset)
  }
  t.deepEqual(output,outputParse);
})
test('4 parse params from query ',t=>{
  const MaxLimit = 10;
  let input = {
    limit:'0',
    offset:'5'
  }
  const output = parseParamsFromQuery(input.limit,input.offset);
  let outputParse = {
    limit:MaxLimit,
    offset:parseInt(input.offset)
  }
  t.deepEqual(output,outputParse);
})
test('5 parse params from query ',t=>{
  const MaxLimit = 10;
  let input = {
    limit:'5',
    offset:'-1'
  }
  const output = parseParamsFromQuery(input.limit,input.offset);
  let outputParse = {
    limit:parseInt(input.limit),
    offset:0
  }
  t.deepEqual(output,outputParse);
})


