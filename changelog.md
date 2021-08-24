# Changelog

## 0.0.19 - 2021-08-23

### Changed

- Fixed `LazyCollection.prototype.btw`

## 0.0.18 - 2021-08-23

### Changed

- Fixed `LazyCollection.prototype.btw`

## 0.0.17 - 2021-08-23

### Added

- Interfaces for methods
- Interfaces for collections
- Smart caching for `LazyCollection`

### Changed

- Updated readme.md
- Updated dependencies

## 0.0.16 - 2021-08-22

### Changed

- Changed `River` to `Collection`
- Changed `Dam` to `LazyCollection`
- Updated readme.md
- Updated tests

### Removed

- Removed base `Pipeline` class
- Removed base `Repeatable` class
- Removed `Bucket` class

## 0.0.15 - 2021-08-22

### Changed

- Updated dependencies
- Updated tests

## 0.0.14 - 2021-08-22

### Changed

- No longer minify exports

## 0.0.13 - 2021-08-22

### Changed

- Updated readme.md

## 0.0.12 - 2021-08-21

### Changed

- Updated readme.md

## 0.0.11 - 2021-08-21

### Changed

- Updated changelog.md

## 0.0.10 - 2021-08-21

### Changed

- Updated readme.md

## 0.0.9 - 2021-08-21

### Changed

- Updated readme.md

## 0.0.8 - 2021-08-21

### Changed

- Updated readme.md

## 0.0.7 - 2021-08-21

### Added

- `Pipeline.prototype.notMatching`
- `Pipeline.prototype.matching`
- `Pipeline.prototype.skip`
- `Pipeline.prototype.take`
- `Pipeline.prototype.unique`
- Comprehensive tests for every `Pipeline.prototype` function
- Test coverage

## Changed

- `Pipeline.prototype.pickSome` to `pipeline.prototype.flatSome`
- Fix a bug in `Pipeline.prototype.join`

## 0.0.6 - 2021-08-19

### Added

- `Pipeline.prototype.notUndefined`
- `Pipeline.prototype.notNull`
- `Pipeline.prototype.notNullable`
- `Pipeline.prototype.extractSome`

## 0.0.5 - 2021-08-19

### Added

- Intermediate `Repeatable` class
- `Repeatable.prototype.zipShort`
- `Repeatable.prototype.zipLong`

### Changed

- `Dam` extends `Repeatable`
- `River` extends `Repeatable`

## 0.0.4 - 2021-08-19

### Added

- `Pipeline.prototype.reverse`
- `Pipeline.prototype.slice`
- `Pipeline.prototype.reduce`
- `Pipeline.prototype.reduceRight`
- `Pipeline.prototype.every`
- `Pipeline.prototype.some`
- `River.prototype.indexOf`
- `River.prototype.find`
- `Dam.prototype.find`

### Changed

- Changed name of `Lake` to `Dam`
- Changed name of `Hose` to `Bucket`
- Changed name of `Dam.prototype.item` to `Dam.prototype.at`
- Changed name of `River.prototype.item` to `River.prototype.at`

## 0.0.3 - 2021-08-16

### Changed

- Fixed readme badges

## 0.0.2 - 2021-08-16

### Added

- `GetURI` utility type
- Implement `HKT` interface
- Implement `HKT` interface

### Changed

- Fixed type ambiguity in `Pipeline.prototype.flatten`
- Fixed type ambiguity in `Pipeline.prototype.flatMap`

## 0.0.1 - 2021-08-16

### Added

- `River`
- `Lake`
- `Hose`
