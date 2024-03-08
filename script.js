document.getElementById('translateButton').addEventListener('click', function() {
  const cssString = document.getElementById('input').value;
  const cssObject = cssToJSON(cssString);
  const jsonOutput = JSON.stringify(cssObject, null, 2);
  document.getElementById('output').textContent = jsonOutput;
});

document.getElementById('clearButton').addEventListener('click', function() {
  document.getElementById('input').value = ''; // Clear the textarea
});

document.getElementById('copyButton').addEventListener('click', function() {
  const outputText = document.getElementById('output').textContent;
  copyToClipboard(outputText);
  const successMessage = document.createElement('p');
  successMessage.textContent = 'Text copied successfully!';
  successMessage.classList.add('success');
  document.body.appendChild(successMessage);
  setTimeout(() => {
    document.body.removeChild(successMessage);
}, 1000);
});


function cssToJSON(cssString) {
  const cssRules = cssString.split(';');
  const cssObject = {};

  cssRules.forEach(rule => {
      const [property, value] = rule.split(':').map(part => part.trim());
      if (value.startsWith('#')) {
        cssObject[property] = value.toUpperCase();
    } else {
        cssObject[property] = value;
    }
  });

  return cssObject;
}

function copyToClipboard(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}