import { create, h } from '../../../src/switzerland';
import { html, include, rescue, attrs } from '../../../src/middleware';

const handler = html(props => {
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

create('welcome-cards', include('welcome-cards.css'), html(props => {

    return (
        <section>
            <welcome-card capitalise="yes">Hello</welcome-card>
            <welcome-card capitalise="yes">Zdravstvuyte</welcome-card>
            <welcome-card capitalise="yes">Hola</welcome-card>
            <welcome-card capitalise="yes">Guten Tag</welcome-card>
        </section>
    );

}));

create('welcome-card', attrs(), rescue(handler), include('welcome-card.css'), person, html(props => {

    const name = props.attrs.capitalise === 'yes' ? props.person.name.toUpperCase() : props.person.name;

    return (
        <section>
            <img src={props.person.avatar} alt={`${props.person.name}'s avatar`} />
            <h1><slot>Hello</slot>, {name}!</h1>
            <a onclick={() => props.render()}>Next Person &raquo;</a>
        </section>
    );

}));
