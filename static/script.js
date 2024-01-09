document.addEventListener('DOMContentLoaded', function () {
    const mapContainer = document.getElementById('map-container');
    const maxWidth = mapContainer.offsetWidth;
    const maxHeight = mapContainer.offsetHeight;

    let openLocationContainer = null;

    // Fetch data from the API
    fetch('/locations')
        .then(response => response.json())
        .then(data => {
            // Process each location and add markers to the map
            data.locations.forEach(location => {
                const marker = document.createElement('div');
                marker.className = 'marker';

                const locationContainer = document.createElement('div');
                locationContainer.className = "box-container";
                locationContainer.style.display = "none";
                mapContainer.appendChild(locationContainer);

                const iconElement = document.createElement('i');
                iconElement.className = 'fa-solid fa-circle-xmark';
                locationContainer.appendChild(iconElement);

                const locationTitle = document.createElement('h1');
                locationTitle.className = "location-title";
                locationContainer.appendChild(locationTitle);
                locationTitle.textContent = location.name_of_location;

                const locationDescription = document.createElement('p');
                locationDescription.className = "location-description";
                locationContainer.appendChild(locationDescription);
                locationDescription.textContent = location.description;

                const imageContainer = document.createElement('div');
                imageContainer.className = "image-container";
                locationContainer.appendChild(imageContainer)

                location.photos.forEach(photo => {
                    const image = document.createElement('img');
                    image.className = "image-child";
                    image.src = photo;
                    image.alt = "Travel photos";
                    imageContainer.appendChild(image);
                });

                const x = convertLongitudeToX(location.longitude);
                const y = convertLatitudeToY(location.latitude);
                function updateMarkerPosition(marker) {
                    marker.style.left = x + 'px';
                    marker.style.top = y + 'px';
                }

                updateMarkerPosition(marker);

                function setBoxPosition(locationContainer) {
                    locationContainer.style.left = x - 30 + 'px';
                    locationContainer.style.top = y - 30 + 'px';
                    locationContainer.style.zIndex = '100'
                }

                setBoxPosition(locationContainer)

                marker.addEventListener('click', function () {
                    // Handle marker click (you can show additional information, images, etc.)
                    if (openLocationContainer) {
                        openLocationContainer.style.display = 'none'
                    }

                    locationContainer.style.display = (locationContainer.style.display === "none") ? "block" : "none";
                    openLocationContainer = locationContainer
        
                    console.log(location.name_of_location + ', ' + location.description);                    
                });

                iconElement.addEventListener('click', function (event) {
                    event.stopPropagation();
                    locationContainer.style.display = 'none';
                })

                mapContainer.appendChild(marker);
                
            });
        })
        .catch(error => console.error('Error fetching data:', error));

    // Helper functions to convert latitude and longitude to X and Y coordinates
    function convertLongitudeToX(longitude) {
        // Map the longitude (-180 to 180) to X coordinate (0 to maxWidth)
        return ((longitude + 180) / 360) * maxWidth;
    }

    function convertLatitudeToY(latitude) {
        // Map the latitude (-90 to 90) to Y coordinate (0 to maxHeight)
        return ((90 - latitude) / 180) * maxHeight;
    }
});

