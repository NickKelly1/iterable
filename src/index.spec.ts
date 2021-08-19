import { toRiver, toDam, toBucket, Bucket, Dam, River  } from '.';

describe('index', () => {
  it('should export toRiver', () => {
    expect(toRiver([1, 2, 3,])).toBeInstanceOf(River);
  });

  it('should expor toBucket', () => {
    expect(toBucket([1, 2, 3,])).toBeInstanceOf(Bucket);
  });

  it('should export toDam', () => {
    expect(toDam([1, 2, 3,])).toBeInstanceOf(Dam);
  });
});
