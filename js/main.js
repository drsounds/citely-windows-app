class EventEmitter {
    constructor() {
        this.listeners = {};
    }
    on(e, eb) {
        this.listeners[e] = cb;
    }
    emit(e) {
        this.listeners[e].apply(this, arguments);
    }
}


let selection = [];

class CitelyObjectElement extends HTMLElement {
    attachedCallback() {
        this.classList.add('citely-object');
        this.addEventListener('mousedown', this._onMouseDown.bind(this));
        this.header = document.createElement('div');
        this.header.classList.add('citely-object-header');
        this.header.text = document.createElement('div');
        this.header.text.contentEditable = 'true';
        this.header.appendChild(this.header.text);
        this.appendChild(this.header);
        this.content = document.createElement('div');
        this.content.classList.add('citely-object-content');
        this.appendChild(this.content);
        this.content.text = document.createElement('div');
        this.content.text.contentEditable = 'true';
        this.content.text.style.minWidth = '30pt';
        this.content.text.style.minHeight = '10pt';
        this.content.appendChild(this.content.text);
    }

    _onDoubleClick(e) {

    }
    _onMouseDown(e) {
        let bounds = this.getBoundingClientRect();
        let action = Math.abs(e.clientX - bounds.left + bounds.width) < 114 && Math.abs(e.clientX - bounds.top + bounds.height) < 114 ? 'resize' : 'move';

        selection = [{
            action: action,
            x: e.clientX - this.x,
            y: e.clientY - this.y,
            object: this
        }];
    }
    get x() {
        let x = parseInt(this.style.left) || 0;
        return x;
    }
    set x(val) {
        this.style.left = val + 'px';
    }
    get y() {
        let y = parseInt(this.style.top) || 0;
        return y;
    }
    set y(val) {
        this.style.top = val + 'px';
    }
    get width() {
        return parseInt(this.style.width);
    }
    set width(val) {
        this.style.height = val + 'px';
    }
    get height() {
        return parseInt(this.style.width);
    }
    set height(val) {
        this.style.height = val + 'px';
    }
    
}


class CitelyCitationElement extends CitelyObjectElement {
    attachedCallback() {
        super.attachedCallback();
    }
}
document.registerElement('citely-citation', CitelyCitationElement);

class CitelyObjectRelationElement extends CitelyObjectElement {
    attachedCallback() {

    }
    get subject() {
        return this.querySelector('#' + this.getAttribute('data-subject-id'));
    }
    set subject(obj) {
        this.setAttribute('data-subject-id', obj.getAttribute('id'));
    }

    get predicate() {
        return this.querySelector('#' + this.getAttribute('data-predicate-id'));
    }
    set predicate(obj) {
        this.setAttribute('data-predicate-id', obj.getAttribute('id'));
    }


    get object() {
        return this.querySelector('#' + this.getAttribute('data-object-id'));
    }
    set object(obj) {
        this.setAttribute('data-object-id', obj.getAttribute('id'));
    }
}
document.registerElement('citely-relation', CitelyObjectRelationElement);

window.addEventListener('mousemove', (e) => {
    selection.map((selected) => {
        if (selected.action === 'move') {
            selected.object.x = e.clientX - selected.x;
            selected.object.y = e.clientY - selected.y;
        }
    });

});
window.addEventListener('mouseup', (e) => {
    selection = [];
})
window.addEventListener('load', () => {

})

document.registerElement('citely-object', CitelyObjectElement);
