import { create, h } from '../../../src/switzerland';
import { html, include, rescue, attrs, wait } from '../../../src/middleware';

window.test = 'Adam!';

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
        <section class="welcome-cards">
            <welcome-card capitalise="yes">Hello</welcome-card>
            <welcome-card capitalise="yes">Zdravstvuyte</welcome-card>
            <welcome-card capitalise="yes">Hola</welcome-card>
            <welcome-card capitalise="yes">Guten Tag</welcome-card>
        </section>
    );

}), wait('welcome-card'));

// create('welcome-card', attrs(), include('welcome-card.css'), person, html(props => {
create('welcome-card', attrs(), person, html(props => {

    const name = props.attrs.capitalise === 'yes' ? props.person.name.toUpperCase() : props.person.name;

    return (
        <section>
            <img src={props.person.avatar} alt={`${props.person.name}'s avatar`} />
            <h1><slot>Hello</slot>, {name}!</h1>
            <a onclick={() => props.render()}>Next Person &raquo;</a>
        </section>
    );

}));
