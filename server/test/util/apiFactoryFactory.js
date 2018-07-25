'use strict';

const Lab = require('lab');
const { describe, describe: context, it } = exports.lab = Lab.script();
const { expect, fail } = require('code');

const apiFactoryFactory = require('../../app/util/apiFactoryFactory');

describe('apiFactory', function () {

    const catalog = {
        widget: {
            repository() {

                return {};
            },
            model() {

                const modelFactory = repository => ({});

                const repository = apiFactory('widget', 'repository');

                return modelFactory(repository);
            },
            handler() {

                const handlerFactory = model => ({});

                const model = apiFactory('widget', 'model');

                return handlerFactory(model);
            }
        }
    };

    const apiFactory = apiFactoryFactory(catalog);

    context('when given a product that exists in the catalog', function () {

        const resourceName = 'widget';
        const productName = 'model';

        it('should make singletons', function () {

            const product1 = apiFactory(resourceName, productName);

            const product2 = apiFactory(resourceName, productName);

            expect(product1).to.shallow.equal(product2);
        });
    });

    context('when given a product that does not exist in the catalog', function () {

        const resourceName = 'widget';
        const productName = 'This product does not exist in the catalog';

        it('should throw an error', function () {

            try {

                apiFactory(resourceName, productName);

                fail('This should never happen!');

            } catch (e) {

                expect(e).to.exist().and.to.be.an.instanceof(Error);
            }
        });
    });
});
