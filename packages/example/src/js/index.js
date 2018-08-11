import { create } from '@switzerland/core';

create('x-hello', props => ({ ...props, name: 'Adam' }));
