const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

// Serve static files from the public directory
app.use(express.static('public'));

// Hospital route
app.get('/hospital', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'hospital.html'));
});

app.get('/control', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'control.html'));
});

app.get('/emergency', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'emergency.html'));
});


// Socket.io connection handling
io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle emergency data from emergency interface
    socket.on('emergency_data', (data) => {
        console.log('Emergency data received:', data);
        // Send data to control room and hospital
        io.emit('to_control', data);
        io.emit('to_hospital', data);
    });

    // Handle hospital assignment from control room
    socket.on('hospital_info', (data) => {
        console.log('Hospital info received:', data);
        // Send hospital info to emergency interface
        io.emit('to_emergency', data.hospital);
    });

    // Handle hospital response
    socket.on('hospital_response', (data) => {
        console.log('Hospital response received:', data);
        // Send hospital response to control room and emergency interface
        io.emit('to_control', {
            ...data.emergency,
            hospitalResponse: data.hospital
        });
        io.emit('to_emergency', data.hospital);
    });

    // Handle arrival verification from hospital
    socket.on('arrival_verification', (data) => {
        console.log('Arrival verification received:', data);
        // Broadcast verification to control room
        io.emit('arrival_verification', {
            hasArrived: data.hasArrived,
            name: data.emergency.name,
            vehicleNumber: data.emergency.vehicleNumber
        });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start server
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 