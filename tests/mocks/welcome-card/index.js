import { create, h } from '../../../src/switzerland';
import { html, include, recover, attrs } from '../../../src/middleware';

const errorHandler = html(props => {
    return <h1 onclick={() => props.render({ name: 'Recover' })}>Error: {props.error.message}</h1>;
});

const person = props => {

    return new Promise(async resolve => {
        
        const { results: [person] } = await fetch('https://randomuser.me/api/').then(r => r.json());
        const img = new Image();
        img.addEventListener('load', () => {

            resolve({
                ...props,
                person: {
                    name: person.name.first,
                    avatar: person.picture.large
                }
            });

        });
        img.src = person.picture.large;
        
    });

};

create('welcome-card', attrs(), recover(errorHandler), include('example/index.css'), person, html(props => {

    const name = props.attrs.capitalise === 'yes' ? props.person.name.toUpperCase() : props.person.name;

    return (
        <section>
            <img src={props.person.avatar} alt={`${props.person.name}'s avatar`} />
            <h1><slot>Hello</slot>, {name}!</h1>
            <a onclick={() => props.render()}>Next Person &raquo;</a>
        </section>
    );

}));
