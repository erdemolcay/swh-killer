// Saves options to chrome.storage
function save_options() {
    var custom = (this.value === 'custom' || this.id === 'custom-value');
    var custom_element = document.getElementById('custom-value');
    var custom_value = custom_element.value;
    custom_element.readOnly = (this.type === 'radio' && !custom);
    var replace;
    if (custom) {
        replace = ' ' + custom_element.value;
    } else {
        replace = this.value
    }

    chrome.storage.sync.set({
        replace: replace,
        custom: custom,
        custom_value: custom_value
    });
}

// Restore options
function restore_options() {
    // Use default values replace = '', custom = false, custom_value = ''
    chrome.storage.sync.get({
        replace: '',
        custom: false,
        custom_value: ''
    }, function (items) {
        if (items.custom) {
            document.getElementById('custom').checked = true;
        } else {
            document.getElementById('custom-value').readOnly = true;
            document.querySelector('[type="radio"][value="' + items.replace + '"]').checked = true;
        }
        document.getElementById('custom-value').value = items.custom_value;
    });
}

document.addEventListener('DOMContentLoaded', restore_options);

var inputs = document.querySelectorAll("input[type=radio]"),
    x = inputs.length;
while (x--) {
    inputs[x].addEventListener("change", save_options);
}

document.getElementById('custom-value').addEventListener('input', save_options);