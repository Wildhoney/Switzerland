/**
 * @param {HTMLElement[]|HTMLElement} nodes
 * @return {Function}
 */
export default nodes => {

    return props => {


        return props;

    };

};

// return (
//     <a>
//         <b>
//             <c />
//         </b>
//     </a>
// );
//
// /**
//
//  a.resolved = () => {
//             return Promise.all([b.promise]).then(a.resolved);
//         };
//
//
//  b.resolved = () => {
//             return Promise.all([c.promise]).then(b.resolved);
//         };
//
//
//  c.resolved = () => {
//             return Promise.all([]).then(c.resolved);
//         };
//
//  */