import { testPipelineFunctions } from '../pipeline/pipeline.spec.util';
import { Dam } from './dam';

describe('Dam', () => {
  testPipelineFunctions((iterable) => new Dam(iterable));
});
