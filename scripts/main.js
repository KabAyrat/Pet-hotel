fetch('/api/booking')
    .then(res => res.json())
    .then(data => {
        const block = document.getElementById('bookingBlock');

        if (data.length === 0) {
            block.innerHTML = '<p>Нет данных о бронировании</p>';
            return;
        }

        let html = `
            <table class="data-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>размер</th>
                        <th>номер команты</th>
                        <th>тариф</th>
                        <th>цена</th>
                        <th>тип команты</th>
                        <th>принадлежит</th>
                    </tr>
                </thead>
                <tbody>
        `;

        data.forEach(booking => {
            html += `
                <tr>
                    <td>${booking.id}</td>
                    <td>${booking.размер}</td>
                    <td>${booking.номер}</td>
                    <td>${booking.тариф}</td>
                    <td>${booking.цена}</td>
                    <td>${booking.тип_комнаты}</td>
                    <td>${booking.предназначен_для}</td>
                </tr>
            `;
        });

        html += `
                </tbody>
            </table>
        `;

        block.innerHTML = html;
    })
    .catch(error => {
        console.error('Ошибка:', error);
        document.getElementById('bookingBlock').innerHTML = '<p style="color:red">Ошибка загрузки данных</p>';
    });