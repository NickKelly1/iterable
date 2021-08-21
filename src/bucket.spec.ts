import { testPipelineFunctions } from './pipeline.spec.util';
import { Bucket } from './bucket';

describe('Bucket', () => {
  testPipelineFunctions((iterable) => new Bucket(iterable));
});
