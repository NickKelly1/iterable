import { testPipelineFunctions } from './pipeline.spec.util';
import { River } from './river';

describe('River', () => {
  testPipelineFunctions((iterable) => new River(iterable));
});
