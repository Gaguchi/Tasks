// Load SVG content
fetch('car.svg')
    .then(response => response.text())
    .then(svgContent => {
        document.getElementById('car-container').innerHTML = svgContent;
        // Add click event to bonnet group
        document.querySelector('#bonnet').addEventListener('click', bonnetClick);
    });

function bonnetClick() {
    console.log('bonnet clicked');
}