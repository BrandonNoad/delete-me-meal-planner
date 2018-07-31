'use strict';

const Joi = require('joi');
const Lab = require('lab');
const { describe, describe: context, it } = exports.lab = Lab.script();
const { expect, fail } = require('code')

const PaginationHelper = require('../../app/util/PaginationHelper');

describe('pagination-helper', function () {

    describe('queryValidationSchema', function () {

        context('when the page key is missing', function () {

            it('should set the default page value', function () {

                const query = {
                    limit: PaginationHelper.DEFAULT_RESOURCES_PER_PAGE
                };

                const result = Joi.validate(query, PaginationHelper.queryValidationSchema);

                expect(result.error).to.not.exist();
                expect(result.value).to.equal({
                    page: PaginationHelper.DEFAULT_PAGE_NUMBER,
                    limit: PaginationHelper.DEFAULT_RESOURCES_PER_PAGE
                });
            });
        });

        context('when the limit key is missing', function () {

            it('should set the default limit value', function () {

                const query = {
                    page: PaginationHelper.DEFAULT_PAGE_NUMBER
                };

                const result = Joi.validate(query, PaginationHelper.queryValidationSchema);

                expect(result.error).to.not.exist();
                expect(result.value).to.equal({
                    page: PaginationHelper.DEFAULT_PAGE_NUMBER,
                    limit: PaginationHelper.DEFAULT_RESOURCES_PER_PAGE
                });
            });
        });

        context('when both the page and limit keys are missing', function () {

            it('should set the default page and limit values', function () {

                const query = {};

                const result = Joi.validate(query, PaginationHelper.queryValidationSchema);

                expect(result.error).to.not.exist();
                expect(result.value).to.equal({
                    page: PaginationHelper.DEFAULT_PAGE_NUMBER,
                    limit: PaginationHelper.DEFAULT_RESOURCES_PER_PAGE
                });
            });
        });

        context('when page is not a number', function () {

            it('should cause the validation to fail', function () {

                const query = {
                    page: 'foobar',
                    limit: PaginationHelper.DEFAULT_RESOURCES_PER_PAGE
                };

                const result = Joi.validate(query, PaginationHelper.queryValidationSchema);

                expect(result.error).to.exist().and.to.be.instanceOf(Error);
            });
        });

        context('when page is not an integer', function () {

            it('should cause the validation to fail', function () {

                const query = {
                    page: 1.5,
                    limit: PaginationHelper.DEFAULT_RESOURCES_PER_PAGE
                };

                const result = Joi.validate(query, PaginationHelper.queryValidationSchema);

                expect(result.error).to.exist().and.to.be.instanceOf(Error);
            });
        });

        context('when page is <= 0', function () {

            it('should cause the validation to fail', function () {

                const query = {
                    page: 0,
                    limit: PaginationHelper.DEFAULT_RESOURCES_PER_PAGE
                };

                const result = Joi.validate(query, PaginationHelper.queryValidationSchema);

                expect(result.error).to.exist().and.to.be.instanceOf(Error);
            });
        });

        context('when limit is not a number', function () {

            it('should cause the validation to fail', function () {

                const query = {
                    page: PaginationHelper.DEFAULT_PAGE_NUMBER,
                    limit: 'foobar'
                };

                const result = Joi.validate(query, PaginationHelper.queryValidationSchema);

                expect(result.error).to.exist().and.to.be.instanceOf(Error);
            });
        });

        context('when limit is not an integer', function () {

            it('should cause the validation to fail', function () {

                const query = {
                    page: PaginationHelper.DEFAULT_PAGE_NUMBER,
                    limit: 11.11
                };

                const result = Joi.validate(query, PaginationHelper.queryValidationSchema);

                expect(result.error).to.exist().and.to.be.instanceOf(Error);
            });
        });

        context('when limit is <= 0', function () {

            it('should cause the validation to fail', function () {

                const query = {
                    page: PaginationHelper.DEFAULT_PAGE_NUMBER,
                    limit: 0
                };

                const result = Joi.validate(query, PaginationHelper.queryValidationSchema);

                expect(result.error).to.exist().and.to.be.instanceOf(Error);
            });
        });

        context('when limit is > MAX_RESOURCES_PER_PAGE', function () {

            it('should cause the validation to fail', function () {

                const query = {
                    page: PaginationHelper.DEFAULT_PAGE_NUMBER,
                    limit: PaginationHelper.MAX_RESOURCES_PER_PAGE + 1
                };

                const result = Joi.validate(query, PaginationHelper.queryValidationSchema);

                expect(result.error).to.exist().and.to.be.instanceOf(Error);
            });
        });
    });
});
