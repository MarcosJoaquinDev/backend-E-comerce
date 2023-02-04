import test from 'ava';
import type { JwtPayload } from 'jsonwebtoken';
import {generate,decode} from './jwtoken';

test('decode', t => {
	const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsYXN0bmFtZSI6IkFjdcOxYSIsImVtYWlsIjoibWFyY29zanVha281NTNAZ21haWwuY29tIiwib3JkZXJzIjpbIm8zYWZvTHdMRWRyRzU3ME5EcEdPIiwiMzdwRkZWOWM3VFdtSlMyYjBRMEsiLCJGaUZhM011MjhzdkdNSUlSclBqeSIsImxHRXJsVHhEUEh1RXprRk80Wm9nIiwid25PYlVUdDNhaU9iZHdlNDVkdG8iXSwibmFtZSI6Ik1hcmNvcyBKb2FxdWluIiwiaWF0IjoxNjc1NDkzNDY2fQ.44v6wCK1_Dp40i3B_vvtWQiFPG2BC7WsNfJcVBmznKY'
	const input = decode(token) as JwtPayload;
	delete input.iat 
	const expected = { 
	lastname: 'Acuña',
  email: 'marcosjuako553@gmail.com',
  orders: [
    'o3afoLwLEdrG570NDpGO',
    '37pFFV9c7TWmJS2b0Q0K',
    'FiFa3Mu28svGMIIRrPjy',
    'lGErlTxDPHuEzkFO4Zog',
    'wnObUTt3aiObdwe45dto'
  ],
  name: 'Marcos Joaquin',}	
	t.deepEqual(input,expected);
});
test('generate',t =>{
	const inputObject = {
		name:'test name',
		lastname:'test lastname',
		email:'test@runtest.com'
	}
	const inputToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdCBuYW1lIiwibGFzdG5hbWUiOiJ0ZXN0IGxhc3RuYW1lIiwiZW1haWwiOiJ0ZXN0QHJ1bnRlc3QuY29tIiwiaWF0IjoxNjc1NTAwNjQ4fQ.abA5vYprqhFqzddOm0YYVSq4eeOh2sXxx8snijRc7oU'
	const outputToken = generate(inputObject);
	const outputObject = decode(outputToken) as JwtPayload;
	delete outputObject.iat
	t.deepEqual(outputObject,inputObject);
	
})