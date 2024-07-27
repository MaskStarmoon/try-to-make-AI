document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;

    const userData = {
        name: name,
        password: password,
        coin: 0
    };

    function writeDataToFile(data) {
        fetch('/write', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Gagal menyimpan data');
            }
            return response.text();
        })
        .then(data => {
            console.log(data);
            alert('Data berhasil disimpan');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Data gagal disimpan');
        });
    }

    writeDataToFile(userData);
});
