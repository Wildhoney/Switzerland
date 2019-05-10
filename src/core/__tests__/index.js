import test from 'ava';
import withComponent from 'ava-webcomponents';
import { spy, match } from 'sinon';
import { init, create, alias } from '../index.js';

test.beforeEach(t => {
    t.context.get = spy();
    t.context.define = spy();
    window.crypto = { getRandomValues: () => {} };
    window.customElements = {
        get: tag => {
            t.context.get(tag);
            return tag === 'x-neptune' ? class {} : null;
        },
        define: (tag, blueprint, extend) => t.context.define(tag, blueprint, extend)
    };
});

test.afterEach(() => {
    window.crypto = undefined;
    window.customElements = undefined;
});

test('It should be able to handle the relative paths correctly;', t => {
    const path = init('https://localhost:3000/nodes/earth/planets.js', {
        url: 'localhost:3000',
        forceBrowser: true
    });
    t.is(path('../mercury.js'), 'https://localhost:3000/nodes/mercury.js');
    t.is(path('../../venus.js'), 'https://localhost:3000/venus.js');
    t.is(path('jupiter.js'), 'https://localhost:3000/nodes/earth/jupiter.js');
    t.is(path('saturn/uranus.js'), 'https://localhost:3000/nodes/earth/saturn/uranus.js');
    t.is(
        path('../saturn/neptune/pluto.js'),
        'https://localhost:3000/nodes/saturn/neptune/pluto.js'
    );
});

test('It should be able to handle paths correct using `window.location.host` directly;', t => {
    window.location.host = 'localhost:3000';
    const path = init('https://localhost:3000/nodes/earth/planets.js', {
        url: undefined,
        forceBrowser: true
    });
    t.is(path('../mercury.js'), 'https://localhost:3000/nodes/mercury.js');
});

test('It should be able to handle the absolute paths correctly;', t => {
    const path = init('https://localhost:3000/nodes/earth/planets.js', {
        url: 'switzerland.herokuapp.com',
        forceBrowser: true
    });
    t.is(path('../mercury.js'), 'https://localhost:3000/nodes/mercury.js');
    t.is(path('../../venus.js'), 'https://localhost:3000/venus.js');
    t.is(path('jupiter.js'), 'https://localhost:3000/nodes/earth/jupiter.js');
    t.is(path('saturn/uranus.js'), 'https://localhost:3000/nodes/earth/saturn/uranus.js');
    t.is(
        path('../saturn/neptune/pluto.js'),
        'https://localhost:3000/nodes/saturn/neptune/pluto.js'
    );
});

test.serial('It should yield the defined tag name when creating a custom element;', t => {
    t.is(create('x-mercury'), 'x-mercury');
    t.is(t.context.define.callCount, 1);
    t.true(t.context.define.calledWith('x-mercury', match.any));
});

test.serial('It should yield the defined tag name when extending a native element;', t => {
    t.is(create('x-jupiter/input'), 'x-jupiter');
    t.is(t.context.define.callCount, 1);
    t.true(
        t.context.define.calledWith('x-jupiter', match.any, {
            extends: 'input'
        })
    );
});

test.serial('It should yield the defined tag name when aliasing an existing element;', t => {
    t.is(alias('x-neptune', 'x-mars'), 'x-mars');
    t.is(t.context.get.callCount, 2);
    t.is(t.context.define.callCount, 1);
    t.true(t.context.get.calledWith('x-neptune'));
    t.true(t.context.define.calledWith('x-mars', match.any));
});

test.serial(
    'It should be able to create the element;',
    withComponent(`${__dirname}/helpers/mock.js`),
    async (t, { page, utils }) => {
        const name = 'x-create';
        await utils.waitForUpgrade(name);

        const content = await page.evaluate(async () => {
            const node = document.createElement('x-create');
            document.body.append(node);
            await node.idle();
            return node.innerHTML;
        }, name);
        t.is(content, '<div>Hello Adam!</div>');
    }
);

test.serial(
    'It should be able to alias a custom element;',
    withComponent(`${__dirname}/helpers/mock.js`),
    async (t, { page, utils }) => {
        await page.waitForFunction('Boolean(window.renamedElementName)');
        const name = await page.evaluate(() => window.renamedElementName);
        await utils.waitForUpgrade(name);

        const content = await page.evaluate(async name => {
            const node = document.createElement(name);
            document.body.append(node);
            await node.idle();
            return node.innerHTML;
        }, name);
        t.is(content, '<div>Hello Adam!</div>');
        t.true(/x-create-[a-z0-9]/.test(name));
    }
);

test.serial(
    'It should be able to extend a native element;',
    withComponent(`${__dirname}/helpers/mock.js`),
    async (t, { page, utils }) => {
        const name = 'x-native';
        await utils.waitForUpgrade(name);

        await page.evaluate(async name => {
            const node = document.createElement('input', { is: name });
            node.setAttribute('type', 'text');
            document.body.append(node);
        }, name);

        await page.type('input', 'Hello Maria!', { delay: 15 });

        const content = await page.evaluate(() => {
            const node = document.querySelector(`input`);
            return node.value;
        });
        t.is(content, 'HELLO MARIA!');
    }
);
