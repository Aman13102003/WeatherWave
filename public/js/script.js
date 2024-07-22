$(document).ready(function() {
    $('#weatherForm').on('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
        const cityName = $('#CityInput').val();

        $.post('/', { cityName: cityName }, function(data) {
            $('#weatherInfo').html(data);
        });
    });
});
