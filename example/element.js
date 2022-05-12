import '../src/bllt-quady-list-component';
import '../src/bllt-quady-chg-property-list'
import '../src/bllt-quady-chg-property-pending'

const el = document.createElement('DIV');
document.body.appendChild(el);

// el.innerHTML = `		
// <bllt-quady-list-component></bllt-quady-list-component>
// `;

// el.innerHTML = `		
// <bllt-quady-chg-property-list></bllt-quady-chg-property-list>
// `;
el.innerHTML = `		
<bllt-quady-chg-property-pending></bllt-quady-chg-property-pending>
`;
