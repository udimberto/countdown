'use strict';

var url    = new URL(window.location.href);
var search = url.searchParams;
var params = {
    countdown : search.get('countdown') ? decodeURIComponent(search.get('countdown')) : '',
    joint     : search.get('joint') ? decodeURIComponent(search.get('joint')) : '',
    heading   : search.get('heading') ? decodeURIComponent(search.get('heading')) : '',
    subheading: search.get('subheading') ? decodeURIComponent(search.get('subheading')) : '',
    background: search.get('background') ? decodeURIComponent(search.get('background')) : 'https://i.giphy.com/media/14udF3WUwwGMaA/giphy.webp',
};

var form     = {};
var elements = {
    countdown : document.getElementById('display-countdown'),
    joint     : document.getElementById('display-joint'),
    heading   : document.getElementById('display-heading'),
    subheading: document.getElementById('display-subheading'),
    settings  : document.getElementById('display-settings'),
    toggle    : document.getElementById('display-toggle'),
    background: document.getElementById('display-background'),
};

/**
 * Element Identify
 *
 * @param {string} elementId
 */
function elementIdentify (elementId) {
    elements[elementId] =
        elements[elementId] ?
            elements[elementId] : document.getElementById(elementId);

    if (!elements[elementId]) {
        return null;
    }

    return elements[elementId];
}

/**
 * Element Remove Class
 *
 * @param {string} elementId
 * @param {string} className
 */
function elementRemoveClass (elementId, className) {
    var element = elementIdentify(elementId);

    if (!element) {
        return;
    }

    element.classList.remove(className);
}

/**
 * Element Add Class
 *
 * @param {string} elementId
 * @param {string} className
 */
function elementAddClass (elementId, className) {
    var element = elementIdentify(elementId);

    if (!element) {
        return;
    }

    elementRemoveClass(elementId, className);

    element.classList.add(className);
}

/**
 * Element Toggle Class
 *
 * @param {string} elementId
 * @param {string} className
 */
function elementToggleClass (elementId, className) {
    var element = elementIdentify(elementId);

    if (!element) {
        return;
    }

    element.classList.toggle(className);
}
/**
 * Toggle Settings visibility
 */
function toggleSettings () {
    elementToggleClass('settings', 'active');
    elementToggleClass('toggle', 'active');
}

/**
 * Save Settings
 *
 * @param {boolean} hide
 */
function saveSettings () {
    toggleSettings();
}

/**
 * Bind Form Elements with Display Elements
 */
function bindElements () {
    var formElements = Array.from(document.getElementsByClassName('form__control'));

    // Adding Event Listener to form elements
    formElements.map(function (formElement) {
        if (!elements[formElement.id.replace('form-', '')]) {
            return;
        }

        formElement.value = elements[formElement.id.replace('form-', '')].innerHTML;

        formElement.addEventListener('input', function (evt) {
            if (formElement.id.replace('form-', '') === 'countdown') {
                diff(this.value);
                return;
            }

            if (formElement.id.replace('form-', '') === 'background') {
                elements.background.style.backgroundImage = 'url(' + this.value + ');';
                return;
            }

            elements[formElement.id.replace('form-', '')].innerHTML = this.value;
        });

        form[formElement.id.replace('form-', '')] = formElement;
    });
}
bindElements();

/**
 * Calculate countdown difference from today
 */
function diff (date) {
    var now      = moment('00:00:00', 'HH:mm:ss');
    var deadline = moment(date + '00:00:00', 'YYYY-MM-DDHH:mm:ss');

    if (!deadline.isValid()) {
        deadline = moment('00:00:00', 'HH:mm:ss').add(1, 'years');
    }

    elements.countdown.innerHTML = deadline.from(now).toUpperCase();
}

/**
 * Set Display values
 */
function setDisplay () {
    // Set URL params values to displayed elements
    for (var param in params) {
        if (!elements[param]) {
            return;
        }

        if (form[param]) {
            form[param].value = params[param];
        }

        if (param === 'countdown') {
            diff(params[param]);
        } else if (param === 'background') {
            console.log(params.background);
            elements.background.style.backgroundImage = 'url(' + params.background + ');';
        } else {
            elements[param].innerHTML = params[param];
        }
    }
}

/**
 * DO YOUR THING, SUPER STAR
 */
function doTheMagic () {
    moment.locale('pt-BR');
    setDisplay();
}


