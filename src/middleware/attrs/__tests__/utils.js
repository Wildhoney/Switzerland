import test from 'ava';
import starwars from 'starwars';
import * as type from '../../../types/index.js';
import * as u from '../utils';

const node = document.createElement('x-example');
node.setAttribute('country-name', 'United Kingdom');
node.setAttribute('persons-age', 33);

test('It should be able to transform kebab attributes to camel case;', t => {
    const attributes = u.transformAttributes(
        node.attributes,
        { originCity: 'Nottingham' },
        {
            personsAge: type.Int
        }
    );
    t.deepEqual(attributes, {
        countryName: 'United Kingdom',
        personsAge: 33,
        originCity: 'Nottingham'
    });
});

test('It should be able to determine if there are applicable mutations;', t => {
    const mutations = [
        { attributeName: 'persons-age', oldValue: '32' },
        { attributeName: 'country-name', oldValue: 'Russian Federation' }
    ];
    t.true(u.hasApplicableMutations(node, [mutations[0]]));
    t.true(u.hasApplicableMutations(node, [mutations[1]]));
    t.true(u.hasApplicableMutations(node, mutations));
    t.true(
        u.hasApplicableMutations(
            node,
            [...mutations, { attributeName: 'class', oldValue: starwars() }],
            ['class']
        )
    );
    t.false(
        u.hasApplicableMutations(node, [
            { attributeName: 'persons-age', oldValue: '33' }
        ])
    );
    t.false(
        u.hasApplicableMutations(
            node,
            [{ attributeName: 'country-name', oldValue: 'Russian Federation' }],
            ['country-name']
        )
    );
});
